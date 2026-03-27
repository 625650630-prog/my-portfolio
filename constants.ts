import { Category, Project, Experience, Skill, Language, HonorsData, Article, ArticleCategory } from './types';
import { Sparkles, Image, History, Send } from 'lucide-react';
import { PROJECT_DATA } from './src/data/projects';
import { ARTICLE_DATA } from './src/data/articles';

export const CATEGORY_LABELS: Record<Language, Record<string, string>> = {
  zh: {
    'All': '全部', // 假设你 All 的枚举值就是字符串 'All'，如果也是枚举，请改为 [Category.ALL]
    [Category.DESIGN]: '电商视觉设计',
    [Category.AIGC]: 'AIGC视觉探索',
    [Category.VIDEO]: '商业影像拍摄',
    [Category.OPERATION]: '新媒体内容制作',
    [Category.DIVERSE]: '多元设计落地'
  },
  en: {
    'All': 'All',
    [Category.DESIGN]: 'Commercial Visual Design',
    [Category.AIGC]: 'AIGC Projects',
    [Category.VIDEO]: 'Commercial Photo & Video',
    [Category.OPERATION]: 'New Media Operations',
    [Category.DIVERSE]: 'Multiversal Design Implementation'
  }
};

export const ARTICLE_LABELS: Record<Language, Record<string, string>> = {
  zh: {
    'All': '全部',
    [ArticleCategory.DIT]: 'DiT | 数媒与课程',
    [ArticleCategory.LUNA]: 'LUNA | 影像相关',
    [ArticleCategory.TALK]: '瞎叨be叨 | 杂记',
    [ArticleCategory.AFTER8]: 'After8 | 聊艺术',
    [ArticleCategory.SERENITY]: '山海疗养院 | 游记'
  },
  en: {
    'All': 'All',
    [ArticleCategory.DIT]: 'DiT | DMT & Courses',
    [ArticleCategory.LUNA]: 'LUNA | Visual Arts',
    [ArticleCategory.TALK]: 'Random Thoughts',
    [ArticleCategory.AFTER8]: 'After8 | Art Talk',
    [ArticleCategory.SERENITY]: 'Serenity Vista | Travel'
  }
};

export const PROJECTS: Record<Language, Project[]> = {
  zh: PROJECT_DATA.map(p => ({
    id: p.id,
    ...p.common,
    ...p.zh,
    // Inject bilingual title for fallback UI
    bilingualTitle: {
      zh: p.zh.title,
      en: p.en.title
    }
  })),
  en: PROJECT_DATA.map(p => ({
    id: p.id,
    ...p.common,
    ...p.en,
    // Inject bilingual title for fallback UI
    bilingualTitle: {
      zh: p.zh.title,
      en: p.en.title
    }
  }))
};

export const ARTICLES: Record<Language, Article[]> = {
  zh: ARTICLE_DATA.map(a => ({
    id: a.id,
    ...a.common,
    ...a.zh
  })),
  en: ARTICLE_DATA.map(a => ({
    id: a.id,
    ...a.common,
    ...a.en
  }))
};
