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
