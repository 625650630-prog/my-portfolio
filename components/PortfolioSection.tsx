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
    // 去掉了固定最大宽度，改用 w-full，使其自动填满父级容器，与顶部 Logo 对齐
    <div className="w-full relative z-10 font-sans text-[#111] pb-32">
      <div className="w-full flex flex-col items-center">

        {/* ================= 灰色毛玻璃分类导航 ================= */}
        <div className="flex justify-center mb-10 w-full">
          <div className="inline-flex flex-wrap items-center justify-center p-1.5 md:p-2 bg-gray-100/80 backdrop-blur-md rounded-full shadow-inner gap-1 md:gap-2">
            
            <button 
              onClick={() => handleFilter('All')} 
              className={`px-6 py-2.5 rounded-full text-sm md:text-base font-bold transition-all duration-300 ${
                filter === 'All' ? 'bg-white text-[#111] shadow-sm' : 'text-gray-500 hover:text-[#111]'
              }`}
            >
              {language === 'zh' ? '全部' : 'All'}
            </button>

            {Object.values(Category).map(cat => {
              // 👉 核心修复：自动过滤掉枚举中的 'Article' 标签和可能的空白异常标签
              if (!cat || cat.toString().toLowerCase() === 'article') return null;
              
              return (
                <button 
                  key={cat} 
                  onClick={() => handleFilter(cat)} 
                  className={`px-6 py-2.5 rounded-full text-sm md:text-base font-bold transition-all duration-300 ${
                    filter === cat ? 'bg-white text-[#111] shadow-sm' : 'text-gray-500 hover:text-[#111]'
                  }`}
                >
                  {CATEGORY_LABELS[language][cat] || cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= 浅灰色大底板 + 模块化网格展示区 ================= */}
        {/* w-full 保证宽度铺满，和上方对齐 */}
        <div className="w-full bg-[#f7f8f9] rounded-[2.5rem] md:rounded-[3rem] p-4 md:p-6 lg:p-10 shadow-sm border border-gray-100/50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="group cursor-pointer bg-white rounded-[2rem] shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500 transform-gpu hover:-translate-y-1 overflow-hidden"
                onClick={() => setSelectedProject(project)}
              >
                {/* 封面缩略图容器 */}
                <div className="w-full aspect-[4/3] bg-gray-50 relative flex items-center justify-center overflow-hidden">
                  {project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      />
                  ) : (
                      <div className="text-gray-300 font-bold uppercase tracking-widest text-xs">Image Placeholder</div>
                  )}
                </div>
              </div>
            ))}

            {filteredProjects.length === 0 && (
              <div className="col-span-full text-center py-32 text-gray-400 font-medium uppercase tracking-widest">
                No projects available.
              </div>
            )}
          </div>
        </div>

      </div>

      {/* ================= 详情大图弹窗 (支持超长图) ================= */}
      {isModalRendered && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
           {/* 背景半透明遮罩 */}
           <div 
             className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${selectedProject ? 'opacity-100' : 'opacity-0'}`} 
             onClick={() => setSelectedProject(null)}
           ></div>
           
           {/* 弹窗主体容器 */}
           <div className={`relative w-full max-w-5xl h-[90vh] bg-white rounded-[2rem] shadow-2xl flex flex-col transition-all duration-300 transform overflow-hidden ${selectedProject ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
             
             {displayProject && (
               <>
                 {/* 悬浮关闭按钮 */}
                 <button 
                   onClick={() => setSelectedProject(null)} 
                   className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/80 backdrop-blur-md hover:bg-gray-100 text-[#111] transition-colors shadow-sm border border-gray-200/50"
                 >
                   <X size={24} strokeWidth={2.5} />
                 </button>

                 {/* 内容滚动区域 */}
                 <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col">
                   
                   {/* 上半部分：大图展示区 */}
                   <div className="w-full bg-[#f7f8f9] relative flex items-start justify-center p-0 md:p-8 min-h-[50vh]">
                      {displayProject.image ? (
                          <img 
                            src={displayProject.image} 
                            alt={displayProject.title} 
                            className="w-full h-auto object-contain md:rounded-xl shadow-sm" 
                          />
                      ) : (
                          <div className="text-gray-300 font-bold uppercase tracking-widest flex items-center h-full">Large Image Area</div>
                      )}
                   </div>

                   {/* 下半部分：文字信息区 */}
                   <div className="p-8 md:p-12 text-[#111] flex flex-col md:flex-row gap-8 md:gap-16 shrink-0 bg-white border-t border-gray-100">
                      <div className="md:w-1/3 shrink-0">
                        <h2 className="text-3xl md:text-4xl font-black mb-4 leading-tight">{displayProject.title}</h2>
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">
                          {CATEGORY_LABELS[language][displayProject.category] || displayProject.category}
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {displayProject.tags.map(tag => (
                              <span key={tag} className="text-xs font-bold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                                #{tag}
                              </span>
                          ))}
                        </div>
                      </div>

                      <div className="md:w-2/3">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Project Overview</h3>
                        <p className="text-sm md:text-base text-gray-600 leading-relaxed whitespace-pre-wrap mb-8">
                          {displayProject.description}
                        </p>

                        {displayProject.concept && (
                          <>
                             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Design Concept</h3>
                             <p className="text-sm md:text-base text-gray-600 leading-relaxed font-medium">
                               {displayProject.concept}
                             </p>
                          </>
                        )}
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
