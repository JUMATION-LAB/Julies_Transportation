import { showToast } from '../../js/utils/toast.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');

    if (!loginForm) return;

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!email || !password) {
            showToast('Please enter both email and password.', 'error');
            return;
        }

        try {
            // UI Loading State
            submitBtn.disabled = true;
            btnText.textContent = 'Signing in...';

            // Communicate with backend via your API helper
            const response = await API.post('/auth/login', { email, password });

            // Extract token safely based on standard JWT response structures
            const token = response.data?.token || response.token;

            if (!token) {
                throw new Error('Authentication token missing from server response.');
            }

            // Save token securely using your Storage utility
            Storage.setToken(token);

            showToast('Login successful! Redirecting...', 'success');

            // Redirect smoothly to dashboard
            setTimeout(() => {
                window.location.href = '/admin/dashboard.html';
            }, 800);

        } catch (err) {
            // Catch error thrown by your API helper and extract message
            const errorMsg = err.message || err.error || 'Invalid credentials. Please try again.';
            showToast(errorMsg, 'error');

            // Reset UI state
            submitBtn.disabled = false;
            btnText.textContent = 'Sign In';
        }
    });
});4