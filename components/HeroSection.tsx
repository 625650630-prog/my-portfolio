import React, { useState } from 'react';
import { Language, Category } from '../types';
import { ArrowRight, ChevronRight, Play } from 'lucide-react';
import { createPortal } from 'react-dom';

interface HeroSectionProps {
  onNavigate: (page: string) => void;
  onCategorySelect: (category: Category) => void;
  language: Language;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onCategorySelect, language }) => {
  const [showToast, setShowToast] = useState(false);

  // 点击底部栏跳转到对应的作品分类
  const handleCategoryClick = (category: Category) => {
    onCategorySelect(category);
    onNavigate('portfolio');
  };

  // 底部的 4 个分类入口配置
  const bottomFeatures = [
    {
      id: '01',
      title: language === 'zh' ? '电商视觉' : 'E-commerce',
      desc: language === 'zh' ? '高转化率的商业视觉设计与电商排版' : 'High-conversion commercial visual design',
      category: Category.DESIGN
    },
    {
      id: '02',
      title: language === 'zh' ? 'AIGC 项目' : 'AIGC Projects',
      desc: language === 'zh' ? '人工智能生成内容与前沿视觉探索' : 'AI-generated content and visual exploration',
      category: Category.AIGC
    },
    {
      id: '03',
      title: language === 'zh' ? '新媒体运营' : 'New Media',
      desc: language === 'zh' ? '全平台社交媒体视觉矩阵与品牌传播' : 'Social media visual matrix and brand communication',
      category: Category.NEW_MEDIA
    },
    {
      id: '04',
      title: language === 'zh' ? '商业影像' : 'Photo & Video',
      desc: language === 'zh' ? '从企划到落地的全流程商业视频与拍摄' : 'End-to-end commercial photography & videography',
      category: Category.VIDEO_PHOTO
    }
  ];

  return (
    <div className="w-full max-w-[96vw] mx-auto animate-fade-in relative z-10 mb-16">
      
      {/* 沉浸式暗黑英雄区容器 */}
      <div className="relative w-full rounded-[2rem] bg-[#0a0a0a] overflow-hidden min-h-[85vh] flex flex-col justify-between border border-white/10 shadow-2xl">
        
        {/* 背景图层：请将下面 src 里的图片链接换成你自己的帅照或背景图 */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          {/* 这里放你的右侧人物背景图 */}
          <img 
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2000&auto=format&fit=crop" 
            alt="Hero Background" 
            className="absolute top-0 right-0 h-full w-full md:w-3/4 object-cover object-right-top opacity-50 md:opacity-80"
          />
          {/* 左侧向右的黑色渐变，确保文字清晰 */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent"></div>
          {/* 底部向上的黑色渐变，融合底部栏 */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0a0a0a] to-transparent"></div>
        </div>

        {/* 主体内容区 (上半部分) */}
        <div className="relative z-10 px-8 py-16 md:px-16 md:py-24 flex flex-col justify-center flex-grow">
          
          {/* 顶部小标签 */}
          <div className="flex items-center gap-2 text-gray-400 font-mono text-sm tracking-widest uppercase mb-6 md:mb-8">
            <span className="text-blue-500">«</span>
            {language === 'zh' ? '多元视觉设计师 & 开发者' : 'Multidisciplinary Designer & Dev'}
            <span className="text-blue-500">»</span>
          </div>

          {/* 巨型标题 */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-8 tracking-tighter leading-[0.9]">
            Silence <br /> 7C.
          </h1>

          {/* 按钮组 */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 mt-4">
            {/* 蓝色主按钮 -> 跳转全部作品 */}
            <button 
              onClick={() => {
                onCategorySelect(Category.ALL);
                onNavigate('portfolio');
              }}
              className="bg-blue-600 hover:bg-blue-500 text-white rounded-full pl-6 pr-2 py-2 flex items-center gap-4 transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(37,99,235,0.3)]"
            >
              <span className="font-bold text-lg">{language === 'zh' ? '查看精选作品' : 'View Selected Works'}</span>
              <div className="bg-white text-blue-600 rounded-full p-2">
                <ArrowRight size={20} strokeWidth={3} />
              </div>
            </button>

            {/* 深灰色次按钮 -> 跳转联系页面 */}
            <button 
              onClick={() => onNavigate('contact')}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/10 rounded-full px-8 py-4 flex items-center gap-3 transition-all duration-300"
            >
              <span className="font-bold text-lg">{language === 'zh' ? '取得联系' : 'Get in Touch'}</span>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* 底部 4 列网格分类栏 (完美复刻参考图) */}
        <div className="relative z-10 w-full border-t border-white/10 bg-black/40 backdrop-blur-xl">
          {/* 进度条样式的细线 */}
          <div className="absolute top-0 left-0 h-[1px] bg-white/40 w-1/4"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {bottomFeatures.map((feature, index) => (
              <div 
                key={feature.id}
                onClick={() => handleCategoryClick(feature.category)}
                className={`p-6 md:p-8 cursor-pointer group transition-all duration-300 hover:bg-white/5 
                  ${index !== bottomFeatures.length - 1 ? 'border-b md:border-b-0 lg:border-r border-white/10' : ''}
                `}
              >
                {/* 序号与标题 */}
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-7 h-7 rounded-full border border-gray-600 text-gray-400 flex items-center justify-center text-xs font-mono font-bold group-hover:border-blue-500 group-hover:text-blue-500 transition-colors">
                    {feature.id}
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                </div>
                {/* 描述 */}
                <p className="text-sm text-gray-400 font-medium leading-relaxed group-hover:text-gray-300 transition-colors">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 提示气泡 */}
      {showToast && createPortal(
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-white text-black px-8 py-4 rounded-full shadow-2xl z-[100] animate-fade-in font-bold text-xl">
           {language === 'zh' ? '敬请期待... 🚀' : 'Coming soon... 🚀'}
        </div>,
        document.body
      )}

    </div>
  );
};
