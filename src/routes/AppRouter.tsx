import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AppPaths } from '../core/common/AppPaths';
import { ProtectedRoute } from './ProtectedRoute';
import {
  LoginScreen,
  RegisterScreen,
  DashboardScreen,
  TopupScreen,
  PembelianScreen,
  TransactionScreen,
  AccountScreen,
  NotFoundScreen,
  ServerErrorScreen,
  ForbiddenScreen,
} from './lazyScreens';

export function AppRouter() {
  return (
    <Suspense fallback={null}>
      <Routes>
        {/* Public Routes */}
        <Route path={AppPaths.home} element={<Navigate to={AppPaths.login} replace />} />
        <Route path={AppPaths.login} element={<LoginScreen />} />
        <Route path={AppPaths.register} element={<RegisterScreen />} />
        <Route path="/register" element={<RegisterScreen />} />

        {/* Error Pages - Public */}
        <Route path={AppPaths.notFound} element={<NotFoundScreen />} />
        <Route path={AppPaths.serverError} element={<ServerErrorScreen />} />
        <Route path={AppPaths.forbidden} element={<ForbiddenScreen />} />

        {/* Protected Routes - Require Token */}
        <Route
          path={AppPaths.dashboard}
          element={
            <ProtectedRoute>
              <DashboardScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path={AppPaths.topup}
          element={
            <ProtectedRoute>
              <TopupScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path={AppPaths.pembelian}
          element={
            <ProtectedRoute>
              <PembelianScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path={AppPaths.transaction}
          element={
            <ProtectedRoute>
              <TransactionScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path={AppPaths.account}
          element={
            <ProtectedRoute>
              <AccountScreen />
            </ProtectedRoute>
          }
        />

        {/* Catch all - 404 */}
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </Suspense>
  );
}
