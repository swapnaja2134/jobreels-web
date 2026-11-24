import React, { useState, useEffect } from "react";
import {
  Play,
  Briefcase,
  PlusCircle,
  FileText,
  Shield,
  MapPin,
  Clock,
  CheckCircle2,
  Send,
  Heart,
  Volume2,
  VolumeX,
  Globe,
  Search,
  Sun,
  Moon,
  Lock,
  LogOut,
  Wifi,
  Download,
  Bookmark,
  X,
  Share2,
  Trash2,
  SlidersHorizontal,
  Sparkles,
  Award,
  Phone,
  ChevronRight,
} from "lucide-react";

const API_BASE = "https://jobreels-backend.onrender.com";

const TRANSLATIONS = {
  EN: {
    reels: "Reels",
    jobs: "Jobs",
    jobPost: "Job Post",
    resume: "Resume",
    admin: "Admin",
    verifiedJobs: "Explore Opportunities",
    searchPlaceholder: "Search job title, company, or location...",
    oneTapApply: "One-Tap Apply",
    applied: "Applied",
    postTitle: "Post a New Job",
    postSub: "Publish verified openings directly to the candidate feed.",
    selectRole: "Job Role",
    customRolePlaceholder: "Enter custom job title...",
    companyPlaceholder: "Company / Organization Name",
    remoteLabel: "Remote Work Option",
    publishBtn: "Publish Job Listing",
    adminLoginTitle: "Admin Portal",
    adminLoginSub: "Sign in with administrator credentials to manage listings.",
    unlockBtn: "Sign In",
  },
  HI: {
    reels: "रील्स",
    jobs: "नौकरियां",
    jobPost: "जॉब पोस्ट",
    resume: "बायोडाटा",
    admin: "एडमिन",
    verifiedJobs: "सत्यापित नौकरियां",
    searchPlaceholder: "पद, कंपनी या शहर खोजें...",
    oneTapApply: "एक-टैप आवेदन",
    applied: "आवेदित",
    postTitle: "नई नौकरी पोस्ट करें",
    postSub: "उम्मीदवारों के लिए सत्यापित नौकरी प्रकाशित करें।",
    selectRole: "जॉब रोल चुनें",
    customRolePlaceholder: "कस्टम जॉब टाइटल लिखें...",
    companyPlaceholder: "कंपनी का नाम",
    remoteLabel: "रिमोट (वर्क फ्रॉम होम)",
    publishBtn: "नौकरी प्रकाशित करें",
    adminLoginTitle: "एडमिन पोर्टल",
    adminLoginSub: "प्रबंधन के लिए एडमिन पासवर्ड दर्ज करें।",
    unlockBtn: "साइन इन करें",
  },
  MR: {
    reels: "रील्स",
    jobs: "नोकऱ्या",
    jobPost: "जॉब पोस्ट",
    resume: "बायोडाटा",
    admin: "अॅडमिन",
    verifiedJobs: "सत्यापित नोकऱ्या",
    searchPlaceholder: "पद, कंपनी किंवा ठिकाण शोधा...",
    oneTapApply: "वन-टॅप अर्ज",
    applied: "अर्ज केला",
    postTitle: "नवीन नोकरी पोस्ट करा",
    postSub: "उमेदवारांसाठी सत्यापित नोकरी प्रकाशित करा.",
    selectRole: "जॉब रोल निवडा",
    customRolePlaceholder: "कस्टम जॉब नाव लिहा...",
    companyPlaceholder: "कंपनीचे नाव",
    remoteLabel: "रिमोट (घरून काम)",
    publishBtn: "नोकरी प्रकाशित करा",
    adminLoginTitle: "अॅडमिन पोर्टल",
    adminLoginSub: "व्यवस्थापनासाठी अॅडमिन पासवर्ड टाका.",
    unlockBtn: "साइन इन करा",
  },
};

const ROLE_PRESETS = [
  "Junior Android Developer",
  "Full Stack Java Developer",
  "Real Estate Sales Executive",
  "Site Engineer / Civil Supervisor",
  "CRM & Telecalling Executive",
  "Digital Marketing Specialist",
  "CNC Machine Operator & Electrician",
  "Other",
];

