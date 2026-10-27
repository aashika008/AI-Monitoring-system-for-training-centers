# ApexAI - AI Monitoring System for Training Centres

![ApexAI Banner](https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80)

[![GitHub Pages Ready](https://img.shields.io/badge/Deployment-GitHub%20Pages-brightgreen?style=flat-square&logo=github)](https://pages.github.com/)
[![Tech Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20JavaScript%20(ES6+)-blueviolet?style=flat-square)](https://developer.mozilla.org/)
[![UI Style](https://img.shields.io/badge/Theme-Dark%20Blue%20%26%20Purple%20Glassmorphism-6366f1?style=flat-square)](#)
[![Status](https://img.shields.io/badge/Academic%20Project-Final%20Year%20%2F%20Major%20Project-success?style=flat-square)](#)

---

## 📌 Executive Summary

**ApexAI** is an intelligent, real-time web-based monitoring and analytics dashboard tailored specifically for vocational institutes, IT academies, and corporate training centres. 

Traditional training centres face challenges with student dropouts, low attendance, and delayed intervention. ApexAI addresses this by combining **interactive attendance management**, **academic progress tracking**, and **predictive AI risk diagnostics** into a unified, responsive dark-themed interface.

The system automatically detects students falling below attendance compliance thresholds (<75%), evaluates test degradation, and prescribes automated remedial workflows to trainers before students drop out.

---

## 🚀 Key Features

### 1. Modern Dark Blue & Purple Dashboard
- Futuristic deep slate (`#070a13` - `#0f172a`) and electric purple (`#8b5cf6` - `#6366f1`) visual design.
- Glassmorphic panels, glowing interactive states, pulsating AI health pills, and micro-animations.

### 2. High-Level KPI Summary Cards
- **Total Trainees Enrolled**: Dynamic student count across all IT cohorts.
- **Certified Trainers**: Active faculty count and mentor-to-batch ratios.
- **Centre Attendance Rate**: 30-day weighted center average with progress fill.
- **Active Batches / Labs**: Live laboratory tracking and syllabus milestones.

### 3. Sidebar Navigation (SPA Architecture)
Zero-reload, smooth tab switching for:
1. **Dashboard Overview**: Macro statistics, real-time alerts, and active classroom widgets.
2. **Students Directory**: Complete trainee records, risk badges, filters, search, and CSV export.
3. **Trainers**: Faculty profiles, ratings, batch assignments, and contact channels.
4. **Attendance**: Daily interactive roll with one-click **Present / Absent** toggles.
5. **Performance Analytics**: Score comparison charts, risk doughnuts, and radar skill charts.
6. **AI Insights**: Automated low-attendance warnings and actionable remedial proposals.
7. **Reports**: Printable centre audit documents with official institutional formatting.

### 4. Interactive Student Registry & Search
- Live real-time search by Student Name, ID, or Email.
- Cohort filter dropdown (AI & ML, Python Fullstack, Cloud DevOps, Cyber Security).
- AI Risk filter (Safe >= 85%, Moderate 75-84%, Critical < 75%).
- Modal dialog for enrolling new students with instant risk evaluation.
- Individual student diagnostic modal displaying full learning history and AI notes.
- One-click CSV export of student rosters.

### 5. Interactive Attendance Management
- Real-time roll-call table with **Present (Green)** and **Absent (Red)** toggle buttons.
- Single-click bulk actions: **Mark All Present** and **Mark All Absent**.
- Live batch counters updating present, absent, and attendance rates on the fly.
- Commit button that syncs daily records, updates student historical attendance %, and re-evaluates risk flags.

### 6. Dynamic Chart.js Analytics
- **Weekly & Monthly Attendance Trend**: Area chart showing actual attendance vs 85% AI baseline.
- **Batch Performance Comparison**: Bar chart of average scores across technical domains.
- **Theory vs Practical Scores**: Grouped bar chart comparing academic vs laboratory evaluations.
- **Student AI Risk Classification**: Doughnut chart breaking down Safe vs Moderate vs Critical cohorts.
- **Skill Competency Mastery**: Radar chart evaluating code quality, cloud infra, debugging, and labs.

### 7. AI Insights & Risk Diagnostics
- Identifies trainees at immediate risk of dropping out due to low attendance (<75%) or consecutive absences.
- Flagged risk factors breakdown (e.g. *“Missed 3 consecutive weekend labs”*, *“Test 2 score dropped below 65%”*).
- One-click **Dispatch AI Alert** via simulated SMS/Email to both trainee and assigned trainer.
- Actionable AI improvement recommendations:
  - Pacing & schedule optimization.
  - Automatic deployment of async refresher micro-quizzes.
  - Smart peer-tutoring pairing based on high-performer matching.

### 8. LocalStorage Data Persistence
- Student records and attendance modifications automatically persist in the browser's `localStorage`.
- Includes a **Reset Sample Data** button in the sidebar to restore the clean initial state at any time.

### 9. Fully Responsive & Mobile-Friendly
- Dedicated slide-out drawer sidebar for smartphones and tablets with backdrop overlay.
- Horizontally scrollable responsive tables with touch support.
- Adaptive grid layouts supporting laptop, desktop, tablet, and mobile viewports.

---

## 📂 Project Structure

```text
AI monitoring system for training centres/
│
├── index.html        # Semantic HTML5 single-page application structure
├── style.css         # Custom CSS3 dark-theme design, glassmorphism & responsive media queries
├── script.js         # ES6 JavaScript: state, local storage, charts, search, attendance & AI logic
└── README.md         # Academic & technical documentation
```

---

## 💻 How to Preview the Website Locally

You can preview the website using any of the simple methods below:

### Method 1: Direct Browser Launch (Easiest & No Install Needed)
1. Navigate to the project directory in Windows File Explorer:
   ```
   c:\Users\Aasika.DESKTOP-NCHDMQ4\Desktop\AI monitoring system for training centres
   ```
2. Double-click **`index.html`** or right-click `index.html` → **Open with** → **Google Chrome / Microsoft Edge / Firefox**.
3. The dashboard will launch immediately with full functionality!

---

### Method 2: Using VS Code / IDE "Live Server"
1. Open the project folder in **Visual Studio Code** or Antigravity IDE.
2. Install the **Live Server** extension (by *Ritwick Dey*) if not already installed.
3. Right-click on `index.html` and click **"Open with Live Server"**.
4. The dashboard will automatically launch at `http://127.0.0.1:5500`.

---

### Method 3: Using Python Built-in Web Server
If you have Python installed:
1. Open PowerShell or Command Prompt in the project folder:
   ```powershell
   cd "c:\Users\Aasika.DESKTOP-NCHDMQ4\Desktop\AI monitoring system for training centres"
   ```
2. Run:
   ```bash
   python -m http.server 8000
   ```
3. Open your browser and visit: `http://localhost:8000`

---

### Method 4: Using Node.js `npx serve`
If you have Node.js installed:
```bash
npx serve .
```

---



---

## 🧪 Testing Checklist & Verification

| Requirement | Test Scenario | Expected Result | Status |
|---|---|---|---|
| **Theme** | Load webpage | Dark blue/purple theme with glass cards and gradients renders smoothly | ✅ Pass |
| **KPIs** | Check 4 hero cards | Displays 24 students, 6 trainers, 88.5% attendance, 4 batches | ✅ Pass |
| **Navigation** | Click sidebar links | Switches between Dashboard, Students, Trainers, Attendance, Analytics, Insights, Reports without reload | ✅ Pass |
| **Search** | Type "Rohan" in search box | Table dynamically filters to matching student in real-time | ✅ Pass |
| **Filter** | Select "Critical Risk" filter | Displays 3 flagged at-risk trainees | ✅ Pass |
| **Attendance** | Click "Absent" on a student | Button turns red, batch stats update dynamically | ✅ Pass |
| **Attendance Save**| Click "Save Attendance" | Recalculates risk scores, displays confirmation toast | ✅ Pass |
| **Add Student** | Submit "Add Student" modal form | Adds new record to table, increments total counter, stores in localStorage | ✅ Pass |
| **CSV Export** | Click "Export CSV" | Downloads `.csv` file containing trainee roster | ✅ Pass |
| **Charts** | Toggle weekly / monthly | Chart.js instances render and adapt gracefully | ✅ Pass |
| **AI Alerts** | Click "Send Alert" in Insights | Triggers toast confirmation and mentor notice | ✅ Pass |
| **Reports** | Click "Print Report" | Opens native print dialogue with official report stylesheet | ✅ Pass |
| **Responsive** | Resize screen to mobile (<768px) | Hamburger menu appears, sidebar slides in cleanly | ✅ Pass |

---

## 🎓 Academic Viva & College Project Notes

### 1. Problem Statement
Training and vocational development academies experience student dropout rates ranging between 20% and 35%. Most institutions only identify struggling students after they fail end-of-term examinations.

### 2. Proposed Solution
ApexAI introduces **early predictive indicators**:
- Continuous tracking of consecutive unexcused lab absences.
- Automatic correlation between attendance rates and quiz performances.
- Instant AI warning generation to facilitate mentor counseling before dropout occurs.

### 3. Technology Stack Justification
- **HTML5 & CSS3**: High performance, zero dependency bundle size, full browser compatibility, and rich CSS variables for rapid theme styling.
- **JavaScript (ES6+)**: Handles reactive state management, asynchronous UI transitions, simulated predictive models, and browser localStorage persistence.
- **Chart.js CDN**: Lightweight, canvas-rendered responsive charts customized with custom dark-palette aesthetics.
- **Font Awesome 6 & Google Fonts**: Accessible, high-DPI vector icons and professional typographic pairing (Plus Jakarta Sans + JetBrains Mono).

---

## 👨‍💻 Author & Project Credits
- **Project Title:** AI Monitoring System for Training Centres
- **Year:** 2026
- **Architecture:** Client-Side Single Page Application (SPA)
- **License:** Open-source MIT License
