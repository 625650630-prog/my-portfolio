import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { PROJECTS, CATEGORY_LABELS } from '../constants';
import { Category, Language, Project } from '../types';
import { Globe, RefreshCw, X, ArrowRight, Star } from 'lucide-react';

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
      setCurrentIndex(0);
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

  // 处理没有项目的情况
  const hasProjects = filteredProjects.length > 0;

  return (
    // 👉 外层大容器：改为纯白色背景，去除黑色背景
    <div className="w-full min-h-screen bg-white pb-32 relative z-10 font-sans selection:bg-[#ccff00] selection:text-black text-[#111] flex flex-col pt-6 md:pt-10 px-4 md:px-0">
      <div className="max-w-[95vw] lg:max-w-[90vw] mx-auto w-full flex flex-col flex-1">
        
        {/* 👉 标题：居中显示，字体缩小，去除大斜体 */}
        <div className="mb-12 flex flex-col items-center text-center mx-auto border-b border-gray-100 pb-10 px-4">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-widest mb-3 text-[#111]">
            {language === 'zh' ? '精选作品集' : 'SELECTED PORTFOLIO'}
          </h2>
          <h3 className="text-lg md:text-xl font-light uppercase tracking-widest text-gray-500 italic mt-2">Create a visual feast</h3>
        </div>

        {/* 👉 顶部导航栏 (玻璃拟态：优化为白色清新风格) */}
        <nav className="w-full flex items-center justify-between bg-gray-100/50 backdrop-blur-xl border border-gray-200/50 rounded-full px-8 py-4 shadow-sm mb-8">
           <h1 className="text-xl md:text-2xl font-serif text-[#111] tracking-tighter drop-shadow-sm">Silence<sup className="text-xs ml-0.5">7C</sup></h1>

           {/* 分类筛选条 (改为深色字体) */}
           <div className="hidden lg:flex items-center gap-10 text-sm font-bold text-gray-600 overflow-x-auto no-scrollbar">
             <span onClick={() => handleFilter('All')} className={`cursor-pointer transition-colors ${filter === 'All' ? 'text-[#111]' : 'hover:text-[#111]'}`}>All</span>
             {Object.values(Category).map(cat => (
               <span key={cat} onClick={() => handleFilter(cat)} className={`cursor-pointer uppercase transition-colors ${filter === cat ? 'text-[#111]' : 'hover:text-[#111]'}`}>
                 {CATEGORY_LABELS[language][cat] || cat}
               </span>
             ))}
           </div>

           <div className="flex items-center gap-6 text-[#111]">
              <Globe size={20} className="text-gray-600 hover:text-[#111] cursor-pointer"/>
              <div className="text-right text-[10px] font-bold leading-tight hidden md:block text-gray-400">
                PORTFOLIO<br/>SHOWCASE<br/>NEW COLLECTION
              </div>
           </div>
        </nav>

        {/* 👉 核心毛玻璃卡片包裹容器 (白色清新玻璃拟态风格) */}
        <div className="flex-1 w-full bg-white/50 backdrop-blur-2xl border border-gray-100/70 rounded-[2.5rem] p-6 md:p-10 flex flex-col relative shadow-xl overflow-hidden">
           
           {/* 卡片头部 */}
           <div className="flex flex-col md:flex-row justify-between items-start w-full mb-10">
              <h2 className="text-3xl font-black text-[#111] drop-shadow-sm">O2<sup className="text-base ml-1">®</sup></h2>
              
              <div className="flex items-start gap-12 md:mr-20 mt-6 md:mt-0">
                 {/* 巨大编号 (改为深色混合) */}
                 {hasProjects && mainProject && (
                   <>
                    <span className="text-6xl md:text-7xl font-black text-[#111]/10 leading-none tracking-tighter drop-shadow-md">
                        {(currentIndex + 1).toString().padStart(2, '0')}
                    </span>
                    <div className="flex flex-col gap-1 text-[10px] md:text-xs font-bold text-gray-700 uppercase tracking-widest max-w-[150px] md:max-w-[200px]">
                        <p className="text-[#111] line-clamp-1">{mainProject.title}</p>
                        <p className="line-clamp-2 text-gray-500 font-medium">{mainProject.description}</p>
                    </div>
                   </>
                 )}
              </div>

              {/* 右上角按钮 (与首页一致的深色风格) */}
              <div className="flex items-center gap-2 mt-6 md:mt-0">
                 <button className="bg-[#111] text-white px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-md">Showcase</button>
              </div>
           </div>

           {/* ================= 核心：高级便当盒展示区 (已根据数据完善兜底逻辑) ================= */}
           {hasProjects && mainProject ? (
             <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-[450px]">
                
                {/* 左侧副卡片 (下一个作品预览) */}
                <div className="lg:w-1/3 bg-gray-100/70 border border-gray-100 rounded-[2rem] p-4 flex flex-col relative shadow-inner group overflow-hidden">
                   <div className="absolute top-8 left-8 z-10">
                      <h3 className="text-2xl font-black text-[#111] drop-shadow-md uppercase line-clamp-1 italic">{sideProject.title}</h3>
                      <p className="text-[10px] font-bold text-gray-500 tracking-widest uppercase mt-1">Up Next</p>
                   </div>
                   <div className="w-full h-[250px] lg:h-full bg-white rounded-[1.5rem] overflow-hidden relative border border-gray-100/50">
                      {sideProject.image ? (
                          <img src={sideProject.image} alt={sideProject.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700"/>
                      ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 font-bold uppercase text-xs">Work Image</div>
                      )}
                   </div>
                   
                   {/* 切换下一个的按钮 */}
                   <div
                      onClick={() => setCurrentIndex((prev) => (prev + 1) % filteredProjects.length)}
                      className="mt-4 bg-white/70 backdrop-blur-md rounded-full py-4 px-6 flex items-center justify-between shadow-sm cursor-pointer hover:bg-white transition-colors border border-gray-100 text-[#111]"
                   >
                      <div className="flex items-center gap-2 font-black text-sm uppercase"><RefreshCw size={16}/> {language === 'zh' ? '查看下一个' : 'Next Project'}</div>
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{CATEGORY_LABELS[language][sideProject.category] || sideProject.category}</span>
                   </div>
                </div>

                {/* 右侧主卡片 (当前展示作品) */}
                <div className="lg:w-2/3 bg-gray-100 border border-gray-100 rounded-[2.5rem] overflow-hidden relative group shadow-inner">
                   <div className="absolute top-8 left-8 z-10">
                      <div className="bg-white/80 backdrop-blur-md px-5 py-3 rounded-2xl border border-gray-100/70">
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-[#111] uppercase italic drop-shadow-lg">{mainProject.title}</h3>
                        <p className="text-xs font-bold text-gray-500 tracking-widest uppercase mt-1">Silence<sup className="text-xs">7C</sup> Portfolio</p>
                      </div>
                   </div>

                   {mainProject.image ? (
                       <img src={mainProject.image} alt={mainProject.title} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000"/>
                   ) : (
                       <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 font-bold uppercase text-2xl">Main Project Image</div>
                   )}

                   {/* 底部 详情按钮 (深色风格) */}
                   <div className="absolute bottom-6 right-6 flex items-center gap-3">
                      <button onClick={() => setSelectedProject(mainProject)} className="bg-[#111] text-white px-8 py-4 rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-2xl uppercase tracking-widest flex items-center gap-2 group">
                         {language === 'zh' ? '查看详情' : 'View Details'}
                         <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                      </button>
                   </div>
                </div>
             </div>
           ) : (
             // 👉 数据兜底：如果没有项目显示此内容
             <div className="col-span-full text-center py-24 text-gray-400 font-medium uppercase tracking-widest border border-dashed border-gray-200 rounded-[2rem]">No projects available in this category.</div>
           )}

        </div>
      </div>

      {/* 弹窗详情页：同步改为白色风格 */}
      {isModalRendered && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
           {/* 👉 弹窗遮罩改为深色 */}
           <div className={`absolute inset-0 bg-[#050505]/90 backdrop-blur-sm ${selectedProject ? 'opacity-100' : 'opacity-0'}`} onClick={() => setSelectedProject(null)}></div>
           
           {/* 👉 弹窗内容改为白色风格 */}
           <div className={`relative w-full max-w-6xl max-h-[90vh] overflow-y-auto no-scrollbar bg-white rounded-3xl shadow-2xl flex flex-col ${selectedProject ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
             {displayProject && (
               <>
                 <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 z-10 p-3 rounded-full bg-gray-100/70 backdrop-blur-md hover:bg-gray-200 text-[#111] transition-colors border border-gray-100">
                   <X size={24} />
                 </button>
                 <div className="w-full bg-gray-100 relative group-modal-media shrink-0 aspect-video border-b border-gray-100">
                    <img src={displayProject.image} alt={displayProject.title} className="w-full h-full object-contain" />
                 </div>
                 <div className="p-8 md:p-12 text-[#111]">
                   <h2 className="text-3xl md:text-4xl font-black mb-6 uppercase italic">{displayProject.title}</h2>
                   <p className="text-xl text-gray-600 mb-8 leading-relaxed whitespace-pre-wrap">{displayProject.description}</p>
                   {displayProject.concept && (
                        <div className="bg-[#f8f9fa] p-6 rounded-2xl border border-gray-100 mb-8 relative overflow-hidden">
                           <div className="absolute top-0 left-0 w-1.5 h-full bg-[#111]"></div>
                           <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Design Concept</h4>
                           <p className="text-sm text-gray-700 leading-relaxed font-medium">{displayProject.concept}</p>
                        </div>
                   )}
                   <div className="flex flex-wrap gap-2 pt-6 border-t border-gray-100">
                      {displayProject.tags.map(tag => (
                          <span key={tag} className="text-xs font-bold text-[#ccff00] bg-black px-4 py-1.5 rounded-full">#{tag}</span>
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
