import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import type { GradeRange } from '../types';

interface GradeRangeFormProps {
  onSave: (ranges: GradeRange[]) => void;
}

export default function GradeRangeForm({ onSave }: GradeRangeFormProps) {
  const { language } = useLanguage();
  const [ranges, setRanges] = useState<GradeRange[]>([
    { min: 0, max: 39, label: 'F', color: '#ef4444' },
    { min: 40, max: 49, label: 'D', color: '#f97316' },
    { min: 50, max: 59, label: 'C', color: '#eab308' },
    { min: 60, max: 79, label: 'B', color: '#22c55e' },
    { min: 80, max: 100, label: 'A', color: '#3b82f6' },
  ]);

  const addRange = () => {
    setRanges([...ranges, { min: 0, max: 100, label: '', color: '#000000' }]);
  };

  const updateRange = (index: number, field: keyof GradeRange, value: string | number) => {
    const newRanges = [...ranges];
    newRanges[index] = { ...newRanges[index], [field]: value };
    setRanges(newRanges);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(ranges);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4">
        {ranges.map((range, index) => (
          <div key={index} className="grid grid-cols-4 gap-4">
            <input
              type="number"
              value={range.min}
              onChange={(e) => updateRange(index, 'min', parseInt(e.target.value))}
              className="rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              placeholder={language === 'en' ? 'Min' : 'Chini'}
            />
            <input
              type="number"
              value={range.max}
              onChange={(e) => updateRange(index, 'max', parseInt(e.target.value))}
              className="rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              placeholder={language === 'en' ? 'Max' : 'Juu'}
            />
            <input
              type="text"
              value={range.label}
              onChange={(e) => updateRange(index, 'label', e.target.value)}
              className="rounded border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              placeholder={language === 'en' ? 'Grade' : 'Daraja'}
            />
            <input
              type="color"
              value={range.color}
              onChange={(e) => updateRange(index, 'color', e.target.value)}
              className="h-10 w-full rounded"
            />
          </div>
        ))}
      </div>
      
      <div className="flex justify-between">
        <button
          type="button"
          onClick={addRange}
          className="flex items-center space-x-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition"
        >
          <Plus size={16} />
          <span>{language === 'en' ? 'Add Range' : 'Ongeza Daraja'}</span>
        </button>
        
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {language === 'en' ? 'Save Ranges' : 'Hifadhi Madaraja'}
        </button>
      </div>
    </form>
  );
}