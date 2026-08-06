export interface Project {
  id: string
  year: string
  stack: string
  title: string
  subtitle: string
  hook: string
  description: string
  award: string
  tag: string
  /** Live URL — leave blank to hide the "View Live" link on that card. */
  demoUrl?: string
}

export const projects: Project[] = [
  {
    id: 'argus',
    year: '2026',
    stack: 'React · TypeScript · MobileNetV2',
    title: 'ARGUS',
    subtitle: 'Automated Recognition and Geo-tracking Unified System',
    hook: "Every week, someone's face circulates on WhatsApp. A name. A last known location. A family waiting.",
    description: 'Real-time facial recognition that identifies missing persons through live camera feeds — and projects how a face changes over 2, 5, and 10 years.',
    award: '1st Place · Intellibus National AI Hackathon · US$5,000',
    tag: 'Hackathon Win',
  },
  {
    id: 'neural-hands',
    year: '2025',
    stack: 'Python · TensorFlow · React',
    title: 'Neural Hands',
    subtitle: 'Real-Time ASL Coach',
    hook: 'Language is a right, not a privilege.',
    description: 'ASL interpreter with continuous frame detection — online and offline. 70% sentence accuracy at prototype stage.',
    award: 'Top 12 · Intellibus National AI Hackathon',
    tag: 'Hackathon',
  },
  {
    id: 'finny',
    year: '2024',
    stack: 'Python · Node · Express · Firebase',
    title: 'Finny',
    subtitle: 'Financial Literacy Assistant',
    hook: 'Most people are not bad with money. They were just never taught how to use it.',
    description: 'A personal finance assistant that makes budgeting feel like progress, not punishment.',
    award: '1st Place · JAIA Christmas Hackathon',
    tag: 'Hackathon Win',
  },
  {
    id: 'dopameen',
    year: '2024',
    stack: 'Python · TensorFlow · React',
    title: 'Dopameen',
    subtitle: 'Gamified Productivity',
    hook: 'Discipline is finite. Design for human nature instead.',
    description: 'Turns the work you keep avoiding into something your brain actually wants to do.',
    award: '2nd Place · Jamaica Productivity Innovation Awards',
    tag: 'Award',
  },
  {
    id: 'yaad',
    year: '2025',
    stack: 'Python · TensorFlow · Node · Vue',
    title: 'Yaad',
    subtitle: 'Rental Price Intelligence',
    hook: 'Finding a home should not feel like a negotiation you were never prepared for.',
    description: 'Connects home seekers, renters, landlords, and investors with real price intelligence.',
    award: 'Final Year Capstone · University of the West Indies',
    tag: 'Capstone',
  },
  {
    id: 'onepot',
    year: '2025',
    stack: 'HTML · CSS · JavaScript',
    title: 'OnePot',
    subtitle: 'Affordable Meal Prep',
    hook: 'Good food should not be a luxury.',
    description: 'A social enterprise making nutritious, affordable meal prep accessible to everyday Jamaican households.',
    award: 'Finalist · Vincent Hosang Venture Competition · MSBM, UWI',
    tag: 'Venture',
  },
  {
    id: 'hopefield',
    year: '2025',
    stack: 'React · Tailwind · Node · MongoDB',
    title: 'Hopefield',
    subtitle: 'School CMS — Real Client',
    hook: 'A leading preparatory institution. A digital home built to match.',
    description: 'Full CMS giving administrators complete control over content, scheduling, and communications.',
    award: 'Real Client · Shipped Product',
    tag: 'Client',
  },
  {
    id: 'thc',
    year: '2025',
    stack: 'Python · Flask · Twilio · Redis',
    title: 'Taino Heritage Camp',
    subtitle: 'Booking Platform — Real Client',
    hook: 'Adventure is easier to say yes to when the booking does not get in the way.',
    description: 'Trip browsing, booking, and automated email notification for a live camp operator.',
    award: 'Real Client · Shipped Product',
    tag: 'Client',
  },
  {
    id: 'mohans',
    year: '2025',
    stack: 'Full Stack · mohansdutyfree.com',
    title: "Mohan's Duty Free",
    subtitle: 'Product Catalog — Real Client',
    hook: 'Not a demo. Not a side project. A business running on code he wrote.',
    description: 'Product catalog, wishlist functionality, and full admin management. Built and shipped.',
    award: 'Real Client · Live Product',
    tag: 'Client',
    demoUrl: 'https://mohansdutyfree.com',
  },
]

