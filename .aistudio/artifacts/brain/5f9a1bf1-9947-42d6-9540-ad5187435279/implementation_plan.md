# Arquitetura Tree of Thoughts (ToT): Jornada do CTA & Gestão de Agendamento Online

Plano diretor para estruturar a jornada completa do CTA "Ver Agenda Online", integrando a pré-triagem clínica do paciente à agenda em tempo real do Dr. Luiz Tannuri (Google Calendar), persistência interna para inteligência de conversão (Firestore + Painel Administrativo) e espelhamento operacional na recepção (Google Sheets + WhatsApp).

---

### User Review & Critical Decisions

> [!IMPORTANT]
> **Decisões Confirmadas com o Usuário na Fase 1:**
> - **Sincronização de Agenda Principal**: Google Calendar da clínica em tempo real para visualização e bloqueio de slots do Dr. Luiz Tannuri.
> - **Gestão e Inteligência de Dados**: Arquitetura híbrida com **Banco de Dados em Nuvem (Firestore)** alimentando um **Painel Administrativo Interno de Conversão**, associado a espelhamento/exportação em **Google Sheets** para a equipe de recepção.
> - **Experiência do Paciente no CTA**: Funil de alta conversão combinando **Pré-triagem Clínica em Etapas (3 passos)**, seleção de data/horário preferencial com confirmação de protocolo, e acionamento inteligente com pré-briefing formatado para o **WhatsApp oficial da recepção**.

- **Decisão Técnica de Infraestrutura**: O app já opera em Cloud Run (`drtannuri-web`). A camada de dados utiliza Firestore estruturado com regras estritas de segurança, mantendo alta performance e sem dependência de servidores complexos.

---

### 1. Overview & Core Concept

- **O Que Faz**: Transforma o botão "Ver Agenda Online" de um simples formulário modal em um funil de agendamento inteligente e consultivo. O paciente passa por uma triagem objetiva (objetivo clínico, histórico, modalidade presencial em Brasília ou teleconsulta), escolhe uma janela horária real, gera um protocolo oficial e é acolhido com agilidade pela recepção. Internamente, cada solicitação é registrada no banco de dados com métricas de funil, status de negociação e sincronização de eventos.
- **Público-Alvo**: Atletas amadores e profissionais, executivos de alto rendimento, pacientes com rotina de viagens e indivíduos que buscam emagrecimento com preservação de massa magra pelo método do Dr. Luiz Tannuri.
- **Valor Central**: Elimina o atrito do agendamento frio, assegura que o Dr. Tannuri e sua recepção recebam o paciente já qualificado com contexto metabólico, e fornece dados analíticos sobre quais planos (Diagnóstico Inicial, 12 Semanas, Recorrente ou VIP) geram maior demanda e taxa de fechamento.

---

### 2. Avaliação do Estado Atual & Framework Tree of Thoughts (ToT)

#### Avaliação do Estado Atual (Baseline)
1. **Frontend / UI**: Existe um `BookingModal.tsx` funcional com 4 passos e um catálogo canônico de serviços (`BOOKING_SERVICES` e `canonicalOffers.ts`), porém os agendamentos geram apenas um protocolo em memória e download de arquivo `.ics` genérico.
2. **Backend / APIs**: O `server.ts` possui apenas um array volátil em memória (`leadStorage = []`) e rotas para a concierge de IA (`/api/concierge`), sem banco de dados persistente conectado nem painel de gestão para a secretária/médico.
3. **Comunicação**: O botão do WhatsApp monta uma mensagem básica, mas não envia dados estruturados ao sistema nem atualiza o status de atendimento da clínica.

#### Árvore de Pensamentos (Tree of Thoughts - ToT)

```
                       [Objetivo: Otimizar CTA e Agenda Online]
                                         │
        ┌────────────────────────────────┼────────────────────────────────┐
        ▼                                ▼                                ▼
  [Ramo A: Direto / WhatsApp]     [Ramo B: SaaS Completo]     [Ramo C: Híbrido Clínico de Elite]
  - Apenas link direto wa.me      - Pagamento antecipado       - Pré-triagem em 3 etapas
  - Zero atrito inicial           - Confirmação cega           - Sincronia Google Calendar
  - Sem dados internos estrut.    - Bloqueio rígido de agenda  - Banco Firestore + Painel CRM
  - Alta perda de leads           - Fricção excessiva p/ VIP   - WhatsApp com protocolo prévio
  (Score: 4.5/10 - Fraco)         (Score: 6.8/10 - Rígido)     (Score: 9.6/10 - VENCEDOR)
```

