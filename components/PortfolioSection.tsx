import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { PROJECTS, CATEGORY_LABELS } from '../constants';
import { Category, Language, Project } from '../types';
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
    // 👉 极致暗黑背景，与 Hero 区域完美融合
    <div className="w-full bg-[#050505] pb-32 pt-16 relative z-10 font-sans selection:bg-[#ccff00] selection:text-black text-white">
      {/* 宽度与 Hero 区域保持绝对一致 */}
      <div className="max-w-[95vw] lg:max-w-[90vw] mx-auto">
        
        {/* 赛车风大标题 */}
        <div className="mb-10 flex justify-start items-end border-b border-white/10 pb-6">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic text-white">
            {language === 'zh' ? '精选作品' : 'SELECTED WORKS'}
            <span className="text-[#ccff00]">.</span>
          </h2>
        </div>

        {/* 倾斜的分类胶囊按钮 */}
        <div className="flex flex-wrap gap-4 mb-16 sticky top-20 md:top-24 z-30 py-4 overflow-x-auto no-scrollbar justify-start">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`
                px-6 py-2 md:px-8 md:py-3 font-black uppercase tracking-widest italic transition-all duration-300 transform skew-x-[-10deg]
                ${filter === cat 
                  ? 'bg-[#ccff00] text-[#050505] shadow-[0_0_20px_rgba(204,255,0,0.3)]'
                  : 'bg-transparent text-white border border-white/20 hover:border-[#ccff00] hover:text-[#ccff00]'}
              `}
            >
              <span className="skew-x-[10deg] block">{CATEGORY_LABELS[language][cat] || cat}</span>
            </button>
          ))}
        </div>

        {/* 作品网格：保持 4 列，全面暗黑化 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="group cursor-pointer flex flex-col h-full bg-[#0a0a0a] overflow-hidden border border-white/5 hover:border-[#ccff00]/50 transition-all duration-500 transform-gpu hover:-translate-y-2 shadow-2xl"
              style={{ borderRadius: '1rem' }}
              onClick={() => setSelectedProject(project)}
            >
              
              {/* 图片容器：默认灰度黑白，鼠标悬停时恢复全彩（强烈的视觉冲击） */}
              <div className="w-full aspect-[4/3] bg-[#111] relative overflow-hidden border-b border-white/5">
                {project.image && !project.image.includes('picsum') ? (
                    <img 
                      src={project.image} alt={project.title} loading="lazy" decoding="async" referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#111]">
                        <h4 className="text-xl font-black text-gray-700 uppercase italic">{project.title}</h4>
                    </div>
                )}
                {/* 荧光绿倾斜分类标签 */}
                <div className="absolute top-4 left-4 bg-[#ccff00] text-[#050505] px-3 py-1 text-[10px] font-black uppercase tracking-widest skew-x-[-10deg]">
                  <span className="skew-x-[10deg] block">{CATEGORY_LABELS[language][project.category] || project.category}</span>
                </div>
              </div>

              {/* 卡片内容区 */}
              <div className="p-5 lg:p-6 flex flex-col flex-grow">
                <h3 className="text-xl lg:text-2xl font-black text-white mb-2 line-clamp-2 leading-tight uppercase italic group-hover:text-[#ccff00] transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs lg:text-sm text-gray-400 line-clamp-2 leading-relaxed font-medium mb-6 flex-grow">
                  {project.description}
                </p>
                
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/10">
                  <div className="flex flex-wrap gap-2 overflow-hidden max-h-6">
                    {project.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[10px] font-bold text-[#ccff00] uppercase tracking-wider">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  {/* 荧光绿倾斜方块箭头 */}
                  <div className="bg-[#ccff00] text-[#050505] w-10 h-10 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 skew-x-[-10deg]">
                    <ArrowUpRight size={20} className="skew-x-[10deg]" strokeWidth={3} />
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* 弹窗详情页：同步暗黑赛车风格 */}
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
    </div>
  );
};
