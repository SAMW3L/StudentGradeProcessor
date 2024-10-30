import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Download, FileSpreadsheet, FileDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import type { Student, GradeRange } from '../types';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

interface DashboardProps {
  students: Student[];
  gradeRanges: GradeRange[];
}

export default function Dashboard({ students, gradeRanges }: DashboardProps) {
  const { language } = useLanguage();
  const [isExporting, setIsExporting] = useState(false);

  // Sort students by grade in descending order
  const sortedStudents = [...students].sort((a, b) => b.grade - a.grade);

  const gradeDistribution = gradeRanges.map(range => ({
    name: range.label,
    value: students.filter(s => s.grade >= range.min && s.grade <= range.max).length,
    color: range.color
  }));

  const exportPDF = () => {
    setIsExporting(true);
    try {
      const doc = new jsPDF();
      
      doc.text(language === 'en' ? 'Grade Distribution Report' : 'Ripoti ya Mgawanyo wa Madaraja', 14, 15);
      
      const tableData = sortedStudents.map(student => [
        student.name,
        student.grade.toString(),
        student.gradeCategory || ''
      ]);

      doc.autoTable({
        head: [[
          language === 'en' ? 'Student Name' : 'Jina la Mwanafunzi',
          language === 'en' ? 'Grade' : 'Alama',
          language === 'en' ? 'Grade Category' : 'Daraja'
        ]],
        body: tableData,
        startY: 25,
        styles: { fontSize: 10 },
        headStyles: { fillColor: [59, 130, 246] }
      });

      doc.save('grade-report.pdf');
    } finally {
      setIsExporting(false);
    }
  };

  const exportExcel = () => {
    setIsExporting(true);
    try {
      const worksheet = XLSX.utils.json_to_sheet(
        sortedStudents.map(student => ({
          [language === 'en' ? 'Student Name' : 'Jina la Mwanafunzi']: student.name,
          [language === 'en' ? 'Grade' : 'Alama']: student.grade,
          [language === 'en' ? 'Grade Category' : 'Daraja']: student.gradeCategory
        }))
      );

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Grades');
      
      // Auto-size columns
      const maxWidth = sortedStudents.reduce((w, r) => Math.max(w, r.name.length), 10);
      const colWidths = [{ wch: maxWidth }, { wch: 8 }, { wch: 10 }];
      worksheet['!cols'] = colWidths;

      XLSX.writeFile(workbook, 'grade-report.xlsx');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">
            {language === 'en' ? 'Grade Distribution' : 'Mgawanyo wa Madaraja'}
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gradeDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value">
                  {gradeDistribution.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">
            {language === 'en' ? 'Performance Overview' : 'Muhtasari wa Utendaji'}
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gradeDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {gradeDistribution.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          onClick={exportExcel}
          disabled={isExporting}
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
        >
          <FileSpreadsheet size={16} />
          <span>{language === 'en' ? 'Export Excel' : 'Pakua Excel'}</span>
        </button>
        <button
          onClick={exportPDF}
          disabled={isExporting}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          <FileDown size={16} />
          <span>{language === 'en' ? 'Export PDF' : 'Pakua PDF'}</span>
        </button>
      </div>
    </div>
  );
}