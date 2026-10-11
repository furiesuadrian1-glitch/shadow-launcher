// A te saját Firebase konfigurációd (beágyazva)
const firebaseConfig = {
    apiKey: "AIzaSyDF1qK_jPpTp7UHuZhGANkeXcr7R0-Mwpo",
    authDomain: "shadow-launcher-400c4.firebaseapp.com",
    projectId: "shadow-launcher-400c4",
    storageBucket: "shadow-launcher-400c4.firebasestorage.app",
    messagingSenderId: "964738313775",
    appId: "1:964738313775:web:fea9eef4afa391a3c9a0da",
    measurementId: "G-JWBF8J3W48"
};

// Firebase inicializálása
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

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

// Valós Firebase regisztráció és bejelentkezés kezelése
function handleAuth(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (currentMode === 'register') {
        // Regisztráció a Firebase-ben
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                alert(`Sikeres regisztráció! Üdvözöllek, ${email}`);
                closeModal();
            })
            .catch((error) => {
                alert(`Hiba a regisztráció során: ${error.message}`);
            });
    } else {
        // Bejelentkezés a Firebase-ben
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                alert(`Sikeres bejelentkezés! Üdv újra, ${email}`);
                closeModal();
            })
            .catch((error) => {
                alert(`Hiba a bejelentkezés során: ${error.message}`);
            });
    }
}

// Figyeljük a felhasználó státuszát
auth.onAuthStateChanged((user) => {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const userBadge = document.getElementById('userProfileBadge');
    const badgeUsername = document.getElementById('badgeUsername');

    if (user) {
        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';
        badgeUsername.innerText = `🎮 ${user.email.split('@')[0]}`;
        userBadge.classList.remove('hidden');
    } else {
        loginBtn.style.display = 'inline-block';
        registerBtn.style.display = 'inline-block';
        userBadge.classList.add('hidden');
        document.getElementById('profileDropdown').style.display = 'none';
    }
});

function toggleProfileMenu() {
    const menu = document.getElementById('profileDropdown');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

function logout() {
    auth.signOut().then(() => {
        alert('Sikeres kijelentkezés!');
    });
}