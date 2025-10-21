
import React, { useState } from 'react';
import type { CalorieResults } from './types';
import CalculatorForm from './components/CalculatorForm';
import ResultsDisplay from './components/ResultsDisplay';

const App: React.FC = () => {
  const [results, setResults] = useState<CalorieResults | null>(null);

  return (
    <div className="flex items-center justify-center min-h-screen p-4 font-sans bg-slate-50">
      <main className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 transition-all duration-300">
        <CalculatorForm onCalculate={setResults} />
        <ResultsDisplay results={results} />
      </main>
    </div>
  );
};

export default App;
