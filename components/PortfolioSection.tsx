import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { PROJECTS, CATEGORY_LABELS } from '../constants';
import { Category, Language, Project } from '../types';
import { PHOTOGRAPHY_GALLERY } from '../src/data/photography';
import { ArrowUpRight, X } from 'lucide-react';

interface PortfolioSectionProps {
  language: Language;
  externalFilter?: string;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ language, externalFilter }) => {
  const [filter, setFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [displayProject, setDisplayProject] = useState<Project | null>(null);
  const [isModalRendered, setIsModalRendered] = useState(false);

  // 监听来自上方英雄区的分类点击
  useEffect(() => {
    if (externalFilter) setFilter(externalFilter);
  }, [externalFilter]);

  const currentProjects = PROJECTS[language];

  // 根据当前过滤器筛选作品
  const filteredProjects = filter === 'All' 
    ? currentProjects 
    : currentProjects.filter(p => p.category === filter);

  // 弹窗状态管理
  useEffect(() => {
    if (selectedProject) {
      setDisplayProject(selectedProject);
      setIsModalRendered(true);
      document.body.style.overflow = 'hidden'; // 禁止背景滚动
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
    <div className="w-full bg-[#eef1f5] pb-20 pt-10">
      <div className="max-w-[90vw] lg:max-w-[80vw] mx-auto">
        
        {/* 👉 替换后的全新标题排版 */}
        <div className="mb-10 md:mb-16 pb-4 md:pb-6 border-b-2 border-black/5 flex justify-between items-end">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-[#111]">
            {language === 'zh' ? '精选作品展示' : 'SELECTED WORKS'}
          </h2>
          {/* 当处于筛选状态时，显示一个小提示，表明当前展示的是特定分类 */}
          {filter !== 'All' && (
            <span className="hidden md:block text-sm font-bold text-gray-400 uppercase tracking-widest bg-black/5 px-4 py-1.5 rounded-full">
               {CATEGORY_LABELS[language][filter] || filter}
            </span>
          )}
        </div>

        {/* Bento 风格作品网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="group cursor-pointer flex flex-col h-full bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 transform-gpu hover:-translate-y-2"
              onClick={() => setSelectedProject(project)}
            >
              
              {/* Image Container */}
              <div className="w-full aspect-[4/3] bg-gray-100 relative overflow-hidden">
                {project.image && !project.image.includes('picsum') ? (
                    <img 
                      src={project.image} alt={project.title} loading="lazy" decoding="async" referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 p-8 text-center">
                        <h4 className="text-2xl font-black text-gray-400">{project.title}</h4>
                    </div>
                )}
                
                {/* 图片左上角的分类标签依然保留，增加辨识度 */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-black px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                  {CATEGORY_LABELS[language][project.category] || project.category}
                </div>
              </div>

              {/* 卡片内容区 */}
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-black text-black mb-3 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed font-medium mb-6 flex-grow">
                  {project.description}
                </p>
                
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 overflow-hidden max-h-8">
                    {project.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[10px] font-bold text-gray-600 bg-gray-100 px-3 py-1 rounded-full uppercase tracking-wider">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  {/* 黑白交替圆角箭头 */}
                  <div className="relative z-20 mt-8 md:mt-12 mb-24 max-w-4xl mx-auto rounded-full p-6 md:p-8 flex flex-col md:flex-row items-center justify-around gap-6 shadow-2xl bg-[#151515] text-white">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* 弹窗部分 (保留你原有的详情逻辑) */}
        {isModalRendered && createPortal(
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
             <div className={`absolute inset-0 bg-black/80 ${selectedProject ? 'animate-[fadeIn_0.3s_ease-out_forwards]' : 'animate-fade-out'}`} onClick={() => setSelectedProject(null)}></div>

             <div className={`relative w-full max-w-5xl max-h-[90vh] overflow-y-auto no-scrollbar bg-white rounded-[2rem] shadow-2xl flex flex-col ${selectedProject ? 'animate-message-pop' : 'animate-message-pop-out'}`}>
               {displayProject && (
                 <>
                   <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 z-10 p-3 rounded-full bg-black/10 hover:bg-black/20 transition-colors">
                     <X size={24} className="text-black" />
                   </button>
                   
                   {/* 这里是你作品详情的排版，如果你原代码有更复杂的视频/画廊展示，可以直接替换下面这个 div 里的内容 */}
                   <div className="w-full bg-gray-100 relative group-modal-media shrink-0 aspect-video">
                      <img src={displayProject.image} alt={displayProject.title} className="w-full h-full object-cover" />
                   </div>
                   <div className="p-8 md:p-12 text-black">
                     <h2 className="text-4xl md:text-5xl font-black mb-6">{displayProject.title}</h2>
                     <p className="text-xl text-gray-600 mb-8">{displayProject.description}</p>
                     <p className="text-lg text-gray-500">{displayProject.concept}</p>
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
