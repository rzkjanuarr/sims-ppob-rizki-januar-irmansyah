import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { TransactionService } from '../../shared/transaction/Service/TransactionService';
import { BalanceService } from '../../shared/balance/Service/BalanceService';
import { ProfileService } from '../../shared/profile/Service/ProfileService';

const transactionService = new TransactionService();
const balanceService = new BalanceService();
const profileService = new ProfileService();

export const usePembelianViewModel = () => {
  const location = useLocation();
  const [balance, setBalance] = useState(0);
  const [userName, setUserName] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('/assets/ProfilePhoto.png');
  const [showBalance, setShowBalance] = useState(true);
  const [loading, setLoading] = useState(false);

  // Service route state
  const [serviceCode, setServiceCode] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [serviceIcon, setServiceIcon] = useState('');
  const [serviceTariff, setServiceTariff] = useState(0);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'success' | 'error'>('success');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch initial data
  useEffect(() => {
    fetchInitialData();

    // Get service info from route state
    if (location.state) {
      const { service_code, service_name, service_icon, service_tariff } = location.state;
      setServiceCode(service_code || '');
      setServiceName(service_name || '');
      setServiceIcon(service_icon || '');
      setServiceTariff(service_tariff || 0);
    }
  }, [location.state]);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      // Fetch balance
      const balanceResponse = await balanceService.getBalance();
      if (balanceResponse.status === 0) {
        setBalance(balanceResponse.data.balance);
      }

      // Fetch profile
      const profileResponse = await profileService.getProfile();
      if (profileResponse.status === 0) {
        setUserName(`${profileResponse.data.first_name} ${profileResponse.data.last_name}`);
        setProfilePhoto(profileResponse.data.profile_image);
      }
    } catch (error) {
      console.error('Error fetching initial data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBayar = async () => {
    if (!serviceCode) {
      setErrorMessage('Service tidak ditemukan');
      setModalType('error');
      setIsModalOpen(true);
      return;
    }

    // Check if balance is sufficient
    if (balance < serviceTariff) {
      setErrorMessage('Saldo tidak mencukupi');
      setModalType('error');
      setIsModalOpen(true);
      return;
    }

    setLoading(true);

    try {
      const response = await transactionService.createTransaction({
        service_code: serviceCode,
      });

      if (response.status === 0) {
        // Success - update balance
        const newBalance = balance - response.data.total_amount;
        setBalance(newBalance);
        setModalType('success');
      } else {
        // Error from API
        setErrorMessage(response.message);
        setModalType('error');
      }

      setIsModalOpen(true);
    } catch (error: any) {
      setErrorMessage('Terjadi kesalahan. Silakan coba lagi.');
      setModalType('error');
      setIsModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
  };

  const formatCurrency = (amount: number) => {
    return `Rp${new Intl.NumberFormat('id-ID').format(amount)}`;
  };

  return {
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
    // Modal states & handlers
    isModalOpen,
    modalType,
    errorMessage,
    handleCloseModal,
  };
};
