import sportsHeroImg from '../assets/images/sports_hero_pro_1789328098925.jpg';
import drTanutriPortraitImg from '../assets/images/drtanutri_portrait_1789483338033.jpg';
import consultationHumanV3 from '../assets/images/consultation_human_process_v3_1788967468200.jpg';
import culinaryPrecisionImg from '../assets/images/culinary_hollywood_studio_1789329192254.jpg';
import metabolicBiomarkersImg from '../assets/images/biomarkers_hollywood_studio_1789329571727.jpg';
import progMetabolicImg from '../assets/images/program_metabolic_precision_v3_1788967484231.jpg';
import progRecompositionImg from '../assets/images/program_recomposition_v3_1788967498250.jpg';
import progPerformanceImg from '../assets/images/program_performance_v3_1788967515020.jpg';
import progGutImg from '../assets/images/program_gut_wellness_v3_1788967533878.jpg';
import finalCtaImg from '../assets/images/final_cta_cinematic_v3_1788967556744.jpg';
import conciergeAvatarImg from '../assets/images/concierge_avatar_1789340261706.jpg';
import addonInBodyImg from '../assets/images/addon_inbody_scan_1789482327988.jpg';
import addonCgmImg from '../assets/images/addon_cgm_sensor_1789482350057.jpg';
import addonMealPrepImg from '../assets/images/addon_mealprep_chef_1789482369013.jpg';
import cgmGlucoseResetImg from '../assets/images/cgm_glucose_reset_1789518252190.jpg';

export interface VisualAsset {
  src: string;
  alt: string;
  caption: string;
  aspectRatio: string;
  focalPoint?: string;
  category: 'hero' | 'method' | 'clinical' | 'biomarkers' | 'program' | 'cta' | 'addon';
}

