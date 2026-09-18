import { Link } from "react-router-dom";
import { RegisterForm } from "../components/RegisterForm";
import Logo3 from "../../../assets/workfornow-main-black-text-clean.svg";
import Logo2 from "../../../assets/workfornow-auth-black-text-clean.svg";
import KodeceptLogo from "../../../assets/Kodecept logo.svg";

const CheckCircle = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
    <circle cx="10" cy="10" r="10" fill="#EEF2FF" />
    <path d="M6 10.5l3 3 5-5" stroke="#4F46E5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const RegisterPage = () => {
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
          <span className="hidden sm:inline">Already have an account?</span>
          <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-700 transition flex items-center gap-0.5">
            <span className="sm:hidden">Sign In</span>
            <span className="hidden sm:inline">Sign In</span>
            <svg className="h-3.5 w-3.5 ml-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 flex flex-1 flex-col lg:flex-row items-start gap-6 px-4 py-4 sm:px-8 lg:px-14 xl:px-20 lg:gap-10 xl:gap-16">

        {/* Left Hero — hidden on mobile, shown md+ */}
        <div className="hidden md:block w-full lg:flex-1 lg:min-w-0 pt-2 lg:pt-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-500">Get Started</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight tracking-tight">
            Build Your<br/>Workforce<br/><span className="text-indigo-600">Smarter</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-gray-500 leading-relaxed max-w-sm">
            Join thousands of teams already managing employees, tasks, and operations on Workfonow.
          </p>
          <ul className="mt-5 space-y-3">
            {[
              "Free to get started — no credit card",
              "Full access to all core features",
              "Workforce Intelligence & AI tools",
            ].map(f => (
              <li key={f} className="flex items-center gap-3">
                <CheckCircle/>
                <span className="text-sm font-medium text-gray-700">{f}</span>
              </li>
            ))}
          </ul>
          {/* Stats row */}
          <div className="mt-8 grid grid-cols-3 gap-4 max-w-xs">
            {[
              { value: "10K+", label: "Teams" },
              { value: "248K", label: "Employees" },
              { value: "99.9%", label: "Uptime" },
            ].map(s => (
              <div key={s.label} className="rounded-2xl bg-white border border-indigo-100 p-3 text-center shadow-sm shadow-indigo-100/50">
                <div className="text-lg font-black text-indigo-600">{s.value}</div>
                <div className="text-[10px] font-medium text-gray-400 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-indigo-600 text-xl leading-snug" style={{ fontFamily: "'Dancing Script',cursive" }}>
            A Smarter<br/>Workplace for Tomorrow.
          </p>
        </div>

        {/* Right Card */}
        <div className="w-full md:mx-auto md:max-w-md lg:mx-0 lg:w-auto lg:flex-shrink-0 pb-8" style={{ minWidth: 0 }}>
          <div className="rounded-3xl bg-white shadow-xl shadow-indigo-100/50 border border-gray-100 p-6 sm:p-8 lg:p-10">
            <div className="mb-5">
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
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-1">Create Account</h2>
            <p className="text-sm text-gray-500 mb-6">Fill in your details to get started for free.</p>
            <RegisterForm/>
            <p className="mt-6 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-700 transition">Sign In</Link>
            </p>
          </div>
          <div className="mt-4 flex items-center justify-end gap-2 text-xs text-gray-400 pr-2">
            <span>Powered by</span>
            <img src={KodeceptLogo} alt="Kodecept" style={{ height: '28px', width: 'auto' }} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 flex flex-wrap items-center justify-between gap-2 px-4 py-4 sm:px-8 lg:px-14 border-t border-gray-100 bg-white/60 backdrop-blur-sm">
        <div className="flex items-center gap-6 text-xs text-gray-400">
          <a href="#" className="hover:text-indigo-600 transition">Privacy Policy</a>
          <a href="#" className="hover:text-indigo-600 transition">Terms &amp; Conditions</a>
        </div>
        <p className="text-xs text-gray-400">© 2025 Workfonow. All rights reserved.</p>
      </footer>
    </div>
  );
};