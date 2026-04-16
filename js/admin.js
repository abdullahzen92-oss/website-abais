/* =============================================
   ABAIS Admin Panel Logic
   ============================================= */
import {
  adminLogin, isAdminLoggedIn, adminLogout,
  getGallery, saveGalleryItem, deleteGalleryItem,
  getCalendarEvents, saveCalendarEvent, deleteCalendarEvent,
  getChatSessions, getChats, addChatMessage, markChatRead, getUnreadCount,
  seedInitialData
} from './data-manager.js';

seedInitialData();

// ===== AUTH =====
const loginScreen = document.getElementById('adminLogin');
const dashboard = document.getElementById('adminDashboard');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');

function checkAuth() {
  isAdminLoggedIn().then(loggedIn => {
    if (loggedIn) {
      loginScreen.style.display = 'none';
      dashboard.style.display = 'flex';
      renderAll();
      startChatPolling();
    } else {
      loginScreen.style.display = 'flex';
      dashboard.style.display = 'none';
    }
  });
}

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const em = document.getElementById('loginEmail') ? document.getElementById('loginEmail').value : '';
  const pw = document.getElementById('loginPassword').value;
  const success = await adminLogin(em, pw);
  if (success) {
    checkAuth();
  } else {
    loginError.style.display = 'block';
    document.getElementById('loginPassword').classList.add('admin-input--error');
    setTimeout(() => { loginError.style.display = 'none'; }, 3000);
  }
});

document.getElementById('adminLogout').addEventListener('click', async () => {
  await adminLogout();
  checkAuth();
});

// ===== TAB NAVIGATION =====
document.querySelectorAll('.admin-nav-item[data-tab]').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    document.querySelectorAll('.admin-nav-item[data-tab]').forEach(b => b.classList.remove('admin-nav-item--active'));
    btn.classList.add('admin-nav-item--active');
    document.querySelectorAll('.admin-tab').forEach(t => t.style.display = 'none');
    document.getElementById(`tab-${tab}`).style.display = 'block';
    // Close mobile sidebar
    document.getElementById('adminSidebar').classList.remove('admin-sidebar--open');
    if (tab === 'chat') renderChatList();
    if (tab === 'dashboard') renderDashboard();
    if (tab === 'gallery') renderGalleryTable();
    if (tab === 'calendar') renderCalendarTable();
  });
});

// Mobile sidebar toggle
document.getElementById('sidebarToggle')?.addEventListener('click', () => {
  document.getElementById('adminSidebar').classList.toggle('admin-sidebar--open');
});

// ===== DASHBOARD =====
function renderDashboard() {
  const gallery = getGallery();
  const events = getCalendarEvents();
  const chats = getChats();
  const unread = getUnreadCount();

  document.getElementById('dashStats').innerHTML = `
    <div class="admin-stat"><div class="admin-stat__icon">🖼️</div><div class="admin-stat__number">${gallery.length}</div><div class="admin-stat__label">Foto Galeri</div></div>
    <div class="admin-stat"><div class="admin-stat__icon">📅</div><div class="admin-stat__number">${events.length}</div><div class="admin-stat__label">Event Kalender</div></div>
    <div class="admin-stat"><div class="admin-stat__icon">💬</div><div class="admin-stat__number">${chats.length}</div><div class="admin-stat__label">Pesan Chat</div></div>
    <div class="admin-stat ${unread > 0 ? 'admin-stat--alert' : ''}"><div class="admin-stat__icon">🔔</div><div class="admin-stat__number">${unread}</div><div class="admin-stat__label">Belum Dibaca</div></div>
  `;

  const sessions = getChatSessions().slice(0, 5);
  document.getElementById('recentChats').innerHTML = sessions.length === 0
    ? '<p style="color:var(--clr-text-muted);padding:var(--space-md);">Belum ada chat masuk.</p>'
    : sessions.map(s => `
      <div class="admin-chat-preview">
        <div class="admin-chat-preview__avatar">${s.visitor_name.charAt(0).toUpperCase()}</div>
        <div class="admin-chat-preview__info">
          <strong>${s.visitor_name}</strong>
          <p>${s.last_message.substring(0, 60)}${s.last_message.length > 60 ? '...' : ''}</p>
        </div>
        ${s.unread > 0 ? `<span class="admin-badge">${s.unread}</span>` : ''}
      </div>
    `).join('');
}

