import { Job, Candidate, Recruiter, DashboardMetrics, Education, Experience, Skill, Note, JobSkill } from '../types';

export const jobs: Job[] = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    department: 'Engineering',
    location: 'Remote',
    closingDate: '2025-04-15',
    status: 'open',
    candidateCount: 5,
    description: 'We are seeking an experienced Senior Software Engineer to join our growing engineering team. The ideal candidate will have a strong background in full-stack development and a passion for building scalable, high-performance applications.',
    responsibilities: [
      'Design and implement scalable backend services using Node.js and TypeScript',
      'Build responsive and accessible frontend applications using React',
      'Lead technical design discussions and mentor junior developers',
      'Collaborate with product managers to define technical requirements',
      'Participate in code reviews and maintain high code quality standards'
    ],
    requirements: [
      'Bachelor\'s degree in Computer Science or related field',
      '5+ years of professional software development experience',
      'Strong proficiency in JavaScript/TypeScript and modern frontend frameworks',
      'Experience with cloud platforms (AWS, GCP, or Azure)',
      'Excellent problem-solving and communication skills'
    ],
    skills: [
      {
        id: '1',
        name: 'TypeScript',
        yearsRequired: 3,
        isRequired: true
      },
      {
        id: '2',
        name: 'React',
        yearsRequired: 4,
        isRequired: true
      },
      {
        id: '3',
        name: 'Node.js',
        yearsRequired: 3,
        isRequired: true
      },
      {
        id: '4',
        name: 'AWS',
        yearsRequired: 2,
        isRequired: false
      },
      {
        id: '5',
        name: 'GraphQL',
        yearsRequired: 1,
        isRequired: false
      }
    ],
    salary: {
      min: 120000,
      max: 180000,
      currency: 'USD'
    },
    employmentType: 'full-time',
    workplaceType: 'remote',
    postedDate: '2025-02-15',
    hiringManager: 'Sarah Thompson'
  },
  {
    id: '2',
    title: 'Product Manager',
    department: 'Product',
    location: 'New York, NY',
    closingDate: '2025-04-30',
    status: 'open',
    candidateCount: 3,
  },
  {
    id: '3',
    title: 'UX Designer',
    department: 'Design',
    location: 'San Francisco, CA',
    closingDate: '2025-05-10',
    status: 'open',
    candidateCount: 0,
  },
  {
    id: '4',
    title: 'Marketing Specialist',
    department: 'Marketing',
    location: 'Chicago, IL',
    closingDate: '2025-05-15',
    status: 'open',
    candidateCount: 0,
  },
  {
    id: '5',
    title: 'Data Analyst',
    department: 'Analytics',
    location: 'Remote',
    closingDate: '2025-04-20',
    status: 'open',
    candidateCount: 2,
  },
  {
    id: '6',
    title: 'Frontend Developer',
    department: 'Engineering',
    location: 'Austin, TX',
    closingDate: '2025-06-01',
    status: 'open',
    candidateCount: 4,
  },
];

const mockEducation: Education[] = [
  {
    id: '1',
    school: 'Stanford University',
    degree: 'Master of Science',
    field: 'Computer Science',
    startDate: '2020-09-01',
    endDate: '2022-06-01',
    description: 'Specialized in Machine Learning and Distributed Systems',
  },
  {
    id: '2',
    school: 'University of California, Berkeley',
    degree: 'Bachelor of Science',
    field: 'Computer Science',
    startDate: '2016-09-01',
    endDate: '2020-05-01',
    description: 'Minor in Mathematics, Dean\'s List all semesters',
  },
];

const mockExperience: Experience[] = [
  {
    id: '1',
    company: 'Google',
    position: 'Software Engineer',
    location: 'Mountain View, CA',
    startDate: '2022-07-01',
    endDate: '2024-02-01',
    current: false,
    description: 'Led development of cloud-native applications using Go and Kubernetes. Improved system performance by 40% through optimization initiatives.',
  },
  {
    id: '2',
    company: 'Meta',
    position: 'Software Engineering Intern',
    location: 'Menlo Park, CA',
    startDate: '2021-05-01',
    endDate: '2021-08-01',
    current: false,
    description: 'Developed and deployed machine learning models for content recommendation. Collaborated with cross-functional teams to improve user engagement.',
  },
];

