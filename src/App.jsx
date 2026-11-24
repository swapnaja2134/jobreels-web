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
  Building2,
  Download,
} from "lucide-react";

const API_BASE = "https://jobreels-backend.onrender.com";

const TRANSLATIONS = {
  EN: {
    reels: "Reels",
    jobs: "Jobs",
    jobPost: "Job Post",
    resume: "Resume",
    admin: "Admin",
    verifiedJobs: "Verified Jobs",
    searchPlaceholder: "Search role, company, location...",
    oneTapApply: "One-Tap Apply",
    applied: "Applied ✓",
    postTitle: "Post New Job Opening",
    postSub: "Instantly syncs to cloud database & appears in candidate feeds.",
    selectRole: "Select Job Role",
    customRolePlaceholder: "Enter custom job title...",
    companyPlaceholder: "Company Name (e.g., Pune Tech Labs)",
    remoteLabel: "Work Mode:",
    publishBtn: "Publish Verified Job",
    adminLoginTitle: "Admin Verification Login",
    adminLoginSub: "Enter administrator password to access Control Center.",
    unlockBtn: "Unlock Admin Panel",
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
    applied: "आवेदन किया ✓",
    postTitle: "नई नौकरी पोस्ट करें",
    postSub: "तुरंत क्लाउड डेटाबेस से जुड़ता है और उम्मीदवारों को दिखता है।",
    selectRole: "जॉब रोल चुनें",
    customRolePlaceholder: "कस्टम जॉब टाइटल लिखें...",
    companyPlaceholder: "कंपनी का नाम",
    remoteLabel: "कार्य प्रकार:",
    publishBtn: "सत्यापित नौकरी प्रकाशित करें",
    adminLoginTitle: "एडमिन लॉगिन",
    adminLoginSub: "कंट्रोल सेंटर खोलने के लिए पासवर्ड दर्ज करें।",
    unlockBtn: "अनलॉक करें",
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
    applied: "अर्ज केला ✓",
    postTitle: "नवीन नोकरी पोस्ट करा",
    postSub: "थेट क्लाउड डेटाबेसशी जोडले जाते आणि उमेदवारांना दिसते.",
    selectRole: "जॉब रोल निवडा",
    customRolePlaceholder: "कस्टम जॉब नाव लिहा...",
    companyPlaceholder: "कंपनीचे नाव",
    remoteLabel: "कामाचा प्रकार:",
    publishBtn: "नोकरी प्रकाशित करा",
    adminLoginTitle: "अॅडमिन लॉगिन",
    adminLoginSub: "कंट्रोल सेंटर उघडण्यासाठी पासवर्ड टाका.",
    unlockBtn: "लॉगिन करा",
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

export default function App() {
  const [activeTab, setActiveTab] = useState("jobs");
  const [lang, setLang] = useState("EN");
  const [lightMode, setLightMode] = useState(true);

  const [jobs, setJobs] = useState([]);
  const [reels, setReels] = useState([]);
  const [applications, setApplications] = useState([]);
  const [appliedIds, setAppliedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  // Job Search State
  const [searchQuery, setSearchQuery] = useState("");

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
  const [postSuccess, setPostSuccess] = useState("");

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
    education: "B.E. Electrical Engineering - SPPU (2026)",
  });

  // Reels mute state
  const [muted, setMuted] = useState(true);

  const t = TRANSLATIONS[lang];

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
        const jobsData = await jobsRes.json();
        setJobs(jobsData);
      }
      if (reelsRes.ok) {
        const reelsData = await reelsRes.json();
        setReels(reelsData);
      }
    } catch (err) {
      console.error("API fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (job) => {
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
    } catch (e) {
      console.error("Apply sync error:", e);
    }
  };

  const handlePublishJob = async (e) => {
    e.preventDefault();
    const finalTitle = selectedRole === "Other" ? customRole.trim() : selectedRole;
    if (!finalTitle || !companyName.trim()) return;

    setPosting(true);
    setPostSuccess("");
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
        `${isRemote ? "Remote opportunity. " : ""}Looking for a dedicated ${finalTitle} to join ${companyName.trim()}.`,
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
        setPostSuccess("Job published live! Switching to Jobs feed...");
        setCompanyName("");
        setCustomRole("");
        setDescription("");
        setTimeout(() => {
          setPostSuccess("");
          setActiveTab("jobs");
        }, 1000);
      }
    } catch (err) {
      console.error("Post job error:", err);
    } finally {
      setPosting(false);
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPassword === "admin123" || adminPassword === "jobreels2026") {
      setIsAdminAuth(true);
      setAdminError("");
      setAdminPassword("");
    } else {
      setAdminError("Incorrect password. Hint: use admin123");
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const q = searchQuery.toLowerCase();
    return (
      (job.title || "").toLowerCase().includes(q) ||
      (job.companyName || "").toLowerCase().includes(q) ||
      (job.location || "").toLowerCase().includes(q) ||
      (job.description || "").toLowerCase().includes(q)
    );
  });

  // Theme classes
  const bgMain = lightMode ? "bg-slate-100 text-slate-900" : "bg-[#0B0F19] text-slate-100";
  const shellBg = lightMode ? "bg-white border-slate-200" : "bg-[#0F172A] border-slate-800";
  const cardBg = lightMode
    ? "bg-white border-slate-200 shadow-sm"
    : "bg-[#161F33] border-slate-800";
  const inputBg = lightMode
    ? "bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-indigo-600"
    : "bg-[#1E293B] border-slate-700 text-white placeholder-slate-400 focus:border-indigo-500";
  const mutedText = lightMode ? "text-slate-500" : "text-slate-400";
  const badgeBg = lightMode
    ? "bg-slate-100 text-slate-700 border-slate-200"
    : "bg-[#0F172A] text-slate-300 border-slate-700";

  return (
    <div className={`min-h-screen flex justify-center ${bgMain} transition-colors duration-200`}>
      <div className={`w-full max-w-md min-h-screen flex flex-col border-x ${shellBg} relative pb-20`}>
        {/* TOP HEADER */}
        <header
          className={`sticky top-0 z-30 px-4 py-3 border-b backdrop-blur-md flex items-center justify-between ${
            lightMode ? "bg-white/95 border-slate-200" : "bg-[#0F172A]/95 border-slate-800"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center shadow-sm">
              JR
            </div>
            <div>
              <h1 className="font-bold text-base leading-tight">JobReels</h1>
              <p className="text-[11px] font-medium text-emerald-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Cloud API
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Light / Dark Toggle */}
            <button
              onClick={() => setLightMode(!lightMode)}
              title={lightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
              className={`p-2 rounded-lg border transition ${
                lightMode
                  ? "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
                  : "bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700"
              }`}
            >
              {lightMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            {/* Language Switcher */}
            <div
              className={`flex items-center rounded-lg p-0.5 border text-xs font-medium ${
                lightMode ? "bg-slate-100 border-slate-200" : "bg-slate-800 border-slate-700"
              }`}
            >
              <Globe className={`w-3.5 h-3.5 mx-1.5 ${mutedText}`} />
              {["EN", "HI", "MR"].map((code) => (
                <button
                  key={code}
                  onClick={() => setLang(code)}
                  className={`px-2 py-1 rounded-md transition ${
                    lang === code
                      ? "bg-indigo-600 text-white"
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

        {/* MAIN CONTENT */}
        <main className="flex-1 p-4 overflow-y-auto">
          {/* 1. JOBS TAB WITH SEARCH */}
          {activeTab === "jobs" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">
                  {t.verifiedJobs} ({filteredJobs.length})
                </h2>
                <span className={`text-xs ${mutedText}`}>Pune & Maharashtra</span>
              </div>

              {/* Search Input */}
              <div className="relative">
                <Search className={`w-4 h-4 absolute left-3.5 top-3.5 ${mutedText}`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.searchPlaceholder}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm outline-none transition ${inputBg}`}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-2.5 text-xs text-indigo-600 font-medium"
                  >
                    Clear
                  </button>
                )}
              </div>

              {loading ? (
                <div className={`text-center py-12 text-sm ${mutedText}`}>
                  Loading verified listings from cloud...
                </div>
              ) : filteredJobs.length === 0 ? (
                <div className={`text-center py-10 rounded-2xl border ${cardBg}`}>
                  <p className="font-semibold text-sm">No matching jobs found</p>
                  <p className={`text-xs mt-1 ${mutedText}`}>
                    Try searching another role, city, or "Remote"
                  </p>
                </div>
              ) : (
                filteredJobs.map((job) => {
                  const isApplied = appliedIds.includes(job.id);
                  const remoteJob = (job.location || "").toLowerCase().includes("remote");
                  return (
                    <div key={job.id} className={`p-4 rounded-2xl border space-y-3 ${cardBg}`}>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-bold text-base">{job.title}</h3>
                          <p className={`text-xs flex items-center gap-1 mt-0.5 ${mutedText}`}>
                            <Building2 className="w-3.5 h-3.5" />
                            {job.companyName}
                          </p>
                        </div>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" /> Verified
                        </span>
                      </div>

                      <p className={`text-xs leading-relaxed ${mutedText}`}>{job.description}</p>

                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border ${badgeBg}`}>
                          <MapPin className="w-3 h-3 text-indigo-600" />
                          {job.location}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
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

                      <div className="pt-1 flex items-center justify-between">
                        <span className={`text-xs ${mutedText}`}>
                          {job.openings || 2} Openings
                        </span>
                        <button
                          onClick={() => handleApply(job)}
                          disabled={isApplied}
                          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                            isApplied
                              ? "bg-emerald-600 text-white cursor-default"
                              : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
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

          {/* 2. JOB POST TAB (ROLE LIST + OTHER + REMOTE BUTTON) */}
          {activeTab === "post" && (
            <form onSubmit={handlePublishJob} className="space-y-4">
              <div>
                <h2 className="text-lg font-bold">{t.postTitle}</h2>
                <p className={`text-xs mt-0.5 ${mutedText}`}>{t.postSub}</p>
              </div>

              {postSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                  {postSuccess}
                </div>
              )}

              {/* Ready List of Job Roles + Other */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold">{t.selectRole}</label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none ${inputBg}`}
                >
                  {ROLE_PRESETS.map((role) => (
                    <option key={role} value={role}>
                      {role === "Other" ? "Other (Specify Custom Role)" : role}
                    </option>
                  ))}
                </select>
              </div>

              {/* Show Custom Input when "Other" is selected */}
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

              {/* Company Name */}
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder={t.companyPlaceholder}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none ${inputBg}`}
              />

              {/* Remote Toggle Button */}
              <div className={`p-3 rounded-xl border flex items-center justify-between ${cardBg}`}>
                <div className="flex items-center gap-2">
                  <Wifi className="w-4 h-4 text-indigo-600" />
                  <div>
                    <p className="text-xs font-semibold">{t.remoteLabel}</p>
                    <p className={`text-[11px] ${mutedText}`}>
                      {isRemote ? "Remote / Work From Home" : "On-Site Office"}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsRemote(!isRemote)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition ${
                    isRemote
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : lightMode
                      ? "bg-slate-100 text-slate-700 border-slate-300"
                      : "bg-slate-800 text-slate-300 border-slate-700"
                  }`}
                >
                  {isRemote ? "Remote: ON ✓" : "Remote: OFF"}
                </button>
              </div>

              {/* Location & Salary */}
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City / Area"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none ${inputBg}`}
                />
                <input
                  type="text"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder="Salary (e.g. ₹3.5 LPA)"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none ${inputBg}`}
                />
              </div>

              {/* Category & Experience */}
              <div className="grid grid-cols-2 gap-3">
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
                <input
                  type="text"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="Experience"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none ${inputBg}`}
                />
              </div>

              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Role description & required skills..."
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none ${inputBg}`}
              />

              <button
                type="submit"
                disabled={posting}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-sm transition"
              >
                {posting ? "Publishing..." : t.publishBtn}
              </button>
            </form>
          )}

          {/* 3. REELS TAB */}
          {activeTab === "reels" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">Workplace Reels ({reels.length})</h2>
                <button
                  onClick={() => setMuted(!muted)}
                  className={`p-2 rounded-lg border ${cardBg}`}
                >
                  {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>

              {reels.map((reel) => (
                <div key={reel.id} className={`rounded-2xl border overflow-hidden ${cardBg}`}>
                  <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-900 p-6 text-white min-h-[210px] flex flex-col justify-between">
                    <span className="self-start px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/15 backdrop-blur-sm">
                      Verified Workplace Walkthrough
                    </span>
                    <div>
                      <h3 className="font-bold text-lg leading-snug">{reel.title}</h3>
                      <p className="text-xs text-indigo-100 mt-1">
                        {reel.creatorName} • {reel.roleTag || "Hiring Team"}
                      </p>
                    </div>
                  </div>
                  <div className="p-3.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs">{reel.creatorName}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-medium flex items-center gap-1 text-rose-600">
                        <Heart className="w-3.5 h-3.5 fill-rose-600" /> {reel.likes || 12}
                      </span>
                      <button
                        onClick={() => setActiveTab("jobs")}
                        className="px-3 py-1 rounded-lg bg-indigo-600 text-white text-xs font-semibold"
                      >
                        View Jobs
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 4. RESUME TAB */}
          {activeTab === "resume" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">Instant Digital Resume</h2>
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" /> Save PDF
                </button>
              </div>

              <div className={`p-4 rounded-2xl border space-y-3 ${cardBg}`}>
                <input
                  type="text"
                  value={resumeData.fullName}
                  onChange={(e) => setResumeData({ ...resumeData, fullName: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border text-sm font-semibold ${inputBg}`}
                />
                <input
                  type="text"
                  value={resumeData.role}
                  onChange={(e) => setResumeData({ ...resumeData, role: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border text-xs ${inputBg}`}
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={resumeData.phone}
                    onChange={(e) => setResumeData({ ...resumeData, phone: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg border text-xs ${inputBg}`}
                  />
                  <input
                    type="text"
                    value={resumeData.location}
                    onChange={(e) => setResumeData({ ...resumeData, location: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg border text-xs ${inputBg}`}
                  />
                </div>
                <textarea
                  rows={2}
                  value={resumeData.skills}
                  onChange={(e) => setResumeData({ ...resumeData, skills: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border text-xs ${inputBg}`}
                />
                <input
                  type="text"
                  value={resumeData.education}
                  onChange={(e) => setResumeData({ ...resumeData, education: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border text-xs ${inputBg}`}
                />
              </div>
            </div>
          )}

          {/* 5. ADMIN TAB WITH PASSWORD LOGIN */}
          {activeTab === "admin" && (
            <div className="space-y-4">
              {!isAdminAuth ? (
                <form onSubmit={handleAdminLogin} className={`p-5 rounded-2xl border space-y-4 mt-4 ${cardBg}`}>
                  <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold">{t.adminLoginTitle}</h2>
                    <p className={`text-xs mt-1 ${mutedText}`}>{t.adminLoginSub}</p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold">Admin Password</label>
                    <input
                      type="password"
                      required
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      placeholder="Enter password (admin123)"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-sm outline-none ${inputBg}`}
                    />
                    <p className={`text-[11px] ${mutedText}`}>Demo Password: <b>admin123</b></p>
                  </div>

                  {adminError && (
                    <p className="text-xs font-semibold text-rose-600">{adminError}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition"
                  >
                    {t.unlockBtn}
                  </button>
                </form>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold">Admin Control Center</h2>
                    <button
                      onClick={() => setIsAdminAuth(false)}
                      className="px-3 py-1.5 rounded-lg border border-rose-200 bg-rose-50 text-rose-700 text-xs font-semibold flex items-center gap-1"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Logout
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5">
                    <div className={`p-3.5 rounded-2xl border text-center ${cardBg}`}>
                      <p className="text-xl font-bold text-indigo-600">{jobs.length}</p>
                      <p className={`text-[11px] mt-0.5 ${mutedText}`}>Active Jobs</p>
                    </div>
                    <div className={`p-3.5 rounded-2xl border text-center ${cardBg}`}>
                      <p className="text-xl font-bold text-emerald-600">{reels.length}</p>
                      <p className={`text-[11px] mt-0.5 ${mutedText}`}>Verified Reels</p>
                    </div>
                    <div className={`p-3.5 rounded-2xl border text-center ${cardBg}`}>
                      <p className="text-xl font-bold text-amber-600">{applications.length}</p>
                      <p className={`text-[11px] mt-0.5 ${mutedText}`}>Applications</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className={`text-xs font-bold tracking-wider uppercase ${mutedText}`}>
                      Recent Candidate Applications
                    </h3>
                    {applications.length === 0 ? (
                      <div className={`p-4 rounded-xl border text-xs ${cardBg} ${mutedText}`}>
                        Tap "One-Tap Apply" on any job to see live application tracking here.
                      </div>
                    ) : (
                      applications.map((app) => (
                        <div key={app.id} className={`p-3.5 rounded-xl border flex items-center justify-between ${cardBg}`}>
                          <div>
                            <p className="text-xs font-bold">{app.jobTitle}</p>
                            <p className={`text-[11px] ${mutedText}`}>
                              {app.candidateName} • {app.companyName}
                            </p>
                          </div>
                          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                            {app.appliedAt}
                          </span>
                        </div>
                      ))
                    )}
                  </div>

                  <div className={`p-3.5 rounded-xl border flex items-center justify-between ${cardBg}`}>
                    <span className="text-xs font-semibold">Zero Fake Job Policy Enforcement</span>
                    <span className="text-xs font-bold text-emerald-600">Active</span>
                  </div>
                </>
              )}
            </div>
          )}
        </main>

        {/* BOTTOM NAVIGATION BAR */}
        <nav
          className={`fixed bottom-0 w-full max-w-md border-t px-2 py-2 flex justify-around items-center z-30 ${
            lightMode ? "bg-white border-slate-200" : "bg-[#0F172A] border-slate-800"
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
                className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl text-[11px] font-semibold transition ${
                  active
                    ? "text-indigo-600"
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