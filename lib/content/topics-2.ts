import type { Topic } from '../types';

// ============ BIOREACTION ENGINEERING ============
export const TOPICS_BAE: Topic[] = [
  {
    id: 'bae-kinetics',
    subject: 'bioreaction-engineering',
    name: 'Microbial Growth Kinetics',
    level: 1,
    priority: 'high',
    ord: 1,
    short: 'Bacterial growth phases and the exponential math.',
    basic: {
      what: 'Microbial growth follows phases: lag (adaptation) → exponential (constant doubling) → stationary (nutrient depletion, waste) → death (lysis). In exponential phase, cells double at a constant rate.',
      why: 'Growth rate µ drives every bioreactor calculation — batch time, CSTR size, productivity.',
      how: 'Exponential phase: dX/dt = µX. Doubling time td = ln2/µ. Specific growth rate µ depends on substrate (Monod): µ = µmax·S/(Ks + S).',
      where: 'Fermentation design, wastewater treatment (sludge age), antibiotic dosing.',
    },
    college: [
      'Lag time depends on inoculum age and environmental shift; longer for nutrient downshift.',
      'Biomass yield Yx/s = ΔX/ΔS (g biomass/g substrate); typically 0.4–0.6 g/g for glucose.',
      'Substrate consumption: dS/dt = −(1/Yx/s)·µX (steady growth).',
      'Death phase: first-order lysis dX/dt = −kd·X.',
      'Monod kinetics: Ks (half-saturation) in mmol/L; low Ks = high-affinity organism (e.g. Pseudomonas for wastewater).',
    ],
    advanced: [
      'At steady state in a CSTR, µ = D (dilution rate) — the single most important equivalence in bioreactor engineering.',
      'Substrate inhibition (Haldane) at high S: µ = µmax·S/((Ks+S)(1+S/Ki)).',
      'Product inhibition: competitive, non-competitive or mixed forms modify µ.',
    ],
    gate: {
      highYield: [
        'td = ln2/µ; doubling-time arithmetic.',
        'Monod equation and Ks meaning.',
        'CSTR steady state: µ = D.',
        'Yx/s yield coefficient arithmetic.',
      ],
      traps: [
        'Lag phase is NOT exponential — no net growth rate during lag.',
        'Stationary phase: net growth is ZERO (birth = death), not negative.',
        'Washout in a CSTR happens when D > µmax.',
      ],
    },
    examples: [
      'E. coli in rich medium: µmax ≈ 0.7–1.0 h−1, td ≈ 40–60 min.',
      'Wastewater activated sludge operates at low µ (0.2–0.4 d−1) with long SRT.'],
    formulas: [
      { name: 'Exponential growth', expr: 'X = X0 · e^(µt)' },
      { name: 'Doubling time', expr: 'td = ln2 / µ' },
      { name: 'Monod', expr: 'µ = µmax · S / (Ks + S)' },
      { name: 'Yield', expr: 'Yx/s = (X − X0)/(S0 − S)' },
    ],
    keyPoints: [
      'Lag → Exp → Stationary → Death.',
      'td = ln2/µ.',
      'Monod: Ks = [S] at µ = µmax/2.',
      'CSTR: µ = D at steady state.',
    ],
    revision: {
      remember: 'td = ln2/µ; CSTR: µ = D; Monod Ks = half-saturation.',
      mistakes: ['Using exponential formula through lag/stationary phases.'],
      summary: '4 phases + exponential law + Monod + yield = kinetics core.',
    },
    related: ['bae-batch', 'bae-cstr', 'num-cstr'],
  },
  {
    id: 'bae-batch',
    subject: 'bioreaction-engineering',
    name: 'Batch Bioreactors',
    level: 2,
    priority: 'high',
    ord: 2,
    short: 'Closed-vessel fermentation: design and analysis.',
    basic: {
      what: 'A batch bioreactor is a closed vessel: add cells + medium, wait for growth and product, harvest. Nothing enters or leaves (except gas and heat).',
      why: 'Most industrial fermentations start as batch; it is the simplest system to understand and scale.',
      how: 'Design equations: cell balance dX/dt = µX; substrate dS/dt = −µX/Yx/s; product dP/dt = µqP·X (product formation rate). Batch time = lag + growth to target + (harvest).',
      where: 'Antibiotics (β-lactams often batch), single-cell proteins, ethanol, vaccines.',
    },
    college: [
      'Batch design: t = (1/µ) ln(X2/X1) for exponential growth between two biomasses.',
      'Space-time yield: grams product per litre per hour; productivity = dP/dt/V.',
      'Fed-batch: substrate added during growth (avoids substrate inhibition, extends productivity) — not true batch, but no outflow.',
      'Perfusion: continuous inflow + outflow through a cell-retention device; cells stay, medium flows.',
    ],
    advanced: [
      'Kinetic analysis of batch data: plot ln X vs t (µ), 1/(S) vs t (Monod fitting), lag time estimation.',
      'Two-phase antibiotics: growth-associated vs non-growth-associated product formation (Leudeking–Piret: dP/dt = α·µX + β·X).',
    ],
    gate: {
      highYield: [
        'Batch growth time from ln ratio.',
        'Leudeking–Piret for two-phase products.',
        'Fed-batch vs perfusion vs batch distinctions.',
        'Space-time yield and productivity definitions.',
      ],
      traps: [
        'Fed-batch has NO outflow — perfusion has both in AND out (with cell retention).',
        'Batch productivity falls over time as X declines at the end — maximum is mid-batch.',
      ],
    },
    examples: [
      'Penicillin: fed-batch penicillium with phenylacetic acid fed to control precursor.',
      'Yeast ethanol batch: glucose 10% → ~4% ethanol in 18–24 h.'],
    formulas: [
      { name: 'Batch growth time', expr: 't = (1/µ)·ln(X2/X1)' },
      { name: 'Leudeking–Piret', expr: 'dP/dt = α·µX + β·X' },
    ],
    keyPoints: [
      'Closed system; dX/dt = µX.',
      't = (1/µ) ln(X2/X1).',
      'Fed-batch = feed only; perfusion = feed + bleed.',
      'Two-phase products need Leudeking–Piret.',
    ],
    revision: {
      remember: 'ln(X2/X1)/µ; feed-only = fed-batch; feed + bleed = perfusion.',
      mistakes: ['Calling fed-batch continuous.'],
      summary: 'Batch design equations + product kinetics (L–P) + fed-batch/perfusion distinctions.',
    },
    related: ['bae-kinetics', 'bae-cstr', 'bae-fedbatch'],
  },
  {
    id: 'bae-cstr',
    subject: 'bioreaction-engineering',
    name: 'Continuous Bioreactors (CSTR)',
    level: 2,
    priority: 'high',
    ord: 3,
    short: 'Steady-state continuous culture and the dilution rate.',
    basic: {
      what: 'A CSTR continuously feeds fresh medium and removes culture at the same rate. At steady state, cell and substrate concentrations stay constant, and dilution rate D = F/V equals the growth rate µ.',
      why: 'Continuous culture enables steady, high-productivity operation and precise kinetic measurement.',
      how: 'Steady state: D = µ. Balance: D(S0 − S) = µX/Yx/s. Washout when D > µmax (cells leave faster than they grow).',
      where: 'Single-cell protein, wastewater (chemostat experiments), enzyme production, kinetics studies.',
    },
    college: [
      'Chemostat (single feed, no recycle): X = Yx/s(S0 − S); substrate set by D via Monod.',
      'Back-mixing assumption: contents perfectly mixed = outlet concentrations equal reactor concentrations.',
      'Multiple CSTRs in series approximate plug flow; in parallel increase throughput.',
      'Max steady-state biomass at D just below µmax: Xmax = Yx/s·(S0 − S(D≈µmax)).',
    ],
    advanced: [
      'Chemostat competition: the organism with the lowest Ks (highest affinity) wins at low D; the one with highest µmax wins at high D.',
      'Unsteady chemostats and fed-batch emulation; controlled fed-batch as "dilution-rate-limited" operation.',
      'Contamination risk in continuous culture is the practical reason most industry stays batch/fed-batch.',
    ],
    gate: {
      highYield: [
        'D = µ at steady state; D = F/V.',
        'Washout condition D > µmax.',
        'X = Yx/s(S0 − S) at steady state.',
        'Chemostat selection: low D → low Ks wins; high D → high µmax wins.',
      ],
      traps: [
        'At washout, X → 0 and S → S0 (substrate passes through).',
        'CSTR is perfectly mixed — concentration is UNIFORM (no gradient).',
      ],
    },
    examples: [
      'Wastewater: sludge age θ = 1/D; keep θ > 1/µmax to retain sludge.',
      'Classic chemostat: E. coli at D = 0.2 h−1 gives S from Monod inversion.'],
    formulas: [
      { name: 'Dilution rate', expr: 'D = F/V' },
      { name: 'Steady state', expr: 'µ = D; X = Yx/s(S0 − S)' },
      { name: 'Monod inversion', expr: 'S = Ks·D/(µmax − D)' },
    ],
    keyPoints: [
      'D = F/V = µ at steady state.',
      'Washout: D > µmax → X→0, S→S0.',
      'Perfect mixing = no gradients.',
      'Low-D chemostat selects low-Ks species.',
    ],
    revision: {
      remember: 'D = µ; washout above µmax; low-D favours low Ks.',
      mistakes: ['Expecting concentration gradients in an ideal CSTR.'],
      summary: 'CSTR balances + Monod inversion + washout + chemostat competition logic.',
    },
    related: ['bae-kinetics', 'bae-batch', 'num-cstr'],
  },
  {
    id: 'bae-oxygen',
    subject: 'bioreaction-engineering',
    name: 'Oxygen Transfer & Mass Transfer (kLa)',
    level: 3,
    priority: 'high',
    ord: 4,
    short: 'Getting enough dissolved oxygen to aerobic cultures.',
    basic: {
      what: 'Aerobic cells need dissolved oxygen. O2 moves from air bubbles → liquid → cells; the liquid-side step is usually rate-limiting. kLa (volumetric oxygen transfer coefficient, h−1 or s−1) quantifies it.',
      why: 'Scale-up failures in biotech are mostly O2 transfer and mixing problems.',
      how: 'OTR (oxygen transfer rate) = kLa(C* − CL). Cells consume at CSTR = µ·Yx/O2 demand: CSTR = (qO2·X). At steady state OTR = OTR. C* = saturation concentration (~8 mg/L air, 25°C); CL = measured DO.',
      where: 'Aerobic fermentations: penicillin, citric acid, antibodies (mammalian, even more O2-sensitive).',
    },
    college: [
      'kLa depends on: agitation speed (n), aeration (kLa ∝ Pv^a · a^b), sparger design, medium viscosity, vessel geometry.',
      'Power input: P/V (W/m3); power number Np = P/(ρn³D⁵); in the turbulent regime P ∝ n³D⁵.',
      'Scale-up rules: constant P/V (mixing-focused) or constant kLa (O2-focused) or constant Np; cannot keep all constant simultaneously.',
      'Critical oxygen concentration CLmin below which growth stops; DO control maintains CL ≈ 30–40% C*.',
    ],
    advanced: [
      'CSTR = qO2·X; qO2 (specific O2 uptake, mol O2/g/h) is measured by DO transient (air off/on) experiments.',
      'Penetration theory: kL ∝ √(D/v) — liquid-side diffusion through boundary layers.',
      'Mammalian cultures: lower shear tolerance → spargerless (membrane) or low-shear designs; perfluorocarbon O2 carriers.',
    ],
    gate: {
      highYield: [
        'OTR = kLa(C* − CL); CSTR = OTR at steady state.',
        'kLa increases with n, aeration; decreases with viscosity.',
        'Scale-up: constant P/V vs constant kLa trade-offs.',
        'DO control ladder: agitation → aeration → O2 enrichment.',
      ],
      traps: [
        'C* is the SATURATION concentration (no cells), not the working CL.',
        'kLa (volume) ≠ kL (coefficient) — kLa = kL·a (interfacial area).',
        'High viscosity REDUCES kLa (worse transfer).',
      ],
    },
    examples: [
      'Citric acid fermentation runs at 2–4 W/m3 with high aeration for heavy O2 demand.',
      'Antibody CHO processes target >30% DO saturation with low shear.'],
    formulas: [
      { name: 'OTR', expr: 'OTR = kLa(C* − CL)' },
      { name: 'O2 demand', expr: 'OUR = qO2 · X' },
      { name: 'Power number', expr: 'Np = P/(ρ n³ D⁵)' },
      { name: 'kLa scaling', expr: 'kLa ∝ Pv^a · a^b (empirical)' },
    ],
    keyPoints: [
      'OTR = kLa(C* − CL); matches OUR = qO2·X at steady state.',
      'kLa ∝ agitation^a, aeration^b; viscosity hurts.',
      'Scale-up constants: P/V, kLa, Np — pick your priority.',
    ],
    revision: {
      remember: 'OTR = kLa(C*−CL) = qO2·X; viscosity kills kLa.',
      mistakes: ['Confusing kL and kLa; using CL instead of C* in driving force.'],
      summary: 'O2 transfer chain + kLa factors + scale-up rules + DO control ladder.',
    },
    related: ['bae-cell-bioreactors', 'bae-cstr', 'num-kla'],
  },
  {
    id: 'bae-cell-bioreactors',
    subject: 'bioreaction-engineering',
    name: 'Bioreactor Types & Cell Culture Reactors',
    level: 2,
    priority: 'high',
    ord: 5,
    short: 'Stirred tank, airlift, fluidised bed, and mammalian designs.',
    basic: {
      what: 'Bioreactors differ by mixing method: stirred tank (impeller), airlift (gas-driven circulation), fluidised bed (sparger), packed bed (immobilised cells). Mammalian cell cultures use low-shear stirred tanks or perfusion systems.',
      why: 'The right reactor matches the organism’s shear tolerance and O2 demand.',
      how: 'Stirred tank: baffled, impeller, sparger — robust, standard for bacteria/yeast. Airlift: internal/external loop, no moving parts — good for shear-sensitive cells. Fluidised bed: immobilised cells on carriers (beads).',
      where: 'Bacteria/yeast → stirred tank; CHO → low-shear stirred or wave; immobilised enzymes/cells → bed reactors.',
    },
    college: [
      'Stirred tank components: impeller types (Rushton radial-flow, marine axial-flow), baffles (break vortices), sparger, off-gas, DO/pH probes.',
      'Rushton: high shear, good gas dispersion (bacteria). Marine blade: lower shear, good bulk mixing (mammalian).',
      'Working volume: 60–70% of vessel volume (headspace for foaming/gas).',
      'Foam control: antifoam dosing (silicone), mechanical defoamers, pH stat (pH drop = CO2 from active growth).',
      'Scale-down models reproduce kLa, power, flow fields of the industrial vessel in the lab.',
    ],
    advanced: [
      'Perfusion bioreactors (mammalian): high cell density (10–20 ×10^6 cells/mL) with continuous medium replacement and cell retention (tangential flow filtration or hollow fibres).',
      'High-density microcarrier cultures: 3D aggregates change O2/nutrient gradients inside the pellet.',
    ],
    gate: {
      highYield: [
        'Impeller type → application mapping (Rushton vs marine).',
        'Why airlift suits shear-sensitive cells (no moving parts).',
        'Working volume 60–70%.',
        'Baffles eliminate vortex and improve radial mixing.',
      ],
      traps: [
        'Rushton is RADIAL flow (high shear); marine is AXIAL (low shear) — a favourite swap question.',
        'Airlift has NO mechanical agitator — mixing is gas-driven.',
      ],
    },
    examples: [
      'WAVE bioreactors (bag-based, gentle rocking) for mammalian cell scale-up.',
      'Immobilised glucose isomerase in packed-bed columns for HFCS production.'],
    formulas: [],
    keyPoints: [
      'Stirred tank = standard; airlift = shear-soft; bed = immobilised.',
      'Rushton = radial/high shear; marine = axial/low shear.',
      'Working volume 60–70%; baffles kill vortices.',
    ],
    revision: {
      remember: 'Rushton radial, marine axial, airlift gas-driven, beds for immobilised cells.',
      mistakes: ['Swapping radial/axial flow directions.'],
      summary: 'Reactor taxonomy by mixing mechanism + shear requirements + scale-up logic.',
    },
    related: ['bae-oxygen', 'an-culture', 'bae-cstr'],
  },
  {
    id: 'bae-fedbatch',
    subject: 'bioreaction-engineering',
    name: 'Fed-Batch & Perfusion Strategies',
    level: 3,
    priority: 'medium',
    ord: 6,
    short: 'Feeding cells without dilution or overflow.',
    basic: {
      what: 'Fed-batch feeds substrate during culture (no outflow) to avoid inhibition and extend the productive phase. Perfusion continuously passes medium through a cell-retaining reactor.',
      why: 'Fed-batch is the industrial workhorse for high-value products (insulin, antibodies, viral vectors).',
      how: 'Fed-batch: feed rate controlled by DO-stat, pH-stat or exponentially. Perfusion: diafiltration or TFF removes metabolites while retaining cells; dilution rate can exceed µ.',
      where: 'Recombinant protein production, CHO antibody, E. coli insulin.',
    },
    college: [
      'Fed-batch modes: exponential feed (constant µ), linear, log-linear, DO-stat (feed on DO rise).',
      'Volume change: V(t) = V0 + F·t (constant feed); concentrations dilute with volume.',
      'Perfusion productivity = Qp·P (bleed rate × product concentration) — constant at steady state.',
      'Cell retention devices: TFF, hollow fibre, cross-flow, density (settling).',
    ],
    advanced: [
      'Metabolic burden in recombinant strains: feed control balances growth vs protein yield (insulin inclusion bodies vs secreted protein).',
      'Doelen control strategies: maintain qS (specific uptake) at optimum via DO or respiration quotient (RQ) feedback.',
    ],
    gate: {
      highYield: [
        'Fed-batch: no outflow; V grows; productivity peaks mid-run.',
        'Perfusion: in AND out; D can exceed µ with cell retention.',
        'DO-stat feeding logic (DO rise = starved → feed).',
      ],
      traps: [
        'Fed-batch has unsteady-state concentrations — cannot use CSTR steady-state equations.',
        'Perfusion dilution rate is NOT bounded by µmax (cells retained).',
      ],
    },
    examples: [
      'E. coli insulin fed-batch: glycerol/glucose feed over 48–72 h.',
      'CHO antibody perfusion: 5× daily dilution for 14 days at 15 ×10^6 cells/mL.'],
    formulas: [
      { name: 'Fed-batch volume', expr: 'V(t) = V0 + F·t' },
      { name: 'Perfusion productivity', expr: 'Qp = Q·P (steady state)' },
    ],
    keyPoints: [
      'Fed-batch: feed in, nothing out, V grows.',
      'Perfusion: in + out, cells retained, D > µ possible.',
      'DO-stat = feed when DO recovers.',
    ],
    revision: {
      remember: 'Fed-batch = feed only; perfusion = feed + bleed + retention.',
      mistakes: ['Applying steady-state CSTR math to fed-batch.'],
      summary: 'Fed-batch feed strategies + perfusion cell retention + productivity equations.',
    },
    related: ['bae-batch', 'bae-cstr'],
  },
  {
    id: 'bae-scaleup',
    subject: 'bioreaction-engineering',
    name: 'Scale-Up Principles',
    level: 3,
    priority: 'medium',
    ord: 7,
    short: 'From 2 L flask to 20,000 L reactor.',
    basic: {
      what: 'Scale-up transfers a fermentation from lab to production size while keeping key parameters (mixing, O2, shear) similar. The challenge: geometry and physics don’t scale linearly.',
      why: 'A 2 L flask that works may die at 10,000 L — scale-up rules prevent that.',
      how: 'Choose a scaling criterion: constant P/V (power per volume), constant kLa, constant impeller tip speed (shear), or constant residence time of fluid. Each preserves a different phenomenon; you usually compromise.',
      where: 'Every industrial biotech process development.',
    },
    college: [
      'Geometric similarity: D_T ∝ D_imp; then P/V ∝ n³ (if Np constant) — impeller speed must drop as size grows (n ∝ V^−2/5 for constant P/V... typically n ∝ D^−1).',
      'Mixing time scales up poorly (t_mix ∝ D^0.5–1) — large tanks are less well mixed.',
      'Shear stress τ ∝ ρ·Np^0.5·n²·D^0.5; tip speed = π·n·D_imp.',
      'Cascade scale-down: 50 L → 5 L → 0.5 L for process development.',
    ],
    advanced: [
      'Non-geometric scale-up (wide/short tanks) changes kLa and mixing differently — CFD now guides industrial design.',
      'Scale-down models replicate kLa, P/V, bulk mixing, and shear of the target reactor simultaneously.',
    ],
    gate: {
      highYield: [
        'Constant P/V → n ∝ D^−1 (geometric similarity).',
        'Tip speed = π n D (shear indicator).',
        'Why all criteria cannot be met simultaneously.',
      ],
      traps: [
        'Larger tank at same n = FAR more shear (πnD increases).',
        'Constant Np alone does not guarantee constant kLa.',
      ],
    },
    examples: [
      '1 m tank at 300 rpm → 3 m tank at ~100 rpm for constant P/V.',
      'Antibody process: scale-down 200 L model matches 10,000 L kLa within 10%.'],
    formulas: [
      { name: 'Tip speed', expr: 'Vs = π·n·D_imp' },
      { name: 'Constant P/V (geom.)', expr: 'n2 = n1·(D1/D2)' },
    ],
    keyPoints: [
      'Pick ONE scaling criterion; document the compromise.',
      'n ∝ D^−1 for constant P/V (geometric).',
      'Tip speed = shear proxy.',
    ],
    revision: {
      remember: 'P/V const → n ∝ 1/D; tip speed = shear; compromise is the theme.',
      mistakes: ['Running the same rpm at scale (shear catastrophe).'],
      summary: 'Scaling criteria + geometric similarity + shear/tip speed + scale-down models.',
    },
    related: ['bae-oxygen', 'bae-cell-bioreactors'],
  },
  {
    id: 'bae-gate',
    subject: 'bioreaction-engineering',
    name: 'GATE Focus: Bioreaction Numericals',
    level: 4,
    priority: 'high',
    ord: 8,
    short: 'CSTR, Monod and kLa problem patterns.',
    basic: {
      what: 'GATE bioreaction questions are formula-driven: Monod inversion, CSTR steady state, batch time, OTR balancing. Master the patterns, not individual problems.',
      why: 'This subject’s numericals are predictable — highest ROI per hour of practice.',
      how: 'Pattern 1: given D, find S (Monod inversion) then X (yield). Pattern 2: given OTR data, find kLa. Pattern 3: batch doubling time from µ.',
      where: 'GATE BT paper.',
    },
    college: [
      'Monod inversion: S = Ks·D/(µmax − D) — valid only for D < µmax.',
      'CSTR: X = Yx/s(S0 − S); productivity D·X.',
      'kLa from DO transient: during step change, CL(t) → kLa from time constant.',
      'Batch: t = ln(X2/X1)/µ.',
    ],
    advanced: [
      'Two-substrate or product-inhibition variants of Monod (Haldane form).',
      'Multi-stage CSTR series: solve stage by stage.',
    ],
    gate: {
      highYield: [
        'The four patterns above with unit discipline.',
        'Washout criterion D vs µmax.',
        'OTR/OUR balance for DO estimation.',
      ],
      traps: [
        'Forgetting Yx/s units (g/g) in X calculations.',
        'Using S0 instead of (S0−S) in the yield relation.',
      ],
    },
    examples: [
      'µmax = 0.5 h−1, Ks = 1 g/L, S0 = 10 g/L, D = 0.4 h−1 → S = 1×0.4/0.1 = 4 g/L; X = 0.5×(10−4) = 3 g/L.',
      'kLa = OTR/(C* − CL) = 0.2 mol/m³h / (0.1 mol/m³) = 2 h−1.'],
    formulas: [
      { name: 'Monod inversion', expr: 'S = Ks·D/(µmax − D)' },
      { name: 'CSTR biomass', expr: 'X = Yx/s(S0 − S)' },
    ],
    keyPoints: [
      'D < µmax or washout.',
      'Units: µ (h−1), Ks & S (g/L), Y (g/g), kLa (h−1).',
    ],
    revision: {
      remember: 'Invert Monod → S; yield → X; OTR → kLa.',
      mistakes: ['Applying formulas at D ≥ µmax.'],
      summary: 'Four numerical patterns with strict unit discipline = bioreaction GATE.',
    },
    related: ['bae-cstr', 'bae-kinetics', 'bae-oxygen'],
  },
];

