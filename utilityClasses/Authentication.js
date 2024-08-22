import users from '../app-data/userData.js';

export default class Authentication {
    constructor() {
        this.users = users;
        this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')) || null;
    }

    login(username, password) {
        const user = this.users.find(u => u.username === username && u.password === password);
        if (user) {
            this.loggedInUser = user;
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            return user.role;
        }
        return null;
    }

    logout() {
        this.loggedInUser = null;
        localStorage.removeItem('loggedInUser');
        window.location.href = 'index.html';  
    }

    isAuthenticated() {
        return this.loggedInUser !== null;
    }
}
