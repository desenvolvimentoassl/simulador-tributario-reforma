import React, { useState, useMemo, useEffect, useRef, useLayoutEffect } from 'react';
import { Calculator, TrendingDown, TrendingUp, AlertCircle, LogOut, User, Shield, Calendar, Check, X, Plus, Trash2, Eye, EyeOff, Crown, Building2, FileText, ChevronRight, Lock, Mail, Sparkles, Layers, ArrowRight, Info, Download, Save, Folder, BarChart3, Clock, FileDown, Bell, MessageCircle, Send, RefreshCw, History } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, Cell, AreaChart, Area, ReferenceLine } from 'recharts';

// ============================================================
// LOGO AX EDUCAÇÃO — embarcada em base64 (versão azul + versão branca)
// ============================================================
const LOGO_AX_BLUE = 'data:image/png;base64,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';
const LOGO_AX_WHITE = 'data:image/png;base64,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';


// ============================================================
// PALETA — Identidade visual mantida
// Branco como base · Azul marinho profundo (autoridade) · Verde menta (destaque vibrante)
// ============================================================
const C = {
  // Fundos
  bgDeep: '#f8fafc',         // branco quase puro (fundo principal — espelha o site)
  bgCard: '#ffffff',         // cards brancos sobre fundo cinza-claro
  bgInput: '#f1f5f9',        // inputs com leve cinza
  bgSection: '#0a1e3d',      // azul marinho para hero/header

  // Azul marinho (cor primária institucional)
  navy: '#0a1e3d',           // azul marinho profundo (igual logo)
  navyMid: '#1e3a5f',
  navyLight: '#3b5f8a',
  navySoft: '#dbeafe',       // azul muito claro para fundos suaves

  // Verde menta (cor de ação / crescimento)
  primary: '#10b981',        // verde esmeralda vibrante
  primaryDark: '#059669',
  primarySoft: '#d1fae5',    // verde claro suave
  primaryGlow: 'rgba(16,185,129,0.12)',

  // Textos
  white: '#0a1e3d',          // texto principal = azul marinho (sobre branco)
  whiteSoft: '#1e3a5f',      // texto secundário = azul médio
  textMuted: '#64748b',      // texto auxiliar
  textDim: '#94a3b8',        // texto muito sutil
  textInvert: '#f8fafc',     // texto branco (sobre fundos escuros)

  // Bordas
  border: '#e2e8f0',
  borderStrong: '#10b981',
  borderSoft: '#f1f5f9',

  // Alertas
  danger: '#dc2626',
  warn: '#f59e0b',
};

// ============================================================
// FRASES MOTIVACIONAIS — rotacionam a cada acesso
// ============================================================
const FRASES_MOTIVACIONAIS = [
  { texto: 'O empresário que conhece seus números não teme nenhum cenário.', autor: 'AX Educação' },
  { texto: 'Crescer sem planejamento tributário é construir um castelo sobre dívida.', autor: 'AX Educação' },
  { texto: 'Cada real economizado em imposto é um real reinvestido no seu sonho.', autor: 'AX Educação' },
  { texto: 'Empresas que dominam tributos crescem 3x mais rápido que as que apenas reagem.', autor: 'Receita Previsível' },
  { texto: 'O risco não está em pagar imposto. Está em pagar imposto que você não precisava pagar.', autor: 'AX Educação' },
  { texto: 'Planejar é dobrar a aposta no seu próprio futuro.', autor: 'AX Educação' },
  { texto: 'Lucro sem estratégia tributária é miragem. Não dura.', autor: 'AX Educação' },
  { texto: 'O que diferencia o empresário do dono de negócio é o controle dos números.', autor: 'Michael Gerber' },
  { texto: 'Sua contabilidade pode ser sua melhor consultora — ou sua pior despesa.', autor: 'AX Educação' },
  { texto: 'Quem antecipa a Reforma Tributária colhe vantagem competitiva por uma década.', autor: 'AX Educação' },
  { texto: 'Dinheiro economizado em imposto não tem custo de captação. É o capital mais barato do mundo.', autor: 'AX Educação' },
  { texto: 'Empresário que entende sua carga tributária negocia melhor, vende melhor e dorme melhor.', autor: 'AX Educação' },
  { texto: 'A diferença entre um regime tributário e outro pode ser a diferença entre estagnar e dobrar.', autor: 'AX Educação' },
  { texto: 'Você não cresce no escuro. Cresce com clareza.', autor: 'AX Educação' },
  { texto: 'O melhor momento para planejar foi ontem. O segundo melhor é agora.', autor: 'Provérbio adaptado' },
];

// ============================================================
// PONTOS DA REFORMA TRIBUTÁRIA — detalhamento para o empresário
// ============================================================
const PONTOS_REFORMA = [
  {
    titulo: 'IVA Dual: CBS + IBS',
    descricao: 'A reforma cria dois tributos: CBS (federal, substitui PIS e COFINS) e IBS (estadual+municipal, substitui ICMS e ISS). Juntos formam o IVA brasileiro, estimado em 26,5%.',
    icone: '💡'
  },
  {
    titulo: 'Não-cumulatividade plena',
    descricao: 'Diferente do sistema atual, no IVA Dual praticamente tudo gera crédito. Empresas que se organizam para documentar insumos podem reduzir drasticamente a carga efetiva.',
    icone: '🔄'
  },
  {
    titulo: 'Split Payment automático',
    descricao: 'A partir de 2027, o imposto será separado automaticamente no momento do pagamento — o valor do tributo não entra na conta da empresa. Exige revisão urgente de fluxo de caixa.',
    icone: '⚡'
  },
  {
    titulo: 'Imposto Seletivo (IS)',
    descricao: 'Novo "imposto do pecado" sobre produtos prejudiciais à saúde e meio ambiente (bebidas, fumo, veículos poluentes). Entra em vigor em 2027.',
    icone: '🎯'
  },
  {
    titulo: 'Cashback para baixa renda',
    descricao: 'Famílias do CadÚnico receberão de volta parte do imposto pago em produtos essenciais. Empresas B2C precisam estar preparadas para o sistema de devolução.',
    icone: '💰'
  },
  {
    titulo: 'Simples Nacional permanece',
    descricao: 'O regime continua vigente — porém empresas do Simples podem optar por recolher CBS/IBS por fora para gerar crédito aos seus clientes B2B (importante decisão estratégica).',
    icone: '🌱'
  },
  {
    titulo: 'Fim da guerra fiscal',
    descricao: 'O IBS é cobrado no destino (onde o consumidor está). Estados não poderão mais oferecer incentivos para atrair empresas. Quem dependia disso precisa reestruturar.',
    icone: '🏛️'
  },
  {
    titulo: 'Regimes diferenciados',
    descricao: 'Alguns setores terão alíquotas reduzidas: saúde, educação, transporte coletivo, produtos agropecuários, bens da cesta básica nacional. Operação detalhada importa.',
    icone: '⚖️'
  },
  {
    titulo: 'Transição longa (2026–2033)',
    descricao: 'A coexistência de dois sistemas por 8 anos exige compliance dobrado. Quem se prepara desde já evita custo operacional e aproveita janelas de planejamento.',
    icone: '📅'
  },
  {
    titulo: 'Período de teste em 2026',
    descricao: 'Em 2026, CBS de 0,9% e IBS de 0,1% são informativos — recolhimento compensável com PIS/COFINS. É o ano para ajustar ERPs, contratos e processos sem custo adicional real.',
    icone: '🧪'
  },
];

// ============================================================
// FORMATAÇÃO BR
// ============================================================
const fmtBRL = (v) => {
  if (v == null || isNaN(v)) return 'R$ 0,00';
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(v);
};
const fmtPct = (v) => `${(v || 0).toFixed(2).replace('.', ',')}%`;
const fmtNum = (v) => {
  if (v == null || v === '' || isNaN(v)) return '';
  return new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v);
};
// Parse "1.234,56" -> 1234.56
const parseNum = (s) => {
  if (s === '' || s == null) return null;
  const clean = String(s).replace(/\./g, '').replace(',', '.').replace(/[^\d.-]/g, '');
  const n = parseFloat(clean);
  return isNaN(n) ? null : n;
};

// ============================================================
// MOTOR FISCAL — Cálculos vigentes 2026
// ============================================================
const TABELAS_SIMPLES = {
  I:   { nome: 'Anexo I — Comércio',           faixas: [[180000,4.00,0],[360000,7.30,5940],[720000,9.50,13860],[1800000,10.70,22500],[3600000,14.30,87300],[4800000,19.00,378000]] },
  II:  { nome: 'Anexo II — Indústria',         faixas: [[180000,4.50,0],[360000,7.80,5940],[720000,10.00,13860],[1800000,11.20,22500],[3600000,14.70,85500],[4800000,30.00,720000]] },
  III: { nome: 'Anexo III — Serviços',         faixas: [[180000,6.00,0],[360000,11.20,9360],[720000,13.50,17640],[1800000,16.00,35640],[3600000,21.00,125640],[4800000,33.00,648000]] },
  IV:  { nome: 'Anexo IV — Serviços (INSS ⊥)', faixas: [[180000,4.50,0],[360000,9.00,8100],[720000,10.20,12420],[1800000,14.00,39780],[3600000,22.00,183780],[4800000,33.00,828000]] },
  V:   { nome: 'Anexo V — Serviços',           faixas: [[180000,15.50,0],[360000,18.00,4500],[720000,19.50,9900],[1800000,20.50,17100],[3600000,23.00,62100],[4800000,30.50,540000]] },
};

const PRESUNCAO = {
  comercio:         { irpj: 0.08, csll: 0.12 },
  industria:        { irpj: 0.08, csll: 0.12 },
  servicos:         { irpj: 0.32, csll: 0.32 },
  servicos_hosp:    { irpj: 0.32, csll: 0.32 }, // 32% padrão; com equiparação cai para 8%/12%
  servicos_hosp_eq: { irpj: 0.08, csll: 0.12 }, // hospital equiparado
  transporte:       { irpj: 0.16, csll: 0.12 },
  transporte_carga: { irpj: 0.08, csll: 0.12 },
  produto_digital:  { irpj: 0.32, csll: 0.32 }, // serviço
  influencer:       { irpj: 0.32, csll: 0.32 }, // serviço/publicidade
};

// Metadados de atividades — labels, descrições, anexos sugeridos, particularidades
const ATIVIDADES_META = {
  comercio:         { label: 'Comércio', anexoSugerido: 'I', icone: '🏪', categoria: 'tradicional' },
  industria:        { label: 'Indústria', anexoSugerido: 'II', icone: '🏭', categoria: 'tradicional' },
  servicos:         { label: 'Serviços em geral', anexoSugerido: 'III', icone: '🛠️', categoria: 'servicos' },
  servicos_hosp:    { label: 'Serviços hospitalares', anexoSugerido: 'III', icone: '🏥', categoria: 'servicos', podeEquiparacao: true },
  transporte:       { label: 'Transporte de passageiros', anexoSugerido: 'III', icone: '🚕', categoria: 'servicos' },
  transporte_carga: { label: 'Transporte de carga', anexoSugerido: 'III', icone: '🚛', categoria: 'servicos' },
  produto_digital:  { label: 'Produto digital (e-book, curso, SaaS)', anexoSugerido: 'III', icone: '💻', categoria: 'digital', podeExportacao: true },
  influencer:       { label: 'Influenciador / publicidade digital', anexoSugerido: 'V', icone: '📱', categoria: 'digital', podeExportacao: true },
};

// Cronograma oficial da Reforma Tributária (LC 214/2025)
// Fontes: CRCSP, Gov.br, Câmara, Fiscoplan
const CENARIOS_REFORMA = {
  '2026': {
    nome: '2026 — Fase de testes',
    descricao: 'Alíquotas-teste simbólicas. Recolhimento compensável com PIS/COFINS.',
    cbs: 0.009,  // 0,9%
    ibs: 0.001,  // 0,1%
    pisCofinsAtivo: true,
    icmsIssAtivo: true,
    compensavel: true,
  },
  '2027-2028': {
    nome: '2027–2028 — CBS plena',
    descricao: 'PIS/COFINS extintos. CBS plena. IBS ainda em alíquota-teste (0,1%).',
    cbs: 0.088,  // ~8,8%
    ibs: 0.001,
    pisCofinsAtivo: false,
    icmsIssAtivo: true,
    compensavel: false,
  },
  '2029-2032': {
    nome: '2029–2032 — Transição IBS',
    descricao: 'IBS cresce 10% ao ano; ICMS/ISS reduzem proporcionalmente.',
    cbs: 0.088,
    ibs: 0.177 * 0.5, // estimativa média do período (50% IBS, 50% ICMS/ISS)
    pisCofinsAtivo: false,
    icmsIssAtivo: true,
    icmsIssReducao: 0.5,
    compensavel: false,
  },
  '2033+': {
    nome: '2033+ — Sistema pleno',
    descricao: 'IVA Dual em vigor. ICMS, ISS, PIS e COFINS extintos.',
    cbs: 0.088,
    ibs: 0.177,
    pisCofinsAtivo: false,
    icmsIssAtivo: false,
    compensavel: false,
  },
};

function calcularSimples({ rbt12, receitaMes, anexo, folha12 = 0 }) {
  if (!rbt12 || !receitaMes || rbt12 <= 0 || receitaMes <= 0) return { total: 0, aliquotaEfetiva: 0 };
  if (rbt12 > 4800000) return { total: 0, aliquotaEfetiva: 0, impossivel: true, detalhes: 'Acima de R$ 4,8 mi — fora do Simples' };

  let anexoAplicavel = anexo;
  let fatorR = 0;
  let migrou = false;

  if (anexo === 'III' || anexo === 'V') {
    fatorR = (folha12 / rbt12) * 100;
    if (anexo === 'V' && fatorR >= 28) { anexoAplicavel = 'III'; migrou = true; }
    else if (anexo === 'III' && fatorR < 28) { anexoAplicavel = 'V'; migrou = true; }
  }

  const tabela = TABELAS_SIMPLES[anexoAplicavel];
  const faixa = tabela.faixas.find(f => rbt12 <= f[0]) || tabela.faixas[5];
  const [, aliqNominal, parcelaDeduzir] = faixa;
  const aliqEfetiva = ((rbt12 * (aliqNominal / 100)) - parcelaDeduzir) / rbt12 * 100;
  const das = receitaMes * (aliqEfetiva / 100);

  let inssExtra = 0;
  if (anexoAplicavel === 'IV') inssExtra = (folha12 / 12) * 0.22;

  return {
    total: das + inssExtra, das, inssExtra, aliquotaEfetiva: aliqEfetiva, aliqNominal, fatorR,
    anexoAplicavel: tabela.nome, migrou,
    detalhes: migrou ? `Fator R ${fatorR.toFixed(1).replace('.', ',')}% → migrou para ${anexoAplicavel}` : null
  };
}

function calcularPresumido({ receitaMes, atividade, folhaMes = 0, issAliq = 5, icmsAliq = 0, equiparacaoHosp = false, pctExportacao = 0 }) {
  if (!receitaMes || receitaMes <= 0) return { total: 0 };

  // Define presunção (equiparação hospitalar muda IRPJ/CSLL pra 8%/12%)
  let p;
  if (atividade === 'servicos_hosp' && equiparacaoHosp) {
    p = PRESUNCAO.servicos_hosp_eq;
  } else {
    p = PRESUNCAO[atividade] || PRESUNCAO.servicos;
  }

  // Exportação de serviços: parcela exportada é isenta de PIS/COFINS/ISS
  const pctExpDecimal = Math.min(Math.max(pctExportacao / 100, 0), 1);
  const receitaInterna = receitaMes * (1 - pctExpDecimal);
  const receitaExportada = receitaMes * pctExpDecimal;

  // PIS/COFINS apenas sobre receita interna
  const pis = receitaInterna * 0.0065;
  const cofins = receitaInterna * 0.03;

  // IRPJ/CSLL sobre 100% da receita (não tem isenção pra exportação no IR/CSLL no presumido)
  const baseIR = receitaMes * p.irpj;
  const irpj = baseIR * 0.15;
  const irpjAdic = Math.max(0, baseIR - 20000) * 0.10;
  const csll = receitaMes * p.csll * 0.09;

  // ISS apenas sobre receita interna (exportação de serviços é isenta)
  const isServico = atividade === 'servicos' || atividade === 'servicos_hosp' || atividade.startsWith('transporte') || atividade === 'produto_digital' || atividade === 'influencer';
  const issIcms = isServico ? receitaInterna * (issAliq / 100) : receitaMes * (icmsAliq / 100);
  const inssPatronal = folhaMes * 0.22;
  const total = pis + cofins + irpj + irpjAdic + csll + issIcms + inssPatronal;

  // Cálculo da economia gerada por incentivos (para mostrar ao usuário)
  let economiaIncentivos = 0;
  if (equiparacaoHosp && atividade === 'servicos_hosp') {
    // economia vs presunção padrão de 32%
    const irpjPadrao = receitaMes * 0.32 * 0.15;
    const csllPadrao = receitaMes * 0.32 * 0.09;
    economiaIncentivos += (irpjPadrao - irpj) + (csllPadrao - csll);
  }
  if (pctExpDecimal > 0) {
    economiaIncentivos += receitaExportada * (0.0065 + 0.03 + (isServico ? issAliq / 100 : 0));
  }

  return { total, pis, cofins, irpj, irpjAdicional: irpjAdic, csll, issIcms, inssPatronal, aliquotaEfetiva: (total / receitaMes) * 100, economiaIncentivos, receitaExportada };
}

function calcularReal({ receitaMes, atividade, despesas = 0, folhaMes = 0, creditosPisCofins = 0, issAliq = 5, icmsAliq = 0, pctExportacao = 0 }) {
  if (!receitaMes || receitaMes <= 0) return { total: 0 };

  const pctExpDecimal = Math.min(Math.max(pctExportacao / 100, 0), 1);
  const receitaInterna = receitaMes * (1 - pctExpDecimal);

  // PIS/COFINS apenas sobre receita interna (exportação é isenta com manutenção de crédito)
  const pisCofinsBruto = receitaInterna * 0.0925;
  const creditos = creditosPisCofins * 0.0925;
  const pisCofins = Math.max(0, pisCofinsBruto - creditos);

  const lucro = receitaMes - despesas - folhaMes;
  let irpj = 0, irpjAdic = 0, csll = 0;
  if (lucro > 0) {
    irpj = lucro * 0.15;
    irpjAdic = Math.max(0, lucro - 20000) * 0.10;
    csll = lucro * 0.09;
  }
  const isServico = atividade === 'servicos' || atividade === 'servicos_hosp' || atividade.startsWith('transporte') || atividade === 'produto_digital' || atividade === 'influencer';
  const issIcms = isServico ? receitaInterna * (issAliq / 100) : receitaMes * (icmsAliq / 100);
  const inssPatronal = folhaMes * 0.22;
  const total = pisCofins + irpj + irpjAdic + csll + issIcms + inssPatronal;
  return { total, pisCofins, pisCofinsBruto, creditos, irpj, irpjAdicional: irpjAdic, csll, issIcms, inssPatronal, lucroContabil: lucro, aliquotaEfetiva: (total / receitaMes) * 100, margem: (lucro / receitaMes) * 100, detalhes: lucro <= 0 ? 'Prejuízo fiscal — sem IRPJ/CSLL' : null };
}

