import { useState, useMemo } from "react";

const data = [
  // ─── PULMONAR ───────────────────────────────────────────────────────────────
  {
    rf: "⁹⁹ᵐTc-DTPA (aerossol)",
    exame: "Cintilografia Pulmonar",
    sistema: "Pulmonar",
    via: "Inalatória",
    mecanismo: "Sedimentação gravitacional na árvore brônquica → difusão pela membrana alvéolo-capilar",
    indicacao: "Ventilação pulmonar (1ª etapa da cintilografia pulmonar)",
    obs: "Mesmo DTPA da cintilografia renal (IV) e mielocisternografia (intratecal) — a via muda o exame!",
    cor: "#0ea5e9",
  },
  {
    rf: "⁹⁹ᵐTc-MAA",
    exame: "Cintilografia Pulmonar",
    sistema: "Pulmonar",
    via: "Intravenosa",
    mecanismo: "Microembolização temporária dos capilares pulmonares (bloqueio de capilares)",
    indicacao: "Perfusão pulmonar (2ª etapa). TEP, shunt D→E (cuidado!), quantificação pré-cirúrgica",
    obs: "MAA = Macroagregado de Albumina. ⚠️ Shunt D→E = contraindicado. Dose mínima em crianças e HAS pulmonar.",
    cor: "#0ea5e9",
  },
  {
    rf: "Gases nobres (Xe-133, Kr-81m)",
    exame: "Cintilografia Pulmonar",
    sistema: "Pulmonar",
    via: "Inalatória",
    mecanismo: "Lipossolúveis → difusão simples e rápido clareamento",
    indicacao: "Ventilação pulmonar (alternativa ao DTPA aerossol — melhor imagem, menos disponível)",
    obs: "Imagens em 3 fases: inspiração, equilíbrio e clareamento.",
    cor: "#0ea5e9",
  },
  // ─── ÓSSEA ──────────────────────────────────────────────────────────────────
  {
    rf: "⁹⁹ᵐTc-MDP",
    exame: "Cintilografia Óssea",
    sistema: "Ósseo",
    via: "Intravenosa",
    mecanismo: "Absorção físico-química — liga-se à HIDROXIAPATITA recém-depositada pelos osteoblastos",
    indicacao: "Metástases ósseas (principal), traumas/fraturas ocultas, Paget, osteomielite, tumores",
    obs: "Eliminação renal — orientar hidratação. Lesões OSTEOLÍTICAS podem ser falso-negativas (mieloma múltiplo!). Imagens 3h após IV.",
    cor: "#f97316",
  },
  {
    rf: "⁹⁹ᵐTc-Leucócitos marcados",
    exame: "Cintilografia Óssea (infecção)",
    sistema: "Ósseo",
    via: "Intravenosa",
    mecanismo: "Reação antígeno-anticorpo / sequestro celular",
    indicacao: "Osteomielite pós-cirúrgica, infecção de prótese (passo 2 do algoritmo)",
    obs: "Captação fisiológica em pulmão, fígado e baço. Qualquer outra área = infecção/inflamação.",
    cor: "#f97316",
  },
  {
    rf: "⁹⁹ᵐTc-Fitato",
    exame: "Cintilografia Óssea (medula)",
    sistema: "Ósseo",
    via: "Intravenosa",
    mecanismo: "Fagocitose pelo sistema reticuloendotelial da medula óssea",
    indicacao: "Avaliação da integridade da medula óssea (passo 3 do algoritmo de prótese infectada)",
    obs: "Comparar com leucócitos: leucócitos > fitato na mesma área = OSTEOMIELITE.",
    cor: "#f97316",
  },
  // ─── CARDÍACA ────────────────────────────────────────────────────────────────
  {
    rf: "⁹⁹ᵐTc-Sestamibi (Isonitrila)",
    exame: "Cintilografia Cardíaca",
    sistema: "Cardíaco",
    via: "Intravenosa",
    mecanismo: "Difusão passiva para as MITOCÔNDRIAS dos miócitos",
    indicacao: "PERFUSÃO miocárdica — avaliação de isquemia/fibrose (esforço + repouso)",
    obs: "Redistribuição MÍNIMA — permanece no miócito por tempo considerável. Mais usado atualmente. Excreção hepatobiliar.",
    cor: "#e11d48",
  },
  {
    rf: "Tálio-201 (Tl-201)",
    exame: "Cintilografia Cardíaca",
    sistema: "Cardíaco",
    via: "Intravenosa",
    mecanismo: "Análogo do K⁺ — entra pela bomba Na/K (transporte ativo)",
    indicacao: "VIABILIDADE miocárdica — miocárdio hibernante (redistribuição = membrana íntegra = célula viva)",
    obs: "Alta extração 1ª passagem (~88%). Sofre redistribuição. Poupa 1h para imagem.",
    cor: "#e11d48",
  },
  {
    rf: "⁹⁹ᵐTc-Tetrofosmin (Difosfina)",
    exame: "Cintilografia Cardíaca",
    sistema: "Cardíaco",
    via: "Intravenosa",
    mecanismo: "Agente lipofílico → mitocôndrias dos miócitos",
    indicacao: "PERFUSÃO miocárdica (alternativa ao sestamibi)",
    obs: "Não necessita aquecimento — vantagem prática. Pouca recirculação.",
    cor: "#e11d48",
  },
  {
    rf: "¹²³I-MIBG (cardíaco)",
    exame: "Cintilografia Cardíaca",
    sistema: "Cardíaco",
    via: "Intravenosa",
    mecanismo: "Análogo da norepinefrina → inervação simpática cardíaca",
    indicacao: "INERVAÇÃO cardíaca — Doença de Chagas, insuficiência cardíaca, cardiotoxicidade",
    obs: "Razão H/M (heart/mediastinum) > 1,89 = inervação preservada. Amiloidose: usar Tc-DPD ou Tc-PYP.",
    cor: "#e11d48",
  },
  {
    rf: "⁹⁹ᵐTc-Hemácias",
    exame: "Ventriculografia",
    sistema: "Cardíaco",
    via: "Intravenosa",
    mecanismo: "Sequestro celular — marcação das hemácias circulantes",
    indicacao: "Fração de ejeção (FE). FE normal VE: 50-65%. Melhor método para VD. Cardiotoxicidade por QT.",
    obs: "Limitação: arritmias (FA comprometem o cálculo).",
    cor: "#e11d48",
  },
  // ─── RENAL ───────────────────────────────────────────────────────────────────
  {
    rf: "⁹⁹ᵐTc-DTPA (IV)",
    exame: "Cintilografia Renal",
    sistema: "Renal",
    via: "Intravenosa",
    mecanismo: "100% FILTRAÇÃO GLOMERULAR — não se liga a proteínas, sem secreção/reabsorção tubular",
    indicacao: "Renograma, TFG, fluxo pré-renal, perfusão renal, teste do captopril e furosemida",
    obs: "Pico normal do renograma: 3-5 min. Meia-vida biológica: 2h. Mesmo DTPA em outras vias.",
    cor: "#0ea5e9",
  },
  {
    rf: "⁹⁹ᵐTc-DMSA",
    exame: "Cintilografia Renal",
    sistema: "Renal",
    via: "Intravenosa",
    mecanismo: "Retenção no CÓRTEX TUBULAR RENAL (40-50% fixa por período prolongado)",
    indicacao: "PARÊNQUIMA renal — cicatriz renal, pielonefrite, refluxo vésico-ureteral, anomalias congênitas",
    obs: "Imagens 3-4h após. 70% de concentração renal 24h após. Hipocaptante = parênquima não funcionante.",
    cor: "#0ea5e9",
  },
  {
    rf: "⁹⁹ᵐTc-MAG3",
    exame: "Cintilografia Renal",
    sistema: "Renal",
    via: "Intravenosa",
    mecanismo: "100% SECREÇÃO TUBULAR — maior extração renal que o DTPA",
    indicacao: "Função renal (especialmente quando TFG reduzida). FPER (fluxo plasmático renal efetivo).",
    obs: "Tc-EC é equivalente. Liga-se a proteínas.",
    cor: "#0ea5e9",
  },
  // ─── SNC ─────────────────────────────────────────────────────────────────────
  {
    rf: "⁹⁹ᵐTc-HMPAO",
    exame: "SPECT Cerebral",
    sistema: "SNC",
    via: "Intravenosa",
    mecanismo: "Lipofílico → atravessa BHE intacta → distribui por fluxo sanguíneo cerebral → fica preso nos neurônios",
    indicacao: "Perfusão cerebral — demências, epilepsia, AVC, doenças psiquiátricas, morte encefálica",
    obs: "Sala escura 30 min antes. SEMPRE SPECT (nunca só planar). Extração alta na 1ª passagem.",
    cor: "#8b5cf6",
  },
  {
    rf: "⁹⁹ᵐTc-ECD",
    exame: "SPECT Cerebral",
    sistema: "SNC",
    via: "Intravenosa",
    mecanismo: "Lipofílico → atravessa BHE intacta → distribui por fluxo sanguíneo cerebral → fica preso nos neurônios",
    indicacao: "Perfusão cerebral (mesmo que HMPAO — são intercambiáveis)",
    obs: "Etilenodicisteinato de dietila. Mesmas propriedades do HMPAO.",
    cor: "#8b5cf6",
  },
  {
    rf: "⁹⁹ᵐTc-TRODAT",
    exame: "SPECT Cerebral (dopaminérgico)",
    sistema: "SNC",
    via: "Intravenosa",
    mecanismo: "Afinidade pelo transportador de dopamina (DAT) — cruza a BHE",
    indicacao: "Doença de Parkinson — avaliação do sistema dopaminérgico (NÃO usa HMPAO/ECD!)",
    obs: "Normal: captação no estriado (caudado + putamen). Parkinson: hipocaptação. Análise quantitativa necessária.",
    cor: "#8b5cf6",
  },
  {
    rf: "⁹⁹ᵐTc-DTPA (intratecal)",
    exame: "Mielocisternografia",
    sistema: "SNC",
    via: "Intratecal (punção lombar)",
    mecanismo: "Localização compartimental — acompanha o fluxo do LCR",
    indicacao: "Hidrocefalia de pressão normal (HPN), perviedade de derivação ventrículo-peritoneal, fístula liquórica",
    obs: "Imagens 1h, 3h e 24h. Normal: progride para convexidades. HPN: reflui para ventrículos laterais.",
    cor: "#8b5cf6",
  },
  // ─── TERAPIA ─────────────────────────────────────────────────────────────────
  {
    rf: "¹³¹I (Iodo-131)",
    exame: "Radioiodoterapia",
    sistema: "Terapia",
    via: "Oral",
    mecanismo: "Transporte ativo pela tireoide (análogo do iodo estável). Beta- para terapia + Gama para diagnóstico (teranóstico)",
    indicacao: "Hipertireoidismo (Graves, Plummer). Ca diferenciado de tireoide (pós-tireoidectomia total)",
    obs: "Hipertireoide: ≤50 mCi (sem internação). CDT alto risco: 150-300 mCi (internação >50 mCi). Mulher: não engravidar 6-12 meses.",
    cor: "#10b981",
  },
  {
    rf: "Sr-89 (Estrôncio)",
    exame: "Terapia — Dor óssea",
    sistema: "Terapia",
    via: "Intravenosa",
    mecanismo: "Análogo do cálcio → concentra-se em ossos com alta remodelação",
    indicacao: "Dor óssea por metástases (câncer de próstata e mama principalmente)",
    obs: "Emite APENAS beta-. Maior toxicidade hematológica. Sem ganho de sobrevida.",
    cor: "#10b981",
  },
  {
    rf: "Sm-153 (Samário)",
    exame: "Terapia — Dor óssea",
    sistema: "Terapia",
    via: "Intravenosa",
    mecanismo: "Concentra-se em ossos com alta remodelação osteoblástica",
    indicacao: "Dor óssea por metástases. Radiosinovectomia.",
    obs: "Emite beta- + gama (permite imagem diagnóstica). Toxicidade hematológica. Sem ganho de sobrevida.",
    cor: "#10b981",
  },
  {
    rf: "Ra-223 / Xofigo®",
    exame: "Terapia — Ca Próstata",
    sistema: "Terapia",
    via: "Intravenosa",
    mecanismo: "Análogo do cálcio → concentra-se em metástases ósseas. Partícula ALFA",
    indicacao: "CPRC (câncer de próstata resistente à castração) com metástases ósseas sintomáticas e SEM metástases viscerais",
    obs: "⭐ ÚNICO ALFA para dor óssea. Menor toxicidade hematológica. GANHO DE SOBREVIDA (↓30% risco de morte).",
    cor: "#10b981",
  },
  {
    rf: "¹³¹I-MIBG (terapêutico)",
    exame: "Terapia — Neuroendócrino",
    sistema: "Terapia",
    via: "Intravenosa",
    mecanismo: "Análogo da norepinefrina → captado por células neuroendócrinas",
    indicacao: "Feocromocitoma/paraganglioma inoperáveis, neuroblastoma, carcinoma medular recorrente",
    obs: "~10% neuroblastomas: FALSO-NEGATIVO (sem transportador NE). Contraindicado: gestante, IRC, sobrevida <3 meses.",
    cor: "#10b981",
  },
  {
    rf: "Lu-177-DOTATATE (Lutathera)",
    exame: "PRRT — Neuroendócrino",
    sistema: "Terapia",
    via: "Intravenosa",
    mecanismo: "Análogo de somatostatina → receptor superexpresso em tumores neuroendócrinos (SSTR)",
    indicacao: "Tumores neuroendócrinos irressecáveis (pâncreas, intestino, pulmão)",
    obs: "Teranóstico: Ga-68-DOTATOC para diagnóstico → se capta → Lu-177 para terapia.",
    cor: "#10b981",
  },
  {
    rf: "Lu-177-PSMA",
    exame: "Terapia — Ca Próstata",
    sistema: "Terapia",
    via: "Intravenosa",
    mecanismo: "Anticorpo anti-PSMA → PSMA superexpresso em células de Ca de próstata",
    indicacao: "Câncer de próstata metastático resistente à castração",
    obs: "Teranóstico: Ga-68-PSMA (PET diagnóstico) → se capta → Lu-177-PSMA (terapia).",
    cor: "#10b981",
  },
  {
    rf: "Y-90-Zevalin (Ibritumomab)",
    exame: "Radioimunoterapia",
    sistema: "Terapia",
    via: "Intravenosa",
    mecanismo: "Anticorpo monoclonal anti-CD20 marcado com Y-90",
    indicacao: "Linfoma não-Hodgkin de células B refratário/recidivante",
    obs: "Opção subestimada em expansão para idosos com doença refratária.",
    cor: "#10b981",
  },
  // ─── PET ─────────────────────────────────────────────────────────────────────
  {
    rf: "¹⁸F-FDG",
    exame: "PET-CT",
    sistema: "PET",
    via: "Intravenosa",
    mecanismo: "Análogo da GLICOSE → GLUT → hexoquinase → FDG-6-fosfato APRISIONADO na célula",
    indicacao: "Oncologia (estadiamento, resposta terapêutica, recidiva), neurologia (demências, epilepsia), cardiologia (viabilidade)",
    obs: "Jejum 6-8h. Dieta pobre em CHO 24h antes. Paciente aquecido (gordura marrom!). Não falar. Não exercitar.",
    cor: "#a855f7",
  },
  {
    rf: "¹⁸F-Fluoreto de sódio (NaF)",
    exame: "PET Ósseo",
    sistema: "PET",
    via: "Intravenosa",
    mecanismo: "Liga-se à hidroxiapatita (mesmo mecanismo do MDP, mas com F-18)",
    indicacao: "Metástases ósseas (maior sensibilidade que a cintilografia óssea com MDP)",
    obs: "Substitui a cintilografia óssea no contexto do PET. Mais sensível, mais caro.",
    cor: "#a855f7",
  },
  {
    rf: "⁶⁸Ga-DOTATOC/DOTATATE",
    exame: "PET Neuroendócrino",
    sistema: "PET",
    via: "Intravenosa",
    mecanismo: "Análogo de somatostatina → liga-se ao receptor SSTR2 superexpresso",
    indicacao: "Diagnóstico e estadiamento de tumores neuroendócrinos (par diagnóstico do Lu-177-DOTATATE)",
    obs: "Teranóstico: Ga-68 (diagnóstico) + Lu-177 (terapia). Exige captação para indicar PRRT.",
    cor: "#a855f7",
  },
  {
    rf: "⁶⁸Ga-PSMA",
    exame: "PET — Ca Próstata",
    sistema: "PET",
    via: "Intravenosa",
    mecanismo: "Liga-se ao PSMA (antígeno de membrana específico da próstata) superexpresso",
    indicacao: "Estadiamento e detecção de recidiva no câncer de próstata (par diagnóstico do Lu-177-PSMA)",
    obs: "Teranóstico: Ga-68-PSMA (diagnóstico) + Lu-177-PSMA (terapia).",
    cor: "#a855f7",
  },
  {
    rf: "¹¹C-Metionina",
    exame: "PET Cerebral",
    sistema: "PET",
    via: "Intravenosa",
    mecanismo: "Análogo de aminoácido → captado por células com alta síntese proteica",
    indicacao: "Tumor cerebral (melhor que FDG no SNC — menor fundo cerebral)",
    obs: "Meia-vida muito curta (~20 min). Precisa de cíclotron no local.",
    cor: "#a855f7",
  },
];

