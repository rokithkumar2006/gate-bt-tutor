// ---------------------------------------------------------------------------
// OFFICIAL GATE BIOTECHNOLOGY (BT) QUESTION PAPER ARCHIVE
//
// Every link below points to a FREE, PUBLICLY ACCESSIBLE PDF hosted on an
// official GATE organising-institute website (gate2026.iitg.ac.in,
// gate2025.iitr.ac.in, gate.iitk.ac.in). We only link to the papers — no
// content is copied or re-hosted by this app.
//
// GATE question papers stay online on the *current* organising institute's
// site, so a paper's canonical URL moves every year. Each entry therefore
// carries a primary link plus (where one exists) a mirror on another official
// GATE site, so a broken primary link still leaves the student a way in.
// ---------------------------------------------------------------------------

export interface PaperLink {
  label: string;
  url: string;
}

export interface QuestionPaper {
  year: number;
  /** Organising institute for that GATE edition. */
  institute: string;
  /** Exam date + session as printed in the official schedule. */
  examDate: string;
  /** Official question paper PDF (free, no login). */
  paperUrl: string;
  /** Official answer key PDF, when published as a separate file. */
  answerKeyUrl?: string;
  /** Alternate official host for the same paper. */
  mirrorUrl?: string;
  /** Marking / pattern notes that matter when you attempt this paper. */
  pattern: string;
  /** Short "what to expect" note for the student. */
  note: string;
  /** Question types present in the paper. */
  types: Array<'MCQ' | 'MSQ' | 'NAT'>;
  /** Whether the link was verified as reachable when this list was compiled. */
  linkChecked: boolean;
}

const IITG = 'https://gate2026.iitg.ac.in/doc/download';
const IITR = 'https://gate2025.iitr.ac.in/doc/download';
const IITK = 'https://gate.iitk.ac.in/GATE2023/doc/papers';

export const PAPER_SOURCES: PaperLink[] = [
  { label: 'GATE 2026 — IIT Guwahati (downloads)', url: 'https://gate2026.iitg.ac.in/download.html' },
  { label: 'GATE 2026 — master papers + answer keys', url: 'https://gate2026.iitg.ac.in/QPs-answer-keys.html' },
  { label: 'GATE 2025 — IIT Roorkee (downloads)', url: 'https://gate2025.iitr.ac.in/download.html' },
  { label: 'Bulk download — all BT papers 2007–2025 (BT.zip, official Drive)', url: 'https://drive.google.com/drive/folders/1sV6FgtOUDl_PGjc36Zdc0eJwK1zZ_2OF' },
];

