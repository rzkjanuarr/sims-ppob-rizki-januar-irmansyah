import { Navigate } from 'react-router-dom';
import { AppPaths } from '../core/common/AppPaths';
import { AuthHelper } from '../core/auth/AuthHelper';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // Check if user is authenticated
  const isAuthenticated = AuthHelper.isAuthenticated();

  // If not authenticated, redirect to 403 Forbidden
  if (!isAuthenticated) {
    return <Navigate to={AppPaths.forbidden} replace />;
  }

  // If authenticated, render the protected component
  return <>{children}</>;
};
