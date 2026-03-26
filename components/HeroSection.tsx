import React from 'react';
import { Language, Category } from '../types';
import { CONTACT_DATA } from '../src/data/contact';
import { ArrowRight, Play, CheckCircle2, Star, ArrowUpRight } from 'lucide-react';

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
    'Photoshop', 'CorelDRAW', 'Illustrator', 'Premiere', 'After Effects', 
    'Lightroom', 'DaVinci Resolve', 'ComfyUI', 'Gemini', '剪映', '即梦', 'DeepSeek'
  ];
  const marqueeTrack = [...skillsList, ...skillsList, ...skillsList];

  // 精选优质作品数据
  const showcaseData = [
    {
      number: '01',
      titleZh: 'AIGC 视觉探索',
      titleEn: 'AIGC Exploration',
      desc: '结合 Stable Diffusion 与 Midjourney，生成极具商业现实感的视觉叙事。',
      img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop',
    },
    {
      number: '02',
      titleZh: '电商视觉设计',
      titleEn: 'E-commerce Visual',
      desc: '为头部平台打造可扩展的视觉规范与大促氛围包装，提升用户转化。',
      img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop',
    },
    {
      number: '03',
      titleZh: '新媒体动态',
      titleEn: 'New Media Motion',
      desc: '充满活力的短视频动效与品牌片头，在快节奏的社交媒体中抓住眼球。',
      img: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop',
    },
    {
      number: '04',
      titleZh: '商业影像精修',
      titleEn: 'Commercial Photo',
      desc: '专业的商业产品摄影与影视级调色，呈现无与伦比的产品质感。',
      img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop',
    },
    {
      number: '05',
      titleZh: 'UI/UX 体验',
      titleEn: 'UI/UX Design',
      desc: '从原型到开发部署，全流程打造极致的用户交互体验与功能性。',
      img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop',
    }
  ];

  return (
    <div className="w-full bg-white font-sans pb-12 pt-4 md:pt-6 px-4 md:px-6">
      
      <style>
        {`
          @keyframes marquee-slow {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee-logos { 
            animation: marquee-slow 40s linear infinite; 
          }
        `}
      </style>

      {/* 核心灰色包裹容器 */}
      <div className="w-full max-w-[95vw] lg:max-w-[90vw] mx-auto bg-gradient-to-br from-[#f4f5f7] to-[#e5e7eb] rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 relative overflow-hidden shadow-sm border border-gray-100/50 min-h-[85vh] flex flex-col justify-center">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 relative z-20 w-full py-8 lg:py-12 lg:px-16 xl:px-32">
          
          <div className="lg:col-span-6 flex flex-col items-start justify-center">
            <div className="flex items-center gap-3 mb-6 lg:mb-8">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white">
                <span className="font-serif italic text-lg pr-1">S</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-black leading-tight">100+ Projects</span>
                <span className="text-sm text-gray-500 font-medium underline decoration-gray-300 underline-offset-4 cursor-pointer hover:text-black transition-colors">
                  {language === 'zh' ? '查看成功案例' : 'Read Our Success Stories'}
                </span>
              </div>
            </div>

            <h1 className="text-7xl md:text-8xl lg:text-[11rem] font-serif text-[#111] tracking-tighter leading-none mb-6 lg:mb-10 relative">
              Design<sup className="text-5xl md:text-8xl absolute top-4 ml-1">+</sup>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 font-medium max-w-md leading-relaxed mb-10">
              {language === 'zh' 
                ? '打破常规框架，将最前沿的视觉设计与 AIGC 技术结合 — 提供无与伦比的美学深度。' 
                : 'Drive Visual Growth, And Harness Ai-Powered Content — Up To 50x Faster.'}
            </p>

            <div className="flex items-center gap-4 mb-12 border-t border-gray-300/50 pt-8 w-full max-w-md">
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center shrink-0">
                 <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop" alt="avatar" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col text-sm font-bold text-gray-700">
                <span>{language === 'zh' ? '坐标' : 'Location'} / <Star className="inline w-3 h-3 mb-0.5" fill="currentColor"/> {contactContent.baseLabel}</span>
                <span className="text-gray-500 font-medium text-base mt-0.5">{contactContent.locationValue}</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <button 
                onClick={handleExploreClick}
                className="bg-black text-white px-8 py-4 rounded-full font-bold text-sm lg:text-base transition-transform hover:scale-105 shadow-xl"
              >
                {language === 'zh' ? '探索精选作品' : 'Explore Works'}
              </button>
              <button 
                onClick={() => onNavigate('contact')}
                className="font-bold text-sm lg:text-base text-[#111] hover:text-gray-500 transition-colors flex items-center gap-2 group"
              >
                {language === 'zh' ? '查看服务报价' : 'Our Pricing'}
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative h-[500px] lg:h-[650px] w-full max-w-lg lg:max-w-[550px] mx-auto mt-10 lg:mt-0">
            <div className="absolute inset-4 lg:inset-8 bg-gradient-to-br from-[#ff7a50] to-[#ff5030] rounded-[3rem] shadow-2xl overflow-hidden">
               <img 
                 src="https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop" 
                 alt="Main Visual" 
                 className="w-full h-full object-cover mix-blend-overlay opacity-80"
               />
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-16 h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-transform z-20">
              <Play size={28} className="text-black ml-1 lg:ml-2" fill="currentColor" />
            </div>
            <div className="absolute top-16 right-10 lg:-left-6 lg:top-32 bg-white/90 backdrop-blur-sm px-5 py-3 rounded-full shadow-lg flex items-center gap-3 text-sm lg:text-base font-bold z-30 animate-fade-in">
              <div className="bg-[#ff5030] text-white rounded-full p-1"><CheckCircle2 size={16} /></div>
              Visual Design Done?
            </div>
            <div className="absolute top-32 right-24 lg:-left-0 lg:top-48 bg-white/90 backdrop-blur-sm px-5 py-3 rounded-full shadow-lg flex items-center gap-3 text-sm lg:text-base font-bold z-30 animate-fade-in delay-100">
              <div className="bg-blue-500 text-white rounded-full p-1"><CheckCircle2 size={16} /></div>
              AIGC Optimized!
            </div>
            <div className="absolute top-10 right-0 lg:-right-6 bg-white/40 backdrop-blur-xl border border-white/40 p-6 rounded-3xl shadow-2xl z-20 w-44 lg:w-48">
              <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">— Efficiency</span>
              <h3 className="text-5xl font-black text-black my-2">50x</h3>
              <p className="text-xs lg:text-sm font-medium text-gray-700 leading-snug">Faster delivery with AI integration</p>
            </div>
            <div className="absolute bottom-8 right-4 lg:-right-8 bg-white/50 backdrop-blur-2xl border border-white/50 p-5 rounded-3xl shadow-2xl z-20 flex items-center gap-4">
              <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                 <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=200&auto=format&fit=crop" alt="project" className="w-full h-full object-cover"/>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-black leading-tight text-lg lg:text-xl">Brand Identity<br/>System</span>
                <span className="font-black text-2xl lg:text-3xl mt-1">#01</span>
                <div className="flex items-center gap-1 mt-1 lg:mt-2 text-xs font-bold bg-white px-3 py-1 rounded-full w-max shadow-sm">
                  <Star size={12} fill="black" /> 5.0
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部软件 Logo 墙 */}
      <div className="w-full max-w-[95vw] lg:max-w-[80vw] mx-auto mt-12 mb-10 overflow-hidden relative" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
        <div className="flex w-max animate-marquee-logos items-center gap-12 lg:gap-20">
          {marqueeTrack.map((skill, index) => (
            <div key={index} className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 cursor-default">
              <div className="w-6 h-6 rounded-md bg-black text-white flex items-center justify-center font-bold text-[10px]">
                {skill.substring(0, 2).toUpperCase()}
              </div>
              <span className="text-xl md:text-3xl font-black tracking-tighter text-[#111]">
                {skill}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 👉 独立出来的居中大标题区域：夹在滚动条和画廊的中间 */}
      <div className="w-full max-w-[95vw] lg:max-w-[90vw] mx-auto flex flex-col items-center text-center mt-16 mb-16 border-b border-gray-100/80 pb-16 px-4">
        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-3 text-[#111]">
          {language === 'zh' ? '精选优质作品' : 'Selected Premium Works'}
        </h2>
        <h3 className="text-sm md:text-base font-medium uppercase tracking-[0.2em] text-gray-400 italic">
           Create a visual feast
        </h3>
      </div>

      {/* 画廊板块：由于标题已经移出去了，这里只保留干净的容器和手风琴卡片 */}
      <div className="w-full max-w-[95vw] lg:max-w-[90vw] mx-auto pb-32 relative selection:bg-black selection:text-white">
        {/* 5个板块的横向手风琴容器 */}
        <div className="w-full flex flex-col lg:flex-row gap-4 h-[700px] lg:h-[500px]">
          {showcaseData.map((item, index) => (
            <div 
              key={index}
              className="group relative flex-1 lg:hover:flex-[4] hover:flex-[3] rounded-3xl overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer shadow-sm hover:shadow-2xl"
              onClick={() => onCategorySelect(Category.ALL)}
            >
              <img 
                src={item.img} 
                alt={item.titleEn} 
                className="absolute inset-0 w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-700"></div>

              <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8 flex flex-col justify-end h-full">
                <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4 mb-2 lg:mb-0 transition-all duration-700 group-hover:mb-4">
                  <span className="text-white font-black text-3xl lg:text-4xl opacity-80 group-hover:opacity-100 group-hover:text-[#ff5030] transition-colors">{item.number}</span>
                  <div className="hidden lg:block h-[2px] w-12 bg-[#ff5030] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 delay-100"></div>
                  <span className="lg:hidden text-white font-bold text-lg leading-tight">{language === 'zh' ? item.titleZh : item.titleEn}</span>
                </div>

                <div className="opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 delay-100 flex flex-col overflow-hidden max-h-0 group-hover:max-h-[200px]">
                  <div className="min-w-[250px] md:min-w-[300px]">
                    <h3 className="text-white font-bold text-2xl lg:text-3xl mb-3 mt-2 leading-tight">
                      {language === 'zh' ? item.titleZh : item.titleEn}
                    </h3>
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed hidden lg:block line-clamp-2">
                      {item.desc}
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-sm font-bold text-[#ff5030] uppercase tracking-widest">
                      Explore Project <ArrowUpRight size={16} strokeWidth={3} />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
