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

  const handleCategoryClick = (category: Category) => {
    onCategorySelect(category);
    onNavigate('portfolio');
  };

  const categoryCards = [
    {
      id: '01',
      title: language === 'zh' ? '电商视觉' : 'E-commerce',
      desc: language === 'zh' ? '高转化率的商业视觉设计与排版。' : 'High-conversion visual design.',
      category: Category.DESIGN,
      img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=400&fit=crop'
    },
    {
      id: '02',
      title: language === 'zh' ? 'AIGC 项目' : 'AIGC Projects',
      desc: language === 'zh' ? '人工智能生成内容与前沿视觉。' : 'AI-generated visual exploration.',
      category: Category.AIGC,
      img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=400&fit=crop'
    },
    {
      id: '03',
      title: language === 'zh' ? '新媒体运营' : 'New Media',
      desc: language === 'zh' ? '全平台社交媒体视觉与品牌传播。' : 'Social media visual matrix.',
      category: Category.NEW_MEDIA,
      img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=400&fit=crop'
    },
    {
      id: '04',
      title: language === 'zh' ? '商业影像' : 'Photo & Video',
      desc: language === 'zh' ? '全流程商业视频与拍摄落地。' : 'Commercial photography & video.',
      category: Category.VIDEO_PHOTO,
      img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop'
    }
  ];

  return (
    <div className="w-full bg-[#eef1f5] font-sans pb-16 relative">
      <div className="max-w-[90vw] lg:max-w-[80vw] mx-auto relative z-10 pt-8 md:pt-16">
        
        {/* 顶部 Hero 区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
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
              onClick={() => handleCategoryClick(Category.ALL)}
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
        <div className="relative z-20 -mt-32 md:-mt-20 mb-24 max-w-4xl mx-auto rounded-full p-6 md:p-8 flex flex-col md:flex-row items-center justify-around gap-6 shadow-2xl bg-[#151515] text-white">
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

        {/* 四列核心领域胶囊卡片 */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-2 text-[#111]">
                {language === 'zh' ? '为什么选择 7C?' : 'WHY BUILD'}
              </h2>
              <h3 className="text-3xl md:text-4xl font-light uppercase tracking-widest text-gray-500">
                {language === 'zh' ? '核心专业领域' : 'WITH 7C?'}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryCards.map((card) => (
              <div 
                key={card.id}
                className="flex flex-col items-center text-center p-8 rounded-[3rem] shadow-xl transition-all duration-500 hover:-translate-y-4 group bg-[#1a1a1c] text-white"
              >
                <div className="w-32 h-32 rounded-full overflow-hidden mb-8 shadow-inner relative">
                  <img src={card.img} alt={card.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                <h4 className="text-2xl font-black uppercase tracking-wide mb-4">{card.title}</h4>
                <p className="text-sm mb-10 leading-relaxed font-medium flex-grow text-gray-400">
                  {card.desc}
                </p>
                <button 
                  onClick={() => handleCategoryClick(card.category)}
                  className="w-full py-4 rounded-full font-bold text-sm tracking-widest uppercase transition-transform duration-300 group-hover:scale-105 bg-white text-black"
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
