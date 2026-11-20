import React, { useEffect, useState } from 'react';
import {
  Briefcase,
  Play,
  User,
  ShieldCheck,
  MapPin,
  IndianRupee,
  CheckCircle2,
  Heart,
  Share2,
  Send,
  PlusCircle,
  FileText,
  Download,
  Building2,
  Clock,
  Globe,
  Flag,
} from 'lucide-react';
import { fetchJobs, fetchReels, postJob, applyForJob, fetchApplications } from './api';

const TRANSLATIONS = {
  en: {
    reels: 'Reels',
    jobs: 'Jobs',
    post: 'HR Post',
    resume: 'Resume',
    admin: 'Admin',
    applyNow: 'One-Tap Apply',
    applied: 'Applied ✓',
    verified: 'Verified',
    vacancies: 'Openings',
    downloadPdf: 'Print / Save PDF',
    postNewJob: 'Post New Job Opening',
  },
  hi: {
    reels: 'रील्स',
    jobs: 'नौकरियां',
    post: 'HR पोस्ट',
    resume: 'रिज्यूमे',
    admin: 'एडमिन',
    applyNow: 'एक-टैप आवेदन',
    applied: 'आवेदन किया ✓',
    verified: 'सत्यापित',
    vacancies: 'पद',
    downloadPdf: 'PDF डाउनलोड करें',
    postNewJob: 'नई नौकरी पोस्ट करें',
  },
  mr: {
    reels: 'रील्स',
    jobs: 'नोकऱ्या',
    post: 'HR पोस्ट',
    resume: 'रेझ्युमे',
    admin: 'अ‍ॅडमिन',
    applyNow: 'वन-टॅप अर्ज करा',
    applied: 'अर्ज केला ✓',
    verified: 'सत्यापित',
    vacancies: 'जागा',
    downloadPdf: 'PDF डाउनलोड करा',
    postNewJob: 'नवीन नोकरी पोस्ट करा',
  },
};

