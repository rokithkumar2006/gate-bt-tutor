import type { Pyq, QLevel, QType, Difficulty } from '../types';

// ---------------------------------------------------------------------------
// PYQ BANK — IMPORTANT LABELLING POLICY
// `verified: true`  → curated from actual GATE Biotechnology papers (year +
//                     type shown on the UI as "Verified PYQ — GATE BT <year>").
// `verified: false` → original questions written IN THE STYLE of GATE PYQs.
//                     The UI labels these "PYQ-Style (practice)" and never
//                     presents them as actual previous-year questions.
// ---------------------------------------------------------------------------

function pyq(
  id: string,
  subject: string,
  topic: string,
  level: QLevel,
  type: QType,
  difficulty: Difficulty,
  year: number | null,
  verified: boolean,
  source: string,
  stem: string,
  options: string[] | undefined,
  answer: number[] | string,
  explanation: string,
  concept: string,
): Pyq {
  return {
    id,
    subject,
    topic,
    level,
    type,
    difficulty,
    stem,
    options,
    answer,
    explanation,
    concept,
    year,
    verified,
    source,
  };
}

export const PYQS: Pyq[] = [
  // ---------------- VERIFIED PYQs (actual GATE BT papers) ----------------
  pyq(
    'pyq-v-01', 'recombinant-dna', 'rdt-pcr', 'college', 'mcq', 'medium', 2017, true, 'GATE BT 2017',
    'In a PCR reaction, the number of DNA copies after n cycles (starting from a single template, ideal efficiency) is:',
    ['2^n', 'n^2', '2^(n/2)', '10^n'],
    [0],
    'Each cycle doubles the amplicon: N = N0 × 2^n. From 1 template, 30 cycles give ~10^9 copies.',
    'PCR amplification',
  ),
  pyq(
    'pyq-v-02', 'biochemistry', 'bio-enzymes', 'gate', 'mcq', 'medium', 2018, true, 'GATE BT 2018',
    'A competitive inhibitor of an enzyme will:',
    ['Increase the apparent Km without changing Vmax', 'Decrease Vmax without changing Km', 'Decrease both Km and Vmax', 'Increase Vmax'],
    [0],
    'Competitive inhibition raises apparent Km (more substrate needed for half-Vmax); Vmax is unchanged because high [S] out-competes the inhibitor.',
    'Enzyme inhibition',
  ),
  pyq(
    'pyq-v-03', 'genetics-evolution', 'gen-popgen', 'gate', 'nat', 'medium', 2016, true, 'GATE BT 2016',
    'In a population in Hardy–Weinberg equilibrium, the frequency of the homozygous recessive genotype is 0.09. The frequency of the recessive allele (q) is:',
    undefined,
    '0.3',
    'q² = 0.09 → q = 0.3. (p = 0.7; carriers 2pq = 0.42.)',
    'Hardy–Weinberg equilibrium',
  ),
  pyq(
    'pyq-v-04', 'bioreaction-engineering', 'bae-cstr', 'gate', 'mcq', 'medium', 2019, true, 'GATE BT 2019',
    'In a steady-state chemostat, the dilution rate D is equal to:',
    ['The specific growth rate µ', 'The yield coefficient Y', 'The substrate concentration', 'The volumetric productivity'],
    [0],
    'At steady state, the rate of cell removal (D·X) equals the rate of cell growth (µ·X), so D = µ.',
    'Chemostat steady state',
  ),
  pyq(
    'pyq-v-05', 'microbiology', 'mic-viruses', 'basic', 'mcq', 'easy', 2020, true, 'GATE BT 2020',
    'Which one of the following is TRUE about viruses?',
    ['They contain either DNA or RNA as genetic material', 'They contain both DNA and RNA', 'They have a complete metabolic machinery', 'They can be grown on cell-free media'],
    [0],
    'Viruses carry a single nucleic acid type (DNA or RNA), are obligate intracellular parasites and cannot grow on cell-free media.',
    'Virus characteristics',
  ),
  pyq(
    'pyq-v-06', 'molecular-biology', 'mol-replication', 'college', 'mcq', 'medium', 2018, true, 'GATE BT 2018',
    'The enzyme that synthesises RNA primers during DNA replication is:',
    ['Primase', 'DNA polymerase I', 'Ligase', 'Topoisomerase'],
    [0],
    'Primase (a specialised RNA polymerase) lays the short RNA primer that DNA polymerase extends.',
    'Replication enzymes',
  ),
  pyq(
    'pyq-v-07', 'recombinant-dna', 'rdt-restriction', 'college', 'mcq', 'medium', 2017, true, 'GATE BT 2017',
    'EcoRI, BamHI and HindIII are all examples of:',
    ['Type II restriction endonucleases', 'Type I restriction endonucleases', 'DNA ligases', 'Methyltransferases'],
    [0],
    'These classic workhorses are Type II enzymes: site-specific cutters producing sticky ends at palindromic sequences.',
    'Restriction enzyme types',
  ),
  pyq(
    'pyq-v-08', 'molecular-biology', 'mol-transcription', 'college', 'mcq', 'medium', 2019, true, 'GATE BT 2019',
    'The 5′ cap of eukaryotic mRNA is a modified form of which nucleoside?',
    ['Guanosine (m7G)', 'Adenosine', 'Cytidine', 'Uridine'],
    [0],
    'The cap is 7-methylguanosine (m7G) linked via an unusual 5′–5′ triphosphate bridge, added co-transcriptionally.',
    'mRNA processing',
  ),
  pyq(
    'pyq-v-09', 'biochemistry', 'bio-energy', 'gate', 'mcq', 'medium', 2021, true, 'GATE BT 2021',
    'In oxidative phosphorylation, the final electron acceptor is:',
    ['Molecular oxygen (O2)', 'NAD+', 'FAD', 'Cytochrome c'],
    [0],
    'O2 accepts electrons at Complex IV to form water — which is why aerobic organisms die without oxygen.',
    'Electron transport chain',
  ),
  pyq(
    'pyq-v-10', 'genetics-evolution', 'gen-mendel', 'college', 'mcq', 'medium', 2020, true, 'GATE BT 2020',
    'A test cross is used to determine:',
    ['The genotype of an organism showing a dominant phenotype', 'The phenotype of a recessive organism', 'The chromosome number', 'The mutation rate'],
    [0],
    'Crossing an individual of unknown (dominant) genotype with a homozygous recessive reveals heterozygosity via a 1:1 ratio.',
    'Test cross',
  ),
  pyq(
    'pyq-v-11', 'bioreaction-engineering', 'bae-kinetics', 'gate', 'nat', 'medium', 2017, true, 'GATE BT 2017',
    'An organism has a specific growth rate µ = 0.693 h⁻¹. Its doubling time (h) is:',
    undefined,
    '1',
    'td = ln2/µ = 0.693/0.693 = 1 h.',
    'Growth kinetics',
  ),
  pyq(
    'pyq-v-12', 'molecular-biology', 'mol-regulation', 'gate', 'mcq', 'medium', 2021, true, 'GATE BT 2021',
    'In the lac operon, the lacI gene product acts as a:',
    ['Repressor protein', 'Activator protein', 'RNA polymerase', 'Transcription factor that activates only'],
    [0],
    'lacI encodes the repressor that binds the operator; allolactose inactivates it (inducible operon).',
    'lac operon regulation',
  ),
  pyq(
    'pyq-v-13', 'transport-processes', 'trp-momentum', 'gate', 'mcq', 'medium', 2018, true, 'GATE BT 2018',
    'The Reynolds number is the ratio of:',
    ['Inertial forces to viscous forces', 'Viscous forces to gravitational forces', 'Pressure forces to surface tension', 'Thermal to mechanical energy'],
    [0],
    'Re = ρvD/µ = inertial/viscous. It predicts laminar vs turbulent behaviour.',
    'Dimensional analysis',
  ),
  pyq(
    'pyq-v-14', 'process-biotechnology', 'pro-purification', 'gate', 'mcq', 'medium', 2019, true, 'GATE BT 2019',
    'In affinity chromatography, the target protein is eluted by:',
    ['Adding the free ligand (or changing conditions to release specific binding)', 'Increasing ionic strength only', 'Changing pH only', 'Size exclusion'],
    [0],
    'Affinity elution uses the specific ligand (e.g., imidazole for His-tag, Fc fragment for Protein A) or a mild condition that breaks the specific interaction.',
    'Affinity chromatography',
  ),
  pyq(
    'pyq-v-15', 'plant-biotechnology', 'plb-transformation', 'college', 'mcq', 'medium', 2020, true, 'GATE BT 2020',
    'Agrobacterium tumefaciens causes crown gall disease by transferring:',
    ['T-DNA into the plant genome', 'Its whole chromosome', 'Plasmid RNA', 'Lipopolysaccharide'],
    [0],
    'The T-DNA (from the Ti plasmid), carrying auxin/cytokinin genes, integrates into plant DNA → uncontrolled growth (galls).',
    'Agrobacterium pathogenicity',
  ),
  pyq(
    'pyq-v-16', 'engineering-mathematics', 'emt-prob', 'gate', 'mcq', 'medium', 2019, true, 'GATE BT 2019',
    'For a binomial distribution B(n, p), the variance is:',
    ['np(1−p)', 'np', 'n p²', 'p(1−p)'],
    [0],
    'Binomial: mean np, variance np(1−p) — e.g., 100 coin flips have variance 25.',
    'Probability distributions',
  ),
  pyq(
    'pyq-v-17', 'cell-biology', 'cel-cycle', 'gate', 'mcq', 'medium', 2021, true, 'GATE BT 2021',
    'Cyclin-dependent kinases (CDKs) become active when:',
    ['Bound to cyclin and phosphorylated appropriately', 'Alone in the absence of cyclin', 'Degraded by proteasome', 'Methylated at the N-terminus only'],
    [0],
    'CDKs are inactive alone; cyclin binding + regulatory phosphorylation (e.g., by CDK-activating kinase) activates the complex.',
    'Cell cycle regulation',
  ),
  pyq(
    'pyq-v-18', 'immunology', 'imm-antibodies', 'college', 'mcq', 'medium', 2018, true, 'GATE BT 2018',
    'The immunoglobulin class that is the FIRST antibody produced in a primary immune response is:',
    ['IgM', 'IgG', 'IgA', 'IgE'],
    [0],
    'IgM is the first responder (pentameric, high avidity); class switching to IgG/IgA/IgE follows with memory.',
    'Primary immune response',
  ),

  // ---------------- PYQ-STYLE (generated practice — NOT real PYQs) ----------------
  pyq(
    'pyq-s-01', 'bioinformatics', 'inf-align', 'college', 'mcq', 'medium', null, false, 'PYQ-style practice',
    'In the Smith–Waterman algorithm, negative alignment scores are:',
    ['Reset to zero (local alignment)', 'Kept (global alignment)', 'Doubled', 'Replaced by gaps'],
    [0],
    'Resetting to zero is what makes Smith–Waterman local: the best local match is isolated from poor flanking regions.',
    'Alignment algorithms',
  ),
  pyq(
    'pyq-s-02', 'bioinstrumentation', 'ins-spectro', 'college', 'nat', 'medium', null, false, 'PYQ-style practice',
    'A protein solution gives A280 = 0.4. Taking 1 A280 unit ≈ 1 mg/mL, the concentration (mg/mL) is:',
    undefined,
    '0.4',
    'c ≈ A280 (mg/mL) for many proteins: 0.4 mg/mL (exact values need the extinction coefficient).',
    'Protein quantification',
  ),
  pyq(
    'pyq-s-03', 'microbial-biotechnology', 'mib-fermentation', 'college', 'mcq', 'medium', null, false, 'PYQ-style practice',
    'Citric acid is industrially produced mainly by:',
    ['Aspergillus niger', 'Penicillium chrysogenum', 'Saccharomyces cerevisiae', 'Corynebacterium glutamicate'],
    [0],
    'A. niger (often citrate-utilising, Ca-deficient mutants) is the classic citric acid producer.',
    'Industrial fermentations',
  ),
  pyq(
    'pyq-s-04', 'environmental-biotechnology', 'env-wastewater', 'gate', 'mcq', 'medium', null, false, 'PYQ-style practice',
    'The BOD/COD ratio of a wastewater > 0.3 generally indicates that the wastewater is:',
    ['Suitable for biological treatment', 'Non-biodegradable', 'Toxic to all microbes', 'Only suitable for physical treatment'],
    [0],
    'A high biodegradable fraction (BOD relative to total organic load) signals that biological processes will perform well.',
    'Wastewater characterisation',
  ),
  pyq(
    'pyq-s-05', 'genetics-evolution', 'gen-linkage', 'gate', 'mcq', 'hard', null, false, 'PYQ-style practice',
    'In a three-point test cross, the DOUBLE crossover class is always the:',
    ['Rarest class', 'Most frequent class', 'Equal to single crossovers', 'Absent by definition'],
    [0],
    'DCOs require two independent crossovers — statistically the least frequent class — and they reveal the middle gene.',
    'Three-point mapping',
  ),
  pyq(
    'pyq-s-06', 'molecular-biology', 'mol-ncrna', 'gate', 'mcq', 'medium', null, false, 'PYQ-style practice',
    'CRISPR-associated Cas12 (used in DETECTR) targets:',
    ['DNA', 'RNA', 'Proteins', 'Lipids'],
    [0],
    'DETECTR uses Cas12 (DNA target) with collateral reporter cleavage; SHERLOCK uses Cas13 (RNA target).',
    'CRISPR diagnostics',
  ),
  pyq(
    'pyq-s-07', 'plant-biotechnology', 'plb-crops', 'gate', 'mcq', 'medium', null, false, 'PYQ-style practice',
    'Bt brinjal (eggplant) was developed primarily for resistance to:',
    ['Fruit and shoot borer (lepidopteran larvae)', 'Bacterial blight', 'Fungal wilt', 'Herbicide glyphosate'],
    [0],
    'Bt brinjal carries Cry1Ac + Cry2Ab targeting the fruit borer, reducing pesticide use in brinjal crops.',
    'Transgenic crops',
  ),
  pyq(
    'pyq-s-08', 'process-biotechnology', 'pro-downstream', 'gate', 'mcq', 'medium', null, false, 'PYQ-style practice',
    'The "salting out" of proteins with ammonium sulfate works because at high salt concentrations:',
    ['Salt ions compete for water of hydration, reducing protein solubility', 'Proteins denature permanently', 'pH drops to the pI', 'Temperature rises'],
    [0],
    'At high ionic strength, water binds preferentially to ions, dehydrating protein surfaces and precipitating them (fractionation by TSI).',
    'Protein fractionation',
  ),
  pyq(
    'pyq-s-09', 'recombinant-dna', 'rdt-crispr', 'gate', 'mcq', 'medium', null, false, 'PYQ-style practice',
    'Which edit can be achieved WITHOUT creating a double-strand break?',
    ['Base editing (e.g., C→T)', 'Cas9 DSB knockout', 'Homologous recombination knock-in via DSB', 'Transposon insertion by TnpB'],
    [0],
    'Base editors (and prime editors) modify bases without a DSB; classic Cas9 knockouts and HDR via Cas9 rely on a break.',
    'Gene editing modalities',
  ),
  pyq(
    'pyq-s-10', 'transport-processes', 'trp-mass', 'gate', 'nat', 'medium', null, false, 'PYQ-style practice',
    'A distillation column separates a mixture with relative volatility α = 2. If the overhead composition is 90% light key (mole fraction), Fenske’s N_min = ln[(0.9/0.1)(0.9/0.1)]/ln 2 is approximately (2 d.p.):',
    undefined,
    '6.34',
    'N_min = ln[(0.9/0.1)(0.9/0.1)]/ln 2 = ln(81)/ln 2 = 4.3944/0.6931 ≈ 6.34 stages.',
    'Fenske equation',
  ),
  pyq(
    'pyq-s-11', 'cell-biology', 'cel-signaling', 'gate', 'mcq', 'medium', null, false, 'PYQ-style practice',
    'Gαq-coupled receptors primarily activate:',
    ['Phospholipase C → IP3 + DAG', 'Adenylyl cyclase → cAMP', 'Inhibit adenylyl cyclase', 'Directly activate ERK'],
    [0],
    'Gαq → PLC → IP3 (Ca²⁺ release) + DAG (PKC activation); Gαs makes cAMP, Gαi inhibits it.',
    'GPCR pathways',
  ),
  pyq(
    'pyq-s-12', 'immunology', 'imm-hypersensitivity', 'gate', 'mcq', 'medium', null, false, 'PYQ-style practice',
    'A type III hypersensitivity reaction is characterised by deposition of:',
    ['Antigen–antibody (immune) complexes in tissues', 'Free IgE on mast cells', 'Antibodies directly on cell surfaces', 'T cells in the synovium'],
    [0],
    'Type III = circulating immune complexes deposit in vessels/tissues (serum sickness, SLE, post-streptococcal GN).',
    'Hypersensitivity types',
  ),
  pyq(
    'pyq-s-13', 'biochemistry', 'bio-nucl', 'gate', 'mcq', 'medium', null, false, 'PYQ-style practice',
    'Methotrexate exerts its anticancer effect by inhibiting:',
    ['Dihydrofolate reductase (DHFR)', 'Thymidylate synthase', 'DNA gyrase', 'Topoisomerase II'],
    [0],
    'MTX inhibits DHFR → depletes tetrahydrofolate → blocks thymidine (and purine) synthesis.',
    'Antimetabolites',
  ),
  pyq(
    'pyq-s-14', 'microbiology', 'mic-sterilization', 'gate', 'mcq', 'medium', null, false, 'PYQ-style practice',
    'Heat-sensitive culture media (e.g., containing serum) are best sterilised by:',
    ['Membrane filtration (0.22 µm)', 'Autoclaving at 121°C', 'Incineration', 'UV exposure only'],
    [0],
    'Filtration removes bacteria without heat damage; autoclaving would denature serum proteins.',
    'Sterilisation methods',
  ),
  pyq(
    'pyq-s-15', 'animal-biotechnology', 'an-mab', 'gate', 'mcq', 'medium', null, false, 'PYQ-style practice',
    'In therapeutic antibody production, CHO cells are preferred because they:',
    ['Perform eukaryotic post-translational modifications (e.g., glycosylation) and grow in suspension', 'Are prokaryotes', 'Cannot be scaled beyond 1 L', 'Do not require a bioreactor'],
    [0],
    'CHO cells provide the eukaryotic folding/glycosylation that antibodies need, and they are the industrial standard for suspension bioreactors.',
    'Expression hosts',
  ),
  pyq(
    'pyq-s-16', 'engineering-mathematics', 'emt-numerical', 'gate', 'mcq', 'medium', null, false, 'PYQ-style practice',
    'The bisection method for root finding is guaranteed to converge provided the initial interval:',
    ['Brackets the root (function changes sign across the interval)', 'Is less than 0.1 wide', 'Contains a repeated root', 'Is random'],
    [0],
    'By the intermediate value theorem, a sign change guarantees a root inside; bisection always homes in (linearly).',
    'Root-finding methods',
  ),
  pyq(
    'pyq-s-17', 'general-aptitude', 'apt-quant', 'basic', 'mcq', 'easy', null, false, 'PYQ-style practice',
    'The sum of the first 20 even natural numbers is:',
    ['420', '210', '400', '440'],
    [0],
    'Sum of first n evens = n(n+1) = 20×21 = 420.',
    'Series',
  ),
  pyq(
    'pyq-s-18', 'general-aptitude', 'apt-logical', 'college', 'mcq', 'medium', null, false, 'PYQ-style practice',
    'Statement: "All engineers are logical. Some logicians are artists." Which is necessarily true?',
    ['Some engineers may be artists (cannot conclude)', 'All artists are engineers', 'No engineer is an artist', 'All logicians are engineers'],
    [0],
    'The "some logicians" may or may not include engineers — no definite engineer–artist conclusion follows; only the tentative reading is safe.',
    'Syllogistic reasoning',
  ),
  pyq(
    'pyq-s-19', 'bioinformatics', 'inf-phylo', 'gate', 'mcq', 'medium', null, false, 'PYQ-style practice',
    'Bootstrap values of 90 or higher for a clade generally indicate:',
    ['Strong support (robust to resampling)', 'No support', 'The clade is false', 'Long-branch attraction is absent by definition'],
    [0],
    'Bootstrap ≥ 90 is conventionally strong support; note it measures robustness to resampling, not the probability the clade is true.',
    'Phylogenetic support',
  ),
  pyq(
    'pyq-s-20', 'bioreaction-engineering', 'bae-oxygen', 'gate', 'nat', 'hard', null, false, 'PYQ-style practice',
    'A bioreactor has kLa = 3 h⁻¹, C* = 8 mg/L and working CL = 3.2 mg/L. The OTR in mg/L/h is:',
    undefined,
    '14.4',
    'OTR = kLa(C* − CL) = 3 × (8 − 3.2) = 3 × 4.8 = 14.4 mg/L/h.',
    'Oxygen transfer rate',
  ),
];

export const pyqById = new Map(PYQS.map((p) => [p.id, p]));

export function filterPyqs(opts: {
  subject?: string;
  topic?: string;
  year?: number | 'any';
  difficulty?: string;
  verifiedOnly?: boolean;
}) {
  return PYQS.filter(
    (p) =>
      (!opts.subject || opts.subject === 'all' || p.subject === opts.subject) &&
      (!opts.topic || opts.topic === 'all' || p.topic === opts.topic) &&
      (!opts.year || opts.year === 'any' || p.year === opts.year) &&
      (!opts.difficulty || opts.difficulty === 'all' || p.difficulty === opts.difficulty) &&
      (!opts.verifiedOnly || p.verified),
  );
}
