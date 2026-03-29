/**
 * INFORMATION MODAL COMPONENT
 * A universal reusable modal for displaying detailed achievements and descriptions.
 * - Supports Markdown rendering for project/experience deep-dives.
 * - Features glassmorphic styling and body-scroll locking for an immersive feel.
 */
import React, { useEffect, useMemo } from 'react';
import { marked } from 'marked';

export default function InfoModal({ isOpen, onClose, data }) {
  const htmlContent = useMemo(() => {
    if (!data?.content) return '';
    return marked.parse(data.content);
  }, [data?.content]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Backdrop with a more dramatic blur */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity duration-500"
        onClick={onClose}
      />

      {/* Modal Dialog with glassmorphism and refined bordering */}
      <div 
        className="relative w-full max-w-2xl max-h-[85vh] bg-white dark:bg-slate-900 rounded-[2rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300"
      >
        {/* Glow Effects */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-[80px]"></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-[80px]"></div>

        {/* Header - Fixed */}
        <div className="flex-shrink-0 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-b border-slate-100 dark:border-slate-800/50 px-8 py-6 flex items-start justify-between gap-6 relative z-10">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              Details & Achievements
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
              {data.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-sm">
               <p className="text-primary font-bold">{data.subtitle}</p>
               <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700"></span>
               <p className="text-slate-500 dark:text-slate-400 font-mono font-medium">{data.date}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 transition-all duration-300 shadow-sm"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content - Scrollable */}
        <div 
          className="flex-1 overflow-y-auto p-8 relative z-10 custom-scrollbar"
        >
          <article 
            className="prose prose-slate dark:prose-invert max-w-none 
            prose-headings:text-slate-900 dark:prose-headings:text-white 
            prose-p:text-slate-600 dark:prose-p:text-slate-300
            prose-li:text-slate-600 dark:prose-li:text-slate-300
            prose-strong:text-primary prose-strong:font-bold
            [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:flex [&_h2]:items-center [&_h2]:gap-2
            [&_ul]:list-none [&_ul]:pl-0 [&_li]:relative [&_li]:pl-7 [&_li]:mb-4
            [&_li]:before:content-[''] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.6em] [&_li]:before:w-2 [&_li]:before:h-2 [&_li]:before:bg-primary [&_li]:before:rounded-full"
            dangerouslySetInnerHTML={{ __html: htmlContent }} 
          />
        </div>
      </div>
    </div>
  );
}