import { Language, Category } from '../../types';

export interface HeroItem {
  text: string;
  annotation: string;
  category: Category | null;
}

export interface HomeContent {
  heroItems: HeroItem[];
  intro: string;
  selectedWorks: string;
  years: string;
}

export const HOME_DATA: Record<Language, HomeContent> = {
  zh: {
    heroItems: [
      { text: "视觉与包装设计", category: Category.DESIGN }, // category is kept as VIDEO but UI will split
      { text: "AIGC项目", category: Category.DESIGN },
      { text: "商业摄影与视频", category: Category.DESIGN）", category: Category.DEV },
      { text: "新媒体运营", category: Category.DESIGN }
    ],
    intro: "Your personal catchphrase or introduction goes here.",
    selectedWorks: "精选作品",
    years: "[ 2020 — 2026 ]"
  },
  en: {
    heroItems: [
      { text: "Photography & Videography", annotation: "(Extensive Portfolio)", category: Category.VIDEO },
      { text: "Graphic & UI", annotation: "(Main Focus & Passion)", category: Category.DESIGN },
      { text: "Development", annotation: "(Vibe Coder)", category: Category.DEV },
      { text: "Cooking", annotation: "(Still Learning)", category: null }
    ],
    intro: "Your personal catchphrase or introduction goes here.",
    selectedWorks: "Selected Works",
    years: "[ 20XX — 20XX ]"
  }
};
