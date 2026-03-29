/**
 * INTERACTIVE TERMINAL (CLI)
 * A Zsh-style command interface allowing users to query skills, projects, and contact info.
 * Enhanced for CMD+K Global Command Palette:
 * - Functional Window Controls: Red (Close), Yellow (Minimize), Green (Clear).
 * - Web Audio API: Immersive mechanical typing sounds with SSR safety.
 */
import React, { useState, useEffect, useRef } from 'react';

/**
 * @param {Object} props
 * @param {any} props.data - Portfolio data
 * @param {boolean} [props.isModal] - Whether to show in modal mode
 * @param {boolean} [props.isFullscreen] - Whether currently in fullscreen
 * @param {Function} [props.onClose] - Close handler
 * @param {Function} [props.onMinimize] - Minimize handler
 * @param {Function} [props.onFullscreen] - Fullscreen toggle handler
 * @param {string} [props.shortcut] - OS-specific shortcut string (e.g., CMD+K)
 */
export default function InteractiveTerminal({ 
  data, 
  isModal = false, 
  isFullscreen = false,
  onClose = () => {}, 
  onMinimize = () => {}, 
  onFullscreen = () => {}, 
  shortcut = 'CMD+K' 
}) {
  // --- UTILS ---
  const renderTerminalText = (text) => {
    if (!text) return text;
    // Split by the shortcut string to highlight it
    const parts = text.split(new RegExp(`(${shortcut})`, 'g'));
    return parts.map((part, i) => 
      part === shortcut 
        ? <span key={i} className="text-secondary font-black brightness-125 underline decoration-secondary/30 underline-offset-4">{part}</span> 
        : part
    );
  };

  const [history, setHistory] = useState([
    { type: 'input', text: 'whoami' },
    { type: 'output', text: `"${data.basics.role}"` },
    { type: 'input', text: 'help' },
    { type: 'output', text: `Available commands: whoami, uptime, ls, cat [file], clear, skills, projects, contact, date\n\n[ Info: Press ${shortcut} anytime to toggle this hub ]` }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const clearHistory = () => setHistory([]);

  // --- AUDIO UTILITY (Web Audio API) ---
  const audioCtx = useRef(null);
  const playClick = () => {
    if (typeof window === 'undefined') return;
    try {
      if (!audioCtx.current) {
        audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtx.current;
      if (ctx.state === 'suspended') ctx.resume();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      // Sharper Sine wave for a crisp, high-fidelity click
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.03);
      
      // Tight, high-speed envelope
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    } catch (e) {
      // Audio might be blocked by browser policy
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const commands = {
    help: () => `Available commands: whoami, uptime, ls, cat [file], clear, skills, projects, contact, date\n\nShortcut: ${shortcut} to toggle terminal`,
    whoami: () => `${data.basics.name} - ${data.basics.role}`,
    uptime: () => 'System active since 2019. Current uptime: 4+ years of professional IT automation experience.',
    date: () => new Date().toString(),
    ls: () => 'skills.md  projects.md  contact.md  about.txt',
    clear: () => {
      clearHistory();
      return null;
    },
    skills: () => data.skills.map(s => `• [${s.category}] ${s.items.map(i => i.name).join(', ')}`).join('\n'),
    projects: () => data.projects
      .filter(p => p.visible !== false)
      .map(p => `• [${p.category || 'Project'}] ${p.title}\n  ${p.description}`)
      .join('\n\n'),
    contact: () => `Email: ${data.basics.email}\nPhone: ${data.basics.phone}\nLocation: ${data.basics.location}`,
    cat: (args) => {
      if (!args) return 'cat: missing file operand';
      const file = args.toLowerCase().trim();
      if (file === 'skills.md') return commands.skills();
      if (file === 'projects.md') return commands.projects();
      if (file === 'contact.md') return commands.contact();
      if (file === 'about.txt') return data.basics.tagline;
      return `cat: ${args}: No such file or directory`;
    }
  };

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      playClick();
      const trimmedInput = input.trim();
      const parts = trimmedInput.split(/\s+/);
      const cmd = parts[0].toLowerCase();
      const args = parts.slice(1);
      
      if (!trimmedInput) {
        setHistory([...history, { type: 'input', text: '' }]);
        setInput('');
        return;
      }

      if (cmd === 'clear') {
        clearHistory();
        setInput('');
        return;
      }
      
      const newHistory = [...history, { type: 'input', text: trimmedInput }];
      
      if (commands[cmd]) {
        const result = commands[cmd](args.join(' '));
        if (result !== null) {
          newHistory.push({ type: 'output', text: result });
        }
      } else if (cmd === 'sudo') {
        newHistory.push({ type: 'output', text: 'nice try, but you do not have permission to rule this machine.' });
      } else {
        newHistory.push({ type: 'output', text: `command not found: ${cmd}. type 'help' for available commands.` });
      }
      
      setHistory(newHistory);
      setInput('');
    } else {
      if (e.key.length === 1 || e.key === 'Backspace') playClick();
    }
  };

  return (
    <div 
      className={`bg-slate-900/80 backdrop-blur-3xl shadow-2xl shadow-cyan-500/10 border border-slate-700/50 font-mono text-xs sm:text-sm flex flex-col overflow-hidden cursor-text transition-all duration-500
        ${isModal ? 'w-full h-full rounded-none sm:rounded-2xl sm:max-w-4xl sm:h-[80vh]' : 'rounded-3xl h-[300px] sm:h-[420px] w-full max-w-2xl hover:scale-[1.01]'}`}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-800/80 border-b border-white/5 backdrop-blur-md sticky top-0 z-10">
        <div className="flex gap-2.5 group/controls">
          <button 
            onClick={(e) => { e.stopPropagation(); clearHistory(); onClose?.(); }}
            className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] border border-[#e0443e] hover:brightness-110 active:brightness-90 transition-all shadow-sm flex items-center justify-center text-[8px] text-black font-black"
            title="Close & Clear"
          >
            <span className="opacity-0 group-hover/controls:opacity-40 transition-opacity">✕</span>
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onMinimize?.(); }}
            className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] border border-[#dea123] hover:brightness-110 active:brightness-90 transition-all shadow-sm flex items-center justify-center text-[10px] text-black font-black"
            title="Minimize"
          >
            <span className="opacity-0 group-hover/controls:opacity-40 transition-opacity -mt-1">−</span>
          </button>
          <button 
            onClick={(e) => { 
              e.stopPropagation(); 
              if (isFullscreen) return; // Do nothing if already full
              if (isModal) {
                onFullscreen?.();
              } else {
                // For standalone terminal on home: Launch the Hub
                window.dispatchEvent(new CustomEvent('open-terminal-hub-fullscreen'));
              }
            }}
            disabled={isFullscreen}
            className={`w-3.5 h-3.5 rounded-full border shadow-sm flex items-center justify-center text-[7px] text-black font-black transition-all
              ${isFullscreen 
                ? 'bg-green-900/30 border-green-900/20 cursor-not-allowed opacity-40' 
                : 'bg-[#27c93f] border-[#1aab29] hover:brightness-110 active:brightness-90 cursor-pointer'}`}
            title={isFullscreen ? "Already Fullscreen" : "Launch Fullscreen Hub"}
          >
            <span className={`opacity-0 ${!isFullscreen ? 'group-hover/controls:opacity-40' : ''} transition-opacity`}>▢</span>
          </button>
        </div>
        <div className="text-[10px] text-slate-400 font-black tracking-[0.2em] uppercase opacity-60 flex gap-4">
          <span>{isModal ? 'System Control Hub — zsh' : 'zsh — 80x24'}</span>
          <span className="hidden sm:inline text-cyan-400 font-black animate-pulse brightness-125 border-l border-white/10 pl-4">{shortcut}</span>
        </div>
        <div className="w-16 flex justify-end text-[10px] font-bold text-slate-500">
          {isModal ? 'SSH:80' : ''}
        </div>
      </div>

      {/* Terminal View */}
      <div 
        ref={scrollRef}
        className="flex-1 p-6 overflow-y-auto custom-scrollbar space-y-3 bg-[#030712]/40"
      >
        <div className="text-cyan-500/60 text-[10px] font-black uppercase tracking-widest mb-6 py-2 border-y border-cyan-500/10">
          Last login: {new Date().toLocaleString()} on ttys000
        </div>
        
        {history.map((line, i) => (
          <div key={i} className="leading-relaxed">
            {line.type === 'input' ? (
              <div className="flex gap-3 items-center">
                <span className="text-cyan-400 font-black drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">➜</span>
                <span className="text-purple-400 font-bold">~</span>
                <span className="text-white font-medium ml-1">{line.text}</span>
              </div>
            ) : (
              <div className="text-slate-300 pl-5 whitespace-pre-wrap opacity-95 border-l-[3px] border-slate-700/50 ml-[5px] py-1 italic">
                {renderTerminalText(line.text)}
              </div>
            )}
          </div>
        ))}

        {/* Input Line */}
        <div className="flex gap-3 items-center">
          <span className="text-cyan-400 font-black drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse">➜</span>
          <span className="text-purple-400 font-bold">~</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            className="flex-1 bg-transparent border-none outline-none text-white focus:ring-0 p-0 caret-primary font-medium"
            autoFocus
          />
        </div>
      </div>
      
      {/* Bottom Help Bar (Ghost Mode) */}
      <div className="px-6 py-2 bg-black/40 border-t border-white/5 flex gap-6 overflow-x-auto whitespace-nowrap scrollbar-hide backdrop-blur-xl">
         {['help', 'ls', 'skills', 'projects', 'contact', 'clear'].map(cmd => (
           <button 
             key={cmd}
             onClick={(e) => {
               e.stopPropagation();
               setInput(cmd);
               inputRef.current?.focus();
             }}
             className="text-[10px] font-black text-slate-500 hover:text-primary transition-colors uppercase tracking-widest"
           >
             {cmd}
           </button>
         ))}
      </div>
    </div>
  );
}
