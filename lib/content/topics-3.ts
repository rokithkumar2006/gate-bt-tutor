import type { Topic } from '../types';

// ============ IMMUNOLOGY ============
export const TOPICS_IMM: Topic[] = [
  {
    id: 'imm-basics',
    subject: 'immunology',
    name: 'Innate Immunity',
    level: 1,
    priority: 'high',
    ord: 1,
    short: 'The rapid, non-specific first line of defence.',
    basic: {
      what: 'Innate immunity is the immediate, generic defence: physical barriers (skin, mucosa), phagocytes (neutrophils, macrophages, dendritic cells), NK cells, complement, and inflammation.',
      why: 'It is the first responder and activates the adaptive system — the bridge between the two arms.',
      how: 'Pathogen recognition via PRRs (PAMPs bind TLRs, NODs, RIG-I) → cytokines (TNF, IL-1, IFN) → inflammation (redness, heat, swelling, pain) → phagocytosis and presentation to T cells.',
      where: 'Infection control, vaccine adjuvants, sepsis biology, autoimmune triggers.',
    },
    college: [
      'Inflammatory mediators: histamine, prostaglandins, bradykinin, complement C3a/C5a (anaphylatoxins).',
      'Phagocyte steps: chemotaxis → adherence → ingestion → killing (ROS via NADPH oxidase; NO; lysozyme).',
      'Complement: 3 pathways (classical: C1q–Ab; lectin: MBL; alternative: spontaneous C3) → C3 convertase → C5a + MAC (C5b–9).',
      'Type I interferons (IFN-α/β): antiviral state (PKR, OAS); type II (IFN-γ): macrophage activation.',
    ],
    advanced: [
      'NETs (neutrophil extracellular traps) capture bacteria outside the cell.',
      'Trained immunity: innate memory via epigenetic reprogramming of monocytes (e.g. BCG).',
    ],
    gate: {
      highYield: [
        'Complement pathways and their triggers (Ab/MBL/spontaneous).',
        'C3a/C5a = anaphylatoxins; MAC = C5b–9 lysis.',
        'IFN types: I = antiviral, II = macrophage activation.',
        'PRR–PAMP pairing (TLR4–LPS).',
      ],
      traps: [
        'The ALTERNATIVE pathway needs NO antibody — it is spontaneous + properdin-amplified.',
        'NK cells kill by PERFORIN/granzyme, not by phagocytosis (they are lymphocytes, not phagocytes).',
      ],
    },
    examples: [
      'LPS (Lipid A) binds TLR4–MD2 → TNF/IL-6 → sepsis cascade.',
      'Chronic granulomatous disease: NADPH oxidase defect → no ROS killing.'],
    formulas: [],
    keyPoints: [
      'Barriers → phagocytes → NK → complement → inflammation.',
      '3 complement pathways → C3 convertase → MAC (C5b–9).',
      'IFN-I antiviral; IFN-II macrophage activation.',
      'TLR4 = LPS receptor.',
    ],
    revision: {
      remember: 'C3a/C5a alarm, MAC lysis; IFN1 virus, IFN2 macrophage.',
      mistakes: ['Giving antibody to the alternative pathway.'],
      summary: 'Innate layers + PRR/PAMP + complement + interferons + inflammation mediators.',
    },
    related: ['imm-antibodies', 'imm-response', 'mic-pathogenicity'],
  },
  {
    id: 'imm-antibodies',
    subject: 'immunology',
    name: 'Antibodies (Immunoglobulins)',
    level: 1,
    priority: 'high',
    ord: 2,
    short: 'Structure, classes and functions of the five Ig.',
    basic: {
      what: 'Antibodies are Y-shaped proteins (Ig) made by plasma cells. Each has two identical heavy chains and two light chains; the tips (Fab) bind antigen, the stem (Fc) engages immune effectors.',
      why: 'The single most detailed structure–function area in GATE immunology.',
      how: 'Classes: IgG (serum, opsonisation, neutralisation, placenta crossing), IgA (mucosa, secretory dimer), IgM (first response, pentamer, complement), IgE (allergy, anti-parasite, mast cells), IgD (B-cell receptor).',
      where: 'Diagnostics (ELISA, lateral flow), therapeutics (mAbs), vaccines.',
    },
    college: [
      'Domains: VH/CH1 (Fab), CH2–CH3 (Fc); hinge = IgG flexibility; J-chain = IgM/IgA assembly.',
      'Isotypes (classes), allotypes (individual), idiotype (clone-specific) — three levels of variation.',
      'Somatic hypermutation + class switch recombination in germinal centres (CD40–CD40L, cytokines: IL-4→IgE/IgG4, TGF-β→IgA, IFN-γ→IgG).',
      'Affinity maturation: affinity increases over rounds of hypermutation + selection.',
    ],
    advanced: [
      'Fc receptors: FcγR (neutrophils, macrophages), FcεRI (mast cells, high affinity), FcRn (IgA/IgG transport, neonatal Fc receptor extends IgG half-life to ~21 days).',
      'Valency: IgG/IgD = monomer (bivalent); secretory IgA = dimer (tetravalent); IgM = pentamer (decavalent) — high AVIDITY despite low AFFINITY per site.',
    ],
    gate: {
      highYield: [
        'Class → function mapping (G serum/placenta, A mucosa, M first/complement, E allergy, D BCR).',
        'First response = IgM; secondary = IgG (memory).',
        'Switch recombination order: V(D)J → M → G → A → E (fixed gene order).',
        'FcRn = IgG recycling (long half-life).',
      ],
      traps: [
        'IgM is the FIRST in primary response but has LOW affinity (avidity compensates).',
        'Only IgG crosses the placenta (via FcRn) — not IgA (that’s breast milk).',
        'Switching changes the CLASS (constant region), NOT the antigen specificity (variable region unchanged).',
      ],
    },
    examples: [
      'Neonatal passive immunity = maternal IgG via placenta (wanes by ~6 months).',
      'Allergy: antigen-specific IgE on mast cells → histamine on re-exposure.'],
    formulas: [],
    keyPoints: [
      'G: serum/placenta; A: mucosa; M: first, complement, pentamer; E: allergy; D: BCR.',
      'Primary = IgM; secondary = IgG (higher affinity).',
      'Switching: constant region only; specificity unchanged.',
      'FcRn recycles IgG → ~21-day half-life.',
    ],
    revision: {
      remember: 'G placentas, A mucosas, M first-arrives, E mast cells, D BCRs.',
      mistakes: ['Saying switching changes specificity.'],
      summary: 'Ig structure + 5 classes + switching + Fc receptors = antibody core.',
    },
    related: ['imm-basics', 'imm-response', 'an-mab'],
  },
  {
    id: 'imm-response',
    subject: 'immunology',
    name: 'Adaptive Immune Response & MHC',
    level: 2,
    priority: 'high',
    ord: 3,
    short: 'T cells, B cells, MHC presentation and the response cascade.',
    basic: {
      what: 'Adaptive immunity is specific and memory-forming: T cells (CD4 helper, CD8 cytotoxic) and B cells (antibodies). Antigen must be processed and presented on MHC molecules for T-cell recognition.',
      why: 'The MHC restriction and CD4/CD8 logic is the conceptual heart of GATE immunology.',
      how: 'Exogenous antigen → endosome → MHC II → CD4 T cell. Endogenous (viral) → proteasome → TAP → ER → MHC I → CD8 T cell. CD4 activates macrophages, B cells (help), CD8. CD8 kills infected cells (perforin/granzyme).',
      where: 'Vaccination, transplantation, AIDS, autoimmunity.',
    },
    college: [
      'MHC I (HLA-A/B/C): ALL nucleated cells; presents endogenous; CD8 binds. MHC II (HLA-DP/DQ/DR): APCs (DC, macrophage, B); presents exogenous; CD4 binds.',
      'T-cell receptor (TCR) + CD3 = recognition; co-stimulation (CD28–B7) = full activation; absence = anergy.',
      'Primary response: lag 7–10 days, IgM; secondary: faster (2–3 days), higher affinity IgG (memory B/T cells).',
      'Th subtypes: Th1 (IFN-γ, intracellular pathogens), Th2 (IL-4/5/13, allergy/parasites), Th17 (IL-17, extracellular bacteria), Treg (IL-10/TGF-β, tolerance).',
    ],
    advanced: [
      'Cross-presentation: DCs present exogenous antigen on MHC I → prime CD8 responses (vaccine design).',
      'HIV targets CD4 (gp120–CD4) → progressive CD4 loss → AIDS; set-point viral load predicts progression.',
      'Transplantation: HLA matching (A, B, DR); rejection = recipient T cells vs donor HLA (direct) or donor APCs in recipient (indirect).',
    ],
    gate: {
      highYield: [
        'MHC I/II: cell type, source, T-cell subset (the classic table).',
        'Co-stimulation CD28–B7; no co-stimulation = anergy.',
        'Primary vs secondary response features.',
        'Th1/Th2/Th17/Treg cytokines.',
        'HIV: gp120–CD4; CD4 count.',
      ],
      traps: [
        'CD8 recognises MHC I (endogenous) — NEVER MHC II. The pairing is absolute.',
        'B cells can present antigen they BIND (via BCR) — a "how do B cells get help" question.',
        'Anergy (no co-stimulation) ≠ tolerance by deletion — mechanisms differ.',
      ],
    },
    examples: [
      'Influenza vaccine primes CD8 via DC cross-presentation.',
      'Type 1 diabetes: Th1-mediated β-cell destruction (autoimmunity).'],
    formulas: [],
    keyPoints: [
      'MHC I → CD8 (endogenous); MHC II → CD4 (exogenous).',
      'Recognition + co-stimulation = activation; recognition alone = anergy.',
      'Primary: slow IgM; secondary: fast IgG memory.',
      'Th1/Th2/Th17/Treg by cytokine signature.',
    ],
    revision: {
      remember: 'I→8 endogenous, II→4 exogenous; CD28–B7 or anergy; memory = fast IgG.',
      mistakes: ['Mixing MHC/CD pairings.'],
      summary: 'Antigen presentation + MHC/CD logic + co-stimulation + response kinetics + Th subsets.',
    },
    related: ['imm-antibodies', 'imm-basics', 'imm-hypersensitivity'],
  },
  {
    id: 'imm-mhc',
    subject: 'immunology',
    name: 'MHC/HLA in Depth',
    level: 3,
    priority: 'medium',
    ord: 4,
    short: 'Structure, polymorphism and the "self" recognition.',
    basic: {
      what: 'MHC (MHC/HLA in humans) are the most polymorphic gene families in the human genome. They display peptide fragments to T cells — the basis of self/non-self recognition, transplant rejection and disease association.',
      why: 'HLA typing (transplants) and HLA–disease associations are classic GATE material.',
      how: 'Class I: α1–α3 heavy chain + β2-microglobulin; peptide from proteasome (8–10 aa). Class II: α + β chains; peptide from endosome (13–25 aa). A single MHC molecule presents many peptides (degeneracy); a TCR sees one peptide–MHC combo (specificity).',
      where: 'Transplant matching, disease association (HLA-B27–ankylosing spondylitis), vaccine design.',
    },
    college: [
      'Polymorphism: thousands of alleles, co-dominant expression (you show BOTH parents’ alleles).',
      'Disease associations: HLA-B27 (ankylosing spondylitis), HLA-DR4 (rheumatoid arthritis), HLA-DQ2/8 (coeliac), HLA-B8 (addison).',
      'Linkage disequilibrium: haplotypes (e.g. A1–B8–DR3) inherited together.',
      'T-cell selection in thymus: positive (see self MHC) + negative (don’t strongly see self peptide) = self-tolerance.',
    ],
    advanced: [
      'Non-classical MHC: HLA-E/F/G (regulation, placenta), HLA-DM (loading catalysis), HLA-DO (inhibition).',
      'MHC restriction (Zinkernagel–Doherty): T cells recognise antigen ONLY in the context of self MHC — basis of adoptive transfer rules.',
    ],
    gate: {
      highYield: [
        'Class I structure (α + β2m) vs II (α + β); peptide length; source.',
        'Disease–HLA association bank (B27, DR4, DQ2/8).',
        'Co-dominant expression + polymorphism.',
        'Thymic selection logic (positive/negative).',
      ],
      traps: [
        'β2-microglobulin is NOT membrane-bound (it is a light subunit) — a structure trap.',
        'MHC restriction: allogeneic T cells won’t work without matching MHC context.',
      ],
    },
    examples: [
      'Kidney transplant: match HLA-A, B, DR first (best survival).',
      'Coeliac: HLA-DQ2 binds gluten peptides → T-cell activation.'],
    formulas: [],
    keyPoints: [
      'I: α + β2m, 8–10 aa, proteasome; II: α + β, 13–25 aa, endosome.',
      'Polymorphic, co-dominant.',
      'B27/DR4/DQ2-8 association bank.',
      'Thymus: positive = useful, negative = safe.',
    ],
    revision: {
      remember: 'I + β2m; II α + β; B27 spine, DR4 joint, DQ2 gluten.',
      mistakes: ['Calling β2m a membrane chain.'],
      summary: 'MHC structure + polymorphism + disease bank + selection = MHC depth.',
    },
    related: ['imm-response', 'imm-hypersensitivity'],
  },
  {
    id: 'imm-hypersensitivity',
    subject: 'immunology',
    name: 'Hypersensitivity & Allergy',
    level: 3,
    priority: 'high',
    ord: 5,
    short: 'Types I–IV and the logic behind each.',
    basic: {
      what: 'Hypersensitivity is exaggerated immune response harming the host. Gell–Coombs: Type I (IgE, immediate), II (IgG/IgM vs cell surface), III (immune complexes), IV (T-cell, delayed).',
      why: 'The 4-type classification is a GATE staple; each has a disease anchor.',
      how: 'I: IgE on mast cells → cross-linking → histamine (anaphylaxis, asthma, hay fever). II: antibodies vs own cells (autoimmune haemolytic anaemia, Goodpasture, ABO transfusion). III: Ag–Ab complexes deposit in vessels (serum sickness, SLE, post-strep GN). IV: T cells (TB test, contact dermatitis, transplant rejection, type 1 diabetes).',
      where: 'Clinical immunology, allergy management, transfusion medicine, transplantation.',
    },
    college: [
      'Time scale: I = minutes; II/III = hours–days; IV = 48–72 h (delayed).',
      'Arthus reaction = local Type III; serum sickness = systemic Type III.',
      'Atopy: genetic predisposition to IgE; eosinophils, Th2 cytokines (IL-4/5/13).',
      'Treatment logic: antihistamines (I), corticosteroids (II–IV), desensitisation (I).',
    ],
    advanced: [
      'Anaphylaxis management: epinephrine first-line (not antihistamine) — a clinical logic question.',
      'MHC and Type IV: CD8 (cytotoxic) vs CD4 (helper) mediated damage; granulomas in chronic IV (TB).',
    ],
    gate: {
      highYield: [
        'Type → mediator → disease → timing table.',
        'II = Ab vs cells; III = complexes in vessels; IV = T cells.',
        'Type I mast cell/IgE; Type IV 48–72 h.',
        'Anaphylaxis = epinephrine first.',
      ],
      traps: [
        'Rheumatoid arthritis = Type IV (not II) — a famous exception to "arthritis = complex".',
        'ABO transfusion reaction is Type II (IgM vs RBC antigens), not III.',
        'Serum sickness (III) and Arthus (III) are both COMPLEX-mediated, differing by scale.',
      ],
    },
    examples: [
      'Penicillin allergy: Type I (anaphylaxis) and Type II (immune thrombocytopenia) both possible.',
      'PPD (Mantoux) test = Type IV delayed hypersensitivity.'],
    formulas: [],
    keyPoints: [
      'I: IgE/mast/minutes; II: Ab/cells; III: complexes/vessels; IV: T cells/48–72 h.',
      'RA = IV; ABO = II; SLE = III (plus II in nephritis).',
      'Anaphylaxis → epinephrine.',
    ],
    revision: {
      remember: '1 IgE, 2 cell-Ab, 3 complexes, 4 T-cells; RA is IV; Epi first.',
      mistakes: ['Calling RA Type II.'],
      summary: 'Gell–Coombs table with disease anchors + timing + treatment logic.',
    },
    related: ['imm-antibodies', 'imm-response'],
  },
  {
    id: 'imm-vaccines',
    subject: 'immunology',
    name: 'Vaccines & Immunisation',
    level: 2,
    priority: 'high',
    ord: 6,
    short: 'How vaccines train adaptive immunity.',
    basic: {
      what: 'Vaccines expose the immune system to harmless forms of pathogen components, creating memory without disease. Types: live-attenuated, inactivated (killed), subunit/toxoid, recombinant, mRNA, vector, and new conjugate/nanoparticle platforms.',
      why: 'Vaccine mechanisms (humoral vs cellular immunity induced) are direct GATE material.',
      how: 'Live-attenuated (MMR, OPV): mimic natural infection → strong T + B response. Inactivated (IPV, HepA): mainly humoral. Toxoid (tetanus, diphtheria): anti-toxin antibodies. Conjugate (Hib, pneumococcal): polysaccharide + protein → T-cell help for children. mRNA (SARS-CoV-2): encodes antigen in host cells → strong CD8.',
      where: 'Epidemic control, herd immunity, travel medicine.',
    },
    college: [
      'Herd immunity threshold: 1 − 1/R0 (measles R0 ≈ 12–18 → ~95% coverage).',
      'Adjuvants: alum (deposition, Th2 bias), TLR ligands (CpG → Th1), MF59.',
      'Schedules: primary (2–3 doses) + boosters (memory reactivation); spacing affects avidity maturation.',
      'Cold chain: live vaccines temperature-sensitive (2–8°C).',
    ],
    advanced: [
      'Universal flu vaccine design: conserved stalk (pre-Fusion) targets vs variable head epitopes (immune imprinting/original antigenic sin).',
      'Therapeutic vaccines (cancer): neoantigen + checkpoint blockade combinations.',
    ],
    gate: {
      highYield: [
        'Vaccine type → immunity type mapping (live = cellular + humoral; inactivated = mainly humoral).',
        'Herd immunity = 1 − 1/R0.',
        'Conjugate vaccines solve polysaccharide T-independent problem in infants.',
        'Toxoid = modified toxin (not live organism).',
      ],
      traps: [
        'OPV (live) vs IPV (inactivated) — different types, different risks (VAPP from OPV).',
        'Polysaccharide vaccines are T-INDEPENDENT (no memory, poor in <2-year-olds) — why conjugates exist.',
      ],
    },
    examples: [
      'Measles R0 ≈ 15 → herd immunity ≈ 1 − 1/15 ≈ 93% (real-world target 95%).',
      'HepB recombinant (yeast) surface antigen — first recombinant vaccine.'],
    formulas: [
      { name: 'Herd immunity', expr: 'Pc = 1 − 1/R0' },
    ],
    keyPoints: [
      'Live = strongest (cellular + humoral); killed = mainly humoral.',
      'Conjugate = T-cell help for polysaccharides (infants).',
      'Herd threshold 1 − 1/R0.',
      'Alum adjuvant = Th2 bias.',
    ],
    revision: {
      remember: 'Live strongest, killed humoral, conjugate for kids, 1−1/R0 herd.',
      mistakes: ['Expecting memory from plain polysaccharide vaccines.'],
      summary: 'Vaccine types → immunity profile + adjuvants + herd immunity math.',
    },
    related: ['imm-response', 'imm-antibodies'],
  },
  {
    id: 'imm-auto',
    subject: 'immunology',
    name: 'Autoimmunity & Immunodeficiency',
    level: 3,
    priority: 'medium',
    ord: 7,
    short: 'When immunity attacks itself or fails.',
    basic: {
      what: 'Autoimmunity = immune attack on self (RA, SLE, T1D, MS). Immunodeficiency = weak defence (SCID, CID, HIV). Both are failures of tolerance or immune hardware.',
      why: 'Disease anchors for tolerance, co-stimulation and immune development.',
      how: 'Tolerance: central (thymus/bone marrow deletion) + peripheral (anergy, Treg, inhibitory receptors). Autoimmunity breaks these (molecular mimicry, epitope spreading, bystander activation). Immunodeficiency: genetic (SCID = IL2RG/ADA), acquired (HIV = CD4 loss).',
      where: 'Clinical immunology, transplant tolerance research, gene therapy (SCID).',
    },
    college: [
      'Treg (FoxP3): loss → IPEX syndrome (poly-autoimmunity).',
      'APECED (APS-1): AIRE defect → thymic tolerance failure (polyglandular).',
      'SCID types: X-linked (IL2RG γc), ADA deficiency (purine toxicity); "bubble boy".',
      'Agammaglobulinaemia (Bruton, BTK) → no B cells → no antibodies; recurrent bacterial infections after 6 months (maternal IgG wanes).',
    ],
    advanced: [
      'Checkpoint therapy (CTLA-4, PD-1 inhibitors) releases autoimmunity risk — on-target, off-tumour effects.',
      'Autoimmune polyendocrine syndromes and HLA associations (DR3/DR4).',
    ],
    gate: {
      highYield: [
        'SCID = T cell (± B/NK) defect; ADA = purine accumulation.',
        'Bruton = BTK → agammaglobulinaemia (B cells absent).',
        'FoxP3 = Treg (IPEX); AIRE = central tolerance.',
        'Maternal IgG protection wanes ~6 months (infection timing clue).',
      ],
      traps: [
        'Bruton’s is a B-cell defect — T cells are normal (a "which cells are absent" question).',
        'SCID presents EARLY (<6 months) with opportunistic infections; agammaglobulinaemia later (bacterial, >6 months).',
      ],
    },
    examples: [
      'T1D: Th1 vs β-cells (insulin-dependent diabetes).',
      'Gene therapy (γc-SCID) restored immune function in first successful trials (1990s).'],
    formulas: [],
    keyPoints: [
      'Tolerance: central (AIRE) + peripheral (Treg/FoxP3, anergy).',
      'SCID = T (±B/NK); Bruton = B only.',
      'Timing: SCID <6 mo opportunistic; Bruton >6 mo bacterial.',
    ],
    revision: {
      remember: 'FoxP3 Treg, AIRE thymus, ADA SCID, BTK Bruton.',
      mistakes: ['Giving T-cell defects to Bruton.'],
      summary: 'Tolerance mechanisms + disease-defect bank (gene → immune cell affected → timing).',
    },
    related: ['imm-response', 'imm-hypersensitivity'],
  },
  {
    id: 'imm-gate',
    subject: 'immunology',
    name: 'GATE Focus: Immunology Patterns',
    level: 4,
    priority: 'high',
    ord: 8,
    short: 'Tables, pairings and the classic traps.',
    basic: {
      what: 'GATE immunology is table-driven: MHC pairings, Ig classes, hypersensitivity types, vaccine types. Master the banks.',
      why: 'High recall yield with predictable structures.',
      how: 'Drill: MHC I/II table, IgG/A/M/E/D table, Gell–Coombs I–IV table, vaccine type → response table.',
      where: 'GATE BT paper.',
    },
    college: [
      'Pairing banks: MHC I–CD8–endogenous; MHC II–CD4–exogenous; IgE–mast; FcRn–IgG; C5b-9–MAC.',
      'Disease anchors: RA (IV), SLE (III + II), ABO (II), T1D (IV), coeliac (IV, DQ2), MS (IV).',
      'Timing anchors: I minutes, IV 48–72 h.',
    ],
    advanced: [
      'Multi-step: "patient with recurrent sinopulmonary infections after 6 months, absent B cells" → Bruton.',
      'Vaccine choice logic for age and immune status.',
    ],
    gate: {
      highYield: [
        'All four tables + disease anchors.',
        'One-step clinical reasoning (cell absent → syndrome).',
      ],
      traps: [
        'RA = IV (not II). ABO = II (not III).',
        'Switching does not change specificity.',
      ],
    },
    examples: [
      '"Molecule crossing placenta" → IgG (FcRn).',
      '"First antibody in primary response" → IgM.'],
    formulas: [],
    keyPoints: [
      'Four tables: MHC, Ig, hypersensitivity, vaccines.',
      'RA=IV, ABO=II, SLE=III, Epi first, IgG placenta, IgM first.',
    ],
    revision: {
      remember: 'Tables + disease anchors + timing.',
      mistakes: ['Disease-type mismatches.'],
      summary: 'Immunology GATE = 4 tables + anchors, drilled until instant.',
    },
    related: ['imm-response', 'imm-antibodies', 'imm-hypersensitivity'],
  },
];

