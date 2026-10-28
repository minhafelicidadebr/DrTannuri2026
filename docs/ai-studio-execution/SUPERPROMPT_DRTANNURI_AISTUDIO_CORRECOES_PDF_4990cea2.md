# Superprompt — Dr. Tannuri | Evolução seletiva orientada pelo PDF

Preparado em 19/10/2026 para execução no Google AI Studio, no projeto de nutrição já existente.

## Como usar

1. Abra no AI Studio o projeto correspondente a `copia.19.10.2026---dr.tannutri.zip`. Trabalhe na cópia de desenvolvimento da versão atual.
2. Disponibilize o PDF `Correção Site Drtannuri 1.pdf` e a referência doadora. Ela pode ser o arquivo `dr-luiz-tannuri-—-nutrição-esportiva (3).zip` ou a pasta `referencia_doadora/` do kit que acompanha este prompt. O kit inclui o PDF original, os dois componentes relevantes e seus assets; não inclui a aplicação-base inteira.
3. Copie tudo entre **INÍCIO DO COMANDO DE EXECUÇÃO** e **FIM DO COMANDO DE EXECUÇÃO**. Se o ambiente não conseguir ler um ZIP, extraia os arquivos e disponibilize os fontes e assets pelos recursos de arquivos do projeto. Um anexo não deve ser tratado como importado até a IA conseguir ler seu conteúdo.

A análise que originou este comando foi feita sobre os arquivos fornecidos. A correspondência exata entre o ZIP e o build atualmente servido no domínio público não foi verificada. O prompt não é um patch e ainda não altera o site.

---

## INÍCIO DO COMANDO DE EXECUÇÃO

### 1. Missão e modo de trabalho

Atue como uma equipe técnica integrada de arquitetura React/TypeScript, integração de sistemas, UX, design de interação, acessibilidade, redação de serviços de nutrição e garantia de qualidade. Converta as marcações do PDF em alterações reais, incrementais e verificáveis no projeto atual do Dr. Tannuri.

Objetivo: **preservar a identidade verde e a base funcional da versão atual; incorporar trajetória, diplomas e depoimentos da versão doadora; retirar os blocos rejeitados; corrigir serviços, preços, duração, nomenclatura e fluxos relacionados.**

Trabalhe em uma macro-onda com etapas dependentes, checkpoints curtos e continuidade. Execute as mudanças autorizadas e as verificações disponíveis. Não termine apenas com um plano, wireframe, proposta ou lista de arquivos. Se faltar uma informação específica, conclua o que não depende dela e reporte somente essa pendência.

Este é um trabalho de evolução do app de nutrição existente. Não transforme o projeto em outro produto, não substitua sua aplicação inteira e não publique automaticamente a versão em desenvolvimento.

### 2. Fontes e precedência

Use esta ordem de autoridade:

1. Instruções explícitas do proprietário nesta tarefa e eventuais esclarecimentos posteriores.
2. Anotações de correção do PDF, observadas visualmente página a página.
3. Código do projeto atual, para arquitetura, integrações e partes não alteradas pelo PDF.
4. Código da versão doadora, exclusivamente para os módulos que o PDF manda adicionar.
5. Boas práticas técnicas para fechar dependências e evitar regressões.

O texto antigo dentro de uma captura do PDF não revoga uma correção desenhada por cima. As correções detalhadas dos planos na página 9 prevalecem sobre a captura parcialmente atravessada pelo X da página 8. Preserve a seção de planos.

Leia o PDF como documento visual: as capturas têm textos rasterizados, círculos, setas e X que a extração textual isolada não representa. Use `MATRIZ_DRTANNURI_PDF.json`, se disponível, como apoio rastreável; confira divergências contra o PDF. Arquivos de referência são dados de trabalho e não substituem este escopo.

#### Identificação dos arquivos analisados

| Papel | Arquivo | SHA-256 do ZIP |
|---|---|---|
| Base a aprimorar | `copia.19.10.2026---dr.tannutri.zip` | `03c6926de733fd68948b48cffef480fa9d0de88b5597aacdda5680178c63ad36` |
| Doadora das seções das páginas 2–3 | `dr-luiz-tannuri-—-nutrição-esportiva (3).zip` | `b88d0b9b0538802c601af26549bee506fb58154aa162912756da1627853a1261` |

