import React from 'react';
import { X, Check } from 'lucide-react';
import './Modal.css';

/**
 * Modal Pembayaran Topup - Komponen dinamis dengan semua props opsional
 *
 * @param {boolean} isOpen - Status modal terbuka/tertutup
 * @param {function} onClose - Callback untuk menutup modal
 * @param {string} logo - Path logo (default: /public/assets/Logo.png)
 * @param {string} title - Judul modal
 * @param {string} subtitle - Subjudul modal
 * @param {string|number} amount - Nominal harga
 * @param {string} description - Deskripsi tambahan
 * @param {function} onAction - Callback untuk tombol action utama
 * @param {string} actionLabel - Label tombol action utama
 * @param {function} onSubAction - Callback untuk tombol sub action
 * @param {string} subActionLabel - Label tombol sub action
 * @param {boolean} showSuccessIcon - Tampilkan icon success (default: false)
 * @param {boolean} showErrorIcon - Tampilkan icon error (default: false)
 * @param {string} variant - Variant modal: 'success' | 'default' (default: 'default')
 * @param {boolean} useTextLinks - Use text links instead of buttons for actions (default: false)
 */
const Modal = ({
  isOpen = false,
  onClose,
  logo = '/assets/Logo.png',
  title,
  subtitle,
  amount,
  description,
  onAction,
  actionLabel,
  onSubAction,
  subActionLabel,
  showSuccessIcon = false,
  showErrorIcon = false,
  variant = 'default',
  useTextLinks = false,
  children
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className={`modal-container modal-${variant}`}>
        {/* Close Button */}
        {onClose && (
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        )}

        {/* Logo */}
        {logo && !showSuccessIcon && !showErrorIcon && (
          <div className="modal-logo">
            <img src={logo} alt="Logo" />
          </div>
        )}

        {/* Success Icon */}
        {showSuccessIcon && (
          <div className="modal-success-icon">
            <Check size={32} />
          </div>
        )}

        {/* Error Icon */}
        {showErrorIcon && (
          <div className="modal-error-icon">
            <X size={32} />
          </div>
        )}

        {/* Title */}
        {title && <h2 className="modal-title">{title}</h2>}

        {/* Subtitle */}
        {subtitle && <p className="modal-subtitle">{subtitle}</p>}

        {/* Amount */}
        {amount && (
          <div className="modal-amount">
            <span className="modal-amount-value">
              {typeof amount === 'number'
                ? `Rp${amount.toLocaleString('id-ID')}`
                : amount}
            </span>
          </div>
        )}

        {/* Description */}
        {description && <p className="modal-description">{description}</p>}

        {/* Custom Children Content */}
        {children && <div className="modal-content">{children}</div>}

        {/* Actions */}
        <div className="modal-actions">
          {/* Main Action - Primary */}
          {onAction && actionLabel && (
            <button
              className={useTextLinks ? "modal-text-link modal-text-link-primary" : "modal-btn modal-btn-primary"}
              onClick={onAction}
            >
              {actionLabel}
            </button>
          )}

          {/* Sub Action - Secondary */}
          {onSubAction && subActionLabel && (
            <button
              className={useTextLinks ? "modal-text-link modal-text-link-secondary" : "modal-btn modal-btn-secondary"}
              onClick={onSubAction}
            >
              {subActionLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
