export interface Hall {
  id: string;
  label: string;
  name: string;
  subtitle: string;
  eraRange: string;
  geologicalEra: string;
  curatorStatement: string;
  eraWatermark: string;
  centerpieceSlug: string;
  archiveId: string;
  coordinates: string;
  discoveryYear: string;
  supportingSlugs: string[];
}

export const hallsData: Hall[] = [
  {
    id: 'theropods',
    label: 'Wing I',
    name: 'Theropod Hall',
    subtitle: 'Apex Predators of the Mesozoic',
    eraRange: '150 Million Years of Evolution',
    geologicalEra: 'CRETACEOUS & JURASSIC PERIODS',
    curatorStatement: 'From agile, feathered hunters to the colossal apex predators of the late Cretaceous, this hall explores the evolutionary rise, predatory mechanics, and neurological specialization of the Theropoda.',
    eraWatermark: 'THEROPODA',
    centerpieceSlug: 'trex',
    archiveId: 'FOSSIL-ARC-TRX-082',
    coordinates: '47°36\'11" N, 109°12\'15" W',
    discoveryYear: '1902 · Hell Creek Formation',
    supportingSlugs: ['velociraptor', 'spinosaurus', 'allosaurus'],
  },
  {
    id: 'sauropods',
    label: 'Wing II',
    name: 'Sauropod Gallery',
    subtitle: 'The Age of Giants',
    eraRange: 'Vast Botanical Consumers',
    geologicalEra: 'JURASSIC PERIOD · 201–145 MA',
    curatorStatement: 'Walk beneath the long-necked titans that defined the Jurassic forest canopy. This gallery tracks the biomechanics, bone density, and dietary throughput required to sustain the largest land animals in Earth\'s history.',
    eraWatermark: 'SAUROPODA',
    centerpieceSlug: 'brachiosaurus',
    archiveId: 'FOSSIL-ARC-BRA-095',
    coordinates: '38°43\'55" N, 105°14\'32" W',
    discoveryYear: '1900 · Grand River Valley',
    supportingSlugs: ['diplodocus'],
  },
  {
    id: 'armoured',
    label: 'Wing III',
    name: 'Armoured Annex',
    subtitle: 'Evolutionary Defense Systems',
    eraRange: 'Osteoderms & Ceratopsian Armor',
    geologicalEra: 'CRETACEOUS & JURASSIC PERIODS',
    curatorStatement: 'Explore the defensive arms race of the Mesozoic. From fused bony shields and impact-delivering tail clubs to massive defensive horns, these species engineered passive defense to survive the world\'s deadliest predators.',
    eraWatermark: 'THYREOPHORA',
    centerpieceSlug: 'stegosaurus',
    archiveId: 'FOSSIL-ARC-STE-044',
    coordinates: '39°12\'08" N, 105°08\'45" W',
    discoveryYear: '1877 · Morrison Formation',
    supportingSlugs: ['triceratops', 'ankylosaurus'],
  },
  {
    id: 'hadrosaurs',
    label: 'Wing IV',
    name: 'Hadrosaur Hall',
    subtitle: 'Social Dynamics & Acoustic Communication',
    eraRange: 'Duck-Billed & Crested Species',
    geologicalEra: 'LATE CRETACEOUS · 76–66 MA',
    curatorStatement: 'Investigate the herd behavior, vocalization mechanisms, and cranial display crests of the duck-billed dinosaurs. Modern acoustic reconstructions allow visitors to hear the low-frequency resonance of these social herbivores.',
    eraWatermark: 'HADROSAURID',
    centerpieceSlug: 'parasaurolophus',
    archiveId: 'FOSSIL-ARC-PAR-112',
    coordinates: '36°18\'40" N, 107°59\'20" W',
    discoveryYear: '1920 · Sand Creek, Alberta',
    supportingSlugs: ['pachycephalosaurus'],
  },
  {
    id: 'flying',
    label: 'Wing V',
    name: 'Sky Reptiles Gallery',
    subtitle: 'Masters of the Mesozoic Air',
    eraRange: 'Wingspans & Pterosaur Aerodynamics',
    geologicalEra: 'LATE CRETACEOUS · 86–84 MA',
    curatorStatement: 'Look upward to witness the evolution of powered flight. Suspended skeletons demonstrate the hollow bone geometry, membrane structure, and aerodynamic specialization that allowed pterosaurs to soar over ancient seaways.',
    eraWatermark: 'PTEROSAURIA',
    centerpieceSlug: 'pteranodon',
    archiveId: 'FOSSIL-ARC-PTE-051',
    coordinates: '38°52\'30" N, 99°45\'02" W',
    discoveryYear: '1870 · Smoky Hill Chalk',
    supportingSlugs: [],
  },
];
