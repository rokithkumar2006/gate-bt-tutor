import type { Topic } from '../types';

// ============ ANIMAL BIOTECHNOLOGY ============
export const TOPICS_AN: Topic[] = [
  {
    id: 'an-culture',
    subject: 'animal-biotechnology',
    name: 'Animal Cell Culture Basics',
    level: 1,
    priority: 'high',
    ord: 1,
    short: 'How to grow animal cells outside the body.',
    basic: {
      what: 'Animal cell culture means growing animal cells in a controlled laboratory environment, in a sterile vessel with a nutrient solution called medium.',
      why: 'We cannot dissect living animals for every experiment. Culture lets us study cells, test drugs and make vaccines and antibodies in a safe, repeatable way.',
      how: 'Cells are detached from tissue (or taken from a line), washed, and put in medium with nutrients, serum and antibiotics. The vessel is kept at 37°C and 5% CO2 in a humidified incubator.',
      where: 'Vaccine production, drug screening, monoclonal antibody production, tissue engineering and gene therapy research.',
    },
    college: [
      'Primary culture: cells grown directly from a fresh tissue; they retain near-normal properties but have limited division potential.',
      'Subculture: cells are trypsinised, diluted and re-seeded when they reach confluence (contact inhibition).',
      'Growth curve: lag → exponential (log) → stationary → death phases; a passage is one subculture.',
      'Key parameters: temperature 37°C, pH 7.2–7.4 (Hepes/bicarbonate buffer), osmolarity ~300 mOsm, 5% CO2 to stabilise bicarbonate buffer.',
      'Sterility is maintained by laminar air flow, aseptic technique and antibiotics such as penicillin–streptomycin.',
    ],
    advanced: [
      'Adherent vs suspension cultures: fibroblasts are anchorage-dependent, while lymphocytes and many tumour lines grow in suspension; anchorage dependence relates to integrin–ECM signalling.',
      'Population doubling time (PDT) quantifies growth rate; high PDT loss signals stress, senescence or contamination.',
      'Serum-free media use defined growth factors (EGF, bFGF) and transferrin, enabling GMP-grade products.',
    ],
    gate: {
      highYield: [
        '37°C, 5% CO2, pH 7.4 conditions and why (bicarbonate/CO2 buffer equilibrium).',
        'Primary culture vs cell line vs cell strain definitions.',
        'Tryptic digestion for subculture; contact inhibition.',
      ],
      traps: [
        'Cell line vs cell strain: a line is the generic population, a strain is one cloned sub-population.',
        'Serum is not a single defined molecule — it is a complex supplement, not a defined factor.',
      ],
    },
    examples: [
      'CHO cells are the workhorse for recombinant antibody production in suspension bioreactors.',
        'HeLa is an immortalised cervical carcinoma line — the first human cell line to grow indefinitely.',
    ],
    formulas: [
      { name: 'Population doubling', expr: 'N = N0 × 2^n (n = number of doublings)' },
      { name: 'Population doubling time', expr: 'PDT = (t2 − t1) × ln2 / ln(N2/N1)' },
    ],
    keyPoints: [
      '37°C, 5% CO2, pH 7.2–7.4 are standard mammalian culture conditions.',
      'Serum provides growth factors, hormones and attachment proteins.',
      'Laminar air flow + aseptic technique prevent contamination.',
      'Confluent cells stop dividing (contact inhibition) and must be subcultured.',
    ],
    revision: {
      remember: '37°C, 5% CO2, pH 7.4, serum = growth factors + safety net.',
      mistakes: [
        'Writing "CO2 is for respiration" — it is for the bicarbonate buffer, not respiration.',
        'Confusing primary culture with cell line (lines can be passaged many times).',
      ],
      summary: 'Detached cells + defined medium + sterile 37°C/5% CO2 incubator = animal cell culture; subculture at confluence.',
    },
    related: ['an-lines', 'an-mab', 'bae-cell-bioreactors'],
  },
  {
    id: 'an-stem',
    subject: 'animal-biotechnology',
    name: 'Stem Cells & Pluripotency',
    level: 1,
    priority: 'medium',
    ord: 2,
    short: 'Master cells that can self-renew and differentiate.',
    basic: {
      what: 'Stem cells are cells that can divide indefinitely (self-renewal) and give rise to specialised cell types (differentiation).',
      why: 'They are the basis of regenerative medicine, drug testing on human cells and disease models.',
      how: 'Potency decides fate: totipotent → any cell including extra-embryonic (zygote); pluripotent → all body cells but not placenta (ESC, iPSC); multipotent → a tissue family (haematopoietic stem cell → blood).',
      where: 'Leukaemia treatment (BMT), Parkinson’s research, iPS cell lines for disease modelling.',
    },
    college: [
      'Embryonic stem cells (ESCs): inner cell mass of blastocyst; express Oct4, Nanog, Sox2.',
      'Adult (somatic) stem cells: found in bone marrow, blood, skin, liver; multipotent.',
      'iPSCs: somatic cells reprogrammed by Yamanaka factors (Oct4, Sox2, Klf4, c-Myc) — the 4 Yamanaka factors.',
      'Differentiation drivers: Notch, Wnt, BMP, FGF pathways guide lineage choice.',
    ],
    advanced: [
      'Epigenetic reprogramming: iPSC generation involves DNA demethylation and chromatin remodelling; residual methylation explains incomplete reprogramming.',
      'Therapeutic concerns: tumorigenicity of ESC/iPSC grafts, immune matching via autologous iPSCs, and the ethical boundary of embryo use.',
    ],
    gate: {
      highYield: [
        'Potency ladder: totipotent > pluripotent > multipotent > unipotent.',
        'The 4 Yamanaka factors (OSKM) for iPSC reprogramming.',
        'Oct4/Nanog/Sox2 as pluripotency markers.',
      ],
      traps: [
        'ESCs are pluripotent, NOT totipotent (they cannot form the placenta).',
        'iPSC factors are transcription factors, not signalling ligands.',
      ],
    },
    examples: [
      'Yamanaka (2006) reprogrammed mouse fibroblasts into iPSCs with OSKM.',
      'Haematopoietic stem cell transplant replaces destroyed bone marrow after chemotherapy.',
    ],
    formulas: [],
    keyPoints: [
      'Self-renewal + differentiation = stem cell definition.',
      'Totipotent (zygote) > Pluripotent (ESC/iPSC) > Multipotent (adult) > Unipotent.',
      'iPSC = fibroblast + Oct4, Sox2, Klf4, c-Myc.',
    ],
    revision: {
      remember: 'OSKM makes iPSCs; ESCs are pluripotent, not totipotent.',
      mistakes: ['Calling ESCs totipotent.', 'Forgetting that iPSCs are adult cells reprogrammed, not new stem cells.'],
      summary: 'Potency ladder + OSKM reprogramming + pluripotency markers (Oct4, Nanog, Sox2).',
    },
    related: ['an-culture', 'an-transgenics', 'cel-cycle'],
  },
  {
    id: 'an-lines',
    subject: 'animal-biotechnology',
    name: 'Cell Lines & Immortalization',
    level: 2,
    priority: 'high',
    ord: 3,
    short: 'Finite vs continuous lines and how cells become immortal.',
    basic: {
      what: 'A cell line is a population of cells descended from a single parent cell that can be cultured. Some divide a limited number of times (finite); some divide forever (continuous/immortal).',
      why: 'Industrial and research work needs reliable, stable, fast-growing cell populations.',
      how: 'Immortalization can be spontaneous (rare, ~1 in 10^8 cells), induced by viruses (SV40 large T antigen), oncogenes (retroviral), or chemical mutagens. The line is then cloned and characterised.',
      where: 'CHO lines for antibodies, HeLa for drug testing, BHK cells for vaccines.',
    },
    college: [
      'Finite lines: limited population doublings (replicative senescence, tied to telomere shortening).',
      'Immortalization mechanisms: telomerase reactivation, loss of p53/Rb checkpoints, oncogene expression.',
      'Transformation vs immortalization: immortal cells divide forever; transformed cells also gain anchorage-independent growth and tumorigenicity.',
      'Mycoplasma is the most common silent contaminant — it changes gene expression and must be screened for.',
    ],
    advanced: [
      'Clonal selection in fed-batch production: antibody-producing clones are sorted by flow cytometry to obtain high-yielding, non-secreting-variant-free lines.',
      'Genomic instability of immortal lines (aneuploidy) limits their use as physiological models.',
    ],
    gate: {
      highYield: [
        'Finite vs continuous lines; population doubling limit.',
        'Mycoplasma contamination and its effects.',
        'Telomerase/reactivation in immortalization.',
      ],
      traps: [
        'Immortal ≠ transformed: anchorage independence is a transformation feature.',
        'Mycoplasma lacks a cell wall, so penicillin does NOT clear it.',
      ],
    },
    examples: [
      'CHO-K1 and CHO-DG44 are the dominant industrial antibody production lines.',
      'HeLa cells (Heber Laue) have been passaged over a thousand times since 1951.',
    ],
    formulas: [],
    keyPoints: [
      'Finite lines senesce; continuous lines have telomerase/checkpoint changes.',
      'Transformation adds anchorage-independent growth + tumorigenicity.',
      'Always screen for mycoplasma in culture work.',
    ],
    revision: {
      remember: 'Finite = clocks out; continuous = telomerase on; mycoplasma = wall-less invader.',
      mistakes: ['Assuming antibiotics kill mycoplasma.', 'Confusing strain with line.'],
      summary: 'Cell lines progress from finite primary cultures to immortal continuous lines via telomerase/checkpoint changes; mycoplasma is the key contaminant.',
    },
    related: ['an-culture', 'an-mab'],
  },
  {
    id: 'an-media',
    subject: 'animal-biotechnology',
    name: 'Culture Media & Growth Factors',
    level: 2,
    priority: 'medium',
    ord: 4,
    short: 'What cells eat: basal media, supplements and defined factors.',
    basic: {
      what: 'Culture medium is the liquid "food" for cells — amino acids, sugars, salts, vitamins, plus supplements that supply growth signals.',
      why: 'Without balanced nutrition and signalling, cells do not divide or secrete products.',
      how: 'Basal media (DMEM, RPMI-1640, IMDM) supply salts and nutrients; fetal bovine serum (FBS, 5–20%) supplies undefined growth factors; defined systems add pure factors (EGF, insulin, transferrin).',
      where: 'Every cell culture from research flasks to 20,000 L antibody bioreactors.',
    },
    college: [
      'DMEM: high glucose, many amino acids — general purpose.',
      'RPMI-1640: lower glucose — haematopoietic and lymphoid cells.',
      'IMDM: intermediate — often for hybridoma and B-cell culture.',
      'Supplements: L-glutamine (limiting, degrades to ammonia), sodium pyruvate (energy), non-essential amino acids.',
      'Antibiotics: penicillin–streptomycin (Gram-positive wall + Gram-negative), amphotericin B (fungi), gentamicin (broader).',
    ],
    advanced: [
      'Serum-free and xeno-free (SF/XF) media are required for GMP cell therapy because serum carries virus/bprion risk and batch variability.',
      'Glutamine degradation to ammonia is a key product-inhibition factor in long fermentations.',
    ],
    gate: {
      highYield: [
        'DMEM vs RPMI vs IMDM typical use.',
        'Role of L-glutamine and its degradation.',
        'Why serum-free is used for therapeutic products.',
      ],
      traps: ['Serum is a supplement, not a defined medium component.', 'Antibiotics do not replace aseptic technique.'],
    },
    examples: [
      'Hybridoma cells classically grow in IMDM with 10–20% FBS.',
      'Protein L / protein A downstream purification depends on cell line choice, not medium.'],
    formulas: [],
    keyPoints: [
      'Basal medium = salts + nutrients; serum = growth factor mix.',
      'L-glutamine is often limiting and degrades to ammonia.',
      'Therapeutic cell lines need serum-free, xeno-free defined media.',
    ],
    revision: {
      remember: 'Basal + serum + Glutamine = culture; GMP → serum-free.',
      mistakes: ['Forgetting glutamine degradation.', 'Thinking antibiotics prevent all contamination (not mycoplasma).'],
      summary: 'Media = basal (DMEM/RPMI/IMDM) + serum or defined factors; glutamine limits long culture.',
    },
    related: ['an-culture', 'an-mab'],
  },
  {
    id: 'an-mab',
    subject: 'animal-biotechnology',
    name: 'Monoclonal Antibody Production',
    level: 3,
    priority: 'high',
    ord: 5,
    short: 'Hybridoma technology — identical antibodies on demand.',
    basic: {
      what: 'Monoclonal antibodies (mAbs) are identical antibodies made by cloning a single antibody-producing B cell. The classic method fuses that B cell with a myeloma (cancer) cell to make a hybridoma.',
      why: 'mAbs are highly specific tools and drugs — diagnostics, targeted cancer therapy, autoimmune treatments.',
      how: 'Immunise a mouse → take spleen B cells → fuse with myeloma cells using PEG → hybridomas grow only if they have a functional HGPRT enzyme (HAT medium selection) → screen wells for positive antibody (ELISA) → clone single cells → immortal line secretes one antibody.',
      where: 'ELISA kits, cancer therapy (trastuzumab, rituximab), biosensors.',
    },
    college: [
      'Köhler & Milstein (1975) developed hybridoma; the myeloma parent contributes immortality, the B cell contributes antibody specificity.',
      'HAT selection: hypoxanthine–aminopterin–thymidine medium; aminopterin blocks de novo nucleotide synthesis, so only HGPRT-positive hybrids (using salvage pathway) survive.',
      'Screening: ELISA or Immunofluorescence for antigen binding; limiting dilution or FACS for monoclonality.',
      'Isotypes: mouse IgG1–3; humanisation reduces immunogenicity (CDR grafting, framework mutations); fully human mAbs via phage display or transgenic mice.',
    ],
    advanced: [
      'Phage display: antibody genes displayed on phage coat proteins; bind-and-sort cycles enrich specific clones without animals.',
      'CHO cells are the industrial host for therapeutic mAbs; fed-batch bioreactors, Protein A capture, glycosylation controls ADCC activity.',
      'N-glycosylation of the Fc region determines effector function; afucosylation enhances ADCC.',
    ],
    gate: {
      highYield: [
        'HAT selection logic and the HGPRT requirement (Lesch–Nyhan link).',
        'Why myeloma cells are chosen (immortal, HGPRT−).',
        'ELISA as the screening tool; FACS for single-cell cloning.',
        'Humanisation strategies (CDR grafting vs phage display).',
      ],
      traps: [
        'Parent B cells die in HAT media because they have no immortality, even though they have HGPRT.',
        'Fusing without PEG — PEG is the fusogen.',
        'A hybridoma secreting antibodies is not automatically monoclonal — you must sub-clone.',
      ],
    },
    examples: [
      'Rituximab (anti-CD20) treats B-cell lymphomas; trastuzumab (anti-HER2) treats breast cancer.',
      'Lesch–Nyhan syndrome = HGPRT deficiency — the same enzyme exploited in HAT selection.',
    ],
    formulas: [],
    keyPoints: [
      'B cell (specificity) + myeloma (immortality) + PEG (fusion) = hybridoma.',
      'HAT medium selects HGPRT+ cells only.',
      'ELISA screens; limiting dilution/FACS gives monoclonality.',
      'CHO + Protein A = industrial mAb production.',
    ],
    revision: {
      remember: 'HAT keeps hybrids; PEG makes fusions; ELISA finds the winner.',
      mistakes: ['Forgetting parent myeloma must be HGPRT-deficient.', 'Thinking fusion alone gives monoclonality.'],
      summary: 'Immunised spleen B cells fused (PEG) to HGPRT− myeloma, selected in HAT, screened (ELISA), cloned → immortal mAb factory.',
    },
    related: ['an-culture', 'imm-antibodies', 'an-media'],
  },
  {
    id: 'an-transgenics',
    subject: 'animal-biotechnology',
    name: 'Transgenic Animals',
    level: 3,
    priority: 'high',
    ord: 6,
    short: 'Engineering animals to carry foreign genes.',
    basic: {
      what: 'Transgenic animals carry a foreign gene (transgene) in their genome, passed to offspring. The classic method microinjects DNA into the pronucleus of a fertilised egg.',
      why: 'They produce pharmaceuticals in milk (bioreactors), model human diseases, and test genes.',
      how: 'Microinjection: egg injection → transfer to surrogate → screen offspring by PCR/Southern blot. Alternatives: ES cell injection, viral vectors, and CRISPR-mediated knock-in.',
      where: 'Mouse models of cancer and Alzheimer’s; goats/cows producing human proteins in milk; pigs for organ xenotransplantation study.',
    },
    college: [
      'Pronuclear microinjection: 1–5 ng of linearised plasmid per egg; ~1% of founders integrate; mosaic, random integration, variable copy number.',
      'Transgene design: strong constitutive promoter (CMV, β-actin, β-casein for milk) + transgene + polyA signal.',
      'Screening: PCR, Southern blot (copy number), qPCR/RT-PCR (expression), Western blot (protein).',
      'Knockout vs knock-in: homologous recombination in ES cells (classical) or CRISPR-Cas9 targeted cutting (modern).',
    ],
    advanced: [
      'Random integration can disrupt host genes — founder lines need genotyping + phenotyping of F1.',
      'Tissue-specific promoters (β-casein → mammary gland) and inducible systems (Tet-Off) give spatial/temporal control.',
      'CRISPR improves knock-in efficiency with homology-directed repair templates; base/prime editing enables precise single-nucleotide edits without double-strand breaks.',
    ],
    gate: {
      highYield: [
        'Pronuclear microinjection workflow and efficiency (~1%).',
        'Why milk is used (β-casein promoter, high protein capacity).',
        'HAT selection in ES cell targeting (hypoxanthine–aminopterin–thymidine again!).',
        'CRISPR HDR vs NHEJ outcomes.',
      ],
      traps: [
        'A positive PCR only shows integration, not expression — use RT-PCR/Western for expression.',
        'Random integration may cause insertional mutagenesis — phenotypic screening is mandatory.',
      ],
    },
    examples: [
      '"PharMice" produce humanised antibodies; ATMIN™ goats produce antithrombin III in milk.',
      'The first transgenic animal: the HMG supermouse (1982, growth hormone into mouse oocyte).',
    ],
    formulas: [],
    keyPoints: [
      'Microinjection → random integration → screen (PCR) → confirm (Southern) → express (RT-PCR/Western).',
      'Milk is a natural bioreactor via β-casein promoter.',
      'CRISPR knock-in > ES cell targeting for precision.',
    ],
    revision: {
      remember: 'Inject → integrate (random) → PCR → clone line → CRISPR for precision.',
      mistakes: ['Confusing integration with expression.', 'Forgetting founders can be mosaic.'],
      summary: 'Transgenics = promoter + transgene + egg injection; verify integration and expression separately; CRISPR now dominates knock-in work.',
    },
    related: ['an-stem', 'rdt-restriction', 'rdt-crispr'],
  },
  {
    id: 'an-models',
    subject: 'animal-biotechnology',
    name: 'Animal Models & Bioethics',
    level: 3,
    priority: 'low',
    ord: 7,
    short: 'Choosing the right organism and staying ethical.',
    basic: {
      what: 'Animal models are organisms used to study human biology or disease. Choice depends on genetics, cost, ethics and biology.',
      why: 'Drugs and therapies must be tested in living systems before humans; models bridge lab and clinic.',
      how: 'Small (C. elegans, Drosophila, zebrafish) for genetics and screening; rodents for physiology and disease; non-human primates for neuro/immunology. Ethical review (3Rs: Replace, Reduce, Refine) is mandatory.',
      where: 'Toxicology, oncology, vaccine trials, neuroscience.',
    },
    college: [
      'C. elegans: transparent, 959 cells, 3-day generation — perfect for development and genetics.',
      'Zebrafish: external fertilisation, transparent larvae, high fecundity — cardiovascular and toxicity studies.',
      'Transgenic/knockout mice model disease (SCID mice for immunology, Tg mice for cancer).',
      'Regulations: CPCSEA (India), NIH guidelines; IACUC approval for all vertebrate work.',
    ],
    advanced: [
      'Xenotransplantation: GalCt knockout pigs reduce hyperacute rejection; gene-edited pig hearts transplanted into humans (2022+).',
      'Organoids and iPSC models are replacing some animal work (3Rs-aligned).',
    ],
    gate: {
      highYield: [
        'The 3Rs of animal ethics (Replace, Reduce, Refine) and their order.',
        'Why SCID mice are used in immunology (no adaptive immunity).',
        'Model organism features (generation time, size, genetics).',
      ],
      traps: [
        '3Rs order: Replace first, then Reduce, then Refine.',
        'SCID = Severe Combined Immunodeficiency — no T and B cells, not just one arm.',
      ],
    },
    examples: ['The T4/T3 zebrafish line is a workhorse for cardiac drug screening.', 'Galα-1,3-galactosyltransferase-knockout pigs are used for cross-species organ study.'],
    formulas: [],
    keyPoints: [
      'Match organism to question: genetics → worms/flies; physiology → rodents; complex → primates.',
      '3Rs: Replace, Reduce, Refine.',
      'Ethics committee approval precedes any vertebrate experiment.',
    ],
    revision: {
      remember: 'Replace → Reduce → Refine; SCID mouse = immune-free mouse.',
      mistakes: ['Reversing the 3Rs order.'],
      summary: 'Pick the simplest valid model; minimise numbers and suffering; get ethics approval first.',
    },
    related: ['an-transgenics', 'imm-basics'],
  },
  {
    id: 'an-gate',
    subject: 'animal-biotechnology',
    name: 'GATE Focus: Cell Culture & Transgenics',
    level: 4,
    priority: 'high',
    ord: 8,
    short: 'High-yield facts and traps for exam day.',
    basic: {
      what: 'This is the GATE-exam view of animal biotechnology: the exact comparisons, numbers and pairings that appear in questions.',
      why: 'GATE BT asks direct identification questions on cell culture conditions, hybridoma steps and transgenic workflows.',
      how: 'Drill the comparisons (media, potency, selection) and the named techniques with their inventors and years.',
      where: 'GATE BT Paper, Section on core biotechnology subjects.',
    },
    college: [
      'Matching items (frequently asked): DMEM→general, RPMI→lymphoid, IMDM→hybridoma; FBS→serum supplement; HAT→selection; ELISA→screening.',
      'Numbers: 37°C, 5% CO2, pH 7.2–7.4, ~1% founder efficiency in pronuclear injection.',
      'Chronology: HeLa 1951 → Hybridoma 1975 (Köhler–Milstein) → First transgenic mouse 1982 → iPSC 2006 (Yamanaka).',
    ],
    advanced: [
      'Conceptual traps: immortal ≠ transformed; integration ≠ expression; serum ≠ defined medium.',
      'Flow cytometry (FACS) does both sorting (cloning) and counting — one instrument, two roles.',
    ],
    gate: {
      highYield: [
        'HAT medium logic (aminopterin blocks de novo, salvage saves HGPRT+).',
        'Potency ladder and OSKM factors.',
        '3Rs order.',
        'Instrument→application mapping (FACS, ELISA, laminar flow).',
      ],
      traps: [
        'Options that swap "integration" and "expression" verification tools.',
        'Options that claim antibiotics clear mycoplasma.',
      ],
    },
    examples: [
      'Typical GATE style: "Which of the following is NOT required for hybridoma selection?" → PEG (that is fusion, not selection).',
      '"The order of 3Rs is..." → Replace, Reduce, Refine.',
    ],
    formulas: [],
    keyPoints: [
      'Memorise conditions: 37°C, 5% CO2, pH 7.4.',
      'Hybridoma pipeline: Immunise → Spleen → PEG fuse → HAT select → ELISA screen → Clone → Scale.',
      'Transgenic verification hierarchy: PCR → Southern → RT-PCR → Western.',
      'Years: 1951 HeLa, 1975 hybridoma, 1982 supermouse, 2006 iPSC.',
    ],
    revision: {
      remember: 'Culture numbers, hybridoma pipeline, 3Rs, verification ladder.',
      mistakes: ['Conflating selection (HAT) with screening (ELISA).'],
      summary: 'Animal bio GATE = conditions + hybridoma steps + transgenics pipeline + ethics order.',
    },
    related: ['an-culture', 'an-mab', 'an-transgenics'],
  },
];

