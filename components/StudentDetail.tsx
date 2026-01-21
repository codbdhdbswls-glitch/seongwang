import React, { useState } from 'react';
import { Student } from '../types';
import { ArrowLeft, User, Heart, Mic2, AlertTriangle, FileText, Activity, GraduationCap } from 'lucide-react';

interface SectionProps {
  title: string;
  icon: any;
  children: React.ReactNode;
}

const Section = ({ title, icon: Icon, children }: SectionProps) => (
  <div className="mb-6">
    <h3 className="flex items-center text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
      <Icon size={18} className="mr-2 text-slate-400" />
      {title}
    </h3>
    {children}
  </div>
);

interface StudentDetailProps {
  student: Student;
  onBack: () => void;
}

const StudentDetail: React.FC<StudentDetailProps> = ({ student, onBack }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'psychology' | 'voice' | 'academic'>('profile');

  const getThemeStyles = () => {
    switch (student.themeColor) {
      case 'blue': return 'text-blue-900 bg-blue-50 border-blue-200';
      case 'pink': return 'text-rose-900 bg-rose-50 border-rose-200';
      default: return 'text-slate-900 bg-slate-100 border-slate-200';
    }
  };

  const TabButton = ({ id, label, icon: Icon }: { id: typeof activeTab, label: string, icon: any }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-2 px-4 md:px-6 py-3 font-medium transition-all duration-200 border-b-2 whitespace-nowrap ${
        activeTab === id
          ? `border-slate-800 text-slate-900 bg-white`
          : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'
      }`}
    >
      <Icon size={16} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="animate-fade-in-up">
      <button 
        onClick={onBack}
        className="flex items-center text-slate-500 hover:text-slate-800 mb-6 transition-colors group"
      >
        <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
        학생 목록으로 돌아가기
      </button>

      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        {/* Header Banner */}
        <div className={`p-8 border-b ${getThemeStyles()}`}>
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-end">
            
            {/* Photo Slot */}
            <div className="shrink-0">
               <div className="w-36 h-48 bg-white/50 border-4 border-white shadow-lg rounded-sm flex flex-col items-center justify-center relative overflow-hidden group transition-transform hover:scale-[1.02]">
                  {student.photoUrl ? (
                    <img 
                      src={student.photoUrl} 
                      alt={student.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      <User className="text-current opacity-20 w-16 h-16 mb-2" strokeWidth={1.5} />
                      <span className="text-[10px] font-bold opacity-40 uppercase tracking-widest border border-current px-2 py-0.5 rounded-full">Photo</span>
                    </>
                  )}
                  
                  {/* Decorative corner lines for 'photo frame' feel */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-current opacity-20 pointer-events-none"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-current opacity-20 pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-current opacity-20 pointer-events-none"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-current opacity-20 pointer-events-none"></div>
               </div>
            </div>

            {/* Info Section */}
            <div className="flex-grow w-full flex flex-col md:flex-row justify-between items-center md:items-end text-center md:text-left">
              <div>
                <div className="flex items-baseline space-x-3 justify-center md:justify-start">
                   <h1 className="text-4xl font-serif font-bold mb-2">{student.name}</h1>
                   <span className="text-xl font-mono opacity-60">{student.hanja}</span>
                </div>
                <div className="space-y-1 mt-2 opacity-80 text-sm">
                  {student.nameMeaning.map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
              </div>
              <div className="mt-6 md:mt-0 text-center md:text-right">
                <div className="inline-block px-3 py-1 bg-white bg-opacity-50 rounded text-xs font-bold uppercase tracking-widest mb-1 border border-current border-opacity-10">
                  학년: 2학년 1반
                </div>
                <div className="text-sm font-medium">
                  {student.age}세 · {student.height} · {student.birthday}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 overflow-x-auto no-scrollbar">
          <TabButton id="profile" label="기본 정보" icon={User} />
          <TabButton id="academic" label="학업 성취도" icon={GraduationCap} />
          <TabButton id="psychology" label="심층 분석" icon={Activity} />
          <TabButton id="voice" label="언어 습관" icon={Mic2} />
        </div>

        {/* Content */}
        <div className="p-8 min-h-[500px]">
          {activeTab === 'profile' && (
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-8">
                <Section title="외형 정보" icon={User}>
                  <ul className="list-disc list-inside space-y-1 text-slate-700">
                    {student.appearance.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </Section>
                
                <Section title="성격 요약" icon={FileText}>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {student.personality.summary.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-100 rounded-full text-sm font-medium text-slate-700">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <ul className="space-y-2 text-slate-700">
                    {student.personality.detailed.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <span className="mr-2 text-slate-400">•</span> {item}
                      </li>
                    ))}
                  </ul>
                </Section>
              </div>

              <div className="space-y-8">
                <Section title="활동 및 취미" icon={Activity}>
                  <div className="mb-4">
                    <span className="text-sm font-bold text-slate-500 block mb-1">동아리</span>
                    <p className="text-slate-800">{student.club}</p>
                  </div>
                  <div>
                    <span className="text-sm font-bold text-slate-500 block mb-1">취미</span>
                    <ul className="list-disc list-inside text-slate-700">
                      {student.hobbies.map((hobby, i) => <li key={i}>{hobby}</li>)}
                    </ul>
                  </div>
                </Section>

                <Section title="호불호" icon={Heart}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                      <h4 className="font-bold text-green-800 mb-2 text-sm">선호 (LIKES)</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        {student.preferences.likes.map((like, i) => <li key={i}>{like}</li>)}
                      </ul>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                      <h4 className="font-bold text-red-800 mb-2 text-sm">불호 (DISLIKES)</h4>
                      <ul className="text-sm text-red-700 space-y-1">
                        {student.preferences.dislikes.map((dislike, i) => <li key={i}>{dislike}</li>)}
                      </ul>
                    </div>
                  </div>
                </Section>
              </div>
            </div>
          )}

          {activeTab === 'academic' && (
             <div className="space-y-8 animate-fade-in">
                <div className="bg-slate-900 text-white p-6 rounded-xl shadow-md">
                   <div className="flex flex-col md:flex-row justify-between items-center">
                      <div>
                         <h3 className="text-xl font-serif font-bold mb-1">{student.academic.period} 성적표</h3>
                         <p className="text-slate-400 text-sm">본 성적표는 대외비 문서로 무단 유출을 금합니다.</p>
                      </div>
                      <div className="mt-4 md:mt-0 text-center md:text-right bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                         <span className="block text-xs text-slate-300 uppercase tracking-widest">전교 석차 (Rank)</span>
                         <span className="text-2xl font-bold font-mono text-yellow-400">
                            {student.academic.classRank} <span className="text-sm text-white">/ {student.academic.totalStudents}</span>
                         </span>
                      </div>
                   </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                   <div className="md:col-span-2">
                      <h4 className="font-bold text-slate-800 mb-4 flex items-center">
                         <FileText size={18} className="mr-2" /> 과목별 성적 상세
                      </h4>
                      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                         <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                               <tr>
                                  <th className="px-6 py-3">과목명</th>
                                  <th className="px-6 py-3">점수</th>
                                  <th className="px-6 py-3">석차등급</th>
                                  <th className="px-6 py-3">비고</th>
                               </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                               {student.academic.grades.map((grade, idx) => (
                                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                     <td className="px-6 py-4 font-medium text-slate-800">{grade.subject}</td>
                                     <td className="px-6 py-4 text-slate-600">{grade.score}점</td>
                                     <td className="px-6 py-4">
                                        <span className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                           grade.rank === 1 
                                              ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' 
                                              : grade.rank === 2 
                                              ? 'bg-blue-100 text-blue-800' 
                                              : 'bg-slate-100 text-slate-600'
                                        }`}>
                                           {grade.rank}등급
                                        </span>
                                     </td>
                                     <td className="px-6 py-4 text-slate-400 text-xs">{grade.semester}</td>
                                  </tr>
                               ))}
                            </tbody>
                         </table>
                      </div>
                   </div>

                   <div>
                      <h4 className="font-bold text-slate-800 mb-4 flex items-center">
                         <User size={18} className="mr-2" /> 담임 교사 종합 의견
                      </h4>
                      <div className="bg-yellow-50 border border-yellow-100 p-6 rounded-xl relative">
                         <div className="absolute top-4 left-4 opacity-10">
                            <QuoteIcon />
                         </div>
                         <p className="text-slate-800 italic leading-relaxed relative z-10 text-sm">
                            "{student.academic.teacherComment}"
                         </p>
                         <div className="mt-4 pt-4 border-t border-yellow-200 border-dashed flex justify-end">
                            <span className="text-xs font-bold text-yellow-800 opacity-60">담당 교사 확인 필</span>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          )}

          {activeTab === 'psychology' && (
            <div className="space-y-8 animate-fade-in">
              <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                <h3 className="font-serif font-bold text-lg mb-4 text-slate-800 flex items-center">
                  <AlertTriangle size={18} className="mr-2 text-amber-500" />
                  상담 교사 관찰 일지 (특이사항)
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-sm text-slate-500 mb-2 uppercase tracking-wide">행동 습관 (Habits)</h4>
                    <ul className="space-y-2">
                       {student.habits.map((habit, i) => (
                         <li key={i} className="flex items-start text-slate-700 text-sm">
                           <span className="mr-2 text-amber-400">▪</span> {habit}
                         </li>
                       ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-500 mb-2 uppercase tracking-wide">주요 특징 (Features)</h4>
                    <ul className="space-y-2">
                       {student.features.map((feature, i) => (
                         <li key={i} className="flex items-start text-slate-700 text-sm">
                           <span className="mr-2 text-amber-400">▪</span> {feature}
                         </li>
                       ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <Section title="인생 가치관" icon={FileText}>
                  <div className="space-y-3">
                    {student.values.map((val, i) => (
                      <blockquote key={i} className="pl-4 border-l-4 border-slate-300 italic text-slate-700">
                        {val}
                      </blockquote>
                    ))}
                  </div>
                </Section>
                
                <Section title="연애 가치관" icon={Heart}>
                  <ul className="space-y-2">
                    {student.romanceValues.map((val, i) => (
                      <li key={i} className="flex items-start text-slate-700">
                        <span className="mr-2 text-rose-400">♥</span> {val}
                      </li>
                    ))}
                  </ul>
                </Section>
              </div>
            </div>
          )}

          {activeTab === 'voice' && (
            <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
               <Section title="말투 및 화법" icon={Mic2}>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {student.speech.style.map((style, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-100 rounded text-sm text-slate-600 border border-slate-200">
                        {style}
                      </span>
                    ))}
                  </div>
               </Section>

               <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-slate-800 mb-4 border-b pb-2">대표 대사</h3>
                    <div className="space-y-4">
                      {student.speech.examples.map((ex, i) => (
                        <div key={i} className="relative bg-slate-50 p-4 rounded-br-xl rounded-tr-xl border-l-4 border-slate-400">
                          <p className="text-lg font-medium text-slate-800">"{ex.replace(/['"]+/g, '')}"</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {student.speech.internal && student.speech.internal.length > 0 && (
                    <div className="mt-8 pt-8 border-t border-dashed border-slate-300">
                       <h3 className="text-lg font-serif font-bold text-rose-800 mb-4 flex items-center">
                         <AlertTriangle size={18} className="mr-2" />
                         내면 심리 / 잠재적 공격성 (Internal)
                       </h3>
                       <div className="space-y-4">
                        {student.speech.internal.map((ex, i) => (
                          <div key={i} className="relative bg-rose-50 p-4 rounded-br-xl rounded-tr-xl border-l-4 border-rose-500">
                            <p className="text-lg font-medium text-rose-900">"{ex.replace(/['"]+/g, '')}"</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const QuoteIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-800">
    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
  </svg>
);

export default StudentDetail;