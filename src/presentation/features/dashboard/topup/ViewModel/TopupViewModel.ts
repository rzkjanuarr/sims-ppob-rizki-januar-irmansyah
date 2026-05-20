import { useState, useEffect } from 'react';
import { TopupService } from '../../shared/topup/Service/TopupService';
import { BalanceService } from '../../shared/balance/Service/BalanceService';
import { ProfileService } from '../../shared/profile/Service/ProfileService';

const topupService = new TopupService();
const balanceService = new BalanceService();
const profileService = new ProfileService();

export const useTopupViewModel = () => {
  const [balance, setBalance] = useState(0);
  const [userName, setUserName] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('/assets/ProfilePhoto.png');
  const [showBalance, setShowBalance] = useState(true);
  const [topupAmount, setTopupAmount] = useState(''); // Raw value tanpa format
  const [displayAmount, setDisplayAmount] = useState(''); // Display value dengan format
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'confirm' | 'loading' | 'success' | 'error'>('confirm');
  const [errorMessage, setErrorMessage] = useState('');

  const nominalOptions = [
    10000,
    20000,
    50000,
    100000,
    250000,
    500000,
  ];

  // Fetch initial data
  useEffect(() => {
    fetchInitialData();
  }, []);

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

  const formatNumber = (value: string) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/\D/g, '');

    // Format with thousand separator
    if (numericValue === '') return '';
    return new Intl.NumberFormat('id-ID').format(parseInt(numericValue));
  };

  const handleNominalClick = (amount: number) => {
    setSelectedAmount(amount);
    setTopupAmount(amount.toString());
    setDisplayAmount(formatNumber(amount.toString()));
  };

  const handleInputChange = (value: string) => {
    // Remove non-numeric characters
    const numericValue = value.replace(/\D/g, '');

    // Update raw value (tanpa format)
    setTopupAmount(numericValue);

    // Update display value (dengan format)
    setDisplayAmount(formatNumber(numericValue));

    // Clear selected button when typing
    setSelectedAmount(null);
  };

  const handleTopup = () => {
    if (!topupAmount || parseInt(topupAmount) <= 0) {
      setErrorMessage('Silahkan masukan nominal top up');
      setModalType('error');
      setIsModalOpen(true);
      return;
    }

    // Show confirmation modal
    setModalType('confirm');
    setIsModalOpen(true);
  };

  const handleConfirmTopup = async () => {
    // Show loading modal
    setModalType('loading');

    try {
      const response = await topupService.topup({
        top_up_amount: parseInt(topupAmount),
      });

      if (response.status === 0) {
        // Success - update balance
        setBalance(response.data.balance);
        setModalType('success');
      } else {
        // Error from API
        setErrorMessage(response.message);
        setModalType('error');
      }
    } catch (error: any) {
      setErrorMessage('Terjadi kesalahan. Silakan coba lagi.');
      setModalType('error');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);

    // Reset form if success
    if (modalType === 'success') {
      setTopupAmount('');
      setDisplayAmount('');
      setSelectedAmount(null);
    }
  };

  const handleCancelTopup = () => {
    setIsModalOpen(false);
  };

  const formatCurrency = (amount: number) => {
    return `Rp${new Intl.NumberFormat('id-ID').format(amount)}`;
  };

  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
  };

  return {
    balance,
    userName,
    profilePhoto,
    showBalance,
    topupAmount, // Raw value untuk dikirim
    displayAmount, // Formatted value untuk ditampilkan
    selectedAmount,
    nominalOptions,
    handleNominalClick,
    handleInputChange,
    handleTopup,
    formatCurrency,
    toggleBalanceVisibility,
    loading,
    // Modal states & handlers
    isModalOpen,
    modalType,
    errorMessage,
    handleConfirmTopup,
    handleCloseModal,
    handleCancelTopup,
  };
};
