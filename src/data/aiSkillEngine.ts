// ============================================================================
// SUPER SKILL DE ORIENTAÇÃO DA ASSISTENTE DE IA (DR. LUIZ TANNURI)
// Arquitetura: Rigor Científico + Neuromarketing Ético + CFN/CRN
// Valores auditados da Matriz Canônica (PDF Páginas 9 e 10)
// ============================================================================

export interface ScientificSource {
  id: string;
  title: string;
  journalOrOrg: string;
  url: string;
  description: string;
}

export interface AuditedTopic {
  tagKey: string;
  question: string;
  clinicalObjective: string;
  neuromarketingTrigger: string;
  regulatorySafety: string;
  auditedResponse: string;
  sources: ScientificSource[];
  suggestedAction: {
    label: string;
    targetId?: string;
    isWhatsApp?: boolean;
    customText?: string;
  };
}

// 1. Repositório Canônico de Fontes Científicas de Verificação
export const SCIENTIFIC_SOURCES: Record<string, ScientificSource> = {
  inbody_evaluation: {
    id: 'inbody_evaluation',
    title: 'Bioelectrical Impedance Analysis (BIA) in Body Composition Assessment',
    journalOrOrg: 'InBody Clinical Research / European Journal of Clinical Nutrition',
    url: 'https://inbody.com/research',
    description: 'Validação da impedância direta para aferição de massa muscular esquelética, gordura corporal e água corporal total.'
  },
  ada_glucose: {
    id: 'ada_glucose',
    title: 'Standards of Medical Care in Diabetes & Continuous Glucose Monitoring (CGM)',
    journalOrOrg: 'American Diabetes Association (ADA)',
    url: 'https://diabetesjournals.org/care',
    description: 'Diretrizes internacionais sobre o uso de biossensores intersticiais na modulação glicêmica e saciedade.'
  },
  issn_protein: {
    id: 'issn_protein',
    title: 'Position Stand: Protein and Nutrient Timing for Body Composition and Performance',
    journalOrOrg: 'International Society of Sports Nutrition (JISSN)',
    url: 'https://jissn.biomedcentral.com',
    description: 'Evidência de distribuição fracionada de leucina e timing de macronutrientes para força e preservação muscular.'
  },
  cfn_telemedicine: {
    id: 'cfn_telemedicine',
    title: 'Resolução CFN nº 666/2020: Regulamentação da Telenutrição no Brasil',
    journalOrOrg: 'Conselho Federal de Nutricionistas (CFN)',
    url: 'https://www.cfn.org.br',
    description: 'Normativa legal que autoriza acompanhamento nutricional telepresencial com prontuário digital seguro.'
  },
  nature_metabolism: {
    id: 'nature_metabolism',
    title: 'Food Sequencing & Postprandial Glucose Attenuation',
    journalOrOrg: 'Cell Metabolism / PubMed Central',
    url: 'https://pubmed.ncbi.nlm.nih.gov',
    description: 'Comprovação científica de que a ordem dos alimentos reduz picos glicêmicos e estabiliza a saciedade pós-prandial.'
  }
};

