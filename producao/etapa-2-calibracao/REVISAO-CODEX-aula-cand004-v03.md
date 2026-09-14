# Parecer de fechamento localizado — cand-004 v03

Data: 14/09/2026. Decisão: **aprovado_fechamento_localizado**. FINA-01 a FINA-06 encerrados. Não equivale à homologação do modelo de aula para produção em escala nem à aprovação técnica de integração.

## Escopo e método

Lidos AULA.md, JSON, pendências, verificações, relatórios e código dos validadores. Executado novamente o validador real: 119 checks aprovados, zero erros, nove mutações rejeitadas em cópias físicas. Executado script separado que não importa o validador de produção: 29 checks, zero falhas. Evidências em `revisao-codex/EVIDENCIAS-fechamento-cand004-v03.json` e `v03-aula-completa/cand-004/RESULTADO-VALIDACAO.json`.

Observada novamente a simulação móvel nesta auditoria. Inspeção direta dos demais PNGs e leitura dos textos SVG realizadas no fechamento imediatamente anterior; hashes conferidos novamente, sem alterações nesses recursos. Não foi realizada nova escuta humana, teste com estudante ou teste em smartphone físico.

Codex executou e revisou esta rodada. O script separado reduz dependência do validador de produção, mas não constitui revisão externa independente.

## Decisão por item

| Item | Conferência | Resultado |
|---|---|---|
| FINA-01 | Nome `0. 1`, 51.500 bytes, caminho, entrada e SHA-256 provenientes da base; bytes/hash reais recalculados em leitura. Identificador editorial separado. | Encerrado |
| FINA-02 | ID `aula-ped-017-leitura-clave-sol` preservado, candidatoId separado e vínculos aprovados mantidos. | Encerrado |
| FINA-03 | Cabeçalhos dos sistemas sem respostas; saída sem nota fornecida para início no c.3; integridade dos oito gráficos inspecionados conferida. Hash protege contra alteração, não compreende o conteúdo de PNG. | Encerrado |
| FINA-04 | Frequência não exigida na saída; sucesso da revisão limitado àquela tentativa, sem domínio definitivo. | Encerrado |
| FINA-05 | Simulação observada; 343/800 = 42,875%, redução de 57,125%; limitações sem promessa de conforto físico. | Encerrado |
| FINA-06 | Markdown gerado e comparado; mesma função usada para validar cópias alteradas, com erros específicos. Motor formal permanece explicitamente pendente. | Encerrado no escopo local |

Conferência musical separada: 14 eventos, sequência e alturas escritas/sonoras corretas, cordas/casas na primeira posição, inícios e durações coerentes, 16 tempos. Áudios e MusicXML idênticos à v02. Isso preserva a regularização autoral aprovada; não transforma a adaptação em transcrição literal do PDF original.

## Limites para homologação do modelo

Não abrir outra rodada para os seis itens já encerrados. Antes de usar esta aula como modelo definitivo ou em piloto com aluno, resolver em um lote próprio:

1. **Fidelidade didática da renderização:** a seção 6 foi reduzida a resumos, perdendo instruções passo a passo presentes na v02. Igualdade ao gerador não assegura preservação da riqueza didática.
2. **Orientações essenciais visíveis:** a nota de conclusão válida entre 48–54 BPM existe no JSON, mas não é emitida no Markdown; a seção 7 traz exemplos 52/56 BPM. Uniformizar a regra e renderizá-la. Recolocar a orientação explícita de pressão mínima no diagnóstico e de interromper em caso de desconforto, preservando pausas já previstas. São ajustes para piloto, não erros na música.
3. **Schema formal:** validar contratos e instâncias pertinentes com motor compatível antes da integração; não confundir presença de seções com conformidade formal.
4. **Uso real:** testar leitura, clareza das instruções, saída e recuperação com estudante; registrar problemas observáveis. Simulação não comprova conforto ou eficácia.

Não se homologa um template universal de ensino a partir de uma aula de leitura. Ritmo, ouvido, acompanhamento, acordes e solo exigem calibração própria.

## Próximo trabalho autorizado

Retomar inspeção dos cinco candidatos restantes em entregas curtas. Primeiro cand-006, Valsa em 3/8; os demais podem coletar evidências sem produzir aulas completas ou declarar aprovação. Briefing: `producao/BRIEF-ETAPA-2A-RESTANTES-v03.md`.

Manter a submissão v03 intacta com status histórico `aguardando_revisao`; a decisão desta auditoria é registrada neste parecer e no controle de lotes. App e acervo permanecem fora do escopo.
