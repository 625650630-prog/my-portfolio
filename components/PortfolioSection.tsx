import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { PROJECTS, CATEGORY_LABELS } from '../constants';
import { Category, Language, Project } from '../types';
import { Globe, RefreshCw, X, ArrowUpRight, Aperture, Search } from 'lucide-react';

interface PortfolioSectionProps {
  language: Language;
  externalFilter?: string;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ language, externalFilter }) => {
  const [filter, setFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [displayProject, setDisplayProject] = useState<Project | null>(null);
  const [isModalRendered, setIsModalRendered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (externalFilter) {
      setFilter(externalFilter);
      setCurrentIndex(0); // 切换分类时重置索引
    }
  }, [externalFilter]);

  const currentProjects = PROJECTS[language];
  const filteredProjects = filter === 'All' 
    ? currentProjects 
    : currentProjects.filter(p => p.category === filter);

  // 获取当前展示的项目
  const mainProject = filteredProjects[currentIndex] || currentProjects[0];

  // 弹窗控制逻辑 (保持不变)
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
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [selectedProject]);

  const handleFilter = (cat: string) => {
    setFilter(cat);
    setCurrentIndex(0);
  };

  // 检查是否有项目
  const hasProjects = filteredProjects.length > 0;

  return (
    <div className="w-full relative z-10 font-sans selection:bg-[#ccff00] selection:text-black text-white">
      <div className="max-w-7xl mx-auto w-full px-4 md:px-0 flex flex-col">
        
        {/* ================= 顶部玻璃拟态导航栏 (保持现状) ================= */}
        <nav className="w-full flex items-center justify-between bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-10 py-4 shadow-lg mb-8">
           <div className="flex items-center gap-1.5 text-white">
              <h1 className="text-2xl font-black italic tracking-widest text-white drop-shadow-md">SILENCE</h1>
              <div className="w-2.5 h-2.5 bg-[#ccff00] rounded-full shadow-[0_0_10px_#ccff00]"></div>
              <sup className="text-sm font-bold opacity-80 mt-1">7C</sup>
           </div>

           {/* 分类筛选条 (胶囊样式，增加更明显的 hover 效果) */}
           <div className="hidden lg:flex items-centergap-1.5 p-1.5 bg-black/30 rounded-full border border-white/10 shadow-inner">
             <button onClick={() => handleFilter('All')} className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${filter === 'All' ? 'bg-white text-black' : 'hover:bg-white/10 text-white'}`}>All</button>
             {Object.values(Category).map(cat => (
               <button key={cat} onClick={() => handleFilter(cat)} className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${filter === cat ? 'bg-white text-black' : 'hover:bg-white/10 text-white'}`}>
                 {CATEGORY_LABELS[language][cat] || cat}
               </button>
             ))}
           </div>

           <div className="flex items-center gap-6 text-white">
              <Globe size={20} className="text-white/70 hover:text-white cursor-pointer"/>
              <div className="text-right text-[10px] font-bold leading-tight hidden md:block text-white/50">
                O2 SHOP<br/>NEW COLLECTION<br/>MOONISH
              </div>
           </div>
        </nav>

        {/* ================= 核心：单一大型毛玻璃展示区 (已根据要求删除下方3个预览并优化排版) ================= */}
        <div className="w-full bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 flex flex-col relative shadow-2xl overflow-hidden min-h-[70vh]">
           
           {hasProjects && mainProject ? (
             <>
               {/* 1. 顶部堆叠信息区 (Number, Category, Title, Description, Details) */}
               <div className="flex flex-col mb-12 border-b border-white/10 pb-10 gap-10">
                  <div className="flex items-center gap-12">
                     {/* 巨大编号 (改为在标题左侧垂直对齐) */}
                     <span className="text-8xl font-black text-white/10 leading-none tracking-tighter drop-shadow-md">
                        {(currentIndex + 1).toString().padStart(2, '0')}
                     </span>
                     
                     {/* 标题和分类 */}
                     <div className="flex-grow">
                        <div className="flex items-center gap-3">
                           <Aperture size={28} className="text-[#ccff00]" />
                           <h3 className="text-5xl lg:text-6xl font-black text-white uppercase italic drop-shadow-lg">{mainProject.title}</h3>
                        </div>
                        <p className="text-sm font-bold text-gray-400 tracking-widest uppercase mt-3">{CATEGORY_LABELS[language][mainProject.category] || mainProject.category} <span className="text-white/30 ml-2 font-normal">/ Project Showcase</span></p>
                     </div>

                     {/* 详情与查看详情按钮 */}
                     <div className="flex items-center gap-3">
                        <button onClick={() => setSelectedProject(mainProject)} className="bg-white/10 text-white px-8 py-4 rounded-full font-black text-sm hover:scale-105 transition-transform shadow-lg uppercase tracking-widest flex items-center gap-2 group">
                          View details <Search size={16} className="transition-transform group-hover:translate-x-1" />
                        </button>
                        <button className="bg-[#ccff00] text-black px-6 py-4 rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-lg uppercase">🛒 Cart</button>
                     </div>
                  </div>

                  {/* 描述与概念 details (Stacked horizontally) */}
                  <div className="grid grid-cols-12 gap-10 text-[11px] font-bold text-gray-300 uppercase tracking-widest leading-relaxed">
                     <div className="col-span-12 md:col-span-4 max-w-[280px]">
                        <p className="mb-2 text-[#ccff00] font-black">Project Overview</p>
                        <p>{mainProject.description}</p>
                        <p className="mt-4 text-white/60">Silence<sup className="text-xs">7C</sup> Studio</p>
                     </div>
                     
                     <div className="col-span-12 md:col-span-4">
                        <p className="mb-2 text-[#ccff00] font-black">Design Concept</p>
                        <p className="font-medium text-gray-400 whitespace-pre-wrap">{mainProject.concept || 'Diverse Design'}</p>
                     </div>

                     <div className="col-span-12 md:col-span-4">
                        <p className="mb-2 text-[#ccff00] font-black">Details & Tags</p>
                        <div className="flex flex-wrap gap-2">
                          {mainProject.tags.map(tag => (
                             <span key={tag} className="text-[10px] font-bold text-[#ccff00] border border-[#ccff00]/50 px-3 py-1 rounded">#{tag}</span>
                          ))}
                        </div>
                     </div>
                  </div>
               </div>

               {/* 2. 核心大图展示区域 (👉 已修改：内部滚动机制，支持超长电商长图！) */}
               <div className="w-full flex-grow relative group shadow-inner rounded-[2.5rem] overflow-hidden">
                  
                  {/* 用于滚动的容器：设定固定高度或最大高度，并设置 overflow-y-auto */}
                  <div className="w-full h-[60vh] overflow-y-auto no-scrollbar bg-black/40 border border-white/5 relative p-4 rounded-[2rem]">
                      <img 
                        src={mainProject.image} 
                        alt={mainProject.title} 
                        // 👉 重要：w-full h-auto object-contain 确保超长图按原比例展示，用户可以上下滚动
                        className="w-full h-auto object-contain group-hover:scale-[1.01] transition-transform duration-1000 md:rounded-xl shadow-lg" 
                      />
                  </div>
                  
                  {/* 左右切换的叠加控制按钮 (在图片上方悬浮) */}
                  {filteredProjects.length > 1 && (
                     <>
                        <button 
                           onClick={() => setCurrentIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length)}
                           className="absolute top-1/2 left-6 z-10 p-4 rounded-full bg-black/50 backdrop-blur-md text-white/80 hover:bg-[#ccff00] hover:text-black transition-colors shadow-2xl hover:scale-110"
                        >
                           <ArrowUpRight size={20} className="transform rotate-[-90deg]" />
                        </button>
                        <button 
                           onClick={() => setCurrentIndex((prev) => (prev + 1) % filteredProjects.length)}
                           className="absolute top-1/2 right-6 z-10 p-4 rounded-full bg-black/50 backdrop-blur-md text-white/80 hover:bg-[#ccff00] hover:text-black transition-colors shadow-2xl hover:scale-110"
                        >
                           <ArrowUpRight size={20} className="transform rotate-[0deg]" />
                        </button>
                     </>
                  )}

                  {/* 模拟图上的交互节点 */}
                  <div className="absolute top-1/2 left-1/3 bg-black/70 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-4 py-2 rounded-full hidden md:flex items-center gap-4 group-hover:opacity-100 transition-opacity opacity-70">
                    <span>{mainProject.title} <span className="text-white/60 ml-2 font-normal">/ Diversified Designs</span></span>
                    <span>119$</span>
                    <div className="w-3 h-3 bg-[#ccff00] rounded-full ml-2 shadow-[0_0_10px_#ccff00]"></div>
                  </div>

                  {/* 底部 NEXT 切换指示器 (简化并居中) */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3">
                     <div
                        onClick={() => setCurrentIndex((prev) => (prev + 1) % filteredProjects.length)}
                        className="bg-black/60 backdrop-blur-md rounded-full py-3.5 px-8 flex items-center justify-between shadow-2xl cursor-pointer hover:bg-[#ccff00] hover:text-black transition-colors group-hover:scale-105"
                     >
                        <div className="flex items-center gap-2 font-black text-sm uppercase"><RefreshCw size={16}/> NEXT</div>
                     </div>
                  </div>
               </div>
             </>
           ) : (
             // 数据兜底
             <div className="flex items-center justify-center flex-1 text-white/50 font-bold uppercase tracking-widest">No projects available.</div>
           )}

        </div>
      </div>

      {/* 弹窗详情页保持不变 (已更新文字颜色与背景同步) */}
      {isModalRendered && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
           <div className={`absolute inset-0 bg-black/95 backdrop-blur-sm ${selectedProject ? 'animate-[fadeIn_0.3s_ease-out_forwards]' : 'animate-fade-out'}`} onClick={() => setSelectedProject(null)}></div>
           <div className={`relative w-full max-w-6xl max-h-[90vh] overflow-y-auto no-scrollbar bg-[#111] border border-white/10 rounded-2xl shadow-2xl flex flex-col ${selectedProject ? 'animate-message-pop' : 'animate-message-pop-out'}`}>
             {displayProject && (
               <>
                 <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/10 hover:bg-[#ccff00] hover:text-black text-white transition-colors">
                   <X size={24} />
                 </button>
                 <div className="w-full bg-[#050505] relative group-modal-media shrink-0 aspect-video border-b border-white/10 overflow-y-auto">
                    <img src={displayProject.image} alt={displayProject.title} className="w-full h-auto object-contain" />
                 </div>
                 <div className="p-8 md:p-12 text-white bg-[#111]">
                   <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase italic">{displayProject.title}</h2>
                   <p className="text-xl text-gray-300 mb-8 whitespace-pre-wrap">{displayProject.description}</p>
                   <p className="text-lg text-gray-500 font-medium whitespace-pre-wrap">{displayProject.concept}</p>
                   <div className="flex flex-wrap gap-2 pt-6 mt-6 border-t border-white/10">
                     {displayProject.tags.map(tag => (
                       <span key={tag} className="text-xs font-bold text-[#ccff00] border border-[#ccff00]/50 px-3 py-1 rounded">#{tag}</span>
                     ))}
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
