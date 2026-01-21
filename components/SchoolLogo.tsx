import React from 'react';

interface SchoolLogoProps {
  className?: string;
}

const SchoolLogo: React.FC<SchoolLogoProps> = ({ className }) => {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="선광고등학교 로고">
      {/* Shield Main Body */}
      <path 
        d="M60 110C60 110 15 95 15 35V15H105V35C105 95 60 110 60 110Z" 
        className="fill-slate-900 transition-colors" 
        stroke="currentColor" 
        strokeWidth="4"
      />
      
      {/* Inner Border for Detail */}
      <path 
        d="M60 102C60 102 23 89 23 40V23H97V40C97 89 60 102 60 102Z" 
        stroke="white" 
        strokeWidth="1"
        strokeOpacity="0.3"
      />

      {/* Central Star - Representing 'Gwang' (Light) & 'Tae' (Star) */}
      <path 
        d="M60 35L66 52H84L69 62L75 79L60 68L45 79L51 62L36 52H54L60 35Z" 
        fill="white"
      />
      
      {/* Decorative Lines/Book pages at bottom */}
      <path d="M45 88H75" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
      <path d="M50 94H70" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
};

export default SchoolLogo;