// ============ BIOCHEMISTRY ============
export const TOPICS_BIO: Topic[] = [
  {
    id: 'bio-aa',
    subject: 'biochemistry',
    name: 'Amino Acids & Proteins',
    level: 1,
    priority: 'high',
    ord: 1,
    short: 'The 20 building blocks and protein structure levels.',
    basic: {
      what: 'Amino acids are small molecules with an amine group, a carboxyl group and a side chain (R group). Proteins are long chains of amino acids linked by peptide bonds that fold into 3D shapes.',
      why: 'Proteins do almost everything in the cell — enzymes, structure, transport, signalling. Everything downstream (enzymes, receptors, antibodies) starts here.',
      how: 'Amino acids join via condensation (peptide bond, −H2O). Sequence (primary) → local folds α-helix/β-sheet (secondary, H-bonds) → globular shape (tertiary, R-group interactions) → multi-subunit assemblies (quaternary).',
      where: 'Enzymes, haemoglobin, antibodies, collagen, insulin — all proteins.',
    },
    college: [
      'Essential amino acids (8 in adults): histidine, isoleucine, leucine, lysine, methionine, phenylalanine, threonine, valine.',
      'Sulphur: cysteine (disulphide bridges), methionine (start codon ATG).',
      'Aromatic: phenylalanine, tyrosine, tryptophan (absorb at 280 nm — protein quantification!).',
      'Structure stability: ionic, H-bond, hydrophobic, van der Waals, disulphide (covalent).',
      'Denaturation: loss of 3D structure (heat, pH, urea); primary sequence survives.',
    ],
    advanced: [
      'pI = (pKa1 + pKa2)/2 for simple amino acids; at pI the net charge is zero (isoelectric precipitation).',
      'Chirality: all protein amino acids are L-form; D-amino acids occur in bacterial cell walls.',
      'Zymogens: inactive precursors (trypsinogen → trypsin) prevent self-digestion.',
    ],
    gate: {
      highYield: [
        'Aromatic amino acids and 280 nm absorbance (A280 method).',
        'Essential amino acid list.',
        'Peptide bond is planar, trans, partially double-bond character.',
        'Denaturation reversibility: ribonuclease A refolds — classic example.',
      ],
      traps: [
        'Proline is an imino acid (cyclic, no NH2) — it disrupts α-helices.',
        'Glycine is achiral.',
        'Glycine + proline are the two exceptions to the L-amino-acid rule’s chirality.',
      ],
    },
    examples: [
      'Haemoglobin: 4 subunits (α2β2) — quaternary structure and cooperative O2 binding.',
      'Insulin: A and B chains linked by disulphide bridges; stored as proinsulin.',
    ],
    formulas: [{ name: 'Isoelectric point (simple)', expr: 'pI = (pKa1 + pKa2)/2' }],
    keyPoints: [
      'Peptide bond = C–N bond with partial double-bond character (planar).',
      'A280 from Trp/Tyr/Phe is how we measure protein concentration.',
      'pI: net charge zero; proteins precipitate at their pI.',
      'Denaturation destroys higher-order structure, not the sequence.',
    ],
    revision: {
      remember: 'A280 = Trp/Tyr/Phe; pI = zero net charge; denaturation keeps sequence.',
      mistakes: ['Calling proline a normal amino acid (imino acid).', 'Thinking denaturation breaks peptide bonds.'],
      summary: '20 amino acids (8 essential) → peptide bonds → 4 structure levels → function; A280, pI and denaturation are the exam anchors.',
    },
    related: ['bio-enzymes', 'mol-translation'],
  },
  {
    id: 'bio-enzymes',
    subject: 'biochemistry',
    name: 'Enzymes & Enzyme Kinetics',
    level: 1,
    priority: 'high',
    ord: 2,
    short: 'How enzymes work and the Michaelis–Menten math.',
    basic: {
      what: 'Enzymes are protein catalysts that speed reactions by lowering activation energy. They bind substrates at an active site and release products unchanged.',
      why: 'Every metabolic reaction is enzyme-catalysed; kinetics tells us how fast and how to control it — core to GATE numericals.',
      how: 'E + S → ES → E + P. At low [S], rate ∝ [S]; at high [S] the enzyme saturates (Vmax). Michaelis constant Km = [S] at half Vmax; kcat = Vmax/[E]total (turnover number).',
      where: 'Metabolism, bioprocesses (kinetic studies), drug design (inhibitors).',
    },
    college: [
      'Michaelis–Menten: v = Vmax[S]/(Km + [S]); Km = (k−1 + kcat)/k1.',
      'Inhibitors: competitive (↑Km, same Vmax; reversed by more S); non-competitive (same Km, ↓Vmax); uncompetitive (↓Km and ↓Vmax).',
      'Cofactors: metal ions (Zn in carbonic anhydrase) or organic (coenzymes: NAD+, FAD, CoA).',
      'Allosteric enzymes: sigmoidal kinetics, T/R states, cooperativity (haemoglobin-like).',
      'pH/temperature optima; denaturation above optimum.',
    ],
    advanced: [
      'Lineweaver–Burk (1/v vs 1/[S]): slope = Km/Vmax; intercept = 1/Vmax — inhibitor patterns are read from the double-reciprocal plot.',
      'Catalytic efficiency = kcat/Km; diffusion limit ~10^8–10^9 M−1s−1 (kinetic perfection, e.g. acetylcholinesterase).',
      'Transition state analogy: transition-state analogues are potent inhibitors (suicide inhibitors).',
    ],
    gate: {
      highYield: [
        'v = Vmax[S]/(Km+[S]) and Km definition.',
        'Competitive: Km↑ Vmax same; Non-competitive: Km same Vmax↓.',
        'Lineweaver–Burk plot reading (slope, intercept).',
        'kcat and catalytic efficiency kcat/Km.',
      ],
      traps: [
        'Uncompetitive inhibition lowers BOTH Km and Vmax (rare option!).',
        'Km is NOT the dissociation constant unless kcat << k−1.',
        'Vmax changes with enzyme amount; Km does not.',
      ],
    },
    examples: [
      'Statin drugs are competitive HMG-CoA reductase inhibitors (cholesterol lowering).',
      'Carbonic anhydrase (Zn2+) converts CO2 + H2O ↔ H2CO3 at near-diffusion limit.',
    ],
    formulas: [
      { name: 'Michaelis–Menten', expr: 'v = Vmax[S] / (Km + [S])' },
      { name: 'Turnover number', expr: 'kcat = Vmax / [E]total' },
      { name: 'Catalytic efficiency', expr: 'kcat / Km' },
      { name: 'Lineweaver–Burk', expr: '1/v = (Km/Vmax)(1/[S]) + 1/Vmax' },
    ],
    keyPoints: [
      'Km = [S] at v = Vmax/2.',
      'Competitive inhibitor competes with S (↑Km); non-competitive binds free or ES (↓Vmax).',
      'kcat/Km is the true efficiency number.',
      'Allosteric enzymes are sigmoidal, not hyperbolic.',
    ],
    revision: {
      remember: 'Km = half-Vmax substrate; competitive→Km↑; non-comp→Vmax↓.',
      mistakes: ['Thinking Km always equals Kd.', 'Confusing uncompetitive with non-competitive.'],
      summary: 'Michaelis–Menten + three inhibitor types + Lineweaver–Burk reading = the entire GATE enzyme kinetics problem set.',
    },
    related: ['bio-aa', 'bio-energy', 'num-enzyme-kinetics'],
  },
  {
    id: 'bio-sugars',
    subject: 'biochemistry',
    name: 'Carbohydrates',
    level: 1,
    priority: 'medium',
    ord: 3,
    short: 'Monosaccharides to polysaccharides and glycolysis input.',
    basic: {
      what: 'Carbohydrates are sugar molecules built from C, H, O (roughly CH2O units). They are the cell’s main quick fuel and structural material.',
      why: 'Glucose metabolism is the foundation of energy biology; glycosidic chemistry explains digestion and storage.',
      how: 'Monosaccharides (glucose, fructose, galactose) join via glycosidic bonds into disaccharides (maltose, lactose, sucrose) and polysaccharides (starch, glycogen, cellulose). Ring form: pyranose (6C) or furanose (5C).',
      where: 'Energy (glycolysis), storage (glycogen/starch), structure (cellulose, chitin).',
    },
    college: [
      'Glucose: aldohexose; fructose: ketohexose; galactose: C4 epimer of glucose.',
      'Glycosidic bonds: α-1,4 (starch/glycogen backbone), α-1,6 (branch points), β-1,4 (cellulose).',
      'Reducing sugars have a free anomeric carbon (glucose, lactose, maltose) — Benedict’s test positive; sucrose is non-reducing.',
      'Glycoproteins and glycolipids: N-linked (Asn, ER) vs O-linked (Ser/Thr, Golgi).',
    ],
    advanced: [
      'Haworth vs chair conformations; anomeric effect explains α/β preference.',
      'Hemiacetal formation of glucose is reversible — basis of mutarotation.',
    ],
    gate: {
      highYield: [
        'α vs β glycosidic linkages and which polymer each makes.',
        'Reducing vs non-reducing sugars (sucrose!).',
        'N-linked glycosylation starts on Asn in the ER.',
      ],
      traps: [
        'Sucrose = glucose + fructose, α1→β2, NON-reducing — classic trap.',
        'Cellulose β-1,4 cannot be digested by humans (no cellulase).',
      ],
    },
    examples: [
      'Lactose (galactose–glucose) is the milk sugar; lactase deficiency → lactose intolerance.',
      'Glycogen is the animal starch analogue, highly branched for rapid glucose release.',
    ],
    formulas: [],
    keyPoints: [
      'Aldose (aldehyde) vs ketose (ketone).',
      'α-1,4 linear; α-1,6 branching (glycogen); β-1,4 structural (cellulose).',
      'Reducing sugars: free anomeric C.',
      'N-glycans → Asn (ER); O-glycans → Ser/Thr (Golgi).',
    ],
    revision: {
      remember: 'Sucrose non-reducing; cellulose β-1,4; N-glycans on Asn.',
      mistakes: ['Calling sucrose reducing.', 'Mixing α/β branch points.'],
      summary: 'Monosaccharides + glycosidic chemistry → storage (α) vs structure (β) polysaccharides; reducing sugar tests.',
    },
    related: ['bio-energy', 'bio-lipids'],
  },
  {
    id: 'bio-lipids',
    subject: 'biochemistry',
    name: 'Lipids & Biological Membranes',
    level: 1,
    priority: 'medium',
    ord: 4,
    short: 'Fats, phospholipids and the membrane bilayer.',
    basic: {
      what: 'Lipids are hydrophobic molecules: fatty acids, fats (triglycerides), phospholipids, steroids and waxes. Phospholipids build all biological membranes.',
      why: 'The membrane defines the cell; lipids also store energy (triglycerides) and signal (steroids, eicosanoids).',
      how: 'Phospholipids are amphipathic — hydrophilic head, hydrophobic tails — so they spontaneously form bilayers in water. Cholesterol modulates fluidity. Fatty acids: saturated (straight) vs unsaturated (kinked, cis double bonds).',
      where: 'Cell membranes, myelin, fat storage, hormones (steroids).',
    },
    college: [
      'Membrane fluidity: ↑ with unsaturation and ↑ temperature; ↓ with cholesterol at high T, ↑ at low T (buffer).',
      'Lipid rafts: cholesterol + sphingolipid enriched microdomains for signalling.',
      'Membrane proteins: integral (span, hydrophobic) vs peripheral (electrostatic, removable).',
      'Transverse diffusion (flip-flop) is slow without flippases; lateral diffusion is fast.',
    ],
    advanced: [
      'Hammock model: gradient in membrane fluidity across the cell; glycolipids in the outer leaflet.',
      'GPI anchors attach proteins to the outer leaflet.',
    ],
    gate: {
      highYield: [
        'Factors increasing membrane fluidity (unsaturation, temperature, cholesterol at low T).',
        'Integral vs peripheral membrane protein properties.',
        'Flip-flop is slow; lateral diffusion is fast (Brownian).',
      ],
      traps: [
        'Cholesterol is a fluidity BUFFER, not a simple fluidiser.',
        'Sphingolipids and glycolipids are outer-leaflet enriched.',
      ],
    },
    examples: [
      'Arachidonic acid (20:4) is the precursor of prostaglandins, thromboxanes and leukotrienes.',
      'Glycerophospholipids vs sphingolipids: different backbones, same bilayer job.',
    ],
    formulas: [],
    keyPoints: [
      'Amphipathic phospholipid → spontaneous bilayer.',
      'Unsaturation ↑ fluidity; cholesterol buffers fluidity.',
      'Glycolipids/cephalins mark the outer leaflet; phosphatidylserine marks the inner (apoptosis signal when flipped out).',
    ],
    revision: {
      remember: 'Bilayer = amphipathic; unsat = fluid; cholesterol = buffer; PS outside = "eat me".',
      mistakes: ['Saying cholesterol always increases fluidity.'],
      summary: 'Phospholipid bilayer + cholesterol buffer + integral/peripheral proteins = membrane; flip-flop slow, lateral fast.',
    },
    related: ['bio-aa', 'cel-membrane'],
  },
  {
    id: 'bio-energy',
    subject: 'biochemistry',
    name: 'Energy Metabolism',
    level: 2,
    priority: 'high',
    ord: 5,
    short: 'Glycolysis, TCA cycle and oxidative phosphorylation.',
    basic: {
      what: 'Cells harvest energy from glucose in three linked stages: glycolysis (cytosol, 2 ATP), the TCA cycle (mitochondrial matrix, GTP) and oxidative phosphorylation (inner membrane, ~26–28 ATP from NADH/FADH2).',
      why: 'ATP yield calculations and regulation are staple GATE questions.',
      how: 'Glucose → 2 pyruvate + 2 ATP + 2 NADH (glycolysis). Pyruvate → acetyl-CoA (PDH complex, −CO2). Acetyl-CoA + 3NADH + FADH2 + GTP per turn (TCA). NADH/FADH2 feed the ETC: Complexes I–IV pump protons; ATP synthase (Complex V) makes ATP.',
      where: 'Every cell; the basis of fermentation when oxygen is absent.',
    },
    college: [
      'Glycolysis regulation: hexokinase, PFK-1 (committed step, allosteric), pyruvate kinase.',
      'TCA: citrate synthase, isocitrate dehydrogenase (rate-limiting, NAD+ dependent), α-ketoglutarate dehydrogenase.',
      'ETC: NADH → Complex I; FADH2 → Complex II (bypasses I → less ATP). O2 is the final electron acceptor.',
      'Substrate-level vs oxidative phosphorylation; P/O ratio concept.',
      'Fermentation: lactic (muscle, anaerobic bacteria) vs ethanol (yeast) — regenerates NAD+.',
    ],
    advanced: [
      'Chemiosmotic coupling (Mitchell): proton motive force Δp = Δψ − (2.303RT/F)ΔpH drives ATP synthase rotation (c-subunit ring rotation ~3 H+ per ATP for eukaryotes).',
      'Energy bookkeeping: 30–32 ATP per glucose depending on shuttle (malate-aspartate vs glycerol-3-phosphate).',
      'Uncouplers (2,4-DNP) collapse Δp → heat, no ATP; cyanide blocks Complex IV.',
    ],
    gate: {
      highYield: [
        'ATP yield per stage: glycolysis 2 ATP + 2 NADH; TCA 2 GTP; ETC totals.',
        'Regulated steps: PFK-1, isocitrate DH, citrate synthase; PDH as the gate.',
        'P/O ratio and shuttle differences (30 vs 32 ATP).',
        'NADH vs FADH2 entry points (I vs II).',
      ],
      traps: [
        'Older textbooks say 36–38 ATP; modern values are 30–32 (1.5/2.5 ATP per NADH/FADH2).',
        'PFK-1 is the committed step of glycolysis, not hexokinase.',
        'Acetyl-CoA carbons never become glucose (CO2 lost in TCA).',
      ],
    },
    examples: [
      'Cyanide poisoning: blocks Complex IV → no O2 reduction → cells suffocate chemically.',
      'Diabetes (no insulin) shifts cells to fatty acid oxidation → ketone bodies → ketoacidosis.',
    ],
    formulas: [
      { name: 'ATP per glucose (modern)', expr: '30–32 ATP (shuttle-dependent)' },
      { name: 'Proton motive force', expr: 'Δp = Δψ − (2.303 RT / F) ΔpH' },
    ],
    keyPoints: [
      'Glycolysis: 2 ATP (net), 2 NADH, cytosol.',
      'TCA per acetyl-CoA: 3 NADH, 1 FADH2, 1 GTP.',
      'NADH → Cx I; FADH2 → Cx II.',
      'Regulators: ATP inhibits, AMP activates; citrate inhibits PFK-1.',
    ],
    revision: {
      remember: '2 → 4 → ~30: glycolysis gives 2, TCA gives 4 reducing equivalents + 2 GTP, ETC does the rest.',
      mistakes: ['Using 36–38 ATP in modern-marking questions.', 'Forgetting PFK-1 is the regulatory gate.'],
      summary: 'Glucose → pyruvate → acetyl-CoA → TCA → ETC/ATP synthase; remember yields, regulated steps, and modern P/O numbers.',
    },
    related: ['bio-sugars', 'bio-lipids', 'bio-enzymes'],
  },
  {
    id: 'bio-nucl',
    subject: 'biochemistry',
    name: 'Nucleotides & Nucleic Acids',
    level: 2,
    priority: 'high',
    ord: 6,
    short: 'Purines, pyrimidines, DNA/RNA structure and salvage pathways.',
    basic: {
      what: 'Nucleotides = base + sugar + phosphate. DNA stores information; RNA transfers and expresses it; ATP is the energy currency — all from the same chemistry.',
      why: 'This is the bridge to molecular biology and recombinant DNA — every cloning technique assumes you know this.',
      how: 'Bases: purines (A, G — two rings) and pyrimidines (C, T, U — one ring). De novo synthesis builds from scratch; salvage reuses free bases. DNA polymerases read 3′→5′ and synthesize 5′→3′, needing a primer.',
      where: 'Replication, PCR, sequencing, antisense drugs.',
    },
    college: [
      'De novo purine: PRPP + glutamine + glycine + aspartate + CO2 + ATP → IMP → AMP/GMP.',
      'De novo pyrimidine: carbamoyl phosphate → orotate → UMP → CTP/TMP.',
      'Regulation: PRPP amidotransferase (de novo gate, allosteric); HGPRT (salvage, Lesch–Nyhan when absent).',
      'Antimetabolites: 5-fluorouracil (thymidylate synthase inhibitor), methotrexate (DHFR inhibitor), azathioprine (purine analog).',
      'DNA structure: B-DNA (right-handed, 10.5 bp/turn), A-DNA (dehydration), Z-DNA (left-handed).',
    ],
    advanced: [
      'Feedback loops: GMP inhibits IMP dehydrogenase (GMP→XMP step); CTP feedback-inhibits CAD (carbamoyl phosphate synthetase II).',
      'DNA repair: mismatch repair, nucleotide excision repair (Xeroderma pigmentosum defect), base excision repair.',
    ],
    gate: {
      highYield: [
        'PRPP is the common starter of de novo synthesis.',
        'HGPRT defect = Lesch–Nyhan (also the hybridoma selection enzyme!).',
        'Drug targets: MTX→DHFR, 5-FU→thymidylate synthase.',
        '5′→3′ synthesis direction; primer requirement.',
      ],
      traps: [
        'TMP comes from dUMP (not UMP) — thymidylate synthase uses N5,N10-methylene-THF.',
        'DNA polymerase reads template 3′→5′ but SYNTHESIZES 5′→3′.',
      ],
    },
    examples: [
      'Azidothymidine (AZT) — a thymidine analog that terminates DNA chains (HIV drug).',
      'Ribavirin + interferon for hepatitis: nucleoside analog incorporation.',
    ],
    formulas: [],
    keyPoints: [
      'Purines 2 rings (AG), pyrimidines 1 ring (CTU).',
      'PRPP = de novo starter; HGPRT = salvage (Lesch–Nyhan).',
      '5′→3′ synthesis; primer needed; template read 3′→5′.',
      'MTX → DHFR; 5-FU → thymidylate synthase.',
    ],
    revision: {
      remember: 'PRPP starts, HGPRT saves, 5′→3′ builds, MTX/5-FU target it.',
      mistakes: ['Mixing up which drug hits which enzyme.'],
      summary: 'Nucleotide biosynthesis (de novo + salvage) + antimetabolite targets + DNA/RNA structural forms.',
    },
    related: ['mol-replication', 'mol-transcription', 'an-mab'],
  },
  {
    id: 'bio-reg',
    subject: 'biochemistry',
    name: 'Metabolic Regulation',
    level: 3,
    priority: 'medium',
    ord: 7,
    short: 'How the cell balances anabolism and catabolism.',
    basic: {
      what: 'Metabolism is a network, not a pipeline. The cell regulates it so building (anabolism) and breaking down (catabolism) never happen wastefully at once.',
      why: 'Reciprocal regulation (insulin vs glucagon, AMPK vs mTOR) is a classic GATE conceptual area.',
      how: 'Three layers: allosteric regulation (fast, e.g. ATP on PFK), covalent modification (phosphorylation by kinases), and hormonal control (insulin activates, glucagon/cortisol/epinephrine mobilise).',
      where: 'Blood glucose homeostasis, liver vs muscle behaviour, cancer metabolism (Warburg effect).',
    },
    college: [
      'Glucose homeostasis: insulin (fed) → storage (glycogen, fat); glucagon/epinephrine (fasted) → mobilisation.',
      'Reciprocal enzymes: PFK-1 (glycolysis) vs FBPase-1 (gluconeogenesis) are NEVER both active.',
      'Gluconeogenesis bypasses 3 irreversible glycolytic steps (pyruvate carboxylase, PEPCK, FBPase-1, glucose-6-phosphatase).',
      'Hormonal cascades: cAMP → PKA phosphorylation; Ca2+ signalling in muscle.',
    ],
    advanced: [
      'AMPK is the energy sensor: high AMP/ATP ratio activates catabolism, blocks anabolism (mTOR inhibition).',
      'Fatty acid oxidation ↔ synthesis are reciprocally regulated by malonyl-CoA (inhibits CPT-1).',
      'Warburg effect: aerobic glycolysis in cancer cells — lactate despite oxygen.',
    ],
    gate: {
      highYield: [
        'The 4 gluconeogenesis bypass enzymes.',
        'Reciprocal regulation pairs (PFK-1/FBPase-1, ACC/FAS vs CPT-1).',
        'Insulin (anabolic, dephosphorylation) vs glucagon (catabolic, phosphorylation) effects.',
        'AMPK as the energy charge sensor.',
      ],
      traps: [
        'Gluconeogenesis is not the reverse of glycolysis (3 steps bypassed).',
        'Malonyl-CoA INHIBITS CPT-1 — fat synthesis stops fat burning.',
      ],
    },
    examples: [
      'Diabetes type 1: no insulin → glycogenolysis + gluconeogenesis unopposed → hyperglycaemia.',
      'Metformin activates AMPK → reduces hepatic glucose output.',
    ],
    formulas: [],
    keyPoints: [
      'Allosteric (fast) + covalent (medium) + hormonal (slow) = three control layers.',
      '4 bypass enzymes of gluconeogenesis.',
      'Malonyl-CoA blocks CPT-1 (reciprocal FA synthesis/oxidation).',
      'AMPK = energy sensor; mTOR = growth sensor.',
    ],
    revision: {
      remember: 'Insulin builds (dephosphorylates), glucagon breaks (phosphorylates); malonyl-CoA flips the FA switch.',
      mistakes: ['Listing gluconeogenesis as simple reversal of glycolysis.'],
      summary: 'Reciprocal enzyme pairs + hormone cascades + energy sensors (AMPK/mTOR) control metabolism.',
    },
    related: ['bio-energy', 'bio-enzymes'],
  },
  {
    id: 'bio-gate',
    subject: 'biochemistry',
    name: 'GATE Focus: Biochemistry Numericals & Traps',
    level: 4,
    priority: 'high',
    ord: 8,
    short: 'The biochemistry questions GATE actually asks.',
    basic: {
      what: 'A consolidation of the highest-yield biochemistry facts, equations and classic traps for GATE BT.',
      why: 'Biochemistry contributes consistently to GATE BT, mostly through enzyme kinetics and energy numbers.',
      how: 'Master: Michaelis–Menten, ATP bookkeeping, A280, pI, and reducing sugar tests.',
      where: 'GATE BT question paper.',
    },
    college: [
      'Kinetics problem template: given v at two [S], find Km/Vmax (Lineweaver–Burk).',
      'ATP yield: count NADH/FADH2 per stage, multiply by 2.5/1.5.',
      'Protein quantification: A280 → 1 mg/mL for many proteins (extinction coefficient matters).',
      'pH and buffers: Henderson–Hasselbalch pH = pKa + log([A−]/[HA]).',
    ],
    advanced: [
      'Inhibitor plots: read slope/intercept to classify inhibition type.',
      'Osmolarity and tonicity questions in cell culture context.',
    ],
    gate: {
      highYield: [
        'Km, Vmax, kcat, kcat/Km definitions and units.',
        'Modern ATP numbers (30–32) and P/O ratio.',
        'A280 aromatic residues; pI calculation; Henderson–Hasselbalch.',
      ],
      traps: [
        'Competitive inhibitor options that claim Vmax changes.',
        'Questions giving "3 ATP per NADH" (old) vs "2.5" (modern) — follow the latest P/O convention.',
      ],
    },
    examples: [
      'If v = Vmax/3 at [S] = 2 mM, then 2/(Km+2) = 1/3 → Km = 4 mM.',
      'Lactic acid fermentation yields 2 ATP/glucose vs ~30 aerobically — a 15× efficiency question.',
    ],
    formulas: [
      { name: 'Henderson–Hasselbalch', expr: 'pH = pKa + log([A−]/[HA])' },
      { name: 'A280 (approx.)', expr: '1 A280 ≈ 1 mg/mL protein' },
    ],
    keyPoints: [
      'Always state the P/O convention used (2.5/1.5 modern).',
      'Km = [S] at half Vmax — the single most asked definition.',
      'pI at zero net charge; precipitation at pI.',
    ],
    revision: {
      remember: 'Km, 30–32 ATP, A280, pI, Henderson–Hasselbalch — the five anchors.',
      mistakes: ['Using legacy 36–38 ATP numbers without checking the paper’s convention.'],
      summary: 'Kinetics + energy bookkeeping + acid–base math = biochemistry GATE.',
    },
    related: ['bio-enzymes', 'bio-energy'],
  },
];

