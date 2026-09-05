import type { Numerical } from '../types';

// Each numerical follows the mandated 6-step pedagogy:
// 1 concept → 2 formula → 3 variables & units → 4 simple example →
// 5 GATE-level example → 6 practice questions (answer-submittable).
export const NUMERICALS: Numerical[] = [
  {
    id: 'num-cstr',
    subject: 'bioreaction-engineering',
    topic: 'bae-cstr',
    name: 'CSTR Steady-State Design',
    concept:
      'A chemostat runs at steady state when the cell growth rate equals the dilution rate (µ = D = F/V). The residual substrate is set by inverting the Monod equation, and biomass follows from the yield coefficient. If D > µmax, cells wash out.',
    formulaExpr: 'S = Ks·D/(µmax − D);  X = Yx/s·(S0 − S)',
    variables: [
      { v: 'D', meaning: 'Dilution rate = flow rate / volume', unit: 'h⁻¹' },
      { v: 'µmax', meaning: 'Maximum specific growth rate', unit: 'h⁻¹' },
      { v: 'Ks', meaning: 'Half-saturation substrate concentration', unit: 'g/L' },
      { v: 'S0', meaning: 'Feed substrate concentration', unit: 'g/L' },
      { v: 'Yx/s', meaning: 'Biomass yield on substrate', unit: 'g/g' },
    ],
    simple: {
      stem: 'µmax = 1.0 h⁻¹, Ks = 2 g/L, S0 = 20 g/L, Yx/s = 0.5, D = 0.5 h⁻¹. Find S and X.',
      steps: [
        'Steady state: µ = D = 0.5 h⁻¹.',
        'Invert Monod: S = Ks·D/(µmax − D) = 2×0.5/(1.0−0.5) = 2 g/L.',
        'Biomass: X = Yx/s(S0 − S) = 0.5×(20−2) = 9 g/L.',
      ],
      answer: 'S = 2 g/L, X = 9 g/L',
    },
    gate: {
      stem:
        'A chemostat (S0 = 10 g/L, Yx/s = 0.4, Ks = 0.5 g/L, µmax = 0.4 h⁻¹) is operated at D = 0.32 h⁻¹. (a) Find S and X. (b) Is the system at risk of washout if D is raised to 0.45 h⁻¹?',
      steps: [
        '(a) S = Ks·D/(µmax−D) = 0.5×0.32/(0.4−0.32) = 0.16/0.08 = 2 g/L.',
        'X = 0.4×(10−2) = 3.2 g/L.',
        '(b) D = 0.45 > µmax = 0.4 → YES: cells grow slower than they are diluted → washout (X→0, S→S0).',
      ],
      answer: 'S = 2 g/L, X = 3.2 g/L; at D = 0.45 h⁻¹ washout occurs',
    },
    practice: [
      { stem: 'µmax = 0.6 h⁻¹, Ks = 1 g/L, D = 0.3 h⁻¹. Find S.', answer: '1' },
      { stem: 'S0 = 5 g/L, Yx/s = 0.6, S = 1 g/L. Find X.', answer: '2.4' },
      { stem: 'µmax = 0.8 h⁻¹. At what D does washout begin? (value only)', answer: '0.8' },
    ],
  },
  {
    id: 'num-kla',
    subject: 'bioreaction-engineering',
    topic: 'bae-oxygen',
    name: 'Oxygen Transfer (kLa)',
    concept:
      'Oxygen must move from gas bubbles to cells fast enough to match demand. The transfer rate is OTR = kLa(C* − CL); the cellular demand is OUR = qO2·X. At steady state OTR = OUR, so kLa can be inferred from measured DO levels.',
    formulaExpr: 'OTR = kLa(C* − CL) = qO2·X',
    variables: [
      { v: 'kLa', meaning: 'Volumetric oxygen transfer coefficient', unit: 'h⁻¹' },
      { v: 'C*', meaning: 'Saturation DO concentration (no cells)', unit: 'mg/L' },
      { v: 'CL', meaning: 'Working dissolved oxygen', unit: 'mg/L' },
      { v: 'qO2', meaning: 'Specific oxygen uptake rate', unit: 'mg O2/(g·h)' },
      { v: 'X', meaning: 'Biomass concentration', unit: 'g/L' },
    ],
    simple: {
      stem: 'kLa = 2 h⁻¹, C* = 8 mg/L, CL = 4 mg/L. Compute OTR.',
      steps: ['OTR = kLa(C* − CL) = 2 × (8 − 4) = 8 mg/L/h.'],
      answer: '8 mg/L/h',
    },
    gate: {
      stem:
        'A fermenter (X = 20 g/L, qO2 = 0.05 mg O2/(g·h)) is at steady state with C* = 8 mg/L and CL = 2 mg/L. (a) Find kLa. (b) If agitation is cut and kLa halves, what happens to DO?',
      steps: [
        '(a) Demand OUR = qO2·X = 0.05×20 = 1 mg/L/h. kLa = OUR/(C*−CL) = 1/(8−2) ≈ 0.167 h⁻¹.',
        '(b) New kLa ≈ 0.083 h⁻¹. Required driving force = 1/0.083 ≈ 12 mg/L > C* − 0 = 8 mg/L, so the reactor CANNOT hold steady state — DO collapses to 0 (oxygen-starved culture).',
      ],
      answer: 'kLa ≈ 0.167 h⁻¹; halving kLa starves the culture (DO → 0)',
    },
    practice: [
      { stem: 'kLa = 3 h⁻¹, C* = 8, CL = 3.2. OTR (mg/L/h)?', answer: '14.4' },
      { stem: 'OUR = 2 mg/L/h and C* − CL = 4 mg/L. Find kLa (h⁻¹).', answer: '0.5' },
      { stem: 'X = 10 g/L, qO2 = 0.08. OUR (mg/L/h)?', answer: '0.8' },
    ],
  },
  {
    id: 'num-hardy-weinberg',
    subject: 'genetics-evolution',
    topic: 'gen-popgen',
    name: 'Hardy–Weinberg Equilibrium',
    concept:
      'In a large, randomly mating population with no mutation, migration, drift or selection, allele frequencies stay constant: p + q = 1 and p² + 2pq + q² = 1. The recessive phenotype frequency equals q², so q = √(q²), and carriers are 2pq.',
    formulaExpr: 'p² + 2pq + q² = 1;  q = √(q²);  carriers = 2pq',
    variables: [
      { v: 'p', meaning: 'Frequency of the dominant allele', unit: '—' },
      { v: 'q', meaning: 'Frequency of the recessive allele', unit: '—' },
      { v: 'q²', meaning: 'Frequency of homozygous recessive phenotype', unit: '—' },
      { v: '2pq', meaning: 'Carrier (heterozygote) frequency', unit: '—' },
    ],
    simple: {
      stem: 'A recessive trait occurs in 16% of a population in HWE. Find q and the carrier frequency.',
      steps: [
        'q² = 0.16 → q = 0.4.',
        'p = 1 − 0.4 = 0.6.',
        'Carriers 2pq = 2×0.6×0.4 = 0.48 (48%).',
      ],
      answer: 'q = 0.4, carriers = 48%',
    },
    gate: {
      stem:
        'Cystic fibrosis (autosomal recessive) affects 1 in 2500 newborns. (a) What fraction of the population are carriers? (b) What is the risk that two carriers have an affected child?',
      steps: [
        '(a) q = 1/50 = 0.02; p = 0.98. Carriers = 2pq = 2×0.98×0.02 = 0.0392 ≈ 1 in 25.',
        '(b) Carrier × carrier → 1/4 affected → 25% risk.',
      ],
      answer: 'Carriers ≈ 3.92% (≈1/25); carrier × carrier → 25% affected risk',
    },
    practice: [
      { stem: 'q² = 0.09. Find q.', answer: '0.3' },
      { stem: 'q = 0.1. Carrier frequency 2pq (2 d.p.)?', answer: '0.18' },
      { stem: 'Carrier frequency is 0.32 with p + q = 1. Find q.', answer: '0.2' },
    ],
  },
  {
    id: 'num-pcr',
    subject: 'recombinant-dna',
    topic: 'rdt-pcr',
    name: 'PCR Amplification & Primer Tm',
    concept:
      'Each PCR cycle doubles the target (ideal efficiency), so N = N0·2^n. Primer annealing temperature (Tm) is predicted from composition; short oligos use Tm = 2(A+T) + 4(G+C). qPCR quantifies template from the cycle threshold CT.',
    formulaExpr: 'N = N0·2^n;  Tm = 2(A+T) + 4(G+C)',
    variables: [
      { v: 'N0', meaning: 'Starting template copies', unit: 'copies' },
      { v: 'n', meaning: 'Number of cycles', unit: '—' },
      { v: 'A+T', meaning: 'Count of A and T bases in primer', unit: 'nt' },
      { v: 'G+C', meaning: 'Count of G and C bases in primer', unit: 'nt' },
    ],
    simple: {
      stem: 'Starting from 100 copies, how many copies after 10 ideal cycles?',
      steps: ['N = 100 × 2^10 = 100 × 1024 = 102,400 copies.'],
      answer: '102,400 copies',
    },
    gate: {
      stem:
        'A qPCR run gives CT = 20 for a positive control (10^6 copies) and CT = 28 for a sample. Assuming 100% efficiency, how many copies are in the sample?',
      steps: [
        'The sample needs 8 more cycles → it started 2^8 = 256× more dilute.',
        'Sample = 10^6 / 256 ≈ 3,906 copies.',
      ],
      answer: '≈ 3.9 × 10^3 copies',
    },
    practice: [
      { stem: '1 copy, 30 ideal cycles. Copies (in 10^6, 2 d.p.)?', answer: '1.07' },
      { stem: 'Primer: 8 A/T, 12 G/C. Tm (°C)?', answer: '64' },
      { stem: 'CT differs by 3 cycles (100% efficiency). Fold difference in template?', answer: '8' },
    ],
  },
  {
    id: 'num-enzyme-kinetics',
    subject: 'biochemistry',
    topic: 'bio-enzymes',
    name: 'Michaelis–Menten Kinetics',
    concept:
      'Enzyme velocity follows v = Vmax[S]/(Km + [S]): at [S] = Km the velocity is half-maximal. kcat = Vmax/[E]total is the turnover number; kcat/Km is catalytic efficiency.',
    formulaExpr: 'v = Vmax[S]/(Km + [S]);  kcat = Vmax/[E]',
    variables: [
      { v: 'v', meaning: 'Initial reaction velocity', unit: 'µmol/min' },
      { v: 'Vmax', meaning: 'Maximum velocity (all enzyme saturated)', unit: 'µmol/min' },
      { v: 'Km', meaning: '[S] at v = Vmax/2', unit: 'mM' },
      { v: '[E]total', meaning: 'Total enzyme concentration', unit: 'µM' },
    ],
    simple: {
      stem: 'Vmax = 10 µmol/min and Km = 4 mM. What is v at [S] = 4 mM?',
      steps: ['v = Vmax[S]/(Km+[S]) = 10×4/(4+4) = 5 µmol/min (half-maximal, by definition of Km).'],
      answer: '5 µmol/min',
    },
    gate: {
      stem:
        'An assay gives v = 3 µmol/min at [S] = 1 mM and v = 6 µmol/min at [S] = 4 mM. Find Vmax and Km. (Assume Michaelis–Menten.)',
      steps: [
        '3 = Vmax×1/(Km+1) → Vmax = 3(Km+1).',
        '6 = Vmax×4/(Km+4) → Vmax = 1.5(Km+4).',
        'Equate: 3Km + 3 = 1.5Km + 6 → 1.5Km = 3 → Km = 2 mM; Vmax = 3×3 = 9 µmol/min.',
      ],
      answer: 'Km = 2 mM, Vmax = 9 µmol/min',
    },
    practice: [
      { stem: 'Km = 5, Vmax = 20. v at [S] = 5?', answer: '10' },
      { stem: 'Vmax = 12 µmol/min, [E] = 0.4 µM. kcat (min⁻¹)?', answer: '30' },
      { stem: 'v = Vmax/4. Then [S]/Km = ? (2 d.p.)', answer: '0.33' },
    ],
  },
  {
    id: 'num-growth',
    subject: 'microbiology',
    topic: 'bae-kinetics',
    name: 'Microbial Growth & D-values',
    concept:
      'Exponential growth doubles biomass every td = ln2/µ. Sterilisation uses the D-value (time for 90% = 1-log kill): N = N0·10^(−t/D). Combine both: time to grow (ln) and time to kill (log).',
    formulaExpr: 'X = X0·e^(µt);  td = ln2/µ;  N = N0·10^(−t/D)',
    variables: [
      { v: 'µ', meaning: 'Specific growth rate', unit: 'h⁻¹' },
      { v: 'td', meaning: 'Doubling time', unit: 'h' },
      { v: 'D', meaning: 'Decimal reduction time at a given T', unit: 'min' },
      { v: 'N0 / N', meaning: 'Initial / final cell count', unit: 'cells' },
    ],
    simple: {
      stem: 'E. coli doubles every 30 min. How many cells from 10^3 after 3 h?',
      steps: ['3 h = 6 doublings. N = 10^3 × 2^6 = 64,000.'],
      answer: '6.4 × 10^4 cells',
    },
    gate: {
      stem:
        'A canned-food process has D = 4 min at 121°C. The initial spore load is 10^6. (a) How long for a 5-log kill? (b) What fraction of spores survives on average after that time?',
      steps: [
        '(a) 5-log kill = 5 × D = 5 × 4 = 20 min.',
        '(b) 10^(−5) = 1 in 100,000 spores survives on average.',
      ],
      answer: '20 min; 10⁻⁵ (1 in 100,000) survival',
    },
    practice: [
      { stem: 'µ = 0.693 h⁻¹. Doubling time (h)?', answer: '1' },
      { stem: 'D = 2 min, 10^5 cells. Time for 3-log kill (min)?', answer: '6' },
      { stem: '10^4 cells, td = 20 min. Cells after 1 h?', answer: '80000' },
    ],
  },
  {
    id: 'num-alignment-score',
    subject: 'bioinformatics',
    topic: 'inf-align',
    name: 'Alignment Scoring & E-value',
    concept:
      'An alignment score sums match/mismatch/gap contributions (affine gaps: open + extend×(len−1)). BLAST significance uses the E-value E = Kmn·e^(−λS): a bigger database or smaller score gives a larger E (worse).',
    formulaExpr: 'S = m·M − x·X − g(d + e(len−1));  E = K·m·n·e^(−λS)',
    variables: [
      { v: 'M / X', meaning: 'Match / mismatch score', unit: '—' },
      { v: 'd / e', meaning: 'Gap open / extend penalty', unit: '—' },
      { v: 'm, n', meaning: 'Query and database lengths', unit: 'residues' },
      { v: 'S', meaning: 'Raw alignment score', unit: '—' },
    ],
    simple: {
      stem: 'Alignment: 8 matches (+2), 2 mismatches (−1), no gaps. Score?',
      steps: ['S = 8×2 − 2×1 = 16 − 2 = 14.'],
      answer: '14',
    },
    gate: {
      stem:
        'Two sequences aligned with 15 matches (+1), 5 mismatches (−2) and two gaps (each length 2; open 3, extend 1). (a) Compute S. (b) If the database size doubles, how does E change at fixed S?',
      steps: [
        '(a) Gaps: 2 × [3 + 1×(2−1)] = 2 × 4 = 8. S = 15 − 10 − 8 = −3.',
        '(b) E ∝ n (database length) → E doubles.',
      ],
      answer: 'S = −3; E doubles',
    },
    practice: [
      { stem: '10 matches (+1), 4 mismatches (−1), 1 gap (len 2; open 2, extend 1). Score?', answer: '3' },
      { stem: 'If the database triples, same S: E changes by what factor?', answer: '3' },
      { stem: 'S increases by exactly λ. E changes by what factor?', answer: '0.5' },
    ],
  },
  {
    id: 'num-stirred-tank',
    subject: 'transport-processes',
    topic: 'trp-momentum',
    name: 'Pipe Flow & Pressure Drop',
    concept:
      'Compute Re = ρvD/µ first: Re < 2100 laminar (Hagen–Poiseuille, ΔP ∝ v), Re > 4000 turbulent (Darcy–Weisbach, ΔP ∝ v² with friction factor f). Bernoulli relates pressure, velocity and elevation heads.',
    formulaExpr: 'Re = ρvD/µ;  ΔP_lam = 32μvL/D²;  ΔP_turb = f(L/D)(ρv²/2)',
    variables: [
      { v: 'ρ', meaning: 'Fluid density', unit: 'kg/m³' },
      { v: 'v', meaning: 'Mean flow velocity', unit: 'm/s' },
      { v: 'D', meaning: 'Pipe diameter', unit: 'm' },
      { v: 'μ', meaning: 'Dynamic viscosity', unit: 'Pa·s' },
      { v: 'f', meaning: 'Darcy friction factor', unit: '—' },
    ],
    simple: {
      stem: 'Water (ρ=1000, μ=0.001) at v = 1 m/s in D = 0.04 m pipe. Find Re and the regime.',
      steps: ['Re = 1000×1×0.04/0.001 = 40,000 → turbulent.'],
      answer: 'Re = 40,000 (turbulent)',
    },
    gate: {
      stem:
        'A viscous fluid: ρ = 1260 kg/m³, μ = 0.095 Pa·s, v = 0.5 m/s, D = 0.05 m, L = 10 m. (a) Find Re and the regime. (b) Compute ΔP with the correct regime.',
      steps: [
        '(a) Re = 1260×0.5×0.05/0.095 = 31.5/0.095 ≈ 332 → laminar.',
        '(b) ΔP = 32μvL/D² = 32×0.095×0.5×10/0.0025 = 15.2/0.0025 = 6,080 Pa ≈ 6.08 kPa.',
      ],
      answer: 'Re ≈ 332 (laminar); ΔP ≈ 6.08 kPa',
    },
    practice: [
      { stem: 'ρ=1000, v=2, D=0.05, μ=0.001. Re?', answer: '100000' },
      { stem: 'Laminar ΔP: μ=0.002, v=1, L=5, D=0.02. ΔP (Pa)?', answer: '25000' },
      { stem: 'Darcy: f=0.02, L/D=100, ρv²/2=400. ΔP (Pa)?', answer: '800' },
    ],
  },
  {
    id: 'num-heat',
    subject: 'transport-processes',
    topic: 'trp-heat',
    name: 'Heat Exchangers (U and LMTD)',
    concept:
      'Heat duty is Q = U·A·LMTD. Overall conductance U combines series resistances: 1/U = 1/h_i + R_wall + R_fouling + 1/h_o. Fouling adds resistance, lowering U. LMTD accounts for temperature change along the exchanger.',
    formulaExpr: 'Q = U·A·ΔT_lm;  1/U = 1/h_i + R_w + R_f + 1/h_o',
    variables: [
      { v: 'U', meaning: 'Overall heat transfer coefficient', unit: 'W/m²K' },
      { v: 'A', meaning: 'Heat transfer area', unit: 'm²' },
      { v: 'ΔT_lm', meaning: 'Log-mean temperature difference', unit: 'K' },
      { v: 'h', meaning: 'Film coefficient (each side)', unit: 'W/m²K' },
    ],
    simple: {
      stem: 'h_i = 5000, h_o = 1000 W/m²K, wall and fouling neglected. Find U.',
      steps: ['1/U = 1/5000 + 1/1000 = 0.0002 + 0.001 = 0.0012 → U ≈ 833 W/m²K.'],
      answer: 'U ≈ 833 W/m²K',
    },
    gate: {
      stem:
        'A counter-current exchanger: hot inlet/outlet 90/50°C, cold inlet/outlet 20/40°C. (a) Compute LMTD. (b) If A = 10 m² and U = 500 W/m²K, find duty Q.',
      steps: [
        '(a) ΔT1 = 90−40 = 50 K; ΔT2 = 50−20 = 30 K. LMTD = (50−30)/ln(50/30) = 20/0.5108 ≈ 39.2 K.',
        '(b) Q = 500 × 10 × 39.2 ≈ 196 kW.',
      ],
      answer: 'LMTD ≈ 39.2 K; Q ≈ 196 kW',
    },
    practice: [
      { stem: 'h_i = 2000, h_o = 2000 (no walls/fouling). U?', answer: '1000' },
      { stem: 'ΔT1 = 40, ΔT2 = 20. LMTD (1 d.p.)?', answer: '28.9' },
      { stem: 'U = 800, A = 5, LMTD = 30. Q (kW)?', answer: '120' },
    ],
  },
  {
    id: 'num-purification',
    subject: 'process-biotechnology',
    topic: 'pro-purification',
    name: 'Purification Yield & Fold',
    concept:
      'Every purification step is judged by yield (% total activity recovered) and purification fold (specific activity gain). A good strategy maximises the combined product of both across steps.',
    formulaExpr: 'SA = activity/total protein;  Y% = (A_f/A_i)×100;  PF = SA_f/SA_i',
    variables: [
      { v: 'SA', meaning: 'Specific activity (activity per mg total protein)', unit: 'U/mg' },
      { v: 'A', meaning: 'Total activity in the sample', unit: 'U' },
      { v: 'PF', meaning: 'Purification fold', unit: '—' },
    ],
    simple: {
      stem: 'Crude extract: 1000 U total, 50 mg protein. After step 1: 800 U, 20 mg. Find SA before/after and PF.',
      steps: [
        'SA_i = 1000/50 = 20 U/mg. SA_f = 800/20 = 40 U/mg.',
        'PF = 40/20 = 2-fold; yield = 800/1000 = 80%.',
      ],
      answer: 'SA: 20 → 40 U/mg; PF = 2; yield 80%',
    },
    gate: {
      stem:
        'A two-step scheme: Step A gives 3× purification at 90% yield; Step B gives 4× purification at 75% yield. Starting at 100 U/mg with 100% yield, find final SA, overall yield and overall fold.',
      steps: [
        'SA: 100 × 3 × 4 = 1200 U/mg. Overall PF = 3 × 4 = 12.',
        'Overall yield = 0.90 × 0.75 = 67.5%.',
      ],
      answer: 'SA = 1200 U/mg; PF = 12; yield = 67.5%',
    },
    practice: [
      { stem: 'SA 5 → 50 U/mg. PF?', answer: '10' },
      { stem: 'Yields 80% then 50%. Overall yield (%)?', answer: '40' },
      { stem: 'Activity 2000 U → 100 U (same protein). Yield (%)?', answer: '5' },
    ],
  },
  {
    id: 'num-membrane',
    subject: 'process-biotechnology',
    topic: 'pro-separation',
    name: 'Filtration & Centrifugation',
    concept:
      'Constant-pressure cake filtration: t/V = (αμc/2ΔP)·V² + Rm/ΔP·V — a straight line of t/V vs V whose slope gives cake resistance. Centrifuges: RCF = 1.119×10⁻⁵·r(cm)·n²(rpm).',
    formulaExpr: 't/V = (αμc/2ΔP)V² + (Rm/ΔP)V;  RCF = 1.119×10⁻⁵·r·n²',
    variables: [
      { v: 'V', meaning: 'Filtrate volume', unit: 'L' },
      { v: 't', meaning: 'Filtration time', unit: 's' },
      { v: 'α', meaning: 'Specific cake resistance', unit: 'm/kg' },
      { v: 'r, n', meaning: 'Radius (cm) and speed (rpm)', unit: '—' },
    ],
    simple: {
      stem: 'A centrifuge at 10,000 rpm with r = 10 cm. Compute RCF.',
      steps: ['RCF = 1.119×10⁻⁵ × 10 × (10⁴)² = 1.119×10⁻⁵ × 10 × 10⁸ = 11,190 g.'],
      answer: '≈ 11,190 × g',
    },
    gate: {
      stem:
        'Cake filtration data at constant ΔP: at V = 2 L, t = 100 s; at V = 4 L, t = 400 s. (a) Find t/V at both points. (b) Verify linearity of t/V vs V and compute the slope (s/L²).',
      steps: [
        '(a) t/V: 100/2 = 50 s/L; 400/4 = 100 s/L.',
        '(b) Slope = (100 − 50)/(4 − 2) = 25 s/L²; intercept = 50 − 25×2 = 0 → pure cake, no medium resistance.',
      ],
      answer: 't/V = 50 & 100 s/L; slope = 25 s/L²',
    },
    practice: [
      { stem: 'n = 20,000 rpm, r = 5 cm. RCF (×g, integer)?', answer: '22380' },
      { stem: 't/V points (1, 30) and (3, 90) s/L. Slope (s/L²)?', answer: '30' },
      { stem: 'RCF = 10,000 g at r = 10 cm. n (rpm, nearest 10)?', answer: '9450' },
    ],
  },
  {
    id: 'num-mass-transfer',
    subject: 'transport-processes',
    topic: 'trp-mass',
    name: 'Distillation Shortcut (Fenske)',
    concept:
      'Shortcut column design: Fenske gives minimum stages at total reflux from relative volatility α; Underwood gives minimum reflux; Gilliland interpolates real operation. Feasibility needs α > 1 (α = 1 cannot be separated by ordinary distillation).',
    formulaExpr: 'N_min = ln[(xD/(1−xD))·((1−xB)/xB)] / ln α',
    variables: [
      { v: 'α', meaning: 'Relative volatility (light/heavy key)', unit: '—' },
      { v: 'xD, xB', meaning: 'Distillate/bottoms light-key mole fraction', unit: '—' },
      { v: 'N_min', meaning: 'Minimum stages (total reflux)', unit: 'stages' },
    ],
    simple: {
      stem: 'α = 2, xD = 0.9, xB = 0.1. Find N_min.',
      steps: ['N_min = ln[(0.9/0.1)(0.9/0.1)]/ln 2 = ln(81)/0.693 = 4.394/0.693 ≈ 6.34.'],
      answer: 'N_min ≈ 6.34 stages',
    },
    gate: {
      stem:
        'A column has α ≈ 2.2. Desired xD = 0.95, xB = 0.02. (a) N_min? (b) If actual stages are 1.5×N_min, how many theoretical stages (nearest integer)?',
      steps: [
        '(a) N_min = ln[(0.95/0.05)(0.98/0.02)]/ln 2.2 = ln(19×49)/0.788 = ln(931)/0.788 ≈ 8.68.',
        '(b) 1.5 × 8.68 ≈ 13.0 → 13 stages.',
      ],
      answer: 'N_min ≈ 8.7; about 13 stages',
    },
    practice: [
      { stem: 'α = 3, xD = 0.9, xB = 0.1. N_min (2 d.p.)?', answer: '4.00' },
      { stem: 'α = 1.5, xD = 0.99, xB = 0.01. N_min (1 d.p.)?', answer: '22.7' },
      { stem: 'If α = 1 exactly, what is N_min? (one word)', answer: 'infinite' },
    ],
  },
  {
    id: 'num-breeder',
    subject: 'genetics-evolution',
    topic: 'gen-quant',
    name: 'Heritability & Breeder’s Equation',
    concept:
      'Phenotypic variance decomposes VP = VG + VE, with VG = VA + VD + VI. Narrow-sense heritability h² = VA/VP predicts response to selection: R = h²·S. Heritability describes a population in an environment, not an individual.',
    formulaExpr: 'R = h² · S;  h² = VA/VP',
    variables: [
      { v: 'R', meaning: 'Response to selection (mean shift next generation)', unit: 'trait units' },
      { v: 'S', meaning: 'Selection differential (selected mean − population mean)', unit: 'trait units' },
      { v: 'VA', meaning: 'Additive genetic variance', unit: 'units²' },
      { v: 'VP', meaning: 'Total phenotypic variance', unit: 'units²' },
    ],
    simple: {
      stem: 'h² = 0.5 and S = 20 kg. What is R?',
      steps: ['R = 0.5 × 20 = 10 kg.'],
      answer: '10 kg',
    },
    gate: {
      stem:
        'In a cattle population, milk yield has VA = 40 and VP = 100 (kg²). The top 10% average 200 kg; the population mean is 180 kg. (a) h²? (b) Expected mean of the next generation.',
      steps: [
        '(a) h² = VA/VP = 40/100 = 0.4.',
        '(b) S = 200 − 180 = 20 kg → R = 0.4 × 20 = 8 kg → new mean = 188 kg.',
      ],
      answer: 'h² = 0.4; next-generation mean = 188 kg',
    },
    practice: [
      { stem: 'VA = 30, VP = 60. h²?', answer: '0.5' },
      { stem: 'h² = 0.25, S = 40 cm. R?', answer: '10' },
      { stem: 'Population 150, selected mean 165, R = 6. h²?', answer: '0.4' },
    ],
  },
  {
    id: 'num-sterilization',
    subject: 'microbiology',
    topic: 'mic-sterilization',
    name: 'Thermal Sterilisation (D and z values)',
    concept:
      'The D-value is the time for a 90% (1-log) kill at a fixed temperature: N = N0·10^(−t/D). The z-value is the temperature change that multiplies D by 10. Tubular sterilisers are PFRs: residence time must cover n·D for an n-log reduction.',
    formulaExpr: 'N = N0·10^(−t/D);  log N = log N0 − t/D',
    variables: [
      { v: 'D', meaning: 'Decimal reduction time at temperature T', unit: 'min' },
      { v: 'z', meaning: 'Temperature change for 10× D change', unit: '°C' },
      { v: 'N0', meaning: 'Initial bioburden', unit: 'CFU' },
    ],
    simple: {
      stem: 'D = 3 min at 121°C. Starting from 10^3 cells, what is the expected count after 9 min?',
      steps: ['3-log kill = 9/3 = 3 → N = 10^3 × 10^(−3) = 1 expected survivor.'],
      answer: '10^0 = 1 CFU (expected)',
    },
    gate: {
      stem:
        'A tubular steriliser (PFR) processes broth at 90 L/min through a 135 L holding tube at 135°C, where D = 0.2 min. (a) Residence time? (b) How many log reductions? (c) For an initial load of 1.35×10^6 CFU, the expected survivors?',
      steps: [
        '(a) t = V/Q = 135/90 = 1.5 min.',
        '(b) Reductions = t/D = 1.5/0.2 = 7.5-log.',
        '(c) N = 1.35×10^6 × 10^(−7.5) ≈ 0.04 → effectively sterile.',
      ],
      answer: 't = 1.5 min; 7.5-log; expected survivors ≈ 0.04',
    },
    practice: [
      { stem: 'D = 2 min. Time for 4-log kill?', answer: '8' },
      { stem: 'z = 10°C, D(121) = 1 min. D(111)?', answer: '10' },
      { stem: 'N0 = 10^5, t/D = 5. Survivors (expected)?', answer: '1' },
    ],
  },
];

export const numericalById = new Map(NUMERICALS.map((n) => [n.id, n]));

export function numericalsForSubject(subject: string) {
  return NUMERICALS.filter((n) => n.subject === subject);
}
