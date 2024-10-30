import React from 'react';
import { GraduationCap, Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Header() {
  const { language, setLanguage } = useLanguage();

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <GraduationCap size={32} />
            <h1 className="text-2xl font-bold">
              {language === 'en' ? 'Education Analytics Platform' : 'Jukwaa la Uchambuzi wa Elimu'}
            </h1>
          </div>
          
          <button
            onClick={() => setLanguage(language === 'en' ? 'sw' : 'en')}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
          >
            <Languages size={20} />
            <span>{language === 'en' ? 'Swahili' : 'English'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}