// Curated quick-revision cards for the Revision Center (subject -> cards).
// Points are deliberately short: the 1-minute revision page shows them as a
// rapid-fire list. Formula sheets are generated from topic.formulas (live).

export interface RevisionCard {
  title: string;
  points: string[];
}

export const REV_EXTRA: Record<string, RevisionCard[]> = {
  an: [
    {
      title: 'Transgenic Animals — High Yield',
      points: [
        'First transgenic cow producing humanized milk protein: ATTRA (1997, α1-antitrypsin).',
        'Promoter choice decides where protein goes: milk (β-lactoglobulin), egg white, blood.',
        'Pomato-type fusion: somatic cell nuclear transfer (SCNT) for cloning + transgene.',
        'Ethics: animal welfare, patent issues, public acceptance — frequently asked in essay-type MCQs.',
      ],
    },
    {
      title: 'Stem Cells & Embryo',
      points: [
        'ESC: inner cell mass of blastocyst; self-renewal + pluripotency.',
        'iPSC: Yamanaka factors — Oct4, Sox2, Klf4, c-Myc (2006, Nobel 2012).',
        'ESCs need feeders + LIF to stay undifferentiated.',
        'Preimplantation genetic testing (PGT) — single-cell PCR on blastomere.',
      ],
    },
    {
      title: 'Biopharmaceuticals from Animals',
      points: [
        'Hybridoma (Köhler & Milstein 1975): B cell + myeloma = monoclonal antibody.',
        'Transgenic mice (XenoMouse, HuMab) make human mAbs against mouse antigens.',
        'Common therapeutics: insulin, FSH, growth hormone, clotting factors IX.',
        'Milk/blood harvest is an upstream cost driver — know the comparison with CHO cells.',
      ],
    },
  ],
  bio: [
    {
      title: 'Protein Structure & Denaturation',
      points: [
        'Primary (sequence) → secondary (α-helix, β-sheet; H-bonds) → tertiary (3D; hydrophobic core) → quaternary (subunits).',
        'Forces: H-bond, ionic, van der Waals, hydrophobic; disulfide bridges stabilize tertiary.',
        'Denaturation = loss of 3°/4°; primary stays. Reversible only in mild conditions.',
        'SDS-PAGE: separates by molecular weight (uniform −charge). Native PAGE: by charge + size.',
      ],
    },
    {
      title: 'Enzyme Kinetics (Most Repeated)',
      points: [
        'v = Vmax[S] / (Km + [S]); Km = [S] at v = Vmax/2 (affinity: lower Km → higher affinity).',
        'Competitive: ↑Km, Vmax unchanged (inhibitor binds active site).',
        'Uncompetitive: Km and Vmax both ↓ (binds E-S).',
        'Non-competitive: Vmax ↓, Km unchanged (binds anywhere).',
        'Allosteric: sigmoidal, cooperativity n>1 (Hill); T-state ↔ R-state.',
      ],
    },
    {
      title: 'Metabolism Numbers',
      points: [
        'Glycolysis: 1 glucose → 2 pyruvate + 2 ATP (net) + 2 NADH; PFK-1 is the key regulated step.',
        'TCA per acetyl-CoA: 3 NADH + 1 FADH2 + 1 GTP; isocitrate dehydrogenase = major control point.',
        'ETC: Complex I, III, IV pump protons; NADH → ~2.5 ATP, FADH2 → ~1.5 ATP (modern values).',
        'Substrate-level phosphorylation: glycolysis + TCA (GTP). Oxidative: ETC only.',
      ],
    },
    {
      title: 'Central Dogma',
      points: [
        'Replication: semi-conservative (Meselson-Stahl 1958); leading (continuous) + lagging (Okazaki 1000–2000 nt).',
        'Prokaryotic promoter: −10 (TATAAT) + −35 (TTGACA); σ70 factor; termination ρ-dependent/independent.',
        'Translation: AUG (Met) start; tRNA charged by aminoacyl-tRNA synthetase; wobble (3rd base).',
        'Stop codons: UAA, UAG, UGA — no tRNA, release factors act.',
      ],
    },
  ],
  inf: [
    {
      title: 'Databases & Search',
      points: [
        'NCBI (US): GenBank, PubMed, BLAST, RefSeq. EBI (Europe): EMBL, UniProt, Ensembl. DDBJ (Japan): DNA Data Bank of Japan.',
        'E-value = expected matches by chance; lower = more significant (1e-50 beats 1e-5).',
        'BLAST: word hit → extend → score. BLASTN (DNA-DNA), BLASTP (protein-protein), BLASTX (translated), PSI-BLAST (iterative, distant).',
        'FASTA: dot plot for local similarity. Pairwise = 2 sequences; multiple alignment needs >2.',
      ],
    },
    {
      title: 'Alignment & Matrices',
      points: [
        'Global: Needleman-Wunsch (dynamic programming) — whole sequence.',
        'Local: Smith-Waterman — score never drops below 0; finds domains.',
        'BLOSUM62: dissimilar proteins (default for BLASTP). BLOSUM62 = built from 62% identity blocks. PAM250: similar proteins.',
        'Score = M×matches − m×mismatches − (gap_open + gap_extend×(len−1)).',
      ],
    },
    {
      title: 'Structure & Phylogeny',
      points: [
        'PDB = Protein Data Bank; Ramachandran plot (φ, ψ) — α-helix (−60°, −45°), β-sheet (−120°, +120°).',
        'Motifs: zinc finger (DNA binding), leucine zipper (dimer), SH2/SH3 (signaling).',
        'UPGMA: additive, assumes constant rate (molecular clock). NJ: allows different rates.',
        'Bootstrap ≥ 70% → node considered robust.',
      ],
    },
  ],
  ins: [
    {
      title: 'Biosensors',
      points: [
        '1st gen: enzyme + O2 (glucose oxidase) — O2-limited in high glucose (saturation).',
        '2nd gen: direct electron transfer. 3rd gen: redox mediators (ferrocene) shuttling electrons.',
        'FIA (flow injection) vs PIA: FIA has plug of sample in carrier — better precision, no O2 limitation.',
        'Clark DO electrode: membrane, Pt cathode, Ag/AgCl anode; consumes O2 → calibration with N2-saturated & air-saturated water.',
      ],
    },
    {
      title: 'Transducers',
      points: [
        'pH: glass membrane electrode, Nernst slope ~59 mV/pH at 25 °C. Thermocouple: Seebeck effect, mV output; type K = most common.',
        'RTD: Pt100 = 100 Ω at 0 °C, +0.385 Ω/°C. Thermistor: NTC, high sensitivity, non-linear.',
        'Strain gauge: ΔR/R = G·ε; used in load cells (weighing).',
        'Accuracy = closeness to true; precision = repeatability; sensitivity = Δoutput/Δinput; hysteresis = loading vs unloading difference.',
      ],
    },
    {
      title: 'Process Analyzers',
      points: [
        'BOD: 5-day, 20 °C, dark, aerobic; DO consumed by microbes. BOD = (DOi − DOf) × dilution factor.',
        'COD: dichromate reflux (2 h); total oxidizable organics (BOD < COD always).',
        'TDS: conductivity. Turbidity: 90° light scatter (nephelometer). Viscosity: capillary / rotational viscometer.',
        'Spectrophotometer: Beer-Lambert A = εcl; calibration curve = 4-point minimum for GATE numericals.',
      ],
    },
  ],
  bae: [
    {
      title: 'Reactor Types — One-liners',
      points: [
        'Batch: concentrations vary with time; t = t_grow + t_downstream; best for expensive/bulk small batches.',
        'CSTR: 100% back-mixed; outlet = reactor conditions; S = D·S0 / (μmax − D) at steady state.',
        'PFR: no axial mixing; V = ln(X0/X)/(k·τ) for 1st-order decay; best OTR per volume.',
        'Fed-batch: sterile feed, no outflow; avoids substrate inhibition & product toxicity; highest cell density.',
      ],
    },
    {
      title: 'Growth & Oxygen',
      points: [
        'Monod: μ = μmax·S/(Ks + S). Doubling time td = 0.693/μmax. X = X0·e^(μt) in log phase.',
        'kLa (CL method): COT — kLa = (C* − C) / [t·ln((C*−C0)/(C*−C))]. CL — kLa = (1/(C*−C0))·(dC/dt) at start.',
        'Power: P = Np·ρ·N³·D⁵; specific power P/V; tip speed = π·N·D.',
        'OTR = kLa(C* − C); COT = μ·Y_X/O; balance at steady state for aerobic design.',
      ],
    },
    {
      title: 'Scale-Up (frequent 5-markers)',
      points: [
        'Geometric similarity: all linear dims × same factor; V scales as D³.',
        'Constant Np (agitation-limited) vs constant kLa (aeration-limited) vs constant tip speed — pick the controlling criterion.',
        'Impeller tip speed must NOT exceed ~10 m/s (cell damage).',
        'Oxygen demand rises with cell density; small-scale good kLa ≠ large-scale good kLa (gas holdup ↑ with scale).',
      ],
    },
    {
      title: 'Downstream Basics',
      points: [
        'Primary: cell removal (centrifuge, filter) + clarification. Secondary: product isolation + polishing.',
        'RCF = 1.119×10⁻⁵ · n² · r (n in rpm, r in cm). ×10⁵ g ≈ 10,000 rpm at 10 cm.',
        'Recovery (yield) = cells/protein out / in. Purity = target protein / total protein.',
        'Overall process = product of step recoveries — each 90% step loses 10% cumulatively.',
      ],
    },
  ],
  cel: [
    {
      title: 'Membrane & Transport',
      points: [
        'Fluid mosaic (Singer & Nicolson, 1972): phospholipid bilayer + mosaic of proteins, lateral mobility.',
        'Passive: simple diffusion (down gradient, no energy), facilitated (carrier/channel). Active: Na+/K+ ATPase (3 Na⁺ out : 2 K⁺ in).',
        'Endocytosis: phagocytosis (solids), pinocytosis (liquids), receptor-mediated. Exocytosis: secretion.',
        'Glycocalyx: recognition, immune, tissue compatibility.',
      ],
    },
    {
      title: 'Organelle Cheat-sheet',
      points: [
        'Mitochondria: cristae, oxidative phosphorylation, own circular DNA (maternal inheritance).',
        'Chloroplast: thylakoids (light rxn) + stroma (Calvin); own DNA; double membrane.',
        'Rough ER: protein synthesis (ribosomes). Smooth ER: lipids, detox, Ca²⁺ storage.',
        'Golgi: cis → medial → trans; glycosylation + sorting. Lysosome: hydrolytic enzymes, pH ≈ 5.',
        'Centrioles: 9 triplets; absent in most plant cells.',
      ],
    },
    {
      title: 'Cell Cycle & Death',
      points: [
        'G1 → S (replication) → G2 → M. Cyclin-CDK complexes drive transitions (Cyclin D-CDK4 in G1).',
        'Checkpoints: G1/S (p53/Rb — G1 arrest), G2 (DNA damage), M (spindle assembly).',
        'Apoptosis: intrinsic (Bax/Bcl-2 → cytochrome c → caspase cascade) vs extrinsic (Fas/FasL, death receptor). No inflammation (vs necrosis).',
        'Caspases: initiator (caspase-8/9) → executioner (caspase-3) → DFF/pyrimidase.',
      ],
    },
    {
      title: 'Microscopy Numbers',
      points: [
        'Light: 0.2 µm (Abbe limit). TEM: ~0.1–1 nm, thin sections, vacuum, internal detail.',
        'SEM: 3D surface, specimen coated (Au/Pt). Confocal: optical sectioning, fluorescent, 3D stacks.',
        'Immunofluorescence: primary + secondary antibody (fluorophore) — specific localization.',
        'Phase-contrast / DIC: phase shift → contrast, no staining.',
      ],
    },
  ],
  env: [
    {
      title: 'Wastewater Treatment Chain',
      points: [
        'Screens → grit chamber → primary (sedimentation, 30–40% BOD removal) → secondary (activated sludge, 85–95% BOD) → tertiary (nutrient removal, disinfection).',
        'BOD5: 5 days, 20 °C, aerobic, dark; BOD5 ≈ 68% of ultimate BOD (L0). BODt = L0(1 − e^(−kt)); k ≈ 0.23 d⁻¹ (20 °C).',
        'MLSS 2000–4000 mg/L; SVI = MLSS (mg/L) / SV30 (mL) — 80–150 good sludge.',
        'SRT (sludge retention time) controls biology: high SRT → nitrifiers grow.',
      ],
    },
    {
      title: 'Bioremediation',
      points: [
        'Intrinsic (monitored natural attenuation) vs enhanced (stimulation: nutrients/O2).',
        'Aerobic biodegradation: complete mineralization. Anaerobic: stepwise (hydrolysis → reduction → methanogenesis).',
        'Phytoremediation: plants (Phytoextraction for metals, rhizodegradation for organics). Mycoremediation: white-rot fungi (ligninolytic enzymes).',
        'Oil spill: Pseudomonas, Alcanivorax. Heavy metals: biosorption (bacterial cell wall, fungal chitosan).',
      ],
    },
    {
      title: 'Composting & Anaerobic Digestion',
      points: [
        'Compost: C:N 25–30:1; thermophilic phase 55–65 °C (pathogen kill); turn for aeration; ~2–6 weeks.',
        'Anaerobic digestion: hydrolysis → acidogenesis → acetogenesis → methanogenesis; biogas ≈ 60–65% CH4.',
        'TS (total solids) 8–10% typical; alkalinity buffers pH 6.8–7.5.',
        'Landfill gas: also CH4 + CO2 (≈ 50:50); leachate = major pollutant.',
      ],
    },
  ],
  gen: [
    {
      title: 'Mendelian Ratios to Memorize',
      points: [
        'Monohybrid F2: 3:1. Dihybrid: 9:3:3:1. Test cross heterozygote: 1:1.',
        'Incomplete dominance: 1:2:1 (snapdragon pink). Codominance: ABO (IAIB = AB).',
        'Sex-linked (X-linked recessive, e.g. colour blindness): carrier × normal → 1/2 sons affected.',
        'Epistasis: 9:7 (complementary), 9:3:4 (recessive), 12:3:1 (dominant), 13:3 (duplicate dominant).',
      ],
    },
    {
      title: 'Hardy-Weinberg (guaranteed numerical)',
      points: [
        'p² + 2pq + q² = 1; p + q = 1. Conditions: no mutation, no selection, no migration, random mating, large N.',
        'q = √(recessive phenotype frequency). p = 1 − q. 2pq = heterozygotes.',
        'Example: aa = 4% → q = 0.2, p = 0.8, Aa = 32%.',
        'Drift: random change, strongest in small populations. Bottleneck + founder effect.',
      ],
    },
    {
      title: 'Linkage & Mapping',
      points: [
        'Recombination frequency (RF) ≤ 50% (independent assortment). 1% RF = 1 cM = 1 map unit.',
        'Gene order: the two smallest RFs are adjacent; the largest spans both.',
        'Three-point cross: double crossovers (DCO) = the rarest phenotypes; coefficient of coincidence = observed DCO / expected; interference = 1 − c.o.c.',
        "Haldane's mapping function: d = −(1/2)·ln(1 − 2r) (map distance in Morgans).",
      ],
    },
    {
      title: 'Quantitative Genetics',
      points: [
        'Phenotypic variance VP = VG + VE. Heritability h² = VG/VP (narrow sense: VA/VP).',
        "Breeder's equation: R = h²·S (response = heritability × selection differential).",
        'Narrow-sense h² is what predicts response to selection.',
        'Quantitative traits: polygenic + environmental (height, yield, milk fat %).',
      ],
    },
  ],
  imm: [
    {
      title: 'Antibodies — The 5 Classes',
      points: [
        'IgG: 70% serum; only class crossing placenta; opsonization; Fc receptor binding.',
        'IgM: pentamer (10S), first response, strongest agglutination, in blood.',
        'IgA: mucosal secretions (milk, saliva), dimer with J-chain.',
        'IgE: allergy / parasites (basophil/eosinophil). IgD: B-cell surface receptor.',
        'Structure: (Fab)2Fc; 2 heavy + 2 light; V-region = binding, C-region = effector.',
      ],
    },
    {
      title: 'T cells & MHC (high confusion)',
      points: [
        'CD4+ Th → MHC II (APCs: macrophage, DC, B cell). CD8+ Tc → MHC I (all nucleated cells).',
        'MHC I: endogenous antigens (viral, tumour) → cytosolic pathway. MHC II: exogenous (phagocytosed) → endosomal.',
        'Killer T cell recognises MHC I + peptide on infected cell → perforin/granzyme → apoptosis.',
        'Superantigen: cross-links MHC II and TCR Vβ outside the pocket → massive T-cell activation (TSST-1, SEB).',
      ],
    },
    {
      title: 'Hypersensitivity (Gell & Coombs)',
      points: [
        'Type I: IgE, mast cells, histamine — anaphylaxis, asthma, hay fever. Minutes.',
        'Type II: IgG/IgM against cell surface — haemolytic disease of newborn, autoimmune haemolytic anaemia. Hours.',
        'Type III: immune complexes — SLE, serum sickness, Arthus reaction. Hours–days.',
        'Type IV: T-cell mediated — TB (Mantoux) test, contact dermatitis (poison ivy), GVHD. Days.',
      ],
    },
    {
      title: 'Vaccines & Tolerance',
      points: [
        'Live-attenuated: MMR, BCG, OPV (oral). Inactivated: Salk polio, rabies, influenza. Subunit: Hep B (recombinant), HPV (VLP). Toxoid: tetanus, diphtheria.',
        'Adjuvants (Al(OH)3) boost response. Memory: class switching + affinity maturation in germinal centres.',
        'Central tolerance: thymus (positive + negative selection), bone marrow (B cells). Peripheral: anergy, deletion, Treg (CD4+CD25+FoxP3+).',
        'Autoimmunity: loss of tolerance — type 1 diabetes (T-cell), Graves (Type II-like antibodies), SLE (Type III).',
      ],
    },
  ],
  mib: [
    {
      title: 'Antibiotics (top GATE subject overlap)',
      points: [
        'β-lactams (penicillin, cephalosporin): inhibit cell wall (transpeptidase/PBP).',
        'Aminoglycosides (streptomycin, gentamicin): 30S, bactericidal, need O2. Tetracyclines: 30S, bacteriostatic.',
        'Macrolides (erythromycin): 50S. Fluoroquinolones (ciprofloxacin): DNA gyrase. Chloramphenicol: 50S.',
        'Secondary metabolite: made in stationary phase; producer is self-resistant. β-lactam ring = amide bond at 4-membered ring.',
      ],
    },
    {
      title: 'Biosynthesis Machinery',
      points: [
        'NRPS (non-ribosomal peptide synthetase): modular, each module = one residue; makes bacitracin, penicillin core.',
        'Polyketide synthase (PKS): acetyl-CoA starter + extender; makes erythromycin, tetracycline.',
        'Ribosomal: small peptides (bacteriocins).',
        'Haloalkaline / extremophile enzymes: industrial interest (alkaline protease for detergents).',
      ],
    },
    {
      title: 'Strain Improvement',
      points: [
        'Classical: UV (254 nm), NTG (N-methyl-N-nitrosoguanidine), EMS (point mutations) + random mutagenesis → selection (antibiotic resistance, auxotrophs).',
        'Modern: site-directed mutagenesis, gene overexpression (promoter engineering), metabolic engineering (pathway balancing), CRISPR knockouts.',
        'Penicillin story: 20 units → 200,000 units/L by random mutagenesis (1940s–60s).',
        'Evolutionary engineering: directed evolution (protein engineering, Koolen & Smith), adaptive lab evolution (ALE).',
      ],
    },
    {
      title: 'Industrial Metabolites',
      points: [
        'Primary: growth-associated (ethanol, lactate, amino acids). Secondary: non-growth (antibiotics, pigments).',
        'Quorum sensing: cell-density-dependent regulation (acyl-homoserine lactone AHL in Gram−; autoinducer-2 in Gram+).',
        'Biofouling control: quorum sensing inhibitors (QSI) — new industrial angle.',
        'Fermentation scale: 100–10,000 L for antibiotics; 50–200 L for recombinant proteins.',
      ],
    },
  ],
  mic: [
    {
      title: 'Classification & Identification',
      points: [
        'Gram-positive: thick peptidoglycan (20–80 nm), no outer membrane, violet. Gram-negative: thin PG (7–8 nm) + outer membrane + LPS (endotoxin), pink.',
        '16S rRNA: universal marker for phylogeny; 2 domains (Bacteria, Archaea) + Eukarya.',
        'Extremophiles: thermophile (60–80 °C, Thermus aquaticus), halophile (Halobacterium), acidophile (pH < 3), piezophile (high pressure).',
        'Viroid: naked ssRNA. Prion: protein-only (Scrapie, BSE, CJD). Virus: obligate intracellular, no metabolism.',
      ],
    },
    {
      title: 'Growth & Continuous Culture',
      points: [
        'Phases: lag (adaptation) → exponential (μmax) → stationary (nutrient depletion + waste) → death (log decline).',
        'Growth yield Y_X/S = ΔX/ΔS. Specific growth rate μ = (1/X)(dX/dt).',
        'Chemostat: sterile feed in, culture out at same rate; steady state when D = μ. Washout at D > μmax.',
        'Turbidostat: controls OD by dilution — keeps cells in log phase.',
      ],
    },
    {
      title: 'Sterilization Math (guaranteed)',
      points: [
        'Autoclave: 121 °C, 15 psi, 15–20 min. Hot air: 160–170 °C, 2 h (glassware, oils).',
        'D-value: time for 90% reduction at fixed T. z-value: ΔT for 10× change in D (spores ≈ 10 °C).',
        'Survivors: log N = log N0 − t/D. N = N0·10^(−t/D).',
        'Overkill: kill more spores than present (safety factor). 0.22 µm filter = absolute for bacteria.',
        'UV: 260 nm absorbed by DNA → thymine dimers; surface/air only, no penetration.',
      ],
    },
    {
      title: 'Viability & Counting',
      points: [
        'Total count: direct (haemocytometer — counts dead + live), electronic counter (Coulter).',
        'Viable count: plate count (CFU), membrane filtration, MPN (Most Probable Number — for sparse samples).',
        'Flow cytometry: fluorescence (SYTO 9 / propidium iodide) for live/dead sorting.',
        'Turbidity: OD600 correlates to biomass; calibration curve needed.',
      ],
    },
  ],
  mol: [
    {
      title: 'Replication — The Enzymes',
      points: [
        'Helicase (unwinds), SSB (prevents re-annealing), Primase (RNA primer), DNA Pol III (elongation, 5′→3′ only), DNA Pol I (removes primer, Klenow = 5′→3′ pol only), Ligase (seals nicks).',
        'Leading: continuous. Lagging: Okazaki fragments (1000–2000 nt prokaryotes, 100–200 eukaryotes).',
        'Topoisomerase: relieves supercoiling (gyrase = DNA Gyrase in E. coli). Telomerase extends 3′ ends in eukaryotes (TTAGGG).',
        'Proofreading: 3′→5′ exonuclease (Pol I/III) — error rate 10⁻⁹ after repair.',
      ],
    },
    {
      title: 'Regulation — lac & trp',
      points: [
        'lac (inducible): repressor binds operator by default; allolactose (inducer) inactivates repressor. cAMP-CAP activates transcription when glucose low (catabolite repression).',
        'trp (repressible): repressor INACTIVE by default; tryptophan (corepressor) activates it. Attenuation: leader peptide termination.',
        'Eukaryotes: histone acetylation (open), methylation (variable), enhancers/silencers, promoter TATA box + TFIID.',
        'Jacob & Monod (1961) — operon model; Nobel 1965.',
      ],
    },
    {
      title: 'Tools — Restriction & PCR',
      points: [
        'EcoRI: 5′-G↓AATTC-3′ (sticky 5′-AATT overhang). HindIII: AAGCTT. BamHI: GGATCC. SmaI: CCC↓GGG (blunt).',
        'PCR: 94–95 °C denature → 50–65 °C anneal (Tm − 5 °C) → 72 °C extend (Taq, ~1 kb/min). 2^n copies.',
        'Sanger: ddNTP chain terminator, 4 reactions or dyes. Gel: ethidium bromide, 0.8–2% agarose.',
        'Southern (DNA), Northern (RNA), Western (protein), Eastern (PTMs) — all probe-based.',
      ],
    },
    {
      title: 'Vectors — Size Ladder',
      points: [
        'Plasmid: 1–20 kb (pUC18: ori, ampR, MCS, lacZ α-comp, blue-white).',
        'Cosmid: 38–45 kb. BAC (Bacterial Artificial Chromosome): 300–350 kb. YAC (Yeast): 100–2000 kb.',
        'Viral: adeno (transient, no integration), retro (integrates), AAV (low immunogenic, ~4.7 kb cap).',
        'Genomic library = whole genome (restriction digest). cDNA library = expressed genes (reverse transcriptase).',
      ],
    },
  ],
  plb: [
    {
      title: 'Tissue Culture Basics',
      points: [
        'Totipotency: any plant cell can regenerate whole plant (Steward 1958, carrot).',
        'Auxin:cytokinin: high auxin → root, balanced → callus, high cytokinin → shoot (Skoog & Miller 1957).',
        'Protocorm: orchid-specific (MS medium). Aposporous embryo culture → doubled haploids.',
        'Cryopreservation: vitrification (DMSO + glycerol, liquid N2, −196 °C). Somaclonal variation = genetic instability in culture.',
      ],
    },
    {
      title: 'Transformation Methods',
      points: [
        'Agrobacterium tumefaciens: Ti plasmid → T-DNA transfer (vir genes); disarmed Ti = binary vector (T-DNA without oncogenes).',
        'Gene gun (biolistics): Au/Pb particles coated with DNA — for recalcitrant species (recalcitrant = hard to transform).',
        'Protoplast: cell wall removed (cellulase + pectinase); PEG or electroporation for fusion (somatic hybridization).',
        'CRISPR-Cas9: 1987 (Mojica discovered repeats), 2012 (Jinek et al. — proof as editing tool), 2020 Nobel (Doudna & Charpentier).',
      ],
    },
    {
      title: 'Transgenic Crops (GATE-favourite)',
      points: [
        'Bt cotton (Cry1Ac, Bollgard I 1996; Bollgard II = Cry1Ac + Cry2Ab). Bt brinjal: India 2017.',
        'Golden Rice: β-carotene (pro-vitamin A), psbA + crtI + crtB, 1992 (Ingo Potrykus).',
        'Virus resistance: CaMV 35S promoter + coat protein gene (CMV) — pathogen-derived resistance.',
        'Herbicide-tolerant: cp4-EPSPS (Roundup Ready soybean). Gene stacking = multiple traits.',
      ],
    },
    {
      title: 'Breeding & Genomics',
      points: [
        'Heterosis (hybrid vigour): F1 > both parents; inbreeding depression is the opposite.',
        'Male sterility: cytoplasmic (S) + nuclear (ms) — three-line hybrid system. Restorer gene (Rf).',
        'Somatic hybridization: protoplast fusion (Pegman et al. 1978 — carrot + Daucus carota = somatic hybrid "pomato" precursor).',
        'Molecular markers: RFLP (Southern), RAPD (arbitrary primer PCR), ISSR (intragenic), SSR (microsatellite — most used), AFLP.',
      ],
    },
  ],
  pro: [
    {
      title: 'QbD & Process Design',
      points: [
        'QbD (Quality by Design): ICH Q8 — design quality in, don\'t test it in. QTPP → CQA → CPP.',
        'CQA: attribute affecting safety/efficacy (purity, endotoxin, aggregation). CPP: parameter to control (T, pH, agitation).',
        'Design space: multi-dimensional combination of CPPs giving acceptable CQA (Patent Box).',
        'Scale-down model: small reactor mimicking large one (constant kLa, tip speed, or P/V).',
      ],
    },
    {
      title: 'Downstream Processing Steps',
      points: [
        'Primary: harvest (centrifuge/filter) → clarify (membrane, flocculation). Secondary: concentrate (ultrafiltration) → purify (chromatography).',
        'Chromatography: ion-exchange (charge), affinity (specific binding — Protein A for IgG), size-exclusion (hydrodynamic size), HIC (hydrophobic).',
        'Protein A affinity = 90–95% purity in one step (industry standard for mAbs).',
        'Polishing: anion exchange + virucidal nanofilter (20 nm) + 0.2 µm sterilizing.',
      ],
    },
    {
      title: 'Bioprocessing',
      points: [
        'Upstream: strain development → seed train (flask → 5 L → 100 L → production) → bioreactor (batch / fed-batch / continuous / perfusion).',
        'Aseptic: sterilize everything, zero contamination; closed system; HEPA filters, steam-in-place (SIP), CIP (clean-in-place).',
        'CHO cells: 70% of therapeutic proteins; suspension culture, no anchorage.',
        'Analytical: HPLC, CE, IEF (isoelectric focusing), ELISA, qPCR, flow cytometry (viability).',
      ],
    },
    {
      title: 'Cell & Gene Therapy',
      points: [
        'CAR-T: T cells + chimeric antigen receptor (scFv + hinge + CD3ζ); CD19 target (leukaemia); on-target/off-tumour toxicity; CRS (cytokine release).',
        'Gene therapy: AAV (in vivo, single-dose), lentiviral (ex vivo, integrates). X-gene (Luxturna, RPE65) = first FDA approval (2017).',
        'CRISPR therapy: Casgevy (sickle cell, 2023) — ex vivo, AAV-free delivery.',
        'Biomaterials: scaffolds (PCL, collagen), hydrogels; biocompatibility = non-toxic, non-thrombogenic.',
      ],
    },
  ],
  rdt: [
    {
      title: 'Cloning Essentials',
      points: [
        'Restriction enzyme (II type): cuts at specific 4–8 bp (EcoRI = GAATTC). Isoschizomers: different enzymes, same site (HpaII & MspI = CCGG). Neoschizomers: related sites.',
        'Sticky ends: 5′ overhang (EcoRI, HindIII). Blunt: no overhang (SmaI).',
        'Ligase: forms phosphodiester bond; needs ATP (T4 ligase). Sticky > blunt (30–100× faster).',
        'pUC18: ori (ColE1), ampR (β-lactamase), MCS, lacZ (α-complementation). Blue-white: X-gal + IPTG; white = recombined.',
      ],
    },
    {
      title: 'Key Enzymes Table',
      points: [
        'EcoRI: GAATTC. HindIII: AAGCTT. BamHI: GGATCC. XhoI: CTCGAG. SmaI: CCCGGG (blunt).',
        'Klenow: large fragment of Pol I — 5′→3′ pol, no 5′→3′ exonuclease (used in dNTP labelling).',
        'Taq: 72 °C optimum, thermostable, no proofreading (3′→5′ exonuclease absent).',
        'Reverse transcriptase: RNA → cDNA (HIV, MMLV). Used for cDNA library + RT-PCR.',
      ],
    },
    {
      title: 'Library Types',
      points: [
        'Genomic library: whole genome, restriction digest + vector; ~10⁶ clones for human genome in λ.',
        'cDNA library: expressed genes only (mRNA → reverse transcriptase). 2× smaller (no introns).',
        'Shotgun: random fragments (WGS). COS-mid: 38–45 kb; YAC: 100–2000 kb (for large genomes).',
        'Screening: hybridization (probe), colony PCR, blue-white, expression (antibody).',
      ],
    },
    {
      title: 'Applications (GATE focus)',
      points: [
        'qPCR: real-time, Cq/Ct value; ΔΔCt method for relative quantification; 2^(−ΔΔCt).',
        'Proteomics: 2D-PAGE (IEF + SDS-PAGE), mass spec (MALDI-TOF), iTRAQ.',
        'Transcriptomics: microarray vs RNA-seq (RNA-seq = better dynamic range, no probe bias).',
        'Metagenomics: 16S rRNA gene amplicon sequencing for microbial communities (no culture needed).',
        'Phage display: antibody/peptide selection from phage library (Kozma & Smith 1985).',
      ],
    },
  ],
  trp: [
    {
      title: 'Fluid Mechanics',
      points: [
        'Re = ρvD/μ. Laminar < 2300, transitional 2300–4000, turbulent > 4000.',
        'Darcy-Weisbach: ΔP = f(L/D)(ρv²/2). Darcy f (Moody); Fanning f = Darcy/4.',
        'Bernoulli: P + ½ρv² + ρgh = const (inviscid, incompressible, along streamline).',
        'Minor losses: K·(ρv²/2) per fitting (elbow K≈0.5, valve K≈0.2–1). NPSH_a = P_atm/ρg + h_s − h_f − P_vap/ρg.',
      ],
    },
    {
      title: 'Heat Transfer',
      points: [
        'Conduction: Q = kAΔT/L (W). Convection: Q = hAΔT (W). Radiation: Q = εσA(T⁴ − T₀⁴) (W).',
        'LMTD: (ΔT1 − ΔT2)/ln(ΔT1/ΔT2). Counter-current > parallel (LMTD higher).',
        'Overall U: 1/UA = 1/hA + R_wall + 1/hA (series resistances). Fouling factor adds R_f.',
        'Q = m·cp·ΔT (sensible). Finned surface: effectiveness = Q_fin/(hA_fin ΔT).',
      ],
    },
    {
      title: 'Mass Transfer',
      points: [
        'Fick: J = −D·(dC/dx). Gas D ≈ 10⁻⁵ m²/s, liquid D ≈ 10⁻⁹ m²/s.',
        'Two-film theory: N_A = K_y·(y − y*), HTU × NTU = H_total (HTOL·NTOL).',
        'Fenske (minimum stages): N_min = ln[(xD/(1−xD))·((1−xB)/xB)] / ln(α_avg).',
        'McCabe-Thiele: q-line (feed), operating lines; total reflux → N_min; minimum reflux → infinite stages.',
      ],
    },
    {
      title: 'Process Control',
      points: [
        '1st-order: G(s) = K/(τs + 1). Response: 63.2% of step at t = τ. 2nd-order: ωn, ζ (damping).',
        'PID: P (proportional, offset), I (integral, removes offset), D (derivative, anticipates).',
        'Stability: gain margin > 6 dB, phase margin > 45° (Bode). Routh-Hurwitz for polynomial.',
        'Closed-loop: C(s)/R(s) = G/(1 + GC). Cascade: inner loop handles disturbances faster.',
      ],
    },
  ],
  emt: [
    {
      title: 'Linear Algebra',
      points: [
        'Eigenvalue: det(A − λI) = 0. Eigenvector: (A − λI)v = 0. Sum of eigenvalues = trace; product = det.',
        'Symmetric matrix: real eigenvalues, orthogonal eigenvectors → diagonalizable by orthogonal P.',
        'Rank(A) = rank(Aᵀ) = number of independent rows. Cramer\'s rule: x = det(Ax)/det(A), only for square + invertible.',
        'Least squares: (AᵀA)x = Aᵀb (normal equation).',
      ],
    },
    {
      title: 'Calculus & ODE',
      points: [
        'Extrema: f′(x) = 0, f″ > 0 → min. Taylor: f(x) ≈ f(a) + f′(a)(x−a) + f″(a)(x−a)²/2.',
        '1st-order linear: x′ + P(x) = Q(x); IF = e^∫P dx. Bernoulli: x′ + P = Qxⁿ → substitute v = x^(1−n).',
        '2nd-order constant coeff: ay″ + by′ + cy = 0; r = (−b ± √(b²−4ac))/2a. Roots: real/distinct, repeated (e^rx(1+rx)), complex (e^αx cos βx).',
        'Exact: M dx + N dy = 0 when ∂M/∂y = ∂N/∂x. Integrating factor (M, N) → exact.',
      ],
    },
    {
      title: 'Probability & Statistics',
      points: [
        'P(A∪B) = P(A) + P(B) − P(A∩B). P(B|A) = P(A∩B)/P(A). Independent: P(A∩B) = P(A)P(B).',
        'Bayes: P(A|B) = P(B|A)·P(A) / [P(B|A)P(A) + P(B|Aᶜ)P(Aᶜ)].',
        'Binomial: n trials, p success. Poisson: rare events (λ). Normal: 68-95-99.7 rule.',
        'Correlation r ∈ [−1, 1]. r = 0 means no linear relation (not no relation!). t-test: 2 means; chi-square: goodness-of-fit / independence.',
      ],
    },
    {
      title: 'Numerical Methods & Transforms',
      points: [
        'Bisection: f(a)f(b) < 0 → halve. Newton-Raphson: x_{n+1} = x_n − f(x_n)/f′(x_n) (quadratic convergence).',
        'Simpson 1/3: (h/3)[f0 + 4f1 + 2f2 + … + fn]; needs even number of intervals. Trapezoidal: (h/2)[f0 + 2f1 + … + fn].',
        'Laplace: L{e^(at)} = 1/(s−a). L{sin at} = a/(s²+a²). Final value: lim s→0 s·F(s) (all poles in LHP).',
        'Fourier series: a0/2 + Σ(an cos nωt + bn sin nωt). Z-transform: discrete-time, ROC matters.',
      ],
    },
  ],
  apt: [
    {
      title: 'Quantitative — Must-Know Formulas',
      points: [
        'Speed: S = D/T; relative speed (same direction = difference, opposite = sum). Upstream/downstream: (S−V)/(S+V).',
        'Work: A alone does 1/n of work per day. A+B: (1/n + 1/m) per day. Time = 1/that.',
        'CAGR = (FV/PV)^(1/n) − 1. CAGR ≈ ln(FV/PV)/n for small rates.',
        'Profit: % = (SP−CP)/CP × 100. Successive discounts: 1 − (1−a)(1−b). Markup m% then discount d%: net = 1 + m − d − md.',
        'Logarithms: log(ab) = log a + log b; log(a/b) = log a − log b; log aⁿ = n log a. ln e = 1, log 10 = 1.',
      ],
    },
    {
      title: 'Verbal Strategy',
      points: [
        'Synonym/antonym: eliminate extremes (2 words too strong, 2 too weak) → middle option.',
        'Fill-in-the-blank: read the blank as a question; choose the word that completes logic, not just grammar.',
        'Reading comprehension: read the question FIRST, then the passage (for 100+ word passages).',
        'Para-jumble: start with definite articles / names / numbers; end with pronoun references / conclusions.',
        'Sentence correction: check subject-verb agreement, tense consistency, parallelism.',
      ],
    },
    {
      title: 'Logical Reasoning',
      points: [
        'Syllogism: "All A are B, some B are C" → no valid conclusion about A and C (overlap not guaranteed).',
        'Blood relations: "My mother\'s brother\'s son" = cousin. "Father of my father\'s son" = grandfather (or uncle, if the son isn\'t me).',
        'Coding: letter shift (A→D = +3), reverse (A→Z), positional (1↔26).',
        'Series: difference of differences (2nd-level series is common in GATE).',
        'Seating: fix one person, note "left/right" from their perspective (opposite for facing inward vs outward).',
      ],
    },
    {
      title: 'Data Interpretation',
      points: [
        'Approximate early: 4000/99.9 ≈ 40. Round to 1-2 sig figs before computing.',
        'Pie chart: each 1% = 3.6°. Arc angle → fraction → value.',
        'Table: cross-compare (row vs column) before computing; look for the ratio that simplifies.',
        'Line graph: slope = rate of change. Inflection point = maximum/minimum of derivative.',
        'Time management: DI set = 15–20 min for 5 questions in GATE; skip if > 4 min on one.',
      ],
    },
  ],
};
