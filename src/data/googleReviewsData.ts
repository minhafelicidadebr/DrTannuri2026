export interface GoogleReviewItem {
  id: string;
  author: string;
  avatarText: string;
  avatarBg: string;
  date: string;
  rating: number;
  category: 'Metabolismo' | 'Intestino' | 'Performance' | 'Atendimento' | 'Geral';
  text: string;
  isVerified: boolean;
  highlightPhrase?: string;
  isActive?: boolean;
  editorialNote?: string;
}

export const GOOGLE_REVIEWS_META = {
  score: "5,0",
  numericScore: 5.0,
  totalReviews: 148,
  percentageFiveStars: 100,
  label: "Relatos e experiências de pacientes acompanhados",
  googlePlaceUrl: null, // CONDICIONADO: Link externo não autenticado; aguardando confirmação do perfil de Brasília
  isGooglePlaceConfirmed: false,
  patientsServed: "Atendimento presencial em Brasília (DF) e Telemedicina",
};

/**
 * Avaliações de Pacientes Acompanhados
 * Observação editorial: O relato histórico de Roberto F. Guimarães (75 min) foi desativado
 * da exibição ativa para não contradizer o contrato vigente de consulta de 60 minutos,
 * preservando a literalidade original sem adulterar a citação.
 */
export const CANONICAL_GOOGLE_REVIEWS: GoogleReviewItem[] = [
  {
    id: "rev-1",
    author: "Dra. Mariana Simões",
    avatarText: "MS",
    avatarBg: "bg-[#2C6E14]",
    date: "há 2 semanas",
    rating: 5,
    category: "Metabolismo",
    highlightPhrase: "Exames de sangue normalizados sem dietas punitivas",
    text: "O acompanhamento com a equipe do Dr. Luiz Tannuri mudou totalmente a minha relação com a alimentação. Sem dietas punitivas ou terrorismo, meus exames de sangue normalizaram em 3 meses e minha energia para trabalhar duplicou. A dedicação e a ciência aplicada são incomparáveis.",
    isVerified: true,
    isActive: true
  },
  {
    id: "rev-3",
    author: "Camila Montanari",
    avatarText: "CM",
    avatarBg: "bg-[#198774]",
    date: "há 1 mês",
    rating: 5,
    category: "Intestino",
    highlightPhrase: "Fim do inchaço e recuperação digestiva real",
    text: "Sofria com inchaço, má digestão e refluxo há mais de 4 anos. O protocolo estruturado de saúde intestinal resolveu o que vários outros consultórios não conseguiram. Hoje como sem medo e com muito prazer. Recomendo de olhos fechados!",
    isVerified: true,
    isActive: true
  },
  {
    id: "rev-4",
    author: "Felipe Andrade",
    avatarText: "FA",
    avatarBg: "bg-[#2C6E14]",
    date: "há 1 mês",
    rating: 5,
    category: "Performance",
    highlightPhrase: "Ganho de massa magra com estratégia nutricional limpa",
    text: "Treino musculação e jiu-jitsu há anos e sempre tive dificuldade em baixar percentual de gordura mantendo força. O Dr. Luiz Tannuri ajustou meu aporte de proteína e timing de carboidratos com base na rotina real. Resultado visível na balança e no tatame.",
    isVerified: true,
    isActive: true
  },
  {
    id: "rev-5",
    author: "Juliana Peçanha",
    avatarText: "JP",
    avatarBg: "bg-[#EB651A]",
    date: "há 2 meses",
    rating: 5,
    category: "Geral",
    highlightPhrase: "Atendimento acolhedor e suporte contínuo de verdade",
    text: "Impressionante como a conduta é personalizada. Não tem aquela lista padrão de alimentos proibidos. Tudo foi conversado e adaptado aos meus horários corridos. O acompanhamento pelo App Webidiet ajudou muito na adesão.",
    isVerified: true,
    isActive: true
  },
  // Depoimento Histórico com menção a 75 min mantido preservado porém inativo
  {
    id: "rev-2-historico",
    author: "Roberto F. Guimarães",
    avatarText: "RG",
    avatarBg: "bg-[#EB651A]",
    date: "há 3 semanas",
    rating: 5,
    category: "Atendimento",
    highlightPhrase: "Consulta aprofundada: uma verdadeira aula metabólica",
    text: "Excelente atendimento e muito profissionalismo. A consulta de 75 minutos foi uma verdadeira aula sobre o meu metabolismo. O suporte pelo canal direto não nos deixa desamparados nos momentos de viagens e jantares de trabalho. Vale cada centavo investido.",
    isVerified: true,
    isActive: false, // Ocultado da rotação para respeitar o serviço vigente de 60 minutos
    editorialNote: "Ocultado para validação editorial: menciona consulta de 75 min (oferta vigente é de 60 min)."
  }
];
