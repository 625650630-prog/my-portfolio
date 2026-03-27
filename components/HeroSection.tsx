import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Language, Category, Project } from '../types';
import { ArrowRight, ArrowUpRight, X, ZoomIn, ZoomOut } from 'lucide-react';
// 引入作品数据
import { PROJECTS, CATEGORY_LABELS } from '../constants';

interface HeroSectionProps {
  onNavigate: (page: string) => void;
  onCategorySelect: (category: Category) => void;
  language: Language;
}

type GridItem = { type: 'project'; data: Project; height: string };

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onCategorySelect, language }) => {
  // 状态管理
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [displayProject, setDisplayProject] = useState<Project | null>(null);
  const [isModalRendered, setIsModalRendered] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleExploreClick = () => {
    onCategorySelect(Category.ALL);
    onNavigate('portfolio');
  };

  useEffect(() => {
    if (selectedProject) {
      setDisplayProject(selectedProject);
      setIsModalRendered(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      const timer = setTimeout(() => {
        setIsModalRendered(false);
        setDisplayProject(null);
        setZoomScale(1);
        setPanPosition({ x: 0, y: 0 });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [selectedProject]);

  // 核心技能数据：彩色图标模式
  const skillsList = [
    { name: 'Photoshop', iconUrl: '/icons/PS.png' },
    { name: 'CorelDRAW', iconUrl: '/icons/CDR.png' },
    { name: 'Illustrator', iconUrl: '/icons/ai.png' },
    { name: 'Premiere', iconUrl: '/icons/PR.png' },
    { name: 'After Effects', iconUrl: '/icons/AE.png' },
    { name: 'Lightroom', iconUrl: '/icons/LR.png' },
    { name: 'DaVinci Resolve', iconUrl: '/icons/DFQ.png' },
    { name: 'ComfyUI' , iconUrl: '/icons/comfy.png' },
    { name: 'Gemini', iconUrl: '/icons/gemini.png' },
    { name: '剪映', iconUrl: '/icons/JY.png' },
    { name: '即梦', iconUrl: '/icons/JM.png' },
    { name: 'DeepSeek', iconUrl: '/icons/deepsk.png' },
  ];
  const marqueeTrack = [...skillsList, ...skillsList, ...skillsList];

  // 手风琴作品数据
  const showcaseData = [
    { number: '01', titleZh: 'AIGC 视觉探索', titleEn: 'AIGC Exploration', desc: '结合 Stable Diffusion 与 Midjourney，生成极具商业现实感的视觉叙事。', img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop' },
    { number: '02', titleZh: '电商视觉设计', titleEn: 'E-commerce Visual', desc: '为头部平台打造可扩展的视觉规范与大促氛围包装，提升用户转化。', img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop' },
    { number: '03', titleZh: '新媒体动态', titleEn: 'New Media Motion', desc: '充满活力的短视频动效与品牌片头，在快节奏的社交媒体中抓住眼球。', img: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop' },
    { number: '04', titleZh: '商业影像精修', titleEn: 'Commercial Photo', desc: '专业的商业产品摄影与影视级调色，呈现无与伦比的产品质感。', img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop' },
    { number: '05', titleZh: 'UI/UX 体验', titleEn: 'UI/UX Design', desc: '从原型到开发部署，全流程打造极致的用户交互体验与功能性。', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop' }
  ];

  // 瀑布流安全获取逻辑
  const allProjects = PROJECTS[language];
  const safeGet = (index: number) => allProjects[Math.abs(index) % allProjects.length];

  const gridItems: GridItem[] = [
    { type: 'project', data: safeGet(allProjects.length - 1), height: '300px' },
    { type: 'project', data: safeGet(allProjects.length - 2), height: '280px' },
    { type: 'project', data: safeGet(0), height: '400px' },
    { type: 'project', data: safeGet(allProjects.length - 3), height: '250px' },
    { type: 'project', data: safeGet(1), height: '450px' },
    { type: 'project', data: safeGet(2), height: '400px' },
    { type: 'project', data: safeGet(3), height: '350px' },
    { type: 'project', data: safeGet(4), height: '400px' },
    { type: 'project', data: safeGet(5), height: '350px' },
    { type: 'project', data: safeGet(allProjects.length - 4), height: '300px' },
    { type: 'project', data: safeGet(6), height: '400px' },
    { type: 'project', data: safeGet(7), height: '350px' },
  ];

  return (
    <div className="w-full bg-white font-sans pt-4 md:pt-6 px-0 md:px-0 relative selection:bg-black selection:text-white">
      <style>{`
          @keyframes marquee-slow { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
          .animate-marquee-logos { animation: marquee-slow 40s linear infinite; }
      `}</style>

      {/* Hero 图片背景大容器 */}
      <div 
        className="w-full max-w-[95vw] lg:max-w-[90vw] mx-auto rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 relative overflow-hidden shadow-sm border border-gray-100/50 min-h-[85vh] flex flex-col justify-center bg-cover bg-center"
        style={{ backgroundImage: 'url(/BJ.jpg)' }} 
      >
        {/* 内容容器 */}
        <div className="flex flex-col items-start justify-center relative z-20 w-full py-8 lg:py-12 lg:px-16 xl:px-32 text-left">
          
          <div className="w-full max-w-4xl flex flex-col items-start justify-center">
            
            {/* 👉 标题 (移除顶部胶囊后，作为第一视觉元素) */}
            <h1 className="text-7xl md:text-8xl lg:text-[11rem] font-serif text-white tracking-tighter leading-none mb-6 lg:mb-10 relative drop-shadow-lg">
              Hello<sup className="text-5xl md:text-8xl absolute top-4 ml-1">+</sup>
            </h1>
            
            {/* 👉 描述文字 */}
            <p className="text-lg md:text-xl text-gray-100 font-medium max-w-2xl leading-relaxed mb-12 drop-shadow-md">
              {language === 'zh' 
                ? '打破常规设计视觉，将最前沿的视觉带给您。' 
                : 'Drive Visual Growth, And Harness Ai-Powered Content — Up To 50x Faster.'}
            </p>
            
            {/* 👉 按钮 (直接跟在描述文字下方，移除了原本的头像和坐标区块) */}
            <div className="flex items-center justify-start gap-6">
              <button 
                onClick={handleExploreClick}
                className="bg-white text-black px-8 py-4 rounded-full font-bold text-sm lg:text-base transition-transform hover:scale-105 shadow-xl"
              >
                {language === 'zh' ? '探索作品集' : 'Explore Works'}
              </button>
              <button 
                onClick={() => onNavigate('contact')}
                className="font-bold text-sm lg:text-base text-white hover:text-gray-300 transition-colors flex items-center gap-2 group bg-black/30 backdrop-blur-md px-8 py-4 rounded-full border border-white/10"
              >
                {language === 'zh' ? '联系作者' : 'Our Pricing'}
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 滚动软件跑马灯 */}
      <div className="w-full max-w-[95vw] lg:max-w-[80vw] mx-auto mt-12 mb-16 overflow-hidden relative" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
        <div className="flex w-max animate-marquee-logos items-center gap-12 lg:gap-20">
          {marqueeTrack.map((item, index) => (
            <div key={index} className="flex items-center gap-3 opacity-100 transition-opacity cursor-default shrink-0">
              {item.iconUrl ? (
                <img src={item.iconUrl} alt={item.name} className="w-8 h-8 rounded-md object-contain" />
              ) : (
                <div className="w-8 h-8 rounded-md bg-black text-white flex items-center justify-center font-bold text-[10px]">{item.name.substring(0, 2).toUpperCase()}</div>
              )}
              <span className="text-xl md:text-3xl font-black tracking-tighter text-gray-500">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 精选优质作品标题区 */}
      <div className="w-full max-w-[95vw] lg:max-w-[90vw] mx-auto pt-20 pb-32 mt-10 relative selection:bg-black selection:text-white">
        <div className="flex flex-col items-center text-center mb-16 border-b-2 border-gray-100 pb-10 px-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-3 text-[#111] max-w-4xl mx-auto">{language === 'zh' ? '精选优质作品' : 'Selected Premium Works'}</h2>
          <h3 className="text-xl md:text-2xl font-light uppercase tracking-widest text-gray-500 italic mt-2">Create a visual feast</h3>
        </div>
        
        {/* 手风琴作品集 */}
        <div className="w-full flex flex-col lg:flex-row gap-4 h-[750px] lg:h-[650px]">
          {showcaseData.map((item, index) => (
            <div key={index} className="group relative flex-1 lg:hover:flex-[4] hover:flex-[3] rounded-3xl overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer shadow-sm hover:shadow-2xl" onClick={() => onCategorySelect(Category.ALL)}>
              <img src={item.img} alt={item.titleEn} className="absolute inset-0 w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-700"></div>
              <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8 flex flex-col justify-end h-full">
                <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-3 mb-2 lg:mb-0 transition-all duration-700 group-hover:mb-4">
                  <div className="flex items-center gap-3"><span className="text-white font-black text-3xl lg:text-4xl opacity-80 group-hover:opacity-100 group-hover:text-[#ff5030] transition-colors shrink-0">{item.number}</span><div className="flex flex-col"><span className="text-white font-bold text-xl lg:text-2xl leading-none transition-colors">{language === 'zh' ? item.titleZh : item.titleEn}</span><span className="text-gray-400 text-xs font-medium lg:text-sm mt-0.5 group-hover:text-gray-200 transition-colors">{language === 'zh' ? item.titleEn : item.titleZh}</span></div></div>
                  <div className="hidden lg:block h-[2px] w-8 bg-[#ff5030] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 delay-100"></div>
                </div>
                <div className="opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 delay-100 flex flex-col overflow-hidden max-h-0 group-hover:max-h-[300px]">
                  <div className="min-w-[250px] md:min-w-[300px]"><h3 className="text-white font-bold text-2xl lg:text-3xl mb-3 mt-2 leading-tight">{language === 'zh' ? item.titleZh : item.titleEn}</h3><p className="text-gray-300 text-sm md:text-base leading-relaxed hidden lg:block line-clamp-2">{item.desc}</p><div className="mt-6 flex items-center gap-2 text-sm font-bold text-[#ff5030] uppercase tracking-widest">Explore Project <ArrowUpRight size={16} strokeWidth={3} /></div></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 更多案例存档瀑布流区 */}
      <div className="w-full max-w-[95vw] lg:max-w-[90vw] mx-auto pt-20 pb-32 border-t border-gray-100 mt-10 selection:bg-black selection:text-white relative">
        <div className="flex flex-col items-center text-center mb-16 border-b-2 border-gray-100 pb-10 px-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-3 text-[#111] max-w-4xl mx-auto">{language === 'zh' ? '更多案例存档' : 'Project Archive'}</h2>
          <h3 className="text-xl md:text-2xl font-light uppercase tracking-widest text-gray-500 italic mt-2">Explore the full collection</h3>
          <button onClick={() => { onCategorySelect(Category.ALL); onNavigate('portfolio'); }} className="hidden md:flex items-center gap-2 font-bold text-sm uppercase tracking-widest hover:text-[#ff5030] transition-colors mt-8 bg-white border border-gray-200 rounded-full px-8 py-4 shadow-sm hover:shadow-lg transition-all">{language === 'zh' ? '查看完整作品集' : 'View Full Portfolio'} <ArrowRight size={16} /></button>
        </div>
        <div className="w-full overflow-hidden relative" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 pb-10 px-10">
            {gridItems.map((item, index) => (
              <div key={`${item.data.id}-${index}`} className="break-inside-avoid relative group rounded-[2rem] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 transform-gpu hover:-translate-y-1 bg-gray-100 border border-gray-200/50" onClick={() => setSelectedProject(item.data)}>
                <img src={item.data.image} alt={item.data.title} loading="lazy" className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" style={{ minHeight: item.height }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div className="bg-white text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full w-max mb-3">{CATEGORY_LABELS[language][item.data.category] || item.data.category}</div>
                    <h3 className="text-white text-xl md:text-2xl font-bold leading-tight mb-2">{item.data.title}</h3>
                    <p className="text-gray-300 text-sm line-clamp-2">{item.data.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 作品详情弹窗 */}
      {isModalRendered && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-8">
           <div className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${selectedProject ? 'opacity-100' : 'opacity-0'}`} onClick={() => setSelectedProject(null)}></div>
           <div className={`relative w-full h-full md:max-w-6xl md:h-[85vh] bg-white md:rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden transition-all duration-300 transform ${selectedProject ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
             {displayProject && (
               <>
                 <div className="w-full md:w-[65%] h-[40vh] md:h-full bg-[#111] relative flex items-center justify-center overflow-hidden group"
                   onWheel={(e) => { const delta = e.deltaY < 0 ? 0.2 : -0.2; const newScale = Math.min(Math.max(zoomScale + delta, 1), 5); setZoomScale(newScale); if (newScale === 1) setPanPosition({ x: 0, y: 0 }); }}
                   onMouseDown={() => zoomScale > 1 && setIsDragging(true)}
                   onMouseUp={() => setIsDragging(false)}
                   onMouseLeave={() => setIsDragging(false)}
                   onMouseMove={(e) => { if (isDragging && zoomScale > 1) { setPanPosition(prev => ({ x: prev.x + e.movementX, y: prev.y + e.movementY })); } }}
                 >
                    <img src={displayProject.image} alt={displayProject.title} draggable="false" className={`w-full h-full object-contain p-0 md:p-8 ${isDragging ? 'transition-none' : 'transition-transform duration-200 ease-out'}`} style={{ transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${zoomScale})`, cursor: zoomScale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in' }}
                      onClick={() => { if (zoomScale > 1) { setZoomScale(1); setPanPosition({ x: 0, y: 0 }); } else { setZoomScale(2.5); } }}
                    />
                    <div className="absolute bottom-6 right-6 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50">
                       {zoomScale > 1 ? <><ZoomOut size={16}/> {language === 'zh' ? '滚轮缩放 / 拖拽平移' : 'Scroll & Drag'}</> : <><ZoomIn size={16}/> {language === 'zh' ? '滚动滚轮 / 点击放大' : 'Scroll or Click'}</>}
                    </div>
                    <button onClick={() => setSelectedProject(null)} className="md:hidden absolute top-4 left-4 p-2 bg-black/50 backdrop-blur-md text-white rounded-full z-50"><X size={20} /></button>
                 </div>
                 <div className="w-full md:w-[35%] h-[60vh] md:h-full bg-white flex flex-col relative z-10 shadow-[-10px_0_20px_rgba(0,0,0,0.1)] shrink-0">
                   <div className="flex items-center justify-between p-5 border-b border-gray-100 shrink-0">
                     <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden shrink-0"><img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop" alt="avatar" className="w-full h-full object-cover"/></div>
                       <div className="flex flex-col"><span className="font-bold text-sm text-[#111] leading-none mb-1">Silence 7C</span><span className="text-[10px] text-gray-500 font-medium">Visual Designer</span></div>
                     </div>
                     <button onClick={() => setSelectedProject(null)} className="hidden md:flex p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-gray-500 hover:text-black shrink-0"><X size={20} /></button>
                   </div>
                   <div className="p-6 md:p-8 overflow-y-auto no-scrollbar flex-grow">
                      <div className="bg-gray-100 text-gray-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full w-max mb-4">{CATEGORY_LABELS[language][displayProject.category] || displayProject.category}</div>
                      <h2 className="text-2xl md:text-3xl font-black mb-4 text-[#111] leading-tight">{displayProject.title}</h2>
                      <p className="text-sm md:text-base text-gray-600 mb-8 leading-relaxed whitespace-pre-wrap">{displayProject.description}</p>
                      {displayProject.concept && (
                         <div className="bg-[#f8f9fa] p-5 rounded-2xl border border-gray-100 mb-8 relative overflow-hidden">
                           <div className="absolute top-0 left-0 w-1 h-full bg-[#ff5030]"></div>
                           <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Design Concept</h4>
                           <p className="text-sm text-gray-700 leading-relaxed font-medium">{displayProject.concept}</p>
                         </div>
                      )}
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                        {displayProject.tags.map(tag => (
                          <span key={tag} className="text-xs font-bold text-[#ff5030] bg-[#ff5030]/10 px-3 py-1.5 rounded-full cursor-pointer hover:bg-[#ff5030] hover:text-white transition-colors">#{tag}</span>
                        ))}
                      </div>
                   </div>
                 </div>
               </>
             )}
           </div>
        </div>,
        document.body
      )}
    </div>
  );
};
