import json, wave, pathlib, xml.etree.ElementTree as ET
import numpy as np
base=pathlib.Path(__file__).resolve().parents[1]/'v03-inspecao'/'cand-004'
x=json.loads((base/'EVENTOS.json').read_text(encoding='utf-8'))
errors=[]; cursor=1
for e in x['eventos']:
    if e['posicaoInicioAbsolutaTempos']!=cursor: errors.append(['inicio',e['id']])
    if e['posicaoInicioNoCompasso']!=((cursor-1)%4)+1: errors.append(['inicio_compasso',e['id']])
    n,d=map(int,e['duracaoRacional'].split('/'))
    if 4*n/d!=e['duracaoTempos']: errors.append(['duracao',e['id']])
    tuning={6:40,5:45,4:50,3:55,2:59,1:64}
    if tuning[e['corda']]+e['casa']!=e['midiSonoro']: errors.append(['altura',e['id']])
    cursor+=e['duracaoTempos']
tree=ET.parse(base/'pauta-adaptada.musicxml'); notes=tree.findall('.//part/measure/note')
steps={'C':0,'D':2,'E':4,'F':5,'G':7,'A':9,'B':11}; divisions=int(tree.findtext('.//divisions'))
for e,note in zip(x['eventos'],notes):
    pitch=note.find('pitch'); midi=(int(pitch.findtext('octave'))+1)*12+steps[pitch.findtext('step')]+int(pitch.findtext('alter','0'))
    if midi!=e['midiEscrito'] or int(note.findtext('duration'))/divisions!=e['duracaoTempos']: errors.append(['musicxml',e['id']])
with wave.open(str(base/'referencia-audio-sintese.wav'),'rb') as w:
    sr=w.getframerate();ch=w.getnchannels();width=w.getsampwidth();frames=w.getnframes();raw=w.readframes(frames)
signal=np.frombuffer(raw,dtype='<i2').reshape(-1,ch).mean(axis=1)
audio=[]
for e in x['eventos']:
    start=e['posicaoInicioAbsolutaTempos']-1
    segment=signal[int((start+.15)*sr):int((start+.75)*sr)]
    spec=np.abs(np.fft.rfft(segment*np.hanning(len(segment)))); freq=np.fft.rfftfreq(len(segment),1/sr)[np.argmax(spec)]
    expected=440*2**((e['midiSonoro']-69)/12)
    audio.append({'evento':e['id'],'picoHz':round(float(freq),2),'nominalHz':round(expected,2)})
    if abs(freq-expected)>3: errors.append(['audio_frequencia',e['id']])
out={'escopo':'Eventos, MusicXML e frequência dominante do WAV por análise numérica; não escuta humana','erros':errors,'eventos':len(x['eventos']),'notasMusicXML':len(notes),'duracaoWavSegundos':frames/sr,'audio':audio}
if len(notes)!=14 or frames/sr!=16:errors.append(['contagem_ou_duracao'])
(pathlib.Path(__file__).parent/'EVIDENCIAS-cand004-v03.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps(out,ensure_ascii=False))
