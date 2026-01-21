import React from 'react';
import { STUDENTS } from '../constants';
import { Relationship } from '../types';
import { ArrowRight, Info } from 'lucide-react';

const RelationshipMap: React.FC = () => {
  // We need to render this carefully.
  // Triangle layout: Taegyeong (Top), Sinu (Bottom Left), Jay (Bottom Right)
  
  const getStudent = (id: string) => STUDENTS.find(s => s.id === id)!;
  const taegyeong = getStudent('taegyeong');
  const sinu = getStudent('sinu');
  const jay = getStudent('jay');

  const Arrow = ({ from, to, type, desc, className }: { from: string, to: string, type: Relationship['type'], desc: string, className?: string }) => {
    let colorClass = 'bg-slate-400';
    let label = type as string;

    if (type === 'hostile') { colorClass = 'bg-red-500'; label = '적대'; }
    else if (type === 'obsessive') { colorClass = 'bg-purple-600'; label = '집착'; }
    else if (type === 'friendly') { colorClass = 'bg-blue-400'; label = '우호'; }
    else { label = '기타'; }

    return (
      <div className={`flex flex-col items-center justify-center p-2 rounded bg-white bg-opacity-90 shadow-sm border border-slate-200 text-xs text-center max-w-[150px] ${className}`}>
        <span className={`px-2 py-0.5 rounded text-white text-[10px] font-bold mb-1 ${colorClass} uppercase`}>
          {label}
        </span>
        <span className="font-medium text-slate-800 leading-tight">{desc}</span>
      </div>
    );
  };

  return (
    <div className="bg-slate-50 rounded-xl p-8 border border-slate-200 shadow-inner h-full min-h-[600px] flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full border-[20px] border-slate-900"></div>
      </div>

      <h2 className="absolute top-8 left-8 text-2xl font-serif font-bold text-slate-800 z-10">
        교우 관계도 (Relationship Dynamics)
      </h2>
      <div className="absolute top-16 left-8 text-sm text-slate-500 z-10 flex flex-col gap-1">
         <span className="flex items-center"><div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>우호 / 신뢰 (Friendly)</span>
         <span className="flex items-center"><div className="w-3 h-3 bg-purple-600 rounded-full mr-2"></div>집착 / 통제 (Obsession)</span>
         <span className="flex items-center"><div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>적대 / 위협 (Hostile)</span>
      </div>

      <div className="relative w-full max-w-3xl aspect-video">
        
        {/* Taegyeong (Top Center) */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-20">
          <CharacterNode student={taegyeong} color="blue" />
        </div>

        {/* Sinu (Bottom Left) */}
        <div className="absolute bottom-10 left-10 md:left-20 z-20">
           <CharacterNode student={sinu} color="slate" />
        </div>

        {/* Jay (Bottom Right) */}
        <div className="absolute bottom-10 right-10 md:right-20 z-20">
           <CharacterNode student={jay} color="pink" />
        </div>

        {/* Connecting Lines & Labels - Positioned manually for the triangle */}
        
        {/* Taegyeong <-> Jay */}
        <div className="absolute top-1/3 right-[20%] z-10 transform translate-x-4">
           {/* Jay -> Taegyeong */}
           <Arrow from="Jay" to="Taegyeong" type="obsessive" desc="사랑이라는 이름의 통제와 파괴" className="mb-4" />
        </div>
        <div className="absolute top-1/4 right-[25%] z-10">
            {/* Taegyeong -> Jay */}
            <Arrow from="Taegyeong" to="Jay" type="friendly" desc="착하고 다정한 친구" className="opacity-80 scale-90" />
        </div>

        {/* Taegyeong <-> Sinu */}
         <div className="absolute top-1/3 left-[20%] z-10 transform -translate-x-4">
            {/* Sinu -> Taegyeong */}
            <Arrow from="Sinu" to="Taegyeong" type="friendly" desc="보호자에 가까운 친구" className="mb-4" />
         </div>
         <div className="absolute top-1/4 left-[25%] z-10">
             {/* Taegyeong -> Sinu */}
            <Arrow from="Taegyeong" to="Sinu" type="friendly" desc="비교적 편한 태도" className="opacity-80 scale-90" />
         </div>

         {/* Sinu <-> Jay (Bottom) */}
         <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-1/2 flex justify-between items-center z-10 px-4">
             {/* Sinu -> Jay */}
             <Arrow from="Sinu" to="Jay" type="hostile" desc="공포와 분노 속 침묵" className="mr-2" />
             {/* Jay -> Sinu */}
             <Arrow from="Jay" to="Sinu" type="hostile" desc="제거 대상" />
         </div>

         {/* SVG Lines */}
         <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {/* T -> J */}
            <line x1="55%" y1="15%" x2="80%" y2="80%" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="5,5" />
            {/* T -> S */}
            <line x1="45%" y1="15%" x2="20%" y2="80%" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="5,5" />
            {/* S -> J */}
            <line x1="25%" y1="85%" x2="75%" y2="85%" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="5,5" />
         </svg>
      </div>
    </div>
  );
};

const CharacterNode = ({ student, color }: { student: ReturnType<typeof STUDENTS.find>, color: string }) => {
    if (!student) return null;
    
    let ringColor = 'ring-slate-200';
    let bgColor = 'bg-slate-100';
    let textColor = 'text-slate-800';

    if (color === 'blue') { ringColor = 'ring-blue-200'; bgColor = 'bg-blue-50'; textColor = 'text-blue-900'; }
    if (color === 'pink') { ringColor = 'ring-rose-200'; bgColor = 'bg-rose-50'; textColor = 'text-rose-900'; }

    return (
        <div className={`flex flex-col items-center group cursor-default`}>
            <div className={`w-24 h-24 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-3xl font-serif font-bold mb-3 ring-4 ${ringColor} ${bgColor} ${textColor} transition-transform transform group-hover:scale-110 overflow-hidden relative`}>
                {student.photoUrl ? (
                    <img 
                        src={student.photoUrl} 
                        alt={student.name} 
                        className="w-full h-full object-cover"
                    />
                ) : (
                    student.name[0]
                )}
            </div>
            <div className="bg-white px-4 py-1.5 rounded-full shadow border border-slate-200 font-bold text-slate-800 whitespace-nowrap z-30">
                {student.name}
            </div>
        </div>
    );
};

export default RelationshipMap;