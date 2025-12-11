
// Valid credentials with unique target URLs for each user (25 pairs)
let validCredentials = JSON.parse(localStorage.getItem('secureCredentials')) || [
    { id: "admin", password: "admin", target: "admin.html" },
    { id: "admin01", password: "pass1234", target: "https://www.google.com" },
{ id: "user2024", password: "secure!789", target: "https://www.github.com" },
    { id: "john.doe", password: "J0hn@2024", target: "https://www.stackoverflow.com" },
    { id: "alice2024", password: "Alice#567", target: "https://www.facebook.com" },
    { id: "bob_secure", password: "B0b$2024", target: "https://www.twitter.com" },
    { id: "charlie_tech", password: "Ch@rlie99", target: "https://www.linkedin.com" },
    { id: "diana_access", password: "D1ana2024", target: "https://www.youtube.com" },
    { id: "eva_system", password: "Ev@System", target: "https://www.instagram.com" },
    { id: "frank_portal", password: "Fr@nk2024", target: "https://www.reddit.com" },
    { id: "grace_login", password: "Gr@ce567", target: "https://www.netflix.com" },
    { id: "henry_gate", password: "H3nryGate", target: "https://www.amazon.com" },
    { id: "isabel_auth", password: "Is@bel2024", target: "https://www.microsoft.com" },
    { id: "jack_entry", password: "J@ck2024!", target: "https://www.apple.com" },
    { id: "kate_verify", password: "K@te7890", target: "https://www.wikipedia.org" },
    { id: "leo_access", password: "L30Secure", target: "https://www.spotify.com" },
    { id: "mia_online", password: "M1@Online", target: "https://www.dropbox.com" },
    { id: "nathan_web", password: "N@than2024", target: "https://www.slack.com" },
    { id: "olivia_net", password: "0l1v1@Net", target: "https://www.figma.com" },
    { id: "paul_safe", password: "P@ulS4fe", target: "https://www.notion.so" },
    { id: "queen_digital", password: "Qu33n2024", target: "https://www.canva.com" },
    { id: "robert_secure", password: "R0bert@24", target: "https://www.airbnb.com" },
    { id: "sarah_gate", password: "S@r@hGate", target: "https://www.uber.com" },
    { id: "tom_private", password: "T0mPr1v4te", target: "https://www.paypal.com" },
    { id: "uma_vip", password: "Um@VIP2024", target: "https://www.stripe.com" },
    { id: "victor_entry", password: "V1ctor2024", target: "https://www.cloudflare.com" },
    { id: "william_pro", password: "W1ll1@m2024", target: "https://www.digitalocean.com" },
    { id: "xavier_cloud", password: "X@v1er2024", target: "https://www.heroku.com" }
];

// Security features
const MAX_LOGIN_ATTEMPTS = 3;
const LOCKOUT_DURATION = 300000; // 5 minutes in milliseconds

let loginAttempts = 0;
let lastFailedAttempt = 0;
let isLocked = false;
// Save credentials to localStorage
function saveCredentials() {
    localStorage.setItem('secureCredentials', JSON.stringify(validCredentials));
}

// Admin authentication check
function isAdminAuthenticated() {
    return sessionStorage.getItem('adminAuthenticated') === 'true';
}

