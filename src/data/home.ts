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
      { text: "电商视觉设计", annotation: "", category: Category.VIDEO }, 
      { text: "AIGC项目对接", annotation: "", category: Category.DESIGN },
      { text: "新媒体运营", annotation: "", category: Category.DESIGN },
      { text: "商业拍摄与视频制作", annotation: "", category: Category.DEV },
      { text: "多元视觉设计落地", annotation: "", category: Category.DESIGN },
    ],
    // 📍 首页文字介绍修改处（使用 | 实现换行）
    intro: "你好，我是 [你的名字] | 专注于电商视觉、AIGC 创意落地与新媒体运营 | 致力于通过商业拍摄与视频制作，实现多元化的视觉叙事与商业价值落地。",
    selectedWorks: "精选作品",
    years: "[ 2024 — 2026 ]"
  },
  en: {
    heroItems: [
      { text: "E-commerce Visual Design", annotation: "", category: Category.VIDEO },
      { text: "AIGC Project Integration", annotation: "", category: Category.DESIGN },
      { text: "New Media Operations", annotation: "", category: Category.DESIGN },
      { text: "Commercial Photo & Video", annotation: "", category: Category.DEV },
      { text: "Visual Design Execution", annotation: "", category: Category.DESIGN }
    ],
    // 📍 英文版对应修改
    intro: "Hi, I'm [Your Name] | Focused on E-commerce Visuals, AIGC & New Media | Dedicated to bringing diverse visual designs to life through commercial photography and high-quality video production.",
    selectedWorks: "Selected Works",
    years: "[ 2024 — 2026 ]"
  }
};
