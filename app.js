/**
 * MediQue - Hospital Outpatient Queue Management System
 * Production client application with live state, sound effects, multilingual i18n, and emergency triage.
 */

// 1. Data Store & Configuration
const DEPARTMENTS = [
  {
    id: 'general-medicine',
    name: 'General Medicine',
    nameTa: 'பொது மருத்துவம்',
    nameHi: 'सामान्य चिकित्सा',
    icon: 'stethoscope',
    description: 'Primary care, fevers, routine checkups & chronic health management',
    descriptionTa: 'ஆரம்ப சிகிச்சை, காய்ச்சல் மற்றும் வழக்கமான பரிசோதனைகள்',
    roomNumber: 'OPD-101',
    avgConsultationMinutes: 10,
  },
  {
    id: 'cardiology',
    name: 'Cardiology',
    nameTa: 'இதயவியல்',
    nameHi: 'हृदय रोग विज्ञान',
    icon: 'heart-pulse',
    description: 'Heart health, ECG, blood pressure & cardiovascular diagnostics',
    descriptionTa: 'இதய நலம், இரத்த அழுத்தம் மற்றும் இருதய பரிசோதனை',
    roomNumber: 'OPD-204',
    avgConsultationMinutes: 15,
  },
  {
    id: 'pediatrics',
    name: 'Pediatrics',
    nameTa: 'குழந்தைகள் நலம்',
    nameHi: 'बाल रोग विभाग',
    icon: 'baby',
    description: 'Child care, neonatal consultations, immunizations & growth',
    descriptionTa: 'குழந்தைகள் பராமரிப்பு, தடுப்பூசிகள் மற்றும் வளர்ச்சி',
    roomNumber: 'OPD-105',
    avgConsultationMinutes: 12,
  },
  {
    id: 'orthopedics',
    name: 'Orthopedics',
    nameTa: 'எலும்பியல்',
    nameHi: 'अस्थि रोग विभाग',
    icon: 'bone',
    description: 'Bone fractures, joint pain, spine health & physiotherapy triage',
    descriptionTa: 'எலும்பு முறிவு, மூட்டு வலி மற்றும் தசை நலன்',
    roomNumber: 'OPD-302',
    avgConsultationMinutes: 15,
  },
  {
    id: 'dermatology',
    name: 'Dermatology',
    nameTa: 'தோல் மருத்துவம்',
    nameHi: 'त्वचा रोग विज्ञान',
    icon: 'sparkles',
    description: 'Skin health, allergies, rashes & cosmetic dermatological care',
    descriptionTa: 'தோல் பராமரிப்பு, ஒவ்வாமை மற்றும் தடிப்பு சிகிச்சை',
    roomNumber: 'OPD-208',
    avgConsultationMinutes: 10,
  },
  {
    id: 'ent',
    name: 'ENT (Ear, Nose, Throat)',
    nameTa: 'காது, மூக்கு, தொண்டை',
    nameHi: 'ईएनटी (कान, नाक, गला)',
    icon: 'ear',
    description: 'Hearing issues, sinus problems, tonsillitis & voice disorders',
    descriptionTa: 'கேட்கும் திறன், சைனஸ் மற்றும் தொண்டை பிரச்சினைகள்',
    roomNumber: 'OPD-112',
    avgConsultationMinutes: 12,
  },
  {
    id: 'ophthalmology',
    name: 'Ophthalmology',
    nameTa: 'கண் மருத்துவம்',
    nameHi: 'नेत्र रोग विज्ञान',
    icon: 'eye',
    description: 'Vision testing, cataracts, eye strain & ocular health',
    descriptionTa: 'பார்வை பரிசோதனை, கண்புரை மற்றும் கண் நலம்',
    roomNumber: 'OPD-215',
    avgConsultationMinutes: 10,
  },
];

const INITIAL_DOCTORS = [
  {
    id: 'doc-1',
    name: 'Dr. Anand Ramanathan',
    nameTa: 'டாக்டர் ஆனந்த் ராமநாதன்',
    nameHi: 'डॉ. आनंद रामनाथन',
    specialty: 'Senior Consultant Physician',
    specialtyTa: 'மூத்த பொது மருத்துவர்',
    departmentId: 'general-medicine',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    experienceYears: 14,
    rating: 4.9,
    roomNumber: 'OPD-101A',
    status: 'available',
    avgConsultationMinutes: 10,
    currentQueueCount: 3,
    servingTokenNumber: 'MQ-MED-041',
  },
  {
    id: 'doc-2',
    name: 'Dr. Priya Sundaram',
    nameTa: 'டாக்டர் பிரியா சுந்தரம்',
    nameHi: 'डॉ. प्रिया सुंदरम',
    specialty: 'General Physician & Diabetologist',
    specialtyTa: 'பொது மருத்துவர் & நீரிழிவு நிபுணர்',
    departmentId: 'general-medicine',
    avatar: 'https://images.unsplash.com/photo-1594824813633-8902506e2a22?auto=format&fit=crop&q=80&w=400',
    experienceYears: 9,
    rating: 4.8,
    roomNumber: 'OPD-101B',
    status: 'available',
    avgConsultationMinutes: 8,
    currentQueueCount: 1, // Shortest queue! Smart recommendation!
    servingTokenNumber: 'MQ-MED-042',
  },
  {
    id: 'doc-3',
    name: 'Dr. Rajesh Balaji',
    nameTa: 'டாக்டர் ராஜேஷ் பாலாஜி',
    nameHi: 'डॉ. राजेश बालाजी',
    specialty: 'Interventional Cardiologist',
    specialtyTa: 'இருதய அறுவை சிகிச்சை நிபுணர்',
    departmentId: 'cardiology',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    experienceYears: 16,
    rating: 4.95,
    roomNumber: 'OPD-204A',
    status: 'available',
    avgConsultationMinutes: 15,
    currentQueueCount: 4,
    servingTokenNumber: 'MQ-CARD-018',
  },
  {
    id: 'doc-4',
    name: 'Dr. Kavitha Selvam',
    nameTa: 'டாக்டர் கவிதா செல்வம்',
    nameHi: 'डॉ. कविता सेल्वम',
    specialty: 'Pediatric Specialist',
    specialtyTa: 'குழந்தைகள் நல சிறப்பு மருத்துவர்',
    departmentId: 'pediatrics',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    experienceYears: 11,
    rating: 4.9,
    roomNumber: 'OPD-105',
    status: 'available',
    avgConsultationMinutes: 12,
    currentQueueCount: 2,
    servingTokenNumber: 'MQ-PED-029',
  },
  {
    id: 'doc-5',
    name: 'Dr. Vikram Chandra',
    nameTa: 'டாக்டர் விக்ரம் சந்திரா',
    nameHi: 'डॉ. विक्रम चंद्रा',
    specialty: 'Orthopedic & Joint Surgeon',
    specialtyTa: 'எலும்பு மற்றும் மூட்டு அறுவை சிகிச்சை நிபுணர்',
    departmentId: 'orthopedics',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
    experienceYears: 13,
    rating: 4.85,
    roomNumber: 'OPD-302',
    status: 'available',
    avgConsultationMinutes: 15,
    currentQueueCount: 3,
    servingTokenNumber: 'MQ-ORTH-014',
  },
  {
    id: 'doc-6',
    name: 'Dr. Shalini Natarajan',
    nameTa: 'டாக்டர் ஷாலினி நடராஜன்',
    nameHi: 'डॉ. शालिनी नटराजन',
    specialty: 'Consultant Dermatologist',
    specialtyTa: 'தோல் நல சிறப்பு மருத்துவர்',
    departmentId: 'dermatology',
    avatar: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80&w=400',
    experienceYears: 8,
    rating: 4.8,
    roomNumber: 'OPD-208',
    status: 'available',
    avgConsultationMinutes: 10,
    currentQueueCount: 2,
    servingTokenNumber: 'MQ-DERM-022',
  },
  {
    id: 'doc-7',
    name: 'Dr. Karthik Swaminathan',
    nameTa: 'டாக்டர் கார்த்திக் சுவாமிநாதன்',
    nameHi: 'डॉ. कार्तिक स्वामीनाथन',
    specialty: 'ENT Head & Neck Specialist',
    specialtyTa: 'காது, மூக்கு, தொண்டை நிபுணர்',
    departmentId: 'ent',
    avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=400',
    experienceYears: 10,
    rating: 4.75,
    roomNumber: 'OPD-112',
    status: 'on-break',
    avgConsultationMinutes: 12,
    currentQueueCount: 1,
    servingTokenNumber: 'MQ-ENT-009',
  },
  {
    id: 'doc-8',
    name: 'Dr. Meera Vasudevan',
    nameTa: 'டாக்டர் மீரா வாசுதேவன்',
    nameHi: 'डॉ. मीरा वासुदेवन',
    specialty: 'Ophthalmic Surgeon',
    specialtyTa: 'கண் அறுவை சிகிச்சை நிபுணர்',
    departmentId: 'ophthalmology',
    avatar: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=400',
    experienceYears: 12,
    rating: 4.9,
    roomNumber: 'OPD-215',
    status: 'available',
    avgConsultationMinutes: 10,
    currentQueueCount: 2,
    servingTokenNumber: 'MQ-EYE-015',
  },
];

