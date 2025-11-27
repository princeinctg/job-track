import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile, 
  onAuthStateChanged
} from 'firebase/auth';
import { 
  Briefcase, 
  MapPin, 
  Globe, 
  DollarSign, 
  Clock, 
  Search, 
  User, 
  LogOut, 
  Menu, 
  X, 
  CheckCircle, 
  Users, 
  Building2,
  ChevronRight,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Edit2,
  Camera
} from 'lucide-react';

// --- JSON  ---
const COMPANIES_DATA = [
  {
    "id": "1",
    "name": "TechNova",
    "logo": "https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&q=80&w=150&h=150",
    "location": "San Francisco, CA",
    "website": "https://technova.example.com",
    "industry": "Software Development",
    "jobs": [
      {
        "id": "job-001",
        "title": "Senior Frontend Developer",
        "bannerImage": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
        "location": "Remote",
        "salary": "$120k - $150k",
        "jobType": "Full-time",
        "description": "We are looking for an experienced Frontend Developer to lead our core product team.",
        "requirements": [
          "5+ years of experience with React",
          "Deep understanding of modern CSS and Tailwind",
          "Experience with state management (Redux, Zustand)",
          "Strong communication skills"
        ]
      },
      {
        "id": "job-002",
        "title": "UI/UX Designer",
        "bannerImage": "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800",
        "location": "San Francisco, CA",
        "salary": "$90k - $120k",
        "jobType": "Full-time",
        "description": "Design intuitive user experiences for our enterprise clients.",
        "requirements": [
          "Portfolio demonstrating UI/UX skills",
          "Proficiency in Figma",
          "Basic HTML/CSS knowledge is a plus"
        ]
      }
    ]
  },
  {
    "id": "2",
    "name": "GreenEarth Energy",
    "logo": "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&q=80&w=150&h=150",
    "location": "Austin, TX",
    "website": "https://greenearth.example.com",
    "industry": "Renewable Energy",
    "jobs": [
      {
        "id": "job-003",
        "title": "Project Manager",
        "bannerImage": "https://images.unsplash.com/photo-1507208773393-40d9fc9f600e?auto=format&fit=crop&q=80&w=800",
        "location": "Austin, TX",
        "salary": "$100k - $130k",
        "jobType": "Full-time",
        "description": "Manage large-scale solar installation projects across the state.",
        "requirements": [
          "PMP Certification",
          "3+ years in energy sector",
          "Experience managing cross-functional teams"
        ]
      }
    ]
  },
  {
    "id": "3",
    "name": "FinStream",
    "logo": "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=150&h=150",
    "location": "New York, NY",
    "website": "https://finstream.example.com",
    "industry": "FinTech",
    "jobs": [
      {
        "id": "job-004",
        "title": "Backend Engineer",
        "bannerImage": "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=800",
        "location": "Hybrid",
        "salary": "$130k - $160k",
        "jobType": "Full-time",
        "description": "Build high-frequency trading algorithms and secure payment gateways.",
        "requirements": [
          "Expert in Python or Go",
          "Experience with PostgreSQL and Redis",
          "Knowledge of financial regulations"
        ]
      },
      {
        "id": "job-005",
        "title": "Data Analyst",
        "bannerImage": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        "location": "New York, NY",
        "salary": "$85k - $110k",
        "jobType": "Contract",
        "description": "Analyze market trends to support our investment strategies.",
        "requirements": [
          "SQL and Python proficiency",
          "Experience with Tableau or PowerBI",
          "Strong analytical mindset"
        ]
      }
    ]
  },
  {
    "id": "4",
    "name": "HealthPlus",
    "logo": "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=150&h=150",
    "location": "Boston, MA",
    "website": "https://healthplus.example.com",
    "industry": "Healthcare",
    "jobs": [
      {
        "id": "job-006",
        "title": "Clinical Research Coordinator",
        "bannerImage": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
        "location": "Boston, MA",
        "salary": "$70k - $90k",
        "jobType": "Full-time",
        "description": "Coordinate clinical trials for new pharmaceutical products.",
        "requirements": [
          "Bachelor's in Life Sciences",
          "Detail-oriented",
          "Excellent organizational skills"
        ]
      }
    ]
  }
];

// --- FIREBASE SETUP ---
const firebaseConfig = {
  apiKey: "AIzaSyDEKSRn6HpjBnR3Q8o1fIz8IpPAWckLedA",
  authDomain: "jobtrack-1349b.firebaseapp.com",
  projectId: "jobtrack-1349b",
  storageBucket: "jobtrack-1349b.firebasestorage.app",
  messagingSenderId: "455447142976",
  appId: "1:455447142976:web:7c12a4352f4d0adb63f5a5",
  measurementId: "G-Y6EY32WZM3"
};


