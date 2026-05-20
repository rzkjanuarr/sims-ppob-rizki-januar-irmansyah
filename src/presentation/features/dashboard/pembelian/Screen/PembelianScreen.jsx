import { CreditCard } from 'lucide-react';
import { usePembelianViewModel } from '../ViewModel/PembelianViewModel';
import { Header } from '../../../../components/Header/Header';
import { AccountBalance } from '../../../../components/AccountBalance/AccountBalance';
import Modal from '../../../../components/Modal/Modal';

export const PembelianScreen = () => {
  const {
    balance,
    userName,
    profilePhoto,
    showBalance,
    serviceName,
    serviceIcon,
    serviceTariff,
    handleBayar,
    toggleBalanceVisibility,
    formatCurrency,
    loading,
    // Modal
    isModalOpen,
    modalType,
    errorMessage,
    handleCloseModal,
  } = usePembelianViewModel();

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Profile and Balance Section */}
        <AccountBalance
          userName={userName}
          profilePhoto={profilePhoto}
          balance={balance}
          showBalance={showBalance}
          onToggleBalance={toggleBalanceVisibility}
        />

        {/* Pembelian Form Section - Full Width */}
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">PemBayaran</h2>

            {/* Service Info */}
            <div className="flex items-center gap-3 mb-6">
              {serviceIcon && (
                <img
                  src={serviceIcon}
                  alt={serviceName}
                  className="w-8 h-8 object-contain"
                />
              )}
              <span className="text-base font-medium text-gray-900">{serviceName}</span>
            </div>
          </div>

          {/* Input and Button - Full Width */}
          <div>
            <div className="mb-6">
              <div className="relative">
                <CreditCard
                  size={20}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  strokeWidth={1.5}
                />
                <input
                  type="text"
                  placeholder="Masukan nominal"
                  value={formatCurrency(serviceTariff)}
                  disabled
                  className="w-full pl-12 pr-4 py-[18px] border border-gray-300 rounded-lg text-base font-normal placeholder-gray-400 bg-gray-50 text-gray-700 cursor-not-allowed"
                />
              </div>
            </div>

            <button
              onClick={handleBayar}
              disabled={loading || !serviceName}
              className="w-full px-5 py-[18px] bg-red-600 text-white rounded-lg font-semibold text-base cursor-pointer transition-colors hover:bg-red-700 active:translate-y-0.5 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
            >
              {loading ? 'Memproses...' : 'Bayar'}
            </button>
          </div>
        </div>
      </main>

      {/* Modal Success */}
      {modalType === 'success' && (
        <Modal
          isOpen={isModalOpen}
          showSuccessIcon={true}
          variant="success"
          title={`Pembayaran ${serviceName.toLowerCase()} sebesar`}
          amount={serviceTariff}
          subtitle="berhasil!"
          onAction={handleCloseModal}
          actionLabel="Kembali ke Beranda"
          useTextLinks={true}
        />
      )}

      {/* Modal Error */}
      {modalType === 'error' && (
        <Modal
          isOpen={isModalOpen}
          showErrorIcon={true}
          title={errorMessage || `Pembayaran ${serviceName.toLowerCase()} gagal`}
          subtitle=""
          onAction={handleCloseModal}
          actionLabel="Kembali ke Beranda"
          variant="default"
          useTextLinks={true}
        />
      )}
    </div>
  );
};
