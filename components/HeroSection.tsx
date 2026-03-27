import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Language, Category, Project } from '../types';
import { CONTACT_DATA } from '../src/data/contact';
import { ArrowRight, Star, ArrowUpRight, X, ZoomIn, ZoomOut } from 'lucide-react';
// 引入作品数据与标签
import { PROJECTS, CATEGORY_LABELS } from '../constants';

interface HeroSectionProps {
  onNavigate: (page: string) => void;
  onCategorySelect: (category: Category) => void;
  language: Language;
}

type GridItem = { type: 'project'; data: Project; height: string };

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onCategorySelect, language }) => {
  const contactContent = CONTACT_DATA[language];

  // 状态管理
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [displayProject, setDisplayProject] = useState<Project | null>(null);
  const [isModalRendered, setIsModalRendered] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleExploreClick = () => {
    onCategorySelect(Category.ALL);
    onNavigate('portfolio');
  };

  useEffect(() => {
    if (selectedProject) {
      setDisplayProject(selectedProject);
      setIsModalRendered(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      const timer = setTimeout(() => {
        setIsModalRendered(false);
        setDisplayProject(null);
        setZoomScale(1);
        setPanPosition({ x: 0, y: 0 });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [selectedProject]);

  // 技能跑马灯数据
  const skillsList = [
    { name: 'Photoshop', iconUrl: '/icons/PS.png' },
    { name: 'CorelDRAW', iconUrl: '/icons/CDR.png' },
    { name: 'Illustrator', iconUrl: '/icons/ai.png' },
    { name: 'Premiere', iconUrl: '/icons/PR.png' },
    { name: 'After Effects', iconUrl: '/icons/AE.png' },
    { name: 'Lightroom', iconUrl: '/icons/LR.png' },
    { name: 'DaVinci Resolve', iconUrl: '/icons/DFQ.png' },
    { name: 'ComfyUI' , iconUrl: '/icons/comfy.png' },
    { name: 'Gemini', iconUrl: '/icons/gemini.png' },
    { name: '剪映', iconUrl: '/icons/JY.png' },
    { name: '即梦', iconUrl: '/icons/JM.png' },
    { name: 'DeepSeek', iconUrl: '/icons/deepsk.png' },
  ];
  const marqueeTrack = [...skillsList, ...skillsList, ...skillsList];

  // ========================================================
  // 👉 核心：手风琴作品数据（请确保 targetCategory 对应你 types.ts 里的定义）
  // ========================================================
const showcaseData = [
    { 
      number: '01', 
      titleZh: '电商视觉设计', 
      titleEn: 'E-commerce Visual', 
      desc: '为品牌店铺打造可扩展的视觉规范与大促氛围包装。', 
      img: '/DS.png',
      targetCategory: Category.DESIGN 
    },
    { 
      number: '02', 
      titleZh: 'AIGC视觉探索', 
      titleEn: 'AIGC Exploration', 
      desc: '结合 AI 工具生成极具商业实用的视觉效果图。', 
      img: '/AI.png',
      targetCategory: Category.AIGC 
    },
    { 
      number: '03', 
      titleZh: '商业影像拍摄', 
      titleEn: 'Commercial Photography', 
      desc: '专业的产品摄影与视频拍摄，呈现极致产品质感。', 
      img: '/SY.jpg',
      targetCategory: Category.VIDEO_PHOTO // 👈 修改：对应 types.ts
    },
    { 
      number: '04', 
      titleZh: '新媒体内容制作', 
      titleEn: 'New Media Content', 
      desc: '提供创意策划、制图执行到后期运营的一站式服务。', 
      img: '/xmt.jpg',
      targetCategory: Category.NEW_MEDIA // 👈 修改：对应 types.ts
    },
    { 
      number: '05', 
      titleZh: '多元设计落地', 
      titleEn: 'Diverse Design', 
      desc: '融合平面、产品、视觉传达等不同方向的落地。', 
      img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop',
      targetCategory: Category.MULTIVERSAL // 👈 修改：对应 types.ts
    }
  ];

  const allProjects = PROJECTS[language];
  const safeGet = (index: number) => allProjects[Math.abs(index) % allProjects.length];

  const gridItems: GridItem[] = [
    { type: 'project', data: safeGet(allProjects.length - 1), height: '300px' },
    { type: 'project', data: safeGet(0), height: '400px' },
    { type: 'project', data: safeGet(1), height: '450px' },
    { type: 'project', data: safeGet(2), height: '400px' },
  ];

  return (
    <div className="w-full bg-white font-sans pt-4 md:pt-6 px-0 md:px-0 relative selection:bg-black selection:text-white">
      <style>{`
          @keyframes marquee-slow { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
          .animate-marquee-logos { animation: marquee-slow 40s linear infinite; }
          .text-shadow-hard { text-shadow: 0 4px 8px rgba(0,0,0,0.5); }
      `}</style>

      {/* Hero 背景区 */}
      <div 
        className="w-full max-w-[95vw] lg:max-w-[90vw] mx-auto rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 relative overflow-hidden shadow-sm border border-gray-100/50 min-h-[85vh] flex flex-col justify-center bg-cover bg-center"
        style={{ backgroundImage: 'url(/BJ.jpg)' }} 
      >
        <div className="flex flex-col items-start justify-center relative z-20 w-full py-8 lg:py-12 lg:px-16 xl:px-32 text-left">
          <div className="w-full max-w-4xl flex flex-col items-start justify-center">
            <h1 className="text-7xl md:text-8xl lg:text-[11rem] font-serif text-white tracking-tighter leading-none mb-6 lg:mb-10 relative text-shadow-hard">
              Hello<sup className="text-5xl md:text-8xl absolute top-4 ml-1">+</sup>
            </h1>
            <p className="text-lg md:text-xl text-gray-100 font-medium max-w-2xl leading-relaxed mb-8 text-shadow-hard">
              {language === 'zh' ? '打破常规传统设计视觉，将最前沿的视觉体验带给您。' : 'Drive Visual Growth with AI-Powered Content.'}
            </p>

            <div className="flex items-center gap-4 mb-10 border-t border-white/20 pt-6 w-full max-w-md justify-start">
              <div className="w-12 h-12 rounded-full bg-gray-500 overflow-hidden flex items-center justify-center shrink-0 border border-white/30 shadow-md">
                 <img src="/2ae4006dbc0d00fcd6122f18035e7ffc7cd0a7a6128fe-ZBEQ0q_fw1200webp.jpg" alt="avatar" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col text-sm font-bold text-gray-100 items-start text-left text-shadow-hard">
                <span>{language === 'zh' ? '坐标' : 'Location'} / <Star className="inline w-3 h-3 mb-0.5 text-yellow-400" fill="currentColor"/> {contactContent.baseLabel}</span>
                <span className="text-white font-medium text-base mt-0.5">{contactContent.locationValue}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-start gap-6">
              <button onClick={handleExploreClick} className="bg-white text-black px-8 py-4 rounded-full font-bold text-sm lg:text-base transition-transform hover:scale-105 shadow-xl">
                {language === 'zh' ? '探索作品集' : 'Explore Works'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 技能跑马灯 */}
      <div className="w-full max-w-[95vw] lg:max-w-[80vw] mx-auto mt-12 mb-16 overflow-hidden relative" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
        <div className="flex w-max animate-marquee-logos items-center gap-12 lg:gap-20">
          {marqueeTrack.map((item, index) => (
            <div key={index} className="flex items-center gap-3 shrink-0">
              <img src={item.iconUrl} alt={item.name} className="w-8 h-8 rounded-md object-contain" />
              <span className="text-xl md:text-3xl font-black tracking-tighter text-gray-500">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 精选作品展示区 */}
      <div className="w-full max-w-[95vw] lg:max-w-[90vw] mx-auto pt-20 pb-32 mt-10 relative">
        <div className="flex flex-col items-center text-center mb-16 border-b-2 border-gray-100 pb-10 px-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-3 text-[#111]">{language === 'zh' ? '精选优质作品' : 'Selected Works'}</h2>
          <h3 className="text-xl md:text-2xl font-light uppercase tracking-widest text-gray-500 italic">Create a visual feast</h3>
        </div>
        
        <div className="w-full flex flex-col lg:flex-row gap-4 h-[750px] lg:h-[650px]">
          {showcaseData.map((item, index) => (
            <div 
              key={index} 
              className="group relative flex-1 lg:hover:flex-[4] hover:flex-[3] rounded-3xl overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer shadow-sm" 
              // 👇 修改点：点击时调用分类筛选并跳转
              onClick={() => {
                onCategorySelect(item.targetCategory);
                onNavigate('portfolio');
              }}
            >
              <img src={item.img} alt={item.titleEn} className="absolute inset-0 w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90"></div>
              
              <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8 flex flex-col justify-end h-full">
                <div className="flex flex-col lg:flex-row lg:items-center gap-2 mb-2 group-hover:mb-4 transition-all duration-700">
                  <div className="flex items-center gap-3">
                    <span className="text-white font-black text-3xl lg:text-4xl group-hover:text-[#ff5030] transition-colors">{item.number}</span>
                    <div className="flex flex-col">
                      <span className="text-white font-bold text-xl lg:text-2xl">{language === 'zh' ? item.titleZh : item.titleEn}</span>
                      <span className="text-gray-400 text-xs">{language === 'zh' ? item.titleEn : item.titleZh}</span>
                    </div>
                  </div>
                </div>
                
                <div className="opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 flex flex-col overflow-hidden max-h-0 group-hover:max-h-[300px]">
                  <p className="text-gray-300 text-sm line-clamp-2 mt-2">{item.desc}</p>
                  <div className="mt-6 flex items-center gap-2 text-sm font-bold text-[#ff5030] uppercase tracking-widest">
                    Explore Project <ArrowUpRight size={16} strokeWidth={3} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ... 保持下方瀑布流和弹窗逻辑不变 ... */}
    </div>
  );
};
