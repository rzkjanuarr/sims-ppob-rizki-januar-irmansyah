import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterService } from '../Service/RegisterService';

const service = new RegisterService();

export const useRegisterViewModel = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi
    if (!email || !firstName || !lastName || !password || !confirmPassword) {
      setToastMessage('Semua field harus diisi');
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

    if (password !== confirmPassword) {
      setToastMessage('Password dan konfirmasi password tidak cocok');
      setShowToast(true);
      return;
    }

    setLoading(true);

    try {
      const response = await service.register({
        email,
        first_name: firstName,
        last_name: lastName,
        password,
      });

      if (response.status === 0) {
        // Success
        setToastMessage(response.message);
        setShowToast(true);

        // Redirect ke login setelah 3 detik
        setTimeout(() => {
          navigate('/login');
        }, 3000);
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

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const closeToast = () => {
    setShowToast(false);
  };

  return {
    email,
    setEmail,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    showConfirmPassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    handleRegister,
    showToast,
    toastMessage,
    closeToast,
    loading,
  };
};
