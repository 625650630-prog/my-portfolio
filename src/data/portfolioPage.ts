import { Language } from '../../types';

export interface PortfolioPageContent {
  title: string;
  description: string;
}

export const PORTFOLIO_PAGE_DATA: Record<Language, PortfolioPageContent> = {
  zh: {
    title: '精选作品集', // 👈 修改为你想要的中文大标题，比如：精选作品、案例存档
    description: '聚焦电商视觉、商业影像与 AIGC 探索的多元设计落地。' // 👈 修改为你的中文简介
  },
  en: {
    title: 'Selected Works', // 👈 对应的英文标题
    description: 'A showcase of E-commerce Visuals, Commercial Photography, and AIGC Explorations.' // 👈 对应的英文简介
  }
};
