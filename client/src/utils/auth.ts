import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // TODO:done return the decoded token
    return jwtDecode(this.getToken());
  }

  loggedIn() {
    // TODO:done return a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string) {
    try {
      const decoded: JwtPayload = jwtDecode(token);
      if (decoded.exp && decoded.exp < Date.now() / 1000) {
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }

  getToken(): string {
    // TODO:done return the token
    return localStorage.getItem('id_token') || '';
  }

  login(idToken: string) {
    // TODO:done set the token to localStorage
    localStorage.setItem('id_token', idToken)
    // TODO:done redirect to the home page
    window.location.assign('/');
    // localhost:3001/about
    // localhost:3001/
  }

  logout() {
    // TODO:done remove the token from localStorage
    localStorage.removeItem('id_token');
    // TODO:done redirect to the login page
    window.location.assign('/login');
  }
}

export default new AuthService();
