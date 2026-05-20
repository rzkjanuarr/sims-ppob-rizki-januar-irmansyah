import { useState, useEffect } from 'react';
import { BalanceService } from '../../shared/balance/Service/BalanceService';
import { ProfileService } from '../../shared/profile/Service/ProfileService';
import { HistoryService } from '../../shared/history/Service/HistoryService';
import type { HistoryRecord } from '../../shared/history/Model/HistoryModel';

const balanceService = new BalanceService();
const profileService = new ProfileService();
const historyService = new HistoryService();

export const useTransactionViewModel = () => {
  const [balance, setBalance] = useState(0);
  const [userName, setUserName] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('/assets/ProfilePhoto.png');
  const [showBalance, setShowBalance] = useState(false);
  const [allTransactions, setAllTransactions] = useState<HistoryRecord[]>([]); // All transactions from API
  const [filteredTransactions, setFilteredTransactions] = useState<HistoryRecord[]>([]); // Filtered by month
  const [offset, setOffset] = useState(0);
  const [limit] = useState(5);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('');

  const months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  // Fetch initial data
  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      // Fetch balance, profile, and initial transactions in parallel
      const [balanceResponse, profileResponse, historyResponse] = await Promise.all([
        balanceService.getBalance(),
        profileService.getProfile(),
        historyService.getHistory(0, limit),
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

      // Update transactions
      if (historyResponse.status === 0) {
        setAllTransactions(historyResponse.data.records);
        setOffset(limit);
        setHasMore(historyResponse.data.records.length === limit);

        // Set current month as selected and filter
        const currentMonth = new Date().toLocaleString('id-ID', { month: 'long' });
        const capitalizedMonth = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);
        setSelectedMonth(capitalizedMonth);

        // Filter transactions by current month
        const filtered = filterTransactionsByMonth(historyResponse.data.records, capitalizedMonth);
        setFilteredTransactions(filtered);
      }
    } catch (error) {
      console.error('Error fetching initial data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterTransactionsByMonth = (transactions: HistoryRecord[], month: string): HistoryRecord[] => {
    const monthIndex = months.indexOf(month);
    if (monthIndex === -1) return transactions;

    return transactions.filter((transaction) => {
      const date = new Date(transaction.created_on);
      return date.getMonth() === monthIndex;
    });
  };

  const formatCurrency = (amount: number) => {
    const absAmount = Math.abs(amount);
    return `Rp.${new Intl.NumberFormat('id-ID').format(absAmount)}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }) + ' WIB';
  };

  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
  };

  const handleShowMore = async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    try {
      const historyResponse = await historyService.getHistory(offset, limit);

      if (historyResponse.status === 0) {
        const newRecords = historyResponse.data.records;
        const updatedAllTransactions = [...allTransactions, ...newRecords];
        setAllTransactions(updatedAllTransactions);
        setOffset(offset + limit);
        setHasMore(newRecords.length === limit);

        // Re-filter with updated transactions
        const filtered = filterTransactionsByMonth(updatedAllTransactions, selectedMonth);
        setFilteredTransactions(filtered);
      }
    } catch (error) {
      console.error('Error fetching more transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMonthClick = async (month: string) => {
    setSelectedMonth(month);

    // Reset and fetch fresh data from API
    setLoading(true);
    setOffset(0);

    try {
      const historyResponse = await historyService.getHistory(0, limit);

      if (historyResponse.status === 0) {
        setAllTransactions(historyResponse.data.records);
        setOffset(limit);
        setHasMore(historyResponse.data.records.length === limit);

        // Filter transactions by selected month
        const filtered = filterTransactionsByMonth(historyResponse.data.records, month);
        setFilteredTransactions(filtered);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    balance,
    userName,
    profilePhoto,
    showBalance,
    transactions: filteredTransactions,
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
  };
};
