export const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white px-4 py-4 sm:px-6">
      <div className="flex flex-col items-center justify-between gap-2 text-xs text-slate-500 sm:flex-row">
        <p>
          © {new Date().getFullYear()} Employee Management Platform
        </p>

        <p>
          Supreme Admin
        </p>
      </div>
    </footer>
  );
};