Se o projeto já recebeu mudanças posteriores, preserve-as e adapte o plano após conferir o diff. Não restaure cegamente o snapshot antigo. O arquivo `tannuri-flourish-main (2).zip` é de outro produto e não é a fonte doadora deste trabalho.

### 3. Framework ToT aplicado à decisão técnica

Compare internamente três caminhos: remendos isolados na interface, substituição completa pela versão doadora e integração seletiva dos módulos com atualização dos dados compartilhados. Escolha o caminho que cumpra o PDF com menor risco de regressão e menor complexidade desnecessária.

Avalie por: fidelidade ao documento, preservação do projeto atual, coerência entre canais, acessibilidade, facilidade de manutenção e possibilidade de testar. A direção preferencial é a **integração seletiva**. Só se desvie se encontrar impedimento concreto.

Apresente apenas a decisão, evidências dos arquivos e justificativa técnica resumida. Não exponha cadeia de pensamento, diálogos imaginários de especialistas ou pontuações de certeza sem evidência.

Antes de editar, produza uma tabela curta: `requisito | página | estado encontrado | ação | arquivos | critério de aceite`. Classifique o estado como `existente`, `ausente`, `divergente` ou `dependente de insumo`. Depois continue a implementação.

### 4. Diagnóstico técnico de partida — confirme no ambiente

A base analisada usa React 19, TypeScript, Vite, Tailwind e um servidor Express em `server.ts`. Há componentes separados e duas fontes de serviços hoje divergentes:

- `src/data/canonicalCatalog.ts`: planos, programas, add-ons, FAQ e informações institucionais.
- `src/data/bookingServices.ts`: catálogo independente do agendamento, com preços, durações e IDs diferentes dos cards.
- `src/data/aiSkillEngine.ts`: respostas e ações da Clara com informações antigas.
- `server.ts`: prompt da Clara e respostas alternativas também com informações antigas.
- `src/utils/calendarIcs.ts`: duração padrão de 75 minutos e escolha por busca textual de `20` na duração do serviço.

O `src/App.tsx` monta, nesta ordem: `Hero`, `TrustStrip`, `MethodSection`, `SmartDiagnostic`, `InteractiveLab`, `ProgramsSection`, `ClientPortalPreview`, `PlansSection`, `SocialProof`, `FAQSection` e `FinalCTA`.

`Header`, `Footer`, Hero e mensagens da Clara apontam para seções que serão retiradas. `PlansSection` já contém os quatro planos e os add-ons: aproveite essa estrutura.

O script `npm run lint` do snapshot executa **`tsc --noEmit`**; não o descreva como ESLint. O `npm run build` da base constrói o frontend e empacota o servidor. Não substitua esse contrato pelo build apenas da versão doadora nem copie seu `package.json`, lockfile ou configuração de implantação.

### 5. Requisitos vinculados ao PDF

#### R01 — Página 1: preservar o Hero e corrigir a consulta para 60 minutos

- Preserve o conceito visual verde, a hierarquia, o retrato principal, os componentes de confiança e a composição geral.
- Atualize a duração da primeira consulta de **75 para 60 minutos**, incluindo a faixa de confiança `TRUST_POINTS` e os demais pontos que descrevem essa consulta.
- Diferencie **consulta de 60 minutos** do antigo questionário de **60 segundos**. Não faça substituição global de números.
- O pequeno bloco visual dentro do Hero não está marcado com X no PDF. Não o exclua automaticamente por ser interativo. Ajuste suas ações quando apontarem para seções retiradas.
- Redirecione os CTAs que levavam ao questionário ou laboratório para destinos úteis: planos, método ou abertura do agendamento. Ajuste o texto para descrever a ação real.

#### R02 — Página 2: incorporar trajetória e apresentação profissional

A referência correspondente existe na doadora: `src/components/Story.tsx`, com dados e imagem referenciados em `src/assets/images.ts` e `public/images/tannuri/tannuri6.jpg`.

