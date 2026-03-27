import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { PROJECTS, CATEGORY_LABELS } from '../constants';
import { Category, Language, Project } from '../types';
import { X } from 'lucide-react';

interface PortfolioSectionProps {
  language: Language;
  externalFilter?: string;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ language, externalFilter }) => {
  const [filter, setFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [displayProject, setDisplayProject] = useState<Project | null>(null);
  const [isModalRendered, setIsModalRendered] = useState(false);

  useEffect(() => {
    if (externalFilter) {
      setFilter(externalFilter);
    }
  }, [externalFilter]);

  const currentProjects = PROJECTS[language];
  const filteredProjects = filter === 'All' 
    ? currentProjects 
    : currentProjects.filter(p => p.category === filter);

  // 弹窗控制逻辑
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
  };

  return (
    <div className="w-full min-h-screen bg-white pb-32 pt-12 md:pt-20 relative z-10 font-sans text-[#111]">
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 flex flex-col">
        
        {/* ================= 极简导航 ================= */}
        {/* 仅保留分类名称，居中排版，与首页文字颜色一致 */}
        <nav className="w-full flex flex-wrap items-center justify-center gap-8 md:gap-14 mb-16 text-sm md:text-base font-bold text-gray-400">
           <span 
             onClick={() => handleFilter('All')} 
             className={`cursor-pointer transition-all duration-300 pb-1 border-b-2 ${filter === 'All' ? 'text-[#111] border-[#111]' : 'border-transparent hover:text-[#111]'}`}
           >
             {language === 'zh' ? '全部' : 'All'}
           </span>
           {Object.values(Category).map(cat => (
             <span 
               key={cat} 
               onClick={() => handleFilter(cat)} 
               className={`cursor-pointer uppercase transition-all duration-300 pb-1 border-b-2 ${filter === cat ? 'text-[#111] border-[#111]' : 'border-transparent hover:text-[#111]'}`}
             >
               {CATEGORY_LABELS[language][cat] || cat}
             </span>
           ))}
        </nav>

        {/* ================= 模块化网格展示区 (参考图1) ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="group cursor-pointer bg-white rounded-[2rem] p-3 md:p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500 transform-gpu hover:-translate-y-1 border border-gray-100/80"
              onClick={() => setSelectedProject(project)}
            >
              {/* 纯粹的图片模块，没有多余的文字 */}
              <div className="w-full aspect-[4/3] bg-gray-50 rounded-[1.5rem] overflow-hidden relative flex items-center justify-center">
                {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                ) : (
                    // 如果没有图片，显示极简的占位符
                    <div className="text-gray-300 font-bold uppercase tracking-widest text-xs">Image Placeholder</div>
                )}
              </div>
            </div>
          ))}

          {/* 兜底状态 */}
          {filteredProjects.length === 0 && (
            <div className="col-span-full text-center py-24 text-gray-400 font-medium uppercase tracking-widest">
              No projects available.
            </div>
          )}
        </div>
      </div>

      {/* ================= 详情大图弹窗 (参考图2风格) ================= */}
      {isModalRendered && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
           {/* 背景半透明遮罩 */}
           <div 
             className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${selectedProject ? 'opacity-100' : 'opacity-0'}`} 
             onClick={() => setSelectedProject(null)}
           ></div>
           
           {/* 弹窗主体内容框 */}
           <div className={`relative w-full max-w-5xl max-h-[90vh] overflow-y-auto no-scrollbar bg-white rounded-[2rem] shadow-2xl flex flex-col transition-all duration-300 transform ${selectedProject ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
             
             {displayProject && (
               <>
                 {/* 悬浮关闭按钮 */}
                 <button 
                   onClick={() => setSelectedProject(null)} 
                   className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/80 backdrop-blur-md hover:bg-gray-100 text-[#111] transition-colors shadow-sm"
                 >
                   <X size={24} strokeWidth={2.5} />
                 </button>

                 {/* 上半部分：大图展示区 */}
                 <div className="w-full bg-gray-50 relative shrink-0 min-h-[40vh] md:min-h-[50vh] flex items-center justify-center p-8 md:p-12 border-b border-gray-100">
                    {displayProject.image ? (
                        <img 
                          src={displayProject.image} 
                          alt={displayProject.title} 
                          className="w-full h-full max-h-[60vh] object-contain drop-shadow-xl rounded-xl" 
                        />
                    ) : (
                        <div className="text-gray-300 font-bold uppercase tracking-widest">Large Image Area</div>
                    )}
                 </div>

                 {/* 下半部分：文字信息区 */}
                 <div className="p-8 md:p-12 text-[#111] flex flex-col md:flex-row gap-8 md:gap-16">
                    {/* 左侧标题 */}
                    <div className="md:w-1/3 shrink-0">
                      <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">{displayProject.title}</h2>
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">
                        {CATEGORY_LABELS[language][displayProject.category] || displayProject.category}
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {displayProject.tags.map(tag => (
                            <span key={tag} className="text-xs font-bold text-gray-600 bg-gray-100 px-4 py-2 rounded-full">
                              {tag}
                            </span>
                        ))}
                      </div>
                    </div>

                    {/* 右侧详情描述 */}
                    <div className="md:w-2/3">
                      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Project Overview</h3>
                      <p className="text-base text-gray-600 leading-relaxed whitespace-pre-wrap mb-8">
                        {displayProject.description}
                      </p>

                      {displayProject.concept && (
                        <>
                           <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Design Concept</h3>
                           <p className="text-base text-gray-600 leading-relaxed font-medium">
                             {displayProject.concept}
                           </p>
                        </>
                      )}
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
