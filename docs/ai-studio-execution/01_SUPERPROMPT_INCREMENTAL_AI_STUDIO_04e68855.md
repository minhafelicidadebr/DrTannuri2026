# Comando incremental ao Gemini — app Dr. Luiz Tannuri

Atue como engenheiro principal de produto, frontend/full-stack, conteúdo e acessibilidade. Trabalhe **dentro do projeto atual já modificado do Google AI Studio**. Este comando substitui a execução integral do kit anterior. Leia `00_LEIA_PRIMEIRO.md`, `02_DELTA_22_REQUISITOS.json`, `03_CRITERIOS_DE_ACEITE.md`, `04_MATRIZ_ORIGINAL_22_REQUISITOS.json` e `05_AUDITORIA_DE_REFERENCIA.md` em `docs/ai-studio-execution/` ou nos anexos desta conversa. A referência `reference/AuthorityRibbonDesignReference.tsx` serve apenas de orientação visual.

## 1. Identifique a base e decida o alcance

A exportação **já executada e auditada** chama-se `copia.19.10.2026---dr.tannutri (1).zip` (SHA-256 `e2c58485a4cad3fb0ec4c1944450b335076b38dcf42a55932d7d7bee80cde2f5`). O hash é do arquivo ZIP exportado: não tente inferir a igualdade byte a byte de uma árvore extraída. O ZIP mais antigo, sem `(1)`, e a doadora **não são** bases para sobrescrever este projeto. O `historical_target.sha256` em `04_MATRIZ_ORIGINAL_22_REQUISITOS.json` se refere à base **anterior**.

Antes de editar, inspecione `src/App.tsx`, `src/data/canonicalCatalog.ts`, `src/data/bookingServices.ts`, `src/data/professionalCredentials.ts`, `src/components/features/ProfessionalStory.tsx`, `src/components/features/AthleteTestimonials.tsx`, `src/components/features/PlansSection.tsx`, `src/components/features/booking/BookingModal.tsx`, `server.ts` e `public/assets/aistudio/`. Confirme o estado dos 22 requisitos no **código que estiver aberto**. Se ele não contiver o catálogo com os quatro IDs e preços, a história/galeria e o terceiro certificado, **pare as mudanças e explique a divergência de versão**. Se contiver ajustes posteriores à auditoria, preserve-os e reduza o escopo do delta.

Use esta árvore de decisão **explícita e resumida em tabela**, sem apresentar raciocínio privado: para cada R01–R22, se está correto e ativo → **MANTER**; se está parcial → **CORRIGIR SÓ O DELTA**; se está ausente → **ADICIONAR APENAS O ELEMENTO APROVADO**; se depende de dado externo sem fonte confiável → **CONDICIONAR/DESATIVAR A ALEGAÇÃO**, registrando a dependência. Compare risco de regressão, precisão factual, experiência e esforço; justifique em uma frase por decisão. Não reimporte seções nem reexecute a matriz inteira.

Preserve especificamente os núcleos já implementados: R06 certificado de 6º grau em terceiro lugar; R08 Marmitaria do Atleta informativa; R09 campos corrigidos do método; R12 ausência do laboratório e cinco simuladores no fluxo ativo; R13 ausência de `ProgramsSection` ativo; R16 App Webidiet e retornos quinzenais sem URL/SSO inventados; R17 VIP sem CGM/sincronização de treino inclusos, com estratégias alimentares em viagem. Preserve quatro credenciais, três depoimentos atribuídos, hero, FAQ e design base. Trabalhe sobre R01–R05, R07, R10–R11, R14–R15 e R18–R22 apenas nas lacunas auditadas.

## 2. Contratos invariantes

- Identidade pública: **Dr. Luiz Tannuri**. Não faça substituição global cega em domínio, identificadores, depoimentos históricos ou nomes de arquivos; corrija textos públicos, metadados, `alt`, respostas e URLs **somente quando houver destino verificado**.
- Quatro ofertas (online / presencial, BRL): `diagnostico_inicial` **450 / 750**; `programa_metabolico` **1199 / 1999**; `plano_assinatura` **259 / 429 por mês**; `programa_longevidade_vip` **1999 / 3199**. Retornos: 1; 3; quinzenais com **quantidade não especificada**; 6. Consultas principais: **60 min**.
- Adicionais: `bioimpedancia_inbody` **R$ 99**, presencial, avaliação de **20 min**; `sensor_glicose` **R$ 490**, uso do sensor por **14 dias** (isso não é duração de atendimento); `consultoria_cozinha` **R$ 280**, online, **60 min**. Soma aritmética: **R$ 869**. Não atribua inclusão gratuita sem a matriz confirmar.
- `InBody 120` em oferta e material apropriado; **a imagem que mostra fisicamente InBody 770 não pode representar o 120**. Se não existir foto comprovadamente correta, escolha um visual genérico de avaliação sem marca/modelo e descrição neutra.
- Atendimento presencial anunciado em **Brasília (DF)**; remova “Jardins SP”. Não deduza endereço completo, telefone, número CRN, nota de avaliações, competência profissional, autenticidade de documentos ou conectividade com Webidiet sem fonte confirmada pelo cliente. Não fabrique referências clínicas nem converta depoimentos em prova verificada.
- Funcionalidade não demonstrada deve usar linguagem precisa: “solicitação pendente”, “horário preferido”, “não enviado”, conforme o estado real. Sem confirmação fictícia, mensagem fictícia, reserva fictícia ou calendário confirmado.
- Segurança: nunca colocar API key no frontend; respeitar variáveis de ambiente do servidor; não expor dados pessoais/saúde em telemetria nem publicar material de trabalho por estar em `public/`.

