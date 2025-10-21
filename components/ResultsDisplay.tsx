import React from 'react';
import type { CalorieResults } from '../types';
import { MaintainIcon, WeightLossIcon, MassGainIcon, LogoIcon } from './Icons';

interface ResultsDisplayProps {
  results: CalorieResults | null;
}

interface ResultCardProps {
    // FIX: Use React.ReactElement instead of React.ReactNode for better type safety with React.cloneElement.
    icon: React.ReactElement;
    title: string;
    calories: number;
    description: string;
    colorClass: string;
    iconColorClass: string;
    delay: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ icon, title, calories, description, colorClass, iconColorClass, delay }) => (
    <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/50 p-5 rounded-lg flex items-center gap-4 animate-fade-in" style={{ animationDelay: delay }}>
        <div className={`p-3 rounded-full ${colorClass}`}>
            {/* FIX: Removed 'as React.ReactElement' cast as the prop type is now correct. */}
            {React.cloneElement(icon, { className: `w-6 h-6 ${iconColorClass}` })}
        </div>
        <div>
            <h4 className="font-semibold text-slate-700 dark:text-slate-300">{title}</h4>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{calories.toLocaleString('ru-RU')} <span className="text-base font-normal text-slate-500 dark:text-slate-400">ккал/день</span></p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{description}</p>
        </div>
    </div>
);

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  if (!results) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center bg-slate-50 dark:bg-slate-800/50 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-8">
        <LogoIcon className="w-16 h-16 text-slate-300 dark:text-slate-600" />
        <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mt-4">Ваши результаты появятся здесь</h3>
        <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-xs">Заполните форму слева, чтобы рассчитать вашу персональную норму калорий.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center space-y-4">
        <ResultCard
            icon={<MaintainIcon />}
            title="Поддержание веса"
            calories={results.maintenance}
            description="Потребляйте столько калорий для сохранения текущего веса."
            colorClass="bg-sky-100 dark:bg-sky-500/10"
            iconColorClass="text-sky-700 dark:text-sky-400"
            delay="0s"
        />
        <ResultCard
            icon={<WeightLossIcon />}
            title="Похудение"
            calories={results.weightLoss}
            description="Умеренный дефицит для постепенной и здоровой потери веса."
            colorClass="bg-emerald-100 dark:bg-emerald-500/10"
            iconColorClass="text-emerald-700 dark:text-emerald-400"
            delay="0.1s"
        />
        <ResultCard
            icon={<MassGainIcon />}
            title="Набор массы"
            calories={results.massGain}
            description="Небольшой профицит для набора мышечной массы с минимальным жиром."
            colorClass="bg-amber-100 dark:bg-amber-500/10"
            iconColorClass="text-amber-700 dark:text-amber-400"
            delay="0.2s"
        />
    </div>
  );
};

export default ResultsDisplay;