// ============ CELL BIOLOGY ============
export const TOPICS_CEL: Topic[] = [
  {
    id: 'cel-membrane',
    subject: 'cell-biology',
    name: 'Cell Membrane & Transport',
    level: 1,
    priority: 'high',
    ord: 1,
    short: 'The bilayer and how things cross it.',
    basic: {
      what: 'The cell membrane is a phospholipid bilayer with embedded proteins. It controls what enters and leaves the cell.',
      why: 'Transport mechanisms (passive, active, vesicular) are core to physiology and GATE conceptual questions.',
      how: 'Passive: diffusion down gradient (simple, or via channels/carriers). Active: against gradient using ATP (pumps like Na+/K+ ATPase) or cotransport (secondary active). Vesicular: endocytosis/exocytosis for bulk and receptors.',
      where: 'Neuronal signalling, nutrient uptake, drug delivery, immune synapses.',
    },
    college: [
      'Na+/K+ ATPase: 3 Na+ out, 2 K+ in per ATP — sets resting membrane potential.',
      'Channels: gated (voltage, ligand, mechanosensitive); carriers: saturation kinetics (like enzymes).',
      'Facilitated diffusion saturates (Km-like); simple diffusion linear.',
        'Endocytosis: clathrin-coated pits (receptor-mediated, LDL), caveolae, phagocytosis (cells), pinocytosis (fluid).',
      'Tight junctions, adherens, desmosomes, gap junctions = cell–cell junctions.',
    ],
    advanced: [
      'Electrogenic vs electroneutral transport; Donnan equilibrium for charged solutes.',
      'Protein targeting: signal peptides, SRP, TOM/TIM (mitochondria), KDEL (ER retention).',
    ],
    gate: {
      highYield: [
        'Na+/K+ pump stoichiometry (3:2) and ATP cost.',
        'Saturation of carriers vs linearity of channels/diffusion.',
        'Clathrin-mediated uptake is receptor-specific.',
      ],
      traps: [
        'Facilitated diffusion does NOT use ATP — it saturates because of carriers, not energy.',
        'The pump moves 3 Na+ OUT and 2 K+ IN (net 1 positive out per cycle).',
      ],
    },
    examples: [
      'LDL enters cells by receptor-mediated endocytosis (familial hypercholesterolaemia = defective LDL receptor).',
      'Neuronal action potential: voltage-gated Na+ in, K+ out.'],
    formulas: [
      { name: 'Nernst potential', expr: 'E_ion = (RT/zF) ln([out]/[in])' },
    ],
    keyPoints: [
      'Passive = down gradient, no ATP; active = against, with ATP.',
      'Carriers saturate; channels conduct.',
      '3 Na+ out / 2 K+ in per ATP.',
      'Clathrin = receptor-mediated endocytosis.',
    ],
    revision: {
      remember: '3 out 2 in; carriers saturate; clathrin = receptor-mediated.',
      mistakes: ['Charging ATP to facilitated diffusion.'],
      summary: 'Bilayer + 3 transport classes + pump stoichiometry + endocytosis types.',
    },
    related: ['bio-lipids', 'cel-signaling', 'imm-basics'],
  },
  {
    id: 'cel-cycle',
    subject: 'cell-biology',
    name: 'Cell Cycle & Division',
    level: 1,
    priority: 'high',
    ord: 2,
    short: 'G1–S–G2–M control, cyclins and checkpoints.',
    basic: {
      what: 'The cell cycle is the sequence of growth and division: G1 (growth) → S (DNA synthesis) → G2 (prep) → M (mitosis). Cyclin–CDK complexes drive the transitions; checkpoints prevent errors.',
      why: 'Cancer is a cell-cycle disease — understanding control explains oncogenes and tumour suppressors.',
      how: 'Cyclins accumulate and activate CDKs (cyclic-dependent kinases). MPF (cyclin B + CDK1) triggers mitosis. After M, cyclin B is degraded (APC/C ubiquitin ligase) and the cycle resets. G1/S controlled by Rb–E2F.',
      where: 'Cancer biology, biopharming (cell cycle affects protein production), developmental biology.',
    },
    college: [
      'Checkpoints: G1/S (DNA damage, nutrition), G2/M (replication complete), spindle checkpoint (metaphase–anaphase).',
      'p53: "guardian of the genome" — DNA damage → p21 → CDK inhibition → arrest; or apoptosis if damage severe.',
      'Rb: phosphorylated by CDK4/6–cyclin D → releases E2F → S-phase genes.',
      'Mitosis phases: prophase → metaphase → anaphase → telophase; cytokinesis.',
      'Meiosis: two divisions; crossing over in prophase I; independent assortment — genetic variation.',
    ],
    advanced: [
      'APC/C activates with Cdc20 (spindle checkpoint) → ubiquitinates securin (freeing separase → cohesin cleavage → anaphase) and cyclin B.',
      'Contact inhibition and anchorage dependence lost in transformed cells; senescence via p16/Rb.',
    ],
    gate: {
      highYield: [
        'Cyclin–CDK logic: cyclin level drives phase transition.',
        'p53 → p21 → arrest pathway.',
        'MPF = cyclin B + CDK1 for M phase.',
        'Meiosis I vs II: homologous vs sister chromatid separation.',
      ],
      traps: [
        'Cyclin DEGRADATION (not just presence) is what exits the phase — APC/C is key.',
        'Crossing over happens in PROPHASE I of meiosis, not mitosis.',
      ],
    },
    examples: [
      'Colchicine (mitotic poison) blocks spindle formation → metaphase arrest.',
      'Retinoblastoma = loss of Rb function → uncontrolled E2F.'],
    formulas: [],
    keyPoints: [
      'G1→S: cyclin D–CDK4/6, Rb–E2F; G2→M: cyclin B–CDK1 (MPF).',
      'p53–p21 = DNA damage brake.',
      'APC/C–Cdc20 = anaphase trigger + cyclin destruction.',
      'Meiosis I separates homologues; II separates sisters.',
    ],
    revision: {
      remember: 'MPF starts M; p53 stops bad cycles; APC/C ends M.',
      mistakes: ['Placing crossing over in meiosis II.'],
      summary: 'Cyclin–CDK engine + p53/Rb brakes + APC/C exit + meiosis choreography.',
    },
    related: ['an-stem', 'gen-mendel', 'mol-replication'],
  },
  {
    id: 'cel-organelles',
    subject: 'cell-biology',
    name: 'Organelles & Endomembrane System',
    level: 1,
    priority: 'medium',
    ord: 3,
    short: 'ER, Golgi, lysosomes and the vesicle highway.',
    basic: {
      what: 'The endomembrane system is a network: ER (synthesis) → Golgi (modification/sorting) → vesicles → plasma membrane/lysosomes. Mitochondria make ATP; peroxisomes detoxify.',
      why: 'Protein secretion pathways are the basis of antibody production and GATE matching questions.',
      how: 'Rough ER: ribosomes synthesise secreted/membrane proteins (signal peptide → SRP → ER). Golgi cisternae (cis→trans) add glycans and sort. Lysosomes (acid hydrolases, pH ~5) digest. Vesicles: COPII (ER→Golgi), COPI (Golgi→ER retrograde), clathrin (Golgi→lysosome/PM).',
      where: 'mAb production (CHO ER–Golgi load), secretion, drug targeting.',
    },
    college: [
        'KDEL sequence = ER retention signal (retrieved from Golgi by COPI).',
        'Lysosomal targeting: mannose-6-phosphate tag (identified in trans-Golgi).',
        'Mitochondrial import: TOM/TIM channels; presequence cleaved by processing peptidase.',
        'Peroxisomes: β-oxidation of very-long-chain fatty acids; catalase; proteins imported WITHOUT signal peptidase cleavage.',
      ],
    advanced: [
      'Golgi polarity: resident enzymes at cis (mannosidase I) vs trans (glucosyltransferase) mark maturation direction.',
      'Autophagy: LC3-tagged autophagosome → lysosome; macroautophagy vs microautophagy.',
    ],
    gate: {
      highYield: [
        'Vesicle coat → direction mapping (COPII forward, COPI retrograde, clathrin to lysosome).',
        'KDEL = ER retention; M6P = lysosome.',
        'Lysosome pH ~5; proton pump maintains it.',
      ],
      traps: [
        'COPI is RETROGRADE (Golgi→ER), not forward — a classic direction trap.',
        'Peroxisomal proteins do NOT use signal peptidase cleavage (unlike mitochondria).',
      ],
    },
    examples: [
      'Antibody heavy chains fold in the ER; glycosylated in the Golgi; secreted via clathrin-independent vesicles.',
      'I-cell disease: defective M6P tagging → lysosomal enzymes secreted instead.'],
    formulas: [],
    keyPoints: [
      'Signal peptide → SRP → ER (secretory pathway start).',
      'COPII forward, COPI backward, clathrin to lysosome/PM.',
      'KDEL = ER keep; M6P = lysosome send.',
      'Lysosome pH ≈ 5.',
    ],
    revision: {
      remember: 'COPII out, COPI back, clathrin down; KDEL keep, M6P send.',
      mistakes: ['Reversing COPI direction.'],
      summary: 'Secretory route + coat logic + targeting signals + pH facts.',
    },
    related: ['bio-aa', 'mol-translation', 'an-mab'],
  },
  {
    id: 'cel-signaling',
    subject: 'cell-biology',
    name: 'Signal Transduction',
    level: 2,
    priority: 'high',
    ord: 4,
    short: 'How cells receive and amplify external signals.',
    basic: {
      what: 'Signalling is how cells respond to their environment: a ligand binds a receptor → intracellular cascades → response (gene expression, metabolism, shape).',
      why: 'Cancer, diabetes and immunology are all signalling disorders — high-yield conceptual area.',
      how: 'Main routes: (1) RTK → RAS–RAF–MEK–ERK (growth); (2) GPCR → G-proteins → cAMP/PKA or IP3/DAG/PKC; (3) cytokine receptors → JAK–STAT (gene expression); (4) Notch (direct contact).',
      where: 'Hormone action, immune activation, cancer drug targets (MEK inhibitors, JAK inhibitors).',
    },
    college: [
      'GPCR cascade: Gαs → adenylyl cyclase → cAMP → PKA; Gαq → PLC → IP3 (Ca2+ release) + DAG (PKC).',
      'RTK dimerises on ligand → autophosphorylation → RAS–RAF–MEK–ERK (MAPK) phosphorylation cascade.',
      'JAK–STAT: receptor tyrosine phosphorylation → JAK phosphorylates STAT → dimer → nucleus.',
      'Cross-talk: cAMP can inhibit PKC; Ca2+ calmodulin pathways intersect everywhere.',
    ],
    advanced: [
      'Receptor internalisation: β-arrestin-mediated desensitisation vs recycling; GRB2–SOS for RAS loading.',
      'Oncogenic point mutations: RAS (G12V, constitutively active), BCR–ABL (constitutive tyrosine kinase, imatinib target).',
    ],
    gate: {
      highYield: [
        'Second messengers: cAMP, IP3, DAG, Ca2+ and which G-protein makes which.',
        'RTK → RAS–RAF–MEK–ERK order (never swap).',
        'JAK–STAT ends in NUCLEAR transcription.',
        'β-arrestin = desensitisation/internalisation.',
      ],
      traps: [
        'Gαs → cAMP; Gαq → IP3/DAG; Gαi INHIBITS adenylyl cyclase — a three-way trap.',
        'ERK is a MAP kinase that phosphorylates transcription factors in the nucleus.',
      ],
    },
    examples: [
      'Imatinib (Gleevec) inhibits BCR–ABL in CML.',
      'Glucagon → Gαs → cAMP → PKA → glycogen phosphorylase activation (glycogen breakdown).'],
    formulas: [],
    keyPoints: [
      'Gαs/cAMP, Gαq/IP3+DAG, Gαi/inhibit.',
      'RTK → RAS–RAF–MEK–ERK → nucleus.',
      'JAK–STAT = direct transcription activation.',
      'β-arrestin desensitises receptors.',
    ],
    revision: {
      remember: 's→cAMP, q→IP3/DAG, i→off; RAS–RAF–MEK–ERK; STAT to nucleus.',
      mistakes: ['Mixing Gαs and Gαq second messengers.'],
      summary: 'Three receptor classes (GPCR, RTK, cytokine) + their cascades + key drug targets.',
    },
    related: ['cel-cycle', 'imm-basics', 'bio-reg'],
  },
  {
    id: 'cel-death',
    subject: 'cell-biology',
    name: 'Apoptosis & Cell Death',
    level: 2,
    priority: 'medium',
    ord: 5,
    short: 'Programmed cell death — intrinsic, extrinsic and why it matters.',
    basic: {
      what: 'Apoptosis is controlled, non-inflammatory cell self-destruction. It sculpts tissues, removes damaged cells and is defective in cancer.',
      why: 'Cancer cells evade apoptosis; targeted therapies (Bcl-2 inhibitors) restore it.',
      how: 'Extrinsic: death ligands (FASL, TNF) → death receptors → caspase-8 → execution caspases (3, 6, 7). Intrinsic: mitochondrial — cytochrome c release → apoptosome (Apaf-1 + caspase-9) → execution caspases. Bcl-2 family regulates the mitochondrial gate.',
      where: 'Cancer therapy, developmental biology, immunology (T-cell activation-induced death).',
    },
    college: [
      'Caspases: initiator (8, 9) vs executioner (3, 6, 7); activated by cleavage.',
      'Bcl-2 (anti-apoptotic) vs Bax/Bak (pro-apoptotic); BH3-only sensors (Bad, Bim).',
      'Apoptotic features: membrane blebbing, DNA laddering (caspase-activated DNase), phosphatidylserine externalisation ("eat me" for phagocytes).',
      'Necrosis: uncontrolled, inflammatory, swelling; necroptosis: programmed necrosis (RIPK1/3, MLKL).',
    ],
    advanced: [
      'p53 upregulates Bax/PUMA → intrinsic pathway; IAPs (XIAP) inhibit caspases and are overcome by Smac/DIABLO.',
      'PARP inhibition in BRCA-mutant cancers (synthetic lethality) — a major cancer-drug concept.',
    ],
    gate: {
      highYield: [
        'Initiator (8/9) vs executioner (3/6/7) caspases.',
        'Bcl-2 anti vs Bax pro; cytochrome c → apoptosome → caspase-9.',
        'PS externalisation = phagocyte signal.',
        'DNA ladder = internucleosomal cleavage (apoptosis, not necrosis).',
      ],
      traps: [
        'Apoptosis is NON-inflammatory; necrosis is inflammatory — never swap.',
        'FAS ligand activates CASPASE-8 (extrinsic), not caspase-9.',
      ],
    },
    examples: [
      'Fingolimod (MS drug) sequesters sphingosine-1-phosphate receptors, causing T-cell apoptosis.',
      'Venetoclax (Bcl-2 inhibitor) in CLL.'],
    formulas: [],
    keyPoints: [
      'Extrinsic: death receptor → caspase-8. Intrinsic: mitochondria → cytochrome c → caspase-9.',
      'Executioners: 3, 6, 7.',
      'Bcl-2 = brake; Bax = accelerator.',
      'Apoptosis = quiet; necrosis = inflammatory.',
    ],
    revision: {
      remember: '8/9 start, 3/6/7 finish; cytochrome c → 9; Bcl-2 brakes.',
      mistakes: ['Calling apoptosis inflammatory.'],
      summary: 'Two initiation routes → caspase cascade → Bcl-2 gate → quiet death vs necrosis.',
    },
    related: ['cel-cycle', 'cel-signaling', 'imm-basics'],
  },
  {
    id: 'cel-cytoskeleton',
    subject: 'cell-biology',
    name: 'Cytoskeleton & Motility',
    level: 3,
    priority: 'low',
    ord: 6,
    short: 'Microtubules, actin and intermediate filaments.',
    basic: {
      what: 'The cytoskeleton is the cell’s scaffolding and transport system: microtubules (tracks), actin filaments (shape, movement), intermediate filaments (tensile strength).',
      why: 'Motility, division (spindle) and intracellular transport all depend on it.',
      how: 'Microtubules: α/β-tubulin dimers, grow from MTOC (centrosome), dynamic instability; motor proteins kinesin (+end) and dynein (−end). Actin: G-actin → F-actin; myosin motors; Arp2/3 branching; capping. Intermediate filaments: tissue-specific (keratin, vimentin, lamin).',
      where: 'Neuronal transport (kinesin/dynein), cytokinesis (actin ring), nuclear envelope (lamins).',
    },
    college: [
      'Drugs: colchicine (binds tubulin, depolymerises), taxol/stabilises (cancer), cytochalasin (blocks actin polymerisation), latrunculin (sequesters G-actin).',
      'Cilia/flagella: 9+2 microtubule arrangement; dynein arms drive sliding; ciliopathies (PCD, PKD).',
      'Gap junctions (connexons) for intercellular communication; tight junctions (claudins/occludins) for barriers.',
    ],
    advanced: [
      'Microtubule plus-end tracking proteins (EB1) and mitotic spindle assembly (Aurora kinases, Plk1).',
      'Actin dynamics: treadmilling, formins (linear), spiralling (twitchin).',
    ],
    gate: {
      highYield: [
        'Drug → target mapping (colchicine/taxol/cytochalasin/latrunculin).',
        'Kinesin +end, dynein −end (cargoes to periphery vs centre).',
        '9+2 cilia structure.',
      ],
      traps: [
        'Taxol STABILISES microtubules (prevents depolymerisation) — the spindle freezes in a useless state.',
        'Cytochalasin vs latrunculin both hit actin but by different mechanisms (polymerisation block vs monomer sequestration).',
      ],
    },
    examples: [
      'Tay–Sachs–like ciliopathy: defective dynein → primary ciliary dyskinesia.',
      'Nerve growth factor transported axonally by kinesin.'],
    formulas: [],
    keyPoints: [
      'MT: tubulin, MTOC, dynamic instability; kinesin +, dynein −.',
      'Actin: shape/motility; cytochalasin/latrunculin.',
      'IF: tensile strength, tissue-specific.',
      '9+2 cilia; dynein drives beating.',
    ],
    revision: {
      remember: 'Kinesin out, dynein in; taxol freezes; 9+2 cilia.',
      mistakes: ['Reversing motor direction assignments.'],
      summary: 'Three filament systems + motor directions + drug map + cilia structure.',
    },
    related: ['cel-cycle', 'cel-death'],
  },
  {
    id: 'cel-proteostasis',
    subject: 'cell-biology',
    name: 'Protein Quality Control & Chaperones',
    level: 3,
    priority: 'low',
    ord: 7,
    short: 'HSPs, ubiquitin–proteasome and ER stress.',
    basic: {
      what: 'Cells constantly check protein folding. Chaperones (HSPs) help folding; misfolded proteins are tagged (ubiquitin) and destroyed by the proteasome. The ER has its own quality control (ERAD).',
      why: 'Misfolding causes Alzheimer’s, Parkinson’s, prion disease; proteasome inhibitors are cancer drugs.',
      how: 'HSP70/HSP90 help folding; HSP40 (DNAJ) delivers substrate. Ubiquitin: E1 (activating) → E2 (conjugating) → E3 (ligase) → polyubiquitin → 26S proteasome. UPR: ER stress response (IRE1, PERK, ATF6) restoring homeostasis or triggering apoptosis.',
      where: 'Neurodegeneration, cancer therapy (bortezomib), biopharm (reduce aggregates in cell lines).',
    },
    college: [
      '26S proteasome: 20S core (proteolytic) + 19S regulatory (deubiquitinates, unfolds).',
      'Autophagy handles aggregates and organelles too large for the proteasome.',
      'UPR effectors: PERK → eIF2α (translation halt), IRE1 → XBP1 (chaperone up), ATF6 (nuclear factor).',
    ],
    advanced: [
      'Chaperone-assisted autophagy (CAA): p62/UBXIN links ubiquitin to LC3.',
      'Proteasome inhibition → unfolded protein accumulation → apoptosis in fast-growing cancer cells.',
    ],
    gate: {
      highYield: [
        'E1–E2–E3 ubiquitin cascade order.',
        '20S = protease, 19S = regulator.',
        'UPR branches (PERK/IRE1/ATF6).',
        'Bortezomib = proteasome inhibitor (multiple myeloma).',
      ],
      traps: [
        'E3 provides SPECIFICITY (E1/E2 general) — a "which enzyme recognises the substrate" question.',
        'UPR is PRO-survival first; only sustained stress → apoptosis.',
      ],
    },
    examples: [
      'Bortezomib (Velcade) in multiple myeloma.',
      'Huntingtin aggregates sequester HSPs — a therapeutic target.'],
    formulas: [],
    keyPoints: [
      'E1→E2→E3 → proteasome (20S/19S).',
      'HSP70/90 fold; HSP40 load.',
      'UPR: PERK/IRE1/ATF6; survival first.',
    ],
    revision: {
      remember: 'E1–E2–E3; 20S chews, 19S opens; UPR rescues then kills.',
      mistakes: ['Assigning substrate recognition to E1/E2.'],
      summary: 'Chaperone QC + ubiquitin–proteasome + UPR = protein homeostasis.',
    },
    related: ['cel-organelles', 'bio-aa'],
  },
  {
    id: 'cel-gate',
    subject: 'cell-biology',
    name: 'GATE Focus: Cell Biology Patterns',
    level: 4,
    priority: 'high',
    ord: 8,
    short: 'Matching and conceptual traps for exam day.',
    basic: {
      what: 'GATE cell biology is mostly matching (structures, drugs, pathways) and one-step conceptual questions (what happens if X is blocked).',
      why: 'High recognisable yield; low calculation load.',
      how: 'Drill: organelle function, signalling cascades, cell-cycle regulators, death pathway enzymes, drug targets.',
      where: 'GATE BT paper.',
    },
    college: [
      'Matching banks: organelle↔function, motor↔direction, caspase↔role, coat↔route.',
      'Blocked-pathway logic: "if APC/C is inhibited, cells arrest at..." → metaphase (anaphase cannot start).',
      'Drug targets: colchicine/taxol (MT), cytochalasin (actin), bortezomib (proteasome), imatinib (BCR–ABL).',
    ],
    advanced: [
      'Multi-step inference: p53 loss → no G1 arrest → mutation accumulation.',
      'Comparative: plant vs animal (cell wall, vacuole, no lysosomes in some).',
    ],
    gate: {
      highYield: [
        'All mapping banks above.',
        'Caspase numbers, cyclin names, G-protein messengers.',
      ],
      traps: [
        'Options that pair a correct molecule with the wrong pathway step.',
        'Plant cell tricks (central vacuole, chloroplast, no centrioles in most).',
      ],
    },
    examples: [
      '"Inhibition of COPI would最直接 affect..." → retrograde Golgi→ER transport.',
      '"Loss of lamin B causes..." → nuclear envelope fragility (laminopathy).'],
    formulas: [],
    keyPoints: [
      'Know the numbers: caspases 3/6/7, 8/9; pump 3:2; pH 5.',
      'Know the directions: COPII/COPI/clathrin; kinesin/dynein.',
      'Know the drugs: colchicine, taxol, cytochalasin, bortezomib, imatinib.',
    ],
    revision: {
      remember: 'Numbers, directions, drugs — the three cell-bio GATE banks.',
      mistakes: ['Pairing correct molecules in wrong order.'],
      summary: 'Cell bio GATE = banks of mappings + one-step pathway logic.',
    },
    related: ['cel-cycle', 'cel-signaling', 'cel-death'],
  },
];