export const PAPERS: QuestionPaper[] = [
  {
    year: 2026,
    institute: 'IIT Guwahati',
    examDate: '7 February 2026 · Afternoon session',
    paperUrl: `${IITG}/2026/QPs/BT.pdf`,
    answerKeyUrl: `${IITG}/2026/Keys/BT_Keys.pdf`,
    pattern: 'GA 15 + Engineering Mathematics 13 + Core BT 72 = 100 marks · 65 questions · 3 hours',
    note: 'Latest paper. Master question paper released with the final answer key — the order of questions here may differ from the order you saw on the exam console.',
    types: ['MCQ', 'MSQ', 'NAT'],
    linkChecked: true,
  },
  {
    year: 2025,
    institute: 'IIT Roorkee',
    examDate: '16 February 2025 · Forenoon session',
    paperUrl: `${IITG}/2025/BT2025.pdf`,
    answerKeyUrl: `${IITG}/2025_Key/BT_Keys.pdf`,
    mirrorUrl: `${IITR}/2025/2025_QP/BT.pdf`,
    pattern: 'GA 15 + Engineering Mathematics 13 + Core BT 72 = 100 marks · 65 questions · 3 hours',
    note: 'Heavy on microbiology and classical biochemistry (Koch’s postulates, epimers, coenzymes) with several matching-type questions.',
    types: ['MCQ', 'MSQ', 'NAT'],
    linkChecked: true,
  },
  {
    year: 2024,
    institute: 'IISc Bengaluru',
    examDate: '10 February 2024 · Forenoon session',
    paperUrl: `${IITG}/2024/BT24S5.pdf`,
    answerKeyUrl: `${IITG}/2024/BTFinalAnswerKey.pdf`,
    mirrorUrl: `${IITR}/2024/BT24S5.pdf`,
    pattern: 'GA 15 + Engineering Mathematics 13 + Core BT 72 = 100 marks · 65 questions · 3 hours',
    note: 'Strong bioprocess/transport flavour (transfer functions, Reynolds number, chromatography) alongside core molecular biology.',
    types: ['MCQ', 'MSQ', 'NAT'],
    linkChecked: true,
  },
  {
    year: 2023,
    institute: 'IIT Kanpur',
    examDate: '11 February 2023 · Afternoon session',
    paperUrl: `${IITG}/2023/bt_2023.pdf`,
    answerKeyUrl: `${IITG}/Answer_keys2023/BT_ANS_GATE2023.pdf`,
    mirrorUrl: `${IITR}/2023/bt_2023.pdf`,
    pattern: 'GA 15 + Engineering Mathematics 13 + Core BT 72 = 100 marks · 65 questions · 3 hours',
    note: 'Notable for Assertion–Reason items and immunology/immunotherapy questions (checkpoint inhibitors, cross-presentation).',
    types: ['MCQ', 'MSQ', 'NAT'],
    linkChecked: true,
  },
  {
    year: 2022,
    institute: 'IIT Kharagpur',
    examDate: '12 February 2022 · Forenoon session',
    paperUrl: `${IITG}/2022/bt_2022.pdf`,
    answerKeyUrl: `${IITG}/Answer_keys2022/bt_2022.pdf`,
    mirrorUrl: `${IITR}/2022/bt_2022.pdf`,
    pattern: 'GA 15 + Engineering Mathematics 13 + Core BT 72 = 100 marks · 65 questions · 3 hours',
    note: 'First few years of the revised syllabus — good calibration for the current MSQ-heavy pattern.',
    types: ['MCQ', 'MSQ', 'NAT'],
    linkChecked: true,
  },
  {
    year: 2021,
    institute: 'IIT Bombay',
    examDate: '13 February 2021 · Forenoon session',
    paperUrl: `${IITG}/2021/bt_2021.pdf`,
    answerKeyUrl: `${IITG}/Answer_keys2021/bt_2021.pdf`,
    mirrorUrl: `${IITR}/2021/bt_2021.pdf`,
    pattern: 'GA 15 + Engineering Mathematics 13 + Core BT 72 = 100 marks · 65 questions · 3 hours',
    note: 'The year MSQs (multiple-select, no negative marking, no partial credit) were introduced across GATE papers.',
    types: ['MCQ', 'MSQ', 'NAT'],
    linkChecked: true,
  },
  {
    year: 2020,
    institute: 'IIT Delhi',
    examDate: '2 February 2020 · Forenoon session',
    paperUrl: `${IITG}/2020/bt_2020.pdf`,
    mirrorUrl: `${IITR}/2020/bt_2020.pdf`,
    pattern: 'GA 15 + Core BT (incl. Engineering Mathematics) 85 = 100 marks · 65 questions · 3 hours',
    note: 'Answer key is printed inside the same official PDF. Signal transduction, cloning vectors and cell-culture questions dominate.',
    types: ['MCQ', 'NAT'],
    linkChecked: true,
  },
  {
    year: 2019,
    institute: 'IIT Madras',
    examDate: '3 February 2019 · Afternoon session',
    paperUrl: `${IITG}/2019/bt_2019.pdf`,
    mirrorUrl: `${IITR}/2019/bt_2019.pdf`,
    pattern: 'GA 15 + Core BT (incl. Engineering Mathematics) 85 = 100 marks · 65 questions · 3 hours',
    note: 'Classic MCQ + NAT paper: Bt cry gene, tetracycline mode of action, Monod kinetics, heat-transfer units.',
    types: ['MCQ', 'NAT'],
    linkChecked: true,
  },
  {
    year: 2018,
    institute: 'IIT Guwahati',
    examDate: '4 February 2018 · Afternoon session',
    paperUrl: `${IITK}/2018/bt_2018.pdf`,
    pattern: 'GA 15 + Core BT (incl. Engineering Mathematics) 85 = 100 marks · 65 questions · 3 hours',
    note: 'Includes the well-known sterilisation kinetics and "number of proteins in a rod-shaped cell" numericals.',
    types: ['MCQ', 'NAT'],
    linkChecked: true,
  },
  {
    year: 2017,
    institute: 'IIT Roorkee',
    examDate: '5 February 2017 · Forenoon session',
    paperUrl: `${IITK}/2017/bt_2017.pdf`,
    pattern: 'GA 15 + Core BT (incl. Engineering Mathematics) 85 = 100 marks · 65 questions · 3 hours',
    note: 'PCR amplification, restriction mapping and bioreactor kinetics numericals recur from this paper.',
    types: ['MCQ', 'NAT'],
    linkChecked: false,
  },
  {
    year: 2016,
    institute: 'IISc Bengaluru',
    examDate: '30 January 2016 · Afternoon session',
    paperUrl: `${IITK}/2016/bt_2016.pdf`,
    pattern: 'GA 15 + Core BT (incl. Engineering Mathematics) 85 = 100 marks · 65 questions · 3 hours',
    note: 'Population genetics (Hardy–Weinberg) and downstream processing appear repeatedly.',
    types: ['MCQ', 'NAT'],
    linkChecked: false,
  },
  {
    year: 2015,
    institute: 'IIT Kanpur',
    examDate: '31 January 2015 · Forenoon session',
    paperUrl: `${IITK}/2015/bt_2015.pdf`,
    pattern: 'GA 15 + Core BT (incl. Engineering Mathematics) 85 = 100 marks · 65 questions · 3 hours',
    note: 'Good practice set for enzyme kinetics and immunology fundamentals.',
    types: ['MCQ', 'NAT'],
    linkChecked: false,
  },
  {
    year: 2014,
    institute: 'IIT Kharagpur',
    examDate: '2 February 2014 · Afternoon session',
    paperUrl: `${IITK}/2014/bt_2014.pdf`,
    pattern: 'GA 15 + Core BT (incl. Engineering Mathematics) 85 = 100 marks · 65 questions · 3 hours',
    note: 'Older syllabus, but the bioprocess and molecular biology sections still map onto the current one.',
    types: ['MCQ', 'NAT'],
    linkChecked: false,
  },
  {
    year: 2013,
    institute: 'IIT Bombay',
    examDate: '20 January 2013 · Afternoon session',
    paperUrl: `${IITK}/2013/bt_2013.pdf`,
    pattern: 'GA 15 + Core BT (incl. Engineering Mathematics) 85 = 100 marks · 65 questions · 3 hours',
    note: 'Use for concept revision; a few topics have since been dropped from the syllabus.',
    types: ['MCQ', 'NAT'],
    linkChecked: false,
  },
  {
    year: 2012,
    institute: 'IIT Delhi',
    examDate: '12 February 2012 · Forenoon session',
    paperUrl: `${IITK}/2012/bt_2012.pdf`,
    pattern: 'GA 15 + Core BT 85 = 100 marks · 65 questions · 3 hours (linked/common-data question sets)',
    note: 'Contains linked-answer and common-data question blocks that GATE no longer uses — attempt them as concept drills.',
    types: ['MCQ'],
    linkChecked: true,
  },
  {
    year: 2011,
    institute: 'IIT Madras',
    examDate: '13 February 2011 · Forenoon session',
    paperUrl: `${IITK}/2011/bt_2011.pdf`,
    pattern: 'GA 15 + Core BT 85 = 100 marks · 65 questions · 3 hours (linked/common-data question sets)',
    note: 'Legacy pattern. Best used topic-wise rather than as a timed full mock.',
    types: ['MCQ'],
    linkChecked: false,
  },
  {
    year: 2010,
    institute: 'IIT Guwahati',
    examDate: '14 February 2010 · Forenoon session',
    paperUrl: `${IITK}/2010/bt_2010.pdf`,
    pattern: 'GA 15 + Core BT 85 = 100 marks · 65 questions · 3 hours (linked/common-data question sets)',
    note: 'Oldest paper in the year-wise official listing; papers from 2007–2009 are in the bulk BT.zip archive.',
    types: ['MCQ'],
    linkChecked: false,
  },
];

