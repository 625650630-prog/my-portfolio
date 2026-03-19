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
      // 📍 新增的参考图布局项目，作为第一项
      { text: "发现数字艺术，收藏 NFTs。", annotation: "（EnDasmu 共享流动性 NFT 市场合约，提供最佳用户体验）", category: null },
      
      // 📍 以下是原有的项目，保持不变，依次往下排列
      { text: "电商视觉设计", annotation: "", category: Category.VIDEO }, // category is kept as VIDEO but UI will split
      { text: "AIGC项目对接", annotation: "", category: Category.DESIGN },
      { text: "新媒体运营", annotation: "", category: Category.DESIGN },
      { text: "商业拍摄与视频制作", annotation: "", category: Category.DEV },
      { text: "多元视觉设计落地", annotation: "", category: Category.DESIGN },
    ],
    intro: "Your personal catchphrase or introduction goes here.",
    selectedWorks: "精选作品",
    years: "[ 20XX — 20XX ]"
  },
  en: {
    heroItems: [
      // 📍 新增的参考图布局项目，作为第一项
      { text: "Discover Digital Art and Collect NFTs.", annotation: "(EnDasmu shared liquidity NFT market smart contract, provides best user experience)", category: null },
      
      // 📍 以下是原有的项目，保持不变，依次往下排列
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
