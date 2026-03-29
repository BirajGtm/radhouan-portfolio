/**
 * PROJECT CARD COMPONENT
 * The visual building block used for 'Featured Projects' on the homepage.
 * - Renders titles, descriptions, and tech stacks.
 * - Includes a custom fallback emoji system for projects without hero images.
 */
import React from 'react';

export default function ProjectCard({ title, description, tags, link, image, fallbackIcon, category }) {
  return (
    <a href={link} className="group relative flex flex-col h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:border-primary/40 transition-all duration-500 hover:-translate-y-2">
      
      {/* IMAGE AREA */}
      <div className="h-56 w-full overflow-hidden bg-slate-100 dark:bg-slate-950 relative border-b border-slate-100 dark:border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-end p-6">
           <span className="text-white font-bold text-sm tracking-widest uppercase">View Project ↗</span>
        </div>
        
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />
        ) : (
          /* FALLBACK PATTERN (If no image) */
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950">
             <span className="text-7xl group-hover:scale-125 transition-transform duration-500 grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-60 select-none">
                {fallbackIcon === 'python' ? '🐍' : 
                 fallbackIcon === 'react' ? '⚛️' : 
                 fallbackIcon === 'shield' ? '🛡️' : 
                 fallbackIcon === 'code' ? '💻' : '🚀'}
             </span>
          </div>
        )}
      </div>

      {/* CONTENT AREA */}
      <div className="p-8 flex flex-col flex-1 relative z-20">
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-primary/10 transition-colors"></div>
        
        <div className="flex flex-col mb-3">
          {category && (
            <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">
              {category} Project
            </span>
          )}
          <h3 className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-primary transition-colors tracking-tight">
              {title}
          </h3>
        </div>
        
        <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed mb-6 line-clamp-3">
            {description}
        </p>
        
        {/* TAGS */}
        <div className="flex flex-wrap gap-2 mt-auto">
            {tags.map(tag => (
                <span key={tag} className="px-3 py-1 text-[10px] font-bold font-mono tracking-wider uppercase bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 group-hover:text-primary group-hover:bg-primary/10 rounded-full border border-slate-200/50 dark:border-slate-700/50 group-hover:border-primary/20 transition-all duration-300">
                    {tag}
                </span>
            ))}
        </div>
      </div>
    </a>
  );
}