import { MOCK_AUTH_STORAGE_KEY } from "../../common/Constant";

/** Demo-only: mark user as logged in for mock flows. */
export const setMockAuthenticated = (value = true) => {
  try {
    localStorage.setItem(MOCK_AUTH_STORAGE_KEY, value ? '1' : '0');
  } catch {
    /* ignore */
  }
};

export const clearMockAuthenticated = () => {
  try {
    localStorage.removeItem(MOCK_AUTH_STORAGE_KEY);
  } catch {
    /* ignore */
  }
};

export const isMockAuthenticated = (): boolean => {
  try {
    return localStorage.getItem(MOCK_AUTH_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
};
