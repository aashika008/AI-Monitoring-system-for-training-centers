/**
 * ApexAI - AI Monitoring System for Training Centres
 * Frontend Logic, State Management, Interactivity, HTML5 Canvas & Chart.js Integration
 */

// ============================================================================
// 1. CORE CONFIGURATION & CONSTANTS
// ============================================================================

const CORE_COURSES = [
  "AI Fundamentals",
  "Web Development",
  "Python Programming",
  "Data Analytics"
];

const COURSE_DESCRIPTIONS = {
  "AI Fundamentals": "Neural networks, prompt engineering, predictive modeling & computer vision fundamentals",
  "Web Development": "Modern full-stack JavaScript, responsive UI architecture, HTML5 & RESTful services",
  "Python Programming": "Core data structures, OOP paradigms, async programming & API microservices",
  "Data Analytics": "Statistical modeling, ETL data pipelines, SQL queries, Pandas & business dashboards"
};

const DEFAULT_TRAINERS = [
  {
    id: "TRN-01",
    name: "Dr. Vikramaditya Roy",
    role: "Senior AI & ML Architect",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    batches: ["AI & Machine Learning"],
    experience: "12 Years",
    rating: "4.9",
    studentsCount: 6,
    email: "v.roy@apexai.edu",
    status: "In Session"
  },
  {
    id: "TRN-02",
    name: "Ananya Deshmukh",
    role: "Lead Full Stack Engineer",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
    batches: ["Full Stack Python"],
    experience: "9 Years",
    rating: "4.8",
    studentsCount: 8,
    email: "a.deshmukh@apexai.edu",
    status: "Available"
  },
  {
    id: "TRN-03",
    name: "Marcus Aurelius Vance",
    role: "Principal Cloud & DevOps Specialist",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    batches: ["Cloud DevOps & AWS"],
    experience: "14 Years",
    rating: "4.95",
    studentsCount: 6,
    email: "m.vance@apexai.edu",
    status: "In Session"
  },
  {
    id: "TRN-04",
    name: "Zoya Farooqui",
    role: "Cybersecurity & Threat Analyst",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
    batches: ["Cyber Security & SOC"],
    experience: "8 Years",
    rating: "4.85",
    studentsCount: 6,
    email: "z.farooqui@apexai.edu",
    status: "In Session"
  },
  {
    id: "TRN-05",
    name: "Rohan Kulkarni",
    role: "Data Systems Specialist",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    batches: ["AI & Machine Learning", "Full Stack Python"],
    experience: "7 Years",
    rating: "4.75",
    studentsCount: 12,
    email: "r.kulkarni@apexai.edu",
    status: "Available"
  },
  {
    id: "TRN-06",
    name: "Sarah Jenkins",
    role: "SRE & Microservices Mentor",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    batches: ["Cloud DevOps & AWS"],
    experience: "10 Years",
    rating: "4.9",
    studentsCount: 6,
    email: "s.jenkins@apexai.edu",
    status: "Prep Lab"
  }
];

const DEFAULT_BATCHES = [
  {
    id: "BAT-01",
    name: "AI & Machine Learning",
    trainer: "Dr. Vikramaditya Roy",
    time: "10:00 AM - 01:00 PM",
    room: "Lab 401 (GPU Cluster)",
    progress: 74,
    currentModule: "Transformers & LLM Fine-tuning"
  },
  {
    id: "BAT-02",
    name: "Full Stack Python",
    trainer: "Ananya Deshmukh",
    time: "08:30 AM - 11:30 AM",
    room: "Lab 203 (Web Matrix)",
    progress: 82,
    currentModule: "FastAPI, Docker & PostgreSQL"
  },
  {
    id: "BAT-03",
    name: "Cloud DevOps & AWS",
    trainer: "Marcus Aurelius Vance",
    time: "02:00 PM - 05:00 PM",
    room: "Lab 305 (Cloud Pod)",
    progress: 68,
    currentModule: "Kubernetes Orchestration & Helm"
  },
  {
    id: "BAT-04",
    name: "Cyber Security & SOC",
    trainer: "Zoya Farooqui",
    time: "04:30 PM - 07:30 PM",
    room: "Lab 102 (Red/Blue Arena)",
    progress: 88,
    currentModule: "SIEM Threat Hunting & Splunk"
  }
];

// Helper to ensure each student has marks for all 4 courses
function ensureStudentCourses(student) {
  if (student.courses && Array.isArray(student.courses)) {
    student.courses.forEach(c => {
      if (c.courseName === "AI Course" || c.courseName === "AI & Machine Learning") {
        c.courseName = "AI Fundamentals";
      }
      if (c.courseName === "Java Programming" || c.courseName === "Data Structures & Algorithms" || c.courseName === "Cloud Computing & AWS") {
        c.courseName = "Data Analytics";
      }
    });
  } else {
    student.courses = [];
  }

  const existingNames = student.courses.map(c => c.courseName);
  const baseScore = student.score || 82;
  const seed = (student.id || "1").charCodeAt((student.id || "1").length - 1);

  CORE_COURSES.forEach((cName, idx) => {
    if (!existingNames.includes(cName)) {
      const delta = (((seed + idx * 7) % 13) - 6);
      const scoreVal = Math.min(98, Math.max(48, Math.round(baseScore + delta)));
      student.courses.push({
        courseName: cName,
        totalMarks: 100,
        marksObtained: scoreVal
      });
    }
  });

  return student.courses;
}

const DEFAULT_STUDENTS = [
  // Demonstration Students
  {
    id: "STU-001",
    name: "Priya",
    email: "priya@apexai.edu",
    phone: "+91 98201 10001",
    batch: "Full Stack Python",
    trainer: "Ananya Deshmukh",
    attendance: 94,
    score: 87,
    todayAttendance: "present",
    notes: "Top-tier performance across programming modules and web architecture.",
    consecutiveAbsences: 0,
    riskFactors: [],
    courses: [
      { courseName: "AI Fundamentals", totalMarks: 100, marksObtained: 88 },
      { courseName: "Web Development", totalMarks: 100, marksObtained: 84 },
      { courseName: "Python Programming", totalMarks: 100, marksObtained: 92 },
      { courseName: "Data Analytics", totalMarks: 100, marksObtained: 86 }
    ]
  },
  {
    id: "STU-002",
    name: "Rahul",
    email: "rahul@apexai.edu",
    phone: "+91 98201 10002",
    batch: "Full Stack Python",
    trainer: "Ananya Deshmukh",
    attendance: 92,
    score: 86,
    todayAttendance: "present",
    notes: "Demonstrates outstanding algorithmic efficiency and full stack development.",
    consecutiveAbsences: 0,
    riskFactors: [],
    courses: [
      { courseName: "AI Fundamentals", totalMarks: 100, marksObtained: 82 },
      { courseName: "Web Development", totalMarks: 100, marksObtained: 90 },
      { courseName: "Python Programming", totalMarks: 100, marksObtained: 88 },
      { courseName: "Data Analytics", totalMarks: 100, marksObtained: 84 }
    ]
  },

  // AI & Machine Learning Batch
  {
    id: "STU-101",
    name: "Aarav Sharma",
    email: "aarav.sharma@apexai.edu",
    phone: "+91 98201 12345",
    batch: "AI & Machine Learning",
    trainer: "Dr. Vikramaditya Roy",
    attendance: 96,
    score: 95,
    todayAttendance: "present",
    notes: "Outstanding grasp on calculus and linear algebra. High engagement.",
    consecutiveAbsences: 0,
    riskFactors: [],
    courses: [
      { courseName: "AI Fundamentals", totalMarks: 100, marksObtained: 98 },
      { courseName: "Web Development", totalMarks: 100, marksObtained: 92 },
      { courseName: "Python Programming", totalMarks: 100, marksObtained: 96 },
      { courseName: "Data Analytics", totalMarks: 100, marksObtained: 94 }
    ]
  },
  {
    id: "STU-102",
    name: "Diya Patel",
    email: "diya.patel@apexai.edu",
    phone: "+91 98201 12346",
    batch: "AI & Machine Learning",
    trainer: "Dr. Vikramaditya Roy",
    attendance: 91,
    score: 89,
    todayAttendance: "present",
    notes: "Consistently submits PyTorch assignments early.",
    consecutiveAbsences: 0,
    riskFactors: [],
    courses: [
      { courseName: "AI Fundamentals", totalMarks: 100, marksObtained: 91 },
      { courseName: "Web Development", totalMarks: 100, marksObtained: 86 },
      { courseName: "Python Programming", totalMarks: 100, marksObtained: 90 },
      { courseName: "Data Analytics", totalMarks: 100, marksObtained: 88 }
    ]
  },
  {
    id: "STU-103",
    name: "Kabir Malhotra",
    email: "kabir.malhotra@apexai.edu",
    phone: "+91 98201 12347",
    batch: "AI & Machine Learning",
    trainer: "Dr. Vikramaditya Roy",
    attendance: 72,
    score: 64,
    todayAttendance: "absent",
    notes: "Missed 3 lab sessions in October. Struggling with Backprop math.",
    consecutiveAbsences: 3,
    riskFactors: ["Attendance dropped to 72% (<75% critical cutoff)", "Missed 3 consecutive weekend labs", "Test 2 score fell below 65%"],
    courses: [
      { courseName: "AI Fundamentals", totalMarks: 100, marksObtained: 62 },
      { courseName: "Web Development", totalMarks: 100, marksObtained: 66 },
      { courseName: "Python Programming", totalMarks: 100, marksObtained: 68 },
      { courseName: "Data Analytics", totalMarks: 100, marksObtained: 60 }
    ]
  },
  {
    id: "STU-104",
    name: "Sanya Verma",
    email: "sanya.verma@apexai.edu",
    phone: "+91 98201 12348",
    batch: "AI & Machine Learning",
    trainer: "Dr. Vikramaditya Roy",
    attendance: 86,
    score: 83,
    todayAttendance: "present",
    notes: "Active participant during code reviews.",
    consecutiveAbsences: 0,
    riskFactors: [],
    courses: [
      { courseName: "AI Fundamentals", totalMarks: 100, marksObtained: 84 },
      { courseName: "Web Development", totalMarks: 100, marksObtained: 81 },
      { courseName: "Python Programming", totalMarks: 100, marksObtained: 85 },
      { courseName: "Data Analytics", totalMarks: 100, marksObtained: 82 }
    ]
  },
  {
    id: "STU-105",
    name: "Ishaan Gupta",
    email: "ishaan.gupta@apexai.edu",
    phone: "+91 98201 12349",
    batch: "AI & Machine Learning",
    trainer: "Dr. Vikramaditya Roy",
    attendance: 78,
    score: 76,
    todayAttendance: "present",
    notes: "Moderate pace. Requires extra review on vector embeddings.",
    consecutiveAbsences: 1,
    riskFactors: ["Attendance fluctuating between 76-80%", "Assignment 3 submitted 2 days late"],
    courses: [
      { courseName: "AI Fundamentals", totalMarks: 100, marksObtained: 74 },
      { courseName: "Web Development", totalMarks: 100, marksObtained: 78 },
      { courseName: "Python Programming", totalMarks: 100, marksObtained: 77 },
      { courseName: "Data Analytics", totalMarks: 100, marksObtained: 75 }
    ]
  },
  {
    id: "STU-106",
    name: "Ananya Iyer",
    email: "ananya.iyer@apexai.edu",
    phone: "+91 98201 12350",
    batch: "AI & Machine Learning",
    trainer: "Dr. Vikramaditya Roy",
    attendance: 94,
    score: 93,
    todayAttendance: "present",
    notes: "Top performer in CNN architecture design.",
    consecutiveAbsences: 0,
    riskFactors: [],
    courses: [
      { courseName: "AI Fundamentals", totalMarks: 100, marksObtained: 95 },
      { courseName: "Web Development", totalMarks: 100, marksObtained: 90 },
      { courseName: "Python Programming", totalMarks: 100, marksObtained: 94 },
      { courseName: "Data Analytics", totalMarks: 100, marksObtained: 92 }
    ]
  },

  // Full Stack Python Batch
  {
    id: "STU-201",
    name: "Rohan Mukherjee",
    email: "rohan.m@apexai.edu",
    phone: "+91 98201 22341",
    batch: "Full Stack Python",
    trainer: "Ananya Deshmukh",
    attendance: 68,
    score: 58,
    todayAttendance: "absent",
    notes: "High dropout probability. Multiple unexcused morning lab absences.",
    consecutiveAbsences: 4,
    riskFactors: ["Attendance fallen to 68% (Extreme Dropout Risk)", "Failed Module 2 Test (58%)", "Zero repository commits in last 10 days"],
    courses: [
      { courseName: "AI Fundamentals", totalMarks: 100, marksObtained: 58 },
      { courseName: "Web Development", totalMarks: 100, marksObtained: 60 },
      { courseName: "Python Programming", totalMarks: 100, marksObtained: 56 },
      { courseName: "Data Analytics", totalMarks: 100, marksObtained: 52 }
    ]
  },
  {
    id: "STU-202",
    name: "Meera Nair",
    email: "meera.nair@apexai.edu",
    phone: "+91 98201 22342",
    batch: "Full Stack Python",
    trainer: "Ananya Deshmukh",
    attendance: 95,
    score: 96,
    todayAttendance: "present",
    notes: "Built full CRUD REST API ahead of schedule. Excellent student.",
    consecutiveAbsences: 0,
    riskFactors: [],
    courses: [
      { courseName: "AI Fundamentals", totalMarks: 100, marksObtained: 94 },
      { courseName: "Web Development", totalMarks: 100, marksObtained: 98 },
      { courseName: "Python Programming", totalMarks: 100, marksObtained: 97 },
      { courseName: "Data Analytics", totalMarks: 100, marksObtained: 93 }
    ]
  },
  {
    id: "STU-203",
    name: "Aditya Joshi",
    email: "aditya.joshi@apexai.edu",
    phone: "+91 98201 22343",
    batch: "Full Stack Python",
    trainer: "Ananya Deshmukh",
    attendance: 88,
    score: 85,
    todayAttendance: "present",
    notes: "Solid understanding of asynchronous Python and SQLAlchemy.",
    consecutiveAbsences: 0,
    riskFactors: [],
    courses: [
      { courseName: "AI Fundamentals", totalMarks: 100, marksObtained: 83 },
      { courseName: "Web Development", totalMarks: 100, marksObtained: 88 },
      { courseName: "Python Programming", totalMarks: 100, marksObtained: 87 },
      { courseName: "Data Analytics", totalMarks: 100, marksObtained: 81 }
    ]
  },
  {
    id: "STU-204",
    name: "Sneha Sen",
    email: "sneha.sen@apexai.edu",
    phone: "+91 98201 22344",
    batch: "Full Stack Python",
    trainer: "Ananya Deshmukh",
    attendance: 92,
    score: 91,
    todayAttendance: "present",
    notes: "Fast frontend styling with CSS & responsive design.",
    consecutiveAbsences: 0,
    riskFactors: [],
    courses: [
      { courseName: "AI Fundamentals", totalMarks: 100, marksObtained: 89 },
      { courseName: "Web Development", totalMarks: 100, marksObtained: 94 },
      { courseName: "Python Programming", totalMarks: 100, marksObtained: 92 },
      { courseName: "Data Analytics", totalMarks: 100, marksObtained: 88 }
    ]
  },
  {
    id: "STU-205",
    name: "Vikram Chauhan",
    email: "vikram.c@apexai.edu",
    phone: "+91 98201 22345",
    batch: "Full Stack Python",
    trainer: "Ananya Deshmukh",
    attendance: 80,
    score: 77,
    todayAttendance: "present",
    notes: "Needs clarification on Git merge conflict resolutions.",
    consecutiveAbsences: 1,
    riskFactors: ["Attendance borderline (80%)", "Struggled in recursive function test"],
    courses: [
      { courseName: "AI Fundamentals", totalMarks: 100, marksObtained: 75 },
      { courseName: "Web Development", totalMarks: 100, marksObtained: 80 },
      { courseName: "Python Programming", totalMarks: 100, marksObtained: 78 },
      { courseName: "Data Analytics", totalMarks: 100, marksObtained: 74 }
    ]
  },
  {
    id: "STU-206",
    name: "Pooja Hegde",
    email: "pooja.h@apexai.edu",
    phone: "+91 98201 22346",
    batch: "Full Stack Python",
    trainer: "Ananya Deshmukh",
    attendance: 90,
    score: 86,
    todayAttendance: "present",
    notes: "Good progress in React component lifecycle integration.",
    consecutiveAbsences: 0,
    riskFactors: [],
    courses: [
      { courseName: "AI Fundamentals", totalMarks: 100, marksObtained: 84 },
      { courseName: "Web Development", totalMarks: 100, marksObtained: 89 },
      { courseName: "Python Programming", totalMarks: 100, marksObtained: 87 },
      { courseName: "Data Analytics", totalMarks: 100, marksObtained: 83 }
    ]
  },

  // Cloud DevOps & AWS Batch
  {
    id: "STU-301",
    name: "Karthik Reddy",
    email: "karthik.r@apexai.edu",
    phone: "+91 98201 32341",
    batch: "Cloud DevOps & AWS",
    trainer: "Marcus Aurelius Vance",
    attendance: 94,
    score: 93,
    todayAttendance: "present",
    notes: "Configured Terraform IaC pipelines flawlessly in AWS Sandbox.",
    consecutiveAbsences: 0,
    riskFactors: [],
    courses: [
      { courseName: "AI Fundamentals", totalMarks: 100, marksObtained: 90 },
      { courseName: "Web Development", totalMarks: 100, marksObtained: 92 },
      { courseName: "Python Programming", totalMarks: 100, marksObtained: 95 },
      { courseName: "Data Analytics", totalMarks: 100, marksObtained: 94 }
    ]
  },
  {
    id: "STU-302",
    name: "Natasha Roy",
    email: "natasha.roy@apexai.edu",
    phone: "+91 98201 32342",
    batch: "Cloud DevOps & AWS",
    trainer: "Marcus Aurelius Vance",
    attendance: 89,
    score: 88,
    todayAttendance: "present",
    notes: "Strong in Docker multi-stage builds and security linting.",
    consecutiveAbsences: 0,
    riskFactors: [],
    courses: [
      { courseName: "AI Fundamentals", totalMarks: 100, marksObtained: 87 },
      { courseName: "Web Development", totalMarks: 100, marksObtained: 89 },
      { courseName: "Python Programming", totalMarks: 100, marksObtained: 88 },
      { courseName: "Data Analytics", totalMarks: 100, marksObtained: 86 }
    ]
  },
  {
    id: "STU-303",
    name: "Tariq Ali",
    email: "tariq.ali@apexai.edu",
    phone: "+91 98201 32343",
    batch: "Cloud DevOps & AWS",
    trainer: "Marcus Aurelius Vance",
    attendance: 71,
    score: 62,
    todayAttendance: "absent",
    notes: "Repeatedly absent during Jenkins CI/CD labs. Low confidence.",
    consecutiveAbsences: 3,
    riskFactors: ["Attendance 71% below safety barrier", "Incomplete Kubernetes deployment capstone", "Risk score 84/100"],
    courses: [
      { courseName: "AI Fundamentals", totalMarks: 100, marksObtained: 60 },
      { courseName: "Web Development", totalMarks: 100, marksObtained: 65 },
      { courseName: "Python Programming", totalMarks: 100, marksObtained: 58 },
      { courseName: "Data Analytics", totalMarks: 100, marksObtained: 62 }
    ]
  },
  {
    id: "STU-304",
    name: "Tanvi Kulkarni",
    email: "tanvi.k@apexai.edu",
    phone: "+91 98201 32344",
    batch: "Cloud DevOps & AWS",
    trainer: "Marcus Aurelius Vance",
    attendance: 96,
    score: 95,
    todayAttendance: "present",
    notes: "Excellent performance in AWS IAM & VPC network peering.",
    consecutiveAbsences: 0,
    riskFactors: [],
    courses: [
      { courseName: "AI Fundamentals", totalMarks: 100, marksObtained: 94 },
      { courseName: "Web Development", totalMarks: 100, marksObtained: 93 },
      { courseName: "Python Programming", totalMarks: 100, marksObtained: 96 },
      { courseName: "Data Analytics", totalMarks: 100, marksObtained: 95 }
    ]
  },
  {
    id: "STU-305",
    name: "Arjun Nambiar",
    email: "arjun.n@apexai.edu",
    phone: "+91 98201 32345",
    batch: "Cloud DevOps & AWS",
    trainer: "Marcus Aurelius Vance",
    attendance: 85,
    score: 82,
    todayAttendance: "present",
    notes: "Good progress. Working on Helm charts for stateful workloads.",
    consecutiveAbsences: 0,
    riskFactors: [],
    courses: [
      { courseName: "AI Fundamentals", totalMarks: 100, marksObtained: 80 },
      { courseName: "Web Development", totalMarks: 100, marksObtained: 83 },
      { courseName: "Python Programming", totalMarks: 100, marksObtained: 84 },
      { courseName: "Data Analytics", totalMarks: 100, marksObtained: 81 }
    ]
  },
  {
    id: "STU-306",
    name: "Bhavna Chawla",
    email: "bhavna.c@apexai.edu",
    phone: "+91 98201 32346",
    batch: "Cloud DevOps & AWS",
    trainer: "Marcus Aurelius Vance",
    attendance: 91,
    score: 88,
    todayAttendance: "present",
    notes: "Consistent attendance and proactive lab completion.",
    consecutiveAbsences: 0,
    riskFactors: [],
    courses: [
      { courseName: "AI Fundamentals", totalMarks: 100, marksObtained: 86 },
      { courseName: "Web Development", totalMarks: 100, marksObtained: 89 },
      { courseName: "Python Programming", totalMarks: 100, marksObtained: 89 },
      { courseName: "Data Analytics", totalMarks: 100, marksObtained: 87 }
    ]
  },

  // Cyber Security & SOC Batch
  {
    id: "STU-401",
    name: "Farhan Qureshi",
    email: "farhan.q@apexai.edu",
    phone: "+91 98201 42341",
    batch: "Cyber Security & SOC",
    trainer: "Zoya Farooqui",
    attendance: 98,
    score: 96,
    todayAttendance: "present",
    notes: "Discovered zero-day simulation vulnerability in CTF challenge.",
    consecutiveAbsences: 0,
    riskFactors: [],
    courses: [
      { courseName: "AI Fundamentals", totalMarks: 100, marksObtained: 95 },
      { courseName: "Web Development", totalMarks: 100, marksObtained: 94 },
      { courseName: "Python Programming", totalMarks: 100, marksObtained: 98 },
      { courseName: "Data Analytics", totalMarks: 100, marksObtained: 96 }
    ]
  },
  {
    id: "STU-402",
    name: "Ritika Kapoor",
    email: "ritika.k@apexai.edu",
    phone: "+91 98201 42342",
    batch: "Cyber Security & SOC",
    trainer: "Zoya Farooqui",
    attendance: 92,
    score: 89,
    todayAttendance: "present",
    notes: "Proficient with Wireshark packet analysis and Snort rules.",
    consecutiveAbsences: 0,
    riskFactors: [],
    courses: [
      { courseName: "AI Fundamentals", totalMarks: 100, marksObtained: 88 },
      { courseName: "Web Development", totalMarks: 100, marksObtained: 87 },
      { courseName: "Python Programming", totalMarks: 100, marksObtained: 92 },
      { courseName: "Data Analytics", totalMarks: 100, marksObtained: 88 }
    ]
  },
  {
    id: "STU-403",
    name: "Devendra Singhania",
    email: "devendra.s@apexai.edu",
    phone: "+91 98201 42343",
    batch: "Cyber Security & SOC",
    trainer: "Zoya Farooqui",
    attendance: 82,
    score: 80,
    todayAttendance: "present",
    notes: "Good progress in SIEM Splunk queries. Needs practice in iptables.",
    consecutiveAbsences: 1,
    riskFactors: ["Missed 2 evening sessions in past fortnight"],
    courses: [
      { courseName: "AI Fundamentals", totalMarks: 100, marksObtained: 80 },
      { courseName: "Web Development", totalMarks: 100, marksObtained: 78 },
      { courseName: "Python Programming", totalMarks: 100, marksObtained: 82 },
      { courseName: "Data Analytics", totalMarks: 100, marksObtained: 79 }
    ]
  },
  {
    id: "STU-404",
    name: "Gauri Shankar",
    email: "gauri.s@apexai.edu",
    phone: "+91 98201 42344",
    batch: "Cyber Security & SOC",
    trainer: "Zoya Farooqui",
    attendance: 90,
    score: 87,
    todayAttendance: "present",
    notes: "Active contributor in incident response simulation exercises.",
    consecutiveAbsences: 0,
    riskFactors: [],
    courses: [
      { courseName: "AI Fundamentals", totalMarks: 100, marksObtained: 86 },
      { courseName: "Web Development", totalMarks: 100, marksObtained: 88 },
      { courseName: "Python Programming", totalMarks: 100, marksObtained: 89 },
      { courseName: "Data Analytics", totalMarks: 100, marksObtained: 85 }
    ]
  },
  {
    id: "STU-405",
    name: "Harshavardhan Rao",
    email: "harsha.rao@apexai.edu",
    phone: "+91 98201 42345",
    batch: "Cyber Security & SOC",
    trainer: "Zoya Farooqui",
    attendance: 87,
    score: 84,
    todayAttendance: "present",
    notes: "Solid analytical capability in malware sandbox analysis.",
    consecutiveAbsences: 0,
    riskFactors: [],
    courses: [
      { courseName: "AI Fundamentals", totalMarks: 100, marksObtained: 82 },
      { courseName: "Web Development", totalMarks: 100, marksObtained: 83 },
      { courseName: "Python Programming", totalMarks: 100, marksObtained: 87 },
      { courseName: "Data Analytics", totalMarks: 100, marksObtained: 83 }
    ]
  },
  {
    id: "STU-406",
    name: "Kavya Menon",
    email: "kavya.m@apexai.edu",
    phone: "+91 98201 42346",
    batch: "Cyber Security & SOC",
    trainer: "Zoya Farooqui",
    attendance: 93,
    score: 91,
    todayAttendance: "present",
    notes: "High scoring in cryptography and public key infrastructure.",
    consecutiveAbsences: 0,
    riskFactors: [],
    courses: [
      { courseName: "AI Fundamentals", totalMarks: 100, marksObtained: 92 },
      { courseName: "Web Development", totalMarks: 100, marksObtained: 89 },
      { courseName: "Python Programming", totalMarks: 100, marksObtained: 94 },
      { courseName: "Data Analytics", totalMarks: 100, marksObtained: 90 }
    ]
  }
];

