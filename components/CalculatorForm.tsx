
import React, { useState, useMemo } from 'react';
import { ACTIVITY_LEVELS } from '../constants';
import type { UserData, ActivityLevelKey, CalorieResults } from '../types';
import { Gender } from '../types';
import { LogoIcon } from './Icons';

interface CalculatorFormProps {
  onCalculate: (results: CalorieResults | null) => void;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({ onCalculate }) => {
  const [formData, setFormData] = useState<UserData>({
    gender: Gender.FEMALE,
    age: '',
    weight: '',
    height: '',
    activityLevel: 'light',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenderChange = (gender: Gender) => {
    setFormData(prev => ({...prev, gender}));
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const age = Number(formData.age);
    const weight = Number(formData.weight);
    const height = Number(formData.height);

    if (age <= 0 || weight <= 0 || height <= 0) {
      onCalculate(null);
      return;
    }

    let bmr: number;
    if (formData.gender === Gender.MALE) {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    
    const activityMultiplier = ACTIVITY_LEVELS[formData.activityLevel].value;
    const maintenance = Math.round(bmr * activityMultiplier);
    
    onCalculate({
      maintenance,
      weightLoss: maintenance - 500,
      massGain: maintenance + 500,
    });
  };
  
  const isFormValid = useMemo(() => {
    return formData.age && formData.weight && formData.height;
  }, [formData]);


  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3 mb-2">
        <LogoIcon className="w-8 h-8 text-indigo-600" />
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Калькулятор калорий</h1>
      </div>
      <p className="text-slate-500 mb-6">Введите свои данные, чтобы рассчитать суточную норму калорий.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-2">Пол</label>
          <div className="grid grid-cols-2 gap-2 rounded-lg bg-slate-100 p-1">
            <button type="button" onClick={() => handleGenderChange(Gender.FEMALE)} className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${formData.gender === Gender.FEMALE ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:bg-slate-200'}`}>
              Женщина
            </button>
            <button type="button" onClick={() => handleGenderChange(Gender.MALE)} className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${formData.gender === Gender.MALE ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:bg-slate-200'}`}>
              Мужчина
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-slate-600 mb-1">Возраст</label>
            <input type="number" name="age" id="age" value={formData.age} onChange={handleChange} placeholder="25" className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-slate-600 mb-1">Вес (кг)</label>
            <input type="number" name="weight" id="weight" value={formData.weight} onChange={handleChange} placeholder="70" className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div>
            <label htmlFor="height" className="block text-sm font-medium text-slate-600 mb-1">Рост (см)</label>
            <input type="number" name="height" id="height" value={formData.height} onChange={handleChange} placeholder="175" className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
        </div>
        
        <div>
          <label htmlFor="activityLevel" className="block text-sm font-medium text-slate-600 mb-1">Уровень активности</label>
          <select name="activityLevel" id="activityLevel" value={formData.activityLevel} onChange={handleChange} className="w-full p-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
            {Object.entries(ACTIVITY_LEVELS).map(([key, { label }]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
        
        <button 
          type="submit" 
          disabled={!isFormValid}
          className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-300 disabled:bg-slate-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Рассчитать
        </button>
      </form>
    </div>
  );
};

export default CalculatorForm;
