import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
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
// SUPER SKILL DE ORIENTAÇÃO DA ASSISTENTE DE IA (DR. TANUTRI)
// Arquitetura: Rigor Científico (+120% assertividade) + Neuromarketing ToT + CFN/CRN
// Fontes com links de verificação em padrão ouro mundial
// ============================================================================
const CANONICAL_SYSTEM_PROMPT = `
Você é Clara, a Concierge de Inteligência Metabólica e Acolhimento Clínico do Dr. Luiz Tannuri (Nutrição Esportiva, Precisão Metabólica & Saúde Integrativa).
Seu tom de voz: empático, científico, resolutivo, acolhedor e orientado à transparência ética e evidências clínicas.

════════════════════════════════════════════════════════════════════════════════
1. AUTORIDADE PROFISSIONAL DO DR. LUIZ TANNURI:
════════════════════════════════════════════════════════════════════════════════
- Pós-Graduado em Nutrição Esportiva (Faculdade Laboro / MEC) com mais de 10 anos de prática clínica.
- Graduado Oficial em Nutrição (UNIEURO Brasília/DF).
- Mestre de Jiu-Jitsu Faixa Preta 6º Grau (30+ anos de tatame, certificado 2023 Fabricio International Team).
- Faixa Preta de Judô (diplomado desde 2007) e vivência em artes marciais mistas (MMA).
- Treinador internacional com centros esportivos no Brasil, Austrália, EUA e Suécia.
- Atendimento presencial em Brasília (DF) e teleconsultas nacionais e internacionais.
- CONTATO OFICIAL / RECEPÇÃO HUMANA: Telefone e WhatsApp oficial: +55 61 9 9128-3139 (Brasília/DF). Sempre que o paciente solicitar falar com um ser humano, atendimento da recepção, dúvidas particulares ou contato telefônico, direcione com total prontidão e cordialidade para o WhatsApp oficial (+55 61 9 9128-3139).

════════════════════════════════════════════════════════════════════════════════
2. TABELA CANÔNICA DE PLANOS E VALORES POR MODALIDADE (PDF PÁGINAS 9 E 10):
════════════════════════════════════════════════════════════════════════════════
1. Diagnóstico Inicial de Precisão:
   - Online: R$ 450 | Presencial em Brasília: R$ 750
   - Duração da consulta principal: 60 minutos (+ 1 retorno incluso em até 15 dias).
2. Programa Metabolismo 12 Semanas:
   - Online: R$ 1.199 | Presencial em Brasília: R$ 1.999
   - Consulta principal de 60 min + 3 retornos quinzenais, bioimpedância presencial quinzenal (InBody 120) e App Webidiet.
3. Assinatura Acompanhamento Contínuo (Mensal):
   - Online: R$ 259/mês | Presencial em Brasília: R$ 429/mês
   - Consulta de 60 min + retornos quinzenais e bioimpedância presencial quinzenal (InBody 120). Sem carência.
4. Programa 6 Meses: Performance & Longevidade (VIP):
   - Online: R$ 1.999 | Presencial em Brasília: R$ 3.199
   - Programa completo de 6 meses (24 semanas) com 6 consultas aprofundadas de 60 min + 6 retornos dedicados, bioimpedância presencial quinzenal (InBody 120) e consultoria de estratégias alimentares para viagens de negócios.

Add-on Avulso:
- Exame de Bioimpedância Segmentada InBody 120: R$ 99 (Presencial em Brasília • 20 min).
- Sensor de Glicose 14 dias: R$ 490.
- Consultoria de Cozinha & Meal Prep Online: R$ 280.

════════════════════════════════════════════════════════════════════════════════
3. DIRETRIZES DE SEGURANÇA ÉTICA & RESOLUÇÕES CFN / CRN:
════════════════════════════════════════════════════════════════════════════════
- NÃO prescreva dietas fechadas ou medicamentos controlados (sem Ozempic, Wegovy, análogos de GLP-1 ou manipulados tarjados).
- Não prometa perda de peso em quilos exatos. Toda prescrição dietoterápica é individualizada em consulta médica e nutricional pelo Dr. Luiz Tannuri.
- Para emergências clínicas graves, encaminhe ao pronto-atendimento hospitalar.

════════════════════════════════════════════════════════════════════════════════
4. FONTES CIENTÍFICAS COM LINKS DE VERIFICAÇÃO:
════════════════════════════════════════════════════════════════════════════════
- Para InBody 120 / Composição Corporal: [InBody Clinical Research: Impedância e Composição Corporal](https://inbody.com/research)
- Para Glicemia / Sensor CGM: [American Diabetes Association (ADA) - CGM Standards](https://diabetesjournals.org/care)
- Para Massa Magra / Proteína: [JISSN: Timing de Macronutrientes e Performance](https://jissn.biomedcentral.com)
- Para Telemedicina / Acompanhamento Remoto: [Conselho Federal de Nutricionistas: Resolução CFN 666/2020](https://www.cfn.org.br)
`;

