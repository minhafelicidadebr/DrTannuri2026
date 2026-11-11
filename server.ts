import express from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer } from "vite";
import {
  COMMERCIAL_OFFERS,
  COMMERCIAL_ADDONS,
  getQuoteForOffer,
  formatBRL,
  CLINIC_CONFIG
} from "./src/data/canonicalOffers";

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// In-memory rate limiting map: ip -> { count, resetTime }
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);
  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60000 });
    return true;
  }
  if (limit.count >= 20) {
    return false;
  }
  limit.count++;
  return true;
}

// ============================================================================
// MOTOR CLÍNICO INTERNO AUDITADO (ZERO CUSTO / SEM CHAVE DE API EXTERNA)
// Arquitetura: Rigor Científico + Transparência Comercial + Diretrizes CFN/CRN
// ============================================================================
function normalizeText(input: string): string {
  return (input || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function resolveClinicalAssistantReply(userMessage: string, _context?: unknown): string {
  const q = normalizeText(userMessage);

  // 1. Filtro de Emergência Clínica
  if (q.includes("dor") && (q.includes("peito") || q.includes("grave") || q.includes("desmaio") || q.includes("sangue") || q.includes("falta de ar"))) {
    return "Atenção: Para sintomas agudos súbitos, dores intensas no peito, falta de ar ou desmaios, orientamos buscar imediatamente uma unidade de pronto-atendimento hospitalar. Sua integridade biológica vem sempre em primeiro lugar.";
  }

  // 2. Filtro Regulatório CFN/CRN (Medicamentos e Fármacos)
  if (q.includes("remedio") || q.includes("medicamento") || q.includes("receita") || q.includes("ozempic") || q.includes("droga") || q.includes("wegovy") || q.includes("mounjaro") || q.includes("anabolizante")) {
    return "Como Concierge Educativa do Dr. Luiz Tannuri, não realizamos prescrição de fármacos ou medicamentos controlados. Nosso foco é a **nutrição esportiva e clínica baseada em comida de verdade**, dados de bioimpedância InBody 120 e estilo de vida sustentável.\n\nCaso você já faça uso de medicação orientada por seu médico assistente, o atendimento nutricional atua em total sinergia técnica e respeito à conduta médica.\n\n**Evidência Científica Auditada:**\n• [Conselho Federal de Nutricionistas: Resolução CFN 666/2020](https://www.cfn.org.br)\n\nGostaria de agendar seu Diagnóstico Inicial de 60 minutos?";
  }

  // 3. Eixos Fisiológicos do Hero (Flexibilidade Metabólica, Estabilidade Circadiana, Microbiota)
  if (q.includes("flexibilidade metabolica") || (q.includes("metabolismo") && !q.includes("12 semanas") && !q.includes("valor") && !q.includes("preco"))) {
    return "Na abordagem de **Flexibilidade Metabólica** do Dr. Luiz Tannuri, treinamos seu organismo para alternar com eficiência entre carboidratos e gorduras como substrato energético, eliminando picos de fome e oscilações bruscas de glicemia.\n\n• **Timing Proteico e Densidade Nutricional**: Ajuste individual de macronutrientes conforme seu gasto real e horário de treino.\n• **Preservação de Massa Magra**: Monitoramento direto via bioimpedância InBody 120 (nos atendimentos presenciais em Brasília).\n\n**Evidência Científica Auditada:**\n• [JISSN: Timing de Macronutrientes e Composição Corporal](https://jissn.biomedcentral.com)\n\nDeseja avaliar seu perfil metabólico no Diagnóstico Inicial de 60 minutos?";
  }

  if (q.includes("estabilidade circadiana") || q.includes("cansaco") || q.includes("sono") || q.includes("energia")) {
    return "O eixo de **Estabilidade Circadiana** alinha o aporte de micronutrientes, hidratação e carga glicêmica das refeições ao seu relógio biológico — eliminando aquela queda de rendimento às 15h e favorecendo o sono reparador.\n\n• **Sem Restrições Punitivas**: Refeições estruturadas para sustentar foco cognitivo no trabalho e potência física nos treinos.\n• **Ajuste Fino de Rotina**: Adaptado aos seus horários reais de despertar, trabalho e atividade física.\n\n**Evidência Científica Auditada:**\n• [PubMed Central: Sequenciamento Alimentar e Estabilidade Glicêmica](https://pubmed.ncbi.nlm.nih.gov)\n\nQuer explorar qual plano se adapta melhor à sua rotina?";
  }

  if (q.includes("microbiota") || q.includes("digestao") || q.includes("intestino") || q.includes("inchaco") || q.includes("estomago")) {
    return "Na **Modulação da Microbiota e Vitalidade Digestiva**, identificamos gatilhos inflamatórios individuais e introduzimos estrategicamente fibras prebióticas e compostos bioativos para reduzir distensão abdominal e otimizar a absorção de nutrientes.\n\n• **Princípio de Adição antes de Subtração**: Evolução gradual para conforto gástrico duradouro.\n• **Impacto Direto na Performance**: Um intestino equilibrado melhora imunidade, humor e recuperação muscular.\n\n**Evidência Científica Auditada:**\n• [PubMed Central: Eixo Intestino-Metabolismo na Nutrição Clínica](https://pubmed.ncbi.nlm.nih.gov)\n\nPodemos iniciar pelo Diagnóstico Inicial de 60 minutos ou ver os planos completos!";
  }

  // 4. Add-ons Específicos: Sensor de Glicose (CGM) e Consultoria de Cozinha
  if (q.includes("sensor") || q.includes("cgm") || q.includes("glicose") || q.includes("glicemia")) {
    return "O **Sensor Contínuo de Glicose + Análise de Dados (14 dias)** é um adicional de precisão para mapear em tempo real como seu organismo responde a cada refeição, treino e noite de sono:\n\n• **Investimento Avulso**: **R$ 490** (disponível para acompanhamento Online ou Presencial em Brasília).\n• **Entrega Clínica**: Identificação exata de alimentos que causam picos glicêmicos individuais para ajuste milimétrico do plano alimentar.\n\n**Evidência Científica Auditada:**\n• [American Diabetes Association (ADA) - Padrões de Monitoramento CGM](https://diabetesjournals.org/care)\n\nVocê pode solicitar este adicional diretamente em **Ver Agenda Online** ou com nossa recepção!";
  }

  if (q.includes("cozinha") || q.includes("meal prep") || q.includes("marmita") || q.includes("culinaria")) {
    return "A **Consultoria de Cozinha & Preparação de Refeições (Meal Prep)** é uma sessão individual online ao vivo de 60 minutos (investimento avulso de **R$ 280**):\n\n• **Organização Prática**: Auditoria de despensa, lista inteligente de compras e técnicas de preparo e congelamento que preservam sabor e nutrientes.\n• **Economia de Tempo**: Aprenda a deixar de 10 a 14 refeições funcionais prontas em cerca de 2 horas semanais, reduzindo gastos com delivery.\n\nDeseja agendar essa consultoria ou combiná-la a um plano de acompanhamento?";
  }

  // 5. Reembolso, Convênio, Nota Fiscal e Pagamento
  if (q.includes("convenio") || q.includes("plano de saude") || q.includes("reembolso") || q.includes("nota fiscal") || q.includes("pagamento") || q.includes("parcela")) {
    return "Atendemos na modalidade particular para dedicar **60 minutos reais de escuta e precisão clínica**, e emitimos **Nota Fiscal e relatório técnico discriminado** para que você solicite **reembolso junto ao seu plano de saúde / convênio**.\n\n• **Remarcação Flexível**: Sem taxas com aviso prévio de até 24h pelo WhatsApp da clínica.\n• **Alinhamento de Pagamento**: Nossa recepção humana (**+55 61 9 9128-3139**) orienta todas as facilidades de pagamento na confirmação do horário.\n\nDeseja verificar os valores dos planos ou falar com a recepção?";
  }

  // 6. Exames de Sangue e Preparo Pré-Consulta
  if (q.includes("exame") || q.includes("sangue") || q.includes("jejum") || q.includes("preparo")) {
    return "Para aproveitar ao máximo sua consulta com o Dr. Luiz Tannuri:\n\n• **Exames Laboratoriais**: Se tiver exames de sangue realizados nos últimos 6 meses, separe os arquivos em PDF para análise detalhada durante a consulta.\n• **Alimentação Prévia**: Mantenha sua rotina habitual nos dias anteriores para mapearmos seus hábitos reais.\n• **Preparo para Bioimpedância InBody 120 (Presencial DF)**: Recomendamos jejum alimentar leve de 2 a 3 horas e evitar exercícios intensos imediatamente antes da aferição.\n\nDeseja escolher seu horário preferencial em **Ver Agenda Online**?";
  }

  // 7. TAG: Valores e Investimento nos Planos
  if (q.includes("preco") || q.includes("valor") || q.includes("quanto custa") || q.includes("plano") || q.includes("investimento") || q.includes("assinatura") || q.includes("vip") || q.includes("12 semanas") || q.includes("6 meses")) {
    return "O Dr. Luiz Tannuri atua com **transparência total**. Os planos estão disponíveis para **Teleconsulta Online** e **Presencialmente em Brasília (DF)**:\n\n• **Diagnóstico Inicial de Precisão (60 min)**:\n  - Online: **R$ 450** | Presencial DF: **R$ 750**\n  - Inclui 1 retorno em até 15 dias.\n\n• **Programa Metabolismo 12 Semanas** *(Mais Procurado)*:\n  - Online: **R$ 1.199** | Presencial DF: **R$ 1.999**\n  - Consulta inicial de 60 min + 3 retornos quinzenais, bioimpedância presencial quinzenal (InBody 120) e App Webidiet.\n\n• **Assinatura Acompanhamento Contínuo (Mensal)**:\n  - Online: **R$ 259/mês** | Presencial DF: **R$ 429/mês**\n  - Consulta de 60 min + retornos quinzenais e bioimpedância presencial quinzenal (InBody 120). Sem carência.\n\n• **Programa 6 Meses: Performance & Longevidade (VIP)**:\n  - Online: **R$ 1.999** | Presencial DF: **R$ 3.199**\n  - Programa de 24 semanas com 6 consultas de 60 min + 6 retornos dedicados, bioimpedância quinzenal (InBody 120) e estratégias para viagens.\n\n**Adicionais de Precisão:**\n• **Bioimpedância InBody 120**: **R$ 99** (Presencial • 20 min)\n• **Sensor Contínuo de Glicose (14 dias)**: **R$ 490**\n• **Consultoria de Cozinha & Meal Prep (60 min)**: **R$ 280**\n\n**Evidência Científica Auditada:**\n• [Conselho Federal de Nutricionistas: Código de Ética e Transparência](https://www.cfn.org.br)\n\nQual dessas opções reflete melhor o que você busca hoje?";
  }

  // 8. TAG: Composição Corporal e InBody 120
  if (q.includes("inbody") || q.includes("bioimpedancia") || q.includes("gordura") || q.includes("massa magra") || q.includes("composicao")) {
    return "No consultório em Brasília, utilizamos o equipamento **InBody 120** para acompanhamento direto da composição corporal:\n\n1. **Massa Muscular Esquelética**: Avaliação direta da massa magra funcional para calibrar a ingestão de proteínas e macronutrientes.\n2. **Gordura Corporal**: Percentual exato e massa de gordura para monitorar a recomposição corporal real sem perda muscular.\n3. **Taxa Metabólica Basal (TMB)**: Estimativa precisa do gasto calórico em repouso.\n4. **Água Corporal Total**: Controle de hidratação e retenção hídrica.\n\nO exame está incluso quinzenalmente nos programas presenciais ou pode ser realizado avulso por **R$ 99**.\n\n**Evidência Científica Auditada:**\n• [InBody Clinical Research: Avaliação da Composição Corporal](https://inbody.com/research)\n\nDeseja agendar uma avaliação com o Dr. Tannuri?";
  }

  // 9. TAG: Quem é o Dr. Luiz Tannuri / Trajetória & Diplomas
  if (q.includes("quem e") || q.includes("tannuri") || q.includes("formacao") || q.includes("jiu-jitsu") || q.includes("jiu jitsu") || q.includes("faixa preta") || q.includes("diploma") || q.includes("trajetoria") || q.includes("judo")) {
    return "O **Dr. Luiz Tannuri** alia sólida formação acadêmica à vivência prática no mais alto nível esportivo:\n\n• **Graduado em Nutrição** pelo UNIEURO (Brasília/DF).\n• **Pós-Graduado em Nutrição Esportiva** (Faculdade Laboro / MEC) com mais de 10 anos de experiência clínica.\n• **Mestre de Jiu-Jitsu Faixa Preta 6º Grau** com mais de 30 anos de prática contínua, homologado oficialmente (2023 Fabricio International Team).\n• **Faixa Preta de Judô** (desde 2007) e experiência em MMA.\n• **Treinador Internacional** com atuação no Brasil, Austrália, EUA e Suécia.\n\nVocê pode inspecionar todos os 4 diplomas e certificações oficiais diretamente na seção **Trajetória & Diplomas** do site!\n\n**Evidência Científica Auditada:**\n• [JISSN: Timing de Macronutrientes e Nutrição Esportiva](https://jissn.biomedcentral.com)";
  }

  // 10. TAG: Atendimento para Viagens e Online
  if (q.includes("viaja") || q.includes("viagem") || q.includes("online") || q.includes("exterior") || q.includes("telemedicina") || q.includes("webidiet")) {
    return "O Dr. Luiz Tannuri atende regularmente pacientes que viajam com frequência ou residem fora de Brasília e no exterior (EUA, Alemanha, Oriente Médio):\n\n1. **Teleconsultas de 60 min**: Prontuário digital seguro e videoconferência em alta definição (Resolução CFN 666/2020).\n2. **Estratégias para Viagens de Negócios**: Adaptação prática para manter seu rendimento em voos, hotéis, restaurantes e compromissos sociais.\n3. **App Webidiet**: Organização prática da rotina alimentar diária na palma da mão.\n\n**Evidência Científica Auditada:**\n• [Conselho Federal de Nutricionistas: Resolução CFN nº 666/2020](https://www.cfn.org.br)\n\nPodemos planejar seu atendimento 100% online ou híbrido conforme sua agenda!";
  }

  // 11. TAG: Agendamento e Contato Humano
  if (q.includes("agendar") || q.includes("marcar") || q.includes("consulta") || q.includes("whatsapp") || q.includes("contato") || q.includes("recepcao") || q.includes("humano") || q.includes("telefone") || q.includes("horario") || q.includes("agenda")) {
    return "Será um prazer acolher você! O consultório do Dr. Luiz Tannuri está situado em **Brasília (DF)**, além de oferecermos teleconsultas online para pacientes no Brasil e exterior.\n\nPara falar diretamente com nossa **recepção humana**, nosso WhatsApp oficial é **+55 61 9 9128-3139** (você também pode clicar no botão **Falar no WhatsApp** logo abaixo).\n\nPara registrar imediatamente seu dia e turno de preferência — como o **Diagnóstico Inicial de 60 minutos** (R$ 450 online ou R$ 750 presencial, com 1 retorno incluso em 15 dias) — clique em **Ver Agenda Online** no topo da página.\n\n**Evidência Científica Auditada:**\n• [Conselho Federal de Nutricionistas: Resolução CFN 666/2020](https://www.cfn.org.br)\n\nDeseja falar com a equipe humana no WhatsApp agora ou explorar os planos?";
  }

  return "Olá! Sou a Concierge Clínica do Dr. Luiz Tannuri (Nutrição Esportiva & Precisão Metabólica). Posso orientar você sobre:\n\n• **Planos e Valores** (Diagnóstico Inicial de 60 min, Programa 12 Semanas, Assinatura Mensal e VIP 6 Meses)\n• **Exame de Bioimpedância InBody 120** e Adicionais de Precisão\n• **Atendimento Presencial em Brasília (DF)** ou **Teleconsulta Online HD**\n• **Trajetória Acadêmica e Esportiva** do Dr. Luiz Tannuri\n\n**Evidência Científica Auditada:**\n• [Conselho Federal de Nutricionistas: Código de Ética e Transparência](https://www.cfn.org.br)\n\nQual objetivo de saúde ou performance você gostaria de priorizar hoje?";
}

// Appointments & CRM Persistent Engine
interface StoredAppointmentDoc {
  id: string;
  bookingCode: string;
  patientName: string;
  patientWhatsApp: string;
  patientEmail: string;
  primaryGoal: string;
  medicalNotes?: string;
  serviceId: string;
  serviceName: string;
  serviceCategory: string;
  modality: 'online' | 'presencial';
  priceCents: number;
  formattedPrice: string;
  appointmentDate: string; // YYYY-MM-DD
  slotTime: string;
  slotPeriod: 'manha' | 'tarde' | 'noite';
  isFastingRecommended: boolean;
  status: 'pendente' | 'em_contato' | 'confirmado' | 'cancelado' | 'realizado';
  source: string;
  createdAt: string;
  updatedAt: string;
  internalNotes?: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const APPOINTMENTS_FILE = path.join(DATA_DIR, "appointments.json");

function ensureDataDirectory() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (err) {
    console.warn("[Storage] Could not create data directory, using memory:", err);
  }
}

// Seed initial canonical examples demonstrating the clinic's workflow
const INITIAL_APPOINTMENTS_SEED: StoredAppointmentDoc[] = [
  {
    id: "app_1001",
    bookingCode: "LTN-83192",
    patientName: "Rodrigo Almeida",
    patientWhatsApp: "+55 61 98112-4490",
    patientEmail: "rodrigo.almeida@empresa.com.br",
    primaryGoal: "Recomposição corporal e ganho de massa magra sem perda de rendimento no Jiu-Jitsu.",
    medicalNotes: "Treina 4x na semana. Refeições desreguladas por conta de reuniões frequentes.",
    serviceId: "programa_metabolismo_12semanas",
    serviceName: "Programa Metabolismo 12 Semanas",
    serviceCategory: "programa",
    modality: "presencial",
    priceCents: 199900,
    formattedPrice: "R$ 1.999",
    appointmentDate: new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0],
    slotTime: "08:00 - 09:00",
    slotPeriod: "manha",
    isFastingRecommended: true,
    status: "confirmado",
    source: "cta_plans",
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    internalNotes: "Bioimpedância InBody 120 agendada para primeira hora (em jejum de 3h). Paciente já notificado via WhatsApp."
  },
  {
    id: "app_1002",
    bookingCode: "LTN-59421",
    patientName: "Dra. Camila Vasconcelos",
    patientWhatsApp: "+55 11 99234-8812",
    patientEmail: "camila.vasconcelos@hospital.med.br",
    primaryGoal: "Controle de gordura visceral e organização de alimentação durante viagens de plantão e congressos.",
    medicalNotes: "Reside em São Paulo, optou por acompanhamento 100% online.",
    serviceId: "diagnostico_inicial",
    serviceName: "Diagnóstico Inicial de Precisão (60 min)",
    serviceCategory: "entrada",
    modality: "online",
    priceCents: 45000,
    formattedPrice: "R$ 450",
    appointmentDate: new Date(Date.now() + 86400000 * 3).toISOString().split("T")[0],
    slotTime: "17:45 - 18:45",
    slotPeriod: "noite",
    isFastingRecommended: false,
    status: "em_contato",
    source: "cta_hero",
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    internalNotes: "Recepção enviou dados de link da telemedicina no WhatsApp. Aguardando confirmação do turno executivo."
  },
  {
    id: "app_1003",
    bookingCode: "LTN-28314",
    patientName: "Marcelo Fonseca (Executivo)",
    patientWhatsApp: "+55 61 99876-1200",
    patientEmail: "marcelo.fonseca@capital.com",
    primaryGoal: "Programa VIP de Longevidade: protocolo completo para viagens internacionais e biomarcadores.",
    medicalNotes: "Viaja com frequência para Miami e Londres. Precisa de plano adaptável a fusos e hotéis.",
    serviceId: "programa_longevidade_vip",
    serviceName: "Programa 6 Meses: Performance & Longevidade (VIP)",
    serviceCategory: "vip",
    modality: "presencial",
    priceCents: 319900,
    formattedPrice: "R$ 3.199",
    appointmentDate: new Date(Date.now() + 86400000 * 5).toISOString().split("T")[0],
    slotTime: "09:15 - 10:15",
    slotPeriod: "manha",
    isFastingRecommended: true,
    status: "pendente",
    source: "cta_header",
    createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    internalNotes: "Novo lead de alto valor. Prioridade máxima para contato da recepção matutina."
  }
];

let appointmentsCache: StoredAppointmentDoc[] = [];

function loadAppointments(): StoredAppointmentDoc[] {
  ensureDataDirectory();
  try {
    if (fs.existsSync(APPOINTMENTS_FILE)) {
      const data = fs.readFileSync(APPOINTMENTS_FILE, "utf-8");
      appointmentsCache = JSON.parse(data);
      return appointmentsCache;
    }
  } catch (err) {
    console.warn("[Storage] Error reading appointments file:", err);
  }
  appointmentsCache = [...INITIAL_APPOINTMENTS_SEED];
  saveAppointments(appointmentsCache);
  return appointmentsCache;
}

function saveAppointments(items: StoredAppointmentDoc[]) {
  ensureDataDirectory();
  try {
    fs.writeFileSync(APPOINTMENTS_FILE, JSON.stringify(items, null, 2), "utf-8");
  } catch (err) {
    console.warn("[Storage] Error writing appointments file:", err);
  }
  appointmentsCache = items;
}

// Initialize storage
loadAppointments();

// In-memory lead storage for legacy endpoint compatibility
const leadStorage: any[] = [];

// API Routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Concierge POST endpoint
app.post("/api/concierge", async (req, res) => {
  const ip = req.ip || "unknown-client";
  if (!checkRateLimit(ip)) {
    return res.status(429).json({
      error: "Muitas mensagens em sequência. Por favor, aguarde um momento antes de continuar.",
      fallback: true
    });
  }

  const { message, conversation_id, context } = req.body;
  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Mensagem inválida." });
  }

  // Safety filter before LLM
  const lower = message.toLowerCase();
  if (lower.includes("remédio") || lower.includes("medicamento") || lower.includes("receita") || lower.includes("droga")) {
    return res.json({
      reply: "Como Concierge do Dr. Luiz Tannuri, meu papel é orientar sua navegação e explicar nossos planos e metodologia de nutrição esportiva e clínica. Diagnósticos clínicos e condutas dietoterápicas são realizados individualmente pelo Dr. Luiz Tannuri durante as consultas.",
      source: "guardrail"
    });
  }

  // Motor Clínico Interno (Zero chave de API externa / Custo R$ 0,00)
  const reply = resolveClinicalAssistantReply(message, context);
  return res.json({
    reply,
    source: "clinical_internal_engine",
    conversation_id: conversation_id || Date.now().toString()
  });
});

