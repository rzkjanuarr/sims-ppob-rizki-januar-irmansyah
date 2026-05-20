import { Eye, EyeOff } from 'lucide-react';

export const AccountBalance = ({
  userName,
  profilePhoto,
  balance,
  showBalance,
  onToggleBalance
}) => {
  const formatBalance = (amount) => {
    return new Intl.NumberFormat('id-ID').format(amount);
  };

  return (
    <div className="flex items-start justify-between mb-12">
      {/* Profile */}
      <div className="flex items-start gap-4">
        <img
          src={profilePhoto}
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
        />
        <div>
          <p className="text-sm text-gray-600 mb-1">Selamat datang,</p>
          <h1 className="text-2xl font-bold text-gray-900">{userName}</h1>
        </div>
      </div>

      {/* Balance Card */}
      <div
        className="relative w-[480px] h-[160px] rounded-2xl overflow-hidden"
        style={{
          backgroundImage: 'url(/assets/BackgroundSaldo.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-red-600/20"></div>
        <div className="relative h-full flex flex-col justify-center px-6 text-white">
          <p className="text-sm mb-2">Saldo anda</p>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold">
              {showBalance ? `Rp ${formatBalance(balance)}` : 'Rp •••••••'}
            </span>
          </div>
          <button
            onClick={onToggleBalance}
            className="flex items-center gap-2 text-xs hover:opacity-80 transition-opacity cursor-pointer"
          >
            <span>Lihat Saldo</span>
            {showBalance ? (
              <EyeOff size={14} strokeWidth={2} />
            ) : (
              <Eye size={14} strokeWidth={2} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