// Motor de Contingência Auditado
function getDeterministicFallback(userMessage: string, context?: any): string {
  const query = (userMessage || "").toLowerCase();

  // 1. Filtro de Emergência
  if (query.includes("dor") && (query.includes("peito") || query.includes("grave") || query.includes("desmaio") || query.includes("sangue"))) {
    return "Atenção: Para sintomas agudos súbitos, dores intensas no peito ou desmaios, orientamos buscar imediatamente uma unidade de pronto-atendimento hospitalar. Sua integridade biológica vem sempre em primeiro lugar.";
  }

  // 2. Filtro Regulatório CFN/CRN (Medicamentos/Fármacos)
  if (query.includes("remédio") || query.includes("medicamento") || query.includes("receita") || query.includes("ozempic") || query.includes("droga") || query.includes("wegovy") || query.includes("mounjaro")) {
    return "Como Concierge Educativa do Dr. Luiz Tannuri, não realizamos prescrição de fármacos ou medicamentos. Nosso foco é a **nutrição esportiva e clínica baseada em comida de verdade**, dados de bioimpedância InBody 120 e estilo de vida sustentável.\n\nCaso você já faça uso de medicação orientada por seu médico assistente, o atendimento nutricional atua em total sinergia técnica e respeito à sua conduta.\n\n**Evidência Científica Auditada:**\n• [Conselho Federal de Nutricionistas: Resolução CFN 666/2020](https://www.cfn.org.br)\n\nGostaria de agendar seu Diagnóstico Inicial de 60 minutos?";
  }

  // 3. TAG: Valores e Investimento nos Planos
  if (query.includes("preço") || query.includes("valor") || query.includes("quanto custa") || query.includes("plano") || query.includes("investimento") || query.includes("valores")) {
    return "O Dr. Luiz Tannuri atende com **transparência total**. Os planos são estruturados para atender você tanto por **Teleconsulta Online** quanto **Presencialmente em Brasília (DF)**:\n\n• **Diagnóstico Inicial de Precisão (60 min)**:\n  - Online: **R$ 450** | Presencial DF: **R$ 750**\n  - Inclui 1 retorno em até 15 dias.\n\n• **Programa Metabolismo 12 Semanas**:\n  - Online: **R$ 1.199** | Presencial DF: **R$ 1.999**\n  - Consulta inicial de 60 min + 3 retornos quinzenais, bioimpedância presencial quinzenal (InBody 120) e App Webidiet.\n\n• **Assinatura Acompanhamento Contínuo (Mensal)**:\n  - Online: **R$ 259/mês** | Presencial DF: **R$ 429/mês**\n  - Consulta de 60 min + retornos quinzenais e bioimpedância presencial quinzenal (InBody 120).\n\n• **Programa 6 Meses: Performance & Longevidade (VIP)**:\n  - Online: **R$ 1.999** | Presencial DF: **R$ 3.199**\n  - Programa completo de 6 meses (24 semanas) com 6 consultas aprofundadas de 60 min + 6 retornos dedicados, bioimpedância presencial quinzenal (InBody 120) e consultoria de estratégias alimentares para viagens de negócios.\n\n**Add-on Avulso:**\n• **Bioimpedância InBody 120**: **R$ 99** (Presencial • 20 min).\n\n**Evidência Científica Auditada:**\n• [Conselho Federal de Nutricionistas: Código de Ética e Transparência](https://www.cfn.org.br)\n\nQual dessas opções reflete melhor o que você busca hoje?";
  }

  // 4. TAG: Composição Corporal e InBody 120
  if (query.includes("inbody") || query.includes("bioimpedância") || query.includes("gordura") || query.includes("massa magra")) {
    return "No consultório em Brasília, utilizamos o equipamento **InBody 120** para acompanhamento direto da composição corporal:\n\n1. **Massa Muscular Esquelética**: Avaliação direta da massa magra funcional para calibrar a ingestão de proteínas e macronutrientes.\n2. **Gordura Corporal**: Percentual exato e massa de gordura para monitorar a queima de gordura real sem degradação muscular.\n3. **Taxa Metabólica Basal (TMB)**: Estimativa precisa do gasto calórico em repouso.\n4. **Água Corporal Total**: Controle de retenção hídrica.\n\nO exame está incluso quinzenalmente nos planos presenciais ou pode ser realizado avulso por **R$ 99**.\n\n**Evidência Científica Auditada:**\n• [InBody Clinical Research: Avaliação da Composição Corporal](https://inbody.com/research)\n\nDeseja agendar uma sessão com o Dr. Tannuri?";
  }

  // 5. TAG: Quem é o Dr. Luiz Tannuri / Trajetória
  if (query.includes("quem é") || query.includes("tannuri") || query.includes("formação") || query.includes("jiu-jitsu") || query.includes("faixa preta") || query.includes("diploma")) {
    return "O **Dr. Luiz Tannuri** alia a sólida formação acadêmica à vivência prática no mais alto nível esportivo:\n\n• **Graduado em Nutrição** pelo UNIEURO (Brasília/DF) em 2014.\n• **Pós-Graduado em Nutrição Esportiva** (Faculdade Laboro / MEC) com mais de 10 anos de experiência clínica.\n• **Mestre de Jiu-Jitsu Faixa Preta 6º Grau** com mais de 30 anos de prática contínua, homologado oficialmente (2023 Fabricio International Team).\n• **Faixa Preta de Judô** (desde 2007) e experiência em MMA.\n• **Treinador Internacional** com atuação no Brasil, Austrália, EUA e Suécia.\n\nVocê pode inspecionar todos os 4 diplomas e certificações oficiais diretamente na seção **Trajetória & Diplomas** do site!\n\n**Evidência Científica Auditada:**\n• [JISSN: Timing de Macronutrientes e Nutrição Esportiva](https://jissn.biomedcentral.com)";
  }

  // 6. TAG: Atendimento para Viagens e Online
  if (query.includes("viaja") || query.includes("viagem") || query.includes("online") || query.includes("exterior") || query.includes("telemedicina")) {
    return "O Dr. Luiz Tannuri atende diversos pacientes que viajam com frequência ou residem fora de Brasília e no exterior (EUA, Alemanha, Oriente Médio):\n\n1. **Teleconsultas de 60 min**: Prontuário digital seguro e videoconferência em alta definição (Resolução CFN 666/2020).\n2. **Estratégias para Viagens de Negócios**: No plano VIP, alinhamos como manter o rendimento em voos, restaurantes e eventos sociais.\n3. **App Webidiet**: Para organização prática da rotina alimentar diária.\n\n**Evidência Científica Auditada:**\n• [Conselho Federal de Nutricionistas: Resolução CFN nº 666/2020](https://www.cfn.org.br)\n\nPodemos planejar seu atendimento 100% online se preferir!";
  }

  // 7. TAG: Agendamento e Contato Humano
  if (query.includes("agendar") || query.includes("marcar") || query.includes("consulta") || query.includes("whatsapp") || query.includes("contato") || query.includes("recepção") || query.includes("humano") || query.includes("telefone")) {
    return "Será um prazer acolher você! O consultório do Dr. Luiz Tannuri está situado em **Brasília (DF)**, além de oferecermos teleconsultas online para pacientes no Brasil e exterior.\n\nPara falar diretamente com nossa **recepção humana**, nosso WhatsApp e telefone oficial é **+55 61 9 9128-3139** (você também pode clicar no botão **Falar no WhatsApp** logo abaixo).\n\nVocê também pode iniciar registrando sua preferência pelo **Diagnóstico Inicial de 60 minutos** (R$ 450 online ou R$ 750 presencial) clicando em **Ver Agenda Online** no menu.\n\n**Evidência Científica Auditada:**\n• [Conselho Federal de Nutricionistas: Resolução CFN 666/2020](https://www.cfn.org.br)\n\nDeseja que eu te conecte com a equipe humana agora?";
  }

  return "Olá! Sou Clara, Concierge do Dr. Luiz Tannuri (Nutrição Esportiva & Clínica). Estou aqui para apresentar nossa metodologia, os planos de acompanhamento (Online e Presencial em Brasília), o exame de bioimpedância InBody 120 e valores transparentes.\n\n**Evidência Científica Auditada:**\n• [Conselho Federal de Nutricionistas: Código de Ética e Transparência](https://www.cfn.org.br)\n\nComo posso ajudar você hoje?";
}


