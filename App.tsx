import React, { useState } from 'react';
import Layout from './components/Layout';
import StudentCard from './components/StudentCard';
import StudentDetail from './components/StudentDetail';
import RelationshipMap from './components/RelationshipMap';
import SchoolLogo from './components/SchoolLogo';
import { ViewState } from './types';
import { STUDENTS, SCHOOL_NAME } from './constants';
import { Quote, Search, X, Clock, ArrowLeft, Network, Music, MessageCircle, Check, AlertCircle, FileText, Lock, AlertTriangle } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('HOME');
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuditionModalOpen, setIsAuditionModalOpen] = useState(false);
  const [isCounselingModalOpen, setIsCounselingModalOpen] = useState(false);
  
  // Counseling Form State
  const [counselingInput, setCounselingInput] = useState('');
  const [counselingView, setCounselingView] = useState<'FORM' | 'SUCCESS' | 'HISTORY_TAEGYEONG' | 'HISTORY_SINU' | 'HISTORY_JAY'>('FORM');
  const [showWarningOverlay, setShowWarningOverlay] = useState(false);

  const handleStudentClick = (id: string) => {
    setSelectedStudentId(id);
    setCurrentView('STUDENTS');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToStudents = () => {
    setSelectedStudentId(null);
    setCurrentView('STUDENTS');
  }

  const handleCounselingOpen = () => {
    setIsCounselingModalOpen(true);
    setCounselingView('FORM');
    setCounselingInput('');
  };

  const handleCounselingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = counselingInput.replace(/\s+/g, '');
    
    if (normalized === '2학년윤태경') {
        setCounselingView('HISTORY_TAEGYEONG');
    } else if (normalized === '2학년강신우') {
        setCounselingView('HISTORY_SINU');
    } else if (normalized === '2학년한제이') {
        setShowWarningOverlay(true);
        setTimeout(() => {
            setShowWarningOverlay(false);
            setCounselingView('HISTORY_JAY');
        }, 2200);
    } else {
        setCounselingView('SUCCESS');
    }
  };

  // Filter students based on search query
  // Only show students if there is a search query
  const filteredStudents = searchQuery 
    ? STUDENTS.filter(student => 
        student.name.includes(searchQuery) || 
        student.club.includes(searchQuery) ||
        student.hanja.includes(searchQuery)
      )
    : [];

  const suggestedSearches = ['윤태경', '강신우', '한제이', '관계도'];

  const handleSearchChipClick = (term: string) => {
    if (term === '관계도') {
      setCurrentView('RELATIONSHIPS');
    } else {
      setSearchQuery(term);
    }
  };

  const renderContent = () => {
    if (currentView === 'RELATIONSHIPS') {
        return (
          <div className="animate-fade-in">
             <button 
                onClick={() => setCurrentView('STUDENTS')}
                className="flex items-center text-slate-500 hover:text-slate-800 mb-6 transition-colors group"
              >
                <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                학생 검색으로 돌아가기
              </button>
            <RelationshipMap />
          </div>
        );
    }

    if (currentView === 'STUDENTS') {
      if (selectedStudentId) {
        const student = STUDENTS.find(s => s.id === selectedStudentId);
        return student ? (
            <StudentDetail student={student} onBack={handleBackToStudents} />
        ) : <div>Student not found</div>;
      }

      return (
        <div className="animate-fade-in">
          <div className="mb-8 text-center">
             <h2 className="text-3xl font-serif font-bold text-slate-800 mb-2">학생 명부 (Student Directory)</h2>
             <p className="text-slate-500">승인된 교직원만 열람 가능합니다. 이름을 검색하세요.</p>
          </div>

          {/* Search Section */}
          <div className="max-w-xl mx-auto mb-10">
            <div className="relative shadow-sm">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                    type="text" 
                    placeholder="이름을 입력하여 기록 열람..." 
                    className="w-full pl-12 pr-10 py-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent transition-all bg-white text-slate-800 placeholder-slate-400"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                    <button 
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>

            {/* Suggested/Recent Searches */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-sm">
                <span className="flex items-center text-slate-400 font-medium mr-1">
                    <Clock size={14} className="mr-1" /> 빠른 접근:
                </span>
                <div className="flex flex-wrap justify-center gap-2">
                    {suggestedSearches.map((term) => (
                        <button
                            key={term}
                            onClick={() => handleSearchChipClick(term)}
                            className={`px-3 py-1 border rounded-full transition-colors flex items-center ${
                              term === '관계도' 
                                ? 'bg-slate-800 text-white border-slate-800 hover:bg-slate-700' 
                                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                            }`}
                        >
                            {term === '관계도' && <Network size={12} className="mr-1" />}
                            {term}
                        </button>
                    ))}
                </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.length > 0 ? (
                filteredStudents.map(student => (
                <StudentCard 
                    key={student.id} 
                    student={student} 
                    onClick={() => handleStudentClick(student.id)} 
                />
                ))
            ) : (
                <>
                  {searchQuery ? (
                    <div className="col-span-full py-12 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                        <p>검색 결과가 없습니다.</p>
                    </div>
                  ) : (
                    /* Locked state - Shown when no search query */
                    [1, 2, 3].map((i) => (
                      <div key={`locked-${i}`} className="rounded-xl border-2 border-slate-100 bg-slate-50 p-6 flex flex-col items-center justify-center text-slate-300">
                          <div className="w-16 h-16 rounded-full bg-slate-200 mb-4 animate-pulse"></div>
                          <div className="w-24 h-4 bg-slate-200 rounded mb-2 animate-pulse"></div>
                          <div className="w-16 h-3 bg-slate-200 rounded animate-pulse"></div>
                          <span className="mt-4 text-xs font-bold uppercase tracking-widest flex items-center">
                            <Search size={12} className="mr-1" />
                            검색 필요 (Search Required)
                          </span>
                      </div>
                    ))
                  )}
                </>
            )}
          </div>
        </div>
      );
    }

    // HOME View
    return (
      <div className="animate-fade-in space-y-12">
        {/* Hero Section */}
        <div className="bg-slate-900 text-white rounded-2xl p-8 md:p-16 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10 flex flex-col items-center">
            <SchoolLogo className="w-32 h-32 text-white mb-8 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] animate-fade-in-up" />
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 tracking-tight animate-fade-in-up delay-100">
              {SCHOOL_NAME}
            </h1>
            <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8 animate-fade-in-up delay-200">
              "우리는 높은 곳에서 비추는 빛을 기르고, <br className="hidden md:block" />
              모든 학생의 신뢰와 강인함을 키웁니다."
            </p>
            <button 
                onClick={() => setCurrentView('STUDENTS')}
                className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-slate-100 transition-colors inline-flex items-center animate-fade-in-up delay-300"
            >
                <Search size={18} className="mr-2" />
                학생 기록부 열람
            </button>
          </div>
          
          {/* Abstract BG shapes */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>
        </div>

        {/* Featured Quotes (Giving hints to the story) */}
        <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <Quote className="text-blue-200 mb-4" size={32} />
                <p className="text-slate-700 italic mb-4">"예의 바르고 조용하며 재능이 있음. 기대를 충족시키는 법을 정확히 아는 모범생."</p>
                <p className="text-sm font-bold text-slate-900 text-right">- 담당 교사 메모: <span className="text-blue-600">Y.T.K</span></p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <Quote className="text-slate-200 mb-4" size={32} />
                <p className="text-slate-700 italic mb-4">"믿음직하지만 내성적임. 짊어지지 않아도 될 짐을 혼자 감당하려는 경향이 있음."</p>
                <p className="text-sm font-bold text-slate-900 text-right">- 담당 교사 메모: <span className="text-slate-600">K.S.W</span></p>
            </div>
            <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <Quote className="text-rose-200 mb-4" size={32} />
                <p className="text-slate-700 italic mb-4">"유달리 친절하고 세심함. 또래 사이의 구심점 역할을 하지만, 때로 속을 알기 어려움."</p>
                <p className="text-sm font-bold text-slate-900 text-right">- 담당 교사 메모: <span className="text-rose-600">H.J</span></p>
            </div>
        </div>

        {/* Quick Access */}
        <div className="bg-white border border-slate-200 rounded-xl p-8 flex flex-col md:flex-row justify-between items-center">
            <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">학교 공지사항 (Announcements)</h3>
                <p className="text-slate-500">다가오는 상담 일정 및 동아리 활동 관련 업데이트.</p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-4">
               <button 
                 onClick={() => setIsAuditionModalOpen(true)}
                 className="px-4 py-2 bg-slate-100 hover:bg-slate-200 transition-colors rounded text-sm text-slate-600 font-medium cursor-pointer flex items-center"
               >
                 <Music size={16} className="mr-2" />
                 밴드부 오디션
               </button>
               <button 
                 onClick={handleCounselingOpen}
                 className="px-4 py-2 bg-slate-100 hover:bg-slate-200 transition-colors rounded text-sm text-slate-600 font-medium cursor-pointer flex items-center"
               >
                 <MessageCircle size={16} className="mr-2" />
                 또래 상담 신청
               </button>
            </div>
        </div>
      </div>
    );
  };

  return (
    <Layout currentView={currentView} onChangeView={(view) => {
        setCurrentView(view);
        if(view !== 'STUDENTS') setSelectedStudentId(null);
        if (view !== 'STUDENTS') setSearchQuery('');
    }}>
      {renderContent()}

      {/* Warning Overlay */}
      {showWarningOverlay && (
        <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center p-4">
            <div className="text-red-600 animate-pulse flex flex-col items-center text-center">
                <AlertTriangle size={80} className="mb-6" />
                <h2 className="text-5xl font-black tracking-tighter mb-4 font-mono">SYSTEM WARNING</h2>
                <p className="text-xl font-bold tracking-widest text-red-500 font-mono mb-8">UNAUTHORIZED ACCESS DETECTED</p>
                <div className="bg-red-900/20 border border-red-900/50 p-4 rounded text-red-400 font-mono text-sm">
                    <p className="mb-1">ACCESS DENIED: LEVEL 5 SECURITY</p>
                    <p className="mb-1">IP TRACKING INITIATED: 192.168.0.4</p>
                    <p>LOCATION: SCHOOL COMPUTER LAB 04</p>
                </div>
            </div>
        </div>
      )}

      {/* Audition Modal */}
      {isAuditionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
            <div 
                className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden relative animate-fade-in-up"
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    onClick={() => setIsAuditionModalOpen(false)}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                >
                    <X size={20} />
                </button>
            
                <div className="p-8">
                    <div className="flex items-center mb-6 border-b border-slate-100 pb-4">
                        <SchoolLogo className="w-12 h-12 text-slate-900 mr-4 opacity-90" />
                        <div>
                            <h2 className="text-xl font-bold font-serif text-slate-900">선광고 밴드부 신입 모집</h2>
                            <p className="text-sm text-slate-500 font-medium">2055학년도 1학기 추가 부원 모집 안내</p>
                        </div>
                    </div>

                    <div className="space-y-5 text-slate-700">
                        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                            <h3 className="font-bold text-slate-900 mb-3 text-sm flex items-center">
                                <span className="w-1.5 h-1.5 bg-slate-900 rounded-full mr-2"></span>
                                모집 분야
                            </h3>
                            <ul className="text-sm space-y-2 text-slate-600 ml-3">
                                <li className="flex items-center">🎸 베이스 (1명)</li>
                                <li className="flex items-center">🎹 키보드 (1명)</li>
                                <li className="flex items-center">🥁 드럼 세션 (1명) <span className="ml-2 text-xs text-slate-400">*박자감 필수</span></li>
                            </ul>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                <h3 className="font-bold text-blue-900 mb-1 text-sm">📅 일시</h3>
                                <p className="text-sm text-blue-800">8월 10일 (금)<br/>방과후 5시</p>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                <h3 className="font-bold text-blue-900 mb-1 text-sm">📍 장소</h3>
                                <p className="text-sm text-blue-800">본관 4층<br/>제1 음악실</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold text-slate-900 mb-2 text-sm">📝 지원 자격</h3>
                            <p className="text-sm leading-relaxed text-slate-600 bg-slate-50 p-3 rounded-lg">
                                음악을 진심으로 사랑하는 선광인 누구나.<br/>
                                실력보다는 꾸준히 연습에 참여할 수 있는 성실함을 봅니다.
                            </p>
                        </div>

                        <div className="mt-4 pt-4 border-t border-dashed border-slate-200 flex items-center justify-between text-xs text-slate-500">
                            <span className="font-medium">문의: 2학년 강신우</span>
                            <span className="px-2 py-1 bg-slate-100 rounded">점심시간 음악실 방문</span>
                        </div>
                    </div>
                    
                    <div className="mt-8">
                        <button 
                            onClick={() => setIsAuditionModalOpen(false)}
                            className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 transform hover:-translate-y-0.5"
                        >
                            확인했습니다
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Counseling Modal */}
      {isCounselingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
            <div 
                className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden relative animate-fade-in-up"
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    onClick={() => setIsCounselingModalOpen(false)}
                    className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                >
                    <X size={20} />
                </button>
            
                <div className="p-8">
                    <div className="flex items-center mb-6 border-b border-slate-100 pb-4">
                        <SchoolLogo className="w-12 h-12 text-slate-900 mr-4 opacity-90" />
                        <div>
                            <h2 className="text-xl font-bold font-serif text-slate-900">또래 상담 신청</h2>
                            <p className="text-sm text-slate-500 font-medium">2055학년도 1학기 Wee Class</p>
                        </div>
                    </div>

                    {counselingView === 'FORM' && (
                        <form className="space-y-4" onSubmit={handleCounselingSubmit}>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">학년 / 이름</label>
                                <input 
                                    type="text" 
                                    placeholder="예: 2학년 홍길동" 
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-800 transition-all" 
                                    required 
                                    value={counselingInput}
                                    onChange={(e) => setCounselingInput(e.target.value)}
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">상담 유형</label>
                                <select className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-800 transition-all bg-white">
                                    <option>교우관계</option>
                                    <option>학업/진로</option>
                                    <option>가정문제</option>
                                    <option>기타</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">고민 내용 (비밀 보장)</label>
                                <textarea 
                                    rows={4} 
                                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-800 resize-none transition-all" 
                                    placeholder="고민을 털어놓으세요..."
                                ></textarea>
                            </div>

                            <div className="bg-slate-50 p-3 rounded text-xs text-slate-500 leading-relaxed border border-slate-100">
                                <p className="mb-1">* 제출된 내용은 담당 상담 교사와 연결된 또래 상담사에게만 공개됩니다.</p>
                                <p>* 긴급한 도움이 필요한 경우 보건실을 방문해주세요.</p>
                            </div>

                            <button 
                                type="submit" 
                                className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 transform hover:-translate-y-0.5 mt-2"
                            >
                                신청서 제출하기
                            </button>
                        </form>
                    )}

                    {counselingView === 'SUCCESS' && (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                                <Check size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">신청이 완료되었습니다.</h3>
                            <p className="text-slate-500 mb-6">담당 상담사가 배정되면 별도로 연락드리겠습니다.</p>
                            <button 
                                onClick={() => setIsCounselingModalOpen(false)}
                                className="px-6 py-2 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800"
                            >
                                닫기
                            </button>
                        </div>
                    )}

                    {/* Taegyeong's History View */}
                    {counselingView === 'HISTORY_TAEGYEONG' && (
                        <div className="animate-fade-in">
                            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-blue-900">2학년 윤태경님의 상담 내역</h3>
                                    <span className="text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full font-bold">처리 중</span>
                                </div>
                                <p className="text-xs text-blue-700 mb-1">접수일: 2055.05.12</p>
                                <p className="text-xs text-blue-700">상담 유형: 개인 심리</p>
                            </div>
                            
                            <div className="space-y-4 mb-6">
                                <div>
                                    <h4 className="text-sm font-bold text-slate-700 mb-2 flex items-center">
                                        <FileText size={16} className="mr-2" />
                                        접수 내용
                                    </h4>
                                    <div className="bg-white p-4 rounded-lg border border-slate-200 text-sm text-slate-600 leading-relaxed italic">
                                        "요즘 자꾸만 거울 속의 표정이 낯설게 느껴집니다. 남들이 보는 나와 내가 느끼는 내가 달라서 혼란스러워요. ...아니, 사실 괜찮습니다. 그냥 적어봤어요. 문제 없습니다."
                                    </div>
                                </div>
                                
                                <div>
                                    <h4 className="text-sm font-bold text-slate-700 mb-2 flex items-center">
                                        <AlertCircle size={16} className="mr-2" />
                                        상담사 메모
                                    </h4>
                                    <div className="bg-slate-50 p-3 rounded text-xs text-slate-500">
                                        학생이 내담 의사를 번복함. 지속적인 관찰 필요.
                                    </div>
                                </div>
                            </div>

                            <button onClick={() => setIsCounselingModalOpen(false)} className="w-full py-3 bg-slate-900 text-white rounded-lg font-bold">확인</button>
                        </div>
                    )}

                    {/* Sinu's History View */}
                    {counselingView === 'HISTORY_SINU' && (
                        <div className="animate-fade-in">
                            <div className="bg-slate-100 border-l-4 border-slate-500 p-4 mb-6 rounded-r-lg">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-slate-900">2학년 강신우님의 상담 내역</h3>
                                    <span className="text-xs bg-slate-300 text-slate-800 px-2 py-0.5 rounded-full font-bold">완료</span>
                                </div>
                                <p className="text-xs text-slate-600 mb-1">접수일: 2055.04.02</p>
                                <p className="text-xs text-slate-600">상담 유형: 교우 관계</p>
                            </div>
                            
                            <div className="space-y-4 mb-6">
                                <div>
                                    <h4 className="text-sm font-bold text-slate-700 mb-2 flex items-center">
                                        <FileText size={16} className="mr-2" />
                                        접수 내용
                                    </h4>
                                    <div className="bg-white p-4 rounded-lg border border-slate-200 text-sm text-slate-600 leading-relaxed italic">
                                        "제 친구가 나쁜 상황에 휘말린 것 같은데, 제가 섣불리 나서면 상황이 더 악화될까 봐 무섭습니다. 그냥 모른 척 곁에 있어주는 게 그 친구를 위하는 걸까요? 답답합니다."
                                    </div>
                                </div>
                            </div>

                            <button onClick={() => setIsCounselingModalOpen(false)} className="w-full py-3 bg-slate-900 text-white rounded-lg font-bold">확인</button>
                        </div>
                    )}

                    {/* Jay's History View */}
                    {counselingView === 'HISTORY_JAY' && (
                        <div className="animate-fade-in">
                            <div className="bg-rose-50 border-l-4 border-rose-500 p-4 mb-6 rounded-r-lg">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-rose-900">2학년 한제이님의 상담 내역</h3>
                                    <span className="text-xs bg-rose-200 text-rose-800 px-2 py-0.5 rounded-full font-bold">보류</span>
                                </div>
                                <p className="text-xs text-rose-700 mb-1">접수일: 2055.03.10</p>
                                <p className="text-xs text-rose-700">상담 유형: 정보 열람 문의</p>
                            </div>
                            
                            <div className="space-y-4 mb-6">
                                <div>
                                    <h4 className="text-sm font-bold text-slate-700 mb-2 flex items-center">
                                        <Lock size={16} className="mr-2" />
                                        접수 내용
                                    </h4>
                                    <div className="bg-white p-4 rounded-lg border border-slate-200 text-sm text-slate-600 leading-relaxed italic">
                                        "우리 학교 위클래스 상담 기록은 얼마나 안전하게 보관되나요? 특정 학생의 상담 내용을 열람하려면, 학생회 임원으로서 어떤 절차가 필요한지 궁금합니다."
                                    </div>
                                </div>
                                
                                <div>
                                    <h4 className="text-sm font-bold text-red-600 mb-2 flex items-center">
                                        <AlertTriangle size={16} className="mr-2" />
                                        시스템 경고
                                    </h4>
                                    <div className="bg-red-50 p-3 rounded text-xs text-red-600 border border-red-100">
                                        ⚠ 권한 없는 상담 일지 접근 시도가 감지되었습니다. (IP: 교내 컴퓨터실 04)
                                    </div>
                                </div>
                            </div>

                            <button onClick={() => setIsCounselingModalOpen(false)} className="w-full py-3 bg-slate-900 text-white rounded-lg font-bold">확인</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
      )}
    </Layout>
  );
};

export default App;