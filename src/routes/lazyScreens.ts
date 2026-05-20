import { lazy } from 'react';

export const RegisterScreen = lazy(() =>
  import('../presentation/features/auth/register/Screen/RegisterScreen').then((m) => ({ default: m.RegisterScreen })),
);

export const LoginScreen = lazy(() =>
  import('../presentation/features/auth/login/Screen/LoginScreen').then((m) => ({ default: m.LoginScreen })),
);

export const DashboardScreen = lazy(() =>
  import('../presentation/features/dashboard/home/Screen/DashboardScreen').then((m) => ({ default: m.DashboardScreen })),
);

export const TopupScreen = lazy(() =>
  import('../presentation/features/dashboard/topup/Screen/TopupScreen').then((m) => ({ default: m.TopupScreen })),
);

export const PembelianScreen = lazy(() =>
  import('../presentation/features/dashboard/pembelian/Screen/PembelianScreen').then((m) => ({ default: m.PembelianScreen })),
);

export const TransactionScreen = lazy(() =>
  import('../presentation/features/dashboard/transaction-history/Screen/TransactionScreen').then((m) => ({ default: m.TransactionScreen })),
);

export const AccountScreen = lazy(() =>
  import('../presentation/features/dashboard/account/Screen/AccountScreen').then((m) => ({ default: m.AccountScreen })),
);

export const NotFoundScreen = lazy(() =>
  import('../presentation/features/error/NotFoundScreen').then((m) => ({ default: m.NotFoundScreen })),
);

export const ServerErrorScreen = lazy(() =>
  import('../presentation/features/error/ServerErrorScreen').then((m) => ({ default: m.ServerErrorScreen })),
);

export const ForbiddenScreen = lazy(() =>
  import('../presentation/features/error/ForbiddenScreen').then((m) => ({ default: m.ForbiddenScreen })),
);