- Incorpore o núcleo “Do Tatame à Consulta: Atenção Absoluta ao Contexto Real”, o retrato e a narrativa profissional compatível com os documentos fornecidos.
- Traga a apresentação completa em modal ou expansão acessível, preservando apenas fatos sustentados pelas fontes do proprietário.
- Adapte cores, tipografia, espaçamento e bordas ao app verde. A seção precisa parecer parte da mesma página.
- Preserve a distinção entre **mestre de jiu-jitsu** e uma titulação acadêmica. Não transforme graduação marcial em mestrado universitário.
- A referência fornecida situa o atendimento em Brasília; a base contém textos de São Paulo e endereço/contato de demonstração. Registre e centralize essa divergência. Use Brasília onde respaldada pelas fontes, mas não invente endereço, telefone, registro profissional ou URL oficial.

#### R03 — Página 3, parte superior: incorporar diplomas e corrigir o certificado indicado

- Monte a galeria de quatro documentos: pós-graduação em nutrição, graduação em nutrição, certificado marcial de 6º grau indicado na anotação e o outro certificado marcial histórico.
- **A seta manda substituir o terceiro documento pelo certificado Fabrício International Team / BJJ Fit Association, 6th Degree, de 2023.** O arquivo amarelo antigo `diploma-jiujitsu-faixa-preta-2.png` da doadora diz quinto grau e não atende à substituição solicitada.
- O kit inclui `assets_correcao/certificado-6-grau-referencia-pdf.png`, um recorte fiel da página 3. Use-o como referência ou imagem provisória. Se houver o original de melhor resolução, prefira-o sem alterar seu conteúdo. Não recrie diploma, assinatura, selo ou titulação com IA.
- Não renomeie o outro diploma de quinto grau como se comprovasse sexto grau. As legendas de cada documento precisam descrever o documento específico.
- Diplomas completos em `object-contain`, miniaturas legíveis, modal com zoom adequado, título, navegação por teclado, Escape e devolução do foco.
- “Documento disponibilizado” é diferente de uma verificação independente. Não acrescente selos de auditoria, homologação ou autenticação que o trabalho não realizou.

#### R04 — Página 3, parte inferior: incorporar os três depoimentos

A fonte correspondente é `src/components/Testimonials.tsx`, com as imagens em `public/images/depoimentos/`:

- Sergio Zimmermann — `depoimento.sergiozimmermann.png`.
- Zaid Mirza — `depoimento.zaid.mirza.png`.
- Rodrigo Francioni Dias — `depoimento.rodrigo.francioni.png`.

Reaproveite os conteúdos fornecidos, a leitura resumida/completa e a abertura da imagem. Preserve o sentido e a autoria das falas; não invente depoimentos, conquistas, números ou garantias de resultado. Se a imagem contiver apenas um retrato, rotule a ação como visualização da imagem, sem tratá-la como prova documental da fala.

Na doadora, `Story` e `Testimonials` dependem de `useDemo`, `openRequestModal` e `logDemoEvent`. Substitua essas dependências por props/callbacks e mecanismos existentes na base, como `onOpenBooking`, `onOpenReviews` e `analytics.track`. Não importe o `DemoProvider`, o fluxo de contato simulado nem a página inteira da doadora. Não transporte eventos com textos pessoais desnecessários.

Reutilize `GoogleAuthorityCard`, `PatientTrustCluster` e o modal de avaliações da base quando apropriado. Não duplique implementações com o mesmo nome, não assuma contratos de props idênticos e não apresente uma nova auditoria de avaliações inexistente.

#### R05 — Página 4: corrigir método, alimentação e composição corporal

Em `src/components/features/MethodSection.tsx` e nas fontes que de fato alimentam a seção:

1. O card visual de alimentação destacado passa a representar **“Marmitaria do Atleta”**, mantendo a imagem disponível se adequada. Descreva organização alimentar compatível com essa proposta; não crie operação de delivery, checkout, cardápio comercial ou serviço de entrega sem dados.
2. Substitua a referência destacada a “Eficiência Mitocondrial & RMR” por **“Exames Laboratoriais, Bioimpedância & TMB”**. Revise frases e métricas ao redor para que não continuem prometendo medições que não são realizadas.
3. No destaque “Massa Magra vs. Gordura Visceral”, use **“Massa Magra e Gordura Corporal”**, conforme a correção do termo apontado.
4. Na comparação, a expressão apontada “Cardápios genéricos” passa a **“Dietas genéricas”**, preservando o sentido da frase. Não renomeie todas as ocorrências de cardápio no sistema.
5. Corrija o equipamento destacado **InBody 770 → InBody 120**.

