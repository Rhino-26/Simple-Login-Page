document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    // Toggle Password Visibility
    togglePasswordBtn.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Update eye icon
        const icon = togglePasswordBtn.querySelector('i');
        if (type === 'text') {
            icon.setAttribute('data-lucide', 'eye-off');
        } else {
            icon.setAttribute('data-lucide', 'eye');
        }
        lucide.createIcons();
    });

    // Simple Email Validation
    const isValidEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    // Validation Logic
    const validateForm = () => {
        let isValid = true;

        // Email Validation
        if (!emailInput.value.trim()) {
            emailError.textContent = 'Email is required';
            emailInput.style.outline = '1px solid var(--error-red)';
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address';
            emailInput.style.outline = '1px solid var(--error-red)';
            isValid = false;
        } else {
            emailError.textContent = '';
            emailInput.style.outline = 'none';
        }

        // Password Validation
        if (!passwordInput.value) {
            passwordError.textContent = 'Password is required';
            passwordInput.style.outline = '1px solid var(--error-red)';
            isValid = false;
        } else if (passwordInput.value.length < 8) {
            passwordError.textContent = 'Password must be at least 8 characters';
            passwordInput.style.outline = '1px solid var(--error-red)';
            isValid = false;
        } else {
            passwordError.textContent = '';
            passwordInput.style.outline = 'none';
        }

        return isValid;
    };

    // Clear errors on input
    [emailInput, passwordInput].forEach(input => {
        input.addEventListener('input', () => {
            const errorSpan = document.getElementById(`${input.id}Error`);
            errorSpan.textContent = '';
            input.style.outline = 'none';
        });
    });

    // Form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (validateForm()) {
            const submitBtn = loginForm.querySelector('.submit-btn');
            const originalContent = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Signing In...';

            // Simulate API Call
            setTimeout(() => {
                alert('Sign in successful! Redirecting...');
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalContent;
                // reset or redirect
                // loginForm.reset();
            }, 1500);
        }
    });

    // Accessibility: Enter key for toggle password
    togglePasswordBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            togglePasswordBtn.click();
        }
    });
});
