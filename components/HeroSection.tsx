import React from 'react';
import { Language, Category } from '../types';
import { CONTACT_DATA } from '../src/data/contact';
import { ArrowRight, Instagram, Twitter, Settings } from 'lucide-react';

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

  return (
    // 外层容器：浅灰/白色背景，给内部的 Hero 卡片留出呼吸空间
    <div className="w-full bg-[#f8f9fa] font-sans pb-20 pt-4 md:pt-8 px-4 md:px-8">
      
      {/* 核心 Hero 卡片：大圆角、溢出隐藏、相对定位 */}
      <div className="relative w-full h-[85vh] min-h-[700px] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl group">
        
        {/* 背景图与渐变遮罩 */}
        <img 
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2500&auto=format&fit=crop" 
          alt="Hero Background" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        {/* 加一层极淡的渐变，保证文字可读性，同时维持通透感 */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-black/30 mix-blend-multiply"></div>

        {/* 👉 完美复刻：内嵌悬浮黑色胶囊导航 (Pill Navbar) */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-50 w-max hidden md:flex items-center bg-black/90 backdrop-blur-md rounded-full p-2 shadow-2xl border border-white/10">
          <div className="text-white font-black text-lg px-6 tracking-widest italic">
            SILENCE 7C<span className="text-gray-400 font-normal text-xs align-top ml-1">®</span>
          </div>
          <ul className="flex items-center gap-8 px-8 text-sm font-medium text-gray-300">
            <li className="hover:text-white cursor-pointer transition-colors" onClick={() => onNavigate('home')}>
              {language === 'zh' ? '首页' : 'Home'}
            </li>
            <li className="hover:text-white cursor-pointer transition-colors" onClick={handleExploreClick}>
              {language === 'zh' ? '精选作品' : 'Portfolios'}
            </li>
            <li className="hover:text-white cursor-pointer transition-colors" onClick={() => onCategorySelect(Category.DESIGN)}>
              {language === 'zh' ? '服务范围' : 'Services'}
            </li>
          </ul>
          <button 
            onClick={() => onNavigate('contact')}
            className="bg-white text-black font-bold text-sm px-6 py-2.5 rounded-full hover:bg-gray-200 transition-colors"
          >
            {language === 'zh' ? '取得联系' : 'Get In Touch'}
          </button>
        </div>

        {/* 四个角落的摄影机取景框角标 ⌜ ⌝ ⌞ ⌟ */}
        <div className="absolute top-8 left-8 md:top-12 md:left-12 w-8 h-8 border-t-[1.5px] border-l-[1.5px] border-white/40 rounded-tl-lg"></div>
        <div className="absolute top-8 right-8 md:top-12 md:right-12 w-8 h-8 border-t-[1.5px] border-r-[1.5px] border-white/40 rounded-tr-lg"></div>
        <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 w-8 h-8 border-b-[1.5px] border-l-[1.5px] border-white/40 rounded-bl-lg"></div>
        <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 w-8 h-8 border-b-[1.5px] border-r-[1.5px] border-white/40 rounded-br-lg"></div>

        {/* 右上角设置图标 */}
        <div className="absolute top-10 right-10 md:top-14 md:right-14 text-white/50 hover:text-white cursor-pointer transition-colors hidden md:block">
          <Settings size={20} />
        </div>

        {/* 主内容区：排版布局 */}
        <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-center">
          
          {/* 左侧大标题与描述 */}
          <div className="max-w-3xl mt-20 md:mt-0">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-white/80"></span>
              <span className="text-white/80 text-sm font-medium tracking-wide">
                {language === 'zh' ? '多元视觉设计机构' : 'Creative Design Agency'}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-light text-white leading-[1.1] tracking-tight mb-6">
              {language === 'zh' ? (
                <>打破常规框架<br /><span className="font-medium">重塑视觉体验</span></>
              ) : (
                <>Professional Creative<br /><span className="font-medium">Photography & Design</span></>
              )}
            </h1>
          </div>

          {/* 右侧悬浮文案 (居中偏右) */}
          <div className="absolute right-8 md:right-24 top-1/2 transform -translate-y-1/2 max-w-sm hidden lg:block text-right">
            <p className="text-white/80 text-lg font-light leading-relaxed">
              {language === 'zh' 
                ? '将最前沿的视觉设计、AIGC技术与多元理念结合，提供无与伦比的商业现实感与美学深度。' 
                : 'Contemporary architecture, prime locations, and upscale home design to inspire your next journey.'}
            </p>
          </div>

          {/* 左下角：玻璃拟物化卡片 (Glassmorphism) */}
          <div className="absolute bottom-16 left-8 md:left-16 flex items-center gap-6">
            <div className="w-24 h-28 md:w-32 md:h-40 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 overflow-hidden relative shadow-2xl cursor-pointer hover:bg-white/20 transition-colors flex flex-col">
               {/* 这里放一个小头像或作品缩略图 */}
               <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=200&h=200&fit=crop" className="w-full h-full object-cover opacity-80 mix-blend-overlay" alt="thumbnail" />
               {/* 卡片左侧的装饰性圆点指示器 */}
               <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex flex-col gap-1.5 bg-black/30 p-1.5 rounded-full backdrop-blur-sm">
                 <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                 <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
                 <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
                 <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
                 <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
               </div>
            </div>
          </div>

          {/* 右下角：社交信任背书 */}
          <div className="absolute bottom-16 right-8 md:right-16 flex flex-col items-end gap-3 text-white">
            <p className="text-sm font-medium opacity-80">{language === 'zh' ? '探索更多灵感' : 'Trusted by 25,000+ clients'}</p>
            <div className="flex gap-4">
               <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 cursor-pointer transition-colors">
                 <Instagram size={16} />
               </div>
               <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 cursor-pointer transition-colors">
                 <Twitter size={16} />
               </div>
            </div>
          </div>

        </div>
      </div>

      {/* 👉 Hero 卡片下方的区域：平滑过渡到服务介绍 */}
      <div className="w-full max-w-4xl mx-auto mt-24 mb-10 text-center flex flex-col items-center">
        <span className="px-4 py-1 rounded-full border border-gray-200 text-gray-500 text-sm font-medium mb-6 uppercase tracking-widest">
           {language === 'zh' ? '核心服务' : 'Services'}
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#111] tracking-tight mb-6">
          {language === 'zh' ? '今天我能为您提供什么帮助？' : 'How can I assist you today?'}
        </h2>
        <p className="text-gray-500 text-lg md:text-xl font-light max-w-2xl leading-relaxed">
           {language === 'zh' 
             ? '我专注于将您的抽象概念转化为具有商业价值与美学深度的视觉表达，覆盖摄影、UI/UX与AIGC等多个领域。' 
             : 'I transform your ideas into captivating images, focusing on creativity and expert use of light.'}
        </p>
      </div>

    </div>
  );
};
