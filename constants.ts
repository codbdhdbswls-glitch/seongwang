import { Student } from './types';

export const SCHOOL_NAME = "선광고등학교";
export const SCHOOL_MOTTO = "진실, 광명, 조화";

export const STUDENTS: Student[] = [
  {
    id: 'taegyeong',
    name: '윤태경',
    hanja: '尹台冏',
    nameMeaning: [
      '台(태) : 별의 이름',
      '冏(경) : 빛날 경',
      '→ 높은 곳에서 빛나도록 이름 붙여진 존재'
    ],
    age: 18,
    height: '180cm',
    birthday: '2월 20일',
    photoUrl: 'https://i.postimg.cc/DyXFCXwj/yuntaegyeong.png',
    club: '없음 (외부 비공개 아이돌 연습생)',
    appearance: ['단정한 교복', '흐트러짐 없는 외모', '무대 체질'],
    personality: {
      summary: ['조용하고 예의 바름', '눈치 빠름', '수동적 완벽주의'],
      detailed: [
        '타인의 기대에 맞추는 데 익숙함',
        '불편해도 표정과 말투를 유지함',
        '자신의 감정을 중요하게 여기지 않음'
      ]
    },
    preferences: {
      likes: ['누군가 보고 있는 상황', '정해진 일정', '연습실', '칭찬'],
      dislikes: ['혼자 남는 시간', '감정 질문', '"너는 어떻게 느껴?"']
    },
    hobbies: [
      '거울 앞 표정 연습',
      '안무 반복 연습',
      '인터뷰 상황 상상하며 답변 정리'
    ],
    values: [
      '“잘 보이면 된다.”',
      '“문제 없으면 괜찮다.”',
      '“기대에 맞추는 게 안전하다.”'
    ],
    relationships: [
      { targetId: 'jay', description: '착하고 다정한 친구 (라고 믿음)', type: 'friendly' },
      { targetId: 'sinu', description: '비교적 편한 태도를 보임', type: 'friendly' }
    ],
    romanceValues: [
      '연애에 대해 막연한 동경은 있음',
      '감정을 요구받는 관계는 부담스러움',
      '좋아해도 먼저 표현하지 않음',
      '상대가 원하는 답을 우선 선택함'
    ],
    habits: [
      '“괜찮아”를 자주 말함',
      '불안하면 손이나 옷깃을 만짐',
      '혼자 있을 때 낮게 자문자답'
    ],
    features: [
      '웃을 때 입꼬리만 움직임',
      '눈동자가 잘 흔들리지 않음',
      '칭찬을 받아도 반응이 옅음',
      '누군가 보고 있을 때 더 안정됨'
    ],
    speech: {
      style: ['공손하고 부드러움', '상대가 듣기 좋은 말을 고르는 편', '감정 절제'],
      examples: [
        '괜찮아, 이 정도면.',
        '내가 맞출게.',
        '문제 없었어.',
        '그렇게 하면 되지?',
        '지금은… 괜찮아.'
      ]
    },
    academic: {
      period: '2학년 1학기 중간고사',
      classRank: 15,
      totalStudents: 320,
      grades: [
        { subject: '문학', score: 96, rank: 1, semester: '1학기' },
        { subject: '수학 I', score: 92, rank: 2, semester: '1학기' },
        { subject: '영어 I', score: 95, rank: 1, semester: '1학기' },
        { subject: '생활과 윤리', score: 88, rank: 2, semester: '1학기' },
        { subject: '체육 예술', score: 100, rank: 1, semester: '1학기' }
      ],
      teacherComment: "학업 성취도가 매우 우수하며, 교과 수업 시간 집중도가 높음. 타인의 시선을 의식하여 과제 제출 기한을 철저히 지키고 결과물의 완성도에 집착하는 경향이 있음. 외부 진로 활동(예술)과 학업의 균형을 잘 맞추고 있는 모범생."
    },
    themeColor: 'blue'
  },
  {
    id: 'sinu',
    name: '강신우',
    hanja: '姜信佑',
    nameMeaning: [
      '姜(강) : 단단하고 강인함',
      '信(신) : 신뢰, 믿음',
      '佑(우) : 곁에서 돕다',
      '→ 묵묵히 곁에 붙어 남을 지탱하는 사람'
    ],
    age: 18,
    height: '178cm',
    birthday: '4월 27일',
    photoUrl: 'https://i.postimg.cc/QtmVdWTv/gangsin-u.png',
    club: '밴드부 (드럼)',
    appearance: ['검은 오버핏 반팔티', '검은 바지', '스틱 가방', '옅은 다크서클'],
    personality: {
      summary: ['과묵함', '관찰자', '속정 깊음', '희생적'],
      detailed: [
        '갈등을 만들기보단 참고 넘기는 타입',
        '자신보다 타인을 먼저 걱정함',
        '죄책감을 쉽게 느끼고 스스로를 자주 깎아내림'
      ]
    },
    preferences: {
      likes: ['윤태경', '음악 연습', '밤 산책', '조용한 공간'],
      dislikes: ['강요', '뒷말', '누군가 상처받는 상황']
    },
    hobbies: [
      '드럼 연습 (스트레스 해소)',
      '오래된 밴드 영상 반복 시청',
      '혼자 이어폰 끼고 걷기'
    ],
    values: ['“버틸 수 있으면, 그게 제일 나은 선택이야.”'],
    relationships: [
      { targetId: 'taegyeong', description: '보호자에 가까운 친구', type: 'friendly' },
      { targetId: 'jay', description: '공포와 분노 속 침묵 (본성을 눈치챔)', type: 'hostile' }
    ],
    romanceValues: [
      '좋아해도 쉽게 고백하지 않음',
      '관계를 시작하면 오래 책임지려 함',
      '사랑보다 ‘지켜주는 것’을 우선함',
      '자신의 감정은 뒤로 미룸'
    ],
    habits: [
      '불안하면 손가락 마디를 누름',
      '생각이 많아질수록 말수가 줄어듦',
      '누군가 다치면 습관적으로 “괜찮아?”를 먼저 말함'
    ],
    features: [
      '웃을 때 한쪽 입꼬리만 올라감',
      '항상 스틱 가방을 메고 다님',
      '말투에 망설임이 섞임'
    ],
    speech: {
      style: ['짧고 낮은 톤', '단정하지만 망설임이 섞임', '상대 배려'],
      examples: [
        '괜찮아. 내가 할게.',
        '굳이 말 안 해도 돼.',
        '태경이는… 그런 애 아니잖아.',
        '지금은 그냥 넘어가자.'
      ]
    },
    academic: {
      period: '2학년 1학기 중간고사',
      classRank: 58,
      totalStudents: 320,
      grades: [
        { subject: '문학', score: 82, rank: 3, semester: '1학기' },
        { subject: '수학 I', score: 78, rank: 3, semester: '1학기' },
        { subject: '영어 I', score: 85, rank: 3, semester: '1학기' },
        { subject: '음악 이론', score: 98, rank: 1, semester: '1학기' },
        { subject: '물리학 I', score: 72, rank: 4, semester: '1학기' }
      ],
      teacherComment: "조용하고 묵묵하게 학업에 임함. 성적이 크게 두드러지지는 않으나 기복 없이 꾸준함을 유지함. 수업 시간에 조는 일 없이 성실하나, 발표 등의 적극적인 참여는 부족함. 음악 교과에서 탁월한 재능과 이해도를 보임."
    },
    themeColor: 'slate'
  },
  {
    id: 'jay',
    name: '한제이',
    hanja: '韓制伊',
    nameMeaning: [
      '制(제): 통제하다, 제어하다',
      '伊(이): 그 사람, 대상',
      '→ “타인을 통제하는 사람”',
      '(부드러운 이름 아래 숨겨진 지배 욕구)'
    ],
    age: 18,
    height: '162cm',
    birthday: '5월 14일',
    photoUrl: 'https://i.postimg.cc/1zJZg0vX/hanjei.png',
    club: '없음 (필요시에만 등장)',
    appearance: ['핑크 머리', '하얀 반팔 와이셔츠', '베이지색 체크무늬 넥타이', '검정 치마', '단정한 인상'],
    personality: {
      summary: ['이중적', '통제광', '집착', '연기 천재'],
      detailed: [
        '겉모습: 상냥함, 다정함, 세심한 배려 (“사람 좋은 애”)',
        '본모습: 강한 집착, 통제욕, 공격성',
        '사랑과 소유를 동일시함'
      ]
    },
    preferences: {
      likes: ['윤태경의 관심', '비밀 공유', '타인의 약점', '“나만 아는 모습”'],
      dislikes: ['강신우', '통제할 수 없는 변수', '의심받는 상황']
    },
    hobbies: [
      '사람 관찰',
      '대화 기록 기억하기',
      '윤태경의 스케줄·컨디션 관리(명목상)'
    ],
    values: [
      '“사랑은 지켜야 하는 게 아니라, 내가 쥐고 있어야 안전해.”'
    ],
    relationships: [
      { targetId: 'taegyeong', description: '사랑(통제와 파괴), 망가지길 바람', type: 'obsessive' },
      { targetId: 'sinu', description: '제거 대상', type: 'hostile' }
    ],
    romanceValues: [
      '사랑 = 소유',
      '상대의 삶에 개입하는 것을 애정이라 착각',
      '거절은 배신으로 인식',
      '상대가 망가질수록 더 강한 애착을 느낌'
    ],
    habits: [
      '웃을 때 고개를 살짝 기울임',
      '불쾌할수록 목소리가 더 부드러워짐',
      '손톱으로 손바닥을 눌러 감정 억제'
    ],
    features: [
      '윤태경 앞에서는 완벽한 “좋은 사람”',
      '강신우와 단둘이 있을 때만 살기 노출',
      '직접적인 폭력 대신 환경·상황을 망가뜨리는 방식 선호',
      '자신의 행동을 “사랑을 위한 불가피한 선택”이라 정당화'
    ],
    speech: {
      style: ['겉: 부드럽고 상냥, 안심시키는 화법', '속: 낮고 차가움, 비아냥, 정체성 공격'],
      examples: [
        '(윤태경에게) 오늘 연습 힘들었지? 무리하지 말고… 내가 옆에 있을게.',
        '(윤태경에게) 태경이는 너무 착해서 문제야. 다들 널 이용하려 해.',
      ],
      internal: [
         '(강신우에게) 너 동성애자잖아.',
         '(강신우에게) 태경이 근처 얼씬거리지 마. 더럽히지 말라고.'
      ]
    },
    academic: {
      period: '2학년 1학기 중간고사',
      classRank: 1,
      totalStudents: 320,
      grades: [
        { subject: '문학', score: 100, rank: 1, semester: '1학기' },
        { subject: '수학 I', score: 100, rank: 1, semester: '1학기' },
        { subject: '영어 I', score: 100, rank: 1, semester: '1학기' },
        { subject: '생활과 윤리', score: 100, rank: 1, semester: '1학기' },
        { subject: '화학 I', score: 100, rank: 1, semester: '1학기' }
      ],
      teacherComment: "전 과목 만점. 타의 추종을 불허하는 학업 성취도를 보임. 교과 내용에 대한 이해가 완벽하며, 학급 분위기를 주도적으로 조성함. 교사 및 교우 관계가 원만하고 모든 면에서 완벽하여 타의 모범이 됨."
    },
    themeColor: 'pink'
  }
];