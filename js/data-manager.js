/* =============================================
   ABAIS Data Manager
   localStorage-first with Supabase sync
   ============================================= */

const STORAGE_PREFIX = 'abais_';

// ===== Gallery =====
export function getGallery() {
  return getFromStorage('gallery', []);
}

export function saveGalleryItem(item) {
  const gallery = getGallery();
  if (item.id) {
    const idx = gallery.findIndex(g => g.id === item.id);
    if (idx !== -1) { gallery[idx] = { ...gallery[idx], ...item, updated_at: new Date().toISOString() }; }
  } else {
    item.id = generateId();
    item.created_at = new Date().toISOString();
    item.updated_at = new Date().toISOString();
    gallery.push(item);
  }
  saveToStorage('gallery', gallery);
  return item;
}

export function deleteGalleryItem(id) {
  const gallery = getGallery().filter(g => g.id !== id);
  saveToStorage('gallery', gallery);
}

// ===== Calendar Events =====
export function getCalendarEvents() {
  return getFromStorage('calendar_events', []);
}

export function saveCalendarEvent(event) {
  const events = getCalendarEvents();
  if (event.id) {
    const idx = events.findIndex(e => e.id === event.id);
    if (idx !== -1) { events[idx] = { ...events[idx], ...event }; }
  } else {
    event.id = generateId();
    event.created_at = new Date().toISOString();
    events.push(event);
  }
  saveToStorage('calendar_events', events);
  return event;
}

export function deleteCalendarEvent(id) {
  const events = getCalendarEvents().filter(e => e.id !== id);
  saveToStorage('calendar_events', events);
}

// ===== Chat Messages =====
export function getChats() {
  return getFromStorage('chats', []);
}

export function getChatSessions() {
  const chats = getChats();
  const sessions = {};
  chats.forEach(c => {
    if (!sessions[c.session_id]) {
      sessions[c.session_id] = {
        session_id: c.session_id,
        visitor_name: c.visitor_name,
        messages: [],
        unread: 0,
        last_message: '',
        last_time: '',
      };
    }
    sessions[c.session_id].messages.push(c);
    if (!c.is_read && c.sender === 'visitor') {
      sessions[c.session_id].unread++;
    }
    sessions[c.session_id].last_message = c.message;
    sessions[c.session_id].last_time = c.created_at;
  });
  return Object.values(sessions).sort((a, b) => new Date(b.last_time) - new Date(a.last_time));
}

export function addChatMessage(msg) {
  const chats = getChats();
  msg.id = generateId();
  msg.created_at = new Date().toISOString();
  msg.is_read = msg.sender === 'admin';
  chats.push(msg);
  saveToStorage('chats', chats);
  return msg;
}

export function markChatRead(sessionId) {
  const chats = getChats();
  chats.forEach(c => {
    if (c.session_id === sessionId && c.sender === 'visitor') {
      c.is_read = true;
    }
  });
  saveToStorage('chats', chats);
}

export function getUnreadCount() {
  return getChats().filter(c => !c.is_read && c.sender === 'visitor').length;
}

// ===== Site Content =====
export function getSiteContent(section) {
  const content = getFromStorage('site_content', {});
  return content[section] || null;
}

export function saveSiteContent(section, data) {
  const content = getFromStorage('site_content', {});
  content[section] = { ...data, updated_at: new Date().toISOString() };
  saveToStorage('site_content', content);
}

// ===== Admin Auth =====
const ADMIN_PASSWORD = 'ketikdisini_2025';

export function adminLogin(password) {
  if (password === ADMIN_PASSWORD) {
    sessionStorage.setItem(STORAGE_PREFIX + 'admin_auth', 'true');
    return true;
  }
  return false;
}

export function isAdminLoggedIn() {
  return sessionStorage.getItem(STORAGE_PREFIX + 'admin_auth') === 'true';
}

export function adminLogout() {
  sessionStorage.removeItem(STORAGE_PREFIX + 'admin_auth');
}

// ===== Helpers =====
function getFromStorage(key, fallback) {
  try {
    const data = localStorage.getItem(STORAGE_PREFIX + key);
    return data ? JSON.parse(data) : fallback;
  } catch { return fallback; }
}

function saveToStorage(key, data) {
  localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
  // Dispatch storage event for cross-tab sync
  window.dispatchEvent(new CustomEvent('abais-data-change', { detail: { key } }));
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

// ===== Seed initial data if empty =====
export function seedInitialData() {
  // Gallery seed
  if (getGallery().length === 0) {
    const seedGallery = [
      { title: 'Kegiatan Tahfidz Pagi', description: 'Program hafalan Al-Quran rutin setiap pagi', image_url: '', category: 'tahfidz', unit: 'sdit' },
      { title: 'Market Day Entrepreneur', description: 'Siswa belajar berwirausaha di Market Day', image_url: '', category: 'entrepreneur', unit: 'sdit' },
      { title: 'Latihan Beladiri', description: 'Program beladiri untuk membentuk karakter tangguh', image_url: '', category: 'beladiri', unit: 'smp-sma' },
      { title: 'Upacara Bendera', description: 'Upacara rutin setiap hari Senin', image_url: '', category: 'umum', unit: 'smp-sma' },
    ];
    seedGallery.forEach(item => saveGalleryItem(item));
  }

  // Calendar seed
  if (getCalendarEvents().length === 0) {
    const now = new Date();
    const year = now.getFullYear();
    const seedEvents = [
      { title: 'Awal Tahun Ajaran 2026/2027', event_date: `${year}-07-14`, unit: 'sdit', category: 'akademik', color: '#2B8FBD' },
      { title: 'Awal Tahun Ajaran 2026/2027', event_date: `${year}-07-14`, unit: 'smp-sma', category: 'akademik', color: '#2B8FBD' },
      { title: 'UTS Semester 1', event_date: `${year}-10-07`, end_date: `${year}-10-11`, unit: 'sdit', category: 'ujian', color: '#E07B6A' },
      { title: 'UTS Semester 1', event_date: `${year}-10-07`, end_date: `${year}-10-11`, unit: 'smp-sma', category: 'ujian', color: '#E07B6A' },
      { title: 'Wisuda Tahfidz', event_date: `${year}-12-20`, unit: 'sdit', category: 'kegiatan', color: '#27ae60' },
      { title: 'Market Day', event_date: `${year}-09-15`, unit: 'sdit', category: 'kegiatan', color: '#f39c12' },
      { title: 'Libur Akhir Semester 1', event_date: `${year}-12-23`, end_date: `${year + 1}-01-03`, unit: 'sdit', category: 'libur', color: '#95a5a6' },
      { title: 'Libur Akhir Semester 1', event_date: `${year}-12-23`, end_date: `${year + 1}-01-03`, unit: 'smp-sma', category: 'libur', color: '#95a5a6' },
    ];
    seedEvents.forEach(ev => saveCalendarEvent(ev));
  }
}
