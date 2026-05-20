import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileService } from '../../shared/profile/Service/ProfileService';
import { AuthHelper } from '../../../../../core/auth/AuthHelper';
import { AppPaths } from '../../../../../core/common/AppPaths';

const profileService = new ProfileService();

export const useAccountViewModel = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profileImage, setProfileImage] = useState('/assets/ProfilePhoto.png');
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  // Fetch profile data on mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await profileService.getProfile();

      if (response.status === 0) {
        setEmail(response.data.email);
        setFirstName(response.data.first_name);
        setLastName(response.data.last_name);
        setProfileImage(response.data.profile_image);
      } else {
        showToastMessage(response.message, 'error');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      showToastMessage('Gagal memuat profil', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEditProfile = async () => {
    if (!isEditing) {
      // Enable editing mode
      setIsEditing(true);
      return;
    }

    // Save changes
    if (!firstName.trim() || !lastName.trim()) {
      showToastMessage('Nama depan dan nama belakang harus diisi', 'error');
      return;
    }

    setLoading(true);
    try {
      const response = await profileService.updateProfile({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
      });

      if (response.status === 0) {
        setFirstName(response.data.first_name);
        setLastName(response.data.last_name);
        setIsEditing(false);
        showToastMessage('Profil berhasil diperbarui', 'success');
      } else {
        showToastMessage(response.message, 'error');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      showToastMessage('Gagal memperbarui profil', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      showToastMessage('Format gambar harus JPEG atau PNG', 'error');
      return;
    }

    // Validate file size (max 100KB)
    const maxSize = 100 * 1024; // 100KB
    if (file.size > maxSize) {
      showToastMessage('Ukuran gambar maksimal 100KB', 'error');
      return;
    }

    setLoading(true);
    try {
      const response = await profileService.updateProfileImage(file);

      if (response.status === 0) {
        setProfileImage(response.data.profile_image);
        showToastMessage('Foto profil berhasil diperbarui', 'success');
      } else {
        showToastMessage(response.message, 'error');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      showToastMessage('Gagal mengupload foto profil', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Clear token
    AuthHelper.logout();

    // Redirect to login
    navigate(AppPaths.login);
  };

  const showToastMessage = (message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);

    // Auto hide after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const closeToast = () => {
    setShowToast(false);
  };

  return {
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
  };
};
