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
      { text: "摄影摄像（积累较多）", annotation: "（包含后期制作与剪辑）", category: Category.VIDEO }, 
      // 📍【修改点】将第二个项目明确为核心分类
      { text: "平面交互（主攻核心分类）", annotation: "（平面设计、UI/UX、用户研究）", category: Category.DESIGN },
      { text: "应用开发（技术实现）", annotation: "（网页开发、应用构建、AI集成）", category: Category.DEV },
      { text: "探索与个人成长", annotation: "（如：摄影探索、新技能学习）", category: null }
    ],
    // 💡 小建议：可以在这里写一句简短的自我介绍，比如：
    // intro: "你好，我是 LUN3CY，一名在图像与代码中寻找平衡的创意工作者。",
    intro: "Your personal catchphrase or introduction goes here.",
    selectedWorks: "精选作品",
    years: "[ 20XX — 20XX ]"
  },
  en: {
    heroItems: [
      { text: "Video & Motion", annotation: "(Photography, Videography, Editing)", category: Category.VIDEO },
      // 📍【修改点】英文版也对应修改
      { text: "Design & UX (Main Domain)", annotation: "(Brand Identity, UI/UX, User Research)", category: Category.DESIGN },
      { text: "App Development", annotation: "(Web/Mobile Apps, Vibe Builder)", category: Category.DEV },
      { text: "Exploration & Growth", annotation: "(e.g., Photography Exploration, Cooking)", category: null }
    ],
    intro: "Your personal catchphrase or introduction goes here.",
    selectedWorks: "Selected Works",
    years: "[ 20XX — 20XX ]"
  }
};