// Reforma Tributária — aplica sobre cálculo Lucro Real (base mais ampla)
function calcularReforma({ receitaMes, atividade, despesas = 0, folhaMes = 0, creditosTotal = 0, cenario, issAliq = 5, icmsAliq = 0 }) {
  if (!receitaMes || receitaMes <= 0) return { total: 0 };
  const ref = CENARIOS_REFORMA[cenario];

  // CBS e IBS sobre receita (com créditos não-cumulativos sobre insumos)
  const cbsBruto = receitaMes * ref.cbs;
  const ibsBruto = receitaMes * ref.ibs;
  const creditoCBS = creditosTotal * ref.cbs;
  const creditoIBS = creditosTotal * ref.ibs;
  const cbs = Math.max(0, cbsBruto - creditoCBS);
  const ibs = Math.max(0, ibsBruto - creditoIBS);

  // PIS/COFINS — só ativo em 2026
  let pisCofins = 0;
  if (ref.pisCofinsAtivo) {
    const pcBruto = receitaMes * 0.0925;
    pisCofins = Math.max(0, pcBruto - creditosTotal * 0.0925);
    // Em 2026 o CBS/IBS pago é compensável com PIS/COFINS
    if (ref.compensavel) pisCofins = Math.max(0, pisCofins - cbs - ibs);
  }

  // ICMS/ISS — vai reduzindo na transição
  const isServico = atividade === 'servicos' || atividade === 'servicos_hosp' || atividade.startsWith('transporte') || atividade === 'produto_digital' || atividade === 'influencer';
  let issIcms = 0;
  if (ref.icmsIssAtivo) {
    const reducao = ref.icmsIssReducao || 0;
    const base = isServico ? receitaMes * (issAliq / 100) : receitaMes * (icmsAliq / 100);
    issIcms = base * (1 - reducao);
  }

  // IRPJ/CSLL continuam (não são afetados pela reforma do consumo)
  const lucro = receitaMes - despesas - folhaMes;
  let irpj = 0, irpjAdic = 0, csll = 0;
  if (lucro > 0) {
    irpj = lucro * 0.15;
    irpjAdic = Math.max(0, lucro - 20000) * 0.10;
    csll = lucro * 0.09;
  }

  const inssPatronal = folhaMes * 0.22;
  const total = cbs + ibs + pisCofins + issIcms + irpj + irpjAdic + csll + inssPatronal;

  return {
    total, cbs, ibs, pisCofins, issIcms, irpj, irpjAdicional: irpjAdic, csll, inssPatronal,
    cbsBruto, ibsBruto, creditoCBS, creditoIBS, lucroContabil: lucro,
    aliquotaEfetiva: (total / receitaMes) * 100,
    cenario: ref.nome,
    descricao: ref.descricao
  };
}

// ============================================================
// GERADOR DE DICAS DE CRESCIMENTO — análise contextual
// ============================================================
function gerarDicasCrescimento({ rbt12, receitaMes, anexo, folhaMes, atividade, simples, presumido, real, melhor, impactoReforma }) {
  const dicas = [];
  const folha12 = (folhaMes || 0) * 12;

  // Fator R desfavorável
  if ((anexo === 'III' || anexo === 'V') && rbt12 > 0 && folhaMes > 0) {
    const fatorR = (folha12 / rbt12) * 100;
    if (fatorR < 28 && fatorR > 15) {
      const folhaIdeal = (rbt12 * 0.28) / 12;
      const aumentoFolha = folhaIdeal - folhaMes;
      dicas.push({
        tipo: 'oportunidade',
        titulo: 'Fator R: você está perto da virada de chave',
        texto: `Seu Fator R é ${fatorR.toFixed(1).replace('.', ',')}%. Faltam apenas ${(28 - fatorR).toFixed(1).replace('.', ',')} pontos para migrar do Anexo V para o III. Aumentando a folha em aproximadamente ${fmtBRL(aumentoFolha)}/mês (incluindo pró-labore), você pode economizar até 50% no DAS. Estruturação de pró-labore é jogada estratégica clássica.`,
        frase: '"O Fator R é o atalho legal mais subutilizado do Simples Nacional."'
      });
    } else if (fatorR >= 28 && fatorR < 32) {
      dicas.push({
        tipo: 'atencao',
        titulo: 'Margem do Fator R está apertada',
        texto: `Seu Fator R está em ${fatorR.toFixed(1).replace('.', ',')}% — qualquer queda de folha ou aumento de receita pode te jogar de volta ao Anexo V. Mantenha folga de segurança.`,
        frase: '"Quem opera no limite do Fator R opera com risco. Quem opera com folga, opera com tranquilidade."'
      });
    }
  }

  // Empresa próxima do teto do Simples
  if (rbt12 > 4000000 && rbt12 < 4800000) {
    dicas.push({
      tipo: 'critico',
      titulo: 'Atenção: você está chegando no teto do Simples',
      texto: `Faturamento próximo do limite de R$ 4,8 milhões. Acima disso, a empresa é desenquadrada compulsoriamente. Hora de simular Lucro Presumido e Real e preparar a transição com 6 a 12 meses de antecedência.`,
      frase: '"Crescimento sem planejamento tributário transforma sucesso em punição."'
    });
  }

  // Lucro Real seria melhor mas a empresa está em outro regime
  if (real.total > 0 && presumido.total > 0 && melhor && melhor.id !== 'real') {
    const margemReal = real.margem || 0;
    if (margemReal < 15 && real.total < presumido.total * 0.85) {
      dicas.push({
        tipo: 'oportunidade',
        titulo: 'Margem apertada favorece o Lucro Real',
        texto: `Sua margem de lucro está em ${margemReal.toFixed(1).replace('.', ',')}%. Empresas com margens abaixo de 15% costumam pagar menos no Lucro Real do que no Presumido, porque tributam o lucro real e não uma presunção fixa. Vale o estudo detalhado.`,
        frase: '"O Lucro Presumido é simples. O Lucro Real é estratégico."'
      });
    }
  }

  // Atividade serviço sem aproveitar Fator R
  if (atividade === 'servicos' && (anexo === 'I' || anexo === 'II' || anexo === 'IV')) {
    dicas.push({
      tipo: 'info',
      titulo: 'Revise o enquadramento do seu CNAE',
      texto: 'Sua atividade é serviço, mas o anexo selecionado não permite Fator R. Verifique se seu CNAE principal pode ser enquadrado no Anexo III com Fator R favorável — pode haver economia significativa.',
      frase: '"O CNAE certo vale milhares por ano. O CNAE errado vale prejuízo eterno."'
    });
  }

  // Impacto da Reforma negativo
  if (impactoReforma > 0 && melhor && impactoReforma > melhor.dados.total * 0.15) {
    dicas.push({
      tipo: 'critico',
      titulo: 'Reforma Tributária aumentará significativamente sua carga',
      texto: `No cenário pleno (2033+), sua empresa pagaria ${fmtBRL(impactoReforma * 12)} a mais por ano. Há tempo para se preparar: documentar insumos para gerar créditos, revisar precificação, reestruturar contratos. Quem se mexe agora, transforma ameaça em vantagem.`,
      frase: '"A Reforma vai separar quem se adaptou de quem foi varrido. De que lado você quer estar?"'
    });
  }

  // Impacto da Reforma positivo
  if (impactoReforma < 0 && melhor && Math.abs(impactoReforma) > melhor.dados.total * 0.1) {
    dicas.push({
      tipo: 'oportunidade',
      titulo: 'A Reforma Tributária pode te favorecer',
      texto: `No cenário pleno (2033+), sua empresa pagaria ${fmtBRL(Math.abs(impactoReforma) * 12)} a menos por ano. Mas só se mantiver organização documental impecável para aproveitar todos os créditos não-cumulativos disponíveis.`,
      frase: '"Vantagem competitiva começa onde a maioria não olha — nos detalhes da nota fiscal."'
    });
  }

  // INSS patronal alto no Anexo IV
  if (anexo === 'IV' && simples.inssExtra > simples.das * 0.3) {
    dicas.push({
      tipo: 'atencao',
      titulo: 'Carga de INSS patronal está pesada',
      texto: 'No Anexo IV, o INSS patronal de 22% sobre a folha pesa muito. Avalie terceirização estratégica, pejotização legal de prestadores especializados, ou migração para outro anexo (se o CNAE permitir).',
      frase: '"Carga trabalhista não é custo fixo. É variável estratégica."'
    });
  }

  // Empresário sem despesas dedutíveis declaradas
  if (real.total > 0 && (real.lucroContabil / receitaMes) > 0.5) {
    dicas.push({
      tipo: 'info',
      titulo: 'Suas despesas dedutíveis parecem subnotificadas',
      texto: `Sua margem aparente é ${((real.lucroContabil / receitaMes) * 100).toFixed(1).replace('.', ',')}%. Empresas com essa margem real são raras — provavelmente você tem despesas dedutíveis não computadas (combustível, depreciação, despesas administrativas). Organize a documentação. Cada R$ 1.000 em despesa dedutível economiza até R$ 340 em tributos.`,
      frase: '"Documento bem guardado é dinheiro no bolso. Documento perdido é imposto pago em dobro."'
    });
  }

  // Dica universal de crescimento
  if (dicas.length < 2) {
    dicas.push({
      tipo: 'info',
      titulo: 'Crescimento exige planejamento tributário ativo',
      texto: 'Empresas que crescem 30%+ ao ano revisam seu regime tributário a cada 6 meses. O que era ideal há um ano pode estar custando caro hoje. Considere uma revisão estratégica.',
      frase: '"Crescimento sem revisão tributária é freio puxado no acelerador."'
    });
  }

  return dicas.slice(0, 4); // máximo 4 dicas
}

// ============================================================
// PERSISTÊNCIA DE SIMULAÇÕES (em memória do componente)
// ============================================================
// Estrutura de uma simulação salva:
// { id, nome, dataISO, inputs: {rbt12, receitaMes, folhaMes, anexo, atividade, despesas, creditos, issAliq, icmsAliq},
//   resultados: {simples, presumido, real, reforma, melhor} }