const NOTIFICATIONS = [
  {
    id: 1,
    type: "danger",
    icon: "fa-triangle-exclamation",
    title: "Critical Dropout Alert",
    text: "Rohan Mukherjee (Python Fullstack) attendance reached 68%. AI triggered automatic mentor notification.",
    time: "10 mins ago",
    unread: true
  },
  {
    id: 2,
    type: "warning",
    icon: "fa-calendar-xmark",
    title: "Batch Attendance Dip",
    text: "Saturday attendance for Cloud DevOps projected 14% below target. Remedial sync scheduled.",
    time: "45 mins ago",
    unread: true
  },
  {
    id: 3,
    type: "info",
    icon: "fa-wand-magic-sparkles",
    title: "AI Model Retrained",
    text: "Apex Neural Model v2.8 re-indexed 26 student activity logs with 98.4% convergence.",
    time: "2 hours ago",
    unread: true
  }
];

// ============================================================================
// 2. APPLICATION STATE & PERSISTENCE
// ============================================================================

const STORAGE_KEY = "APEX_AI_MONITORING_DATA_V2";

let appState = {
  students: [],
  trainers: DEFAULT_TRAINERS,
  batches: DEFAULT_BATCHES,
  notifications: NOTIFICATIONS,
  currentView: "dashboard",
  attendanceBatchFilter: "AI & Machine Learning"
};

function calculateStudentRisk(student) {
  if (student.attendance < 75 || student.score < 65 || student.consecutiveAbsences >= 3) {
    return "Critical";
  } else if (student.attendance < 85 || student.score < 80 || student.consecutiveAbsences >= 1) {
    return "Moderate";
  } else {
    return "Safe";
  }
}

function getGrade(percentage) {
  if (percentage >= 90) {
    return {
      grade: "A+",
      label: "Grade A+",
      color: "grade-aplus",
      badgeClass: "badge-purple",
      desc: "Outstanding Mastery"
    };
  } else if (percentage >= 80) {
    return {
      grade: "A",
      label: "Grade A",
      color: "grade-a",
      badgeClass: "badge-success",
      desc: "Excellent Performance"
    };
  } else if (percentage >= 70) {
    return {
      grade: "B",
      label: "Grade B",
      color: "grade-b",
      badgeClass: "badge-primary",
      desc: "Good Comprehension"
    };
  } else if (percentage >= 60) {
    return {
      grade: "C",
      label: "Grade C",
      color: "grade-c",
      badgeClass: "badge-warning",
      desc: "Average Proficiency"
    };
  } else if (percentage >= 50) {
    return {
      grade: "D",
      label: "Grade D",
      color: "grade-d",
      badgeClass: "badge-amber",
      desc: "Passing Standard"
    };
  } else {
    return {
      grade: "F",
      label: "Grade F",
      color: "grade-f",
      badgeClass: "badge-danger",
      desc: "Needs Improvement"
    };
  }
}

function getPerformanceStatus(percentage) {
  if (percentage >= 90) {
    return {
      status: "Outstanding",
      badgeClass: "badge-purple",
      statusClass: "status-outstanding",
      fillClass: "fill-purple",
      icon: "fa-solid fa-crown"
    };
  } else if (percentage >= 80) {
    return {
      status: "Excellent",
      badgeClass: "badge-success",
      statusClass: "status-excellent",
      fillClass: "fill-emerald",
      icon: "fa-solid fa-star"
    };
  } else if (percentage >= 70) {
    return {
      status: "Good",
      badgeClass: "badge-primary",
      statusClass: "status-good",
      fillClass: "fill-indigo",
      icon: "fa-solid fa-thumbs-up"
    };
  } else if (percentage >= 50) {
    return {
      status: "Average",
      badgeClass: "badge-warning",
      statusClass: "status-average",
      fillClass: "fill-amber",
      icon: "fa-solid fa-chart-simple"
    };
  } else {
    return {
      status: "Needs Improvement",
      badgeClass: "badge-danger",
      statusClass: "status-improvement",
      fillClass: "fill-rose",
      icon: "fa-solid fa-triangle-exclamation"
    };
  }
}

function getCourseIcon(courseName) {
  const name = (courseName || "").toLowerCase();
  if (name.includes("ai") || name.includes("machine") || name.includes("fund")) return "fa-solid fa-brain text-purple";
  if (name.includes("web") || name.includes("dev") || name.includes("html") || name.includes("code")) return "fa-solid fa-code text-cyan";
  if (name.includes("python")) return "fa-brands fa-python text-indigo";
  if (name.includes("data") || name.includes("analytic")) return "fa-solid fa-chart-pie text-emerald";
  return "fa-solid fa-book-open text-indigo";
}

function initDataState() {
  let saved = null;
  try {
    saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem("APEX_AI_MONITORING_DATA_V1");
  } catch (e) {
    console.warn("localStorage read failed:", e);
  }

  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      appState.students = parsed.students || JSON.parse(JSON.stringify(DEFAULT_STUDENTS));
      appState.trainers = parsed.trainers || DEFAULT_TRAINERS;
      appState.batches = parsed.batches || DEFAULT_BATCHES;
    } catch (e) {
      console.error("Failed to parse saved state, resetting to defaults", e);
      appState.students = JSON.parse(JSON.stringify(DEFAULT_STUDENTS));
    }
  } else {
    appState.students = JSON.parse(JSON.stringify(DEFAULT_STUDENTS));
  }

  // Ensure risk tags and 4 core courses exist for all students
  appState.students.forEach(s => {
    s.riskLevel = calculateStudentRisk(s);
    if (!s.riskFactors) s.riskFactors = [];
    ensureStudentCourses(s);
  });

  persistState();
}

function persistState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      students: appState.students,
      trainers: appState.trainers,
      batches: appState.batches
    }));
  } catch (e) {
    console.warn("localStorage write failed:", e);
  }
}