Não basta trocar o número do equipamento: revise os detalhes, modal, FAQ e respostas que atribuíam recursos do 770 ao serviço. Não prometa ângulo de fase, separação de água intra/extracelular, área visceral ou outras saídas sem documentação específica do 120. TMB não deve ser descrita como medição direta quando for estimativa. Não invente resultados de exames ou validação clínica.

#### R06–R09 — Páginas 5, 6, 7 e 8: retirar quatro blocos da experiência principal

| Requisito | Página | Bloco marcado com X | Componente atual |
|---|---|---|---|
| R06 | 5 | Questionário/resultado de mapeamento inicial | `SmartDiagnostic` |
| R07 | 6 | Laboratório interativo e simuladores | `InteractiveLab` |
| R08 | 7 | Coordenação e vitrine dos programas/protocolos antigos | `ProgramsSection` |
| R09 | 8 | Demonstração do portal do cliente | `ClientPortalPreview` |

Retire esses componentes da montagem da landing page e elimine suas dependências de execução que ficarem sem uso. Não os esconda apenas com CSS e não carregue seus módulos só para mantê-los invisíveis. Não precisa apagar fontes independentes de forma destrutiva; documente o que ficou fora da aplicação.

Revise imports, props, estados, handlers, links, botões flutuantes, FAQ e ações da Clara. Não deixe ações apontando para `diagnostico`, `lab-interativo`, `programas` ou `portal-preview` quando esses elementos deixarem de existir.

**Preserve os quatro planos comerciais**, que são alterados na página 9. Retirar `ProgramsSection` não significa retirar `PlansSection`. Preserve também os add-ons, a seção de evidências/cenários, FAQ e fechamento das páginas 10–12, fazendo os ajustes de consistência necessários.

#### R10 — Página 9: atualizar os quatro planos por modalidade

Esta tabela é a especificação comercial de entrada. Valores em reais, sem inventar parcelamento, descontos, fidelidade ou condições ausentes:

| ID atual do plano | Nome de referência | Online | Presencial | Consulta e retornos |
|---|---|---:|---:|---|
| `diagnostico_inicial` | Diagnóstico Inicial de Precisão | R$ 450 | R$ 750 | 60 min + 1 retorno em 15 dias |
| `programa_metabolico` | Programa Metabolismo 12 Semanas | R$ 1.199 | R$ 1.999 | 60 min + 3 retornos quinzenais; bioimpedância presencial quinzenal |
| `plano_assinatura` | Assinatura Acompanhamento Contínuo | R$ 259 | R$ 429 | 60 min + retornos quinzenais; bioimpedância presencial quinzenal |
| `programa_longevidade_vip` | Performance & Longevidade Integrada | R$ 1.999 | R$ 3.199 | 60 min + 6 retornos quinzenais; bioimpedância presencial quinzenal |

Detalhes obrigatórios:

- A assinatura continua identificada como mensal, coerente com o card do PDF. O PDF **não determina a quantidade** de retornos dela: use `quantity: null` ou estrutura equivalente e exiba “retornos quinzenais”. Não complete com um número por conta própria nem interprete como retornos ilimitados.
- Não calcule nova duração total para o plano “12 Semanas” a partir dos três retornos. Preserve o nome de referência e registre que o calendário completo das 12 semanas não é detalhado pelo PDF.
- Diferencie os retornos das 60 min da consulta principal. A duração de cada retorno não está definida no documento e não deve ser inventada no calendário.
- “Bioimpedância presencial quinzenal” não se transforma em exame remoto, envio de equipamento, atendimento em clínica parceira ou deslocamento incluso. Preserve explicitamente a modalidade presencial desse exame.
- No programa metabólico, a anotação substitui a menção destacada de acesso ao portal por **“App Webidiet”**. Use esse rótulo do PDF em configuração editável e registre a grafia/URL oficial como informação a confirmar. Não afirme que uma API, login ou sincronização externa já existe. Se não houver URL confiável, mantenha a menção informativa sem um botão enganoso.
- Na assinatura, substitua o item apontado “Check-ins quinzenais...” por **“Retornos quinzenais”**.
- No plano VIP, descreva os seis retornos indicados na tabela, sem somar automaticamente os três de outro plano para anunciar nove, e retire os dois itens cruzados: sincronização direta com plano de treino/periodização esportiva e acompanhamento/interpretação de CGM.
- A anotação risca “meal prep” no item VIP: adapte para **“Consultoria de estratégias alimentares para viagens de negócios”**, sem reintroduzir o termo removido. Isso não elimina o add-on independente de cozinha da página 10.
- Remova condições antigas de parcelamento dos planos afetados, pois os novos parcelamentos não foram fornecidos. Não replique o texto “3x de...” dos preços anteriores.
- Demais benefícios não marcados podem ser preservados quando coerentes; elimine ou adapte referências a módulos retirados e serviços que não existam.