const FILTER_CHIPS = ["All", "Remote", "IT & Software", "Real Estate", "Engineering"];

export default function App() {
  const [activeTab, setActiveTab] = useState("jobs");
  const [lang, setLang] = useState("EN");
  const [lightMode, setLightMode] = useState(true);

  const [jobs, setJobs] = useState([]);
  const [reels, setReels] = useState([]);
  const [applications, setApplications] = useState([]);
  const [appliedIds, setAppliedIds] = useState([]);
  const [savedIds, setSavedIds] = useState([]);
  const [likedReels, setLikedReels] = useState({});
  const [loading, setLoading] = useState(true);

  // Toast & Job Detail Modal
  const [toast, setToast] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  // Job Post State
  const [selectedRole, setSelectedRole] = useState(ROLE_PRESETS[0]);
  const [customRole, setCustomRole] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("Baner, Pune");
  const [salary, setSalary] = useState("₹3.5 LPA");
  const [isRemote, setIsRemote] = useState(false);
  const [category, setCategory] = useState("IT & Software");
  const [experience, setExperience] = useState("Fresher");
  const [description, setDescription] = useState("");
  const [posting, setPosting] = useState(false);

  // Admin Auth State
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState("");

  // Resume Builder State
  const [resumeData, setResumeData] = useState({
    fullName: "Swapnaja Khemkar",
    role: "Android & Full Stack Java Developer",
    phone: "+91 98765 43210",
    location: "Pune, Maharashtra",
    skills: "Java, Android SDK, XML, Retrofit, Spring Boot, MySQL, React",
    education: "B.E. Electrical Engineering • SPPU (2026)",
  });

  const [muted, setMuted] = useState(true);

  const t = TRANSLATIONS[lang];

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2800);
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [jobsRes, reelsRes] = await Promise.all([
        fetch(`${API_BASE}/api/jobs`),
        fetch(`${API_BASE}/api/reels`),
      ]);
      if (jobsRes.ok) {
        setJobs(await jobsRes.json());
      }
      if (reelsRes.ok) {
        setReels(await reelsRes.json());
      }
    } catch (err) {
      console.error("API fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleSaveJob = (e, id) => {
    e.stopPropagation();
    if (savedIds.includes(id)) {
      setSavedIds((prev) => prev.filter((item) => item !== id));
      showToast("Removed from saved jobs");
    } else {
      setSavedIds((prev) => [...prev, id]);
      showToast("Job saved to bookmarks");
    }
  };

  const handleApply = async (e, job) => {
    if (e) e.stopPropagation();
    if (appliedIds.includes(job.id)) return;

    setAppliedIds((prev) => [...prev, job.id]);
    const newApp = {
      id: Date.now(),
      jobId: job.id,
      jobTitle: job.title,
      companyName: job.companyName,
      candidateName: resumeData.fullName,
      appliedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setApplications((prev) => [newApp, ...prev]);
    showToast(`Applied to ${job.title} • Recruiter notified`);

    try {
      await fetch(`${API_BASE}/api/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: job.id,
          candidateId: 1,
          candidateName: resumeData.fullName,
          jobTitle: job.title,
          status: "APPLIED",
        }),
      });
    } catch (err) {
      console.error("Apply sync error:", err);
    }
  };

  const handlePublishJob = async (e) => {
    e.preventDefault();
    const finalTitle = selectedRole === "Other" ? customRole.trim() : selectedRole;
    if (!finalTitle || !companyName.trim()) return;

    setPosting(true);
    const finalLocation = isRemote ? `${location} (Remote)` : location;

    const payload = {
      title: finalTitle,
      companyName: companyName.trim(),
      location: finalLocation,
      salary: salary.trim() || "₹3.5 LPA",
      category,
      experience,
      description:
        description.trim() ||
        `${isRemote ? "Remote role. " : ""}Hiring a motivated ${finalTitle} to join ${companyName.trim()} and drive daily deliverables.`,
      shiftTiming: isRemote ? "Flexible / Remote" : "10:00 AM - 7:00 PM",
      openings: 2,
      verified: true,
    };

    try {
      const res = await fetch(`${API_BASE}/api/jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const created = await res.json();
        setJobs((prev) => [created, ...prev]);
        setCompanyName("");
        setCustomRole("");
        setDescription("");
        showToast("New job published live!");
        setActiveTab("jobs");
      }
    } catch (err) {
      console.error("Post job error:", err);
    } finally {
      setPosting(false);
    }
  };

  const handleDeleteJob = async (id) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
    showToast("Job listing removed");
    try {
      await fetch(`${API_BASE}/api/jobs/${id}`, { method: "DELETE" });
    } catch (e) {
      console.error("Delete sync:", e);
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPassword === "admin123" || adminPassword === "jobreels2026") {
      setIsAdminAuth(true);
      setAdminError("");
      setAdminPassword("");
      showToast("Authenticated as Administrator");
    } else {
      setAdminError("Invalid administrator password.");
    }
  };

  const toggleLikeReel = (id) => {
    setLikedReels((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredJobs = jobs.filter((job) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      (job.title || "").toLowerCase().includes(q) ||
      (job.companyName || "").toLowerCase().includes(q) ||
      (job.location || "").toLowerCase().includes(q) ||
      (job.description || "").toLowerCase().includes(q);

    if (!matchesSearch) return false;
    if (activeFilter === "All") return true;
    if (activeFilter === "Remote") {
      return (job.location || "").toLowerCase().includes("remote");
    }
    return (
      (job.category || "").toLowerCase().includes(activeFilter.toLowerCase()) ||
      (job.title || "").toLowerCase().includes(activeFilter.toLowerCase())
    );
  });

  const getInitials = (name) => {
    if (!name) return "JR";
    return name
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
  };

  // Theme tokens
  const bgMain = lightMode ? "bg-[#F4F6FA] text-slate-900" : "bg-[#090D16] text-slate-100";
  const shellBg = lightMode ? "bg-[#F8FAFC] border-slate-200/80" : "bg-[#0F172A] border-slate-800";
  const cardBg = lightMode
    ? "bg-white border-slate-200/90 shadow-[0_2px_10px_rgba(15,23,42,0.04)]"
    : "bg-[#161F33] border-slate-800";
  const inputBg = lightMode
    ? "bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/15"
    : "bg-[#1E293B] border-slate-700 text-white placeholder-slate-400 focus:border-indigo-500";
  const mutedText = lightMode ? "text-slate-500" : "text-slate-400";
  const badgeBg = lightMode
    ? "bg-slate-100/90 text-slate-700 border-slate-200/80"
    : "bg-[#0F172A] text-slate-300 border-slate-700";

  return (
    <div className={`min-h-screen flex justify-center ${bgMain} transition-colors duration-200 font-sans`}>
      <div className={`w-full max-w-md min-h-screen flex flex-col border-x ${shellBg} relative pb-24 shadow-xl`}>
        {/* TOAST NOTIFICATION */}
        {toast && (
          <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm">
            <div className="bg-slate-900 text-white text-xs font-medium px-4 py-3 rounded-2xl shadow-lg flex items-center gap-2.5 border border-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{toast}</span>
            </div>
          </div>
        )}

        {/* TOP APP BAR */}
        <header
          className={`sticky top-0 z-30 px-4 py-3 border-b backdrop-blur-md flex items-center justify-between ${
            lightMode ? "bg-white/95 border-slate-200/80" : "bg-[#0F172A]/95 border-slate-800"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white font-extrabold text-sm flex items-center justify-center shadow-sm">
              JR
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-bold text-base tracking-tight leading-none">JobReels</h1>
                <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Pro
                </span>
              </div>
              <p className={`text-[11px] font-medium mt-0.5 flex items-center gap-1 ${mutedText}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Verified Hiring • Pune
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLightMode(!lightMode)}
              aria-label="Toggle Theme"
              className={`p-2 rounded-xl border transition ${
                lightMode
                  ? "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  : "bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700"
              }`}
            >
              {lightMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            <div
              className={`flex items-center rounded-xl p-0.5 border text-xs font-semibold ${
                lightMode ? "bg-slate-50 border-slate-200" : "bg-slate-800 border-slate-700"
              }`}
            >
              <Globe className={`w-3.5 h-3.5 mx-1.5 ${mutedText}`} />
              {["EN", "HI", "MR"].map((code) => (
                <button
                  key={code}
                  onClick={() => setLang(code)}
                  className={`px-2 py-1 rounded-lg transition ${
                    lang === code
                      ? "bg-indigo-600 text-white shadow-xs"
                      : lightMode
                      ? "text-slate-600 hover:text-slate-900"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {code === "EN" ? "EN" : code === "HI" ? "हिं" : "मरा"}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 p-4 space-y-4 overflow-y-auto">
          {/* 1. JOBS DISCOVERY TAB */}
          {activeTab === "jobs" && (
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold tracking-tight">{t.verifiedJobs}</h2>
                  <p className={`text-xs ${mutedText}`}>
                    {filteredJobs.length} active openings curated for you
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                  Direct HR
                </span>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className={`w-4 h-4 absolute left-3.5 top-3.5 ${mutedText}`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className={`w-full pl-10 pr-14 py-2.5 rounded-2xl border text-sm outline-none transition shadow-2xs ${inputBg}`}
                />
                {searchQuery ? (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3.5 top-3 text-xs text-indigo-600 font-semibold"
                  >
                    Clear
                  </button>
                ) : (
                  <SlidersHorizontal className={`w-4 h-4 absolute right-3.5 top-3.5 ${mutedText}`} />
                )}
              </div>

              {/* Quick Filter Pills */}
              <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                {FILTER_CHIPS.map((chip) => {
                  const isSelected = activeFilter === chip;
                  return (
                    <button
                      key={chip}
                      onClick={() => setActiveFilter(chip)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition ${
                        isSelected
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                          : lightMode
                          ? "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                          : "bg-slate-800 text-slate-300 border-slate-700"
                      }`}
                    >
                      {chip}
                    </button>
                  );
                })}
              </div>

              {/* Job Cards Feed */}
              {loading ? (
                <div className="space-y-3">
                  {[1, 2].map((n) => (
                    <div key={n} className={`p-4 rounded-2xl border animate-pulse space-y-3 ${cardBg}`}>
                      <div className="h-4 bg-slate-200 rounded w-2/3" />
                      <div className="h-3 bg-slate-200 rounded w-1/3" />
                      <div className="h-10 bg-slate-200 rounded w-full" />
                    </div>
                  ))}
                </div>
              ) : filteredJobs.length === 0 ? (
                <div className={`text-center py-12 rounded-2xl border ${cardBg}`}>
                  <p className="font-bold text-sm">No matching roles found</p>
                  <p className={`text-xs mt-1 ${mutedText}`}>
                    Try clearing filters or searching a different keyword
                  </p>
                </div>
              ) : (
                filteredJobs.map((job) => {
                  const isApplied = appliedIds.includes(job.id);
                  const isSaved = savedIds.includes(job.id);
                  const remoteJob = (job.location || "").toLowerCase().includes("remote");

                  return (
                    <div
                      key={job.id}
                      onClick={() => setSelectedJob(job)}
                      className={`p-4 rounded-2xl border space-y-3 transition active:scale-[0.99] cursor-pointer ${cardBg}`}
                    >
                      <div className="flex items-start justify-between gap-2.5">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100 font-bold text-xs flex items-center justify-center shrink-0">
                            {getInitials(job.companyName)}
                          </div>
                          <div>
                            <h3 className="font-bold text-[15px] leading-snug">{job.title}</h3>
                            <p className={`text-xs font-medium mt-0.5 ${mutedText}`}>
                              {job.companyName}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={(e) => toggleSaveJob(e, job.id)}
                          aria-label="Save Job"
                          className={`p-2 rounded-xl border transition ${
                            isSaved
                              ? "bg-indigo-50 border-indigo-200 text-indigo-600"
                              : lightMode
                              ? "bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-700"
                              : "bg-slate-800 border-slate-700 text-slate-400"
                          }`}
                        >
                          <Bookmark className={`w-4 h-4 ${isSaved ? "fill-indigo-600" : ""}`} />
                        </button>
                      </div>

                      <p className={`text-xs leading-relaxed line-clamp-2 ${mutedText}`}>
                        {job.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 text-[11px] font-medium">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border ${badgeBg}`}>
                          <MapPin className="w-3 h-3 text-indigo-600" />
                          {job.location}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200/80 font-semibold">
                          {job.salary}
                        </span>
                        {remoteJob && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold">
                            <Wifi className="w-3 h-3" /> Remote
                          </span>
                        )}
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border ${badgeBg}`}>
                          <Clock className="w-3 h-3" />
                          {job.shiftTiming || "10:00 AM - 7:00 PM"}
                        </span>
                      </div>

                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Verified • {job.openings || 2} Openings
                        </span>
                        <button
                          onClick={(e) => handleApply(e, job)}
                          disabled={isApplied}
                          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                            isApplied
                              ? "bg-emerald-600 text-white"
                              : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs"
                          }`}
                        >
                          <Send className="w-3.5 h-3.5" />
                          {isApplied ? t.applied : t.oneTapApply}
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* 2. JOB POST TAB */}
          {activeTab === "post" && (
            <form onSubmit={handlePublishJob} className="space-y-4">
              <div>
                <h2 className="text-lg font-bold tracking-tight">{t.postTitle}</h2>
                <p className={`text-xs mt-0.5 ${mutedText}`}>{t.postSub}</p>
              </div>

              <div className={`p-4 rounded-2xl border space-y-3.5 ${cardBg}`}>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold">{t.selectRole}</label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none ${inputBg}`}
                  >
                    {ROLE_PRESETS.map((role) => (
                      <option key={role} value={role}>
                        {role === "Other" ? "Other (Custom Role)" : role}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedRole === "Other" && (
                  <input
                    type="text"
                    required
                    value={customRole}
                    onChange={(e) => setCustomRole(e.target.value)}
                    placeholder={t.customRolePlaceholder}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none ${inputBg}`}
                  />
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold">Company Name</label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder={t.companyPlaceholder}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none ${inputBg}`}
                  />
                </div>

                {/* Remote Toggle Row */}
                <div
                  className={`p-3 rounded-xl border flex items-center justify-between ${
                    lightMode ? "bg-slate-50 border-slate-200" : "bg-slate-800/60 border-slate-700"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <Wifi className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold">{t.remoteLabel}</p>
                      <p className={`text-[11px] ${mutedText}`}>
                        {isRemote ? "Enabled • Work From Home" : "Disabled • On-Site Office"}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsRemote(!isRemote)}
                    className={`w-12 h-6 rounded-full p-0.5 transition-colors ${
                      isRemote ? "bg-indigo-600" : "bg-slate-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${
                        isRemote ? "translate-x-6" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold">Location</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="City / Area"
                      className={`w-full px-3 py-2.5 rounded-xl border text-sm outline-none ${inputBg}`}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold">Compensation</label>
                    <input
                      type="text"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                      placeholder="e.g. ₹3.5 LPA"
                      className={`w-full px-3 py-2.5 rounded-xl border text-sm outline-none ${inputBg}`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold">Department</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className={`w-full px-3 py-2.5 rounded-xl border text-sm outline-none ${inputBg}`}
                    >
                      <option>IT & Software</option>
                      <option>Real Estate & Sales</option>
                      <option>Engineering & Field</option>
                      <option>Operations & CRM</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold">Experience</label>
                    <input
                      type="text"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      placeholder="e.g. Fresher / 1-2 Yrs"
                      className={`w-full px-3 py-2.5 rounded-xl border text-sm outline-none ${inputBg}`}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold">Role Overview</label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Key responsibilities & required skills..."
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none ${inputBg}`}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={posting}
                className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-sm transition flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                {posting ? "Publishing Listing..." : t.publishBtn}
              </button>
            </form>
          )}

          {/* 3. REELS TAB */}
          {activeTab === "reels" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold tracking-tight">Workplace Reels</h2>
                  <p className={`text-xs ${mutedText}`}>Short video previews from hiring teams</p>
                </div>
                <button
                  onClick={() => setMuted(!muted)}
                  className={`p-2 rounded-xl border ${cardBg}`}
                >
                  {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>

              {reels.map((reel) => {
                const isLiked = !!likedReels[reel.id];
                const likeCount = (reel.likes || 18) + (isLiked ? 1 : 0);

                return (
                  <div key={reel.id} className={`rounded-2xl border overflow-hidden ${cardBg}`}>
                    <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-indigo-800 p-6 text-white min-h-[240px] flex flex-col justify-between relative">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/15 backdrop-blur-xs">
                          Company Spotlight
                        </span>
                        <span className="text-[11px] text-indigo-200 font-medium">0:30 HD</span>
                      </div>

                      <div className="my-auto flex justify-center">
                        <button
                          onClick={() => showToast("Playing workplace spotlight preview")}
                          className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition"
                        >
                          <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                        </button>
                      </div>

                      <div>
                        <h3 className="font-bold text-base leading-snug">{reel.title}</h3>
                        <p className="text-xs text-indigo-200 mt-1">
                          {reel.creatorName} • {reel.roleTag || "Verified Employer"}
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-indigo-50 text-indigo-700 font-bold text-[11px] flex items-center justify-center">
                          {getInitials(reel.creatorName)}
                        </div>
                        <span className="font-semibold text-xs">{reel.creatorName}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                      </div>

                      <div className="flex items-center gap-2.5">
                        <button
                          onClick={() => toggleLikeReel(reel.id)}
                          className="text-xs font-semibold flex items-center gap-1 text-rose-600 px-2 py-1 rounded-lg hover:bg-rose-50 transition"
                        >
                          <Heart className={`w-4 h-4 ${isLiked ? "fill-rose-600" : ""}`} />
                          {likeCount}
                        </button>
                        <button
                          onClick={() => showToast("Reel link copied to clipboard")}
                          className={`p-1.5 rounded-lg border ${badgeBg}`}
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setActiveTab("jobs")}
                          className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold flex items-center gap-1"
                        >
                          Apply <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* 4. RESUME TAB */}
          {activeTab === "resume" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold tracking-tight">Candidate Profile</h2>
                  <p className={`text-xs ${mutedText}`}>Attached automatically on One-Tap Apply</p>
                </div>
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" /> Export PDF
                </button>
              </div>

              {/* Live Formatted Profile Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-700 text-white shadow-md space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg">{resumeData.fullName}</h3>
                    <p className="text-xs text-indigo-100 font-medium">{resumeData.role}</p>
                  </div>
                  <Award className="w-7 h-7 text-indigo-200" />
                </div>
                <div className="text-[11px] text-indigo-100 flex flex-wrap gap-3 pt-1">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 h-3" /> {resumeData.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {resumeData.location}
                  </span>
                </div>
                <p className="text-[11px] bg-white/15 px-3 py-2 rounded-xl leading-relaxed">
                  <b>Skills:</b> {resumeData.skills}
                </p>
                <p className="text-[11px] text-indigo-100">{resumeData.education}</p>
              </div>

              {/* Edit Details Card */}
              <div className={`p-4 rounded-2xl border space-y-3 ${cardBg}`}>
                <p className="text-xs font-bold">Edit Profile Information</p>
                <input
                  type="text"
                  value={resumeData.fullName}
                  onChange={(e) => setResumeData({ ...resumeData, fullName: e.target.value })}
                  className={`w-full px-3.5 py-2 rounded-xl border text-sm font-semibold ${inputBg}`}
                />
                <input
                  type="text"
                  value={resumeData.role}
                  onChange={(e) => setResumeData({ ...resumeData, role: e.target.value })}
                  className={`w-full px-3.5 py-2 rounded-xl border text-xs ${inputBg}`}
                />
                <div className="grid grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    value={resumeData.phone}
                    onChange={(e) => setResumeData({ ...resumeData, phone: e.target.value })}
                    className={`w-full px-3 py-2 rounded-xl border text-xs ${inputBg}`}
                  />
                  <input
                    type="text"
                    value={resumeData.location}
                    onChange={(e) => setResumeData({ ...resumeData, location: e.target.value })}
                    className={`w-full px-3 py-2 rounded-xl border text-xs ${inputBg}`}
                  />
                </div>
                <textarea
                  rows={2}
                  value={resumeData.skills}
                  onChange={(e) => setResumeData({ ...resumeData, skills: e.target.value })}
                  className={`w-full px-3.5 py-2 rounded-xl border text-xs ${inputBg}`}
                />
                <input
                  type="text"
                  value={resumeData.education}
                  onChange={(e) => setResumeData({ ...resumeData, education: e.target.value })}
                  className={`w-full px-3.5 py-2 rounded-xl border text-xs ${inputBg}`}
                />
              </div>
            </div>
          )}

          {/* 5. ADMIN TAB WITH PASSWORD LOGIN & LISTING MANAGEMENT */}
          {activeTab === "admin" && (
            <div className="space-y-4">
              {!isAdminAuth ? (
                <form
                  onSubmit={handleAdminLogin}
                  className={`p-6 rounded-2xl border space-y-4 mt-4 ${cardBg}`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold tracking-tight">{t.adminLoginTitle}</h2>
                    <p className={`text-xs mt-1 ${mutedText}`}>{t.adminLoginSub}</p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold">Administrator Password</label>
                    <input
                      type="password"
                      required
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      placeholder="••••••••"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none ${inputBg}`}
                    />
                  </div>

                  {adminError && (
                    <p className="text-xs font-semibold text-rose-600">{adminError}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-xs transition"
                  >
                    {t.unlockBtn}
                  </button>
                </form>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-bold tracking-tight">Admin Dashboard</h2>
                      <p className={`text-xs ${mutedText}`}>Live platform metrics & moderation</p>
                    </div>
                    <button
                      onClick={() => setIsAdminAuth(false)}
                      className="px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 text-xs font-semibold flex items-center gap-1"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Sign Out
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    <div className={`p-3.5 rounded-2xl border text-center ${cardBg}`}>
                      <p className="text-xl font-extrabold text-indigo-600">{jobs.length}</p>
                      <p className={`text-[11px] font-medium mt-0.5 ${mutedText}`}>Active Jobs</p>
                    </div>
                    <div className={`p-3.5 rounded-2xl border text-center ${cardBg}`}>
                      <p className="text-xl font-extrabold text-emerald-600">{reels.length}</p>
                      <p className={`text-[11px] font-medium mt-0.5 ${mutedText}`}>Reels</p>
                    </div>
                    <div className={`p-3.5 rounded-2xl border text-center ${cardBg}`}>
                      <p className="text-xl font-extrabold text-amber-600">{applications.length}</p>
                      <p className={`text-[11px] font-medium mt-0.5 ${mutedText}`}>Applicants</p>
                    </div>
                  </div>

                  {/* Manage Active Jobs */}
                  <div className="space-y-2">
                    <h3 className={`text-xs font-bold uppercase tracking-wider ${mutedText}`}>
                      Manage Published Listings
                    </h3>
                    {jobs.map((job) => (
                      <div
                        key={job.id}
                        className={`p-3 rounded-xl border flex items-center justify-between gap-2 ${cardBg}`}
                      >
                        <div className="min-w-0">
                          <p className="text-xs font-bold truncate">{job.title}</p>
                          <p className={`text-[11px] truncate ${mutedText}`}>
                            {job.companyName} • {job.location}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDeleteJob(job.id)}
                          title="Remove Listing"
                          className="p-2 rounded-lg text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Recent Applications */}
                  <div className="space-y-2">
                    <h3 className={`text-xs font-bold uppercase tracking-wider ${mutedText}`}>
                      Recent Applications
                    </h3>
                    {applications.length === 0 ? (
                      <div className={`p-4 rounded-xl border text-xs ${cardBg} ${mutedText}`}>
                        No new candidate applications in this session yet.
                      </div>
                    ) : (
                      applications.map((app) => (
                        <div
                          key={app.id}
                          className={`p-3.5 rounded-xl border flex items-center justify-between ${cardBg}`}
                        >
                          <div>
                            <p className="text-xs font-bold">{app.jobTitle}</p>
                            <p className={`text-[11px] ${mutedText}`}>
                              {app.candidateName} • {app.companyName}
                            </p>
                          </div>
                          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                            {app.appliedAt}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </main>

        {/* JOB DETAILS BOTTOM SHEET MODAL */}
        {selectedJob && (
          <div
            onClick={() => setSelectedJob(null)}
            className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex items-end justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-md rounded-t-3xl p-5 space-y-4 border-t shadow-2xl ${
                lightMode ? "bg-white border-slate-200" : "bg-[#161F33] border-slate-800"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-700 border border-indigo-100 font-bold text-sm flex items-center justify-center">
                    {getInitials(selectedJob.companyName)}
                  </div>
                  <div>
                    <h3 className="font-bold text-base">{selectedJob.title}</h3>
                    <p className={`text-xs font-medium ${mutedText}`}>{selectedJob.companyName}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedJob(null)}
                  className={`p-2 rounded-full ${badgeBg}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                <span className={`px-3 py-1 rounded-xl border font-medium ${badgeBg}`}>
                  📍 {selectedJob.location}
                </span>
                <span className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                  💰 {selectedJob.salary}
                </span>
                <span className={`px-3 py-1 rounded-xl border font-medium ${badgeBg}`}>
                  🕒 {selectedJob.shiftTiming || "10:00 AM - 7:00 PM"}
                </span>
              </div>

              <div className="space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Role Description
                </h4>
                <p className={`text-xs leading-relaxed ${mutedText}`}>{selectedJob.description}</p>
              </div>

              <div className="pt-2 flex gap-2.5">
                <button
                  onClick={(e) => toggleSaveJob(e, selectedJob.id)}
                  className={`px-4 py-3 rounded-2xl border text-xs font-semibold ${badgeBg}`}
                >
                  {savedIds.includes(selectedJob.id) ? "Saved ★" : "Save"}
                </button>
                <button
                  onClick={(e) => {
                    handleApply(e, selectedJob);
                    setSelectedJob(null);
                  }}
                  disabled={appliedIds.includes(selectedJob.id)}
                  className={`flex-1 py-3 rounded-2xl text-xs font-semibold text-white transition ${
                    appliedIds.includes(selectedJob.id)
                      ? "bg-emerald-600"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                >
                  {appliedIds.includes(selectedJob.id) ? "Application Submitted ✓" : "Submit One-Tap Application"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* BOTTOM NAVIGATION BAR */}
        <nav
          className={`fixed bottom-0 w-full max-w-md border-t px-2 py-2 flex justify-around items-center z-30 backdrop-blur-md ${
            lightMode ? "bg-white/95 border-slate-200/90" : "bg-[#0F172A]/95 border-slate-800"
          }`}
        >
          {[
            { id: "reels", label: t.reels, icon: Play },
            { id: "jobs", label: t.jobs, icon: Briefcase },
            { id: "post", label: t.jobPost, icon: PlusCircle },
            { id: "resume", label: t.resume, icon: FileText },
            { id: "admin", label: t.admin, icon: Shield },
          ].map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-2xl text-[11px] font-semibold transition ${
                  active
                    ? "text-indigo-600 bg-indigo-50/80"
                    : lightMode
                    ? "text-slate-500 hover:text-slate-900"
                    : "text-slate-400 hover:text-white"
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