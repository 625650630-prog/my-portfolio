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

      { text: "AIGC项目对接", category: Category.DESIGN },

      { text: "新媒体运营", category: Category.DESIGN },

      { text: "商业拍摄与视频制作", category: Category.DEV },

      { text: "多元视觉设计落地", category: Category.DESIGN },

    ],

    intro: "Your personal catchphrase or introduction goes here.",

    selectedWorks: "精选作品",

    years: "[ 20XX — 20XX ]"

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