// ============ BIOINFORMATICS ============
export const TOPICS_INF: Topic[] = [
  {
    id: 'inf-dbs',
    subject: 'bioinformatics',
    name: 'Biological Databases & BLAST',
    level: 1,
    priority: 'high',
    ord: 1,
    short: 'Where sequence data lives and how BLAST finds matches.',
    basic: {
      what: 'Biological databases are organised collections of sequence and structure data (GenBank, EMBL, DDBJ for nucleotides; UniProt for proteins; PDB for structures). BLAST is the algorithm that compares a query sequence against these databases.',
      why: 'Every molecular biology workflow starts by asking "what is this sequence?" — that question is answered by BLAST.',
      how: 'BLAST breaks the query into short words (seed matches), extends them into high-scoring segment pairs (HSPs), and reports significance by E-value (expected chance matches).',
      where: 'Gene identification, primer design, homology search, metagenomics.',
    },
    college: [
      'BLAST variants: BLASTn (nuc–nuc), BLASTp (prot–prot), BLASTx (query nuc translated 6 frames vs prot db), tBLASTn (prot query vs translated db), DELTA/pSL (composition-based stats).',
      'Parameters: word size (3 for BLASTn, 3 for blastp default), expect threshold (E < 1e−5 typical), gap costs (open 5, extend 2 typical).',
      'E-value: E = Kmn·e^(−λS); lower = more significant; depends on database size.',
      'NCBI resources: GenBank, RefSeq (curated), UniProt (Swiss-Prot curated + TrEMBL automated), PDB, NR (non-redundant).',
    ],
    advanced: [
      'Gapped BLAST uses affine gap penalties; ungapped BLASTZ for whole-genome alignment at low complexity.',
      'Composition-based statistics reduce false positives in AT/GC-biased queries.',
    ],
    gate: {
      highYield: [
        'E-value meaning and dependence on database size and word score.',
        'BLASTx vs tBLASTn direction of translation (classic question!).',
        'Word size and gap penalty defaults.',
      ],
      traps: [
        'BLASTx: NUCLEOTIDE query is translated; tBLASTn: DATABASE is translated.',
        'A low E-value can still be a short spurious match; look at bit score and coverage too.',
      ],
    },
    examples: [
      'A novel ORF BLASTx hit to "glutamine synthetase" with E=1e−40 strongly suggests function.',
      'PDB structure search by sequence (BLAST against PDB) identifies fold families.',
    ],
    formulas: [
      { name: 'E-value', expr: 'E = K m n e^(−λS)' },
    ],
    keyPoints: [
      'E-value: expected random matches; smaller = better.',
      'BLASTx = translate query; tBLASTn = translate database.',
      'RefSeq/UniProt curated; NR/TrEMBL broad.',
    ],
    revision: {
      remember: 'x = query translated, n = database; E = Kmn·e^−λS.',
      mistakes: ['Swapping BLASTx and tBLASTn.'],
      summary: 'GenBank/UniProt/PDB + BLAST word-seed-extend + E-value statistics.',
    },
    related: ['inf-align', 'inf-phylo'],
  },
  {
    id: 'inf-align',
    subject: 'bioinformatics',
    name: 'Sequence Alignment',
    level: 1,
    priority: 'high',
    ord: 2,
    short: 'Lining up sequences to find similarity — local vs global.',
    basic: {
      what: 'Sequence alignment places two or more sequences opposite each other, inserting gaps, to reveal evolutionary or functional similarity.',
      why: 'Alignment underpins homology search, phylogenetics, motif finding and structural prediction.',
      how: 'Global (Needleman–Wunsch) aligns full lengths via dynamic programming; local (Smith–Waterman) finds the best local region by resetting negative scores to zero. Scoring: match +, mismatch −, gap −.',
      where: 'BLAST internals, multiple sequence alignment (ClustalW, MUSCLE), domain analysis.',
    },
    college: [
      'Scoring matrix: substitution matrices (PAM for closely related, BLOSUM for diverse; BLOSUM62 standard for proteins).',
      'Affine gap penalty: open (d) + extend (e) per position — better than linear gap model.',
      'MSA heuristics: progressive (ClustalW), tree-guided; conserved columns drive the guide tree.',
      'Identity vs similarity: identity = exact matches; similarity = weighted by matrix (similar residues count partially).',
    ],
    advanced: [
      'Complexity: NW/SW are O(n²); BLAST approximates with seeds (O(n) effective).',
      'Consistency-based refinement (MUSCLE/T-Coffee) improves MSA accuracy on hard sets.',
    ],
    gate: {
      highYield: [
        'NW = global, SW = local; when to use which.',
        'BLOSUM vs PAM choice logic (BLOSUM62 default).',
        'Affine gap penalty form: score = d + e·(length−1) or d + e·length.',
      ],
      traps: [
        'SW never scores below zero — it is the local best, not the full alignment.',
        'BLOSUM numbers: HIGHER number = CLOSER relatives (BLOSUM80 > BLOSUM45 in specificity).',
      ],
    },
    examples: [
      'Aligning a short unknown domain against a full-length protein → use Smith–Waterman (local).',
      'BLOSUM62 gives +4 for Leu–Ile (similar hydrophobes), negative for Leu–Asp.',
    ],
    formulas: [
      { name: 'Affine gap', expr: 'gap(len) = d + e·(len−1)' },
      { name: 'Identity', expr: 'identical positions / aligned positions × 100%' },
    ],
    keyPoints: [
      'Global = full length (NW); Local = best region (SW, reset to 0).',
      'BLOSUM62 is the default protein matrix; higher BLOSUM = closer sequences.',
      'Affine gaps: open cost + per-residue extend cost.',
    ],
    revision: {
      remember: 'NW global, SW local; BLOSUM high = close; affine = open + extend.',
      mistakes: ['Reading BLOSUM number backwards (higher ≠ more distant).'],
      summary: 'DP alignment + matrices (BLOSUM/PAM) + affine gaps + MSA heuristics.',
    },
    related: ['inf-dbs', 'inf-phylo', 'num-alignment-score'],
  },
  {
    id: 'inf-motif',
    subject: 'bioinformatics',
    name: 'Motif Analysis & PSSMs',
    level: 2,
    priority: 'medium',
    ord: 3,
    short: 'Finding conserved patterns in protein families.',
    basic: {
      what: 'A motif is a short conserved sequence/structure pattern with a shared function (e.g. zinc finger, kinase domain). Position-Specific Scoring Matrices (PSSMs) quantify how likely each residue is at each position of an alignment.',
      why: 'Motifs define functional domains; PSSMs improve remote homology detection (PSI-BLAST).',
      how: 'Multiple align a family → count residues per position → build a frequency matrix → convert to log-odds scoring (PSSM) → scan new sequences.',
      where: 'Prosite/INTERPRO motifs, transcription factor binding sites, domain detection.',
    },
    college: [
      'PSSM: S(i,a) = log2 (p_observed / p_background); positive scores = over-represented residues.',
      'PSI-BLAST iteratively builds position-specific HMM-like scores from each round’s hits, detecting remote homologs.',
      'Regular expressions for motifs: [FYW]xx[KR] — bracket = any of, x = any residue.',
      'Profile HMMs (HMMER) generalize PSSMs with insert/delete states — more sensitive.',
    ],
    advanced: [
      'PSSM background frequencies (mononucleotide/dipeptide) affect score calibration.',
      'E-value of a PSSM scan depends on the number of positions scored.',
    ],
    gate: {
      highYield: [
        'PSSM = log-odds of observed vs background.',
        'PSI-BLAST improves remote homology sensitivity.',
        'Motif regular expression notation.',
      ],
      traps: [
        'PSSM ≠ position-specific HMM (HMM adds indel states).',
        'Negative PSSM scores mean the residue is UNLIKELY at that position.',
      ],
    },
    examples: [
      'Protease consensus [DE]…[SN]…C (chymotrypsin-like serine protease).',
      'A PSI-BLAST round 3 hit at E=0.01 can reveal a distant kinase.',
    ],
    formulas: [
      { name: 'PSSM score', expr: 'S(i,a) = log2 (f_ia / b_a)' },
    ],
    keyPoints: [
      'PSSM: log-odds, per position, per residue.',
      'PSI-BLAST = iterative PSSM-driven search.',
      'Motif regex: brackets = any of the listed residues.',
    ],
    revision: {
      remember: 'PSSM = log(observed/background); PSI-BLAST iterates it.',
      mistakes: ['Treating PSSM and profile HMM as identical.'],
      summary: 'Consensus motifs → PSSM log-odds → PSI-BLAST remote homology.',
    },
    related: ['inf-align', 'inf-phylo'],
  },
  {
    id: 'inf-phylo',
    subject: 'bioinformatics',
    name: 'Phylogenetics',
    level: 2,
    priority: 'high',
    ord: 4,
    short: 'Building and reading evolutionary trees.',
    basic: {
      what: 'Phylogenetics reconstructs evolutionary relationships among species/sequences as a tree. Branch lengths can represent number of changes or time.',
      why: 'Trees are how we date gene families, track epidemics and classify organisms.',
      how: 'Compute a distance matrix (p-distance, Jukes–Cantor, Kimura) → build tree by UPGMA (additive, rooted) or neighbor-joining (unrooted) → or maximize likelihood (ML) / parsimony / Bayesian posterior.',
      where: 'Taxonomy, viral evolution, gene duplication history.',
    },
    college: [
      'Distance models: Jukes–Cantor d = −(3/4) ln(1 − 4p/3); corrects multiple hits.',
      'UPGMA assumes a molecular clock (equal rates) → rooted; NJ does not.',
      'Parsimony: minimize total changes; sensitive to long-branch attraction.',
      'Maximum likelihood: probability of data given tree + model; bootstrap values measure confidence (70% = reasonable support).',
      'Rooting: outgroup, midpoint, molecular clock.',
    ],
    advanced: [
      'Long-branch attraction: fast-evolving lineages cluster artificially under parsimony/distance methods; ML with good models mitigates.',
      'Bayesian (MrBayes): posterior probability per clade, priors on models.',
      'Gene trees vs species trees: ILS (incomplete lineage sorting), HGT complicate congruence.',
    ],
    gate: {
      highYield: [
        'JC/K2 distance formulas and what they correct.',
        'UPGMA (clock) vs NJ (no clock).',
        'Bootstrap interpretation (resampling confidence, NOT probability of clade being true).',
      ],
      traps: [
        'Bootstrap 95% ≠ "95% chance the clade is true" — it measures robustness to resampling.',
        'Parsimony with unequal rates → long-branch attraction.',
      ],
    },
    examples: [
        'HIV subtype tracking uses NJ on env gene sequences for outbreak phylogeography.',
        'Cytochrome c distances give classic eukaryote trees.',
    ],
    formulas: [
      { name: 'Jukes–Cantor', expr: 'd = −(3/4) ln(1 − 4p/3)' },
      { name: 'p-distance', expr: 'd = mismatches / aligned sites' },
    ],
    keyPoints: [
      'Distances: p → JC → K2 (progressive multiple-hit correction).',
      'UPGMA = clock; NJ = no clock; ML = model-based.',
      'Bootstrap = resampling robustness.',
    ],
    revision: {
      remember: 'JC fixes multiple hits; UPGMA needs a clock; bootstrap = robustness.',
      mistakes: ['Misreading bootstrap as clade probability.'],
      summary: 'Distance → tree (UPGMA/NJ) or character-based (parsimony/ML/Bayes); correct models matter.',
    },
    related: ['inf-align', 'inf-genome'],
  },
  {
    id: 'inf-structure',
    subject: 'bioinformatics',
    name: 'Protein Structure Prediction',
    level: 3,
    priority: 'medium',
    ord: 5,
    short: 'From sequence to 3D: homology, threading, AlphaFold.',
    basic: {
      what: 'Protein structure prediction infers 3D shape from sequence. Structure is more conserved than sequence — 20–30% identity often still allows reliable modelling.',
      why: 'Structure explains function, drug binding and disease mutations.',
      how: 'If a homologous structure exists → comparative (homology) modelling. If distant → threading/fold recognition (fitting sequence to known folds). If none → ab initio/de novo (physics-based, now largely supplanted by deep learning).',
      where: 'Drug design (active site mapping), enzyme engineering, disease variant interpretation.',
    },
    college: [
      'Homology modelling: template selection (BLAST) → alignment → backbone copy → loop modelling → side-chain placement → refinement (Rosetta).',
      'Threading: score sequence–fold compatibility (contact potentials, solvation).',
      'Secondary structure: α-helix, β-sheet, turn; predicted by Chou–Fasman/NN methods.',
      'Validation: Ramachandran plot (φ/ψ angles; >90% core), QMEAN, MolProbity.',
    ],
    advanced: [
      'AlphaFold2: Evoformer MSA attention + structure module; pLDDT per-residue confidence (90+ high, 70–90 confident, 50–70 low, <50 very low).',
      'CASP scoreboard: GDT_TS metric; AlphaFold pushed mean GDT from ~60 to ~90 range.',
    ],
    gate: {
      highYield: [
        'Method hierarchy: homology > threading > ab initio (by reliability).',
        'pLDDT interpretation bands.',
        'Ramachandran plot validation.',
      ],
      traps: [
        'Ab initio is the LEAST reliable, not the most "fundamental" — exam traps on method ordering.',
        'Low sequence identity does not preclude homology modelling (structure more conserved).',
      ],
    },
    examples: [
      'pLDDT < 50 on a loop → model that region with caution.',
      'Drug docking into an AlphaFold model of a druggable target (e.g. SARS-CoV-2 Mpro in 2020).'],
    formulas: [],
    keyPoints: [
      'Structure conserved better than sequence (20–30% OK).',
      'pLDDT: ≥90 high, 70–90 confident, <50 very low.',
      'Ramachandran: >90% in allowed regions = good model.',
    ],
    revision: {
      remember: 'Homology first; pLDDT bands; Ramachandran >90%.',
      mistakes: ['Ranking ab initio above homology.'],
      summary: 'Template modelling → threading → DL (AlphaFold2 pLDDT); validate with Ramachandran.',
    },
    related: ['inf-align', 'ins-spectro'],
  },
  {
    id: 'inf-rnaseq',
    subject: 'bioinformatics',
    name: 'RNA-Seq & Transcriptomics',
    level: 3,
    priority: 'medium',
    ord: 6,
    short: 'Quantifying gene expression with sequencing.',
    basic: {
      what: 'RNA-seq sequences all RNA in a sample to quantify which genes are expressed and at what level — thousands of genes at once.',
      why: 'It reveals how cells respond to treatment, disease and development.',
      how: 'Extract RNA → (optional rRNA depletion / polyA selection) → cDNA → short reads → align to genome or quantify transcriptome → count per gene → normalise (RPKM/FPKM/TPM, or DESeq2 size factors) → differential expression (fold change + p-value).',
      where: 'Cancer subtyping, drug response, developmental time courses.',
    },
    college: [
      'Normalisation: RPKM/FPKM (length + depth), TPM (sums to 1); DESeq2 uses median-of-ratios size factors for count data.',
      'Differential expression: |log2 fold change| ≥ 1 AND adjusted p < 0.05 typical threshold.',
      'QC: mapping rate >70%, rRNA fraction, 3′ bias, PCA for batch effects.',
      'Single-cell RNA-seq: droplet-based (10x), UMI for molecule counting.',
    ],
    advanced: [
      'Alternative splicing detection (rMATS, STAR 2-pass); isoform quantification (Salmon/Kallisto quasi-mapping).',
      'Batch effect correction: Combat, SVA; integration across samples (Harmony, Seurat WNN).',
    ],
    gate: {
      highYield: [
        'TPM vs RPKM vs raw counts; why DE tools use raw counts + size factors.',
        'DE threshold: log2FC ≥ 1, FDR < 0.05.',
        'UMIs correct PCR duplication in scRNA-seq.',
      ],
      traps: [
        'RPKM is for within-sample comparison; TPM for between-sample (per million transcripts).',
        'Fold change alone is meaningless without statistical significance.',
      ],
    },
    examples: [
      'A 4-fold upregulated kinase gene (p=1e−6) after drug treatment → candidate target.',
      'PCA plot separating treated vs control shows the effect before any gene list.'],
    formulas: [
      { name: 'TPM', expr: 'TPM = (scaled reads / gene length) normalised to 1e6' },
    ],
    keyPoints: [
      'Pipeline: RNA → cDNA → reads → align/count → normalise → DE.',
      'DE = |log2FC| ≥ 1 and FDR < 0.05.',
      'UMIs count molecules, not reads.',
    ],
    revision: {
      remember: 'Counts + size factors → DE (log2FC≥1, FDR<0.05); TPM between samples.',
      mistakes: ['Using RPKM across samples.'],
      summary: 'RNA-seq pipeline + normalisation logic + DE thresholds + scRNA-seq UMIs.',
    },
    related: ['inf-genome', 'mol-transcription'],
  },
  {
    id: 'inf-genome',
    subject: 'bioinformatics',
    name: 'Genome Assembly & Annotation',
    level: 3,
    priority: 'low',
    ord: 7,
    short: 'From raw reads to a finished, annotated genome.',
    basic: {
      what: 'Genome assembly stitches short reads into long contiguous sequences (contigs → scaffolds); annotation identifies genes, repeats and regulatory elements.',
      why: 'A raw genome is a pile of reads; assembly + annotation makes it interpretable.',
      how: 'De Bruijn graph assemblers (short reads: SPAdes, Velvet) or overlap-layout-consensus (long reads: Canu, Hifiasm). Gaps (N) between contigs → scaffolds (paired ends/Hi-C). Then gene prediction (ab initio: GeneMark; evidence-based: Augustus), repeats (RepeatMasker), functional assignment (BLAST, InterProScan).',
      where: 'New species genomics, pathogen tracking, crop breeding.',
    },
    college: [
      'N50: length at which 50% of the assembly is covered by contigs of that length or longer — assembly continuity metric.',
      'GC content and coverage depth guide quality; uneven coverage suggests contamination or repeats.',
      'Repeat content: simple repeats, transposons, satellites — the hardest part of assembly.',
      'Functional annotation: GO terms, KEGG pathways, Pfam domains.',
    ],
    advanced: [
      'Long-read (PacBio HiFi, Oxford Nanopore) + Hi-C optical mapping achieve chromosome-scale scaffolds; telomere-to-telomere genomes (T2T-CHM13, 2020).',
      'Pangenomes capture structural variation a single linear reference misses.',
    ],
    gate: {
      highYield: [
        'N50 definition and interpretation.',
        'De Bruijn (short) vs OLC (long) assemblers.',
        'Annotation pipeline order: repeats → genes → function.',
      ],
      traps: [
        'Higher N50 = better continuity, but a single huge N50 can hide misassemblies — check k-mer consistency too.',
        'Contig ≠ scaffold: scaffolds have gaps.',
      ],
    },
    examples: [
      'T2T CHM13 closed the human centromeres — 8% of the genome previously unassemblable.',
      'SARS-CoV-2 genomes assembled in days from nanopore reads during 2020.'],
    formulas: [
      { name: 'N50', expr: 'smallest contig length L such that contigs ≥ L cover ≥50% of assembly' },
    ],
    keyPoints: [
      'Contig (no gaps) → scaffold (with gaps) → chromosome.',
      'N50 = continuity metric (bigger is generally better).',
      'De Bruijn for short reads; HGC for long reads.',
      'Annotate repeats before genes.',
    ],
    revision: {
      remember: 'Contig→scaffold; N50 up = better; repeats first, genes second.',
      mistakes: ['Calling a gapped sequence a contig.'],
      summary: 'Assembly (graph/OLC) → scaffolding (Hi-C) → annotation (repeats→genes→function).',
    },
    related: ['inf-rnaseq', 'rdt-sequencing'],
  },
  {
    id: 'inf-gate',
    subject: 'bioinformatics',
    name: 'GATE Focus: Bioinformatics Numericals',
    level: 4,
    priority: 'high',
    ord: 8,
    short: 'Alignment, E-value and phylogeny math for GATE.',
    basic: {
      what: 'Bioinformatics on GATE is mostly arithmetic: alignment scores, E-values, phylogenetic distances and sequence identity percentages.',
      why: 'These are the few bioinformatics topics with clean numbers — predictable question material.',
      how: 'Practice: scoring an alignment by hand, computing E from K, m, n, S; JC distance from p; identity % from an MSA column.',
      where: 'GATE BT paper.',
    },
    college: [
      'Alignment scoring: score = (matches×match) − (mismatches×mismatch) − (gaps×gap).',
      'E = Kmn e^−λS: halve S → E increases (worse).',
      'JC: d = −(3/4) ln(1 − 4p/3); for small p, d ≈ p.',
      'Sequence identity: (identical positions)/(aligned positions).',
    ],
    advanced: [
      'Log-odds PSSM summing over positions.',
      'Fold change and log2FC conversions in RNA-seq questions.',
    ],
    gate: {
      highYield: [
        'Hand-computing alignment scores with affine gaps.',
        'E-value scaling with database size.',
        'JC/K2 distance from observed p.',
      ],
      traps: [
        'Forgetting gap OPEN cost applies once per gap, not per residue.',
        'p-distance ≠ evolutionary distance (multiple hits).',
      ],
    },
    examples: [
      'Alignment: 10 matches (+1), 2 mismatches (−1), 1 gap of length 2 (open 2 + extend 1×1): 10 − 2 − 3 = 5.',
      'p = 0.1 → JC d = −(3/4) ln(1 − 0.4/3... ) = −(3/4) ln(2/3) ≈ 0.107.'],
    formulas: [
      { name: 'Alignment score', expr: 'S = m·M − x·X − (g·(d + e·(len−1)))' },
      { name: 'E-value', expr: 'E = K m n e^(−λS)' },
    ],
    keyPoints: [
      'Gap cost = open + extend×(len−1).',
      'E scales linearly with m·n.',
      'JC corrects for multiple hits.',
    ],
    revision: {
      remember: 'Score arithmetic, E = Kmn e^−λS, JC for distance.',
      mistakes: ['Charging open cost per gap residue.'],
      summary: 'Three computations: alignment score, E-value, JC distance — drill until automatic.',
    },
    related: ['inf-align', 'inf-dbs', 'inf-phylo'],
  },
];