- **Ramo A (Link Rápido Sem Triagem)**: Rápido de implementar, porém gera conversas desorganizadas no WhatsApp, sem dados para saber quais serviços atraem mais clientes e sem controle de horários.
- **Ramo B (Checkout Fechado Imediato)**: Exige pagamento antes do contato humano. Para consultas médicas e nutricionais de ticket premium (R$ 450 a R$ 3.199), gera abandono de funil superior a 65%.
- **Ramo C (Híbrido de Alta Precisão - Selecionado)**: 
  1. *Fase 1 (Atração & Triagem)*: O paciente navega pelos planos, clica no CTA e responde a 3 etapas concisas (Modalidade + Objetivo Clínico + Janela de Horário).
  2. *Fase 2 (Registro & Conexão)*: O sistema persiste a intenção no Firestore, dispara evento para o Google Calendar do consultório e gera link para a planilha da recepção.
  3. *Fase 3 (Firmamento do Serviço)*: O paciente recebe o protocolo na tela e um botão de ação imediata que abre o WhatsApp já com a mensagem clínica formatada, enquanto a clínica visualiza o lead no Painel Administrativo Interno com indicadores de conversão.

---

### 3. User Experience & Visual Design

#### Fluxo do Usuário (Passo a Passo)
1. **Gatilho (CTA Principal)**: O usuário clica em "Ver Agenda Online" no Header, no Hero ou em qualquer um dos 4 planos canônicos.
2. **Etapa 1 - Modalidade & Serviço**: Seleção nítida entre *Presencial em Brasília (DF)* e *Telemedicina HD*, com pré-seleção do serviço escolhido e cálculo canônico transparente.
3. **Etapa 2 - Preferência de Agenda & Sincronia**: Calendário visual moderno com indicação de dias úteis, turnos (Manhã, Tarde, Noturno) e recomendação de jejum para bioimpedância InBody 120.
4. **Etapa 3 - Triagem Clínica de Precisão**: Coleta de Nome, WhatsApp, E-mail, Objetivo Principal (Recomposição corporal, Performance em artes marciais/esportes, Longevidade ou Acompanhamento de viagens) e histórico prévio.
5. **Etapa 4 - Confirmação, Protocolo & Ação**: Apresentação do recibo oficial com código único (ex: `LNZ-78421`), adição direta ao Google Calendar pessoal do paciente e botão destacado para prosseguir no WhatsApp oficial.
6. **Painel do Proprietário (/admin)**: Ambiente protegido para o Dr. Tannuri e sua equipe visualizarem métricas de conversão (leads recebidos, taxa por plano, modalidades mais buscadas), alterarem status (Novo, Em Contato, Confirmado, Realizado) e exportarem para Google Sheets.

#### Identidade Visual & Diretrizes de Design
- **Paleta de Cores**: Verde Botânico (`#1B4D24`), Verde Clorofila (`#72B818`), Lima Elétrica (`#AEE938` como realce cirúrgico), Fundo Névoa Suave (`#EDF4EA` / `#F4FAF0`) e Tipografia em Ardósia Florestal Profunda (`#0A160F`).
- **Disciplina Anti-Slop (Frontend Design Skill)**: Zero badges de pílulas redundantes em cabeçalhos, sem cartões dentro de cartões, tipografia display elegante com tracking ajustado, e controles interativos com respostas táticas (micro-interações e feedback háptico).
- **Acessibilidade**: Contraste auditado WCAG AA (4.5:1), alvos de toque superiores a 44px e total responsividade para dispositivos móveis (foco no uso em smartphones).

---

### 4. Key Product Decisions & Trade-Offs

- **Decisão 1: Armazenamento em Nuvem com Firestore**
  - *Abordagem*: Utilizar o Firestore como banco NoSQL serverless para a coleção `appointments` e `leads`.
  - *Por quê*: Permite sincronização em tempo real (`onSnapshot`), segurança por documento (ABAC), altíssima disponibilidade no Google Cloud e integração nativa com o ecossistema do applet.
  - *Alternativa descartada*: Armazenar apenas em memória no Node.js (perderia dados a cada deploy ou reinicialização do Cloud Run).

- **Decisão 2: Integração com Google Calendar e Google Sheets**
  - *Abordagem*: 
    - Para o paciente: Geração imediata de link direto do Google Calendar e download de `.ics` com dados enriquecidos (local do consultório em Brasília, link de teleconsulta e instruções de preparo de jejum para bioimpedância).
    - Para a clínica: API integrada com escopos do Google Workspace (`calendar.events` e `spreadsheets`) para sincronizar a agenda do Dr. Tannuri e manter a planilha da secretária atualizada.
  - *Por quê*: O Dr. Tannuri já utiliza o Google Calendar no smartphone e computador; nenhuma curva de aprendizado extra é imposta à clínica.

