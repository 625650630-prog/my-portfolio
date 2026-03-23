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

  // 点击探索全部作品
  const handleExploreClick = () => {
    onCategorySelect(Category.ALL);
    onNavigate('portfolio');
  };

  // 技能栈数据配置
  const skillsList = [
    { name: 'Photoshop', abbr: 'Ps', desc: language === 'zh' ? '高级图像处理与精修' : 'Advanced Image Editing' },
    { name: 'CorelDRAW', abbr: 'Cd', desc: language === 'zh' ? '专业矢量图形与排版' : 'Vector Graphics & Layout' },
    { name: 'Illustrator', abbr: 'Ai', desc: language === 'zh' ? '矢量插画与视觉设计' : 'Vector Illustration' },
    { name: 'Premiere', abbr: 'Pr', desc: language === 'zh' ? '专业级视频剪辑制作' : 'Professional Video Editing' },
    { name: 'After Effects', abbr: 'Ae', desc: language === 'zh' ? '动态视觉与高级特效' : 'Motion Graphics & VFX' },
    { name: 'Lightroom', abbr: 'Lr', desc: language === 'zh' ? '商业级色彩校正' : 'Commercial Color Grading' },
    { name: 'DaVinci Resolve', abbr: 'Dv', desc: language === 'zh' ? '影视级调色与后期' : 'Cinematic Color & Post' },
    { name: 'ComfyUI', abbr: 'Cu', desc: language === 'zh' ? '节点式 AI 绘画工作流' : 'Node-based AI Workflows' },
    { name: 'Gemini', abbr: 'Gm', desc: language === 'zh' ? '多模态大模型开发助手' : 'Multimodal AI Assistant' },
    { name: '剪映', abbr: '剪', desc: language === 'zh' ? '高效短视频创作与包装' : 'Short Video Creation' },
    { name: '即梦', abbr: '梦', desc: language === 'zh' ? 'AI 视频与图像跨模态生成' : 'AI Video & Image Gen' },
    { name: 'DeepSeek', abbr: 'Ds', desc: language === 'zh' ? '大语言模型提示词与应用' : 'LLM Prompting & Apps' }
  ];

  // 复制一份数据，用于实现无缝首尾相连的滚动
  const marqueeSkills = [...skillsList, ...skillsList];

  return (
    <div className="w-full bg-[#eef1f5] font-sans pb-16 relative overflow-hidden">
      
      {/* 注入滚动动画的 CSS */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 40s linear infinite;
          }
          .animate-marquee:hover {
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

        {/* 👉 全新升级：横向滚动技能墙 */}
        <div className="mb-10 w-full">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-2 text-[#111]">
                {language === 'zh' ? '核心技能栈' : 'CORE SKILLS'}
              </h2>
              <h3 className="text-3xl md:text-4xl font-light uppercase tracking-widest text-gray-500">
                {language === 'zh' ? '设计与技术驱动' : 'TECH & DESIGN'}
              </h3>
            </div>
          </div>

          {/* 滚动容器 (两端带有渐变遮罩，让滚动显得更自然) */}
          <div 
            className="relative w-full overflow-hidden" 
            style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}
          >
            <div className="flex gap-4 lg:gap-6 w-max animate-marquee pb-4 pt-2">
              {marqueeSkills.map((skill, index) => (
                <div 
                  key={index}
                  className="w-[260px] lg:w-[280px] shrink-0 flex flex-col items-center text-center p-6 lg:p-8 rounded-[2rem] lg:rounded-[3rem] shadow-xl bg-[#1a1a1c] text-white group cursor-default"
                >
                  {/* 软件图标 (采用极简的高级字母缩写风格) */}
                  <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br from-gray-700 to-[#111] overflow-hidden mb-6 flex items-center justify-center shadow-inner border border-white/10 group-hover:border-white/30 transition-colors">
                     <span className="text-3xl lg:text-4xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                        {skill.abbr}
                     </span>
                  </div>
                  
                  {/* 软件名称与描述 */}
                  <h4 className="text-xl lg:text-2xl font-black tracking-wide mb-3">{skill.name}</h4>
                  <p className="text-xs lg:text-sm mb-8 leading-relaxed font-medium flex-grow text-gray-400">
                    {skill.desc}
                  </p>
                  
                  {/* 底部保留按钮样式，作为熟练度徽章 */}
                  <div className="w-full py-3 lg:py-4 rounded-full font-bold text-xs lg:text-sm tracking-widest uppercase bg-white/10 text-white mt-auto">
                    {language === 'zh' ? '熟练应用' : 'PROFICIENT'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