// ============ MICROBIAL BIOTECHNOLOGY ============
export const TOPICS_MIB: Topic[] = [
  {
    id: 'mib-fermentation',
    subject: 'microbial-biotechnology',
    name: 'Industrial Fermentation Basics',
    level: 1,
    priority: 'high',
    ord: 1,
    short: 'From flask to production: the industrial logic.',
    basic: {
      what: 'Industrial fermentation grows microbes at scale to make products: ethanol, antibiotics, enzymes, organic acids, vitamins. The logic: pick organism + substrate → optimise growth → harvest product (upstream/downstream).',
      why: 'This is the business of biotech; GATE links it to bioreaction engineering.',
      how: 'Strain selection/improvement (mutagenesis, recombinant) → seed train (flask → seed tank → production) → production fermentation (batch/fed-batch) → downstream (filtration, extraction, purification).',
      where: 'Citric acid (Aspergillus), ethanol (Saccharomyces), insulin (E. coli), antibodies (CHO).',
    },
    college: [
      'Primary metabolites (growth-linked: ethanol, lactate) vs secondary (stationary phase: antibiotics, pigments).',
      'Substrate choice: cheap (molasses, corn starch, whey); carbon/nitrogen ratio matters.',
      'Contamination control: aseptic technique, sterile air filters (HEPA), CIP (clean-in-place), SIP (sterilise-in-place).',
      'Inoculum quality: healthy, active culture from seed train reduces lag.',
    ],
    advanced: [
      'Process economics: capital vs operating costs; productivity (g/L/h) drives reactor volume and cost.',
      'Metabolic burden of recombinant strains: lower growth, higher feeding needs; plasmid maintenance cost.',
    ],
    gate: {
      highYield: [
        'Primary vs secondary metabolites (phase + examples).',
        'Seed train logic (reduces lag at production scale).',
        'Productivity = g product / L / h.',
        'CIP/SIP purpose.',
      ],
      traps: [
        'Penicillin is a SECONDARY metabolite (stationary phase) — a classic.',
        'Ethanol is PRIMARY (growth-linked) — substrate-limited.',
      ],
    },
    examples: [
      'Citric acid: A. niger fed-batch, 100+ g/L, world’s largest-volume organic acid.',
      'Single-cell protein: methanol-oxidising Methylophilus (historical).'],
    formulas: [
      { name: 'Productivity', expr: 'Q = ΔP/(V·Δt)' },
    ],
    keyPoints: [
      'Primary = growth-linked (ethanol); secondary = stationary (antibiotics).',
      'Seed train = healthy inoculum = short lag.',
      'Productivity drives economics.',
    ],
    revision: {
      remember: 'Primary grows, secondary stations; seed train cuts lag.',
      mistakes: ['Calling penicillin primary.'],
      summary: 'Fermentation workflow + metabolite classes + productivity economics.',
    },
    related: ['bae-batch', 'pro-downstream', 'mic-physiology'],
  },
  {
    id: 'mib-antibiotics',
    subject: 'microbial-biotechnology',
    name: 'Antibiotics: Discovery & Action',
    level: 2,
    priority: 'high',
    ord: 2,
    short: 'How antibiotics work and where they come from.',
    basic: {
      what: 'Antibiotics are microbial metabolites that kill or inhibit other microbes at low concentration. Most come from Streptomyces (soil bacteria). They target processes bacteria have and humans do not.',
      why: 'Mechanism-of-action banks are core GATE microbiology/biotech material.',
      how: 'Targets: cell wall (β-lactams, vancomycin), protein synthesis (tetracycline 30S, chloramphenicol 50S, macrolides 50S, aminoglycosides 30S), DNA (quinolones → DNA gyrase, rifampicin → RNA pol), folate (sulfonamides), membrane (polymyxins).',
      where: 'Medicine, agriculture, bioprocess contamination control.',
    },
    college: [
      'Discovery: Waksman (Streptomyces, streptomycin); antibiotic screening (assay plate, bioassay).',
      'Bacteriostatic (protein synthesis inhibitors) vs bactericidal (cell wall, DNA) — a key distinction.',
      'Resistance mechanisms: efflux, target modification (mutant ribosome), enzyme inactivation (β-lactamase), permeability loss.',
      'Antibiotic production in fermentation: often stationary phase (secondary metabolite); precursor feeding (phenylacetic acid → penicillin V).',
    ],
    advanced: [
      'β-lactamase (TEM, KPC, NDM) and carbapenemase epidemics; combination therapy (β-lactam + β-lactamase inhibitor: clavulanic acid).',
      'Quorum sensing inhibition as anti-virulence strategy (novel "anti-antibiotic").',
    ],
    gate: {
      highYield: [
        'Drug → target → ribosomal subunit table.',
        'Bacteriostatic vs bactericidal classification.',
        'Streptomyces = main producer genus.',
        'Resistance mechanisms (4 types).',
      ],
      traps: [
        'Chloramphenicol + macrolides + clindamycin = 50S (same site, don’t combine).',
        'Tetracycline + aminoglycosides + streptomycin = 30S.',
        'Rifampicin targets RNA polymerase (transcription), not DNA directly.',
      ],
    },
    examples: [
      'Penicillin: β-lactam inhibits transpeptidase (PBPs) → weak peptidoglycan lysis.',
      'Vancomycin binds D-Ala–D-Ala → blocks wall synthesis (Gram-positive).'],
    formulas: [],
    keyPoints: [
      'Wall: β-lactam, vancomycin (cidal).',
      '30S: tetracycline, aminoglycosides; 50S: chloramphenicol, macrolides (static).',
      'DNA: quinolones (gyrase); RNA: rifampicin.',
      'Streptomyces = producer.',
    ],
    revision: {
      remember: 'Wall kills, ribosome stalls; 30/50 split; Streptomyces.',
      mistakes: ['Putting chloramphenicol on 30S.'],
      summary: 'Antibiotic target table + static/cidal + resistance + producer genus.',
    },
    related: ['mic-pathogenicity', 'mib-fermentation'],
  },
  {
    id: 'mib-strains',
    subject: 'microbial-biotechnology',
    name: 'Strain Improvement & Selection',
    level: 2,
    priority: 'medium',
    ord: 3,
    short: 'Making microbes produce more.',
    basic: {
      what: 'Strain improvement increases a microbe’s product yield: classical (random mutagenesis + screening) and modern (metabolic engineering, recombinant overexpression).',
      why: 'The economic heart of industrial biotech — better strain = cheaper product.',
      how: 'Classical: EMS/NTG/UV mutagenesis → screen thousands of colonies (assay plate, HPLC) → select high producers. Modern: delete competing pathways, overexpress rate-limiting enzymes, balance cofactors (NADH/NAD+), heterologous expression of biosynthetic genes.',
      where: 'Citric acid (A. niger), shikimate pathway (phenylalanine/tyrosine), terpenes, amino acids.',
    },
    college: [
      'Auxotrophic strains in amino acid production: feedback-resistant mutants (e.g. histidine auxotroph → his accumulation).',
      'Feedback inhibition bypass: mutate regulatory enzyme to be insensitive to end-product.',
      'Complementation and pathway balancing: avoid intermediate accumulation (toxicity, wasteful shunt).',
      'High-cell-density strategies for recombinant strains (plasmid stability: copy number, integration, selection pressure).',
    ],
    advanced: [
      'Dynamic pathway regulation: sensors shut pathway after product formed (e.g. amino acid biosynthesis via two-component systems).',
      'Systems biology + omics-guided strain design; machine learning for knockout predictions.',
    ],
    gate: {
      highYield: [
        'Feedback-resistant mutant logic (auxotrophy + regulation).',
        'Why delete competing pathways.',
        'Cofactor balance (NADH) as a design parameter.',
      ],
      traps: [
        'Auxotrophy ALONE doesn’t accumulate product — you also need feedback resistance (both are needed).',
        'Plasmid instability: without selection, non-plasmid cells outgrow in production (no antibiotic) — a design trap.',
      ],
    },
    examples: [
      'Corynebacterium glutamicate (feedback-resistant) → world’s L-lysine/L-glutamate producer.',
      'E. coli shikimate engineering → L-phenylalanine at scale.'],
    formulas: [],
    keyPoints: [
      'Classical: mutagenise + screen; modern: delete + overexpress + balance.',
      'Auxotrophy + feedback resistance = accumulation.',
      'Plasmid stability needs selection or integration.',
    ],
    revision: {
      remember: 'Mutate/regulate/balance; auxotroph + FB-resistant; stability matters.',
      mistakes: ['Auxotrophy alone = accumulation.'],
      summary: 'Strain improvement toolbox: classical screening + metabolic engineering + stability.',
    },
    related: ['mib-fermentation', 'bae-fedbatch'],
  },
  {
    id: 'mib-metabolites',
    subject: 'microbial-biotechnology',
    name: 'Industrial Metabolites & Biocatalysis',
    level: 3,
    priority: 'medium',
    ord: 4,
    short: 'Organic acids, enzymes and whole-cell catalysts.',
    basic: {
      what: 'Microbes make industrial organic acids (citric, lactic, acetic), solvents (acetone, butanol) and enzymes (amylases, proteases, lipases, cellulases). Biocatalysis uses enzymes or whole cells as industrial catalysts.',
      why: 'Enzymes in detergents, food, pharma and biofuels are a huge industry; GATE loves enzyme examples.',
      how: 'Enzyme production: submerged fermentation (most), solid-state (some); immobilisation (adsorption, covalent, entrapment) for reuse. Whole-cell biocatalysis: engineered cells convert substrates continuously.',
      where: 'Detergents (protease, lipase), starch processing (amylase, glucoamylase), biofuel (cellulase), pharma (penicillin acylase).',
    },
    college: [
      'Cellulose → (cellulase: C1, CX, β-glucosidase) → glucose; a multi-enzyme system (synergy).',
      'Enzyme immobilisation advantages: reuse, product separation, stability; trade-off: diffusion limitation.',
      'Amino acid production via mutagenised C. glutamicate (lysine, glutamate) — world’s largest volume.',
      'Solvent-producing clostridia (ABE: acetone-butanol-ethanol) — revival for biofuels.',
    ],
    advanced: [
      'Directed evolution (Phillip/Frances Arnold): random mutagenesis + selection cycles → engineered enzymes (e.g. thermostable proteases).',
      'Multi-enzyme cascades and one-pot reactions; artificial metabolon design.',
    ],
    gate: {
      highYield: [
        'Enzyme → industrial application mapping (amylase–starch, cellulase–biofuel, lipase–detergent/biodegradables).',
        'Cellulase = 3-enzyme synergy.',
        'Immobilisation pros/cons.',
        'ABE fermentation organisms (Clostridium).',
      ],
      traps: [
        'β-glucosidase is needed because cellulase C1/CX leave cellobiose — a "why 3 enzymes" question.',
        'Whole-cell catalysis can REPLACE free enzyme when cofactor regeneration is needed (NADH).',
      ],
    },
    examples: [
      'Penicillin G → (penicillin acylase) → 6-APA → semi-synthetic ampicillin/ampicillin.',
      'Thermostable α-amylase (Bacillus) in starch sugar industry.'],
    formulas: [],
    keyPoints: [
      'Cellulase = C1 + CX + β-glucosidase (synergy).',
      'Immobilisation = reuse + separation; diffusion cost.',
      'ABE = Clostridium solvents.',
      '6-APA → semi-synthetic penicillins.',
    ],
    revision: {
      remember: 'Cellulase trio; 6-APA hub; immobilise to reuse.',
      mistakes: ['Calling cellulase a single enzyme.'],
      summary: 'Metabolite catalog + biocatalysis logic + immobilisation trade-offs.',
    },
    related: ['mib-fermentation', 'pro-downstream'],
  },
  {
    id: 'mib-mfc',
    subject: 'microbial-biotechnology',
    name: 'Microbial Fuel Cells & Bioelectrochemistry',
    level: 3,
    priority: 'low',
    ord: 5,
    short: 'Microbes that make electricity.',
    basic: {
      what: 'Microbial fuel cells (MFCs) use bacteria to oxidise organic matter and transfer electrons to an anode, generating electricity while treating wastewater.',
      why: 'Connects biotech, environmental and electrochemistry themes — a GATE cross-topic favourite.',
      how: 'Anode chamber: exoelectrogenic bacteria (Geobacter, Shewanella) oxidise substrate → electrons to anode → wire → cathode; cathode: O2 reduced (air-cathode) or other acceptor. No O2 at anode (anaerobic).',
      where: 'Wastewater treatment + energy recovery; biosensors (powering themselves).',
    },
    college: [
      'Exoelectrogens: Geobacter sulfurreducens (outer-membrane cytochromes), Shewanella (conduction pili "nanowires").',
      'Overpotentials and internal resistance limit power; mediators (methylene blue) can shuttle electrons.',
      'Microbial electrolysis cells (MEC): small external voltage → bio-H2 at cathode.',
    ],
    advanced: [
      'Coulombic efficiency and energy recovery vs theoretical; scaling challenges (stack design, anode materials).',
      'Reverse electrodialysis and biohybrid systems for marine energy.',
    ],
    gate: {
      highYield: [
        'Anode = bacteria oxidise (anaerobic); cathode = reduction (often O2).',
        'Geobacter/Shewanella = exoelectrogens.',
        'MFC treats wastewater AND produces power (dual benefit).',
      ],
      traps: [
        'The ANODE is anaerobic (no O2) — a placement trap.',
        'Electrons flow anode → wire → cathode (same as a battery).',
      ],
    },
    examples: [
      'Lighthouse MFC prototypes powered by seawater anaerobic digestion.',
      'Self-powered biosensors: MFC + pH/DO probe in a single device.'],
    formulas: [
      { name: 'Coulombic efficiency', expr: 'CE = electrons recovered / electrons in substrate × 100' },
    ],
    keyPoints: [
      'Anode: bacteria oxidise (anaerobic); cathode: reduction.',
      'Geobacter/Shewanella = exoelectrogens.',
      'MFC = treatment + power.',
    ],
    revision: {
      remember: 'Anode bacteria, cathode O2; Geobacter wire-walkers.',
      mistakes: ['Putting O2 at the anode.'],
      summary: 'MFC architecture + exoelectrogens + efficiency metrics.',
    },
    related: ['env-climate', 'ins-assays'],
  },
  {
    id: 'mib-metabolic',
    subject: 'microbial-biotechnology',
    name: 'Metabolic Engineering of Microbes',
    level: 3,
    priority: 'medium',
    ord: 6,
    short: 'Rewiring pathways for new products.',
    basic: {
      what: 'Metabolic engineering redesigns microbial pathways to make new or more of a product: aromatic amino acids, terpenes, fatty acids, biofuels, pharmaceuticals.',
      why: 'The modern core of industrial biotech; GATE asks pathway logic and design principles.',
      how: 'Design (omics + knowledge) → Build (gene insertion, CRISPR knockouts) → Learn (flux analysis, isotopomer) → Repeat (DBTL cycle). Tools: CRISPRi/a for tuning, promoter libraries, codon optimisation.',
      where: 'Yeast artemisinic acid (antimalarial precursor), E. coli fatty acids, myrobalan for fragrances.',
    },
    college: [
      'Pathway bottlenecks: rate-limiting enzyme overexpression; intermediate toxicity (feedback inhibition removal).',
      'Compartmentalisation: eukaryotic (yeast) vacuoles/organelles protect toxic intermediates.',
      'Cofactor engineering: NADH/NAD+ balance; transhydrogenase; redox-balanced pathways.',
      'Heterologous expression: host choice (E. coli = fast, cheap; yeast = secretory, eukaryotic; C. elegans/yeast for special chemistries).',
    ],
    advanced: [
      'Dynamic regulation: sensor-mediated on/off (e.g. amino acid two-component) to avoid burden.',
      'Isotope tracing (13C) and metabolic flux analysis (MFA) quantify pathway flows.',
    ],
    gate: {
      highYield: [
        'DBTL cycle (design-build-test-learn).',
        'Why remove feedback inhibition + overexpress rate-limiting step.',
        'Host selection logic (prokaryote vs eukaryote).',
        'Cofactor (NADH) balance as a design constraint.',
      ],
      traps: [
        'Overexpression of a rate-limiting enzyme may CREATE a new bottleneck downstream — a design logic trap.',
        'Yeast is preferred when the product needs eukaryotic processing (folding, glycosylation).',
      ],
    },
    examples: [
      'Amber gene in yeast → artemisinic acid → artemisinin (antimalarial).',
      'E. coli PntAB + fatty acid pathway → isoprene and fatty acid esters (biofuel).'],
    formulas: [],
    keyPoints: [
      'DBTL = the loop.',
      'Remove FB + boost RLE + balance cofactors.',
      'Host choice by product chemistry.',
    ],
    revision: {
      remember: 'DBTL; FB off, RLE up, cofactor balanced.',
      mistakes: ['Ignoring downstream bottleneck after RLE overexpression.'],
      summary: 'Metabolic engineering logic: design-build-test-learn with pathway constraints.',
    },
    related: ['mib-strains', 'mib-metabolites'],
  },
  {
    id: 'mib-bioprocessing',
    subject: 'microbial-biotechnology',
    name: 'Bioprocessing Economics & Scale',
    level: 3,
    priority: 'low',
    ord: 7,
    short: 'Cost, productivity and the business of biotech.',
    basic: {
      what: 'Bioprocessing economics decide viability: productivity (g/L/h), yield (g product/g substrate), cost of goods (substrate, energy, downstream, capital). Scale affects all.',
      why: 'GATE asks cost-driving factors and the productivity-yield-dilution trade-off.',
      how: 'Productivity ↑ → smaller reactor, lower cost. Yield ↑ → less substrate. Downstream often 50–80% of cost for secreted proteins. Scale-up must preserve kLa, mixing, shear (see Bioreaction).',
      where: 'Process development, tech transfer, plant design.',
    },
    college: [
      'Space-time yield = productivity; distinguishes bioreactor technologies.',
      'Cost drivers: substrate (30–50%), downstream (up to 80% for antibodies), energy (aeration/agitation).',
      'Cell density limits: O2, nutrient, waste (ammonia, organic acids), shear.',
    ],
    advanced: [
      'Continuing vs batch economics: continuous can be cheaper for simple products but riskier (contamination, stability).',
      'Quality by design (QbD): define critical process parameters (CPPs) → control strategy.',
    ],
    gate: {
      highYield: [
        'Productivity vs yield vs titer (the big three).',
        'Downstream cost dominance for secreted proteins.',
        'Scale-up parameters (kLa, P/V, shear).',
      ],
      traps: [
        'High yield + low productivity can still be uneconomic (long batch) — a logic trap.',
        'Contamination in continuous culture = total loss (no "recovery" like batch).',
      ],
    },
    examples: [
      'Antibody: 5–10 g/L titer, 30–40 day batch, downstream ~70% of cost.',
      'Citric acid: high titer + cheap substrate = low cost despite simple product.'],
    formulas: [
      { name: 'Space-time yield', expr: 'STY = (P·V)/(V·t) = P/t' },
    ],
    keyPoints: [
      'Titer (g/L), yield (g/g), productivity (g/L/h) — the big three.',
      'Downstream dominates for proteins.',
      'Scale-up preserves kLa/P/V/shear.',
    ],
    revision: {
      remember: 'Titer/Yield/Productivity; downstream = cost king.',
      mistakes: ['Optimising yield while ignoring batch time.'],
      summary: 'Bioprocess economics: the big three + cost drivers + scale-up linkage.',
    },
    related: ['bae-scaleup', 'pro-downstream'],
  },
  {
    id: 'mib-gate',
    subject: 'microbial-biotechnology',
    name: 'GATE Focus: Microbial Biotech',
    level: 4,
    priority: 'high',
    ord: 8,
    short: 'Organism–product–process triplets and traps.',
    basic: {
      what: 'GATE microbial biotech = organism–product–process banks + antibiotic target table + strain improvement logic.',
      why: 'High recall yield, predictable structure.',
      how: 'Drill: citric–A. niger; ethanol–S. cerevisiae; insulin–E. coli; antibody–CHO; penicillin–P. chrysogenum; amino acids–C. glutamicate.',
      where: 'GATE BT paper.',
    },
    college: [
      'Triplet bank (organism–product–phase): A. niger–citric–fed-batch; P. chrysogenum–penicillin–stationary (secondary); S. cerevisiae–ethanol–exponential (primary); C. glutamicate–lysine–stationary.',
      'Antibiotic target table (30S/50S/wall/DNA/RNA).',
      'Strain improvement: auxotrophy + feedback resistance.',
    ],
    advanced: [
      'Multi-step: "stationary-phase product from soil actinomycete" → penicillin-type logic.',
      'Scale-up and cost questions linking to Bioreaction.',
    ],
    gate: {
      highYield: [
        'Triplet bank + antibiotic table + strain logic.',
        'Primary/secondary metabolite phase assignment.',
      ],
      traps: [
        'Penicillin = secondary (stationary) — the #1 trap.',
        'Ethanol = primary (exponential) — the flip side.',
      ],
    },
    examples: [
      '"Which is stationary-phase?" → penicillin (not ethanol).',
      '"50S inhibitor" → chloramphenicol/macrolide (not tetracycline).'],
    formulas: [],
    keyPoints: [
      'Triplets + antibiotic table + primary/secondary logic.',
      'Penicillin stationary; ethanol exponential.',
    ],
    revision: {
      remember: 'Triplets; penicillin stationary; 50S = chlo/macro.',
      mistakes: ['Phase swaps.'],
      summary: 'Microbial biotech GATE = triplet banks + target table + phase logic.',
    },
    related: ['mib-antibiotics', 'mib-fermentation'],
  },
];

