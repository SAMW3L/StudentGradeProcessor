import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import GradeRangeForm from './components/GradeRangeForm';
import Dashboard from './components/Dashboard';
import Stats from './components/Stats';
import StudentList from './components/StudentList';
import { LanguageProvider } from './contexts/LanguageContext';
import type { Student, GradeRange } from './types';

function App() {
  const [students, setStudents] = useState<Student[]>([]);
  const [gradeRanges, setGradeRanges] = useState<GradeRange[]>([]);
  const [showDashboard, setShowDashboard] = useState(false);

  const handleDataUpload = (data: any[]) => {
    const processedStudents = data.map(row => ({
      name: row.Name || row.name || '',
      grade: parseFloat(row.Grade || row.grade || 0),
    }));
    setStudents(processedStudents);
    setShowDashboard(true);
  };

  const handleGradeRanges = (ranges: GradeRange[]) => {
    setGradeRanges(ranges);
    
    const categorizedStudents = students.map(student => ({
      ...student,
      gradeCategory: ranges.find(
        range => student.grade >= range.min && student.grade <= range.max
      )?.label || 'N/A'
    }));
    
    setStudents(categorizedStudents);
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50">
        <Toaster position="top-right" />
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="grid gap-8">
            <section className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Grade Ranges</h2>
              <GradeRangeForm onSave={handleGradeRanges} />
            </section>

            <section className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Upload Data</h2>
              <FileUpload onDataUpload={handleDataUpload} />
            </section>

            {showDashboard && students.length > 0 && gradeRanges.length > 0 && (
              <>
                <Stats students={students} />
                <Dashboard students={students} gradeRanges={gradeRanges} />
                <StudentList students={students} />
              </>
            )}
          </div>
        </main>
      </div>
    </LanguageProvider>
  );
}

export default App;