// ===== GALLERY MANAGEMENT =====
function renderGalleryTable() {
  const gallery = getGallery();
  document.getElementById('galleryTableBody').innerHTML = gallery.length === 0
    ? '<tr><td colspan="5" style="text-align:center;color:var(--clr-text-muted);">Belum ada foto.</td></tr>'
    : gallery.map(g => `
      <tr>
        <td><div class="admin-thumb" style="background:${g.image_url ? `url(${g.image_url}) center/cover` : 'var(--gradient-primary)'}"></div></td>
        <td><strong>${g.title}</strong><br><small style="color:var(--clr-text-muted);">${g.description || '-'}</small></td>
        <td><span class="admin-tag">${g.unit === 'sdit' ? 'SDIT' : 'SMP-SMA'}</span></td>
        <td><span class="admin-tag admin-tag--cat">${g.category}</span></td>
        <td>
          <button class="admin-btn admin-btn--sm admin-btn--outline" onclick="window._editGallery('${g.id}')">✏️</button>
          <button class="admin-btn admin-btn--sm admin-btn--danger" onclick="window._deleteGallery('${g.id}')">🗑️</button>
        </td>
      </tr>
    `).join('');
}

document.getElementById('addGalleryBtn').addEventListener('click', () => {
  document.getElementById('galleryId').value = '';
  document.getElementById('galleryForm').reset();
  document.getElementById('galleryModalTitle').textContent = 'Tambah Foto';
  openModal('galleryModal');
});

window._editGallery = (id) => {
  const item = getGallery().find(g => g.id === id);
  if (!item) return;
  document.getElementById('galleryId').value = item.id;
  document.getElementById('galleryTitle').value = item.title;
  document.getElementById('galleryDesc').value = item.description || '';
  document.getElementById('galleryUrl').value = item.image_url;
  document.getElementById('galleryUnit').value = item.unit;
  document.getElementById('galleryCat').value = item.category;
  document.getElementById('galleryModalTitle').textContent = 'Edit Foto';
  openModal('galleryModal');
};

window._deleteGallery = (id) => {
  if (confirm('Hapus foto ini?')) {
    deleteGalleryItem(id);
    renderGalleryTable();
    showToast('Foto berhasil dihapus');
  }
};

document.getElementById('galleryForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const id = document.getElementById('galleryId').value || null;
  saveGalleryItem({
    id,
    title: document.getElementById('galleryTitle').value,
    description: document.getElementById('galleryDesc').value,
    image_url: document.getElementById('galleryUrl').value,
    unit: document.getElementById('galleryUnit').value,
    category: document.getElementById('galleryCat').value,
  });
  closeModal('galleryModal');
  renderGalleryTable();
  showToast(id ? 'Foto berhasil diupdate' : 'Foto berhasil ditambahkan');
});

// ===== CALENDAR MANAGEMENT =====
function renderCalendarTable() {
  const events = getCalendarEvents().sort((a, b) => a.event_date.localeCompare(b.event_date));
  document.getElementById('calendarTableBody').innerHTML = events.length === 0
    ? '<tr><td colspan="5" style="text-align:center;color:var(--clr-text-muted);">Belum ada event.</td></tr>'
    : events.map(e => `
      <tr>
        <td><span class="admin-date" style="border-color:${e.color}">${formatDate(e.event_date)}${e.end_date ? '<br>s/d ' + formatDate(e.end_date) : ''}</span></td>
        <td><strong>${e.title}</strong>${e.description ? `<br><small style="color:var(--clr-text-muted);">${e.description}</small>` : ''}</td>
        <td><span class="admin-tag">${e.unit === 'sdit' ? 'SDIT' : 'SMP-SMA'}</span></td>
        <td><span class="admin-tag admin-tag--cat">${e.category}</span></td>
        <td>
          <button class="admin-btn admin-btn--sm admin-btn--outline" onclick="window._editCalendar('${e.id}')">✏️</button>
          <button class="admin-btn admin-btn--sm admin-btn--danger" onclick="window._deleteCalendar('${e.id}')">🗑️</button>
        </td>
      </tr>
    `).join('');
}

