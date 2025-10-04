// Complete Teachers Database with New Hierarchy and Student System

const TEACHERS_DATA = {
    // Manager
    'F.salem': {
        username: 'F.salem',
        password: 'salem1',
        fullName: 'Ms. Fatma Salem',
        role: 'manager',
        type: 'Manager',
        tier: 1,
        photo: 'Ms. Fatma Salem.jpg',
        email: 'fatmamohamed9003@gmail.com',
        phone: '+20 102 793 7435',
        startYear: 2016,
        education: 'Bachelor of Science in Physics, Ain Shams University',
        experience: 'Since 2016 (8+ years)',
        specializations: ['Physics Education', 'Team Leadership', 'Curriculum Development'],
        universities: ['Ain Shams University', 'Faculty of Science (UNAM)'],
        birthDate: 'March 12, 1993',
        social: {
            facebook: 'https://www.facebook.com/fatma.mohammed.370515',
            instagram: 'https://www.instagram.com/fatma.mohamad',
            whatsapp: 'https://wa.me/201027937435',
            telegram: 'https://t.me/+201027937435'
        }
    },

    // Senior Supervisors (Tier 2)
    'A.azeem': {
        username: 'A.azeem',
        password: 'azeem9',
        fullName: 'Mr. Ahmed Abd El-Azeim',
        role: 'senior_supervisor',
        type: 'Senior Supervisor',
        tier: 2,
        photo: 'Mr. Ahmed Abd El-Azeim.jpg',
        startYear: 2016,
        education: 'Bachelor of Science - Materials Physics, Ain Shams University',
        experience: 'Since 2016 (8+ years)',
        specializations: ['Materials Physics', 'Advanced Physics']
    },

    'O.mahdy': {
        username: 'O.mahdy',
        password: 'mahdy12',
        fullName: 'Ms. Omnia Mahdy',
        role: 'senior_supervisor',
        type: 'Senior Supervisor',
        tier: 2,
        photo: 'Ms. Omnia Mahdy.jpg',
        startYear: 2013,
        education: 'Bachelor of Science - Chemistry & Physics, Cairo University',
        experience: 'Since 2013 (11+ years)',
        specializations: ['Chemistry', 'Physics', 'Advanced Science']
    },

    'H.ramadan': {
        username: 'H.ramadan',
        password: 'ramadan7',
        fullName: 'Mr. Hady Ramadan',
        role: 'senior_supervisor',
        type: 'Senior Supervisor',
        tier: 2,
        photo: 'Mr. Hady Ramadan.jpg',
        startYear: 2018,
        education: 'Bachelor of Science, Ain Shams University',
        experience: 'Since 2018 (6+ years)',
        specializations: ['Science', 'Physics']
    },

    'A.hussien': {
        username: 'A.hussien',
        password: 'hussien10',
        fullName: 'Mr. Abdullah Hussien',
        role: 'senior_supervisor',
        type: 'Senior Supervisor',
        tier: 2,
        photo: 'Mr. Abdullah Hussien.jpg',
        startYear: 2016,
        education: 'Bachelor of Science, Al-Azhar University',
        additionalQualifications: ['Educational Diploma in Teaching'],
        experience: 'Since 2016 (8+ years)',
        specializations: ['Science', 'Physics', 'Teaching Methods']
    },

    // Supervisors (Tier 3)
    'M.mohamed': {
        username: 'M.mohamed',
        password: 'mohamed3',
        fullName: 'Ms. Menna Mohamed',
        role: 'senior_supervisor',
        type: 'Senior Supervisor',
        tier: 2,
        photo: 'Ms. Menna Mohamed.jpg',
        startYear: 2019,
        education: 'Bachelor of Computer Science, Misr University',
        additionalQualifications: ['Master in Artificial Intelligence and Data Science, Cairo University'],
        experience: 'Since 2019 (5+ years)',
        specializations: ['Computer Science', 'AI', 'Data Science', 'Physics']
    },

    'A.hassan': {
        username: 'A.hassan',
        password: 'hassan4',
        fullName: 'Mr. Abd El-Rahman Hassan',
        role: 'supervisor',
        type: 'Supervisor',
        tier: 3,
        photo: 'Mr. Abd El-Rahman Hassan.jpg',
        startYear: 2023,
        education: 'Bachelor of Science - Physics, Helwan University',
        additionalQualifications: ['Master in Nanotechnology Engineering', 'Content Developer - Excellence Physics Book'],
        experience: 'Since 2023 (1+ years)',
        specializations: ['Physics', 'Nanotechnology', 'Content Development']
    },

    'L.akram': {
        username: 'L.akram',
        password: 'akram5',
        fullName: 'Ms. Lamis Akram',
        role: 'supervisor',
        type: 'Supervisor',
        tier: 3,
        photo: 'Ms. Lamis Akram.jpg',
        startYear: 2022,
        education: 'Bachelor of Science, Ain Shams University',
        experience: 'Since 2022 (2+ years)',
        specializations: ['Science', 'Physics']
    },

    'R.wahid': {
        username: 'R.wahid',
        password: 'wahid6',
        fullName: 'Ms. Rehab Wahid',
        role: 'supervisor',
        type: 'Supervisor',
        tier: 3,
        photo: 'Ms. Rehab Wahid.jpg',
        startYear: 2020,
        education: 'Bachelor of Science - Chemistry & Physics, Cairo University',
        experience: 'Since 2020 (4+ years)',
        specializations: ['Chemistry', 'Physics', 'Science Education']
    },

    'A.salah': {
        username: 'A.salah',
        password: 'salah11',
        fullName: 'Ms. Aya Salah',
        role: 'supervisor',
        type: 'Supervisor',
        tier: 3,
        photo: 'Ms. Aya Salah.jpg',
        startYear: 2015,
        education: 'Bachelor of Science - Geophysics, Ain Shams University',
        additionalQualifications: ['Educational Diploma, Faculty of Education, Helwan University'],
        experience: 'Since 2015 (9+ years)',
        specializations: ['Geophysics', 'Physics', 'Educational Methods']
    },

    // Team Leaders (Tier 4)
    'M.adel': {
        username: 'M.adel',
        password: 'adel14',
        fullName: 'Mohamed Adel',
        role: 'leader',
        type: 'Team Leader',
        tier: 4,
        photo: 'Mohamed Adel.jpg',
        specializations: ['Physics']
    },

    'Y.adel': {
        username: 'Y.adel',
        password: 'adel15',
        fullName: 'Yousra Adel',
        role: 'leader',
        type: 'Team Leader',
        tier: 4,
        photo: 'Yousra Adel.jpg',
        specializations: ['Physics']
    },

    'A.amr': {
        username: 'A.amr',
        password: 'amr13',
        fullName: 'Ahmed Amr',
        role: 'leader',
        type: 'Team Leader',
        tier: 4,
        photo: 'Ahmed Amr.jpg',
        specializations: ['Physics']
    },
    
    'A.noor': {
        username: 'A.noor',
        password: 'noor26',
        fullName: 'Ayat Noor',
        role: 'leader',
        type: 'Team Leader',
        tier: 4,
        photo: 'Ayat Noor.jpg',
        specializations: ['Physics']
},

   'N.ali': {
        username: 'N.ali',
        password: 'ali27',
        fullName: 'Nadeen Ali',
        role: 'leader',
        type: 'Team Leader',
        tier: 4,
        photo: 'Nadeen Ali.jpg',
        specializations: ['Physics']
    },
    // Junior Teachers (Tier 5)
    'O.mostafa': {
        username: 'O.mostafa',
        password: 'mostafa16',
        fullName: 'Omar Mostafa',
        role: 'teacher',
        type: 'Junior Teacher',
        tier: 5,
        photo: 'Omar Mostafa.jpg',
        specializations: ['Physics']
    },

    'A.yasser': {
        username: 'A.yasser',
        password: 'yasser17',
        fullName: 'Abdel Rahman Yasser',
        role: 'teacher',
        type: 'Junior Teacher',
        tier: 5,
        photo: 'Abdel Rahman Yasser.jpg',
        specializations: ['Physics']
    },

    'A.labib': {
        username: 'A.labib',
        password: 'labib18',
        fullName: 'Ahmed Labib',
        role: 'teacher',
        type: 'Junior Teacher',
        tier: 5,
        photo: 'Ahmed Labib.jpg',
        specializations: ['Physics']
    },

    'A.bakheet': {
        username: 'A.bakheet',
        password: 'bakheet19',
        fullName: 'Ahmed Bakheet',
        role: 'teacher',
        type: 'Junior Teacher',
        tier: 5,
        photo: 'Ahmed Bakheet.jpg',
        specializations: ['Physics']
    },

    'A.hamid': {
        username: 'A.hamid',
        password: 'hamid20',
        fullName: 'Ahmed Abdel Hamid',
        role: 'teacher',
        type: 'Junior Teacher',
        tier: 5,
        photo: 'Ahmed Abdel Hamid.jpg',
        specializations: ['Physics']
    },

    'A.adel': {
        username: 'A.adel',
        password: 'adel21',
        fullName: 'Amr Adel',
        role: 'teacher',
        type: 'Junior Teacher',
        tier: 5,
        photo: 'Amr Adel.jpg',
        specializations: ['Physics']
    },

    'M.marwan': {
        username: 'M.marwan',
        password: 'marwan22',
        fullName: 'Marwan Mohamed',
        role: 'teacher',
        type: 'Junior Teacher',
        tier: 5,
        photo: 'Marwan Mohamed.jpg',
        specializations: ['Physics']
    },

    'A.hesham': {
        username: 'A.hesham',
        password: 'hesham23',
        fullName: 'Ahmed Hesham',
        role: 'teacher',
        type: 'Junior Teacher',
        tier: 5,
        photo: 'Ahmed Hesham.jpg',
        specializations: ['Physics']
    },

    'O.salah2': {
        username: 'O.salah2',
        password: 'salah24',
        fullName: 'Omar Salah',
        role: 'teacher',
        type: 'Junior Teacher',
        tier: 5,
        photo: 'Omar Salah.jpg',
        specializations: ['Physics']
    },

    'A.tarek': {
        username: 'A.tarek',
        password: 'tarek25',
        fullName: 'Ahmed Tarek',
        role: 'teacher',
        type: 'Junior Teacher',
        tier: 5,
        photo: 'Ahmed Tarek.jpg',
        specializations: ['Physics']
    },

    'M.faramawy': {
        username: 'M.faramawy',
        password: 'faramawy27',
        fullName: 'Mohamed Faramawy',
        role: 'teacher',
        type: 'Junior Teacher',
        tier: 5,
        photo: 'Mohamed Faramawy.jpg',
        specializations: ['Physics']
    }
};

