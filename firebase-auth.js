// Firebase Authentication & Firestore Script for AEGIS PRO (Compat Mode)

(function() {
  'use strict';

  let isSyncingFromCloud = false;
  // Visual Cloud Sync Status Controller
  function setSyncStatus(status, label = '') {
    const chip = document.getElementById('sync-chip');
    const txt = document.getElementById('sync-status-text');
    if (!chip || !txt) return;
    chip.classList.remove('syncing', 'offline');
    if (status === 'syncing') {
      chip.classList.add('syncing');
      txt.textContent = label || 'Syncing...';
    } else if (status === 'offline') {
      chip.classList.add('offline');
      txt.textContent = label || 'Saved Locally';
    } else {
      txt.textContent = label || 'Cloud Synced';
    }
  }


  // Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyA0-t4fOkrKe7aa43f9U9qjjdH7cD7DvxY",
    authDomain: "aegsipro-4b227.firebaseapp.com",
    projectId: "aegsipro-4b227",
    storageBucket: "aegsipro-4b227.firebasestorage.app",
    messagingSenderId: "930650138048",
    appId: "1:930650138048:web:cf4ed0db4208a8c72d9425",
    measurementId: "G-ZNHDWJMMH1"
  };

  // Initialize Firebase services
  let app, auth, db;
  try {
    app = firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    db = firebase.firestore();

    // Enable offline-first IndexedDB persistence for instantaneous reads & writes
    db.enablePersistence({ synchronizeTabs: true }).catch((err) => {
      if (err.code === 'failed-precondition') {
        console.warn("[Firestore Persistence] Multiple browser tabs open, caching active.");
      } else if (err.code === 'unimplemented') {
        console.warn("[Firestore Persistence] Browser does not support IndexedDB offline cache.");
      }
    });

    if (typeof firebase.analytics === 'function') {
      firebase.analytics();
    }
    console.log("[Firebase Auth] SDK compat services initialized successfully.");
  } catch (e) {
    console.error("[Firebase Auth] Error initializing Firebase SDK:", e);
    return;
  }

  // Helper to show toasts using Aegis Pro's built-in toast utility
  function showToast(msg, type = '') {
    if (typeof window.toast === 'function') {
      window.toast(msg, type);
    } else {
      console.log(`[Firebase Auth Toast] ${type}: ${msg}`);
      const t = document.createElement('div');
      t.className = 'toast ' + type;
      t.textContent = msg;
      document.body.appendChild(t);
      setTimeout(() => t.remove(), 3000);
    }
  }

  // Helper to escape HTML tags for safe dynamic UI injection
  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }

  // Debounced progress saver to prevent spamming Firestore writes
  let saveTimeout = null;
  function saveProgressToCloud(uid, state) {
    if (isSyncingFromCloud) return;
    setSyncStatus('syncing', 'Syncing...');
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
      const payload = {
        done: state.done || {},
        ctfs: state.ctfs || {},
        theme: state.theme,
        sound: state.sound,
        lastActivePage: state.lastActivePage || 'dashboard',
        streak: state.streak || { count: 1, lastDate: new Date().toISOString().slice(0, 10) },
        syncedAt: new Date().toISOString()
      };
      db.collection("users").doc(uid).set(payload, { merge: true })
        .then(() => {
          setSyncStatus('synced', 'Cloud Synced');
          console.log("[Firebase Auth] Real-time state pushed to Firestore.");
        })
        .catch((e) => {
          console.warn("[Firebase Auth] Sync offline/error, operating with local cache:", e);
          setSyncStatus('offline', 'Saved Locally');
        });
    }, 400);
  }

  const isDashboard = !!document.getElementById("app");

  // Helper to dynamically calculate and display operational stats in the Modal
  function updateModalStats(modal) {
    if (typeof getAll === 'function' && typeof getDone === 'function' && typeof PHASES !== 'undefined') {
      const overall = getAll() ? Math.round(getDone() / getAll() * 100) : 0;
      const overallLabel = modal.querySelector('#modal-pct-overall');
      const overallFill = modal.querySelector('#modal-fill-overall');
      if (overallLabel) overallLabel.textContent = overall + '%';
      if (overallFill) overallFill.style.width = overall + '%';
      
      const p1Label = modal.querySelector('#modal-pct-p1');
      const p2Label = modal.querySelector('#modal-pct-p2');
      const p3Label = modal.querySelector('#modal-pct-p3');
      const p4Label = modal.querySelector('#modal-pct-p4');
      
      if (p1Label) p1Label.textContent = (typeof phasePct === 'function' ? phasePct(PHASES[0]) : 0) + '%';
      if (p2Label) p2Label.textContent = (typeof phasePct === 'function' ? phasePct(PHASES[1]) : 0) + '%';
      if (p3Label) p3Label.textContent = (typeof phasePct === 'function' ? phasePct(PHASES[2]) : 0) + '%';
      if (p4Label) p4Label.textContent = (typeof phasePct === 'function' ? phasePct(PHASES[3]) : 0) + '%';
      
      const ctfsLabel = modal.querySelector('#modal-ctfs-solved');
      const ctfsCount = (window.S && window.S.ctfs) ? Object.values(window.S.ctfs).filter(Boolean).length : 0;
      if (ctfsLabel) ctfsLabel.textContent = ctfsCount;
    }
  }

  // Setup Session Guards and Database Sync
  auth.onAuthStateChanged((user) => {
    if (user) {
      console.log(`[Firebase Auth] Session active for: ${user.email}`);

      // Master Admin verification for both anupdhokiya066@gmail.com and anupdhokiya0@gmail.com
      const ADMIN_EMAILS = ['anupdhokiya066@gmail.com', 'anupdhokiya0@gmail.com'];
      const userEmail = (user.email || '').toLowerCase().trim();
      const isMasterAdmin = ADMIN_EMAILS.includes(userEmail);
      window.isAdmin = isMasterAdmin;
      window.AegisAdmin = {
        emails: ADMIN_EMAILS,
        currentEmail: userEmail,
        isAdmin: isMasterAdmin,
        uid: user.uid
      };

      const adminNavBtn = document.getElementById('nav-admin-btn');
      if (adminNavBtn) {
        if (isMasterAdmin) {
          adminNavBtn.style.display = 'flex';
          adminNavBtn.classList.add('admin-authorized');
          const badge = adminNavBtn.querySelector('.ptag-admin');
          if (badge) badge.textContent = 'ADMIN';
        } else {
          adminNavBtn.style.display = 'none'; // Strictly hidden from regular users
        }
      }

      // If on auth pages, redirect to dashboard
      if (!isDashboard) {
        window.location.replace("dashboard.html");
        return;
      }

      let userProfile = {};
      let initialNavDone = false;

      // 1. Real-Time Cloud Synchronization Listener (onSnapshot) with Bidirectional Union Merge
      setSyncStatus('syncing', 'Connecting...');
      const userDocRef = db.collection("users").doc(user.uid);

      userDocRef.onSnapshot((docSnap) => {
        if (!docSnap.exists) {
          console.log("[Firebase Auth] First-time login: initializing user document in Firestore.");
          const initialState = {
            name: user.displayName || "Anonymous Specialist",
            role: "Student / Learner",
            email: user.email,
            done: (window.S && window.S.done) ? window.S.done : {},
            ctfs: (window.S && window.S.ctfs) ? window.S.ctfs : {},
            theme: window.S ? window.S.theme : 'light',
            sound: window.S ? window.S.sound : true,
            lastActivePage: window.S ? window.S.lastActivePage : 'dashboard',
            streak: window.S ? window.S.streak : { count: 1, lastDate: new Date().toISOString().slice(0, 10) },
            syncedAt: new Date().toISOString()
          };
          userDocRef.set(initialState, { merge: true }).then(() => {
            setSyncStatus('synced', 'Cloud Synced');
          });
          return;
        }

        userProfile = docSnap.data();
        window.userProfile = userProfile;
        const opNameEl = document.getElementById('sb-operator-name');
        const opRoleEl = document.getElementById('sb-operator-role');
        if (opNameEl && userProfile.name) opNameEl.textContent = userProfile.name;
        if (opRoleEl && userProfile.role) opRoleEl.textContent = userProfile.role;
        console.log("[Firebase Auth] Live Cloud Snapshot received from Firestore.");

        // BIDIRECTIONAL UNION MERGE:
        // Ensure no offline progress made on this device is ever lost when cloud pushes down!
        const localDone = (window.S && window.S.done) ? window.S.done : {};
        const localCtfs = (window.S && window.S.ctfs) ? window.S.ctfs : {};
        const mergedDone = { ...(userProfile.done || {}), ...localDone };
        const mergedCtfs = { ...(userProfile.ctfs || {}), ...localCtfs };

        // Reconcile Streak
        const cloudStreak = (userProfile.streak && userProfile.streak.count) ? userProfile.streak.count : 1;
        const localStreak = (window.S && window.S.streak && window.S.streak.count) ? window.S.streak.count : 1;
        const finalStreakCount = Math.max(cloudStreak, localStreak);
        const finalStreakDate = userProfile.streak ? userProfile.streak.lastDate : (window.S ? window.S.streak.lastDate : '');

        // Check if local had new progress that cloud didn't have
        const hasNewLocalDone = Object.keys(localDone).some(k => localDone[k] && !(userProfile.done || {})[k]);
        const hasNewLocalCtfs = Object.keys(localCtfs).some(k => localCtfs[k] && !(userProfile.ctfs || {})[k]);

        isSyncingFromCloud = true;
        if (window.S) {
          window.S.done = mergedDone;
          window.S.ctfs = mergedCtfs;
          window.S.streak = { count: finalStreakCount, lastDate: finalStreakDate };
          if (userProfile.theme !== undefined) window.S.theme = userProfile.theme;
          if (userProfile.sound !== undefined) window.S.sound = userProfile.sound;
          window.S.syncedAt = new Date().toISOString();

          // Save and render UI updates live
          if (typeof window.saveS === 'function') window.saveS();
          if (typeof window.applyTheme === 'function') window.applyTheme();
          if (typeof window.applySound === 'function') window.applySound();
          if (typeof window.syncProgress === 'function') window.syncProgress();
          if (typeof window.renderDashboard === 'function') window.renderDashboard();
          if (typeof window.renderStreakUI === 'function') window.renderStreakUI();

          // On login and session sync, always keep view on Mission Control Dashboard
          if (!initialNavDone) {
            initialNavDone = true;
            if (typeof window.nav === 'function') window.nav('dashboard');
          }
        }
        setTimeout(() => { isSyncingFromCloud = false; }, 400);

        // If this device had new offline progress, push the union merge back to cloud
        if (hasNewLocalDone || hasNewLocalCtfs) {
          saveProgressToCloud(user.uid, {
            done: mergedDone,
            ctfs: mergedCtfs,
            streak: { count: finalStreakCount, lastDate: finalStreakDate },
            syncedAt: new Date().toISOString()
          });
        } else {
          setSyncStatus('synced', 'Cloud Synced');
        }
      }, (err) => {
        console.warn("[Firebase Auth] Cloud snapshot listener offline:", err);
        setSyncStatus('offline', 'Saved Locally');
      });

      // 2. Wire up Dashboard Header / Sidebar Actions
      const logoutBtn = document.getElementById("logout-btn");
      if (logoutBtn) {
        const tt = logoutBtn.querySelector('.dock-tooltip');
        if (tt) {
          tt.textContent = 'Sign Out';
        } else {
          logoutBtn.textContent = '🚪 Sign Out';
        }
        logoutBtn.onclick = function(e) {
          e.preventDefault();
          e.stopPropagation();
          if (confirm("Are you sure you want to terminate your session?")) {
            auth.signOut()
              .then(() => {
                showToast("Session terminated.", "ok");
                window.location.replace("index.html");
              })
              .catch(() => {
                showToast("Logout failed.", "err");
              });
          }
        };
      }

      // 3. Wire up Operator Profile Console Action
      const accountBtn = document.getElementById("account-btn");
      if (accountBtn) {
        // Update sidebar button immediately if profile name is loaded
        if (userProfile.name) {
          const opName = document.getElementById('sb-operator-name');
          const opRole = document.getElementById('sb-operator-role');
          if (opName) opName.textContent = userProfile.name;
          if (opRole && userProfile.role) opRole.textContent = userProfile.role;
          if (!opName) accountBtn.innerHTML = `👤 ${escapeHtml(userProfile.name)}`;
        }
        
        accountBtn.onclick = function(e) {
          e.preventDefault();

          if (document.getElementById('aegis-account-modal')) return;

          const modal = document.createElement('div');
          modal.id = 'aegis-account-modal';
          modal.className = 'account-modal';
          
          modal.innerHTML = `
            <div class="account-modal-card">
              <div class="account-modal-header">
                <h2 class="account-modal-title">🔐 Operator Console</h2>
                <button class="account-modal-close" id="close-account-modal">✕</button>
              </div>
              
              <div class="modal-tabs">
                <button class="modal-tab-btn active" data-tab="tab-personal">👤 Profile</button>
                <button class="modal-tab-btn" data-tab="tab-stats">📊 Stats</button>
                <button class="modal-tab-btn" data-tab="tab-security">⚡ Actions</button>
              </div>
              
              <div class="account-modal-body">
                <!-- Tab 1: Personal Data -->
                <div id="tab-personal" class="modal-tab-content active">
                  <div class="account-detail-row">
                    <span class="account-detail-lbl">Secure Identity (Email)</span>
                    <span class="account-detail-val" >${escapeHtml(user.email)}</span>
                  </div>
                  <div class="account-detail-row">
                    <label class="account-detail-lbl" for="edit-name">Operator Name</label>
                    <input type="text" id="edit-name" class="gi" value="${escapeHtml(userProfile.name || 'Anonymous Specialist')}" required style="border: 1px solid var(--border);" />
                  </div>
                  <div class="account-detail-row">
                    <label class="account-detail-lbl" for="edit-role">Designation / Role</label>
                    <select id="edit-role" class="gi">
                      <option value="Security Engineering & DevSecOps">🛡️ Security Engineering & DevSecOps</option>
                      <option value="Cyber Defense & SOC Analyst">🔍 Cyber Defense & SOC Analyst (Blue Team)</option>
                      <option value="Offensive Security & Penetration Tester">⚔️ Offensive Security & Pentester (Red Team)</option>
                      <option value="Governance, Risk & Compliance (GRC)">⚖️ Governance, Risk & Compliance (GRC)</option>
                      <option value="AI & Emerging Cyber Security">🤖 AI & Emerging Cyber Security Specialist</option>
                    </select>
                  </div>
                  <div class="account-detail-row">
                    <label class="account-detail-lbl" for="edit-question">Security Question</label>
                    <select id="edit-question" class="gi">
                      <option value="What was your first hacking handle?">What was your first hacking handle?</option>
                      <option value="What is your favorite encryption algorithm?">What is your favorite encryption algorithm?</option>
                      <option value="What is your first security certification?">What is your first security certification?</option>
                      <option value="What was the name of your first computer?">What was the name of your first computer?</option>
                      <option value="Google Account Login">Google Account Login (Linked)</option>
                    </select>
                  </div>
                  <div class="account-detail-row">
                    <label class="account-detail-lbl" for="edit-answer">Security Answer</label>
                    <input type="text" id="edit-answer" class="gi" value="${escapeHtml(userProfile.answer || '')}" style="border: 1px solid var(--border);" />
                  </div>
                  <button class="calc-btn" id="save-profile-btn" style="margin-top: 10px;">💾 Save Profile Changes</button>
                </div>

                <!-- Tab 2: Operational Stats -->
                <div id="tab-stats" class="modal-tab-content">
                  <div class="stat-progress-section">
                    <div class="stat-progress-row">
                      <span>Overall Completion</span>
                      <strong id="modal-pct-overall">0%</strong>
                    </div>
                    <div class="modal-progress-bar">
                      <div class="modal-progress-fill" id="modal-fill-overall" style="width: 0%;"></div>
                    </div>
                  </div>
                  <div class="stat-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-top: 10px;">
                    <div class="stat-box">
                      <span class="stat-box-lbl">Phase 1</span>
                      <strong class="stat-box-val" id="modal-pct-p1">0%</strong>
                    </div>
                    <div class="stat-box">
                      <span class="stat-box-lbl">Phase 2</span>
                      <strong class="stat-box-val" id="modal-pct-p2">0%</strong>
                    </div>
                    <div class="stat-box">
                      <span class="stat-box-lbl">Phase 3</span>
                      <strong class="stat-box-val" id="modal-pct-p3">0%</strong>
                    </div>
                    <div class="stat-box">
                      <span class="stat-box-lbl">Phase 4</span>
                      <strong class="stat-box-val" id="modal-pct-p4">0%</strong>
                    </div>
                    <div class="stat-box" style="grid-column: span 2;">
                      <span class="stat-box-lbl">🚩 CTF Challenges Solved</span>
                      <strong class="stat-box-val" id="modal-ctfs-solved">0</strong>
                    </div>
                  </div>
                </div>

                <!-- Tab 3: Security & Session Operations -->
                <div id="tab-security" class="modal-tab-content">
                  <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 5px;">
                    <button class="google-btn" id="modal-export-btn" style="height: 42px; font-size: 13px;">
                      📥 Backup Progress (Export JSON)
                    </button>
                    <button class="google-btn" id="modal-import-btn" style="height: 42px; font-size: 13px;">
                      📤 Restore Progress (Import JSON)
                    </button>
                    <input type="file" id="modal-import-file" accept=".json" style="display: none;" />

                    <button class="google-btn" id="modal-reset-pw-btn" style="height: 42px; font-size: 13px;">
                      🔑 Send Password Reset Email
                    </button>
                    <button class="google-btn" id="modal-reset-progress-btn" style="color: var(--study-danger); height: 42px; font-size: 13px;">
                      🧹 Reset All Progress Data
                    </button>
                    <button class="calc-btn" id="modal-signout-btn" style="background: var(--study-primary); height: 44px; font-size: 13px; margin-top: 4px;">
                      🚪 Sign Out of Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `;

          document.body.appendChild(modal);

          // Preselect dropdown values
          const editRole = modal.querySelector('#edit-role');
          if (editRole && userProfile.role) editRole.value = userProfile.role;
          const editQuestion = modal.querySelector('#edit-question');
          if (editQuestion && userProfile.question) editQuestion.value = userProfile.question;

          // Wire up Tab Switching
          const tabBtns = modal.querySelectorAll('.modal-tab-btn');
          const tabContents = modal.querySelectorAll('.modal-tab-content');
          tabBtns.forEach(btn => {
            btn.onclick = function() {
              tabBtns.forEach(b => b.classList.remove('active'));
              tabContents.forEach(c => c.classList.remove('active'));
              btn.classList.add('active');
              modal.querySelector(`#${btn.dataset.tab}`).classList.add('active');
              if (btn.dataset.tab === 'tab-stats') {
                updateModalStats(modal);
              }
            };
          });

          // Wire up Save Profile Button
          const saveBtn = modal.querySelector('#save-profile-btn');
          if (saveBtn) {
            saveBtn.onclick = function() {
              const newName = modal.querySelector('#edit-name').value.trim();
              const newRole = modal.querySelector('#edit-role').value;
              const newQuestion = modal.querySelector('#edit-question').value;
              const newAnswer = modal.querySelector('#edit-answer').value.trim().toLowerCase();
              
              if (!newName) {
                showToast("Name cannot be empty.", "err");
                return;
              }
              
              saveBtn.disabled = true;
              db.collection("users").doc(user.uid).update({
                name: newName,
                role: newRole,
                question: newQuestion,
                answer: newAnswer
              })
              .then(() => {
                userProfile.name = newName;
                userProfile.role = newRole;
                userProfile.question = newQuestion;
                userProfile.answer = newAnswer;
                
                if (accountBtn) {
                  const opName = document.getElementById('sb-operator-name');
                  const opRole = document.getElementById('sb-operator-role');
                  if (opName) opName.textContent = newName;
                  if (opRole && newRole) opRole.textContent = newRole;
                  if (!opName) accountBtn.innerHTML = `👤 ${escapeHtml(newName)}`;
                }

                // Map updated profession to career track and redirect to dashboard
                const roleTrackMap = {
                  'Security Engineering & DevSecOps': 'ENGINEERING',
                  'Cyber Defense & SOC Analyst': 'DEFENSE',
                  'Offensive Security & Penetration Tester': 'OFFENSIVE',
                  'Governance, Risk & Compliance (GRC)': 'GRC',
                  'AI & Emerging Cyber Security': 'AI_SECURITY'
                };
                const mappedTrack = roleTrackMap[newRole];
                if (mappedTrack && typeof window.setActiveTrack === 'function') {
                  window.setActiveTrack(mappedTrack, true);
                } else if (typeof window.nav === 'function') {
                  window.nav('dashboard');
                }

                showToast("Profile updated! Redirecting to Dashboard...", "ok");
                saveBtn.disabled = false;
                setTimeout(() => { modal.remove(); }, 600);
              })
              .catch((e) => {
                console.error("[Firebase Auth] Error updating profile:", e);
                showToast("Failed to update profile.", "err");
                saveBtn.disabled = false;
              });
            };
          }

          // Wire up Password Reset
          const resetPwBtn = modal.querySelector('#modal-reset-pw-btn');
          if (resetPwBtn) {
            resetPwBtn.onclick = function() {
              resetPwBtn.disabled = true;
              auth.sendPasswordResetEmail(user.email)
                .then(() => {
                  showToast("Password reset email sent.", "ok");
                  resetPwBtn.disabled = false;
                })
                .catch((err) => {
                  console.error("[Firebase Auth] Password reset error:", err);
                  showToast("Failed to send reset email.", "err");
                  resetPwBtn.disabled = false;
                });
            };
          }

          // Wire up Factory Reset
          const resetProgressBtn = modal.querySelector('#modal-reset-progress-btn');
          if (resetProgressBtn) {
            resetProgressBtn.onclick = function() {
              if (confirm("⚠️ WARNING: This will permanently delete ALL your local and cloud progress. This action cannot be undone. Proceed?")) {
                resetProgressBtn.disabled = true;
                
                if (typeof S !== 'undefined') {
                  S.done = {};
                  S.ctfs = {};
                  S.theme = 'dark';
                  S.sound = true;
                  if (typeof saveS === 'function') saveS();
                  if (typeof applyTheme === 'function') applyTheme();
                  if (typeof applySound === 'function') applySound();
                  if (typeof syncProgress === 'function') syncProgress();
                  if (typeof PHASES !== 'undefined') {
                    PHASES.forEach((_, i) => {
                      const pg = document.getElementById('page-phase' + (i + 1));
                      if (pg) {
                        pg.innerHTML = '';
                        pg._done = false;
                      }
                    });
                  }
                }
                
                db.collection("users").doc(user.uid).update({
                  done: {},
                  ctfs: {}
                })
                .then(() => {
                  showToast("Local & cloud progress factory reset.", "ok");
                  updateModalStats(modal);
                  resetProgressBtn.disabled = false;
                })
                .catch((e) => {
                  console.error("[Firebase Auth] Error resetting cloud state:", e);
                  showToast("Cloud reset failed, but local progress is reset.", "err");
                  resetProgressBtn.disabled = false;
                });
              }
            };
          }

          // Wire up Logout
          const signoutBtn = modal.querySelector('#modal-signout-btn');
          if (signoutBtn) {
            signoutBtn.onclick = function() {
              if (confirm("Are you sure you want to terminate your session?")) {
                signoutBtn.disabled = true;
                auth.signOut()
                  .then(() => {
                    showToast("Session terminated.", "ok");
                    modal.remove();
                    window.location.replace("index.html");
                  })
                  .catch(() => {
                    showToast("Logout failed.", "err");
                    signoutBtn.disabled = false;
                  });
              }
            };
          }

          const closeBtn = modal.querySelector('#close-account-modal');
          const closeModal = () => modal.remove();
          if (closeBtn) closeBtn.onclick = closeModal;
          modal.onclick = function(e) {
            if (e.target === modal) closeModal();
          };
        };
      }

      // 3. Listen to progress changes in the UI and save them to Firestore
      window.addEventListener("aegisStateChanged", (e) => {
        if (!isSyncingFromCloud) {
          saveProgressToCloud(user.uid, e.detail);
        }
      });

    } else {
      console.log("[Firebase Auth] No user session found.");
      // If we're on the dashboard but not logged in, check if guest mode is enabled
      if (isDashboard) {
        const isGuest = localStorage.getItem('aegis_guest_mode') === 'true';
        if (!isGuest) {
          window.location.replace("index.html");
        } else {
          console.log("[Firebase Auth] Guest / Demo Mode active on dashboard.");
          setSyncStatus('offline', 'Guest Local Mode');
          const opNameEl = document.getElementById('sb-operator-name');
          const opRoleEl = document.getElementById('sb-operator-role');
          if (opNameEl && !opNameEl.textContent.trim()) opNameEl.textContent = "Guest Specialist";
          if (opRoleEl && !opRoleEl.textContent.trim()) opRoleEl.textContent = "Platform Explorer";
        }
      }
    }
  });

  // Attach form event listeners when DOM is ready
  function bindForms() {
    if (isDashboard) return;

    // Google Sign-In handler
    const googleBtn = document.getElementById("google-signin-btn");
    if (googleBtn) {
      googleBtn.addEventListener("click", () => {
        googleBtn.disabled = true;
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
          .then((result) => {
            const user = result.user;
            showToast("Authenticated! Opening session...", "ok");
            
            // Check if user already has a document in Firestore
            return db.collection("users").doc(user.uid).get()
              .then((docSnap) => {
                if (!docSnap.exists) {
                  // Initialize a default profile for the user in Firestore, preserving guest progress
                  return db.collection("users").doc(user.uid).set({
                    name: user.displayName || "Anonymous Specialist",
                    role: "Student / Learner",
                    done: (window.S && window.S.done) ? window.S.done : {},
                    v: '2.0',
                    sound: true,
                    theme: 'dark',
                    ctfs: (window.S && window.S.ctfs) ? window.S.ctfs : {}
                  });
                }
              });
          })
          .catch((error) => {
            console.error("[Firebase Auth] Google sign-in error:", error);
            let errorMsg = "Google authentication failed.";
            if (error.code === "auth/popup-blocked") {
              errorMsg = "Popup blocked by browser. Please enable popups.";
            } else if (error.code === "auth/configuration-not-found") {
              errorMsg = "Google Sign-In is not configured in Firebase.";
            } else if (error.code === "auth/unauthorized-domain") {
              errorMsg = "Unauthorized domain. Add this host to Firebase console.";
            }
            showToast(errorMsg, "err");
            googleBtn.disabled = false;
          });
      });
    }

    // Login form handler
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value.trim().toLowerCase();
        const password = document.getElementById("password").value;
        const btn = loginForm.querySelector("button[type='submit']");

        const rememberEl = document.getElementById("remember-me");
        const persistence = (rememberEl && !rememberEl.checked)
          ? firebase.auth.Auth.Persistence.SESSION
          : firebase.auth.Auth.Persistence.LOCAL;

        if (btn) btn.disabled = true;
        auth.setPersistence(persistence)
          .then(() => auth.signInWithEmailAndPassword(email, password))
          .then(() => {
            showToast("Authenticated! Opening session...", "ok");
          })
          .catch((error) => {
            console.error("[Firebase Auth] Login error:", error);
            let errorMsg = "Access denied. Check credentials.";
            if (error.code === "auth/invalid-credential" || error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
              errorMsg = "Invalid email or password.";
            } else if (error.code === "auth/too-many-requests") {
              errorMsg = "Too many failed attempts. Try again later.";
            }
            showToast(errorMsg, "err");
            if (btn) btn.disabled = false;
          });
      });
    }

    // Register form handler
    const registerForm = document.getElementById("register-form");
    if (registerForm) {
      registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("reg-name").value.trim();
        const email = document.getElementById("reg-email").value.trim().toLowerCase();
        const role = document.getElementById("reg-role").value;
        const password = document.getElementById("reg-password").value;
        const confirmPassword = document.getElementById("reg-confirm-password") ? document.getElementById("reg-confirm-password").value : password;
        const btn = registerForm.querySelector("button[type='submit']");

        if (password.length < 6) {
          showToast("Password must be at least 6 characters.", "err");
          return;
        }

        if (password !== confirmPassword) {
          showToast("Passwords do not match.", "err");
          return;
        }

        if (btn) btn.disabled = true;

        auth.createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            // Initialize document in Firestore, preserving guest progress
            return db.collection("users").doc(user.uid).set({
              name: name,
              role: role,
              done: (window.S && window.S.done) ? window.S.done : {},
              v: '2.0',
              sound: true,
              theme: 'dark',
              ctfs: (window.S && window.S.ctfs) ? window.S.ctfs : {}
            });
          })
          .then(() => {
            showToast("Access initialized! Welcome.", "ok");
          })
          .catch((error) => {
            console.error("[Firebase Auth] Register error:", error);
            let errorMsg = error.message || "Registration failed.";
            if (error.code === "auth/email-already-in-use") {
              errorMsg = "This email is already registered.";
            } else if (error.code === "auth/invalid-email") {
              errorMsg = "Please enter a valid email address.";
            }
            showToast(errorMsg, "err");
            if (btn) btn.disabled = false;
          });
      });
    }

    // Password recovery form handler
    const resetForm = document.getElementById("reset-form");
    if (resetForm) {
      resetForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("reset-email").value.trim().toLowerCase();
        const btn = resetForm.querySelector("button[type='submit']");

        if (btn) btn.disabled = true;
        auth.sendPasswordResetEmail(email)
          .then(() => {
            showToast("Transmission success! Check email.", "ok");
            setTimeout(() => {
              window.location.replace("index.html");
            }, 2500);
          })
          .catch((error) => {
            console.error("[Firebase Auth] Password recovery error:", error);
            let errorMsg = "Transmission failed.";
            if (error.code === "auth/user-not-found") {
              errorMsg = "No account found with this email.";
            } else if (error.code === "auth/invalid-email") {
              errorMsg = "Invalid email format.";
            }
            showToast(errorMsg, "err");
            if (btn) btn.disabled = false;
          });
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindForms);
  } else {
    bindForms();
  }
})();
