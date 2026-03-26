import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Language, Category, Project } from '../types';
import { CONTACT_DATA } from '../src/data/contact';
import { ArrowRight, Play, CheckCircle2, Star, ArrowUpRight, X, ZoomIn, ZoomOut } from 'lucide-react';
// 引入作品数据用于瀑布流展示
import { PROJECTS, CATEGORY_LABELS } from '../constants';

interface HeroSectionProps {
  onNavigate: (page: string) => void;
  onCategorySelect: (category: Category) => void;
  language: Language;
}

// 👉 定义瀑布流卡片类型 (删除了文字块类型)
type GridItem = 
  | { type: 'project'; data: Project; height: string };

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onCategorySelect, language }) => {
  const contactContent = CONTACT_DATA[language];

  // 弹窗与高级看图状态管理
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [displayProject, setDisplayProject] = useState<Project | null>(null);
  const [isModalRendered, setIsModalRendered] = useState(false);
  
  // 滚轮缩放与拖拽状态
  const [zoomScale, setZoomScale] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleExploreClick = () => {
    onCategorySelect(Category.ALL);
    onNavigate('portfolio');
  };

  // 监听弹窗打开/关闭，锁定背景滚动，并重置缩放状态
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
        setZoomScale(1);
        setPanPosition({ x: 0, y: 0 });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [selectedProject]);

  // 核心技能数据
  const skillsList = [
    'Photoshop', 'CorelDRAW', 'Illustrator', 'Premiere', 'After Effects', 
    'Lightroom', 'DaVinci Resolve', 'ComfyUI', 'Gemini', '剪映', '即梦', 'DeepSeek'
  ];
  const marqueeTrack = [...skillsList, ...skillsList, ...skillsList];

  // 精选优质作品数据 (5个手风琴板块)
  const showcaseData = [
    {
      number: '01',
      titleZh: 'AIGC 视觉探索',
      titleEn: 'AIGC Exploration',
      desc: '结合 Stable Diffusion 与 Midjourney，生成极具商业现实感的视觉叙事。',
      img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop',
    },
    {
      number: '02',
      titleZh: '电商视觉设计',
      titleEn: 'E-commerce Visual',
      desc: '为头部平台打造可扩展的视觉规范与大促氛围包装，提升用户转化。',
      img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop',
    },
    {
      number: '03',
      titleZh: '新媒体动态',
      titleEn: 'New Media Motion',
      desc: '充满活力的短视频动效与品牌片头，在快节奏的社交媒体中抓住眼球。',
      img: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop',
    },
    {
      number: '04',
      titleZh: '商业影像精修',
      titleEn: 'Commercial Photo',
      desc: '专业的商业产品摄影与影视级调色，呈现无与伦比的产品质感。',
      img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop',
    },
    {
      number: '05',
      titleZh: 'UI/UX 体验',
      titleEn: 'UI/UX Design',
      desc: '从原型到开发部署，全流程打造极致的用户交互体验与功能性。',
      img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop',
    }
  ];

  // 👉 全新升级：彻底用图片填满瀑布流，删除了所有文字/色块块
  // 1. COMMERCIAL 块 (原本第一列第一块)
  // 2. BRAND IDENTITY 块 (原本第一列第二块)
  // 3. Explore 块 (原本第一列第四块)
  // 全部替换为从你 PROJECTS 数据中提取的新图片

  const allProjects = PROJECTS[language]; // 获取所有项目
  
  // 👉 定义全新的网格项数组，只包含图片
  const gridItems: GridItem[] = [
    // --- 第一列 (填满左侧空白) ---
    // 原 COMMERCIAL 块位置 -> 替换为项目图片
    { type: 'project', data: allProjects[allProjects.length - 1], height: '300px' }, 
    // 原 BRAND IDENTITY 块位置 -> 替换为项目图片
    { type: 'project', data: allProjects[allProjects.length - 2], height: '280px' },
    // 原项目1块 -> 保持
    { type: 'project', data: allProjects[0], height: '400px' },
    // 原 Explore 块位置 -> 替换为项目图片
    { type: 'project', data: allProjects[allProjects.length - 3], height: '250px' },

    // --- 第二列 (保持错落) ---
    { type: 'project', data: allProjects[1], height: '450px' },
    { type: 'project', data: allProjects[2], height: '400px' },
    { type: 'project', data: allProjects[3], height: '350px' },

    // --- 第三列 ---
    { type: 'project', data: allProjects[4], height: '400px' },
    { type: 'project', data: allProjects[5], height: '350px' },
    { type: 'project', data: allProjects[allProjects.length - 4], height: '300px' }, // 使用最后面的项目
    
    // --- 第四列 ---
    { type: 'project', data: allProjects[6], height: '400px' },
    { type: 'project', data: allProjects[7], height: '350px' },
  ];

  return (
    <div className="w-full bg-white font-sans pt-4 md:pt-6 px-0 md:px-0 relative selection:bg-black selection:text-white">
      
      <style>
        {`
          @keyframes marquee-slow {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee-logos { 
            animation: marquee-slow 40s linear infinite; 
          }
        `}
      </style>

      {/* 核心灰色包裹容器 */}
      <div className="w-full max-w-[95vw] lg:max-w-[90vw] mx-auto bg-gradient-to-br from-[#f4f5f7] to-[#e5e7eb] rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 relative overflow-hidden shadow-sm border border-gray-100/50 min-h-[85vh] flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 relative z-20 w-full py-8 lg:py-12 lg:px-16 xl:px-32">
          {/* 左侧文字区 */}
          <div className="lg:col-span-6 flex flex-col items-start justify-center">
            <div className="flex items-center gap-3 mb-6 lg:mb-8">
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white">
                <span className="font-serif italic text-lg pr-1">S</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-black leading-tight">100+ Projects</span>
                <span className="text-sm text-gray-500 font-medium underline decoration-gray-300 underline-offset-4 cursor-pointer hover:text-black transition-colors">
                  {language === 'zh' ? '查看成功案例' : 'Read Our Success Stories'}
                </span>
              </div>
            </div>
            <h1 className="text-7xl md:text-8xl lg:text-[11rem] font-serif text-[#111] tracking-tighter leading-none mb-6 lg:mb-10 relative">
              Design<sup className="text-5xl md:text-8xl absolute top-4 ml-1">+</sup>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 font-medium max-w-md leading-relaxed mb-10">
              {language === 'zh' 
                ? '打破常规框架，将最前沿的视觉设计与 AIGC 技术结合 — 提供无与伦比的美学深度。' 
                : 'Drive Visual Growth, And Harness Ai-Powered Content — Up To 50x Faster.'}
            </p>
            <div className="flex items-center gap-4 mb-12 border-t border-gray-300/50 pt-8 w-full max-w-md">
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center shrink-0">
                 <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop" alt="avatar" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col text-sm font-bold text-gray-700">
                <span>{language === 'zh' ? '坐标' : 'Location'} / <Star className="inline w-3 h-3 mb-0.5" fill="currentColor"/> {contactContent.baseLabel}</span>
                <span className="text-gray-500 font-medium text-base mt-0.5">{contactContent.locationValue}</span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <button 
                onClick={handleExploreClick}
                className="bg-black text-white px-8 py-4 rounded-full font-bold text-sm lg:text-base transition-transform hover:scale-105 shadow-xl"
              >
                {language === 'zh' ? '探索精选作品' : 'Explore Works'}
              </button>
              <button 
                onClick={() => onNavigate('contact')}
                className="font-bold text-sm lg:text-base text-[#111] hover:text-gray-500 transition-colors flex items-center gap-2 group"
              >
                {language === 'zh' ? '查看服务报价' : 'Our Pricing'}
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
          {/* 右侧图片悬浮区 */}
          <div className="lg:col-span-6 relative h-[500px] lg:h-[650px] w-full max-w-lg lg:max-w-[550px] mx-auto mt-10 lg:mt-0">
            <div className="absolute inset-4 lg:inset-8 bg-gradient-to-br from-[#ff7a50] to-[#ff5030] rounded-[3rem] shadow-2xl overflow-hidden">
               <img 
                 src="https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop" 
                 alt="Main Visual" 
                 className="w-full h-full object-cover mix-blend-overlay opacity-80"
               />
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-16 h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-transform z-20">
              <Play size={28} className="text-black ml-1 lg:ml-2" fill="currentColor" />
            </div>
            <div className="absolute top-16 right-10 lg:-left-6 lg:top-32 bg-white/90 backdrop-blur-sm px-5 py-3 rounded-full shadow-lg flex items-center gap-3 text-sm lg:text-base font-bold z-30 animate-fade-in">
              <div className="bg-[#ff5030] text-white rounded-full p-1"><CheckCircle2 size={16} /></div>
              Visual Design Done?
            </div>
            <div className="absolute top-32 right-24 lg:-left-0 lg:top-48 bg-white/90 backdrop-blur-sm px-5 py-3 rounded-full shadow-lg flex items-center gap-3 text-sm lg:text-base font-bold z-30 animate-fade-in delay-100">
              <div className="bg-blue-500 text-white rounded-full p-1"><CheckCircle2 size={16} /></div>
              AIGC Optimized!
            </div>
            <div className="absolute top-10 right-0 lg:-right-6 bg-white/40 backdrop-blur-xl border border-white/40 p-6 rounded-3xl shadow-2xl z-20 w-44 lg:w-48">
              <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">— Efficiency</span>
              <h3 className="text-5xl font-black text-black my-2">50x</h3>
              <p className="text-xs lg:text-sm font-medium text-gray-700 leading-snug">Faster delivery with AI integration</p>
            </div>
            <div className="absolute bottom-8 right-4 lg:-right-8 bg-white/50 backdrop-blur-2xl border border-white/50 p-5 rounded-3xl shadow-2xl z-20 flex items-center gap-4">
              <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                 <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=200&auto=format&fit=crop" alt="project" className="w-full h-full object-cover"/>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-black leading-tight text-lg lg:text-xl">Brand Identity<br/>System</span>
                <span className="font-black text-2xl lg:text-3xl mt-1">#01</span>
                <div className="flex items-center gap-1 mt-1 lg:mt-2 text-xs font-bold bg-white px-3 py-1 rounded-full w-max shadow-sm">
                  <Star size={12} fill="black" /> 5.0
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部软件 Logo 墙 */}
      <div className="w-full max-w-[95vw] lg:max-w-[80vw] mx-auto mt-12 mb-16 overflow-hidden relative" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
        <div className="flex w-max animate-marquee-logos items-center gap-12 lg:gap-20">
          {skillsList.concat(skillsList, skillsList).map((skill, index) => (
            <div key={index} className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 cursor-default">
              <div className="w-6 h-6 rounded-md bg-black text-white flex items-center justify-center font-bold text-[10px]">
                {skill.substring(0, 2).toUpperCase()}
              </div>
              <span className="text-xl md:text-3xl font-black tracking-tighter text-[#111]">
                {skill}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 精选优质作品标题区 */}
      <div className="w-full max-w-[95vw] lg:max-w-[90vw] mx-auto pt-20 pb-32 mt-10 relative selection:bg-black selection:text-white">
        <div className="flex flex-col items-center text-center mb-16 border-b-2 border-gray-100 pb-10 px-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-3 text-[#111] max-w-4xl mx-auto">
            {language === 'zh' ? '精选优质作品' : 'Selected Premium Works'}
          </h2>
          <h3 className="text-xl md:text-2xl font-light uppercase tracking-widest text-gray-500 italic mt-2">
             Create a visual feast
          </h3>
        </div>

        {/* 手风琴画廊 */}
        <div className="w-full flex flex-col lg:flex-row gap-4 h-[750px] lg:h-[650px]">
          {showcaseData.map((item, index) => (
            <div 
              key={index}
              className="group relative flex-1 lg:hover:flex-[4] hover:flex-[3] rounded-3xl overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer shadow-sm hover:shadow-2xl"
              onClick={() => onCategorySelect(Category.ALL)}
            >
              <img 
                src={item.img} 
                alt={item.titleEn} 
                className="absolute inset-0 w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-700"></div>

              {/* 卡片内容容器 */}
              <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8 flex flex-col justify-end h-full">
                <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-3 mb-2 lg:mb-0 transition-all duration-700 group-hover:mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-white font-black text-3xl lg:text-4xl opacity-80 group-hover:opacity-100 group-hover:text-[#ff5030] transition-colors shrink-0">
                      {item.number}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-white font-bold text-xl lg:text-2xl leading-none transition-colors">
                        {language === 'zh' ? item.titleZh : item.titleEn}
                      </span>
                      <span className="text-gray-400 text-xs font-medium lg:text-sm mt-0.5 group-hover:text-gray-200 transition-colors">
                        {language === 'zh' ? item.titleEn : item.titleZh}
                      </span>
                    </div>
                  </div>
                  <div className="hidden lg:block h-[2px] w-8 bg-[#ff5030] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 delay-100"></div>
                </div>

                <div className="opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 delay-100 flex flex-col overflow-hidden max-h-0 group-hover:max-h-[300px]">
                  <div className="min-w-[250px] md:min-w-[300px]">
                    <h3 className="text-white font-bold text-2xl lg:text-3xl mb-3 mt-2 leading-tight">
                      {language === 'zh' ? item.titleZh : item.titleEn}
                    </h3>
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed hidden lg:block line-clamp-2">
                      {item.desc}
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-sm font-bold text-[#ff5030] uppercase tracking-widest">
                      Explore Project <ArrowUpRight size={16} strokeWidth={3} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 统一间距：更多案例存档瀑布流区 */}
      <div className="w-full max-w-[95vw] lg:max-w-[90vw] mx-auto pt-20 pb-32 border-t border-gray-100 mt-10 selection:bg-black selection:text-white relative">
        <div className="flex flex-col items-center text-center mb-16 border-b-2 border-gray-100 pb-10 px-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-3 text-[#111] max-w-4xl mx-auto">
            {language === 'zh' ? '更多案例存档' : 'Project Archive'}
          </h2>
          <h3 className="text-xl md:text-2xl font-light uppercase tracking-widest text-gray-500 italic mt-2">
             Explore the full collection
          </h3>
          <button 
            onClick={() => { onCategorySelect(Category.ALL); onNavigate('portfolio'); }}
            className="hidden md:flex items-center gap-2 font-bold text-sm uppercase tracking-widest hover:text-[#ff5030] transition-colors mt-8 bg-white border border-gray-200 rounded-full px-8 py-4 shadow-sm hover:shadow-lg transition-all"
          >
            {language === 'zh' ? '查看完整作品集' : 'View Full Portfolio'} <ArrowRight size={16} />
          </button>
        </div>

        {/* 带有两侧渐变虚化的瀑布流区域 */}
        <div className="w-full overflow-hidden relative" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
          
          {/* 👉 全图片错落瀑布流网格，左侧3个空白已填满 */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 pb-10 px-10">
            {gridItems.map((item, index) => {
              const project = item.data;
              return (
                <div 
                  key={`${project.id}-${index}`} 
                  className="break-inside-avoid relative group rounded-[2rem] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 transform-gpu hover:-translate-y-1 bg-gray-100 border border-gray-200/50"
                  onClick={() => setSelectedProject(project)}
                >
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    loading="lazy"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ minHeight: item.height }} // 使用项目指定的高度制造错落感
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="bg-white text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full w-max mb-3">
                        {CATEGORY_LABELS[language][project.category] || project.category}
                      </div>
                      <h3 className="text-white text-xl md:text-2xl font-bold leading-tight mb-2">{project.title}</h3>
                      <p className="text-gray-300 text-sm line-clamp-2">{project.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button 
           onClick={() => { onCategorySelect(Category.ALL); onNavigate('portfolio'); }}
           className="md:hidden mt-10 w-full py-4 rounded-full border-2 border-black font-bold text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
        >
          {language === 'zh' ? '查看完整作品集' : 'View Full Portfolio'}
        </button>
      </div>

      {/* 小红书风格的作品详情弹窗 */}
      {isModalRendered && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-8">
           {/* 背景模糊遮罩层，点击关闭 */}
           <div 
             className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${selectedProject ? 'opacity-100' : 'opacity-0'}`} 
             onClick={() => setSelectedProject(null)}
           ></div>

           {/* 弹窗主体容器：左右分栏 */}
           <div className={`relative w-full h-full md:max-w-6xl md:h-[85vh] bg-white md:rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden transition-all duration-300 transform ${selectedProject ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
             
             {displayProject && (
               <>
                 {/* 左侧：专业级滚轮缩放与拖拽画板 */}
                 <div 
                   className="w-full md:w-[65%] h-[40vh] md:h-full bg-[#111] relative flex items-center justify-center overflow-hidden group"
                   onWheel={(e) => {
                     const delta = e.deltaY < 0 ? 0.2 : -0.2;
                     const newScale = Math.min(Math.max(zoomScale + delta, 1), 5); // 限制比例 1x ~ 5x
                     setZoomScale(newScale);
                     if (newScale === 1) setPanPosition({ x: 0, y: 0 }); // 缩回原位时重置平移
                   }}
                   onMouseDown={() => zoomScale > 1 && setIsDragging(true)}
                   onMouseUp={() => setIsDragging(false)}
                   onMouseLeave={() => setIsDragging(false)}
                   onMouseMove={(e) => {
                     if (isDragging && zoomScale > 1) {
                       setPanPosition(prev => ({ 
                         x: prev.x + e.movementX, 
                         y: prev.y + e.movementY 
                       }));
                     }
                   }}
                 >
                    <img 
                      src={displayProject.image} 
                      alt={displayProject.title} 
                      draggable="false" // 禁用浏览器默认拖拽行为
                      className={`w-full h-full object-contain p-0 md:p-8 ${isDragging ? 'transition-none' : 'transition-transform duration-200 ease-out'}`}
                      style={{ 
                        transform: `translate(${panPosition.x}px, ${panPosition.y}px) scale(${zoomScale})`,
                        cursor: zoomScale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in'
                      }}
                      onClick={() => {
                        if (zoomScale > 1) {
                          setZoomScale(1);
                          setPanPosition({ x: 0, y: 0 });
                        } else {
                          setZoomScale(2.5); // 点击快捷放大到 2.5倍
                        }
                      }}
                    />
                    
                    {/* 缩放交互提示胶囊 */}
                    <div className="absolute bottom-6 right-6 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50">
                       {zoomScale > 1 
                         ? <><ZoomOut size={16}/> {language === 'zh' ? '滚轮缩放 / 拖拽平移' : 'Scroll & Drag'}</> 
                         : <><ZoomIn size={16}/> {language === 'zh' ? '滚动滚轮 / 点击放大' : 'Scroll or Click'}</>}
                    </div>
                    
                    {/* 手机端关闭按钮 */}
                    <button onClick={() => setSelectedProject(null)} className="md:hidden absolute top-4 left-4 p-2 bg-black/50 backdrop-blur-md text-white rounded-full z-50">
                       <X size={20} />
                    </button>
                 </div>

                 {/* 右侧：详情信息面板 */}
                 <div className="w-full md:w-[35%] h-[60vh] md:h-full bg-white flex flex-col relative z-10 shadow-[-10px_0_20px_rgba(0,0,0,0.1)] shrink-0">
                   
                   <div className="flex items-center justify-between p-5 border-b border-gray-100 shrink-0">
                     <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden shrink-0">
                         <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" alt="avatar" className="w-full h-full object-cover"/>
                       </div>
                       <div className="flex flex-col">
                          <span className="font-bold text-sm text-[#111] leading-none mb-1">Silence 7C</span>
                          <span className="text-[10px] text-gray-500 font-medium">Visual Designer</span>
                       </div>
                     </div>
                     <button onClick={() => setSelectedProject(null)} className="hidden md:flex p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-gray-500 hover:text-black shrink-0">
                       <X size={20} />
                     </button>
                   </div>

                   <div className="p-6 md:p-8 overflow-y-auto no-scrollbar flex-grow">
                      <div className="bg-gray-100 text-gray-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full w-max mb-4">
                        {CATEGORY_LABELS[language][displayProject.category] || displayProject.category}
                      </div>
                      
                      <h2 className="text-2xl md:text-3xl font-black mb-4 text-[#111] leading-tight">
                        {displayProject.title}
                      </h2>
                      
                      <p className="text-sm md:text-base text-gray-600 mb-8 leading-relaxed whitespace-pre-wrap">
                        {displayProject.description}
                      </p>
                      
                      {displayProject.concept && (
                         <div className="bg-[#f8f9fa] p-5 rounded-2xl border border-gray-100 mb-8 relative overflow-hidden">
                           <div className="absolute top-0 left-0 w-1 h-full bg-[#ff5030]"></div>
                           <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Design Concept</h4>
                           <p className="text-sm text-gray-700 leading-relaxed font-medium">{displayProject.concept}</p>
                         </div>
                      )}

                      <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                        {displayProject.tags.map(tag => (
                          <span key={tag} className="text-xs font-bold text-[#ff5030] bg-[#ff5030]/10 px-3 py-1.5 rounded-full cursor-pointer hover:bg-[#ff5030] hover:text-white transition-colors">
                            #{tag}
                          </span>
                        ))}
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