// Student Database Structure
const STUDENTS_DATA = {};

// Evaluation Criteria
const EVALUATION_CRITERIA = [
    {
        id: 'punctuality',
        name: 'Punctuality & Discipline',
        description: 'Attendance, schedule adherence, time management',
        weight: 0.2
    },
    {
        id: 'classroom',
        name: 'Classroom Management',
        description: 'Class control, activity organization, professional handling',
        weight: 0.25
    },
    {
        id: 'communication',
        name: 'Communication & Collaboration',
        description: 'Reports, responsiveness, teamwork',
        weight: 0.2
    },
    {
        id: 'policies',
        name: 'Policy Compliance',
        description: 'Company rules, academic standards, confidentiality',
        weight: 0.15
    },
    {
        id: 'development',
        name: 'Professional Development',
        description: 'Training participation, skill improvement, feedback implementation',
        weight: 0.2
    }
];

// Work Type Options
const WORK_TYPES = [
    'Center',
    'Online',
    'Offline meeting',
    'Zoom meeting',
    'Day off',
    'Annual leave',
    'UPL',
    'Other'
];

// Bad Words Filter (Simple List)
const BAD_WORDS = ['damn', 'hell', 'stupid', 'idiot', 'fuck', 'shit', 'ass'];

// Helper Functions
function getAllTeachers() {
    return Object.values(TEACHERS_DATA);
}

