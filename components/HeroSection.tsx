import React from 'react';
import { Language, Category } from '../types';
import { CONTACT_DATA } from '../src/data/contact';
import { ArrowRight, MapPin, Mail } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (page: string) => void;
  onCategorySelect: (category: Category) => void;
  language: Language;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onCategorySelect, language }) => {
  const contactContent = CONTACT_DATA[language];

  const handleExploreClick = () => {
    onCategorySelect(Category.ALL);
    onNavigate('portfolio');
  };

  // 核心技能数据 (提取缩写和全称，用于组合成 Logo 风格)
  const skillsList = [
    { name: 'Photoshop', abbr: 'Ps' },
    { name: 'CorelDRAW', abbr: 'Cd' },
    { name: 'Illustrator', abbr: 'Ai' },
    { name: 'Premiere', abbr: 'Pr' },
    { name: 'After Effects', abbr: 'Ae' },
    { name: 'Lightroom', abbr: 'Lr' },
    { name: 'DaVinci Resolve', abbr: 'Dv' },
    { name: 'ComfyUI', abbr: 'Cu' },
    { name: 'Gemini', abbr: 'Gm' },
    { name: '剪映', abbr: '剪' },
    { name: '即梦', abbr: '梦' },
    { name: 'DeepSeek', abbr: 'Ds' }
  ];

  // 复制多份数据以确保在超宽屏幕上也能无缝循环滚动
  const marqueeTrack = [...skillsList, ...skillsList, ...skillsList, ...skillsList];

  return (
    <div className="w-full bg-[#eef1f5] font-sans pb-16 relative overflow-hidden">
      
      {/* 注入单排缓慢滚动的动画 CSS */}
      <style>
        {`
          @keyframes marquee-slow {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee-super-slow { 
            animation: marquee-slow 60s linear infinite; 
          }
          /* 鼠标悬停时暂停 */
          .pause-on-hover:hover .animate-marquee-super-slow {
            animation-play-state: paused;
          }
        `}
      </style>

      <div className="max-w-[95vw] lg:max-w-[85vw] mx-auto relative z-10 pt-8 md:pt-16">
        
        {/* 顶部 Hero 区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16 md:mb-24">
          <div className="flex flex-col items-start z-10">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.05] mb-6 text-[#111]">
              {language === 'zh' ? (
                <>深潜视觉<br/>与体验的<br/><span className="text-gray-400">无尽边界</span></>
              ) : (
                <>Dive Into<br/>The Depths Of<br/><span className="text-gray-400">Visual Design</span></>
              )}
            </h1>
            <p className="text-lg md:text-xl font-medium max-w-lg mb-10 text-gray-600">
              {language === 'zh' 
                ? '打破常规框架。将最前沿的视觉设计、AIGC技术与多元理念结合，提供无与伦比的商业现实感与美学深度。' 
                : 'Break the barriers. Combining cutting-edge visuals, AIGC, and multiversal design to deliver unparalleled commercial realism.'}
            </p>
            <button 
              onClick={handleExploreClick}
              className="flex items-center gap-4 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl bg-[#151515] text-white"
            >
              {language === 'zh' ? '探索作品世界' : 'EXPLORE WORKS'}
              <ArrowRight size={20} />
            </button>
          </div>

          <div className="relative w-full aspect-square lg:aspect-[4/5] rounded-t-[50%] rounded-b-[2rem] overflow-hidden shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
            <img 
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop" 
              alt="Hero Concept" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 悬浮联系方式胶囊 */}
        <div className="relative z-20 mt-8 md:mt-12 mb-24 max-w-4xl mx-auto rounded-full p-6 md:p-8 flex flex-col md:flex-row items-center justify-around gap-6 shadow-2xl bg-[#151515] text-white">
          <div className="flex items-center gap-4 cursor-pointer group">
            <div className="p-3 rounded-full bg-[#2a2a2a] text-white">
              <MapPin size={24} />
            </div>
            <div>
              <p className="text-sm font-bold opacity-70 mb-1">{contactContent.baseLabel}</p>
              <p className="font-bold text-lg group-hover:underline decoration-2 underline-offset-4">{contactContent.locationValue}</p>
            </div>
          </div>
          <div className="hidden md:block w-px h-12 opacity-20 bg-white"></div>
          <div onClick={() => onNavigate('contact')} className="flex items-center gap-4 cursor-pointer group">
            <div className="p-3 rounded-full bg-[#2a2a2a] text-white">
              <Mail size={24} />
            </div>
            <div>
              <p className="text-sm font-bold opacity-70 mb-1">{language === 'zh' ? '取得联系' : 'Send a Message'}</p>
              <p className="font-bold text-lg group-hover:underline decoration-2 underline-offset-4">{contactContent.contactLabel}</p>
            </div>
          </div>
        </div>

        {/* 品牌 Logo 墙风格缓慢滚动 */}
        <div className="mb-10 w-full relative">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-2 text-[#111]">
                {language === 'zh' ? '核心技能' : 'CORE SKILLS'}
              </h2>
            </div>
          </div>

          {/* 滚动容器 (带有边缘渐变遮罩) */}
          <div 
            className="relative w-full overflow-hidden pause-on-hover py-4" 
            style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}
          >
            <div className="flex w-max animate-marquee-super-slow items-center">
              {marqueeTrack.map((skill, index) => (
                <div 
                  key={index} 
                  /* 👉 修改了这里：底色统一成纯白 bg-white，悬停变成极其微弱的浅灰 hover:bg-gray-50 */
                  className="mx-3 flex items-center gap-3 px-6 py-4 bg-white rounded-2xl hover:bg-gray-50 transition-colors cursor-default shrink-0 shadow-sm border border-black/5"
                >
                  {/* 黑色圆形小图标 */}
                  <div className="w-8 h-8 rounded-full bg-[#111] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                    {skill.abbr}
                  </div>
                  {/* 软件全称 */}
                  <span className="font-bold text-[#111] text-lg tracking-tight whitespace-nowrap">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