document.getElementById('addCalendarBtn').addEventListener('click', () => {
  document.getElementById('calEventId').value = '';
  document.getElementById('calendarForm').reset();
  document.getElementById('calendarModalTitle').textContent = 'Tambah Event';
  openModal('calendarModal');
});

window._editCalendar = (id) => {
  const ev = getCalendarEvents().find(e => e.id === id);
  if (!ev) return;
  document.getElementById('calEventId').value = ev.id;
  document.getElementById('calEventTitle').value = ev.title;
  document.getElementById('calEventDesc').value = ev.description || '';
  document.getElementById('calEventDate').value = ev.event_date;
  document.getElementById('calEventEnd').value = ev.end_date || '';
  document.getElementById('calEventUnit').value = ev.unit;
  document.getElementById('calEventCat').value = ev.category;
  document.getElementById('calEventColor').value = ev.color || '#2B8FBD';
  document.getElementById('calendarModalTitle').textContent = 'Edit Event';
  openModal('calendarModal');
};

window._deleteCalendar = (id) => {
  if (confirm('Hapus event ini?')) {
    deleteCalendarEvent(id);
    renderCalendarTable();
    showToast('Event berhasil dihapus');
  }
};

document.getElementById('calendarForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const id = document.getElementById('calEventId').value || null;
  saveCalendarEvent({
    id,
    title: document.getElementById('calEventTitle').value,
    description: document.getElementById('calEventDesc').value,
    event_date: document.getElementById('calEventDate').value,
    end_date: document.getElementById('calEventEnd').value || null,
    unit: document.getElementById('calEventUnit').value,
    category: document.getElementById('calEventCat').value,
    color: document.getElementById('calEventColor').value,
  });
  closeModal('calendarModal');
  renderCalendarTable();
  showToast(id ? 'Event berhasil diupdate' : 'Event berhasil ditambahkan');
});

// ===== CHAT MANAGEMENT =====
let activeSession = null;

function renderChatList() {
  const sessions = getChatSessions();
  const unread = getUnreadCount();
  const badge = document.getElementById('chatBadge');
  if (badge) badge.textContent = unread > 0 ? unread : '';

  document.getElementById('chatSessionList').innerHTML = sessions.length === 0
    ? '<p style="padding:var(--space-lg);color:var(--clr-text-muted);text-align:center;">Belum ada chat masuk.</p>'
    : sessions.map(s => `
      <div class="admin-chat-session ${activeSession === s.session_id ? 'admin-chat-session--active' : ''}" data-session="${s.session_id}">
        <div class="admin-chat-session__avatar">${s.visitor_name.charAt(0).toUpperCase()}</div>
        <div class="admin-chat-session__info">
          <strong>${s.visitor_name}</strong>
          <p>${s.last_message.substring(0, 40)}...</p>
        </div>
        ${s.unread > 0 ? `<span class="admin-badge">${s.unread}</span>` : ''}
      </div>
    `).join('');

  // Click handler
  document.querySelectorAll('.admin-chat-session').forEach(el => {
    el.addEventListener('click', () => {
      activeSession = el.dataset.session;
      markChatRead(activeSession);
      renderChatList();
      renderChatMessages();
    });
  });
}

