/**
 * SKILLS MANAGER COMPONENT
 * Handles the logic and UI for the "See All Technical Skills" feature.
 * - Renders an animated toggle button.
 * - Launches a glassmorphic modal displaying the full technical inventory from portfolio.json.
 */
import React, { useState, useEffect } from 'react';
import details from '../data/details.json';

export default function SkillsManager({ allSkills }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="flex justify-center mt-12">
        <button 
          onClick={toggleModal}
          className="group flex items-center gap-2 px-8 py-4 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl font-bold text-slate-700 dark:text-slate-200 hover:border-primary hover:text-primary transition-all duration-300 shadow-sm active:scale-95"
        >
          <span>See All Technical Skills</span>
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            onClick={toggleModal}
          />

          {/* Modal Content */}
          <div className="relative w-full max-w-4xl max-h-[85vh] bg-white dark:bg-slate-950 rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
            
            {/* Header */}
            <div className="flex-shrink-0 bg-white dark:bg-slate-950 px-8 py-8 border-b border-slate-100 dark:border-slate-900 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Skill Inventory</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Technical expertise and tools (the list may not be latest, check resume for up-to-date information)</p>
              </div>
              <button 
                onClick={toggleModal}
                className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-900 text-slate-400 hover:text-red-500 transition-colors"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Grid of All Skills */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {allSkills.map((category, idx) => (
                  <div key={idx} className="space-y-4">
                    <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-primary">
                      <span className="text-lg">{details.skillIcons?.categories?.[category.category] || details.skillIcons?.categories?.default || "⚡"}</span>
                      {category.category}
                    </h3>
                    <ul className="space-y-2.5">
                      {category.items.map((skill, sIdx) => (
                        <li key={sIdx} className="flex items-center gap-3 text-slate-600 dark:text-slate-300 group">
                           <span className="text-lg">{details.skillIcons?.items?.[skill.name] || details.skillIcons?.items?.default || "⚡"}</span>
                           <span className="text-sm font-medium tracking-wide">{skill.name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
