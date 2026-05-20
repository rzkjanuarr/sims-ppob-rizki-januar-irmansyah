import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginService } from '../Service/LoginService';
import { AuthHelper } from '../../../../../core/auth/AuthHelper';

const service = new LoginService();

export const useLoginViewModel = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi
    if (!email || !password) {
      setToastMessage('Email dan password harus diisi');
      setShowToast(true);
      return;
    }

    // Validasi email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setToastMessage('Format email tidak valid');
      setShowToast(true);
      return;
    }

    if (password.length < 8) {
      setToastMessage('Password minimal 8 karakter');
      setShowToast(true);
      return;
    }

    setLoading(true);

    try {
      const response = await service.login({
        email,
        password,
      });

      if (response.status === 0) {
        // Success - Store token using AuthHelper
        AuthHelper.setToken(response.data.token);

        setToastMessage(response.message);
        setShowToast(true);

        // Redirect ke dashboard setelah 1 detik
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        // Error from API
        setToastMessage(response.message);
        setShowToast(true);
      }
    } catch (error: any) {
      setToastMessage('Terjadi kesalahan. Silakan coba lagi.');
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const closeToast = () => {
    setShowToast(false);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    togglePasswordVisibility,
    handleLogin,
    showToast,
    toastMessage,
    closeToast,
    loading,
  };
};
