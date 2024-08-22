import Authentication from './utilityClasses/Authentication.js';

const auth = new Authentication();

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const userRole = auth.login(username, password);
    if (userRole) {
        if (userRole === 'company') {
            window.location.href = 'company.html';
        } else {
            window.location.href = 'customer.html';
        }
    } else {
        alert('Invalid credentials!');
    }
});
