# Parecer Codex — Etapa 0, v01

Data: 14/09/2026. Decisão: **corrigir e reenviar**. O núcleo do inventário é aproveitável; a etapa 0 não está integralmente aprovada. Autorizada a preparação da arquitetura provisória da etapa 1, junto com a correção da etapa 0. Produção de aulas e integração continuam fora deste briefing.

## Evidências conferidas pelo revisor

Inspeção dos seis entregáveis, catálogo atual e manifesto Tríade. Varredura somente leitura do acervo. Evidências reproduzíveis em `EVIDENCIAS-REVISAO-CODEX-v01.json`; script em `producao/revisar-etapa-0.cjs`.

- 631 entradas, 631 IDs únicos; todos correspondem ao catálogo. Grupo/título de origem e módulo atual conferidos; links preservados conferidos por entrada, sem teste remoto.
- 1.814 caminhos únicos referenciados: todos existem, seus tamanhos conferem e seus hashes têm formato válido.
- Todas as referências Tríade conferidas contra mensagem e índices originais do manifesto, sem divergências. Isso não comprova o conteúdo audiovisual dos arquivos.
- 2.090 arquivos físicos encontrados; 276 não aparecem como registros de arquivo no inventário entregue. A lista está na evidência do revisor, com caminhos e tamanhos. Inclui fragmentos e arquivos vazios, mas também 15 MP4, três PDFs e outros materiais que precisam de decisão explícita.
- 32 hashes recalculados por amostragem: todos coincidem com o JSON. A amostra inclui as sete partituras da entrada Kaiser 124 e materiais Tríade de apresentação, ritmo, intervalos e fluência. Não foi recalculado o SHA-256 de todos os 82 GB; a declaração de hashing integral do produtor não é homologada pelo revisor.
- Recontagem pelos arquivos: 519 entradas com vídeo, **85 com PDF**, 520 com vídeo/PDF, 288 com legenda. Ter legenda não significa que ela tenha conteúdo útil ou tenha sido lida.
- 65 arquivos classificados como PDF sem extensão: todos têm cabeçalho `%PDF-1.7`. Não foram renderizados; cabeçalho comprova formato declarado, não conteúdo, completude ou legibilidade.
- CSV: 631 linhas; correspondência básica de IDs, contagem de PDFs e total de arquivos por entrada conferida com JSON. Não houve validação completa de todos os campos CSV.
- Agrupamento dos hashes declarados das 1.814 referências: 86 grupos, 336.607.323 bytes redundantes. Isso não confirma nem refuta grupos em arquivos físicos omitidos; exige tabela do escopo integral para sustentar os 107 grupos/3,05 GB alegados.

Nenhum vídeo foi reproduzido ou PDF renderizado nesta revisão. Não foi possível comprovar retrospectivamente a alegação de ausência de alterações no acervo ou em `app/`; esta revisão não escreveu nesses locais.

## Correções obrigatórias