// ============================================================
// EXPORTAÇÃO PDF — Gera relatório imprimível via window.print()
// ============================================================
function exportarPDF(dadosSimulacao, usuario, fraseMotivacional) {
  const { inputs, resultados, nome } = dadosSimulacao;
  const { simples, presumido, real, reforma, melhor } = resultados;
  const dataFormatada = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  const economia = melhor && resultados.pior ? resultados.pior.total - melhor.total : 0;

  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Relatório Tributário AX Educação — ${nome || 'Simulação'}</title>
<style>
  @page { size: A4; margin: 1.5cm 1.2cm; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 100%; max-width: 100%; overflow-x: hidden; }
  body { font-family: Georgia, 'Times New Roman', serif; color: #0a1e3d; line-height: 1.5; font-size: 10.5pt; }

  /* Header com largura controlada — não usa margem negativa */
  .header { background: linear-gradient(135deg, #0a1e3d 0%, #1e3a5f 100%); color: #fff; padding: 22px 24px; margin-bottom: 22px; border-radius: 0; width: 100%; }
  .header-top { display: flex; align-items: center; gap: 16px; margin-bottom: 12px; flex-wrap: wrap; }
  .header-top .divider { height: 38px; border-left: 1px solid rgba(255,255,255,0.2); }
  .header h1 { font-size: 20pt; margin-bottom: 4px; letter-spacing: -0.01em; line-height: 1.15; word-wrap: break-word; }
  .header .subtitle { color: #10b981; font-size: 9.5pt; letter-spacing: 0.12em; text-transform: uppercase; font-weight: 600; }
  .header .gerado { font-size: 8.5pt; color: #d1fae5; margin-top: 2px; letter-spacing: 0.04em; }
  .header .meta { color: #d1fae5; font-size: 9pt; margin-top: 10px; }

  /* Citação motivacional */
  .quote { background: #f1f5f9; border-left: 4px solid #10b981; padding: 12px 16px; margin: 18px 0; font-style: italic; font-size: 10pt; color: #1e3a5f; page-break-inside: avoid; }

  /* Títulos de seção */
  h2 { font-size: 12pt; color: #0a1e3d; border-bottom: 2px solid #10b981; padding-bottom: 4px; margin: 22px 0 10px 0; page-break-after: avoid; }
  h3 { font-size: 10.5pt; color: #1e3a5f; margin: 14px 0 6px 0; page-break-after: avoid; }

  /* Grid de 3 cards lado a lado */
  .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin: 10px 0; page-break-inside: avoid; }
  .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 10px 12px; page-break-inside: avoid; }
  .card.melhor { background: #ecfdf5; border-color: #10b981; }
  .card .label { font-size: 7.5pt; text-transform: uppercase; color: #64748b; letter-spacing: 0.08em; }
  .card .valor { font-size: 14pt; font-weight: bold; color: #0a1e3d; margin: 3px 0; word-break: break-word; }
  .card .sub { font-size: 8pt; color: #64748b; }

  /* Box do vencedor (destaque) */
  .winner { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #fff; padding: 16px 18px; border-radius: 8px; margin: 14px 0; page-break-inside: avoid; }
  .winner .label { font-size: 8.5pt; text-transform: uppercase; letter-spacing: 0.12em; opacity: 0.9; }
  .winner .nome { font-size: 18pt; font-weight: bold; margin: 4px 0; word-wrap: break-word; }
  .winner .valor { font-size: 12pt; }
  .winner .economia { margin-top: 8px; font-size: 9pt; }

  /* Tabelas — fundamental no PDF */
  table { width: 100%; border-collapse: collapse; margin: 8px 0; font-size: 9pt; page-break-inside: auto; }
  thead { display: table-header-group; }
  tr { page-break-inside: avoid; page-break-after: auto; }
  th { background: #f1f5f9; color: #0a1e3d; text-align: left; padding: 6px 8px; font-size: 8pt; text-transform: uppercase; letter-spacing: 0.04em; font-weight: bold; }
  th.r, td.r { text-align: right; }
  td { padding: 5px 8px; border-bottom: 1px solid #e2e8f0; vertical-align: top; }
  td .label { font-weight: 600; color: #0a1e3d; font-size: 9pt; }
  td .subt { font-size: 7.5pt; color: #64748b; display: block; margin-top: 1px; font-family: Arial, sans-serif; line-height: 1.3; }
  tr.total td { font-weight: bold; background: #f1f5f9; border-top: 2px solid #10b981; }

  /* Boxes informativos */
  .info-box { background: #dbeafe; border-radius: 6px; padding: 10px 14px; margin: 10px 0; font-size: 9pt; page-break-inside: avoid; }
  .alert-box { background: #fef2f2; border-left: 4px solid #dc2626; padding: 10px 14px; margin: 10px 0; font-size: 9pt; color: #7f1d1d; page-break-inside: avoid; }
  .success-box { background: #ecfdf5; border-left: 4px solid #10b981; padding: 10px 14px; margin: 10px 0; font-size: 9pt; color: #064e3b; page-break-inside: avoid; }

  /* Insights individuais (cada um avoid-break) */
  .insight { background: #f8fafc; border-left: 4px solid #10b981; padding: 10px 14px; margin: 8px 0; border-radius: 0 6px 6px 0; page-break-inside: avoid; }
  .insight .titulo { font-weight: bold; color: #0a1e3d; margin-bottom: 4px; font-size: 10pt; }
  .insight .texto { font-size: 9.5pt; color: #1e3a5f; margin-bottom: 5px; }
  .insight .frase { font-style: italic; color: #059669; font-size: 9pt; border-top: 1px solid #e2e8f0; padding-top: 5px; margin-top: 5px; }

  /* CTA final */
  .cta { background: #0a1e3d; color: #fff; padding: 16px 18px; border-radius: 8px; margin: 22px 0 18px 0; text-align: center; page-break-inside: avoid; }
  .cta h3 { color: #10b981; font-size: 11pt; margin-bottom: 4px; border: none; padding: 0; }
  .cta p { font-size: 9.5pt; color: #f8fafc; }

  /* Footer */
  .footer { margin-top: 30px; padding-top: 16px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 8pt; color: #64748b; page-break-inside: avoid; }
  .footer img { display: block; margin: 0 auto 10px; }
  .footer strong { color: #0a1e3d; }

  /* Barra de ações no topo (não aparece na impressão) */
  .actions { padding: 14px; text-align: center; background: #f1f5f9; margin-bottom: 18px; border-radius: 8px; }
  .actions button { background: #10b981; color: #fff; border: none; padding: 9px 22px; font-size: 10.5pt; border-radius: 6px; cursor: pointer; font-family: Georgia, serif; font-weight: 600; }
  .actions button:hover { opacity: 0.9; }

  /* Regras de impressão */
  @media print {
    .no-print { display: none !important; }
    body {
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
      color-adjust: exact;
    }
    .header { border-radius: 0; }
    h2 { margin-top: 16px; }
    /* Evita órfãos e viúvas */
    p, li { orphans: 3; widows: 3; }
  }
</style>
</head>
<body>
  <div class="actions no-print">
    <button onclick="window.print()" style="background:#10b981;">🖨️ Salvar como PDF / Imprimir</button>
    <button onclick="window.close()" style="background:#64748b;margin-left:10px;">Fechar</button>
    <div style="margin-top:10px;font-size:9pt;color:#475569;">
      Dica: ao imprimir, escolha "Salvar como PDF" como destino para gerar o arquivo PDF.
    </div>
  </div>
  <div class="header">
    <div class="header-top">
      <img src="${LOGO_AX_WHITE}" alt="AX Educação" style="height:38px;width:auto;" />
      <div class="divider"></div>
      <div>
        <div class="subtitle">Contabilidade Estratégica</div>
        <div class="gerado">Gerado pelo Simulador Tributário AX Educação</div>
      </div>
    </div>
    <h1>Relatório Tributário Comparativo</h1>
    <div class="meta">${nome ? `<strong>${nome}</strong> · ` : ''}Gerado em ${dataFormatada} · Para: ${usuario.nome}</div>
  </div>

  ${fraseMotivacional ? `<div class="quote">"${fraseMotivacional.texto}"</div>` : ''}

  <h2>📋 Parâmetros analisados</h2>
  <table>
    <tr><td><span class="label">Faturamento (RBT12)</span></td><td class="r">${fmtBRL(inputs.rbt12 || 0)}</td>
        <td><span class="label">Faturamento mensal</span></td><td class="r">${fmtBRL(inputs.receitaMes || 0)}</td></tr>
    <tr><td><span class="label">Folha mensal</span></td><td class="r">${fmtBRL(inputs.folhaMes || 0)}</td>
        <td><span class="label">Atividade</span></td><td class="r">${labelAtividade(inputs.atividade)}</td></tr>
    <tr><td><span class="label">Despesas dedutíveis</span></td><td class="r">${fmtBRL(inputs.despesas || 0)}</td>
        <td><span class="label">Créditos PIS/COFINS</span></td><td class="r">${fmtBRL(inputs.creditos || 0)}</td></tr>
  </table>

  ${melhor ? `
  <div class="winner">
    <div class="label">REGIME MAIS VANTAJOSO HOJE</div>
    <div class="nome">${melhor.nome}</div>
    <div class="valor">${fmtBRL(melhor.total)}/mês · Alíquota efetiva de ${fmtPct(melhor.aliquotaEfetiva)}</div>
    ${economia > 100 ? `<div class="economia">💰 Economia anual: <strong>${fmtBRL(economia * 12)}</strong> versus o regime mais caro</div>` : ''}
  </div>` : ''}

  <h2>📊 Comparativo dos 3 regimes (mensal)</h2>
  <div class="grid-3">
    <div class="card ${melhor?.id === 'simples' ? 'melhor' : ''}">
      <div class="label">Simples Nacional</div>
      <div class="valor">${fmtBRL(simples.total || 0)}</div>
      <div class="sub">Alíquota: ${fmtPct(simples.aliquotaEfetiva || 0)}</div>
    </div>
    <div class="card ${melhor?.id === 'presumido' ? 'melhor' : ''}">
      <div class="label">Lucro Presumido</div>
      <div class="valor">${fmtBRL(presumido.total || 0)}</div>
      <div class="sub">Alíquota: ${fmtPct(presumido.aliquotaEfetiva || 0)}</div>
    </div>
    <div class="card ${melhor?.id === 'real' ? 'melhor' : ''}">
      <div class="label">Lucro Real</div>
      <div class="valor">${fmtBRL(real.total || 0)}</div>
      <div class="sub">Alíquota: ${fmtPct(real.aliquotaEfetiva || 0)}</div>
    </div>
  </div>

  <h2>🧾 Detalhamento por tributo</h2>
  <table>
    <thead>
      <tr><th>Tributo</th><th class="r">Simples</th><th class="r">Presumido</th><th class="r">Lucro Real</th></tr>
    </thead>
    <tbody>
      <tr><td><span class="label">DAS</span><span class="subt">alíq. efetiva ${fmtPct(simples.aliquotaEfetiva || 0)}</span></td>
          <td class="r">${simples.das > 0 ? fmtBRL(simples.das) : '—'}</td><td class="r">—</td><td class="r">—</td></tr>
      <tr><td><span class="label">PIS</span><span class="subt">0,65% cumulativo</span></td>
          <td class="r">—</td><td class="r">${presumido.pis > 0 ? fmtBRL(presumido.pis) : '—'}</td><td class="r">—</td></tr>
      <tr><td><span class="label">COFINS</span><span class="subt">3,00% cumulativo</span></td>
          <td class="r">—</td><td class="r">${presumido.cofins > 0 ? fmtBRL(presumido.cofins) : '—'}</td><td class="r">—</td></tr>
      <tr><td><span class="label">PIS/COFINS</span><span class="subt">9,25% não-cumulativo</span></td>
          <td class="r">—</td><td class="r">—</td><td class="r">${real.pisCofins > 0 ? fmtBRL(real.pisCofins) : '—'}</td></tr>
      <tr><td><span class="label">IRPJ</span><span class="subt">15% sobre lucro/presunção</span></td>
          <td class="r">—</td><td class="r">${presumido.irpj > 0 ? fmtBRL(presumido.irpj) : '—'}</td><td class="r">${real.irpj > 0 ? fmtBRL(real.irpj) : '—'}</td></tr>
      <tr><td><span class="label">CSLL</span><span class="subt">9% sobre lucro/presunção</span></td>
          <td class="r">—</td><td class="r">${presumido.csll > 0 ? fmtBRL(presumido.csll) : '—'}</td><td class="r">${real.csll > 0 ? fmtBRL(real.csll) : '—'}</td></tr>
      <tr><td><span class="label">ISS/ICMS</span><span class="subt">conforme município/estado</span></td>
          <td class="r">—</td><td class="r">${presumido.issIcms > 0 ? fmtBRL(presumido.issIcms) : '—'}</td><td class="r">${real.issIcms > 0 ? fmtBRL(real.issIcms) : '—'}</td></tr>
      <tr><td><span class="label">INSS patronal</span><span class="subt">22% sobre folha</span></td>
          <td class="r">${simples.inssExtra > 0 ? fmtBRL(simples.inssExtra) : '—'}</td>
          <td class="r">${presumido.inssPatronal > 0 ? fmtBRL(presumido.inssPatronal) : '—'}</td>
          <td class="r">${real.inssPatronal > 0 ? fmtBRL(real.inssPatronal) : '—'}</td></tr>
      <tr class="total"><td>TOTAL</td><td class="r">${fmtBRL(simples.total)}</td><td class="r">${fmtBRL(presumido.total)}</td><td class="r">${fmtBRL(real.total)}</td></tr>
    </tbody>
  </table>

  ${reforma && reforma.total > 0 ? `
  <h2>🔮 Impacto da Reforma Tributária (Cenário ${resultados.cenarioReforma})</h2>
  <div class="${resultados.impactoReforma > 0 ? 'alert-box' : 'success-box'}">
    <strong>${resultados.impactoReforma > 0 ? '⚠️ Atenção:' : '✓ Bom cenário:'}</strong>
    No cenário ${resultados.cenarioReforma}, sua empresa pagaria <strong>${fmtBRL(reforma.total)}</strong>/mês 
    — uma variação de <strong>${resultados.impactoReforma > 0 ? '+' : ''}${fmtBRL(resultados.impactoReforma)}</strong> 
    (${resultados.impactoReformaPct > 0 ? '+' : ''}${fmtPct(resultados.impactoReformaPct)}) comparado ao regime atual mais vantajoso.
    Impacto anualizado: <strong>${fmtBRL(Math.abs(resultados.impactoReforma) * 12)}</strong>.
  </div>` : ''}

  ${resultados.dicas && resultados.dicas.length > 0 ? `
  <h2>🚀 Insights estratégicos personalizados</h2>
  ${resultados.dicas.map(d => `
    <div class="insight">
      <div class="titulo">${d.titulo}</div>
      <div class="texto">${d.texto}</div>
      ${d.frase ? `<div class="frase">${d.frase}</div>` : ''}
    </div>
  `).join('')}
  ` : ''}

  <div class="cta">
    <h3>Pronto para transformar essas oportunidades em economia real?</h3>
    <p>Fale com a AX Educação · contato@axeducacao.com.br</p>
  </div>

  <div class="footer">
    <img src="${LOGO_AX_BLUE}" alt="AX Educação" style="height:28px;width:auto;" />
    <p><strong>AX Educação</strong> — Conhecimento estratégico que transforma decisões empresariais.<br><span style="opacity:0.7;">Conteúdo desenvolvido em parceria com ASSL Contabilidade Estratégica.</span></p>
    <p style="margin-top:6px;">Especialistas em planejamento.</p>
    <p style="margin-top:10px;font-size:8pt;color:#10b981;font-weight:600;letter-spacing:0.04em;">📄 Relatório gerado pelo Simulador Tributário AX Educação</p>
    <p style="margin-top:6px;font-size:7pt;">Este relatório é uma simulação informativa baseada nos dados fornecidos. Decisões definitivas requerem análise individualizada por nosso time. Tabelas vigentes em 2026 · Reforma Tributária conforme LC 214/2025.</p>
  </div>
</body>
</html>`;

  // Cria Blob HTML e abre em nova aba via link clicável (não usa window.open puro
  // pois pop-up blockers bloqueiam quando o open vem após processamento assíncrono)
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);

  // Tenta abrir em nova aba
  const w = window.open(url, '_blank');

  if (!w || w.closed || typeof w.closed === 'undefined') {
    // Pop-up bloqueado — oferece como download direto
    const a = document.createElement('a');
    a.href = url;
    a.download = `Relatorio_AX_${nome ? nome.replace(/[^a-zA-Z0-9]/g, '_') : 'simulacao'}_${new Date().toISOString().slice(0, 10)}.html`;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    alert('O relatório foi baixado como arquivo HTML. Abra-o no navegador e clique em "Salvar como PDF / Imprimir".\n\nPara abrir direto, habilite pop-ups para este site nas configurações do navegador.');
  } else {
    // Aba abriu com sucesso — limpa URL depois de um tempo
    setTimeout(() => URL.revokeObjectURL(url), 30000);
  }
}

function labelAtividade(a) {
  return ATIVIDADES_META[a]?.label || a;
}

// ============================================================
// SISTEMA DE NOTIFICAÇÕES DE RENOVAÇÃO
// ============================================================

// Determina o nível de urgência baseado em dias restantes
function getNivelExpiracao(diasRestantes) {
  if (diasRestantes <= 1) return { nivel: 'critico', cor: '#dc2626', bg: '#fef2f2', label: 'ÚLTIMA CHAMADA', icone: '🚨' };
  if (diasRestantes <= 7) return { nivel: 'urgente', cor: '#ea580c', bg: '#fff7ed', label: 'URGENTE', icone: '⏰' };
  if (diasRestantes <= 15) return { nivel: 'alerta', cor: '#d97706', bg: '#fffbeb', label: 'ATENÇÃO', icone: '⚠️' };
  if (diasRestantes <= 30) return { nivel: 'aviso', cor: '#0a1e3d', bg: '#dbeafe', label: 'AVISO', icone: '📅' };
  return null;
}

// Decide se deve disparar notificação hoje (30, 15, 7, 1 dia)
function devesDisparar(diasRestantes) {
  return [30, 15, 7, 1].includes(diasRestantes);
}

// Formata número BR para WhatsApp (com DDI)
function formatarTelefone(tel) {
  if (!tel) return '';
  const clean = tel.replace(/\D/g, '');
  if (clean.length === 11) return `+55 (${clean.slice(0,2)}) ${clean.slice(2,7)}-${clean.slice(7)}`;
  if (clean.length === 10) return `+55 (${clean.slice(0,2)}) ${clean.slice(2,6)}-${clean.slice(6)}`;
  return tel;
}

// Gera mensagem padrão de WhatsApp para renovação
function gerarMensagemWhatsApp(nome, diasRestantes) {
  const nivel = getNivelExpiracao(diasRestantes);
  const urgencia = diasRestantes <= 1 ? 'EXPIRA AMANHÃ' : `expira em ${diasRestantes} dias`;
  return `Olá, ${nome}! 👋\n\nSeu acesso ao Simulador Tributário AX Educação ${urgencia}.\n\nRenove agora e continue tendo acesso a:\n✓ Simulações ilimitadas dos 3 regimes\n✓ Análise da Reforma Tributária\n✓ Insights estratégicos personalizados\n✓ Exportação de relatórios PDF\n\n👉 Acesse axeducacao.com.br ou responda este e-mail para renovar.\n\nAX Educação\nConhecimento que transforma decisões 💼`;
}

// Gera assunto e corpo de e-mail
function gerarEmailRenovacao(nome, diasRestantes) {
  const urgencia = diasRestantes <= 1 ? '⚠️ EXPIRA AMANHÃ' : diasRestantes <= 7 ? `🔴 ${diasRestantes} dias restantes` : `📅 ${diasRestantes} dias para expirar`;
  return {
    assunto: `${urgencia} — Renove seu acesso ao Simulador Tributário AX Educação`,
    corpo: `Olá ${nome},\n\nSeu acesso ao Simulador Tributário AX Educação ${diasRestantes <= 1 ? 'expira amanhã' : `expira em ${diasRestantes} dias`}.\n\nPara não interromper seu planejamento tributário e continuar aproveitando todas as funcionalidades — simulações em tempo real, análise da Reforma Tributária, insights estratégicos e exportação de relatórios — renove seu plano antes do vencimento.\n\nAcesse seu painel em axeducacao.com.br ou responda este e-mail.\n\nAtenciosamente,\nEquipe AX Educação\nConhecimento que transforma decisões.`
  };
}

// Verifica se já enviou notificação para esse marco no histórico do usuário
function jaNotificou(usuario, diasRestantes, canal) {
  if (!usuario.notificacoes) return false;
  return usuario.notificacoes.some(n => n.marco === diasRestantes && n.canal === canal);
}

// ============================================================
// COMPONENTES BÁSICOS
// ============================================================

// Campo numérico com formatação BR em tempo real
// Cursor fica ancorado no dígito sendo editado, NUNCA pula pro fim
function CampoNumerico({ label, value, onChange, hint, suffix = 'R$', disabled = false }) {
  const inputRef = useRef(null);
  const [texto, setTexto] = useState(value == null ? '' : fmtNum(value));
  // Flag: estamos editando localmente (não usar sync com value externo)
  const editandoAgora = useRef(false);

  // Sincroniza quando o valor externo muda (ex: carregar simulação salva)
  // MAS apenas quando NÃO estamos no meio de uma digitação
  useEffect(() => {
    if (editandoAgora.current) return;
    setTexto(value == null ? '' : fmtNum(value));
  }, [value]);

  const onChangeLocal = (e) => {
    const input = e.target;
    const raw = input.value;
    const cursorPos = input.selectionStart;

    // Marca que estamos editando para o useEffect não atrapalhar
    editandoAgora.current = true;

    // permite apagar tudo
    if (raw === '') {
      setTexto('');
      onChange(null);
      // libera flag depois do ciclo
      setTimeout(() => { editandoAgora.current = false; }, 0);
      return;
    }
    // aceita apenas dígitos, vírgula e ponto
    if (!/^[\d.,]*$/.test(raw)) {
      editandoAgora.current = false;
      return;
    }
    // só pode ter 1 vírgula
    if ((raw.match(/,/g) || []).length > 1) {
      editandoAgora.current = false;
      return;
    }

    // Conta quantos DÍGITOS existem antes da posição atual do cursor
    const digitosAntesDoCursor = (raw.slice(0, cursorPos).match(/\d/g) || []).length;

    // Reformata
    const partes = raw.split(',');
    const inteira = partes[0].replace(/\./g, '');
    const decimal = partes[1];

    let inteiraFormatada = '';
    if (inteira) {
      const num = parseInt(inteira, 10);
      if (!isNaN(num)) inteiraFormatada = num.toLocaleString('pt-BR');
    }

    let textoFinal = inteiraFormatada;
    if (decimal !== undefined) {
      textoFinal += ',' + decimal.slice(0, 2);
    }

    // Calcula nova posição: avança no texto formatado até passar pelo Nº de dígitos certo
    let novaPos = 0;
    if (digitosAntesDoCursor > 0) {
      let contados = 0;
      for (let i = 0; i < textoFinal.length; i++) {
        if (/\d/.test(textoFinal[i])) {
          contados++;
          if (contados === digitosAntesDoCursor) {
            novaPos = i + 1;
            break;
          }
        }
      }
      if (contados < digitosAntesDoCursor) novaPos = textoFinal.length;
    }

    // Atualiza estado React
    setTexto(textoFinal);

    // Calcula valor numérico
    const valorNum = parseFloat((inteira || '0') + '.' + (decimal || '0'));
    onChange(isNaN(valorNum) ? null : valorNum);

    // CRUCIAL: posiciona o cursor usando múltiplas estratégias para garantir funcionamento
    // Estratégia 1: posiciona imediatamente (funciona quando React já commitou)
    // Estratégia 2: requestAnimationFrame duplo (após próximo paint do browser)
    const aplicarCursor = () => {
      if (inputRef.current && document.activeElement === inputRef.current) {
        try {
          inputRef.current.setSelectionRange(novaPos, novaPos);
        } catch (err) { /* silencioso */ }
      }
    };

    // Aplica em vários momentos para garantir
    aplicarCursor();
    requestAnimationFrame(() => {
      aplicarCursor();
      requestAnimationFrame(() => {
        aplicarCursor();
        editandoAgora.current = false;
      });
    });
  };

  return (
    <div className="mb-4">
      <label className="text-xs uppercase tracking-wider block mb-1.5 font-semibold" style={{ color: C.navyMid, letterSpacing: '0.08em' }}>{label}</label>
      <div className="relative">
        {suffix === 'R$' && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold" style={{ color: C.textMuted }}>R$</span>
        )}
        <input
          ref={inputRef}
          type="text"
          inputMode="decimal"
          value={texto}
          onChange={onChangeLocal}
          disabled={disabled}
          placeholder="0,00"
          className="w-full py-2.5 rounded-lg text-sm outline-none transition-colors focus:border-current"
          style={{
            paddingLeft: suffix === 'R$' ? '2.4rem' : '0.75rem',
            paddingRight: suffix && suffix !== 'R$' ? '2.4rem' : '0.75rem',
            background: C.bgInput,
            border: `1px solid ${C.border}`,
            color: C.navy,
            opacity: disabled ? 0.4 : 1,
            fontVariantNumeric: 'tabular-nums'
          }}
        />
        {suffix && suffix !== 'R$' && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs" style={{ color: C.textMuted }}>{suffix}</span>
        )}
      </div>
      {hint && <p className="text-xs mt-1" style={{ color: C.textDim }}>{hint}</p>}
    </div>
  );
}

// ============================================================
// TELA DE LOGIN
// ============================================================
function TelaLogin({ onLogin, usuarios }) {
  const [modo, setModo] = useState('login');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [erro, setErro] = useState('');

  // Frase motivacional sorteada a cada acesso à tela de login
  const fraseLogin = useMemo(() =>
    FRASES_MOTIVACIONAIS[Math.floor(Math.random() * FRASES_MOTIVACIONAIS.length)],
    []
  );

  const submit = () => {
    setErro('');
    if (modo === 'login') {
      const u = usuarios.find(x => x.email === email && x.senha === senha);
      if (!u) { setErro('Credenciais inválidas.'); return; }
      if (u.role !== 'admin' && new Date(u.validadeAte) < new Date()) {
        setErro('Sua assinatura expirou. Renove para continuar.'); return;
      }
      onLogin(u);
    } else {
      if (!nome || !email || !senha) { setErro('Preencha todos os campos.'); return; }
      if (usuarios.some(x => x.email === email)) { setErro('E-mail já cadastrado.'); return; }
      onLogin({ novo: true, nome, email, senha });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{
      background: `radial-gradient(circle at 20% 20%, rgba(16,185,129,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(10,30,61,0.04) 0%, transparent 50%), ${C.bgDeep}`
    }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <img src={LOGO_AX_BLUE} alt="AX Educação" style={{ height: '54px', width: 'auto', margin: '0 auto 20px' }} />
          <h1 className="text-3xl mb-3" style={{ color: C.navy, fontFamily: 'Georgia, serif', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Simulador Tributário
          </h1>
          <div className="px-4 py-3 rounded-lg inline-block max-w-sm" style={{ background: C.bgCard, border: `1px solid ${C.border}`, boxShadow: '0 1px 3px rgba(10,30,61,0.04)' }}>
            <p className="text-sm italic leading-relaxed" style={{ fontFamily: 'Georgia, serif', color: C.navyMid }}>
              "{fraseLogin.texto}"
            </p>
          </div>
        </div>

        <div className="rounded-2xl p-8" style={{ background: C.bgCard, border: `1px solid ${C.border}`, boxShadow: '0 10px 40px rgba(10,30,61,0.08)' }}>
          <div className="flex mb-6 gap-1 p-1 rounded-lg" style={{ background: C.bgInput }}>
            {['login', 'cadastro'].map(m => (
              <button key={m} onClick={() => setModo(m)} className="flex-1 py-2 text-sm rounded-md transition-all"
                style={{
                  background: modo === m ? C.bgCard : 'transparent',
                  color: modo === m ? C.navy : C.textMuted,
                  fontFamily: 'Georgia, serif',
                  fontWeight: modo === m ? 600 : 400,
                  boxShadow: modo === m ? '0 1px 3px rgba(10,30,61,0.08)' : 'none'
                }}>
                {m === 'login' ? 'Entrar' : 'Criar conta'}
              </button>
            ))}
          </div>

          {modo === 'cadastro' && (
            <div className="mb-4">
              <label className="text-xs uppercase tracking-wider mb-2 block font-semibold" style={{ color: C.navyMid }}>Nome</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: C.textMuted }} />
                <input type="text" value={nome} onChange={e => setNome(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 rounded-lg text-sm outline-none focus:border-current"
                  style={{ background: C.bgInput, border: `1px solid ${C.border}`, color: C.navy }}
                  placeholder="Seu nome" />
              </div>
            </div>
          )}

          <div className="mb-4">
            <label className="text-xs uppercase tracking-wider mb-2 block font-semibold" style={{ color: C.navyMid }}>E-mail</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: C.textMuted }} />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-3 rounded-lg text-sm outline-none"
                style={{ background: C.bgInput, border: `1px solid ${C.border}`, color: C.navy }}
                placeholder="seu email de cadastro" />
            </div>
          </div>

          <div className="mb-6">
            <label className="text-xs uppercase tracking-wider mb-2 block font-semibold" style={{ color: C.navyMid }}>Senha</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: C.textMuted }} />
              <input type={showPwd ? 'text' : 'password'} value={senha} onChange={e => setSenha(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && submit()}
                className="w-full pl-10 pr-10 py-3 rounded-lg text-sm outline-none"
                style={{ background: C.bgInput, border: `1px solid ${C.border}`, color: C.navy }}
                placeholder="••••••••" />
              <button onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: C.textMuted }}>
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {erro && (
            <div className="mb-4 p-3 rounded-lg flex items-start gap-2 text-xs" style={{ background: '#fef2f2', border: '1px solid #fecaca', color: C.danger }}>
              <AlertCircle size={14} className="mt-0.5 shrink-0" />{erro}
            </div>
          )}

          <button onClick={submit} className="w-full py-3 rounded-lg text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDark} 100%)`, color: '#ffffff', fontFamily: 'Georgia, serif', boxShadow: '0 4px 12px rgba(16,185,129,0.25)' }}>
            {modo === 'login' ? 'Entrar →' : 'Continuar →'}
          </button>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: C.textMuted }}>
          AX Educação · Conhecimento estratégico em parceria com ASSL Contabilidade
        </p>
      </div>
    </div>
  );
}

// ============================================================
// TELA DE PLANOS
// ============================================================
function TelaPlanos({ novoUsuario, onAssinar, onVoltar }) {
  const [codigo, setCodigo] = useState('');

  const ativarComoCliente = () => {
    if (codigo.trim().toUpperCase() === 'AX2026') onAssinar('cliente-especial', 365);
    else alert('Código inválido. Solicite ao suporte da AX Educação.');
  };

  return (
    <div className="min-h-screen p-6" style={{ background: C.bgDeep, color: C.navy }}>
      <div className="max-w-5xl mx-auto pt-12">
        <button onClick={onVoltar} className="text-sm mb-8 hover:opacity-80" style={{ color: C.textMuted }}>← voltar</button>
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-3" style={{ fontFamily: 'Georgia, serif', fontWeight: 700, color: C.navy }}>Escolha seu acesso</h1>
          <p style={{ color: C.textMuted }}>Olá, {novoUsuario?.nome}. Selecione o plano ideal.</p>
        </div>

        <div className="rounded-2xl p-6 mb-8" style={{ background: 'rgba(16,185,129,0.05)', border: `1px solid ${C.primarySoft}`, boxShadow: '0 1px 3px rgba(10,30,61,0.04)' }}>
          <div className="flex items-center gap-3 mb-3">
            <Crown size={18} style={{ color: C.primary }} />
            <h3 className="text-lg font-bold" style={{ fontFamily: 'Georgia, serif', color: C.navy }}>Tem um código de ativação?</h3>
          </div>
          <p className="text-sm mb-4" style={{ color: C.textMuted }}>
            Acesso anual incluso na sua mensalidade. Informe o código do consultor.
          </p>
          <div className="flex gap-3">
            <input type="text" value={codigo} onChange={e => setCodigo(e.target.value)} placeholder="Código de ativação"
              className="flex-1 px-4 py-3 rounded-lg text-sm outline-none"
              style={{ background: C.bgCard, border: `1px solid ${C.border}`, color: C.navy }} />
            <button onClick={ativarComoCliente} className="px-6 py-3 rounded-lg text-sm font-semibold"
              style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDark} 100%)`, color: '#ffffff', fontFamily: 'Georgia, serif', boxShadow: '0 4px 12px rgba(16,185,129,0.25)' }}>Ativar</button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl p-8" style={{ background: C.bgCard, border: `1px solid ${C.border}`, boxShadow: '0 4px 12px rgba(10,30,61,0.06)' }}>
            <div className="text-xs uppercase tracking-widest mb-2 font-bold" style={{ color: C.textMuted }}>Mensal</div>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-4xl font-bold" style={{ fontFamily: 'Georgia, serif', color: C.navy }}>R$ 97</span>
              <span className="text-sm" style={{ color: C.textMuted }}>/mês</span>
            </div>
            <ul className="space-y-3 mb-8 text-sm" style={{ color: C.navyMid }}>
              {['Simulações ilimitadas', 'Comparativo 3 regimes + Reforma', 'Histórico salvo', 'Suporte por e-mail'].map(t => (
                <li key={t} className="flex items-start gap-2"><Check size={16} style={{ color: C.primary }} className="mt-0.5 shrink-0" />{t}</li>
              ))}
            </ul>
            <button onClick={() => onAssinar('mensal', 30)} className="w-full py-3 rounded-lg text-sm font-semibold"
              style={{ background: C.bgInput, color: C.navy, border: `1px solid ${C.border}`, fontFamily: 'Georgia, serif' }}>
              Assinar mensal
            </button>
          </div>

          <div className="rounded-2xl p-8 relative" style={{ background: `linear-gradient(180deg, ${C.navy} 0%, ${C.navyMid} 100%)`, boxShadow: '0 10px 30px rgba(10,30,61,0.25)' }}>
            <div className="absolute -top-3 right-6 px-3 py-1 rounded-full text-xs font-bold" style={{ background: C.primary, color: '#ffffff', fontFamily: 'Georgia, serif' }}>
              Economize 2 meses
            </div>
            <div className="text-xs uppercase tracking-widest mb-2 font-bold" style={{ color: C.primary }}>Anual</div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-4xl font-bold" style={{ fontFamily: 'Georgia, serif', color: C.textInvert }}>R$ 970</span>
              <span className="text-sm" style={{ color: C.primarySoft }}>/ano</span>
            </div>
            <p className="text-xs mb-4" style={{ color: C.primarySoft }}>equivalente a R$ 80,83/mês</p>
            <ul className="space-y-3 mb-8 text-sm" style={{ color: C.textInvert }}>
              {['Tudo do mensal', 'Relatórios PDF personalizados', 'Acesso prioritário ao suporte', 'Atualização automática de alíquotas'].map(t => (
                <li key={t} className="flex items-start gap-2"><Check size={16} style={{ color: C.primary }} className="mt-0.5 shrink-0" />{t}</li>
              ))}
            </ul>
            <button onClick={() => onAssinar('anual', 365)} className="w-full py-3 rounded-lg text-sm font-bold"
              style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDark} 100%)`, color: '#ffffff', fontFamily: 'Georgia, serif', boxShadow: '0 4px 12px rgba(16,185,129,0.4)' }}>
              Assinar anual
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// PAINEL CALCULADORA
// ============================================================
function PainelCalculadora({ usuario, onLogout, onAdmin, usuarios, setUsuarios }) {
  const [rbt12, setRbt12] = useState(null);
  const [receitaMes, setReceitaMes] = useState(null);
  const [folhaMes, setFolhaMes] = useState(null);
  const [anexo, setAnexo] = useState('III');
  const [atividade, setAtividade] = useState('servicos');
  const [despesas, setDespesas] = useState(null);
  const [creditos, setCreditos] = useState(null);
  const [issAliq, setIssAliq] = useState(null);
  const [icmsAliq, setIcmsAliq] = useState(null);
  const [cenarioReforma, setCenarioReforma] = useState('2033+');
  const [mostrarReforma, setMostrarReforma] = useState(true);
  const [mostrarPontos, setMostrarPontos] = useState(false);

  // Simulações salvas + UI de gestão
  const [simulacoesSalvas, setSimulacoesSalvas] = useState([]);
  const [modalAberto, setModalAberto] = useState(null); // 'salvar' | 'biblioteca' | 'comparar' | 'fatorR' | null
  const [nomeSimulacao, setNomeSimulacao] = useState('');
  const [simulacoesComparar, setSimulacoesComparar] = useState([]);

  // Incentivos fiscais opcionais
  const [equiparacaoHosp, setEquiparacaoHosp] = useState(false);
  const [pctExportacao, setPctExportacao] = useState(null);

  // Sistema de renovação
  const [popupRenovacao, setPopupRenovacao] = useState(null); // dados do popup ou null
  const [toasts, setToasts] = useState([]); // notificações temporárias
  const [popupJaMostrado, setPopupJaMostrado] = useState(false); // controle de sessão

  // Calcula dias restantes
  const diasRestantes = usuario.role === 'admin' ? 999 : Math.ceil((new Date(usuario.validadeAte) - new Date()) / (1000 * 60 * 60 * 24));
  const nivelExp = usuario.role !== 'admin' && diasRestantes <= 30 && diasRestantes >= 0 ? getNivelExpiracao(diasRestantes) : null;

  // Dispara popup e notificações ao montar o componente (login)
  useEffect(() => {
    if (usuario.role === 'admin' || popupJaMostrado) return;
    if (diasRestantes > 30 || diasRestantes < 0) return;

    // Mostra popup se estiver em marco
    if (devesDisparar(diasRestantes)) {
      // Verifica se já notificou nesse marco
      const jaNotificadoEmail = jaNotificou(usuario, diasRestantes, 'email');
      const jaNotificadoWA = jaNotificou(usuario, diasRestantes, 'whatsapp');

      setPopupRenovacao({
        diasRestantes,
        nivel: getNivelExpiracao(diasRestantes),
        jaNotificadoEmail,
        jaNotificadoWA
      });
      setPopupJaMostrado(true);
    } else if (nivelExp) {
      // Não está em marco mas está expirando — só popup de aviso
      setPopupRenovacao({
        diasRestantes,
        nivel: nivelExp,
        jaNotificadoEmail: true, // não dispara automaticamente
        jaNotificadoWA: true
      });
      setPopupJaMostrado(true);
    }
  }, [usuario.id]);

  // Helpers para toast
  const addToast = (toast) => {
    const id = Date.now() + Math.random();
    setToasts(t => [...t, { id, ...toast }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 5000);
  };

  // Simula envio de notificações e registra no histórico
  const dispararNotificacoes = (canais) => {
    const agora = new Date().toISOString();
    const novasNotificacoes = canais.map(canal => ({
      marco: diasRestantes,
      canal,
      dataEnviada: agora,
      destino: canal === 'email' ? usuario.email : formatarTelefone(usuario.telefone)
    }));

    // Atualiza usuário no array de usuários
    setUsuarios(usuarios.map(u =>
      u.id === usuario.id
        ? { ...u, notificacoes: [...(u.notificacoes || []), ...novasNotificacoes] }
        : u
    ));

    // Toasts visuais
    canais.forEach((canal, i) => {
      setTimeout(() => {
        addToast({
          tipo: 'sucesso',
          canal,
          mensagem: canal === 'email'
            ? `E-mail enviado para ${usuario.email}`
            : `WhatsApp enviado para ${formatarTelefone(usuario.telefone)}`
        });
      }, i * 600);
    });
  };

  // Sorteia uma frase motivacional ao montar o componente (a cada acesso)
  const fraseMotivacional = useMemo(() =>
    FRASES_MOTIVACIONAIS[Math.floor(Math.random() * FRASES_MOTIVACIONAIS.length)],
    []
  );

  const folha12 = (folhaMes || 0) * 12;

  const simples = useMemo(() => calcularSimples({ rbt12: rbt12 || 0, receitaMes: receitaMes || 0, anexo, folha12 }), [rbt12, receitaMes, anexo, folha12]);
  const presumido = useMemo(() => calcularPresumido({
    receitaMes: receitaMes || 0, atividade,
    folhaMes: folhaMes || 0, issAliq: issAliq || 0, icmsAliq: icmsAliq || 0,
    equiparacaoHosp, pctExportacao: pctExportacao || 0
  }), [receitaMes, atividade, folhaMes, issAliq, icmsAliq, equiparacaoHosp, pctExportacao]);

  const real = useMemo(() => calcularReal({
    receitaMes: receitaMes || 0, atividade,
    despesas: despesas || 0, folhaMes: folhaMes || 0,
    creditosPisCofins: creditos || 0, issAliq: issAliq || 0, icmsAliq: icmsAliq || 0,
    pctExportacao: pctExportacao || 0
  }), [receitaMes, atividade, despesas, folhaMes, creditos, issAliq, icmsAliq, pctExportacao]);
  const reforma = useMemo(() => calcularReforma({ receitaMes: receitaMes || 0, atividade, despesas: despesas || 0, folhaMes: folhaMes || 0, creditosTotal: creditos || 0, cenario: cenarioReforma, issAliq: issAliq || 0, icmsAliq: icmsAliq || 0 }), [receitaMes, atividade, despesas, folhaMes, creditos, cenarioReforma, issAliq, icmsAliq]);

  const regimes = [
    { id: 'simples', nome: 'Simples Nacional', dados: simples },
    { id: 'presumido', nome: 'Lucro Presumido', dados: presumido },
    { id: 'real', nome: 'Lucro Real', dados: real },
  ].filter(r => !r.dados.impossivel && r.dados.total > 0);

  const melhor = regimes.reduce((acc, r) => (!acc || r.dados.total < acc.dados.total) ? r : acc, null);
  const pior = regimes.reduce((acc, r) => (!acc || r.dados.total > acc.dados.total) ? r : acc, null);
  const economia = melhor && pior ? pior.dados.total - melhor.dados.total : 0;

  const isServico = atividade === 'servicos' || atividade === 'servicos_hosp' || atividade.startsWith('transporte') || atividade === 'produto_digital' || atividade === 'influencer';

  // Comparativo melhor regime atual vs Reforma
  const impactoReforma = melhor && reforma.total > 0 ? reforma.total - melhor.dados.total : 0;
  const impactoReformaPct = melhor && melhor.dados.total > 0 ? (impactoReforma / melhor.dados.total) * 100 : 0;

  // Gera dicas de crescimento contextuais
  const dicas = useMemo(() => gerarDicasCrescimento({
    rbt12: rbt12 || 0, receitaMes: receitaMes || 0, anexo,
    folhaMes: folhaMes || 0, atividade, simples, presumido, real, melhor, impactoReforma
  }), [rbt12, receitaMes, anexo, folhaMes, atividade, simples, presumido, real, melhor, impactoReforma]);

  // ========== HANDLERS DE SIMULAÇÕES ==========
  const snapshotAtual = () => ({
    inputs: { rbt12, receitaMes, folhaMes, anexo, atividade, despesas, creditos, issAliq, icmsAliq, cenarioReforma },
    resultados: {
      simples, presumido, real, reforma,
      melhor: melhor ? { id: melhor.id, nome: melhor.nome, total: melhor.dados.total, aliquotaEfetiva: melhor.dados.aliquotaEfetiva } : null,
      pior: pior ? { nome: pior.nome, total: pior.dados.total } : null,
      cenarioReforma,
      impactoReforma, impactoReformaPct,
      dicas: dicas
    }
  });

  const handleSalvar = () => {
    if (!nomeSimulacao.trim()) { alert('Dê um nome à simulação'); return; }
    if (!melhor) { alert('Preencha pelo menos receita para salvar'); return; }
    const nova = {
      id: Date.now(),
      nome: nomeSimulacao.trim(),
      dataISO: new Date().toISOString(),
      ...snapshotAtual()
    };
    setSimulacoesSalvas([nova, ...simulacoesSalvas]);
    setNomeSimulacao('');
    setModalAberto(null);
  };

  const handleCarregar = (sim) => {
    const i = sim.inputs;
    setRbt12(i.rbt12); setReceitaMes(i.receitaMes); setFolhaMes(i.folhaMes);
    setAnexo(i.anexo); setAtividade(i.atividade); setDespesas(i.despesas);
    setCreditos(i.creditos); setIssAliq(i.issAliq); setIcmsAliq(i.icmsAliq);
    setCenarioReforma(i.cenarioReforma || '2033+');
    setModalAberto(null);
  };

  const handleRemover = (id) => {
    if (confirm('Remover esta simulação?')) {
      setSimulacoesSalvas(simulacoesSalvas.filter(s => s.id !== id));
      setSimulacoesComparar(simulacoesComparar.filter(x => x !== id));
    }
  };

  const handleExportarPDF = () => {
    if (!melhor) { alert('Preencha pelo menos receita para exportar'); return; }
    const dados = { nome: nomeSimulacao || 'Simulação atual', ...snapshotAtual() };
    exportarPDF(dados, usuario, fraseMotivacional);
  };

  const toggleComparar = (id) => {
    if (simulacoesComparar.includes(id)) {
      setSimulacoesComparar(simulacoesComparar.filter(x => x !== id));
    } else if (simulacoesComparar.length < 3) {
      setSimulacoesComparar([...simulacoesComparar, id]);
    } else {
      alert('Máximo 3 simulações para comparar');
    }
  };

  // ========== DADOS PARA GRÁFICO DE EVOLUÇÃO DA REFORMA ==========
  const dadosGraficoReforma = useMemo(() => {
    if (!melhor) return [];
    return Object.keys(CENARIOS_REFORMA).map(cenario => {
      const r = calcularReforma({
        receitaMes: receitaMes || 0, atividade,
        despesas: despesas || 0, folhaMes: folhaMes || 0,
        creditosTotal: creditos || 0, cenario,
        issAliq: issAliq || 0, icmsAliq: icmsAliq || 0
      });
      return {
        periodo: cenario,
        valor: Math.round(r.total),
        aliquota: parseFloat(r.aliquotaEfetiva?.toFixed(2) || 0),
        atual: Math.round(melhor.dados.total),
      };
    });
  }, [receitaMes, atividade, despesas, folhaMes, creditos, issAliq, icmsAliq, melhor]);

  return (
    <div className="min-h-screen" style={{ background: C.bgDeep, color: C.navy }}>
      <header className="border-b sticky top-0" style={{ borderColor: C.border, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)', boxShadow: '0 1px 3px rgba(10,30,61,0.04)', zIndex: 40 }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={LOGO_AX_BLUE} alt="AX Educação" style={{ height: '38px', width: 'auto' }} />
            <div className="hidden md:block pl-3" style={{ borderLeft: `1px solid ${C.border}` }}>
              <h1 className="text-sm font-bold" style={{ fontFamily: 'Georgia, serif', color: C.navy }}>Simulador Tributário</h1>
              <p className="text-xs" style={{ color: C.textMuted }}>Comparativo entre regimes em tempo real</p>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <div className="text-right hidden md:block mr-2">
              <div className="text-xs font-semibold" style={{ color: C.navy }}>{usuario.nome}</div>
              {nivelExp ? (
                <button onClick={() => setPopupRenovacao({ diasRestantes, nivel: nivelExp, jaNotificadoEmail: jaNotificou(usuario, diasRestantes, 'email'), jaNotificadoWA: jaNotificou(usuario, diasRestantes, 'whatsapp') })}
                  className="text-xs flex items-center gap-1.5 justify-end hover:opacity-80 transition cursor-pointer"
                  style={{ color: nivelExp.cor, fontWeight: 600 }}>
                  <Bell size={11} className="animate-pulse" />
                  {diasRestantes <= 1 ? 'EXPIRA AMANHÃ' : `${diasRestantes} dias — renove!`}
                </button>
              ) : (
                <div className="text-xs flex items-center gap-1.5 justify-end" style={{ color: C.primaryDark }}>
                  <Calendar size={11} />
                  {usuario.role === 'admin' ? 'Acesso administrativo' : `${diasRestantes} dias restantes`}
                </div>
              )}
            </div>

            {/* Botões de ação */}
            {melhor && (
              <>
                <button onClick={() => setModalAberto('salvar')} title="Salvar simulação"
                  className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold hover:opacity-80 transition"
                  style={{ background: C.primaryGlow, color: C.primaryDark, border: `1px solid ${C.primarySoft}` }}>
                  <Save size={14} /> Salvar
                </button>
                <button onClick={handleExportarPDF} title="Exportar PDF"
                  className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold hover:opacity-80 transition"
                  style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDark} 100%)`, color: '#fff', boxShadow: '0 2px 6px rgba(16,185,129,0.25)' }}>
                  <FileDown size={14} /> PDF
                </button>
              </>
            )}
            <button onClick={() => setModalAberto('biblioteca')} title="Minhas simulações"
              className="p-2 rounded-lg hover:opacity-80 transition relative"
              style={{ background: C.bgInput, color: C.navy }}>
              <Folder size={16} />
              {simulacoesSalvas.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center font-bold"
                  style={{ background: C.primary, color: '#fff', fontSize: '9px' }}>{simulacoesSalvas.length}</span>
              )}
            </button>

            {usuario.role === 'admin' && (
              <button onClick={onAdmin} className="p-2 rounded-lg hover:opacity-80 transition" style={{ background: C.primaryGlow, color: C.primaryDark }}>
                <Shield size={16} />
              </button>
            )}
            <button onClick={onLogout} className="p-2 rounded-lg hover:opacity-80 transition" style={{ background: C.bgInput, color: C.navy }}>
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* BANNER FRASE MOTIVACIONAL — rotaciona a cada acesso */}
      <div style={{ background: `linear-gradient(90deg, ${C.navy} 0%, ${C.navyMid} 50%, ${C.navy} 100%)` }}>
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center gap-4 md:gap-6">
          <img src={LOGO_AX_WHITE} alt="AX Educação" className="hidden md:block shrink-0" style={{ height: '36px', width: 'auto', opacity: 0.95 }} />
          <div className="flex-1 flex items-center justify-center gap-3 text-center">
            <span className="text-3xl leading-none hidden sm:inline" style={{ color: C.primary, fontFamily: 'Georgia, serif' }}>"</span>
            <p className="text-sm md:text-base italic max-w-3xl" style={{ fontFamily: 'Georgia, serif', color: C.textInvert, letterSpacing: '0.01em' }}>
              {fraseMotivacional.texto}
            </p>
            <span className="text-3xl leading-none rotate-180 hidden sm:inline" style={{ color: C.primary, fontFamily: 'Georgia, serif' }}>"</span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto p-6 grid lg:grid-cols-[400px,1fr] gap-6">
        {/* COLUNA INPUTS */}
        <div className="space-y-6">
          <section className="rounded-2xl p-6" style={{ background: C.bgCard, border: `1px solid ${C.border}`, boxShadow: '0 1px 3px rgba(10,30,61,0.05)' }}>
            <div className="flex items-center gap-2 mb-4">
              <Building2 size={16} style={{ color: C.primary }} />
              <h3 className="text-sm uppercase tracking-wider" style={{ color: C.primary, letterSpacing: '0.1em' }}>Receita & Atividade</h3>
            </div>
            <CampoNumerico label="Faturamento últimos 12 meses (RBT12)" value={rbt12} onChange={setRbt12} hint="Soma da receita bruta dos últimos 12 meses" />
            <CampoNumerico label="Faturamento do mês" value={receitaMes} onChange={setReceitaMes} hint="Receita bruta do mês atual" />
            <div className="mb-4">
              <label className="text-xs uppercase tracking-wider block mb-1.5 font-semibold" style={{ color: C.navyMid, letterSpacing: '0.08em' }}>Tipo de atividade</label>
              <select value={atividade} onChange={e => setAtividade(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                style={{ background: C.bgInput, border: `1px solid ${C.border}`, color: C.navy }}>
                <optgroup label="Tradicional">
                  <option value="comercio">🏪 Comércio</option>
                  <option value="industria">🏭 Indústria</option>
                </optgroup>
                <optgroup label="Serviços">
                  <option value="servicos">🛠️ Serviços em geral</option>
                  <option value="servicos_hosp">🏥 Serviços hospitalares</option>
                  <option value="transporte">🚕 Transporte (passageiros)</option>
                  <option value="transporte_carga">🚛 Transporte de carga</option>
                </optgroup>
                <optgroup label="Economia digital">
                  <option value="produto_digital">💻 Produto digital (e-book, curso, SaaS)</option>
                  <option value="influencer">📱 Influenciador / publicidade digital</option>
                </optgroup>
              </select>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs uppercase tracking-wider font-semibold" style={{ color: C.navyMid, letterSpacing: '0.08em' }}>Anexo do Simples</label>
                <button onClick={() => setModalAberto('fatorR')}
                  className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full hover:opacity-80 transition"
                  style={{ background: C.primaryGlow, color: C.primaryDark, border: `1px solid ${C.primarySoft}` }}>
                  <Info size={11} /> O que é Fator R?
                </button>
              </div>
              <select value={anexo} onChange={e => setAnexo(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                style={{ background: C.bgInput, border: `1px solid ${C.border}`, color: C.navy }}>
                <option value="I">I — Comércio</option>
                <option value="II">II — Indústria</option>
                <option value="III">III — Serviços (Fator R favorável)</option>
                <option value="IV">IV — Serviços (INSS à parte)</option>
                <option value="V">V — Serviços (Fator R desfavorável)</option>
              </select>
              <p className="text-xs mt-1.5" style={{ color: C.textDim }}>Sistema migra entre III e V conforme Fator R.</p>
            </div>

            {/* Avisos contextuais por atividade */}
            <AvisoAtividade atividade={atividade} />
          </section>

          <section className="rounded-2xl p-6" style={{ background: C.bgCard, border: `1px solid ${C.border}`, boxShadow: '0 1px 3px rgba(10,30,61,0.05)' }}>
            <div className="flex items-center gap-2 mb-4">
              <User size={16} style={{ color: C.primary }} />
              <h3 className="text-sm uppercase tracking-wider" style={{ color: C.primary, letterSpacing: '0.1em' }}>Folha de pagamento</h3>
            </div>
            <CampoNumerico label="Folha mensal (salários + pró-labore)" value={folhaMes} onChange={setFolhaMes} hint="Usado no Fator R e INSS patronal" />
            {(anexo === 'III' || anexo === 'V') && rbt12 > 0 && folhaMes > 0 && (
              <div className="p-3 rounded-lg" style={{ background: 'rgba(16,185,129,0.06)', border: `1px solid ${C.border}` }}>
                <div className="text-xs uppercase tracking-wider mb-1" style={{ color: C.primary }}>Fator R</div>
                <div className="text-2xl" style={{ fontFamily: 'Georgia, serif' }}>{fmtPct((folha12 / rbt12) * 100)}</div>
                <div className="text-xs" style={{ color: C.textMuted }}>
                  {(folha12 / rbt12) * 100 >= 28 ? '✓ Tributação pelo Anexo III (favorável)' : '✗ Tributação pelo Anexo V (desfavorável)'}
                </div>
              </div>
            )}
          </section>

          <section className="rounded-2xl p-6" style={{ background: C.bgCard, border: `1px solid ${C.border}`, boxShadow: '0 1px 3px rgba(10,30,61,0.05)' }}>
            <div className="flex items-center gap-2 mb-4">
              <FileText size={16} style={{ color: C.primary }} />
              <h3 className="text-sm uppercase tracking-wider" style={{ color: C.primary, letterSpacing: '0.1em' }}>Despesas & Créditos</h3>
            </div>
            <CampoNumerico label="Despesas dedutíveis mensais" value={despesas} onChange={setDespesas} hint="Para Lucro Real (exceto folha)" />
            <CampoNumerico label="Insumos com crédito (PIS/COFINS · CBS/IBS)" value={creditos} onChange={setCreditos} hint="Base para crédito não-cumulativo" />
            <div className="grid grid-cols-2 gap-3 mt-2">
              <div>
                <label className="text-xs uppercase tracking-wider block mb-1.5" style={{ color: C.textMuted }}>ISS %</label>
                <input type="number" step="0.01" value={issAliq ?? ''} onChange={e => setIssAliq(e.target.value === '' ? null : parseFloat(e.target.value))}
                  placeholder="0"
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                  style={{ background: C.bgInput, border: `1px solid ${C.border}`, color: C.navy, opacity: isServico ? 1 : 0.4 }} disabled={!isServico} />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider block mb-1.5" style={{ color: C.textMuted }}>ICMS %</label>
                <input type="number" step="0.01" value={icmsAliq ?? ''} onChange={e => setIcmsAliq(e.target.value === '' ? null : parseFloat(e.target.value))}
                  placeholder="0"
                  className="w-full px-3 py-2.5 rounded-lg text-sm outline-none"
                  style={{ background: C.bgInput, border: `1px solid ${C.border}`, color: C.navy, opacity: isServico ? 0.4 : 1 }} disabled={isServico} />
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/* SEÇÃO INCENTIVOS FISCAIS — toggles contextuais por atividade   */}
          {/* ============================================================ */}
          {(ATIVIDADES_META[atividade]?.podeExportacao || ATIVIDADES_META[atividade]?.podeEquiparacao) && (
            <section className="rounded-2xl p-6" style={{ background: C.bgCard, border: `1px solid ${C.border}`, boxShadow: '0 1px 3px rgba(10,30,61,0.05)' }}>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={16} style={{ color: C.primary }} />
                <h3 className="text-sm uppercase tracking-wider font-semibold" style={{ color: C.primary, letterSpacing: '0.1em' }}>Incentivos Fiscais</h3>
              </div>

              {/* Equiparação hospitalar — só para serviços hospitalares */}
              {ATIVIDADES_META[atividade]?.podeEquiparacao && (
                <div className="mb-4 rounded-lg p-4" style={{ background: equiparacaoHosp ? C.primaryGlow : C.bgInput, border: `1px solid ${equiparacaoHosp ? C.primary : C.border}` }}>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={equiparacaoHosp} onChange={e => setEquiparacaoHosp(e.target.checked)}
                      className="mt-1 w-4 h-4 cursor-pointer shrink-0" style={{ accentColor: C.primary }} />
                    <div>
                      <div className="text-sm font-semibold flex items-center gap-2" style={{ color: C.navy }}>
                        🏥 Aplicar equiparação hospitalar
                        {equiparacaoHosp && <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: C.primary, color: '#fff' }}>ATIVO</span>}
                      </div>
                      <p className="text-xs mt-1.5" style={{ color: C.textMuted }}>
                        Reduz a presunção IRPJ/CSLL de 32%/32% para <strong style={{ color: C.primaryDark }}>8%/12%</strong> no Lucro Presumido. Aplica-se a clínicas, laboratórios, hospitais e estabelecimentos que cumpram <strong>requisitos da ANVISA (RDC 50)</strong>: estrutura física, registro como estabelecimento de saúde e funcionamento sob responsabilidade técnica.
                      </p>
                      <p className="text-xs mt-2 italic" style={{ color: C.danger }}>
                        ⚠️ Confirme o enquadramento com um contador antes de adotar — adesão indevida pode gerar autuação.
                      </p>
                    </div>
                  </label>
                </div>
              )}

              {/* Exportação de serviços */}
              {ATIVIDADES_META[atividade]?.podeExportacao && (
                <div className="rounded-lg p-4" style={{ background: (pctExportacao || 0) > 0 ? C.primaryGlow : C.bgInput, border: `1px solid ${(pctExportacao || 0) > 0 ? C.primary : C.border}` }}>
                  <div className="flex items-start gap-2 mb-3">
                    <span className="text-lg">🌎</span>
                    <div>
                      <div className="text-sm font-semibold" style={{ color: C.navy }}>Exportação de serviços / produtos digitais</div>
                      <p className="text-xs mt-1" style={{ color: C.textMuted }}>
                        Receita gerada por clientes <strong>fora do Brasil</strong> tem isenção de <strong>PIS, COFINS e ISS</strong> (mantém o crédito no Lucro Real). Informe o percentual exportado:
                      </p>
                    </div>
                  </div>
                  <CampoNumerico
                    label="% da receita exportada"
                    value={pctExportacao}
                    onChange={setPctExportacao}
                    hint="Ex: 30 = 30% da receita vem de clientes no exterior"
                    suffix="%"
                  />
                  {(pctExportacao || 0) > 0 && (
                    <div className="text-xs p-2.5 rounded" style={{ background: C.bgCard, color: C.primaryDark, fontWeight: 600, border: `1px solid ${C.primarySoft}` }}>
                      ✓ {fmtPct(pctExportacao)} da receita está sendo tratada como exportação isenta
                    </div>
                  )}
                  {atividade === 'produto_digital' && (
                    <div className="mt-3 text-xs p-2.5 rounded" style={{ background: '#fffbeb', border: '1px solid #fde68a', color: '#92400e' }}>
                      💡 <strong>Produto digital:</strong> e-books com ISBN têm <strong>alíquota zero de PIS/COFINS</strong> (Lei 10.865/04). Cursos online e SaaS seguem regra de serviço. Pode-se ainda destinar até <strong>20% da receita a operações com incentivos legais</strong> (PAT, Lei do Bem, doações culturais).
                    </div>
                  )}
                  {atividade === 'influencer' && (
                    <div className="mt-3 text-xs p-2.5 rounded" style={{ background: '#fffbeb', border: '1px solid #fde68a', color: '#92400e' }}>
                      💡 <strong>Influenciador:</strong> publicidade prestada a anunciantes estrangeiros (ex: contratos com YouTube, Meta US, parcerias internacionais) qualifica como exportação de serviços.
                    </div>
                  )}
                </div>
              )}
            </section>
          )}
        </div>

        {/* COLUNA RESULTADOS */}
        <div className="space-y-6">
          {!melhor && (
            <div className="rounded-2xl p-12 text-center" style={{ background: C.bgCard, border: `2px dashed ${C.border}`, boxShadow: '0 1px 3px rgba(10,30,61,0.04)' }}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ background: C.primaryGlow }}>
                <Calculator size={28} style={{ color: C.primary }} />
              </div>
              <h2 className="text-2xl mb-2" style={{ fontFamily: 'Georgia, serif', fontWeight: 700, color: C.navy }}>
                Pronto para descobrir sua melhor estratégia?
              </h2>
              <p className="text-sm max-w-md mx-auto" style={{ color: C.textMuted }}>
                Preencha o faturamento dos últimos 12 meses e o do mês atual ao lado para começar a comparação entre os 3 regimes tributários em tempo real.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: C.primaryGlow }}>
                <ChevronRight size={14} style={{ color: C.primary }} />
                <span className="text-xs font-semibold" style={{ color: C.primaryDark, letterSpacing: '0.05em' }}>
                  COMECE PELOS CAMPOS DE RECEITA
                </span>
              </div>
            </div>
          )}

          {melhor && (
            <div className="rounded-2xl p-8" style={{ background: `linear-gradient(135deg, ${C.primaryGlow} 0%, ${C.bgCard} 100%)`, border: `1px solid ${C.primarySoft}`, boxShadow: '0 4px 16px rgba(16,185,129,0.12)' }}>
              <div className="flex items-start justify-between mb-2 flex-wrap gap-4">
                <div>
                  <div className="text-xs uppercase tracking-widest mb-2" style={{ color: C.primary, letterSpacing: '0.15em' }}>Regime mais vantajoso (hoje)</div>
                  <h2 className="text-4xl mb-1" style={{ fontFamily: 'Georgia, serif' }}>{melhor.nome}</h2>
                  <div className="text-sm" style={{ color: C.textMuted }}>Alíquota efetiva de {fmtPct(melhor.dados.aliquotaEfetiva)} sobre o faturamento</div>
                </div>
                <div className="text-right">
                  <div className="text-xs uppercase tracking-wider mb-1" style={{ color: C.textMuted }}>Imposto/mês</div>
                  <div className="text-3xl" style={{ fontFamily: 'Georgia, serif', color: C.primary }}>{fmtBRL(melhor.dados.total)}</div>
                </div>
              </div>
              {economia > 100 && pior && (
                <div className="mt-5 pt-5 flex items-center gap-2 flex-wrap" style={{ borderTop: `1px solid ${C.border}` }}>
                  <TrendingDown size={18} style={{ color: C.primarySoft }} />
                  <span className="text-sm" style={{ color: C.whiteSoft }}>
                    Economia anual de <span style={{ color: C.primary, fontWeight: 600 }}>{fmtBRL(economia * 12)}</span> versus {pior.nome}
                  </span>
                </div>
              )}
            </div>
          )}

          {melhor && (
            <>
              <div className="grid md:grid-cols-3 gap-4">
                {regimes.map(r => (
                  <CardRegime key={r.id} regime={r} melhor={r.id === melhor?.id} pior={r.id === pior?.id && regimes.length > 1} />
                ))}
              </div>

          {/* SEÇÃO DICAS DE CRESCIMENTO */}
          {dicas.length > 0 && (
            <section className="rounded-2xl p-6" style={{ background: `linear-gradient(135deg, rgba(16,185,129,0.04) 0%, ${C.bgCard} 100%)`, border: `1px solid ${C.border}` }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDark} 100%)` }}>
                  <TrendingUp size={18} style={{ color: C.bgDeep }} />
                </div>
                <div>
                  <h3 className="text-lg" style={{ fontFamily: 'Georgia, serif' }}>Insights estratégicos para crescer</h3>
                  <p className="text-xs" style={{ color: C.textMuted }}>Análise contextual baseada na sua simulação</p>
                </div>
              </div>

              <div className="space-y-4">
                {dicas.map((d, i) => (
                  <CardDica key={i} dica={d} />
                ))}
              </div>

              {/* CTA fim das dicas */}
              <div className="mt-5 p-4 rounded-lg text-center" style={{ background: 'rgba(16,185,129,0.08)', border: `1px solid ${C.borderStrong}` }}>
                <p className="text-sm mb-1" style={{ fontFamily: 'Georgia, serif', color: C.navy }}>
                  Quer transformar essas oportunidades em economia real?
                </p>
                <p className="text-xs" style={{ color: C.textMuted }}>
                  Considere uma análise estratégica com um contador especialista — para desenhar seu planejamento tributário sob medida.
                </p>
              </div>
            </section>
          )}

          {/* SEÇÃO REFORMA TRIBUTÁRIA */}
          <section className="rounded-2xl p-6" style={{ background: `linear-gradient(180deg, #f1f5f9 0%, ${C.bgCard} 100%)`, border: `1px solid ${C.borderStrong}` }}>
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.15)' }}>
                  <Layers size={18} style={{ color: C.primary }} />
                </div>
                <div>
                  <h3 className="text-lg" style={{ fontFamily: 'Georgia, serif' }}>Reforma Tributária — Impacto Projetado</h3>
                  <p className="text-xs" style={{ color: C.textMuted }}>Cenário IVA Dual (CBS + IBS) conforme LC 214/2025</p>
                </div>
              </div>
              <button onClick={() => setMostrarReforma(!mostrarReforma)}
                className="text-xs px-3 py-1.5 rounded-md hover:opacity-80"
                style={{ background: 'rgba(16,185,129,0.08)', color: C.primary, border: `1px solid ${C.border}` }}>
                {mostrarReforma ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>

            {mostrarReforma && (
              <>
                {/* Seletor de cenário */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-5">
                  {Object.keys(CENARIOS_REFORMA).map(c => (
                    <button key={c} onClick={() => setCenarioReforma(c)}
                      className="px-3 py-2.5 rounded-lg text-xs transition-all"
                      style={{
                        background: cenarioReforma === c ? 'rgba(16,185,129,0.15)' : C.bgInput,
                        border: `1px solid ${cenarioReforma === c ? C.borderStrong : C.border}`,
                        color: cenarioReforma === c ? C.primary : C.textMuted,
                        fontFamily: 'Georgia, serif'
                      }}>
                      {c}
                    </button>
                  ))}
                </div>

                <div className="p-3 rounded-lg mb-5 flex items-start gap-2" style={{ background: 'rgba(16,185,129,0.05)', border: `1px solid ${C.border}` }}>
                  <Info size={14} className="mt-0.5 shrink-0" style={{ color: C.primary }} />
                  <div className="text-xs" style={{ color: C.whiteSoft }}>
                    <strong style={{ color: C.primary }}>{CENARIOS_REFORMA[cenarioReforma].nome}.</strong> {CENARIOS_REFORMA[cenarioReforma].descricao}
                    <span className="block mt-1" style={{ color: C.textMuted }}>
                      Alíquotas aplicadas: CBS {fmtPct(CENARIOS_REFORMA[cenarioReforma].cbs * 100)} · IBS {fmtPct(CENARIOS_REFORMA[cenarioReforma].ibs * 100)}
                    </span>
                  </div>
                </div>

                {/* Comparativo lado a lado */}
                {reforma.total > 0 && melhor && (
                  <div className="grid md:grid-cols-3 gap-4 mb-5">
                    <BoxComparativo titulo="Hoje (melhor regime)" valor={melhor.dados.total} sub={melhor.nome} aliquota={melhor.dados.aliquotaEfetiva} />
                    <div className="flex items-center justify-center text-center py-4">
                      <div>
                        <ArrowRight size={24} style={{ color: C.primary }} className="mx-auto mb-2" />
                        <div className="text-xs uppercase tracking-wider" style={{ color: C.textMuted }}>{cenarioReforma}</div>
                        <div className="text-lg mt-1" style={{
                          fontFamily: 'Georgia, serif',
                          color: impactoReforma > 0 ? C.danger : impactoReforma < 0 ? C.primary : C.navy
                        }}>
                          {impactoReforma > 0 ? '+' : ''}{fmtBRL(impactoReforma)}
                        </div>
                        <div className="text-xs" style={{ color: C.textMuted }}>
                          {impactoReformaPct > 0 ? '+' : ''}{fmtPct(impactoReformaPct)} ao mês
                        </div>
                      </div>
                    </div>
                    <BoxComparativo titulo={`Pós-reforma (${cenarioReforma})`} valor={reforma.total} sub="IVA Dual + IRPJ/CSLL" aliquota={reforma.aliquotaEfetiva} destaque />
                  </div>
                )}

                {/* Detalhamento da reforma */}
                {reforma.total > 0 && (
                  <div className="rounded-lg p-4" style={{ background: C.bgInput, border: `1px solid ${C.border}` }}>
                    <div className="text-xs uppercase tracking-wider mb-3" style={{ color: C.textMuted }}>Composição da carga no cenário {cenarioReforma}</div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                      <ItemDet label="CBS" valor={reforma.cbs} />
                      <ItemDet label="IBS" valor={reforma.ibs} />
                      {reforma.pisCofins > 0 && <ItemDet label="PIS/COFINS" valor={reforma.pisCofins} />}
                      {reforma.issIcms > 0 && <ItemDet label="ICMS/ISS" valor={reforma.issIcms} />}
                      <ItemDet label="IRPJ" valor={reforma.irpj + reforma.irpjAdicional} />
                      <ItemDet label="CSLL" valor={reforma.csll} />
                      <ItemDet label="INSS" valor={reforma.inssPatronal} />
                    </div>
                  </div>
                )}

                {/* GRÁFICO DE EVOLUÇÃO — Reforma ao longo do tempo */}
                {melhor && dadosGraficoReforma.length > 0 && (
                  <div className="mt-5 rounded-lg p-4" style={{ background: C.bgCard, border: `1px solid ${C.border}` }}>
                    <div className="flex items-center gap-2 mb-4">
                      <BarChart3 size={16} style={{ color: C.primary }} />
                      <div>
                        <div className="text-sm font-semibold" style={{ color: C.navy, fontFamily: 'Georgia, serif' }}>Evolução da carga tributária na transição (2026 → 2033)</div>
                        <div className="text-xs" style={{ color: C.textMuted }}>Compare quanto sua empresa pagaria em cada fase da Reforma</div>
                      </div>
                    </div>
                    <ResponsiveContainer width="100%" height={260}>
                      <BarChart data={dadosGraficoReforma} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="periodo" tick={{ fill: C.navyMid, fontSize: 11 }} axisLine={{ stroke: '#e2e8f0' }} />
                        <YAxis tick={{ fill: C.textMuted, fontSize: 10 }} axisLine={{ stroke: '#e2e8f0' }}
                          tickFormatter={(v) => v >= 1000 ? `${(v/1000).toFixed(0)}k` : v} />
                        <Tooltip
                          contentStyle={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12 }}
                          labelStyle={{ color: C.navy, fontWeight: 600 }}
                          formatter={(value, name) => [fmtBRL(value), name === 'valor' ? 'Pós-reforma' : 'Regime atual']}
                        />
                        <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                        <Bar dataKey="atual" name="Regime atual (referência)" fill={C.navyLight} radius={[4, 4, 0, 0]} />
                        <Bar dataKey="valor" name="Cenário Reforma" radius={[4, 4, 0, 0]}>
                          {dadosGraficoReforma.map((entry, i) => (
                            <Cell key={i} fill={entry.valor > entry.atual ? C.danger : C.primary} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                    <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                      {dadosGraficoReforma.map(d => {
                        const dif = d.valor - d.atual;
                        return (
                          <div key={d.periodo} className="p-2 rounded text-center" style={{ background: C.bgInput }}>
                            <div className="font-semibold" style={{ color: C.navy }}>{d.periodo}</div>
                            <div style={{ color: dif > 0 ? C.danger : dif < 0 ? C.primary : C.textMuted, fontSize: '10.5px' }}>
                              {dif > 0 ? '+' : ''}{fmtBRL(dif)}/mês
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Insight estratégico */}
                {melhor && reforma.total > 0 && (
                  <div className="mt-5 p-4 rounded-lg" style={{ background: impactoReforma > 0 ? '#fef2f2' : 'rgba(16,185,129,0.08)', border: `1px solid ${impactoReforma > 0 ? '#fecaca' : C.border}` }}>
                    <div className="flex items-start gap-2">
                      {impactoReforma > 0 ? <TrendingUp size={16} style={{ color: C.danger }} /> : <TrendingDown size={16} style={{ color: C.primary }} />}
                      <div className="text-xs" style={{ color: C.whiteSoft }}>
                        <strong style={{ color: impactoReforma > 0 ? C.danger : C.primary }}>
                          {impactoReforma > 0 ? 'Atenção — carga aumenta' : 'Bom cenário — carga reduz'}:
                        </strong>{' '}
                        no cenário {cenarioReforma}, sua empresa pagaria{' '}
                        <strong>{fmtBRL(Math.abs(impactoReforma * 12))}/ano</strong>{' '}
                        {impactoReforma > 0 ? 'a mais' : 'a menos'} comparado ao melhor regime atual. Vale considerar otimização de créditos de insumos e reestruturação societária.
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </section>

          {/* SEÇÃO PONTOS DA LEI — Reforma Tributária detalhada */}
          <section className="rounded-2xl p-6" style={{ background: C.bgCard, border: `1px solid ${C.border}`, boxShadow: '0 1px 3px rgba(10,30,61,0.05)' }}>
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.12)' }}>
                  <FileText size={18} style={{ color: C.primary }} />
                </div>
                <div>
                  <h3 className="text-lg" style={{ fontFamily: 'Georgia, serif' }}>Pontos-chave da Reforma Tributária</h3>
                  <p className="text-xs" style={{ color: C.textMuted }}>Conforme LC 214/2025 e EC 132/2023 — o que todo empresário precisa saber</p>
                </div>
              </div>
              <button onClick={() => setMostrarPontos(!mostrarPontos)}
                className="text-xs px-3 py-1.5 rounded-md hover:opacity-80"
                style={{ background: 'rgba(16,185,129,0.08)', color: C.primary, border: `1px solid ${C.border}` }}>
                {mostrarPontos ? 'Ocultar' : `Ver ${PONTOS_REFORMA.length} pontos`}
              </button>
            </div>

            {mostrarPontos && (
              <div className="grid md:grid-cols-2 gap-3">
                {PONTOS_REFORMA.map((p, i) => (
                  <div key={i} className="p-4 rounded-lg" style={{ background: C.bgInput, border: `1px solid ${C.border}` }}>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl shrink-0">{p.icone}</span>
                      <div>
                        <h4 className="text-sm mb-1" style={{ fontFamily: 'Georgia, serif', color: C.primary }}>{p.titulo}</h4>
                        <p className="text-xs leading-relaxed" style={{ color: C.whiteSoft }}>{p.descricao}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <DetalhamentoTributos simples={simples} presumido={presumido} real={real} atividade={atividade} issAliq={issAliq || 0} icmsAliq={icmsAliq || 0} />

          {/* ============================================================ */}
          {/* TIMELINE DA REFORMA TRIBUTÁRIA                                 */}
          {/* ============================================================ */}
          <TimelineReforma melhor={melhor} dadosGraficoReforma={dadosGraficoReforma} />

          <div className="rounded-xl p-4 flex items-start gap-3 text-xs" style={{ background: '#f1f5f9', border: `1px solid ${C.border}`, color: C.whiteSoft }}>
            <AlertCircle size={16} className="mt-0.5 shrink-0" style={{ color: C.primary }} />
            <div>
              <strong style={{ color: C.primary }}>Aviso:</strong> simulação para planejamento. Tabelas vigentes em 2026. Reforma Tributária baseada na LC 214/2025 com alíquotas de referência (ainda sujeitas a calibragem do Senado). Decisões definitivas requerem análise individualizada por um contador.
            </div>
          </div>
            </>
          )}
        </div>
      </main>

      {/* ===== POPUP DE RENOVAÇÃO DE PLANO ===== */}
      {popupRenovacao && (
        <PopupRenovacao
          dados={popupRenovacao}
          usuario={usuario}
          onClose={() => setPopupRenovacao(null)}
          onDispararEmail={() => dispararNotificacoes(['email'])}
          onDispararWhatsApp={() => dispararNotificacoes(['whatsapp'])}
          onDispararAmbos={() => dispararNotificacoes(['email', 'whatsapp'])}
        />
      )}

      {/* ===== TOASTS DE NOTIFICAÇÃO ===== */}
      <ToastContainer toasts={toasts} onRemove={(id) => setToasts(t => t.filter(x => x.id !== id))} />

      {/* ===== MODAL: EXPLICADOR DO FATOR R ===== */}
      {modalAberto === 'fatorR' && (
        <ModalFatorR onClose={() => setModalAberto(null)} />
      )}

      {/* ===== MODAL: SALVAR SIMULAÇÃO ===== */}
      {modalAberto === 'salvar' && (
        <ModalBase onClose={() => setModalAberto(null)} titulo="Salvar simulação">
          <p className="text-sm mb-4" style={{ color: C.textMuted }}>
            Dê um nome para esta simulação. Você poderá voltar a ela depois e compará-la com outras.
          </p>
          <input
            type="text" value={nomeSimulacao} onChange={e => setNomeSimulacao(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSalvar()}
            placeholder="Ex: Cenário atual · Cliente João · Pré-Reforma"
            autoFocus
            className="w-full px-4 py-3 rounded-lg text-sm outline-none mb-5"
            style={{ background: C.bgInput, border: `1px solid ${C.border}`, color: C.navy }}
          />
          <div className="flex gap-3 justify-end">
            <button onClick={() => setModalAberto(null)}
              className="px-4 py-2.5 rounded-lg text-sm font-semibold"
              style={{ background: C.bgInput, color: C.navy }}>Cancelar</button>
            <button onClick={handleSalvar}
              className="px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2"
              style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDark} 100%)`, color: '#fff', boxShadow: '0 2px 6px rgba(16,185,129,0.25)' }}>
              <Save size={14} /> Salvar
            </button>
          </div>
        </ModalBase>
      )}

      {/* ===== MODAL: BIBLIOTECA DE SIMULAÇÕES ===== */}
      {modalAberto === 'biblioteca' && (
        <ModalBase onClose={() => setModalAberto(null)} titulo={`Minhas simulações (${simulacoesSalvas.length})`} largura="900px">
          {simulacoesSalvas.length === 0 ? (
            <div className="text-center py-12">
              <Folder size={48} style={{ color: C.textDim }} className="mx-auto mb-3" />
              <p className="text-sm" style={{ color: C.textMuted }}>Você ainda não tem simulações salvas.</p>
              <p className="text-xs mt-1" style={{ color: C.textMuted }}>Faça uma simulação e clique em <strong>Salvar</strong> no topo da página.</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
                <p className="text-xs" style={{ color: C.textMuted }}>
                  Selecione até 3 simulações para comparar lado a lado.
                </p>
                {simulacoesComparar.length >= 2 && (
                  <button onClick={() => setModalAberto('comparar')}
                    className="px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2"
                    style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDark} 100%)`, color: '#fff' }}>
                    <BarChart3 size={14} /> Comparar selecionadas ({simulacoesComparar.length})
                  </button>
                )}
              </div>
              <div className="space-y-2 max-h-[60vh] overflow-y-auto">
                {simulacoesSalvas.map(sim => {
                  const selecionada = simulacoesComparar.includes(sim.id);
                  return (
                    <div key={sim.id} className="rounded-lg p-4 flex items-center justify-between gap-3 flex-wrap"
                      style={{ background: selecionada ? C.primaryGlow : C.bgInput, border: `1px solid ${selecionada ? C.primary : C.border}` }}>
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <input type="checkbox" checked={selecionada} onChange={() => toggleComparar(sim.id)}
                          className="w-4 h-4 cursor-pointer" style={{ accentColor: C.primary }} />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold truncate" style={{ color: C.navy }}>{sim.nome}</div>
                          <div className="text-xs flex items-center gap-2 flex-wrap" style={{ color: C.textMuted }}>
                            <Clock size={11} />
                            {new Date(sim.dataISO).toLocaleString('pt-BR')}
                            {sim.resultados.melhor && (
                              <>
                                <span>·</span>
                                <span>{sim.resultados.melhor.nome}: <strong style={{ color: C.primaryDark }}>{fmtBRL(sim.resultados.melhor.total)}</strong>/mês</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button onClick={() => handleCarregar(sim)}
                          className="px-3 py-1.5 rounded text-xs font-semibold hover:opacity-80"
                          style={{ background: C.navy, color: '#fff' }}>
                          Carregar
                        </button>
                        <button onClick={() => handleRemover(sim.id)}
                          className="p-1.5 rounded hover:opacity-80"
                          style={{ background: '#fef2f2', color: C.danger }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </ModalBase>
      )}

      {/* ===== MODAL: COMPARAR SIMULAÇÕES ===== */}
      {modalAberto === 'comparar' && simulacoesComparar.length >= 2 && (
        <ModalBase onClose={() => setModalAberto('biblioteca')} titulo="Comparativo de simulações" largura="1100px">
          <ComparativoSimulacoes
            simulacoes={simulacoesSalvas.filter(s => simulacoesComparar.includes(s.id))}
          />
        </ModalBase>
      )}
    </div>
  );
}

function ModalBase({ children, onClose, titulo, largura = '500px' }) {
  // Fecha com ESC
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(10,30,61,0.55)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}>
      <div className="rounded-2xl p-6 w-full overflow-hidden"
        style={{ background: C.bgCard, border: `1px solid ${C.border}`, maxWidth: largura, boxShadow: '0 25px 50px rgba(10,30,61,0.25)' }}
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold" style={{ fontFamily: 'Georgia, serif', color: C.navy }}>{titulo}</h3>
          <button onClick={onClose} className="p-1.5 rounded hover:opacity-80" style={{ color: C.textMuted }}>
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function ComparativoSimulacoes({ simulacoes }) {
  // Dados para gráfico de comparação (custo mensal por regime de cada simulação)
  const dadosGrafico = simulacoes.map(s => ({
    nome: s.nome.length > 20 ? s.nome.slice(0, 18) + '…' : s.nome,
    Simples: Math.round(s.resultados.simples?.total || 0),
    Presumido: Math.round(s.resultados.presumido?.total || 0),
    Real: Math.round(s.resultados.real?.total || 0),
  }));

  return (
    <div>
      <p className="text-sm mb-5" style={{ color: C.textMuted }}>
        Comparativo lado a lado das simulações selecionadas. Use isto para discutir cenários "antes/depois" ou alternativas com o cliente.
      </p>

      {/* Gráfico de barras */}
      <div className="rounded-lg p-4 mb-5" style={{ background: C.bgInput, border: `1px solid ${C.border}` }}>
        <div className="text-xs uppercase tracking-wider mb-3 font-semibold" style={{ color: C.textMuted }}>Custo mensal por regime</div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={dadosGrafico} margin={{ top: 10, right: 10, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="nome" tick={{ fill: C.navyMid, fontSize: 11 }} />
            <YAxis tick={{ fill: C.textMuted, fontSize: 10 }} tickFormatter={(v) => v >= 1000 ? `${(v/1000).toFixed(0)}k` : v} />
            <Tooltip contentStyle={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12 }}
              formatter={(v) => fmtBRL(v)} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="Simples" fill="#10b981" radius={[4,4,0,0]} />
            <Bar dataKey="Presumido" fill="#0a1e3d" radius={[4,4,0,0]} />
            <Bar dataKey="Real" fill="#3b5f8a" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tabela detalhada */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: `2px solid ${C.primary}` }}>
              <th className="text-left py-2.5 text-xs uppercase tracking-wider font-semibold" style={{ color: C.textMuted }}>Parâmetro</th>
              {simulacoes.map(s => (
                <th key={s.id} className="text-right py-2.5 text-xs px-3" style={{ color: C.navy }}>
                  <div className="font-bold">{s.nome}</div>
                  <div className="text-xs font-normal" style={{ color: C.textMuted }}>{new Date(s.dataISO).toLocaleDateString('pt-BR')}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <LinhaComp label="Faturamento mensal" simulacoes={simulacoes} get={s => fmtBRL(s.inputs.receitaMes || 0)} />
            <LinhaComp label="RBT12" simulacoes={simulacoes} get={s => fmtBRL(s.inputs.rbt12 || 0)} />
            <LinhaComp label="Folha mensal" simulacoes={simulacoes} get={s => fmtBRL(s.inputs.folhaMes || 0)} />
            <LinhaComp label="Atividade" simulacoes={simulacoes} get={s => labelAtividade(s.inputs.atividade)} />
            <LinhaComp label="Despesas" simulacoes={simulacoes} get={s => fmtBRL(s.inputs.despesas || 0)} />
            <tr><td colSpan={simulacoes.length + 1} className="pt-4 pb-1"></td></tr>
            <LinhaComp label="Simples Nacional" destaque simulacoes={simulacoes} get={s => fmtBRL(s.resultados.simples?.total || 0)} />
            <LinhaComp label="Lucro Presumido" destaque simulacoes={simulacoes} get={s => fmtBRL(s.resultados.presumido?.total || 0)} />
            <LinhaComp label="Lucro Real" destaque simulacoes={simulacoes} get={s => fmtBRL(s.resultados.real?.total || 0)} />
            <tr style={{ borderTop: `2px solid ${C.primary}` }}>
              <td className="py-3 font-bold" style={{ color: C.navy, fontFamily: 'Georgia, serif' }}>Melhor regime</td>
              {simulacoes.map(s => (
                <td key={s.id} className="py-3 text-right px-3">
                  {s.resultados.melhor ? (
                    <>
                      <div className="font-bold" style={{ color: C.primaryDark }}>{s.resultados.melhor.nome}</div>
                      <div className="text-xs" style={{ color: C.primaryDark, fontWeight: 600 }}>{fmtBRL(s.resultados.melhor.total)}/mês</div>
                    </>
                  ) : '—'}
                </td>
              ))}
            </tr>
            <LinhaComp label="Cenário Reforma" simulacoes={simulacoes} get={s => s.resultados.cenarioReforma || '—'} />
            <LinhaComp label="Impacto Reforma" simulacoes={simulacoes} get={s => {
              const i = s.resultados.impactoReforma || 0;
              return (i > 0 ? '+' : '') + fmtBRL(i) + '/mês';
            }} />
          </tbody>
        </table>
      </div>

      {/* Variação entre simulações */}
      {simulacoes.length === 2 && simulacoes[0].resultados.melhor && simulacoes[1].resultados.melhor && (
        <div className="mt-5 p-4 rounded-lg" style={{ background: C.primaryGlow, border: `1px solid ${C.primarySoft}` }}>
          <div className="text-xs uppercase tracking-wider mb-2 font-semibold" style={{ color: C.primaryDark }}>Variação entre as simulações</div>
          {(() => {
            const dif = simulacoes[1].resultados.melhor.total - simulacoes[0].resultados.melhor.total;
            const difAno = dif * 12;
            return (
              <div className="text-sm" style={{ color: C.navy }}>
                A diferença entre <strong>{simulacoes[0].nome}</strong> e <strong>{simulacoes[1].nome}</strong> é de{' '}
                <strong style={{ color: dif > 0 ? C.danger : C.primaryDark }}>
                  {dif > 0 ? '+' : ''}{fmtBRL(dif)}/mês
                </strong>{' '}
                ({dif > 0 ? '+' : ''}{fmtBRL(difAno)}/ano).
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}

function LinhaComp({ label, simulacoes, get, destaque }) {
  return (
    <tr style={{ borderTop: `1px solid ${C.border}`, background: destaque ? C.bgInput : 'transparent' }}>
      <td className="py-2 text-xs font-semibold" style={{ color: destaque ? C.navy : C.textMuted }}>{label}</td>
      {simulacoes.map((s, i) => (
        <td key={i} className="py-2 text-right text-xs px-3" style={{ color: C.navy }}>{get(s)}</td>
      ))}
    </tr>
  );
}

function TimelineReforma({ melhor, dadosGraficoReforma }) {
  // Marcos cronológicos detalhados da Reforma (LC 214/2025)
  const marcos = [
    {
      ano: 2026,
      periodo: '2026',
      titulo: 'Fase de testes',
      cor: '#3b5f8a',
      icone: '🧪',
      eventos: [
        'CBS começa a 0,9% (alíquota-teste)',
        'IBS começa a 0,1% (alíquota-teste)',
        'Recolhimento compensável com PIS/COFINS',
        'Sistema antigo permanece 100%',
        'Janela ideal para ajustar ERPs e processos'
      ]
    },
    {
      ano: 2027,
      periodo: '2027–2028',
      titulo: 'CBS plena · IBS ainda em teste',
      cor: '#1e3a5f',
      icone: '⚡',
      eventos: [
        'CBS sobe à alíquota cheia (~8,8%)',
        'PIS e COFINS são EXTINTOS',
        'IBS continua simbólico (0,1%)',
        'Split Payment automático em vigor',
        'Imposto Seletivo (IS) entra em operação'
      ]
    },
    {
      ano: 2029,
      periodo: '2029–2032',
      titulo: 'Transição IBS',
      cor: '#059669',
      icone: '🔄',
      eventos: [
        'IBS sobe 10% ao ano',
        'ICMS e ISS reduzem na mesma proporção',
        'Convivência dos dois sistemas (dual)',
        'Estados/municípios começam a se adaptar',
        'Cashback para baixa renda inicia'
      ]
    },
    {
      ano: 2033,
      periodo: '2033+',
      titulo: 'Sistema pleno',
      cor: '#10b981',
      icone: '🎯',
      eventos: [
        'IBS pleno (~17,7%)',
        'ICMS e ISS EXTINTOS',
        'IVA Dual em operação completa',
        'Fim da guerra fiscal entre estados',
        'Carga total estimada: ~26,5% sobre consumo'
      ]
    },
  ];

  return (
    <section className="rounded-2xl p-6" style={{ background: C.bgCard, border: `1px solid ${C.border}`, boxShadow: '0 1px 3px rgba(10,30,61,0.05)' }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navyMid} 100%)` }}>
          <Clock size={18} style={{ color: C.primary }} />
        </div>
        <div>
          <h3 className="text-lg font-bold" style={{ fontFamily: 'Georgia, serif', color: C.navy }}>Linha do tempo da Reforma Tributária</h3>
          <p className="text-xs" style={{ color: C.textMuted }}>Cronograma oficial conforme LC 214/2025 — etapa por etapa</p>
        </div>
      </div>

      {/* GRÁFICO DE LINHA TEMPORAL */}
      {melhor && dadosGraficoReforma.length > 0 && (
        <div className="rounded-lg p-4 mb-6" style={{ background: C.bgInput, border: `1px solid ${C.border}` }}>
          <div className="text-xs uppercase tracking-wider mb-3 font-semibold" style={{ color: C.textMuted }}>
            Evolução da carga tributária ao longo da transição
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={dadosGraficoReforma} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="gradReforma" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={C.primary} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={C.primary} stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="gradAtual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={C.navyLight} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={C.navyLight} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="periodo" tick={{ fill: C.navyMid, fontSize: 11, fontWeight: 600 }} axisLine={{ stroke: '#e2e8f0' }} />
              <YAxis tick={{ fill: C.textMuted, fontSize: 10 }} axisLine={{ stroke: '#e2e8f0' }}
                tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v} />
              <Tooltip
                contentStyle={{ background: '#fff', border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12, boxShadow: '0 4px 12px rgba(10,30,61,0.1)' }}
                labelStyle={{ color: C.navy, fontWeight: 600 }}
                formatter={(value, name) => [fmtBRL(value), name === 'valor' ? 'Pós-reforma' : 'Regime atual (referência)']}
              />
              <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} iconType="line" />
              <Area type="monotone" dataKey="atual" name="Regime atual (referência)"
                stroke={C.navyLight} strokeWidth={2} fill="url(#gradAtual)" strokeDasharray="5 5" />
              <Area type="monotone" dataKey="valor" name="Cenário Reforma"
                stroke={C.primary} strokeWidth={3} fill="url(#gradReforma)"
                dot={{ fill: C.primary, r: 5, strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 7, fill: C.primaryDark, stroke: '#fff', strokeWidth: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* TIMELINE VISUAL COM MARCOS */}
      <div className="relative">
        {/* Linha vertical conectora */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 hidden md:block" style={{ background: `linear-gradient(180deg, ${C.navyLight} 0%, ${C.primary} 100%)` }}></div>

        <div className="space-y-5">
          {marcos.map((m, i) => (
            <div key={i} className="flex gap-4 md:gap-5 relative">
              {/* Bolinha do marco */}
              <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-md"
                style={{ background: m.cor, border: `3px solid ${C.bgCard}`, boxShadow: `0 4px 12px ${m.cor}40`, zIndex: 1, position: 'relative' }}>
                <span style={{ fontSize: '20px' }}>{m.icone}</span>
              </div>

              {/* Conteúdo do marco */}
              <div className="flex-1 rounded-xl p-4 pb-5" style={{ background: C.bgInput, border: `1px solid ${C.border}` }}>
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <span className="text-xs px-2.5 py-1 rounded-full font-bold tracking-wider" style={{ background: m.cor, color: '#fff', letterSpacing: '0.05em' }}>
                    {m.periodo}
                  </span>
                  <h4 className="text-base font-bold" style={{ fontFamily: 'Georgia, serif', color: C.navy }}>
                    {m.titulo}
                  </h4>
                </div>
                <ul className="space-y-1.5">
                  {m.eventos.map((ev, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm" style={{ color: C.navyMid }}>
                      <Check size={14} className="mt-0.5 shrink-0" style={{ color: m.cor }} />
                      <span>{ev}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA final da timeline */}
      <div className="mt-6 p-4 rounded-lg text-center" style={{ background: `linear-gradient(135deg, ${C.primaryGlow} 0%, ${C.bgCard} 100%)`, border: `1px solid ${C.primarySoft}` }}>
        <p className="text-sm font-semibold mb-1" style={{ fontFamily: 'Georgia, serif', color: C.navy }}>
          Quem se prepara agora colhe vantagem competitiva por uma década
        </p>
        <p className="text-xs" style={{ color: C.textMuted }}>
          Cada empresa precisa de um plano específico de transição. Consulte um contador especializado.
        </p>
      </div>
    </section>
  );
}

function AvisoAtividade({ atividade }) {
  const avisos = {
    servicos: {
      titulo: 'Serviços em geral — atenção ao Fator R',
      texto: 'Serviços geralmente vão para o Anexo III (mais barato, alíquota inicial 6%) se a folha for ≥ 28% do faturamento (Fator R favorável). Senão, caem no Anexo V (15,5% inicial). Estruture pró-labore e folha estrategicamente.'
    },
    servicos_hosp: {
      titulo: 'Serviços hospitalares têm tratamento especial',
      texto: 'Hospitais, clínicas e laboratórios que se enquadram nas normas da ANVISA podem usar equiparação hospitalar no Lucro Presumido (presunção 8%/12% em vez de 32%/32%). Ative a opção na seção Incentivos Fiscais.'
    },
    transporte: {
      titulo: 'Transporte de passageiros',
      texto: 'Presunção de IRPJ é 16% (não 8%). Confira se sua atividade principal envolve fretamento, turismo ou táxi/transporte público antes de aderir ao Presumido.'
    },
    produto_digital: {
      titulo: 'Produto digital — incentivos disponíveis',
      texto: 'E-books com ISBN têm alíquota zero PIS/COFINS. Cursos online e SaaS seguem regra de serviços. Vendas para clientes no exterior são exportação (isentas de PIS/COFINS/ISS). Ative os toggles em Incentivos Fiscais.'
    },
    influencer: {
      titulo: 'Influenciador / publicidade digital',
      texto: 'A atividade é classificada como serviço de publicidade e tende ao Anexo V do Simples (sem equipe formal). Contratos com plataformas estrangeiras (YouTube, Meta) podem ser exportação isenta. Considere estruturar pró-labore para subir ao Anexo III.'
    },
  };

  const aviso = avisos[atividade];
  if (!aviso) return null;

  return (
    <div className="mt-4 p-3 rounded-lg flex items-start gap-2" style={{ background: '#eff6ff', border: `1px solid #bfdbfe` }}>
      <Info size={14} className="mt-0.5 shrink-0" style={{ color: '#2563eb' }} />
      <div>
        <div className="text-xs font-bold mb-0.5" style={{ color: '#1e40af' }}>{aviso.titulo}</div>
        <div className="text-xs leading-relaxed" style={{ color: '#1e3a8a' }}>{aviso.texto}</div>
      </div>
    </div>
  );
}

function ModalFatorR({ onClose }) {
  return (
    <ModalBase onClose={onClose} titulo="Entendendo o Fator R" largura="700px">
      <div className="space-y-4 text-sm" style={{ color: C.navyMid }}>
        <div className="p-4 rounded-lg" style={{ background: C.primaryGlow, border: `1px solid ${C.primarySoft}` }}>
          <div className="text-base font-bold mb-2" style={{ color: C.navy, fontFamily: 'Georgia, serif' }}>📐 Fórmula</div>
          <div className="font-mono text-sm p-3 rounded" style={{ background: '#fff', border: `1px solid ${C.border}`, color: C.navy }}>
            Fator R = (Folha 12 meses ÷ RBT12) × 100
          </div>
          <p className="text-xs mt-2" style={{ color: C.textMuted }}>
            "Folha" inclui salários, encargos, pró-labore e benefícios. "RBT12" é a receita bruta dos últimos 12 meses.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          <div className="p-4 rounded-lg" style={{ background: '#ecfdf5', border: '1px solid #a7f3d0' }}>
            <div className="font-bold mb-1.5 flex items-center gap-2" style={{ color: '#065f46' }}>
              <TrendingDown size={16} /> Fator R ≥ 28% → Anexo III
            </div>
            <p className="text-xs" style={{ color: '#047857' }}>
              <strong>Favorável.</strong> Alíquotas começam em 6% e sobem suavemente. Empresa paga menos imposto.
            </p>
            <div className="text-xs mt-2 italic" style={{ color: '#065f46' }}>
              Atividades que naturalmente vão para o III: clínicas, agências de marketing, arquitetura, fisioterapia, academias, salões de beleza, escolas (todas com equipe CLT robusta).
            </div>
          </div>

          <div className="p-4 rounded-lg" style={{ background: '#fef2f2', border: '1px solid #fecaca' }}>
            <div className="font-bold mb-1.5 flex items-center gap-2" style={{ color: '#7f1d1d' }}>
              <TrendingUp size={16} /> Fator R &lt; 28% → Anexo V
            </div>
            <p className="text-xs" style={{ color: '#991b1b' }}>
              <strong>Desfavorável.</strong> Alíquotas começam em 15,5%. Empresa paga até 2,5x mais que no Anexo III nas faixas iniciais.
            </p>
            <div className="text-xs mt-2 italic" style={{ color: '#7f1d1d' }}>
              Atividades que tendem ao V (técnicas, individuais): consultores TI, desenvolvedores, advogados solo, médicos PJ sem clínica, influenciadores sem equipe, engenheiros autônomos.
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg" style={{ background: '#fffbeb', border: '1px solid #fde68a' }}>
          <div className="font-bold mb-2 flex items-center gap-2" style={{ color: '#92400e' }}>
            💡 A jogada estratégica
          </div>
          <p className="text-xs leading-relaxed" style={{ color: '#92400e' }}>
            Quem está no Anexo V por pouco (Fator R 20%–27%) pode <strong>aumentar pró-labore e/ou contratar 1-2 CLTs</strong> para cruzar a barreira dos 28% e cair no Anexo III. A economia anual em imposto frequentemente <strong>supera</strong> o custo adicional de folha. É a otimização tributária mais subutilizada do Simples Nacional.
          </p>
        </div>

        <div className="p-4 rounded-lg" style={{ background: C.bgInput, border: `1px solid ${C.border}` }}>
          <div className="font-bold mb-2" style={{ color: C.navy }}>📊 Exemplo prático</div>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                <th className="text-left py-1.5 font-semibold" style={{ color: C.textMuted }}>RBT12 R$ 600 mil · faturamento R$ 50 mil/mês</th>
                <th className="text-right py-1.5 font-semibold" style={{ color: C.textMuted }}>DAS mensal</th>
                <th className="text-right py-1.5 font-semibold" style={{ color: C.textMuted }}>Anual</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                <td className="py-2" style={{ color: C.navy }}>Folha R$ 5.000 → Fator R 10% → <strong style={{ color: C.danger }}>Anexo V</strong></td>
                <td className="py-2 text-right font-bold" style={{ color: C.danger }}>R$ 8.250</td>
                <td className="py-2 text-right" style={{ color: C.danger }}>R$ 99.000</td>
              </tr>
              <tr>
                <td className="py-2" style={{ color: C.navy }}>Folha R$ 14.000 → Fator R 28% → <strong style={{ color: C.primaryDark }}>Anexo III</strong></td>
                <td className="py-2 text-right font-bold" style={{ color: C.primaryDark }}>R$ 6.000</td>
                <td className="py-2 text-right" style={{ color: C.primaryDark }}>R$ 72.000</td>
              </tr>
              <tr style={{ borderTop: `2px solid ${C.primary}` }}>
                <td className="py-2 font-bold" style={{ color: C.navy }}>Economia ao migrar para III</td>
                <td className="py-2 text-right font-bold" style={{ color: C.primary }}>—</td>
                <td className="py-2 text-right font-bold" style={{ color: C.primary }}>R$ 27.000/ano</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="text-xs text-center pt-2" style={{ color: C.textMuted }}>
          Quer descobrir o Fator R ideal para sua empresa? Use o simulador para testar diferentes cenários de folha.
        </div>
      </div>
    </ModalBase>
  );
}

function PopupRenovacao({ dados, usuario, onClose, onDispararEmail, onDispararWhatsApp, onDispararAmbos }) {
  const { diasRestantes, nivel, jaNotificadoEmail, jaNotificadoWA } = dados;
  const [emailEnviado, setEmailEnviado] = useState(jaNotificadoEmail);
  const [whatsappEnviado, setWhatsappEnviado] = useState(jaNotificadoWA);

  const isCritico = diasRestantes <= 1;
  const isUrgente = diasRestantes <= 7;

  const tituloMap = {
    aviso: 'Seu plano expira em breve',
    alerta: 'Atenção: renovação próxima',
    urgente: 'Renove agora seu acesso',
    critico: 'Última chamada — seu acesso expira amanhã!'
  };

  const subtitulo = diasRestantes <= 1
    ? 'Para não perder acesso ao Simulador Tributário, renove hoje mesmo.'
    : `Faltam apenas ${diasRestantes} dias para seu plano expirar. Renove com antecedência e mantenha seu planejamento tributário sem interrupções.`;

  const handleEnviar = (canal) => {
    if (canal === 'email') {
      setEmailEnviado(true);
      onDispararEmail();
    } else if (canal === 'whatsapp') {
      setWhatsappEnviado(true);
      onDispararWhatsApp();
    } else {
      setEmailEnviado(true);
      setWhatsappEnviado(true);
      onDispararAmbos();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(10,30,61,0.65)', backdropFilter: 'blur(6px)' }}
      onClick={isCritico ? undefined : onClose}>
      <div className="rounded-2xl w-full overflow-hidden"
        style={{ background: '#fff', maxWidth: '560px', boxShadow: '0 25px 60px rgba(10,30,61,0.35)', border: `2px solid ${nivel.cor}` }}
        onClick={e => e.stopPropagation()}>

        {/* Header colorido por urgência */}
        <div className="px-6 py-5 text-center" style={{ background: nivel.cor, color: '#fff' }}>
          <div className="text-4xl mb-2">{nivel.icone}</div>
          <div className="text-xs uppercase tracking-widest font-bold mb-1" style={{ letterSpacing: '0.15em' }}>
            {nivel.label}
          </div>
          <h2 className="text-xl font-bold" style={{ fontFamily: 'Georgia, serif' }}>
            {tituloMap[nivel.nivel]}
          </h2>
        </div>

        {/* Corpo */}
        <div className="p-6">
          {/* Contador de dias destacado */}
          <div className="text-center mb-5 p-4 rounded-xl" style={{ background: nivel.bg, border: `1px solid ${nivel.cor}40` }}>
            <div className="text-xs uppercase font-bold mb-1" style={{ color: nivel.cor, letterSpacing: '0.1em' }}>
              {isCritico ? 'Expira em' : 'Restam'}
            </div>
            <div className="text-5xl font-bold leading-none my-2" style={{ color: nivel.cor, fontFamily: 'Georgia, serif' }}>
              {diasRestantes <= 0 ? 'HOJE' : diasRestantes}
            </div>
            <div className="text-sm font-semibold" style={{ color: nivel.cor }}>
              {diasRestantes <= 1 ? '' : diasRestantes === 1 ? 'dia' : 'dias'}
            </div>
          </div>

          <p className="text-sm text-center mb-5 leading-relaxed" style={{ color: C.navyMid }}>
            {subtitulo}
          </p>

          {/* Lista do que o usuário perde */}
          <div className="mb-5 p-4 rounded-lg" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <div className="text-xs font-bold uppercase mb-2" style={{ color: C.navy, letterSpacing: '0.05em' }}>
              O que você continua tendo com a renovação:
            </div>
            <ul className="space-y-1.5">
              {[
                'Simulações ilimitadas dos 3 regimes',
                'Análise da Reforma Tributária',
                'Insights estratégicos personalizados',
                'Exportação de relatórios PDF',
                'Histórico de simulações salvas'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs" style={{ color: C.navyMid }}>
                  <Check size={13} className="mt-0.5 shrink-0" style={{ color: C.primary }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Botões de notificação (simulação) */}
          <div className="mb-5">
            <div className="text-xs font-bold uppercase mb-2" style={{ color: C.textMuted, letterSpacing: '0.05em' }}>
              Receber lembrete agora:
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleEnviar('email')}
                disabled={emailEnviado}
                className="px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition"
                style={{
                  background: emailEnviado ? '#ecfdf5' : C.bgInput,
                  color: emailEnviado ? C.primaryDark : C.navy,
                  border: `1px solid ${emailEnviado ? C.primary : C.border}`,
                  cursor: emailEnviado ? 'not-allowed' : 'pointer',
                  opacity: emailEnviado ? 0.8 : 1
                }}>
                {emailEnviado ? <Check size={14} /> : <Mail size={14} />}
                {emailEnviado ? 'E-mail enviado' : 'Enviar e-mail'}
              </button>

              <button
                onClick={() => handleEnviar('whatsapp')}
                disabled={whatsappEnviado || !usuario.telefone}
                className="px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition"
                style={{
                  background: whatsappEnviado ? '#ecfdf5' : C.bgInput,
                  color: whatsappEnviado ? C.primaryDark : C.navy,
                  border: `1px solid ${whatsappEnviado ? C.primary : C.border}`,
                  cursor: whatsappEnviado ? 'not-allowed' : 'pointer',
                  opacity: whatsappEnviado ? 0.8 : !usuario.telefone ? 0.4 : 1
                }}>
                {whatsappEnviado ? <Check size={14} /> : <MessageCircle size={14} />}
                {whatsappEnviado ? 'WhatsApp enviado' : 'Enviar WhatsApp'}
              </button>
            </div>
            {usuario.telefone && (
              <div className="text-xs mt-2 text-center" style={{ color: C.textMuted }}>
                Destinos: {usuario.email} · {formatarTelefone(usuario.telefone)}
              </div>
            )}
          </div>

          {/* CTAs principais */}
          <div className="flex gap-3">
            {!isCritico && (
              <button onClick={onClose}
                className="px-4 py-3 rounded-lg text-sm font-semibold transition hover:opacity-80"
                style={{ background: C.bgInput, color: C.textMuted, border: `1px solid ${C.border}`, fontFamily: 'Georgia, serif' }}>
                Depois
              </button>
            )}
            <button
              onClick={() => alert('Funcionalidade de pagamento ativa em produção (Asaas/Pagar.me/Stripe).\n\nPor enquanto, contate o suporte AX Educação para renovar.')}
              className="flex-1 px-4 py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition hover:opacity-90"
              style={{ background: `linear-gradient(135deg, ${nivel.cor} 0%, ${nivel.cor}dd 100%)`, color: '#fff', fontFamily: 'Georgia, serif', boxShadow: `0 4px 12px ${nivel.cor}40` }}>
              <RefreshCw size={14} /> Renovar agora
            </button>
          </div>

          {/* Aviso pequeno se já notificou */}
          {(jaNotificadoEmail || jaNotificadoWA) && (
            <div className="mt-4 text-xs text-center" style={{ color: C.textDim }}>
              ℹ️ Notificações para este marco ({diasRestantes} dias) já foram disparadas anteriormente.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ToastContainer({ toasts, onRemove }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm">
      {toasts.map(t => (
        <div key={t.id}
          className="rounded-lg p-3 flex items-start gap-3 shadow-lg animate-in slide-in-from-right"
          style={{
            background: '#ffffff',
            border: `1px solid ${C.primary}`,
            boxShadow: '0 10px 30px rgba(10,30,61,0.15)',
            minWidth: '280px'
          }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: C.primaryGlow }}>
            {t.canal === 'email' ? <Mail size={14} style={{ color: C.primary }} /> : <MessageCircle size={14} style={{ color: C.primary }} />}
          </div>
          <div className="flex-1">
            <div className="text-xs font-bold flex items-center gap-1.5" style={{ color: C.navy }}>
              <Check size={12} style={{ color: C.primary }} />
              {t.canal === 'email' ? 'E-mail disparado' : 'WhatsApp disparado'}
            </div>
            <div className="text-xs mt-0.5" style={{ color: C.textMuted }}>{t.mensagem}</div>
            <div className="text-xs mt-1" style={{ color: C.textDim, fontStyle: 'italic' }}>
              ⚙️ Simulação — em produção integrado via {t.canal === 'email' ? 'Resend/SendGrid' : 'UAI Zap'}
            </div>
          </div>
          <button onClick={() => onRemove(t.id)} className="shrink-0" style={{ color: C.textMuted }}>
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}

function CardRegime({ regime, melhor, pior }) {
  return (
    <div className="rounded-xl p-5 relative" style={{
      background: melhor ? 'rgba(16,185,129,0.06)' : C.bgCard,
      border: `1px solid ${melhor ? C.borderStrong : C.border}`
    }}>
      {melhor && (
        <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-xs flex items-center gap-1" style={{ background: C.primary, color: C.bgDeep, fontFamily: 'Georgia, serif' }}>
          <Check size={10} /> melhor
        </div>
      )}
      {pior && (
        <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-xs" style={{ background: '#fecaca', color: C.danger, fontFamily: 'Georgia, serif' }}>
          mais caro
        </div>
      )}
      <div className="text-sm mb-1" style={{ color: C.textMuted }}>{regime.nome}</div>
      <div className="text-2xl mb-1" style={{ fontFamily: 'Georgia, serif' }}>{fmtBRL(regime.dados.total)}</div>
      <div className="text-xs mb-3" style={{ color: C.textMuted }}>{fmtPct(regime.dados.aliquotaEfetiva)} efetiva</div>
      {regime.dados.detalhes && (
        <div className="text-xs mt-2 pt-2" style={{ color: C.primary, borderTop: `1px solid ${C.border}` }}>
          {regime.dados.detalhes}
        </div>
      )}
    </div>
  );
}

function BoxComparativo({ titulo, valor, sub, aliquota, destaque }) {
  return (
    <div className="rounded-xl p-5" style={{
      background: destaque ? 'rgba(16,185,129,0.08)' : C.bgInput,
      border: `1px solid ${destaque ? C.borderStrong : C.border}`
    }}>
      <div className="text-xs uppercase tracking-wider mb-2" style={{ color: C.textMuted }}>{titulo}</div>
      <div className="text-2xl mb-1" style={{ fontFamily: 'Georgia, serif', color: destaque ? C.primary : C.navy }}>{fmtBRL(valor)}</div>
      <div className="text-xs" style={{ color: C.textMuted }}>{sub} · {fmtPct(aliquota)}</div>
    </div>
  );
}

function ItemDet({ label, valor }) {
  return (
    <div>
      <div className="text-xs" style={{ color: C.textMuted }}>{label}</div>
      <div className="text-sm mt-0.5" style={{ fontFamily: 'Georgia, serif' }}>{fmtBRL(valor)}</div>
    </div>
  );
}

function CardDica({ dica }) {
  const config = {
    oportunidade: { cor: C.primary, bg: 'rgba(16,185,129,0.08)', borda: C.borderStrong, icone: '🚀', rotulo: 'Oportunidade' },
    atencao:      { cor: C.warn,    bg: '#fffbeb', borda: '#fde68a', icone: '⚠️', rotulo: 'Atenção' },
    critico:      { cor: C.danger,  bg: '#fef2f2', borda: '#fca5a5', icone: '🚨', rotulo: 'Crítico' },
    info:         { cor: C.primarySoft, bg: '#ecfdf5', borda: C.border, icone: '💡', rotulo: 'Insight' },
  };
  const c = config[dica.tipo] || config.info;

  return (
    <div className="rounded-lg p-4" style={{ background: c.bg, border: `1px solid ${c.borda}` }}>
      <div className="flex items-start gap-3">
        <span className="text-xl shrink-0">{c.icone}</span>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-xs uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ background: C.bgInput, color: c.cor, letterSpacing: '0.1em' }}>
              {c.rotulo}
            </span>
            <h4 className="text-sm" style={{ fontFamily: 'Georgia, serif', color: C.navy }}>{dica.titulo}</h4>
          </div>
          <p className="text-xs leading-relaxed mb-3" style={{ color: C.whiteSoft }}>{dica.texto}</p>
          {dica.frase && (
            <div className="pt-3 mt-2" style={{ borderTop: `1px solid ${c.borda}` }}>
              <p className="text-xs italic" style={{ fontFamily: 'Georgia, serif', color: c.cor }}>
                {dica.frase}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DetalhamentoTributos({ simples, presumido, real, atividade, issAliq, icmsAliq }) {
  // Determina presunções IRPJ/CSLL do Presumido conforme atividade
  const presuncaoMap = {
    comercio:         { irpj: 8,  csll: 12 },
    industria:        { irpj: 8,  csll: 12 },
    servicos:         { irpj: 32, csll: 32 },
    servicos_hosp:    { irpj: 32, csll: 32 },
    transporte:       { irpj: 16, csll: 12 },
    transporte_carga: { irpj: 8,  csll: 12 },
    produto_digital:  { irpj: 32, csll: 32 },
    influencer:       { irpj: 32, csll: 32 },
  };
  const presunc = presuncaoMap[atividade] || presuncaoMap.servicos;
  const isServico = atividade === 'servicos' || atividade === 'servicos_hosp' || atividade.startsWith('transporte') || atividade === 'produto_digital' || atividade === 'influencer';
  const aliquotaIssIcms = isServico ? issAliq : icmsAliq;
  const tipoTerritorial = isServico ? 'ISS' : 'ICMS';

  // Alíquota efetiva do Simples (DAS)
  const aliqSimples = simples.aliquotaEfetiva || 0;

  return (
    <div className="rounded-2xl p-6" style={{ background: C.bgCard, border: `1px solid ${C.border}`, boxShadow: '0 1px 3px rgba(10,30,61,0.05)' }}>
      <h3 className="text-sm uppercase tracking-wider mb-5" style={{ color: C.primary, letterSpacing: '0.1em' }}>Detalhamento mensal — sistema atual</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wider" style={{ color: C.textMuted }}>
              <th className="text-left pb-3 font-normal">Tributo</th>
              <th className="text-right pb-3 font-normal">Simples</th>
              <th className="text-right pb-3 font-normal">Presumido</th>
              <th className="text-right pb-3 font-normal">Real</th>
            </tr>
          </thead>
          <tbody style={{ color: C.whiteSoft }}>
            <LinhaTributo label="DAS" subtitulo={`alíq. efetiva ${fmtPct(aliqSimples)}`} v1={simples.das} />
            <LinhaTributo label="PIS" subtitulo="0,65% (cumulativo)" v2={presumido.pis} />
            <LinhaTributo label="COFINS" subtitulo="3,00% (cumulativo)" v2={presumido.cofins} />
            <LinhaTributo label="PIS/COFINS" subtitulo="9,25% (não-cumulativo)" v3={real.pisCofins} />
            <LinhaTributo label="IRPJ" subtitulo={`Presumido: 15% sobre ${presunc.irpj}% da receita · Real: 15% sobre lucro`} v2={presumido.irpj} v3={real.irpj} />
            <LinhaTributo label="IRPJ adicional" subtitulo="10% sobre o que exceder R$ 20.000/mês" v2={presumido.irpjAdicional} v3={real.irpjAdicional} />
            <LinhaTributo label="CSLL" subtitulo={`Presumido: 9% sobre ${presunc.csll}% · Real: 9% sobre lucro`} v2={presumido.csll} v3={real.csll} />
            <LinhaTributo label={tipoTerritorial} subtitulo={`${fmtPct(aliquotaIssIcms)} sobre a receita`} v2={presumido.issIcms} v3={real.issIcms} />
            <LinhaTributo label="INSS patronal" subtitulo="20% INSS + 2% RAT sobre folha" v1={simples.inssExtra} v2={presumido.inssPatronal} v3={real.inssPatronal} />
            <tr style={{ borderTop: `2px solid ${C.primary}`, color: C.navy }}>
              <td className="pt-4 pb-1" style={{ fontFamily: 'Georgia, serif', fontWeight: 700 }}>Total</td>
              <td className="pt-4 pb-1 text-right" style={{ fontFamily: 'Georgia, serif', fontWeight: 700 }}>{fmtBRL(simples.total)}</td>
              <td className="pt-4 pb-1 text-right" style={{ fontFamily: 'Georgia, serif', fontWeight: 700 }}>{fmtBRL(presumido.total)}</td>
              <td className="pt-4 pb-1 text-right" style={{ fontFamily: 'Georgia, serif', fontWeight: 700 }}>{fmtBRL(real.total)}</td>
            </tr>
            <tr style={{ color: C.textMuted }}>
              <td className="text-xs pb-2" style={{ fontStyle: 'italic' }}>Alíquota efetiva total</td>
              <td className="text-xs text-right pb-2" style={{ fontStyle: 'italic' }}>{simples.total > 0 ? fmtPct(simples.aliquotaEfetiva) : '—'}</td>
              <td className="text-xs text-right pb-2" style={{ fontStyle: 'italic' }}>{presumido.total > 0 ? fmtPct(presumido.aliquotaEfetiva) : '—'}</td>
              <td className="text-xs text-right pb-2" style={{ fontStyle: 'italic' }}>{real.total > 0 ? fmtPct(real.aliquotaEfetiva) : '—'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LinhaTributo({ label, subtitulo, v1, v2, v3 }) {
  return (
    <tr style={{ borderTop: `1px solid ${C.border}` }}>
      <td className="py-2.5">
        <div className="text-xs font-semibold" style={{ color: C.navy }}>{label}</div>
        {subtitulo && <div className="text-xs mt-0.5" style={{ color: C.textMuted, fontSize: '10.5px' }}>{subtitulo}</div>}
      </td>
      <td className="py-2.5 text-right text-xs align-top">{v1 != null && v1 > 0 ? fmtBRL(v1) : '—'}</td>
      <td className="py-2.5 text-right text-xs align-top">{v2 != null && v2 > 0 ? fmtBRL(v2) : '—'}</td>
      <td className="py-2.5 text-right text-xs align-top">{v3 != null && v3 > 0 ? fmtBRL(v3) : '—'}</td>
    </tr>
  );
}

// ============================================================
// PAINEL ADMIN
// ============================================================
function PainelAdmin({ usuarios, setUsuarios, onVoltar, usuarioAtual }) {
  const [novoNome, setNovoNome] = useState('');
  const [novoEmail, setNovoEmail] = useState('');
  const [novoTelefone, setNovoTelefone] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [novoPlano, setNovoPlano] = useState('mensal');
  const [modalHistorico, setModalHistorico] = useState(null);

  const criarUsuario = () => {
    if (!novoNome || !novoEmail || !novaSenha) { alert('Preencha todos os campos'); return; }
    const dias = novoPlano === 'anual' || novoPlano === 'cliente-especial' ? 365 : 30;
    const novo = {
      id: Date.now(), nome: novoNome, email: novoEmail, telefone: novoTelefone, senha: novaSenha,
      role: 'user', plano: novoPlano, criadoEm: new Date().toISOString(),
      validadeAte: new Date(Date.now() + dias * 24 * 60 * 60 * 1000).toISOString(),
      notificacoes: []
    };
    setUsuarios([...usuarios, novo]);
    setNovoNome(''); setNovoEmail(''); setNovoTelefone(''); setNovaSenha('');
  };

  const remover = (id) => {
    if (id === usuarioAtual.id) { alert('Não pode remover você mesmo'); return; }
    if (confirm('Remover usuário?')) setUsuarios(usuarios.filter(u => u.id !== id));
  };

  const estender = (id, dias) => {
    setUsuarios(usuarios.map(u => {
      if (u.id !== id) return u;
      const nova = new Date(Math.max(new Date(u.validadeAte).getTime(), Date.now()) + dias * 24 * 60 * 60 * 1000);
      return { ...u, validadeAte: nova.toISOString() };
    }));
  };

  return (
    <div className="min-h-screen p-6" style={{ background: C.bgDeep, color: C.navy }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <button onClick={onVoltar} className="text-sm mb-4 hover:opacity-80" style={{ color: C.textMuted }}>← voltar à calculadora</button>
            <h1 className="text-3xl" style={{ fontFamily: 'Georgia, serif' }}>Painel administrativo</h1>
            <p className="text-sm mt-1" style={{ color: C.textMuted }}>Gerencie usuários, planos e validade de acesso</p>
          </div>
          <div className="px-3 py-1.5 rounded-full text-xs flex items-center gap-1.5" style={{ background: 'rgba(16,185,129,0.15)', color: C.primary }}>
            <Shield size={12} /> Admin
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total" valor={usuarios.length} />
          <StatCard label="Ativos" valor={usuarios.filter(u => new Date(u.validadeAte) > new Date()).length} cor={C.primary} />
          <StatCard label="Expirados" valor={usuarios.filter(u => new Date(u.validadeAte) <= new Date() && u.role !== 'admin').length} cor={C.danger} />
          <StatCard label="Clientes Plano Especial" valor={usuarios.filter(u => u.plano === 'cliente-especial').length} cor={C.primarySoft} />
        </div>

        <section className="rounded-2xl p-6 mb-8" style={{ background: C.bgCard, border: `1px solid ${C.border}`, boxShadow: '0 1px 3px rgba(10,30,61,0.05)' }}>
          <h3 className="text-sm uppercase tracking-wider mb-4" style={{ color: C.primary, letterSpacing: '0.1em' }}>Criar usuário manualmente</h3>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
            <input value={novoNome} onChange={e => setNovoNome(e.target.value)} placeholder="Nome" className="px-3 py-2 rounded-lg text-sm outline-none" style={{ background: C.bgInput, border: `1px solid ${C.border}`, color: C.navy }} />
            <input value={novoEmail} onChange={e => setNovoEmail(e.target.value)} placeholder="E-mail" className="px-3 py-2 rounded-lg text-sm outline-none" style={{ background: C.bgInput, border: `1px solid ${C.border}`, color: C.navy }} />
            <input value={novoTelefone} onChange={e => setNovoTelefone(e.target.value)} placeholder="WhatsApp (DDD+número)" className="px-3 py-2 rounded-lg text-sm outline-none" style={{ background: C.bgInput, border: `1px solid ${C.border}`, color: C.navy }} />
            <input value={novaSenha} onChange={e => setNovaSenha(e.target.value)} placeholder="Senha" className="px-3 py-2 rounded-lg text-sm outline-none" style={{ background: C.bgInput, border: `1px solid ${C.border}`, color: C.navy }} />
            <select value={novoPlano} onChange={e => setNovoPlano(e.target.value)} className="px-3 py-2 rounded-lg text-sm outline-none" style={{ background: C.bgInput, border: `1px solid ${C.border}`, color: C.navy }}>
              <option value="mensal">Mensal (30d)</option>
              <option value="anual">Anual (365d)</option>
              <option value="cliente-especial">Cliente Especial (365d)</option>
            </select>
            <button onClick={criarUsuario} className="px-3 py-2 rounded-lg text-sm flex items-center justify-center gap-2 font-semibold" style={{ background: `linear-gradient(135deg, ${C.primary} 0%, ${C.primaryDark} 100%)`, color: '#fff', fontFamily: 'Georgia, serif' }}>
              <Plus size={14} /> Criar
            </button>
          </div>
        </section>

        <section className="rounded-2xl p-6" style={{ background: C.bgCard, border: `1px solid ${C.border}`, boxShadow: '0 1px 3px rgba(10,30,61,0.05)' }}>
          <h3 className="text-sm uppercase tracking-wider mb-4" style={{ color: C.primary, letterSpacing: '0.1em' }}>Usuários cadastrados</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wider" style={{ color: C.textMuted }}>
                  <th className="text-left pb-3 font-normal">Nome</th>
                  <th className="text-left pb-3 font-normal">E-mail</th>
                  <th className="text-left pb-3 font-normal">Plano</th>
                  <th className="text-left pb-3 font-normal">Status</th>
                  <th className="text-left pb-3 font-normal">Expira</th>
                  <th className="text-right pb-3 font-normal">Ações</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map(u => {
                  const ativo = u.role === 'admin' || new Date(u.validadeAte) > new Date();
                  const dias = Math.ceil((new Date(u.validadeAte) - new Date()) / (1000 * 60 * 60 * 24));
                  return (
                    <tr key={u.id} style={{ borderTop: `1px solid ${C.border}`, color: C.whiteSoft }}>
                      <td className="py-3">{u.nome} {u.role === 'admin' && <span className="text-xs ml-1" style={{ color: C.primary }}>(admin)</span>}</td>
                      <td className="py-3 text-xs">{u.email}</td>
                      <td className="py-3 text-xs">{u.plano || '—'}</td>
                      <td className="py-3">
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: ativo ? 'rgba(16,185,129,0.15)' : '#fef2f2', color: ativo ? C.primary : C.danger }}>
                          {ativo ? 'Ativo' : 'Expirado'}
                        </span>
                      </td>
                      <td className="py-3 text-xs">
                        {u.role === 'admin' ? '—' : `${new Date(u.validadeAte).toLocaleDateString('pt-BR')} (${dias > 0 ? `${dias}d` : 'venceu'})`}
                      </td>
                      <td className="py-3 text-right">
                        {u.role !== 'admin' && (
                          <div className="flex gap-1 justify-end">
                            <button onClick={() => setModalHistorico(u)} title="Ver histórico de notificações"
                              className="px-2 py-1 rounded text-xs hover:opacity-80 relative" style={{ background: '#dbeafe', color: '#1e40af' }}>
                              <Bell size={12} />
                              {(u.notificacoes || []).length > 0 && (
                                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center font-bold"
                                  style={{ background: C.primary, color: '#fff', fontSize: '9px' }}>{u.notificacoes.length}</span>
                              )}
                            </button>
                            <button onClick={() => estender(u.id, 30)} className="px-2 py-1 rounded text-xs hover:opacity-80" style={{ background: 'rgba(16,185,129,0.08)', color: C.primary }}>+30d</button>
                            <button onClick={() => estender(u.id, 365)} className="px-2 py-1 rounded text-xs hover:opacity-80" style={{ background: 'rgba(16,185,129,0.08)', color: C.primary }}>+1ano</button>
                            <button onClick={() => remover(u.id)} className="px-2 py-1 rounded text-xs hover:opacity-80" style={{ background: '#fef2f2', color: C.danger }}><Trash2 size={12} /></button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* Modal de histórico de notificações */}
      {modalHistorico && (
        <ModalBase onClose={() => setModalHistorico(null)} titulo={`Histórico de notificações — ${modalHistorico.nome}`} largura="700px">
          <div className="text-xs mb-4 p-3 rounded-lg" style={{ background: C.bgInput, border: `1px solid ${C.border}`, color: C.textMuted }}>
            <strong style={{ color: C.navy }}>📧 E-mail:</strong> {modalHistorico.email}<br />
            <strong style={{ color: C.navy }}>📱 WhatsApp:</strong> {modalHistorico.telefone ? formatarTelefone(modalHistorico.telefone) : 'não cadastrado'}
          </div>

          {(modalHistorico.notificacoes || []).length === 0 ? (
            <div className="text-center py-12">
              <Bell size={36} style={{ color: C.textDim }} className="mx-auto mb-3" />
              <p className="text-sm" style={{ color: C.textMuted }}>Nenhuma notificação enviada ainda.</p>
              <p className="text-xs mt-1" style={{ color: C.textDim }}>As notificações automáticas dispararão em 30, 15, 7 e 1 dia antes da expiração.</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-[50vh] overflow-y-auto">
              {[...modalHistorico.notificacoes].reverse().map((n, i) => (
                <div key={i} className="rounded-lg p-3 flex items-center gap-3" style={{ background: C.bgInput, border: `1px solid ${C.border}` }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: C.primaryGlow }}>
                    {n.canal === 'email' ? <Mail size={14} style={{ color: C.primary }} /> : <MessageCircle size={14} style={{ color: C.primary }} />}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold" style={{ color: C.navy }}>
                      {n.canal === 'email' ? 'E-mail enviado' : 'WhatsApp enviado'}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: C.textMuted }}>
                      Para: <strong>{n.destino}</strong>
                    </div>
                    <div className="text-xs" style={{ color: C.textDim }}>
                      Marco: {n.marco} dia(s) antes da expiração · {new Date(n.dataEnviada).toLocaleString('pt-BR')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 p-3 rounded text-xs" style={{ background: '#fffbeb', border: '1px solid #fde68a', color: '#92400e' }}>
            ⚙️ <strong>Em produção:</strong> envios automáticos via cron diário (verifica todos os usuários, dispara nos marcos 30/15/7/1). E-mail via Resend/SendGrid · WhatsApp via UAI Zap API.
          </div>
        </ModalBase>
      )}
    </div>
  );
}

function StatCard({ label, valor, cor = C.primary }) {
  return (
    <div className="rounded-xl p-4" style={{ background: C.bgCard, border: `1px solid ${C.border}`, boxShadow: '0 1px 3px rgba(10,30,61,0.05)' }}>
      <div className="text-xs uppercase tracking-wider mb-1" style={{ color: C.textMuted }}>{label}</div>
      <div className="text-3xl" style={{ fontFamily: 'Georgia, serif', color: cor }}>{valor}</div>
    </div>
  );
}

// ============================================================
// APP RAIZ
// ============================================================
export default function App() {
  const [usuarios, setUsuarios] = useState([
    { id: 1, nome: 'Alef Lima', email: 'admin@axeducacao.com.br', telefone: '11968613939', senha: 'admin123', role: 'admin', plano: 'admin', criadoEm: new Date().toISOString(), validadeAte: new Date(Date.now() + 365 * 100 * 24 * 60 * 60 * 1000).toISOString(), notificacoes: [] },
    { id: 2, nome: 'João Cliente', email: 'cliente@axeducacao.com.br', telefone: '11987654321', senha: '123456', role: 'user', plano: 'cliente-especial', criadoEm: new Date().toISOString(), validadeAte: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(), notificacoes: [] }
  ]);
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [tela, setTela] = useState('login');
  const [usuarioPendente, setUsuarioPendente] = useState(null);

  const handleLogin = (u) => {
    if (u.novo) { setUsuarioPendente(u); setTela('planos'); }
    else { setUsuarioLogado(u); setTela('calculadora'); }
  };

  const handleAssinar = (plano, dias) => {
    const novo = {
      id: Date.now(), ...usuarioPendente, novo: undefined,
      role: 'user', plano, criadoEm: new Date().toISOString(),
      validadeAte: new Date(Date.now() + dias * 24 * 60 * 60 * 1000).toISOString()
    };
    setUsuarios([...usuarios, novo]);
    setUsuarioLogado(novo);
    setUsuarioPendente(null);
    setTela('calculadora');
  };

  if (tela === 'login') return <TelaLogin onLogin={handleLogin} usuarios={usuarios} />;
  if (tela === 'planos') return <TelaPlanos novoUsuario={usuarioPendente} onAssinar={handleAssinar} onVoltar={() => setTela('login')} />;
  if (tela === 'admin' && usuarioLogado?.role === 'admin') return <PainelAdmin usuarios={usuarios} setUsuarios={setUsuarios} onVoltar={() => setTela('calculadora')} usuarioAtual={usuarioLogado} />;
  return <PainelCalculadora usuario={usuarioLogado} onLogout={() => { setUsuarioLogado(null); setTela('login'); }} onAdmin={() => setTela('admin')} usuarios={usuarios} setUsuarios={setUsuarios} />;
}
