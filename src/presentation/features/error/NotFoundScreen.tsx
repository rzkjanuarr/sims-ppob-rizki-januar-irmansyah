import { useNavigate } from 'react-router-dom';

export const NotFoundScreen = () => {
  const navigate = useNavigate();

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
        <h1 className="text-8xl font-bold text-red-600 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Halaman Tidak Ditemukan</h2>
        <p className="text-gray-600 mb-8 max-w-md">
          Maaf, halaman yang Anda cari tidak dapat ditemukan. Silakan kembali ke halaman utama.
        </p>
      </div>
    </div>
  );
};
