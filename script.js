document.addEventListener('DOMContentLoaded', () => {
    // Get HTML elements
    const loginBtn = document.getElementById('login-btn');
    const signinBtn = document.getElementById('signin-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const userDisplay = document.getElementById('user-display');
    const userNameDisplay = document.getElementById('user-name-display');

    const loginForm = document.getElementById('login-form');
    const signinForm = document.getElementById('signin-form');

    const loginSubmit = document.getElementById('login-submit');
    const signinSubmit = document.getElementById('signin-submit');

    const loginMessage = document.getElementById('login-message');
    const signinMessage = document.getElementById('signin-message');

    const loginEmailInput = document.getElementById('login-email');
    const loginPasswordInput = document.getElementById('login-password');
    const signinNameInput = document.getElementById('signin-name');
    const signinEmailInput = document.getElementById('signin-email');
    const signinPasswordInput = document.getElementById('signin-password');

    const API_BASE_URL = '/api'; // **Replace with your actual API base URL**

    // Function to check login status
    function checkLoginStatus() {
        const user = localStorage.getItem('user');
        if (user) {
            const userObj = JSON.parse(user);
            showLoggedInUI(userObj.name || userObj.email); // Display name if available
        } else {
            showLoggedOutUI();
        }
    }

    // Function to show logged-in UI
    function showLoggedInUI(username) {
        loginForm.style.display = 'none';
        signinForm.style.display = 'none';
        loginBtn.style.display = 'none';
        signinBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
        userDisplay.style.display = 'block';
        userNameDisplay.textContent = username;
    }

    // Function to show logged-out UI
    function showLoggedOutUI() {
        loginForm.style.display = 'none';
        signinForm.style.display = 'none';
        loginBtn.style.display = 'inline-block';
        signinBtn.style.display = 'inline-block';
        logoutBtn.style.display = 'none';
        userDisplay.style.display = 'none';
        localStorage.removeItem('user'); // Clear user data
    }

    // Event listeners to show/hide forms
    loginBtn.addEventListener('click', () => {
        loginForm.style.display = 'flex';
        signinForm.style.display = 'none';
        loginMessage.textContent = '';
    });

    signinBtn.addEventListener('click', () => {
        signinForm.style.display = 'flex';
        loginForm.style.display = 'none';
        signinMessage.textContent = '';
    });

    // Logout functionality
    logoutBtn.addEventListener('click', () => {
        //  Replace with your actual API call:
        // fetch(`${API_BASE_URL}/logout`, { method: 'POST' })
        //      .then(response => {
        //          if (response.ok) {
        //              localStorage.removeItem('user');
        //              showLoggedOutUI();
        //          } else {
        //              console.error('Logout failed');
        //          }
        //      })
        //      .catch(error => console.error('Error during logout:', error));

        localStorage.removeItem('user');
        showLoggedOutUI();
    });

    // Login form submission
    loginSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        const email = loginEmailInput.value.trim();
        const password = loginPasswordInput.value.trim();

        if (!email || !password) {
            loginMessage.textContent = 'Please enter both email and password.';
            loginMessage.className = 'message error';
            return;
        }

        // Simulate API call
        fetch(`${API_BASE_URL}/login`, {  // **Replace with your API endpoint**
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success && data.user) {
                //  Important:  In a real app, you'd get more user data.
                localStorage.setItem('user', JSON.stringify(data.user));
                loginMessage.textContent = 'Login successful!';
                loginMessage.className = 'message success';
                checkLoginStatus();
            } else {
                loginMessage.textContent = data.error || 'Login failed. Invalid credentials.';
                loginMessage.className = 'message error';
            }
        })
        .catch(error => {
            console.error('Error during login:', error);
            loginMessage.textContent = 'An error occurred during login.';
            loginMessage.className = 'message error';
        });

        loginEmailInput.value = '';
        loginPasswordInput.value = '';
    });

    // Sign-in form submission
    signinSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        const name = signinNameInput.value.trim();
        const email = signinEmailInput.value.trim();
        const password = signinPasswordInput.value.trim();

        if (!name || !email || !password) {
            signinMessage.textContent = 'Please fill in all fields.';
            signinMessage.className = 'message error';
            return;
        }

        // Simulate API call
        fetch(`${API_BASE_URL}/register`, {  // **Replace with your API endpoint**
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success && data.user) {
                signinMessage.textContent = 'Sign in successful! You can now log in.';
                signinMessage.className = 'message success';
                signinForm.style.display = 'none';
                loginForm.style.display = 'flex';
            } else {
                signinMessage.textContent = data.error || 'Sign in failed.';
                signinMessage.className = 'message error';
            }
        })
        .catch(error => {
            console.error('Error during sign in:', error);
            signinMessage.textContent = 'An error occurred during sign in.';
            signinMessage.className = 'message error';
        });

        signinNameInput.value = '';
        signinEmailInput.value = '';
        signinPasswordInput.value = '';
    });

    // Initialize
    checkLoginStatus();
});