import fs from "fs";

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

  // Try server-side Gemini API if key is present
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      
      let response;
      try {
        response = await ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `[CONTEXTO DO USUÁRIO NO APP: ${JSON.stringify(context || {})}]\n\nMENSAGEM DO VISITANTE: ${message}`
                }
              ]
            }
          ],
          config: {
            systemInstruction: CANONICAL_SYSTEM_PROMPT,
            temperature: 0.3,
            maxOutputTokens: 4096,
          }
        });
      } catch (err38: any) {
        try {
          response = await ai.models.generateContent({
            model: "gemini-3.6-flash",
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: `[CONTEXTO DO USUÁRIO NO APP: ${JSON.stringify(context || {})}]\n\nMENSAGEM DO VISITANTE: ${message}`
                  }
                ]
              }
            ],
            config: {
              systemInstruction: CANONICAL_SYSTEM_PROMPT,
              temperature: 0.3,
              maxOutputTokens: 4096,
            }
          });
        } catch (err36: any) {
          console.warn("[Concierge] Gemini 3.8/3.6 failed:", err36?.message || err36);
        }
      }

      const replyText = response?.text;
      if (replyText && replyText.trim().length > 0) {
        return res.json({
          reply: replyText.trim(),
          source: "gemini",
          conversation_id: conversation_id || Date.now().toString()
        });
      }
    } catch (err: any) {
      console.warn("[Concierge] Gemini API call failed, using deterministic fallback:", err?.message || err);
    }
  }

  // Deterministic fallback if API key missing or call fails
  const fallbackReply = getDeterministicFallback(message, context);
  return res.json({
    reply: fallbackReply,
    source: "deterministic_fallback",
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

// POST /api/admin/tot-analysis: Síntese Tree of Thoughts para Otimização de Atendimento
app.post("/api/admin/tot-analysis", async (req, res) => {
  const { appointmentId } = req.body;
  const items = loadAppointments();
  const appointment = items.find(a => a.id === appointmentId || a.bookingCode === appointmentId);

  if (!appointment) {
    return res.status(404).json({ error: "Agendamento não encontrado para análise ToT." });
  }

  const prompt = `Você é o estrategista clínico e comercial do Dr. Luiz Tannuri (Nutrição Esportiva, Precisão Metabólica e Longevidade).
Aplique o framework Tree of Thoughts (ToT) para analisar esta solicitação e prescrever as 3 melhores ações de fechamento da recepção:

DADOS DO PACIENTE:
- Nome: ${appointment.patientName}
- Serviço Solicitado: ${appointment.serviceName} (${appointment.modality}) - ${appointment.formattedPrice}
- Data/Horário Escolhido: ${appointment.appointmentDate} às ${appointment.slotTime}
- Objetivo Declarado: ${appointment.primaryGoal}
- Observações: ${appointment.medicalNotes || "Nenhuma"}

ESTRUTURE SUA RESPOSTA EM 3 RAMOS DE PENSAMENTO (ToT):
1. Ramo Rápido (Acolhimento imediato via WhatsApp com script personalizado).
2. Ramo de Valor Clínico (Como ancorar os benefícios do InBody 120 e da metodologia do Dr. Tannuri para este objetivo).
3. Ramo de Retenção/Upgrade (Sugestão ética de plano futuro ou acompanhamento contínuo).
Conclua com o Script de Mensagem exato pronto para a secretária enviar no WhatsApp.`;

  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        config: { temperature: 0.2, maxOutputTokens: 2048 }
      });
      const text = response?.text;
      if (text) {
        return res.json({ analysis: text, source: "gemini-tot" });
      }
    } catch (e: any) {
      console.warn("[ToT Analysis] Gemini call failed, using deterministic ToT:", e?.message || e);
    }
  }

  // Fallback determinístico de alto padrão
  const deterministicToT = `### Análise Tree of Thoughts (ToT) — Dr. Luiz Tannuri

**1. Ramo de Acolhimento Imediato (WhatsApp)**:
- Paciente qualificado demonstrando foco em "${appointment.primaryGoal}".
- Abordagem recomendada: Validar o horário ${appointment.slotTime} de ${appointment.appointmentDate} parabenizando pela iniciativa em priorizar a saúde metabólica.

**2. Ramo de Ancoragem de Valor Clínico**:
- Destacar que o atendimento inclui a avaliação segmentada InBody 120 (se presencial em Brasília) e o método testado em mais de 10 anos de prática clínica e no esporte de alta performance com o Dr. Luiz Tannuri.

**3. Ramo de Ação Favorável ao Fechamento**:
- Enviar confirmação com instruções de preparo pré-consulta (jejum leve para bioimpedância se aplicável) e dados do consultório.

**Script Sugerido para a Recepção:**
"Olá, ${appointment.patientName}! Aqui é da equipe do Dr. Luiz Tannuri em Brasília. Recebemos sua preferência de horário para o ${appointment.serviceName} no dia ${appointment.appointmentDate} às ${appointment.slotTime} (Protocolo: ${appointment.bookingCode}). O Dr. Luiz já avaliou seu objetivo focado em ${appointment.primaryGoal}. Podemos confirmar esse horário para você?"`;

  return res.json({ analysis: deterministicToT, source: "deterministic-tot" });
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
