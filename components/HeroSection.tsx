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

  // 核心技能数据 
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

  const marqueeTrack = [...skillsList, ...skillsList, ...skillsList, ...skillsList];

  return (
    <div className="w-full bg-[#eef1f5] font-sans pb-16 relative overflow-hidden">
      
      <style>
        {`
          @keyframes marquee-slow {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee-super-slow { 
            animation: marquee-slow 60s linear infinite; 
          }
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
                <>视觉美术与探索的<br/><span className="text-gray-400">无尽边界</span></>
              ) : (
                <>Dive Into<br/>The Depths Of<br/><span className="text-gray-400">Visual Design</span></>
              )}
            </h1>
            <p className="text-lg md:text-xl font-medium max-w-lg mb-10 text-gray-600">
              {language === 'zh' 
                ? '打破常规框架。将最前沿的视觉设计、AIGC技术与多元理念结合，提供无与伦比的商业现实感与美学深度。' 
                : 'Break the barriers. Combining cutting-edge visuals, AIGC, and multiversal design to deliver unparalleled commercial realism.'}
            </p>
            
            {/* 按钮组 */}
            <div className="flex flex-wrap items-center gap-4">
              <button 
                onClick={handleExploreClick}
                className="flex items-center gap-4 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl bg-[#151515] text-white"
              >
                {language === 'zh' ? '探索作品世界' : 'EXPLORE WORKS'}
                <ArrowRight size={20} />
              </button>

              <button 
                onClick={() => onNavigate('contact')}
                className="flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-sm bg-white text-[#111] border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              >
                {language === 'zh' ? '合作与联系' : 'GET IN TOUCH'}
                <Mail size={20} className="text-gray-500" />
              </button>
            </div>

            {/* 👉 全新调整：将位置信息移到了这里，变成精致的小坐标 */}
            <div className="mt-10 lg:mt-12 flex items-center gap-3 bg-white/50 backdrop-blur-sm pl-2 pr-5 py-2 rounded-full border border-gray-200/60 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                <MapPin size={16} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">
                  {contactContent.baseLabel}
                </span>
                <span className="text-sm font-bold text-[#111] leading-none">
                  {contactContent.locationValue}
                </span>
              </div>
            </div>

          </div>

          <div className="relative w-full aspect-square lg:aspect-[4/5] rounded-t-[50%] rounded-b-[2rem] overflow-hidden shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
            <img 
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop" 
              alt="Hero Concept" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 品牌 Logo 墙风格缓慢滚动 */}
        <div className="mb-10 w-full relative">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-2 text-[#111]">
                {language === 'zh' ? '核心技能优势' : 'CORE SKILLS'}
              </h2>
            </div>
          </div>

          <div 
            className="relative w-full overflow-hidden pause-on-hover py-4" 
            style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}
          >
            <div className="flex w-max animate-marquee-super-slow items-center">
              {marqueeTrack.map((skill, index) => (
                <div 
                  key={index} 
                  className="mx-3 flex items-center gap-3 px-6 py-4 bg-white rounded-2xl hover:bg-gray-50 transition-colors cursor-default shrink-0 shadow-sm border border-black/5"
                >
                  <div className="w-8 h-8 rounded-full bg-[#111] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                    {skill.abbr}
                  </div>
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