// ============ MICROBIOLOGY ============
export const TOPICS_MIC: Topic[] = [
  {
    id: 'mic-physiology',
    subject: 'microbiology',
    name: 'Bacterial Physiology & Metabolism',
    level: 1,
    priority: 'high',
    ord: 1,
    short: 'How bacteria grow, eat and adapt.',
    basic: {
      what: 'Bacteria are prokaryotes: small, fast-growing (doubling ~20 min in optimum), metabolically diverse. They need carbon, nitrogen, energy, and the right pH/temperature/osmolarity.',
      why: 'Growth physiology underpins fermentation, sterilisation and infection — a GATE foundation.',
      how: 'Metabolism types: photo/chemo (energy) × litho/organotroph (electron donor) × auto/heterotroph (carbon). Growth: lag–exp–stationary–death (see Bioreaction kinetics). Extremophiles adapt to heat, salt, pH.',
      where: 'Fermentation, environmental microbiology, infection, food spoilage.',
    },
    college: [
      'Cardinal temperatures: minimum, optimum, maximum; psychrophiles (<15°C), mesophiles (20–45°C), thermophiles (>45°C), hyperthermophiles (>80°C).',
      'Osmolarity: halophiles need salt (Haloarchaea); plasmolysis vs turgor.',
      'pH: neutrophiles (6.5–7.5), acidophiles (<5.5), alkaliphiles (>8.5).',
      'Quorum sensing: cell-density signalling (autoinducers: AHL in Gram−, AI-2 universal) → virulence/biofilm.',
    ],
    advanced: [
      'Dormancy and persistence: spores (Bacillus, Clostridium) survive extremes via dipicolinic acid + SASPs.',
      'Horizontal gene transfer (transformation, transduction, conjugation) drives adaptation and resistance.',
    ],
    gate: {
      highYield: [
        'Metabolism type definitions (photo/chemo, litho/organotroph, auto/heterotroph).',
        'Temperature class ranges (psychro/meso/thermo/hyper).',
        'Quorum sensing molecules (AHL, AI-2).',
        'Spore resistance factors (DPA, SASP, cortex).',
      ],
      traps: [
        'Methanogens are ARCHAEA, not bacteria — a taxonomy trap that repeats.',
        'Obligate anaerobes are KILLED by O2 (not just inhibited).',
      ],
    },
    examples: [
      'Thermus aquaticus (hot spring) → Taq polymerase for PCR.',
      'Vibrio fischeri quorum sensing = bioluminescence at high density.'],
    formulas: [],
    keyPoints: [
      '3-axis metabolism classification.',
      'Temperature/pH/salt classes.',
      'Quorum sensing: AHL (Gram−), AI-2 (universal).',
      'Spores = DPA + SASP + cortex.',
    ],
    revision: {
      remember: '3-axis metabolism; classes by T/pH/salt; AHL/AI-2; DPA spores.',
      mistakes: ['Calling methanogens bacteria.'],
      summary: 'Bacterial physiology: metabolism types + environmental classes + quorum + spores.',
    },
    related: ['bae-kinetics', 'mic-viruses', 'mib-fermentation'],
  },
  {
    id: 'mic-viruses',
    subject: 'microbiology',
    name: 'Virology',
    level: 1,
    priority: 'high',
    ord: 2,
    short: 'Virus structure, replication and classification.',
    basic: {
      what: 'Viruses are obligate intracellular parasites: genetic material (DNA or RNA, never both) in a protein coat (capsid), sometimes a lipid envelope. They replicate using the host machinery.',
      why: 'Virus classification and replication cycles are GATE staples; also the basis of viral vectors.',
      how: 'Steps: attachment (receptor) → entry (endocytosis/fusion) → uncoating → replication (genome + proteins) → assembly → release (budding/lysis). Lytic (phage: attack → replicate → burst) vs lysogenic (prophage integration, λ phage).',
      where: 'Vaccines (viral vectors), gene therapy, phage therapy, pandemics.',
    },
    college: [
      'Classification: Baltimore system (I–VII) by genome type and replication strategy.',
      'Retroviruses: RNA → (reverse transcriptase) → DNA → integrate (provirus); HIV.',
      'Enveloped (budding, immune-evasion glycoproteins) vs non-enveloped (lysis, more stable).',
      'Bacteriophages: T4 (lytic), λ (temperate); transduction (generalised/specialised).',
    ],
    advanced: [
      'Quasispecies and mutation rates: RNA viruses mutate fast (no proofreading) → antigenic drift (influenza) vs shift (reassortment).',
      'Viral vectors: AAV (stable, low immunogenic), lentiviral (integrating, large), adenoviral (high titre, transient) — choice for gene therapy.',
    ],
    gate: {
      highYield: [
        'Baltimore groups (I–VII) and which is which (e.g. retrovirus = IV).',
        'Lytic vs lysogenic (prophage, induction).',
        'Antigenic drift (point) vs shift (reassortment).',
        'Vector properties (AAV/lenti/adeno).',
      ],
      traps: [
        'A virus has DNA OR RNA, never both — an absolute rule (with rare exceptions not in syllabus).',
        'Retroviruses carry REVERSE TRANSCRIPTASE — the hallmark enzyme.',
        'Antigenic SHIFT causes pandemics; DRIFT causes seasonal variation.',
      ],
    },
    examples: [
      'λ phage: cI repressor maintains lysogeny; SOS (RecA) induces excision.',
      'Influenza: 8-segment genome → reassortment (H1N1) = shift.'],
    formulas: [],
    keyPoints: [
      'DNA or RNA, never both; capsid ± envelope.',
      'Baltimore I–VII; retrovirus = RT enzyme.',
      'Lytic (burst) vs lysogenic (prophage).',
      'Drift = seasonal; shift = pandemic.',
    ],
    revision: {
      remember: 'One nucleic acid; RT = retro; drift seasonal, shift pandemic.',
      mistakes: ['Expecting both DNA and RNA in a virus.'],
      summary: 'Virus structure + Baltimore + replication + phage cycles + drift/shift.',
    },
    related: ['mic-pathogenicity', 'mol-transcription', 'imm-vaccines'],
  },
  {
    id: 'mic-pathogenicity',
    subject: 'microbiology',
    name: 'Pathogenicity & Virulence',
    level: 2,
    priority: 'high',
    ord: 3,
    short: 'How microbes cause disease.',
    basic: {
      what: 'Pathogenicity = ability to cause disease; virulence = degree. Mechanisms: adhesion (colonisation), invasion, toxins, immune evasion. Virulence factors are the molecular tools.',
      why: 'GATE asks virulence factor → mechanism mapping and classic disease examples.',
      how: 'Adhesins (fimbriae, pili, FHbp) attach to host receptors. Toxins: exotoxins (secreted; A-B type: cholera, diphtheria, tetanus) vs endotoxins (LPS, Gram− membrane). Evasion: capsule (anti-phagocytic), biofilm, antigenic variation.',
      where: 'Infectious disease, vaccine targets, antibiotic resistance.',
    },
    college: [
      'Toxin types: exotoxin (A-B: A catalytic, B binding; superantigens: Staph TSST-1, streptococcal pyrogenic), endotoxin (Lipid A → sepsis).',
      'Capsule = anti-phagocytic (encapsulated: S. pneumoniae, H. influenzae, N. meningitidis — vaccine targets).',
      'Biofilm: matrix (exopolysaccharide) + persister cells; chronic infections (catheters, CF lung).',
      'ID50/LD50: infectivity/lethality doses (log scale).',
    ],
    advanced: [
      'Type III secretion system (molecular syringe): injects effectors directly into host cells (Salmonella, Shigella, Pseudomonas).',
      'Virulence plasmids and pathogenicity islands (PAIs) — HGT-acquired.',
    ],
    gate: {
      highYield: [
        'Exotoxin (A-B) vs endotoxin (LPS) — structure and effect.',
        'Superantigen mechanism (MHC II–TCR cross-link, cytokine storm).',
        'Capsule = anti-phagocytic; vaccine targets (pneumococcal).',
        'Type III secretion = effector injection.',
        'ID50/LD50 definition (log scale).',
      ],
      traps: [
        'Endotoxin = LPS (Gram−) is NOT secreted — it is released on lysis. Exotoxins are secreted.',
        'Superantigens are EXOTOXINS but do NOT need to enter cells (they bridge MHC II and TCR).',
        'Koch’s postulates: 4 steps (correlation, isolation, reproduction, re-isolation) — a classic list.',
      ],
    },
    examples: [
      'Cholera toxin (A-B): ADP-ribosylates Gs → cAMP ↑ → Cl−/water secretion → diarrhoea.',
      'Diphtheria toxin: inhibits elongation factor-2 (ADP-ribosylation) → protein synthesis stops.'],
    formulas: [],
    keyPoints: [
      'Exotoxin (A-B, secreted) vs endotoxin (LPS, membrane).',
      'Superantigen = MHC II–TCR bridge → storm.',
      'Capsule = anti-phagocytic.',
      'T3SS = inject effectors.',
      'Koch’s 4 postulates.',
    ],
    revision: {
      remember: 'A-B exo, LPS endo, superantigen bridges, capsule hides, T3SS injects.',
      mistakes: ['Calling LPS a secreted exotoxin.'],
      summary: 'Virulence factor map: adhesion, toxins, evasion, secretion systems + Koch’s postulates.',
    },
    related: ['mic-physiology', 'imm-basics', 'mic-sterilization'],
  },
  {
    id: 'mic-sterilization',
    subject: 'microbiology',
    name: 'Sterilization, Disinfection & Asepsis',
    level: 2,
    priority: 'high',
    ord: 4,
    short: 'Killing microbes: methods and the D-value math.',
    basic: {
      what: 'Sterilisation = complete elimination of all life (including spores). Disinfection = reduction of pathogens on surfaces. Antiseptic = on living tissue. Methods: heat (moist/dry), filtration, radiation, chemicals.',
      why: 'Sterilisation calculations (D-value, z-value) are GATE microbiology numericals.',
      how: 'Moist heat (autoclave 121°C, 15 psi, 15 min — denatures proteins). Dry heat (160–170°C, 2 h — oxidation). Filtration (0.22 µm — removes bacteria; heat-sensitive liquids). Radiation (UV = DNA damage, surface; gamma = spores, deep). Chemicals (alcohol, phenol, glutaraldehyde, ethylene oxide for heat-sensitive).',
      where: 'Lab, hospital, bioprocess (CIP/SIP), food.',
    },
    college: [
      'D-value (decimal reduction time): time to reduce 90% (1 log) at a given temperature. N = N0·10^(−t/D).',
      'z-value: temperature change for 10× change in D (e.g. z = 10°C for many bacteria).',
      'Thermal death time (TDT): time to kill all at a temperature.',
      'Spores (Bacillus stearothermophilus) are the hardy reference for autoclave validation (biological indicator).',
    ],
    advanced: [
      'Ethylene oxide: alkylates proteins/DNA; for heat-sensitive plastics/electronics; toxic, needs aeration.',
      'Antimicrobial resistance to disinfectants (biofilms resist 10–1000× more).',
    ],
    gate: {
      highYield: [
        'D-value formula and log-reduction arithmetic.',
        'Autoclave parameters (121°C/15 psi/15 min).',
        'Filtration pore size (0.22 µm for bacteria; 0.1 µm some viruses).',
        'UV = surface/DNA; gamma = deep/spores.',
        'Bacillus stearothermophilus = autoclave bioindicator.',
      ],
      traps: [
        'Alcohol (70%) is a DISINFECTANT, not a sterilant (doesn’t kill spores) — a "sterilise vs disinfect" trap.',
        'Moist heat is MORE effective than dry heat at lower T (protein denaturation vs oxidation).',
      ],
    },
    examples: [
      'Medium sterilisation: autoclave 121°C 15 min; serum: 0.22 µm filter (heat-sensitive).',
      'Surgical instruments: autoclave; endoscopes: glutaraldehyde (high-level disinfection).'],
    formulas: [
      { name: 'D-value', expr: 'N = N0 · 10^(−t/D)' },
      { name: 'Log reduction', expr: 'log N0 − log N = t/D' },
    ],
    keyPoints: [
      'Sterilise (all life) vs disinfect (pathogens) vs antiseptic (tissue).',
      'Autoclave 121°C/15 psi/15 min; B. stearothermophilus indicator.',
      'D-value log-reduction math.',
      '0.22 µm filter = bacteria.',
    ],
    revision: {
      remember: '121/15/15; D = 90% time; 0.22 µm; alcohol ≠ sterilant.',
      mistakes: ['Calling 70% alcohol a sterilant.'],
      summary: 'Sterilisation methods + D/z-value math + indicators + pore sizes.',
    },
    related: ['mic-physiology', 'mib-fermentation'],
  },
  {
    id: 'mic-fungi',
    subject: 'microbiology',
    name: 'Fungi, Algae & Protists',
    level: 2,
    priority: 'medium',
    ord: 5,
    short: 'The eukaryotic microbes.',
    basic: {
      what: 'Fungi (yeasts, moulds, mushrooms) are eukaryotes with chitin walls; algae are photosynthetic (plants’ relatives); protists are diverse single-celled eukaryotes (amoeba, paramecium, plasmodium).',
      why: 'Yeast = the workhorse of recombinant protein production (eukaryotic host); mycoses and food fungi matter.',
      how: 'Yeast (S. cerevisiae): haploid/diploid life cycle, mating (a/α), sporulation; ideal for recombinant expression (secretion, glycosylation). Moulds: hyphae, asexual (conidia) + sexual (asci/basidia) reproduction.',
      where: 'Baking/brewing, recombinant proteins (hepatitis B vaccine in yeast), mycology, algal biofuels.',
    },
    college: [
      'Yeast as expression host: α-factor secretion signal, GAL promoter (galactose-inducible), AOX1 (Pichia, methanol).',
      'Mycoses: superficial (Malassezia), cutaneous (dermatophytes), systemic (Candida, Aspergillus, Cryptococcus).',
      'Algae: Chlorella, Spirulina (protein, CO2 fixation); diatoms (silica frustules).',
      'Protozoan parasites: Plasmodium (liver → RBC cycle), Leishmania (macrophage), Trypanosoma (GTP cycle, variant surface glycoprotein).',
    ],
    advanced: [
      'Fungal secondary metabolites: aflatoxin (Aspergillus flavus), mycotoxins — food safety.',
      'Quiescent yeast populations and plasmid maintenance in production.',
    ],
    gate: {
      highYield: [
        'Yeast as eukaryotic host (secretion, glycosylation, GAL/AOX1).',
        'Plasmodium life cycle (mosquito → liver → RBC; merozoites).',
        'Mycotoxin source (Aspergillus aflatoxin).',
        'Chitin = fungal wall (vs peptidoglycan in bacteria, cellulose in plants).',
      ],
      traps: [
        'Yeast glycosylation differs from CHO/mammalian (high-mannose dominant) — a "which host for which product" nuance.',
        'Plasmodium: the infective form to humans is the sporozoite (from mosquito), not merozoite (that’s the RBC stage).',
      ],
    },
    examples: [
      'Hepatitis B surface antigen produced in S. cerevisiae (first recombinant vaccine).',
      'Aflatoxin B1 (A. flavus) = potent hepatocarcinogen in stored grain.'],
    formulas: [],
    keyPoints: [
      'Yeast = eukaryotic recombinant host (α-signal, GAL/AOX1).',
      'Chitin wall (fungi).',
      'Plasmodium: sporozoite infects; merozoite is RBC stage.',
      'Aflatoxin = A. flavus.',
    ],
    revision: {
      remember: 'Yeast = euk host; chitin; sporozoite in, merozoite in RBC; aflatoxin A. flavus.',
      mistakes: ['Calling merozoite the mosquito-borne form.'],
      summary: 'Fungi/algae/protists: yeast biotech role + mycology + protozoan life cycles.',
    },
    related: ['mic-viruses', 'mib-fermentation', 'env-climate'],
  },
  {
    id: 'mic-ecology',
    subject: 'microbiology',
    name: 'Microbial Ecology & Biogeography',
    level: 3,
    priority: 'low',
    ord: 6,
    short: 'Microbes in their environments.',
    basic: {
      what: 'Microbial ecology studies microbes in natural communities: soil, ocean, gut, extreme environments. Metagenomics (shotgun sequencing of environmental DNA) reveals diversity without culturing.',
      why: 'Connects microbiology to environmental biotech and the "uncultured majority" concept.',
      how: '16S rRNA gene sequencing (bacteria/archaea) → operational taxonomic units (OTUs) → community composition. Metagenomics: whole-community DNA → genes → functions. FISH (fluorescence in-situ hybridisation) images specific taxa.',
      where: 'Gut microbiome, soil health, ocean carbon, bioremediation, bioprospecting.',
    },
    college: [
      'Gut microbiome: Bacteroidetes/Firmicutes ratio; SCFA (short-chain fatty acids) production; dysbiosis.',
      'Biogeochemical cycles: N (fixation–nitrification–denitrification), C (methane), S (sulfate reduction).',
      'Extremophiles: hyperthermophiles (hydrothermal vents, Archaea), halophiles, acidophiles.',
      'Uncultured majority: >99% of environmental microbes resist standard culturing — metagenomics bypasses this.',
    ],
    advanced: [
      'Microbial dark matter: sequences with no cultured representative (e.g. Candidate Phyla Radiation).',
      'Microbiome therapeutics: FMT (faecal microbiota transplant) for C. difficile.',
    ],
    gate: {
      highYield: [
        '16S rRNA = the bacterial phylogenetic marker.',
        'Metagenomics bypasses the culturing bottleneck.',
        'N-cycle steps and responsible groups.',
        'Uncultured majority concept.',
      ],
      traps: [
        '16S rRNA is for BACTERIA/ARCHAEA — not eukaryotes (those use 18S) — a marker swap trap.',
        'FMT treats C. difficile (recurrent) — a specific clinical anchor.',
      ],
    },
    examples: [
      'Human Microbiome Project: >1000 species in the gut.',
      'Hydrothermal vent Archaea (methanogens) = origin-of-life models.'],
    formulas: [],
    keyPoints: [
      '16S (bacteria) / 18S (eukaryotes) markers.',
      'Metagenomics = culture-independent.',
      'N-cycle: fix → nitrify → denitrify.',
      'Uncultured majority + FMT (C. difficile).',
    ],
    revision: {
      remember: '16S bacteria, 18S eukaryotes; metagenomics skips culture; FMT for C. diff.',
      mistakes: ['Using 16S for eukaryotes.'],
      summary: 'Microbial ecology: markers + metagenomics + biogeochemistry + microbiome therapeutics.',
    },
    related: ['env-bioremediation', 'mic-physiology'],
  },
  {
    id: 'mic-biofilm',
    subject: 'microbiology',
    name: 'Biofilms',
    level: 3,
    priority: 'medium',
    ord: 7,
    short: 'Structured microbial communities on surfaces.',
    basic: {
      what: 'Biofilms are structured communities of microbes embedded in a self-made matrix (exopolysaccharide) on surfaces. They resist antibiotics 10–1000× better than planktonic cells.',
      why: 'Biofilms cause chronic infections (catheters, CF lung, dental plaque) and are a major biotech/medical problem.',
      how: 'Stages: reversible attachment → irreversible attachment → matrix production → maturation (water channels, heterogeneity) → dispersal (motile cells leave). Quorum sensing coordinates maturation.',
      where: 'Medical devices, chronic wounds, industrial fouling, wastewater (beneficial in bioreactors).',
    },
    college: [
      'Persister cells: dormant subpopulation, tolerant (not resistant) to antibiotics — seed of relapse.',
      'EPS composition: polysaccharide, protein, eDNA; hydration and diffusion limitation.',
      'Clinical: CF lung (P. aeruginosa biofilm), dental plaque (Streptococcus), catheter-related infections.',
      'Industrial: biofouling in pipes, descaling; beneficial: biofilms in activated sludge and bioreactors.',
    ],
    advanced: [
      'Antibiofilm strategies: matrix degradation (DNase, dispersin B), quorum quenching, phage cocktails, surface design (anti-adhesion).',
      'Spatial heterogeneity: oxygen gradients create aerobic/anaerobic micro-niches within one biofilm.',
    ],
    gate: {
      highYield: [
        'Biofilm stages (attach → mature → disperse).',
        'Persister = tolerant (dormant), not genetically resistant.',
        'Quorum sensing controls maturation.',
        'EPS = polysaccharide + protein + eDNA.',
      ],
      traps: [
        'Persistance is PHENOTYPIC tolerance (dormancy), not a resistance GENE — a key distinction.',
        'Biofilms are BENEFICIAL in wastewater (activated sludge is a biofilm) — context matters.',
      ],
    },
    examples: [
      'Dental plaque = the most familiar human biofilm.',
      'CF patients: chronic P. aeruginosa biofilm in mucus → treatment failure.'],
    formulas: [],
    keyPoints: [
      'Stages: attach → EPS → mature → disperse.',
      'Persister = dormant tolerance (not resistance).',
      'Quorum sensing = maturation signal.',
      'EPS = polymer matrix.',
    ],
    revision: {
      remember: 'Attach-mature-disperse; persister = dormant; QS = signal.',
      mistakes: ['Calling persisters genetically resistant.'],
      summary: 'Biofilm lifecycle + persistence + quorum control + clinical/industrial contexts.',
    },
    related: ['mic-pathogenicity', 'mic-ecology'],
  },
  {
    id: 'mic-gate',
    subject: 'microbiology',
    name: 'GATE Focus: Microbiology Patterns',
    level: 4,
    priority: 'high',
    ord: 8,
    short: 'Sterilisation math, virus rules and pathogen anchors.',
    basic: {
      what: 'GATE microbiology = sterilisation D-value math + virus absolute rules + virulence factor banks + pathogen anchors.',
      why: 'High predictability; the math is the differentiator.',
      how: 'Drill: D-value log reduction, autoclave parameters, virus "never both nucleic acids", toxin A-B vs LPS, Koch’s postulates.',
      where: 'GATE BT paper.',
    },
    college: [
      'Sterilisation math: 3 D-values = 99.9% (3-log) reduction; 6 D = 99.9999% (6-log).',
      'Virus rules: one nucleic acid; RT = retro; envelope = budding.',
      'Toxin bank: A-B (cholera, diphtheria, tetanus), superantigen (TSST-1), LPS (endotoxin).',
      'Pathogen anchors: Plasmodium (sporozoite), C. difficile (FMT), B. stearothermophilus (autoclave).',
    ],
    advanced: [
      'Multi-step: "heat-sensitive medium" → 0.22 µm filter (not autoclave).',
      'Classification reasoning (Baltimore from genome type).',
    ],
    gate: {
      highYield: [
        'D-value arithmetic + absolute virus rules + toxin/organism banks.',
      ],
      traps: [
        'Log-reduction: 90% = 1 log, 99% = 2, 99.9% = 3.',
        'Alcohol = disinfectant (no spore kill).',
      ],
    },
    examples: [
      'D = 2 min at 121°C; 6-log kill → 12 min (3 + margin).',
      '"Which virus has reverse transcriptase?" → retrovirus (HIV).'],
    formulas: [
      { name: 'Log kill', expr: 't = D · (log N0 − log N)' },
    ],
    keyPoints: [
      'D-value log math; 3-log = 99.9%.',
      'Virus: one nucleic acid; RT = retro.',
      'Toxin and organism anchor banks.',
    ],
    revision: {
      remember: 'Log math + one-nucleic-acid + A-B/LPS + anchors.',
      mistakes: ['Log-count slips (99% = 2, not 3).'],
      summary: 'Microbiology GATE = sterilisation math + virus rules + toxin/pathogen banks.',
    },
    related: ['mic-sterilization', 'mic-viruses', 'mic-pathogenicity'],
  },
];