const SISTEMAS = ["Todos", "Pulmonar", "Ósseo", "Cardíaco", "Renal", "SNC", "Terapia", "PET"];

const SISTEMA_COLORS = {
  Pulmonar: "#0ea5e9",
  Ósseo: "#f97316",
  Cardíaco: "#e11d48",
  Renal: "#06b6d4",
  SNC: "#8b5cf6",
  Terapia: "#10b981",
  PET: "#a855f7",
};

const SISTEMA_ICONS = {
  Pulmonar: "🫁",
  Ósseo: "🦴",
  Cardíaco: "🫀",
  Renal: "🫘",
  SNC: "🧠",
  Terapia: "⚕️",
  PET: "🔵",
};

function RFCard({ item }) {
  const [open, setOpen] = useState(false);
  const cor = SISTEMA_COLORS[item.sistema] || "#6366f1";

  return (
    <div style={{
      background: open ? `${cor}10` : "rgba(255,255,255,0.02)",
      border: `1px solid ${open ? cor + "55" : "rgba(255,255,255,0.07)"}`,
      borderLeft: `4px solid ${cor}`,
      borderRadius: "10px",
      overflow: "hidden",
      transition: "all 0.2s",
      marginBottom: "8px",
    }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", display: "flex", alignItems: "flex-start", gap: "12px",
        padding: "12px 16px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left",
      }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "4px" }}>
            <span style={{ color: cor, fontWeight: 700, fontSize: "14px", fontFamily: "'DM Sans', sans-serif" }}>
              {item.rf}
            </span>
            <span style={{
              background: `${cor}22`, color: cor, fontSize: "10px", fontWeight: 600,
              padding: "2px 8px", borderRadius: "12px", border: `1px solid ${cor}44`,
              fontFamily: "'Space Mono', monospace", whiteSpace: "nowrap",
            }}>
              {SISTEMA_ICONS[item.sistema]} {item.sistema}
            </span>
            <span style={{
              background: "rgba(255,255,255,0.05)", color: "#64748b", fontSize: "10px",
              padding: "2px 8px", borderRadius: "12px", whiteSpace: "nowrap",
            }}>
              {item.via}
            </span>
          </div>
          <div style={{ color: "#475569", fontSize: "12px", fontFamily: "'DM Sans', sans-serif" }}>
            {item.exame} — {item.indicacao.slice(0, 80)}{item.indicacao.length > 80 ? "..." : ""}
          </div>
        </div>
        <span style={{ color: cor, fontSize: "14px", flexShrink: 0, marginTop: "2px" }}>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div style={{ padding: "0 16px 16px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "8px" }}>
            {[
              { label: "🔬 Mecanismo", val: item.mecanismo },
              { label: "✅ Indicação", val: item.indicacao },
              { label: "💡 Obs/Atenção", val: item.obs },
            ].map((row, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.03)", borderRadius: "8px",
                padding: "10px 12px", border: `1px solid rgba(255,255,255,0.06)`,
              }}>
                <div style={{ color: cor, fontSize: "11px", fontWeight: 600, marginBottom: "5px", fontFamily: "'Space Mono', monospace" }}>
                  {row.label}
                </div>
                <div style={{ color: "#94a3b8", fontSize: "12.5px", lineHeight: "1.5", fontFamily: "'DM Sans', sans-serif" }}>
                  {row.val}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [sistema, setSistema] = useState("Todos");
  const [busca, setBusca] = useState("");

  const filtered = useMemo(() => {
    return data.filter(item => {
      const matchSistema = sistema === "Todos" || item.sistema === sistema;
      const q = busca.toLowerCase();
      const matchBusca = !q || [item.rf, item.exame, item.mecanismo, item.indicacao, item.obs]
        .some(s => s.toLowerCase().includes(q));
      return matchSistema && matchBusca;
    });
  }, [sistema, busca]);

  const counts = useMemo(() => {
    const c = { Todos: data.length };
    SISTEMAS.slice(1).forEach(s => { c[s] = data.filter(d => d.sistema === s).length; });
    return c;
  }, []);

  return (
    <div style={{
      minHeight: "100vh", background: "#070a0f",
      backgroundImage: "radial-gradient(ellipse at 10% 10%, #a855f710 0%, transparent 40%), radial-gradient(ellipse at 90% 90%, #0ea5e908 0%, transparent 40%)",
      padding: "24px 16px 60px", fontFamily: "'DM Sans', sans-serif", color: "#e2e8f0",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@700&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        button { transition: all 0.15s; } button:hover { opacity: 0.9; }
        input { outline: none; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: #334155; border-radius: 2px; }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "24px", padding: "26px 20px", background: "rgba(99,102,241,0.07)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: "18px" }}>
        <div style={{ display: "inline-block", background: "rgba(99,102,241,0.15)", color: "#a5b4fc", fontSize: "11px", fontFamily: "'Space Mono', monospace", padding: "4px 12px", borderRadius: "20px", border: "1px solid rgba(99,102,241,0.3)", marginBottom: "14px", letterSpacing: "1px" }}>
          ☢️ MEDICINA NUCLEAR — MATERIAL DE REVISÃO
        </div>
        <h1 style={{ fontFamily: "'Space Mono', monospace", fontSize: "clamp(18px, 4vw, 28px)", color: "#a5b4fc", marginBottom: "8px" }}>
          Tabela Mestra de Radiofármacos
        </h1>
        <p style={{ color: "#475569", fontSize: "13px" }}>
          {data.length} radiofármacos · 7 sistemas · todas as aulas (1-8) · baseado nos slides do Prof. Sergio A. L. Souza — UFRJ
        </p>
      </div>

      {/* Busca */}
      <div style={{ marginBottom: "16px", position: "relative" }}>
        <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#475569", fontSize: "16px" }}>🔍</span>
        <input
          value={busca}
          onChange={e => setBusca(e.target.value)}
          placeholder="Buscar radiofármaco, exame, mecanismo, indicação..."
          style={{
            width: "100%", padding: "12px 16px 12px 42px",
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "10px", color: "#e2e8f0", fontSize: "14px",
            fontFamily: "'DM Sans', sans-serif",
          }}
        />
        {busca && (
          <button onClick={() => setBusca("")} style={{
            position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)",
            background: "transparent", border: "none", color: "#475569", fontSize: "18px", cursor: "pointer",
          }}>×</button>
        )}
      </div>

      {/* Filtros por sistema */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
        {SISTEMAS.map(s => {
          const cor = s === "Todos" ? "#6366f1" : SISTEMA_COLORS[s];
          const active = sistema === s;
          return (
            <button key={s} onClick={() => setSistema(s)} style={{
              background: active ? `${cor}25` : "rgba(255,255,255,0.03)",
              border: `1px solid ${active ? cor : "rgba(255,255,255,0.08)"}`,
              color: active ? cor : "#475569",
              padding: "6px 14px", borderRadius: "20px", cursor: "pointer",
              fontSize: "12px", fontWeight: active ? 700 : 400,
              fontFamily: "'DM Sans', sans-serif",
            }}>
              {s === "Todos" ? "✦" : SISTEMA_ICONS[s]} {s}
              <span style={{
                marginLeft: "6px", background: active ? cor : "rgba(255,255,255,0.06)",
                color: active ? "#fff" : "#334155",
                padding: "1px 6px", borderRadius: "10px", fontSize: "11px",
              }}>{counts[s]}</span>
            </button>
          );
        })}
      </div>

      {/* Resultados */}
      <div style={{ color: "#334155", fontSize: "12px", marginBottom: "12px", fontFamily: "'Space Mono', monospace" }}>
        {filtered.length} radiofármaco{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
        {busca && ` para "${busca}"`}
        {sistema !== "Todos" && ` em ${sistema}`}
      </div>

      {/* Lista */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#334155" }}>
          Nenhum resultado encontrado. Tente outro termo.
        </div>
      ) : (
        <div>{filtered.map((item, i) => <RFCard key={i} item={item} />)}</div>
      )}

      {/* Legenda */}
      <div style={{
        marginTop: "32px", padding: "16px", background: "rgba(255,255,255,0.02)",
        borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)",
      }}>
        <p style={{ color: "#334155", fontSize: "12px", fontFamily: "'Space Mono', monospace", marginBottom: "10px" }}>LEGENDA DO SISTEMA</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {SISTEMAS.slice(1).map(s => (
            <span key={s} style={{
              background: `${SISTEMA_COLORS[s]}18`, color: SISTEMA_COLORS[s],
              padding: "3px 10px", borderRadius: "6px", fontSize: "11.5px", fontWeight: 600,
              border: `1px solid ${SISTEMA_COLORS[s]}33`,
            }}>
              {SISTEMA_ICONS[s]} {s}
            </span>
          ))}
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "32px", color: "#1e293b", fontSize: "11px", fontFamily: "'Space Mono', monospace" }}>
        Fonte primária: Prof. Sergio A. L. Souza — UFRJ · Aulas 1-8 de Medicina Nuclear
      </div>
    </div>
  );
}
