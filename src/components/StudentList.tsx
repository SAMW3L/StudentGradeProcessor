import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Search, ArrowUpDown } from 'lucide-react';
import type { Student } from '../types';

interface StudentListProps {
  students: Student[];
}

export default function StudentList({ students }: StudentListProps) {
  const { language } = useLanguage();
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredStudents = students
    .filter(student => 
      student.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => 
      sortOrder === 'desc' ? b.grade - a.grade : a.grade - b.grade
    );

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={language === 'en' ? 'Search students...' : 'Tafuta wanafunzi...'}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
            className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            <ArrowUpDown className="h-4 w-4" />
            <span>{language === 'en' ? 'Sort' : 'Panga'}</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {language === 'en' ? 'Student Name' : 'Jina la Mwanafunzi'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {language === 'en' ? 'Grade' : 'Alama'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {language === 'en' ? 'Category' : 'Daraja'}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStudents.map((student, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{student.grade}%</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span 
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${student.grade >= 80 ? 'bg-green-100 text-green-800' :
                        student.grade >= 60 ? 'bg-blue-100 text-blue-800' :
                        student.grade >= 50 ? 'bg-yellow-100 text-yellow-800' :
                        student.grade >= 40 ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'}`}
                  >
                    {student.gradeCategory}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}