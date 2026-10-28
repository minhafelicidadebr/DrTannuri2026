export interface DiplomaItem {
  id: string;
  title: string;
  category: 'nutricao' | 'artes-marciais';
  subtitle: string;
  institution: string;
  imageSrc: string;
  description: string;
  verificationBadge: string;
  year?: string;
}

export interface AthleteTestimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  countryFlag: string;
  imageSrc: string;
  alt: string;
  championships: string[];
  primaryBenefit: string;
  shortQuote: string;
  fullQuote: string;
  tag: string;
  verifiedBadge: string;
}

export const TANNURI_PORTRAIT = {
  src: '/assets/aistudio/tannuri6_b86a0063.jpg',
  alt: 'Dr. Luiz Tannuri — Nutricionista Esportivo (Pós-Graduado há 10+ anos) e Mestre Faixa Preta 6º Grau'
};

/**
 * 4 Documentos Canônicos de Comprovação (Páginas 2 e 3 do PDF)
 * O 3º documento substitui o diploma antigo pelo Certificado Fabricio Team 6th Degree 2023.
 */
export const OFFICIAL_DIPLOMAS: DiplomaItem[] = [
  {
    id: 'pos-graduacao-nutricao',
    title: 'Pós-Graduação em Nutrição Esportiva',
    category: 'nutricao',
    subtitle: 'Especialização Lato Sensu (360h) • Faculdade Laboro',
    institution: 'Faculdade Laboro — Credenciada pelo MEC',
    imageSrc: '/assets/aistudio/diploma-pos-graduacao-nutricao_a4033db4.png',
    description: 'Mais de 10 anos de prática clínica voltados à bioquímica do esforço físico, periodização nutricional de macronutrientes, preservação de massa muscular, recuperação glicogênica e modulação metabólica em atletas e praticantes regulares.',
    verificationBadge: 'Documento Acadêmico Registrado',
    year: '2016 / 2018'
  },
  {
    id: 'graduacao-nutricao',
    title: 'Graduação Oficial em Nutrição (Bacharelado)',
    category: 'nutricao',
    subtitle: 'Título de Bacharel em Nutrição • UNIEURO Brasília/DF',
    institution: 'Centro Universitário Euro-Americano (UNIEURO) — Brasília/DF',
    imageSrc: '/assets/aistudio/diploma-graduacao-nutricao_7ed42869.png',
    description: 'Formação universitária completa que fundamenta a prática clínica ética, a dietoterapia individualizada, a semiologia e a avaliação clínica laboratorial, distanciando o atendimento de modismos e prescrições de gaveta.',
    verificationBadge: 'Diploma Acadêmico Apresentado',
    year: '2014'
  },
  {
    id: 'jiujitsu-6-grau-2023',
    title: 'Certificado de Faixa Preta 6º Grau (2023)',
    category: 'artes-marciais',
    subtitle: '6th Degree Black Belt • Fabricio International Team',
    institution: 'Fabricio International Team / FIT BJJ Association',
    imageSrc: '/assets/aistudio/certificado-6-grau-referencia-pdf_e6b0b557.png',
    description: 'Certificado oficial de 6º Grau de Faixa Preta conferido em 2023 a Luiz Gustavo Jabour Tannuri de Almeida pela Fabricio International Team / FIT BJJ Association, chancelado pelo Mestre Fabrício Luiz Martins Costa (8º Grau Faixa Vermelha e Branca) e Mestre Ricardo Tanque (7º Grau Faixa Vermelha e Preta).',
    verificationBadge: 'Certificação Fornecida 6º Grau (2023)',
    year: '2023'
  },
  {
    id: 'jiujitsu-faixa-preta-historico',
    title: 'Diploma Oficial de Faixa Preta — CBJJ / IBJJF',
    category: 'artes-marciais',
    subtitle: 'Diploma Oficial de Faixa Preta • Registro CBJJ nº 157721',
    institution: 'Confederação Brasileira de Jiu-Jitsu (CBJJ) / IBJJF',
    imageSrc: '/assets/aistudio/diploma-jiujitsu-faixa-preta-1_70c57bf2.png',
    description: 'Registro histórico de graduação à Faixa Preta emitido pela Confederação Brasileira de Jiu-Jitsu (CBJJ), chancelado por Carlos Gracie Jr. Testemunho de mais de três décadas de dedicação contínua à arte suave, liderança no tatame e vivência visceral das demandas do esporte de combate.',
    verificationBadge: 'Registro de Graduação Apresentado',
    year: 'Registro Histórico'
  }
];

/**
 * 3 Depoimentos de Atletas e Líderes Globais (Página 3 do PDF)
 */
