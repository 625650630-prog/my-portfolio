import { Language, Category } from '../../types';

export interface HeroItem {
  text: string;
  annotation?: string; // 改为可选，因为你现在没有用到它
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
      { text: "电商视觉设计", category: Category.DESIGN },
      { text: "AIGC项目",  category: Category.AIGC },
      { text: "新媒体运营",  category: Category.NEW_MEDIA },
      { text: "商业拍摄与视频制作",  category: Category.VIDEO_PHOTO },
      { text: "多元视觉设计落地", category: Category.MULTIVERSAL }
    ],
    intro: "pursuit of perfection.",
    selectedWorks: "精选作品",
    years: "[ 2018 — 2026 ]"
  },
  en: {
    heroItems: [
      { text: "E-commerce Visual Design", category: Category.DESIGN }, 
      { text: "AIGC Projects",  category: Category.AIGC },
      { text: "New Media Operations",  category: Category.NEW_MEDIA },
      { text: "Commercial Photo & Video",  category: Category.VIDEO_PHOTO },
      { text: "Multiversal Design", category: Category.MULTIVERSAL }
    ],
    intro: "pursuit of perfection.",
    selectedWorks: "Selected Works",
    years: "[ 2018 — 2026 ]"
  }
};
