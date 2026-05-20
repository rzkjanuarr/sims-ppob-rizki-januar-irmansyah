/**
 * Authentication Helper Functions
 */

export class AuthHelper {
  private static TOKEN_KEY = 'token';

  /**
   * Check if user is authenticated (has valid token)
   */
  static isAuthenticated(): boolean {
    const token = localStorage.getItem(this.TOKEN_KEY);
    return !!token;
  }

  /**
   * Get current token
   */
  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Save token to localStorage
   */
  static setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  /**
   * Remove token from localStorage (logout)
   */
  static removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  /**
   * Logout user - clear token and redirect to login
   */
  static logout(): void {
    this.removeToken();
    // Redirect will be handled by the component calling this
  }
}
