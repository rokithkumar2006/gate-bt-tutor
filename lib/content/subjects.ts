import type { Subject } from '../types';

// The 18 GATE BT syllabus subjects. `weight` is the approximate share of GATE
// BT marks (GA 15 + Engineering Math 13 + ~72 core) used by the study planner.
export const SUBJECTS: Subject[] = [
  {
    slug: 'animal-biotechnology',
    name: 'Animal Biotechnology',
    short: 'Animal Bio',
    description:
      'Animal cell culture, stem cells, transgenic animals, monoclonal antibodies and animal models used in biotech research and medicine.',
    icon: 'PawPrint',
    weight: 3,
  },
  {
    slug: 'biochemistry',
    name: 'Biochemistry',
    short: 'Biochem',
    description:
      'Amino acids, proteins, enzymes, carbohydrates, lipids, vitamins and central metabolism — the chemical engine of every living cell.',
    icon: 'FlaskConical',
    weight: 5,
  },
  {
    slug: 'bioinformatics',
    name: 'Bioinformatics',
    short: 'Bioinformatics',
    description:
      'Sequence alignment, databases, phylogenetics, genome annotation and high-throughput data analysis for biology.',
    icon: 'Cpu',
    weight: 3,
  },
  {
    slug: 'bioinstrumentation',
    name: 'Bioinstrumentation',
    short: 'Instruments',
    description:
      'Sensors, transducers, signal conditioning, chromatography, spectroscopy and assays used to measure biological systems.',
    icon: 'Gauge',
    weight: 3,
  },
  {
    slug: 'bioreaction-engineering',
    name: 'Bioreaction Engineering',
    short: 'Bioreaction',
    description:
      'Microbial kinetics, batch and continuous bioreactors, oxygen transfer, mixing and scale-up — the engineering of fermentation.',
    icon: 'Factory',
    weight: 7,
  },
  {
    slug: 'cell-biology',
    name: 'Cell Biology',
    short: 'Cell Bio',
    description:
      'Cell structure, organelles, membranes, cell cycle, signal transduction and cell death — the fundamental unit of life in detail.',
    icon: 'CircleDot',
    weight: 3,
  },
  {
    slug: 'environmental-biotechnology',
    name: 'Environmental Biotechnology',
    short: 'Env. Bio',
    description:
      'Bioremediation, wastewater treatment, biopesticides, biodegradation and green biotech for a sustainable environment.',
    icon: 'Leaf',
    weight: 3,
  },
  {
    slug: 'genetics-evolution',
    name: 'Genetics & Evolutionary Biology',
    short: 'Genetics',
    description:
      'Mendelian genetics, linkage, mutation, population genetics and evolutionary theory — the logic of inheritance and change.',
    icon: 'Dna',
    weight: 6,
  },
  {
    slug: 'immunology',
    name: 'Immunology',
    short: 'Immunology',
    description:
      'Innate and adaptive immunity, antibodies, MHC, complement, vaccines and autoimmunity — how the body defends itself.',
    icon: 'ShieldCheck',
    weight: 3,
  },
  {
    slug: 'microbial-biotechnology',
    name: 'Microbial Biotechnology',
    short: 'Microbial Bio',
    description:
      'Industrial fermentation, antibiotics, metabolites, strain improvement and microbial products at scale.',
    icon: 'Bug',
    weight: 3,
  },
  {
    slug: 'microbiology',
    name: 'Microbiology',
    short: 'Microbiology',
    description:
      'Bacteria, viruses, fungi and their physiology, pathogenicity, ecology, sterilization and lab techniques.',
    icon: 'Microscope',
    weight: 5,
  },
  {
    slug: 'molecular-biology',
    name: 'Molecular Biology',
    short: 'Mol Bio',
    description:
      'DNA replication, transcription, translation, gene regulation and the molecular machinery of the cell.',
    icon: 'Atom',
    weight: 7,
  },
  {
    slug: 'plant-biotechnology',
    name: 'Plant Biotechnology',
    short: 'Plant Bio',
    description:
      'Tissue culture, plant transformation, transgenic crops, genome editing and marker-assisted selection.',
    icon: 'Plant',
    weight: 3,
  },
  {
    slug: 'process-biotechnology',
    name: 'Process Biotechnology',
    short: 'Process Bio',
    description:
      'Downstream processing, purification, fermentation economics, scale-up and quality control of biotech products.',
    icon: 'Workflow',
    weight: 6,
  },
  {
    slug: 'recombinant-dna',
    name: 'Recombinant DNA Technology',
    short: 'rDNA Tech',
    description:
      'Restriction enzymes, vectors, PCR, cloning, sequencing, library construction and CRISPR-based gene editing.',
    icon: 'Scissors',
    weight: 6,
  },
  {
    slug: 'transport-processes',
    name: 'Transport Processes & Process Control',
    short: 'Transport',
    description:
      'Momentum, heat and mass transfer plus process control — the engineering backbone of bioprocess units.',
    icon: 'Waves',
    weight: 4,
  },
  {
    slug: 'engineering-mathematics',
    name: 'Engineering Mathematics',
    short: 'Eng. Math',
    description:
      'Linear algebra, calculus, differential equations, probability, statistics and numerical methods for biotech engineering.',
    icon: 'Sigma',
    weight: 13,
  },
  {
    slug: 'general-aptitude',
    name: 'General Aptitude',
    short: 'Aptitude',
    description:
      'Verbal ability, quantitative aptitude, logical and analytical reasoning — 15 marks you cannot afford to leave on the table.',
    icon: 'Puzzle',
    weight: 15,
  },
];

export const subjectBySlug = new Map(SUBJECTS.map((s) => [s.slug, s]));

export function subjectName(slug: string): string {
  return subjectBySlug.get(slug)?.name ?? slug;
}
