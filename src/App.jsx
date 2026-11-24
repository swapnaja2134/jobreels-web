import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Briefcase,
  PlusCircle,
  FileText,
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
  Phone,
  Mail,
  ChevronRight,
  RotateCcw,
  User,
  Upload,
  FileCheck2,
  Check,
  AlertTriangle,
} from "lucide-react";

const API_BASE = "https://jobreels-backend.onrender.com";

const TRANSLATIONS = {
  EN: {
    reels: "Reels",
    jobs: "Jobs",
    jobPost: "Job Post",
    resume: "Resume",
    profile: "Profile",
    verifiedJobs: "Explore Opportunities",
    searchPlaceholder: "Search job title, company, skills, or city...",
    oneTapApply: "One-Tap Apply",
    applied: "Applied",
    postTitle: "Post a New Job",
    postSub: "Publish verified openings directly to the candidate feed.",
    selectRole: "Job Role",
    customRolePlaceholder: "Enter custom job title...",
    companyPlaceholder: "e.g., Skyline Properties Pvt Ltd",
    remoteLabel: "Remote Work Option",
    publishBtn: "Publish Job Listing",
    adminLoginTitle: "Admin Portal",
    adminLoginSub: "Sign in with administrator credentials to manage listings.",
    unlockBtn: "Sign In",
    myProfileTitle: "My Profile",
    myProfileSub: "Manage your uploaded resume and track job applications.",
  },
  HI: {
    reels: "रील्स",
    jobs: "नौकरियां",
    jobPost: "जॉब पोस्ट",
    resume: "बायोडाटा",
    profile: "प्रोफ़ाइल",
    verifiedJobs: "सत्यापित नौकरियां",
    searchPlaceholder: "पद, कंपनी, कौशल या शहर खोजें...",
    oneTapApply: "एक-टैप आवेदन",
    applied: "आवेदित",
    postTitle: "नई नौकरी पोस्ट करें",
    postSub: "उम्मीदवारों के लिए सत्यापित नौकरी प्रकाशित करें।",
    selectRole: "जॉब रोल चुनें",
    customRolePlaceholder: "कस्टम जॉब टाइटल लिखें...",
    companyPlaceholder: "कंपनी का नाम दर्ज करें",
    remoteLabel: "रिमोट (वर्क फ्रॉम होम)",
    publishBtn: "नौकरी प्रकाशित करें",
    adminLoginTitle: "एडमिन पोर्टल",
    adminLoginSub: "प्रबंधन के लिए एडमिन पासवर्ड दर्ज करें।",
    unlockBtn: "साइन इन करें",
    myProfileTitle: "मेरी प्रोफ़ाइल",
    myProfileSub: "अपना बायोडाटा अपलोड करें और आवेदनों को ट्रैक करें।",
  },
  MR: {
    reels: "रील्स",
    jobs: "नोकऱ्या",
    jobPost: "जॉब पोस्ट",
    resume: "बायोडाटा",
    profile: "प्रोफाईल",
    verifiedJobs: "सत्यापित नोकऱ्या",
    searchPlaceholder: "पद, कंपनी, कौशल्य किंवा शहर शोधा...",
    oneTapApply: "वन-टॅप अर्ज",
    applied: "अर्ज केला",
    postTitle: "नवीन नोकरी पोस्ट करा",
    postSub: "उमेदवारांसाठी सत्यापित नोकरी प्रकाशित करा.",
    selectRole: "जॉब रोल निवडा",
    customRolePlaceholder: "कस्टम जॉब नाव लिहा...",
    companyPlaceholder: "कंपनीचे नाव टाका",
    remoteLabel: "रिमोट (घरून काम)",
    publishBtn: "नोकरी प्रकाशित करा",
    adminLoginTitle: "अॅडमिन पोर्टल",
    adminLoginSub: "व्यवस्थापनासाठी अॅडमिन पासवर्ड टाका.",
    unlockBtn: "साइन इन करा",
    myProfileTitle: "माझी प्रोफाईल",
    myProfileSub: "तुमचा रेझ्युमे अपलोड करा आणि अर्जांची स्थिती पहा.",
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

const QUICK_CHIPS = ["All", "Remote", "IT & Software", "Real Estate", "Engineering"];
const APPLICATION_STAGES = ["Applied", "Under Review", "Shortlisted"];

const CURATED_REELS = [
  {
    id: "reel-1",
    title: "Life at Chakan Precision Engineering: CNC floor tour",
    creatorName: "Chakan Precision Engineering",
    roleTag: "Hiring CNC & Electrical • Chakan MIDC",
    likes: 48,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    posterUrl:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "reel-2",
    title: "Inside TechNova Solutions: Android & Java Engineering Desk",
    creatorName: "TechNova Solutions Pvt Ltd",
    roleTag: "Hiring Android Developers • Baner, Pune",
    likes: 74,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    posterUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "reel-3",
    title: "Skyline Realty Group: Walkthrough of our Balewadi Luxury Towers",
    creatorName: "Skyline Realty Group",
    roleTag: "Hiring Property Advisors • Balewadi High Street",
    likes: 62,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    posterUrl:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "reel-4",
    title: "A Day in the Life: Industrial Automation & Panel Testing Team",
    creatorName: "VoltEdge Electricals",
    roleTag: "Hiring Electrical Engineers • Bhosari MIDC",
    likes: 39,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoy.mp4",
    posterUrl:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "reel-5",
    title: "Remote Customer Success & CRM Operations at FinBridge",
    creatorName: "FinBridge Advisory",
    roleTag: "Work From Home • Pan-Maharashtra",
    likes: 55,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    posterUrl:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80",
  },
];

const CURATED_JOBS = [
  {
    id: 101,
    title: "Junior Android Developer",
    companyName: "TechNova Solutions Pvt Ltd",
    location: "Baner, Pune",
    salary: "₹3.5 LPA",
    category: "IT & Software",
    experience: "Fresher",
    description:
      "Build and maintain native Android applications using Java, XML, and Retrofit REST APIs alongside our mobile product team.",
    shiftTiming: "10:00 AM - 7:00 PM",
    openings: 3,
    verified: true,
  },
  {
    id: 102,
    title: "CNC Machine Operator & Electrician",
    companyName: "Chakan Precision Engineering",
    location: "Chakan MIDC, Pune",
    salary: "₹22,000 / month",
    category: "Engineering & Field",
    experience: "0-1 Year",
    description:
      "Operate CNC turning/milling machinery and handle industrial 3-phase electrical panel maintenance on the shop floor.",
    shiftTiming: "8:00 AM - 5:00 PM",
    openings: 4,
    verified: true,
  },
  {
    id: 103,
    title: "Real Estate Sales Executive",
    companyName: "Skyline Realty Group",
    location: "Balewadi, Pune",
    salary: "₹3.6 LPA + Incentives",
    category: "Real Estate & Sales",
    experience: "Fresher",
    description:
      "Conduct site visits for premium residential projects, advise homebuyers, and coordinate closures with the sales head.",
    shiftTiming: "10:00 AM - 7:00 PM",
    openings: 5,
    verified: true,
  },
  {
    id: 104,
    title: "Full Stack Java Developer",
    companyName: "CloudPulse Systems",
    location: "Hinjewadi Phase 1 (Remote)",
    salary: "₹4.5 LPA",
    category: "IT & Software",
    experience: "Fresher",
    description:
      "Develop Spring Boot microservices, MySQL schemas, and responsive React interfaces for enterprise SaaS workflows.",
    shiftTiming: "Flexible / Remote",
    openings: 2,
    verified: true,
  },
  {
    id: 105,
    title: "Site Engineer – Civil & Finishing",
    companyName: "VastuNirman Developers",
    location: "Wakad, Pune",
    salary: "₹28,000 / month",
    category: "Real Estate & Sales",
    experience: "Experienced",
    description:
      "Supervise daily RCC and interior finishing schedules, contractor billing, and quality checklists at high-rise sites.",
    shiftTiming: "9:30 AM - 6:30 PM",
    openings: 2,
    verified: true,
  },
  {
    id: 106,
    title: "Electrical Maintenance Engineer",
    companyName: "VoltEdge Electricals",
    location: "Bhosari MIDC, Pune",
    salary: "₹3.2 LPA",
    category: "Engineering & Field",
    experience: "Fresher",
    description:
      "Inspect switchgear assemblies, PLC wiring, and preventive maintenance schedules for automated manufacturing lines.",
    shiftTiming: "9:00 AM - 6:00 PM",
    openings: 3,
    verified: true,
  },
  {
    id: 107,
    title: "Pre-Sales & CRM Telecalling Executive",
    companyName: "UrbanNest Properties",
    location: "Kharadi, Pune (Remote)",
    salary: "₹24,000 / month",
    category: "Real Estate & Sales",
    experience: "Fresher",
    description:
      "Follow up with inbound property inquiries, schedule weekend site visits, and maintain daily lead updates in CRM.",
    shiftTiming: "Flexible / Remote",
    openings: 6,
    verified: true,
  },
  {
    id: 108,
    title: "React.js Frontend Developer",
    companyName: "PixelCraft Digital",
    location: "Viman Nagar, Pune (Remote)",
    salary: "₹4.0 LPA",
    category: "IT & Software",
    experience: "Fresher",
    description:
      "Convert Figma designs into fast, mobile-first React and Tailwind CSS web applications with clean REST API integration.",
    shiftTiming: "Flexible / Remote",
    openings: 2,
    verified: true,
  },
  {
    id: 109,
    title: "B2B Field Sales Officer",
    companyName: "MetroBuild Supplies",
    location: "Hadapsar, Pune",
    salary: "₹3.0 LPA + Travel",
    category: "Real Estate & Sales",
    experience: "Experienced",
    description:
      "Manage dealer relationships across Pune East and onboard commercial construction contractors for bulk material supply.",
    shiftTiming: "10:00 AM - 6:30 PM",
    openings: 4,
    verified: true,
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("reels");
  const [lang, setLang] = useState("EN");
  const [lightMode, setLightMode] = useState(true);

  const [jobs, setJobs] = useState(CURATED_JOBS);
  const [reels, setReels] = useState(CURATED_REELS);
  const [applications, setApplications] = useState([]);
  const [appliedIds, setAppliedIds] = useState([]);
  const [savedIds, setSavedIds] = useState([]);
  const [likedReels, setLikedReels] = useState({});
  const [playingReelId, setPlayingReelId] = useState(CURATED_REELS[0].id);
  const [loading, setLoading] = useState(false);

  // Toast & Job Detail Modal
  const [toast, setToast] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);

  // Enhanced Search & Multi-Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [workModeFilter, setWorkModeFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [experienceFilter, setExperienceFilter] = useState("All");
  const [onlySavedFilter, setOnlySavedFilter] = useState(false);

  // Job Post State
  const [selectedRole, setSelectedRole] = useState(ROLE_PRESETS[0]);
  const [customRole, setCustomRole] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [isRemote, setIsRemote] = useState(false);
  const [category, setCategory] = useState("IT & Software");
  const [experience, setExperience] = useState("Fresher");
  const [description, setDescription] = useState("");
  const [posting, setPosting] = useState(false);

  // Hidden Admin State (Double-tap JR logo to access)
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  // Candidate Profile & Resume Builder State (Synced across Profile & Resume)
  const [resumeData, setResumeData] = useState({
    fullName: "Aarav Deshmukh",
    role: "Android & Full Stack Java Developer",
    email: "aarav.deshmukh@gmail.com",
    phone: "+91 98234 56710",
    location: "Baner, Pune, Maharashtra",
    photoUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    summary:
      "Detail-oriented Software & Android Developer experienced in building native Java mobile apps, Spring Boot REST APIs, and responsive React web portals.",
    skills: "Java, Android SDK, XML, Retrofit, Spring Boot, MySQL, React.js, Git",
    experienceOrProjects:
      "• Built JobReels Native Android & Web Hiring Platform with live REST API integration.\n• Developed Cloud Library Management System with role-based JWT authentication.",
    education: "B.E. Engineering • Savitribai Phule Pune University (2026)",
  });

  // My Profile Resume Upload & Sub-tab State
  const [uploadedResume, setUploadedResume] = useState(null);
  const [profileSubTab, setProfileSubTab] = useState("applied");
  const fileInputRef = useRef(null);

  const [muted, setMuted] = useState(true);
  const t = TRANSLATIONS[lang];

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3200);
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
        const apiJobs = await jobsRes.json();
        if (Array.isArray(apiJobs) && apiJobs.length > 0) {
          const apiTitles = new Set(apiJobs.map((j) => (j.title || "").toLowerCase()));
          const extraCurated = CURATED_JOBS.filter(
            (cj) => !apiTitles.has(cj.title.toLowerCase())
          );
          setJobs([...apiJobs, ...extraCurated]);
        }
      }
      if (reelsRes.ok) {
        const apiReels = await reelsRes.json();
        if (Array.isArray(apiReels) && apiReels.length > 0) {
          const mergedReels = CURATED_REELS.map((cr, index) => {
            const apiItem = apiReels[index];
            return apiItem
              ? {
                  ...cr,
                  id: apiItem.id || cr.id,
                  likes: apiItem.likes || cr.likes,
                }
              : cr;
          });
          setReels(mergedReels);
        }
      }
    } catch (err) {
      console.error("API fetch fallback to curated data:", err);
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
      showToast("Saved to My Profile");
    }
  };

  const handleApply = async (e, job) => {
    if (e) e.stopPropagation();
    if (appliedIds.includes(job.id)) return;

    const applicantName = resumeData.fullName.trim() || "Aarav Deshmukh";
    const nextCount = applications.length + 1;

    setAppliedIds((prev) => [...prev, job.id]);
    const newApp = {
      id: Date.now(),
      jobId: job.id,
      jobTitle: job.title,
      companyName: job.companyName,
      location: job.location,
      salary: job.salary,
      candidateName: applicantName,
      resumeAttached: uploadedResume ? uploadedResume.name : `${applicantName}_Resume.pdf`,
      stageIndex: 0,
      appliedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      appliedDate: new Date().toLocaleDateString([], { day: "2-digit", month: "short" }),
    };
    setApplications((prev) => [newApp, ...prev]);
    setProfileSubTab("applied");
    showToast(`Applied to ${job.title}! Added to Applied Jobs (${nextCount})`);

    try {
      await fetch(`${API_BASE}/api/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: job.id,
          candidateId: 1,
          candidateName: applicantName,
          jobTitle: job.title,
          status: "APPLIED",
        }),
      });
    } catch (err) {
      console.error("Apply sync error:", err);
    }
  };

  const advanceApplicationStage = (appId) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === appId
          ? { ...app, stageIndex: (app.stageIndex + 1) % APPLICATION_STAGES.length }
          : app
      )
    );
    showToast("Application tracking stage updated");
  };

  const handleResumeFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const sizeKB = Math.max(1, Math.round(file.size / 1024));
    setUploadedResume({
      name: file.name,
      size: sizeKB > 1024 ? `${(sizeKB / 1024).toFixed(1)} MB` : `${sizeKB} KB`,
      uploadedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    });
    showToast(`Resume "${file.name}" attached to profile`);
  };

  const handlePublishJob = async (e) => {
    e.preventDefault();
    const finalTitle = selectedRole === "Other" ? customRole.trim() : selectedRole;
    if (!finalTitle || !companyName.trim()) return;

    setPosting(true);
    const baseLocation = location.trim() || "Pune, Maharashtra";
    const finalLocation = isRemote ? `${baseLocation} (Remote)` : baseLocation;

    const payload = {
      title: finalTitle,
      companyName: companyName.trim(),
      location: finalLocation,
      salary: salary.trim() || "₹3.5 LPA",
      category,
      experience,
      description:
        description.trim() ||
        `${isRemote ? "Remote opportunity. " : ""}Hiring a dedicated ${finalTitle} to join ${companyName.trim()} and drive daily operations.`,
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
      } else {
        setJobs((prev) => [{ id: Date.now(), ...payload }, ...prev]);
      }
      setCompanyName("");
      setCustomRole("");
      setLocation("");
      setSalary("");
      setDescription("");
      showToast("New job published live to feed!");
      setActiveTab("jobs");
    } catch (err) {
      setJobs((prev) => [{ id: Date.now(), ...payload }, ...prev]);
      showToast("New job published live to feed!");
      setActiveTab("jobs");
    } finally {
      setPosting(false);
    }
  };

  const handleDeleteJob = async (id) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
    setConfirmDeleteId(null);
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
      showToast("Signed in as Administrator");
    } else {
      setAdminError("Invalid administrator password.");
    }
  };

  const handleDownloadResumePDF = () => {
    if (!resumeData.fullName.trim()) {
      showToast("Please enter your Full Name before downloading PDF");
      return;
    }
    window.print();
  };

  const resetAllFilters = () => {
    setSearchQuery("");
    setWorkModeFilter("All");
    setCategoryFilter("All");
    setExperienceFilter("All");
    setOnlySavedFilter(false);
  };

  const activeFilterCount =
    (workModeFilter !== "All" ? 1 : 0) +
    (categoryFilter !== "All" ? 1 : 0) +
    (experienceFilter !== "All" ? 1 : 0) +
    (onlySavedFilter ? 1 : 0);

  const filteredJobs = jobs.filter((job) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      (job.title || "").toLowerCase().includes(q) ||
      (job.companyName || "").toLowerCase().includes(q) ||
      (job.location || "").toLowerCase().includes(q) ||
      (job.category || "").toLowerCase().includes(q) ||
      (job.description || "").toLowerCase().includes(q);

    if (!matchesSearch) return false;

    const isJobRemote = (job.location || "").toLowerCase().includes("remote");
    if (workModeFilter === "Remote" && !isJobRemote) return false;
    if (workModeFilter === "On-Site" && isJobRemote) return false;

    if (categoryFilter !== "All") {
      const catText = `${job.category || ""} ${job.title || ""}`.toLowerCase();
      if (!catText.includes(categoryFilter.toLowerCase())) return false;
    }

    if (experienceFilter !== "All") {
      const expText = `${job.experience || ""} ${job.title || ""}`.toLowerCase();
      if (
        experienceFilter === "Fresher" &&
        !expText.includes("fresher") &&
        !expText.includes("junior") &&
        !expText.includes("0-1")
      ) {
        return false;
      }
      if (experienceFilter === "Experienced" && expText.includes("fresher")) {
        return false;
      }
    }

    if (onlySavedFilter && !savedIds.includes(job.id)) return false;

    return true;
  });

  const savedJobsList = jobs.filter((job) => savedIds.includes(job.id));

  const getInitials = (name) => {
    if (!name) return "AD";
    return name
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
  };

  const skillTags = resumeData.skills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

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
    <>
      {/* PRINT-ONLY FULL EXECUTIVE RESUME TEMPLATE */}
      <div className="hidden print:block bg-white text-slate-900 p-8 max-w-2xl mx-auto font-sans">
        <div className="border-b-2 border-indigo-600 pb-4 mb-5">
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 uppercase">
            {resumeData.fullName || "Aarav Deshmukh"}
          </h1>
          <p className="text-sm font-semibold text-indigo-600 mt-0.5">
            {resumeData.role || "Software & Android Developer"}
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-slate-600 mt-2">
            {resumeData.phone && <span>Phone: {resumeData.phone}</span>}
            {resumeData.email && <span>Email: {resumeData.email}</span>}
            {resumeData.location && <span>Location: {resumeData.location}</span>}
          </div>
        </div>

        <div className="space-y-4 text-xs leading-relaxed">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-700 border-b border-slate-200 pb-1 mb-1.5">
              Professional Summary
            </h2>
            <p className="text-slate-700">
              {resumeData.summary.trim() ||
                `Results-driven ${resumeData.role || "professional"} with strong problem-solving abilities, hands-on execution skills, and a commitment to delivering high-quality work.`}
            </p>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-700 border-b border-slate-200 pb-1 mb-1.5">
              Core Skills & Competencies
            </h2>
            <p className="text-slate-800 font-medium">
              {resumeData.skills.trim() || "Java, Android SDK, REST APIs, Communication"}
            </p>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-700 border-b border-slate-200 pb-1 mb-1.5">
              Experience & Key Projects
            </h2>
            <p className="text-slate-700 whitespace-pre-line">
              {resumeData.experienceOrProjects.trim() ||
                "• Delivered end-to-end tasks with high accuracy and adherence to timelines."}
            </p>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-700 border-b border-slate-200 pb-1 mb-1.5">
              Education & Qualifications
            </h2>
            <p className="text-slate-800 font-medium">
              {resumeData.education.trim() || "Bachelor's Degree"}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-200 text-[11px] text-slate-500">
            Declaration: I hereby declare that the information furnished above is true and correct to the best of my knowledge.
          </div>
        </div>
      </div>

      {/* MOBILE APP SHELL */}
      <div className={`min-h-screen flex justify-center ${bgMain} transition-colors duration-200 font-sans print:hidden`}>
        <div className={`w-full max-w-md min-h-screen flex flex-col border-x ${shellBg} relative pb-24 shadow-xl`}>
          {/* BOTTOM-FLOATING TOAST */}
          {toast && (
            <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-sm pointer-events-none">
              <div className="bg-slate-900/95 backdrop-blur-md text-white text-xs font-medium px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 border border-slate-700">
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
            <div
              onDoubleClick={() => setActiveTab(activeTab === "admin" ? "reels" : "admin")}
              className="flex items-center gap-2.5 select-none cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white font-extrabold text-sm flex items-center justify-center shadow-sm">
                JR
              </div>
              <div>
                <h1 className="font-bold text-base tracking-tight leading-none">JobReels</h1>
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
            {/* 1. WORKPLACE REELS TAB (DEFAULT LANDING SCREEN) */}
            {activeTab === "reels" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold tracking-tight">Workplace Reels</h2>
                    <p className={`text-xs ${mutedText}`}>
                      Inside looks & floor tours from hiring companies
                    </p>
                  </div>
                  <button
                    onClick={() => setMuted(!muted)}
                    className={`px-2.5 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 ${cardBg}`}
                  >
                    {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    <span>{muted ? "Muted" : "Sound On"}</span>
                  </button>
                </div>

                {reels.map((reel) => {
                  const isLiked = !!likedReels[reel.id];
                  const likeCount = (reel.likes || 40) + (isLiked ? 1 : 0);
                  const isPlaying = playingReelId === reel.id;

                  return (
                    <div key={reel.id} className={`rounded-2xl border overflow-hidden ${cardBg}`}>
                      <div
                        onClick={() => setPlayingReelId(isPlaying ? null : reel.id)}
                        className="relative h-64 w-full bg-slate-900 overflow-hidden cursor-pointer group"
                      >
                        {isPlaying ? (
                          <video
                            src={reel.videoUrl}
                            poster={reel.posterUrl}
                            autoPlay
                            loop
                            muted={muted}
                            playsInline
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            src={reel.posterUrl}
                            alt={reel.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-slate-950/40 flex flex-col justify-between p-4">
                          <div className="flex items-center justify-between">
                            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-black/50 text-white backdrop-blur-md border border-white/15 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                              {isPlaying ? "Playing Tour" : "Workplace Tour"}
                            </span>
                            <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-black/50 text-white backdrop-blur-md">
                              0:30 HD
                            </span>
                          </div>

                          {!isPlaying && (
                            <div className="my-auto flex justify-center">
                              <div className="w-12 h-12 rounded-full bg-white/90 text-indigo-600 shadow-lg flex items-center justify-center group-hover:scale-110 transition">
                                <Play className="w-5 h-5 fill-indigo-600 ml-0.5" />
                              </div>
                            </div>
                          )}

                          <div>
                            <h3 className="font-bold text-white text-base leading-snug drop-shadow-xs">
                              {reel.title}
                            </h3>
                            <p className="text-xs text-slate-200 mt-1 font-medium">
                              {reel.roleTag}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-3.5 flex items-center justify-between">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-7 h-7 rounded-full bg-indigo-50 text-indigo-700 font-bold text-[11px] flex items-center justify-center shrink-0">
                            {getInitials(reel.creatorName)}
                          </div>
                          <span className="font-semibold text-xs truncate">{reel.creatorName}</span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() =>
                              setLikedReels((prev) => ({ ...prev, [reel.id]: !prev[reel.id] }))
                            }
                            className="text-xs font-semibold flex items-center gap-1 text-rose-600 px-2 py-1 rounded-lg hover:bg-rose-50 transition"
                          >
                            <Heart className={`w-4 h-4 ${isLiked ? "fill-rose-600" : ""}`} />
                            {likeCount}
                          </button>
                          <button
                            onClick={() => showToast("Workplace reel link copied")}
                            className={`p-1.5 rounded-lg border ${badgeBg}`}
                          >
                            <Share2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setActiveTab("jobs")}
                            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1"
                          >
                            View Jobs <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* 2. JOBS DISCOVERY TAB */}
            {activeTab === "jobs" && (
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold tracking-tight">{t.verifiedJobs}</h2>
                    <p className={`text-xs ${mutedText}`}>
                      Showing {filteredJobs.length} of {jobs.length} verified openings
                    </p>
                  </div>
                  {(activeFilterCount > 0 || searchQuery) && (
                    <button
                      onClick={resetAllFilters}
                      className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-600 border border-rose-200 flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" /> Reset
                    </button>
                  )}
                </div>

                {/* Search + Filter Toggle Bar */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className={`w-4 h-4 absolute left-3.5 top-3 ${mutedText}`} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t.searchPlaceholder}
                      className={`w-full pl-10 pr-8 py-2.5 rounded-2xl border text-xs outline-none transition shadow-2xs ${inputBg}`}
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`px-3.5 py-2.5 rounded-2xl border text-xs font-semibold flex items-center gap-1.5 transition shrink-0 ${
                      showFilters || activeFilterCount > 0
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : lightMode
                        ? "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                        : "bg-slate-800 text-slate-200 border-slate-700"
                    }`}
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>Filters</span>
                    {activeFilterCount > 0 && (
                      <span className="w-4 h-4 rounded-full bg-white text-indigo-600 text-[10px] font-bold flex items-center justify-center">
                        {activeFilterCount}
                      </span>
                    )}
                  </button>
                </div>

                {/* Expandable Multi-Criteria Filter Panel */}
                {showFilters && (
                  <div className={`p-3.5 rounded-2xl border space-y-3 ${cardBg}`}>
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="space-y-1">
                        <label className={`text-[10px] font-bold uppercase ${mutedText}`}>
                          Work Mode
                        </label>
                        <select
                          value={workModeFilter}
                          onChange={(e) => setWorkModeFilter(e.target.value)}
                          className={`w-full px-2.5 py-2 rounded-xl border text-xs outline-none ${inputBg}`}
                        >
                          <option value="All">All Modes</option>
                          <option value="Remote">Remote (WFH)</option>
                          <option value="On-Site">On-Site Office</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className={`text-[10px] font-bold uppercase ${mutedText}`}>
                          Department
                        </label>
                        <select
                          value={categoryFilter}
                          onChange={(e) => setCategoryFilter(e.target.value)}
                          className={`w-full px-2.5 py-2 rounded-xl border text-xs outline-none ${inputBg}`}
                        >
                          <option value="All">All Departments</option>
                          <option value="IT">IT & Software</option>
                          <option value="Real Estate">Real Estate & Sales</option>
                          <option value="Engineering">Engineering & Field</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex gap-1.5">
                        {["All", "Fresher", "Experienced"].map((exp) => (
                          <button
                            key={exp}
                            onClick={() => setExperienceFilter(exp)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition ${
                              experienceFilter === exp
                                ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                                : badgeBg
                            }`}
                          >
                            {exp}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => setOnlySavedFilter(!onlySavedFilter)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border flex items-center gap-1 transition ${
                          onlySavedFilter
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : badgeBg
                        }`}
                      >
                        <Bookmark className="w-3 h-3" /> Saved ({savedIds.length})
                      </button>
                    </div>
                  </div>
                )}

                {/* Quick Filter Pills */}
                <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                  {QUICK_CHIPS.map((chip) => {
                    const isSelected =
                      (chip === "All" && workModeFilter === "All" && categoryFilter === "All") ||
                      (chip === "Remote" && workModeFilter === "Remote") ||
                      categoryFilter.toLowerCase() === chip.toLowerCase();

                    return (
                      <button
                        key={chip}
                        onClick={() => {
                          if (chip === "All") {
                            setWorkModeFilter("All");
                            setCategoryFilter("All");
                          } else if (chip === "Remote") {
                            setWorkModeFilter(workModeFilter === "Remote" ? "All" : "Remote");
                          } else {
                            setCategoryFilter(categoryFilter === chip ? "All" : chip);
                          }
                        }}
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
                    {[1, 2, 3].map((n) => (
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
                      Try adjusting your search keywords or filter criteria
                    </p>
                    <button
                      onClick={resetAllFilters}
                      className="mt-3 px-4 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
                    >
                      Clear All Filters
                    </button>
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
                            {isApplied ? `${t.applied} ✓` : t.oneTapApply}
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* 3. JOB POST TAB */}
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
                        placeholder="e.g., Baner, Pune"
                        className={`w-full px-3 py-2.5 rounded-xl border text-sm outline-none ${inputBg}`}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold">Compensation</label>
                      <input
                        type="text"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        placeholder="e.g., ₹3.5 LPA"
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
                        placeholder="e.g., Fresher / 1-2 Yrs"
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
                      placeholder="Describe daily responsibilities, shift timing, and required skills..."
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

            {/* 4. RESUME BUILDER TAB (ONLY BOTTOM DOWNLOAD BUTTON) */}
            {activeTab === "resume" && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-bold tracking-tight">Instant Resume Builder</h2>
                  <p className={`text-xs ${mutedText}`}>Syncs to My Profile & exports formatted PDF</p>
                </div>

                {/* Live Resume Template Preview Card */}
                <div className={`p-4 rounded-2xl border-2 border-indigo-600/20 space-y-2.5 ${cardBg}`}>
                  <div className="flex items-start justify-between border-b border-slate-100 pb-2.5">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={resumeData.photoUrl}
                        alt={resumeData.fullName}
                        className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                      />
                      <div>
                        <h3 className="font-extrabold text-sm">
                          {resumeData.fullName.trim() || "Your Full Name"}
                        </h3>
                        <p className="text-xs font-semibold text-indigo-600">
                          {resumeData.role.trim() || "Target Role / Designation"}
                        </p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 text-[10px] font-bold">
                      LIVE PREVIEW
                    </span>
                  </div>

                  <div className={`flex flex-wrap gap-3 text-[11px] ${mutedText}`}>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {resumeData.phone.trim() || "+91 00000 00000"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {resumeData.email.trim() || "you@email.com"}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {resumeData.location.trim() || "City, State"}
                    </span>
                  </div>

                  <p className={`text-[11px] leading-relaxed ${mutedText}`}>
                    {resumeData.summary.trim()}
                  </p>

                  {skillTags.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {skillTags.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[10px] font-semibold"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Form Inputs */}
                <div className={`p-4 rounded-2xl border space-y-3 ${cardBg}`}>
                  <p className="text-xs font-bold">Candidate Details</p>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold">Full Name *</label>
                    <input
                      type="text"
                      value={resumeData.fullName}
                      onChange={(e) => setResumeData({ ...resumeData, fullName: e.target.value })}
                      placeholder="Enter your full name"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${inputBg}`}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold">Target Job Role</label>
                    <input
                      type="text"
                      value={resumeData.role}
                      onChange={(e) => setResumeData({ ...resumeData, role: e.target.value })}
                      placeholder="Enter desired role"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${inputBg}`}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold">Mobile Number</label>
                      <input
                        type="text"
                        value={resumeData.phone}
                        onChange={(e) => setResumeData({ ...resumeData, phone: e.target.value })}
                        placeholder="e.g., +91 98765 43210"
                        className={`w-full px-3 py-2.5 rounded-xl border text-xs outline-none ${inputBg}`}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold">Email Address</label>
                      <input
                        type="email"
                        value={resumeData.email}
                        onChange={(e) => setResumeData({ ...resumeData, email: e.target.value })}
                        placeholder="e.g., name@gmail.com"
                        className={`w-full px-3 py-2.5 rounded-xl border text-xs outline-none ${inputBg}`}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold">Current City / Location</label>
                    <input
                      type="text"
                      value={resumeData.location}
                      onChange={(e) => setResumeData({ ...resumeData, location: e.target.value })}
                      placeholder="Enter city & state"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${inputBg}`}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold">Professional Summary</label>
                    <textarea
                      rows={2}
                      value={resumeData.summary}
                      onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
                      placeholder="Briefly describe your strengths & career objective..."
                      className={`w-full px-3.5 py-2 rounded-xl border text-xs outline-none ${inputBg}`}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold">Key Skills (Comma-Separated)</label>
                    <input
                      type="text"
                      value={resumeData.skills}
                      onChange={(e) => setResumeData({ ...resumeData, skills: e.target.value })}
                      placeholder="e.g., Java, Android Studio, REST APIs"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${inputBg}`}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold">Experience / Key Projects</label>
                    <textarea
                      rows={2}
                      value={resumeData.experienceOrProjects}
                      onChange={(e) =>
                        setResumeData({ ...resumeData, experienceOrProjects: e.target.value })
                      }
                      placeholder="List past internship, work experience, or major projects..."
                      className={`w-full px-3.5 py-2 rounded-xl border text-xs outline-none ${inputBg}`}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold">Highest Education</label>
                    <input
                      type="text"
                      value={resumeData.education}
                      onChange={(e) => setResumeData({ ...resumeData, education: e.target.value })}
                      placeholder="e.g., B.E. / Diploma - University Name"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs outline-none ${inputBg}`}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={handleDownloadResumePDF}
                    className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-xs transition"
                  >
                    <Download className="w-4 h-4" /> Generate & Download Full Resume PDF
                  </button>
                </div>
              </div>
            )}

            {/* 5. MY PROFILE TAB */}
            {activeTab === "profile" && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-bold tracking-tight">{t.myProfileTitle}</h2>
                  <p className={`text-xs mt-0.5 ${mutedText}`}>{t.myProfileSub}</p>
                </div>

                {/* Candidate Identity Card with Photo & Synced Resume Info */}
                <div className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${cardBg}`}>
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={resumeData.photoUrl}
                      alt={resumeData.fullName}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-indigo-100 shadow-xs shrink-0"
                    />
                    <div className="min-w-0">
                      <h3 className="font-bold text-sm truncate">
                        {resumeData.fullName.trim() || "Aarav Deshmukh"}
                      </h3>
                      <p className={`text-xs truncate ${mutedText}`}>
                        {resumeData.role.trim() || "Android & Full Stack Java Developer"}
                      </p>
                      <p className={`text-[11px] truncate ${mutedText}`}>
                        {resumeData.location.trim() || "Baner, Pune"}
                      </p>
                      <div className="flex items-center gap-3 mt-1.5 text-[11px] font-semibold">
                        <span className="text-indigo-600">Applied Jobs ({applications.length})</span>
                        <span className="text-amber-600">Saved ({savedIds.length})</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab("resume")}
                    className={`px-3 py-1.5 rounded-xl border text-[11px] font-semibold shrink-0 ${badgeBg}`}
                  >
                    Edit Info
                  </button>
                </div>

                {/* Resume Upload Card */}
                <div className={`p-4 rounded-2xl border space-y-3 ${cardBg}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-bold">Uploaded Resume (PDF / DOCX)</h3>
                      <p className={`text-[11px] ${mutedText}`}>
                        Attached automatically on One-Tap Apply
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab("resume")}
                      className="text-[11px] font-semibold text-indigo-600 hover:underline"
                    >
                      Build Resume
                    </button>
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeFileUpload}
                    className="hidden"
                  />

                  {!uploadedResume ? (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition ${
                        lightMode
                          ? "border-indigo-200 bg-indigo-50/40 hover:bg-indigo-50"
                          : "border-slate-700 bg-slate-800/40 hover:bg-slate-800"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-2">
                        <Upload className="w-5 h-5" />
                      </div>
                      <p className="text-xs font-bold">Tap to Upload Your Resume</p>
                      <p className={`text-[11px] mt-0.5 ${mutedText}`}>
                        Supports PDF, DOC, DOCX (Max 5 MB)
                      </p>
                    </div>
                  ) : (
                    <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                          <FileCheck2 className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 truncate">
                            {uploadedResume.name}
                          </p>
                          <p className="text-[11px] text-emerald-700 font-medium">
                            {uploadedResume.size} • Uploaded at {uploadedResume.uploadedAt}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-semibold text-slate-700"
                        >
                          Replace
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setUploadedResume(null);
                            showToast("Uploaded resume removed");
                          }}
                          className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-100"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Sub-tabs: Applied Jobs Tracker vs Saved Jobs */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setProfileSubTab("applied")}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-semibold border transition ${
                      profileSubTab === "applied"
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : cardBg
                    }`}
                  >
                    Applied Jobs ({applications.length})
                  </button>
                  <button
                    onClick={() => setProfileSubTab("saved")}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-semibold border transition ${
                      profileSubTab === "saved"
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : cardBg
                    }`}
                  >
                    Saved Jobs ({savedJobsList.length})
                  </button>
                </div>

                {/* APPLIED JOBS TRACKING LIST */}
                {profileSubTab === "applied" && (
                  <div className="space-y-3">
                    {applications.length === 0 ? (
                      <div className={`p-6 rounded-2xl border text-center space-y-2 ${cardBg}`}>
                        <p className="text-sm font-bold">No Job Applications Yet</p>
                        <p className={`text-xs ${mutedText}`}>
                          Tap "One-Tap Apply" on any job in the Jobs tab to track its progress here.
                        </p>
                        <button
                          onClick={() => setActiveTab("jobs")}
                          className="mt-1 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
                        >
                          Browse Verified Jobs
                        </button>
                      </div>
                    ) : (
                      applications.map((app) => (
                        <div key={app.id} className={`p-4 rounded-2xl border space-y-3 ${cardBg}`}>
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="font-bold text-sm">{app.jobTitle}</h4>
                              <p className={`text-xs ${mutedText}`}>
                                {app.companyName} • {app.location}
                              </p>
                            </div>
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                              {APPLICATION_STAGES[app.stageIndex]}
                            </span>
                          </div>

                          {/* 3-Step Visual Status Tracker */}
                          <div className="space-y-1.5 pt-1">
                            <div className="flex items-center justify-between">
                              {APPLICATION_STAGES.map((stage, idx) => {
                                const done = idx <= app.stageIndex;
                                return (
                                  <div key={stage} className="flex items-center flex-1 last:flex-none">
                                    <div className="flex flex-col items-center">
                                      <div
                                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition ${
                                          done
                                            ? "bg-emerald-600 text-white"
                                            : "bg-slate-200 text-slate-500"
                                        }`}
                                      >
                                        {done ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                                      </div>
                                      <span
                                        className={`text-[10px] font-semibold mt-1 ${
                                          done ? "text-emerald-700" : mutedText
                                        }`}
                                      >
                                        {stage}
                                      </span>
                                    </div>
                                    {idx < APPLICATION_STAGES.length - 1 && (
                                      <div
                                        className={`h-0.5 flex-1 mx-1.5 -mt-4 ${
                                          idx < app.stageIndex ? "bg-emerald-500" : "bg-slate-200"
                                        }`}
                                      />
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                            <span className={mutedText}>
                              Submitted: {app.appliedDate}, {app.appliedAt}
                            </span>
                            <button
                              onClick={() => advanceApplicationStage(app.id)}
                              className="text-indigo-600 font-semibold hover:underline"
                            >
                              Update Status
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* SAVED JOBS LIST */}
                {profileSubTab === "saved" && (
                  <div className="space-y-3">
                    {savedJobsList.length === 0 ? (
                      <div className={`p-6 rounded-2xl border text-center ${cardBg}`}>
                        <p className="text-sm font-bold">No Saved Jobs</p>
                        <p className={`text-xs mt-1 ${mutedText}`}>
                          Bookmark any job card to save it here for later.
                        </p>
                      </div>
                    ) : (
                      savedJobsList.map((job) => {
                        const isApplied = appliedIds.includes(job.id);
                        return (
                          <div
                            key={job.id}
                            className={`p-3.5 rounded-2xl border flex items-center justify-between gap-2 ${cardBg}`}
                          >
                            <div className="min-w-0">
                              <p className="text-xs font-bold truncate">{job.title}</p>
                              <p className={`text-[11px] truncate ${mutedText}`}>
                                {job.companyName} • {job.salary}
                              </p>
                            </div>
                            <button
                              onClick={(e) => handleApply(e, job)}
                              disabled={isApplied}
                              className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 ${
                                isApplied
                                  ? "bg-emerald-600 text-white"
                                  : "bg-indigo-600 text-white"
                              }`}
                            >
                              {isApplied ? "Applied ✓" : "Apply"}
                            </button>
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            )}

            {/* 6. HIDDEN ADMIN VIEW (OPENED ONLY BY DOUBLE-TAPPING JR LOGO) */}
            {activeTab === "admin" && (
              <div className="space-y-4">
                {!isAdminAuth ? (
                  <form
                    onSubmit={handleAdminLogin}
                    className={`p-6 rounded-2xl border space-y-4 mt-4 ${cardBg}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center">
                        <Lock className="w-5 h-5" />
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveTab("reels")}
                        className={`p-2 rounded-xl border ${badgeBg}`}
                      >
                        <X className="w-4 h-4" />
                      </button>
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
                        placeholder="Enter administrator password"
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
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <h2 className="text-lg font-bold tracking-tight">Admin Dashboard</h2>
                        <p className={`text-xs ${mutedText}`}>Live platform metrics & moderation</p>
                      </div>
                      <button
                        onClick={() => {
                          setIsAdminAuth(false);
                          setActiveTab("reels");
                        }}
                        className="px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 text-xs font-semibold flex items-center gap-1 shrink-0"
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

                    {/* Manage Active Jobs with Confirmation */}
                    <div className="space-y-2">
                      <h3 className={`text-xs font-bold uppercase tracking-wider ${mutedText}`}>
                        Manage Published Listings
                      </h3>
                      {jobs.map((job) => (
                        <div key={job.id} className={`p-3 rounded-xl border space-y-2 ${cardBg}`}>
                          <div className="flex items-center justify-between gap-2">
                            <div className="min-w-0">
                              <p className="text-xs font-bold truncate">{job.title}</p>
                              <p className={`text-[11px] truncate ${mutedText}`}>
                                {job.companyName} • {job.location}
                              </p>
                            </div>
                            <button
                              onClick={() => setConfirmDeleteId(job.id)}
                              title="Remove Listing"
                              className="p-2 rounded-lg text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition shrink-0"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {confirmDeleteId === job.id && (
                            <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-between gap-2">
                              <span className="text-[11px] font-semibold text-rose-800 flex items-center gap-1">
                                <AlertTriangle className="w-3.5 h-3.5" /> Delete this listing?
                              </span>
                              <div className="flex gap-1.5">
                                <button
                                  onClick={() => setConfirmDeleteId(null)}
                                  className="px-2.5 py-1 rounded bg-white border border-slate-200 text-[11px] font-semibold text-slate-700"
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={() => handleDeleteJob(job.id)}
                                  className="px-2.5 py-1 rounded bg-rose-600 text-white text-[11px] font-semibold"
                                >
                                  Confirm
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
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
                    {appliedIds.includes(selectedJob.id)
                      ? "Application Submitted ✓"
                      : "Submit One-Tap Application"}
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
              { id: "profile", label: t.profile, icon: User, badge: applications.length },
            ].map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex flex-col items-center gap-1 px-3 py-1.5 rounded-2xl text-[11px] font-semibold transition ${
                    active
                      ? "text-indigo-600 bg-indigo-50/80"
                      : lightMode
                      ? "text-slate-500 hover:text-slate-900"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <div className="relative">
                    <Icon className="w-5 h-5" />
                    {item.badge > 0 && (
                      <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-emerald-600 text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}