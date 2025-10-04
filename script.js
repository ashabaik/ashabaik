// Main Application Logic with Complete Features
class PhysicsAcademyApp {
    constructor() {
        this.currentUser = null;
        this.evaluationScores = this.loadEvaluationScores();
        this.dailySubmissions = this.loadDailySubmissions();
        this.personalTasks = this.loadPersonalTasks();
        this.init();
    }

    init() {
        // Hide all screens initially
        document.getElementById('userTypeScreen').style.display = 'none';
        document.getElementById('teacherLoginScreen').style.display = 'none';
        document.getElementById('studentLoginScreen').style.display = 'none';
        document.getElementById('mainScreen').style.display = 'none';
        
        this.setupEventListeners();
        this.setCurrentDate();
        this.checkAuthStatus();
    }

    checkAuthStatus() {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            try {
                this.currentUser = JSON.parse(savedUser);
                // User is logged in, show main screen
                this.showMainScreen();
            } catch (e) {
                console.error('Error loading user:', e);
                localStorage.removeItem('currentUser');
                this.showUserTypeScreenInitial();
            }
        } else {
            this.showUserTypeScreenInitial();
        }
    }

    showUserTypeScreenInitial() {
        document.getElementById('userTypeScreen').style.display = 'flex';
        document.getElementById('userTypeScreen').classList.add('active');
    }

    setupEventListeners() {
        // Teacher Login
        document.getElementById('teacherLoginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleTeacherLogin();
        });

        // Logout
        document.getElementById('logoutBtn').addEventListener('click', () => {
            this.handleLogout();
        });

        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = e.target.closest('.nav-btn').dataset.section;
                this.showSection(section);
            });
        });

        // Daily Work Form
        document.getElementById('dailyWorkForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleDailyWorkSubmission();
        });

        document.getElementById('workType').addEventListener('change', (e) => {
            this.toggleLocationField(e.target.value);
        });

        // Manager Controls
        document.getElementById('saveEvalBtn')?.addEventListener('click', () => {
            this.saveAllEvaluations();
        });
        
        document.getElementById('exportEvalBtn')?.addEventListener('click', () => {
            this.exportEvaluations();
        });

        document.getElementById('exportExcelBtn')?.addEventListener('click', () => {
            this.exportToExcel();
        });

        document.getElementById('printReportBtn')?.addEventListener('click', () => {
            window.print();
        });

        document.getElementById('generateReportBtn')?.addEventListener('click', () => {
            this.generateMonthlyReport();
        });

        document.getElementById('createScheduleBtn')?.addEventListener('click', () => {
            this.createWeeklySchedule();
        });

        document.getElementById('createTaskBtn')?.addEventListener('click', () => {
            this.showTaskModal();
        });

        document.getElementById('taskForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.assignTask();
        });

        // Modals
        document.querySelector('.close').addEventListener('click', () => {
            this.closeModal();
        });

        document.querySelector('.close-task')?.addEventListener('click', () => {
            this.closeTaskModal();
        });

        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
        });
    }

    setCurrentDate() {
        const today = new Date();
        const dateString = today.toISOString().split('T')[0];
        
        // Set work date picker
        const workDateInput = document.getElementById('workDate');
        if (workDateInput) {
            const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
            const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            
            workDateInput.min = firstDay.toISOString().split('T')[0];
            workDateInput.max = lastDay.toISOString().split('T')[0];
            workDateInput.value = dateString;
        }
        
        const formDate = document.getElementById('formDate');
        if (formDate) {
            formDate.textContent = today.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }

        const reportMonth = document.getElementById('reportMonth');
        if (reportMonth) {
            reportMonth.value = dateString.substring(0, 7);
        }

        const scheduleWeek = document.getElementById('scheduleWeek');
        if (scheduleWeek) {
            const year = today.getFullYear();
            const week = this.getWeekNumber(today);
            scheduleWeek.value = `${year}-W${week.toString().padStart(2, '0')}`;
        }
    }

    getWeekNumber(date) {
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    }

    handleTeacherLogin() {
        const username = document.getElementById('teacherUsername').value.trim();
        const password = document.getElementById('teacherPassword').value.trim();

        const user = validateLogin(username, password);
        
        if (user) {
            this.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            setTimeout(() => {
                this.showMainScreen();
                this.showMessage('Login successful!', 'success');
            }, 100);
        } else {
            this.showMessage('Invalid username or password!', 'error');
        }
    }

    handleLogout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        
        // Hide main screen
        document.getElementById('mainScreen').style.display = 'none';
        document.getElementById('mainScreen').classList.remove('active');
        
        // Show user type screen
        document.getElementById('userTypeScreen').style.display = 'flex';
        document.getElementById('userTypeScreen').classList.add('active');
        
        this.showMessage('Logged out successfully!', 'success');
    }

    showMainScreen() {
        document.getElementById('teacherLoginScreen').style.display = 'none';
        document.getElementById('mainScreen').style.display = 'block';
        document.getElementById('mainScreen').classList.add('active');
        
        document.getElementById('welcomeText').textContent = `Welcome, ${this.currentUser.fullName}`;
        document.getElementById('formTeacherName').textContent = this.currentUser.fullName;
        
        if (this.currentUser.role === 'manager') {
            document.querySelectorAll('.manager-only').forEach(el => {
                el.classList.add('show');
            });
        }
        
        this.showSection('home');
        this.loadTeacherTree();
        this.loadDashboard();
        this.loadEvaluationTable();
        this.loadSubmissionHistory();
        this.loadPersonalTasksList();
    }

    showSection(sectionName) {
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        document.getElementById(sectionName).classList.add('active');
        document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');
    }

    loadTeacherTree() {
        const seniorGrid = document.getElementById('seniorSupervisorGrid');
        const supervisorGrid = document.getElementById('supervisorGrid');
        const leaderGrid = document.getElementById('leaderGrid');
        const juniorGrid = document.getElementById('juniorGrid');
        
        seniorGrid.innerHTML = '';
        supervisorGrid.innerHTML = '';
        leaderGrid.innerHTML = '';
        juniorGrid.innerHTML = '';
        
        getTeachersByTier(2).forEach(teacher => {
            seniorGrid.appendChild(this.createTeacherCard(teacher));
        });
        
        getTeachersByTier(3).forEach(teacher => {
            supervisorGrid.appendChild(this.createTeacherCard(teacher));
        });
        
        getTeachersByTier(4).forEach(teacher => {
            leaderGrid.appendChild(this.createTeacherCard(teacher));
        });
        
        getTeachersByTier(5).forEach(teacher => {
            juniorGrid.appendChild(this.createTeacherCard(teacher));
        });
    }

    createTeacherCard(teacher) {
        const card = document.createElement('div');
        card.className = 'teacher-card';
        card.addEventListener('click', () => this.showTeacherModal(teacher));
        
        const isFemale = teacher.fullName.toLowerCase().includes('ms.') || 
                         teacher.fullName.includes('Yousra') || 
                         teacher.fullName.includes('Aya');
        const placeholder = isFemale ? 'placeholder-female.png' : 'placeholder-male.png';
        
        card.innerHTML = `
            <img src="images/${teacher.photo}" alt="${teacher.fullName}" 
                 class="teacher-avatar" onerror="this.src='images/${placeholder}'">
            <h5>${teacher.fullName}</h5>
            <p class="teacher-role">${teacher.type}</p>
        `;
        
        return card;
    }

    showTeacherModal(teacher) {
        const modal = document.getElementById('teacherModal');
        const modalContent = document.getElementById('modalContent');
        
        const isFemale = teacher.fullName.toLowerCase().includes('ms.') || 
                         teacher.fullName.includes('Yousra') || 
                         teacher.fullName.includes('Aya');
        const placeholder = isFemale ? 'placeholder-female.png' : 'placeholder-male.png';
        
        modalContent.innerHTML = `
            <div class="modal-teacher-profile">
                <img src="images/${teacher.photo}" alt="${teacher.fullName}" 
                     class="modal-teacher-photo" onerror="this.src='images/${placeholder}'">
                <h3 class="modal-teacher-name">${teacher.fullName}</h3>
                <p class="modal-teacher-role">${teacher.type}</p>
                
                <div class="modal-teacher-details">
                    ${teacher.education ? `<div class="modal-detail-item">
                        <span class="modal-detail-label">Education:</span>
                        <span class="modal-detail-value">${teacher.education}</span>
                    </div>` : ''}
                    
                    ${teacher.experience ? `<div class="modal-detail-item">
                        <span class="modal-detail-label">Experience:</span>
                        <span class="modal-detail-value">${teacher.experience}</span>
                    </div>` : ''}
                    
                    ${teacher.specializations ? `<div class="modal-detail-item">
                        <span class="modal-detail-label">Specializations:</span>
                        <span class="modal-detail-value">${teacher.specializations.join(', ')}</span>
                    </div>` : ''}
                    
                    ${teacher.additionalQualifications ? `<div class="modal-detail-item">
                        <span class="modal-detail-label">Additional Qualifications:</span>
                        <span class="modal-detail-value">${teacher.additionalQualifications.join(', ')}</span>
                    </div>` : ''}
                </div>
            </div>
        `;
        
        modal.style.display = 'block';
    }

    closeModal() {
        document.getElementById('teacherModal').style.display = 'none';
    }

    loadDashboard() {
        this.loadTopThreeTeachers();
        this.loadPersonalAnalytics();
    }

    loadTopThreeTeachers() {
        const topThreeList = document.getElementById('topThreeList');
        if (!topThreeList) return;
        
        const allTeachers = getAllTeachers();
        const rankings = allTeachers
            .map(teacher => ({
                ...teacher,
                score: this.calculateTotalScore(this.evaluationScores[teacher.fullName] || {})
            }))
            .sort((a, b) => b.score - a.score)
            .slice(0, 3);
        
        topThreeList.innerHTML = rankings.map((teacher, index) => {
            const rankClass = index === 0 ? 'rank-1' : index === 1 ? 'rank-2' : 'rank-3';
            const isFemale = teacher.fullName.toLowerCase().includes('ms.') || 
                             teacher.fullName.includes('Yousra') || 
                             teacher.fullName.includes('Aya');
            const placeholder = isFemale ? 'placeholder-female.png' : 'placeholder-male.png';
            
            return `
                <div class="top-performer-card ${rankClass}">
                    <div class="rank-badge">#${index + 1}</div>
                    <img src="images/${teacher.photo}" alt="${teacher.fullName}" 
                         class="top-performer-photo" onerror="this.src='images/${placeholder}'">
                    <h5>${teacher.fullName}</h5>
                    <p>${teacher.type}</p>
                    <div class="top-performer-score">${teacher.score.toFixed(2)}/10</div>
                    <span class="grade ${this.getGrade(teacher.score).className}">${this.getGrade(teacher.score).grade}</span>
                </div>
            `;
        }).join('');
    }

    loadPersonalAnalytics() {
        const personalStats = document.getElementById('personalStats');
        if (!personalStats) return;
        
        const myScores = this.evaluationScores[this.currentUser.fullName] || {};
        const myTotal = this.calculateTotalScore(myScores);
        const myGrade = this.getGrade(myTotal);
        
        const mySubmissions = Object.values(this.dailySubmissions)
            .filter(sub => sub.teacher === this.currentUser.fullName);
        
        const thisMonthSubmissions = mySubmissions.filter(sub => {
            const subDate = new Date(sub.date);
            const now = new Date();
            return subDate.getMonth() === now.getMonth() && 
                   subDate.getFullYear() === now.getFullYear();
        });
        
        personalStats.innerHTML = `
            <div class="stat-card">
                <i class="fas fa-star" style="font-size: 2em; color: #f1c40f;"></i>
                <div class="stat-value">${myTotal.toFixed(2)}</div>
                <div class="stat-label">My Score</div>
            </div>
            <div class="stat-card">
                <i class="fas fa-award" style="font-size: 2em; color: #3498db;"></i>
                <div class="stat-value">${myGrade.grade}</div>
                <div class="stat-label">My Grade</div>
            </div>
            <div class="stat-card">
                <i class="fas fa-clipboard-check" style="font-size: 2em; color: #27ae60;"></i>
                <div class="stat-value">${thisMonthSubmissions.length}</div>
                <div class="stat-label">Submissions This Month</div>
            </div>
        `;
    }

    toggleLocationField(workType) {
        const locationGroup = document.getElementById('locationGroup');
        const locationInput = document.getElementById('location');
        
        if (workType === 'Day off' || workType === 'Annual leave' || workType === 'UPL') {
            locationGroup.style.display = 'none';
            locationInput.required = false;
        } else {
            locationGroup.style.display = 'block';
            locationInput.required = workType === 'Center';
        }
    }

    handleDailyWorkSubmission() {
        const workType = document.getElementById('workType').value;
        const location = document.getElementById('location').value;
        const comments = document.getElementById('comments').value;
        const workDate = new Date().toISOString().split('T')[0];
        
        console.log('Submitting daily work...'); // Debug
        console.log('Teacher:', this.currentUser.fullName); // Debug
        
        if (!workType) {
            this.showMessage('Please select work type', 'error');
            return;
        }
        
        const submission = {
            teacher: this.currentUser.fullName,
            username: this.currentUser.username,
            date: workDate,
            workType,
            location,
            comments,
            timestamp: new Date().toISOString()
        };
        
        console.log('Submission data:', submission); // Debug
        
        const submissions = JSON.parse(localStorage.getItem('dailySubmissions') || '{}');
        const submissionKey = `${this.currentUser.username}_${workDate}`;
        submissions[submissionKey] = submission;
        localStorage.setItem('dailySubmissions', JSON.stringify(submissions));
        
        console.log('Saved to localStorage. Key:', submissionKey); // Debug
        console.log('All submissions:', submissions); // Debug
        
        sendEmailNotification(this.currentUser.fullName, submission);
        document.getElementById('dailyWorkForm').reset();
        this.loadSubmissionHistory();
        this.loadPersonalAnalytics();
        this.showMessage('Daily work submitted successfully!', 'success');
    }

    loadSubmissionHistory() {
        const historyList = document.getElementById('historyList');
        if (!historyList) return;
        
        // Load from localStorage
        const submissions = JSON.parse(localStorage.getItem('dailySubmissions') || '{}');
        const userSubmissions = Object.values(submissions)
            .filter(sub => sub.username === this.currentUser.username)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 10);
        
        if (userSubmissions.length === 0) {
            historyList.innerHTML = '<p style="color: #666; text-align: center;">No submissions yet</p>';
            return;
        }
        
        historyList.innerHTML = userSubmissions.map(sub => `
            <div class="history-item">
                <div class="history-date">${new Date(sub.date).toLocaleDateString()}</div>
                <div class="history-work">${sub.workType}${sub.location ? ` - ${sub.location}` : ''}</div>
                ${sub.comments ? `<div style="color: #666; font-size: 0.9em; margin-top: 5px;">${sub.comments}</div>` : ''}
            </div>
        `).join('');
    }

    loadDailySubmissions() {
        const saved = localStorage.getItem('dailySubmissions');
        return saved ? JSON.parse(saved) : {};
    }

    saveDailySubmissions() {
        localStorage.setItem('dailySubmissions', JSON.stringify(this.dailySubmissions));
    }

    loadEvaluationTable() {
        const tableBody = document.getElementById('evaluationBody');
        if (!tableBody) return;
        
        const isManager = this.currentUser.role === 'manager';
        const teachers = isManager ? getAllTeachers() : [getTeacherByUsername(this.currentUser.username)];
        
        tableBody.innerHTML = teachers.map(teacher => {
            const scores = this.evaluationScores[teacher.fullName] || {
                punctuality: 0, classroom: 0, communication: 0, policies: 0, development: 0
            };
            
            const totalScore = this.calculateTotalScore(scores);
            const grade = this.getGrade(totalScore);
            
            return `
                <tr>
                    <td class="teacher-name">${teacher.fullName}</td>
                    <td><input type="number" class="score-input" min="0" max="10" step="0.1" 
                        value="${scores.punctuality}" ${isManager ? '' : 'readonly'}
                        data-teacher="${teacher.fullName}" data-criterion="punctuality"></td>
                    <td><input type="number" class="score-input" min="0" max="10" step="0.1" 
                        value="${scores.classroom}" ${isManager ? '' : 'readonly'}
                        data-teacher="${teacher.fullName}" data-criterion="classroom"></td>
                    <td><input type="number" class="score-input" min="0" max="10" step="0.1" 
                        value="${scores.communication}" ${isManager ? '' : 'readonly'}
                        data-teacher="${teacher.fullName}" data-criterion="communication"></td>
                    <td><input type="number" class="score-input" min="0" max="10" step="0.1" 
                        value="${scores.policies}" ${isManager ? '' : 'readonly'}
                        data-teacher="${teacher.fullName}" data-criterion="policies"></td>
                    <td><input type="number" class="score-input" min="0" max="10" step="0.1" 
                        value="${scores.development}" ${isManager ? '' : 'readonly'}
                        data-teacher="${teacher.fullName}" data-criterion="development"></td>
                    <td class="total-score">${totalScore.toFixed(2)}</td>
                    <td><span class="grade ${grade.className}">${grade.grade}</span></td>
                </tr>
            `;
        }).join('');
        
        if (isManager) {
            document.querySelectorAll('.score-input').forEach(input => {
                input.addEventListener('change', (e) => {
                    this.updateEvaluationScore(e.target);
                });
            });
        }
    }

    updateEvaluationScore(input) {
        const teacher = input.dataset.teacher;
        const criterion = input.dataset.criterion;
        const score = Math.max(0, Math.min(10, parseFloat(input.value) || 0));
        
        if (!this.evaluationScores[teacher]) {
            this.evaluationScores[teacher] = {};
        }
        
        this.evaluationScores[teacher][criterion] = score;
        this.saveEvaluationScores();
        
        const row = input.closest('tr');
        const scores = this.evaluationScores[teacher];
        const totalScore = this.calculateTotalScore(scores);
        const grade = this.getGrade(totalScore);
        
        row.querySelector('.total-score').textContent = totalScore.toFixed(2);
        const gradeSpan = row.querySelector('.grade');
        gradeSpan.textContent = grade.grade;
        gradeSpan.className = `grade ${grade.className}`;
        
        this.loadTopThreeTeachers();
    }

    calculateTotalScore(scores) {
        return (scores.punctuality * 0.2) + 
               (scores.classroom * 0.25) + 
               (scores.communication * 0.2) + 
               (scores.policies * 0.15) + 
               (scores.development * 0.2);
    }

    getGrade(score) {
        if (score >= 9) return { grade: 'A+', className: 'grade-a-plus' };
        if (score >= 8) return { grade: 'A', className: 'grade-a' };
        if (score >= 7) return { grade: 'B+', className: 'grade-b-plus' };
        if (score >= 6) return { grade: 'B', className: 'grade-b' };
        if (score >= 5) return { grade: 'C', className: 'grade-c' };
        return { grade: 'D', className: 'grade-d' };
    }

    generateMonthlyReport() {
        const selectedMonth = document.getElementById('reportMonth').value;
        if (!selectedMonth) {
            this.showMessage('Please select a month', 'error');
            return;
        }
        
        const [year, month] = selectedMonth.split('-');
        const monthSubmissions = this.getSubmissionsForMonth(year, month);
        
        this.displayMonthlyReport(monthSubmissions, selectedMonth);
    }

    getSubmissionsForMonth(year, month) {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);
        const result = {};
        
        getAllTeachers().forEach(teacher => {
            result[teacher.fullName] = {};
        });
        
        Object.values(this.dailySubmissions).forEach(sub => {
            const subDate = new Date(sub.date);
            if (subDate >= startDate && subDate <= endDate) {
                const dateKey = sub.date;
                if (!result[sub.teacher]) {
                    result[sub.teacher] = {};
                }
                result[sub.teacher][dateKey] = {
                    workType: sub.workType,
                    location: sub.location,
                    comments: sub.comments
                };
            }
        });
        
        return result;
    }

    displayMonthlyReport(submissions, selectedMonth) {
        const reportHeader = document.getElementById('reportHeader');
        const reportBody = document.getElementById('reportBody');
        
        const [year, month] = selectedMonth.split('-');
        const daysInMonth = new Date(year, month, 0).getDate();
        const dates = [];
        
        for (let day = 1; day <= daysInMonth; day++) {
            dates.push(`${year}-${month.padStart(2, '0')}-${day.toString().padStart(2, '0')}`);
        }
        
        reportHeader.innerHTML = `
            <tr>
                <th>Teacher Name</th>
                ${dates.map(date => `<th>${new Date(date).getDate()}</th>`).join('')}
            </tr>
        `;
        
        const allTeachers = getAllTeachers();
        reportBody.innerHTML = allTeachers.map(teacher => {
            const teacherSubmissions = submissions[teacher.fullName] || {};
            
            return `
                <tr>
                    <td class="teacher-name">${teacher.fullName}</td>
                    ${dates.map(date => {
                        const submission = teacherSubmissions[date];
                        if (submission) {
                            const display = submission.workType === 'Center' && submission.location 
                                ? `${submission.workType} (${submission.location})`
                                : submission.workType;
                            return `<td title="${submission.comments || ''}">${display}</td>`;
                        }
                        return '<td>-</td>';
                    }).join('')}
                </tr>
            `;
        }).join('');
    }

    exportToExcel() {
        const table = document.getElementById('reportTable');
        if (!table || !table.querySelector('tbody').innerHTML.trim()) {
            this.showMessage('Please generate a report first', 'error');
            return;
        }
        
        let csvContent = '';
        const rows = table.querySelectorAll('tr');
        
        rows.forEach(row => {
            const cells = row.querySelectorAll('th, td');
            const rowData = Array.from(cells).map(cell => {
                return `"${cell.textContent.replace(/"/g, '""')}"`;
            }).join(',');
            csvContent += rowData + '\n';
        });
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `monthly_report_${document.getElementById('reportMonth').value}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.showMessage('Report exported successfully!', 'success');
    }

    saveAllEvaluations() {
        this.saveEvaluationScores();
        this.loadTopThreeTeachers();
        this.showMessage('All evaluations saved successfully!', 'success');
    }

    exportEvaluations() {
        const allTeachers = getAllTeachers();
        let csvContent = 'Teacher Name,Punctuality,Classroom Management,Communication,Policy Compliance,Professional Development,Total Score,Grade\n';
        
        allTeachers.forEach(teacher => {
            const scores = this.evaluationScores[teacher.fullName] || {};
            const totalScore = this.calculateTotalScore(scores);
            const grade = this.getGrade(totalScore);
            
            csvContent += `"${teacher.fullName}",${scores.punctuality || 0},${scores.classroom || 0},${scores.communication || 0},${scores.policies || 0},${scores.development || 0},${totalScore.toFixed(2)},${grade.grade}\n`;
        });
        
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'teacher_evaluations.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.showMessage('Evaluations exported successfully!', 'success');
    }

    createWeeklySchedule() {
        const scheduleWeek = document.getElementById('scheduleWeek').value;
        if (!scheduleWeek) {
            this.showMessage('Please select a week first!', 'error');
            return;
        }

        const isManager = this.currentUser.role === 'manager';
        const readOnly = isManager ? '' : 'readonly';

        const scheduleContent = document.getElementById('scheduleContent');
        scheduleContent.innerHTML = `
            <h4>Weekly Schedule for ${scheduleWeek}</h4>
            ${!isManager ? '<p style="color: #666; margin-bottom: 15px;"><i class="fas fa-info-circle"></i> View Only - Contact manager to request changes</p>' : ''}
            <div class="schedule-table-container">
                <table class="schedule-table" style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr>
                            <th style="padding: 10px; border: 1px solid #ddd; background: #34495e; color: white;">Teacher</th>
                            <th style="padding: 10px; border: 1px solid #ddd; background: #34495e; color: white;">Monday</th>
                            <th style="padding: 10px; border: 1px solid #ddd; background: #34495e; color: white;">Tuesday</th>
                            <th style="padding: 10px; border: 1px solid #ddd; background: #34495e; color: white;">Wednesday</th>
                            <th style="padding: 10px; border: 1px solid #ddd; background: #34495e; color: white;">Thursday</th>
                            <th style="padding: 10px; border: 1px solid #ddd; background: #34495e; color: white;">Friday</th>
                            <th style="padding: 10px; border: 1px solid #ddd; background: #34495e; color: white;">Saturday</th>
                            <th style="padding: 10px; border: 1px solid #ddd; background: #34495e; color: white;">Sunday</th>
                        </tr>
                    </thead>
                    <tbody id="scheduleTableBody">
                        ${getAllTeachers().map(teacher => `
                            <tr>
                                <td class="teacher-name" style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">${teacher.fullName}</td>
                                <td style="padding: 10px; border: 1px solid #ddd;"><input type="text" placeholder="Schedule..." class="schedule-input" ${readOnly}></td>
                                <td style="padding: 10px; border: 1px solid #ddd;"><input type="text" placeholder="Schedule..." class="schedule-input" ${readOnly}></td>
                                <td style="padding: 10px; border: 1px solid #ddd;"><input type="text" placeholder="Schedule..." class="schedule-input" ${readOnly}></td>
                                <td style="padding: 10px; border: 1px solid #ddd;"><input type="text" placeholder="Schedule..." class="schedule-input" ${readOnly}></td>
                                <td style="padding: 10px; border: 1px solid #ddd;"><input type="text" placeholder="Schedule..." class="schedule-input" ${readOnly}></td>
                                <td style="padding: 10px; border: 1px solid #ddd;"><input type="text" placeholder="Schedule..." class="schedule-input" ${readOnly}></td>
                                <td style="padding: 10px; border: 1px solid #ddd;"><input type="text" placeholder="Schedule..." class="schedule-input" ${readOnly}></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            ${isManager ? `
                <div style="margin-top: 20px; text-align: center;">
                    <button class="action-btn" onclick="app.saveSchedule()">
                        <i class="fas fa-save"></i> Save Schedule
                    </button>
                    <button class="action-btn" onclick="app.exportSchedule()">
                        <i class="fas fa-download"></i> Export Schedule
                    </button>
                </div>
            ` : ''}
        `;

        // Load saved schedule if exists
        this.loadSavedSchedule(scheduleWeek);

        this.showMessage(isManager ? 'Schedule table created!' : 'Viewing schedule', 'success');
    }

    saveSchedule() {
        const scheduleWeek = document.getElementById('scheduleWeek').value;
        const scheduleInputs = document.querySelectorAll('#scheduleTableBody .schedule-input');
        const teachers = getAllTeachers();
        
        const scheduleData = {};
        let rowIndex = 0;
        
        teachers.forEach(teacher => {
            scheduleData[teacher.fullName] = {
                monday: scheduleInputs[rowIndex * 7 + 0].value,
                tuesday: scheduleInputs[rowIndex * 7 + 1].value,
                wednesday: scheduleInputs[rowIndex * 7 + 2].value,
                thursday: scheduleInputs[rowIndex * 7 + 3].value,
                friday: scheduleInputs[rowIndex * 7 + 4].value,
                saturday: scheduleInputs[rowIndex * 7 + 5].value,
                sunday: scheduleInputs[rowIndex * 7 + 6].value
            };
            rowIndex++;
        });

        // Save to localStorage
        const allSchedules = this.loadAllSchedules();
        allSchedules[scheduleWeek] = scheduleData;
        localStorage.setItem('weeklySchedules', JSON.stringify(allSchedules));
        
        this.showMessage('Schedule saved successfully!', 'success');
    }

    loadSavedSchedule(week) {
        const allSchedules = this.loadAllSchedules();
        const scheduleData = allSchedules[week];
        
        if (scheduleData) {
            const scheduleInputs = document.querySelectorAll('#scheduleTableBody .schedule-input');
            const teachers = getAllTeachers();
            let rowIndex = 0;
            
            teachers.forEach(teacher => {
                const teacherSchedule = scheduleData[teacher.fullName];
                if (teacherSchedule) {
                    scheduleInputs[rowIndex * 7 + 0].value = teacherSchedule.monday || '';
                    scheduleInputs[rowIndex * 7 + 1].value = teacherSchedule.tuesday || '';
                    scheduleInputs[rowIndex * 7 + 2].value = teacherSchedule.wednesday || '';
                    scheduleInputs[rowIndex * 7 + 3].value = teacherSchedule.thursday || '';
                    scheduleInputs[rowIndex * 7 + 4].value = teacherSchedule.friday || '';
                    scheduleInputs[rowIndex * 7 + 5].value = teacherSchedule.saturday || '';
                    scheduleInputs[rowIndex * 7 + 6].value = teacherSchedule.sunday || '';
                }
                rowIndex++;
            });
        }
    }

    loadAllSchedules() {
        const saved = localStorage.getItem('weeklySchedules');
        return saved ? JSON.parse(saved) : {};
    }

    exportSchedule() {
        const scheduleWeek = document.getElementById('scheduleWeek').value;
        const scheduleTable = document.querySelector('.schedule-table');
        if (!scheduleTable) {
            this.showMessage('Please create a schedule first!', 'error');
            return;
        }

        let csvContent = 'Teacher,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday\n';
        
        const rows = scheduleTable.querySelectorAll('tbody tr');
        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            const teacherName = cells[0].textContent;
            const scheduleData = [];
            
            for (let i = 1; i < cells.length; i++) {
                const input = cells[i].querySelector('input');
                scheduleData.push(`"${input ? input.value : ''}"`);
            }
            
            csvContent += `"${teacherName}",${scheduleData.join(',')}\n`;
        });

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `weekly_schedule_${scheduleWeek}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        this.showMessage('Schedule exported successfully!', 'success');
    }

    // Personal Tasks Management
    showTaskModal() {
        const modal = document.getElementById('taskModal');
        const teacherSelect = document.getElementById('taskTeacher');
        
        teacherSelect.innerHTML = '<option value="">Select teacher...</option>' +
            getAllTeachers().map(teacher => 
                `<option value="${teacher.fullName}">${teacher.fullName}</option>`
            ).join('');
        
        modal.style.display = 'block';
    }

    closeTaskModal() {
        document.getElementById('taskModal').style.display = 'none';
        document.getElementById('taskForm').reset();
    }

    assignTask() {
        const taskData = {
            id: Date.now().toString(),
            teacher: document.getElementById('taskTeacher').value,
            title: document.getElementById('taskTitle').value,
            description: document.getElementById('taskDescription').value,
            deadline: document.getElementById('taskDeadline').value,
            status: 'pending',
            assignedDate: new Date().toISOString()
        };

        if (!this.personalTasks[taskData.teacher]) {
            this.personalTasks[taskData.teacher] = [];
        }

        this.personalTasks[taskData.teacher].push(taskData);
        this.savePersonalTasks();
        
        this.closeTaskModal();
        this.loadPersonalTasksList();
        this.showMessage('Task assigned successfully!', 'success');
    }

    loadPersonalTasksList() {
        const tasksList = document.getElementById('tasksList');
        if (!tasksList) return;

        const isManager = this.currentUser.role === 'manager';
        let tasksToShow = [];

        if (isManager) {
            Object.values(this.personalTasks).forEach(teacherTasks => {
                tasksToShow.push(...teacherTasks);
            });
        } else {
            tasksToShow = this.personalTasks[this.currentUser.fullName] || [];
        }

        if (tasksToShow.length === 0) {
            tasksList.innerHTML = '<p class="no-tasks">No tasks assigned yet</p>';
            return;
        }

        tasksToShow.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

        tasksList.innerHTML = tasksToShow.map(task => `
            <div class="task-card ${task.status}">
                <div class="task-header">
                    <div class="task-title">${task.title}</div>
                    <span class="task-status ${task.status}">${task.status.toUpperCase()}</span>
                </div>
                <div class="task-description">${task.description}</div>
                <div class="task-meta">
                    <div>
                        ${isManager ? `<strong>Assigned to:</strong> ${task.teacher}` : ''}
                        ${isManager ? '<br>' : ''}
                        <strong>Deadline:</strong> ${new Date(task.deadline).toLocaleDateString()}
                    </div>
                </div>
                ${task.status === 'pending' ? `
                    <div class="task-actions">
                        <button class="task-btn task-btn-complete" onclick="app.completeTask('${task.id}', '${task.teacher}')">
                            <i class="fas fa-check"></i> Mark Complete
                        </button>
                        ${isManager ? `<button class="task-btn task-btn-delete" onclick="app.deleteTask('${task.id}', '${task.teacher}')">
                            <i class="fas fa-trash"></i> Delete
                        </button>` : ''}
                    </div>
                ` : ''}
            </div>
        `).join('');
    }

    completeTask(taskId, teacher) {
        const tasks = this.personalTasks[teacher];
        if (!tasks) return;

        const task = tasks.find(t => t.id === taskId);
        if (task) {
            task.status = 'completed';
            task.completedDate = new Date().toISOString();
            this.savePersonalTasks();
            this.loadPersonalTasksList();
            this.showMessage('Task marked as complete!', 'success');
        }
    }

    deleteTask(taskId, teacher) {
        if (!confirm('Are you sure you want to delete this task?')) return;

        this.personalTasks[teacher] = this.personalTasks[teacher].filter(t => t.id !== taskId);
        this.savePersonalTasks();
        this.loadPersonalTasksList();
        this.showMessage('Task deleted successfully!', 'success');
    }

    showMessage(text, type = 'success') {
        const messageContainer = document.getElementById('messageContainer');
        const message = document.createElement('div');
        message.className = `message ${type}`;
        message.textContent = text;
        
        messageContainer.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    }

    loadEvaluationScores() {
        const saved = localStorage.getItem('evaluationScores');
        return saved ? JSON.parse(saved) : initializeEvaluationScores();
    }

    saveEvaluationScores() {
        localStorage.setItem('evaluationScores', JSON.stringify(this.evaluationScores));
    }

    loadDailySubmissions() {
        const saved = localStorage.getItem('dailySubmissions');
        return saved ? JSON.parse(saved) : {};
    }

    saveDailySubmissions() {
        localStorage.setItem('dailySubmissions', JSON.stringify(this.dailySubmissions));
    }

    loadPersonalTasks() {
        const saved = localStorage.getItem('personalTasks');
        return saved ? JSON.parse(saved) : {};
    }

    savePersonalTasks() {
        localStorage.setItem('personalTasks', JSON.stringify(this.personalTasks));
    }
}

// Global functions for user type selection
function showUserTypeScreen() {
    document.getElementById('userTypeScreen').style.display = 'flex';
    document.getElementById('teacherLoginScreen').style.display = 'none';
    document.getElementById('studentLoginScreen').style.display = 'none';
    document.getElementById('mainScreen').style.display = 'none';
}

function showLoginScreen(type) {
    document.getElementById('userTypeScreen').style.display = 'none';
    
    if (type === 'teacher') {
        document.getElementById('teacherLoginScreen').style.display = 'flex';
    } else if (type === 'student') {
        document.getElementById('studentLoginScreen').style.display = 'flex';
    }
}

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    window.app = new PhysicsAcademyApp();
});