const app = initializeApp(firebaseConfig);
getAnalytics(app); 
const auth = getAuth(app);

// --- COMPONENTS ---

const JobModal = ({ job, onClose }) => {
  if (!job) return null;

  const handleApply = () => {

    window.open('https://google.com', '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
      <div 
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all scale-100 opacity-100"
      >
        <div className="relative h-48">
          <img src={job.bannerImage} alt={job.title} className="w-full h-full object-cover" />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
          >
            <X size={24} className="text-gray-800" />
          </button>
        </div>
        
        <div className="p-8">
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium flex items-center">
              <DollarSign size={14} className="mr-1" /> {job.salary}
            </span>
            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium flex items-center">
              <Clock size={14} className="mr-1" /> {job.jobType}
            </span>
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium flex items-center">
              <MapPin size={14} className="mr-1" /> {job.location}
            </span>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h2>
          
          <div className="prose prose-indigo max-w-none mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">{job.description}</p>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Requirements</h3>
            <ul className="space-y-2">
              {job.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start text-gray-600">
                  <CheckCircle size={18} className="text-indigo-500 mr-2 mt-1 shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end gap-3">
            <button 
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-colors"
            >
              Close
            </button>
            <button 
              onClick={handleApply}
              className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 font-medium shadow-lg shadow-indigo-200 transition-colors"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Navbar = ({ user, setPage, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'Home', page: 'HOME' },
    { label: 'Blog', page: 'BLOG' },
  ];

  const handleNavClick = (page) => {
    setPage(page);
    setIsOpen(false);
  };

  return (
    <nav className="bg-white sticky top-0 z-40 border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => handleNavClick('HOME')}>
            <Briefcase className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">JobTrack</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.page)}
                className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
              >
                {link.label}
              </button>
            ))}

            {user ? (
              <div className="flex items-center space-x-4">
                 <div 
                   className="flex items-center space-x-2 cursor-pointer group"
                   onClick={() => handleNavClick('PROFILE')}
                 >
                   <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-indigo-100 group-hover:border-indigo-500 transition-colors">
                     <img 
                       src={user.photoURL || "https://ui-avatars.com/api/?name=" + user.email} 
                       alt="Profile" 
                       className="h-full w-full object-cover"
                     />
                   </div>
                 </div>
                 <button
                   onClick={handleLogout}
                   className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                   title="Logout"
                 >
                   <LogOut size={20} />
                 </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleNavClick('LOGIN')}
                  className="text-gray-600 hover:text-indigo-600 font-medium"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNavClick('REGISTER')}
                  className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200"
                >
                  Register
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="md:hidden bg-white border-t border-gray-100"
        >
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.page)}
                className="block w-full text-left px-3 py-2 text-gray-600 hover:bg-indigo-50 rounded-md font-medium"
              >
                {link.label}
              </button>
            ))}
            <div className="border-t border-gray-100 my-2 pt-2">
              {user ? (
                 <>
                   <button
                      onClick={() => handleNavClick('PROFILE')}
                      className="block w-full text-left px-3 py-2 text-gray-600 hover:bg-indigo-50 rounded-md font-medium"
                    >
                      My Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-md font-medium"
                    >
                      Logout
                    </button>
                 </>
              ) : (
                <>
                  <button
                    onClick={() => handleNavClick('LOGIN')}
                    className="block w-full text-left px-3 py-2 text-gray-600 hover:bg-indigo-50 rounded-md font-medium"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleNavClick('REGISTER')}
                    className="block w-full text-left px-3 py-2 text-indigo-600 hover:bg-indigo-50 rounded-md font-medium"
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-gray-900 text-white pt-12 pb-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <div className="flex items-center mb-4">
            <Briefcase className="h-6 w-6 text-indigo-400" />
            <span className="ml-2 text-xl font-bold">JobTrack</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Connecting talented professionals with world-class companies. Your dream job is just a click away.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 text-indigo-100">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><button className="hover:text-white">About Us</button></li>
            <li><button className="hover:text-white">How it Works</button></li>
            <li><button className="hover:text-white">Companies</button></li>
            <li><button className="hover:text-white">Contact</button></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 text-indigo-100">For Candidates</h3>
          <ul className="space-y-2 text-gray-400">
            <li><button className="hover:text-white">Browse Jobs</button></li>
            <li><button className="hover:text-white">Career Advice</button></li>
            <li><button className="hover:text-white">Resume Builder</button></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 text-indigo-100">Follow Us</h3>
          <div className="flex space-x-4">
            <button className="bg-gray-800 p-2 rounded-full hover:bg-indigo-600 transition-colors"><Facebook size={18} /></button>
            <button className="bg-gray-800 p-2 rounded-full hover:bg-indigo-600 transition-colors"><Twitter size={18} /></button>
            <button className="bg-gray-800 p-2 rounded-full hover:bg-indigo-600 transition-colors"><Linkedin size={18} /></button>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
        &copy; 2024 JobTrack Inc. All rights reserved.
      </div>
    </div>
  </footer>
);

