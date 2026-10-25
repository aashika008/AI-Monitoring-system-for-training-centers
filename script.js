/**
 * ApexAI - AI Monitoring System for Training Centres
 * Frontend Logic, State Management, Interactivity & Chart.js Integration
 */

// ============================================================================
// 1. INITIAL SAMPLE DATA GENERATOR (Requirement 8)
// ============================================================================

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
    studentsCount: 6,
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

const DEFAULT_STUDENTS = [
  // AI & Machine Learning Batch
  {
    id: "STU-101",
    name: "Aarav Sharma",
    email: "aarav.sharma@apexai.edu",
    phone: "+91 98201 12345",
    batch: "AI & Machine Learning",
    trainer: "Dr. Vikramaditya Roy",
    attendance: 96,
    score: 94,
    todayAttendance: "present",
    notes: "Outstanding grasp on calculus and linear algebra. High engagement.",
    consecutiveAbsences: 0,
    riskFactors: []
  },
  {
    id: "STU-102",
    name: "Diya Patel",
    email: "diya.patel@apexai.edu",
    phone: "+91 98201 12346",
    batch: "AI & Machine Learning",
    trainer: "Dr. Vikramaditya Roy",
    attendance: 91,
    score: 88,
    todayAttendance: "present",
    notes: "Consistently submits PyTorch assignments early.",
    consecutiveAbsences: 0,
    riskFactors: []
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
    riskFactors: ["Attendance dropped to 72% (<75% critical cutoff)", "Missed 3 consecutive weekend labs", "Test 2 score fell below 65%"]
  },
  {
    id: "STU-104",
    name: "Sanya Verma",
    email: "sanya.verma@apexai.edu",
    phone: "+91 98201 12348",
    batch: "AI & Machine Learning",
    trainer: "Dr. Vikramaditya Roy",
    attendance: 86,
    score: 82,
    todayAttendance: "present",
    notes: "Active participant during code reviews.",
    consecutiveAbsences: 0,
    riskFactors: []
  },
  {
    id: "STU-105",
    name: "Ishaan Gupta",
    email: "ishaan.gupta@apexai.edu",
    phone: "+91 98201 12349",
    batch: "AI & Machine Learning",
    trainer: "Dr. Vikramaditya Roy",
    attendance: 78,
    score: 75,
    todayAttendance: "present",
    notes: "Moderate pace. Requires extra review on vector embeddings.",
    consecutiveAbsences: 1,
    riskFactors: ["Attendance fluctuating between 76-80%", "Assignment 3 submitted 2 days late"]
  },
  {
    id: "STU-106",
    name: "Ananya Iyer",
    email: "ananya.iyer@apexai.edu",
    phone: "+91 98201 12350",
    batch: "AI & Machine Learning",
    trainer: "Dr. Vikramaditya Roy",
    attendance: 94,
    score: 92,
    todayAttendance: "present",
    notes: "Top performer in CNN architecture design.",
    consecutiveAbsences: 0,
    riskFactors: []
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
    riskFactors: ["Attendance fallen to 68% (Extreme Dropout Risk)", "Failed Module 2 Test (58%)", "Zero repository commits in last 10 days"]
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
    riskFactors: []
  },
  {
    id: "STU-203",
    name: "Aditya Joshi",
    email: "aditya.joshi@apexai.edu",
    phone: "+91 98201 22343",
    batch: "Full Stack Python",
    trainer: "Ananya Deshmukh",
    attendance: 88,
    score: 84,
    todayAttendance: "present",
    notes: "Solid understanding of asynchronous Python and SQLAlchemy.",
    consecutiveAbsences: 0,
    riskFactors: []
  },
  {
    id: "STU-204",
    name: "Sneha Sen",
    email: "sneha.sen@apexai.edu",
    phone: "+91 98201 22344",
    batch: "Full Stack Python",
    trainer: "Ananya Deshmukh",
    attendance: 92,
    score: 90,
    todayAttendance: "present",
    notes: "Fast frontend styling with CSS & responsive design.",
    consecutiveAbsences: 0,
    riskFactors: []
  },
  {
    id: "STU-205",
    name: "Vikram Chauhan",
    email: "vikram.c@apexai.edu",
    phone: "+91 98201 22345",
    batch: "Full Stack Python",
    trainer: "Ananya Deshmukh",
    attendance: 80,
    score: 76,
    todayAttendance: "present",
    notes: "Needs clarification on Git merge conflict resolutions.",
    consecutiveAbsences: 1,
    riskFactors: ["Attendance borderline (80%)", "Struggled in recursive function test"]
  },
  {
    id: "STU-206",
    name: "Pooja Hegde",
    email: "pooja.h@apexai.edu",
    phone: "+91 98201 22346",
    batch: "Full Stack Python",
    trainer: "Ananya Deshmukh",
    attendance: 90,
    score: 85,
    todayAttendance: "present",
    notes: "Good progress in React component lifecycle integration.",
    consecutiveAbsences: 0,
    riskFactors: []
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
    riskFactors: []
  },
  {
    id: "STU-302",
    name: "Natasha Roy",
    email: "natasha.roy@apexai.edu",
    phone: "+91 98201 32342",
    batch: "Cloud DevOps & AWS",
    trainer: "Marcus Aurelius Vance",
    attendance: 89,
    score: 87,
    todayAttendance: "present",
    notes: "Strong in Docker multi-stage builds and security linting.",
    consecutiveAbsences: 0,
    riskFactors: []
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
    riskFactors: ["Attendance 71% below safety barrier", "Incomplete Kubernetes deployment capstone", "Risk score 84/100"]
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
    riskFactors: []
  },
  {
    id: "STU-305",
    name: "Arjun Nambiar",
    email: "arjun.n@apexai.edu",
    phone: "+91 98201 32345",
    batch: "Cloud DevOps & AWS",
    trainer: "Marcus Aurelius Vance",
    attendance: 85,
    score: 81,
    todayAttendance: "present",
    notes: "Good progress. Working on Helm charts for stateful workloads.",
    consecutiveAbsences: 0,
    riskFactors: []
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
    riskFactors: []
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
    riskFactors: []
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
    riskFactors: []
  },
  {
    id: "STU-403",
    name: "Devendra Singhania",
    email: "devendra.s@apexai.edu",
    phone: "+91 98201 42343",
    batch: "Cyber Security & SOC",
    trainer: "Zoya Farooqui",
    attendance: 82,
    score: 79,
    todayAttendance: "present",
    notes: "Good progress in SIEM Splunk queries. Needs practice in iptables.",
    consecutiveAbsences: 1,
    riskFactors: ["Missed 2 evening sessions in past fortnight"]
  },
  {
    id: "STU-404",
    name: "Gauri Shankar",
    email: "gauri.s@apexai.edu",
    phone: "+91 98201 42344",
    batch: "Cyber Security & SOC",
    trainer: "Zoya Farooqui",
    attendance: 90,
    score: 86,
    todayAttendance: "present",
    notes: "Active contributor in incident response simulation exercises.",
    consecutiveAbsences: 0,
    riskFactors: []
  },
  {
    id: "STU-405",
    name: "Harshavardhan Rao",
    email: "harsha.rao@apexai.edu",
    phone: "+91 98201 42345",
    batch: "Cyber Security & SOC",
    trainer: "Zoya Farooqui",
    attendance: 87,
    score: 83,
    todayAttendance: "present",
    notes: "Solid analytical capability in malware sandbox analysis.",
    consecutiveAbsences: 0,
    riskFactors: []
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
    riskFactors: []
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
    text: "Apex Neural Model v2.8 re-indexed 24 student activity logs with 98.4% convergence.",
    time: "2 hours ago",
    unread: true
  }
];

