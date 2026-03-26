import React from 'react';
import { Language, Category } from '../types';
import { CONTACT_DATA } from '../src/data/contact';
import { ArrowRight, MapPin, Mail, Zap } from 'lucide-react';

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

  // 技能栈数据
  const skills = [
    'Photoshop', 'CorelDRAW', 'Illustrator', 'Premiere', 'After Effects', 
    'Lightroom', 'DaVinci Resolve', 'ComfyUI', 'Gemini', '剪映', '即梦', 'DeepSeek'
  ];

  // 复制4份，用于无限无缝滚动
  const marqueeSkills = [...skills, ...skills, ...skills, ...skills];

  return (
    // 极致暗黑底色，全局替换选择文本颜色为荧光绿
    <div className="w-full bg-[#050505] font-sans relative overflow-hidden text-white selection:bg-[#ccff00] selection:text-black">
      
      {/* 注入速度感滚动的 CSS 动画 */}
      <style>
        {`
          @keyframes marquee-left {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marquee-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0%); }
          }
          .animate-marquee-racing {
            animation: marquee-left 25s linear infinite;
          }
          .animate-marquee-racing-reverse {
            animation: marquee-right 30s linear infinite;
          }
        `}
      </style>

      {/* 极客风背景网格 */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ backgroundImage: 'linear-gradient(#ccff00 1px, transparent 1px), linear-gradient(90deg, #ccff00 1px, transparent 1px)', backgroundSize: '60px 60px' }}
      ></div>

      <div className="max-w-[95vw] lg:max-w-[90vw] mx-auto relative z-10 pt-20 md:pt-32 pb-10">
        
        {/* 顶部 Hero 主区域：左右分割结构 */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          {/* 左侧：巨型文字排版区 */}
          <div className="w-full lg:w-[55%] flex flex-col items-start relative z-20">
            
            {/* 顶部赛车风小标签 */}
            <div className="inline-block px-4 py-1.5 border border-[#ccff00] text-[#ccff00] font-mono text-xs font-bold tracking-widest uppercase mb-6 rounded-full shadow-[0_0_15px_rgba(204,255,0,0.2)]">
              {language === 'zh' ? '多模态视觉设计师' : 'Multimodal Visual Designer'}
            </div>
            
            {/* 核心巨型标题：描边与实心结合 */}
            <h1 className="text-[20vw] lg:text-[11vw] font-black uppercase leading-[0.8] tracking-tighter italic">
              SILENCE<br/>
              <span className="text-transparent" style={{ WebkitTextStroke: '2px #ccff00' }}>7C.</span>
            </h1>

            <p className="mt-8 text-lg md:text-xl font-medium text-gray-400 max-w-lg leading-relaxed mix-blend-lighten">
              {language === 'zh' 
                ? '打破常规框架，将最前沿的视觉设计与AIGC技术结合。为品牌注入极致性能与无与伦比的现实感。' 
                : 'Break the barriers. Combining cutting-edge visuals and AIGC to deliver ultimate performance and commercial realism.'}
            </p>

            {/* 👉 你要求的 Welcome 坐标位置！改成了硬核的赛车仪表盘风格 */}
            <div className="mt-8 flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 p-2 pr-6 rounded-full w-max shadow-xl">
              <div className="bg-[#ccff00] text-black p-3 rounded-full">
                <MapPin size={18} strokeWidth={3} />
              </div>
              <div className="flex flex-col uppercase tracking-widest justify-center">
                <span className="text-[9px] text-gray-400 font-bold mb-0.5">Welcome!</span>
                <span className="text-sm text-white font-black leading-none">{contactContent.locationValue}</span>
              </div>
            </div>

            {/* Lando Norris 风格的倾斜进攻性双按钮 */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 mt-12">
              <button 
                onClick={handleExploreClick} 
                className="group flex items-center gap-4 px-8 py-4 bg-[#ccff00] text-black rounded-full font-black text-lg transition-all hover:scale-105 uppercase tracking-wide skew-x-[-10deg] shadow-[0_0_30px_rgba(204,255,0,0.2)]"
              >
                <span className="skew-x-[10deg]">{language === 'zh' ? '探索作品世界' : 'EXPLORE WORKS'}</span>
                <ArrowRight size={24} className="skew-x-[10deg] transition-transform group-hover:translate-x-2" strokeWidth={3} />
              </button>

              <button 
                onClick={() => onNavigate('contact')} 
                className="flex items-center gap-3 px-8 py-4 bg-transparent text-white border-2 border-white/20 rounded-full font-black text-lg transition-all hover:border-[#ccff00] hover:text-[#ccff00] uppercase tracking-wide skew-x-[-10deg]"
              >
                <span className="skew-x-[10deg]">{language === 'zh' ? '合作与联系' : 'GET IN TOUCH'}</span>
                <Mail size={20} className="skew-x-[10deg]" />
              </button>
            </div>
          </div>

          {/* 右侧：赛车头盔/超燃视觉图蒙版 */}
          <div className="w-full lg:w-[40%] relative mt-10 lg:mt-0">
            {/* 不规则的异形容器 */}
            <div className="w-full aspect-[3/4] lg:aspect-[4/5] overflow-hidden rounded-[2rem] lg:rounded-tl-[8rem] lg:rounded-br-[8rem] border border-white/10 relative z-10 shadow-2xl group">
              {/* 👉 请将这里替换成你最炸裂的一张作品图或个人酷照 */}
              <img 
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105" 
                alt="Hero Concept" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80"></div>
            </div>
            
            {/* 悬浮属性战力表 */}
            <div className="absolute -bottom-6 -left-4 lg:-left-12 bg-white text-black px-6 py-5 rounded-2xl z-20 shadow-2xl flex items-center gap-4 border-4 border-[#050505] transform -rotate-3 hover:rotate-0 transition-transform">
              <Zap size={32} fill="#ccff00" className="text-[#ccff00]" />
              <div className="flex flex-col">
                <span className="text-3xl font-black leading-none">ALL IN</span>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Multi-Visual</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 👉 Lando Norris 灵魂元素：巨型倾斜跑马灯轨道 (替换了原本文静的 Logo 墙) */}
      <div className="mt-16 md:mt-24 w-full relative z-20">
        
        {/* 轨道 1：荧光绿底黑字，向左疯狂滚动 */}
        <div className="relative w-full overflow-hidden py-6 transform -skew-y-3 bg-[#ccff00] shadow-2xl shadow-[#ccff00]/20">
          <div className="flex w-max animate-marquee-racing items-center gap-10">
            {marqueeSkills.map((skill, index) => (
              <React.Fragment key={`r1-${index}`}>
                <span className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-[#050505]">
                  {skill}
                </span>
                <div className="w-4 h-4 bg-[#050505] rounded-full"></div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 轨道 2：黑底荧光绿描边，向右缓慢交错滚动 */}
        <div className="relative w-full overflow-hidden py-4 transform -skew-y-3 bg-[#050505] border-y border-[#ccff00]/30 -mt-1 z-[-1]">
          <div className="flex w-max animate-marquee-racing-reverse items-center gap-10">
            {marqueeSkills.map((skill, index) => (
              <React.Fragment key={`r2-${index}`}>
                <span 
                  className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-transparent" 
                  style={{ WebkitTextStroke: '1px #ccff00' }}
                >
                  {skill}
                </span>
                <span className="text-[#ccff00]">✦</span>
              </React.Fragment>
            ))}
          </div>
        </div>

      </div>
      
      {/* 底部用于无缝衔接下方白色作品区的倾斜切割遮罩 */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-[#eef1f5] transform skew-y-2 translate-y-8 z-30"></div>
    </div>
  );
};