export const PAPER_YEARS = PAPERS.map((p) => p.year);

export const PATTERN_ERAS = [
  {
    id: 'current',
    label: '2021 → present',
    title: 'Current pattern (MCQ + MSQ + NAT)',
    points: [
      'General Aptitude 15 marks + Engineering Mathematics 13 marks + Core Biotechnology 72 marks.',
      'MCQ: exactly one correct option. Negative marking — 1/3 mark for 1-mark MCQs, 2/3 for 2-mark MCQs.',
      'MSQ: one or more correct options. No negative marking and no partial credit — all correct options must be chosen.',
      'NAT: type the number. Answer must fall inside the published range. No negative marking.',
    ],
  },
  {
    id: 'legacy2014',
    label: '2014 → 2020',
    title: 'MCQ + NAT era',
    points: [
      'General Aptitude 15 marks + Biotechnology (Engineering Mathematics folded in) 85 marks.',
      'Only MCQ and NAT — MSQs did not exist yet, so no multi-select practice from these papers.',
      'Same negative marking on MCQs; NATs carry none.',
    ],
  },
  {
    id: 'legacy2010',
    label: '2010 → 2013',
    title: 'Legacy pattern (linked answer / common data)',
    points: [
      'Included common-data question pairs and linked-answer questions that GATE has since removed.',
      'Still useful for concept coverage — treat them as topic drills rather than timed mocks.',
    ],
  },
];

export const ATTEMPT_STRATEGY = [
  {
    title: 'Attempt it like the real exam',
    body: 'Three hours, no notes, virtual calculator only. Do the 15-mark General Aptitude block in under 20 minutes so the 85 core marks get the time they deserve.',
  },
  {
    title: 'Mark, do not guess',
    body: 'On 2-mark MCQs a wrong answer costs 2/3. Skip anything where you cannot eliminate at least two options; MSQs and NATs are penalty-free, so never leave those blank.',
  },
  {
    title: 'Score against the official key',
    body: 'Use the answer key PDF from the same year — coaching keys sometimes differ from the final official key after the challenge window.',
  },
  {
    title: 'Convert mistakes into revision',
    body: 'Log every wrong question by subject in Weak Areas, then re-run that topic in Question Practice before touching the next year’s paper.',
  },
];