const INITIAL_TOKENS = [
  {
    id: 'tok-1',
    tokenNumber: 'MQ-MED-041',
    patientName: 'Subramaniam V.',
    patientAge: 58,
    patientPhone: '+91 98401 23456',
    departmentId: 'general-medicine',
    doctorId: 'doc-1',
    status: 'serving',
    isEmergency: false,
    positionInQueue: 0,
    estimatedWaitMinutes: 0,
    createdAt: '2026-10-28T09:30:00Z',
  },
  {
    id: 'tok-2',
    tokenNumber: 'MQ-MED-043',
    patientName: 'Lakshmi Narayanan',
    patientAge: 44,
    patientPhone: '+91 94440 98765',
    departmentId: 'general-medicine',
    doctorId: 'doc-1',
    status: 'almost-turn',
    isEmergency: false,
    positionInQueue: 1,
    estimatedWaitMinutes: 10,
    createdAt: '2026-10-28T09:45:00Z',
  },
  {
    id: 'tok-3',
    tokenNumber: 'MQ-MED-044',
    patientName: 'Karthik Raja',
    patientAge: 29,
    patientPhone: '+91 97890 55432',
    departmentId: 'general-medicine',
    doctorId: 'doc-1',
    status: 'waiting',
    isEmergency: false,
    positionInQueue: 2,
    estimatedWaitMinutes: 20,
    createdAt: '2026-10-28T10:00:00Z',
  },
  {
    id: 'tok-4',
    tokenNumber: 'MQ-MED-042',
    patientName: 'Ravi Kumar',
    patientAge: 51,
    patientPhone: '+91 99400 33211',
    departmentId: 'general-medicine',
    doctorId: 'doc-2',
    status: 'serving',
    isEmergency: false,
    positionInQueue: 0,
    estimatedWaitMinutes: 0,
    createdAt: '2026-10-28T09:35:00Z',
  },
  {
    id: 'tok-5',
    tokenNumber: 'MQ-MED-046',
    patientName: 'Deepa Krishnan',
    patientAge: 37,
    patientPhone: '+91 91760 88765',
    departmentId: 'general-medicine',
    doctorId: 'doc-2',
    status: 'waiting',
    isEmergency: false,
    positionInQueue: 1,
    estimatedWaitMinutes: 8,
    createdAt: '2026-10-28T10:12:00Z',
  },
  {
    id: 'tok-6',
    tokenNumber: 'MQ-CARD-018',
    patientName: 'Ganesan Murugesan',
    patientAge: 64,
    patientPhone: '+91 98410 77654',
    departmentId: 'cardiology',
    doctorId: 'doc-3',
    status: 'serving',
    isEmergency: false,
    positionInQueue: 0,
    estimatedWaitMinutes: 0,
    createdAt: '2026-10-28T09:15:00Z',
  },
  {
    id: 'tok-7',
    tokenNumber: 'MQ-CARD-019',
    patientName: 'Sundaramoorthy P.',
    patientAge: 71,
    patientPhone: '+91 94432 44321',
    departmentId: 'cardiology',
    doctorId: 'doc-3',
    status: 'almost-turn',
    isEmergency: true,
    emergencyReason: 'Acute Chest Discomfort reported at triage',
    positionInQueue: 1,
    estimatedWaitMinutes: 5,
    createdAt: '2026-10-28T09:50:00Z',
  },
  {
    id: 'tok-8',
    tokenNumber: 'MQ-PED-029',
    patientName: 'Baby Aarav',
    patientAge: 3,
    patientPhone: '+91 97910 66778',
    departmentId: 'pediatrics',
    doctorId: 'doc-4',
    status: 'serving',
    isEmergency: false,
    positionInQueue: 0,
    estimatedWaitMinutes: 0,
    createdAt: '2026-10-28T09:40:00Z',
  },
  {
    id: 'tok-9',
    tokenNumber: 'MQ-ORTH-014',
    patientName: 'Venkatachalam S.',
    patientAge: 62,
    patientPhone: '+91 93810 55443',
    departmentId: 'orthopedics',
    doctorId: 'doc-5',
    status: 'serving',
    isEmergency: false,
    positionInQueue: 0,
    estimatedWaitMinutes: 0,
    createdAt: '2026-10-28T09:20:00Z',
  },
];

// Multilingual translations
const TRANSLATIONS = {
  en: {
    brandName: 'MediQue',
    tagline: 'Less waiting. Better care.',
    heroTitle: 'Skip the wait.',
    heroHighlight: 'Focus on your health.',
    heroDesc: 'Book outpatient tokens from anywhere, track your real-time queue position on your phone, and see your doctor without the stress of crowded hospital waiting rooms.',
    navHome: 'Home',
    navBook: 'Book Token',
    navTrack: 'Track Queue',
    navDoctors: 'Doctors',
    navStaff: 'Staff Portal',
    ctaBook: 'Book a Token',
    ctaTrack: 'Track My Queue',
    ctaStaffDemo: 'Staff Demo Mode',
    ctaPatientView: 'Patient View',
    waitingPatients: 'Patients Waiting',
    avgWait: 'Avg. Waiting Time',
    doctorsAvailable: 'Doctors Available',
    issuedToday: 'Tokens Issued Today',
    mins: 'mins',
    emergencyNotice: 'Emergency Alert: Patients with acute chest pain, trauma, or breathing difficulty must not wait in an online queue. Proceed to 24/7 Casualty immediately.',
    emergencyHelpline: 'Emergency Helpline: 108 / +91 44 2836 9999',
    recommendedBadge: 'Recommended for you',
    recommendedText: 'Available now with the shortest waiting queue',
    step1: '1. Book Token Online',
    step1Desc: 'Pick department & available doctor with live queue length.',
    step2: '2. Track Live Queue',
    step2Desc: 'Know your exact position and estimated arrival time.',
    step3: '3. Arrive Just in Time',
    step3Desc: 'Receive alerts and walk directly into the doctor cabin.',
    footerRights: 'MediQue Healthcare Systems. Built for College Hackathon.',
  },
  ta: {
    brandName: 'மெடிகியூ (MediQue)',
    tagline: 'குறைந்த காத்திருப்பு. சிறந்த சிகிச்சை.',
    heroTitle: 'காத்திருப்பை தவிருங்கள்.',
    heroHighlight: 'உங்கள் ஆரோக்கியத்தில் கவனம் செலுத்துங்கள்.',
    heroDesc: 'எங்கிருந்தும் ஆன்லைனில் டோக்கன் பதிவு செய்யுங்கள், உங்கள் மொபைலில் நேரலை வரிசை நிலையை அறிந்து கொள்ளுங்கள், கூட்ட நெரிசல் இல்லாமல் மருத்துவரை அணுகுங்கள்.',
    navHome: 'முகப்பு',
    navBook: 'டோக்கன் பதிவு',
    navTrack: 'வரிசை அறிதல்',
    navDoctors: 'மருத்துவர்கள்',
    navStaff: 'பணியாளர் தளம்',
    ctaBook: 'டோக்கன் எடுக்க',
    ctaTrack: 'வரிசையை கண்காணிக்க',
    ctaStaffDemo: 'பணியாளர் பார்வை',
    ctaPatientView: 'நோயாளி பார்வை',
    waitingPatients: 'காத்திருக்கும் நோயாளிகள்',
    avgWait: 'சராசரி காத்திருப்பு',
    doctorsAvailable: 'பணியில் உள்ள மருத்துவர்கள்',
    issuedToday: 'இன்று வழங்கப்பட்ட டோக்கன்',
    mins: 'நிமிடம்',
    emergencyNotice: 'அவசர எச்சரிக்கை: கடுமையான நெஞ்சுவலி அல்லது மூச்சுத்திணறல் உள்ளவர்கள் ஆன்லைன் டோக்கனுக்காக காத்திருக்க வேண்டாம். உடனடியாக அவசர சிகிச்சைப் பிரிவை (Casualty) அணுகவும்.',
    emergencyHelpline: 'அவசர உதவி: 108 / +91 44 2836 9999',
    recommendedBadge: 'உங்களுக்காக பரிந்துரைக்கப்பட்டது',
    recommendedText: 'குறைந்த காத்திருப்பு வரிசையுடன் தற்போது கிடைக்கிறார்',
    step1: '1. ஆன்லைனில் டோக்கன் பெறுக',
    step1Desc: 'பிரிவு மற்றும் குறைந்த காத்திருப்பு உள்ள மருத்துவரை தேர்ந்தெடுக்கவும்.',
    step2: '2. நேரலை வரிசையை காண்க',
    step2Desc: 'உங்களுக்கு முன் உள்ளவர்கள் மற்றும் உத்தேச காத்திருப்பு நேரத்தை அறியலாம்.',
    step3: '3. சரியான நேரத்தில் வரவும்',
    step3Desc: 'உங்கள் முறை வரும்போது நேரடியாக மருத்துவர் அறைக்கு செல்லலாம்.',
    footerRights: 'மெடிகியூ (MediQue) சுகாதார அமைப்பு. கல்லூரி ஹேக்கத்தானுக்காக உருவாக்கப்பட்டது.',
  },
  hi: {
    brandName: 'मेडीक्यू (MediQue)',
    tagline: 'कम प्रतीक्षा। बेहतर इलाज।',
    heroTitle: 'कतार छोड़िए।',
    heroHighlight: 'अपनी सेहत पर ध्यान दें।',
    heroDesc: 'घर बैठे ओपीडी टोकन बुक करें, अपने मोबाइल पर लाइव कतार की स्थिति देखें और बिना भीड़ की चिंता के डॉक्टर से मिलें।',
    navHome: 'होम',
    navBook: 'टोकन बुक करें',
    navTrack: 'कतार ट्रैक करें',
    navDoctors: 'डॉक्टर्स',
    navStaff: 'स्टाफ पोर्टल',
    ctaBook: 'टोकन बुक करें',
    ctaTrack: 'कतार ट्रैक करें',
    ctaStaffDemo: 'स्टाफ डेमो',
    ctaPatientView: 'रोगी दृश्य',
    waitingPatients: 'प्रतीक्षारत मरीज',
    avgWait: 'औसत प्रतीक्षा',
    doctorsAvailable: 'उपलब्ध डॉक्टर्स',
    issuedToday: 'आज जारी कुल टोकन',
    mins: 'मिनट',
    emergencyNotice: 'आपातकालीन चेतावनी: गंभीर सीने में दर्द या सांस लेने में तकलीफ होने पर ऑनलाइन टोकन का इंतजार न करें। तुरंत कैजुअल्टी विभाग में जाएं।',
    emergencyHelpline: 'आपातकालीन हेल्पलाइन: 108 / +91 44 2836 9999',
    recommendedBadge: 'आपके लिए अनुशंसित',
    recommendedText: 'कम प्रतीक्षा कतार के साथ वर्तमान में उपलब्ध',
    step1: '1. ऑनलाइन टोकन बुक करें',
    step1Desc: 'विभाग चुनें और सबसे कम कतार वाले डॉक्टर का चयन करें।',
    step2: '2. लाइव कतार ट्रैक करें',
    step2Desc: 'अपनी कतार स्थिति और सटीक अनुमानित समय देखें।',
    step3: '3. सही समय पर पहुंचें',
    step3Desc: 'अपनी बारी आने पर सीधे डॉक्टर के कमरे में प्रवेश करें।',
    footerRights: 'मेडीक्यू (MediQue) हेल्थकेयर। कॉलेज हैकथॉन के लिए निर्मित।',
  }
};

