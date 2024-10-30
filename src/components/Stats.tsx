import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Trophy, Users, TrendingUp, AlertTriangle } from 'lucide-react';
import type { Student } from '../types';

interface StatsProps {
  students: Student[];
}

export default function Stats({ students }: StatsProps) {
  const { language } = useLanguage();
  
  const stats = {
    totalStudents: students.length,
    averageGrade: students.reduce((acc, s) => acc + s.grade, 0) / students.length,
    topPerformers: students.filter(s => s.grade >= 80).length,
    atRisk: students.filter(s => s.grade < 40).length,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center space-x-3">
          <Users className="h-8 w-8 text-blue-500" />
          <div>
            <p className="text-sm text-gray-600">{language === 'en' ? 'Total Students' : 'Jumla ya Wanafunzi'}</p>
            <p className="text-2xl font-bold">{stats.totalStudents}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center space-x-3">
          <TrendingUp className="h-8 w-8 text-green-500" />
          <div>
            <p className="text-sm text-gray-600">{language === 'en' ? 'Average Grade' : 'Wastani wa Alama'}</p>
            <p className="text-2xl font-bold">{stats.averageGrade.toFixed(1)}%</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center space-x-3">
          <Trophy className="h-8 w-8 text-yellow-500" />
          <div>
            <p className="text-sm text-gray-600">{language === 'en' ? 'Top Performers' : 'Wanafunzi Bora'}</p>
            <p className="text-2xl font-bold">{stats.topPerformers}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center space-x-3">
          <AlertTriangle className="h-8 w-8 text-red-500" />
          <div>
            <p className="text-sm text-gray-600">{language === 'en' ? 'At Risk' : 'Walio Hatarini'}</p>
            <p className="text-2xl font-bold">{stats.atRisk}</p>
          </div>
        </div>
      </div>
    </div>
  );
}