import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import toast from 'react-hot-toast';
import * as XLSX from 'xlsx';

interface FileUploadProps {
  onDataUpload: (data: any[]) => void;
}

export default function FileUpload({ onDataUpload }: FileUploadProps) {
  const { language } = useLanguage();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array', cellDates: true });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        
        // Process data in chunks to handle large datasets
        const chunkSize = 1000;
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);
        let processedData: any[] = [];
        
        for (let i = 0; i < jsonData.length; i += chunkSize) {
          const chunk = jsonData.slice(i, i + chunkSize);
          processedData = [...processedData, ...chunk];
        }

        onDataUpload(processedData);
        toast.success(
          language === 'en' 
            ? `Successfully processed ${processedData.length} records!` 
            : `Imefanikiwa kusindika rekodi ${processedData.length}!`
        );
      } catch (error) {
        toast.error(language === 'en' ? 'Error processing file' : 'Hitilafu katika kusindika faili');
      }
    };

    reader.readAsArrayBuffer(file);
  }, [language, onDataUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
    },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-2 text-sm text-gray-600">
        {isDragActive
          ? language === 'en' ? 'Drop the file here' : 'Dondosha faili hapa'
          : language === 'en'
          ? 'Drag & drop an Excel file here, or click to select'
          : 'Buruta na udondoshe faili ya Excel hapa, au bofya kuchagua'}
      </p>
      <p className="text-xs text-gray-500 mt-1">
        {language === 'en' ? 'Supports .xlsx files of any size' : 'Inasaidia faili za .xlsx za ukubwa wowote'}
      </p>
    </div>
  );
}