export const roles = [
  { year: '2026', title: 'Junior Java Developer', org: 'DotClass Technology Solutions', note: 'Backend services built and shipped to production, not just prototyped.' },
  { year: '2026–Now', title: 'Technology & AI Educator', org: 'Liberty Learning Centre', note: 'AI Explorers Academy — four-week programme for children aged 10–12.' },
  { year: '2025–Now', title: 'Founder & Content Strategist', org: 'CTRL Learn', note: 'AI, cybersecurity, and tech in plain language.' },
  { year: '2025', title: 'Investment Client Services Intern', org: 'Sagicor Group Jamaica Limited', note: "Client operations inside one of the Caribbean's largest financial groups." },
  { year: '2025', title: 'Web Developer Intern', org: 'Zion Care International', note: 'Web development supporting an international care and outreach organization.' },
  { year: '2024–2025', title: 'Research Assistant', org: 'University of the West Indies, Mona', note: 'Supported active computing research alongside faculty.' },
  { year: '2023–2025', title: 'Adjunct Lab Assistant', org: 'University of the West Indies, Mona', note: 'Supported 200+ students across computing courses.' },
  { year: '2023–2024', title: 'Data Science Trainee', org: 'StarApple AI', note: 'Applied training in data pipelines and machine learning workflows.' },
  { year: '2023', title: 'Information Technology Intern', org: 'Cool Corp', note: 'First hands-on exposure to enterprise IT operations.' },
]

export const awards = [
  { year: '2026', title: '1st Place — Intellibus National AI Hackathon', body: 'Intellibus · US$5,000', project: 'ARGUS', note: 'Top team out of the national field, judged on real-world deployability.' },
  { year: '2025', title: 'Top 12 — Intellibus National AI Hackathon', body: 'Intellibus', project: 'Neural Hands', note: 'One of twelve teams to advance from the national field.' },
  { year: '2025', title: 'First Class Honours · B.Sc. Computer Science & Economics', body: 'University of the West Indies, Mona', note: 'Graduated in the top academic tier of the cohort.' },
  { year: '2025', title: 'Computing Honours Society Inductee', body: 'UWI Mona', note: "Recognized among the department's top-performing students." },
  { year: '2025', title: 'George Alleyne Honour Society', body: 'UWI Mona', note: "UWI's distinction for academic and leadership excellence." },
  { year: '2025', title: 'Venture Finalist — Vincent Hosang Business Model Competition', body: 'MSBM, UWI', project: 'OnePot', note: "One of the final ventures pitched to the business school's judging panel." },
  { year: '2024', title: '1st Place — JAIA Christmas Hackathon', body: 'Jamaica AI Association', project: 'Finny', note: "Won against every other team in Jamaica's AI community hackathon." },
  { year: '2024', title: '2nd Place — Productivity Innovation Awards', body: 'Jamaica Productivity Centre', project: 'Dopameen', note: 'Runner-up in a national competition for productivity innovation.' },
  { year: '2024', title: '1st Place — KRWTronics Machine Learning Challenge', body: 'KRWTronics', note: 'Won the national machine learning challenge outright.' },
  { year: '2022', title: 'Inspire Award — First Tech Challenge Jamaica', body: 'First Tech Challenge Robotics', note: "Recognized for embodying the spirit of the competition, on Jamaica's robotics stage." },
]

export const skills = {
  stats: [
    { value: '15+', label: 'Projects Delivered' },
    { value: '20+', label: 'Datasets Analyzed' },
    { value: '10+', label: 'Models Deployed' },
    { value: '6', label: 'Domains Worked In' },
    { value: '200+', label: 'Students Supported' },
    { value: '2,000+', label: 'Competitors Defeated' },
  ],
  radar: [
    { axis: 'AI & ML', value: 0.82 },
    { axis: 'Full Stack', value: 0.78 },
    { axis: 'Data Analysis', value: 0.88 },
    { axis: 'Education', value: 0.85 },
    { axis: 'Ventures', value: 0.75 },
    { axis: 'Community', value: 0.80 },
  ],
  tools: [
    { name: 'Python', count: 6 },
    { name: 'React', count: 4 },
    { name: 'Node', count: 4 },
    { name: 'TensorFlow', count: 3 },
    { name: 'TypeScript', count: 2 },
    { name: 'Flask', count: 2 },
    { name: 'MongoDB', count: 2 },
    { name: 'Firebase', count: 1 },
    { name: 'Vue', count: 1 },
    { name: 'Redis', count: 1 },
    { name: 'Twilio', count: 1 },
    { name: 'MobileNetV2', count: 1 },
  ],
}

export const contact = {
  email: 'kevlanivedang28@gmail.com',
  github: 'github.com/VedangKevlani',
  linkedin: 'linkedin.com/in/vedang-kevlani',
  ctrllearn: 'instagram.com/ctrl_.learn',
}

// Each scene carries its own accent — tuned to that clip's grading rather
// than one gold applied uniformly, so the chrome recolors as the mood shifts.
export const NAV = [
  { id: 'intro',      label: 'Title',    scene: 'OPEN',        accent: '#C8B89A' },
  { id: 'movies',     label: 'Movies',   scene: 'CALM',        accent: '#C8B89A' },
  { id: 'casting',    label: 'Casting',  scene: 'CHAOS',       accent: '#C1652F' },
  { id: 'awards',     label: 'Awards',   scene: 'CREATIVITY',  accent: '#D4A853' },
  { id: 'stalking',   label: 'Stalking', scene: 'INSPIRATION', accent: '#4AA0D8' },
  { id: 'contact',    label: 'Contact',  scene: 'EXIT',        accent: '#E2D5C0' },
]
