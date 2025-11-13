// API Base URL
const API_URL = '/api';

// Show/hide sections
function showSection(sectionId) {
    // Hide all auth sections
    document.querySelectorAll('.auth-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Show requested section
    const section = document.getElementById(sectionId);
    if (section) {
        section.style.display = 'block';
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Show message to user
function showMessage(message, type = 'info') {
    alert(message);
}

// Handle registration form
document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const phone = document.getElementById('reg-phone').value;
    
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password, phone, isBroker: false })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showMessage('Registration successful! Please log in.', 'success');
            localStorage.setItem('token', data.token);
            showSection('login');
            e.target.reset();
        } else {
            showMessage(data.message || 'Registration failed', 'error');
        }
    } catch (error) {
        console.error('Registration error:', error);
        showMessage('An error occurred during registration. Please ensure the server is running.', 'error');
    }
});

// Handle login form
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showMessage('Login successful!', 'success');
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // In a real app, redirect to dashboard
            showMessage(`Welcome back, ${data.user.name}! This is a demo - check the API endpoints for full functionality.`, 'success');
            e.target.reset();
        } else {
            showMessage(data.message || 'Login failed', 'error');
        }
    } catch (error) {
        console.error('Login error:', error);
        showMessage('An error occurred during login. Please ensure the server is running.', 'error');
    }
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target && !this.getAttribute('onclick')) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Check if user is logged in on page load
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
        console.log('User logged in:', JSON.parse(user));
    }
});
