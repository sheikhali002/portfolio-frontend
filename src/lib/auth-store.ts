// Simple demo auth. Swap this module for a real auth provider later.
const KEY = "portfolio:auth";
const CREDENTIALS = { username: "admin", password: "admin123" };

export const authStore = {
  isAuthenticated(): boolean {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(KEY) === "1";
  },
  login(username: string, password: string): boolean {
    if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
      window.localStorage.setItem(KEY, "1");
      return true;
    }
    return false;
  },
  logout() {
    window.localStorage.removeItem(KEY);
  },
};