function renderChatMessages() {
  const chats = getChats().filter(c => c.session_id === activeSession);
  const session = getChatSessions().find(s => s.session_id === activeSession);

  document.getElementById('chatWindowAdmin').innerHTML = `
    <div class="admin-chat-header">
      <strong>${session?.visitor_name || 'Chat'}</strong>
    </div>
    <div class="admin-chat-messages" id="adminChatMessages">
      ${chats.map(c => `
        <div class="admin-chat-msg admin-chat-msg--${c.sender}">
          <div class="admin-chat-bubble">${escapeHtml(c.message)}</div>
          <div class="admin-chat-time">${formatTime(c.created_at)}</div>
        </div>
      `).join('')}
    </div>
    <div class="admin-chat-input">
      <input type="text" id="adminChatInput" placeholder="Balas pesan..." />
      <button id="adminChatSend" class="admin-btn admin-btn--primary">Kirim</button>
    </div>
  `;

  // Scroll to bottom
  const msgs = document.getElementById('adminChatMessages');
  if (msgs) msgs.scrollTop = msgs.scrollHeight;

  // Send handler
  document.getElementById('adminChatSend')?.addEventListener('click', sendAdminReply);
  document.getElementById('adminChatInput')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendAdminReply();
  });
}

function sendAdminReply() {
  const input = document.getElementById('adminChatInput');
  if (!input || !input.value.trim() || !activeSession) return;
  const session = getChatSessions().find(s => s.session_id === activeSession);
  addChatMessage({
    session_id: activeSession,
    visitor_name: session?.visitor_name || 'Visitor',
    message: input.value.trim(),
    sender: 'admin',
  });
  input.value = '';
  renderChatMessages();
}

let chatPollInterval;
function startChatPolling() {
  let lastCount = getChats().length;
  chatPollInterval = setInterval(() => {
    const current = getChats().length;
    if (current !== lastCount) {
      lastCount = current;
      renderChatList();
      renderDashboard();
      if (activeSession) renderChatMessages();
      playNotification();
    }
  }, 2000);
}

function playNotification() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.frequency.value = 880; gain.gain.value = 0.08;
    osc.start();
    setTimeout(() => { osc.frequency.value = 1100; }, 100);
    setTimeout(() => { osc.stop(); ctx.close(); }, 250);
  } catch {}
}

// ===== SETTINGS =====
document.getElementById('exportDataBtn')?.addEventListener('click', () => {
  const data = {};
  ['gallery', 'calendar_events', 'chats', 'site_content'].forEach(key => {
    const v = localStorage.getItem('abais_' + key);
    if (v) data[key] = JSON.parse(v);
  });
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `abais-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click(); URL.revokeObjectURL(url);
  showToast('Data berhasil di-export!');
});

document.getElementById('importDataBtn')?.addEventListener('click', () => {
  document.getElementById('importDataFile').click();
});

document.getElementById('importDataFile')?.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      Object.keys(data).forEach(key => {
        localStorage.setItem('abais_' + key, JSON.stringify(data[key]));
      });
      showToast('Data berhasil di-import!');
      renderAll();
    } catch { showToast('File tidak valid!', true); }
  };
  reader.readAsText(file);
});

// ===== HELPERS =====
function renderAll() {
  renderDashboard();
  renderGalleryTable();
  renderCalendarTable();
  renderChatList();
}

function openModal(id) { document.getElementById(id).style.display = 'flex'; }
function closeModal(id) { document.getElementById(id).style.display = 'none'; }

document.querySelectorAll('[data-close]').forEach(btn => {
  btn.addEventListener('click', () => closeModal(btn.dataset.close));
});

// Close modal on backdrop click
document.querySelectorAll('.admin-modal').forEach(m => {
  m.addEventListener('click', (e) => { if (e.target === m) m.style.display = 'none'; });
});

function showToast(msg, isError = false) {
  const toast = document.createElement('div');
  toast.className = `admin-toast ${isError ? 'admin-toast--error' : ''}`;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('admin-toast--show'), 10);
  setTimeout(() => { toast.classList.remove('admin-toast--show'); setTimeout(() => toast.remove(), 300); }, 3000);
}

function formatDate(str) {
  return new Date(str + 'T00:00:00').toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatTime(iso) {
  return new Date(iso).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}

function escapeHtml(text) {
  const el = document.createElement('div');
  el.textContent = text;
  return el.innerHTML;
}

// ===== INIT =====
checkAuth();

// Listen for storage changes from other tabs
window.addEventListener('storage', () => {
  isAdminLoggedIn().then(loggedIn => { if (loggedIn) renderAll(); });
});
