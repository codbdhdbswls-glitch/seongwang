export interface Relationship {
  targetId: string;
  description: string;
  type: 'friendly' | 'hostile' | 'obsessive' | 'complicated';
}

export interface SubjectGrade {
  subject: string;
  score: number;
  rank: number; // 1-9 grade system
  semester: string;
}

export interface AcademicRecord {
  period: string;
  classRank: number; // e.g., 1
  totalStudents: number; // e.g., 300
  grades: SubjectGrade[];
  teacherComment: string;
}

export interface Student {
  id: string;
  name: string;
  hanja: string;
  nameMeaning: string[];
  age: number;
  height: string;
  birthday: string;
  photoUrl?: string;
  club: string;
  appearance: string[];
  personality: {
    summary: string[];
    detailed: string[];
  };
  preferences: {
    likes: string[];
    dislikes: string[];
  };
  hobbies: string[];
  values: string[];
  relationships: Relationship[];
  romanceValues: string[];
  habits: string[];
  features: string[];
  speech: {
    style: string[];
    examples: string[];
    internal?: string[]; // For Han Jay's dual nature
  };
  academic: AcademicRecord;
  themeColor: string;
}

export type ViewState = 'HOME' | 'STUDENTS' | 'RELATIONSHIPS';