// 2. Application State & LocalStorage
class Store {
  constructor() {
    this.lang = localStorage.getItem('mq_lang') || 'ta';
    this.isStaff = localStorage.getItem('mq_staff') === 'true';
    this.currentPath = window.location.pathname || '/';
    this.tokens = JSON.parse(localStorage.getItem('mq_tokens') || 'null') || INITIAL_TOKENS;
    this.doctors = JSON.parse(localStorage.getItem('mq_doctors') || 'null') || INITIAL_DOCTORS;
    this.departments = DEPARTMENTS;
    this.notifications = JSON.parse(localStorage.getItem('mq_notifs') || '[]');
    this.activeSearchToken = 'MQ-MED-043';
    this.bookingStep = 1;
    this.bookingForm = {
      name: '',
      age: '',
      phone: '',
      departmentId: 'general-medicine',
      doctorId: '',
      notes: ''
    };
    this.newlyBookedToken = null;
  }

  save() {
    localStorage.setItem('mq_lang', this.lang);
    localStorage.setItem('mq_staff', this.isStaff);
    localStorage.setItem('mq_tokens', JSON.stringify(this.tokens));
    localStorage.setItem('mq_doctors', JSON.stringify(this.doctors));
    localStorage.setItem('mq_notifs', JSON.stringify(this.notifications));
  }

  t() {
    return TRANSLATIONS[this.lang] || TRANSLATIONS.en;
  }