## 3. Ordem de implementação e decisões técnicas

### Etapa A — Integridade e contato (P0)

Registre um snapshot/diff inicial. Faça uma busca dirigida dos dados antigos em `metadata.json`, `Header.tsx`, `MethodSection.tsx`, `Hero.tsx`, `ConciergeModal.tsx`, `Footer.tsx`, `server.ts`, `src/data/imageAssets.ts`, `src/data/googleReviewsData.ts` e componentes de booking. O `CLIENT_INFO.primaryWhatsApp` / `whatsAppClean` (`+55 11 99876-5432`) e `bookingUrl` (`agendamento.drtanutri.com.br`) são **não confirmados**; não os substitua por palpites. Defina um contrato de configuração externa validável. Até receber valores autênticos, remova/desative CTAs que saem para esses destinos e mostre aviso inteligível; não transforme o placeholder em canal válido. Revise divergência de CRN (`CRN-1/DF` versus `CRN-3`) e métricas de Google Reviews sem consulta verificável: retenha apenas afirmações aprovadas/atribuídas; não altere a fala histórica sobre “75 minutos”, mas peça validação editorial ou oculte tal depoimento se contradiz o serviço vigente de 60 minutos.

### Etapa B — Catálogo compartilhado e agendamento honesto (P0)

Converta os dados já corretos de `canonicalCatalog.ts` em **fonte comercial única**, com valores inteiros em centavos, IDs estáveis e metadados de modalidade/duração. Uma arquitetura possível é um módulo puro compartilhado, sem dependência de React/DOM, importado pelo catálogo da interface e por `server.ts`; adapte à estrutura real. Elimine cópias numéricas e strings divergentes em `bookingServices.ts`, `aiSkillEngine.ts`, `server.ts` e etapas da agenda. O servidor deve validar `offerId`, modalidade, adicionais permitidos e valores; nunca confiar em preço enviado pelo cliente. Filtre benefícios por modalidade: online não promete bioimpedância presencial; a consulta inicial não recebe selo geral “InBody incluso” sem amparo; assinatura mostra sufixo **/mês** pelo ID atual `plano_assinatura`, não `recorrente_mensal`. Para perguntas comerciais, a IA deve receber ou recuperar dados determinísticos do catálogo e não inventar preços, apesar da resposta livre do modelo.

Inspecione o sistema real antes de escolher o ramo:

| Ramo | Condição verificável | Resultado permitido |
|---|---|---|
| Reserva real | Existe backend persistente, checagem de conflitos, disponibilidade efetiva e despacho confirmado. | Confirmar apenas após sucesso transacional; tratar falha, repetição e timezone. |
| Pedido operacional | Existe endpoint durável e canal/alerta configurado, mas sem confirmação de disponibilidade. | Registrar pedido e exibir protocolo de **pedido recebido, aguardando confirmação**; jamais chamar de reserva. |
| Sem integração validada (estado observado no ZIP) | Horários simulados, código aleatório local, lead em memória e/ou canal de destino não confirmado. | Exibir formulário de **preferência de dia/horário** como rascunho/solicitação **não enviada**; permitir copiar resumo para contato manual somente com canal autenticado; nenhum código de reserva ou sucesso de envio. |

Na base auditada, `bookingServices.ts:94–129` cria disponibilidade de exemplo, `BookingModal.tsx:108–132` gera código local, `BookingStepConfirmation.tsx:48–55` alega notificações não enviadas e `server.ts` mantém leads em memória. Portanto o ramo padrão é o terceiro, a menos que a instância aberta traga integração adicional **comprovada**. Troque labels, CTA, etapas 2–4 e resumo para preço **da modalidade selecionada** e estado exato. Oculte slots falsamente “livres”. Use `America/Sao_Paulo` ao lidar com horário civil de Brasília, parsing/conversão correta e datas persistidas com fuso. Não emita `.ics` ou link Google Calendar com `STATUS:CONFIRMED` para uma preferência; se houver lembrete opcional, ele deve dizer “horário pretendido, ainda não confirmado”, sem convite falso. Não pressuponha 60 minutos de atendimento para instalação/análise do sensor apenas pelos 14 dias de uso. Não afirme email/WhatsApp enviado sem integração e resultado efetivo. Não envie mensagens reais durante os testes.