// Canonical quote calculation endpoint (P0 - never trust arbitrary prices sent by client)
app.get("/api/quote", (req, res) => {
  const offerId = req.query.offerId as string;
  const modality = req.query.modality as 'online' | 'presencial';
  if (!offerId || !modality) {
    return res.status(400).json({ error: "offerId e modality são parâmetros obrigatórios." });
  }
  const quote = getQuoteForOffer(offerId, modality);
  if (!quote) {
    return res.status(404).json({ error: "Oferta ou modalidade não encontrada no catálogo canônico." });
  }
  return res.json(quote);
});

// ============================================================================
// APPOINTMENTS & CRM API (Tree of Thoughts - Gestão de Informação de Elite)
// ============================================================================

// POST /api/appointments: Registro de Solicitação de Horário com Verificação Canônica
app.post("/api/appointments", (req, res) => {
  const {
    fullName,
    whatsApp,
    email,
    primaryGoal,
    medicalNotes,
    serviceId,
    modality,
    dateString,
    slotTime,
    slotPeriod,
    isFastingRecommended,
    source
  } = req.body;

  if (!fullName || !whatsApp || !serviceId || !modality || !dateString || !slotTime) {
    return res.status(400).json({
      error: "Campos obrigatórios incompletos para solicitação de horário."
    });
  }

  // Obter valor canônico auditado
  let serviceName = "Atendimento Nutricional";
  let serviceCategory = "protocolo";
  let priceCents = 45000;
  let formattedPrice = "R$ 450";

  const canonicalOffer = COMMERCIAL_OFFERS.find(o => o.id === serviceId);
  if (canonicalOffer) {
    serviceName = canonicalOffer.name;
    serviceCategory = canonicalOffer.category;
    priceCents = modality === 'presencial' ? canonicalOffer.pricesCents.presencial : canonicalOffer.pricesCents.online;
    formattedPrice = formatBRL(priceCents);
  } else {
    const canonicalAddon = COMMERCIAL_ADDONS.find(a => a.id === serviceId);
    if (canonicalAddon) {
      serviceName = canonicalAddon.name;
      serviceCategory = "addon";
      priceCents = (modality === 'presencial' ? canonicalAddon.pricesCents.presencial : canonicalAddon.pricesCents.online) || 9900;
      formattedPrice = formatBRL(priceCents);
    }
  }

  // Gera código único oficial de protocolo
  const randomSuffix = Math.floor(10000 + Math.random() * 90000);
  const bookingCode = `LTN-${randomSuffix}`;

  const newDoc: StoredAppointmentDoc = {
    id: `app_${Date.now()}_${randomSuffix}`,
    bookingCode,
    patientName: fullName.trim(),
    patientWhatsApp: whatsApp.trim(),
    patientEmail: (email || "").trim(),
    primaryGoal: (primaryGoal || "Recomposição Corporal & Saúde Integrativa").trim(),
    medicalNotes: (medicalNotes || "").trim(),
    serviceId,
    serviceName,
    serviceCategory,
    modality,
    priceCents,
    formattedPrice,
    appointmentDate: dateString,
    slotTime,
    slotPeriod: slotPeriod || "manha",
    isFastingRecommended: Boolean(isFastingRecommended),
    status: "pendente",
    source: source || "ver_agenda_online",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    internalNotes: `Registrado via plataforma web. Aguardando alinhamento humano com recepção em ${CLINIC_CONFIG.cityRegion}.`
  };

  const current = loadAppointments();
  current.unshift(newDoc);
  saveAppointments(current);

  return res.status(201).json({
    success: true,
    message: "Solicitação registrada com sucesso no sistema clínico.",
    appointment: newDoc,
    isWhatsAppConfirmed: CLINIC_CONFIG.isWhatsAppConfirmed,
    clinicWhatsApp: CLINIC_CONFIG.primaryWhatsApp,
    clinicWhatsAppClean: CLINIC_CONFIG.whatsAppClean
  });
});

