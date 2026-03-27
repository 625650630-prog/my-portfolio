import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { PROJECTS, CATEGORY_LABELS } from '../constants';
import { Category, Language, Project } from '../types';
import { ArrowUpRight, X, Globe, LayoutGrid, Search, Grid } from 'lucide-react';
// 👉 引入作品页面内容数据
import { PORTFOLIO_PAGE_DATA } from '../data/pages/portfolio';

interface PortfolioSectionProps {
  language: Language;
  externalFilter?: string;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ language, externalFilter }) => {
  const [filter, setFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [displayProject, setDisplayProject] = useState<Project | null>(null);
  const [isModalRendered, setIsModalRendered] = useState(false);
  const [gridMode, setGridMode] = useState(false);

  // 👉 获取作品页面的标题和简介文字
  const headerContent = PORTFOLIO_PAGE_DATA[language];

  // 接收外部过滤
  useEffect(() => {
    if (externalFilter) setFilter(externalFilter);
  }, [externalFilter]);

  const currentProjects = PROJECTS[language];

  const filteredProjects = filter === 'All' 
    ? currentProjects 
    : currentProjects.filter(p => p.category === filter);

  // 弹窗控制
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

  return (
    // 极致暗黑背景，pt-32 留出足够间距
    <div className="w-full bg-[#050505] pb-32 pt-24 md:pt-32 relative z-10 font-sans selection:bg-[#ccff00] selection:text-black text-white">
      <div className="max-w-[95vw] lg:max-w-[90vw] mx-auto flex flex-col items-center">
        
        {/* ================= 👉 新增：居中、缩小、白色整合标题 ================= */}
        {/* 徹底去掉了突兀的白盒子标题，将文字整合进赛车风 section 顶部 */}
        <div className="mb-24 flex flex-col items-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-widest italic mb-6">
            {headerContent.title}<span className="text-[#ccff00]">.</span>
          </h1>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl leading-relaxed font-medium">
            {headerContent.description}
          </p>
        </div>

        {/* 賽車風网格小标题 (保持不变) */}
        <div className="mb-12 flex justify-start w-full items-end border-b border-white/10 pb-6">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter italic text-white/50">
            {language === 'zh' ? '案例存档' : 'CASE ARCHIVE'}
          </h2>
        </div>

        {/* 顶部布局切换条 */}
        <div className="hidden lg:flex w-full items-center justify-between bg-[#111] border border-white/5 rounded-full px-6 py-3 mb-12 shadow-inner">
           <div className="flex items-center gap-1.5 shrink-0 text-white font-bold text-xs uppercase italic tracking-wider">
              Silence<sup className="text-sm">7C</sup> Design Project Archive<sup className="text-sm">2026</sup>
           </div>
           
           {/* 分类筛选 (胶囊样式) */}
           <div className="flex bg-black/50 rounded-full p-1 border border-white/10 mx-auto">
             <button onClick={() => setFilter('All')} className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${filter === 'All' ? 'bg-white text-black' : 'hover:bg-white/10 text-white'}`}>All</button>
             {Object.values(Category).map(cat => (
               <button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${filter === cat ? 'bg-white text-black' : 'hover:bg-white/10 text-white'}`}>
                 {CATEGORY_LABELS[language][cat] || cat}
               </button>
             ))}
           </div>
           
           {/* 布局切换和 Globe 按钮 */}
           <div className="flex items-center gap-6 shrink-0 text-white">
             <Globe size={18} className="text-white/70 hover:text-white cursor-pointer"/>
             <div className="w-[1px] h-6 bg-white/10"></div>
             <div className="flex items-center gap-2">
                <button onClick={() => setGridMode(false)} className={`w-9 h-9 flex items-center justify-center rounded-lg ${!gridMode ? 'bg-[#ccff00] text-black' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}>
                   <Grid size={20} strokeWidth={2.5}/>
                </button>
                <button onClick={() => setGridMode(true)} className={`w-9 h-9 flex items-center justify-center rounded-lg ${gridMode ? 'bg-[#ccff00] text-black' : 'text-white/50 hover:bg-white/5 hover:text-white'}`}>
                   <LayoutGrid size={20} strokeWidth={2.5}/>
                </button>
             </div>
           </div>
        </div>

        {/* 分类筛选条 (移动端展示) */}
        <div className="lg:hidden w-full flex bg-[#111] border border-white/5 rounded-full p-1 mb-10 overflow-x-auto no-scrollbar">
          <button onClick={() => setFilter('All')} className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shrink-0 ${filter === 'All' ? 'bg-white text-black' : 'hover:bg-white/10 text-white'}`}>All</button>
          {Object.values(Category).map(cat => (
            <button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shrink-0 ${filter === cat ? 'bg-white text-black' : 'hover:bg-white/10 text-white'}`}>
              {CATEGORY_LABELS[language][cat] || cat}
            </button>
          ))}
        </div>

        {/* 作品网格 */}
        <div className={`w-full ${gridMode ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8' : 'flex flex-col gap-8'}`}>
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id} 
              className={`group cursor-pointer flex transition-all duration-500 transform-gpu hover:-translate-y-2 border shadow-2xl ${gridMode ? 'flex-col h-full bg-[#0a0a0a] border-white/5 hover:border-[#ccff00]/50' : 'bg-[#0a0a0a]/50 backdrop-blur-md border-white/5 items-center p-3 hover:border-[#ccff00]/40'}`}
              style={{ borderRadius: gridMode ? '1.5rem' : '1.25rem' }}
              onClick={() => setSelectedProject(project)}
            >
              
              {/* 图片容器 */}
              <div className={`relative overflow-hidden ${gridMode ? 'w-full aspect-[4/3] bg-[#111] border-b border-white/5 rounded-t-[1.5rem]' : 'w-48 h-32 rounded-xl shrink-0'}`}>
                {project.image && !project.image.includes('picsum') ? (
                    <img 
                      src={project.image} alt={project.title} loading="lazy" decoding="async" referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#111]">
                        <h4 className="text-lg md:text-xl font-black text-gray-700 uppercase italic line-clamp-1">{project.title}</h4>
                    </div>
                )}
                {gridMode && (
                   <div className="absolute top-4 left-4 bg-[#ccff00] text-[#050505] px-3 py-1 text-[10px] font-black uppercase tracking-widest skew-x-[-10deg]">
                     <span className="skew-x-[10deg] block">{CATEGORY_LABELS[language][project.category] || project.category}</span>
                   </div>
                )}
              </div>

              {/* 卡片内容区 */}
              <div className={`${gridMode ? 'p-5 lg:p-6 flex flex-col flex-grow' : 'pl-6 pr-4 flex-grow grid grid-cols-10 items-center gap-4'}`}>
                {gridMode ? (
                  <>
                     <h3 className="text-xl lg:text-2xl font-black text-white mb-2 line-clamp-2 leading-tight uppercase italic group-hover:text-[#ccff00] transition-colors">{project.title}</h3>
                     <p className="text-xs lg:text-sm text-gray-400 line-clamp-2 leading-relaxed font-medium mb-6 flex-grow">{project.description}</p>
                     
                     <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/10">
                       <div className="flex flex-wrap gap-2 overflow-hidden max-h-6">
                         {project.tags.slice(0, 2).map(tag => (
                           <span key={tag} className="text-[10px] font-bold text-[#ccff00] uppercase tracking-wider">#{tag}</span>
                         ))}
                       </div>
                       <div className="bg-[#ccff00] text-[#050505] w-10 h-10 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 skew-x-[-10deg]">
                         <ArrowUpRight size={20} className="skew-x-[10deg]" strokeWidth={3} />
                       </div>
                     </div>
                  </>
                ) : (
                  <>
                     <div className="col-span-3">
                       <h3 className="text-xl lg:text-2xl font-black text-white leading-tight uppercase italic line-clamp-1 group-hover:text-[#ccff00] transition-colors">{project.title}</h3>
                     </div>
                     <div className="col-span-3">
                       <p className="text-xs lg:text-sm text-gray-400 font-medium line-clamp-1">{project.description}</p>
                     </div>
                     <div className="col-span-1">
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/50">{CATEGORY_LABELS[language][project.category] || project.category}</div>
                     </div>
                     <div className="col-span-2 flex items-center justify-center gap-1.5 max-w-[150px] overflow-hidden">
                        {project.tags.slice(0, 2).map(tag => (
                           <span key={tag} className="text-[10px] font-bold text-[#ccff00] bg-[#ccff00]/10 px-2 py-0.5 rounded uppercase tracking-wider">#{tag}</span>
                        ))}
                     </div>
                     <div className="col-span-1 flex justify-end">
                       <div className="bg-white/10 group-hover:bg-[#ccff00] text-white group-hover:text-[#050505] w-12 h-12 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 skew-x-[-10deg]">
                         <ArrowUpRight size={20} className="skew-x-[10deg]" strokeWidth={3} />
                       </div>
                     </div>
                  </>
                )}
              </div>

            </div>
          ))}
          {filteredProjects.length === 0 && (
            <div className="col-span-full text-center py-20 text-white/50 font-bold uppercase tracking-widest">No projects found.</div>
          )}
        </div>

        {/* 弹窗详情页保持不变 */}
        {isModalRendered && createPortal(
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
             <div className={`absolute inset-0 bg-[#050505]/95 backdrop-blur-sm ${selectedProject ? 'animate-[fadeIn_0.3s_ease-out_forwards]' : 'animate-fade-out'}`} onClick={() => setSelectedProject(null)}></div>
             <div className={`relative w-full max-w-6xl max-h-[90vh] overflow-y-auto no-scrollbar bg-[#111] border border-white/10 rounded-2xl shadow-2xl flex flex-col ${selectedProject ? 'animate-message-pop' : 'animate-message-pop-out'}`}>
               {displayProject && (
                 <>
                   <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/10 hover:bg-[#ccff00] hover:text-black text-white transition-colors">
                     <X size={24} />
                   </button>
                   <div className="w-full bg-[#050505] relative group-modal-media shrink-0 aspect-video border-b border-white/10">
                      <img src={displayProject.image} alt={displayProject.title} className="w-full h-full object-contain" />
                   </div>
                   <div className="p-8 md:p-12 text-white">
                     <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase italic">{displayProject.title}</h2>
                     <p className="text-xl text-gray-300 mb-8 whitespace-pre-wrap">{displayProject.description}</p>
                     <p className="text-lg text-gray-500 font-medium">{displayProject.concept}</p>
                   </div>
                 </>
               )}
             </div>
          </div>,
          document.body
        )}
      </div>
    </div>
  );
};
