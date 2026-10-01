export const Footer = () => {
  return (
    <footer className="border-t border-gray-100 bg-white px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-between gap-2 text-xs text-gray-500 sm:flex-row">
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