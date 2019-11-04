class AuthService {
    constructor() {
      this.authenticated = false;
    }
    login(cb) {
      this.authenticated = true;
      localStorage.setItem('isLogged',true);
      cb();
    }
    logout(cb) {
      this.authenticated = false;
      localStorage.removeItem('isLogged');
      cb();
    }
    isAuthenticated() {
      return !!localStorage.getItem('isLogged');
    }
   }
export default new AuthService();