| ID | Prioridade | Local | Problema e correção exigida |
|---|---|---|---|
| E0-01 | Alta | RESUMO, VERIFICACOES, INVENTARIO.totais | Resumo diz 33 entradas com PDF; JSON e recontagem dizem 85. Diferenciar entradas, arquivos físicos e referências; gerar totais e tabelas da mesma base. Separar 111 entradas sem vídeo/PDF em 103 sem arquivo e oito com apoio textual. Não comparar 33 entradas com 32 materiais do catálogo. |
| E0-02 | Alta | INVENTARIO e relatórios | Entrega promete 2.090 arquivos com hashes, mas só apresenta 1.814 registros. Entregar tabela integral dos arquivos físicos, com ID estável, hash, vínculo ou motivo de não associação. Não apagar fragmentos ou duplicatas. Registrar duplicatas como representação de arquivo, não novas aulas. |
| E0-03 | Alta | VERIFICACOES, amostra 3 | Os sete hashes abreviados dos PDFs na narrativa divergem dos hashes completos do JSON confirmados por recálculo: `0. 1` começa `decfdf2e...`, não `719c2ee6...`. Regenerar as amostras da base e compará-las automaticamente. A amostra de ritmo, mensagem 866, confere; não precisa ser tratada como divergente. |
| E0-04 | Alta | PROPOSTA-ETAPA-1, tabela de candidatos | IDs `aula-kaiser-5-5-thumb-slap-batida-fingerstyle` e `aula-kaiser-134-3-pequena-valsa` não existem. Thumb Slap é `aula-kaiser-18-5-thumb-slap-batida-fingerstyle`; Pequena Valsa é `aula-kaiser-137-10-pequena-valsa-ferdinando-carulli-viol`. Corrigir IDs, arquivos e tamanhos. A balada básica usa mensagens 928/932, não o vídeo 933 citado; intervalos da entrada 15 usa 919/924/925, não 926. Não presumir equivalência entre título e gesto. |
| E0-05 | Alta | Relatórios e nivelInspecaoReal | Existência/tamanho/hash não comprovam reprodução ou integridade de decodificação. Trocar “reproduzível”, “íntegro”, “partituras autênticas” por descrições do teste efetivo. Timestamps, páginas e conteúdo dos candidatos não observados ficam como hipóteses de localização, não evidências. Estado de leitura de legenda deve ter prova ou ser rebaixado a indexação. |
| E0-06 | Alta | PENDENCIAS, RESUMO | Apresentar lista de grupos de duplicatas e método/escopo do volume redundante. Relatos de arquivos idênticos e hashes citados precisam ser reconciliados; não bastam exemplos narrativos. Inventariar os 65 PDFs sem extensão, não apenas sete. |
| E0-07 | Média | schema embutido e metadata | Schema exige `metadata`, ausente no documento. Corrigir schema ou objeto e fornecer validação executável. Definir enums, campos obrigatórios de arquivo, distinção entre caminho e ID, raiz sem comentário “(somente leitura)” e estados de inspeção por arquivo. |
| E0-08 | Alta | Conclusão e classificações | 103 entradas sem arquivo não podem ser declaradas todas quizzes/textos de plataforma. A própria base classifica 100 como `sem_material_local`, além de três quizzes. Registrar desconhecido quando não houver prova do tipo. Fusão/divisão ou diferenças de versões exigem inspeção, não título/duração. |
| E0-09 | Média | Diagnóstico do gerador e proposta | Falha de índices é plausível e a associação original foi conferida, mas o número “193 aulas” e o efeito isolado de cada causa exigem relatório reproduzível. Proposta ainda manda eliminar SVG fixo em Am, já removido no estado vigente: atualizar dependências conforme implementação atual. |

## Qualidade didática da proposta

A separação entre proveniência e currículo, objetivos observáveis e relações entre fontes e aulas está correta. Porém, não fundir automaticamente “parte 1/2”, upgrade/reforço ou teoria/aplicação. Podem exigir objetivos e pré-requisitos diferentes. Não dividir só por duração, nem escolher a fonte de acompanhamento por um título de técnica percussiva. Inspecionar e escolher um gesto adequado ao nível pretendido.

Ouvido deve separar reconhecimento e entoação quando a segunda habilidade exigir pré-requisito adicional. Ritmo deve separar pulso, célula e troca de acordes na preparação. BPM de 60–70 e limites de duração são propostas de calibração, não critérios universais. Não substituir todo quiz ausente automaticamente: primeiro identificar a habilidade e se uma avaliação autoral é necessária.

## Encaminhamento

Entregar correções em `producao/etapa-0-inventario/v02/`, preservando v01, com resposta por ID. Pode preparar o mapa provisório da etapa 1 conforme `BRIEF-ETAPA-1-v01.md`, marcando decisões dependentes dessas correções. A aprovação final da arquitetura depende da reconciliação da etapa 0. Nenhuma aula pode ser apresentada como curada nesta rodada.