// --- MAIN APP COMPONENT ---

export default function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [view, setView] = useState('HOME'); 
  const [viewParams, setViewParams] = useState({}); 
  const [selectedJob, setSelectedJob] = useState(null); 

  // --- AUTH  ---
  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // --- NAVIGATION  ---
  const navigateTo = (newView, params = {}) => {
    window.scrollTo(0, 0);
    setView(newView);
    setViewParams(params);
  };

  // --- DYNAMIC TITLE ---
  useEffect(() => {
    const titles = {
      HOME: 'Home | JobTrack',
      LOGIN: 'Login | JobTrack',
      REGISTER: 'Register | JobTrack',
      FORGOT_PASSWORD: 'Forgot Password | JobTrack',
      PROFILE: 'My Profile | JobTrack',
      UPDATE_PROFILE: 'Update Profile | JobTrack',
      COMPANY_DETAILS: 'Company Details | JobTrack',
      BLOG: 'Blog | JobTrack',
      NOT_FOUND: '404 | JobTrack'
    };
    document.title = titles[view] || 'JobTrack';
  }, [view]);

  // --- HANDLERS ---
  const handleLogout = async () => {
    await signOut(auth);
    navigateTo('HOME');
  };

  const handleLoginSuccess = () => navigateTo('HOME');

  // --- VIEWS COMPONENTS ---

  const Home = () => {
    return (
      <div className="animate-fade-in">
        
        <section className="relative bg-indigo-50 overflow-hidden">
          <div className="absolute inset-0 bg-white/40"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative pt-20 pb-24 lg:pt-32 lg:pb-40">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
                  Find Your <span className="text-indigo-600">Dream Job</span> With Confidence
                </h1>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  JobTrack is your centralized hub to explore opportunities, research companies, and take the next step in your career journey.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={() => document.getElementById('companies').scrollIntoView({behavior: 'smooth'})} className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 text-center">
                    Browse Companies
                  </button>
                  <button onClick={() => navigateTo('BLOG')} className="bg-white text-indigo-600 border border-indigo-200 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition text-center">
                    Read Success Stories
                  </button>
                </div>
              </div>
              <div className="relative hidden lg:block">
                <div className="absolute -inset-4 bg-indigo-200 rounded-full opacity-30 blur-3xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" 
                  alt="Professional working" 
                  className="relative rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Simplify your job search process with our streamlined approach.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: <Search size={40} />, title: 'Search', desc: 'Browse through thousands of job listings from top companies.' },
                { icon: <Building2 size={40} />, title: 'Research', desc: 'View detailed company profiles and available positions.' },
                { icon: <CheckCircle size={40} />, title: 'Apply', desc: 'Directly apply to the roles that match your skills.' }
              ].map((item, idx) => (
                <div key={idx} className="bg-gray-50 p-8 rounded-xl text-center hover:-translate-y-2 transition-transform duration-300">
                  <div className="text-indigo-600 flex justify-center mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Companies Section */}
        <section id="companies" className="py-20 bg-indigo-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Top Hiring Companies</h2>
            </div>
            <div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {COMPANIES_DATA.map((company) => (
                <div 
                  key={company.id}
                  onClick={() => navigateTo('COMPANY_DETAILS', { id: company.id })}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all cursor-pointer border border-gray-100 group"
                >
                  <div className="h-16 w-16 mb-4 rounded-lg overflow-hidden bg-gray-100 group-hover:scale-105 transition-transform">
                    <img src={company.logo} alt={company.name} className="h-full w-full object-cover" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{company.name}</h3>
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <MapPin size={14} className="mr-1" /> {company.location}
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-50">
                     <span className="text-xs font-semibold bg-indigo-50 text-indigo-700 px-2 py-1 rounded">
                       {company.jobs.length} Jobs
                     </span>
                     <ChevronRight size={16} className="text-indigo-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Extra Section 1: Stats */}
        <section className="py-20 bg-indigo-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { num: '10k+', label: 'Active Jobs' },
                { num: '500+', label: 'Companies' },
                { num: '25k+', label: 'Job Seekers' },
                { num: '98%', label: 'Satisfaction' }
              ].map((stat, idx) => (
                <div key={idx}>
                  <div className="text-4xl font-bold text-indigo-300 mb-2">{stat.num}</div>
                  <div className="text-indigo-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Extra Section 2: Testimonial */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="bg-linear-to-br from-purple-600 to-indigo-700 rounded-3xl p-8 md:p-16 text-center text-white">
                <h2 className="text-3xl font-bold mb-8">"JobTrack helped me find my dream role in 2 weeks!"</h2>
                <div className="flex items-center justify-center space-x-4">
                  <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100" className="w-12 h-12 rounded-full border-2 border-white" alt="User" />
                  <div className="text-left">
                    <div className="font-bold">Sarah Jenkins</div>
                    <div className="text-indigo-200 text-sm">Product Designer</div>
                  </div>
                </div>
             </div>
          </div>
        </section>
      </div>
    );
  };

  const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await signInWithEmailAndPassword(auth, email, password);
        handleLoginSuccess();
      } catch (err) {
        console.error(err);
        setError("Invalid email or password.");
      }
    };

    const handleGoogleLogin = async () => {
      try {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        handleLoginSuccess();
      } catch (err) {
        console.error(err);
        setError("Google sign in failed.");
      }
    };

    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login to JobTrack</h2>
            <p className="mt-2 text-center text-sm text-gray-600">Welcome back!</p>
          </div>
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm text-center">{error}</div>}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  type="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <button type="button" onClick={() => navigateTo('FORGOT_PASSWORD', { email })} className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </button>
              </div>
            </div>

            <div>
              <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Sign in
              </button>
            </div>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div>
              <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Or continue with</span></div>
            </div>
            <div className="mt-6">
              <button onClick={handleGoogleLogin} className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Sign in with Google</span>
                Google
              </button>
            </div>
          </div>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button onClick={() => navigateTo('REGISTER')} className="font-medium text-indigo-600 hover:text-indigo-500">
                Register here
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  };

  const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', photoURL: '', password: '' });
    const [error, setError] = useState('');

    const validatePassword = (pwd) => {
      const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
      return regex.test(pwd);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!validatePassword(formData.password)) {
        setError("Password must be 6+ chars, with at least one uppercase and one lowercase letter.");
        return;
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        await updateProfile(userCredential.user, {
          displayName: formData.name,
          photoURL: formData.photoURL
        });
        //  Skip email verification
        handleLoginSuccess();
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    const handleGoogleLogin = async () => {
      try {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        handleLoginSuccess();
      } catch (err) {
        console.error(err);
        setError("Google sign in failed.");
      }
    };

    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create Account</h2>
          </div>
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm text-center">{error}</div>}
          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              required
              className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <input
              type="text"
              required
              className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Photo URL"
              value={formData.photoURL}
              onChange={(e) => setFormData({...formData, photoURL: e.target.value})}
            />
            <input
              type="email"
              required
              className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <div className="relative">
              <input
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <p className="text-xs text-gray-400 mt-1 ml-1">Must contain 1 uppercase, 1 lowercase, min 6 chars.</p>
            </div>

            <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Register
            </button>
          </form>

          <div className="mt-6">
             <button onClick={handleGoogleLogin} className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Google
              </button>
          </div>
          
           <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button onClick={() => navigateTo('LOGIN')} className="font-medium text-indigo-600 hover:text-indigo-500">
                Login here
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  };

  const ForgotPassword = () => {
    // Pre-fill email from Login 
    const [email, setEmail] = useState(viewParams.email || '');

    const handleReset = (e) => {
      e.preventDefault();
      // Redirect to Gmail 
      window.open('https://mail.google.com', '_blank');
    };

    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
           <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
           <form onSubmit={handleReset} className="space-y-6">
             <div>
               <label className="block text-sm font-medium text-gray-700">Email Address</label>
               <input
                 type="email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                 placeholder="Enter your email"
                 required
               />
             </div>
             <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
               Reset Password
             </button>
           </form>
        </div>
      </div>
    );
  };

  const CompanyDetails = () => {
    // Private Route 
    if (!user && !authLoading) {
      setTimeout(() => navigateTo('LOGIN'), 0);
      return null;
    }

    const company = COMPANIES_DATA.find(c => c.id === viewParams.id);
    if (!company) return <div>Company not found</div>;

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <img src={company.logo} alt={company.name} className="w-24 h-24 rounded-xl object-cover border border-gray-100" />
            <div className="flex-1">
               <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
               <div className="flex flex-wrap gap-4 mt-2 text-gray-600">
                 <span className="flex items-center"><MapPin size={16} className="mr-1"/> {company.location}</span>
                 <span className="flex items-center"><Briefcase size={16} className="mr-1"/> {company.industry}</span>
                 <a href={company.website} target="_blank" rel="noreferrer" className="flex items-center text-indigo-600 hover:underline">
                   <Globe size={16} className="mr-1"/> Website
                 </a>
               </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Positions</h2>
        <div className="grid gap-6">
          {company.jobs.map((job) => (
             <div key={job.id} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                  <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-500">
                    <span className="bg-gray-100 px-2 py-1 rounded">{job.jobType}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">{job.salary}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">{job.location}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedJob(job)}
                  className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  View Details
                </button>
             </div>
          ))}
        </div>
      </div>
    );
  };

  const MyProfile = () => {
    // Private Route 
    if (!user && !authLoading) {
      setTimeout(() => navigateTo('LOGIN'), 0);
      return null;
    }

    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-indigo-600 h-32"></div>
          <div className="px-8 pb-8">
            <div className="relative -mt-16 mb-6">
              <img 
                src={user?.photoURL || "https://ui-avatars.com/api/?name=" + user?.email} 
                alt="Profile" 
                className="w-32 h-32 rounded-full border-4 border-white object-cover bg-white"
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{user?.displayName || 'User'}</h1>
            <p className="text-gray-500 mb-6 flex items-center"><Mail size={16} className="mr-2"/> {user?.email}</p>
            
            <div className="border-t border-gray-100 pt-6">
               <h3 className="text-lg font-semibold mb-4">Account Actions</h3>
               <button 
                 onClick={() => navigateTo('UPDATE_PROFILE')}
                 className="flex items-center justify-center w-full sm:w-auto bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
               >
                 <Edit2 size={18} className="mr-2" /> Update Information
               </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const UpdateProfile = () => {
    // Hooks
    const [name, setName] = useState(user?.displayName || '');
    const [photo, setPhoto] = useState(user?.photoURL || '');

    if (!user && !authLoading) {
      setTimeout(() => navigateTo('LOGIN'), 0);
      return null;
    }

    const handleUpdate = async (e) => {
      e.preventDefault();
      try {
        await updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photo
        });
       
        setUser({...auth.currentUser, displayName: name, photoURL: photo});
        navigateTo('PROFILE');
      } catch (err) {
        console.error("Update failed", err);
      }
    };

    return (
      <div className="max-w-xl mx-auto px-4 py-12">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Update Profile</h2>
          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 py-2 border"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Camera size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                  className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 py-2 border"
                />
              </div>
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition">
              Update Information
            </button>
          </form>
        </div>
      </div>
    );
  };

  const Blog = () => (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Career Insights</h1>
      <div className="grid gap-8">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-2">Top 10 Resume Tips for 2024</h2>
            <p className="text-gray-600 mb-4">Learn how to make your application stand out in a competitive market...</p>
            <button className="text-indigo-600 font-medium hover:underline">Read More</button>
          </div>
        ))}
      </div>
    </div>
  );

  const NotFound = () => (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-9xl font-bold text-indigo-200">404</h1>
      <h2 className="text-3xl font-bold text-gray-900 mt-4">Page Not Found</h2>
      <p className="text-gray-600 mt-2 mb-8">The page you are looking for doesn't exist or has been moved.</p>
      <button onClick={() => navigateTo('HOME')} className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition">
        Go Home
      </button>
    </div>
  );

  // --- RENDER MAIN ---

  if (authLoading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-slate-800">
      <Navbar user={user} setPage={navigateTo} handleLogout={handleLogout} />
      
      <main className="grow">
        {view === 'HOME' && <Home key="home" />}
        {view === 'LOGIN' && <Login key="login" />}
        {view === 'REGISTER' && <Register key="register" />}
        {view === 'FORGOT_PASSWORD' && <ForgotPassword key="forgot" />}
        {view === 'COMPANY_DETAILS' && <CompanyDetails key="company" />}
        {view === 'PROFILE' && <MyProfile key="profile" />}
        {view === 'UPDATE_PROFILE' && <UpdateProfile key="update" />}
        {view === 'BLOG' && <Blog key="blog" />}
        {view === 'NOT_FOUND' && <NotFound key="404" />}
      </main>

      <Footer />
      
      {selectedJob && <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
    </div>
  );
}