// GET /api/admin/appointments: Lista filtrada de solicitações
app.get("/api/admin/appointments", (req, res) => {
  const { status, search, modality } = req.query;
  let items = loadAppointments();

  if (status && typeof status === 'string' && status !== 'todos') {
    items = items.filter(a => a.status === status);
  }

  if (modality && typeof modality === 'string' && modality !== 'todos') {
    items = items.filter(a => a.modality === modality);
  }

  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    items = items.filter(a =>
      a.patientName.toLowerCase().includes(q) ||
      a.bookingCode.toLowerCase().includes(q) ||
      a.patientWhatsApp.includes(q) ||
      a.serviceName.toLowerCase().includes(q) ||
      a.primaryGoal.toLowerCase().includes(q)
    );
  }

  return res.json({
    total: items.length,
    appointments: items
  });
});

// PATCH /api/admin/appointments/:id: Atualização de status e notas clínicas internas
app.patch("/api/admin/appointments/:id", (req, res) => {
  const { id } = req.params;
  const { status, internalNotes } = req.body;

  const current = loadAppointments();
  const index = current.findIndex(a => a.id === id || a.bookingCode === id);

  if (index === -1) {
    return res.status(404).json({ error: "Solicitação não encontrada." });
  }

  if (status) {
    current[index].status = status;
  }
  if (internalNotes !== undefined) {
    current[index].internalNotes = internalNotes;
  }
  current[index].updatedAt = new Date().toISOString();

  saveAppointments(current);

  return res.json({
    success: true,
    appointment: current[index]
  });
});

