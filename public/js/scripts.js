function validateContactForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    if (name.length < 2) {
        alert('Name must be at least 2 characters long.');
        return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    if (message.length < 10) {
        alert('Message must be at least 10 characters long.');
        return false;
    }

    if (phone && !/^\d{10}$/.test(phone)) {
        alert('Phone number must be 10 digits.');
        return false;
    }
    if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
        return false;
    }

    return true;
}
function validateFeedbackForm() {
    const feedback = document.getElementById('feedback').value;

    if (feedback.length < 5) {
        alert('Feedback must be at least 5 characters long.');
        return false;
    }

    return true;
}

function updatePasswordStrength() {
    const password = document.getElementById('password').value;
    const strengthMeter = document.getElementById('password-strength');

    let strength = 'password-weak';
    if (password.length >= 8) {
        strength = 'password-medium';
        if (/[A-Z]/.test(password) && /\d/.test(password)) {
            strength = 'password-strong';
        }
    }
    strengthMeter.className = strength;
}

document.getElementById('password').addEventListener('input', updatePasswordStrength);


function handleNavigation(event, page) {
    event.preventDefault();
    const content = document.getElementById('main-content');
    
    fetch(`/pages/${page}.html`)
        .then(response => response.text())
        .then(data => {
            content.innerHTML = data;
            window.history.pushState({ page }, '', `/${page}`);
        });
}


window.addEventListener('popstate', (event) => {
    if (event.state) {
        handleNavigation(new Event('popstate'), event.state.page);
    }
});
