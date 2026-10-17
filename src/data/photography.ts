export interface EXIFData {
  camera: string;
  lens: string;
  aperture: string;
  shutterSpeed: string;
  iso: number;
  focalLength: string;
  filmSimulationOrProfile?: string;
}

export interface PrintOption {
  size: string;
  dimensionCm: string;
  basePriceUsd: number;
  editionLimit: number;
  editionsRemaining: number;
}

export interface PhotoProject {
  id: string;
  title: string;
  series: string;
  category: 'architecture' | 'editorial' | 'documentary' | 'landscape';
  year: number;
  location: string;
  imageSrc: string;
  aspectRatio: '16:9' | '4:3' | '3:4' | '1:1';
  exif: EXIFData;
  narrative: string;
  curatorNote: string;
  isHero?: boolean;
  featuredIn?: string;
  prints: PrintOption[];
  tags: string[];
}

export interface Exhibition {
  year: number;
  title: string;
  venue: string;
  city: string;
  type: 'Solo' | 'Group' | 'Biennale';
}

export interface MonographBook {
  title: string;
  publisher: string;
  year: number;
  pages: number;
  binding: string;
  coverImage: string;
  status: 'In Print' | 'Limited Stock' | 'Archive Only';
}

export const PHOTOGRAPHY_PROJECTS: PhotoProject[] = [
  {
    id: 'monolith-at-dusk',
    title: 'The Monolith at Dusk',
    series: 'Brutalist Horizons',
    category: 'architecture',
    year: 2025,
    location: 'Big Sur, California',
    imageSrc: '/src/assets/images/hero_photographer_art_1792241960673.jpg',
    aspectRatio: '16:9',
    isHero: true,
    exif: {
      camera: 'Leica M11-P',
      lens: 'Summicron-M 35mm f/2 ASPH',
      aperture: 'f/2.8',
      shutterSpeed: '1/60s',
      iso: 400,
      focalLength: '35mm',
      filmSimulationOrProfile: 'Monochrome High-Contrast Curve'
    },
    narrative:
      'A study of brutalist concrete mass intersecting with the Pacific horizon at twilight. The deliberate single shaft of amber gallery light creates a geometric rift across raw board-formed concrete, capturing human scale in deep stillness.',
    curatorNote:
      'Captured precisely during civil twilight with natural marine layer clouds. The solitary figure provides an anchor to the monumental scale of the coastal residence.',
    featuredIn: 'Architectural Digest & Domus Special Issue',
    prints: [
      { size: 'Medium (A2)', dimensionCm: '42 × 59.4 cm', basePriceUsd: 480, editionLimit: 25, editionsRemaining: 7 },
      { size: 'Collector (60×90)', dimensionCm: '60 × 90 cm', basePriceUsd: 950, editionLimit: 15, editionsRemaining: 4 },
      { size: 'Monumental (90×135)', dimensionCm: '90 × 135 cm', basePriceUsd: 1800, editionLimit: 5, editionsRemaining: 1 }
    ],
    tags: ['Brutalism', 'Twilight', 'Coastal Geometry', 'Scale']
  },
  {
    id: 'geometric-sanctuary',
    title: 'Geometric Sanctuary',
    series: 'Brutalist Horizons',
    category: 'architecture',
    year: 2024,
    location: 'Marfa, Chihuahuan Desert',
    imageSrc: '/src/assets/images/photo_architectural_brutalist_1792241960740.jpg',
    aspectRatio: '4:3',
    exif: {
      camera: 'Hasselblad X2D 100C',
      lens: 'XCD 38mm f/2.5 V',
      aperture: 'f/8.0',
      shutterSpeed: '1/500s',
      iso: 64,
      focalLength: '38mm',
      filmSimulationOrProfile: 'Natural Color Solution (HNCS)'
    },
    narrative:
      'An exploration of architectural void and harsh desert zenith. Cantilevered cast concrete forms intersecting razor-sharp diagonal shadows, turning the pavilion into an elemental solar sundial.',
    curatorNote:
      'Shot at 14:15 during high desert summer. The 100-megapixel sensor preserves micro-textures in the board-formed concrete and the dry Chihuahuan flora.',
    featuredIn: 'Cereal Magazine Monograph Vol. 22',
    prints: [
      { size: 'Medium (A2)', dimensionCm: '42 × 59.4 cm', basePriceUsd: 520, editionLimit: 20, editionsRemaining: 8 },
      { size: 'Collector (60×80)', dimensionCm: '60 × 80 cm', basePriceUsd: 1100, editionLimit: 12, editionsRemaining: 3 }
    ],
    tags: ['Desert', 'Minimalism', 'Concrete', 'Shadow Form']
  },
  {
    id: 'solitude-in-viridian',
    title: 'Solitude in Viridian',
    series: 'Vessels of Silence',
    category: 'editorial',
    year: 2025,
    location: 'Copenhagen, Denmark',
    imageSrc: '/src/assets/images/photo_editorial_portrait_1792241960331.jpg',
    aspectRatio: '3:4',
    exif: {
      camera: 'Leica SL2-S',
      lens: 'APO-Summicron-SL 75mm f/2 ASPH',
      aperture: 'f/2.0',
      shutterSpeed: '1/250s',
      iso: 200,
      focalLength: '75mm',
      filmSimulationOrProfile: 'Muted Editorial Ektachrome'
    },
    narrative:
      'Commissioned monograph study exploring stillness and tactile materiality. The dialogue between heavy houndstooth wool, fluid viridian silk drapery, and soft morning raking light across weathered brickwork.',
    curatorNote:
      'Zero artificial reflectors or strobes used; relies entirely on the natural diffused northern sky through an industrial loft window.',
    featuredIn: 'Vogue Scandinavia & Kinfolk Gallery',
    prints: [
      { size: 'Studio (30×40)', dimensionCm: '30 × 40 cm', basePriceUsd: 380, editionLimit: 30, editionsRemaining: 12 },
      { size: 'Gallery (50×70)', dimensionCm: '50 × 70 cm', basePriceUsd: 780, editionLimit: 15, editionsRemaining: 5 },
      { size: 'Museum (70×100)', dimensionCm: '70 × 100 cm', basePriceUsd: 1400, editionLimit: 8, editionsRemaining: 2 }
    ],
    tags: ['Portraiture', 'Nordic Light', 'Textile', 'Editorial']
  },
  {
    id: 'rain-steam-and-neon',
    title: 'Nocturne in Wet Stone',
    series: 'Transient Metropoles',
    category: 'documentary',
    year: 2024,
    location: 'Bordeaux Historic Quarter, France',
    imageSrc: '/src/assets/images/photo_street_documentary_1792241961379.jpg',
    aspectRatio: '4:3',
    exif: {
      camera: 'Leica Q3',
      lens: 'Summilux 28mm f/1.7 ASPH',
      aperture: 'f/2.0',
      shutterSpeed: '1/125s',
      iso: 800,
      focalLength: '28mm',
      filmSimulationOrProfile: 'Cinematic Amber/Teal Film Stock'
    },
    narrative:
      'A documentary record of solitary nocturnal passage along glistening rain-slicked tramway cobblestones. Warm bistro signage and café lanterns cast long liquid reflections into the cool blue mist.',
    curatorNote:
      'Selected for the 2024 Arles Photo Festival discovery showcase. Captured handheld without tripods during a November downpour.',
    featuredIn: 'Rencontres d’Arles Official Selection',
    prints: [
      { size: 'Medium (A2)', dimensionCm: '42 × 59.4 cm', basePriceUsd: 460, editionLimit: 25, editionsRemaining: 11 },
      { size: 'Collector (60×80)', dimensionCm: '60 × 80 cm', basePriceUsd: 920, editionLimit: 15, editionsRemaining: 4 }
    ],
    tags: ['Nocturne', 'Rain Reflections', 'Cobblestones', 'Documentary']
  },
  {
    id: 'obsidian-tides',
    title: 'Obsidian Tides',
    series: 'Terra Incognita',
    category: 'landscape',
    year: 2025,
    location: 'Reynisdrangar, Vík, Iceland',
    imageSrc: '/src/assets/images/photo_landscape_nordic_1792241962595.jpg',
    aspectRatio: '16:9',
    exif: {
      camera: 'Hasselblad X2D 100C',
      lens: 'XCD 55mm f/2.5 V',
      aperture: 'f/11.0',
      shutterSpeed: '1/4s',
      iso: 64,
      focalLength: '55mm',
      filmSimulationOrProfile: 'High Dynamic Range Neutral'
    },
    narrative:
      'Basalt sea stacks emerging from Arctic sea mist along a volcanic black gravel shoreline. Balancing the turbulent cold surf against immutable, prehistoric geological spires.',
    curatorNote:
      'Shot at low tide using a custom 3-stop optical ND filter to preserve kinetic wave texture while maintaining sharp rock detail.',
    featuredIn: 'National Geographic Fine Print Collection',
    prints: [
      { size: 'Medium (A2)', dimensionCm: '42 × 59.4 cm', basePriceUsd: 560, editionLimit: 20, editionsRemaining: 6 },
      { size: 'Collector (60×90)', dimensionCm: '60 × 90 cm', basePriceUsd: 1150, editionLimit: 12, editionsRemaining: 2 },
      { size: 'Monumental (100×160)', dimensionCm: '100 × 160 cm', basePriceUsd: 2400, editionLimit: 5, editionsRemaining: 1 }
    ],
    tags: ['Iceland', 'Arctic Coast', 'Long Exposure', 'Basalt']
  }
];

