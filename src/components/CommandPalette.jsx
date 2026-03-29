/**
 * GLOBAL COMMAND PALETTE (CLI)
 * Transforms the terminal into a system-wide modal triggered by CMD+K.
 */
import React, { useState, useEffect, useRef } from 'react';
import InteractiveTerminal from './InteractiveTerminal.jsx';

export default function CommandPalette({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [shortcut, setShortcut] = useState('CMD+K');
  
  const audioCtx = useRef(null);
  
  // OS Detection for shortcut display
  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.platform);
      setShortcut(isMac ? '⌘ CMD + K' : 'Ctrl + K');
    }
  }, []);

  const playBootSound = () => {
    if (typeof window === 'undefined') return;
    try {
      if (!audioCtx.current) {
        audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtx.current;
      if (ctx.state === 'suspended') ctx.resume();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      // Smooth rising Sine tone for premium "System Ready" feel
      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.3);
      
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch (e) {
      // Ignored
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      // CMD+K or CTRL+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      
      // Escape to close if open and not minimized
      if (e.key === 'Escape' && isOpen && !isMinimized) {
        setIsOpen(false);
      }
    };

    const handleLaunchFullscreen = () => {
      setIsOpen(true);
      setIsMinimized(false);
      // Mode-specific boot sound handled by the isOpen effect if needed,
      // but we play it here for immediate feedback on launch
      playBootSound();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-terminal-hub-fullscreen', handleLaunchFullscreen);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-terminal-hub-fullscreen', handleLaunchFullscreen);
    };
  }, [isOpen, isMinimized]);

  // Handle side-effects of opening separately from state update
  useEffect(() => {
    if (isOpen) {
      setIsMinimized(false);
      playBootSound();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-500 ${isMinimized ? 'pointer-events-none' : 'bg-slate-950/40 backdrop-blur-sm px-4'}`}>
      
      {/* MINIMIZED BUBBLE */}
      <button 
        className={`fixed bottom-6 right-6 w-14 h-14 bg-primary rounded-full shadow-2xl flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all duration-500 z-[110] border-2 border-white/20 pointer-events-auto
          ${isMinimized ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsMinimized(false);
        }}
        aria-label="Restore Terminal"
      >
        <span className="text-white text-xl pointer-events-none">⌨️</span>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse border border-white pointer-events-none"></span>
      </button>

      {/* TERMINAL MODAL - Always centered, considered "maximized" view */}
      <div className={`w-full max-w-4xl h-[80vh] transition-all duration-500 origin-bottom-right
        ${isMinimized 
          ? 'opacity-0 scale-50 translate-x-[100%] translate-y-[100%]' 
          : 'opacity-100 scale-100 translate-x-0 translate-y-0'}`}>
        
        <InteractiveTerminal 
          data={data} 
          isModal={true} 
          isFullscreen={true} // Inside the modal, we are already in the "launched" view
          shortcut={shortcut}
          onClose={() => {
            setIsOpen(false);
            setIsMinimized(false);
          }}
          onMinimize={() => setIsMinimized(true)}
        />
      </div>

      {/* QUICK ESCAPE HELPER */}
      {!isMinimized && (
        <div className="fixed bottom-8 text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] pointer-events-none animate-pulse">
            Press [ESC] to Exit Terminal Hub
        </div>
      )}
    </div>
  );
}
