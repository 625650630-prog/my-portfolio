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
    <div className="w-full min-h-screen bg-white pb-32 pt-8 relative z-10 font-sans text-[#111]">
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 flex flex-col">
        
        {/* ================= 极简导航 ================= */}
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

        {/* ================= 模块化网格展示区 (极简纯图) ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="group cursor-pointer bg-white rounded-[2rem] p-3 md:p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500 transform-gpu hover:-translate-y-1 border border-gray-100/80"
              onClick={() => setSelectedProject(project)}
            >
              <div className="w-full aspect-[4/3] bg-gray-50 rounded-[1.5rem] overflow-hidden relative flex items-center justify-center">
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
            <div className="col-span-full text-center py-24 text-gray-400 font-medium uppercase tracking-widest">
              No projects available.
            </div>
          )}
        </div>
      </div>

      {/* ================= 详情大图弹窗 ================= */}
      {isModalRendered && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-