  playChime(type = 'success') {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      if (type === 'success') {
        osc.frequency.setValueAtTime(587.33, ctx.currentTime);
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else if (type === 'alert') {
        osc.frequency.setValueAtTime(850, ctx.currentTime);
        osc.frequency.setValueAtTime(600, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      }
    } catch (e) {}
  }

  getRecommendedDoctor(deptId) {
    const docs = this.doctors.filter(d => d.departmentId === deptId);
    if (!docs.length) return null;
    const sorted = [...docs].sort((a, b) => {
      if (a.status === 'available' && b.status !== 'available') return -1;
      if (a.status !== 'available' && b.status === 'available') return 1;
      const waitA = a.currentQueueCount * a.avgConsultationMinutes;
      const waitB = b.currentQueueCount * b.avgConsultationMinutes;
      return waitA - waitB;
    });
    return sorted[0];
  }

  bookToken(formData) {
    const deptPrefixMap = {
      'general-medicine': 'MQ-MED',
      'cardiology': 'MQ-CARD',
      'pediatrics': 'MQ-PED',
      'orthopedics': 'MQ-ORTH',
      'dermatology': 'MQ-DERM',
      'ent': 'MQ-ENT',
      'ophthalmology': 'MQ-EYE',
    };
    const prefix = deptPrefixMap[formData.departmentId] || 'MQ';
    const seq = String(this.tokens.length + 48).padStart(3, '0');
    const tokenNumber = `${prefix}-${seq}`;

    const doc = this.doctors.find(d => d.id === formData.doctorId);
    const waitingForDoc = this.tokens.filter(t => t.doctorId === formData.doctorId && (t.status === 'waiting' || t.status === 'almost-turn'));
    const position = waitingForDoc.length + 1;
    const avgMins = doc ? doc.avgConsultationMinutes : 10;
    const estWait = position * avgMins;

    const token = {
      id: 'tok-' + Date.now(),
      tokenNumber,
      patientName: formData.name.trim(),
      patientAge: parseInt(formData.age, 10),
      patientPhone: formData.phone.trim(),
      departmentId: formData.departmentId,
      doctorId: formData.doctorId,
      status: position === 1 ? 'almost-turn' : 'waiting',
      isEmergency: false,
      positionInQueue: position,
      estimatedWaitMinutes: estWait,
      createdAt: new Date().toISOString(),
      notes: formData.notes
    };

    this.tokens.push(token);

    // Update doctor's queue count
    this.doctors = this.doctors.map(d => {
      if (d.id === formData.doctorId) {
        return { ...d, currentQueueCount: d.currentQueueCount + 1 };
      }
      return d;
    });

    // Add alert notification
    this.notifications.unshift({
      id: 'notif-' + Date.now(),
      title: `Token ${token.tokenNumber} Booked`,
      msg: `Your token with ${doc ? doc.name : 'Doctor'} is confirmed. Est. wait: ~${estWait} mins.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    this.save();
    this.playChime('success');
    return token;
  }

  callNextToken(doctorId) {
    const doc = this.doctors.find(d => d.id === doctorId);
    if (!doc) return;

    // Complete current serving token
    this.tokens = this.tokens.map(t => {
      if (t.doctorId === doctorId && t.status === 'serving') {
        return { ...t, status: 'completed' };
      }
      return t;
    });

    // Find next eligible token (emergency first, then lowest position)
    const candidates = this.tokens
      .filter(t => t.doctorId === doctorId && (t.status === 'waiting' || t.status === 'almost-turn'))
      .sort((a, b) => {
        if (a.isEmergency && !b.isEmergency) return -1;
        if (!a.isEmergency && b.isEmergency) return 1;
        return a.positionInQueue - b.positionInQueue;
      });

    const nextToken = candidates[0];
    let servingNo = null;

    if (nextToken) {
      servingNo = nextToken.tokenNumber;
      this.tokens = this.tokens.map(t => {
        if (t.id === nextToken.id) {
          return { ...t, status: 'serving', positionInQueue: 0, estimatedWaitMinutes: 0 };
        }
        return t;
      });

      this.notifications.unshift({
        id: 'notif-' + Date.now(),
        title: `Now Serving: ${nextToken.tokenNumber}`,
        msg: `${nextToken.patientName}, please enter ${doc.roomNumber} immediately.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      this.playChime('alert');
    }

    // Recompute queue for remaining waiting patients
    let pos = 1;
    this.tokens = this.tokens.map(t => {
      if (t.doctorId === doctorId && t.status !== 'serving' && t.status !== 'completed' && t.status !== 'cancelled') {
        const p = pos++;
        return {
          ...t,
          positionInQueue: p,
          status: p === 1 ? 'almost-turn' : 'waiting',
          estimatedWaitMinutes: p * doc.avgConsultationMinutes
        };
      }
      return t;
    });

    const waitingRemaining = this.tokens.filter(t => t.doctorId === doctorId && (t.status === 'waiting' || t.status === 'almost-turn')).length;

    this.doctors = this.doctors.map(d => {
      if (d.id === doctorId) {
        return { ...d, servingTokenNumber: servingNo, currentQueueCount: waitingRemaining };
      }
      return d;
    });

    this.save();
    renderApp();
  }

  toggleEmergency(tokenId) {
    const target = this.tokens.find(t => t.id === tokenId);
    if (!target) return;
    const newState = !target.isEmergency;

    this.tokens = this.tokens.map(t => {
      if (t.id === tokenId) {
        return { ...t, isEmergency: newState, positionInQueue: newState ? 1 : t.positionInQueue };
      }
      return t;
    });

    if (newState) {
      this.notifications.unshift({
        id: 'notif-' + Date.now(),
        title: `EMERGENCY Priority: ${target.tokenNumber}`,
        msg: `Token ${target.tokenNumber} has been prioritized for urgent clinical attention.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      this.playChime('alert');
    }

    this.save();
    renderApp();
  }

  setDoctorStatus(doctorId, status) {
    this.doctors = this.doctors.map(d => {
      if (d.id === doctorId) {
        return { ...d, status };
      }
      return d;
    });
    this.save();
    renderApp();
  }

  resetData() {
    this.tokens = [...INITIAL_TOKENS];
    this.doctors = [...INITIAL_DOCTORS];
    this.notifications = [];
    localStorage.removeItem('mq_tokens');
    localStorage.removeItem('mq_doctors');
    localStorage.removeItem('mq_notifs');
    this.playChime('success');
    renderApp();
  }
}

const store = new Store();

// Helper: Navigation Router
function navigate(path) {
  store.currentPath = path;
  window.history.pushState({}, '', path);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  renderApp();
}

window.addEventListener('popstate', () => {
  store.currentPath = window.location.pathname;
  renderApp();
});

// 3. UI Template Components
function renderNavbar() {
  const t = store.t();
  const waitingCount = store.tokens.filter(t => t.status === 'waiting' || t.status === 'almost-turn').length;

  return `
    <!-- Top Emergency Strip -->
    <div class="bg-gradient-to-r from-teal-800 via-teal-900 to-slate-900 text-white text-xs px-4 py-1.5 font-medium">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span class="text-[11px] sm:text-xs">
            ${store.lang === 'ta' ? 'மெடிகியூ நேரலை புறநோயாளி வரிசை சேவை இயங்குகிறது' : store.lang === 'hi' ? 'मेडीक्यू लाइव ओपीडी कतार सेवा सक्रिय है' : 'MediQue Live OPD Queue Tracking Active • Real-time Updates'}
          </span>
        </div>

        <div class="flex items-center gap-3">
          <a href="#emergency-section" class="text-coral hover:text-white transition-colors text-[11px] sm:text-xs flex items-center gap-1 font-bold">
            <i data-lucide="shield-alert" class="w-3.5 h-3.5"></i>
            <span>${store.lang === 'ta' ? 'அவசர உதவி: 108' : store.lang === 'hi' ? 'आपातकालीन: 108' : 'Casualty: 108'}</span>
          </a>

          <button onclick="toggleStaffMode()" class="px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1 transition-all ${store.isStaff ? 'bg-amber-400 text-slate-900' : 'bg-teal-700 hover:bg-teal-600 text-white'}">
            <i data-lucide="user-cog" class="w-3 h-3"></i>
            <span>${store.isStaff ? t.ctaPatientView : t.ctaStaffDemo}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Main Navigation Bar -->
    <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-teal-100 shadow-soft-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3.5 flex items-center justify-between">
        
        <!-- Logo -->
        <a href="/" onclick="event.preventDefault(); navigate('/');" class="flex items-center gap-2.5 group">
          <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary to-teal-700 flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform">
            <i data-lucide="activity" class="w-5 h-5"></i>
          </div>
          <div>
            <div class="flex items-center gap-1.5">
              <span class="text-2xl font-black text-content tracking-tight">Medi<span class="text-primary font-black">Que</span></span>
              <span class="text-[10px] font-extrabold uppercase px-1.5 py-0.5 bg-mint text-teal-800 rounded-md">Live</span>
            </div>
            <p class="text-[11px] text-content-muted hidden sm:block font-medium">${t.tagline}</p>
          </div>
        </a>

        <!-- Desktop Navigation Links -->
        <nav class="hidden md:flex items-center gap-1 bg-surface py-1 px-1.5 rounded-2xl border border-teal-50">
          <button onclick="navigate('/')" class="px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${store.currentPath === '/' ? 'bg-white text-primary shadow-soft-sm' : 'text-content-muted hover:text-content'}">
            ${t.navHome}
          </button>
          <button onclick="navigate('/book')" class="px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${store.currentPath === '/book' ? 'bg-white text-primary shadow-soft-sm' : 'text-content-muted hover:text-content'}">
            ${t.navBook}
          </button>
          <button onclick="navigate('/track')" class="px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${store.currentPath === '/track' ? 'bg-white text-primary shadow-soft-sm' : 'text-content-muted hover:text-content'}">
            ${t.navTrack}
          </button>
          <button onclick="navigate('/doctors')" class="px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${store.currentPath === '/doctors' ? 'bg-white text-primary shadow-soft-sm' : 'text-content-muted hover:text-content'}">
            ${t.navDoctors}
          </button>
          <button onclick="navigate('/staff')" class="px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${store.currentPath === '/staff' ? 'bg-white text-amber-600 shadow-soft-sm' : 'text-teal-700 hover:text-teal-900'}">
            <span>${t.navStaff}</span>
            <span class="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
          </button>
        </nav>

        <!-- Right Controls (Language Pills + Quick Book) -->
        <div class="flex items-center gap-2.5">
          <!-- Language Selector -->
          <div class="flex items-center bg-teal-50/90 p-0.5 rounded-xl border border-teal-100">
            <button onclick="setLang('ta')" class="px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${store.lang === 'ta' ? 'bg-primary text-white shadow-soft-sm' : 'text-content-muted hover:text-content'}">
              தமிழ்
            </button>
            <button onclick="setLang('en')" class="px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${store.lang === 'en' ? 'bg-primary text-white shadow-soft-sm' : 'text-content-muted hover:text-content'}">
              EN
            </button>
            <button onclick="setLang('hi')" class="px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${store.lang === 'hi' ? 'bg-primary text-white shadow-soft-sm' : 'text-content-muted hover:text-content'}">
              हिन्दी
            </button>
          </div>

          <!-- Quick Book CTA Button -->
          <button onclick="navigate('/book')" class="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-teal-700 text-white font-bold text-xs shadow-soft transition-all">
            <i data-lucide="ticket" class="w-4 h-4"></i>
            <span>${t.ctaBook}</span>
          </button>
        </div>

      </div>
    </header>
  `;
}

function renderLiveSummary() {
  const t = store.t();
  const waitingCount = store.tokens.filter(t => t.status === 'waiting' || t.status === 'almost-turn').length;
  const servingCount = store.tokens.filter(t => t.status === 'serving').length;
  const availableDocs = store.doctors.filter(d => d.status === 'available').length;
  const avgWait = waitingCount > 0 ? Math.round(waitingCount * 9) : 10;
  const totalToday = store.tokens.length + 65;

  return `
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="p-5 rounded-2xl bg-white border border-teal-100 shadow-soft">
        <div class="flex items-center justify-between">
          <div class="w-10 h-10 rounded-xl bg-teal-50 text-primary flex items-center justify-center font-bold">
            <i data-lucide="users" class="w-5 h-5"></i>
          </div>
          <span class="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-teal-100 text-teal-800">Live OPD</span>
        </div>
        <p class="text-xs font-semibold text-content-muted mt-3">${t.waitingPatients}</p>
        <div class="text-3xl font-black text-content tracking-tight mt-0.5">${waitingCount}</div>
        <p class="text-[11px] text-content-subtle mt-0.5">${servingCount} currently inside cabins</p>
      </div>

      <div class="p-5 rounded-2xl bg-white border border-emerald-100 shadow-soft">
        <div class="flex items-center justify-between">
          <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <i data-lucide="clock" class="w-5 h-5"></i>
          </div>
          <span class="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">Dynamic</span>
        </div>
        <p class="text-xs font-semibold text-content-muted mt-3">${t.avgWait}</p>
        <div class="text-3xl font-black text-content tracking-tight mt-0.5">~${avgWait} <span class="text-sm font-bold text-content-muted">${t.mins}</span></div>
        <p class="text-[11px] text-content-subtle mt-0.5">Calculated by doctor speed</p>
      </div>

      <div class="p-5 rounded-2xl bg-white border border-sky-100 shadow-soft">
        <div class="flex items-center justify-between">
          <div class="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
            <i data-lucide="stethoscope" class="w-5 h-5"></i>
          </div>
          <span class="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-sky-100 text-sky-800">On Duty</span>
        </div>
        <p class="text-xs font-semibold text-content-muted mt-3">${t.doctorsAvailable}</p>
        <div class="text-3xl font-black text-content tracking-tight mt-0.5">${availableDocs} / ${store.doctors.length}</div>
        <p class="text-[11px] text-content-subtle mt-0.5">Across 7 OPD departments</p>
      </div>

      <div class="p-5 rounded-2xl bg-white border border-amber-100 shadow-soft">
        <div class="flex items-center justify-between">
          <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <i data-lucide="ticket" class="w-5 h-5"></i>
          </div>
          <span class="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">Today</span>
        </div>
        <p class="text-xs font-semibold text-content-muted mt-3">${t.issuedToday}</p>
        <div class="text-3xl font-black text-content tracking-tight mt-0.5">${totalToday}</div>
        <p class="text-[11px] text-content-subtle mt-0.5">Seamless digital tokens</p>
      </div>
    </div>
  `;
}

function renderEmergencyBanner() {
  const t = store.t();
  return `
    <section id="emergency-section" class="my-10 relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 via-red-700 to-rose-800 text-white p-6 sm:p-8 lg:p-10 shadow-soft-lg border-2 border-red-400/40">
      <div class="flex flex-col lg:flex-row items-center justify-between gap-6">
        <div class="space-y-2.5">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider">
            <i data-lucide="alert-octagon" class="w-4 h-4 text-amber-300"></i>
            <span>URGENT CARE NOTICE</span>
          </div>
          <h3 class="text-xl sm:text-2xl font-black tracking-tight">
            ${store.lang === 'ta' ? 'அவசர மருத்துவ அறிவிப்பு' : store.lang === 'hi' ? 'आपातकालीन चिकित्सा सूचना' : 'Medical Emergency Alert'}
          </h3>
          <p class="text-xs sm:text-sm text-red-100 max-w-2xl leading-relaxed">
            ${t.emergencyNotice}
          </p>
          <div class="pt-1 text-xs text-red-200 font-semibold flex items-center gap-2">
            <i data-lucide="shield-check" class="w-4 h-4 text-amber-300"></i>
            <span>Emergency priority is strictly assigned by authorized hospital casualty staff.</span>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
          <a href="tel:108" class="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white text-red-700 font-black text-sm shadow-xl hover:bg-red-50 transition-all text-center">
            <i data-lucide="phone-call" class="w-4 h-4 text-red-600"></i>
            <span>108 Ambulance</span>
          </a>
          <a href="tel:+914428369999" class="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-red-950/60 text-white font-semibold text-xs border border-white/20 transition-all text-center">
            <span>Casualty: +91 44 2836 9999</span>
          </a>
        </div>
      </div>
    </section>
  `;
}

function renderFooter() {
  const t = store.t();
  return `
    <footer class="bg-slate-900 text-slate-300 border-t border-slate-800 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div class="flex items-center gap-2 mb-3">
              <div class="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center font-bold">
                <i data-lucide="activity" class="w-4 h-4"></i>
              </div>
              <span class="text-lg font-black text-white">Medi<span class="text-primary-300">Que</span></span>
            </div>
            <p class="text-xs text-slate-400 leading-relaxed mb-3">
              Modern outpatient queue management eliminating hospital hallway crowding and waiting anxiety.
            </p>
            <span class="text-xs text-mint-400 font-semibold">OPD Timings: 8:00 AM - 8:00 PM</span>
          </div>

          <div>
            <h4 class="text-white text-xs font-bold uppercase tracking-wider mb-3">Quick Links</h4>
            <ul class="space-y-2 text-xs">
              <li><button onclick="navigate('/')" class="hover:text-white">${t.navHome}</button></li>
              <li><button onclick="navigate('/book')" class="hover:text-white">${t.navBook}</button></li>
              <li><button onclick="navigate('/track')" class="hover:text-white">${t.navTrack}</button></li>
              <li><button onclick="navigate('/doctors')" class="hover:text-white">${t.navDoctors}</button></li>
              <li><button onclick="navigate('/staff')" class="hover:text-white">${t.navStaff}</button></li>
            </ul>
          </div>

          <div>
            <h4 class="text-white text-xs font-bold uppercase tracking-wider mb-3">Key Departments</h4>
            <ul class="space-y-1.5 text-xs text-slate-400">
              <li>General Medicine (OPD-101)</li>
              <li>Cardiology & Heart Care (OPD-204)</li>
              <li>Pediatrics & Neonatal (OPD-105)</li>
              <li>Orthopedics & Joint Care (OPD-302)</li>
              <li>Dermatology & Skin Care (OPD-208)</li>
            </ul>
          </div>

          <div>
            <h4 class="text-white text-xs font-bold uppercase tracking-wider mb-3">24x7 Emergency</h4>
            <p class="text-xs text-white font-bold mb-1">Casualty Helpline: +91 44 2836 9999</p>
            <p class="text-xs text-slate-400 mb-2">Ambulance Emergency: 108 / 102</p>
            <p class="text-[11px] text-slate-500">MediQue Medical Center, Anna Salai, Chennai, Tamil Nadu</p>
          </div>
        </div>

        <div class="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>${t.footerRights}</p>
          <div class="flex items-center gap-1.5 text-slate-400">
            <span>Built with care for patients & hospital staff</span>
          </div>
        </div>
      </div>
    </footer>
  `;
}

// 4. View Renderers (Home, Book, Track, Doctors, Staff)
function renderHomePage() {
  const t = store.t();
  return `
    <div class="space-y-14 lg:space-y-20 pb-16">
      
      <!-- Hero Section -->
      <section class="bg-gradient-to-b from-mint-50/70 via-surface to-surface pt-8 pb-12 sm:pt-14 sm:pb-16 border-b border-teal-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div class="lg:col-span-7 space-y-6">
              <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-teal-200/80 shadow-soft-sm">
                <span class="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
                <span class="text-xs font-bold text-teal-800 tracking-wide uppercase">
                  ${store.lang === 'ta' ? 'நேரலை புறநோயாளி வரிசை சேவை' : 'Live OPD Outpatient Queuing'}
                </span>
              </div>

              <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black text-content tracking-tight leading-[1.12]">
                ${t.heroTitle} <span class="text-primary underline decoration-mint-400 decoration-wavy decoration-2">${t.heroHighlight}</span>
              </h1>

              <p class="text-base sm:text-lg text-content-muted leading-relaxed max-w-2xl font-normal">
                ${t.heroDesc}
              </p>

              <!-- Main CTAs -->
              <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <button onclick="navigate('/book')" class="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-primary hover:bg-teal-700 text-white font-bold text-base shadow-soft hover:shadow-glow-teal transition-all">
                  <i data-lucide="ticket" class="w-5 h-5"></i>
                  <span>${t.ctaBook}</span>
                </button>

                <button onclick="navigate('/track')" class="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white hover:bg-mint-50 text-teal-900 font-bold text-base border-2 border-teal-200 shadow-soft-sm transition-all">
                  <i data-lucide="search" class="w-5 h-5 text-primary"></i>
                  <span>${t.ctaTrack}</span>
                </button>
              </div>

              <!-- Quick Token Tracker Input -->
              <div class="pt-2 max-w-md">
                <form onsubmit="handleQuickTrack(event)" class="flex items-center bg-white p-1.5 rounded-2xl border border-teal-200 shadow-soft-sm">
                  <i data-lucide="search" class="w-4 h-4 text-content-subtle ml-3 shrink-0"></i>
                  <input type="text" id="quickTokenInput" placeholder="Enter Token ID (e.g. MQ-MED-043)" class="w-full text-xs sm:text-sm bg-transparent outline-none px-2 font-bold uppercase" />
                  <button type="submit" class="px-4 py-2 bg-teal-800 hover:bg-teal-900 text-white rounded-xl text-xs font-bold shrink-0">
                    Track
                  </button>
                </form>
              </div>
            </div>

            <!-- Welcoming Visual Card -->
            <div class="lg:col-span-5">
              <div class="bg-white rounded-3xl p-3 border border-teal-100 shadow-soft-lg group">
                <div class="relative h-72 sm:h-84 w-full rounded-2xl overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800" alt="Doctor consulting patient comfortably" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div class="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent"></div>
                  <div class="absolute bottom-4 left-4 right-4 text-white flex items-center justify-between">
                    <div>
                      <p class="text-xs font-medium text-mint-300">Peaceful Waiting Experience</p>
                      <p class="text-sm font-bold text-white">Dr. Priya Sundaram & Patient</p>
                    </div>
                    <span class="px-2.5 py-1 bg-emerald-500 rounded-full text-[10px] font-black uppercase">Cabin Active</span>
                  </div>
                </div>

                <div class="p-3.5 bg-surface rounded-2xl mt-3 border border-teal-50 flex items-center justify-between">
                  <div class="flex items-center gap-2.5">
                    <div class="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center font-bold">
                      <i data-lucide="stethoscope" class="w-4 h-4"></i>
                    </div>
                    <div>
                      <p class="text-xs font-bold text-content">General Medicine OPD</p>
                      <p class="text-[11px] text-content-muted">Now serving Token MQ-MED-041</p>
                    </div>
                  </div>
                  <span class="text-xs font-bold text-primary px-2 py-1 bg-mint rounded-lg">~8 min wait</span>
                </div>
              </div>
            </div>

          </div>

          <div class="mt-12 sm:mt-16">
            ${renderLiveSummary()}
          </div>
        </div>
      </section>

      <!-- 3 Simple Steps Section -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-xl mx-auto mb-10">
          <span class="text-xs font-black uppercase tracking-wider text-primary bg-mint px-3 py-1 rounded-full">Easy 3 Steps</span>
          <h2 class="text-3xl font-black text-content mt-2">How MediQue Works</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white rounded-3xl p-7 border border-teal-100 shadow-soft">
            <div class="w-12 h-12 rounded-2xl bg-teal-50 text-primary flex items-center justify-center font-black text-lg mb-4">
              <i data-lucide="ticket" class="w-6 h-6"></i>
            </div>
            <h3 class="text-lg font-bold text-content mb-2">${t.step1}</h3>
            <p class="text-xs text-content-muted leading-relaxed">${t.step1Desc}</p>
          </div>

          <div class="bg-white rounded-3xl p-7 border border-teal-100 shadow-soft">
            <div class="w-12 h-12 rounded-2xl bg-mint text-teal-800 flex items-center justify-center font-black text-lg mb-4">
              <i data-lucide="clock" class="w-6 h-6"></i>
            </div>
            <h3 class="text-lg font-bold text-content mb-2">${t.step2}</h3>
            <p class="text-xs text-content-muted leading-relaxed">${t.step2Desc}</p>
          </div>

          <div class="bg-white rounded-3xl p-7 border border-teal-100 shadow-soft">
            <div class="w-12 h-12 rounded-2xl bg-rose-50 text-coral-dark flex items-center justify-center font-black text-lg mb-4">
              <i data-lucide="bell-ring" class="w-6 h-6"></i>
            </div>
            <h3 class="text-lg font-bold text-content mb-2">${t.step3}</h3>
            <p class="text-xs text-content-muted leading-relaxed">${t.step3Desc}</p>
          </div>
        </div>
      </section>

      <!-- Key Departments Grid -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-2xl font-black text-content">OPD Clinical Departments</h2>
            <p class="text-xs text-content-muted">Choose your department to book with the fastest available doctor</p>
          </div>
          <button onclick="navigate('/doctors')" class="text-xs font-bold text-primary hover:underline">View All Doctors &rarr;</button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          ${store.departments.slice(0, 4).map(d => `
            <div class="bg-white rounded-2xl p-5 border border-teal-100 shadow-soft flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-2">
                  <div class="w-9 h-9 rounded-xl bg-mint text-teal-800 flex items-center justify-center">
                    <i data-lucide="${d.icon}" class="w-4 h-4"></i>
                  </div>
                  <span class="text-[11px] font-bold text-content-subtle bg-slate-100 px-2 py-0.5 rounded-md">${d.roomNumber}</span>
                </div>
                <h4 class="text-sm font-bold text-content">${store.lang === 'ta' ? d.nameTa : d.name}</h4>
                <p class="text-xs text-content-muted mt-1 line-clamp-2">${store.lang === 'ta' ? d.descriptionTa : d.description}</p>
              </div>
              <button onclick="startBookingDept('${d.id}')" class="mt-4 w-full py-2 bg-teal-50 hover:bg-primary hover:text-white text-teal-900 text-xs font-bold rounded-xl transition-colors">
                Book Consultation
              </button>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Emergency Section -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        ${renderEmergencyBanner()}
      </div>

    </div>
  `;
}

function renderBookPage() {
  const t = store.t();
  const form = store.bookingForm;
  const currentDept = store.departments.find(d => d.id === form.departmentId) || store.departments[0];
  const recDoc = store.getRecommendedDoctor(form.departmentId);

  // If newly booked, show confirmation view
  if (store.newlyBookedToken) {
    const tok = store.newlyBookedToken;
    const doc = store.doctors.find(d => d.id === tok.doctorId);
    const dept = store.departments.find(d => d.id === tok.departmentId);

    return `
      <div class="max-w-2xl mx-auto px-4 py-12">
        <div class="bg-white rounded-3xl p-6 sm:p-10 border-2 border-teal-200 shadow-soft-lg text-center space-y-6">
          <div class="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-soft">
            <i data-lucide="check-circle-2" class="w-9 h-9"></i>
          </div>

          <div>
            <span class="text-xs font-black uppercase text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">Booking Confirmed</span>
            <h2 class="text-2xl sm:text-3xl font-black text-content mt-2">Token Booked Successfully!</h2>
            <p class="text-xs text-content-muted mt-1">Please show this digital token at the outpatient desk upon arrival.</p>
          </div>

          <div class="bg-gradient-to-br from-mint-50 to-teal-50 border-2 border-primary/30 rounded-3xl p-6 max-w-sm mx-auto shadow-inner">
            <span class="text-xs font-extrabold uppercase text-teal-800">Your Token Number</span>
            <div class="text-4xl sm:text-5xl font-black text-primary my-2">${tok.tokenNumber}</div>
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-xs font-bold text-teal-900 border border-teal-200">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Patients Ahead: ${tok.positionInQueue}</span>
            </div>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-surface p-4 rounded-2xl border border-teal-100 text-xs text-left max-w-md mx-auto">
            <div>
              <span class="text-content-subtle block">Patient</span>
              <strong class="text-content font-bold">${tok.patientName}</strong>
            </div>
            <div>
              <span class="text-content-subtle block">Department</span>
              <strong class="text-content font-bold">${dept ? dept.name.split(' ')[0] : ''}</strong>
            </div>
            <div>
              <span class="text-content-subtle block">Doctor</span>
              <strong class="text-content font-bold">${doc ? doc.name.split(' ')[1] || doc.name : ''}</strong>
            </div>
            <div>
              <span class="text-content-subtle block">Cabin</span>
              <strong class="text-primary font-bold">${doc ? doc.roomNumber : ''}</strong>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button onclick="trackSpecificToken('${tok.tokenNumber}')" class="w-full sm:w-auto px-6 py-3.5 bg-primary hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-soft flex items-center justify-center gap-2">
              <i data-lucide="search" class="w-4 h-4"></i>
              <span>Track Live Status Now</span>
            </button>
            <button onclick="resetBookingFlow()" class="w-full sm:w-auto px-5 py-3.5 bg-slate-100 hover:bg-slate-200 text-content font-bold text-xs rounded-xl">
              Book Another Token
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // Active multi-step booking form
  return `
    <div class="max-w-3xl mx-auto px-4 py-8 sm:py-12 space-y-6">
      <div class="text-center max-w-xl mx-auto">
        <span class="text-xs font-black uppercase tracking-wider text-primary bg-mint px-3 py-1 rounded-full">Instant Token</span>
        <h1 class="text-3xl font-black text-content mt-2">Book Consultation Token</h1>
        <p class="text-xs text-content-muted mt-1">Real-time OPD token generation with smart doctor load recommendation.</p>
      </div>

      <!-- Stepper Header -->
      <div class="grid grid-cols-3 gap-2">
        <div class="py-2 text-center rounded-xl border text-xs font-bold ${store.bookingStep === 1 ? 'bg-primary text-white border-primary' : 'bg-mint-200 text-teal-900 border-teal-200'}">
          1. Patient Details
        </div>
        <div class="py-2 text-center rounded-xl border text-xs font-bold ${store.bookingStep === 2 ? 'bg-primary text-white border-primary' : store.bookingStep > 2 ? 'bg-mint-200 text-teal-900 border-teal-200' : 'bg-white text-content-subtle border-slate-200'}">
          2. Department & Doctor
        </div>
        <div class="py-2 text-center rounded-xl border text-xs font-bold ${store.bookingStep === 3 ? 'bg-primary text-white border-primary' : 'bg-white text-content-subtle border-slate-200'}">
          3. Confirm Token
        </div>
      </div>

      <!-- Form Box -->
      <div class="bg-white rounded-3xl p-6 sm:p-8 border border-teal-100 shadow-soft">
        
        <!-- STEP 1 -->
        ${store.bookingStep === 1 ? `
          <div class="space-y-4">
            <h3 class="text-base font-bold text-content border-b border-slate-100 pb-2">Enter Patient Information</h3>
            
            <div>
              <label class="block text-xs font-bold text-content mb-1">Patient Full Name *</label>
              <input type="text" id="patientNameInput" value="${form.name}" placeholder="e.g. Subramaniam Kumar" class="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-primary" />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-bold text-content mb-1">Age *</label>
                <input type="number" id="patientAgeInput" min="1" max="120" value="${form.age}" placeholder="e.g. 42" class="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-primary" />
              </div>
              <div>
                <label class="block text-xs font-bold text-content mb-1">Mobile Phone *</label>
                <input type="tel" id="patientPhoneInput" value="${form.phone}" placeholder="e.g. 9840123456" class="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm outline-none focus:border-primary" />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-content mb-1">Visit Reason (Optional)</label>
              <input type="text" id="patientNotesInput" value="${form.notes}" placeholder="e.g. Mild fever, BP check" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-primary" />
            </div>

            <div class="pt-4 flex justify-end">
              <button onclick="handleStep1Next()" class="px-6 py-3 bg-primary hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-soft">
                Continue to Department &rarr;
              </button>
            </div>
          </div>
        ` : ''}

        <!-- STEP 2 -->
        ${store.bookingStep === 2 ? `
          <div class="space-y-5">
            <h3 class="text-base font-bold text-content border-b border-slate-100 pb-2">Select Department & Doctor</h3>
            
            <div>
              <label class="block text-xs font-bold text-content mb-2">Medical Department</label>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                ${store.departments.map(d => `
                  <button type="button" onclick="setBookingDept('${d.id}')" class="p-3 rounded-xl border text-left text-xs transition-all ${form.departmentId === d.id ? 'border-primary bg-mint-50 ring-2 ring-primary/40 font-bold' : 'border-slate-200 hover:border-teal-300'}">
                    <span class="block text-content truncate">${store.lang === 'ta' ? d.nameTa : d.name}</span>
                    <span class="text-[10px] text-content-subtle">${d.roomNumber}</span>
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- Smart Doctor Recommendation Banner -->
            ${recDoc ? `
              <div class="rounded-2xl bg-gradient-to-r from-mint-50 to-teal-50 border border-teal-200 p-3.5 flex items-start gap-3">
                <div class="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center shrink-0">
                  <i data-lucide="sparkles" class="w-4 h-4"></i>
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-black uppercase text-teal-900 bg-mint-300 px-2 py-0.5 rounded-md">${t.recommendedBadge}</span>
                    <span class="text-[11px] font-semibold text-teal-800">${recDoc.currentQueueCount} waiting (~${recDoc.currentQueueCount * recDoc.avgConsultationMinutes} min wait)</span>
                  </div>
                  <p class="text-xs text-content font-medium mt-1">${recDoc.name} is available now with the shortest queue.</p>
                </div>
              </div>
            ` : ''}

            <!-- Doctor Selector -->
            <div>
              <label class="block text-xs font-bold text-content mb-2">Available Specialist in Department</label>
              <div class="space-y-2.5">
                ${store.doctors.filter(d => d.departmentId === form.departmentId).map(doc => {
                  const isSelected = form.doctorId === doc.id || (!form.doctorId && recDoc && recDoc.id === doc.id);
                  return `
                    <button type="button" onclick="setBookingDoc('${doc.id}')" class="w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${isSelected ? 'border-primary bg-mint-50 ring-2 ring-primary/40' : 'border-slate-200 hover:border-teal-300'}">
                      <div class="flex items-center gap-3">
                        <img src="${doc.avatar}" alt="${doc.name}" class="w-12 h-12 rounded-xl object-cover border border-teal-200" />
                        <div>
                          <div class="flex items-center gap-2">
                            <h4 class="text-xs font-bold text-content">${doc.name}</h4>
                            ${recDoc && recDoc.id === doc.id ? '<span class="text-[9px] font-extrabold uppercase bg-mint text-teal-800 px-1.5 py-0.5 rounded-md">⭐ Recommended</span>' : ''}
                          </div>
                          <p class="text-[11px] text-primary">${doc.specialty}</p>
                          <span class="text-[10px] text-content-subtle">${doc.roomNumber} • ${doc.experienceYears} yrs exp • ★ ${doc.rating}</span>
                        </div>
                      </div>

                      <div class="text-right text-xs">
                        <span class="font-bold text-content block">Queue: <strong class="text-primary">${doc.currentQueueCount}</strong></span>
                        <span class="text-[10px] px-2 py-0.5 rounded-md font-extrabold uppercase ${doc.status === 'available' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
                          ${doc.status}
                        </span>
                      </div>
                    </button>
                  `;
                }).join('')}
              </div>
            </div>

            <div class="pt-4 flex items-center justify-between border-t border-slate-100">
              <button onclick="store.bookingStep = 1; renderApp();" class="text-xs font-bold text-content-muted hover:text-content">
                &larr; Back to Details
              </button>
              <button onclick="handleStep2Next()" class="px-6 py-3 bg-primary hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-soft">
                Review & Confirm &rarr;
              </button>
            </div>
          </div>
        ` : ''}

        <!-- STEP 3 -->
        ${store.bookingStep === 3 ? `
          <div class="space-y-4">
            <h3 class="text-base font-bold text-content border-b border-slate-100 pb-2">Confirm Booking</h3>
            
            <div class="bg-surface rounded-2xl p-4 border border-teal-100 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span class="text-content-subtle block">Patient</span>
                <p class="font-bold text-content">${form.name} (${form.age} yrs)</p>
                <p class="text-[11px] text-content-muted">${form.phone}</p>
              </div>
              <div>
                <span class="text-content-subtle block">Department</span>
                <p class="font-bold text-content">${currentDept.name}</p>
                <p class="text-[11px] text-content-muted">${currentDept.roomNumber}</p>
              </div>
              <div>
                <span class="text-content-subtle block">Doctor</span>
                <p class="font-bold text-content">${(store.doctors.find(d => d.id === form.doctorId) || recDoc).name}</p>
              </div>
              <div>
                <span class="text-content-subtle block">Est. Waiting Time</span>
                <p class="font-bold text-primary">~${((store.doctors.find(d => d.id === form.doctorId) || recDoc).currentQueueCount + 1) * 10} mins</p>
              </div>
            </div>

            <p class="text-[11px] text-content-subtle italic">By confirming, you agree to arrive at least 10 minutes prior to your consultation estimate.</p>

            <div class="pt-4 flex items-center justify-between border-t border-slate-100">
              <button onclick="store.bookingStep = 2; renderApp();" class="text-xs font-bold text-content-muted hover:text-content">
                &larr; Back to Doctor Selection
              </button>
              <button onclick="confirmAndGenerateToken()" class="px-7 py-3.5 bg-primary hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-soft">
                Confirm & Generate Token
              </button>
            </div>
          </div>
        ` : ''}

      </div>
    </div>
  `;
}

function renderTrackPage() {
  const t = store.t();
  const currentToken = store.tokens.find(tok => tok.tokenNumber === store.activeSearchToken);
  const doc = currentToken ? store.doctors.find(d => d.id === currentToken.doctorId) : null;
  const dept = currentToken ? store.departments.find(d => d.id === currentToken.departmentId) : null;
  const servingToken = doc ? store.tokens.find(t => t.doctorId === doc.id && t.status === 'serving') : null;

  return `
    <div class="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-6">
      <div class="text-center max-w-xl mx-auto">
        <span class="text-xs font-black uppercase tracking-wider text-primary bg-mint px-3 py-1 rounded-full">Live OPD Status</span>
        <h1 class="text-3xl font-black text-content mt-2">Live Queue Tracking</h1>
        <p class="text-xs text-content-muted mt-1">Real-time patient progression, estimated waiting times, and cabin call alerts.</p>
      </div>

      <!-- Search Box -->
      <div class="max-w-md mx-auto">
        <form onsubmit="handleTrackSearch(event)" class="flex items-center bg-white p-1.5 rounded-2xl border border-teal-200 shadow-soft">
          <i data-lucide="search" class="w-4 h-4 text-content-subtle ml-3 shrink-0"></i>
          <input type="text" id="trackSearchInput" value="${store.activeSearchToken}" placeholder="e.g. MQ-MED-043" class="w-full text-xs sm:text-sm bg-transparent outline-none px-2 font-bold uppercase" />
          <button type="submit" class="px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-xl shadow-soft">
            Check Status
          </button>
        </form>

        <div class="flex items-center justify-center gap-2 mt-2 text-[11px] text-content-muted">
          <span>Try demo tokens:</span>
          ${['MQ-MED-043', 'MQ-CARD-019', 'MQ-PED-029'].map(t => `
            <button onclick="trackSpecificToken('${t}')" class="font-bold text-primary hover:underline bg-mint-100 px-2 py-0.5 rounded-md">${t}</button>
          `).join('')}
        </div>
      </div>

      <!-- Live Token Status Display -->
      ${currentToken ? `
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-teal-100 shadow-soft-lg space-y-6">
          <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span class="text-xs font-bold text-content-muted">Auto updates every 10s</span>
            </div>
            <span class="px-3 py-1 rounded-full text-xs font-black uppercase ${currentToken.status === 'serving' ? 'bg-emerald-100 text-emerald-800 ring-2 ring-emerald-300' : currentToken.status === 'almost-turn' ? 'bg-amber-100 text-amber-800' : 'bg-teal-100 text-teal-800'}">
              ${currentToken.status === 'serving' ? 'Now Serving' : currentToken.status === 'almost-turn' ? 'Almost Your Turn' : 'Waiting in Queue'}
            </span>
          </div>

          <!-- Emergency Banner if Flagged -->
          ${currentToken.isEmergency ? `
            <div class="p-3 bg-red-50 border border-red-200 text-emergency text-xs font-bold rounded-2xl flex items-center gap-2 animate-pulse">
              <i data-lucide="alert-triangle" class="w-4 h-4"></i>
              <span>This token has been flagged with Emergency Priority by hospital clinical triage.</span>
            </div>
          ` : ''}

          <!-- 4 Stat Metrics -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div class="p-4 rounded-2xl bg-gradient-to-br from-mint-50 to-teal-50 border border-teal-200">
              <span class="text-[10px] font-bold text-teal-800 block uppercase">Your Token</span>
              <div class="text-2xl font-black text-content mt-1">${currentToken.tokenNumber}</div>
              <span class="text-[11px] text-content-subtle">${currentToken.patientName}</span>
            </div>

            <div class="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <span class="text-[10px] font-bold text-emerald-800 block uppercase">Now Serving In Cabin</span>
              <div class="text-2xl font-black text-emerald-700 mt-1">${servingToken ? servingToken.tokenNumber : (doc ? doc.servingTokenNumber || '---' : '---')}</div>
              <span class="text-[11px] text-emerald-600">Currently in consultation</span>
            </div>

            <div class="p-4 rounded-2xl bg-sky-50 border border-sky-200">
              <span class="text-[10px] font-bold text-sky-800 block uppercase">Patients Ahead</span>
              <div class="text-2xl font-black text-sky-700 mt-1">${currentToken.status === 'serving' ? 0 : currentToken.positionInQueue}</div>
              <span class="text-[11px] text-sky-600">in waiting line</span>
            </div>

            <div class="p-4 rounded-2xl bg-amber-50 border border-amber-200">
              <span class="text-[10px] font-bold text-amber-800 block uppercase">Est. Wait Time</span>
              <div class="text-2xl font-black text-amber-700 mt-1">${currentToken.status === 'serving' ? '0 min' : `~${currentToken.estimatedWaitMinutes} min`}</div>
              <span class="text-[11px] text-amber-600">${currentToken.status === 'serving' ? 'Enter cabin now' : 'Dynamic calculation'}</span>
            </div>
          </div>

          <!-- Doctor Card -->
          ${doc ? `
            <div class="p-4 rounded-2xl bg-surface border border-teal-100 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <img src="${doc.avatar}" alt="${doc.name}" class="w-12 h-12 rounded-xl object-cover border border-teal-200" />
                <div>
                  <h4 class="text-xs font-bold text-content">${doc.name}</h4>
                  <p class="text-[11px] text-primary">${dept ? dept.name : ''} • ${doc.specialty}</p>
                </div>
              </div>
              <div class="text-right">
                <span class="text-[10px] text-content-subtle block">Cabin Room</span>
                <span class="text-sm font-black text-content flex items-center gap-1 justify-end">
                  <i data-lucide="map-pin" class="w-3.5 h-3.5 text-primary"></i>
                  ${doc.roomNumber}
                </span>
              </div>
            </div>
          ` : ''}

        </div>
      ` : `
        <div class="p-8 bg-white rounded-3xl border border-teal-100 text-center max-w-sm mx-auto space-y-3">
          <i data-lucide="alert-circle" class="w-10 h-10 text-emergency mx-auto"></i>
          <h4 class="text-sm font-bold text-content">Token Not Found</h4>
          <p class="text-xs text-content-muted">Check your token ID or book a new outpatient appointment.</p>
          <button onclick="navigate('/book')" class="px-5 py-2 bg-primary text-white text-xs font-bold rounded-xl shadow-soft">
            Book Token Now
          </button>
        </div>
      `}
    </div>
  `;
}

function renderDoctorsPage() {
  const t = store.t();
  return `
    <div class="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-6">
      <div class="text-center max-w-xl mx-auto">
        <span class="text-xs font-black uppercase tracking-wider text-primary bg-mint px-3 py-1 rounded-full">Specialists</span>
        <h1 class="text-3xl font-black text-content mt-2">Our Doctors & Live Availability</h1>
        <p class="text-xs text-content-muted mt-1">Browse faculty, review live queues, and consult with the shortest wait time.</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        ${store.doctors.map(doc => {
          const dept = store.departments.find(d => d.id === doc.departmentId);
          const estWait = doc.currentQueueCount * doc.avgConsultationMinutes;

          return `
            <div class="bg-white rounded-3xl p-5 border border-teal-100 shadow-soft flex flex-col justify-between">
              <div>
                <div class="relative h-44 w-full rounded-2xl overflow-hidden mb-3">
                  <img src="${doc.avatar}" alt="${doc.name}" class="w-full h-full object-cover" />
                  <div class="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-white/90 text-[10px] font-black uppercase text-teal-900">
                    ${doc.roomNumber}
                  </div>
                  <div class="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-slate-900/80 text-white text-xs font-bold">
                    ★ ${doc.rating}
                  </div>
                </div>

                <div class="flex items-center justify-between">
                  <span class="text-[10px] font-bold text-primary uppercase">${dept ? dept.name.split(' ')[0] : ''}</span>
                  <span class="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-md ${doc.status === 'available' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
                    ${doc.status}
                  </span>
                </div>

                <h4 class="text-sm font-bold text-content mt-1">${doc.name}</h4>
                <p class="text-xs text-content-muted line-clamp-1">${doc.specialty}</p>

                <div class="grid grid-cols-2 gap-2 mt-3 pt-2.5 border-t border-slate-100 text-xs">
                  <div class="bg-surface p-2 rounded-xl">
                    <span class="text-[10px] text-content-subtle block">Queue</span>
                    <strong class="font-bold text-content">${doc.currentQueueCount} waiting</strong>
                  </div>
                  <div class="bg-surface p-2 rounded-xl">
                    <span class="text-[10px] text-content-subtle block">Wait</span>
                    <strong class="font-bold text-primary">~${estWait} min</strong>
                  </div>
                </div>
              </div>

              <button onclick="startBookingDoctor('${doc.departmentId}', '${doc.id}')" class="mt-4 w-full py-2.5 bg-primary hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-soft">
                Book with Doctor
              </button>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function renderStaffPage() {
  const t = store.t();
  const activeTokens = store.tokens.filter(t => t.status === 'serving' || t.status === 'almost-turn' || t.status === 'waiting');

  return `
    <div class="max-w-7xl mx-auto px-4 py-8 sm:py-12 space-y-6">
      
      <!-- Staff Header -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-teal-100 shadow-soft">
        <div>
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-black uppercase">
            <i data-lucide="user-cog" class="w-3.5 h-3.5"></i>
            <span>Authorized Staff Portal</span>
          </div>
          <h1 class="text-2xl font-black text-content mt-1">OPD Queue & Emergency Triage Control</h1>
          <p class="text-xs text-content-muted">Manage patient calling, emergency priority escalation, and doctor availability.</p>
        </div>

        <div class="flex items-center gap-2">
          <button onclick="store.resetData()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-content font-bold text-xs rounded-xl flex items-center gap-1">
            <i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i>
            <span>Reset Demo Data</span>
          </button>
          <button onclick="navigate('/')" class="px-4 py-2 bg-primary text-white font-bold text-xs rounded-xl">
            Switch to Patient View
          </button>
        </div>
      </div>

      <!-- Quick Cabin Call Center -->
      <div class="bg-gradient-to-r from-teal-800 to-slate-900 text-white p-6 rounded-3xl shadow-soft-lg space-y-4">
        <h3 class="text-base font-bold flex items-center gap-2">
          <i data-lucide="volume-2" class="w-5 h-5 text-mint-400"></i>
          <span>Doctor Cabin Calling Controls</span>
        </h3>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          ${store.doctors.slice(0, 4).map(doc => `
            <div class="bg-white/10 p-3.5 rounded-2xl border border-white/10 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-white truncate">${doc.name.split(' ')[1] || doc.name}</span>
                <span class="text-[10px] text-mint font-bold">${doc.roomNumber}</span>
              </div>
              <p class="text-[11px] text-teal-200">Serving: <strong class="text-amber-300">${doc.servingTokenNumber || 'None'}</strong> • Queue: <strong>${doc.currentQueueCount}</strong></p>
              
              <div class="flex items-center gap-1.5 pt-1">
                <button onclick="store.callNextToken('${doc.id}')" class="flex-1 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-lg shadow-sm">
                  Call Next
                </button>
                <button onclick="store.setDoctorStatus('${doc.id}', '${doc.status === 'available' ? 'on-break' : 'available'}')" class="px-2 py-1.5 bg-white/20 text-white text-[10px] font-bold rounded-lg">
                  ${doc.status === 'available' ? 'Break' : 'Resume'}
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Live Queue Table with Emergency Priority Actions -->
      <div class="bg-white rounded-3xl p-6 border border-teal-100 shadow-soft space-y-4">
        <h3 class="text-base font-bold text-content">Active Patient Queue (${activeTokens.length})</h3>
        
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-surface text-content-subtle uppercase text-[10px] border-b border-slate-100">
              <tr>
                <th class="py-2.5 px-3">Token</th>
                <th class="py-2.5 px-3">Patient</th>
                <th class="py-2.5 px-3">Department</th>
                <th class="py-2.5 px-3">Doctor</th>
                <th class="py-2.5 px-3">Status</th>
                <th class="py-2.5 px-3">Wait</th>
                <th class="py-2.5 px-3 text-right">Emergency Priority</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${activeTokens.map(tok => {
                const doc = store.doctors.find(d => d.id === tok.doctorId);
                const dept = store.departments.find(d => d.id === tok.departmentId);

                return `
                  <tr class="hover:bg-teal-50/40 ${tok.isEmergency ? 'bg-red-50/70 font-bold' : ''}">
                    <td class="py-3 px-3 font-black text-content">
                      ${tok.tokenNumber}
                      ${tok.isEmergency ? '<span class="ml-1 px-1.5 py-0.5 rounded-md bg-emergency text-white text-[9px]">URGENT</span>' : ''}
                    </td>
                    <td class="py-3 px-3">
                      <div class="font-bold text-content">${tok.patientName}</div>
                      <div class="text-[10px] text-content-subtle">${tok.patientAge} yrs • ${tok.patientPhone}</div>
                    </td>
                    <td class="py-3 px-3">${dept ? dept.name : ''}</td>
                    <td class="py-3 px-3 font-medium">${doc ? doc.name : ''}</td>
                    <td class="py-3 px-3">
                      <span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${tok.status === 'serving' ? 'bg-emerald-100 text-emerald-800' : tok.status === 'almost-turn' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-content-muted'}">
                        ${tok.status}
                      </span>
                    </td>
                    <td class="py-3 px-3 text-primary font-bold">~${tok.estimatedWaitMinutes}m</td>
                    <td class="py-3 px-3 text-right">
                      <button onclick="store.toggleEmergency('${tok.id}')" class="px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${tok.isEmergency ? 'bg-emergency text-white' : 'bg-slate-100 text-red-600 hover:bg-red-100'}">
                        ${tok.isEmergency ? 'Remove Urgent Flag' : 'Flag Emergency Priority'}
                      </button>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `;
}

// 5. Main Application Renderer
function renderApp() {
  const app = document.getElementById('app');
  let viewHtml = '';

  if (store.currentPath === '/book') {
    viewHtml = renderBookPage();
  } else if (store.currentPath === '/track') {
    viewHtml = renderTrackPage();
  } else if (store.currentPath === '/doctors') {
    viewHtml = renderDoctorsPage();
  } else if (store.currentPath === '/staff') {
    viewHtml = renderStaffPage();
  } else {
    viewHtml = renderHomePage();
  }

  app.innerHTML = `
    ${renderNavbar()}
    <main class="flex-1">
      ${viewHtml}
    </main>
    ${renderFooter()}
  `;

  // Initialize Lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// 6. Action Handlers (Global scope for onclicks)
window.navigate = navigate;

window.setLang = function(l) {
  store.lang = l;
  store.save();
  renderApp();
};

window.toggleStaffMode = function() {
  store.isStaff = !store.isStaff;
  store.save();
  if (store.isStaff) {
    navigate('/staff');
  } else {
    navigate('/');
  }
};

window.handleQuickTrack = function(e) {
  e.preventDefault();
  const input = document.getElementById('quickTokenInput');
  if (input && input.value.trim()) {
    store.activeSearchToken = input.value.trim().toUpperCase();
    navigate('/track');
  }
};

window.handleTrackSearch = function(e) {
  e.preventDefault();
  const input = document.getElementById('trackSearchInput');
  if (input && input.value.trim()) {
    store.activeSearchToken = input.value.trim().toUpperCase();
    renderApp();
  }
};

window.trackSpecificToken = function(tokNo) {
  store.activeSearchToken = tokNo;
  navigate('/track');
};

window.startBookingDept = function(deptId) {
  store.bookingForm.departmentId = deptId;
  store.bookingStep = 2;
  navigate('/book');
};

window.startBookingDoctor = function(deptId, docId) {
  store.bookingForm.departmentId = deptId;
  store.bookingForm.doctorId = docId;
  store.bookingStep = 2;
  navigate('/book');
};

window.handleStep1Next = function() {
  const name = document.getElementById('patientNameInput')?.value || '';
  const age = document.getElementById('patientAgeInput')?.value || '';
  const phone = document.getElementById('patientPhoneInput')?.value || '';
  const notes = document.getElementById('patientNotesInput')?.value || '';

  if (!name.trim()) { alert('Please enter patient name.'); return; }
  if (!age || parseInt(age) < 1) { alert('Please enter a valid age.'); return; }
  if (!phone.trim()) { alert('Please enter phone number.'); return; }

  store.bookingForm.name = name;
  store.bookingForm.age = age;
  store.bookingForm.phone = phone;
  store.bookingForm.notes = notes;
  store.bookingStep = 2;
  renderApp();
};

window.setBookingDept = function(deptId) {
  store.bookingForm.departmentId = deptId;
  store.bookingForm.doctorId = '';
  renderApp();
};

window.setBookingDoc = function(docId) {
  store.bookingForm.doctorId = docId;
  renderApp();
};

window.handleStep2Next = function() {
  if (!store.bookingForm.doctorId) {
    const rec = store.getRecommendedDoctor(store.bookingForm.departmentId);
    if (rec) store.bookingForm.doctorId = rec.id;
  }
  store.bookingStep = 3;
  renderApp();
};

window.confirmAndGenerateToken = function() {
  const tok = store.bookToken(store.bookingForm);
  store.newlyBookedToken = tok;
  renderApp();
};

window.resetBookingFlow = function() {
  store.newlyBookedToken = null;
  store.bookingStep = 1;
  store.bookingForm = { name: '', age: '', phone: '', departmentId: 'general-medicine', doctorId: '', notes: '' };
  renderApp();
};

// Initial Render
renderApp();

