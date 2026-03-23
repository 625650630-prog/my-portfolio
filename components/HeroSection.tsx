import React, { useState } from 'react';
import { Language, Category } from '../types';
import { CONTACT_DATA } from '../src/data/contact';
import { ArrowRight, MapPin, Mail, Sparkles, Moon, Sun } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (page: string) => void;
  onCategorySelect: (category: Category) => void;
  language: Language;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onCategorySelect, language }) => {
  const contactContent = CONTACT_DATA[language];
  
  // 👉 核心：黑白交替状态控制
  const [isDark, setIsDark] = useState(false);

  // 动态生成黑白主题的 Tailwind 类名
  const themeBg = isDark ? 'bg-[#0f0f11]' : 'bg-[#eef1f5]';
  const themeText = isDark ? 'text-white' : 'text-[#111111]';
  const elementBg = isDark ? 'bg-white' : 'bg-[#151515]';
  const elementText = isDark ? 'text-black' : 'text-white';
  const cardBg = isDark ? 'bg-white' : 'bg-[#1a1a1c]';
  const cardText = isDark ? 'text-[#111]' : 'text-white';
  const cardBtnBg = isDark ? 'bg-[#111] text-white' : 'bg-white text-black';

  // 点击跳转逻辑
  const handleCategoryClick = (category: Category) => {
    onCategorySelect(category);
    onNavigate('portfolio');
  };

  // 4 个纵向分类卡片数据 (带有参考图风格的圆形配图)
  const categoryCards = [
    {
      id: '01',
      title: language === 'zh' ? '电商视觉' : 'E-commerce',
      desc: language === 'zh' ? '高转化率的商业视觉设计与电商排版。' : 'High-conversion commercial visual design.',
      category: Category.DESIGN,
      img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=400&fit=crop'
    },
    {
      id: '02',
      title: language === 'zh' ? 'AIGC 项目' : 'AIGC Projects',
      desc: language === 'zh' ? '人工智能生成内容与前沿视觉探索。' : 'AI-generated content and visual exploration.',
      category: Category.AIGC,
      img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=400&fit=crop'
    },
    {
      id: '03',
      title: language === 'zh' ? '新媒体运营' : 'New Media',
      desc: language === 'zh' ? '全平台社交媒体视觉矩阵与品牌传播。' : 'Social media visual matrix and branding.',
      category: Category.NEW_MEDIA,
      img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=400&fit=crop'
    },
    {
      id: '04',
      title: language === 'zh' ? '商业影像' : 'Photo & Video',
      desc: language === 'zh' ? '从企划到落地的全流程商业视频与拍摄。' : 'End-to-end commercial photography & videography.',
      category: Category.VIDEO_PHOTO,
      img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop'
    }
  ];

  return (
    <div className={`w-full min-h-screen transition-colors duration-700 ease-in-out ${themeBg} overflow-hidden font-sans pt-24 pb-20 relative`}>
      
      {/* 👉 黑白切换按钮 (悬浮在右上角) */}
      <button 
        onClick={() => setIsDark(!isDark)}
        className={`absolute top-6 right-6 md:top-10 md:right-10 z-50 p-4 rounded-full shadow-2xl transition-all duration-500 hover:scale-110 flex items-center gap-2 font-bold
          ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
        <span className="hidden md:inline">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
      </button>

      {/* 装饰性背景曲线 (SVG) */}
      <svg className={`absolute top-0 left-0 w-full h-full pointer-events-none transition-opacity duration-700 ${isDark ? 'opacity-10' : 'opacity-5'}`} viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0,50 Q25,20 50,50 T100,50" fill="none" stroke="currentColor" strokeWidth="0.2" className={themeText} />
        <path d="M0,80 Q25,110 50,80 T100,80" fill="none" stroke="currentColor" strokeWidth="0.2" className={themeText} />
      </svg>

      <div className="max-w-[90vw] lg:max-w-[80vw] mx-auto relative z-10">
        
        {/* 第一部分：Hero 英雄区 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          
          {/* 左侧文字区 */}
          <div className="flex flex-col items-start z-10">
            <h1 className={`text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.05] mb-6 transition-colors duration-700 ${themeText}`}>
              {language === 'zh' ? (
                <>深潜视觉<br/>与体验的<br/><span className="text-gray-400">无尽边界</span></>
              ) : (
                <>Dive Into<br/>The Depths Of<br/><span className="text-gray-400">Visual Design</span></>
              )}
            </h1>
            <p className={`text-lg md:text-xl font-medium max-w-lg mb-10 transition-colors duration-700 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {language === 'zh' 
                ? '打破常规框架。将最前沿的电商视觉、AIGC技术与多元设计理念结合，提供无与伦比的商业现实感与美学深度。' 
                : 'Break the barriers of the physical world. Combining cutting-edge E-commerce visuals, AIGC, and multiversal design to deliver unparalleled commercial realism.'}
            </p>
            
            {/* 胶囊主按钮 */}
            <button 
              onClick={() => handleCategoryClick(Category.ALL)}
              className={`flex items-center gap-4 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl ${elementBg} ${elementText}`}
            >
              {language === 'zh' ? '探索作品世界' : 'EXPLORE WORKS'}
              <ArrowRight size={20} />
            </button>
          </div>

          {/* 右侧超大异形图片 */}
          <div className="relative w-full aspect-square lg:aspect-[4/5] rounded-t-[50%] rounded-b-[2rem] overflow-hidden shadow-2xl transition-transform duration-700 hover:scale-[1.02]">
            <img 
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop" 
              alt="Hero Concept" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* 叠加一层渐变让图片更融入背景 */}
            <div className={`absolute inset-0 transition-colors duration-700 ${isDark ? 'bg-black/20' : 'bg-transparent'}`}></div>
          </div>
        </div>

        {/* 第二部分：悬浮联系方式条 (参考图中心的横向胶囊) */}
        <div className={`relative z-20 -mt-32 md:-mt-20 mb-24 max-w-4xl mx-auto rounded-full p-6 md:p-8 flex flex-col md:flex-row items-center justify-around gap-6 shadow-2xl transition-colors duration-700 ${elementBg} ${elementText}`}>
          
          {/* Location */}
          <div className="flex items-center gap-4 cursor-pointer group">
            <div className={`p-3 rounded-full transition-colors ${isDark ? 'bg-gray-100 text-black' : 'bg-gray-800 text-white'}`}>
              <MapPin size={24} />
            </div>
            <div>
              <p className="text-sm font-bold opacity-70 mb-1">{contactContent.baseLabel}</p>
              <p className="font-bold text-lg group-hover:underline decoration-2 underline-offset-4">{contactContent.locationValue}</p>
            </div>
          </div>

          {/* Divider */}
          <div className={`hidden md:block w-px h-12 opacity-20 ${isDark ? 'bg-black' : 'bg-white'}`}></div>

          {/* Contact */}
          <div onClick={() => onNavigate('contact')} className="flex items-center gap-4 cursor-pointer group">
            <div className={`p-3 rounded-full transition-colors ${isDark ? 'bg-gray-100 text-black' : 'bg-gray-800 text-white'}`}>
              <Mail size={24} />
            </div>
            <div>
              <p className="text-sm font-bold opacity-70 mb-1">{language === 'zh' ? '取得联系' : 'Send a Message'}</p>
              <p className="font-bold text-lg group-hover:underline decoration-2 underline-offset-4">{contactContent.contactLabel}</p>
            </div>
          </div>
        </div>

        {/* 第三部分：核心分类卡片矩阵 (复刻参考图的四个立柱卡片) */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className={`text-4xl md:text-5xl font-black uppercase tracking-tight mb-2 transition-colors duration-700 ${themeText}`}>
                {language === 'zh' ? '为什么选择 7C?' : 'WHY BUILD'}
              </h2>
              <h3 className={`text-3xl md:text-4xl font-light uppercase tracking-widest transition-colors duration-700 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {language === 'zh' ? '核心专业领域' : 'WITH 7C?'}
              </h3>
            </div>
            <p className={`max-w-md mt-6 md:mt-0 font-medium transition-colors duration-700 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {language === 'zh' 
                ? '解锁多元视觉的真正潜力。提供完整、无缝的视觉生态系统。' 
                : 'Unlock the true potential of multiversal design with a complete, frictionless ecosystem.'}
            </p>
          </div>

          {/* 4 个胶囊形状的卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryCards.map((card) => (
              <div 
                key={card.id}
                className={`flex flex-col items-center text-center p-8 rounded-[3rem] shadow-xl transition-all duration-500 hover:-translate-y-4 group ${cardBg} ${cardText}`}
              >
                {/* 内部圆形图片 */}
                <div className="w-32 h-32 rounded-full overflow-hidden mb-8 shadow-inner relative">
                  <img src={card.img} alt={card.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                
                <h4 className="text-2xl font-black uppercase tracking-wide mb-4">{card.title}</h4>
                <p className={`text-sm mb-10 leading-relaxed font-medium flex-grow ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
                  {card.desc}
                </p>

                {/* 卡片内的跳转按钮 */}
                <button 
                  onClick={() => handleCategoryClick(card.category)}
                  className={`w-full py-4 rounded-full font-bold text-sm tracking-widest uppercase transition-transform duration-300 group-hover:scale-105 ${cardBtnBg}`}
                >
                  {language === 'zh' ? '查看项目' : 'TRY IT NOW'}
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