// GET /api/admin/metrics: Painel Analítico & Indicadores de Conversão do Funil
app.get("/api/admin/metrics", (_req, res) => {
  const items = loadAppointments();

  const totalRequests = items.length;
  const pendingCount = items.filter(i => i.status === 'pendente').length;
  const inContactCount = items.filter(i => i.status === 'em_contato').length;
  const confirmedCount = items.filter(i => i.status === 'confirmado').length;
  const completedCount = items.filter(i => i.status === 'realizado').length;

  const closedWon = confirmedCount + completedCount;
  const conversionRatePercent = totalRequests > 0 ? Math.round((closedWon / totalRequests) * 100) : 0;

  const byModality = {
    presencial: items.filter(i => i.modality === 'presencial').length,
    online: items.filter(i => i.modality === 'online').length
  };

  const byService: Record<string, { name: string; count: number; totalEstimatedValue: number }> = {};
  for (const item of items) {
    if (!byService[item.serviceId]) {
      byService[item.serviceId] = {
        name: item.serviceName,
        count: 0,
        totalEstimatedValue: 0
      };
    }
    byService[item.serviceId].count++;
    byService[item.serviceId].totalEstimatedValue += (item.priceCents / 100);
  }

  return res.json({
    totalRequests,
    pendingCount,
    inContactCount,
    confirmedCount,
    completedCount,
    conversionRatePercent,
    byModality,
    byService,
    recentRequests: items.slice(0, 10)
  });
});

