import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { PROJECTS, CATEGORY_LABELS } from '../constants';
import { Category, Language, Project } from '../types';
import { X } from 'lucide-react';

interface PortfolioSectionProps {
  language: Language;
  externalFilter?: string;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ language, externalFilter }) => {
  // 👉 删除了原本用于网格过滤的 filter 状态，因为我们将只显示一个长图
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [displayProject, setDisplayProject] = useState<Project | null>(null);
  const [isModalRendered, setIsModalRendered] = useState(false);

  // 👉 弹窗控制逻辑保持不变
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

  // 👉 获取当前语言下的第一个项目，作为长图展示的目标
  const targetProject = PROJECTS[language]?.[0];

  return (
    // 外层容器保持 w-full，使其自动撑开填满父级容器，与顶部对齐
    <div className="w-full relative z-10 font-sans text-[#111] pb-32">
      <div className="w-full flex flex-col items-center">

        {/* ================= 浅灰色大底板 + 模块化网格展示区 (现改为长图滚动) ================= */}
        {/* w-full 保证宽度铺满，和上方 Logo 对齐 */}
        <div className="w-full bg-[#f7f8f9] rounded-[2.5rem] md:rounded-[3rem] p-4 md:p-6 lg:p-10 shadow-sm border border-gray-100/50">
          
          {/* 👉 核心修改点：将原本的 grid 替换为一个可点击、可滾动的长图容器 */}
          <div 
            className="w-full bg-white rounded-[2rem] border border-gray-200 shadow-inner group cursor-pointer overflow-hidden relative"
            onClick={() => setSelectedProject(targetProject || null)}
          >
            {/* 封面缩略图容器：保持比例，防止图片变形 */}
            <div className="w-full aspect-[4/3] bg-gray-50 relative flex items-center justify-center overflow-hidden">
              {targetProject?.image ? (
                  <img 
                    src={targetProject.image} 
                    alt={targetProject.title} 
                    // 这里仍然是 w-full h-full 用于缩略图效果，点击后在弹窗中可以滚动
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
              ) : (
                  // 如果没有项目图片，显示一个长图占位符
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 text-gray-300 font-bold uppercase tracking-widest text-sm p-4 text-center">
                    <div className="text-6xl mb-4">🖼️</div>
                    <div>Placeholder for One Long Ecommerce Image</div>
                    <div className="text-xs mt-2 opacity-70">( Click to see details )</div>
                  </div>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* ================= 详情大图弹窗 (现可用于查看超长图) ================= */}
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
                   
                   {/* 上半部分：大图展示区 - 这里对长图非常友好！ */}
                   <div className="w-full bg-[#f7f8f9] relative flex items-start justify-center p-0 md:p-8 min-h-[50vh]">
                      {displayProject.image ? (
                          <img 
                            src={displayProject.image} 
                            alt={displayProject.title} 
                            // 这里是关键：h-auto 和 min-h-[2000px] 确保长图能完整展示并产生垂直滚动条
                            className="w-full h-auto min-h-[2000px] object-contain md:rounded-xl shadow-sm" 
                          />
                      ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-300 font-bold uppercase tracking-widest p-12 text-center">
                            <div className="text-8xl mb-6">🖼️</div>
                            Large Ecommerce Long Image Area
                          </div>
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
