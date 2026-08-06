// import {Toast}  from '../../public/js/utils/toast.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');

    if (!loginForm) return;

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log("Login file");

        const email = document.getElementById('email').value.trim() || 'false@email';
        const password = document.getElementById('password').value.trim() || 'falsepassword';

        if (!email || !password) {
            Toast.error('Please enter both email and password.', 'error');
            return;
        }

        try {
            // UI Loading State
            submitBtn.disabled = true;
            btnText.textContent = 'Signing in...';

            console.log( "Before api" );
            // Communicate with backend via your API helper
            const response = await API.post('/auth/login', { email, password });
            console.log("Login.js res" , response)

            // Extract token safely based on standard JWT response structures
            const token = response.data?.accessToken || response.accessToken;

            if (!token) {
                throw new Error('Authentication token missing from server response.');
            }

            // Save token securely using your Storage utility
            console.log("Before" , response.data?.accessToken)
            storage.setToken(token);
            console.log("After")

            Toast.success('Login successful! Redirecting...', 'success');

            // Redirect smoothly to dashboard
            setTimeout(() => {
                window.location.href = '/admin/dashboard.html';
            }, 800);

        } catch (err) {
            // Catch error thrown by your API helper and extract message
            const errorMsg = err.message || err.error || 'Invalid credentials. Please try again.';
            Toast.error(errorMsg, 'error');

            // Reset UI state
            submitBtn.disabled = false;
            btnText.textContent = 'Sign In';
        }
    });
});4