function resetToDefaultState() {
  if (confirm("Reset all student, course marks, and attendance records to original sample data?")) {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem("APEX_AI_MONITORING_DATA_V1");
    } catch (e) {}

    appState.students = JSON.parse(JSON.stringify(DEFAULT_STUDENTS));
    appState.trainers = JSON.parse(JSON.stringify(DEFAULT_TRAINERS));
    appState.batches = JSON.parse(JSON.stringify(DEFAULT_BATCHES));

    appState.students.forEach(s => {
      s.riskLevel = calculateStudentRisk(s);
      ensureStudentCourses(s);
    });

    persistState();
    refreshAllViews();
    showToast("Sample data restored successfully!", "success");
  }
}

// ============================================================================
// 3. CHART CONTROLLER & HIGH-COMPATIBILITY NATIVE CANVAS RENDERER
// ============================================================================

let chartInstances = {};
let useNativeCharts = false;

// Native HTML5 Canvas Chart Drawing Engine
// Renders responsive, dark-navy & purple styled charts with zero dependencies
function drawNativeAttendanceTrend(mode) {
  const canvas = document.getElementById("attendanceTrendChart");
  if (!canvas) return;

  const parent = canvas.parentElement;
  const width = (parent ? parent.clientWidth : 500) || 500;
  const height = 280;
  const dpr = window.devicePixelRatio || 1;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";

  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);

  const isWeekly = mode !== "monthly";
  const labels = isWeekly 
    ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Today"] 
    : ["Week 1", "Week 2", "Week 3", "Week 4"];
  const data = isWeekly 
    ? [92, 89, 94, 88, 91, 85, 88.5] 
    : [86.2, 89.1, 87.8, 88.5];
  const targetVal = 85;

  const padLeft = 45;
  const padRight = 30;
  const padTop = 38;
  const padBottom = 35;
  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  const minVal = 60;
  const maxVal = 100;

  function getY(val) {
    return padTop + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;
  }
  function getX(idx) {
    return padLeft + (idx / (data.length - 1)) * chartW;
  }

  // Draw Horizontal Grid lines
  ctx.lineWidth = 1;
  ctx.font = "11px 'JetBrains Mono', monospace";
  ctx.fillStyle = "#94a3b8";
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";

  const gridVals = [60, 70, 80, 90, 100];
  gridVals.forEach(g => {
    const y = getY(g);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(padLeft, y);
    ctx.lineTo(width - padRight, y);
    ctx.stroke();
    ctx.fillText(g + "%", padLeft - 8, y);
  });

  // Draw Target Baseline (85%)
  const targetY = getY(targetVal);
  ctx.strokeStyle = "rgba(6, 182, 212, 0.7)";
  ctx.lineWidth = 1.5;
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(padLeft, targetY);
  ctx.lineTo(width - padRight, targetY);
  ctx.stroke();
  ctx.setLineDash([]);

  // Top Legend
  ctx.font = "11px 'Plus Jakarta Sans', sans-serif";
  ctx.textAlign = "left";
  // Purple actual
  ctx.fillStyle = "#8b5cf6";
  ctx.beginPath();
  ctx.arc(padLeft + 10, 16, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#e2e8f0";
  ctx.fillText("Actual Attendance %", padLeft + 22, 17);

  // Cyan target
  ctx.strokeStyle = "#06b6d4";
  ctx.lineWidth = 2;
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(padLeft + 170, 16);
  ctx.lineTo(padLeft + 190, 16);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = "#e2e8f0";
  ctx.fillText("AI Target Baseline (85%)", padLeft + 198, 17);

  // Draw Area Gradient Under Curve
  const grad = ctx.createLinearGradient(0, padTop, 0, padTop + chartH);
  grad.addColorStop(0, "rgba(139, 92, 246, 0.35)");
  grad.addColorStop(1, "rgba(139, 92, 246, 0.0)");

  ctx.beginPath();
  ctx.moveTo(getX(0), getY(data[0]));
  for (let i = 1; i < data.length; i++) {
    const prevX = getX(i - 1);
    const prevY = getY(data[i - 1]);
    const currX = getX(i);
    const currY = getY(data[i]);
    const cpX1 = prevX + (currX - prevX) * 0.45;
    const cpX2 = prevX + (currX - prevX) * 0.55;
    ctx.bezierCurveTo(cpX1, prevY, cpX2, currY, currX, currY);
  }
  ctx.lineTo(getX(data.length - 1), padTop + chartH);
  ctx.lineTo(getX(0), padTop + chartH);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Draw Line
  ctx.beginPath();
  ctx.moveTo(getX(0), getY(data[0]));
  for (let i = 1; i < data.length; i++) {
    const prevX = getX(i - 1);
    const prevY = getY(data[i - 1]);
    const currX = getX(i);
    const currY = getY(data[i]);
    const cpX1 = prevX + (currX - prevX) * 0.45;
    const cpX2 = prevX + (currX - prevX) * 0.55;
    ctx.bezierCurveTo(cpX1, prevY, cpX2, currY, currX, currY);
  }
  ctx.strokeStyle = "#8b5cf6";
  ctx.lineWidth = 3;
  ctx.stroke();

  // Draw Points & Labels
  for (let i = 0; i < data.length; i++) {
    const px = getX(i);
    const py = getY(data[i]);

    // Outer Glow / Ring
    ctx.fillStyle = "#8b5cf6";
    ctx.beginPath();
    ctx.arc(px, py, 5, 0, Math.PI * 2);
    ctx.fill();

    // Center Dot
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(px, py, 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Value tag above point
    ctx.font = "bold 10px 'JetBrains Mono', monospace";
    ctx.fillStyle = i === data.length - 1 ? "#38bdf8" : "#f1f5f9";
    ctx.textAlign = "center";
    ctx.fillText(data[i] + "%", px, py - 10);

    // X-axis label
    ctx.font = "11px 'Plus Jakarta Sans', sans-serif";
    ctx.fillStyle = "#94a3b8";
    ctx.fillText(labels[i], px, padTop + chartH + 18);
  }
}

function drawNativeBatchPerformance() {
  const canvas = document.getElementById("batchPerformanceChart");
  if (!canvas) return;

  const parent = canvas.parentElement;
  const width = (parent ? parent.clientWidth : 500) || 500;
  const height = 280;
  const dpr = window.devicePixelRatio || 1;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";

  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);

  // Compute dynamic averages from current students
  const batches = [
    { label: "AI & ML", fullName: "AI & Machine Learning", defaultScore: 86.8, c1: "#6366f1", c2: "#818cf8" },
    { label: "Python FS", fullName: "Full Stack Python", defaultScore: 83.2, c1: "#8b5cf6", c2: "#c084fc" },
    { label: "DevOps/AWS", fullName: "Cloud DevOps & AWS", defaultScore: 88.5, c1: "#06b6d4", c2: "#38bdf8" },
    { label: "CyberSec", fullName: "Cyber Security & SOC", defaultScore: 90.2, c1: "#10b981", c2: "#34d399" }
  ];

  batches.forEach(b => {
    const inBatch = appState.students.filter(s => s.batch === b.fullName);
    if (inBatch.length > 0) {
      const avg = inBatch.reduce((sum, s) => sum + Number(s.score || 80), 0) / inBatch.length;
      b.score = Math.round(avg * 10) / 10;
    } else {
      b.score = b.defaultScore;
    }
  });

  const padLeft = 45;
  const padRight = 30;
  const padTop = 38;
  const padBottom = 35;
  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  const minVal = 50;
  const maxVal = 100;

  function getY(val) {
    return padTop + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;
  }

  // Draw Grid lines
  ctx.lineWidth = 1;
  ctx.font = "11px 'JetBrains Mono', monospace";
  ctx.fillStyle = "#94a3b8";
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";

  [50, 60, 70, 80, 90, 100].forEach(g => {
    const y = getY(g);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
    ctx.beginPath();
    ctx.moveTo(padLeft, y);
    ctx.lineTo(width - padRight, y);
    ctx.stroke();
    ctx.fillText(g + "%", padLeft - 8, y);
  });

  // Top header text
  ctx.font = "11px 'Plus Jakarta Sans', sans-serif";
  ctx.textAlign = "left";
  ctx.fillStyle = "#e2e8f0";
  ctx.fillText("Average Test & Practical Assessment Score (%)", padLeft + 6, 17);

  // Draw Bars
  const barCount = batches.length;
  const slotW = chartW / barCount;
  const barW = Math.min(52, slotW * 0.58);

  batches.forEach((b, idx) => {
    const centerX = padLeft + idx * slotW + slotW / 2;
    const barX = centerX - barW / 2;
    const barY = getY(b.score);
    const barH = (padTop + chartH) - barY;

    // Gradient bar
    const barGrad = ctx.createLinearGradient(0, barY, 0, barY + barH);
    barGrad.addColorStop(0, b.c2);
    barGrad.addColorStop(1, b.c1);

    ctx.fillStyle = barGrad;
    // Rounded bar top
    const radius = 6;
    ctx.beginPath();
    ctx.moveTo(barX, padTop + chartH);
    ctx.lineTo(barX, barY + radius);
    ctx.quadraticCurveTo(barX, barY, barX + radius, barY);
    ctx.lineTo(barX + barW - radius, barY);
    ctx.quadraticCurveTo(barX + barW, barY, barX + barW, barY + radius);
    ctx.lineTo(barX + barW, padTop + chartH);
    ctx.closePath();
    ctx.fill();

    // Value label on top
    ctx.font = "bold 12px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText(b.score + "%", centerX, barY - 8);

    // Label below
    ctx.font = "bold 11px 'Plus Jakarta Sans', sans-serif";
    ctx.fillStyle = "#cbd5e1";
    ctx.fillText(b.label, centerX, padTop + chartH + 18);
  });
}

function drawNativeComparisonChart() {
  const canvas = document.getElementById("analyticsComparisonChart");
  if (!canvas) return;

  const parent = canvas.parentElement;
  const width = (parent ? parent.clientWidth : 500) || 500;
  const height = 280;
  const dpr = window.devicePixelRatio || 1;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";

  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);

  const categories = ["AI & ML", "Python FS", "DevOps/AWS", "CyberSec"];
  const theory = [84, 82, 86, 89];
  const practical = [89, 85, 91, 92];

  const padLeft = 45;
  const padRight = 30;
  const padTop = 38;
  const padBottom = 35;
  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  function getY(val) {
    return padTop + chartH - ((val - 50) / 50) * chartH;
  }

  // Grid
  ctx.font = "11px 'JetBrains Mono', monospace";
  ctx.fillStyle = "#94a3b8";
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";

  [50, 60, 70, 80, 90, 100].forEach(g => {
    const y = getY(g);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.06)";
    ctx.beginPath();
    ctx.moveTo(padLeft, y);
    ctx.lineTo(width - padRight, y);
    ctx.stroke();
    ctx.fillText(g + "%", padLeft - 8, y);
  });

  // Top Legend
  ctx.font = "11px 'Plus Jakarta Sans', sans-serif";
  ctx.textAlign = "left";
  // Theory (Indigo)
  ctx.fillStyle = "#6366f1";
  ctx.fillRect(padLeft + 10, 11, 12, 10);
  ctx.fillStyle = "#e2e8f0";
  ctx.fillText("Theory Exams", padLeft + 28, 17);

  // Practical (Purple)
  ctx.fillStyle = "#a855f7";
  ctx.fillRect(padLeft + 140, 11, 12, 10);
  ctx.fillStyle = "#e2e8f0";
  ctx.fillText("Hands-on Practical Labs", padLeft + 158, 17);

  const slotW = chartW / categories.length;
  const barW = Math.min(22, slotW * 0.28);

  categories.forEach((cat, idx) => {
    const center = padLeft + idx * slotW + slotW / 2;
    const x1 = center - barW - 2;
    const x2 = center + 2;

    // Bar 1 (Theory)
    const y1 = getY(theory[idx]);
    ctx.fillStyle = "rgba(99, 102, 241, 0.85)";
    ctx.fillRect(x1, y1, barW, padTop + chartH - y1);

    // Bar 2 (Practical)
    const y2 = getY(practical[idx]);
    ctx.fillStyle = "rgba(168, 85, 247, 0.85)";
    ctx.fillRect(x2, y2, barW, padTop + chartH - y2);

    // X-axis label
    ctx.font = "11px 'Plus Jakarta Sans', sans-serif";
    ctx.fillStyle = "#cbd5e1";
    ctx.textAlign = "center";
    ctx.fillText(cat, center, padTop + chartH + 18);
  });
}

function drawNativeRiskDoughnut() {
  const canvas = document.getElementById("analyticsRiskDoughnutChart");
  if (!canvas) return;

  const parent = canvas.parentElement;
  const width = (parent ? parent.clientWidth : 340) || 340;
  const height = 280;
  const dpr = window.devicePixelRatio || 1;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";

  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);

  const safeCount = appState.students.filter(s => s.riskLevel === "Safe").length;
  const moderateCount = appState.students.filter(s => s.riskLevel === "Moderate").length;
  const criticalCount = appState.students.filter(s => s.riskLevel === "Critical").length;
  const total = safeCount + moderateCount + criticalCount || 1;

  const data = [
    { label: "Safe (>85%)", count: safeCount, color: "#10b981" },
    { label: "Moderate (75-84%)", count: moderateCount, color: "#f59e0b" },
    { label: "Critical (<75%)", count: criticalCount, color: "#f43f5e" }
  ];

  const centerX = width / 2;
  const centerY = height / 2 - 14;
  const outerR = Math.min(centerX, centerY) - 20;
  const innerR = outerR * 0.68;

  let startAngle = -Math.PI / 2;

  data.forEach(seg => {
    const sliceAngle = (seg.count / total) * (Math.PI * 2);
    ctx.beginPath();
    ctx.arc(centerX, centerY, outerR, startAngle, startAngle + sliceAngle);
    ctx.arc(centerX, centerY, innerR, startAngle + sliceAngle, startAngle, true);
    ctx.closePath();
    ctx.fillStyle = seg.color;
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#0b101f";
    ctx.stroke();

    startAngle += sliceAngle;
  });

  // Center text
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "bold 20px 'JetBrains Mono', monospace";
  ctx.fillStyle = "#ffffff";
  ctx.fillText(total + "", centerX, centerY - 8);
  ctx.font = "11px 'Plus Jakarta Sans', sans-serif";
  ctx.fillStyle = "#94a3b8";
  ctx.fillText("Trainees", centerX, centerY + 12);

  // Bottom Legend
  ctx.font = "11px 'Plus Jakarta Sans', sans-serif";
  ctx.textAlign = "center";
  const legendY = height - 15;
  const gap = width / 3;

  data.forEach((seg, idx) => {
    const lx = gap * idx + gap / 2;
    ctx.fillStyle = seg.color;
    ctx.beginPath();
    ctx.arc(lx - 28, legendY, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#cbd5e1";
    ctx.fillText(`${seg.count} ${seg.label.split(" ")[0]}`, lx + 5, legendY + 1);
  });
}

