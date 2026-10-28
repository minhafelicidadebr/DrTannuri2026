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


// In-memory lead storage for demonstration & opt-in
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
          // Fallback to gemini-3.6-flash if gemini-3.8-flash experiences high demand
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

// Lead preference endpoint (Ramo 3: Registro de preferência local / Sem promessas falsas de envio)
app.post("/api/lead", (req, res) => {
  const { name, phone, email, interest, consent } = req.body;
  if (!consent) {
    return res.status(400).json({ error: "Consentimento de privacidade é obrigatório para envio." });
  }

  const newLead = {
    id: `pref_${Date.now()}`,
    name: name?.trim() || "Visitante",
    phone: phone?.trim() || "",
    email: email?.trim() || "",
    interest: interest || "diagnostico_inicial",
    createdAt: new Date().toISOString(),
    consent: true
  };

  leadStorage.push(newLead);

  return res.json({
    success: true,
    message: "Solicitação de preferência registrada. Nossa equipe fará a conferência de agenda.",
    leadId: newLead.id,
    isWhatsAppConfirmed: CLINIC_CONFIG.isWhatsAppConfirmed
  });
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
