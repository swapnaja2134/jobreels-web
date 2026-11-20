import axios from 'axios';

export const API_BASE_URL = 'https://jobreels-backend.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

export const fetchJobs = async () => {
  try {
    const res = await api.get('/jobs');
    return res.data;
  } catch (err) {
    console.warn('Backend waking up or unreachable, using fallback jobs:', err.message);
    return [
      {
        id: 1,
        title: 'Junior Android Developer',
        companyName: 'TechNova Solutions Pvt Ltd',
        location: 'Baner, Pune',
        salary: '₹3.5 LPA',
        jobType: 'Full Time',
        experienceRequired: 'Fresher',
        educationRequired: 'Graduate',
        category: 'IT & Software',
        description: 'Build and maintain high-performance Android apps using Java, XML, and REST APIs.',
        vacancies: 3,
        workingHours: '10:00 AM - 7:00 PM',
        companyVerified: true,
      },
      {
        id: 2,
        title: 'CNC Machine Operator & Electrician',
        companyName: 'Chakan Precision Engineering',
        location: 'Chakan MIDC, Pune',
        salary: '₹22,000 / month',
        jobType: 'Full Time',
        experienceRequired: '0-1 Year',
        educationRequired: 'ITI / Diploma',
        category: 'Manufacturing',
        description: 'Operate CNC machinery and handle industrial electrical maintenance.',
        vacancies: 5,
        workingHours: '8:00 AM - 5:00 PM',
        companyVerified: true,
      },
    ];
  }
};

const WORKING_VIDEOS = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
];

export const fetchReels = async () => {
  try {
    const res = await api.get('/reels');
    if (Array.isArray(res.data) && res.data.length > 0) {
      return res.data.map((reel, idx) => ({
        ...reel,
        videoUrl:
          !reel.videoUrl || reel.videoUrl.includes('mixkit.co')
            ? WORKING_VIDEOS[idx % WORKING_VIDEOS.length]
            : reel.videoUrl,
      }));
    }
    throw new Error('Empty reels');
  } catch {
    return [
      {
        id: 1,
        title: 'Day in the Life: Junior Android Dev in Baner',
        creatorName: 'Rohan Kulkarni',
        roleTag: 'Android Developer',
        location: 'Baner, Pune',
        videoUrl: WORKING_VIDEOS[0],
        likes: 124,
        verified: true,
      },
      {
        id: 2,
        title: 'Inside Chakan MIDC: Modern CNC Floor Tour',
        creatorName: 'Chakan Precision HR',
        roleTag: 'Hiring Manager',
        location: 'Chakan MIDC, Pune',
        videoUrl: WORKING_VIDEOS[1],
        likes: 89,
        verified: true,
      },
      {
        id: 3,
        title: '3 Tips to Crack Your First Java Interview',
        creatorName: 'Sneha Deshmukh',
        roleTag: 'Tech Recruiter',
        location: 'Hinjewadi, Pune',
        videoUrl: WORKING_VIDEOS[2],
        likes: 210,
        verified: true,
      },
    ];
  }
};

export const postJob = async (jobData) => {
  const res = await api.post('/jobs', jobData);
  return res.data;
};

export const applyForJob = async (applicationData) => {
  const res = await api.post('/applications', applicationData);
  return res.data;
};

export const fetchApplications = async () => {
  try {
    const res = await api.get('/applications');
    return res.data;
  } catch {
    return [];
  }
};

export default api;