import { Language, Category } from '../../types';

export interface HeroItem {
  text: string;
  annotation?: string; // 改为可选属性，增加 UI 渲染的灵活性
  category: Category | null;
}

export interface HomeContent {
  name: string;          // 新增：姓名或品牌名
  title: string;         // 新增：核心职位或跨界定位
  heroItems: HeroItem[];
  intro: string;
  selectedWorks: string;
  years: string;
  contactPrompt: string; // 新增：引导查看简历或联系的文案
}

export const HOME_DATA: Record<Language, HomeContent> = {
  zh: {
    name: "你的名字",
    title: "视觉设计师 / 摄影师 / 独立开发者",
    heroItems: [
      { text: "视觉与包装设计", annotation: "(核心专注：品牌与电商)", category: Category.DESIGN },
      { text: "商业摄影与视频", annotation: "(专业视角呈现)", category: Category.VIDEO },
      { text: "前端开发与交互", annotation: "(Web 独立建站)", category: Category.DEV },
      { text: "新媒体营销与策划", annotation: "(AIGC与文案赋能)", category: Category.DESIGN },
    ],
    intro: "致力于将敏锐的商业洞察与多元的视觉语言相结合。从产品包装落地到数字交互体验，提供全链路的创意解决方案。",
    selectedWorks: "精选作品",
    years: "[ 202X — 202X ]",
    contactPrompt: "获取完整简历"
  },
  en: {
    name: "Your Name",
    title: "Visual Designer / Photographer / Developer",
    heroItems: [
      { text: "Graphic & Packaging", annotation: "(Main Focus & Passion)", category: Category.DESIGN },
      { text: "Photography & Video", annotation: "(Professional Lens)", category: Category.VIDEO },
      { text: "Web Development", annotation: "(Interactive & Vibe Coder)", category: Category.DEV },
      { text: "Marketing & Strategy", annotation: "(Copywriting & AIGC)", category: null }
    ],
    intro: "Bridging the gap between aesthetic design and technical execution. Delivering end-to-end creative solutions from physical packaging to interactive digital experiences.",
    selectedWorks: "Selected Works",
    years: "[ 202X — 202X ]",
    contactPrompt: "View Full Resume"
  }
};
