export const site = {
  name: 'Reliant Construction',
  legalName: 'Reliant Construction LLC',
  tagline: 'Plan · Build · Stand Behind It',
  description:
    'Full-service general contractor for residential and commercial projects across New Jersey, New York, and Pennsylvania. In-house crews, transparent pricing, and a 10-year workmanship warranty. Sister company of Reliant Solar.',
  url: 'https://reliant-construction.vercel.app',
  phone: '1-877-201-1955',
  phoneDisplay: '1·877·201·1955',
  phoneHref: 'tel:+18772011955',
  email: 'contact@reliant-construction.com',
  address: {
    street: '4301 New Brunswick Ave',
    city: 'South Plainfield',
    region: 'NJ',
    zip: '07080',
  },
  founded: 2023,
  areaServed: ['New Jersey', 'New York', 'Pennsylvania'],
  solarUrl: 'https://relaint-solar-com.vercel.app/',
};

// Home is intentionally omitted — the logo links home; keeps the navbar uncrowded
export const nav = [
  { label: 'About', href: '/about' },
  { label: 'Residential', href: '/residential' },
  { label: 'Commercial', href: '/commercial' },
  { label: 'Contact', href: '/contact' },
];

export const stats = [
  { value: 3, suffix: '', label: 'States covered', detail: 'NJ · NY · PA' },
  { value: 100, suffix: '%', label: 'In-house crews', detail: 'No sub-of-a-sub chains' },
  { value: 10, suffix: '-yr', label: 'Workmanship warranty', detail: 'In writing, transferable' },
  { value: 24, suffix: 'hr', label: 'Estimate turnaround', detail: 'From walkthrough to number' },
];

export const process = [
  {
    step: '01',
    title: 'Walkthrough & scope',
    body: 'We walk the site with you, measure everything, and put the full scope in writing. No vague line items, no allowances that balloon later.',
  },
  {
    step: '02',
    title: 'Fixed proposal',
    body: 'You get a fixed-price proposal within 24 hours of the walkthrough — materials, labor, timeline, and payment schedule, all on one page.',
  },
  {
    step: '03',
    title: 'Permits & prep',
    body: 'We pull permits, order materials, and lock the crew schedule before demo day. You get a start date we actually hit.',
  },
  {
    step: '04',
    title: 'Build',
    body: 'Our own crews, a dedicated project lead, and a daily photo log so you always know what happened on site — even when you are not there.',
  },
  {
    step: '05',
    title: 'Punch list & warranty',
    body: 'We do the final walkthrough together, clear every punch item, and hand you a 10-year workmanship warranty in writing.',
  },
];

export const faqs = [
  {
    q: 'Are you licensed and insured?',
    a: 'Yes. Reliant Construction is fully licensed and carries general liability and workers compensation coverage on every job. Certificates of insurance are provided with every proposal.',
  },
  {
    q: 'Do you use subcontractors?',
    a: 'Core trades — framing, roofing, siding, finish carpentry — are our own W-2 crews. Where a specialty license is required (electrical, plumbing, HVAC), we use the same vetted partners on every project, managed by our project lead, never a sub-of-a-sub.',
  },
  {
    q: 'How do estimates work?',
    a: 'Estimates are free. We do a walkthrough, then deliver a fixed-price written proposal within 24 hours — scope, materials, timeline, and payment schedule included. No obligation.',
  },
  {
    q: 'What does the 10-year workmanship warranty cover?',
    a: 'Any defect in our labor — framing, roofing, flashing, finish work — for ten years from completion, in writing and transferable if you sell the property. Manufacturer warranties on materials stack on top.',
  },
  {
    q: 'Can you coordinate a solar installation with my project?',
    a: 'Yes — that is our specialty. Our sister company Reliant Solar engineers and installs solar in-house. Doing the roof and the array under one roof (pun intended) means one schedule, one warranty conversation, and no finger-pointing between contractors.',
  },
];
