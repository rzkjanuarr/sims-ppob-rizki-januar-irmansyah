import { useLocation, useNavigate } from 'react-router-dom';

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogoClick = () => {
    navigate('/dashboard');
  };

  return (
    <header className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={handleLogoClick}
        >
          <img
            src="/assets/Logo.png"
            alt="SIMS PPOB"
            className="w-6 h-6 object-contain"
          />
          <span className="text-base font-semibold text-black">SIMS PPOB</span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          <a
            href="/topup"
            className={`relative text-sm transition-colors duration-300 cursor-pointer group ${
              isActive('/topup') ? 'text-red-600 font-semibold' : 'text-gray-700 hover:text-red-600'
            }`}
          >
            Top Up
            {!isActive('/topup') && (
              <span className="absolute left-0 bottom-0 h-0.5 bg-red-600 w-0 group-hover:w-full transition-all duration-300"></span>
            )}
          </a>
          <a
            href="/transaction"
            className={`relative text-sm transition-colors duration-300 cursor-pointer group ${
              isActive('/transaction') ? 'text-red-600 font-semibold' : 'text-gray-700 hover:text-red-600'
            }`}
          >
            Transaction
            {!isActive('/transaction') && (
              <span className="absolute left-0 bottom-0 h-0.5 bg-red-600 w-0 group-hover:w-full transition-all duration-300"></span>
            )}
          </a>
          <a
            href="/akun"
            className={`relative text-sm transition-colors duration-300 cursor-pointer group ${
              isActive('/akun') ? 'text-red-600 font-semibold' : 'text-gray-700 hover:text-red-600'
            }`}
          >
            Akun
            {!isActive('/akun') && (
              <span className="absolute left-0 bottom-0 h-0.5 bg-red-600 w-0 group-hover:w-full transition-all duration-300"></span>
            )}
          </a>
        </nav>
      </div>
    </header>
  );
};
