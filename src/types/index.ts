export interface Chapter {
  name: string;
  image: string;
}

export interface HeroProps {
  showVideo: boolean;
}

export interface CollectionProps {
  activeChapter: number;
  setActiveChapter: (index: number) => void;
}

export interface MobileMenuProps {
  isOpen: boolean;
}

export interface Dinosaur {
  slug: string;
  name: string;
  shortName: string;
  era: 'Triassic' | 'Jurassic' | 'Cretaceous';
  period: string;
  periodRange: string;
  diet: 'carnivore' | 'herbivore' | 'omnivore';
  height: string;
  weight: string;
  length: string;
  habitat: string;
  description: string;
  funFacts: string[];
  relatedSpecies: string[];
  image: string;
  heroImage: string;
}