function getTeachersByTier(tier) {
    return Object.values(TEACHERS_DATA).filter(teacher => teacher.tier === tier);
}

function getTeacherByUsername(username) {
    return TEACHERS_DATA[username] || null;
}

function validateLogin(username, password) {
    const teacher = TEACHERS_DATA[username];
    return teacher && teacher.password === password ? teacher : null;
}

function validateStudentLogin(phone, password) {
    const student = STUDENTS_DATA[phone];
    return student && student.password === password ? student : null;
}

function registerStudent(studentData) {
    if (STUDENTS_DATA[studentData.phone]) {
        return { success: false, message: 'Phone number already registered' };
    }
    
    STUDENTS_DATA[studentData.phone] = {
        phone: studentData.phone,
        password: studentData.password,
        name: studentData.name,
        city: studentData.city,
        avatar: studentData.avatar,
        registrationDate: new Date().toISOString(),
        remainingRatings: 3,
        ratedTeachers: [],
        chatAccessUntil: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString() // 14 days from now
    };
    
    return { success: true, message: 'Registration successful' };
}

function filterBadWords(text) {
    let filtered = text;
    BAD_WORDS.forEach(word => {
        const regex = new RegExp(word, 'gi');
        filtered = filtered.replace(regex, '***');
    });
    return filtered;
}

function initializeEvaluationScores() {
    const scores = {};
    Object.values(TEACHERS_DATA).forEach(teacher => {
        scores[teacher.fullName] = {
            punctuality: 0,
            classroom: 0,
            communication: 0,
            policies: 0,
            development: 0
        };
    });
    return scores;
}

function sendEmailNotification(teacherName, workData) {
    console.log(`Email Notification Sent to: fatmamohamed9003@gmail.com`);
    console.log(`Subject: Daily Work Submission - ${teacherName}`);
    console.log(`Teacher: ${teacherName}`);
    console.log(`Date: ${workData.date}`);
    console.log(`Work Type: ${workData.workType}`);
    console.log(`Location: ${workData.location || 'N/A'}`);
    console.log(`Comments: ${workData.comments || 'None'}`);
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        TEACHERS_DATA,
        STUDENTS_DATA,
        EVALUATION_CRITERIA,
        WORK_TYPES,
        BAD_WORDS,
        getAllTeachers,
        getTeachersByTier,
        getTeacherByUsername,
        validateLogin,
        validateStudentLogin,
        registerStudent,
        filterBadWords,
        initializeEvaluationScores,
        sendEmailNotification
    };
}