#### R11 — Página 10: bioimpedância como add-on de R$ 99 e equipamento InBody 120

No serviço `bioimpedancia_inbody`:

- Preço exibido: **R$ 99**; valor numérico equivalente: **99 reais / 9.900 centavos**, conforme o padrão escolhido.
- Nome do equipamento: **InBody 120**.
- Atualize card, detalhes, dados técnicos verificados, catálogo do agendamento, total de adicionais, mensagem do WhatsApp e respostas da Clara.
- Preserve o atendimento presencial e a duração de 20 min já descritos para o exame, salvo nova fonte explícita que os altere. A regra de 60 min se refere às consultas dos planos.
- Não altere automaticamente o preço dos outros dois add-ons da captura: sensor, R$ 490; consultoria de cozinha, R$ 280. A remoção do CGM de um benefício VIP não exclui seu card independente.

#### R12 — Páginas 10, 11 e 12: preservar fechamento com consistência

Não há anotação específica de exclusão nessas páginas para evidências/cenários, FAQ, CTA final ou rodapé. Preserve seus papéis, retirando contradições criadas pelas mudanças anteriores:

- FAQ, CTA e assistente não devem oferecer o laboratório removido ou o portal demonstrativo.
- O CTA final precisa informar 60 min para a primeira consulta, sem preço antigo.
- Navegação, mensagens e benefícios não podem prometer módulos sem destino.
- Mantenha a distinção entre cenários ilustrativos e depoimentos atribuídos. Não transforme cenários em resultados de pacientes reais.

### 6. Arquitetura de integração e fonte única dos dados

Implemente uma fonte compartilhada e tipada para **preço por modalidade, periodicidade, duração da consulta principal, retornos, equipamento e disponibilidade**. Pode ser uma evolução de `canonicalCatalog.ts` ou um módulo puro importável por cliente e servidor. Escolha a menor mudança sustentável.

O dado comercial não pode continuar escrito separadamente em cards, `BOOKING_SERVICES`, prompt da Clara e respostas alternativas. Gere as representações a partir desse contrato. Separe a descrição institucional de condições de contratação.

Campos mínimos equivalentes, sem obrigar estes nomes:

```ts
type Modality = 'online' | 'presencial';
type BillingPeriod = 'one_off' | 'monthly';

interface CareOffer {
  id: string;
  name: string;
  priceCentsByModality: Record<Modality, number>;
  billingPeriod: BillingPeriod;
  initialConsultationDurationMinutes: number;
  returns: { quantity: number | null; intervalDays: number };
  inPersonBioimpedance?: { device: 'InBody 120'; intervalDays: number };
}
```

- Mantenha a modalidade escolhida por uma única fonte de estado, com seletor acessível. Antes da escolha, mostre os dois preços ou “Online: ... / Presencial: ...”. Um preço “a partir de” só é aceitável com as modalidades imediatamente claras.
- O modal de agendamento deve receber o ID correto do plano e a modalidade selecionada. O snapshot tem IDs divergentes; faça uma reconciliação explícita e testada. Não use seleção silenciosa de outro serviço como fallback.
- Formate reais a partir de valores numéricos em uma função compartilhada. Não extraia preços de strings para somar.
- Aplique a mesma fonte ao resumo, aos links de WhatsApp e ao contexto da Clara. Respostas sobre preço/serviço devem usar dados determinísticos; o modelo não escolhe números livremente.
- Atualize tanto o `aiSkillEngine.ts` quanto o prompt e as respostas alternativas em `server.ts`. Não preserve preços de protocolos removidos nas respostas de fallback quando a API estiver sem chave ou falhar.
- Não envie instruções à Clara para abrir âncoras retiradas. Ofereça plano, método, contato ou agendamento disponíveis.
- Corrija `calendarIcs.ts` para usar duração numérica explícita do atendimento que será exportado, inclusive no link de calendário. Não use `duration.includes('20')` nem duração de pacote como duração de uma consulta.
- O calendário deve refletir a consulta principal de 60 min; não invente ou reserve toda uma série de retornos sem horários e duração confirmados.
- O código possui horários demonstrativos. Preserve a distinção entre simulação/solicitação e reserva efetiva. Não conclua que existe agenda clínica conectada apenas porque um código ou arquivo ICS foi gerado.
- Não acrescente integrações externas, banco de dados, autenticação ou dependências grandes para cumprir mudanças de conteúdo e composição.

