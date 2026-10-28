# Contrato de aceite incremental

Aplicar ao **projeto aberto no AI Studio** depois das alterações. Para cada item, marcar `PASSOU`, `FALHOU`, `BLOQUEADO POR DADO EXTERNO` ou `NÃO TESTADO`; anexar arquivo/diff e resultado do teste. Inspeção de código, preview, serviço e deploy são evidências diferentes. Não classificar item como aprovado apenas por existir texto novo.

## A. Estado dos 22 requisitos

| Grupo | Esperado | Evidência mínima |
|---|---|---|
| R06/R08/R09/R12/R13/R16/R17 | Núcleos preservados, sem reinserção de galeria/SimLab/protocolos/portal antigo. | `App.tsx`, componentes ativos, catálogo e snapshot antes/depois. |
| R01–R03/R05/R07/R10–R11/R14–R15/R18–R19/R21–R22 | Correções apenas nos deltas auditados; sem regressão de conteúdo ou navegação. | Tabela individual por ID, diff, preview relevante. |
| R04 | Faixa visual coerente e responsiva; cada número/país mostrado possui aprovação do cliente, sem trecho Google 5.0 herdado. | Origem da afirmação ou cartão omitido; screenshot móvel/desktop. |
| R20 | Estado de agenda corresponde a integração demonstrada; não declara reserva ou mensagem inexistente. | Fluxo real e, se alegado, confirmação de backend persistente, disponibilidade e despacho. |

## B. Catálogo e modalidade

Executar a matriz por ID e comparar **vitrine, card, resumo, triagem, confirmação/pedido, calendário se existente, API e resposta comercial da IA**. Nenhuma etapa pode exibir uma string com ambos os preços depois de escolhida a modalidade.

| ID | Online | Presencial | Periodicidade/retornos |
|---|---:|---:|---|
| `diagnostico_inicial` | R$ 450 | R$ 750 | único; 1 retorno; consulta 60 min |
| `programa_metabolico` | R$ 1.199 | R$ 1.999 | único; 3 retornos quinzenais; consulta 60 min |
| `plano_assinatura` | R$ 259/mês | R$ 429/mês | mensal; retornos quinzenais, quantidade não definida |
| `programa_longevidade_vip` | R$ 1.999 | R$ 3.199 | único; 6 retornos quinzenais; consulta 60 min |

Adicionais: bioimpedância R$ 99 só presencial/20 min; sensor R$ 490/14 dias de uso, **duração de atendimento desconhecida**; consultoria de cozinha R$ 280 online/60 min. Os três somam R$ 869 (sem descontos inventados). Para seleção indevida de bioimpedância online, bloquear ou explicar modalidade. Preço em centavos deriva de um módulo compartilhado; a API recalcula a cotação. Uma alteração controlada em um preço de fixture/teste deve refletir em todos os consumidores, sem edição manual de cinco arquivos.

Casos essenciais: assinatura mensal mostra “/mês” em todas as telas; Online não exibe bioimpedância presencial inclusa; consulta inicial não promete exame grátis; sensor não vira consulta de 60 minutos por default; `plano_assinatura` é o ID da assinatura. O assistente com Gemini **ativo** também responde preço a partir dos dados canônicos, não apenas o fallback sem rede.

## C. Jornada de agendamento

1. Escolher uma oferta/modalidade deve preservar ID, modalidade e preço até o fim. Header deve abrir um destino existente e acessível.
2. Em ausência de integração comprovada, a UI mostra **preferência de horário** e **solicitação não enviada**; não há vaga “livre”, código de reserva, “consulta confirmada”, “e-mail enviado” nem redirecionamento para WhatsApp placeholder.
3. Se houver serviço real na versão aberta, falha de rede, dupla submissão e conflito de horário devem resultar em erro/pedido pendente, nunca sucesso falso. Declaração de envio exige resposta efetiva do serviço. Lead somente em memória não justifica promessa de contato posterior.
4. Com preferência pendente, não gerar calendário `STATUS:CONFIRMED`. Se emitir lembrete, nome e status deixam explícito que é **não confirmado**. Em reserva real, converter corretamente horários civis em `America/Sao_Paulo`, inclusive visitante em outro fuso; formato ICS/Google Calendar reflete a modalidade, duração e estado real.
5. Texto de endereço presencial é Brasília (DF), sem “Jardins SP” ou endereço deduzido. Teleconsulta e atendimentos presenciais não recebem instruções da modalidade oposta.

## D. Conteúdo, visual e segurança

- Marca pública consistente em título, metadados, aria labels, alt, interface e respostas, sem alterar domínio/IDs por busca global. Links externos e WhatsApp só são ativos com destino confirmado. CRN e localização detalhada dependem de validação.
- A fotografia que contém “InBody 770” é removida/substituída por foto comprovada de 120 ou peça neutra; corrigir apenas alt/legenda **não passa**. Conferir o `imageAssets.ts` e a renderização final.
- Certificado em terceiro lugar e quatro credenciais ainda ampliáveis; os três testemunhos e atribuições continuam; nenhum selo sugere autenticação independente sem prova. Não reescrever citação histórica sobre duração: validar/ocultar contexto contraditório.
- Google Reviews estáticas (nota/contagem), +2.000 pacientes, +1.000 alunos, +100 seminários, países e alegações clínicas só aparecem se aprovadas com fonte. A ausência de confirmação deve ser explicitada no relatório, não preenchida pelo modelo.
- URLs sob `public/` não servem PDF integral do cliente, superprompt, matriz, relatório, hashes ou TSX de referência; imagens públicas necessárias continuam disponíveis. Eventos analíticos não incluem texto livre como `originPrompt`/`queryText`, dados de saúde ou PII.

## E. Usabilidade e validação técnica

- `npm run lint` e `npm run build` executados com dependências presentes; registrar saída e erros literais. Não atribuir falha de `tsc: not found`/`vite: not found` a defeito do código sem instalar dependências.
- Preview manual em 360, 390, 768 e 1440 px e zoom de 200%; sem overflow, truncamento de preços, controles inalcançáveis ou texto ilegível.
- Teclado: abrir, navegar, fechar com Escape e restaurar foco dos modais; cartões/botões ativáveis com Enter/Espaço; texto alternativo útil; `prefers-reduced-motion` reduz animações não essenciais.
- Sem novas promessas de “ao vivo”, envio, reserva, portal próprio, integração Webidiet, equipamento ou registro que o código/cliente não sustentem.

### Modelo de relatório final do Gemini

| ID | Ação tomada | Arquivo(s) | Evidência de aceite | Dado externo pendente |
|---|---|---|---|---|
| R01 | … | … | PASSOU/FALHOU/BLOQUEADO/NÃO TESTADO | … |

Depois da tabela R01–R22, listar comandos e resultados, cenários de fluxo executados, bugs residuais, diferença entre preview e produção, e dados a serem confirmados pelo cliente. Nenhum teste no preview prova por si só que os dois domínios publicados foram atualizados.
