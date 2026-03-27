import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { PROJECTS, CATEGORY_LABELS } from '../constants';
import { Category, Language, Project } from '../types';
import { ArrowUpRight, X, Globe, RefreshCw, LayoutGrid, Search } from 'lucide-react';

interface PortfolioSectionProps {
  language: Language;
  externalFilter?: string;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ language, externalFilter }) => {
  const [filter, setFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [displayProject, setDisplayProject] = useState<Project | null>(null);
  const [isModalRendered, setIsModalRendered] = useState(false);
  
  // 👉 新增：用于控制“Bento便当盒展示”和“Grid网格”的切换状态
  const [viewMode, setViewMode] = useState<'bento' | 'grid'>('bento');
  // 👉 新增：用于控制便当盒模式下当前展示的第几个项目
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

  // 获取便当盒展示的主副项目
  const mainProject = filteredProjects[currentIndex] || currentProjects[0];
  const sideProject = filteredProjects[(currentIndex + 1) % filteredProjects.length] || currentProjects[1] || mainProject;

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

  const handleFilter = (cat: string) => {
    setFilter(cat);
    setCurrentIndex(0);
  };

  return (
    // 👉 外层大容器：引入自定义背景图（如果你上传了 portfolio-bg.jpg）
    <div 
      className="w-full min-h-screen bg-cover bg-center pt-8 pb-32 px-4 md:px-8 relative z-10 font-sans selection:bg-[#ccff00] selection:text-black text-white flex flex-col"
      style={{ backgroundImage: 'url(/portfolio-bg.jpg)', backgroundColor: '#050505' }} // 如果没有背景图，默认黑色兜底
    >
      <div className="max-w-[95vw] lg:max-w-[90vw] mx-auto w-full flex flex-col flex-1">
        
        {/* 👉 顶部玻璃拟态导航栏 */}
        <nav className="w-full flex items-center justify-between bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-6 md:px-10 py-4 shadow-2xl mb-8">
           <h1 className="text-xl md:text-2xl font-black tracking-widest text-white drop-shadow-md italic">SILENCE<sup className="text-[#ccff00]">7C</sup></h1>

           {/* 分类筛选条 */}
           <div className="hidden lg:flex items-center gap-8 text-sm font-bold text-white/70 overflow-x-auto no-scrollbar">
             <span onClick={() => handleFilter('All')} className={`cursor-pointer transition-colors ${filter === 'All' ? 'text-[#ccff00]' : 'hover:text-white'}`}>All</span>
             {Object.values(Category).map(cat => (
               <span key={cat} onClick={() => handleFilter(cat)} className={`cursor-pointer uppercase transition-colors ${filter === cat ? 'text-[#ccff00]' : 'hover:text-white'}`}>
                 {CATEGORY_LABELS[language][cat] || cat}
               </span>
             ))}
           </div>

           <div className="flex items-center gap-6 text-white">
              <Globe size={20} className="text-white/70 hover:text-white cursor-pointer"/>
              <div className="text-right text-[10px] font-bold leading-tight hidden md:block text-white/50">
                PORTFOLIO<br/>SHOWCASE<br/><span className="text-[#ccff00]">2026</span>
              </div>
           </div>
        </nav>

        {/* 👉 核心毛玻璃卡片包裹容器 */}
        <div className="flex-1 w-full bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-6 md:p-10 flex flex-col relative shadow-2xl">
           
           {/* 卡片头部：大标题与切换按钮 */}
           <div className="flex flex-col md:flex-row justify-between items-start w-full mb-8">
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase italic drop-shadow-sm">
                {language === 'zh' ? '精选作品' : 'SELECTED WORKS'}<span className="text-[#ccff00]">.</span>
              </h2>

              <div className="flex items-center gap-8 mt-6 md:mt-0">
                 {/* 当前编号与简介（仅在便当盒模式显示） */}
                 {viewMode === 'bento' && mainProject && (
                   <div className="flex items-start gap-4 md:gap-6 mr-2 md:mr-4">
                      <span className="text-5xl md:text-7xl font-black text-white/20 leading-none tracking-tighter drop-shadow-md">
                        {(currentIndex + 1).toString().padStart(2, '0')}
                      </span>
                      <div className="flex flex-col gap-1 text-[10px] md:text-xs font-bold text-white/80 uppercase tracking-widest max-w-[150px] md:max-w-[200px]">
                        <p className="text-[#ccff00] line-clamp-1">{mainProject.title}</p>
                        <p className="line-clamp-2 text-white/50">{mainProject.description}</p>
                      </div>
                   </div>
                 )}

                 {/* 👉 布局模式切换按钮 */}
                 <div className="flex bg-black/40 rounded-full p-1 border border-white/10 shadow-inner shrink-0">
                   <button onClick={() => setViewMode('bento')} className={`p-2 rounded-full transition-all ${viewMode === 'bento' ? 'bg-[#ccff00] text-black' : 'text-white/50 hover:text-white'}`} title="聚焦展示">
                      <Search size={18} />
                   </button>
                   <button onClick={() => setViewMode('grid')} className={`p-2 rounded-full transition-all ${viewMode === 'grid' ? 'bg-[#ccff00] text-black' : 'text-white/50 hover:text-white'}`} title="网格列表">
                      <LayoutGrid size={18} />
                   </button>
                 </div>
              </div>
           </div>

           {/* ================= 模式1：高级便当盒聚焦展示 ================= */}
           {viewMode === 'bento' && mainProject && (
             <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-[450px]">
                
                {/* 左侧副卡片 (下一个作品预览) */}
                <div className="lg:w-1/3 bg-black/40 border border-white/10 rounded-[2.5rem] p-4 flex flex-col relative shadow-inner group overflow-hidden">
                   <div className="absolute top-8 left-8 z-10">
                      <h3 className="text-2xl font-black text-white drop-shadow-md uppercase line-clamp-1 italic">{sideProject.title}</h3>
                      <p className="text-[10px] font-bold text-[#ccff00] tracking-widest uppercase mt-1">Up Next</p>
                   </div>
                   <div className="w-full h-[250px] lg:h-full bg-[#111] rounded-[2rem] overflow-hidden relative border border-white/5">
                      <img src={sideProject.image} alt={sideProject.title} className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-all duration-700 grayscale group-hover:grayscale-0"/>
                   </div>
                   
                   {/* 切换下一个的按钮 */}
                   <div
                      onClick={() => setCurrentIndex((prev) => (prev + 1) % filteredProjects.length)}
                      className="mt-4 bg-white/10 backdrop-blur-md rounded-full py-4 px-6 flex items-center justify-between shadow-sm cursor-pointer hover:bg-white/20 transition-colors border border-white/20 text-white"
                   >
                      <div className="flex items-center gap-2 font-black text-sm uppercase"><RefreshCw size={16}/> {language === 'zh' ? '下一个' : 'Next'}</div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{CATEGORY_LABELS[language][sideProject.category] || sideProject.category}</span>
                   </div>
                </div>

                {/* 右侧主卡片 (当前展示作品) */}
                <div className="lg:w-2/3 bg-black/60 border border-white/10 rounded-[2.5rem] overflow-hidden relative group shadow-inner">
                   <div className="absolute top-8 left-8 z-10">
                      <div className="bg-black/50 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10">
                        <h3 className="text-3xl lg:text-4xl font-black text-white uppercase italic drop-shadow-lg">{mainProject.title}</h3>
                      </div>
                   </div>

                   <img src={mainProject.image} alt={mainProject.title} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000"/>

                   {/* 悬浮标签 */}
                   <div className="absolute top-1/2 left-1/4 bg-black/70 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-5 py-3 rounded-full hidden md:flex items-center gap-4 cursor-default shadow-xl">
                      <span className="uppercase">{CATEGORY_LABELS[language][mainProject.category] || mainProject.category} <span className="text-gray-400 ml-2 font-normal">/ {mainProject.tags[0] || 'Design'}</span></span>
                      <div className="w-2 h-2 bg-[#ccff00] rounded-full ml-2 shadow-[0_0_8px_#ccff00]"></div>
                   </div>

                   {/* 详情按钮 */}
                   <div className="absolute bottom-6 right-6 flex items-center gap-3">
                      <button onClick={() => setSelectedProject(mainProject)} className="bg-[#ccff00] text-black px-8 py-4 rounded-full font-black text-sm hover:scale-105 transition-transform shadow-[0_0_20px_rgba(204,255,0,0.3)] uppercase tracking-widest">
                         {language === 'zh' ? '查看详情' : 'View Details'}
                      </button>
                   </div>
                </div>
             </div>
           )}

           {/* ================= 模式2：传统的炫酷黑绿网格模式 ================= */}
           {viewMode === 'grid' && (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
               {filteredProjects.map((project) => (
                 <div 
                   key={project.id} 
                   className="group cursor-pointer flex flex-col h-full bg-[#0a0a0a] overflow-hidden border border-white/10 hover:border-[#ccff00]/50 transition-all duration-500 transform-gpu hover:-translate-y-2 shadow-2xl"
                   style={{ borderRadius: '1.5rem' }}
                   onClick={() => setSelectedProject(project)}
                 >
                   <div className="w-full aspect-[4/3] bg-[#111] relative overflow-hidden border-b border-white/5">
                     {project.image ? (
                         <img src={project.image} alt={project.title} loading="lazy" className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100" />
                     ) : (
                         <div className="w-full h-full flex items-center justify-center bg-[#111]"><h4 className="text-xl font-black text-gray-700 uppercase italic">{project.title}</h4></div>
                     )}
                     <div className="absolute top-4 left-4 bg-[#ccff00] text-[#050505] px-3 py-1 text-[10px] font-black uppercase tracking-widest skew-x-[-10deg]">
                       <span className="skew-x-[10deg] block">{CATEGORY_LABELS[language][project.category] || project.category}</span>
                     </div>
                   </div>

                   <div className="p-5 lg:p-6 flex flex-col flex-grow">
                     <h3 className="text-lg lg:text-xl font-black text-white mb-2 line-clamp-2 leading-tight uppercase italic group-hover:text-[#ccff00] transition-colors">{project.title}</h3>
                     <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed font-medium mb-6 flex-grow">{project.description}</p>
                     
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
                   </div>
                 </div>
               ))}
               {filteredProjects.length === 0 && (
                 <div className="col-span-full text-center py-20 text-white/50 font-bold uppercase tracking-widest">No projects found.</div>
               )}
             </div>
           )}

        </div>
      </div>

      {/* 弹窗详情页：同步暗黑赛车风格 (保持不变) */}
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
                   <p className="text-xl text-gray-300 mb-8">{displayProject.description}</p>
                   <p className="text-lg text-gray-500">{displayProject.concept}</p>
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