function drawNativeRadarChart() {
  const canvas = document.getElementById("analyticsRadarChart");
  if (!canvas) return;

  const parent = canvas.parentElement;
  const width = (parent ? parent.clientWidth : 500) || 500;
  const height = 280;
  const dpr = window.devicePixelRatio || 1;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + "px";
  canvas.style.height = height + "px";

  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);

  const labels = ["Algorithm Design", "Code Quality", "Cloud Infra", "Debugging Speed", "Lab Attendance", "Assessments"];
  const values = [88, 82, 85, 79, 88.5, 84];
  const numAxes = labels.length;

  const centerX = width / 2;
  const centerY = height / 2 + 5;
  const maxR = Math.min(centerX, centerY) - 45;

  // Draw concentric webs
  [0.4, 0.6, 0.8, 1.0].forEach(level => {
    ctx.beginPath();
    for (let i = 0; i < numAxes; i++) {
      const angle = (i / numAxes) * (Math.PI * 2) - Math.PI / 2;
      const x = centerX + Math.cos(angle) * (maxR * level);
      const y = centerY + Math.sin(angle) * (maxR * level);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 1;
    ctx.stroke();
  });

  // Draw axis spokes
  for (let i = 0; i < numAxes; i++) {
    const angle = (i / numAxes) * (Math.PI * 2) - Math.PI / 2;
    const x = centerX + Math.cos(angle) * maxR;
    const y = centerY + Math.sin(angle) * maxR;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.stroke();

    // Axis label
    const lx = centerX + Math.cos(angle) * (maxR + 24);
    const ly = centerY + Math.sin(angle) * (maxR + 15);
    ctx.font = "10px 'Plus Jakarta Sans', sans-serif";
    ctx.fillStyle = "#94a3b8";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(labels[i], lx, ly);
  }

  // Draw Data Polygon
  ctx.beginPath();
  for (let i = 0; i < numAxes; i++) {
    const angle = (i / numAxes) * (Math.PI * 2) - Math.PI / 2;
    const r = (values[i] / 100) * maxR;
    const x = centerX + Math.cos(angle) * r;
    const y = centerY + Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = "rgba(139, 92, 246, 0.3)";
  ctx.fill();
  ctx.strokeStyle = "#8b5cf6";
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Draw Data Points
  for (let i = 0; i < numAxes; i++) {
    const angle = (i / numAxes) * (Math.PI * 2) - Math.PI / 2;
    const r = (values[i] / 100) * maxR;
    const x = centerX + Math.cos(angle) * r;
    const y = centerY + Math.sin(angle) * r;
    ctx.fillStyle = "#8b5cf6";
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
  }
}

function renderNativeCharts() {
  const timeframeSelect = document.getElementById("chartTimeframeSelect");
  const mode = timeframeSelect ? timeframeSelect.value : "weekly";
  drawNativeAttendanceTrend(mode);
  drawNativeBatchPerformance();
  drawNativeComparisonChart();
  drawNativeRiskDoughnut();
  drawNativeRadarChart();
}

function initChartJsCharts() {
  Chart.defaults.color = "#94a3b8";
  Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";

  // Chart 1: Attendance Trend
  const ctxAttendance = document.getElementById("attendanceTrendChart");
  if (ctxAttendance) {
    chartInstances.attendanceTrend = new Chart(ctxAttendance, {
      type: "line",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Today"],
        datasets: [
          {
            label: "Actual Center Attendance %",
            data: [92, 89, 94, 88, 91, 85, 88.5],
            borderColor: "#8b5cf6",
            backgroundColor: "rgba(139, 92, 246, 0.15)",
            borderWidth: 3,
            fill: true,
            tension: 0.38,
            pointBackgroundColor: "#8b5cf6",
            pointRadius: 4,
            pointHoverRadius: 6
          },
          {
            label: "AI Target Baseline (85%)",
            data: [85, 85, 85, 85, 85, 85, 85],
            borderColor: "rgba(6, 182, 212, 0.6)",
            borderWidth: 2,
            borderDash: [5, 5],
            fill: false,
            pointRadius: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "top", labels: { boxWidth: 12, usePointStyle: true } }
        },
        scales: {
          y: {
            min: 60,
            max: 100,
            grid: { color: "rgba(255, 255, 255, 0.05)" },
            ticks: { callback: val => val + "%" }
          },
          x: { grid: { color: "rgba(255, 255, 255, 0.05)" } }
        }
      }
    });
  }

  // Chart 2: Batch Performance
  const ctxBatch = document.getElementById("batchPerformanceChart");
  if (ctxBatch) {
    chartInstances.batchPerformance = new Chart(ctxBatch, {
      type: "bar",
      data: {
        labels: ["AI & ML", "Python FS", "DevOps/AWS", "CyberSec"],
        datasets: [
          {
            label: "Avg Test Score %",
            data: [86.8, 83.2, 88.5, 90.2],
            backgroundColor: [
              "rgba(99, 102, 241, 0.8)",
              "rgba(139, 92, 246, 0.8)",
              "rgba(6, 182, 212, 0.8)",
              "rgba(16, 185, 129, 0.8)"
            ],
            borderRadius: 8,
            borderWidth: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            min: 50,
            max: 100,
            grid: { color: "rgba(255, 255, 255, 0.05)" },
            ticks: { callback: val => val + "%" }
          },
          x: { grid: { display: false } }
        }
      }
    });
  }

  // Chart 3: Analytics Comparison
  const ctxComp = document.getElementById("analyticsComparisonChart");
  if (ctxComp) {
    chartInstances.analyticsComparison = new Chart(ctxComp, {
      type: "bar",
      data: {
        labels: ["AI & ML", "Python FS", "Cloud DevOps", "Cyber Security"],
        datasets: [
          { label: "Theory Exams", data: [84, 82, 86, 89], backgroundColor: "rgba(99, 102, 241, 0.75)", borderRadius: 6 },
          { label: "Hands-on Practical Labs", data: [89, 85, 91, 92], backgroundColor: "rgba(139, 92, 246, 0.75)", borderRadius: 6 }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: "top", labels: { boxWidth: 12 } } },
        scales: {
          y: { min: 50, max: 100, grid: { color: "rgba(255, 255, 255, 0.05)" }, ticks: { callback: val => val + "%" } },
          x: { grid: { display: false } }
        }
      }
    });
  }

  // Chart 4: Risk Doughnut
  const ctxRisk = document.getElementById("analyticsRiskDoughnutChart");
  if (ctxRisk) {
    chartInstances.analyticsRisk = new Chart(ctxRisk, {
      type: "doughnut",
      data: {
        labels: ["Safe (>85%)", "Moderate (75-84%)", "Critical (<75%)"],
        datasets: [
          {
            data: [
              appState.students.filter(s => s.riskLevel === "Safe").length,
              appState.students.filter(s => s.riskLevel === "Moderate").length,
              appState.students.filter(s => s.riskLevel === "Critical").length
            ],
            backgroundColor: ["#10b981", "#f59e0b", "#f43f5e"],
            borderColor: "#0b101f",
            borderWidth: 3,
            hoverOffset: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: "bottom", labels: { boxWidth: 12, padding: 15 } } },
        cutout: "68%"
      }
    });
  }

  // Chart 5: Radar
  const ctxRadar = document.getElementById("analyticsRadarChart");
  if (ctxRadar) {
    chartInstances.analyticsRadar = new Chart(ctxRadar, {
      type: "radar",
      data: {
        labels: ["Algorithm Design", "Code Quality", "Cloud Infra", "Debugging Speed", "Lab Attendance", "Assessments"],
        datasets: [
          {
            label: "Center Average",
            data: [88, 82, 85, 79, 88.5, 84],
            backgroundColor: "rgba(139, 92, 246, 0.25)",
            borderColor: "#8b5cf6",
            borderWidth: 2,
            pointBackgroundColor: "#8b5cf6"
          },
          {
            label: "Target Standard",
            data: [85, 85, 85, 85, 85, 85],
            borderColor: "rgba(6, 182, 212, 0.4)",
            borderWidth: 1,
            borderDash: [4, 4],
            pointRadius: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            angleLines: { color: "rgba(255, 255, 255, 0.08)" },
            grid: { color: "rgba(255, 255, 255, 0.08)" },
            pointLabels: { color: "#94a3b8", font: { size: 11 } },
            ticks: { display: false, min: 40, max: 100 }
          }
        },
        plugins: { legend: { position: "top", labels: { boxWidth: 12 } } }
      }
    });
  }
}

function initCharts() {
  let chartJsAvailable = false;
  try {
    if (typeof Chart !== "undefined" && typeof Chart === "function") {
      chartJsAvailable = true;
    }
  } catch (e) {
    chartJsAvailable = false;
  }

  if (chartJsAvailable) {
    try {
      initChartJsCharts();
      useNativeCharts = false;
      return;
    } catch (err) {
      console.warn("Chart.js init failed, switching to native canvas charts:", err);
    }
  }

  useNativeCharts = true;
  renderNativeCharts();
}

function updateChartData() {
  if (useNativeCharts) {
    renderNativeCharts();
    return;
  }

  if (chartInstances.batchPerformance) {
    const batches = ["AI & Machine Learning", "Full Stack Python", "Cloud DevOps & AWS", "Cyber Security & SOC"];
    const scores = batches.map(bName => {
      const inB = appState.students.filter(s => s.batch === bName);
      return inB.length > 0 
        ? Math.round((inB.reduce((sum, s) => sum + Number(s.score || 80), 0) / inB.length) * 10) / 10 
        : 85;
    });

    chartInstances.batchPerformance.data.datasets[0].data = scores;
    chartInstances.batchPerformance.update();
  }

  if (chartInstances.analyticsRisk) {
    chartInstances.analyticsRisk.data.datasets[0].data = [
      appState.students.filter(s => s.riskLevel === "Safe").length,
      appState.students.filter(s => s.riskLevel === "Moderate").length,
      appState.students.filter(s => s.riskLevel === "Critical").length
    ];
    chartInstances.analyticsRisk.update();
  }
}

// ============================================================================
// 4. VIEW RENDERING & CONTROLLER LOGIC
// ============================================================================

// --- View 1: Dashboard Overview ---
function renderDashboard() {
  const totalStudents = appState.students.length;
  const totalTrainers = appState.trainers.length;
  const activeBatches = appState.batches.length;

  const avgAttendance = totalStudents > 0
    ? (appState.students.reduce((acc, curr) => acc + Number(curr.attendance || 85), 0) / totalStudents).toFixed(1)
    : "88.5";

  // Update Hero Metric Cards
  const kpiTotalStudents = document.getElementById("kpiTotalStudents");
  const sidebarStudentCount = document.getElementById("sidebarStudentCount");
  const kpiTotalTrainers = document.getElementById("kpiTotalTrainers");
  const sidebarTrainerCount = document.getElementById("sidebarTrainerCount");
  const kpiAttendanceRate = document.getElementById("kpiAttendanceRate");
  const kpiAttendanceBar = document.getElementById("kpiAttendanceBar");
  const kpiActiveBatches = document.getElementById("kpiActiveBatches");

  if (kpiTotalStudents) kpiTotalStudents.textContent = totalStudents;
  if (sidebarStudentCount) sidebarStudentCount.textContent = totalStudents;
  if (kpiTotalTrainers) kpiTotalTrainers.textContent = totalTrainers;
  if (sidebarTrainerCount) sidebarTrainerCount.textContent = totalTrainers;
  if (kpiAttendanceRate) kpiAttendanceRate.textContent = avgAttendance + "%";
  if (kpiAttendanceBar) kpiAttendanceBar.style.width = avgAttendance + "%";
  if (kpiActiveBatches) kpiActiveBatches.textContent = activeBatches;

  // AI High-Risk Watchlist
  const criticalStudents = appState.students.filter(s => s.riskLevel === "Critical");
  const moderateStudents = appState.students.filter(s => s.riskLevel === "Moderate");

  const alertBadge = document.getElementById("sidebarAlertCount");
  if (alertBadge) alertBadge.textContent = criticalStudents.length;

  const aiBanner = document.getElementById("dashboardAiBanner");
  if (aiBanner) {
    if (criticalStudents.length > 0) {
      aiBanner.style.display = "flex";
      const bannerTitle = document.getElementById("bannerAlertTitle");
      const bannerSubtitle = document.getElementById("bannerAlertSubtitle");
      if (bannerTitle) {
        bannerTitle.textContent = `${criticalStudents.length} Students Identified as At-Risk of Dropping Out`;
      }
      if (bannerSubtitle) {
        bannerSubtitle.textContent = `Apex AI detected abnormal attendance drops (<75%) and lagging test performance in ${criticalStudents.map(s => s.batch.split(' ')[0]).filter((v, i, a) => a.indexOf(v) === i).join(', ')} batches.`;
      }
    } else {
      aiBanner.style.display = "none";
    }
  }

  // Populate Dashboard Watchlist
  const watchlistContainer = document.getElementById("dashboardRiskWatchlist");
  if (watchlistContainer) {
    const atRisk = [...criticalStudents, ...moderateStudents];
    if (atRisk.length === 0) {
      watchlistContainer.innerHTML = `
        <div class="empty-state-notice" style="padding: 1.5rem; text-align: center; color: var(--text-dim);">
          <i class="fa-solid fa-circle-check text-emerald" style="font-size: 1.8rem; margin-bottom: 0.5rem; display: block;"></i>
          All enrolled students currently meet attendance and progress compliance thresholds!
        </div>
      `;
    } else {
      watchlistContainer.innerHTML = atRisk.slice(0, 5).map(s => {
        const isCrit = s.riskLevel === "Critical";
        return `
          <div class="watchlist-item">
            <div class="watchlist-profile">
              <div class="student-avatar-initials">${getInitials(s.name)}</div>
              <div>
                <div class="watchlist-name">${escapeHTML(s.name)}</div>
                <div class="watchlist-batch">${escapeHTML(s.batch)} • Trainer: ${escapeHTML((s.trainer || "").split(' ')[1] || s.trainer || "Faculty")}</div>
              </div>
            </div>
            <div class="watchlist-metrics">
              <div class="watchlist-metric-val" style="color: ${isCrit ? 'var(--rose)' : 'var(--amber)'}; font-family: 'JetBrains Mono'; font-weight: 800;">
                ${s.attendance}% Attn
              </div>
              <div class="watchlist-metric-lbl">Score: ${s.score}% • ${isCrit ? '<span class="badge badge-danger">Critical</span>' : '<span class="badge badge-warning">Moderate</span>'}</div>
            </div>
            <button class="btn btn-sm btn-secondary" onclick="openStudentModal('${s.id}')">
              <i class="fa-solid fa-eye"></i> Profile
            </button>
          </div>
        `;
      }).join('');
    }
  }

  // Populate Dashboard Real-time Batches
  const batchContainer = document.getElementById("dashboardBatchList");
  if (batchContainer) {
    batchContainer.innerHTML = appState.batches.map(b => `
      <div class="batch-status-item">
        <div class="batch-status-top">
          <span class="batch-name-title">${escapeHTML(b.name)}</span>
          <span class="batch-timing"><i class="fa-regular fa-clock"></i> ${escapeHTML(b.time)}</span>
        </div>
        <div class="batch-trainer-name">Lead: <strong>${escapeHTML(b.trainer)}</strong> • ${escapeHTML(b.room)}</div>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill fill-purple" style="width: ${b.progress}%;"></div>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 0.72rem; color: var(--text-dim); margin-top: 0.25rem;">
          <span>Module: ${escapeHTML(b.currentModule)}</span>
          <span style="color: var(--cyan); font-weight: 600;">${b.progress}% Syllabus Complete</span>
        </div>
      </div>
    `).join('');
  }

  updateChartData();
}