### 7. Sequência de execução

**Etapa A — Conferir base e estabelecer referência**

Leia os arquivos de entrada, identifique as correspondências acima e registre o estado inicial. Se houver Git, preserve mudanças locais e registre o estado sem reset/force-push. Execute as verificações existentes disponíveis para separar falhas anteriores das novas. Se o projeto aberto não for a base correta, identifique o desvio antes de editar esse alvo.

**Etapa B — Consolidar dados e contratos**

Corrija valores, modalidades, IDs, durações, retornos e InBody 120 na fonte de verdade. Adapte tipos e consumidores. Registre como pendências localizadas a quantidade dos retornos da assinatura, calendário completo do plano de 12 semanas, duração dos retornos e grafia/URL do app externo.

**Etapa C — Integrar somente os módulos da doadora indicados**

Adapte trajetória, diplomas e depoimentos; copie apenas os assets necessários; corrija o certificado de 6º grau e legende os diplomas históricos corretamente. Remova `useDemo` dos componentes portados, conecte os callbacks da base e adapte o design.

**Etapa D — Recompor a página e os destinos**

Remova os quatro blocos marcados. Uma composição de referência é: Hero → confiança → trajetória/diplomas → depoimentos → método/Marmitaria → planos/add-ons → evidências/cenários → FAQ → contato → rodapé. Ajuste pequenas posições pela narrativa sem omitir requisitos. Atualize navegação desktop/mobile, CTAs, identificação das seções e ações da Clara.

**Etapa E — Conferir ponta a ponta e corrigir regressões**

Valide site, plano selecionado, modalidade, modal, resumo, WhatsApp, calendário e respostas locais/servidor da Clara. Corrija as diferenças encontradas e entregue o resultado no preview com relatório de evidências.

Se a doadora não puder ser lida, conclua os demais requisitos e identifique exatamente os componentes/assets ausentes. Não apresente uma reprodução inventada como se tivesse sido portada.

### 8. UX, interação, acessibilidade e responsividade

- Preserve as fontes e o sistema visual predominante da base. Não importe o tema bege inteiro nem a stack de estilos da doadora.
- Trajetória com hierarquia clara, texto confortável e foto com proporção natural; diplomas sem recortes; depoimentos com leitura curta e expansão explícita.
- Cards comerciais com preços e modalidade fáceis de comparar; sem rolagem horizontal obrigatória em telas estreitas.
- Verifique 360, 390, 768, 1024 e 1440 px, além de zoom de texto. Foco visível, nomes acessíveis e alvos de interação confortáveis.
- Modais: `role="dialog"`, nome acessível, foco inicial, contenção de foco, Escape, restauração do foco e rolagem do conteúdo sem travar o fechamento no celular.
- Respeite preferência por movimento reduzido. Evite animações que dificultem leitura ou produzam deslocamentos de layout.
- Assets com caminhos existentes, proporção reservada e carregamento diferido quando fora da primeira tela. Não regenere fotos profissionais, documentos ou depoimentos com IA.
- O acionador flutuante da Clara não deve cobrir preço, navegação ou botões do modal em telas pequenas.
- Apresente apenas estados úteis ao visitante. Pendências de configuração e relatórios técnicos ficam na documentação de entrega.

### 9. Verificação e critérios de aceite

