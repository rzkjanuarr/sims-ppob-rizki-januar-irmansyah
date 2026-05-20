import { Banknote } from 'lucide-react';
import { useTopupViewModel } from '../ViewModel/TopupViewModel';
import { Header } from '../../../../components/Header/Header';
import { AccountBalance } from '../../../../components/AccountBalance/AccountBalance';
import Modal from '../../../../components/Modal/Modal';

export const TopupScreen = () => {
  const {
    balance,
    userName,
    profilePhoto,
    showBalance,
    topupAmount,
    displayAmount,
    selectedAmount,
    nominalOptions,
    handleNominalClick,
    handleInputChange,
    handleTopup,
    formatCurrency,
    toggleBalanceVisibility,
    loading,
    // Modal
    isModalOpen,
    modalType,
    errorMessage,
    handleConfirmTopup,
    handleCloseModal,
    handleCancelTopup,
  } = useTopupViewModel();

  if (loading && !isModalOpen) {
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

        {/* Topup Form Section */}
        <div>
          <div className="mb-8">
            <p className="text-sm text-gray-600 mb-2">Silahkan masukan</p>
            <h2 className="text-3xl font-bold text-gray-900">Nominal Top Up</h2>
          </div>

          <div className="flex gap-12">
            {/* Left Side - Input */}
            <div className="flex-1">
              <div className="mb-6">
                <div className="relative">
                  <Banknote
                    size={20}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    strokeWidth={1.5}
                  />
                  <input
                    type="text"
                    placeholder="masukan nominal Top Up"
                    value={displayAmount}
                    onChange={(e) => handleInputChange(e.target.value)}
                    className="w-full pl-12 pr-4 py-[18px] border border-gray-300 rounded-lg text-base font-normal placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition-colors bg-white"
                  />
                </div>
              </div>

              <button
                onClick={handleTopup}
                disabled={!topupAmount || parseInt(topupAmount) <= 0}
                className="w-full px-5 py-[18px] bg-red-600 text-white rounded-lg font-semibold text-base cursor-pointer transition-colors hover:bg-red-700 active:translate-y-0.5 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
              >
                Top Up
              </button>
            </div>

            {/* Right Side - Nominal Options */}
            <div className="flex-1">
              <div className="grid grid-cols-3 gap-5">
                {nominalOptions.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleNominalClick(amount)}
                    className={`px-6 py-4 border rounded-lg text-sm font-medium transition-all cursor-pointer ${
                      selectedAmount === amount
                        ? 'border-red-600 bg-red-50 text-red-600'
                        : 'border-gray-300 text-gray-700 hover:border-red-600 hover:bg-red-50 hover:text-red-600'
                    }`}
                  >
                    {formatCurrency(amount)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal Confirmation */}
      {modalType === 'confirm' && (
        <Modal
          isOpen={isModalOpen}
          logo="/assets/Logo.png"
          title={`Anda yakin untuk Top Up sebesar`}
          amount={parseInt(topupAmount)}
          onAction={handleConfirmTopup}
          actionLabel="Ya, lanjutkan Top Up"
          onSubAction={handleCancelTopup}
          subActionLabel="Batalkan"
          useTextLinks={true}
        />
      )}

      {/* Modal Loading */}
      {modalType === 'loading' && (
        <Modal
          isOpen={isModalOpen}
          logo="/assets/Logo.png"
          title="Memproses Top Up..."
          amount={parseInt(topupAmount)}
        />
      )}

      {/* Modal Success */}
      {modalType === 'success' && (
        <Modal
          isOpen={isModalOpen}
          showSuccessIcon={true}
          variant="success"
          title="Top Up sebesar"
          amount={parseInt(topupAmount)}
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
          title={errorMessage || "Top Up gagal"}
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
