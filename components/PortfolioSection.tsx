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

  useEffect(() => {
    if (externalFilter) setFilter(externalFilter);
  }, [externalFilter]);

  const currentProjects = PROJECTS[language];
  const preferredOrder = [
    Category.DESIGN,
    Category.AIGC,
    Category.NEW_MEDIA,
    Category.VIDEO_PHOTO,
    Category.MULTIVERSAL,
    Category.DEV
  ];
  
  const availableCategories = preferredOrder.filter(cat => 
    currentProjects.some(p => p.category === cat) || cat === Category.DEV
  );
  const categories = ['All', ...availableCategories];

  const filteredProjects = filter === 'All' 
    ? currentProjects 
    : currentProjects.filter(p => p.category === filter);

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
    <div className="w-full bg-[#eef1f5] pb-20 pt-4 md:pt-10">
      {/* 👉 重点：这里的宽度 max-w-[95vw] lg:max-w-[85vw] 现在和上方核心技能完全一致了，保证绝对左对齐 */}
      <div className="max-w-[95vw] lg:max-w-[85vw] mx-auto">
        
        {/* 👉 新增的“精选作品”大标题 */}
        <div className="mb-6 md:mb-8 flex justify-start items-end">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-[#111]">
            {language === 'zh' ? '精选作品' : 'SELECTED WORKS'}
          </h2>
        </div>

        {/* 分类胶囊按钮 (采用 justify-start 左对齐) */}
        <div className="flex flex-wrap gap-3 md:gap-4 mb-10 md:mb-12 sticky top-20 md:top-24 z-30 py-2 overflow-x-auto no-scrollbar justify-start">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`
                px-6 py-3 rounded-full text-sm md:text-base font-bold transition-all duration-300 whitespace-nowrap shadow-sm border
                ${filter === cat 
                  ? 'bg-[#111] text-white border-[#111] scale-105'
                  : 'bg-white text-[#111] border-transparent hover:border-gray-300 hover:bg-gray-50'}
              `}
            >
              {CATEGORY_LABELS[language][cat] || cat}
            </button>
          ))}
        </div>

        {/* 作品网格 */}
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
                  <div className="flex flex-wrap gap-2 overflow-hidden max-h-8">
                    {project.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[10px] font-bold text-gray-600 bg-gray-100 px-3 py-1 rounded-full uppercase tracking-wider">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="bg-[#111] text-white w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:rotate-45 group-hover:scale-110">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* 弹窗部分 */}
        {isModalRendered && createPortal(
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
             <div className={`absolute inset-0 bg-black/80 ${selectedProject ? 'animate-[fadeIn_0.3s_ease-out_forwards]' : 'animate-fade-out'}`} onClick={() => setSelectedProject(null)}></div>

             <div className={`relative w-full max-w-5xl max-h-[90vh] overflow-y-auto no-scrollbar bg-white rounded-[2rem] shadow-2xl flex flex-col ${selectedProject ? 'animate-message-pop' : 'animate-message-pop-out'}`}>
               {displayProject && (
                 <>
                   <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 z-10 p-3 rounded-full bg-black/10 hover:bg-black/20 transition-colors">
                     <X size={24} className="text-black" />
                   </button>
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
