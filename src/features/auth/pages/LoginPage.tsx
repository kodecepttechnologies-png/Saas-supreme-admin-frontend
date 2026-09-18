import { Link } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import Logo3 from "../../../assets/workfornow-main-black-text-clean.svg";
import Logo2 from "../../../assets/workfornow-auth-black-text-clean.svg";
import Logo1 from "../../../assets/workfonow logo 1.svg";
import KodeceptLogo from "../../../assets/Kodecept logo.svg";



const CheckCircle = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
    <circle cx="10" cy="10" r="10" fill="#EEF2FF" />
    <path d="M6 10.5l3 3 5-5" stroke="#4F46E5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ── Inline dashboard mockup ── */
const DashboardMockup = () => (
  <div className="relative mx-auto mt-8 w-full max-w-xs rounded-2xl border border-indigo-100 bg-white shadow-2xl shadow-indigo-200/60 overflow-hidden text-[10px]">
    {/* topbar */}
    <div className="flex items-center gap-1.5 px-3 py-2 border-b border-gray-100 bg-white">
      <img src={Logo1} alt="workfonow" className="h-6 w-auto" />
    </div>
    <div className="flex" style={{ minHeight: 130 }}>
      {/* sidebar */}
      <div className="w-16 bg-white border-r border-gray-100 py-2 flex flex-col gap-1 px-2">
        {["Dashboard", "Employees", "Tasks", "Field Visits", "Reports", "Settings"].map((item) => (
          <div key={item} className={`rounded px-1 py-0.5 text-[8px] truncate ${item === "Dashboard" ? "bg-indigo-50 text-indigo-700 font-semibold" : "text-gray-400"}`}>{item}</div>
        ))}
      </div>
      {/* main */}
      <div className="flex-1 p-2 bg-gray-50/50">
        <div className="rounded-lg bg-white border border-gray-100 p-2 mb-1.5 shadow-sm">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] font-semibold text-gray-700">Team Performance</span>
            <span className="text-[8px] text-green-500 font-bold">▲ 12%</span>
          </div>
          <div className="flex items-end gap-0.5 h-8">
            {[40, 55, 35, 70, 50, 80, 65].map((h, i) => (
              <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i === 5 ? "#4F46E5" : "#C7D2FE" }} />
            ))}
          </div>
        </div>
        <div className="rounded-lg bg-white border border-gray-100 p-1.5 shadow-sm flex items-center gap-1.5">
          <div className="h-4 w-4 rounded-full bg-indigo-100 flex items-center justify-center">
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#4F46E5" /></svg>
          </div>
          <div>
            <div className="text-[8px] font-semibold text-gray-700">Field Tracking</div>
            <div className="flex items-center gap-0.5"><div className="h-1 w-1 rounded-full bg-green-400" /><span className="text-[7px] text-gray-400">Live</span></div>
          </div>
        </div>
        <div className="mt-1.5 rounded-lg bg-white border border-gray-100 p-1.5 shadow-sm flex items-center gap-1.5">
          <div className="h-4 w-4 rounded-full bg-indigo-100 flex items-center justify-center">
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="7" r="4" fill="#4F46E5" /><path d="M3 20c0-4 3-6 6-6s6 2 6 6" stroke="#4F46E5" strokeWidth="1.5" /><circle cx="17" cy="7" r="3" fill="#A5B4FC" /></svg>
          </div>
          <div>
            <div className="text-[7px] text-gray-400">Active Employees</div>
            <div className="flex items-center gap-0.5">
              <span className="text-[11px] font-bold text-gray-800">248</span>
              <span className="text-[7px] text-green-500 font-semibold">▲ 8%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const LoginPage = () => {
  return (
    <div className="min-h-screen bg-[#F5F6FA] flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Decorative blobs */}
      <div className="pointer-events-none fixed top-0 right-0 w-72 h-72 overflow-hidden z-0">
        <div className="absolute top-[-40px] right-[-40px] w-64 h-64 rounded-full opacity-30" style={{ background: "radial-gradient(circle,#6366F1 0%,#4338CA 60%,transparent 80%)" }} />
        <div className="absolute top-4 right-4 w-28 h-28 rounded-xl bg-indigo-400/20 rotate-12" />
        <div className="absolute top-16 right-16 w-16 h-16 rounded-lg bg-indigo-600/30 rotate-45" />
      </div>

      {/* Navbar */}
      <header className="relative z-10 flex items-center justify-between px-4 py-4 sm:px-8 lg:px-14">
        <div className="flex items-center">
          {/*
            Logo3 viewBox is 1500×1500. The actual logo art occupies roughly:
            x=280-1220 (w≈940), y=604-892 (h≈288) inside the 1500×1500 canvas.
            object-view-box crops the rendered image to that region.
            aspect-ratio matches the cropped content: 940/288 ≈ 3.26.
          */}
          <img
            src={Logo3}
            alt="workfonow"
            style={{
              objectViewBox: 'inset(40.3% 18.7% 40.5% 18.7%)',
              objectFit: 'fill',
              aspectRatio: '3.26 / 1',
              width: 'clamp(140px, 18vw, 260px)',
              height: 'auto',
            }}
          />
        </div>
        <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500">
          <span className="hidden sm:inline">New here?</span>
          <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-700 transition flex items-center gap-0.5">
            <span className="sm:hidden">Register</span>
            <span className="hidden sm:inline">Create an account</span>
            <svg className="h-3.5 w-3.5 ml-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 flex flex-1 flex-col lg:flex-row items-start gap-6 px-4 py-4 sm:px-8 lg:px-14 xl:px-20 lg:gap-10 xl:gap-16">

        {/* Left Hero — hidden on mobile to keep page clean, shown md+ */}
        <div className="hidden md:block w-full lg:flex-1 lg:min-w-0 pt-2 lg:pt-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-500">Welcome Back</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight tracking-tight">
            Manage<br/>Your Workforce<br/><span className="text-indigo-600">Smarter</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-500 leading-relaxed max-w-sm">
            Employees, tasks, performance, field operations and more — all in one powerful platform.
          </p>
          <ul className="mt-5 space-y-3">
            {["Employee & Performance Management", "Field Operations & Task Tracking", "Workforce Intelligence & AI"].map(f => (
              <li key={f} className="flex items-center gap-3"><CheckCircle/><span className="text-sm font-medium text-gray-700">{f}</span></li>
            ))}
          </ul>
          {/* Dashboard mockup hidden on tablet, shown on lg+ */}
          <div className="hidden lg:block"><DashboardMockup/></div>
          <p className="mt-6 text-indigo-600 text-xl leading-snug" style={{fontFamily:"'Dancing Script',cursive"}}>
            A Smarter<br/>Workplace for Tomorrow.
          </p>
        </div>

        {/* Right Card — full width on mobile, fixed clamp width on lg+ */}
        <div className="w-full md:mx-auto md:max-w-md lg:mx-0 lg:w-auto lg:flex-shrink-0 pb-8" style={{ minWidth: 0 }}>
          <div
            className="rounded-3xl bg-white shadow-xl shadow-indigo-100/50 border border-gray-100 p-6 sm:p-8 lg:p-10"
            style={{ width: '100%' }}
          >
            <div className="mb-5">
              {/*
                Logo2 viewBox is 1500×1500. Logo art occupies roughly:
                x=280-1216 (w≈936), y=649-847 (h≈198) in the 1500×1500 canvas.
                object-view-box crops to that exact region.
                aspect-ratio matches the cropped content: 936/198 ≈ 4.73.
              */}
              <img
                src={Logo2}
                alt="workfonow"
                style={{
                  objectViewBox: 'inset(43.3% 18.9% 43.5% 18.7%)',
                  objectFit: 'fill',
                  aspectRatio: '4.73 / 1',
                  width: 'clamp(160px, 50%, 240px)',
                  height: 'auto',
                  display: 'block',
                }}
              />
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-1">Sign In</h2>
            <p className="text-sm text-gray-500 mb-6">Welcome back! Enter your credentials to continue.</p>
            <LoginForm/>
            <p className="mt-6 text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link to="/register" className="font-bold text-indigo-600 hover:text-indigo-700 transition">Sign Up</Link>
            </p>
          </div>
          <div className="mt-4 flex items-center justify-end gap-2 text-xs text-gray-400 pr-2">
            <span>Powered by</span>
            <img src={KodeceptLogo} alt="Kodecept" style={{ height: '28px', width: 'auto' }} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 flex flex-wrap items-center justify-between gap-2 px-6 py-4 sm:px-10 lg:px-14 border-t border-gray-100 bg-white/60 backdrop-blur-sm">
        <div className="flex items-center gap-6 text-xs text-gray-400">
          <a href="#" className="hover:text-indigo-600 transition">Privacy Policy</a>
          <a href="#" className="hover:text-indigo-600 transition">Terms &amp; Conditions</a>
        </div>
        <p className="text-xs text-gray-400">© 2025 Workfonow. All rights reserved.</p>
      </footer>
    </div>
  );
};