// ============ ENVIRONMENTAL BIOTECHNOLOGY ============
export const TOPICS_ENV: Topic[] = [
  {
    id: 'env-bioremediation',
    subject: 'environmental-biotechnology',
    name: 'Bioremediation',
    level: 1,
    priority: 'high',
    ord: 1,
    short: 'Using microbes to clean polluted soil and water.',
    basic: {
      what: 'Bioremediation uses living organisms (mostly bacteria and fungi) to degrade or remove pollutants — oil, pesticides, heavy metals, solvents — from soil and groundwater.',
      why: 'Cheaper and greener than physical/chemical cleanup; a standard GATE topic.',
      how: 'Intrinsic: enhance native microbes (biostimulation — add nutrients/O2). Extrinsic: add specialised strains (bioaugmentation). Techniques: biopiles, bioslurping, phytoremediation (plants), bioventing, landfarming.',
      where: 'Oil spill cleanup, TNT-contaminated military sites, heavy metal soil.',
    },
    college: [
      'Petroleum hydrocarbons: Pseudomonas, Alcaligenes oxidise alkanes (alkane hydroxylase); PAHs by biphenyl dioxygenase pathways.',
      'Chlorinated solvents (TCE, PCE): reductive dechlorination (Dehalococcoides) under anaerobic conditions.',
      'Heavy metals: NOT degraded — removed by biosorption, bioaccumulation, or volatilisation (Hg); genetic constructs (mercury resistance operon merA–merT) detoxify Hg2+.',
      'Phytoremediation: phytoextraction (hyperaccumulators), phytodegradation, rhizodegradation, phytostabilisation.',
    ],
    advanced: [
      'Bioremediation limitations: recalcitrant compounds (PCBs, dioxins), co-metabolism requirements, site heterogeneity, winter conditions.',
      'Mycoremediation: white-rot fungi (lignin peroxidase, manganese peroxidase) degrade lignin-like structures including PAHs.',
    ],
    gate: {
      highYield: [
        'Biostimulation vs bioaugmentation definitions.',
        'Metals are NOT biodegraded — only transformed/mobilised (classic true/false).',
        'Dehalococcoides for reductive dechlorination.',
        'Phytoremediation sub-types.',
      ],
      traps: [
        '"Biodegradation of mercury" is FALSE — it’s methylated/demethylated, not destroyed.',
        'Cometabolism: pollutant degraded incidentally while another compound is the carbon source.',
      ],
    },
    examples: [
      '1989 Exxon Valdez: oil-degrading microbes + nutrient addition (biostimulation).',
      'Phytoremediation of chromium by Sunflower (Helianthus annuus).'],
    formulas: [],
    keyPoints: [
      'Biostimulation = feed natives; bioaugmentation = add strains.',
      'Hydrocarbons/chlorides: degraded; metals: transformed, not destroyed.',
      'White-rot fungi = lignin/peroxidase cleanup.',
    ],
    revision: {
      remember: 'Stimulate vs augment; metals move, they don’t vanish.',
      mistakes: ['Claiming metals are biodegraded.'],
      summary: 'Microbial cleanup toolbox + metal exception + phytoremediation modes.',
    },
    related: ['env-wastewater', 'mic-physiology'],
  },
  {
    id: 'env-wastewater',
    subject: 'environmental-biotechnology',
    name: 'Wastewater Treatment & Activated Sludge',
    level: 2,
    priority: 'high',
    ord: 2,
    short: 'Primary, secondary and tertiary treatment biology.',
    basic: {
      what: 'Wastewater treatment removes organics, nutrients and pathogens. Secondary treatment uses aerobic microbes (activated sludge) to consume organic matter; tertiary removes nutrients (nitrification–denitrification, phosphorus removal).',
      why: 'The activated sludge process is a giant continuous bioreactor — direct GATE Bioreaction overlap.',
      how: 'Primary: sedimentation (solids). Secondary: aeration tank + secondary clarifier; MLSS maintained; SRT (sludge age) controlled by wasting. Tertiary: nitrification (ammonia → nitrate) then denitrification (nitrate → N2, anaerobic); biological phosphorus removal (PAOs).',
      where: 'Municipal and industrial STPs.',
    },
    college: [
      'BOD (biochemical oxygen demand) and COD (chemical oxygen demand): BOD/COD ratio indicates biodegradability (>0.3 good for biological treatment).',
      'F/M ratio (food/microorganism) controls sludge age: high F/M → young sludge, poor settling; low F/M → old sludge, bulking risk.',
      'Nitrifiers (autotrophs: Nitrosomonas, Nitrobacter) are SLOW (µmax ~0.5–1 d−1) — easily washed out at short SRT.',
      'Anoxic zone: denitrification (Pseudomonas, Paracoccus) uses organics as electron donor, nitrate as acceptor.',
    ],
    advanced: [
      'Aerobic granular sludge: self-immobilised granules, enhanced P removal, compact reactors.',
      'Membrane bioreactors (MBR): membrane replaces clarifier — higher MLSS, better effluent.',
      'Anammox (anaerobic ammonium oxidation): NH4+ + NO2− → N2 — saves aeration and carbon.',
    ],
    gate: {
      highYield: [
        'BOD vs COD meaning and BOD/COD treatability ratio.',
        'Nitrification (aerobic, autotroph, slow) vs denitrification (anoxic, heterotroph).',
        'SRT control and washout of slow nitrifiers.',
        'F/M ratio effects.',
      ],
      traps: [
        'Denitrification needs ANOXIC (no O2, has nitrate) — not anaerobic (no O2, no nitrate).',
        'Nitrifiers are autotrophs (CO2 as carbon), not heterotrophs.',
      ],
    },
    examples: [
      'A STP with BOD 200 → 20 mg/L = 90% BOD removal, typical secondary performance.',
      'Anammox plants (e.g. in Netherlands) cut energy use by 60%.'],
    formulas: [
      { name: 'BOD removal %', expr: '(BOD_in − BOD_out)/BOD_in × 100' },
      { name: 'Sludge age', expr: 'SRT = (V·X)/(Qw·Xw + Qe·Xe)' },
    ],
    keyPoints: [
      'Primary = solids; secondary = organics (aerobic); tertiary = nutrients.',
      'Nitrification: aerobic, autotroph, slow; denitrification: anoxic, heterotroph.',
      'BOD/COD > 0.3 → biotreatable.',
      'SRT must exceed 1/µmax of nitrifiers (~1–2 d).',
    ],
    revision: {
      remember: 'O2 for nitrify, no-O2+NO3 for denitrify; SRT beats nitrifier washout.',
      mistakes: ['Calling denitrification "anaerobic".'],
      summary: 'Treatment train + nitrification/denitrification conditions + SRT/F-M logic.',
    },
    related: ['env-bioremediation', 'bae-cstr'],
  },
  {
    id: 'env-biopesticides',
    subject: 'environmental-biotechnology',
    name: 'Biopesticides & Biocontrol',
    level: 2,
    priority: 'medium',
    ord: 3,
    short: 'Microbial and plant-based pest control.',
    basic: {
      what: 'Biopesticides use living organisms or their products to control pests: bacteria (Bt), fungi (Metarhizium), viruses (NPV), plant extracts (neem), and predators/parasitoids.',
      why: 'Lower non-target toxicity and resistance pressure than chemical pesticides; key agricultural biotech topic.',
      how: 'Bacillus thuringiensis (Bt) produces crystal (Cry) toxins that are activated in insect midgut alkaline pH and perforate the gut. Fungal biocontrol: spores infect insect cuticle. RNAi-based pest control is emerging.',
      where: 'Cotton (Bt), fruit fly (NPV), forestry (beetle control).',
    },
    college: [
      'Bt toxins: Cry (Caterpillar), Cyt (Cytotoxic), Spl (Spore Lysis); gene stacked in Bt crops (Cry1Ac, Cry2Ab).',
      'Mechanism: toxin binds midgut receptors → oligomerisation → pore formation → cell lysis.',
      'Trichoderma: fungal antagonist (mycoparasitism) for plant pathogens; also phytohormone producer.',
      'Integrated Pest Management (IPM): monitoring + thresholds + bio/chemical mix.',
    ],
    advanced: [
      'Resistance management: refuge strategy (non-Bt plants maintain susceptible pests) to delay Bt resistance.',
      'Metarhizium anisopliae: epizootic fungal pathogen of soil insects; chitin-degrading enzymes (chitinase, β-1,3-glucanase) drive infection.',
    ],
    gate: {
      highYield: [
        'Bt = Bacillus thuringiensis; Cry toxins; midgut alkaline activation.',
        'Metarhizium vs Beauveria (both entomopathogenic fungi).',
        'Refuge strategy logic.',
      ],
      traps: [
        'Bt toxin is INACTIVE until ingested and activated at alkaline pH — it does not harm mammals (neutral stomach).',
        'Bt is a bacterium, not a virus (NPV is the virus one).',
      ],
    },
    examples: [
      'Bt cotton (Cry1Ac) controls bollworm in India.',
      'NPV (nucleopolyhedrovirus) for fruit fly biological control.'],
    formulas: [],
    keyPoints: [
      'Bt = B. thuringiensis, Cry toxin, alkaline midgut activation.',
      'Fungal: Metarhizium/Beauveria (insect); Trichoderma (plant pathogen).',
      'Refuge = resistance management.',
    ],
    revision: {
      remember: 'Bt-Cry-alkaline; Metarhizium fungus; refuge saves Bt.',
      mistakes: ['Thinking Bt works in the human stomach.'],
      summary: 'Biopesticide classes + Bt mechanism + resistance management.',
    },
    related: ['env-bioremediation', 'mic-pathogenicity'],
  },
  {
    id: 'env-biosensors',
    subject: 'environmental-biotechnology',
    name: 'Environmental Biosensors & Biomonitors',
    level: 3,
    priority: 'low',
    ord: 4,
    short: 'Living tools that report on pollution.',
    basic: {
      what: 'Environmental biosensors couple biological recognition (enzyme, cell, tissue, DNA) with a transducer to detect pollutants: heavy metals, pesticides, toxins, pathogens in water and air.',
      why: 'Continuous, in-situ monitoring beats lab analysis for early warnings.',
      how: 'Enzyme biosensors: e.g. esterase inhibition by organophosphates. Whole-cell: bioluminescent Vibrio fischeri light output drops in toxic water. DNA biosensors: probe hybridisation for pathogen genes.',
      where: 'Water quality stations, industrial effluent, drinking water safety.',
    },
    college: [
      'Bioluminescence inhibition assay (Microtox): 30-min EC50 for acute toxicity.',
      'Biomarkers: acetylcholinesterase (AChE) inhibition as a chronic OP exposure marker in fish.',
      'Whole-cell electrochemical biosensors: redox-active proteins (cytochromes) report on redox pollutants.',
    ],
    advanced: [
      'Microbial fuel cells as biosensors: current output drops with toxic inhibition.',
      'eDNA (environmental DNA) metabarcoding for biodiversity and invasive species monitoring.',
    ],
    gate: {
      highYield: [
        'Recognition element → transducer pairing.',
        'Vibrio fischeri = bioluminescence toxicity test.',
        'AChE = OP biomarker.',
      ],
      traps: [
        'Microtox measures ACUTE (30 min) toxicity, not chronic.',
        'eDNA detects PRESENCE (DNA), not live organism necessarily.',
      ],
    },
    examples: [
      'AChE inhibition kits for pesticide residue in farm water.',
      'eDNA monitoring of invasive zebra mussels in the Great Lakes.'],
    formulas: [],
    keyPoints: [
      'Biosensor = recognition + transducer.',
      'Vibrio = bioluminescence; AChE = OP biomarker.',
      'eDNA = presence-based monitoring.',
    ],
    revision: {
      remember: 'Vibrio glows less in poison; AChE falls with OPs.',
      mistakes: ['Calling Microtox a chronic assay.'],
      summary: 'Biosensor architecture + environmental markers + eDNA concept.',
    },
    related: ['ins-assays', 'env-bioremediation'],
  },
  {
    id: 'env-biodegradation',
    subject: 'environmental-biotechnology',
    name: 'Biodegradation of Plastics & Refractory Compounds',
    level: 3,
    priority: 'medium',
    ord: 5,
    short: 'Microbes vs plastics: PETase, PHA and co-metabolism.',
    basic: {
      what: 'Most plastics persist because no enzymes cut them. Some microbes produce plastic-degrading enzymes (PETase, Pseudomonas cutinase), and engineered strains now break PET at industrial rates.',
      why: 'Plastic waste is the defining environmental challenge; biotech offers a real solution path.',
      how: 'PET → (PETase) → terephthalic + glycerol → further mineralisation. PHA (polyhydroxyalkanoates) = biodegradable plastics made by bacteria. Co-metabolism: surfactants/solvents degraded incidentally with a primary carbon source.',
      where: 'Recycling (enzymatic PET recycling plants), bioplastic production.',
    },
    college: [
      'Ideonella sakaiensis (2016): PETase + MHETase degrade PET at 30°C; engineered variants work at 50–60°C.',
      'PHA: Ralstonia eutrocha accumulates PHB (poly-3-hydroxybutyrate); fully biodegradable in soil/sea.',
      'Recalcitrant aromatics (PCB, dioxin): co-metabolism with biphenyl/naphthalene as primary substrate; dioxygenases perform the first (hard) step.',
    ],
    advanced: [
      'Whole-organism engineering: PET-degrading consortia (PETase + terephthalate oxidisers) for single-step conversion to terephthalic acid.',
      'Compostability standards: industrial compost (58–60°C, 3 months) vs home vs marine biodegradation are DIFFERENT claims.',
    ],
    gate: {
      highYield: [
        'PETase organism (I. sakaiensis) and the two-enzyme route.',
        'PHA/PHB as biodegradable bioplastics.',
        'Co-metabolism definition and dioxygenase role.',
      ],
      traps: [
        'PETase alone leaves MHET — you need MHETase too for full PET degradation.',
        '"Biodegradable plastic" without conditions is meaningless — check the claim’s conditions.',
      ],
    },
    examples: [
      'Carbios (France): PET bottle-to-bottle enzymatic recycling at scale since 2019.',
      'PBAT + starch blends for compostable shopping bags.'],
    formulas: [],
    keyPoints: [
      'PETase (I. sakaiensis) + MHETase = PET → TP + glycerol.',
      'PHA/PHB = bacterial bioplastics.',
      'Co-metabolism: incidental degradation with a primary substrate.',
    ],
    revision: {
      remember: 'PETase + MHETase; PHB = bacterial plastic; co-metabolism needs a co-substrate.',
      mistakes: ['PETase alone = complete degradation.'],
      summary: 'Plastic-degrading enzymes + bioplastics + co-metabolism logic.',
    },
    related: ['env-bioremediation', 'mic-physiology'],
  },
  {
    id: 'env-biodiversity',
    subject: 'environmental-biotechnology',
    name: 'Biodiversity & Conservation Biotech',
    level: 3,
    priority: 'low',
    ord: 6,
    short: 'Genetic tools for protecting species and ecosystems.',
    basic: {
      what: 'Conservation biotechnology applies molecular tools to protect biodiversity: DNA barcoding for species ID, population genetics for managing small populations, seed banks and cryopreservation for storage.',
      why: 'Species identification and genetic diversity management are foundational to conservation policy.',
      how: 'DNA barcoding: COI gene (animals), rbcL/matK (plants) for species identification. Microsatellites/SNPs: estimate heterozygosity, inbreeding, effective population size. Gene banks: seed (Svalbard), tissue, cryobanks (sperm, embryos).',
      where: 'Wildlife forensics, captive breeding programmes, climate-resilient crop diversity.',
    },
    college: [
      'Genetic drift and bottleneck: small populations lose diversity; effective population size Ne << census N usually.',
      'Inbreeding depression: ↑ homozygosity → ↑ expression of deleterious recessives.',
      'Cryopreservation: vitrification of gametes/embryos; viable for decades (e.g. black-footed shrimp sperm).',
    ],
    advanced: [
      'Genome-rescue: de-extinction attempts (woolly mammoth via elephant editing) — ethical and ecological debate.',
      'Metatranscriptomics of ecosystems: functional biodiversity from eDNA + RNA.',
    ],
    gate: {
      highYield: [
        'Barcoding markers: COI (animals), rbcL (plants).',
        'Bottleneck → diversity loss → inbreeding depression chain.',
        'Effective population size concept.',
      ],
      traps: [
        'COI is the ANIMAL barcode; plant barcode is different (rbcL/matK) — a swap trap.',
        'Census N is not the same as effective Ne.',
      ],
    },
    examples: [
      'CITES enforcement uses DNA barcoding to identify poached ivory origin.',
      'Svalbard Global Seed Vault: ~1 million accessions.'],
    formulas: [],
    keyPoints: [
      'COI animals, rbcL/matK plants.',
      'Small N → drift → inbreeding depression.',
      'Ne < N typically.',
    ],
    revision: {
      remember: 'COI/rbcL barcodes; bottlenecks erode diversity.',
      mistakes: ['Using COI for plants.'],
      summary: 'Barcoding + population genetics + cryo storage = conservation biotech.',
    },
    related: ['gen-popgen', 'env-bioremediation'],
  },
  {
    id: 'env-climate',
    subject: 'environmental-biotechnology',
    name: 'Biotech & Climate Change',
    level: 3,
    priority: 'low',
    ord: 7,
    short: 'Bioenergy, carbon capture and green chemistry.',
    basic: {
      what: 'Biotechnology addresses climate change on both sides: biofuels and biogas (renewable energy) and biological CO2 fixation (microalgae, engineered bacteria), plus green chemical processes replacing petro-chemistry.',
      why: 'Connects biotech to global policy; appears in broad GATE questions.',
      how: 'Bioethanol (yeast fermentation), biodiesel (transesterification of oils), biogas (anaerobic digestion → CH4), microalgal CO2 fixation (Chlorella, Spirulina), biological CCU (carbon monoxide utilising acetogens).',
      where: 'Renewable energy, industrial emission capture, sustainable aviation fuel (SAF).',
    },
    college: [
      'Anaerobic digestion: hydrolysis → acidogenesis → acetogenesis → methanogenesis (Archaea produce CH4).',
      'Microalgae: high CO2 uptake, neutral pH (vs plant acidification), non-arable land, lipid for biodiesel.',
      'Bioplastic (PHA) vs petro-plastic lifecycle; biodegradability reduces landfill CH4.',
    ],
    advanced: [
      'Bioenergy with carbon capture (BECCS): net-negative pathway in IPCC scenarios.',
      'Electrofermentation: renewable electricity + CO2 → chemicals (acetate, isobutanol) via engineered E. coli/Clostridium.',
    ],
    gate: {
      highYield: [
        'AD four stages; methanogens are ARCHAEA (not bacteria).',
        'Biofuel feedstocks and their trade-offs (food vs energy).',
        'Microalgal CO2 fixation advantages.',
      ],
      traps: [
        'Methanogens are archaea — a taxonomy trap.',
        'Biodiesel = transesterification (chemical), not fermentation — a process trap.',
      ],
    },
    examples: [
      'Landfill gas (CH4) capture for electricity generation.',
      'Algae SAF demonstrator plants for aviation fuel.'],
    formulas: [],
    keyPoints: [
      'AD stages: hydrolysis → acidogenesis → acetogenesis → methanogenesis (archaea).',
      'Biodiesel = transesterification; bioethanol = fermentation.',
      'Microalgae fix CO2 without arable land.',
    ],
    revision: {
      remember: 'Methane = archaea; biodiesel = chemistry, bioethanol = biology.',
      mistakes: ['Calling methanogens bacteria.'],
      summary: 'Bioenergy pathways + AD stages + microalgal carbon fixation.',
    },
    related: ['mib-fermentation', 'env-bioremediation'],
  },
  {
    id: 'env-gate',
    subject: 'environmental-biotechnology',
    name: 'GATE Focus: Environmental Biotech',
    level: 4,
    priority: 'high',
    ord: 8,
    short: 'High-yield environment facts and traps.',
    basic: {
      what: 'A consolidated revision of the most-asked environmental biotech facts: bioremediation logic, wastewater process conditions, and organism identities.',
      why: 'Environment questions reward precise organism/process pairing.',
      how: 'Drill: which organism does what (nitrifier, denitrifier, methanogen, Bt), and under what conditions (aerobic/anoxic/anaerobic).',
      where: 'GATE BT paper.',
    },
    college: [
      'Organism bank: Nitrosomonas (NH3→NO2, aerobic), Nitrobacter (NO2→NO3, aerobic), Dehalococcoides (PCE/TCE, anaerobic), Methanobacterium (CH4, anaerobic, archaea), Bt (Cry toxin, insect).',
      'Condition bank: nitrification = aerobic; denitrification = anoxic; methanogenesis = anaerobic; acidogenesis = anaerobic.',
      'Parameter bank: BOD/COD > 0.3 biotreatable; SRT > 1/µmax nitrifiers; MLSS 2000–4000 mg/L typical.',
    ],
    advanced: [
      'Multi-stage treatment sequencing questions.',
      'Bioaugmentation strain selection criteria (degradability, safety, cost).',
    ],
    gate: {
      highYield: [
        'Organism ↔ process ↔ condition triplets.',
        'Metal non-biodegradability.',
        'Bt alkaline activation.',
      ],
      traps: [
        'Swapping aerobic/anoxic/anaerobic labels — the single biggest trap source.',
        'Methanogen = archaea, not bacteria.',
      ],
    },
    examples: [
      '"Which is anaerobic?" → methanogenesis (not denitrification — that’s anoxic).',
      '"BOD 25, COD 50 → treatable?" → ratio 0.5, yes.'],
    formulas: [],
    keyPoints: [
      'Triplets: organism–process–oxygen condition.',
      'Metals transformed, not destroyed.',
      'Methanogens = archaea.',
    ],
    revision: {
      remember: 'Triplets + the metal exception + archaea methane.',
      mistakes: ['Oxygen-condition swaps.'],
      summary: 'Environmental GATE = organism/process/condition triplets drilled until automatic.',
    },
    related: ['env-wastewater', 'env-bioremediation'],
  },
];