// ============ MOLECULAR BIOLOGY ============
export const TOPICS_MOL: Topic[] = [
  {
    id: 'mol-replication',
    subject: 'molecular-biology',
    name: 'DNA Replication',
    level: 1,
    priority: 'high',
    ord: 1,
    short: 'How the genome copies itself faithfully.',
    basic: {
      what: 'DNA replication is semi-conservative: each new duplex has one old and one new strand. It starts at origins, proceeds bidirectionally, and is remarkably accurate (~1 error per 10^9 bases).',
      why: 'The replication machinery (primase, polymerase, ligase, helicase) is a GATE anchor and the basis of PCR.',
      how: 'Origin (oriC in bacteria) → DnaA unwinds → helicase (DnaB) opens fork → SSB stabilises → primase makes RNA primer → DNA pol III (bacteria) / pol δ/ε (euk) extends 5′→3′ → lagging strand via Okazaki fragments → pol I removes primers → ligase seals.',
      where: 'Cell division, PCR (in vitro version), DNA repair, genetics.',
    },
    college: [
      'Leading strand: continuous (5′→3′ toward fork). Lagging: discontinuous Okazaki fragments (1000–2000 nt bacteria; ~100–200 euk).',
      'Proofreading: 3′→5′ exonuclease activity of polymerase (→ 10^−7); mismatch repair (→ 10^−9 to 10^−10).',
      'Eukaryotes: 5 origin types (RITS), licensing (ORC, Cdc6, Cdt1, MCM helicase), replisome at fork.',
      'Telomeres: repeated TTAGGG; telomerase (TERT + TER) extends; shortening limits cell divisions (Hayflick).',
    ],
    advanced: [
      'Replisome coordination: helicase–primase–polymerase handoff; clamp loader (γ-sliding clamp) keeps polymerase on.',
      'R-loops (RNA:DNA hybrid) as replication obstacles; RNase H resolves.',
      'Origin firing control: one round per cycle (licensing in G1, firing in S).',
    ],
    gate: {
      highYield: [
        'Semi-conservative (Meselson–Stahl 1958, 15N/14N density gradient).',
        'Leading continuous, lagging Okazaki (primer, 5′→3′).',
        'Proofreading (3′→5′ exonuclease) + MMR = accuracy.',
        'Telomerase and Hayflick limit.',
        'Prokaryotic enzymes: DnaA (initiation), DnaB (helicase), primase, pol III (main), pol I (primer removal), ligase.',
      ],
      traps: [
        'DNA polymerase can ONLY extend 5′→3′ (adds to 3′-OH) — it cannot start de novo (needs primer).',
        'Okazaki fragments are made on the LAGGING strand (away from fork movement).',
        'Meselson–Stahl distinguished semi-conservative from dispersive (not conservative).',
      ],
    },
    examples: [
      'PCR mimics replication: denature → anneal (primer) → extend (Taq) — no helicase/SSB needed (heat).',
      'HIV reverse transcriptase has NO proofreading → high mutation rate (antiretroviral resistance).'],
    formulas: [],
    keyPoints: [
      'Semi-conservative; bidirectional from origin.',
      'Leading continuous; lagging Okazaki + primer.',
      '5′→3′ synthesis only; 3′→5′ proofreading.',
      'Telomerase extends telomeres; Hayflick limit.',
    ],
    revision: {
      remember: 'Semi-conservative; 5′→3′ only; Okazaki on lagging; telomerase at ends.',
      mistakes: ['Saying polymerase starts de novo.'],
      summary: 'Replication machinery (proc + euk) + leading/lagging + proofreading + telomeres.',
    },
    related: ['mol-transcription', 'rdt-pcr', 'bio-nucl'],
  },
  {
    id: 'mol-transcription',
    subject: 'molecular-biology',
    name: 'Transcription',
    level: 1,
    priority: 'high',
    ord: 2,
    short: 'DNA to mRNA: the central dogma’s first step.',
    basic: {
      what: 'Transcription copies a gene’s DNA into RNA (mRNA, tRNA, rRNA). RNA polymerase reads the template 3′→5′ and synthesises RNA 5′→3′. In eukaryotes, the primary transcript is processed (5′ cap, splicing, polyA) before export.',
      why: 'Transcription is the main gene-regulation point; promoters, enhancers and RNA processing are GATE core.',
      how: 'Prokaryotes: σ-factor + RNA pol binds promoter (−10, −35) → initiation → elongation → termination (rho-dependent/independent). Eukaryotes: Pol II (mRNA) with TFs (TFIIA-H) at TATA box; 5′ m7G cap; intron splicing (spliceosome: snRNPs U1-U2-U4-U5); 3′ polyA.',
      where: 'Gene expression, mRNA vaccines, antisense, splicing diseases.',
    },
    college: [
      'Promoter elements: TATA (−25), BRE, Inr; enhancers (distal, orientation-independent); silencers.',
      'Splicing: introns removed by two transesterification steps; branch point (A); 5′ GU / 3′ AG dinucleotides.',
      'RNA types: mRNA (Pol II), tRNA (Pol III), rRNA (Pol I + III); snRNA (Pol II).',
      'Alternative splicing: one gene → multiple isoforms (majority of human genes).',
    ],
    advanced: [
      'Transcription-coupled nucleosome remodelling; pause release (NELF/DSIF → P-TEFb → phosphorylation).',
      'Cryptic splicing and disease: CFTR, dystrophin exon skipping therapy (Eteplirsen for Duchenne).',
    ],
    gate: {
      highYield: [
        'Pol I/II/III division (rRNA/mRNA/tRNA).',
        'Spliceosome: GU-AG rule; branch point; two transesterifications.',
        'Promoter elements (TATA −25; prok −10/−35).',
        'Alternative splicing = proteome diversity.',
        '5′ cap (m7G) + 3′ polyA = mRNA features.',
      ],
      traps: [
        'RNA pol reads template 3′→5′, synthesises 5′→3′ (same direction logic as DNA pol).',
        'The 5′ cap is added CO-TRANSCRIPTIONALLY (not after).',
        'tRNA is Pol III, NOT Pol II — a common swap.',
      ],
    },
    examples: [
      'Eteplirsen (Exondys 51): exon-skipping antisense for Duchenne muscular dystrophy.',
      'β-globin splicing mutations → thalassemia (intronic splice-site).'],
    formulas: [],
    keyPoints: [
      'Pol II = mRNA; Pol I = rRNA; Pol III = tRNA.',
      'GU-AG splicing; branch point A.',
      '5′ m7G cap + 3′ polyA = mature mRNA.',
      'Alternative splicing → isoforms.',
    ],
    revision: {
      remember: 'II=mRNA, I=rRNA, III=tRNA; GU-AG; cap + polyA.',
      mistakes: ['Putting tRNA on Pol II.'],
      summary: 'Transcription machinery (proc + euk) + RNA processing + splicing + regulation points.',
    },
    related: ['mol-replication', 'mol-translation', 'mol-regulation'],
  },
  {
    id: 'mol-translation',
    subject: 'molecular-biology',
    name: 'Translation',
    level: 1,
    priority: 'high',
    ord: 3,
    short: 'mRNA to protein: the ribosome machine.',
    basic: {
      what: 'Translation decodes mRNA into protein at the ribosome. The genetic code is degenerate (64 codons → 20 aa + stops), nearly universal, read 5′→3′ in triplets.',
      why: 'The code, tRNA charging and ribosome targets (antibiotics!) are GATE staples.',
      how: 'Initiation: fMet-tRNA (bacteria) / Met-tRNAi (euk) at start codon (AUG); ribosomal subunits assemble. Elongation: aa-tRNA (EF-Tu bacteria / eEF1A euk) enters A site → peptide bond (peptidyl transferase = rRNA ribozyme) → translocation. Termination: release factors (RF1/RF2 bacteria) at UAA/UAG/UGA.',
      where: 'Protein synthesis, antibiotic targets, genetic code exceptions.',
    },
    college: [
      'Genetic code features: degenerate, non-overlapping, comma-less, unambiguous; near-universal (mitochondrial exceptions: UGA = Trp in mitochondria).',
      'Aminoacyl-tRNA synthetases: charge tRNAs (20 enzymes); proofreading (hydrolysis) ensures fidelity.',
      'Ribosome: 70S (30S + 50S) bacteria; 80S (40S + 60S) euk; A/P/E sites.',
      'Antibiotic targets: aminoglycosides (30S, misreading), tetracycline (30S, blocks entry), macrolides (50S, blocks translocation), chloramphenicol (50S, peptidyl transferase), streptomycin (30S, initiation).',
    ],
    advanced: [
      'Translational control: uORFs (eIF2 phosphorylation → GCN2 pathway), iron-regulatory elements (IRE/IRP).',
      'Ribosome display and mRNA translation in cell-free systems (biomanufacturing).',
    ],
    gate: {
      highYield: [
        'Code: degenerate, AUG start, UAA/UAG/UGA stop.',
        '70S vs 80S; A/P/E sites.',
        'Antibiotic → ribosomal subunit table (30S vs 50S).',
        'Peptidyl transferase = rRNA (ribozyme).',
        'Aminoacyl-tRNA synthetase = fidelity enzyme.',
      ],
      traps: [
        'Peptidyl transferase is an RNA CATALYST (23S/28S rRNA), not a protein enzyme — a famous trap.',
        'Mitochondrial code: UGA = Trp (not stop) — a code-exception trap.',
        'Tetracycline blocks aminoacyl-tRNA BINDING (A site), not the peptide bond.',
      ],
    },
    examples: [
      'Ondansetron (anti-emetic) is a 5-HT3 antagonist — translation of its gene in CHO cells is industrial biotech.',
      'Linezolid (oxazolidinone) binds 50S (23S) — a newer target.'],
    formulas: [],
    keyPoints: [
      'Code: degenerate, AUG start, 3 stops.',
      '70S (30+50) / 80S (40+60); A/P/E.',
      'Peptidyl transferase = rRNA ribozyme.',
      'Antibiotics: 30S (ami, tet, strep) / 50S (macro, chlo).',
    ],
    revision: {
      remember: 'AUG start; rRNA is the ribozyme; 30/50 antibiotic split; synthetase = fidelity.',
      mistakes: ['Calling peptidyl transferase a protein.'],
      summary: 'Translation steps + code properties + ribosome structure + antibiotic targets.',
    },
    related: ['mol-transcription', 'bio-aa', 'mic-viruses'],
  },
  {
    id: 'mol-regulation',
    subject: 'molecular-biology',
    name: 'Gene Regulation (lac Operon & Beyond)',
    level: 2,
    priority: 'high',
    ord: 4,
    short: 'How cells switch genes on and off.',
    basic: {
      what: 'Gene regulation controls WHEN and HOW MUCH a gene is expressed. The lac operon (E. coli) is the classic model: lactose present → ON; glucose present → OFF (catabolite repression).',
      why: 'The lac operon logic (repression + activation) is the most-tested regulatory system in GATE.',
      how: 'lacI encodes repressor (binds operator → blocks). Lactose → allolactose (inducer) → binds repressor → conformational change → releases operator. cAMP: low glucose → high cAMP → CAP-cAMP binds promoter → activates RNA pol. Both must be permissive for full expression.',
      where: 'Metabolic adaptation, synthetic biology (inducible promoters), antibiotic resistance regulation.',
    },
    college: [
      'Four states: no lactose/glucose (off), lactose/glucose (off–repressed), lactose/no glucose (ON), no lactose/no glucose (off).',
      'trp operon: ATTENUATION (leader peptide) + repression (tryptophan-corepressor).',
      'Eukaryotic regulation: chromatin (histone acetylation = open), transcription factors, enhancers/silencers, RNA interference, mRNA stability, translational control.',
      'Epigenetics: DNA methylation (CpG), histone marks (H3K4me3 = active, H3K27me3 = repressed).',
    ],
    advanced: [
      'Two-hybrid and ChIP-seq: map transcription factor binding in vivo.',
      'Synthetic biology: inducible promoters (Tet-On/Off, arabinose BAD30) for controlled expression.',
    ],
    gate: {
      highYield: [
        'lac operon: repressor (lacI) + CAP-cAMP; the 4-state table.',
        'Inducer = allolactose (not lactose directly).',
        'trp = repressible (corepressor = tryptophan) + attenuation.',
        'lac = inducible; trp = repressible (the polarity).',
        'Euk: acetylation = open; methylation = usually closed.',
      ],
      traps: [
        'CAP activates (does NOT repress) — it is a POSITIVE regulator needing cAMP.',
        'The inducer is ALLOLACTOSE, not lactose itself — a classic precision trap.',
        'lac operon is INDUCIBLE (default off, induced by lactose); trp is REPRESSIBLE (default on, repressed by tryptophan).',
      ],
    },
    examples: [
      'LacZ (β-galactosidase) = blue/white screening (X-gal) in cloning.',
      'Tet-Off system: tetracycline represses expression (inducible-off) in cell lines.'],
    formulas: [],
    keyPoints: [
      'lac: lacI repressor + CAP-cAMP activator; inducer = allolactose.',
      'lac = inducible; trp = repressible (+ attenuation).',
      'Euk: acetylation open, methylation closed.',
      'LacZ = X-gal screening.',
    ],
    revision: {
      remember: 'lac induced (allolactose), trp repressed (Trp); CAP = +; acetylation = open.',
      mistakes: ['Calling CAP a repressor; calling lactose the inducer.'],
      summary: 'lac/trp operons + eukaryotic layers (chromatin → TF → RNA → protein).',
    },
    related: ['mol-transcription', 'mic-physiology', 'rdt-cloning'],
  },
  {
    id: 'mol-chromatin',
    subject: 'molecular-biology',
    name: 'Chromatin, Epigenetics & Nucleosomes',
    level: 3,
    priority: 'medium',
    ord: 5,
    short: 'DNA packaging and chemical marks that control genes.',
    basic: {
      what: 'Chromatin = DNA + histones packaged into nucleosomes (DNA wrapped around histone octamer). Epigenetics = heritable changes in gene expression WITHOUT DNA sequence change (methylation, histone marks).',
      why: 'X-inactivation, imprinting and cancer epigenetics are GATE conceptual favourites.',
      how: 'Nucleosome: 147 bp DNA + H2A/H2B/H3/H4 octamer; H1 links. Histone tail modifications: acetylation (HAT = open), methylation (context-dependent), phosphorylation. DNA methylation (5mC at CpG) usually represses.',
      where: 'Development (X-inactivation, imprinting), cancer (hypermethylation of tumour suppressors), ageing.',
    },
    college: [
      'Euchromatin (open, active) vs heterochromatin (condensed, silent; centromeres, telomeres).',
      'X-inactivation: Barr body; XIST RNA coats the X → silencing; random in females, imprinted in marsupials/placental.',
      'Genomic imprinting: parent-of-origin expression (IGF2 = paternal, H19 = maternal); Prader-Willi/Angelman from 15q11-13.',
      'Histone code: H3K4me3 (promoter active), H3K36me3 (elongation), H3K27me3 (Polycomb, repressed).',
    ],
    advanced: [
      'Chromatin remodellers: SWI/SNF (ATP-dependent nucleosome sliding); mutations → cancer.',
      '3D genome: TADs (topologically associating domains), lamins (A-type) at nuclear periphery; loupes and chromatin loops (cohesin).',
    ],
    gate: {
      highYield: [
        'Nucleosome: 147 bp + octamer; H1 linker.',
        'Acetylation = open (HAT); deacetylation = closed (HDAC).',
        'X-inactivation: XIST; Barr body.',
        'Imprinting: parent-of-origin; Prader-Willi (paternal loss) vs Angelman (maternal loss).',
        'H3K4me3 active; H3K27me3 repressed.',
      ],
      traps: [
        'DNA methylation USUALLY represses (not always — context matters), but for GATE assume repressive.',
        'Prader-Willi = PATERNAL 15q deletion; Angelman = MATERNAL — a swap trap.',
        'HDAC inhibitors (butyrate, vorinostat) are DRUGS (cancer) — epigenetic therapy.',
      ],
    },
    examples: [
      'Beckwith-Wiedemann: imprinting disorder (IGF2 gain, H19 loss).',
      'Vorinostat (Zolinza): HDAC inhibitor for CTCL.'],
    formulas: [],
    keyPoints: [
      'Nucleosome = 147 bp + H2A/2B/3/4; H1 linker.',
      'Acetylation = open; methylation = repressive (GATE default).',
      'XIST → X-inactivation; Barr body.',
      'PW = paternal 15q; A = maternal 15q.',
    ],
    revision: {
      remember: '147 bp nucleosome; acetyl open, methyl closed; XIST silences; PW paternal.',
      mistakes: ['PW/Angelman parent swap.'],
      summary: 'Chromatin structure + histone/DNA marks + X-inactivation + imprinting diseases.',
    },
    related: ['mol-transcription', 'mol-regulation'],
  },
  {
    id: 'mol-ncrna',
    subject: 'molecular-biology',
    name: 'Non-coding RNA & Gene Silencing',
    level: 3,
    priority: 'medium',
    ord: 6,
    short: 'miRNA, siRNA, lncRNA and the RNA world.',
    basic: {
      what: 'Non-coding RNAs (ncRNAs) regulate gene expression without coding protein: miRNA/siRNA (post-transcriptional silencing), lncRNA (diverse roles), rRNA/tRNA (housekeeping). CRISPR-Cas9 uses guide RNA for genome editing.',
      why: 'RNAi and CRISPR are the defining biotech tools of the era; GATE covers mechanism.',
      how: 'miRNA: ~22 nt, endogenous, partial complement → mRNA decay/translational repression (RISC/Ago2). siRNA: exogenous/synthetic, perfect complement → cleavage. lncRNA: >200 nt; XIST, HOTAIR.',
      where: 'Gene therapy (siRNA drugs), functional genomics (CRISPR screens), disease (miRNA in cancer).',
    },
    college: [
      'RISC loading: Dicer processes pre-miRNA (pre-miR) → miRNA duplex → one strand to Ago2 (RISC).',
      'CRISPR-Cas9: guide RNA (20 nt) + PAM (NGG for SpCas9) → DSB → NHEJ (knockout) or HDR (knock-in).',
      'lncRNA classes: cis/acting, XIST (X-inactivation), HOTAIR (Polycomb recruitment).',
      'piRNA: germline, transposon silencing.',
    ],
    advanced: [
      'Base editing and prime editing: precise edits without DSB (cytosine/adenine base editors; prime editor with pegRNA).',
      'CRISPRi/a: dCas9 + KRAB (repression) or VP64 (activation) — reversible, no cutting.',
    ],
    gate: {
      highYield: [
        'miRNA (endogenous, partial, repression) vs siRNA (exogenous, perfect, cleavage).',
        'CRISPR: guide RNA + PAM (NGG) + Cas9 → DSB → NHEJ/HDR.',
        'lncRNA examples (XIST, HOTAIR).',
        'Ago2 = the RISC slicer (for siRNA).',
      ],
      traps: [
        'miRNA = endogenous + imperfect pairing; siRNA = often exogenous + perfect — a pairing/origin trap.',
        'PAM is REQUIRED for Cas9 cutting (SpCas9: 5′-NGG-3′) — no PAM, no edit.',
        'CRISPRi (dCas9-KRAB) does NOT cut DNA — it represses.',
      ],
    },
    examples: [
      'Patisiran (Onpattro): first siRNA drug (ATTR amyloidosis).',
      'CRISPR therapy: Casgevy (sickle cell, 2023) — ex vivo editing of BMT.'],
    formulas: [],
    keyPoints: [
      'miRNA endogenous/partial/repress; siRNA exogenous/perfect/cleave.',
      'CRISPR: gRNA + PAM (NGG) + Cas9 → DSB → NHEJ/HDR.',
      'Ago2 = slicer; Dicer = processor.',
      'lncRNA: XIST, HOTAIR.',
    ],
    revision: {
      remember: 'miR endog/partial, siR exog/perfect; PAM NGG; Ago2 cuts; XIST silences.',
      mistakes: ['Expecting Cas9 to cut without PAM.'],
      summary: 'ncRNA classes + RNAi machinery + CRISPR editing logic + lncRNA anchors.',
    },
    related: ['mol-transcription', 'rdt-crispr', 'mol-chromatin'],
  },
  {
    id: 'mol-recombination',
    subject: 'molecular-biology',
    name: 'DNA Recombination & Repair',
    level: 3,
    priority: 'medium',
    ord: 7,
    short: 'Crossing over, homologous recombination and repair pathways.',
    basic: {
      what: 'Recombination exchanges DNA between homologous molecules — the basis of genetic diversity (meiosis) and DNA repair (homologous recombination, HR).',
      why: 'HR is a cancer-repair pathway (BRCA1/2) and a gene-editing tool (HDR); GATE covers mechanism and disease.',
      how: 'HR: DSB → resection (5′→3′) → 3′ ssDNA overhang → strand invasion (Rad51) → D-loop → synthesis → resolution (crossover or non-crossover). Meiotic crossing over uses the same machinery (Spo11 makes the DSB).',
      where: 'Meiosis (diversity), DNA repair, CRISPR HDR, cancer (BRCA).',
    },
    college: [
      'Repair pathways: base excision (glycosylase), nucleotide excision (UV), mismatch (MutS/L), homologous recombination (DSB, error-free), NHEJ (DSB, error-prone, Ku70/80 + DNA-PK).',
      'BRCA1/2: HR cofactors; loss → HR deficiency → NHEJ reliance → mutagenesis (BRCA cancer risk).',
      'PARP inhibitors: trap PARP on DNA → HR-deficient cells die (synthetic lethality; olaparib).',
      'Transposition: IS elements, transposases (bacteria); retrotransposons (LINEs/SINEs, euk).',
    ],
    advanced: [
      'NHEJ vs HR fidelity: HR is homology-guided (accurate); NHEJ is blunt ligation (indels → frameshifts).',
      'Fanconi anaemia: FA pathway (DSB crosslink repair); cancer predisposition.',
    ],
    gate: {
      highYield: [
        'HR steps: DSB → resection → Rad51 → D-loop → resolution.',
        'NHEJ = error-prone (Ku70/80, DNA-PK); HR = error-free (Rad51, BRCA).',
        'BRCA1/2 = HR; PARP inhibitor = synthetic lethality.',
        'NER = UV; MMR = mismatch; BER = base damage.',
      ],
      traps: [
        'NHEJ is the DEFAULT (all cell cycle); HR is S/G2 only (needs a sister chromatid) — a timing trap.',
        'PARP inhibitors kill HR-deficient cells (not HR-proficient) — the synthetic lethality direction.',
        'Rad51 = the recombinase (strands invasion); BRCA2 loads it.',
      ],
    },
    examples: [
      'Olaparib (Lynparza): PARP inhibitor for BRCA-mutant ovarian/breast cancer.',
      'Spo11 (meiotic DSB) mutants → no crossing over → sterility.'],
    formulas: [],
    keyPoints: [
      'HR: Rad51 + BRCA2; accurate; S/G2.',
      'NHEJ: Ku + DNA-PK; error-prone; all phases.',
      'BRCA loss → PARPi kills (synthetic lethality).',
      'Repair map: UV-NER, mismatch-MMR, base-BER, DSB-HR/NHEJ.',
    ],
    revision: {
      remember: 'Rad51 HR, Ku NHEJ; BRCA+PARPi = lethal; NER=UV, MMR=mismatch.',
      mistakes: ['Using PARPi on HR-proficient cells.'],
      summary: 'Recombination mechanics + repair pathway map + BRCA/PARP synthetic lethality.',
    },
    related: ['mol-replication', 'gen-mutation', 'rdt-crispr'],
  },
  {
    id: 'mol-gate',
    subject: 'molecular-biology',
    name: 'GATE Focus: Molecular Biology Patterns',
    level: 4,
    priority: 'high',
    ord: 8,
    short: 'The central dogma, enzyme banks and mechanism traps.',
    basic: {
      what: 'GATE molecular biology = central dogma directionality + enzyme/complex banks + regulatory logic + ncRNA/CRISPR mechanisms.',
      why: 'The most heavily weighted subject; predictable patterns with precision traps.',
      how: 'Drill: 5′→3′ rules, polymerase families, operon logic, splicing rules, CRISPR PAM, repair pathway map.',
      where: 'GATE BT paper.',
    },
    college: [
      'Directionality: DNA/RNA pol 5′→3′; template read 3′→5′; leading vs lagging.',
      'Enzyme bank: DnaB (helicase), primase, pol III (proc main), ligase, Topo II (supercoiling), Rad51 (HR), Ku (NHEJ).',
      'Operon: lac (inducible, allolactose, CAP+), trp (repressible, Trp corepressor, attenuation).',
      'CRISPR: gRNA + PAM (NGG) + Cas9; NHEJ vs HDR outcomes.',
    ],
    advanced: [
      'Multi-step: "BRCA-mutant tumour, which drug?" → PARP inhibitor.',
      'Enzyme-substrate direction traps (exonuclease 3′→5′ proofreading vs 5′→3′ repair).',
    ],
    gate: {
      highYield: [
        'All directionality + enzyme bank + operon logic + CRISPR + repair map.',
      ],
      traps: [
        'Peptidyl transferase = rRNA (not protein).',
        'CAP = activator (not repressor); inducer = allolactose.',
        'HR needs S/G2 (sister chromatid); NHEJ anytime.',
      ],
    },
    examples: [
      '"Which enzyme has 3′→5′ exonuclease?" → DNA polymerase (proofreading).',
      '"BRCA1-mutant ovarian cancer, best targeted therapy?" → olaparib (PARPi).'],
    formulas: [],
    keyPoints: [
      '5′→3′ synthesis, 3′→5′ template read.',
      'Enzyme + operon + CRISPR + repair banks.',
      'Directionality and mechanism precision = the traps.',
    ],
    revision: {
      remember: '5′→3′; enzyme bank; lac/trp; PAM NGG; BRCA+PARPi.',
      mistakes: ['Directionality swaps.'],
      summary: 'Mol bio GATE = directionality + banks + mechanism precision.',
    },
    related: ['mol-replication', 'mol-transcription', 'mol-regulation'],
  },
];

export const ALL = [...TOPICS_IMM, ...TOPICS_MIB, ...TOPICS_MIC, ...TOPICS_MOL];
