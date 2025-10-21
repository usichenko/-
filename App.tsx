import React, { useState, useEffect } from 'react';
import type { CalorieResults } from './types';
import CalculatorForm from './components/CalculatorForm';
import ResultsDisplay from './components/ResultsDisplay';
import { SunIcon, MoonIcon } from './components/Icons';

const App: React.FC = () => {
  const [results, setResults] = useState<CalorieResults | null>(null);
  const [theme, setTheme] = useState(() => {
    // Check for saved theme in localStorage, fallback to system preference
    if (typeof window !== 'undefined') {
        const storedTheme = window.localStorage.getItem('theme');
        if (storedTheme) return storedTheme;
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen p-4 font-sans">
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900 transition-all"
        aria-label="Переключить тему"
      >
        {theme === 'light' ? (
          <MoonIcon className="w-6 h-6" />
        ) : (
          <SunIcon className="w-6 h-6" />
        )}
      </button>

      <main className="w-full max-w-4xl bg-white dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 transition-all duration-300 border border-transparent dark:border-slate-700/50">
        <CalculatorForm onCalculate={setResults} />
        <ResultsDisplay results={results} />
      </main>
    </div>
  );
};

export default App;
