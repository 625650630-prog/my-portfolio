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
      { text: "电商视觉设计", category: Category.VIDEO }, // category is kept as VIDEO but UI will split
      { text: "AIGC项目",  category: Category.DESIGN },
      { text: "新媒体运营",  category: Category.DESIGN },
      { text: "商业拍摄与视频制作",  category: Category.DESIGN },
      { text: "多元视觉设计落地", category: Category.DESIGN }
    ],
    intro: "pursuit of perfection.",
    selectedWorks: "精选作品",
    years: "[ 2020 — 2026 ]"
  },
  en: {
    heroItems: [
      { text: "Electricity Design", category: Category.VIDEO }, // category is kept as VIDEO but UI will split
      { text: "AIGC Project",  category: Category.DESIGN },
      { text: "New Media Operations",  category: Category.DESIGN },
      { text: "Commercial Photograph",  category: Category.DESIGN },
      { text: "Visual Design", category: Category.DESIGN }
    ],
    intro: "pursuit of perfection.",
    selectedWorks: "Selected Works",
    years: "[ 2020 — 2026 ]"
  }
};
