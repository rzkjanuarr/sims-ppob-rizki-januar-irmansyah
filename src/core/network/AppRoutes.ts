/** REST API path segments (base URL + prefix di-setup di HttpClient). */
export const AppRoutes = {
  // Auth endpoints
  REGISTRATION: '/registration',
  LOGIN: '/login',

  // Profile endpoints
  PROFILE: '/profile',
  PROFILE_UPDATE: '/profile/update',
  PROFILE_IMAGE: '/profile/image',

  // Public endpoints
  BANNER: '/banner',

  // Service endpoints (Private)
  SERVICES: '/services',

  // Balance & Transaction endpoints (Private)
  BALANCE: '/balance',
  TOPUP: '/topup',
  TRANSACTION: '/transaction',
  TRANSACTION_HISTORY: '/transaction/history',
} as const;