// ============ BIOINSTRUMENTATION ============
export const TOPICS_INS: Topic[] = [
  {
    id: 'ins-sensors',
    subject: 'bioinstrumentation',
    name: 'Sensors & Transducers',
    level: 1,
    priority: 'high',
    ord: 1,
    short: 'Converting biological/physical signals into electrical data.',
    basic: {
      what: 'A sensor detects a physical or chemical quantity; a transducer converts it into an electrical signal we can measure. pH electrodes, pressure cells, thermocouples and dissolved-oxygen probes are all transducers.',
      why: 'Bioprocesses are controlled by their sensors — if the DO probe is wrong, the whole fermentation fails.',
      how: 'Typical chain: biological event → transduction (physical/chemical → electrical) → signal conditioning (amplification, filtering) → display/recording.',
      where: 'Bioreactor control, medical monitoring, environmental monitoring.',
    },
    college: [
      'Resistive sensors: RTD (Pt100, +0.385%/°C), thermistor (NTC, highly non-linear).',
      'Thermocouple: Seebeck effect; type K (chromel-alumel) common in labs.',
      'pH electrode: glass membrane potential follows Nernst equation (−59.16 mV/pH at 25°C).',
      'Pressure: strain gauge ( Wheatstone bridge), piezoelectric (dynamic pressure).',
      'DO: Clark (polarographic, membrane + cathode consumes O2) vs optode (quenching of Ru-complex luminescence).',
    ],
    advanced: [
      'Clark DO probes drift (cathode depletion, membrane fouling) and respond slowly (~30–60 s); optodes are faster and drift-free but costly.',
      'Capacitive humidity and load-cell principles; piezoresistive MEMS for pressure.',
    ],
    gate: {
      highYield: [
        'Nernst slope: −59.16 mV per pH unit at 25°C (−54.2 at 37°C).',
        'Clark DO = amperometric (polarographic); optode = luminescence quenching.',
        'RTD positive coefficient; NTC thermistor negative.',
      ],
      traps: [
        'Optode DO measures QUENCHING (more O2 = less luminescence) — inverse relationship.',
        'Thermocouples need cold-junction compensation; RTDs need excitation current (self-heating).',
      ],
    },
    examples: [
      'A bioreactor DO setpoint of 40% saturation triggers increased agitation/aeration.',
      'Heart-rate monitoring via photoplethysmography (PPG) is a transduction chain.'],
    formulas: [
      { name: 'Nernst (pH)', expr: 'E = E° − (2.303 RT / F) pH ≈ E° − 59.16 mV·pH (25°C)' },
    ],
    keyPoints: [
      'Sensor = detect; transducer = convert to electrical.',
      'pH: −59.16 mV/pH (25°C).',
      'DO: Clark (amperometric) vs optode (quenching).',
      'RTD +ve TCR; NTC −ve TCR.',
    ],
    revision: {
      remember: 'pH slope −59 mV; Clark consumes O2; optode quenches.',
      mistakes: ['Saying optode luminescence increases with O2.'],
      summary: 'Transducer taxonomy + Nernst for pH + Clark/optode for DO + bridge circuits for resistance sensors.',
    },
    related: ['ins-signals', 'ins-assays'],
  },
  {
    id: 'ins-signals',
    subject: 'bioinstrumentation',
    name: 'Signal Conditioning & Analysis',
    level: 1,
    priority: 'medium',
    ord: 2,
    short: 'Amplification, filtering and the Fourier view of biosignals.',
    basic: {
      what: 'Raw biosignals (ECG, EMG, sensor outputs) are tiny and noisy. Signal conditioning amplifies, filters and conditions them before analysis or display.',
      why: 'A 1 mV ECG buried in 50 Hz mains noise is useless without proper conditioning.',
      how: 'Differential amplification rejects common-mode noise (CMRR); low/high/band-pass filters remove out-of-band noise; A/D conversion with proper sampling (Nyquist: fs > 2fmax).',
      where: 'ECG/EEG machines, biosignal acquisition, process instrumentation.',
    },
    college: [
      'CMRR = Ad/Acm (dB); high CMRR essential for ECG (CM noise >> signal).',
      'Filters: RC (first order), Butterworth (maximally flat), Chebyshev (steeper, ripple); order determines slope (20 dB/decade per pole).',
      'Fourier analysis: any signal = sum of sinusoids; power spectral density reveals dominant frequencies (EEG alpha 8–13 Hz).',
      'A/D: resolution (bits), sampling rate (Nyquist), aliasing if undersampled.',
    ],
    advanced: [
      'Lock-in amplification: modulate signal at reference frequency, demodulate — extracts tiny signals in noise (optode DO, fluorometry).',
      'Wavelet transforms for non-stationary biosignals (ECG beat detection).',
    ],
    gate: {
      highYield: [
        'Nyquist: fs ≥ 2·fmax to avoid aliasing.',
        'CMRR definition and importance in ECG.',
        'Filter slope: 20 dB/decade per pole.',
      ],
      traps: [
        'Sampling exactly at 2fmax is marginal — use >2fmax (typically 2.56× in biomedical standards).',
        'Common-mode REJECTION is the job of the differential amplifier, not the filter alone.',
      ],
    },
    examples: [
      '50 Hz mains noise removed by a notch filter before ECG display.',
      'An optode DO lock-in amplifier modulates the LED and recovers the tiny quenching signal.'],
    formulas: [
      { name: 'Nyquist', expr: 'fs > 2 fmax' },
      { name: 'CMRR', expr: 'CMRR(dB) = 20 log10(Ad / Acm)' },
    ],
    keyPoints: [
      'Differential amp + high CMRR for biosignals.',
      'Nyquist: sample faster than twice the max frequency.',
      'Butterworth = flat; Chebyshev = steep with ripple.',
    ],
    revision: {
      remember: 'fs > 2fmax; CMRR kills common noise; 20 dB/dec per pole.',
      mistakes: ['Sampling at exactly the Nyquist rate.'],
      summary: 'Conditioning chain (amp→filter→ADC) + Fourier basics + Nyquist + CMRR.',
    },
    related: ['ins-sensors', 'ins-feedback'],
  },
  {
    id: 'ins-spectro',
    subject: 'bioinstrumentation',
    name: 'Spectroscopy: UV-Vis & Fluorescence',
    level: 2,
    priority: 'high',
    ord: 3,
    short: 'Measuring molecules by the light they absorb and emit.',
    basic: {
      what: 'UV-Vis spectroscopy measures how molecules absorb light ( Beer–Lambert law). Fluorescence measures light emitted after excitation — much more sensitive.',
      why: 'Protein and DNA quantification, enzyme assays, and kinetics all ride on these instruments.',
      how: 'Light source → monochromator → sample → detector. Absorbance A = ε·c·l. Fluorescence: excitation at λex, emission at longer λem (Stokes shift).',
      where: 'A280 protein assays, DNA quantification (A260), NADH (340 nm) enzyme kinetics, qPCR.',
    },
    college: [
      'Beer–Lambert: A = εcl; valid only at low absorbance (<1); deviation at high concentration (inner-filter, stray light).',
      'DNA: A260 = 1.0 ≈ 50 µg/mL dsDNA, 33 µg/mL ssDNA, 15 µg/mL RNA. Purity: A260/A280 ≈ 1.8 DNA, 2.0 RNA; 1.9–2.1 clean.',
      'Protein: A280 = 1.0 ≈ 1 mg/mL (Trp/Tyr/Phe); BCA/Lowry/Biuret more sensitive.',
      'Fluorescence: sensitivity 10–1000× absorbance; quenching (Stern–Volmer); anisotropy (polarisation) for binding assays.',
      'NADH absorbs at 340 nm — coupled enzyme assays track NADH oxidation/reduction.',
    ],
    advanced: [
      'Stokes shift arises from vibrational relaxation before emission; excited-state lifetime ns scale.',
      'FRET: energy transfer between fluorophores (1/r6 dependence) — molecular ruler for 1–10 nm.',
    ],
    gate: {
      highYield: [
        'Beer–Lambert law and its validity limits.',
        'A260/A280 purity ratios; DNA quantification numbers (50 µg/mL dsDNA).',
        'Fluorescence = more sensitive than absorbance; Stokes shift direction (emission longer).',
        'NADH at 340 nm for coupled assays.',
      ],
      traps: [
        'High absorbance VIOLATES Beer–Lambert (dilute and remeasure).',
        'Fluorescence emission is at a LONGER wavelength than excitation, never shorter.',
      ],
    },
    examples: [
      'A260 = 0.6 → 30 µg/mL dsDNA; A260/A280 = 1.5 → protein contamination.',
      'LDH assay: release of intracellular LDH converts NAD+ to NADH → A340 rises in damaged cells.'],
    formulas: [
      { name: 'Beer–Lambert', expr: 'A = ε · c · l' },
      { name: 'Stern–Volmer', expr: 'F0/F = 1 + Kv[Q]' },
    ],
    keyPoints: [
      'A = εcl; dilute if A > 1.',
      'A260: dsDNA 50 µg/mL; purity 260/280 ≈ 1.8.',
      'Fluorescence more sensitive; emission λ > excitation λ (Stokes).',
      'NADH = 340 nm reporter.',
    ],
    revision: {
      remember: 'A=εcl, 50 µg/mL dsDNA, 1.8 ratio, Stokes = red shift.',
      mistakes: ['Reading fluorescence at shorter wavelength than excitation.'],
      summary: 'Absorbance (Beer–Lambert, A260/A280) + fluorescence (Stokes, quenching, FRET) = the spectroscopy core.',
    },
    related: ['bio-aa', 'ins-assays'],
  },
  {
    id: 'ins-chromo',
    subject: 'bioinstrumentation',
    name: 'Chromatography (HPLC, GC, CE)',
    level: 2,
    priority: 'high',
    ord: 4,
    short: 'Separating mixtures by differential partitioning.',
    basic: {
      what: 'Chromatography separates mixture components as they move through a stationary phase at different rates. The mobile phase carries the sample; the stationary phase holds it back selectively.',
      why: 'Downstream processing (antibodies, metabolites) and quality control live or die on chromatography.',
      how: 'Retention factor k = (tR − t0)/t0; resolution Rs = 2(tR2 − tR1)/(w1 + w2); plate count N = 16(tR/w)² (efficiency).',
      where: 'Protein purification (SEC, ion exchange), metabolite profiling (HPLC), drug analysis.',
    },
    college: [
      'HPLC modes: reversed-phase (C18, hydrophobic; water/organic mobile), normal-phase (polar stationary), ion-exchange (charge; elute by salt gradient), size-exclusion (size; elute small LAST... largest FIRST), affinity (specific binding; elute by ligand).',
      'GC: volatile samples; headspace and split/splitless injection; detectors FID, TCD, MS.',
      'Capillary electrophoresis: separation by charge-to-size in an electric field; CZE, CE-FFE.',
      'Van Deemter equation: H = A + B/u + C·u — optimal linear velocity minimises HETP.',
    ],
    advanced: [
      'Gradient elution in IEX and RP-HPLC sharpens peaks and extends run time utilisation.',
      'SEC: calibration with standards; protein elution volume relates to hydrodynamic radius, not mass directly (shape matters).',
      'Chiral stationary phases separate enantiomers.',
    ],
    gate: {
      highYield: [
        'Resolution formula Rs = 2(tR2−tR1)/(w1+w2).',
        'Retention factor k definition; SEC elution order (large first).',
        'Van Deemter optimal velocity.',
        'RP-HPLC: hydrophobic retained longest; eluted with organic.',
      ],
      traps: [
        'In SEC the LARGEST molecule elutes FIRST (excluded from pores).',
        'In RP-HPLC the MORE hydrophobic analyte elutes LATER.',
      ],
    },
    examples: [
      'Protein A affinity + SEC polishing = standard mAb purification.',
      'Ethanol concentration in fermentation by GC-FID (headspace).'],
    formulas: [
      { name: 'Retention factor', expr: 'k = (tR − t0)/t0' },
      { name: 'Resolution', expr: 'Rs = 2(tR2 − tR1)/(w1 + w2)' },
      { name: 'Plate count', expr: 'N = 16 (tR/w)²' },
      { name: 'Van Deemter', expr: 'H = A + B/u + C·u' },
    ],
    keyPoints: [
      'k, Rs, N, HETP = the four chromatography numbers.',
      'SEC: large first; RP-HPLC: hydrophobic last.',
      'Van Deemter: optimal u exists.',
    ],
    revision: {
      remember: 'Rs formula; SEC big-first; RP hydro-last; Van Deemter optimum.',
      mistakes: ['Reversing SEC elution order.'],
      summary: 'Retention/resolution/efficiency math + mode-by-mode elution logic + Van Deemter.',
    },
    related: ['pro-downstream', 'ins-spectro'],
  },
  {
    id: 'ins-assays',
    subject: 'bioinstrumentation',
    name: 'Immunoassays & Biosensors',
    level: 3,
    priority: 'high',
    ord: 5,
    short: 'Antibody-based detection: ELISA, RIA, lateral flow, biosensors.',
    basic: {
      what: 'Immunoassays use antibody–antigen binding for detection. A biosensor couples a biological element (enzyme, antibody, DNA) to a transducer for continuous, in-situ measurement.',
      why: 'Diagnosis (pregnancy, HIV), drug levels, food safety and bioprocess monitoring.',
      how: 'ELISA: coat antigen/antibody → sample → conjugate (enzyme-labelled Ab) → substrate → colour (A450). Lateral flow: conjugate pad → test line (capture) → control line. Glucose biosensor: glucose oxidase + O2 consumption (amperometric).',
      where: 'Clinical labs, point-of-care devices, bioreactor monitoring.',
    },
    college: [
      'ELISA formats: direct, indirect, sandwich (most specific), competitive (small analytes), CLIA (chemiluminescent), ECL.',
      'Detection limits: ELISA ~pg–ng/mL; RIA ~femto (radioactive label) but regulatory issues.',
      'Biosensor generations: 1st (substrate/product, amperometric), 2nd (mediator), 3rd (direct electron transfer, MFCs).',
      'Reference electrodes: Ag/AgCl (pH/ION), calomel; working vs counter electrode roles.',
    ],
    advanced: [
      'SPR (Surface Plasmon Resonance): label-free real-time binding kinetics (ka, kd, KD) on a gold surface.',
      'Field-effect transistor (FET) biosensors for DNA/protein with sub-second response.',
    ],
    gate: {
      highYield: [
        'Sandwich ELISA steps and order (classic matching question).',
        'Competitive ELISA: signal INVERSE to analyte concentration.',
        'Glucose oxidase amperometry: O2 consumed, electrons at electrode.',
        'SPR measures kinetics (ka/kd) label-free.',
      ],
      traps: [
        'Competitive assays give INVERSE signal — a trap in "interpret the curve" questions.',
        'Indirect ELISA uses TWO antibodies (primary + HRP-labelled secondary) → higher sensitivity.',
      ],
    },
    examples: [
      'Lateral flow pregnancy test: hCG captured at T line, control line always appears.',
      'Continuous glucose monitor = wearable amperometric biosensor (interstitial fluid).'],
    formulas: [
      { name: 'SPR affinity', expr: 'KD = kd / ka' },
    ],
    keyPoints: [
      'Sandwich = two Abs, signal ∝ analyte; Competitive = signal ∝ 1/analyte.',
      'Enzyme biosensor: enzyme reaction + electrochemical readout.',
      'SPR: real-time, label-free, kinetic constants.',
    ],
    revision: {
      remember: 'Sandwich ∝, competitive ∝ 1/; glucose = O2 drop at electrode; SPR = kinetics.',
      mistakes: ['Expecting direct signal in competitive ELISA.'],
      summary: 'ELISA formats + biosensor generations + SPR kinetics = immunoassay/biosensor core.',
    },
    related: ['ins-sensors', 'imm-antibodies'],
  },
  {
    id: 'ins-imaging',
    subject: 'bioinstrumentation',
    name: 'Flow Cytometry & Medical Imaging',
    level: 3,
    priority: 'medium',
    ord: 6,
    short: 'Single-cell analysis and imaging-based diagnostics.',
    basic: {
      what: 'Flow cytometry measures properties of individual cells as they flow past lasers — size, granularity, fluorescence — and can physically sort them (FACS). Medical imaging (X-ray, CT, MRI, PET) images tissues non-invasively.',
      why: 'Immune profiling, stem cell sorting, cancer diagnostics.',
      how: 'Hydrodynamic focusing → cell stream → laser scatter (FSC = size, SSC = granularity) + fluorescence channels → PMT/detector → histogram/gating. FACS sorts by charged deflection.',
      where: 'Immunology (immunophenotyping), oncology (minimal residual disease), bioprocess (viable cell counting).',
    },
    college: [
      'FSC (forward scatter) ∝ size; SSC (side scatter) ∝ granularity/complexity.',
      'Gating strategy: FSC/SSC → singlets → live/dead (propidium iodide) → markers.',
      'PET: 18F-FDG tracer; 511 keV annihilation photons; metabolic imaging.',
      'MRI: hydrogen proton spin in magnetic field; T1/T2 contrast.',
    ],
    advanced: [
      'Multicolour panels (8+ colours) with spectral flow cytometry resolving overlap.',
      'Mass cytometry (CyTOF): metal-tagged antibodies, 40+ parameters.',
    ],
    gate: {
      highYield: [
        'FSC = size, SSC = granularity (never swap).',
        'FACS sorting principle (charge deflection).',
        'PET annihilation photons are 511 keV, back-to-back.',
        'MRI reads proton (H) signals, not electrons.',
      ],
      traps: [
        'PET detects TWO coincident 511 keV photons — single photon is background.',
        'CT = X-ray tomography (ionising); MRI = no ionising radiation.',
      ],
    },
    examples: [
      'CD3+/CD4+/CD8+ T-cell immunophenotyping by 4-colour flow cytometry.',
      'FDG-PET localises metabolically active tumours.'],
    formulas: [],
    keyPoints: [
      'FSC size, SSC granularity, fluorescence = markers.',
      'FACS = charged deflection sorting.',
      'PET = 511 keV pairs; MRI = protons.',
    ],
    revision: {
      remember: 'FSC size / SSC granule; 511 keV pairs; MRI = H spins.',
      mistakes: ['Swapping FSC/SSC meanings.'],
      summary: 'Flow cytometry channels + FACS principle + PET/MRI physics basics.',
    },
    related: ['ins-sensors', 'imm-basics'],
  },
  {
    id: 'ins-feedback',
    subject: 'bioinstrumentation',
    name: 'Process Control in Bioprocesses',
    level: 3,
    priority: 'medium',
    ord: 7,
    short: 'Feedback loops that keep bioreactors on setpoint.',
    basic: {
      what: 'Process control keeps bioreactor variables (pH, DO, temperature, agitation) at their setpoints using sensors + controllers. The classic is a PID feedback loop.',
      why: 'Cells are sensitive; drift in pH or DO crashes production and can kill the culture.',
      how: 'Sensor measures → controller compares to setpoint → actuator (base/acid pump, air valve, heater) corrects. PID: proportional (fast response), integral (removes offset), derivative (damps oscillation).',
      where: 'Every industrial bioreactor; perfusion systems; vaccine fermenters.',
    },
    college: [
      'PID: u(t) = Kp·e + Ki∫e dt + Kd·de/dt; tuning affects overshoot and settling.',
      'Cascaded control: pH controller drives the base-flow controller (inner loop faster).',
      'DO control hierarchy: agitation → aeration → pure O2 (cascaded steps).',
      'Feed-forward control anticipates disturbances (e.g. predicted glucose drop).',
    ],
    advanced: [
      'Model predictive control (MPC) handles multi-variable bioprocesses (glucose + DO + pH simultaneously).',
      'Soft sensors estimate unmeasured states (biomass) from soft-measured data (O2 uptake rate).',
    ],
    gate: {
      highYield: [
        'PID term roles: P = speed, I = zero offset, D = damping.',
        'DO control cascade order: agitation → air → O2.',
        'Cascaded loops: inner loop faster than outer.',
      ],
      traps: [
        'Integral term removes steady-state ERROR, not the disturbance itself.',
        'Pure proportional control always leaves offset — a classic true/false trap.',
      ],
    },
    examples: [
      'pH drops from acid production → controller adds NaOH → pH recovers to 7.0.',
      'DO controller steps: raise impeller rpm before sparging more air (shear concern).'],
    formulas: [
      { name: 'PID', expr: 'u(t) = Kp e(t) + Ki ∫e dt + Kd de/dt' },
    ],
    keyPoints: [
      'P fast, I kills offset, D damps.',
      'DO cascade: rpm → air → O2.',
      'Cascaded: inner loop faster.',
    ],
    revision: {
      remember: 'P-I-D = fast/offset/damp; DO ladder = rpm→air→O2.',
      mistakes: ['Saying P control has zero steady-state error.'],
      summary: 'PID theory + cascaded/cascade bioreactor control + DO strategy.',
    },
    related: ['ins-signals', 'bae-cell-bioreactors'],
  },
  {
    id: 'ins-gate',
    subject: 'bioinstrumentation',
    name: 'GATE Focus: Instrumentation Numericals',
    level: 4,
    priority: 'high',
    ord: 8,
    short: 'The numbers that actually appear in GATE BT.',
    basic: {
      what: 'A consolidation of GATE-frequent instrumentation calculations: Nernst pH, Beer–Lambert, chromatography resolution, Nyquist sampling and PID behaviour.',
      why: 'Instrumentation questions reward formula recall; practice the five anchors.',
      how: 'Drill: pH mV calculation, A=εcl dilution problems, Rs computation, sampling rate selection, k (retention factor) arithmetic.',
      where: 'GATE BT paper.',
    },
    college: [
      'pH: ΔE = −59.16 × ΔpH (25°C).',
      'Beer–Lambert dilution: A1 = A2 → c1l1 = c2l2.',
      'Chromatography: compute k, N, Rs from given tR and widths.',
      'Nyquist: pick fs from the highest frequency component.',
    ],
    advanced: [
      'Combining spectra: A260/A280 purity inference.',
      'Stern–Volmer quenching constant from F0/F vs [Q].',
    ],
    gate: {
      highYield: [
        'All five anchor formulas above.',
        'Instrument→principle matching (Clark amperometric, optode quenching, SPR label-free).',
      ],
      traps: [
        'Sign of Nernst slope (−59 mV/pH).',
        'Fluorescence vs absorbance sensitivity direction.',
      ],
    },
    examples: [
      'pH 4 → 7: ΔE = +177.5 mV (more positive).',
      'A = 0.5 at 1 cm, c = 0.1 mg/mL → ε = 5 mL/mg/cm.'],
    formulas: [],
    keyPoints: [
      '−59.16 mV/pH; A = εcl; Rs = 2ΔtR/Σw; fs > 2fmax; PID roles.',
    ],
    revision: {
      remember: 'The five anchors: Nernst, Beer–Lambert, Rs, Nyquist, PID.',
      mistakes: ['Forgetting the negative sign in the Nernst slope.'],
      summary: 'Instrumentation GATE = five formulas + instrument-principle mapping.',
    },
    related: ['ins-sensors', 'ins-spectro', 'ins-chromo'],
  },
];

export const ALL = [...TOPICS_AN, ...TOPICS_BIO, ...TOPICS_INF, ...TOPICS_INS];
