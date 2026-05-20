import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppPaths } from '../../../../../core/common/AppPaths';
import { ServicesService } from '../../shared/services/Service/ServicesService';
import { BannerService } from '../../shared/banner/Service/BannerService';
import { BalanceService } from '../../shared/balance/Service/BalanceService';
import { ProfileService } from '../../shared/profile/Service/ProfileService';
import type { ServiceData } from '../../shared/services/Model/ServicesModel';
import type { BannerData } from '../../shared/banner/Model/BannerModel';

const servicesService = new ServicesService();
const bannerService = new BannerService();
const balanceService = new BalanceService();
const profileService = new ProfileService();

export const useDashboardViewModel = () => {
  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(false);
  const [balance, setBalance] = useState(0);
  const [userName, setUserName] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('/assets/ProfilePhoto.png');
  const [services, setServices] = useState<ServiceData[]>([]);
  const [banners, setBanners] = useState<BannerData[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch initial data
  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      // Fetch all data in parallel
      const [balanceResponse, profileResponse, servicesResponse, bannersResponse] = await Promise.all([
        balanceService.getBalance(),
        profileService.getProfile(),
        servicesService.getServices(),
        bannerService.getBanners(),
      ]);

      // Update balance
      if (balanceResponse.status === 0) {
        setBalance(balanceResponse.data.balance);
      }

      // Update profile
      if (profileResponse.status === 0) {
        setUserName(`${profileResponse.data.first_name} ${profileResponse.data.last_name}`);
        setProfilePhoto(profileResponse.data.profile_image);
      }

      // Update services
      if (servicesResponse.status === 0) {
        setServices(servicesResponse.data);
      }

      // Update banners
      if (bannersResponse.status === 0) {
        setBanners(bannersResponse.data);
      }
    } catch (error) {
      console.error('Error fetching initial data:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
  };

  const handleServiceClick = (service: ServiceData) => {
    // Navigate to pembelian screen with service data
    navigate(AppPaths.pembelian, {
      state: {
        service_code: service.service_code,
        service_name: service.service_name,
        service_icon: service.service_icon,
        service_tariff: service.service_tariff,
      },
    });
  };

  return {
    showBalance,
    balance,
    userName,
    profilePhoto,
    toggleBalanceVisibility,
    services,
    banners,
    handleServiceClick,
    loading,
  };
};