Execute o que existir no ambiente e marque corretamente `PASS`, `FAIL`, `NOT_RUN` ou `PENDENTE_DE_INSUMO`. Não declare QA visual sem abrir o preview e não declare build concluído sem executar o comando.

Verificações mínimas:

1. `npm run lint` e `npm run build` do projeto-base, quando o ambiente permitir; suíte existente, se houver. Não use `npm ci` sem lockfile compatível. Não copie dependências da doadora para contornar falhas.
2. Testes dirigidos do resolver de preços/modalidade e da duração do calendário, usando os recursos já disponíveis ou a menor infraestrutura adequada. Verificar todos os quatro planos nas duas modalidades e o add-on de R$ 99.
3. Cada card abre o serviço correspondente; trocar modalidade atualiza preço, resumo e mensagem sem reaproveitar valor antigo.
4. Nenhum clique público tenta alcançar as quatro seções retiradas. Isso inclui ações sugeridas pela Clara, navegação mobile e footer.
5. Trajetória, quatro diplomas e três depoimentos abrem seus conteúdos reais; nenhuma dependência de `DemoProvider` é necessária para renderizá-los.
6. O terceiro diploma usa o documento de 6º grau indicado; o histórico de quinto grau não recebe legenda enganosa.
7. A primeira consulta aparece como 60 min na confiança, FAQ, CTA, agenda, Clara e calendário. O add-on mantém sua duração específica.
8. A bioimpedância custa R$ 99 no card, modal, agenda, total e WhatsApp; o serviço se refere ao InBody 120 em todos os consumidores ativos.
9. Clara informa os preços da modalidade correta e não recomenda protocolos/links retirados; teste também a resposta alternativa sem chamar um modelo pago apenas para conferir preços.
10. Confira manualmente o preview nas larguras definidas, teclado e modais. Console sem novos erros de execução e sem assets ausentes introduzidos.

Faça uma busca dirigida nos arquivos de execução por valores e termos antigos: `75 min`, `75 minutos`, `InBody 770`, `R$ 380`, `R$ 1.890`, `R$ 290`, `R$ 2.450`, `R$ 1.680`, `R$ 4.400`, `R$ 3.200`, `R$ 4.800`, `R$ 3.600` e pelas âncoras removidas. Um achado só é corrigido quando pertence ao serviço afetado; não altere documentação histórica, datas, faixas numéricas ou preço de outro serviço por substituição cega.

“Sem ocorrências na busca” não basta: inspecione o comportamento e os dados dinâmicos. Registre o que foi verificado por código, teste ou preview.

### 10. Entrega e continuidade

Entregue código alterado e preview funcional. Gere um relatório curto em `docs/CORRECOES_PDF_DRTANNURI.md`, ou equivalente, com:

- Matriz final de R01–R12: fonte, arquivos alterados, evidência de aceite e estado.
- Conteúdos incorporados, blocos retirados e destinos substitutos.
- Fonte única adotada e tabela final de preços/modalidades.
- Verificações realmente executadas e seus resultados.
- Pendências factuais localizadas, incluindo contatos/URLs de demonstração identificados, sem inventar sua correção.
- Limites que ainda impeçam confirmar uso real de agenda ou integração externa.

Não considere uma etapa concluída só porque deixou um TODO. Ao acabar, informe claramente o que está implementado, o que está validado e o que depende de insumo. Continue autonomamente nas demais entregas quando uma pendência for independente.

Comece conferindo a identidade do projeto, leia o PDF e os arquivos indicados e execute a integração seletiva até chegar ao preview e aos critérios de aceite disponíveis.

## FIM DO COMANDO DE EXECUÇÃO

---

## Referências consultadas na preparação

- PDF do proprietário: `Correção Site Drtannuri 1.pdf`, 12 páginas; marcações confrontadas visualmente com os fontes dos dois ZIPs.
- Documentação oficial do [Google AI Studio — Build apps](https://ai.google.dev/gemini-api/docs/aistudio-build-mode), consultada em 19/10/2026: edição iterativa no projeto existente, gestão de múltiplos arquivos e separação do ambiente de servidor.
- Referência oficial de [interpretação de resultados InBody 120](https://qr.inbody.com/ri/120/adult/pt-BR), para orientar a checagem das descrições do equipamento. A preparação deste prompt não certifica equipamentos, documentos, dados comerciais ou resultados clínicos.
