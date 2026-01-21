import React from 'react';
import { Student } from '../types';
import { ChevronRight } from 'lucide-react';
import SchoolLogo from './SchoolLogo';

interface StudentCardProps {
  student: Student;
  onClick: () => void;
}

const StudentCard: React.FC<StudentCardProps> = ({ student, onClick }) => {
  const getThemeColor = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-50 border-blue-200 hover:border-blue-400 text-blue-900';
      case 'pink': return 'bg-rose-50 border-rose-200 hover:border-rose-400 text-rose-900';
      default: return 'bg-slate-50 border-slate-200 hover:border-slate-400 text-slate-900';
    }
  };

  const getBadgeColor = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-700';
      case 'pink': return 'bg-rose-100 text-rose-700';
      default: return 'bg-slate-200 text-slate-700';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`group relative overflow-hidden rounded-xl border-2 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-lg ${getThemeColor(student.themeColor)}`}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className={`h-16 w-16 rounded-full flex items-center justify-center text-2xl font-serif font-bold ${getBadgeColor(student.themeColor)}`}>
            {student.name[0]}
          </div>
          <SchoolLogo className="w-14 h-14 opacity-10 group-hover:opacity-30 transition-opacity" />
        </div>
        
        <h3 className="text-xl font-bold mb-1 serif">{student.name}</h3>
        <p className="text-xs font-mono opacity-70 mb-4">{student.hanja}</p>
        
        <div className="space-y-2 text-sm opacity-80">
          <div className="flex justify-between border-b border-current border-opacity-10 pb-1">
            <span>나이</span>
            <span className="font-medium">{student.age}세</span>
          </div>
          <div className="flex justify-between border-b border-current border-opacity-10 pb-1">
            <span>생일</span>
            <span className="font-medium">{student.birthday}</span>
          </div>
          <div className="flex justify-between pb-1">
             <span>동아리</span>
             <span className="font-medium truncate max-w-[120px] text-right">{student.club.split(' ')[0]}</span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-current border-opacity-10 flex justify-between items-center">
          <span className="text-xs uppercase tracking-widest font-bold opacity-60">생활기록부 열람</span>
          <ChevronRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
      
      {/* Decorative corner */}
      <div className="absolute top-0 right-0 -mt-2 -mr-2 w-8 h-8 bg-current opacity-10 rotate-45 transform origin-bottom-left"></div>
    </div>
  );
};

export default StudentCard;