const mockSkills: Skill[] = [
  {
    id: '1',
    name: 'Python',
    level: 'expert',
    yearsOfExperience: 6,
  },
  {
    id: '2',
    name: 'React',
    level: 'advanced',
    yearsOfExperience: 4,
  },
  {
    id: '3',
    name: 'Node.js',
    level: 'intermediate',
    yearsOfExperience: 2,
  },
  {
    id: '4',
    name: 'Kubernetes',
    level: 'advanced',
    yearsOfExperience: 3,
  },
  {
    id: '5',
    name: 'Machine Learning',
    level: 'intermediate',
    yearsOfExperience: 2,
  },
];

const mockNotes: Note[] = [
  {
    id: '1',
    content: 'Excellent technical skills demonstrated during coding challenge. Strong problem-solving abilities and clean code practices.',
    createdAt: '2024-03-15T14:30:00Z',
    createdBy: 'Technical Interviewer',
    type: 'interview',
  },
  {
    id: '2',
    content: 'Great cultural fit. Shows strong leadership potential and excellent communication skills.',
    createdAt: '2024-03-20T16:00:00Z',
    createdBy: 'Hiring Manager',
    type: 'feedback',
  },
  {
    id: '3',
    content: 'Candidate has expressed strong interest in our AI initiatives and has relevant experience in the field.',
    createdAt: '2024-03-10T11:00:00Z',
    createdBy: 'Recruiter',
    type: 'general',
  },
];

export const candidates: Candidate[] = [
  {
    id: '1',
    name: 'John Smith',
    jobId: '1',
    recruiterId: '1',
    status: 'in-progress',
    submissionDate: '2025-03-01',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    education: mockEducation,
    experience: mockExperience,
    skills: mockSkills,
    notes: mockNotes,
    resumeUrl: 'https://example.com/resume.pdf',
    portfolioUrl: 'https://johnsmith.dev',
    linkedinUrl: 'https://linkedin.com/in/johnsmith',
    githubUrl: 'https://github.com/johnsmith',
  },
  {
    id: '2',
    name: 'Emily Johnson',
    jobId: '1',
    recruiterId: '2',
    status: 'submitted',
    submissionDate: '2025-03-05',
    email: 'emily.johnson@example.com',
    phone: '+1 (555) 234-5678',
    location: 'New York, NY',
    education: mockEducation.slice(1),
    experience: mockExperience.slice(1),
    skills: mockSkills.slice(0, 3),
    notes: mockNotes.slice(1),
    linkedinUrl: 'https://linkedin.com/in/emilyjohnson',
  },
];

export const recruiters: Recruiter[] = [
  {
    id: '1',
    name: 'TalentScout Inc.',
    company: 'TalentScout Inc.',
    submissionCount: 5,
    hireCount: 2,
  },
  {
    id: '2',
    name: 'Apex Recruiting',
    company: 'Apex Recruiting',
    submissionCount: 5,
    hireCount: 1,
  },
  {
    id: '3',
    name: 'HirePro Solutions',
    company: 'HirePro Solutions',
    submissionCount: 4,
    hireCount: 0,
  },
];

export const calculateDaysRemaining = (closingDate: string): number => {
  const today = new Date();
  const closing = new Date(closingDate);
  const diffTime = closing.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const calculateDashboardMetrics = (): DashboardMetrics => {
  const openJobs = jobs.filter(job => job.status === 'open');
  const jobsWithoutCandidates = openJobs.filter(job => job.candidateCount === 0);
  
  const candidatesSubmitted = candidates.filter(candidate => candidate.status === 'submitted').length;
  const candidatesInProgress = candidates.filter(candidate => candidate.status === 'in-progress').length;
  const candidatesHired = candidates.filter(candidate => candidate.status === 'hired').length;
  const candidatesRejected = candidates.filter(candidate => candidate.status === 'rejected').length;
  
  return {
    openJobsCount: openJobs.length,
    jobsWithoutCandidates: jobsWithoutCandidates.length,
    candidatesSubmitted,
    candidatesInProgress,
    candidatesHired,
    candidatesRejected,
  };
};