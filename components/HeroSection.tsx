import React from 'react';
import { Language, Category } from '../types';
import { CONTACT_DATA } from '../src/data/contact';
import { ArrowRight, Play, CheckCircle2, Star, MapPin } from 'lucide-react';

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

      {/* 核心灰色包裹容器 (复刻参考图的浅灰质感) */}
      <div className="w-full max-w-[95vw] lg:max-w-[90vw] mx-auto bg-gradient-to-br from-[#f4f5f7] to-[#e5e7eb] rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 relative overflow-hidden shadow-sm border border-gray-100/50">
        
        {/* 👉 顶部导航栏 (完美复刻参考图) */}
        <nav className="flex items-center justify-between relative z-20">
          {/* 左侧 Logo */}
          <div className="flex items-center gap-2 font-bold text-[#111] text-lg cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="w-4 h-4 bg-black rounded-sm transform rotate-45 flex-shrink-0"></div>
            <span>/ SILENCE7C.top</span>
          </div>

          {/* 中间链接 (PC端显示) */}
          <ul className="hidden lg:flex items-center gap-8 text-sm font-semibold text-gray-600">
            <li className="hover:text-black cursor-pointer transition-colors" onClick={() => onCategorySelect(Category.ALL)}>
              {language === 'zh' ? '作品' : 'Portfolios'} <span className="text-gray-300 mx-2">.</span>
            </li>
            <li className="hover:text-black cursor-pointer transition-colors" onClick={() => onCategorySelect(Category.DESIGN)}>
              {language === 'zh' ? '设计' : 'Design'} <span className="text-gray-300 mx-2">.</span>
            </li>
            <li className="hover:text-black cursor-pointer transition-colors" onClick={() => onCategorySelect(Category.AIGC)}>
              {language === 'zh' ? 'AIGC探索' : 'AIGC'} <span className="text-gray-300 mx-2">.</span>
            </li>
            <li className="hover:text-black cursor-pointer transition-colors" onClick={() => onCategorySelect(Category.VIDEO_PHOTO)}>
              {language === 'zh' ? '商业影像' : 'Photography'}
            </li>
          </ul>

          {/* 右侧操作区 */}
          <div className="flex items-center gap-6">
            <span className="hidden md:block text-sm font-bold text-gray-600 hover:text-black cursor-pointer transition-colors">
              {language === 'zh' ? '了解更多' : 'Log in'}
            </span>
            <button 
              onClick={() => onNavigate('contact')}
              className="text-sm font-bold border-2 border-black rounded-full px-6 py-2 hover:bg-black hover:text-white transition-all duration-300"
            >
              {language === 'zh' ? '立即合作 - 取得联系' : 'Get it Now - Contact'}
            </button>
          </div>
        </nav>

        {/* 👉 主 Hero 区域内容 (左右分栏) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mt-16 md:mt-24 relative z-20">
          
          {/* 左侧文字区 */}
          <div className="lg:col-span-6 flex flex-col items-start justify-center">
            
            {/* 状态徽章 */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white">
                <span className="font-serif italic text-lg pr-1">S</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-black leading-tight">100+ Projects</span>
                <span className="text-sm text-gray-500 font-medium underline decoration-gray-300 underline-offset-4 cursor-pointer hover:text-black">
                  {language === 'zh' ? '查看成功案例' : 'Read Our Success Stories'}
                </span>
              </div>
            </div>

            {/* 巨型衬线标题 (复刻 Grow+ 效果) */}
            <h1 className="text-7xl md:text-8xl lg:text-[10rem] font-serif text-[#111] tracking-tighter leading-none mb-6 relative">
              Design<sup className="text-5xl md:text-7xl absolute top-4 ml-1">+</sup>
            </h1>

            {/* 描述文案 */}
            <p className="text-lg md:text-xl text-gray-600 font-medium max-w-md leading-relaxed mb-8">
              {language === 'zh' 
                ? '打破常规框架，将最前沿的视觉设计与 AIGC 技术结合 — 提供无与伦比的美学深度。' 
                : 'Drive Visual Growth, And Harness Ai-Powered Content — Up To 50x Faster.'}
            </p>

            {/* 地理位置/评价区 */}
            <div className="flex items-center gap-4 mb-10 border-t border-gray-300/50 pt-6 w-full max-w-md">
              <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                 {/* 你的小头像放这里 */}
                 <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" alt="avatar" />
              </div>
              <div className="flex flex-col text-sm font-bold text-gray-700">
                <span>{language === 'zh' ? '坐标' : 'Location'} / <Star className="inline w-3 h-3 mb-0.5" fill="currentColor"/> {contactContent.baseLabel}</span>
                <span className="text-gray-500 font-medium">{contactContent.locationValue}</span>
              </div>
            </div>

            {/* 底部双按钮 */}
            <div className="flex items-center gap-6">
              <button 
                onClick={handleExploreClick}
                className="bg-black text-white px-8 py-4 rounded-full font-bold text-sm transition-transform hover:scale-105 shadow-xl"
              >
                {language === 'zh' ? '探索精选作品' : 'Explore Works'}
              </button>
              <button 
                onClick={() => onNavigate('contact')}
                className="font-bold text-sm text-[#111] hover:text-gray-500 transition-colors flex items-center gap-2 group"
              >
                {language === 'zh' ? '查看服务报价' : 'Our Pricing'}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* 右侧图片与玻璃悬浮元素区 */}
          <div className="lg:col-span-6 relative h-[500px] lg:h-auto w-full max-w-lg mx-auto lg:mr-0 mt-10 lg:mt-0">
            
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
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-transform z-20">
              <Play size={24} className="text-black ml-1" fill="currentColor" />
            </div>

            {/* 悬浮气泡 1 */}
            <div className="absolute top-16 right-10 lg:-left-10 lg:top-24 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-bold z-30 animate-fade-in">
              <div className="bg-[#ff5030] text-white rounded-full p-0.5"><CheckCircle2 size={14} /></div>
              Visual Design Done?
            </div>
            
            {/* 悬浮气泡 2 */}
            <div className="absolute top-28 right-24 lg:-left-4 lg:top-36 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-bold z-30 animate-fade-in delay-100">
              <div className="bg-blue-500 text-white rounded-full p-0.5"><CheckCircle2 size={14} /></div>
              AIGC Optimized!
            </div>

            {/* 右上角数据悬浮卡片 */}
            <div className="absolute top-10 right-0 lg:-right-6 bg-white/40 backdrop-blur-xl border border-white/40 p-5 rounded-3xl shadow-2xl z-20 w-40">
              <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">— Efficiency</span>
              <h3 className="text-4xl font-black text-black my-1">50x</h3>
              <p className="text-xs font-medium text-gray-700 leading-snug">Faster delivery with AI integration</p>
            </div>

            {/* 右下角商品/案例悬浮卡片 */}
            <div className="absolute bottom-8 right-4 lg:-right-8 bg-white/50 backdrop-blur-2xl border border-white/50 p-4 rounded-3xl shadow-2xl z-20 flex items-center gap-4">
              <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                 <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=200&auto=format&fit=crop" alt="project" className="w-full h-full object-cover"/>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-black leading-tight text-lg">Brand Identity<br/>System</span>
                <span className="font-black text-xl mt-1">#01</span>
                <div className="flex items-center gap-1 mt-1 text-xs font-bold bg-white px-2 py-0.5 rounded-full w-max">
                  <Star size={10} fill="black" /> 5.0
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 👉 底部软件/合作品牌 Logo 墙 */}
      <div className="w-full max-w-[95vw] lg:max-w-[80vw] mx-auto mt-12 mb-8 overflow-hidden relative" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
        <div className="flex w-max animate-marquee-logos items-center gap-12 lg:gap-20">
          {marqueeTrack.map((skill, index) => (
            <div key={index} className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 cursor-default">
              {/* 为了模仿企业 Logo 风格，这里使用一个统一的小符号加黑体文字 */}
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

    </div>
  );
};