// ============================================================================
// 2. APPLICATION STATE & PERSISTENCE
// ============================================================================

const STORAGE_KEY = "APEX_AI_MONITORING_DATA_V1";

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

function initDataState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      appState.students = parsed.students || DEFAULT_STUDENTS;
      appState.trainers = parsed.trainers || DEFAULT_TRAINERS;
      appState.batches = parsed.batches || DEFAULT_BATCHES;
    } catch (e) {
      console.error("Failed to parse saved state, resetting to defaults", e);
      appState.students = JSON.parse(JSON.stringify(DEFAULT_STUDENTS));
    }
  } else {
    appState.students = JSON.parse(JSON.stringify(DEFAULT_STUDENTS));
  }

  // Ensure risk tags and fields exist
  appState.students.forEach(s => {
    s.riskLevel = calculateStudentRisk(s);
    if (!s.riskFactors) s.riskFactors = [];
  });
}

function persistState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    students: appState.students,
    trainers: appState.trainers,
    batches: appState.batches
  }));
}

function resetToDefaultState() {
  if (confirm("Reset all student and attendance records to original sample data?")) {
    localStorage.removeItem(STORAGE_KEY);
    appState.students = JSON.parse(JSON.stringify(DEFAULT_STUDENTS));
    appState.students.forEach(s => s.riskLevel = calculateStudentRisk(s));
    persistState();
    refreshAllViews();
    showToast("Sample data restored successfully!", "success");
  }
}