// Security logging function
function logSecurityEvent(event) {
    console.log(`Security: ${event} at ${new Date().toISOString()}`);
}

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return; // Skip if not on login page

    const errorMessage = document.getElementById('errorMessage');
    const submitButton = loginForm.querySelector('button[type="submit"]');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    function checkSecurityLock() {
const now = Date.now();
        if (isLocked && now - lastFailedAttempt < LOCKOUT_DURATION) {
            const remainingTime = Math.ceil((LOCKOUT_DURATION - (now - lastFailedAttempt)) / 1000);
            errorMessage.textContent = `Trop de tentatives échouées. Veuillez réessayer dans ${remainingTime} secondes.`;
            errorMessage.classList.remove('hidden', 'bg-red-50');
            errorMessage.classList.add('bg-yellow-50', 'border-yellow-200', 'text-yellow-700');
            submitButton.disabled = true;
            submitButton.textContent = 'Accès Temporairement Bloqué';
            return true;
        } else if (isLocked) {
            // Reset lock after timeout
            isLocked = false;
            loginAttempts = 0;
            submitButton.disabled = false;
            submitButton.textContent = 'Accéder';
        }
        return false;
    }

    function updateSecurityBadge(user) {
        const header = document.querySelector('secure-header');
        if (header && header.shadowRoot) {
            const badge = header.shadowRoot.querySelector('.security-badge');
            if (badge) {
                badge.innerHTML = `\
                    <i data-feather="user-check" width="12" height="12"></i>
                    Connecté en tant que: ${user}
                `;
                feather.replace();
            }
        }
    }

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Check security lock first
        if (checkSecurityLock()) {
            return;
        }

        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        
        // Validate credentials
        const userCred = validCredentials.find(cred => 
            cred.id === username && cred.password === password
        );
        
        // Check for admin access
        if (username === 'admin' && password === 'admin') {
            sessionStorage.setItem('adminAuthenticated', 'true');
            logSecurityEvent(`Admin login for user ${username}`);
            
            // Redirect to admin panel
            submitButton.textContent = 'Connexion Admin ✓';
            submitButton.classList.remove('from-indigo-600', 'to-purple-600', 'hover:from-indigo-700', 'hover:to-purple-700');
            submitButton.classList.add('from-amber-600', 'to-orange-600');
            
            loginForm.style.transform = 'scale(0.95)';
            setTimeout(() => {
                window.location.href = 'admin.html';
            }, 800);
            return;
        }
        
        if (userCred) {
            // Reset attempts on successful login
            loginAttempts = 0;
            isLocked = false;
            
            // Update security badge
            updateSecurityBadge(username);
            
            logSecurityEvent(`Successful login for user ${username}`);
            
            // Add success animation
            submitButton.textContent = 'Connexion Réussie ✓';
            submitButton.classList.remove('from-indigo-600', 'to-purple-600', 'hover:from-indigo-700', 'hover:to-purple-700');
            submitButton.classList.add('from-green-600', 'to-emerald-600');
            
            loginForm.style.transform = 'scale(0.95)';
            setTimeout(() => {
                // Redirect to specific URL for this user
                window.location.href = userCred.target;
            }, 800);
        } else {
            // Failed login attempt
            loginAttempts++;
            lastFailedAttempt = Date.now();
            
            if (loginAttempts >= MAX_LOGIN_ATTEMPTS) {
                isLocked = true;
                checkSecurityLock();
                return;
            }
            
            // Enhanced error message with security info
            const remainingAttempts = MAX_LOGIN_ATTEMPTS - loginAttempts;
            errorMessage.textContent = `Identifiant ou mot de passe incorrect. ${remainingAttempts} tentative(s) restante(s).`;
            errorMessage.classList.remove('hidden', 'bg-yellow-50', 'border-yellow-200', 'text-yellow-700');
            errorMessage.classList.add('bg-red-50', 'border-red-200', 'text-red-600');
            errorMessage.classList.add('fade-in');
            
            // Enhanced shake animation for security
            loginForm.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                loginForm.style.animation = '';
            }, 500);
            
            logSecurityEvent(`Failed login attempt for username: ${username}`);
        }
    });
// Enhanced input monitoring for security
    function monitorInputActivity() {
        let activityStart = Date.now();
        
        ['username', 'password'].forEach(fieldId => {
            const field = document.getElementById(fieldId);
            
            field.addEventListener('input', () => {
                // Clear error when user types
                if (!errorMessage.classList.contains('hidden')) {
                    errorMessage.classList.add('hidden');
                }
                
                // Log activity (simulated)
                if (Date.now() - activityStart > 1000) {
                    console.log(`Security: User input activity detected for field ${fieldId}`);
                }
            });
            
            field.addEventListener('focus', () => {
                activityStart = Date.now();
            });
        });
    }

    // Initialize monitoring
    monitorInputActivity();
});

