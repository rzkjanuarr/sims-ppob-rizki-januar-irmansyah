import { Plus, Minus } from 'lucide-react';
import { useTransactionViewModel } from '../ViewModel/TransactionViewModel';
import { Header } from '../../../../components/Header/Header';
import { AccountBalance } from '../../../../components/AccountBalance/AccountBalance';

export const TransactionScreen = () => {
  const {
    balance,
    userName,
    profilePhoto,
    showBalance,
    transactions,
    months,
    selectedMonth,
    formatCurrency,
    formatDate,
    formatTime,
    toggleBalanceVisibility,
    handleShowMore,
    handleMonthClick,
    hasMore,
    loading,
  } = useTransactionViewModel();

  if (loading && transactions.length === 0) {
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

        {/* Transaction List Section */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Semua Transaksi</h2>

          {/* Month Filter */}
          <div className="flex items-center gap-4 mb-6 overflow-x-auto pb-2">
            {months.map((month) => (
              <button
                key={month}
                onClick={() => handleMonthClick(month)}
                className={`text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedMonth === month
                    ? 'text-gray-900 font-semibold'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {month}
              </button>
            ))}
          </div>

          {/* Transactions List */}
          {transactions.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              Maaf tidak ada histori transaksi saat ini
            </div>
          ) : (
            <div className="space-y-4">
              {transactions.map((transaction, index) => (
                <div
                  key={`${transaction.invoice_number}-${index}`}
                  className="flex items-center justify-between p-5 border border-gray-200 rounded-lg"
                >
                  {/* Left Side - Amount and Date */}
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 mb-1">
                      {transaction.transaction_type === 'TOPUP' ? (
                        <Plus size={20} className="text-green-500" strokeWidth={2.5} />
                      ) : (
                        <Minus size={20} className="text-red-500" strokeWidth={2.5} />
                      )}
                      <span
                        className={`text-xl font-bold ${
                          transaction.transaction_type === 'TOPUP' ? 'text-green-500' : 'text-red-500'
                        }`}
                      >
                        {transaction.transaction_type === 'TOPUP' ? '+' : '-'} {formatCurrency(transaction.total_amount)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 ml-7">
                      {formatDate(transaction.created_on)} {formatTime(transaction.created_on)}
                    </p>
                  </div>

                  {/* Right Side - Description */}
                  <div className="text-right">
                    <p className="text-sm text-gray-700">{transaction.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Show More Button */}
          {hasMore && transactions.length > 0 && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleShowMore}
                disabled={loading}
                className="text-red-600 text-sm font-semibold hover:text-red-700 transition-colors cursor-pointer disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? 'Loading...' : 'Show more'}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