// ============================================================================
// 3. CHART CONTROLLERS & INSTANCES (Requirement 6)
// ============================================================================

let chartInstances = {};

function initCharts() {
  // Common Chart.js styling
  Chart.defaults.color = "#94a3b8";
  Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";

  // Chart 1: Dashboard Attendance Trend
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
          legend: {
            position: "top",
            labels: { boxWidth: 12, usePointStyle: true }
          },
          tooltip: {
            backgroundColor: "#111827",
            borderColor: "rgba(139, 92, 246, 0.4)",
            borderWidth: 1,
            titleColor: "#fff",
            bodyColor: "#cbd5e1"
          }
        },
        scales: {
          y: {
            min: 60,
            max: 100,
            grid: { color: "rgba(255, 255, 255, 0.05)" },
            ticks: { callback: val => val + "%" }
          },
          x: {
            grid: { color: "rgba(255, 255, 255, 0.05)" }
          }
        }
      }
    });
  }

  // Chart 2: Batch Performance Breakdown (Bar)
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
          legend: { display: false },
          tooltip: {
            backgroundColor: "#111827",
            titleColor: "#fff",
            callbacks: { label: ctx => `Score: ${ctx.raw}%` }
          }
        },
        scales: {
          y: {
            min: 50,
            max: 100,
            grid: { color: "rgba(255, 255, 255, 0.05)" },
            ticks: { callback: val => val + "%" }
          },
          x: {
            grid: { display: false }
          }
        }
      }
    });
  }

  // Chart 3: Performance View (Theory vs Practical Grouped Bar)
  const ctxComp = document.getElementById("analyticsComparisonChart");
  if (ctxComp) {
    chartInstances.analyticsComparison = new Chart(ctxComp, {
      type: "bar",
      data: {
        labels: ["AI & ML", "Python FS", "Cloud DevOps", "Cyber Security"],
        datasets: [
          {
            label: "Theory Exams",
            data: [84, 82, 86, 89],
            backgroundColor: "rgba(99, 102, 241, 0.75)",
            borderRadius: 6
          },
          {
            label: "Hands-on Practical Labs",
            data: [89, 85, 91, 92],
            backgroundColor: "rgba(139, 92, 246, 0.75)",
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "top", labels: { boxWidth: 12 } }
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

  // Chart 4: Risk Distribution Doughnut
  const ctxRisk = document.getElementById("analyticsRiskDoughnutChart");
  if (ctxRisk) {
    chartInstances.analyticsRisk = new Chart(ctxRisk, {
      type: "doughnut",
      data: {
        labels: ["Safe (>85%)", "Moderate (75-84%)", "Critical (<75%)"],
        datasets: [
          {
            data: [18, 3, 3],
            backgroundColor: [
              "#10b981", // Emerald
              "#f59e0b", // Amber
              "#f43f5e"  // Rose
            ],
            borderColor: "#0b101f",
            borderWidth: 3,
            hoverOffset: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom", labels: { boxWidth: 12, padding: 15 } }
        },
        cutout: "68%"
      }
    });
  }

  // Chart 5: Skill Mastery Radar Chart
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
        plugins: {
          legend: { position: "top", labels: { boxWidth: 12 } }
        }
      }
    });
  }
}

function updateChartData() {
  if (!chartInstances.batchPerformance) return;

  // Compute batch scores dynamically from current students
  const batchAverages = {};
  DEFAULT_BATCHES.forEach(b => {
    const studentsInBatch = appState.students.filter(s => s.batch === b.name);
    const avg = studentsInBatch.length > 0 
      ? (studentsInBatch.reduce((acc, curr) => acc + Number(curr.score), 0) / studentsInBatch.length).toFixed(1)
      : 80;
    batchAverages[b.name] = Number(avg);
  });

  chartInstances.batchPerformance.data.datasets[0].data = [
    batchAverages["AI & Machine Learning"] || 85,
    batchAverages["Full Stack Python"] || 82,
    batchAverages["Cloud DevOps & AWS"] || 88,
    batchAverages["Cyber Security & SOC"] || 90
  ];
  chartInstances.batchPerformance.update();

  // Update Risk Doughnut
  if (chartInstances.analyticsRisk) {
    const safeCount = appState.students.filter(s => s.riskLevel === "Safe").length;
    const moderateCount = appState.students.filter(s => s.riskLevel === "Moderate").length;
    const criticalCount = appState.students.filter(s => s.riskLevel === "Critical").length;

    chartInstances.analyticsRisk.data.datasets[0].data = [safeCount, moderateCount, criticalCount];
    chartInstances.analyticsRisk.update();
  }
}

// ============================================================================
// 4. VIEW RENDERING & LOGIC
// ============================================================================

// --- View 1: Dashboard Overview ---
function renderDashboard() {
  const totalStudents = appState.students.length;
  const totalTrainers = appState.trainers.length;
  const activeBatches = appState.batches.length;

  const avgAttendance = totalStudents > 0
    ? (appState.students.reduce((acc, curr) => acc + Number(curr.attendance), 0) / totalStudents).toFixed(1)
    : "0.0";

  // Update Hero Metric Cards (Req 2)
  document.getElementById("kpiTotalStudents").textContent = totalStudents;
  document.getElementById("sidebarStudentCount").textContent = totalStudents;
  document.getElementById("kpiTotalTrainers").textContent = totalTrainers;
  document.getElementById("sidebarTrainerCount").textContent = totalTrainers;
  document.getElementById("kpiAttendanceRate").textContent = avgAttendance + "%";
  document.getElementById("kpiAttendanceBar").style.width = avgAttendance + "%";
  document.getElementById("kpiActiveBatches").textContent = activeBatches;

  // AI High-Risk Watchlist Widget
  const criticalStudents = appState.students.filter(s => s.riskLevel === "Critical");
  const moderateStudents = appState.students.filter(s => s.riskLevel === "Moderate");
  const totalAtRisk = criticalStudents.length + moderateStudents.length;

  // Update Badge in sidebar & Alert Banner
  document.getElementById("sidebarAlertCount").textContent = criticalStudents.length;
  const aiBanner = document.getElementById("dashboardAiBanner");
  if (criticalStudents.length > 0) {
    aiBanner.style.display = "flex";
    document.getElementById("bannerAlertTitle").textContent = 
      `${criticalStudents.length} Students Identified as At-Risk of Dropping Out`;
    document.getElementById("bannerAlertSubtitle").textContent = 
      `Apex AI detected abnormal attendance drops (<75%) and lagging test performance in ${criticalStudents.map(s => s.batch.split(' ')[0]).filter((v, i, a) => a.indexOf(v) === i).join(', ')} batches.`;
  } else {
    aiBanner.style.display = "none";
  }

  // Populate Dashboard Watchlist
  const watchlistContainer = document.getElementById("dashboardRiskWatchlist");
  if (watchlistContainer) {
    if (criticalStudents.length === 0) {
      watchlistContainer.innerHTML = `
        <div class="empty-state-notice" style="padding: 1.5rem; text-align: center; color: var(--text-dim);">
          <i class="fa-solid fa-circle-check text-emerald" style="font-size: 1.8rem; margin-bottom: 0.5rem; display: block;"></i>
          All enrolled students currently meet attendance and progress thresholds!
        </div>
      `;
    } else {
      watchlistContainer.innerHTML = criticalStudents.slice(0, 4).map(s => `
        <div class="watchlist-item">
          <div class="watchlist-profile">
            <div class="student-avatar-initials">${getInitials(s.name)}</div>
            <div>
              <div class="watchlist-name">${escapeHTML(s.name)}</div>
              <div class="watchlist-batch">${escapeHTML(s.batch)} • Trainer: ${escapeHTML(s.trainer.split(' ')[1] || s.trainer)}</div>
            </div>
          </div>
          <div class="watchlist-metrics">
            <div class="watchlist-metric-val">${s.attendance}% Attn</div>
            <div class="watchlist-metric-lbl">Score: ${s.score}% • Critical</div>
          </div>
          <button class="btn btn-sm btn-secondary" onclick="openStudentModal('${s.id}')">
            <i class="fa-solid fa-eye"></i> Profile
          </button>
        </div>
      `).join('');
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
          <span style="color: var(--cyan);">${b.progress}% Syllabus Complete</span>
        </div>
      </div>
    `).join('');
  }
}

// --- View 2: Students Directory (Requirement 4) ---
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

  document.getElementById("studentTableCount").textContent = 
    `Showing ${filtered.length} of ${appState.students.length} trainees`;

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
            <button class="action-icon-btn" title="View AI Profile" onclick="openStudentModal('${student.id}')">
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

// --- View 4: Attendance Management (Requirement 5) ---
function renderAttendanceTable() {
  const targetBatch = document.getElementById("attendanceBatchSelect")?.value || "AI & Machine Learning";
  const tbody = document.getElementById("attendanceTableBody");
  if (!tbody) return;

  const batchStudents = appState.students.filter(s => s.batch === targetBatch);

  // Compute stats for current batch
  const total = batchStudents.length;
  const presentCount = batchStudents.filter(s => s.todayAttendance === "present").length;
  const absentCount = total - presentCount;
  const rate = total > 0 ? ((presentCount / total) * 100).toFixed(0) : 0;

  document.getElementById("attendStatTotal").textContent = total;
  document.getElementById("attendStatPresent").textContent = presentCount;
  document.getElementById("attendStatAbsent").textContent = absentCount;
  document.getElementById("attendStatRate").textContent = rate + "%";

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
          <!-- Requirement 5: Interactive Present and Absent options -->
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
  const topic = document.getElementById("attendanceSessionTopic").value || "Practical Lab";

  // Re-evaluate attendance % and risk adjustments dynamically
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

// --- View 6: AI Insights & Alerts (Requirement 7) ---
function renderAiInsights() {
  const critical = appState.students.filter(s => s.riskLevel === "Critical");
  const moderate = appState.students.filter(s => s.riskLevel === "Moderate");

  document.getElementById("aiFlaggedCount").textContent = critical.length;
  document.getElementById("aiModerateCount").textContent = moderate.length;

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
    ? (filtered.reduce((acc, curr) => acc + Number(curr.attendance), 0) / filtered.length).toFixed(1)
    : "0.0";

  const criticalCount = filtered.filter(s => s.riskLevel === "Critical").length;

  document.getElementById("repTotalStudents").textContent = filtered.length;
  document.getElementById("repAvgAttendance").textContent = avgAtt + "%";
  document.getElementById("repAtRiskCount").textContent = criticalCount;

  // Title update
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

  // Update Nav Links
  document.querySelectorAll(".nav-link").forEach(link => {
    if (link.getAttribute("data-view") === viewName) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Switch Sections
  document.querySelectorAll(".view-section").forEach(sec => {
    sec.classList.remove("active");
  });

  const targetSection = document.getElementById(`view-${viewName}`);
  if (targetSection) {
    targetSection.classList.add("active");
  }

  // Close notifications dropdown if open
  const notifDropdown = document.getElementById("notificationsDropdown");
  if (notifDropdown) notifDropdown.classList.remove("active");

  // Update Breadcrumb
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

  // Update URL hash smoothly
  window.location.hash = viewName;

  // Close Mobile Sidebar if opened
  closeMobileSidebar();

  // Trigger relevant renders & resize active charts
  if (viewName === "students") renderStudentsTable();
  if (viewName === "trainers") renderTrainers();
  if (viewName === "attendance") renderAttendanceTable();
  if (viewName === "insights") renderAiInsights();
  if (viewName === "reports") renderReports();
  if (viewName === "dashboard") {
    renderDashboard();
    updateChartData();
    if (chartInstances.attendanceTrend) chartInstances.attendanceTrend.resize();
    if (chartInstances.batchPerformance) chartInstances.batchPerformance.resize();
  }
  if (viewName === "analytics") {
    if (chartInstances.analyticsComparison) chartInstances.analyticsComparison.resize();
    if (chartInstances.analyticsRisk) chartInstances.analyticsRisk.resize();
    if (chartInstances.analyticsRadar) chartInstances.analyticsRadar.resize();
  }

  // Scroll to top of content
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Modal Controllers
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add("active");
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove("active");
}

// Student Details Modal (Profile + AI Diagnostic)
function openStudentModal(studentId) {
  const student = appState.students.find(s => s.id === studentId);
  if (!student) return;

  document.getElementById("modalStudentName").textContent = student.name;
  document.getElementById("modalStudentId").textContent = `ID: ${student.id} • ${student.batch}`;

  const body = document.getElementById("modalStudentBody");
  if (body) {
    body.innerHTML = `
      <div class="diagnostic-hero">
        <div class="diagnostic-avatar-large">${getInitials(student.name)}</div>
        <div class="diagnostic-hero-details">
          <h4>${escapeHTML(student.name)}</h4>
          <p>${escapeHTML(student.email)} • ${escapeHTML(student.phone || 'Phone verified')}</p>
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
    `;
  }

  // Bind Alert button
  const alertBtn = document.getElementById("modalSendAlertBtn");
  if (alertBtn) {
    alertBtn.onclick = () => {
      sendAiWarningAlert(student.id);
      closeModal("studentDetailsModal");
    };
  }

  openModal("studentDetailsModal");
}

// Add New Student Handler (Requirement 4)
function handleAddStudentSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("newStudentName").value.trim();
  const email = document.getElementById("newStudentEmail").value.trim();
  const batch = document.getElementById("newStudentBatch").value;
  const phone = document.getElementById("newStudentPhone").value.trim() || "+91 98000 00000";
  const attendance = parseInt(document.getElementById("newStudentAttendance").value) || 90;
  const score = parseInt(document.getElementById("newStudentScore").value) || 85;
  const notes = document.getElementById("newStudentNotes").value.trim() || "Enrolled through centre online portal.";

  // Find trainer assigned to this batch
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

  appState.students.unshift(newStudent);
  persistState();

  closeModal("addStudentModal");
  document.getElementById("addStudentForm").reset();

  refreshAllViews();
  showToast(`Student ${name} (${newId}) enrolled successfully!`, "success");
}

// Add New Trainer Handler
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

// Quick Attendance Toggle in Student Table
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

// Delete Student
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

// Export Students to CSV (Requirement 4)
function exportStudentsCSV() {
  const headers = ["Student ID", "Full Name", "Email", "Batch", "Trainer", "Attendance %", "Score %", "AI Risk Level"];
  const rows = appState.students.map(s => [
    s.id,
    `"${s.name}"`,
    s.email,
    `"${s.batch}"`,
    `"${s.trainer}"`,
    s.attendance,
    s.score,
    s.riskLevel
  ]);

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

// Toast Notification System
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

// Live Clock in Topbar
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

// Refresh all views
function refreshAllViews() {
  renderDashboard();
  renderStudentsTable();
  renderTrainers();
  renderAttendanceTable();
  renderAiInsights();
  renderReports();
  updateChartData();
}

// Helpers
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
  // 1. Initialize State
  initDataState();

  // 2. Start Clocks & Charts
  startLiveClock();
  initCharts();

  // 3. Render Default Dashboard
  refreshAllViews();

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

  // 9. Attendance View Controls (Requirement 5)
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
        showToast("Apex AI diagnosis complete: 24 profiles verified. 3 at-risk alerts active.", "success");
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
  if (timeframeSelect && chartInstances.attendanceTrend) {
    timeframeSelect.addEventListener("change", () => {
      const mode = timeframeSelect.value;
      if (mode === "weekly") {
        chartInstances.attendanceTrend.data.labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Today"];
        chartInstances.attendanceTrend.data.datasets[0].data = [92, 89, 94, 88, 91, 85, 88.5];
      } else {
        chartInstances.attendanceTrend.data.labels = ["Week 1", "Week 2", "Week 3", "Week 4"];
        chartInstances.attendanceTrend.data.datasets[0].data = [86.2, 89.1, 87.8, 88.5];
      }
      chartInstances.attendanceTrend.update();
      showToast(`Attendance chart switched to ${mode} mode.`, "info");
    });
  }

  // 16. Refresh analytics button
  const refreshAnalyticsBtn = document.getElementById("refreshAnalyticsBtn");
  if (refreshAnalyticsBtn) {
    refreshAnalyticsBtn.addEventListener("click", () => {
      updateChartData();
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

  // Initial welcome toast
  setTimeout(() => {
    showToast("ApexAI Monitoring System initialized. All services operational.", "success");
  }, 800);
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
window.saveCurrentBatchAttendance = saveCurrentBatchAttendance;