### Etapa C — Narrativa e prova visual (P1)

Corrija o CTA de `Header.tsx` que aponta para `#diagnostico` removido: abra o pedido de agendamento com `diagnostico_inicial` ou leve ao bloco de planos com foco/âncora válidos. Remova promessas residuais de portal próprio em `MethodSection` e `Hero`; cite `App Webidiet` somente conforme escopo real. Implemente R04 como faixa compacta após Hero/TrustStrip **somente com indicadores individualmente aprovados**. Use composição responsiva e tokens visuais da base; `reference/AuthorityRibbonDesignReference.tsx` mostra a disposição com propriedades vazias de conteúdo. A versão doadora original possui import não portável e afirmações de Google 5,0 / 100% de avaliações 5 estrelas sem verificação; **não copie** esses trechos. Para +1.000 alunos, +100 seminários, alcance e países, obtenha confirmação documental/editorial; enquanto pendentes, omita cada cartão numérico/país específico e preserve estrutura elegante com dados já aprovados. Não exiba métrica fictícia para completar cinco colunas.

Mantenha o terceiro certificado existente; rasterização de maior resolução do pacote anterior é apenas opcional se houver ganho real de legibilidade, sem edição do conteúdo da credencial. Mantenha os três depoimentos sem alterar citações; substitua selos “homologado”, “chancelado”, “verificado” e equivalentes não demonstrados por atribuição clara ao material do cliente. Mantenha imagens do profissional já presentes e `object-position` adequado para mobile, sem reapresentar elementos do app doador que tenham sido rejeitados.

### Etapa D — Privacidade, acessibilidade e acabamento (P1–P2)

Remova `originPrompt`, `queryText` e todo texto livre de saúde de eventos analíticos; use esquema por eventos e atributos enumerados, sem dados de consulta. Mova/remova de `public/assets/aistudio/` os PDFs integrais, superprompts, JSONs, hashes e `.tsx` de trabalho. Somente imagens destinadas ao site ficam públicas; confira que as URLs antigas de imagem continuam resolvendo. Não copie estes documentos para `public/` durante a execução.

Garanta foco inicial, contenção dentro do modal, Escape, fechamento e **retorno ao acionador** em história, galeria, depoimentos e booking; botões/card controls acionáveis via teclado com semântica correta. Corrija hit areas, contraste, tipografia pequena, reflow em 360/390/768/1440 px e zoom 200%; respeite `prefers-reduced-motion`. Animações discretas devem sinalizar progressão real sem reduzir legibilidade e sem mascarar estados pendentes. `Hero` demonstrativo não deve dizer “Ao vivo” se não usa dados ao vivo. Evite dependências novas sem necessidade.

## 4. Verifique e entregue evidências

Após cada etapa, faça diff e inspecione se algo já correto mudou indevidamente. Rode `npm run lint` e `npm run build` **com dependências instaladas no ambiente do AI Studio**; se faltar ferramenta, reporte o bloqueio exato sem alegar que passou. Rode testes de unidade/integridade que agreguem valor: catálogo, preço por modalidade, acréscimos, duração não informada, transição de estados de booking e saída de IA comercial. Percorra o preview em desktop/mobile, navegação por teclado e foco; verifique rede/endpoint antes de chamar algo de “enviado”. Consulte `03_CRITERIOS_DE_ACEITE.md` e produza:

1. Tabela R01–R22: **MANTIDO / CORRIGIDO / ADICIONADO / CONDICIONADO**, arquivos alterados, evidência, pendência externa.
2. Lista de arquivos/linhas no diff e teste de regressão das oito ofertas e três adicionais.
3. Capturas ou descrição verificável dos estados de modalidade e agendamento, sem dados pessoais reais.
4. Resultado literal dos comandos, viewports, teclado, acessibilidade e URLs públicas/arquivos servidos.
5. Lista curta de dados que o cliente precisa confirmar para ativar CTAs e alegações (contato, registro, endereço, contagens, avaliações). Não bloqueie ajustes independentes por isso.

**Condição de entrega:** concluir o trabalho no projeto e deixar a prévia pronta para revisão, sem publicar automaticamente, trocar domínio, comprar serviços, acionar mensagens reais ou declarar homologação clínica. Se qualquer item não puder ser implementado de maneira verdadeira, sinalize como bloqueado com fallback seguro e não marque como concluído.