// ============ GENETICS & EVOLUTION ============
export const TOPICS_GEN: Topic[] = [
  {
    id: 'gen-mendel',
    subject: 'genetics-evolution',
    name: 'Mendelian Genetics',
    level: 1,
    priority: 'high',
    ord: 1,
    short: 'Segregation, independent assortment and ratio math.',
    basic: {
      what: 'Mendel’s laws: (1) Segregation — each individual carries two alleles that separate at meiosis; (2) Independent assortment — genes on different chromosomes sort independently. These predict offspring ratios.',
      why: 'All of genetics is built on these ratios; GATE loves probability questions built on them.',
      how: 'Monohybrid cross Aa × Aa → 1 AA : 2 Aa : 1 aa (3:1 phenotypic if complete dominance). Dihybrid AaBb × AaBb → 9:3:3:1. Use Punnett squares or product rule (independent probabilities multiply).',
      where: 'Classic genetics, plant breeding, genetic counselling, biotech strain design.',
    },
    college: [
      'Test cross: cross with homozygous recessive to reveal genotype (1:1 if heterozygous).',
      'Incomplete dominance (4 o’clock flower: 1:2:1 phenotypic) vs codominance (AB blood: both expressed).',
      'Epistasis: 9:3:4 (recessive epistasis), 9:7 (complementary), 12:3:1 (dominant epistasis) — modified dihybrid ratios.',
      'Sex-linked: X-linked recessive (haemophilia) — criss-cross inheritance; males hemizygous.',
    ],
    advanced: [
      'Probability rules: product rule for independent events; sum rule for mutually exclusive paths (e.g. "at least one").',
      'Penetrance and expressivity: genotype does not always give phenotype (variable expressivity).',
    ],
    gate: {
      highYield: [
        'Ratio recognition: 3:1, 1:2:1, 9:3:3:1 and their modifications.',
        'Epistatic ratio families (9:3:4, 9:7, 12:3:1).',
        'Test cross logic.',
        'Product/sum rules for "at least one" questions.',
      ],
      traps: [
        'Incomplete dominance gives 1:2:1 PHENOTYPIC (not just genotypic).',
        'Epistasis changes ratios but NOT the segregation of alleles — a concept trap.',
      ],
    },
    examples: [
      'Two heterozygous (AaBb) parents: P(AABB offspring) = (1/4)(1/4) = 1/16.',
      'P(at least one A_ from Aa × Aa) = 1 − P(aa) = 3/4.'],
    formulas: [
      { name: 'Product rule', expr: 'P(A and B) = P(A)·P(B) (independent)' },
      { name: 'Complement', expr: 'P(at least one) = 1 − P(none)' },
    ],
    keyPoints: [
      'Segregation (1 gene) + independent assortment (2+ genes).',
      'Dihybrid 9:3:3:1 base; epistasis modifies to 9:3:4 / 9:7 / 12:3:1.',
      'Test cross reveals genotype.',
      'Probabilities multiply for independent traits.',
    ],
    revision: {
      remember: '9:3:3:1 is the base; epistasis reshapes; probabilities multiply.',
      mistakes: ['Applying independent assortment to linked genes.'],
      summary: 'Two laws + ratio families + probability rules = Mendelian core.',
    },
    related: ['gen-linkage', 'gen-popgen'],
  },
  {
    id: 'gen-linkage',
    subject: 'genetics-evolution',
    name: 'Linkage & Genetic Mapping',
    level: 2,
    priority: 'high',
    ord: 2,
    short: 'Recombination, centimorgans and map construction.',
    basic: {
      what: 'Genes on the same chromosome do NOT assort independently — they are linked. Crossing over between them produces recombinant offspring; recombination frequency (RF) measures map distance.',
      why: 'Map distance (cM) is the basis of QTL mapping, marker-assisted selection in crops, and GATE numericals.',
      how: 'RF = (recombinants / total) × 100% = map distance in centimorgans (cM) when <~20 cM. Three-point cross: double crossovers reveal gene order; coefficient of interference = 1 − observed DCO/expected DCO.',
      where: 'Crop breeding (MAS), human disease gene mapping, strain engineering.',
    },
    college: [
      'Coupling (AB/ab) vs repulsion (Ab/aB) phases; test cross distinguishes.',
      'Haldane’s mapping function: d = −(1/2) ln(1 − 2r) (accounts for multiple crossovers).',
      'CentiMorgan: 1% recombination = 1 cM; no crossing over in most bacterial conjugation (except rare Hfr).',
      'Bacterial genetics: conjugation (F+ × F−), Hfr mapping by interruptive mating, transduction (P1, P22), transformation.',
    ],
    advanced: [
      'Chiasma interference: one crossover reduces the chance nearby (positive interference).',
      'Linkage drag in MAS: selecting a trait drags linked flanking segments — fine mapping reduces it.',
    ],
    gate: {
      highYield: [
        'RF → cM conversion; 50 cM ≈ independent assortment.',
        'Three-point cross order determination (DCO identifies middle gene).',
        'Interference = 1 − (observed DCO/expected).',
        'Hfr mapping = time of entry (minutes).',
      ],
      traps: [
        'RF MAXES at 50% (beyond that = unlinked, not 60%).',
        'DCO count must be ADDED to both single classes before computing RF (classic mapping error).',
      ],
    },
    examples: [
      '120 recombinants of 2000 total → RF = 6% → 6 cM.',
      'Hfr strain: leu enters at 19 min, thr at 0 min → order thr–leu with 19 cM-ish spacing.'],
    formulas: [
      { name: 'Recombination frequency', expr: 'RF = (N_recombinant / N_total) × 100' },
      { name: 'Interference', expr: 'I = 1 − (DCO_obs / DCO_expected)' },
      { name: 'Haldane map', expr: 'd = −(1/2) ln(1 − 2r)' },
    ],
    keyPoints: [
      '1% RF = 1 cM; cap at 50%.',
      'DCO reveals gene order; add DCO to singles for RF.',
      'Interference: observed < expected crossovers.',
      'Hfr = time-of-entry mapping.',
    ],
    revision: {
      remember: 'cM = %RF (≤50); DCO = order; I = 1 − O/E.',
      mistakes: ['Computing RF without adding DCO to single crossover classes.'],
      summary: 'Linkage + three-point mapping + interference + bacterial mapping methods.',
    },
    related: ['gen-mendel', 'gen-mutation'],
  },
  {
    id: 'gen-mutation',
    subject: 'genetics-evolution',
    name: 'Mutation & DNA Repair',
    level: 2,
    priority: 'high',
    ord: 3,
    short: 'Point mutations, frameshifts and the repair toolbox.',
    basic: {
      what: 'A mutation is a permanent change in DNA sequence. Types: point (substitution: missense, nonsense, silent), insertions/deletions (frameshift if not a multiple of 3), and larger (duplications, inversions). Cells repair many with dedicated systems.',
      why: 'Mutation creates the variation evolution and breeding act on; repair defects cause disease (e.g. xeroderma).',
      how: 'Spontaneous: depurination, deamination (C→U), tautomerisation. Induced: UV (thymine dimers), alkylating agents, base analogs. Repair: excision (base, nucleotide, mismatch), photoreactivation, recombination, SOS response (RecA–LexA).',
      where: 'Cancer genetics, mutagenesis screens, biotech strain improvement, evolutionary studies.',
    },
    college: [
      'Silent (no aa change), missense (aa change), nonsense (stop codon), frameshift (downstream chaos).',
      'Antisense suppressors: tRNAs that read stop codons (UAG suppressor).',
      'Nucleotide excision repair (NER): UVRABC excises UV dimers; Xeroderma pigmentosum = NER defect.',
      'Mismatch repair (MutS/MutL/MutH in bacteria; MSH/MLH in eukaryotes); defective → Lynch syndrome, microsatellite instability.',
      'SOS: RecA* (coproteinator) → LexA autoproteolysis → repair/gene induction (uvrA, sulA, recA).',
    ],
    advanced: [
      'Base excision repair: glycosylases remove damaged base (e.g. O6-methylguanine by MGMT direct repair).',
      'Translesion synthesis: error-prone polymerases (Pol ζ) replicate through lesions — mutagenic but survival-critical.',
      'CRISPR as targeted mutagenesis vs classical screens (ENU, EMS, nitrosoguanidine).',
    ],
    gate: {
      highYield: [
        'Mutation type → effect mapping (silent/missense/nonsense/frameshift).',
        'UV → thymine dimer → NER; XP = NER defect.',
        'SOS pathway: RecA + LexA logic.',
        'Mismatch repair genes (MutS/L/H; MSH/MLH).',
      ],
      traps: [
        'A +1 insertion shifts ALL downstream codons; a +3 insertion shifts only one residue.',
        'Silent mutation still MUTATES the DNA — it just doesn’t change the protein.',
      ],
    },
    examples: [
      'Sickle cell: single A→T, Glu→Val at β-globin position 6 (missense with dramatic effect).',
      'ENU mutagenesis for forward genetic screens in C. elegans.'],
    formulas: [],
    keyPoints: [
      'Point = substitution; indel = frameshift (unless ×3).',
      'UV → pyrimidine dimers → NER (XP defect).',
      'SOS: RecA stimulates LexA cleavage → repair genes ON.',
      'MMR defect → MSI (cancer hallmark).',
    ],
    revision: {
      remember: 'UV-dimer-NER-XP; SOS = RecA+LexA; MMR = MSI.',
      mistakes: ['Calling a +3 indel a frameshift.'],
      summary: 'Mutation taxonomy + repair systems + SOS logic + disease links.',
    },
    related: ['gen-mendel', 'mol-replication', 'gen-evolution'],
  },
  {
    id: 'gen-popgen',
    subject: 'genetics-evolution',
    name: 'Population Genetics (Hardy–Weinberg)',
    level: 2,
    priority: 'high',
    ord: 4,
    short: 'Allele frequencies and the equilibrium equations.',
    basic: {
      what: 'Population genetics studies allele frequencies in populations. Hardy–Weinberg equilibrium (HWE) says: without evolution, p² + 2pq + q² stays constant. Deviations reveal selection, drift, migration or inbreeding.',
      why: 'HWE is the most reliable NUMERICAL in GATE genetics — pure formula.',
      how: 'p + q = 1 (two alleles); p² + 2pq + q² = 1 (genotypes). From phenotype frequencies (recessive = q²), compute q = √freq, p = 1 − q, carrier freq = 2pq.',
      where: 'Genetic counselling (carrier risk), conservation genetics, forensics, evolutionary inference.',
    },
    college: [
      'HWE assumptions: random mating, no mutation, no migration, infinite size, no selection — 5 conditions.',
      'Genetic drift: random allele frequency change; strong in small populations; bottleneck and founder effects.',
      'Selection: fitness w; selection coefficient s; recessive deleterious alleles purge slowly (hidden in carriers).',
      'Gene flow: migration changes p by m(pm − p).',
    ],
    advanced: [
      'Heterozygote advantage (sickle cell: HbAS resistant to malaria) maintains polymorphism.',
      'Inbreeding coefficient F: observed het = (1 − F)·2pq.',
      'Effective population size: Ne = 4NfNm/(Nf + Nm) with sex-biased ratios.',
    ],
    gate: {
      highYield: [
        'p² + 2pq + q²; q = √(recessive frequency).',
        'Carrier frequency 2pq (classic "1 in 10,000 affected → 1 in 50 carriers").',
        '5 HWE assumptions (list them exactly).',
        'Drift strength ∝ 1/N.',
      ],
      traps: [
        'q = √(frequency of HOMOZYGOUS RECESSIVE), not of the recessive PHENOTYPE in X-linked cases (males: q directly).',
        'X-linked HWE: males show q directly (hemizygous) — a classic variation trap.',
      ],
    },
    examples: [
      'Cystic fibrosis 1/2500 affected → q = 1/50, p = 49/50 → carriers 2pq ≈ 1/25.',
      'Malaria regions: HbA/HbS polymorphism by heterozygote advantage.'],
    formulas: [
      { name: 'HWE', expr: 'p² + 2pq + q² = 1; p + q = 1' },
      { name: 'Carrier frequency', expr: '2pq' },
      { name: 'Migration', expr: 'p′ = (1−m)p + m·pm' },
    ],
    keyPoints: [
      'q = √(q²); carriers = 2pq.',
      'X-linked: male frequency = q directly.',
      'Drift ∝ 1/N; 5 HWE assumptions.',
      'Heterozygote advantage maintains polymorphism.',
    ],
    revision: {
      remember: '√ affected = q; 2pq carriers; X-linked male = q.',
      mistakes: ['Taking √ of carrier or total recessive phenotype in X-linked questions.'],
      summary: 'HWE arithmetic + 5 assumptions + drift/selection/migration modifications.',
    },
    related: ['gen-mendel', 'gen-evolution', 'num-hardy-weinberg'],
  },
  {
    id: 'gen-evolution',
    subject: 'genetics-evolution',
    name: 'Evolution & Speciation',
    level: 2,
    priority: 'high',
    ord: 5,
    short: 'Natural selection, mechanisms and how species form.',
    basic: {
      what: 'Evolution is change in allele frequencies over generations. Natural selection acts on variation; speciation splits lineages. Evidence: fossils, homologous structures, molecular clocks, biogeography.',
      why: 'GATE covers mechanisms, evidence types, and classic case studies (peppered moth, antibiotic resistance).',
      how: 'Selection types: directional (trait shifts), stabilising (intermediate favoured), disruptive (extremes favoured). Speciation: allopatric (geographic barrier) vs sympatric (polyploidy in plants, habitat shift).',
      where: 'Evolutionary medicine (resistance), conservation, origin-of-resistance questions.',
    },
    college: [
      'Microevolution (allele freq) vs macroevolution (lineage splitting).',
      'Polyploidy: instantaneous speciation in plants (allotetraploids, e.g. wheat, cotton).',
      'Molecular clock: neutral mutation rate ≈ constant → divergence time; calibrated by fossils.',
      'Horizontal gene transfer (prokaryotes): conjugation, transduction, transformation — blurs the tree of life.',
    ],
    advanced: [
      'Punctuated equilibrium (Eldredge–Simpsón) vs gradualism; stasis in the fossil record.',
      'Ring species (Larus gulls): continuous intergradation around a barrier — speciation in action.',
    ],
    gate: {
      highYield: [
        'Selection type → curve shape mapping (directional/stabilising/disruptive).',
        'Allopatric vs sympatric (polyploidy = sympatric in plants).',
        'Molecular clock logic and calibration.',
        'HGT as non-vertical inheritance in prokaryotes.',
      ],
      traps: [
        'Stabilising selection REDUCES variance (favouring the mean), not extremes.',
        'Sympatric speciation is RARE in animals, COMMON in plants (polyploidy).',
      ],
    },
    examples: [
      'Peppered moth: directional selection during industrial soot (then reversal).',
      'Wheat (Triticum aestivum) = allopolyploid (AABBDD).'],
    formulas: [],
    keyPoints: [
      'Evolution = allele frequency change.',
      '3 selection types by curve shape.',
      'Allopatric = geography; sympatric (plants) = polyploidy.',
      'Molecular clock needs fossil calibration.',
    ],
    revision: {
      remember: 'Curves = selection types; polyploidy = plant sympatric speciation.',
      mistakes: ['Calling stabilising selection "favouring extremes".'],
      summary: 'Mechanisms + selection types + speciation modes + evidence + HGT caveat.',
    },
    related: ['gen-popgen', 'gen-mutation'],
  },
  {
    id: 'gen-molevol',
    subject: 'genetics-evolution',
    name: 'Molecular Evolution & Phylogenomics',
    level: 3,
    priority: 'medium',
    ord: 6,
    short: 'Neutral theory, dN/dS and deep phylogeny.',
    basic: {
      what: 'Molecular evolution studies how DNA sequences change over time. The neutral theory (Kimura) says most molecular changes are neutral, fixed by drift; selection is visible as the dN/dS ratio.',
      why: 'dN/dS is THE molecular evolution number GATE asks about.',
      how: 'dN = nonsynonymous substitutions/site; dS = synonymous substitutions/site. dN/dS = 1 → neutral; < 1 → purifying (conserved); > 1 → positive (adaptive) selection.',
      where: 'Virus evolution (HIV), protein engineering (conserved residues), phylogenomics.',
    },
    college: [
      'Synonymous sites are "nearly neutral" — molecular clock material.',
      'Genome duplication (WGD) + gene loss: birth-and-death model for gene families (paralogs).',
      'Orthologs (speciation) vs paralogs (duplication): orthologs usually share function.',
      'Convergent evolution at molecular level (e.g. similar enzyme mechanisms in unrelated taxa).',
    ],
    advanced: [
      'Branch-site models (PAML codeml) test positive selection on specific lineages.',
      'Incomplete lineage sorting: gene trees ≠ species trees without coalescent methods.',
    ],
    gate: {
      highYield: [
        'dN/dS interpretation (0, 1, >1).',
        'Ortholog vs paralog definition.',
        'Neutral theory: drift fixes neutral changes; rate ≈ mutation rate.',
      ],
      traps: [
        'dN/dS > 1 = POSITIVE selection (adaptive), not "faster mutation".',
        'Paralogs can have diverged functions — do NOT assume shared function.',
      ],
    },
    examples: [
      'PRB1 (African green monkey) dN/dS ≈ 0.1 → strong purifying selection.',
      'MHC genes: some sites dN/dS > 1 → balancing selection for pathogen diversity.'],
    formulas: [
      { name: 'Omega', expr: 'ω = dN/dS (0 purifying, 1 neutral, >1 positive)' },
    ],
    keyPoints: [
      'ω = 1 neutral, <1 purifying, >1 positive.',
      'Ortholog = speciation; paralog = duplication.',
      'Neutral theory: clock ≈ mutation rate.',
    ],
    revision: {
      remember: 'ω<1 conserve, >1 adapt; ortho=speciation, para=duplication.',
      mistakes: ['Interpreting ω>1 as "more mutations".'],
      summary: 'Neutral theory + dN/dS logic + ortholog/paralog + gene family models.',
    },
    related: ['inf-phylo', 'gen-evolution'],
  },
  {
    id: 'gen-quant',
    subject: 'genetics-evolution',
    name: 'Quantitative Genetics & Heritability',
    level: 3,
    priority: 'medium',
    ord: 7,
    short: 'Polygenic traits, heritability and breeder’s equation.',
    basic: {
      what: 'Quantitative traits (height, yield, milk) are polygenic and environmental. Heritability (h²) is the fraction of phenotypic variance from additive genetics. The breeder’s equation predicts response to selection: R = h²·S.',
      why: 'Breeding programs (crops, livestock) run on this math; GATE quantitative genetics numericals.',
      how: 'VP = VG + VE + (G×E); VG = VA (additive) + VD (dominance) + VI (interaction). Narrow-sense h² = VA/VP. Response R = h² × selection differential S.',
      where: 'Plant breeding, animal husbandry, human twin studies.',
    },
    college: [
      'Twin studies: MZ concordance vs DZ concordance → genetic contribution.',
      'Heritability is POPULATION- and ENVIRONMENT-specific (not a species constant).',
      'Broad-sense H² = VG/VP (includes dominance + epistasis).',
      'Threshold traits (disease) use liability scale; threshold models for multifactorial disorders.',
    ],
    advanced: [
      'G×E interaction: genotype × environment variance; reaction norms.',
      'Genomic selection: GEBV (genomic estimated breeding values) from SNP markers.',
    ],
    gate: {
      highYield: [
        'VP = VG + VE; narrow vs broad-sense heritability.',
        'Breeder’s equation R = h²S.',
        'Twin concordance logic.',
      ],
      traps: [
        'h² = 0.8 does NOT mean "80% of YOUR trait is genetic" — it’s a population ratio.',
        'Narrow-sense (VA only) is what predicts response to SELECTION, not broad-sense.',
      ],
    },
    examples: [
      'Crop: S = 50 kg/ha, h² = 0.6 → R = 30 kg/ha gain next generation.',
      'Human height h² ≈ 0.8 in developed populations (twin studies).'],
    formulas: [
      { name: 'Variance', expr: 'VP = VG + VE; VG = VA + VD + VI' },
      { name: 'Breeder’s equation', expr: 'R = h² · S' },
    ],
    keyPoints: [
      'R = h²S; h² = VA/VP (narrow).',
      'Heritability is population-specific.',
      'Twin MZ > DZ concordance = genetic effect.',
    ],
    revision: {
      remember: 'R = h²S; population-specific; MZ vs DZ.',
      mistakes: ['Using broad-sense H² for selection response.'],
      summary: 'Variance partitioning + heritability definitions + breeder’s equation.',
    },
    related: ['gen-popgen', 'num-breeder'],
  },
  {
    id: 'gen-gate',
    subject: 'genetics-evolution',
    name: 'GATE Focus: Genetics Numericals & Patterns',
    level: 4,
    priority: 'high',
    ord: 8,
    short: 'HWE, mapping ratios and probability chains.',
    basic: {
      what: 'GATE genetics is the most numerical part of the syllabus: HWE calculations, recombination frequencies, Punnett probabilities, and heritability arithmetic.',
      why: 'Highest predictability per subject — practice patterns, not single questions.',
      how: 'Patterns: (1) carrier risk from affected frequency; (2) three-point map with DCO; (3) multi-gene probability chains; (4) R = h²S.',
      where: 'GATE BT paper.',
    },
    college: [
      'HWE: q = √(q²) → 2pq; X-linked male = q.',
      'Mapping: add DCO to singles; order from DCO; interference 1 − O/E.',
      'Probability: product rule chains; "at least one" via complement.',
      'Heritability: variance decomposition from given variances.',
    ],
    advanced: [
      'Bayesian risk: prior × likelihood for genetic counselling scenarios.',
      'Back-cross and test cross ratio recognition (1:1, 1:1:1:1).',
    ],
    gate: {
      highYield: [
        'All four patterns with strict unit/label discipline.',
        'Ratio → cross-type identification (3:1, 1:2:1, 9:3:3:1, 1:1, 1:2:3:2:1).',
      ],
      traps: [
        'Forgetting DCO correction in mapping.',
        'Using p instead of q for X-linked male frequency.',
      ],
    },
    examples: [
      '1/100 affected (autosomal) → q = 0.1 → carriers 2(0.1)(0.9) = 18%.',
      'Parental 4400, SCO1 180, SCO2 220, DCO 6 of 5000 → RF12 = (180+6)/(5000) = 3.72% → order from DCO class.'],
    formulas: [],
    keyPoints: [
      'HWE: √ then 2pq.',
      'Mapping: DCO correction + order + interference.',
      'Probability: multiply independent, complement for "at least".',
    ],
    revision: {
      remember: '√→2pq; DCO fix; R = h²S.',
      mistakes: ['Uncorrected mapping RF.'],
      summary: 'Genetics GATE = 4 numerical patterns drilled to speed and accuracy.',
    },
    related: ['gen-popgen', 'gen-linkage', 'gen-mendel'],
  },
];

export const ALL = [...TOPICS_BAE, ...TOPICS_CEL, ...TOPICS_ENV, ...TOPICS_GEN];
