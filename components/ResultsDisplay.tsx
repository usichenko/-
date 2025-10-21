
import React from 'react';
import type { CalorieResults } from '../types';
import { MaintainIcon, WeightLossIcon, MassGainIcon, LogoIcon } from './Icons';

interface ResultsDisplayProps {
  results: CalorieResults | null;
}

interface ResultCardProps {
    icon: React.ReactNode;
    title: string;
    calories: number;
    description: string;
    colorClass: string;
    delay: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ icon, title, calories, description, colorClass, delay }) => (
    <div className="bg-slate-50 border border-slate-200 p-5 rounded-lg flex items-center gap-4 animate-fade-in" style={{ animationDelay: delay }}>
        <div className={`p-3 rounded-full ${colorClass}`}>
            {icon}
        </div>
        <div>
            <h4 className="font-semibold text-slate-700">{title}</h4>
            <p className="text-2xl font-bold text-slate-800">{calories.toLocaleString('ru-RU')} <span className="text-base font-normal text-slate-500">ккал/день</span></p>
            <p className="text-xs text-slate-500">{description}</p>
        </div>
    </div>
);

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  if (!results) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center bg-indigo-50/50 border-2 border-dashed border-indigo-200 rounded-lg p-8">
        <LogoIcon className="w-16 h-16 text-indigo-300" />
        <h3 className="text-xl font-semibold text-slate-700 mt-4">Ваши результаты появятся здесь</h3>
        <p className="text-slate-500 mt-2 max-w-xs">Заполните форму слева, чтобы рассчитать вашу персональную норму калорий.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center space-y-4">
        <ResultCard
            icon={<MaintainIcon className="w-6 h-6 text-sky-700" />}
            title="Поддержание веса"
            calories={results.maintenance}
            description="Потребляйте столько калорий для сохранения текущего веса."
            colorClass="bg-sky-100"
            delay="0s"
        />
        <ResultCard
            icon={<WeightLossIcon className="w-6 h-6 text-emerald-700" />}
            title="Похудение"
            calories={results.weightLoss}
            description="Умеренный дефицит для постепенной и здоровой потери веса."
            colorClass="bg-emerald-100"
            delay="0.1s"
        />
        <ResultCard
            icon={<MassGainIcon className="w-6 h-6 text-amber-700" />}
            title="Набор массы"
            calories={results.massGain}
            description="Небольшой профицит для набора мышечной массы с минимальным жиром."
            colorClass="bg-amber-100"
            delay="0.2s"
        />
    </div>
  );
};

export default ResultsDisplay;
