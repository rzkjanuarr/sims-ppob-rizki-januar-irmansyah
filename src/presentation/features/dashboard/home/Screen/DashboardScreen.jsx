import { useDashboardViewModel } from '../ViewModel/DashboardViewModel';
import { Service } from '../../../../components/Service/Service';
import { Banner } from '../../../../components/Banner/Banner';
import { Header } from '../../../../components/Header/Header';
import { AccountBalance } from '../../../../components/AccountBalance/AccountBalance';

export const DashboardScreen = () => {
  const {
    showBalance,
    balance,
    userName,
    profilePhoto,
    toggleBalanceVisibility,
    services,
    banners,
    handleServiceClick,
    loading,
  } = useDashboardViewModel();

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
      <main className="max-w-7xl mx-auto px-6 py-8 overflow-hidden">
        {/* Profile and Balance Section */}
        <AccountBalance
          userName={userName}
          profilePhoto={profilePhoto}
          balance={balance}
          showBalance={showBalance}
          onToggleBalance={toggleBalanceVisibility}
        />

        {/* Services Grid */}
        <div className="mb-12">
          <div className="grid grid-cols-12 gap-4">
            {services.map((service) => (
              <div key={service.service_code} className="col-span-1">
                <Service
                  icon={service.service_icon}
                  label={service.service_name}
                  onClick={() => handleServiceClick(service)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Banners Section */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Temukan promo menarik</h2>
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide -mx-6 px-6">
            {banners.map((banner, index) => (
              <Banner key={index} image={banner.banner_image} alt={banner.banner_name} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
