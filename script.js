let currentMode = 'login';

function openModal(mode) {
    currentMode = mode;
    switchTab(mode);
    document.getElementById('authModal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('authModal').classList.add('hidden');
}

function switchTab(mode) {
    currentMode = mode;
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const submitBtn = document.getElementById('submitAuthBtn');

    if (mode === 'login') {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        submitBtn.innerText = 'Log In';
    } else {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        submitBtn.innerText = 'Create Account';
    }
}

function handleAuth(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;

    if (!email) return;

    const displayName = email.split('@')[0];

    document.getElementById('loginBtn').style.display = 'none';
    document.getElementById('registerBtn').style.display = 'none';

    const userBadge = document.getElementById('userProfileBadge');
    document.getElementById('badgeUsername').innerText = `🎮 ${displayName}`;
    userBadge.classList.remove('hidden');

    closeModal();
    if (currentMode === 'register') {
        alert(`Account successfully created for ${email}! Welcome to Shadow Launcher.`);
    } else {
        alert(`Welcome back, ${displayName}!`);
    }
}

function toggleProfileMenu() {
    const menu = document.getElementById('profileDropdown');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

function logout() {
    document.getElementById('loginBtn').style.display = 'inline-block';
    document.getElementById('registerBtn').style.display = 'inline-block';
    document.getElementById('userProfileBadge').classList.add('hidden');
    document.getElementById('profileDropdown').style.display = 'none';
}