// GET /api/admin/export-csv: Exportação compatível com Google Sheets e Excel
app.get("/api/admin/export-csv", (_req, res) => {
  const items = loadAppointments();

  const headers = [
    "Protocolo",
    "Data Criacao",
    "Status",
    "Paciente",
    "WhatsApp",
    "Email",
    "Servico",
    "Modalidade",
    "Valor (BRL)",
    "Data Agendada",
    "Horario",
    "Jejum Recomendado",
    "Objetivo Clinico",
    "Notas Recepcao"
  ];

  const escapeCSV = (val: any) => {
    const str = String(val ?? "").replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = items.map(a => [
    escapeCSV(a.bookingCode),
    escapeCSV(a.createdAt.split("T")[0]),
    escapeCSV(a.status),
    escapeCSV(a.patientName),
    escapeCSV(a.patientWhatsApp),
    escapeCSV(a.patientEmail),
    escapeCSV(a.serviceName),
    escapeCSV(a.modality === 'presencial' ? 'Presencial (Brasilia)' : 'Telemedicina HD'),
    escapeCSV(a.formattedPrice),
    escapeCSV(a.appointmentDate),
    escapeCSV(a.slotTime),
    escapeCSV(a.isFastingRecommended ? 'Sim' : 'Nao'),
    escapeCSV(a.primaryGoal),
    escapeCSV(a.internalNotes || '')
  ].join(";"));

  const bom = "\uFEFF"; // Garante acentuação perfeita no Excel e Google Sheets
  const csvContent = bom + [headers.join(";"), ...rows].join("\r\n");

  res.setHeader("Content-Type", "text/csv; charset=utf-8");
  res.setHeader("Content-Disposition", `attachment; filename=agendamentos_dr_tannuri_${Date.now()}.csv`);
  return res.send(csvContent);
});

// POST /api/admin/tot-analysis: Síntese Tree of Thoughts Local (Zero API Externa / Custo Zero)
app.post("/api/admin/tot-analysis", (req, res) => {
  const { appointmentId } = req.body;
  const items = loadAppointments();
  const appointment = items.find(a => a.id === appointmentId || a.bookingCode === appointmentId);

  if (!appointment) {
    return res.status(404).json({ error: "Agendamento não encontrado para análise ToT." });
  }

  const isPresencial = appointment.modality === "presencial";
  const modalityContext = isPresencial
    ? `Atendimento Presencial em Brasília (DF)${appointment.isFastingRecommended ? " — orientar jejum leve de 2 a 3h para aferição precisa na bioimpedância InBody 120" : " — destacar estrutura privativa com avaliação física e bioimpedância InBody 120"}`
    : "Teleconsulta Online HD — reforçar envio prévio do link criptografado, prontuário digital seguro (CFN 666/2020) e análise de exames em PDF";

  const retentionSuggestion = appointment.serviceId === "diagnostico_inicial"
    ? "Após a consulta de 60 min e o retorno de 15 dias, apresentar de forma consultiva a transição natural para o Programa Metabolismo 12 Semanas ou Assinatura Contínua para sustentar os ganhos."
    : appointment.serviceId === "programa_metabolico" || appointment.serviceId === "programa_metabolismo_12semanas"
    ? "Garantir desde o primeiro dia o cadastro no App Webidiet e o pré-agendamento dos 3 retornos quinzenais para máxima adesão."
    : appointment.serviceId === "programa_longevidade_vip"
    ? "Ativar protocolo prioritário VIP de 24 semanas, mapeando calendário de viagens e rotina executiva/esportiva logo no acolhimento."
    : "Alinhar cadência quinzenal de acompanhamento contínuo e envio prévio de exames laboratoriais dos últimos 6 meses.";

  const deterministicToT = `### Análise Estratégica Tree of Thoughts (ToT) — Motor Clínico Interno

**1. Ramo Rápido de Acolhimento (WhatsApp em até 15 min)**:
- Paciente **${appointment.patientName}** registrou interesse em **${appointment.serviceName}** (${appointment.formattedPrice}) para **${appointment.appointmentDate} às ${appointment.slotTime}**.
- Objetivo clínico central declarado: *"${appointment.primaryGoal}"*${appointment.medicalNotes ? ` | Observação: *"${appointment.medicalNotes}"*` : ""}.
- Conduta imediata: Validar disponibilidade na agenda do Dr. Luiz Tannuri e responder com acolhimento nominal para consolidar o compromisso.

**2. Ramo de Ancoragem de Valor Clínico**:
- Modalidade escolhida: ${modalityContext}.
- Conectar diretamente o objetivo do paciente à metodologia de mais de 10 anos de prática clínica e vivência esportiva de alto rendimento do Dr. Luiz Tannuri, além da emissão de Nota Fiscal para reembolso em convênios.

**3. Ramo de Evolução & Retenção Ética**:
- ${retentionSuggestion}

**Script Pronto para a Recepção Enviar no WhatsApp:**
"Olá, ${appointment.patientName}! Tudo bem? Aqui é da recepção clínica do Dr. Luiz Tannuri. Recebemos sua solicitação para **${appointment.serviceName}** (${isPresencial ? "Presencial em Brasília" : "Teleconsulta Online HD"}) na data **${appointment.appointmentDate} às ${appointment.slotTime}** (Protocolo: ${appointment.bookingCode}). Já registramos seu foco em *${appointment.primaryGoal}*${isPresencial && appointment.isFastingRecommended ? " e lembramos da recomendação de jejum leve de 2 a 3h para sua avaliação física" : ""}. Podemos confirmar oficialmente este horário na agenda para você?"`;

  return res.json({ analysis: deterministicToT, source: "clinical_internal_tot" });
});


async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Dr. Luiz Tannuri Server running on http://localhost:${PORT}`);
  });
}

startServer();