- **Decisão 3: Protocolo Estruturado no WhatsApp**
  - *Abordagem*: O clique de confirmação transfere todo o resumo clínico já digitado para o chat oficial (+55 61 9 9128-3139), poupando tempo da recepção e do paciente.

---

### 5. Technical Architecture & Data Strategy

#### Diagrama de Arquitetura do Sistema

```
┌────────────────────────────────────────────────────────────────────────┐
│                        VISITANTE / PACIENTE                            │
│  - Hero / Navbar / Seção de Planos                                     │
│  - CTA: "Ver Agenda Online"                                            │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                       MODAL DE AGENDAMENTO (4 PASSOS)                  │
│  Passo 1: Modalidade & Serviço (Canônico)                              │
│  Passo 2: Data & Janela de Horário                                     │
│  Passo 3: Triagem Metabólica & Contato                                 │
│  Passo 4: Protocolo Gerado & Redirecionamento                          │
└──────────────┬───────────────────────────────┬─────────────────────────┘
               │                               │
               ▼                               ▼
┌──────────────────────────────┐ ┌──────────────────────────────────────┐
│     CLIENTE / PACIENTE       │ │           SERVIÇO BACKEND            │
│  - Adicionar ao Google Cal   │ │  - Validação Canônica (anti-tamper)  │
│  - Abrir WhatsApp Recepção   │ │  - API /api/appointments             │
│  - Download arquivo .ics     │ │  - API /api/admin/metrics            │
└──────────────────────────────┘ └──────────────────┬───────────────────┘
                                                    │
                   ┌────────────────────────────────┴──────────────────┐
                   ▼                                                   ▼
┌──────────────────────────────────────┐ ┌─────────────────────────────────────┐
│          FIRESTORE CLOUD DB          │ │          PAINEL ADMIN (CRM)         │
│  - Coleção: appointments             │ │  - Visão geral de novos leads       │
│  - Coleção: leads_analytics          │ │  - Status: Novo / Confirmado        │
│  - Regras de segurança estritas      │ │  - Exportação Google Sheets / CSV   │
└──────────────────────────────────────┘ └─────────────────────────────────────┘
```

#### Modelo de Dados (Coleção `appointments`)
```typescript
interface AppointmentDocument {
  id: string; // Ex: SOL-84920
  patient: {
    fullName: string;
    whatsApp: string;
    email: string;
    primaryGoal: string;
    notes?: string;
  };
  service: {
    id: string;
    name: string;
    category: string;
    priceCents: number;
    modality: 'online' | 'presencial';
  };
  schedule: {
    date: string; // YYYY-MM-DD
    slotId: string;
    slotLabel: string;
    period: 'manha' | 'tarde' | 'noite';
    isFastingRecommended: boolean;
  };
  status: 'pendente' | 'em_contato' | 'confirmado' | 'cancelado' | 'realizado';
  source: 'cta_header' | 'cta_hero' | 'cta_plan' | 'cta_concierge';
  createdAt: string; // ISO 8601
  updatedAt: string;
}
```

---

### 6. Roteiro de Execução Passo a Passo

1. **Configuração dos Serviços de Nuvem**:
   - Provisionar banco Firestore e autenticação necessária para proteger o acesso administrativo.
   - Configurar regras de segurança seguras no Firestore (`firestore.rules`).
2. **Atualização do Backend (`server.ts`)**:
   - Criar rotas `/api/appointments` (registro com validação canônica de valores e prevenção contra injeção de preços adulterados).
   - Criar rotas analíticas `/api/admin/appointments` com filtros de período e status.
3. **Aprimoramento do Funil de Agendamento (`BookingModal.tsx` & componentes)**:
   - Integrar a gravação assíncrona ao avançar para a confirmação.
   - Adicionar link dinâmico de inserção direta no Google Calendar (com todos os metadados da consulta pré-carregados).
   - Otimizar o botão de WhatsApp com formatação elegante de mensagem para a recepção da clínica.
4. **Criação do Painel Interno de Gestão do Proprietário**:
   - Visualização de solicitações recebidas, gráfico de planos mais solicitados e controle de status de atendimento.
   - Opção de exportação para Google Sheets / CSV com um clique.
5. **Verificação & Testes**:
   - Teste de ponta a ponta do funil no desktop e no mobile.
   - Execução de `compile_applet` para assegurar build sem erros.