// --- View 2: Students Directory ---
function renderStudentsTable() {
  const tableBody = document.getElementById("studentsTableBody");
  if (!tableBody) return;

  const searchQuery = (document.getElementById("studentSearchInput")?.value || "").toLowerCase().trim();
  const batchFilter = document.getElementById("filterBatch")?.value || "all";
  const riskFilter = document.getElementById("filterRisk")?.value || "all";

  let filtered = appState.students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery) ||
      student.id.toLowerCase().includes(searchQuery) ||
      student.email.toLowerCase().includes(searchQuery) ||
      student.batch.toLowerCase().includes(searchQuery);

    const matchesBatch = batchFilter === "all" || student.batch === batchFilter;
    const matchesRisk = riskFilter === "all" || student.riskLevel === riskFilter;

    return matchesSearch && matchesBatch && matchesRisk;
  });

  const countElem = document.getElementById("studentTableCount");
  if (countElem) {
    countElem.textContent = `Showing ${filtered.length} of ${appState.students.length} trainees`;
  }

  if (filtered.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align: center; padding: 2.5rem; color: var(--text-muted);">
          <i class="fa-solid fa-magnifying-glass" style="font-size: 1.8rem; margin-bottom: 0.5rem; display: block; color: var(--text-dim);"></i>
          No student records matching your search or filter parameters.
        </td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = filtered.map(student => {
    let riskBadge = '';
    let barColor = 'fill-emerald';

    if (student.riskLevel === 'Critical') {
      riskBadge = '<span class="badge badge-danger blink"><i class="fa-solid fa-triangle-exclamation"></i> Critical (<75%)</span>';
      barColor = 'fill-rose';
    } else if (student.riskLevel === 'Moderate') {
      riskBadge = '<span class="badge badge-warning"><i class="fa-solid fa-circle-exclamation"></i> Moderate (75-84%)</span>';
      barColor = 'fill-amber';
    } else {
      riskBadge = '<span class="badge badge-success"><i class="fa-solid fa-circle-check"></i> Safe (85%+)</span>';
      barColor = 'fill-emerald';
    }

    return `
      <tr>
        <td>
          <div class="table-student-info">
            <div class="student-avatar-initials">${getInitials(student.name)}</div>
            <div class="table-student-text">
              <h5>${escapeHTML(student.name)}</h5>
              <span>${escapeHTML(student.email)}</span>
            </div>
          </div>
        </td>
        <td><span class="table-code">${escapeHTML(student.id)}</span></td>
        <td><strong>${escapeHTML(student.batch)}</strong></td>
        <td style="color: var(--text-muted);">${escapeHTML(student.trainer)}</td>
        <td>
          <div class="table-progress-cell">
            <div class="table-progress-top">
              <span>${student.attendance}%</span>
            </div>
            <div class="progress-bar-bg" style="margin: 0;">
              <div class="progress-bar-fill ${barColor}" style="width: ${student.attendance}%;"></div>
            </div>
          </div>
        </td>
        <td>
          <span style="font-family: 'JetBrains Mono', monospace; font-weight: 700; color: ${student.score < 70 ? 'var(--rose)' : '#fff'};">
            ${student.score}%
          </span>
        </td>
        <td>${riskBadge}</td>
        <td class="text-right">
          <div class="table-action-btns">
            <button class="action-icon-btn" title="View Profile & Diagnostics" onclick="openStudentModal('${student.id}')">
              <i class="fa-regular fa-id-badge"></i>
            </button>
            <button class="action-icon-btn" title="Toggle Today Attendance" onclick="quickToggleAttendance('${student.id}')">
              <i class="fa-solid fa-clipboard-user" style="color: ${student.todayAttendance === 'present' ? 'var(--emerald)' : 'var(--rose)'}"></i>
            </button>
            <button class="action-icon-btn delete-btn" title="Remove Student" onclick="deleteStudent('${student.id}')">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// --- View 3: Trainers Directory ---
function renderTrainers() {
  const grid = document.getElementById("trainersGrid");
  if (!grid) return;

  grid.innerHTML = appState.trainers.map(trainer => `
    <div class="trainer-card">
      <div class="trainer-top">
        <img src="${trainer.avatar}" alt="${escapeHTML(trainer.name)}" class="trainer-avatar">
        <div class="trainer-meta">
          <h4>${escapeHTML(trainer.name)}</h4>
          <span class="trainer-spec">${escapeHTML(trainer.role)}</span>
          <div class="trainer-rating">
            <i class="fa-solid fa-star"></i>
            <span>${trainer.rating} / 5.0 Rating • ${escapeHTML(trainer.experience)}</span>
          </div>
        </div>
      </div>

      <div class="trainer-stats-row">
        <div class="trainer-stat-item">
          <span class="val">${trainer.studentsCount}</span>
          <span class="lbl">Trainees</span>
        </div>
        <div class="trainer-stat-item">
          <span class="val">${trainer.batches.length}</span>
          <span class="lbl">Batches</span>
        </div>
        <div class="trainer-stat-item">
          <span class="val" style="color: var(--emerald);">Active</span>
          <span class="lbl">Status</span>
        </div>
      </div>

      <div class="trainer-batches-assigned">
        <h5>Assigned Cohorts</h5>
        <div class="trainer-batch-tags">
          ${trainer.batches.map(b => `<span class="pill-badge pill-purple">${escapeHTML(b)}</span>`).join('')}
        </div>
      </div>

      <div style="display: flex; gap: 0.5rem; margin-top: auto;">
        <button class="btn btn-sm btn-outline btn-block" onclick="showToast('Connecting to ${trainer.name} via centre portal...', 'info')">
          <i class="fa-regular fa-envelope"></i> Message
        </button>
        <button class="btn btn-sm btn-secondary btn-block" onclick="filterByTrainerBatch('${trainer.batches[0]}')">
          <i class="fa-solid fa-users"></i> Batch View
        </button>
      </div>
    </div>
  `).join('');
}

function filterByTrainerBatch(batchName) {
  switchView('students');
  const batchDropdown = document.getElementById('filterBatch');
  if (batchDropdown) {
    batchDropdown.value = batchName;
    renderStudentsTable();
  }
}

// --- View 4: Attendance Management ---
function renderAttendanceTable() {
  const targetBatch = document.getElementById("attendanceBatchSelect")?.value || "AI & Machine Learning";
  const tbody = document.getElementById("attendanceTableBody");
  if (!tbody) return;

  const batchStudents = appState.students.filter(s => s.batch === targetBatch);

  const total = batchStudents.length;
  const presentCount = batchStudents.filter(s => s.todayAttendance === "present").length;
  const absentCount = total - presentCount;
  const rate = total > 0 ? ((presentCount / total) * 100).toFixed(0) : 0;

  const totalElem = document.getElementById("attendStatTotal");
  const presElem = document.getElementById("attendStatPresent");
  const absElem = document.getElementById("attendStatAbsent");
  const rateElem = document.getElementById("attendStatRate");

  if (totalElem) totalElem.textContent = total;
  if (presElem) presElem.textContent = presentCount;
  if (absElem) absElem.textContent = absentCount;
  if (rateElem) rateElem.textContent = rate + "%";

  if (batchStudents.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-muted);">
          No enrolled students registered under this batch.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = batchStudents.map((s, idx) => {
    const isPresent = s.todayAttendance === "present";
    return `
      <tr>
        <td><span class="table-code">#${idx + 1}</span></td>
        <td>
          <div class="table-student-info">
            <div class="student-avatar-initials">${getInitials(s.name)}</div>
            <div class="table-student-text">
              <h5>${escapeHTML(s.name)}</h5>
              <span>${escapeHTML(s.id)}</span>
            </div>
          </div>
        </td>
        <td>
          <span style="font-family: 'JetBrains Mono', monospace; font-weight: 700; color: ${s.attendance < 75 ? 'var(--rose)' : 'var(--cyan)'}">
            ${s.attendance}%
          </span>
          <span style="font-size: 0.72rem; color: var(--text-dim);"> (${s.consecutiveAbsences} consec. abs)</span>
        </td>
        <td>
          ${s.riskLevel === 'Critical' 
            ? '<span class="badge badge-danger">Critical Risk</span>' 
            : s.riskLevel === 'Moderate' 
              ? '<span class="badge badge-warning">Moderate</span>' 
              : '<span class="badge badge-success">Safe</span>'
          }
        </td>
        <td class="text-center">
          <div class="attendance-toggle-group">
            <button 
              type="button" 
              class="btn-attend-toggle present ${isPresent ? 'active' : ''}" 
              onclick="setStudentAttendance('${s.id}', 'present')"
            >
              <i class="fa-solid fa-check"></i> Present
            </button>
            <button 
              type="button" 
              class="btn-attend-toggle absent ${!isPresent ? 'active' : ''}" 
              onclick="setStudentAttendance('${s.id}', 'absent')"
            >
              <i class="fa-solid fa-xmark"></i> Absent
            </button>
          </div>
        </td>
        <td>
          <span style="font-size: 0.78rem; color: var(--text-muted);">
            ${isPresent ? 'Recorded in lab seat' : '<span style="color: var(--rose);">Absent — Notification Queued</span>'}
          </span>
        </td>
      </tr>
    `;
  }).join('');
}

function setStudentAttendance(studentId, status) {
  const student = appState.students.find(s => s.id === studentId);
  if (student) {
    student.todayAttendance = status;
    renderAttendanceTable();
  }
}

function markAllInBatch(status) {
  const targetBatch = document.getElementById("attendanceBatchSelect").value;
  appState.students.forEach(s => {
    if (s.batch === targetBatch) {
      s.todayAttendance = status;
    }
  });
  renderAttendanceTable();
  showToast(`All trainees in "${targetBatch}" marked as ${status.toUpperCase()}!`, "info");
}

function saveCurrentBatchAttendance() {
  const targetBatch = document.getElementById("attendanceBatchSelect").value;
  const dateVal = document.getElementById("attendanceDatePicker").value || "Today";

  appState.students.forEach(s => {
    if (s.batch === targetBatch) {
      if (s.todayAttendance === "absent") {
        s.attendance = Math.max(45, s.attendance - 2);
        s.consecutiveAbsences = (s.consecutiveAbsences || 0) + 1;
        if (!s.riskFactors.includes("Unexcused absence recorded on " + dateVal)) {
          s.riskFactors.unshift("Unexcused absence recorded on " + dateVal);
        }
      } else {
        s.attendance = Math.min(100, s.attendance + 1);
        s.consecutiveAbsences = 0;
      }
      s.riskLevel = calculateStudentRisk(s);
    }
  });

  persistState();
  refreshAllViews();
  showToast(`Attendance saved for ${targetBatch} (${dateVal})! AI models updated.`, "success");
}

// ============================================================================
// 4B. PERFORMANCE & 4 SEPARATE COURSES CONTROLLER (Req 5 & 6)
// Courses: AI Fundamentals, Web Development, Python Programming, Data Analytics
// ============================================================================

let activeDetailCourse = null;
let perfSearchQuery = "";
let perfCourseFilterVal = "all";
let perfStatusFilterVal = "all";

// LEVEL 1: Renders the 4 Separate Course Cards on Main Performance Dashboard
function renderCourseDashboard() {
  const grid = document.getElementById("courseCardsGrid");
  if (!grid) return;

  const cardsHtml = CORE_COURSES.map(courseName => {
    const enrolledStudents = appState.students.filter(s =>
      s.courses && s.courses.some(c => c.courseName === courseName)
    );
    let totalScore = 0;
    let gradeCounts = { "A+": 0, "A": 0, "B": 0, "C": 0, "D": 0, "F": 0 };

    enrolledStudents.forEach(s => {
      const c = s.courses.find(item => item.courseName === courseName);
      const total = c.totalMarks || 100;
      const pct = Math.round((c.marksObtained / total) * 100);
      totalScore += pct;
      const g = getGrade(pct).grade;
      if (gradeCounts[g] !== undefined) gradeCounts[g]++;
    });

    const avg = enrolledStudents.length > 0 ? (totalScore / enrolledStudents.length).toFixed(1) : "0.0";
    const iconClass = getCourseIcon(courseName);
    const desc = COURSE_DESCRIPTIONS[courseName] || "Core curriculum subject";

    let themeClass = "course-theme-ai";
    if (courseName === "Web Development") themeClass = "course-theme-web";
    else if (courseName === "Python Programming") themeClass = "course-theme-python";
    else if (courseName === "Data Analytics") themeClass = "course-theme-data";

    return `
      <div class="course-dashboard-card card ${themeClass}" onclick="openCoursePerformance('${escapeHTML(courseName)}')" style="cursor: pointer;" title="Click to view ${escapeHTML(courseName)} students, marks & grades">
        <div class="course-card-top">
          <div class="course-card-icon-wrap">
            <i class="${iconClass}"></i>
          </div>
          <span class="course-card-badge badge badge-primary">
            <i class="fa-solid fa-calculator"></i> Avg: ${avg}%
          </span>
        </div>
        <div class="course-card-info">
          <h4>${escapeHTML(courseName)}</h4>
          <p class="course-card-desc">${desc}</p>
        </div>
        <div class="course-card-metrics">
          <div>
            <span class="course-metric-label">Enrolled Trainees</span>
            <span class="course-metric-val">${enrolledStudents.length} Students</span>
          </div>
          <div>
            <span class="course-metric-label">Course Average</span>
            <span class="course-metric-val" style="color: var(--cyan);">${avg}%</span>
          </div>
        </div>
        <div style="font-size: 0.74rem; color: var(--text-dim); margin-top: 0.5rem; display: flex; gap: 0.4rem; flex-wrap: wrap;">
          <span class="badge badge-purple">A+: ${gradeCounts["A+"]}</span>
          <span class="badge badge-success">A: ${gradeCounts["A"]}</span>
          <span class="badge badge-primary">B: ${gradeCounts["B"]}</span>
          ${(gradeCounts["C"] + gradeCounts["D"] + gradeCounts["F"]) > 0 ? `<span class="badge badge-warning">C/D/F: ${gradeCounts["C"] + gradeCounts["D"] + gradeCounts["F"]}</span>` : ''}
        </div>
        <div class="course-card-footer" style="margin-top: 0.75rem;">
          <span>View Students, Marks & Grades</span>
          <i class="fa-solid fa-arrow-right"></i>
        </div>
      </div>
    `;
  }).join("");

  grid.innerHTML = cardsHtml;
}

// LEVEL 2: Opens dedicated course performance view displaying ONLY that course's students, marks, grades, and average score
function openCoursePerformance(courseName) {
  activeDetailCourse = courseName;
  const mainView = document.getElementById("perfDashboardMain");
  const detailView = document.getElementById("perfCourseDetailView");
  if (mainView && detailView) {
    mainView.style.display = "none";
    detailView.style.display = "block";
  }

  const titleElem = document.getElementById("courseDetailTitle");
  const subtitleElem = document.getElementById("courseDetailSubtitle");
  const iconBoxElem = document.getElementById("courseDetailIconBox");

  if (titleElem) titleElem.textContent = courseName;
  if (subtitleElem) subtitleElem.textContent = `Individual marks, automatic letter grades, and average score for ${courseName}`;
  if (iconBoxElem) {
    iconBoxElem.innerHTML = `<i class="${getCourseIcon(courseName)}" id="courseDetailIcon"></i>`;
  }

  // Calculate course stats
  const enrolledStudents = appState.students.filter(s =>
    s.courses && s.courses.some(c => c.courseName === courseName)
  );

  let totalScore = 0;
  let passCount = 0;

  enrolledStudents.forEach(s => {
    const c = s.courses.find(item => item.courseName === courseName);
    const total = c.totalMarks || 100;
    const pct = (c.marksObtained / total) * 100;
    totalScore += pct;
    if (pct >= 50) passCount++;
  });

  const avg = enrolledStudents.length > 0 ? (totalScore / enrolledStudents.length).toFixed(1) : "0.0";
  const passRate = enrolledStudents.length > 0 ? Math.round((passCount / enrolledStudents.length) * 100) : 0;

  const countElem = document.getElementById("courseDetailEnrolledCount");
  const avgElem = document.getElementById("courseDetailAvgScore");
  const passElem = document.getElementById("courseDetailPassRate");

  if (countElem) countElem.textContent = `${enrolledStudents.length} Students`;
  if (avgElem) avgElem.textContent = `${avg}%`;
  if (passElem) passElem.textContent = `${passRate}%`;

  const searchInput = document.getElementById("courseDetailStudentSearch");
  const statusFilter = document.getElementById("courseDetailStatusFilter");
  if (searchInput) searchInput.value = "";
  if (statusFilter) statusFilter.value = "all";

  renderCourseDetailStudents();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function backToPerformanceDashboard() {
  const mainView = document.getElementById("perfDashboardMain");
  const detailView = document.getElementById("perfCourseDetailView");
  if (mainView && detailView) {
    detailView.style.display = "none";
    mainView.style.display = "block";
  }
  activeDetailCourse = null;
  renderPerformanceSection();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function clearCourseDetailFilters() {
  const searchInput = document.getElementById("courseDetailStudentSearch");
  const statusFilter = document.getElementById("courseDetailStatusFilter");
  if (searchInput) searchInput.value = "";
  if (statusFilter) statusFilter.value = "all";
  renderCourseDetailStudents();
  showToast("Course filters reset.", "info");
}

function handleCourseCardClick(courseName) {
  openCoursePerformance(courseName);
}

// Renders the students inside the dedicated Level 2 view
function renderCourseDetailStudents() {
  const container = document.getElementById("courseStudentsGrid");
  if (!container || !activeDetailCourse) return;

  const searchInput = document.getElementById("courseDetailStudentSearch");
  const statusFilter = document.getElementById("courseDetailStatusFilter");
  const query = (searchInput ? searchInput.value : "").trim().toLowerCase();
  const statusVal = statusFilter ? statusFilter.value : "all";

  let students = appState.students.filter(s =>
    s.courses && s.courses.some(c => c.courseName === activeDetailCourse)
  );

  if (query) {
    students = students.filter(s =>
      s.name.toLowerCase().includes(query) ||
      s.id.toLowerCase().includes(query) ||
      s.batch.toLowerCase().includes(query)
    );
  }

  if (statusVal !== "all") {
    students = students.filter(s => {
      const c = s.courses.find(item => item.courseName === activeDetailCourse);
      const total = c.totalMarks || 100;
      const pct = Math.round((c.marksObtained / total) * 100);
      return getPerformanceStatus(pct).status === statusVal;
    });
  }

  const countBadge = document.getElementById("courseDetailResultsCount");
  if (countBadge) {
    countBadge.textContent = `Showing ${students.length} of ${appState.students.length} Students`;
  }

  if (students.length === 0) {
    container.innerHTML = `
      <div class="perf-empty-state" style="grid-column: 1 / -1; padding: 2.5rem; text-align: center; color: var(--text-dim);">
        <i class="fa-solid fa-user-slash" style="font-size: 2rem; margin-bottom: 0.5rem; display: block; color: var(--text-dim);"></i>
        <h4>No Student Records Found</h4>
        <p>No student in ${escapeHTML(activeDetailCourse)} matches the active filters.</p>
        <button class="btn btn-primary" onclick="clearCourseDetailFilters()">
          <i class="fa-solid fa-arrow-rotate-left"></i> Reset Search & Filters
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = students.map(s => {
    const course = s.courses.find(c => c.courseName === activeDetailCourse);
    const totalMarks = course.totalMarks || 100;
    const marksObtained = course.marksObtained;
    const pct = Math.round((marksObtained / totalMarks) * 100);
    const grade = getGrade(pct);
    const status = getPerformanceStatus(pct);

    return `
      <div class="course-student-card">
        <div class="course-student-header">
          <div class="course-student-info">
            <div class="course-student-avatar">${getInitials(s.name)}</div>
            <div class="course-student-name-box">
              <h4>${escapeHTML(s.name)}</h4>
              <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 0.15rem;">
                <span class="table-code">${escapeHTML(s.id)}</span> • ${escapeHTML(s.batch)}
              </div>
            </div>
          </div>
          <span class="grade-badge ${grade.color}">${grade.label}</span>
        </div>

        <div class="course-marks-spotlight">
          <div class="course-marks-metric-row">
            <span class="course-title-sub">
              <i class="${getCourseIcon(activeDetailCourse)}"></i> ${escapeHTML(activeDetailCourse)} Marks
            </span>
            <div class="marks-data-cluster">
              <span class="num-obtained">${marksObtained}</span>
              <span class="num-separator">/</span>
              <span class="num-total">${totalMarks}</span>
              <span class="num-percent">(${pct}%)</span>
            </div>
          </div>
          <div class="perf-progress-wrap" title="Score: ${pct}%">
            <div class="perf-progress-track">
              <div class="perf-progress-fill ${status.fillClass}" style="width: ${pct}%;"></div>
            </div>
          </div>
        </div>

        <div class="course-student-footer-meta">
          <span class="status-badge ${status.statusClass}">
            <i class="${status.icon}"></i> ${status.status}
          </span>
          <button class="btn btn-sm btn-outline" onclick="openAddMarksModal('${s.id}', '${escapeHTML(activeDetailCourse)}')">
            <i class="fa-solid fa-pen-to-square"></i> Update Marks
          </button>
        </div>
      </div>
    `;
  }).join("");
}

// LEVEL 1: Renders the full Performance Section (KPI Highlights + Course Cards + Directory)
function renderPerformanceSection() {
  renderCourseDashboard();

  const gridContainer = document.getElementById("studentPerformanceGrid");
  if (!gridContainer) return;

  const searchInput = document.getElementById("perfStudentSearch");
  const courseFilter = document.getElementById("perfCourseFilter");
  const statusFilter = document.getElementById("perfStatusFilter");
  const countBadge = document.getElementById("perfResultsCount");

  if (searchInput) perfSearchQuery = searchInput.value.trim().toLowerCase();
  if (courseFilter) perfCourseFilterVal = courseFilter.value;
  if (statusFilter) perfStatusFilterVal = statusFilter.value;

  // Compute KPI summary stats
  const totalStudents = appState.students.length;
  let allPercentages = [];
  let topStudent = null;
  let topStudentAvg = -1;

  appState.students.forEach(s => {
    if (s.courses && s.courses.length > 0) {
      const studentAvg = s.courses.reduce((sum, c) => sum + ((c.marksObtained / (c.totalMarks || 100)) * 100), 0) / s.courses.length;
      allPercentages.push(studentAvg);
      if (studentAvg > topStudentAvg) {
        topStudentAvg = studentAvg;
        topStudent = s;
      }
    }
  });

  const overallAvg = allPercentages.length > 0 ? (allPercentages.reduce((a, b) => a + b, 0) / allPercentages.length).toFixed(1) : "0.0";

  const statStudentsElem = document.getElementById("perfStatTotalStudents");
  const statAvgElem = document.getElementById("perfStatAvgPercentage");
  const statCoursesElem = document.getElementById("perfStatTotalCourses");
  const statTopElem = document.getElementById("perfStatTopPerformer");

  if (statStudentsElem) statStudentsElem.textContent = totalStudents;
  if (statAvgElem) statAvgElem.textContent = `${overallAvg}%`;
  if (statCoursesElem) statCoursesElem.textContent = CORE_COURSES.length;
  if (statTopElem) statTopElem.textContent = topStudent ? `${topStudent.name} (${Math.round(topStudentAvg)}%)` : "--";

  // Filter Students for Level 1 Grid
  const filteredStudents = appState.students.filter(student => {
    if (perfSearchQuery && !student.name.toLowerCase().includes(perfSearchQuery)) {
      return false;
    }

    if (perfCourseFilterVal !== "all") {
      const hasCourse = student.courses && student.courses.some(c => c.courseName === perfCourseFilterVal);
      if (!hasCourse) return false;
    }

    if (perfStatusFilterVal !== "all") {
      const hasStatus = student.courses && student.courses.some(c => {
        const pct = Math.round((c.marksObtained / (c.totalMarks || 100)) * 100);
        return getPerformanceStatus(pct).status === perfStatusFilterVal;
      });
      if (!hasStatus) return false;
    }

    return true;
  });

  if (countBadge) {
    countBadge.textContent = `Showing ${filteredStudents.length} of ${totalStudents} Students`;
  }

  if (filteredStudents.length === 0) {
    gridContainer.innerHTML = `
      <div class="perf-empty-state" style="grid-column: 1 / -1; padding: 2.5rem; text-align: center; color: var(--text-dim);">
        <i class="fa-solid fa-user-slash" style="font-size: 2rem; margin-bottom: 0.5rem; display: block; color: var(--text-dim);"></i>
        <h4>No Student Records Found</h4>
        <p>No student matches the search "${escapeHTML(perfSearchQuery)}" or selected filters.</p>
        <button class="btn btn-primary" onclick="clearPerformanceFilters()">
          <i class="fa-solid fa-arrow-rotate-left"></i> Reset Search & Filters
        </button>
      </div>
    `;
    return;
  }

  // If a specific course filter is selected, prepend a Course Summary Bar
  let courseHeaderHtml = "";
  if (perfCourseFilterVal !== "all") {
    const courseStudents = appState.students.filter(s =>
      s.courses && s.courses.some(c => c.courseName === perfCourseFilterVal)
    );
    let cTotal = 0;
    courseStudents.forEach(s => {
      const c = s.courses.find(item => item.courseName === perfCourseFilterVal);
      cTotal += (c.marksObtained / (c.totalMarks || 100)) * 100;
    });
    const cAvg = courseStudents.length > 0 ? (cTotal / courseStudents.length).toFixed(1) : "0.0";

    courseHeaderHtml = `
      <div class="card" style="grid-column: 1 / -1; margin-bottom: 0.5rem; border-color: var(--border-glow); background: rgba(99, 102, 241, 0.08); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; padding: 1rem 1.25rem;">
        <div style="display: flex; align-items: center; gap: 0.85rem;">
          <i class="${getCourseIcon(perfCourseFilterVal)}" style="font-size: 1.6rem;"></i>
          <div>
            <h4 style="color: #fff; margin: 0; font-size: 1.1rem;">Filtered Course: <strong>${escapeHTML(perfCourseFilterVal)}</strong></h4>
            <span style="font-size: 0.82rem; color: var(--text-muted);">
              Course Average Score: <strong style="color: var(--cyan); font-family: 'JetBrains Mono';">${cAvg}%</strong> • ${courseStudents.length} Students Enrolled
            </span>
          </div>
        </div>
        <button class="btn btn-sm btn-primary" onclick="openCoursePerformance('${escapeHTML(perfCourseFilterVal)}')">
          <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Dedicated Course View
        </button>
      </div>
    `;
  }

  gridContainer.innerHTML = courseHeaderHtml + filteredStudents.map(student => {
    let coursesToRender = student.courses || [];
    if (perfCourseFilterVal !== "all") {
      coursesToRender = coursesToRender.filter(c => c.courseName === perfCourseFilterVal);
    }

    const allStudentCourses = student.courses || [];
    const studentAvgPct = allStudentCourses.length > 0 
      ? Math.round(allStudentCourses.reduce((sum, c) => sum + ((c.marksObtained / (c.totalMarks || 100)) * 100), 0) / allStudentCourses.length)
      : 0;
    
    const initials = getInitials(student.name);

    const coursesHtml = coursesToRender.map(course => {
      const totalMarks = course.totalMarks || 100;
      const marksObtained = course.marksObtained;
      const calculatedPercentage = totalMarks > 0 ? Math.round((marksObtained / totalMarks) * 100) : 0;
      const gradeInfo = getGrade(calculatedPercentage);
      const statusInfo = getPerformanceStatus(calculatedPercentage);
      const courseIcon = getCourseIcon(course.courseName);

      return `
        <div class="course-perf-item">
          <div class="course-perf-main">
            <div class="course-name-col">
              <i class="${courseIcon}"></i>
              <span class="course-title">${escapeHTML(course.courseName)}</span>
              <span class="grade-badge ${gradeInfo.color}" style="margin-left: 0.5rem; font-size: 0.75rem; padding: 0.15rem 0.5rem;">${gradeInfo.label}</span>
            </div>
            <div class="course-marks-col">
              <div class="marks-display" title="Marks Obtained / Total Marks (Percentage)">
                <span class="marks-obtained">${marksObtained}</span>
                <span class="marks-separator">/</span>
                <span class="marks-total">${totalMarks}</span>
                <span class="marks-percentage">(${calculatedPercentage}%)</span>
              </div>
              <span class="status-badge ${statusInfo.statusClass}" title="Status: ${statusInfo.status}">
                <i class="${statusInfo.icon}"></i> ${statusInfo.status}
              </span>
            </div>
          </div>

          <div class="perf-progress-wrap" title="${escapeHTML(course.courseName)}: ${calculatedPercentage}%">
            <div class="perf-progress-track">
              <div class="perf-progress-fill ${statusInfo.fillClass}" style="width: ${calculatedPercentage}%;"></div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="student-perf-card card" id="perf-card-${escapeHTML(student.id)}">
        <div class="student-perf-card-header">
          <div class="student-perf-user-info">
            <div class="student-avatar-badge">${initials}</div>
            <div>
              <div class="student-name-label">
                Student Name: <span class="student-name-val">${escapeHTML(student.name)}</span>
              </div>
              <div class="student-submeta">
                <span class="badge badge-outline"><i class="fa-solid fa-id-card"></i> ${escapeHTML(student.id)}</span>
                <span class="badge badge-outline"><i class="fa-solid fa-layer-group"></i> ${escapeHTML(student.batch)}</span>
                <button class="btn btn-sm btn-ghost" style="padding: 0.1rem 0.4rem; font-size: 0.72rem;" onclick="openAddMarksModal('${student.id}')" title="Add or edit course marks">
                  <i class="fa-solid fa-plus-circle text-purple"></i> Add Marks
                </button>
              </div>
            </div>
          </div>
          <div class="student-overall-summary">
            <div class="overall-badge-pill">
              <span class="overall-label">Courses: <strong>${allStudentCourses.length}</strong></span>
              <span class="overall-avg">Average: <strong>${studentAvgPct}%</strong></span>
            </div>
          </div>
        </div>

        <div class="student-courses-list">
          ${coursesHtml}
        </div>
      </div>
    `;
  }).join('');
}

function clearPerformanceFilters() {
  const searchInput = document.getElementById("perfStudentSearch");
  const courseFilter = document.getElementById("perfCourseFilter");
  const statusFilter = document.getElementById("perfStatusFilter");

  if (searchInput) searchInput.value = "";
  if (courseFilter) courseFilter.value = "all";
  if (statusFilter) statusFilter.value = "all";

  perfSearchQuery = "";
  perfCourseFilterVal = "all";
  perfStatusFilterVal = "all";

  renderPerformanceSection();
  showToast("Performance search and filters reset.", "info");
}

function openAddMarksModal(preselectStudentId, preselectCourseName) {
  const modal = document.getElementById("addMarksModal");
  if (!modal) return;

  const select = document.getElementById("marksStudentSelect");
  if (select) {
    select.innerHTML = '<option value="">-- Choose Student --</option>';
    appState.students.forEach(s => {
      const opt = document.createElement("option");
      opt.value = s.id;
      opt.textContent = `${s.name} (${s.id}) - ${s.batch}`;
      select.appendChild(opt);
    });
    if (preselectStudentId) {
      select.value = preselectStudentId;
    }
  }

  const courseSelect = document.getElementById("marksCourseName");
  if (courseSelect && preselectCourseName) {
    courseSelect.value = preselectCourseName;
  }

  // Pre-fill existing marks if student and course are selected
  if (select && courseSelect && select.value && courseSelect.value) {
    const s = appState.students.find(st => st.id === select.value);
    if (s && s.courses) {
      const c = s.courses.find(item => item.courseName === courseSelect.value);
      if (c) {
        document.getElementById("marksObtained").value = c.marksObtained;
        document.getElementById("marksTotal").value = c.totalMarks || 100;
      }
    }
  }

  updateMarksModalPreview();
  modal.classList.add("active");
}

function updateMarksModalPreview() {
  const obtainedInput = document.getElementById("marksObtained");
  const totalInput = document.getElementById("marksTotal");
  const previewPct = document.getElementById("previewPercentage");
  const previewStatus = document.getElementById("previewStatus");

  if (!obtainedInput || !totalInput || !previewPct || !previewStatus) return;

  const obtained = parseFloat(obtainedInput.value) || 0;
  const total = parseFloat(totalInput.value) || 100;
  const pct = total > 0 ? Math.round((obtained / total) * 100) : 0;
  const gradeInfo = getGrade(pct);
  const statusInfo = getPerformanceStatus(pct);

  previewPct.textContent = `${pct}% (${gradeInfo.grade})`;
  previewStatus.className = `status-badge ${statusInfo.statusClass}`;
  previewStatus.innerHTML = `<i class="${statusInfo.icon}"></i> ${statusInfo.status}`;
}

function handleAddMarksSubmit(e) {
  e.preventDefault();
  const studentId = document.getElementById("marksStudentSelect").value;
  const courseName = document.getElementById("marksCourseName").value.trim();
  const marksObtained = parseInt(document.getElementById("marksObtained").value, 10);
  const marksTotal = parseInt(document.getElementById("marksTotal").value, 10) || 100;

  if (!studentId || !courseName || isNaN(marksObtained)) {
    showToast("Please provide valid student, course, and marks.", "warning");
    return;
  }

  const student = appState.students.find(s => s.id === studentId);
  if (!student) {
    showToast("Selected student record not found.", "error");
    return;
  }

  ensureStudentCourses(student);

  const existingCourse = student.courses.find(c => c.courseName.toLowerCase() === courseName.toLowerCase());
  if (existingCourse) {
    existingCourse.marksObtained = marksObtained;
    existingCourse.totalMarks = marksTotal;
  } else {
    student.courses.push({
      courseName,
      totalMarks: marksTotal,
      marksObtained
    });
  }

  // Recalculate student overall score
  if (student.courses.length > 0) {
    const avgScore = Math.round(
      student.courses.reduce((sum, c) => sum + ((c.marksObtained / (c.totalMarks || 100)) * 100), 0) / student.courses.length
    );
    student.score = avgScore;
    student.riskLevel = calculateStudentRisk(student);
  }

  persistState();
  closeModal("addMarksModal");
  document.getElementById("addMarksForm").reset();

  refreshAllViews();
  if (activeDetailCourse) {
    renderCourseDetailStudents();
  }
  showToast(`Marks recorded for ${student.name}: ${courseName} (${marksObtained}/${marksTotal})!`, "success");
}

// --- View 6: AI Insights & Alerts ---
function renderAiInsights() {
  const critical = appState.students.filter(s => s.riskLevel === "Critical");
  const moderate = appState.students.filter(s => s.riskLevel === "Moderate");

  const flaggedElem = document.getElementById("aiFlaggedCount");
  const modElem = document.getElementById("aiModerateCount");
  if (flaggedElem) flaggedElem.textContent = critical.length;
  if (modElem) modElem.textContent = moderate.length;

  const container = document.getElementById("aiAlertCardsList");
  if (!container) return;

  const flaggedList = [...critical, ...moderate];

  if (flaggedList.length === 0) {
    container.innerHTML = `
      <div style="padding: 2rem; text-align: center; color: var(--text-dim);">
        <i class="fa-solid fa-circle-check text-emerald" style="font-size: 2rem; margin-bottom: 0.5rem; display: block;"></i>
        Excellent! No trainees are currently flagged with critical or moderate dropout warnings.
      </div>
    `;
    return;
  }

  container.innerHTML = flaggedList.map(s => {
    const isCrit = s.riskLevel === "Critical";
    const factors = s.riskFactors && s.riskFactors.length > 0 
      ? s.riskFactors 
      : [`Attendance fallen to ${s.attendance}%`, `Assessment average stands at ${s.score}%`];

    return `
      <div class="ai-risk-card ${isCrit ? '' : 'moderate-card'}">
        <div class="ai-risk-card-top">
          <div class="ai-risk-user">
            <div class="student-avatar-initials">${getInitials(s.name)}</div>
            <div>
              <h4>${escapeHTML(s.name)}</h4>
              <span>${escapeHTML(s.batch)} • Trainer: ${escapeHTML(s.trainer)}</span>
            </div>
          </div>
          <span class="badge ${isCrit ? 'badge-danger blink' : 'badge-warning'}">
            ${isCrit ? '<i class="fa-solid fa-triangle-exclamation"></i> Critical Risk' : 'Moderate Watch'}
          </span>
        </div>

        <div style="display: flex; gap: 1.5rem; margin: 0.6rem 0; font-size: 0.8rem;">
          <div><span style="color: var(--text-dim);">Attendance:</span> <strong style="color: ${isCrit ? 'var(--rose)' : 'var(--amber)'}; font-family: 'JetBrains Mono';">${s.attendance}%</strong></div>
          <div><span style="color: var(--text-dim);">Score Avg:</span> <strong style="color: #fff; font-family: 'JetBrains Mono';">${s.score}%</strong></div>
          <div><span style="color: var(--text-dim);">AI Risk Index:</span> <strong style="color: ${isCrit ? 'var(--rose)' : 'var(--amber)'}; font-family: 'JetBrains Mono';">${isCrit ? '86/100' : '62/100'}</strong></div>
        </div>

        <ul class="ai-risk-factors-list">
          ${factors.slice(0, 3).map(f => `
            <li class="ai-risk-factor-item">
              <i class="fa-solid fa-angle-right"></i> ${escapeHTML(f)}
            </li>
          `).join('')}
        </ul>

        <div class="ai-action-footer">
          <span class="ai-recom-hint">
            <i class="fa-solid fa-robot text-purple"></i> AI Recommended: 1-on-1 Trainer Mentorship
          </span>
          <div style="display: flex; gap: 0.4rem;">
            <button class="btn btn-sm btn-secondary" onclick="sendAiWarningAlert('${s.id}')">
              <i class="fa-solid fa-paper-plane"></i> Send Alert
            </button>
            <button class="btn btn-sm btn-outline" onclick="openStudentModal('${s.id}')">
              Details
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function sendAiWarningAlert(studentId) {
  const student = appState.students.find(s => s.id === studentId);
  if (student) {
    showToast(`AI Warning SMS & Email dispatched to ${student.name} (${student.phone}) and Trainer ${student.trainer}!`, "success");
  }
}

// --- View 7: Reports Generator ---
function renderReports() {
  const reportBatch = document.getElementById("reportBatchSelect")?.value || "all";
  const reportType = document.getElementById("reportTypeSelect")?.value || "comprehensive";
  const tableBody = document.getElementById("reportPreviewTableBody");
  if (!tableBody) return;

  const filtered = reportBatch === "all" 
    ? appState.students 
    : appState.students.filter(s => s.batch === reportBatch);

  const avgAtt = filtered.length > 0 
    ? (filtered.reduce((acc, curr) => acc + Number(curr.attendance || 85), 0) / filtered.length).toFixed(1)
    : "0.0";

  const criticalCount = filtered.filter(s => s.riskLevel === "Critical").length;

  const totalElem = document.getElementById("repTotalStudents");
  const avgAttElem = document.getElementById("repAvgAttendance");
  const atRiskElem = document.getElementById("repAtRiskCount");

  if (totalElem) totalElem.textContent = filtered.length;
  if (avgAttElem) avgAttElem.textContent = avgAtt + "%";
  if (atRiskElem) atRiskElem.textContent = criticalCount;

  const reportTitleElem = document.getElementById("reportDocName");
  if (reportTitleElem) {
    reportTitleElem.textContent = reportType === "comprehensive" 
      ? "Comprehensive Centre Audit" 
      : reportType === "attendance" 
        ? "Attendance Compliance Sheet" 
        : "AI Risk Intervention Sheet";
  }

  tableBody.innerHTML = filtered.map(s => `
    <tr>
      <td><span class="table-code">${escapeHTML(s.id)}</span></td>
      <td><strong>${escapeHTML(s.name)}</strong></td>
      <td>${escapeHTML(s.batch)}</td>
      <td><strong>${s.attendance}%</strong></td>
      <td>${s.score}%</td>
      <td>
        ${s.riskLevel === 'Critical' 
          ? '<span style="color: var(--rose); font-weight: 700;">Critical Risk</span>' 
          : s.riskLevel === 'Moderate' 
            ? '<span style="color: var(--amber); font-weight: 700;">Moderate</span>' 
            : '<span style="color: var(--emerald); font-weight: 700;">Safe</span>'
        }
      </td>
      <td>
        ${s.riskLevel === 'Critical' 
          ? 'Mandatory 1-on-1 lab catchup session' 
          : s.riskLevel === 'Moderate' 
            ? 'Assign self-paced video module' 
            : 'Eligible for Certificate with Distinction'}
      </td>
    </tr>
  `).join('');
}

// ============================================================================
// 5. INTERACTION HANDLERS & MODALS
// ============================================================================

// SPA Navigation Router
function switchView(viewName) {
  appState.currentView = viewName;

  document.querySelectorAll(".nav-link").forEach(link => {
    if (link.getAttribute("data-view") === viewName) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  document.querySelectorAll(".view-section").forEach(sec => {
    sec.classList.remove("active");
  });

  const targetSection = document.getElementById(`view-${viewName}`);
  if (targetSection) {
    targetSection.classList.add("active");
  }

  const notifDropdown = document.getElementById("notificationsDropdown");
  if (notifDropdown) notifDropdown.classList.remove("active");

  const titles = {
    dashboard: "Dashboard Overview",
    students: "Student Management & Registry",
    trainers: "Instructors & Faculty Directory",
    attendance: "Daily Attendance Management",
    analytics: "Centre Performance Analytics",
    insights: "AI Intelligence & Risk Hub",
    reports: "Audit & Compliance Reports"
  };
  const titleElem = document.getElementById("currentViewTitle");
  if (titleElem && titles[viewName]) {
    titleElem.textContent = titles[viewName];
  }

  window.location.hash = viewName;
  closeMobileSidebar();

  if (viewName === "students") renderStudentsTable();
  if (viewName === "trainers") renderTrainers();
  if (viewName === "attendance") renderAttendanceTable();
  if (viewName === "insights") renderAiInsights();
  if (viewName === "reports") renderReports();
  if (viewName === "dashboard") {
    renderDashboard();
    updateChartData();
    if (useNativeCharts) {
      renderNativeCharts();
    } else {
      if (chartInstances.attendanceTrend) chartInstances.attendanceTrend.resize();
      if (chartInstances.batchPerformance) chartInstances.batchPerformance.resize();
    }
  }
  if (viewName === "analytics") {
    renderPerformanceSection();
    if (useNativeCharts) {
      drawNativeComparisonChart();
      drawNativeRiskDoughnut();
      drawNativeRadarChart();
    } else {
      if (chartInstances.analyticsComparison) chartInstances.analyticsComparison.resize();
      if (chartInstances.analyticsRisk) chartInstances.analyticsRisk.resize();
      if (chartInstances.analyticsRadar) chartInstances.analyticsRadar.resize();
    }
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add("active");
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove("active");
}

function openStudentModal(studentId) {
  const student = appState.students.find(s => s.id === studentId);
  if (!student) return;

  const nameElem = document.getElementById("modalStudentName");
  const idElem = document.getElementById("modalStudentId");
  if (nameElem) nameElem.textContent = student.name;
  if (idElem) idElem.textContent = `ID: ${student.id} • ${student.batch}`;

  const body = document.getElementById("modalStudentBody");
  if (body) {
    const courses = student.courses || [];
    body.innerHTML = `
      <div class="diagnostic-hero">
        <div class="diagnostic-avatar-large">${getInitials(student.name)}</div>
        <div class="diagnostic-hero-details">
          <h4>${escapeHTML(student.name)}</h4>
          <p>${escapeHTML(student.email)} • ${escapeHTML(student.phone || '+91 98000 00000')}</p>
          <div style="margin-top: 0.35rem;">
            <span class="pill-badge pill-purple">${escapeHTML(student.batch)}</span>
            <span class="pill-badge pill-cyan">Trainer: ${escapeHTML(student.trainer)}</span>
          </div>
        </div>
      </div>

      <div class="diag-metrics-grid">
        <div class="diag-stat-card">
          <div class="val" style="color: ${student.attendance < 75 ? 'var(--rose)' : 'var(--cyan)'};">${student.attendance}%</div>
          <div class="lbl">Attendance Rate</div>
        </div>
        <div class="diag-stat-card">
          <div class="val" style="color: ${student.score < 70 ? 'var(--rose)' : '#fff'};">${student.score}%</div>
          <div class="lbl">Exam Average</div>
        </div>
        <div class="diag-stat-card">
          <div class="val" style="color: ${student.riskLevel === 'Critical' ? 'var(--rose)' : student.riskLevel === 'Moderate' ? 'var(--amber)' : 'var(--emerald)'};">
            ${student.riskLevel}
          </div>
          <div class="lbl">AI Classification</div>
        </div>
      </div>

      <div class="ai-diagnostic-report-box">
        <h5><i class="fa-solid fa-brain"></i> Apex AI Predictive Diagnostic Summary</h5>
        <p>${escapeHTML(student.notes || 'No academic remarks noted yet.')}</p>
        
        ${student.riskFactors && student.riskFactors.length > 0 ? `
          <div style="margin-top: 0.75rem;">
            <strong style="font-size: 0.78rem; color: #fb7185;">Flagged Risk Indicators:</strong>
            <ul style="margin-left: 1.2rem; font-size: 0.78rem; color: #fca5a5; margin-top: 0.25rem;">
              ${student.riskFactors.map(f => `<li>${escapeHTML(f)}</li>`).join('')}
            </ul>
          </div>
        ` : `
          <div style="margin-top: 0.5rem; font-size: 0.78rem; color: var(--emerald);">
            <i class="fa-solid fa-check-circle"></i> No negative academic warnings flagged by AI. Trainee is on pace for full placement readiness.
          </div>
        `}
      </div>

      <!-- Enrolled Courses Breakdown -->
      <div style="margin-top: 1.2rem;">
        <h5 style="font-size: 0.9rem; color: #fff; margin-bottom: 0.6rem;"><i class="fa-solid fa-graduation-cap text-indigo"></i> Evaluated Course Marks</h5>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.65rem;">
          ${courses.map(c => {
            const pct = Math.round((c.marksObtained / (c.totalMarks || 100)) * 100);
            const g = getGrade(pct);
            return `
              <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); padding: 0.65rem 0.85rem; border-radius: 8px;">
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.78rem; color: var(--text-muted);">
                  <span>${escapeHTML(c.courseName)}</span>
                  <span class="grade-badge ${g.color}" style="font-size: 0.7rem; padding: 0.1rem 0.4rem;">${g.grade}</span>
                </div>
                <div style="font-size: 1.1rem; font-weight: 800; color: #fff; font-family: 'JetBrains Mono'; margin-top: 0.2rem;">
                  ${c.marksObtained} <span style="font-size: 0.75rem; color: var(--text-dim);">/ ${c.totalMarks || 100} (${pct}%)</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  const alertBtn = document.getElementById("modalSendAlertBtn");
  if (alertBtn) {
    alertBtn.onclick = () => {
      sendAiWarningAlert(student.id);
      closeModal("studentDetailsModal");
    };
  }

  openModal("studentDetailsModal");
}

function handleAddStudentSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("newStudentName").value.trim();
  const email = document.getElementById("newStudentEmail").value.trim();
  const batch = document.getElementById("newStudentBatch").value;
  const phone = document.getElementById("newStudentPhone").value.trim() || "+91 98000 00000";
  const attendance = parseInt(document.getElementById("newStudentAttendance").value, 10) || 90;
  const score = parseInt(document.getElementById("newStudentScore").value, 10) || 85;
  const notes = document.getElementById("newStudentNotes").value.trim() || "Enrolled through centre portal.";

  const trainerObj = appState.trainers.find(t => t.batches.includes(batch)) || appState.trainers[0];
  const newId = `STU-${Math.floor(100 + Math.random() * 900)}`;

  const newStudent = {
    id: newId,
    name,
    email,
    phone,
    batch,
    trainer: trainerObj.name,
    attendance,
    score,
    todayAttendance: "present",
    notes,
    consecutiveAbsences: 0,
    riskFactors: []
  };

  newStudent.riskLevel = calculateStudentRisk(newStudent);
  if (newStudent.riskLevel === "Critical") {
    newStudent.riskFactors.push("Initial attendance/score below compliance target.");
  }

  ensureStudentCourses(newStudent);
  appState.students.unshift(newStudent);
  persistState();

  closeModal("addStudentModal");
  document.getElementById("addStudentForm").reset();

  refreshAllViews();
  showToast(`Student ${name} (${newId}) enrolled successfully!`, "success");
}

function handleAddTrainerSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("newTrainerName").value.trim();
  const email = document.getElementById("newTrainerEmail").value.trim();
  const role = document.getElementById("newTrainerRole").value.trim();
  const batch = document.getElementById("newTrainerBatch").value;
  const exp = document.getElementById("newTrainerExp").value.trim() || "8 Years";
  const rating = document.getElementById("newTrainerRating").value || "4.9";

  const newTrainer = {
    id: `TRN-0${appState.trainers.length + 1}`,
    name,
    role,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    batches: [batch],
    experience: exp,
    rating: String(rating),
    studentsCount: appState.students.filter(s => s.batch === batch).length,
    email,
    status: "Active"
  };

  appState.trainers.push(newTrainer);
  persistState();

  closeModal("addTrainerModal");
  document.getElementById("addTrainerForm").reset();

  refreshAllViews();
  showToast(`Faculty instructor ${name} assigned to ${batch}!`, "success");
}

function quickToggleAttendance(studentId) {
  const student = appState.students.find(s => s.id === studentId);
  if (student) {
    student.todayAttendance = student.todayAttendance === "present" ? "absent" : "present";
    if (student.todayAttendance === "absent") {
      student.attendance = Math.max(40, student.attendance - 2);
    } else {
      student.attendance = Math.min(100, student.attendance + 1);
    }
    student.riskLevel = calculateStudentRisk(student);
    persistState();
    renderStudentsTable();
    renderDashboard();
    updateChartData();
    showToast(`${student.name} marked ${student.todayAttendance.toUpperCase()}`, "info");
  }
}

function deleteStudent(studentId) {
  const student = appState.students.find(s => s.id === studentId);
  if (!student) return;

  if (confirm(`Are you sure you want to delete ${student.name} (${student.id}) from the system?`)) {
    appState.students = appState.students.filter(s => s.id !== studentId);
    persistState();
    refreshAllViews();
    showToast(`Student record ${studentId} removed.`, "info");
  }
}

function exportStudentsCSV() {
  const headers = ["Student ID", "Full Name", "Email", "Batch", "Trainer", "Attendance %", "Score %", "AI Risk Level", "AI Fundamentals", "Web Dev", "Python Prog", "Data Analytics"];
  const rows = appState.students.map(s => {
    const cMap = {};
    (s.courses || []).forEach(c => { cMap[c.courseName] = c.marksObtained; });
    return [
      s.id,
      `"${s.name}"`,
      s.email,
      `"${s.batch}"`,
      `"${s.trainer}"`,
      s.attendance,
      s.score,
      s.riskLevel,
      cMap["AI Fundamentals"] || "--",
      cMap["Web Development"] || "--",
      cMap["Python Programming"] || "--",
      cMap["Data Analytics"] || "--"
    ];
  });

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `ApexAI_Student_Directory_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast("Exported student roster as CSV file!", "success");
}

function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;

  const iconClass = type === "success" 
    ? "fa-circle-check" 
    : type === "error" 
      ? "fa-circle-xmark" 
      : type === "warning" 
        ? "fa-triangle-exclamation" 
        : "fa-circle-info";

  toast.innerHTML = `
    <i class="fa-solid ${iconClass} toast-icon"></i>
    <span class="toast-message">${escapeHTML(message)}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("removing");
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

function startLiveClock() {
  const clockElem = document.getElementById("liveClock");
  function update() {
    if (clockElem) {
      const now = new Date();
      clockElem.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
  }
  update();
  setInterval(update, 1000);
}

function refreshAllViews() {
  renderDashboard();
  renderStudentsTable();
  renderTrainers();
  renderAttendanceTable();
  renderPerformanceSection();
  renderAiInsights();
  renderReports();
  updateChartData();
}

function getInitials(name) {
  if (!name) return "AI";
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function escapeHTML(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function closeMobileSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebarOverlay");
  if (sidebar) sidebar.classList.remove("mobile-open");
  if (overlay) overlay.classList.remove("active");
}

// ============================================================================
// 6. INITIALIZATION & EVENT BINDINGS
// ============================================================================

document.addEventListener("DOMContentLoaded", () => {
  try {
    // 1. Initialize State
    initDataState();

    // 2. Start Clocks & Charts
    startLiveClock();
    initCharts();

    // 3. Render Default Dashboard
    refreshAllViews();
  } catch (err) {
    console.error("Initial dashboard render encountered an error:", err);
  }

  // 4. Default Date in Attendance Picker
  const datePicker = document.getElementById("attendanceDatePicker");
  if (datePicker) {
    const today = new Date().toISOString().split("T")[0];
    datePicker.value = today;
  }

  // 5. Navigation Links - Support all [data-view] elements
  document.querySelectorAll("[data-view]").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const view = link.getAttribute("data-view");
      switchView(view);
    });
  });

  // Handle URL Hash if loaded directly with #students, etc.
  const initialHash = window.location.hash.replace("#", "");
  if (initialHash && ["dashboard", "students", "trainers", "attendance", "analytics", "insights", "reports"].includes(initialHash)) {
    switchView(initialHash);
  }

  // 6. Mobile Sidebar Toggles
  const mobileToggleBtn = document.getElementById("mobileToggleBtn");
  const closeSidebarBtn = document.getElementById("closeSidebarBtn");
  const sidebarOverlay = document.getElementById("sidebarOverlay");
  const sidebar = document.getElementById("sidebar");

  if (mobileToggleBtn) {
    mobileToggleBtn.addEventListener("click", () => {
      sidebar.classList.add("mobile-open");
      sidebarOverlay.classList.add("active");
    });
  }

  if (closeSidebarBtn) {
    closeSidebarBtn.addEventListener("click", closeMobileSidebar);
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", closeMobileSidebar);
  }

  // 7. Student Directory Filters
  const searchInput = document.getElementById("studentSearchInput");
  const filterBatch = document.getElementById("filterBatch");
  const filterRisk = document.getElementById("filterRisk");
  const clearFiltersBtn = document.getElementById("clearFiltersBtn");

  if (searchInput) searchInput.addEventListener("input", renderStudentsTable);
  if (filterBatch) filterBatch.addEventListener("change", renderStudentsTable);
  if (filterRisk) filterRisk.addEventListener("change", renderStudentsTable);
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      if (filterBatch) filterBatch.value = "all";
      if (filterRisk) filterRisk.value = "all";
      renderStudentsTable();
      showToast("Filters reset to default view.", "info");
    });
  }

  // Global search input in topbar redirects to student search
  const globalSearch = document.getElementById("globalSearchInput");
  if (globalSearch) {
    globalSearch.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const val = globalSearch.value.trim();
        if (val) {
          switchView("students");
          if (searchInput) {
            searchInput.value = val;
            renderStudentsTable();
          }
        }
      }
    });
  }

  // Ctrl+K Shortcut for Global Search
  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (globalSearch) globalSearch.focus();
    }
  });

  // 8. Add Student & Trainer Modal Triggers
  const openAddStudentModalBtn = document.getElementById("openAddStudentModalBtn");
  const quickAddStudentBtn = document.getElementById("quickAddStudentBtn");
  const addStudentForm = document.getElementById("addStudentForm");

  if (openAddStudentModalBtn) {
    openAddStudentModalBtn.addEventListener("click", () => openModal("addStudentModal"));
  }
  if (quickAddStudentBtn) {
    quickAddStudentBtn.addEventListener("click", () => openModal("addStudentModal"));
  }
  if (addStudentForm) {
    addStudentForm.addEventListener("submit", handleAddStudentSubmit);
  }

  const openAddTrainerModalBtn = document.getElementById("openAddTrainerModalBtn");
  const addTrainerForm = document.getElementById("addTrainerForm");

  if (openAddTrainerModalBtn) {
    openAddTrainerModalBtn.addEventListener("click", () => openModal("addTrainerModal"));
  }
  if (addTrainerForm) {
    addTrainerForm.addEventListener("submit", handleAddTrainerSubmit);
  }

  // 9. Attendance View Controls
  const attendBatchSelect = document.getElementById("attendanceBatchSelect");
  if (attendBatchSelect) {
    attendBatchSelect.addEventListener("change", renderAttendanceTable);
  }

  const markAllPresBtn = document.getElementById("markAllPresentBtn");
  if (markAllPresBtn) {
    markAllPresBtn.addEventListener("click", () => markAllInBatch("present"));
  }

  const markAllAbsBtn = document.getElementById("markAllAbsentBtn");
  if (markAllAbsBtn) {
    markAllAbsBtn.addEventListener("click", () => markAllInBatch("absent"));
  }

  const saveAttendBtn = document.getElementById("saveAttendanceBtn");
  if (saveAttendBtn) {
    saveAttendBtn.addEventListener("click", saveCurrentBatchAttendance);
  }

  // 10. AI Diagnosis Simulation Buttons
  const runAiBtn = document.getElementById("runAiHealthCheckBtn");
  if (runAiBtn) {
    runAiBtn.addEventListener("click", () => {
      runAiBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Running Diagnosis...';
      setTimeout(() => {
        runAiBtn.innerHTML = '<i class="fa-solid fa-bolt"></i> Run AI Diagnosis';
        refreshAllViews();
        showToast("Apex AI diagnosis complete: 26 profiles verified. 3 at-risk alerts active.", "success");
      }, 700);
    });
  }

  const recomputeAiBtn = document.getElementById("recomputeAiBtn");
  if (recomputeAiBtn) {
    recomputeAiBtn.addEventListener("click", () => {
      recomputeAiBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Scanning Neural Weights...';
      setTimeout(() => {
        recomputeAiBtn.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i> Re-scan Student Data';
        renderAiInsights();
        showToast("Neural risk matrix re-computed with latest daily attendance flags!", "success");
      }, 700);
    });
  }

  // 11. Reports Generator
  const reportBatchSelect = document.getElementById("reportBatchSelect");
  const reportTypeSelect = document.getElementById("reportTypeSelect");
  const genReportBtn = document.getElementById("generateReportPreviewBtn");
  const printReportBtn = document.getElementById("printReportBtn");

  if (reportBatchSelect) reportBatchSelect.addEventListener("change", renderReports);
  if (reportTypeSelect) reportTypeSelect.addEventListener("change", renderReports);
  if (genReportBtn) {
    genReportBtn.addEventListener("click", () => {
      renderReports();
      showToast("Report preview generated for target cohort!", "info");
    });
  }
  if (printReportBtn) {
    printReportBtn.addEventListener("click", () => {
      window.print();
    });
  }

  // 12. Export CSV Button
  const exportStudentsBtn = document.getElementById("exportStudentsBtn");
  if (exportStudentsBtn) {
    exportStudentsBtn.addEventListener("click", exportStudentsCSV);
  }

  // 13. Reset Data Button
  const resetBtn = document.getElementById("resetDataBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", resetToDefaultState);
  }

  // 14. Notifications Dropdown Toggle
  const notifBtn = document.getElementById("notificationsBtn");
  const notifDropdown = document.getElementById("notificationsDropdown");
  const notifList = document.getElementById("notificationList");
  const markAllReadBtn = document.getElementById("markAllReadBtn");

  if (notifList) {
    notifList.innerHTML = appState.notifications.map(n => `
      <li class="notification-item ${n.unread ? 'unread' : ''}">
        <div class="notif-icon bg-${n.type === 'danger' ? 'rose' : n.type === 'warning' ? 'indigo' : 'purple'}">
          <i class="fa-solid ${n.icon}"></i>
        </div>
        <div class="notif-body">
          <h5>${escapeHTML(n.title)}</h5>
          <p>${escapeHTML(n.text)}</p>
          <span class="notif-time">${escapeHTML(n.time)}</span>
        </div>
      </li>
    `).join('');
  }

  if (notifBtn && notifDropdown) {
    notifBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      notifDropdown.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
      if (!notifDropdown.contains(e.target) && e.target !== notifBtn) {
        notifDropdown.classList.remove("active");
      }
    });
  }

  if (markAllReadBtn) {
    markAllReadBtn.addEventListener("click", () => {
      const notifBadge = document.getElementById("notifBadge");
      if (notifBadge) notifBadge.style.display = "none";
      document.querySelectorAll(".notification-item").forEach(item => item.classList.remove("unread"));
      showToast("All notifications marked as read.", "info");
    });
  }

  // 15. Timeframe change on dashboard chart
  const timeframeSelect = document.getElementById("chartTimeframeSelect");
  if (timeframeSelect) {
    timeframeSelect.addEventListener("change", () => {
      const mode = timeframeSelect.value;
      if (useNativeCharts) {
        drawNativeAttendanceTrend(mode);
      } else if (chartInstances.attendanceTrend) {
        if (mode === "weekly") {
          chartInstances.attendanceTrend.data.labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Today"];
          chartInstances.attendanceTrend.data.datasets[0].data = [92, 89, 94, 88, 91, 85, 88.5];
        } else {
          chartInstances.attendanceTrend.data.labels = ["Week 1", "Week 2", "Week 3", "Week 4"];
          chartInstances.attendanceTrend.data.datasets[0].data = [86.2, 89.1, 87.8, 88.5];
        }
        chartInstances.attendanceTrend.update();
      }
      showToast(`Attendance chart switched to ${mode} mode.`, "info");
    });
  }

  // 16. Performance Section Listeners
  const perfStudentSearch = document.getElementById("perfStudentSearch");
  const perfCourseFilter = document.getElementById("perfCourseFilter");
  const perfStatusFilter = document.getElementById("perfStatusFilter");
  const clearPerfFiltersBtn = document.getElementById("clearPerfFiltersBtn");

  if (perfStudentSearch) perfStudentSearch.addEventListener("input", renderPerformanceSection);
  if (perfCourseFilter) perfCourseFilter.addEventListener("change", renderPerformanceSection);
  if (perfStatusFilter) perfStatusFilter.addEventListener("change", renderPerformanceSection);
  if (clearPerfFiltersBtn) clearPerfFiltersBtn.addEventListener("click", clearPerformanceFilters);

  // Course Detail View (Level 2) Listeners
  const courseDetailSearch = document.getElementById("courseDetailStudentSearch");
  const courseDetailStatus = document.getElementById("courseDetailStatusFilter");
  if (courseDetailSearch) courseDetailSearch.addEventListener("input", renderCourseDetailStudents);
  if (courseDetailStatus) courseDetailStatus.addEventListener("change", renderCourseDetailStudents);

  const openAddMarksModalBtn = document.getElementById("openAddMarksModalBtn");
  const addMarksForm = document.getElementById("addMarksForm");

  if (openAddMarksModalBtn) {
    openAddMarksModalBtn.addEventListener("click", () => openAddMarksModal());
  }
  if (addMarksForm) {
    addMarksForm.addEventListener("submit", handleAddMarksSubmit);
  }

  const marksObtainedInput = document.getElementById("marksObtained");
  const marksTotalInput = document.getElementById("marksTotal");
  if (marksObtainedInput) marksObtainedInput.addEventListener("input", updateMarksModalPreview);
  if (marksTotalInput) marksTotalInput.addEventListener("input", updateMarksModalPreview);

  const marksCourseSelect = document.getElementById("marksCourseName");
  const marksStudentSelect = document.getElementById("marksStudentSelect");
  if (marksCourseSelect) {
    marksCourseSelect.addEventListener("change", () => {
      if (marksStudentSelect && marksStudentSelect.value) {
        const s = appState.students.find(st => st.id === marksStudentSelect.value);
        if (s && s.courses) {
          const c = s.courses.find(item => item.courseName === marksCourseSelect.value);
          if (c) {
            document.getElementById("marksObtained").value = c.marksObtained;
            document.getElementById("marksTotal").value = c.totalMarks || 100;
            updateMarksModalPreview();
          }
        }
      }
    });
  }

  const refreshAnalyticsBtn = document.getElementById("refreshAnalyticsBtn");
  if (refreshAnalyticsBtn) {
    refreshAnalyticsBtn.addEventListener("click", () => {
      refreshAllViews();
      showToast("Performance and competency metrics refreshed!", "success");
    });
  }

  // 17. Close modals on backdrop click or Escape key
  document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove("active");
      }
    });
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal-backdrop.active").forEach(m => m.classList.remove("active"));
      if (notifDropdown) notifDropdown.classList.remove("active");
    }
  });

  // Window resize handler for native canvas charts
  window.addEventListener("resize", () => {
    if (useNativeCharts) {
      if (appState.currentView === "dashboard") {
        const timeframeSelect = document.getElementById("chartTimeframeSelect");
        drawNativeAttendanceTrend(timeframeSelect ? timeframeSelect.value : "weekly");
        drawNativeBatchPerformance();
      } else if (appState.currentView === "analytics") {
        drawNativeComparisonChart();
        drawNativeRiskDoughnut();
        drawNativeRadarChart();
      }
    }
  });

  // Welcome toast
  setTimeout(() => {
    showToast("ApexAI Monitoring System initialized. All operations active.", "success");
  }, 700);
});

// Expose core controller functions to window scope for inline HTML handlers
window.switchView = switchView;
window.openModal = openModal;
window.closeModal = closeModal;
window.openStudentModal = openStudentModal;
window.setStudentAttendance = setStudentAttendance;
window.quickToggleAttendance = quickToggleAttendance;
window.deleteStudent = deleteStudent;
window.sendAiWarningAlert = sendAiWarningAlert;
window.saveCurrentBatchAttendance = saveCurrentBatchAttendance;
window.filterByTrainerBatch = filterByTrainerBatch;
window.showToast = showToast;
window.markAllInBatch = markAllInBatch;
window.exportStudentsCSV = exportStudentsCSV;
window.resetToDefaultState = resetToDefaultState;
window.openCoursePerformance = openCoursePerformance;
window.backToPerformanceDashboard = backToPerformanceDashboard;
window.clearCourseDetailFilters = clearCourseDetailFilters;
window.handleCourseCardClick = handleCourseCardClick;
window.renderCourseDashboard = renderCourseDashboard;
window.renderPerformanceSection = renderPerformanceSection;
window.clearPerformanceFilters = clearPerformanceFilters;
window.openAddMarksModal = openAddMarksModal;
window.updateMarksModalPreview = updateMarksModalPreview;