export const ATHLETE_TESTIMONIALS: AthleteTestimonial[] = [
  {
    id: 'sergio-zimmermann',
    name: 'Sergio Zimmermann',
    role: 'Head Coach BJJ & MMA @poundforpoundmunich',
    location: 'Munique, Alemanha',
    countryFlag: '🇩🇪',
    imageSrc: '/assets/aistudio/depoimento.sergiozimmermann_a07e525e.png',
    alt: 'Depoimento documentado de Sergio Zimmermann sobre Dr. Luiz Tannuri',
    championships: [
      '2X Campeão Mundial Master IBJJF',
      '12X Campeão Europeu IBJJF (Gi)',
      'Campeão Europeu IBJJF (No-Gi)'
    ],
    primaryBenefit: 'Recuperação Muscular & Peso Competitivo Sem Perda de Força',
    shortQuote: 'Como atleta de Jiu-Jitsu, o trabalho do Luiz foi essencial para otimizar minha performance. Melhorei a recuperação, mantive o peso para lutas e elevei meu rendimento nos treinos. Fez diferença real na minha rotina de atleta.',
    fullQuote: '"Como atleta de Jiu-Jitsu, contar com o acompanhamento do Luiz Tannuri foi essencial para otimizar minha performance. Com um plano alimentar personalizado, consegui melhorar minha recuperação, manter o peso adequado para competições e elevar meu rendimento nos treinos. Seu trabalho fez uma diferença real na minha rotina como atleta."',
    tag: 'Mundial & Europeu IBJJF',
    verifiedBadge: 'Depoimento Atribuído • Sergio Zimmermann'
  },
  {
    id: 'zaid-mirza',
    name: 'Zaid Mirza',
    role: 'Empreendedor, Diplomata e CEO Desert Force',
    location: 'Amã, Jordânia (MENA)',
    countryFlag: '🇯🇴',
    imageSrc: '/assets/aistudio/depoimento.zaid.mirza_99c71c3d.png',
    alt: 'Depoimento documentado de Zaid Mirza sobre Dr. Luiz Tannuri',
    championships: [
      'Ambassador Mercosul MENA',
      'Former Consultant JAF 🇯🇴',
      'Founder Arab MMA Federation & BJJ Jordânia',
      'CEO Desert Force • Faixa-Preta BJJ'
    ],
    primaryBenefit: 'Saúde Otimizada & Suporte à Rotina Executiva Global',
    shortQuote: 'Luiz é extremamente profissional, organizado e entrega resultados de altíssima qualidade. Seu plano alimentar aprimorou meu desempenho nos treinos e deu suporte sólido à minha rotina executiva intensa.',
    fullQuote: '"Fiquei muito satisfeito com o serviço prestado. Luiz foi profissional, organizado e entregou resultados de qualidade. Seu plano alimentar não só melhorou minha saúde, mas também aprimorou meu desempenho nos treinos e deu suporte à minha rotina de trabalho bastante ocupada. No geral, eu o recomendo fortemente e espero continuar sendo acompanhado por este ótimo nutricionista."',
    tag: 'Liderança Global & MMA',
    verifiedBadge: 'Depoimento Atribuído • Zaid Mirza'
  },
  {
    id: 'rodrigo-francioni',
    name: 'Rodrigo Francioni Dias',
    role: 'BJJ Coach @fightsportsmiami & Medalhista Internacional',
    location: 'Miami, Estados Unidos',
    countryFlag: '🇺🇸',
    imageSrc: '/assets/aistudio/depoimento.rodrigo.francioni_aaa0d34d.png',
    alt: 'Depoimento documentado de Rodrigo Francioni Dias sobre Dr. Luiz Tannuri',
    championships: [
      'Medalhista Pan Ams & Mundial IBJJF',
      'Medalhista ADCC Submission Fighting',
      'Campeão Orlando Open 2025',
      'Campeão AJP Tour Abu Dhabi 2024'
    ],
    primaryBenefit: 'Atendimento 100% Online de Precisão & Ajuste Fino para Luta',
    shortQuote: 'Por ser nutricionista e faixa-preta, o Luiz entende na prática as necessidades dos atletas de luta. O atendimento foi totalmente online, super prático, disponível e decisivo para o meu corte de peso e pódios nos EUA.',
    fullQuote: '"Quero deixar meu agradecimento ao meu nutricionista esportivo Luiz, que além de ser um excelente profissional, também é faixa preta de Jiu Jitsu e entende na prática as necessidades dos atletas de luta. O trabalho dele foi essencial para minha performance, recuperação e controle de peso durante a preparação para minhas competições. A dieta personalizada que ele montou fez toda a diferença nos meus treinos e nos resultados. O atendimento foi totalmente on-line, super prático, e mesmo à distância ele foi extremamente atencioso, sempre disponível para tirar dúvidas e ajustar o plano conforme minha rotina. Recomendo de olhos fechados para qualquer lutador que leve o esporte a sério e queira evoluir com segurança e eficiência."',
    tag: 'Medalhista ADCC & AJP Abu Dhabi',
    verifiedBadge: 'Depoimento Atribuído • Rodrigo Francioni'
  }
];
