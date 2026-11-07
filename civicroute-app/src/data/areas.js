// Sample civic areas with authority mappings
export const AUTHORITIES = {
  authorityA: {
    id: 'authorityA',
    name: 'Sample Authority A — TMC Gulshan',
    shortName: 'TMC Gulshan',
    department: 'Sanitation Department',
    city: 'Karachi',
    email: 'sanitation@gulshan-civic.example.com',
    portal: 'gulshan-civic.example.com',
    helpline: '021-9999 0001',
    handles: ['Sewage leak', 'Garbage dumping'],
    description:
      'Handles local drain cleaning, sewage overflow reports and neighbourhood waste collection in this sample area.',
  },
  authorityB: {
    id: 'authorityB',
    name: 'Sample Authority B — Saddar Works',
    shortName: 'Saddar Works',
    department: 'Roads & Infrastructure',
    city: 'Karachi',
    email: 'roads@saddar-works.example.com',
    portal: 'saddar-works.example.com',
    helpline: '021-9999 0002',
    handles: ['Broken road', 'Streetlight not working'],
    description:
      'Responsible for road repairs, broken surfaces, and street lighting maintenance in this sample area.',
  },
};

export const AREAS = [
  {
    id: 'gulshan-13d',
    label: 'Gulshan-e-Iqbal, Block 13-D',
    ward: 'Ward 07',
    block: 'Block 13-D',
    authorityId: 'authorityA',
    mapPinX: 68, // % from left in SVG viewport
    mapPinY: 42, // % from top in SVG viewport
  },
  {
    id: 'gulshan-6',
    label: 'Gulshan-e-Iqbal, Block 6',
    ward: 'Ward 08',
    block: 'Block 6',
    authorityId: 'authorityA',
    mapPinX: 55,
    mapPinY: 55,
  },
  {
    id: 'nazimabad-2',
    label: 'Nazimabad, Block 2',
    ward: 'Ward 12',
    block: 'Block 2',
    authorityId: 'authorityB',
    mapPinX: 28,
    mapPinY: 48,
  },
  {
    id: 'saddar-empress',
    label: 'Saddar, Empress Market Zone',
    ward: 'Ward 03',
    block: 'Empress Market',
    authorityId: 'authorityB',
    mapPinX: 20,
    mapPinY: 70,
  },
];

export const ISSUE_TYPES = [
  { id: 'sewage', label: 'Sewage leak', icon: 'water_damage' },
  { id: 'road', label: 'Broken road', icon: 'alt_route' },
  { id: 'streetlight', label: 'Streetlight not working', icon: 'lightbulb' },
  { id: 'garbage', label: 'Garbage dumping', icon: 'delete' },
];
