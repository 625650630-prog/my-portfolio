import React from 'react';
import { Language, Category } from '../types';
import { CONTACT_DATA } from '../src/data/contact';
import { ArrowRight, Play, CheckCircle2, Star } from 'lucide-react';

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

  // 核心技能数据 (用于底部 Logo 墙)
  const skillsList = [
    'Photoshop', 'CorelDRAW', 'Illustrator', 'Premiere', 'After Effects', 
    'Lightroom', 'DaVinci Resolve', 'ComfyUI', 'Gemini', '剪映', '即梦', 'DeepSeek'
  ];
  const marqueeTrack = [...skillsList, ...skillsList, ...skillsList];

  return (
    // 外层纯白背景
    <div className="w-full bg-white font-sans pb-12 pt-4 md:pt-6 px-4 md:px-6">
      
      {/* 底部跑马灯 CSS */}
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

      {/* 核心灰色包裹容器：增加了 min-h-[85vh] 和 flex 居中 */}
      <div className="w-full max-w-[95vw] lg:max-w-[90vw] mx-auto bg-gradient-to-br from-[#f4f5f7] to-[#e5e7eb] rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 relative overflow-hidden shadow-sm border border-gray-100/50 min-h-[85vh] flex flex-col justify-center">
        
        {/* 👉 导航栏已被删除 */}

        {/* 主 Hero 区域内容 (左右分栏) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 relative z-20 w-full py-8 lg:py-12 lg:px-16 xl:px-32">
          
          {/* 左侧文字区：整体往右移了 */}
          <div className="lg:col-span-6 flex flex-col items-start justify-center">
            
            {/* 状态徽章 */}
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

            {/* 巨型衬线标题 */}
            <h1 className="text-7xl md:text-8xl lg:text-[11rem] font-serif text-[#111] tracking-tighter leading-none mb-6 lg:mb-10 relative">
              Design<sup className="text-5xl md:text-8xl absolute top-4 ml-1">+</sup>
            </h1>

            {/* 描述文案 */}
            <p className="text-lg md:text-xl text-gray-600 font-medium max-w-md leading-relaxed mb-10">
              {language === 'zh' 
                ? '打破常规框架，将最前沿的视觉设计与 AIGC 技术结合 — 提供无与伦比的美学深度。' 
                : 'Drive Visual Growth, And Harness Ai-Powered Content — Up To 50x Faster.'}
            </p>

            {/* 地理位置/评价区 */}
            <div className="flex items-center gap-4 mb-12 border-t border-gray-300/50 pt-8 w-full max-w-md">
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center shrink-0">
                 {/* 头像 */}
                 <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop" alt="avatar" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col text-sm font-bold text-gray-700">
                <span>{language === 'zh' ? '坐标' : 'Location'} / <Star className="inline w-3 h-3 mb-0.5" fill="currentColor"/> {contactContent.baseLabel}</span>
                <span className="text-gray-500 font-medium text-base mt-0.5">{contactContent.locationValue}</span>
              </div>
            </div>

            {/* 底部双按钮 */}
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

          {/* 右侧图片与玻璃悬浮元素区：mx-auto 居中对齐 */}
          <div className="lg:col-span-6 relative h-[500px] lg:h-[650px] w-full max-w-lg lg:max-w-[550px] mx-auto mt-10 lg:mt-0">
            
            {/* 橘红色背景底图 */}
            <div className="absolute inset-4 lg:inset-8 bg-gradient-to-br from-[#ff7a50] to-[#ff5030] rounded-[3rem] shadow-2xl overflow-hidden">
               {/* 主视觉图 */}
               <img 
                 src="https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop" 
                 alt="Main Visual" 
                 className="w-full h-full object-cover mix-blend-overlay opacity-80"
               />
            </div>

            {/* 悬浮中心播放按钮 */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-16 h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-transform z-20">
              <Play size={28} className="text-black ml-1 lg:ml-2" fill="currentColor" />
            </div>

            {/* 悬浮气泡 1 */}
            <div className="absolute top-16 right-10 lg:-left-6 lg:top-32 bg-white/90 backdrop-blur-sm px-5 py-3 rounded-full shadow-lg flex items-center gap-3 text-sm lg:text-base font-bold z-30 animate-fade-in">
              <div className="bg-[#ff5030] text-white rounded-full p-1"><CheckCircle2 size={16} /></div>
              Visual Design Done?
            </div>
            
            {/* 悬浮气泡 2 */}
            <div className="absolute top-32 right-24 lg:-left-0 lg:top-48 bg-white/90 backdrop-blur-sm px-5 py-3 rounded-full shadow-lg flex items-center gap-3 text-sm lg:text-base font-bold z-30 animate-fade-in delay-100">
              <div className="bg-blue-500 text-white rounded-full p-1"><CheckCircle2 size={16} /></div>
              AIGC Optimized!
            </div>

            {/* 右上角数据悬浮卡片 */}
            <div className="absolute top-10 right-0 lg:-right-6 bg-white/40 backdrop-blur-xl border border-white/40 p-6 rounded-3xl shadow-2xl z-20 w-44 lg:w-48">
              <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">— Efficiency</span>
              <h3 className="text-5xl font-black text-black my-2">50x</h3>
              <p className="text-xs lg:text-sm font-medium text-gray-700 leading-snug">Faster delivery with AI integration</p>
            </div>

            {/* 右下角商品/案例悬浮卡片 */}
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

      {/* 底部软件/合作品牌 Logo 墙 */}
      <div className="w-full max-w-[95vw] lg:max-w-[80vw] mx-auto mt-12 mb-8 overflow-hidden relative" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
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

      {/* 👉 全新升级：精选优质作品 Accordion 板块 */}
      <div className="mb-10 w-full relative mt-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-10 px-4 md:px-0">
          <div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-2 text-[#111]">
              {language === 'zh' ? '精选优质作品' : 'Selected Premium Works'}
            </h2>
            <h3 className="text-xl md:text-2xl font-light uppercase tracking-widest text-gray-500">
               {language === 'zh' ? 'Create a visual feast' : 'Create a visual feast'}
            </h3>
          </div>
        </div>

        {/* 外部容器 */}
        <div className="flex flex-col gap-2 w-full max-w-[95vw] lg:max-w-[85vw] mx-auto">
           {[
            {
              number: '#01',
              titleZh: 'AIGC 多模态视觉探索',
              titleEn: 'AIGC Multimodal Visual Exploration',
              desc: '结合 Stable Diffusion 与 Midjourney，生成极具商业现实感的视觉叙事。',
              concept: '探索 AI 绘画工作流，从提示词到高精商业视觉。',
              img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
            },
            {
              number: '#02',
              titleZh: '电商视觉设计系统',
              titleEn: 'E-commerce Visual Design System',
              desc: '为头部电商平台打造可扩展的视觉规范与大促氛围包装。',
              concept: '将品牌 DNA 融入电商界面，提升用户体验与转化。',
              img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop',
            },
            {
              number: '#03',
              titleZh: '新媒体动态视觉',
              titleEn: 'New Media Motion Graphics',
              desc: '使用 After Effects 与 Cinema 4D，制作充满活力的短视频动效与品牌片头。',
              concept: '让品牌“动”起来，在快节奏的社交媒体中抓住眼球。',
              img: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop',
            },
            {
              number: '#04',
              titleZh: '商业摄影与精修',
              titleEn: 'Commercial Photography & Post-Processing',
              desc: '专业的商业产品摄影与基于 DaVinci Resolve 的影视级调色。',
              concept: '光影艺术与后期技术的完美结合，呈现无与伦比的产品质感。',
              img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop',
            },
            {
              number: '#05',
              titleZh: 'UI/UX 设计与开发',
              titleEn: 'UI/UX Design & Development',
              desc: '使用 Figma 进行界面设计，并基于 React 技术栈进行前端开发。',
              concept: '从原型到部署，全流程打造极致的用户体验与功能性。',
              img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop',
            }
          ].map((block) => (
            <div 
              key={block.number}
              className="w-full bg-white rounded-3xl p-6 md:p-8 flex flex-col transition-all duration-500 overflow-hidden shadow-sm group border border-gray-100/60 h-24 md:h-28 group-hover:h-[450px]"
            >
                {/* 顶部/折叠状态显示 */}
                <div className="flex items-center justify-between mb-0 group-hover:mb-8 transition-all">
                  <div className="flex items-center gap-6">
                    <span className="font-black text-3xl md:text-4xl text-gray-300 group-hover:text-black transition-colors">{block.number}</span>
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-xl md:text-2xl text-black">{language === 'zh' ? block.titleZh : block.titleEn}</span>
                      <span className="text-sm font-medium text-gray-500 hidden md:inline">{language === 'zh' ? block.titleEn : block.titleZh}</span>
                    </div>
                  </div>
                  <button className="flex items-center gap-3 px-6 py-2.5 rounded-full font-bold text-sm bg-gray-100 text-black group-hover:bg-black group-hover:text-white transition-colors">
                    {language === 'zh' ? '查看更多' : 'View More'}
                    <ArrowRight size={16} />
                  </button>
                </div>

                {/* 展开内容 */}
                <div className="flex flex-col md:flex-row gap-8 md:gap-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto mt-4 group-hover:mt-0">
                    <div className="flex-1 px-2 md:px-0">
                        <p className="text-base md:text-lg text-gray-700 leading-relaxed font-medium mb-4">{block.desc}</p>
                        <p className="text-sm md:text-base text-gray-500">{block.concept}</p>
                    </div>
                    <div className="w-full md:w-1/2 aspect-video bg-gray-100 rounded-2xl overflow-hidden shadow-inner">
                        <img src={block.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={block.titleEn} />
                    </div>
                </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
