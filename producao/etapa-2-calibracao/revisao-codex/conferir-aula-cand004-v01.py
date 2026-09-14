import json, wave, pathlib, xml.etree.ElementTree as ET
import numpy as np
base=pathlib.Path(__file__).resolve().parents[1]/'v01-aula-completa'/'cand-004'
out={'escopo':'Eventos, MusicXML principal e frequências dominantes do WAV; sem escuta humana nem execução instrumental','exercicios':[]}
for label,eventfile,audiofile in [('principal','EVENTOS.json','recursos/referencia-audio-sintese.wav'),('transferencia','recursos/tarefa-transferencia/transferencia-eventos.json','recursos/tarefa-transferencia/transferencia-audio-sintese.wav')]:
    x=json.loads((base/eventfile).read_text(encoding='utf-8')); errs=[];cursor=1;bars={}
    with wave.open(str(base/audiofile),'rb') as w:
        sr=w.getframerate();ch=w.getnchannels();frames=w.getnframes();raw=w.readframes(frames)
    signal=np.frombuffer(raw,dtype='<i2').reshape(-1,ch).mean(axis=1);frequencies=[]
    for e in x['eventos']:
        absolute=e.get('posicaoInicioAbsolutaTempos',e.get('posicaoInicioAbsoluta'))
        local=e.get('posicaoInicioNoCompasso',e.get('posicaoInicioCompasso'))
        if absolute!=cursor or local!=(cursor-1)%4+1:errs.append(['inicio',e['id']])
        if {6:40,5:45,4:50,3:55,2:59,1:64}[e['corda']]+e['casa']!=e['midiSonoro']:errs.append(['corda_casa',e['id']])
        n,d=map(int,e['duracaoRacional'].split('/'))
        if 4*n/d!=e['duracaoTempos']:errs.append(['duracao',e['id']])
        bars[e['compasso']]=bars.get(e['compasso'],0)+e['duracaoTempos']
        start=cursor-1; segment=signal[int((start+.15)*sr):int((start+.75)*sr)]
        spectrum=np.abs(np.fft.rfft(segment*np.hanning(len(segment))))
        freq=float(np.fft.rfftfreq(len(segment),1/sr)[np.argmax(spectrum)]);expected=440*2**((e['midiSonoro']-69)/12)
        frequencies.append(round(freq,2))
        if abs(freq-expected)>3:errs.append(['frequencia',e['id']])
        cursor+=e['duracaoTempos']
    if any(v!=4 for v in bars.values()) or frames/sr!=cursor-1:errs.append(['soma_ou_wav'])
    if label=='principal':
        tree=ET.parse(base/'recursos/pauta-adaptada.musicxml'); notes=tree.findall('.//part/measure/note');div=int(tree.findtext('.//divisions'));steps={'C':0,'D':2,'E':4,'F':5,'G':7,'A':9,'B':11}
        if len(notes)!=len(x['eventos']):errs.append(['contagem_musicxml'])
        for e,note in zip(x['eventos'],notes):
            pitch=note.find('pitch');midi=(int(pitch.findtext('octave'))+1)*12+steps[pitch.findtext('step')]+int(pitch.findtext('alter','0'))
            if midi!=e['midiEscrito'] or int(note.findtext('duration'))/div!=e['duracaoTempos']:errs.append(['musicxml',e['id']])
    out['exercicios'].append({'nome':label,'eventos':len(x['eventos']),'tempos':cursor-1,'compassos':bars,'segundosWav':frames/sr,'picosHz':frequencies,'erros':errs})
(pathlib.Path(__file__).parent/'EVIDENCIAS-aula-cand004-v01.json').write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps(out,ensure_ascii=False))