// 2. Matriz Canônica de Conhecimento e Respostas Auditadas da Clara
export const AUDITED_KNOWLEDGE_MATRIX: AuditedTopic[] = [
  {
    tagKey: 'valores_planos',
    question: 'Investimento & Planos de Acompanhamento',
    clinicalObjective: 'Transparência ética absoluta sobre os planos por modalidade (Online e Presencial em Brasília).',
    neuromarketingTrigger: 'Ancoragem de valor em saúde como ativo produtivo; elimina a incerteza do comprador com clareza e autoridade.',
    regulatorySafety: 'Respeita o código de ética do CFN exibindo honorários e entregáveis reais sem vendas coercitivas.',
    auditedResponse: `Com o Dr. Luiz Tannuri, praticamos **transparência total**. Os planos são estruturados para atender você tanto por **Teleconsulta Online** (onde quer que você esteja) quanto **Presencialmente em Brasília (DF)** com bioimpedância InBody 120 inclusa:

• **Diagnóstico Inicial de Precisão**:
  - Online: **R$ 450** | Presencial DF: **R$ 750**
  - Consulta detalhada de 60 minutos + 1 retorno em 15 dias incluso.

• **Programa Metabolismo 12 Semanas**:
  - Online: **R$ 1.199** | Presencial DF: **R$ 1.999**
  - Consulta inicial de 60 min + 3 retornos quinzenais, bioimpedância presencial quinzenal (InBody 120), App Webidiet e suporte contínuo.

• **Assinatura Acompanhamento Contínuo (Mensal)**:
  - Online: **R$ 259/mês** | Presencial DF: **R$ 429/mês**
  - Consulta de alinhamento de 60 min + retornos quinzenais e bioimpedância presencial quinzenal (InBody 120). Sem carência.

• **Performance & Longevidade Integrada (VIP)**:
  - Online: **R$ 1.999** | Presencial DF: **R$ 3.199**
  - Consulta de 60 min + 6 retornos quinzenais, bioimpedância presencial quinzenal (InBody 120) e consultoria de estratégias alimentares para viagens de negócios.

**Add-on Avulso:**
• **Bioimpedância InBody 120**: **R$ 99** (Presencial • 20 min).

**Evidência Científica Auditada:**
• [Resolução CFN nº 666/2020 sobre Prestação de Serviços Nutricionais](https://www.cfn.org.br)

Qual dessas modalidades atende melhor a sua rotina atual?`,
    sources: [SCIENTIFIC_SOURCES.cfn_telemedicine],
    suggestedAction: {
      label: 'Ver Planos no Site',
      targetId: 'planos'
    }
  },
  {
    tagKey: 'composicao_corporal',
    question: 'Como funciona a avaliação de composição corporal e o InBody 120?',
    clinicalObjective: 'Explicar a avaliação física direta no InBody 120 para massa muscular e gordura.',
    neuromarketingTrigger: 'Fim da obsessão com a balança comum; compreensão de que músculo e gordura têm pesos e impactos metabólicos diferentes.',
    regulatorySafety: 'Não promete resultados milagrosos ou prazos inatingíveis.',
    auditedResponse: `No consultório em Brasília, utilizamos a bioimpedância **InBody 120**, que mede diretamente a composição corporal em cerca de 20 minutos:

1. **Massa de Músculo Esquelético**: Mede o tecido muscular real para garantir que seu plano preserve a massa magra durante o emagrecimento.
2. **Gordura Corporal**: Percentual exato e massa de gordura para acompanhar a perda real de tecido adiposo.
3. **Taxa Metabólica Basal (TMB)**: Estimativa precisa de quanto seu organismo gasta em repouso para calibrar os macronutrientes sem desacelerar o metabolismo.
4. **Água Corporal Total**: Monitoramento de hidratação e retenção hídrica.

O exame de bioimpedância InBody 120 está incluso quinzenalmente nos planos presenciais ou pode ser agendado de forma avulsa por **R$ 99**.

**Evidência Científica Auditada:**
• [InBody Clinical Research: Avaliação da Composição Corporal](https://inbody.com/research)

Gostaria de agendar seu Diagnóstico Inicial de 60 minutos ou prefere tirar dúvidas sobre os planos?`,
    sources: [SCIENTIFIC_SOURCES.inbody_evaluation],
    suggestedAction: {
      label: 'Agendar Consulta de 60 min',
      targetId: 'planos'
    }
  },
  {
    tagKey: 'atendimento_viagens',
    question: 'Atendimento para quem viaja e rotinas intensas',
    clinicalObjective: 'Demonstrar a flexibilidade do acompanhamento online para executivos, atletas e viajantes frequentes.',
    neuromarketingTrigger: 'Eliminação de atritos de rotina; o plano se adapta ao paciente, não o contrário.',
    regulatorySafety: 'Amparado integralmente pela Resolução CFN nº 666/2020.',
    auditedResponse: `O Dr. Luiz Tannuri atende regularmente atletas de elite e executivos em diferentes cidades do Brasil e do exterior (Alemanha, EUA, Oriente Médio).

O acompanhamento foi estruturado para caber na sua rotina real:
1. **Teleconsultas em Alta Definição (60 min)**: Atendimento acolhedor com prontuário digital seguro.
2. **Consultoria para Viagens de Negócios**: No plano VIP, orientamos estratégias específicas para hotéis, voos, eventos e restaurantes.
3. **App Webidiet & Canal Direto**: Suporte para tirar dúvidas e manter a alimentação consistente onde você estiver.

**Evidência Científica Auditada:**
• [Conselho Federal de Nutricionistas: Resolução CFN nº 666/2020](https://www.cfn.org.br)

Você costuma viajar com frequência a trabalho ou treinos? Podemos alinhar o formato ideal para seu momento!`,
    sources: [SCIENTIFIC_SOURCES.cfn_telemedicine],
    suggestedAction: {
      label: 'Conversar com a Equipe no WhatsApp',
      isWhatsApp: true,
      customText: 'Olá! Tenho uma rotina frequente de viagens e gostaria de conhecer as opções de acompanhamento do Dr. Luiz Tannuri.'
    }
  },
  {
    tagKey: 'trajetoria_tannuri',
    question: 'Quem é o Dr. Luiz Tannuri?',
    clinicalObjective: 'Apresentar a formação acadêmica e trajetória esportiva oficial do Dr. Luiz Tannuri.',
    neuromarketingTrigger: 'Máxima autoridade: mais de 10 anos de pós-graduação e 30+ anos de tatame como mestre faixa preta 6º grau.',
    regulatorySafety: 'Fundamentada exclusivamente nos diplomas e documentos homologados anexados.',
    auditedResponse: `O **Dr. Luiz Tannuri** une o rigor científico à vivência prática dos tatames mais exigentes do mundo:

• **Graduado em Nutrição** pelo Centro Universitário Euro-Americano (UNIEURO) em Brasília/DF.
• **Pós-Graduado em Nutrição Esportiva** com mais de 10 anos de prática clínica fundamentada em evidências.
• **Mestre de Jiu-Jitsu Faixa Preta 6º Grau** com mais de 30 anos de prática e certificação oficial homologada (2023).
• **Faixa Preta de Judô** (desde 2007) e vivência em artes marciais mistas (MMA).
• **Treinador Internacional** com atuação no Brasil, Austrália, EUA e Suécia, chancelado por campeões mundiais da IBJJF como Sergio Zimmermann e Rodrigo Francioni Dias.

Essa bagagem permite ao Dr. Tannuri compreender na pele as demandas de energia, composição corporal e recuperação muscular do paciente, sem teorias impraticáveis.

Você pode conferir todos os 4 diplomas oficiais diretamente na seção **Trajetória & Diplomas** do site.`,
    sources: [SCIENTIFIC_SOURCES.issn_protein],
    suggestedAction: {
      label: 'Ver Trajetória & Diplomas',
      targetId: 'trajetoria'
    }
  },
  {
    tagKey: 'agendar_consulta',
    question: 'Como agendar minha primeira consulta?',
    clinicalObjective: 'Facilitar a conversão imediata para o agendamento de 60 minutos.',
    neuromarketingTrigger: 'Acolhimento imediato e clareza de contato.',
    regulatorySafety: 'Canal oficial da clínica auditado.',
    auditedResponse: `Você pode iniciar seu acompanhamento com o **Diagnóstico Inicial de Precisão (60 minutos)**:

• **Online**: **R$ 450** (Teleconsulta HD de qualquer lugar do Brasil ou exterior)
• **Presencial em Brasília (DF)**: **R$ 750** (Inclui 1 retorno em 15 dias)

Você pode clicar em **Ver Agenda Online** no topo do site para registrar sua preferência de dia e turno diretamente.`,
    sources: [SCIENTIFIC_SOURCES.cfn_telemedicine],
    suggestedAction: {
      label: 'Abrir Agenda Online',
      targetId: 'planos'
    }
  }
];

export function findAuditedTopic(text: string): AuditedTopic | undefined {
  const query = (text || '').toLowerCase();
  return AUDITED_KNOWLEDGE_MATRIX.find((t) => {
    const key = t.tagKey.toLowerCase();
    return (
      query.includes(key) ||
      (key.includes('valor') && (query.includes('preço') || query.includes('quanto custa') || query.includes('investimento') || query.includes('plano'))) ||
      (key.includes('composicao') && (query.includes('inbody') || query.includes('bioimpedância') || query.includes('massa magra'))) ||
      (key.includes('viagem') && (query.includes('viaja') || query.includes('online') || query.includes('exterior'))) ||
      (key.includes('trajetoria') && (query.includes('tannuri') || query.includes('formação') || query.includes('diploma') || query.includes('faixa preta'))) ||
      (key.includes('agendar') && (query.includes('agendar') || query.includes('marcar') || query.includes('consulta')))
    );
  });
}