export const VISUAL_ASSETS: Record<string, VisualAsset> = {
  heroMaster: {
    src: sportsHeroImg,
    alt: "Nutricionista esportivo de alta performance e atleta em ambiente clínico de ponta com iluminação de estúdio cinematográfico, analisando métricas de potência metabólica e bioimpedância.",
    caption: "Nutrição esportiva e metabólica de alto rendimento: precisão fisiológica, bioenergética e performance sustentável",
    aspectRatio: "3/4",
    focalPoint: "center center",
    category: "hero"
  },
  consultationHuman: {
    src: consultationHumanV3,
    alt: "Consulta individual humanizada em ambiente sofisticado e acolhedor, com escuta clínica atenta e planejamento nutricional conjunto.",
    caption: "Acompanhamento clínico contínuo e orientação individualizada baseada em evidências científicas",
    aspectRatio: "4/3",
    focalPoint: "center center",
    category: "clinical"
  },
  clinicalConsultation: {
    src: consultationHumanV3,
    alt: "Consulta individual humanizada em ambiente sofisticado e acolhedor, com escuta clínica atenta e planejamento nutricional conjunto.",
    caption: "Acompanhamento clínico contínuo e orientação individualizada baseada em evidências científicas",
    aspectRatio: "4/3",
    focalPoint: "center center",
    category: "clinical"
  },
  culinaryPrecision: {
    src: culinaryPrecisionImg,
    alt: "Nutrição gastronômica de precisão com alimentos reais de alta densidade nutricional: salmão grelhado, abacate, folhas escuras, beterrabas e sementes.",
    caption: "Nutrição gastronômica real: alta densidade de micronutrientes sem restrições punitivas",
    aspectRatio: "4/3",
    focalPoint: "center center",
    category: "method"
  },
  metabolicBiomarkers: {
    src: metabolicBiomarkersImg,
    alt: "Instrumentos de monitoramento metabólico de precisão: biossensores, notas de biomarcadores, compostos bioativos e dados fisiológicos.",
    caption: "Lab Interativo & Gêmeo Metabólico: dados claros para autonomia de hábitos",
    aspectRatio: "4/3",
    focalPoint: "center center",
    category: "biomarkers"
  },
  programMetabolic: {
    src: progMetabolicImg,
    alt: "Alimentação de precisão metabólica: café da manhã rico em micronutrientes, proteínas e gorduras nobres com acompanhamento em smartphone.",
    caption: "Metabolismo de Precisão: recomposição e flexibilidade metabólica sustentável",
    aspectRatio: "16/9",
    focalPoint: "center center",
    category: "program"
  },
  programRecomposition: {
    src: progRecompositionImg,
    alt: "Pessoa adulta em preparo de refeição de recuperação pós-treino rica em proteínas, vegetais frescos e carboidratos complexos.",
    caption: "Recomposição Corporal: ganho de massa magra e densidade nutricional",
    aspectRatio: "16/9",
    focalPoint: "center center",
    category: "program"
  },
  programPerformance: {
    src: progPerformanceImg,
    alt: "Pessoa adulta em hidratação e refeição equilibrada após treino esportivo, unindo longevidade e energia sustentável.",
    caption: "Performance & Longevidade: sincronização de timing de nutrientes e recuperação",
    aspectRatio: "16/9",
    focalPoint: "center center",
    category: "program"
  },
  programGut: {
    src: progGutImg,
    alt: "Culinária voltada à saúde intestinal e microbiota, com alimentos fermentados e abundância de vegetais e sementes.",
    caption: "Vitalidade Digestiva & Microbiota: protocolo dos 5Rs para equilíbrio gastrointestinal",
    aspectRatio: "16/9",
    focalPoint: "center center",
    category: "program"
  },
  finalCtaBackground: {
    src: finalCtaImg,
    alt: "Mesa contemporânea com prato saudável sofisticado e jarra de água fresca em ambiente sereno e acolhedor.",
    caption: "O seu próximo passo em direção à saúde metabólica e tranquilidade com a comida",
    aspectRatio: "16/9",
    focalPoint: "center 40%",
    category: "cta"
  },
  conciergeAvatar: {
    src: conciergeAvatarImg,
    alt: "Clara, Concierge Clínica de Inteligência Metabólica do Dr. Luiz Tannuri",
    caption: "Clara - Guia de Orientação e Acolhimento Clínico Dr. Luiz Tannuri",
    aspectRatio: "1/1",
    focalPoint: "center center",
    category: "clinical"
  },
  addonInBody: {
    src: consultationHumanV3,
    alt: "Avaliação clínica de composição corporal por bioimpedância segmentada InBody 120 em consultório privativo em Brasília.",
    caption: "InBody 120: Avaliação direta de massa muscular esquelética, gordura corporal segmentada e taxa metabólica basal",
    aspectRatio: "16/9",
    focalPoint: "center center",
    category: "addon"
  },
  addonCgmSensor: {
    src: addonCgmImg,
    alt: "Sensor contínuo de glicose (CGM) intersticial aplicado no braço, com foco macro destacando a telemetria metabólica.",
    caption: "Sensor Contínuo de Glicose: Telemetria metabólica de 14 dias para mapeamento da resposta glicêmica individual",
    aspectRatio: "16/9",
    focalPoint: "center center",
    category: "addon"
  },
  addonMealPrep: {
    src: addonMealPrepImg,
    alt: "Consultoria culinária e meal prep funcional com organização prática de refeições nutritivas.",
    caption: "Meal Prep & Cozinha Prática: Organização estratégica para refeições nutritivas e consistentes",
    aspectRatio: "16/9",
    focalPoint: "center center",
    category: "addon"
  },
  drTanutriPortrait: {
    src: drTanutriPortraitImg,
    alt: "Dr. Luiz Tannuri — Nutricionista Esportivo e Clínico",
    caption: "Dr. Luiz Tannuri — Fisiologia do Exercício, Bioenergética e Recomposição Corporal",
    aspectRatio: "1/1",
    focalPoint: "center center",
    category: "clinical"
  },
  sportsHero: {
    src: sportsHeroImg,
    alt: "Dr. Tanutri em ambiente clínico com atleta de alta performance",
    caption: "Nutrição esportiva e metabólica de alto rendimento",
    aspectRatio: "3/4",
    focalPoint: "center center",
    category: "hero"
  },
  cgmGlucoseReset: {
    src: cgmGlucoseResetImg,
    alt: "Reset de Glicose com sensor contínuo CGM no braço, curva metabólica estabilizada em tela digital e alimentos estratégicos de baixo impacto glicêmico com iluminação de estúdio cinematográfico.",
    caption: "Reset de Glicose: Estabilização de energia, apetite e curva glicêmica em 60 dias com biossensor CGM",
    aspectRatio: "16/9",
    focalPoint: "center center",
    category: "program"
  },
  googleReviewsPrintCard: {
    src: '/assets/aistudio/image_93488111.png',
    alt: 'Google Reviews: Nota 5,0 em 148 avaliações auditadas no Google com 100% de satisfação verificada em atendimentos presenciais e online',
    caption: 'Google Reviews Auditado: Nota 5,0 máxima em 148 avaliações no Google',
    aspectRatio: '1/1',
    focalPoint: 'center center',
    category: 'clinical'
  }
};