// Admin panel functionality
document.addEventListener('DOMContentLoaded', function() {
    const userForm = document.getElementById('userForm');
    if (!userForm) return; // Skip if not on admin page

    const editUsername = document.getElementById('editUsername');
    const editPassword = document.getElementById('editPassword');
    const editTarget = document.getElementById('editTarget');
    const adminAlert = document.getElementById('adminAlert');
    const usersList = document.getElementById('usersList');
    const userCount = document.getElementById('userCount');
    const resetForm = document.getElementById('resetForm');

    // Load and display users
    function loadUsers() {
        usersList.innerHTML = '';
        validCredentials.forEach((cred, index) => {
            const userElement = document.createElement('div');
            userElement.className = 'bg-gray-50 rounded-lg p-4 border border-gray-200';
            userElement.innerHTML = `\
                <div class="flex justify-between items-start">
                    <div class="flex-1">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="font-medium text-gray-800">${cred.id}</span>
                </div>
                <div class="text-sm text-gray-600 mb-2">
                                <div class="truncate"><strong>URL:</strong> ${cred.target}</div>
                <div class="flex gap-2">
                    <button 
                        type="button"
                        onclick="editUser(${index})"
                        class="px-3 py-1 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-700 transition-colors">
                                    Modifier
                                </button>
                                <button 
                                    type="button"
                                    onclick="deleteUser(${index})"
                        class="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors">
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            usersList.appendChild(userElement);
        });
        
        // Update user count
        userCount.textContent = `${validCredentials.length}/25`;
        
        // Enable/disable form based on limit
        if (validCredentials.length >= 25) {
            userForm.querySelector('button[type="submit"]').disabled = true;
            userForm.querySelector('button[type="submit"]').textContent = 'Limite Atteinte';
        } else {
            userForm.querySelector('button[type="submit"]').disabled = false;
            userForm.querySelector('button[type="submit"]').textContent = 'Ajouter/Modifier';
        }
    }

    // Edit user function
    window.editUser = function(index) {
        const cred = validCredentials[index];
        editUsername.value = cred.id;
        editPassword.value = cred.password;
        editTarget.value = cred.target;
    }

    // Delete user function
    window.deleteUser = function(index) {
        if (validCredentials[index].id === 'admin') {
            showAlert('Impossible de supprimer le compte administrateur', 'error');
            return;
        }
        
        validCredentials.splice(index, 1);
        saveCredentials();
        loadUsers();
        showAlert('Utilisateur supprimé avec succès', 'success');
        
        logSecurityEvent('User deleted from admin panel');
    }

    // Show alert function
    function showAlert(message, type) {
        adminAlert.textContent = message;
        adminAlert.className = '';
        adminAlert.classList.add('mb-4', 'p-4', 'rounded-lg');
        
        if (type === 'success') {
            adminAlert.classList.add('bg-green-50', 'border', 'border-green-200', 'text-green-600');
        } else {
            adminAlert.classList.add('bg-red-50', 'border', 'border-red-200', 'text-red-600');
        }
        
        adminAlert.classList.remove('hidden');
        setTimeout(() => {
            adminAlert.classList.add('hidden');
        }, 5000);
    }

    // Form submission handler
    userForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = editUsername.value.trim();
        const password = editPassword.value;
        const target = editTarget.value;
        
        // Validate inputs
        if (!username || !password || !target) {
            showAlert('Veuillez remplir tous les champs', 'error');
            return;
        }
        
        // Check if URL is valid
        try {
            new URL(target);
        } catch {
            showAlert('Veuillez entrer une URL valide', 'error');
            return;
        }
        
        // Check for existing user
        const existingIndex = validCredentials.findIndex(cred => cred.id === username);
        
        if (existingIndex !== -1) {
            // Update existing user
            validCredentials[existingIndex] = { id: username, password: password, target: target };
        } else {
            // Add new user
            validCredentials.push({ id: username, password: password, target: target };
        }
        
        saveCredentials();
        loadUsers();
        
        if (existingIndex !== -1) {
            showAlert('Utilisateur modifié avec succès', 'success');
        } else {
            showAlert('Utilisateur ajouté avec succès', 'success');
        }
        
        // Reset form
        userForm.reset();
        
        logSecurityEvent(`User ${username} ${existingIndex !== -1 ? 'modified' : 'added'} by admin');
    });

    // Reset form handler
    resetForm.addEventListener('click', function() {
        userForm.reset();
        showAlert('Formulaire réinitialisé', 'info');
    }

    // Initialize admin panel
    loadUsers();
});

// Admin panel functionality
document.addEventListener('DOMContentLoaded', function() {
    const userForm = document.getElementById('userForm');
    if (!userForm) return; // Skip if not on admin page

    const editUsername = document.getElementById('editUsername');
    const editPassword = document.getElementById('editPassword');
    const editTarget = document.getElementById('editTarget');
    const adminAlert = document.getElementById('adminAlert');
    const usersList = document.getElementById('usersList');
    const userCount = document.getElementById('userCount');
    const resetForm = document.getElementById('resetForm');

    // Load and display users
    function loadUsers() {
        usersList.innerHTML = '';
        validCredentials.forEach((cred, index) => {
            const userElement = document.createElement('div');
            userElement.className = 'bg-gray-50 rounded-lg p-4 border border-gray-200';
            userElement.innerHTML = `\
                <div class="flex justify-between items-start">
                    <div class="flex-1">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="font-medium text-gray-800">${cred.id}</span>
                </div>
                <div class="text-sm text-gray-600 mb-2">
                                <div class="truncate"><strong>URL:</strong> ${cred.target}</div>
                <div class="flex gap-2">
                    <button 
                        type="button"
                        onclick="editUser(${index})"
                        class="px-3 py-1 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-700 transition-colors">
                                    Modifier
                                </button>
                                <button 
                                    type="button"
                                    onclick="deleteUser(${index})"
                        class="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors">
                                    Supprimer
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            usersList.appendChild(userElement);
        });
        
        // Update user count
        userCount.textContent = `${validCredentials.length}/25`;
        
        // Enable/disable form based on limit
        if (validCredentials.length >= 25) {
            userForm.querySelector('button[type="submit"]').disabled = true;
            userForm.querySelector('button[type="submit"]').textContent = 'Limite Atteinte';
        } else {
            userForm.querySelector('button[type="submit"]').disabled = false;
            userForm.querySelector('button[type="submit"]').textContent = 'Ajouter/Modifier';
        }
    }

    // Edit user function
    window.editUser = function(index) {
        const cred = validCredentials[index];
        editUsername.value = cred.id;
        editPassword.value = cred.password;
        editTarget.value = cred.target;
    }

    // Delete user function
    window.deleteUser = function(index) {
        if (validCredentials[index].id === 'admin') {
            showAlert('Impossible de supprimer le compte administrateur', 'error');
            return;
        }
        
        validCredentials.splice(index, 1);
        saveCredentials();
        loadUsers();
        showAlert('Utilisateur supprimé avec succès', 'success');
        
        logSecurityEvent('User deleted from admin panel');
    }

    // Show alert function
    function showAlert(message, type) {
        adminAlert.textContent = message;
        adminAlert.className = '';
        adminAlert.classList.add('mb-4', 'p-4', 'rounded-lg');
        
        if (type === 'success') {
            adminAlert.classList.add('bg-green-50', 'border', 'border-green-200', 'text-green-600');
        } else {
            adminAlert.classList.add('bg-red-50', 'border', 'border-red-200', 'text-red-600');
        }
        
        adminAlert.classList.remove('hidden');
        setTimeout(() => {
            adminAlert.classList.add('hidden');
        }, 5000);
    }

    // Form submission handler
    userForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = editUsername.value.trim();
        const password = editPassword.value;
        const target = editTarget.value;
        
        // Validate inputs
        if (!username || !password || !target) {
            showAlert('Veuillez remplir tous les champs', 'error');
            return;
        }
        
        // Check if URL is valid
        try {
            new URL(target);
        } catch {
            showAlert('Veuillez entrer une URL valide', 'error');
            return;
        }
        
        // Check for existing user
        const existingIndex = validCredentials.findIndex(cred => cred.id === username);
        
        if (existingIndex !== -1) {
            // Update existing user
            validCredentials[existingIndex] = { id: username, password: password, target: target };
        } else {
            // Add new user
            validCredentials.push({ id: username, password: password, target: target };
        }
        
        saveCredentials();
        loadUsers();
        
        if (existingIndex !== -1) {
            showAlert('Utilisateur modifié avec succès', 'success');
        } else {
            showAlert('Utilisateur ajouté avec succès', 'success');
        }
        
        // Reset form
        userForm.reset();
        
        logSecurityEvent(`User ${username} ${existingIndex !== -1 ? 'modified' : 'added'} by admin');
    });

    // Reset form handler
    resetForm.addEventListener('click', function() {
        userForm.reset();
        showAlert('Formulaire réinitialisé', 'info');
    }

    // Initialize admin panel
    loadUsers();
});

// Enhanced security animations and styles
const securityStyles = document.createElement('style');
securityStyles.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
    }
    
    @keyframes glow {
        0%, 100% { box-shadow: 0 0 5px rgba(79, 70, 229, 0.3); }
        50% { box-shadow: 0 0 20px rgba(79, 70, 229, 0.6); }
    }
    
    .security-pulse {
        animation: pulse 2s infinite;
    }
    
    .security-glow {
        animation: glow 1.5s ease-in-out infinite;
    }
`;
document.head.appendChild(securityStyles);

// Session security monitoring
window.addEventListener('beforeunload', function(e) {
    // Clear any sensitive data from memory
    loginAttempts = 0;
    lastFailedAttempt = 0;
});
