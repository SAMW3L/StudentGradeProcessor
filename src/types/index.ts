export interface Student {
  name: string;
  grade: number;
  gradeCategory?: string;
}

export interface GradeRange {
  min: number;
  max: number;
  label: string;
  color: string;
}

export interface Language {
  code: string;
  name: string;
  flag: string;
}