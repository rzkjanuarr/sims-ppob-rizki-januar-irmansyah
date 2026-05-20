import React from 'react';
import { Eye, EyeOff, AtSign, LockKeyhole, User } from 'lucide-react';
import { useRegisterViewModel } from '../ViewModel/RegisterViewModel';
import { Toast } from '../../../../components/Toast/Toast';

export const RegisterScreen = () => {
  const {
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
  } = useRegisterViewModel();

  return (
    <div className="flex h-screen w-screen bg-white overflow-hidden">
      {/* Left Section - Form */}
      <div className="w-full lg:flex-1 flex flex-col justify-center items-center px-10 md:px-16 bg-white">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-4">
          <img
            src="/assets/Logo.png"
            alt="SIMS PPOB"
            className="w-8 h-8 object-contain"
          />
          <span className="text-lg font-semibold text-black">SIMS PPOB</span>
        </div>

        {/* Form Content */}
        <div className="w-full max-w-md">
          <h1 className="text-4xl text-center font-bold text-black mb-4 leading-tight">
            Lengkapi data untuk membuat akun
          </h1>

          <form onSubmit={handleRegister} className="flex flex-col gap-5 mb-5">
            {/* Email Input */}
            <div className="relative">
              <AtSign
                size={20}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                strokeWidth={1.5}
              />
              <input
                type="email"
                placeholder="masukan email anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg text-base font-normal placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition-colors bg-white"
                required
              />
            </div>

            {/* First Name Input */}
            <div className="relative">
              <User
                size={20}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                strokeWidth={1.5}
              />
              <input
                type="text"
                placeholder="nama depan"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg text-base font-normal placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition-colors bg-white"
                required
              />
            </div>

            {/* Last Name Input */}
            <div className="relative">
              <User
                size={20}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                strokeWidth={1.5}
              />
              <input
                type="text"
                placeholder="nama belakang"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg text-base font-normal placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition-colors bg-white"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <LockKeyhole
                size={20}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                strokeWidth={1.5}
              />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="buat password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-4 border border-gray-300 rounded-lg text-base font-normal placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition-colors bg-white"
                required
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:opacity-70 transition-opacity flex items-center justify-center"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <Eye size={20} color="currentColor" strokeWidth={1.5} />
                ) : (
                  <EyeOff size={20} color="currentColor" strokeWidth={1.5} />
                )}
              </button>
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <LockKeyhole
                size={20}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                strokeWidth={1.5}
              />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="konfirmasi password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-4 border border-gray-300 rounded-lg text-base font-normal placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100 transition-colors bg-white"
                required
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:opacity-70 transition-opacity flex items-center justify-center"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? (
                  <Eye size={20} color="currentColor" strokeWidth={1.5} />
                ) : (
                  <EyeOff size={20} color="currentColor" strokeWidth={1.5} />
                )}
              </button>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full px-5 py-4 bg-red-600 text-white rounded-lg font-semibold text-base cursor-pointer transition-colors hover:bg-red-700 active:translate-y-0.5"
            >
              Registrasi
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center text-sm text-gray-600">
            <span>sudah punya akun? login </span>
            <a href="/login" className="text-red-600 font-semibold hover:text-red-700 hover:underline transition-colors">
              di sini
            </a>
          </div>

          {/* Toast Notification */}
          {showToast && (
            <Toast message={toastMessage} onClose={closeToast} />
          )}
        </div>
      </div>

      {/* Right Section - Illustration */}
      <div className="hidden lg:flex lg:flex-1 justify-center items-center bg-white overflow-hidden">
        <img
          src="/assets/IlustrasiLogin.png"
          alt="Ilustrasi"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};
