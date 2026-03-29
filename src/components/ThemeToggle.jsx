/**
 * THEME TOGGLE COMPONENT
 * Manages the Dark/Light mode state.
 * - Persists preference to localStorage.
 * - Applies 'dark' class to the document root with smooth CSS transitions.
 */
import React, { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setTheme('dark');
    }
  }, []);

  const toggleTheme = () => {
    const isDark = theme === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    
    if (isDark) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <button 
      onClick={toggleTheme} 
      className="group relative p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] transition-all duration-300"
      aria-label="Toggle Dark Mode"
    >
      <div className="relative w-5 h-5 overflow-hidden">
        {/* Sun Icon */}
        <div className={`absolute inset-0 transition-all duration-500 transform ${theme === 'dark' ? 'translate-y-0 opacity-100 rotate-0' : 'translate-y-8 opacity-0 -rotate-90'}`}>
          <svg className="w-5 h-5 text-yellow-500 fill-current" viewBox="0 0 24 24">
            <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z" />
          </svg>
        </div>
        
        {/* Moon Icon */}
        <div className={`absolute inset-0 transition-all duration-500 transform ${theme === 'light' ? 'translate-y-0 opacity-100 rotate-0' : '-translate-y-8 opacity-0 rotate-90'}`}>
          <svg className="w-5 h-5 text-slate-700 fill-current" viewBox="0 0 24 24">
            <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z" />
          </svg>
        </div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-md bg-primary/10"></div>
    </button>
  );
}