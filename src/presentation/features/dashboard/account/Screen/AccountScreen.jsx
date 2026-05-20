import { AtSign, User, Edit2 } from 'lucide-react';
import { useAccountViewModel } from '../ViewModel/AccountViewModel';
import { Header } from '../../../../components/Header/Header';
import { Toast } from '../../../../components/Toast/Toast';

export const AccountScreen = () => {
  const {
    email,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    profileImage,
    loading,
    isEditing,
    handleEditProfile,
    handleImageUpload,
    handleLogout,
    showToast,
    toastMessage,
    toastType,
    closeToast,
  } = useAccountViewModel();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  if (loading && !email) {
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
      <main className="max-w-2xl mx-auto px-6 py-12">
        {/* Profile Image Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-6">
            <img
              src={profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
            />
            {/* Edit Icon */}
            <label
              htmlFor="profile-image-upload"
              className="absolute bottom-0 right-0 bg-white rounded-full p-2 border border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <Edit2 size={16} className="text-gray-600" />
              <input
                id="profile-image-upload"
                type="file"
                accept="image/jpeg,image/jpg,image/png"
                onChange={handleFileChange}
                className="hidden"
                disabled={loading}
              />
            </label>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {firstName} {lastName}
          </h1>
        </div>

        {/* Form Section */}
        <div className="space-y-6">
          {/* Email Field (Read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <AtSign
                size={20}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                strokeWidth={1.5}
              />
              <input
                type="email"
                value={email}
                disabled
                className="w-full pl-12 pr-4 py-[18px] border border-gray-300 rounded-lg text-base font-normal bg-gray-50 text-gray-500 cursor-not-allowed"
              />
            </div>
          </div>

          {/* First Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Depan
            </label>
            <div className="relative">
              <User
                size={20}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                strokeWidth={1.5}
              />
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={!isEditing || loading}
                className={`w-full pl-12 pr-4 py-[18px] border border-gray-300 rounded-lg text-base font-normal placeholder-gray-400 transition-colors ${
                  isEditing && !loading
                    ? 'bg-white focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100'
                    : 'bg-gray-50 text-gray-500 cursor-not-allowed'
                }`}
              />
            </div>
          </div>

          {/* Last Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Belakang
            </label>
            <div className="relative">
              <User
                size={20}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                strokeWidth={1.5}
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={!isEditing || loading}
                className={`w-full pl-12 pr-4 py-[18px] border border-gray-300 rounded-lg text-base font-normal placeholder-gray-400 transition-colors ${
                  isEditing && !loading
                    ? 'bg-white focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-100'
                    : 'bg-gray-50 text-gray-500 cursor-not-allowed'
                }`}
              />
            </div>
          </div>

          {/* Edit Profile Button */}
          <button
            onClick={handleEditProfile}
            disabled={loading}
            className="w-full px-5 py-[18px] bg-red-600 text-white rounded-lg font-semibold text-base cursor-pointer transition-colors hover:bg-red-700 active:translate-y-0.5 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:bg-gray-300"
          >
            {loading ? 'Loading...' : isEditing ? 'Simpan' : 'Edit Profile'}
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            disabled={loading}
            className="w-full px-5 py-[18px] bg-white text-red-600 border-2 border-red-600 rounded-lg font-semibold text-base cursor-pointer transition-colors hover:bg-red-50 active:translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Logout
          </button>
        </div>
      </main>

      {/* Toast Notification */}
      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={closeToast}
        />
      )}
    </div>
  );
};
