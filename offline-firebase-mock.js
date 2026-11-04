/**
 * AEGIS PRO — Local Offline Firebase Compatibility Shim (Compat v10)
 * 
 * Provides a 100% locally self-contained, offline-first drop-in replacement
 * for Firebase Auth and Firestore SDKs.
 * 
 * Communicates with the local origin backend REST endpoints (http://127.0.0.1:3000)
 * and SQLite database, persisting sessions in localStorage (aegis_session_token, aegis_auth_user).
 */

(function(window) {
  'use strict';

  // Only install if running locally, offline, or if Firebase SDK is not available
  const isLocalHost = window.location.hostname === '127.0.0.1' || 
                      window.location.hostname === 'localhost' || 
                      window.location.protocol === 'file:';
  
  // Base backend endpoint for authentic local REST requests
  const BACKEND_URL = (window.location && window.location.origin && window.location.origin !== 'null' && window.location.protocol.startsWith('http'))
    ? window.location.origin
    : 'http://127.0.0.1:3000';

  console.log(`[*] AEGIS Local Offline Firebase Shim activated (Backend: ${BACKEND_URL})`);

  // ---------------------------------------------------------------------------
  // Session Persistence Helpers
  // ---------------------------------------------------------------------------
  function getStoredUser() {
    try {
      const raw = localStorage.getItem('aegis_auth_user') || sessionStorage.getItem('aegis_auth_user');
      if (raw) {
        const u = JSON.parse(raw);
        if (u && u.uid) return u;
      }
    } catch (e) {}
    return null;
  }

  function saveStoredSession(user, token) {
    if (!user) return;
    try {
      const sessToken = token || ('aegis_token_' + (user.uid || Math.random().toString(36).substr(2)) + '.' + Date.now());
      const userPayload = {
        uid: user.uid,
        email: user.email,
        name: user.name || user.displayName || 'Cyber Specialist',
        displayName: user.name || user.displayName || 'Cyber Specialist',
        role: user.role || 'Student / Learner'
      };
      localStorage.setItem('aegis_session_token', sessToken);
      localStorage.setItem('aegis_auth_user', JSON.stringify(userPayload));
      localStorage.removeItem('aegis_guest_mode');
      sessionStorage.setItem('aegis_session_token', sessToken);
      sessionStorage.setItem('aegis_auth_user', JSON.stringify(userPayload));
    } catch (e) {}
  }

  function clearStoredSession() {
    try {
      localStorage.removeItem('aegis_session_token');
      localStorage.removeItem('aegis_auth_user');
      localStorage.removeItem('aegis_guest_mode');
      sessionStorage.removeItem('aegis_session_token');
      sessionStorage.removeItem('aegis_auth_user');
    } catch (e) {}
  }

  // ---------------------------------------------------------------------------
  // Mock Firebase Auth Implementation
  // ---------------------------------------------------------------------------
  let _currentUser = getStoredUser();
  const _authListeners = [];

  function notifyAuthListeners(user) {
    _currentUser = user;
    _authListeners.forEach(cb => {
      try { cb(user); } catch (e) { console.error('[Offline Auth] Listener error:', e); }
    });
  }

  const mockAuth = {
    get currentUser() {
      if (!_currentUser) {
        _currentUser = getStoredUser();
      }
      return _currentUser;
    },

    set currentUser(val) {
      _currentUser = val;
    },

    onAuthStateChanged: function(callback) {
      if (typeof callback === 'function') {
        _authListeners.push(callback);
        // Deliver initial state asynchronously to match Firebase Auth contract
        setTimeout(() => {
          callback(this.currentUser);
        }, 15);
      }
      return function unsubscribe() {
        const idx = _authListeners.indexOf(callback);
        if (idx !== -1) _authListeners.splice(idx, 1);
      };
    },

    setPersistence: function(persistence) {
      return Promise.resolve();
    },

    signInWithEmailAndPassword: function(email, password) {
      return fetch(`${BACKEND_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password: password })
      })
      .then(res => res.json().then(data => ({ ok: res.ok, status: res.status, data })))
      .then(({ ok, data }) => {
        if (!ok) {
          const err = new Error(data.message || 'Invalid credentials');
          err.code = data.code || 'auth/invalid-credential';
          throw err;
        }

        const userObj = {
          uid: data.user.uid,
          email: data.user.email,
          name: data.user.name || 'Cyber Specialist',
          displayName: data.user.name || 'Cyber Specialist',
          role: data.user.role || 'Student / Learner'
        };

        saveStoredSession(userObj, data.token);
        _currentUser = userObj;
        notifyAuthListeners(userObj);

        return { user: userObj };
      });
    },

    createUserWithEmailAndPassword: function(email, password) {
      let regName = 'Cyber Specialist';
      let regRole = 'Student / Learner';
      const nameEl = document.getElementById('reg-name');
      if (nameEl && nameEl.value.trim()) regName = nameEl.value.trim();
      const roleEl = document.getElementById('reg-role');
      if (roleEl && roleEl.value) regRole = roleEl.value;

      return fetch(`${BACKEND_URL}/api/v1/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password: password,
          name: regName,
          role: regRole
        })
      })
      .then(res => res.json().then(data => ({ ok: res.ok, status: res.status, data })))
      .then(({ ok, data }) => {
        if (!ok) {
          const err = new Error(data.message || 'Registration failed');
          err.code = data.code || 'auth/email-already-in-use';
          throw err;
        }

        const userObj = {
          uid: data.user.uid,
          email: data.user.email,
          name: data.user.name || regName,
          displayName: data.user.name || regName,
          role: data.user.role || regRole
        };

        saveStoredSession(userObj, data.token);
        _currentUser = userObj;
        notifyAuthListeners(userObj);

        return { user: userObj };
      });
    },

    signOut: function() {
      clearStoredSession();
      _currentUser = null;
      notifyAuthListeners(null);
      return Promise.resolve();
    },

    sendPasswordResetEmail: function(email) {
      return fetch(`${BACKEND_URL}/api/v1/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() })
      })
      .then(() => Promise.resolve());
    },

    signInWithPopup: function(provider) {
      // Offline instant admin authorization
      const adminUser = {
        uid: 'usr_master_admin_1',
        email: 'anupdhokiya0@gmail.com',
        name: 'Anup Dhokiya (Master Admin)',
        displayName: 'Anup Dhokiya (Master Admin)',
        role: 'Security Engineering & DevSecOps'
      };
      saveStoredSession(adminUser, 'aegis_token_master_admin_offline.' + Date.now());
      _currentUser = adminUser;
      notifyAuthListeners(adminUser);
      return Promise.resolve({ user: adminUser });
    }
  };

  mockAuth.GoogleAuthProvider = function() {};
  mockAuth.Auth = {
    Persistence: {
      SESSION: 'SESSION',
      LOCAL: 'LOCAL',
      NONE: 'NONE'
    }
  };

  // ---------------------------------------------------------------------------
  // Mock Cloud Firestore Implementation
  // ---------------------------------------------------------------------------
  const _docSubscribers = {}; // Map of "col/docId" -> Array of callback functions
  const _localDataStore = {};  // In-memory document storage

  function getDocKey(col, id) {
    return `${col}:::${id}`;
  }

  function getLocalDoc(col, id) {
    const key = getDocKey(col, id);
    if (_localDataStore[key]) return _localDataStore[key];

    // Check localStorage cache
    try {
      const raw = localStorage.getItem(`aegis_doc_${key}`);
      if (raw) {
        _localDataStore[key] = JSON.parse(raw);
        return _localDataStore[key];
      }
    } catch (e) {}

    // Fallback for user documents: synthesize from auth session and v2 state
    if (col === 'users') {
      const user = getStoredUser();
      let state = {};
      try {
        state = JSON.parse(localStorage.getItem('aegis_v2_state') || '{}');
      } catch (e) {}

      const synth = {
        name: (user && user.name) || 'Cyber Specialist',
        role: (user && user.role) || 'Student / Learner',
        email: (user && user.email) || 'student@aegis.local',
        done: state.done || {},
        ctfs: state.ctfs || {},
        theme: state.theme || 'dark',
        sound: state.sound !== undefined ? state.sound : true,
        lastActivePage: state.lastActivePage || 'dashboard',
        streak: state.streak || { count: 1, lastDate: new Date().toISOString().slice(0, 10) },
        syncedAt: new Date().toISOString()
      };
      _localDataStore[key] = synth;
      return synth;
    }

    return null;
  }

  function setLocalDoc(col, id, data, merge) {
    const key = getDocKey(col, id);
    const existing = getLocalDoc(col, id) || {};
    const updated = merge ? Object.assign({}, existing, data) : Object.assign({}, data);
    _localDataStore[key] = updated;

    try {
      localStorage.setItem(`aegis_doc_${key}`, JSON.stringify(updated));
    } catch (e) {}

    // Notify active snapshot subscribers
    const subs = _docSubscribers[key] || [];
    subs.forEach(cb => {
      try {
        cb({
          id: id,
          exists: true,
          data: () => Object.assign({}, updated)
        });
      } catch (e) {
        console.error('[Offline Firestore] Snapshot notification error:', e);
      }
    });

    return updated;
  }

  const mockFirestore = {
    enablePersistence: function(options) {
      return Promise.resolve();
    },

    collection: function(colName) {
      return {
        doc: function(docId) {
          const docKey = getDocKey(colName, docId);

          return {
            id: docId,

            get: function() {
              const local = getLocalDoc(colName, docId);
              if (local) {
                return Promise.resolve({
                  id: docId,
                  exists: true,
                  data: () => Object.assign({}, local)
                });
              }

              // Try loading from SQLite backend
              if (colName === 'users') {
                return fetch(`${BACKEND_URL}/api/v1/user/progress?uid=${docId}`)
                  .then(r => r.ok ? r.json() : null)
                  .then(res => {
                    if (res && res.progress) {
                      setLocalDoc(colName, docId, res.progress, true);
                      return {
                        id: docId,
                        exists: true,
                        data: () => Object.assign({}, res.progress)
                      };
                    }
                    return {
                      id: docId,
                      exists: false,
                      data: () => ({})
                    };
                  })
                  .catch(() => ({
                    id: docId,
                    exists: true,
                    data: () => ({})
                  }));
              }

              return Promise.resolve({
                id: docId,
                exists: false,
                data: () => ({})
              });
            },

            set: function(data, options) {
              const merge = options && options.merge;
              const updated = setLocalDoc(colName, docId, data, merge);

              // Persist to local SQLite origin backend
              if (colName === 'users') {
                const token = localStorage.getItem('aegis_session_token');
                fetch(`${BACKEND_URL}/api/v1/user/progress`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : ''
                  },
                  body: JSON.stringify({ uid: docId, progress: updated })
                }).catch(err => {
                  console.warn('[Offline Firestore] SQLite sync deferred:', err);
                });
              } else if (colName === 'support_tickets') {
                fetch(`${BACKEND_URL}/api/v1/support/tickets`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(Object.assign({ ticketId: docId }, data))
                }).catch(() => {});
              }

              return Promise.resolve();
            },

            update: function(data) {
              const updated = setLocalDoc(colName, docId, data, true);

              if (colName === 'users') {
                const token = localStorage.getItem('aegis_session_token');
                // Sync progress
                fetch(`${BACKEND_URL}/api/v1/user/progress`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : ''
                  },
                  body: JSON.stringify({ uid: docId, progress: updated })
                }).catch(() => {});

                // If profile fields were modified, sync to users table as well
                if (data.name || data.role || data.question || data.answer) {
                  fetch(`${BACKEND_URL}/api/v1/user/profile`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': token ? `Bearer ${token}` : ''
                    },
                    body: JSON.stringify({
                      uid: docId,
                      name: data.name,
                      role: data.role,
                      question: data.question,
                      answer: data.answer
                    })
                  }).catch(() => {});
                }
              }

              return Promise.resolve();
            },

            onSnapshot: function(onNext, onError) {
              if (typeof onNext !== 'function') return () => {};

              if (!_docSubscribers[docKey]) _docSubscribers[docKey] = [];
              _docSubscribers[docKey].push(onNext);

              // Trigger initial snapshot immediately
              const current = getLocalDoc(colName, docId);
              setTimeout(() => {
                onNext({
                  id: docId,
                  exists: !!current,
                  data: () => Object.assign({}, current || {})
                });

                // Asynchronously fetch latest from origin SQLite to keep freshly updated
                if (colName === 'users') {
                  fetch(`${BACKEND_URL}/api/v1/user/progress?uid=${docId}`)
                    .then(r => r.ok ? r.json() : null)
                    .then(res => {
                      if (res && res.progress && Object.keys(res.progress).length > 0) {
                        setLocalDoc(colName, docId, res.progress, true);
                      }
                    })
                    .catch(() => {});
                }
              }, 10);

              return function unsubscribe() {
                const list = _docSubscribers[docKey];
                if (list) {
                  const idx = list.indexOf(onNext);
                  if (idx !== -1) list.splice(idx, 1);
                }
              };
            }
          };
        }
      };
    }
  };

  // ---------------------------------------------------------------------------
  // Top-Level Firebase Shim Object
  // ---------------------------------------------------------------------------
  const AegisOfflineFirebase = {
    _isAegisOfflineMock: true,
    apps: [{ name: '[DEFAULT]' }],

    initializeApp: function(config) {
      console.log("[Offline Firebase] Mock initialized successfully with local configuration.");
      return this;
    },

    auth: function() {
      return mockAuth;
    },

    firestore: function() {
      return mockFirestore;
    },

    analytics: function() {
      return {
        logEvent: function() {}
      };
    }
  };

  // Attach constructor properties onto auth
  AegisOfflineFirebase.auth.GoogleAuthProvider = mockAuth.GoogleAuthProvider;
  AegisOfflineFirebase.auth.Auth = mockAuth.Auth;

  // Always override on local testbed (127.0.0.1 or localhost) or if Firebase is missing
  if (isLocalHost || typeof window.firebase === 'undefined' || !window.firebase.apps) {
    window.firebase = AegisOfflineFirebase;
  }

  window.AegisOfflineFirebase = AegisOfflineFirebase;

})(typeof window !== 'undefined' ? window : this);