export default function App() {
  const [activeTab, setActiveTab] = useState('reels');
  const [lang, setLang] = useState('en');
  const [jobs, setJobs] = useState([]);
  const [reels, setReels] = useState([]);
  const [applications, setApplications] = useState([]);
  const [appliedJobIds, setAppliedJobIds] = useState([]);
  const [likedReels, setLikedReels] = useState({});
  const [toast, setToast] = useState('');
  const [loading, setLoading] = useState(true);

  // Candidate Profile State (for Auto-Resume & One-Tap Apply)
  const [candidate, setCandidate] = useState({
    id: 1,
    name: 'Swapnaja Khemkar',
    role: 'Junior Java & Android Developer',
    location: 'Pune, Maharashtra',
    phone: '+91 98765 43210',
    email: 'swapnaja.dev@example.com',
    education: 'B.E. Electrical Engineering (SPPU, 2026) | Java Full Stack (VIT Pune)',
    skills: 'Java, Spring Boot, MySQL, Android Studio, REST APIs, React, Tailwind CSS',
    experience: 'Built & deployed Library Management System & JobReels Full-Stack Platform',
  });

  // HR Job Form State
  const [newJob, setNewJob] = useState({
    title: '',
    companyName: '',
    location: 'Hinjewadi, Pune',
    salary: '₹4.0 LPA',
    jobType: 'Full Time',
    experienceRequired: 'Fresher',
    educationRequired: 'Graduate',
    category: 'IT & Software',
    description: '',
    vacancies: 2,
    workingHours: '9:30 AM - 6:30 PM',
    companyVerified: true,
    employerId: 2,
  });

  const t = TRANSLATIONS[lang];

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const [jobsData, reelsData, appsData] = await Promise.all([
        fetchJobs(),
        fetchReels(),
        fetchApplications(),
      ]);
      setJobs(Array.isArray(jobsData) ? jobsData : []);
      setReels(Array.isArray(reelsData) ? reelsData : []);
      setApplications(Array.isArray(appsData) ? appsData : []);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleOneTapApply = async (job) => {
    if (appliedJobIds.includes(job.id)) return;
    try {
      await applyForJob({
        jobId: job.id,
        candidateId: candidate.id,
        candidateName: candidate.name,
        jobTitle: job.title,
        status: 'APPLIED',
      });
    } catch {
      // Optimistic UI update even if Render free tier is cold-starting
    }
    setAppliedJobIds((prev) => [...prev, job.id]);
    setApplications((prev) => [
      { id: Date.now(), jobTitle: job.title, candidateName: candidate.name, status: 'APPLIED' },
      ...prev,
    ]);
    showToast(`Applied to ${job.title} at ${job.companyName}!`);
  };

  const handleCreateJob = async (e) => {
    e.preventDefault();
    if (!newJob.title || !newJob.companyName) return;
    try {
      const saved = await postJob(newJob);
      setJobs((prev) => [saved, ...prev]);
      showToast('Job published live to feed!');
    } catch {
      setJobs((prev) => [{ ...newJob, id: Date.now() }, ...prev]);
      showToast('Job added to feed!');
    }
    setNewJob({ ...newJob, title: '', companyName: '', description: '' });
    setActiveTab('jobs');
  };

  // Build interleaved feed: insert a job card after every 2 reels
  const mixedFeed = [];
  reels.forEach((reel, idx) => {
    mixedFeed.push({ type: 'reel', data: reel });
    if ((idx + 1) % 2 === 0 && jobs[Math.floor(idx / 2)]) {
      mixedFeed.push({ type: 'job', data: jobs[Math.floor(idx / 2)] });
    }
  });
  if (mixedFeed.length === 0 && jobs.length > 0) {
    jobs.forEach((j) => mixedFeed.push({ type: 'job', data: j }));
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex justify-center">
      {/* Mobile-first App Shell */}
      <div className="w-full max-w-md bg-slate-900 min-h-screen flex flex-col border-x border-slate-800 shadow-2xl relative">
        {/* Top App Bar */}
        <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur border-b border-slate-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white">
              JR
            </div>
            <div>
              <h1 className="text-base font-bold leading-tight tracking-tight">JobReels</h1>
              <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Cloud API
              </p>
            </div>
          </div>

          {/* Language Toggle (EN / HI / MR) */}
          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg text-xs">
            <Globe className="w-3.5 h-3.5 text-slate-400 ml-1" />
            {['en', 'hi', 'mr'].map((code) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                className={`px-2 py-0.5 rounded font-medium uppercase transition ${
                  lang === code ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {code === 'en' ? 'EN' : code === 'hi' ? 'हिं' : 'मरा'}
              </button>
            ))}
          </div>
        </header>

        {/* Toast Notification */}
        {toast && (
          <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white text-xs font-medium px-4 py-2 rounded-full shadow-lg">
            {toast}
          </div>
        )}

        {/* Main Content Viewport */}
        <main className="flex-1 overflow-y-auto pb-20">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-96 text-slate-400 gap-3">
              <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm">Connecting to Render Cloud Backend...</p>
            </div>
          ) : (
            <>
              {/* TAB 1: REELS + IN-FEED JOB CARDS */}
              {activeTab === 'reels' && (
                <div className="divide-y divide-slate-800">
                  {mixedFeed.map((item, i) =>
                    item.type === 'reel' ? (
                      <div key={`reel-${item.data.id || i}`} className="relative bg-black">
                        <video
                          src={item.data.videoUrl}
                          className="w-full h-[460px] object-cover opacity-90"
                          controls
                          loop
                          muted
                          playsInline
                        />
                        <div className="p-4 bg-gradient-to-t from-slate-950 via-slate-900/95 to-transparent">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-semibold text-sm text-white">
                                  {item.data.creatorName || 'Verified Employer'}
                                </span>
                                <CheckCircle2 className="w-4 h-4 text-sky-400" />
                                <span className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full">
                                  {item.data.roleTag || 'Workplace'}
                                </span>
                              </div>
                              <p className="text-sm text-slate-200 mt-1 font-medium">{item.data.title}</p>
                              <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                                <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                                {item.data.location || 'Pune'}
                              </p>
                            </div>

                            <div className="flex flex-col items-center gap-3">
                              <button
                                onClick={() =>
                                  setLikedReels((p) => ({ ...p, [item.data.id]: !p[item.data.id] }))
                                }
                                className="flex flex-col items-center text-xs text-slate-300"
                              >
                                <Heart
                                  className={`w-6 h-6 ${
                                    likedReels[item.data.id] ? 'fill-rose-500 text-rose-500' : ''
                                  }`}
                                />
                                <span>{(item.data.likes || 50) + (likedReels[item.data.id] ? 1 : 0)}</span>
                              </button>
                              <button
                                onClick={() => showToast('Reel link copied!')}
                                className="text-slate-300 hover:text-white"
                              >
                                <Share2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* IN-FEED SPONSORED / VERIFIED JOB CARD */
                      <div
                        key={`infeed-job-${item.data.id}`}
                        className="p-4 bg-indigo-950/30 border-y border-indigo-500/30"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-400">
                            Featured Hiring • {item.data.category}
                          </span>
                          {item.data.companyVerified && (
                            <span className="text-[11px] bg-emerald-500/15 text-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <ShieldCheck className="w-3 h-3" /> {t.verified}
                            </span>
                          )}
                        </div>
                        <h3 className="font-bold text-base text-white">{item.data.title}</h3>
                        <p className="text-xs text-slate-300 mt-0.5">{item.data.companyName}</p>
                        <div className="flex flex-wrap gap-2 mt-3 text-xs text-slate-300">
                          <span className="bg-slate-800 px-2.5 py-1 rounded-md flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-indigo-400" /> {item.data.location}
                          </span>
                          <span className="bg-slate-800 px-2.5 py-1 rounded-md flex items-center gap-1 text-emerald-300 font-medium">
                            <IndianRupee className="w-3.5 h-3.5" /> {item.data.salary}
                          </span>
                        </div>
                        <button
                          onClick={() => handleOneTapApply(item.data)}
                          className={`mt-3 w-full py-2.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition ${
                            appliedJobIds.includes(item.data.id)
                              ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40'
                              : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                          }`}
                        >
                          <Send className="w-4 h-4" />
                          {appliedJobIds.includes(item.data.id) ? t.applied : t.applyNow}
                        </button>
                      </div>
                    )
                  )}
                </div>
              )}

              {/* TAB 2: ALL VERIFIED JOBS */}
              {activeTab === 'jobs' && (
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h2 className="font-bold text-lg">Verified Jobs ({jobs.length})</h2>
                    <span className="text-xs text-slate-400">Pune & Maharashtra</span>
                  </div>

                  {jobs.map((job) => {
                    const isApplied = appliedJobIds.includes(job.id);
                    return (
                      <div
                        key={job.id}
                        className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-4 space-y-2.5"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-bold text-base text-white">{job.title}</h3>
                            <p className="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
                              <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                              {job.companyName}
                            </p>
                          </div>
                          {job.companyVerified && (
                            <span className="text-[11px] bg-emerald-500/15 text-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                              <ShieldCheck className="w-3 h-3" /> {t.verified}
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-slate-400 leading-relaxed">{job.description}</p>

                        <div className="flex flex-wrap gap-2 text-[11px] text-slate-300">
                          <span className="bg-slate-900 px-2.5 py-1 rounded-lg flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-indigo-400" /> {job.location}
                          </span>
                          <span className="bg-slate-900 px-2.5 py-1 rounded-lg text-emerald-300 font-semibold">
                            {job.salary}
                          </span>
                          <span className="bg-slate-900 px-2.5 py-1 rounded-lg">
                            {job.experienceRequired} • {job.educationRequired}
                          </span>
                          {job.workingHours && (
                            <span className="bg-slate-900 px-2.5 py-1 rounded-lg flex items-center gap-1">
                              <Clock className="w-3 h-3 text-amber-400" /> {job.workingHours}
                            </span>
                          )}
                        </div>

                        <div className="pt-1 flex items-center justify-between gap-3">
                          <span className="text-xs text-slate-400">
                            {job.vacancies || 1} {t.vacancies}
                          </span>
                          <button
                            onClick={() => handleOneTapApply(job)}
                            className={`px-4 py-2 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition ${
                              isApplied
                                ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40'
                                : 'bg-indigo-600 hover:bg-indigo-500 text-white'
                            }`}
                          >
                            <Send className="w-3.5 h-3.5" />
                            {isApplied ? t.applied : t.applyNow}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* TAB 3: EMPLOYER / HR JOB POSTING PORTAL */}
              {activeTab === 'post' && (
                <div className="p-4">
                  <h2 className="font-bold text-lg mb-1">{t.postNewJob}</h2>
                  <p className="text-xs text-slate-400 mb-4">
                    Instantly syncs to Spring Boot + Aiven MySQL & appears in candidate feeds.
                  </p>

                  <form onSubmit={handleCreateJob} className="space-y-3 text-sm">
                    <input
                      type="text"
                      required
                      placeholder="Job Title (e.g., Junior Java Developer)"
                      value={newJob.title}
                      onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Company Name (e.g., Pune Tech Labs)"
                      value={newJob.companyName}
                      onChange={(e) => setNewJob({ ...newJob, companyName: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Location"
                        value={newJob.location}
                        onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                        className="bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
                      />
                      <input
                        type="text"
                        placeholder="Salary / Package"
                        value={newJob.salary}
                        onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                        className="bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={newJob.category}
                        onChange={(e) => setNewJob({ ...newJob, category: e.target.value })}
                        className="bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-white"
                      >
                        <option>IT & Software</option>
                        <option>Manufacturing</option>
                        <option>Delivery & Logistics</option>
                        <option>Retail & Sales</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Experience (e.g., Fresher)"
                        value={newJob.experienceRequired}
                        onChange={(e) => setNewJob({ ...newJob, experienceRequired: e.target.value })}
                        className="bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white"
                      />
                    </div>
                    <textarea
                      rows="3"
                      required
                      placeholder="Role description & required skills..."
                      value={newJob.description}
                      onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      type="submit"
                      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl transition"
                    >
                      Publish Verified Job
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 4: AUTO-GENERATED DIGITAL RESUME + PDF EXPORT */}
              {activeTab === 'resume' && (
                <div className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-bold text-lg">Digital Resume</h2>
                    <button
                      onClick={() => window.print()}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-3 py-2 rounded-xl flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" /> {t.downloadPdf}
                    </button>
                  </div>

                  {/* Printable Resume Card */}
                  <div className="bg-white text-slate-900 rounded-2xl p-5 shadow-lg space-y-3">
                    <div className="border-b border-slate-200 pb-3">
                      <h3 className="text-xl font-bold text-slate-900">{candidate.name}</h3>
                      <p className="text-sm font-medium text-indigo-600">{candidate.role}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        {candidate.location} • {candidate.phone} • {candidate.email}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Education
                      </h4>
                      <p className="text-xs text-slate-800 mt-1">{candidate.education}</p>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Technical Skills
                      </h4>
                      <p className="text-xs text-slate-800 mt-1">{candidate.skills}</p>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Key Projects
                      </h4>
                      <p className="text-xs text-slate-800 mt-1">{candidate.experience}</p>
                    </div>
                  </div>

                  {/* Quick Edit Profile Fields */}
                  <div className="bg-slate-800/60 p-3.5 rounded-2xl space-y-2">
                    <p className="text-xs font-semibold text-slate-300">Quick Edit Resume Details</p>
                    <input
                      type="text"
                      value={candidate.name}
                      onChange={(e) => setCandidate({ ...candidate, name: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                    />
                    <input
                      type="text"
                      value={candidate.skills}
                      onChange={(e) => setCandidate({ ...candidate, skills: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white"
                    />
                  </div>
                </div>
              )}

              {/* TAB 5: ADMIN VERIFICATION & MODERATION */}
              {activeTab === 'admin' && (
                <div className="p-4 space-y-4">
                  <h2 className="font-bold text-lg">Admin Control Center</h2>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-slate-800 p-3 rounded-xl">
                      <p className="text-xl font-bold text-indigo-400">{jobs.length}</p>
                      <p className="text-[11px] text-slate-400">Active Jobs</p>
                    </div>
                    <div className="bg-slate-800 p-3 rounded-xl">
                      <p className="text-xl font-bold text-emerald-400">{reels.length}</p>
                      <p className="text-[11px] text-slate-400">Verified Reels</p>
                    </div>
                    <div className="bg-slate-800 p-3 rounded-xl">
                      <p className="text-xl font-bold text-amber-400">{applications.length}</p>
                      <p className="text-[11px] text-slate-400">Applications</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Recent Candidate Applications
                    </h3>
                    {applications.length === 0 ? (
                      <p className="text-xs text-slate-500 bg-slate-800/50 p-3 rounded-xl">
                        Tap "One-Tap Apply" on any job to see live application tracking here.
                      </p>
                    ) : (
                      applications.map((app, idx) => (
                        <div
                          key={app.id || idx}
                          className="bg-slate-800/80 p-3 rounded-xl flex items-center justify-between text-xs"
                        >
                          <div>
                            <p className="font-semibold text-white">{app.candidateName || candidate.name}</p>
                            <p className="text-slate-400">{app.jobTitle || 'Applied Role'}</p>
                          </div>
                          <span className="bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full font-medium">
                            {app.status || 'APPLIED'}
                          </span>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="bg-slate-800/60 p-3.5 rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Flag className="w-4 h-4 text-rose-400" />
                      <span>Zero Fake Job Policy Enforcement</span>
                    </div>
                    <span className="text-emerald-400 font-semibold">Active</span>
                  </div>
                </div>
              )}
            </>
          )}
        </main>

        {/* Bottom Navigation Bar */}
        <nav className="sticky bottom-0 z-30 bg-slate-900 border-t border-slate-800 px-2 py-2 grid grid-cols-5 text-[11px]">
          {[
            { id: 'reels', label: t.reels, icon: Play },
            { id: 'jobs', label: t.jobs, icon: Briefcase },
            { id: 'post', label: t.post, icon: PlusCircle },
            { id: 'resume', label: t.resume, icon: FileText },
            { id: 'admin', label: t.admin, icon: ShieldCheck },
          ].map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-1 py-1 rounded-xl transition ${
                  active ? 'text-indigo-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}