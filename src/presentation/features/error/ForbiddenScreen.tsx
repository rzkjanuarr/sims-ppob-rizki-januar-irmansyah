import { useNavigate } from 'react-router-dom';
import { AppPaths } from '../../../core/common/AppPaths';

export const ForbiddenScreen = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate(AppPaths.login);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <img
          src="/assets/Logo.png"
          alt="SIMS PPOB"
          className="w-12 h-12 object-contain"
        />
        <span className="text-2xl font-semibold text-black">SIMS PPOB</span>
      </div>

      {/* Error Content */}
      <div className="text-center">
        <h1 className="text-8xl font-bold text-red-600 mb-4">403</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Akses Ditolak</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          Anda harus login terlebih dahulu untuk mengakses halaman ini.
        </p>

        {/* Login Button */}
        <button
          onClick={handleLoginRedirect}
          className="px-8 py-3 bg-red-600 text-white rounded-lg font-semibold text-base cursor-pointer transition-colors hover:bg-red-700 active:translate-y-0.5"
        >
          Login Sekarang
        </button>
      </div>
    </div>
  );
};