export const EXHIBITIONS_DATA: Exhibition[] = [
  { year: 2025, title: 'The Silent Threshold', venue: 'Palais de Tokyo', city: 'Paris', type: 'Solo' },
  { year: 2025, title: 'Geometry of Light', venue: 'Kogod Courtyard, Smithsonian', city: 'Washington, D.C.', type: 'Group' },
  { year: 2024, title: 'Brutalist Monologues', venue: 'Mori Building Digital Art Space', city: 'Tokyo', type: 'Solo' },
  { year: 2024, title: 'New Perspectives in Documentary', venue: 'Rencontres d’Arles', city: 'Arles', type: 'Biennale' },
  { year: 2023, title: 'Terra Incognita: Northern Frontiers', venue: 'Dansk Arkitektur Center', city: 'Copenhagen', type: 'Solo' }
];

export const CAMERA_BAG_ITEMS = [
  { item: 'Hasselblad X2D 100C', type: 'Medium Format Body', desc: '100MP BSI CMOS sensor with 16-bit color depth for monumental fine art prints.' },
  { item: 'Leica M11-P', type: 'Rangefinder Body', desc: 'Content Authenticity Initiative (CAI) cryptographic provenance for documentary work.' },
  { item: 'Leica Summicron-M 35mm f/2 ASPH', type: 'Prime Lens', desc: 'Uncompromising sharpness and micro-contrast for street and architectural scale.' },
  { item: 'Hasselblad XCD 55mm f/2.5 V', type: 'Prime Lens', desc: 'Leaf shutter up to 1/4000s, natural perspective with edge-to-edge clarity.' },
  { item: 'Lee ProGlass IRND Filters', type: 'Optical Glass', desc: 'Neutral density filtration maintaining spectral neutrality across long exposures.' }
];

export const CLIENT_COMMISSIONS = [
  'Architectural Digest',
  'Kinfolk',
  'Vogue Scandinavia',
  'Cereal Magazine',
  'Aesop Architecture',
  'Foster + Partners',
  'Boffi Interiors',
  'MoMA PS1 Archive'
];
