/* =============================================
   ABAIS Data Manager
   Supabase-first with localStorage cache
   ============================================= */

import { supabase } from './supabase.js';

const STORAGE_PREFIX = 'abais_';
const SITE_CONTENT_ID = 'abais';

// In-memory cache — populated on first load
let _cache = null;
let _cacheReady = false;

// ===== DEFAULT CONTENT =====
const DEFAULT_CONTENT = {
  hero: {
    badge: 'Pendaftaran PPDB 2026/2027 Dibuka',
    title1: 'Mendidik Generasi',
    title2: "Qur'ani & Berakhlak Mulia",
    subtitle: 'Sekolah Sunnah Fullday dengan kurikulum Tahfidz Al-Qur\'an, Entrepreneur, dan Beladiri. Membangun fondasi iman dan kemandirian sejak dini di Kota Bogor.',
    cta1: 'Daftar PPDB Sekarang',
    cta2: 'Pelajari Selengkapnya',
    image: '/assets/images/hero-banner.png',
  },
  features: [
    { icon: '📖', title: 'Program Tahfidz', desc: 'Program unggulan hafalan Al-Qur\'an dengan metode talaqqi dan muroja\'ah yang terintegrasi dalam kegiatan harian.' },
    { icon: '💼', title: 'Entrepreneur', desc: 'Menumbuhkan jiwa wirausaha sejak dini melalui program entrepreneur meneladani Abdurrahman bin Auf radhiyallahu anhu.' },
    { icon: '🥋', title: 'Beladiri', desc: 'Program beladiri untuk membentuk karakter tangguh, disiplin, dan percaya diri sesuai ajaran Sunnah Nabi ﷺ.' },
    { icon: '🕌', title: 'Berbasis Sunnah', desc: 'Seluruh kegiatan berpedoman pada Al-Qur\'an dan As-Sunnah dengan pemahaman Salafush Shalih.' },
  ],
  counters: [
    { number: 200, label: 'Siswa Aktif' },
    { number: 25, label: 'Tenaga Pengajar' },
    { number: 8, label: 'Tahun Berdiri' },
    { number: 30, label: 'Juz Rata-rata' },
  ],
  testimonials: [
    { text: 'Alhamdulillah, anak saya sudah hafal 10 juz sejak bersekolah di ABAIS. Selain hafalan, akhlaknya pun semakin baik. Jazakumullahu khairan.', name: 'Ummu Fatimah', role: 'Orang Tua Siswa Kelas 5' },
    { text: 'Saya sangat terkesan dengan program entrepreneur di ABAIS. Anak saya jadi mandiri dan punya semangat berwirausaha. MasyaaAllah barakallah.', name: 'Abu Hamzah', role: 'Orang Tua Siswa Kelas 4' },
    { text: 'Lingkungan sekolah yang Islami dan guru-guru yang kompeten membuat kami yakin menitipkan anak di ABAIS. Alhamdulillah \'ala kulli haal.', name: 'Ummu Khadijah', role: 'Orang Tua Siswa Kelas 3' },
  ],
  about: {
    vision: 'Menjadi lembaga pendidikan Islam terpadu yang melahirkan generasi Qur\'ani, mandiri, dan berakhlak mulia berdasarkan Al-Qur\'an dan As-Sunnah.',
    mission: [
      'Menyelenggarakan pendidikan hafalan Al-Qur\'an dengan metode talaqqi',
      'Menanamkan jiwa entrepreneur meneladani Abdurrahman bin Auf',
      'Membentuk karakter tangguh melalui program beladiri',
      'Menerapkan kurikulum nasional berbasis nilai-nilai Islam',
    ],
    principalName: 'Ustadz Ahmad Fadhil, S.Pd.I',
    principalMessage: 'Kami berkomitmen untuk mendidik putra-putri terbaik umat ini menjadi generasi yang mencintai Al-Qur\'an, berakhlak mulia, mandiri, dan siap menghadapi tantangan zaman dengan bekal iman dan ilmu yang kuat.',
    principalImage: '',
  },
  contact: {
    waNumber: '6285656117777',
    waNumberSdit: '6281318686468',
    waMessage: "Assalamu'alaikum, saya ingin bertanya tentang ABAIS",
    address: 'Bogor, Jawa Barat',
    email: 'abaisbogor@gmail.com',
    instagram: 'https://www.instagram.com/abais.bogor/',
    facebook: 'https://www.facebook.com/sekolahsunnahbogor',
    mapsUrl: 'https://maps.app.goo.gl/FAqK1fr4AahSeuH87',
  },
  settings: {
    schoolName: 'ABAIS',
    schoolFullName: 'Abdurrahman Bin Auf Islamic School Bogor',
    tagline: "Sekolah Sunnah Fullday — Tahfidz, Entrepreneur, Beladiri. Mendidik generasi Qur'ani berakhlak mulia di Kota Bogor.",
    logo: '/assets/images/logo.png',
  },
  sdit_programs: [
    { icon: '📖', title: "Tahfidz Al-Qur'an", desc: "Target hafalan 10-15 Juz selama 6 tahun dengan metode talaqqi dan muroja'ah harian bersama ustadz/ustadzah berpengalaman." },
    { icon: '💼', title: 'Entrepreneur Kids', desc: 'Market Day, project based learning, dan pelatihan kemandirian finansial meneladani Abdurrahman bin Auf radhiyallahu anhu.' },
    { icon: '🥋', title: 'Beladiri & Olahraga', desc: 'Program silat dan olahraga rutin untuk membentuk mental tangguh, disiplin, dan kesehatan fisik yang prima.' },
    { icon: '🏛️', title: 'Kurikulum Nasional', desc: 'Mengikuti standar Kurikulum Merdeka yang diperkaya dengan muatan keislaman dan adab sunnah.' },
    { icon: '🌐', title: 'Bahasa Arab & Inggris', desc: 'Pembelajaran bilingual untuk mempersiapkan siswa berkomunikasi di level internasional.' },
    { icon: '🤲', title: 'Adab & Akhlak', desc: "Pembinaan akhlak mulia dan adab Islami berdasarkan Al-Qur'an dan As-Sunnah dalam kehidupan sehari-hari." },
  ],
  sdit_schedule: [
    { icon: '🕖', time: '07:00 - 07:30', activity: 'Sholat Dhuha & Dzikir Pagi' },
    { icon: '📖', time: '07:30 - 09:00', activity: 'Program Tahfidz' },
    { icon: '📚', time: '09:00 - 11:30', activity: 'Pembelajaran Akademik' },
    { icon: '🕛', time: '12:00 - 13:00', activity: 'Sholat Dzuhur & Makan Siang' },
    { icon: '📝', time: '13:00 - 14:30', activity: "Pembelajaran / Muroja'ah" },
    { icon: '🕞', time: '15:00 - 16:00', activity: 'Sholat Ashar & Ekstrakulikuler' },
  ],
  smpsma_programs: [
    { icon: '📖', title: 'Tahfidz Intensif', desc: 'Target hafalan 30 Juz dengan bimbingan intensif. Program mutqin dan sanad untuk memastikan kualitas hafalan.' },
    { icon: '💼', title: 'Entrepreneur Program', desc: 'Business project, startup simulation, dan pelatihan kewirausahaan nyata yang mencetak pemuda mandiri.' },
    { icon: '🥋', title: 'Beladiri & Fisik', desc: 'Program pelatihan beladiri intensif, outbound, dan pembinaan mental leadership sesuai sunnah.' },
    { icon: '🎯', title: 'Persiapan Perguruan Tinggi', desc: 'Bimbingan belajar intensif untuk persiapan masuk universitas terbaik di Indonesia dan luar negeri.' },
    { icon: '🌍', title: 'Bahasa Asing', desc: 'Program trilingual — Bahasa Arab, Bahasa Inggris, dan Bahasa Indonesia yang mendalam dan terstruktur.' },
    { icon: '📡', title: 'Digital Literacy', desc: 'Pelatihan teknologi informasi dan literasi digital untuk mempersiapkan siswa menghadapi era digital.' },
  ],
  smpsma_schedule: [
    { icon: '🕖', time: '07:00 - 07:30', activity: 'Sholat Dhuha & Halaqoh Pagi' },
    { icon: '📖', time: '07:30 - 09:30', activity: 'Program Tahfidz Intensif' },
    { icon: '📚', time: '09:30 - 12:00', activity: 'Pembelajaran Akademik' },
    { icon: '🕛', time: '12:00 - 13:00', activity: 'Sholat Dzuhur & Makan Siang' },
    { icon: '📝', time: '13:00 - 15:00', activity: 'Pembelajaran / Praktikum' },
    { icon: '🕞', time: '15:00 - 16:30', activity: 'Sholat Ashar & Ekstrakulikuler' },
  ],
  gallery: [],
  calendar_events: [],
  chats: [],
};

// =============================================
// PRELOAD — call once on page init
// =============================================

/**
 * Preload all content from Supabase into memory cache.
 * Call this once on every page before rendering.
 * Falls back to localStorage cache, then to defaults.
 */
export async function preloadContent() {
  if (_cacheReady) return _cache;

  // 1. Try Supabase
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('content')
        .eq('id', SITE_CONTENT_ID)
        .single();

      if (!error && data && data.content) {
        _cache = mergeWithDefaults(data.content);
        _cacheReady = true;
        // Update localStorage cache for offline fallback
        saveToLocalStorage('site_content_cache', _cache);
        return _cache;
      }
    } catch (e) {
      console.warn('Supabase fetch failed, using fallback:', e);
    }
  }

  // 2. Fallback: localStorage cache
  const cached = getFromLocalStorage('site_content_cache', null);
  if (cached) {
    _cache = mergeWithDefaults(cached);
    _cacheReady = true;
    return _cache;
  }

  // 3. Final fallback: defaults
  _cache = JSON.parse(JSON.stringify(DEFAULT_CONTENT));
  _cacheReady = true;
  return _cache;
}

function mergeWithDefaults(stored) {
  const merged = JSON.parse(JSON.stringify(DEFAULT_CONTENT));
  for (const key of Object.keys(stored)) {
    if (stored[key] !== undefined && stored[key] !== null) {
      merged[key] = stored[key];
    }
  }
  return merged;
}

// =============================================
// SYNC CONTENT (read)
// =============================================

/**
 * Get content for a section. Returns from cache (sync).
 * preloadContent() must have been called first.
 */
export function getSiteContent(section) {
  if (!_cache) {
    // Not preloaded yet — return default
    return DEFAULT_CONTENT[section] || null;
  }
  return _cache[section] || DEFAULT_CONTENT[section] || null;
}

export function getAllSiteContent() {
  if (!_cache) return JSON.parse(JSON.stringify(DEFAULT_CONTENT));
  return JSON.parse(JSON.stringify(_cache));
}

export function getDefaultContent() {
  return JSON.parse(JSON.stringify(DEFAULT_CONTENT));
}

// =============================================
// SYNC CONTENT (write — admin only)
// =============================================

/**
 * Save a section to Supabase and update cache.
 * Returns true on success, false on failure.
 */
export async function saveSiteContent(section, data) {
  // Update local cache immediately
  if (!_cache) _cache = JSON.parse(JSON.stringify(DEFAULT_CONTENT));
  _cache[section] = data;

  // Save to localStorage as fallback
  saveToLocalStorage('site_content_cache', _cache);

  // Save to Supabase
  if (supabase) {
    try {
      const contentToSave = JSON.parse(JSON.stringify(_cache));
      const { error } = await supabase
        .from('site_content')
        .upsert({
          id: SITE_CONTENT_ID,
          content: contentToSave,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'id' });

      if (error) {
        console.error('Supabase save error:', error);
        return false;
      }
      return true;
    } catch (e) {
      console.error('Supabase save failed:', e);
      return false;
    }
  }
  return true; // saved to localStorage at minimum
}

/**
 * Save the full content object to Supabase.
 */
async function saveFullContent() {
  if (!_cache || !supabase) return false;
  try {
    const { error } = await supabase
      .from('site_content')
      .upsert({
        id: SITE_CONTENT_ID,
        content: JSON.parse(JSON.stringify(_cache)),
        updated_at: new Date().toISOString(),
      }, { onConflict: 'id' });

    if (error) {
      console.error('Supabase full save error:', error);
      return false;
    }
    return true;
  } catch (e) {
    console.error('Supabase full save failed:', e);
    return false;
  }
}

/**
 * Reset a content section to defaults and sync.
 */
export async function resetSiteContent(section) {
  if (!_cache) _cache = JSON.parse(JSON.stringify(DEFAULT_CONTENT));
  _cache[section] = JSON.parse(JSON.stringify(DEFAULT_CONTENT[section]));
  saveToLocalStorage('site_content_cache', _cache);
  return await saveFullContent();
}

// =============================================
// GALLERY
// =============================================

export function getGallery() {
  if (!_cache) return [];
  return _cache.gallery || [];
}

export async function saveGalleryItem(item) {
  if (!_cache) _cache = JSON.parse(JSON.stringify(DEFAULT_CONTENT));
  if (!_cache.gallery) _cache.gallery = [];

  if (item.id) {
    const idx = _cache.gallery.findIndex(g => g.id === item.id);
    if (idx !== -1) {
      _cache.gallery[idx] = { ..._cache.gallery[idx], ...item, updated_at: new Date().toISOString() };
    }
  } else {
    item.id = generateId();
    item.created_at = new Date().toISOString();
    item.updated_at = new Date().toISOString();
    _cache.gallery.push(item);
  }

  saveToLocalStorage('site_content_cache', _cache);
  await saveFullContent();
  return item;
}

export async function deleteGalleryItem(id) {
  if (!_cache || !_cache.gallery) return;
  _cache.gallery = _cache.gallery.filter(g => g.id !== id);
  saveToLocalStorage('site_content_cache', _cache);
  await saveFullContent();
}

// =============================================
// CALENDAR EVENTS
// =============================================

export function getCalendarEvents() {
  if (!_cache) return [];
  return _cache.calendar_events || [];
}

export async function saveCalendarEvent(event) {
  if (!_cache) _cache = JSON.parse(JSON.stringify(DEFAULT_CONTENT));
  if (!_cache.calendar_events) _cache.calendar_events = [];

  if (event.id) {
    const idx = _cache.calendar_events.findIndex(e => e.id === event.id);
    if (idx !== -1) {
      _cache.calendar_events[idx] = { ..._cache.calendar_events[idx], ...event };
    }
  } else {
    event.id = generateId();
    event.created_at = new Date().toISOString();
    _cache.calendar_events.push(event);
  }

  saveToLocalStorage('site_content_cache', _cache);
  await saveFullContent();
  return event;
}

export async function deleteCalendarEvent(id) {
  if (!_cache || !_cache.calendar_events) return;
  _cache.calendar_events = _cache.calendar_events.filter(e => e.id !== id);
  saveToLocalStorage('site_content_cache', _cache);
  await saveFullContent();
}

// =============================================
// CHAT MESSAGES
// =============================================

export function getChats() {
  if (!_cache) return [];
  return _cache.chats || [];
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

export async function addChatMessage(msg) {
  if (!_cache) _cache = JSON.parse(JSON.stringify(DEFAULT_CONTENT));
  if (!_cache.chats) _cache.chats = [];

  msg.id = generateId();
  msg.created_at = new Date().toISOString();
  msg.is_read = msg.sender === 'admin';
  _cache.chats.push(msg);

  saveToLocalStorage('site_content_cache', _cache);
  await saveFullContent();
  return msg;
}

export async function markChatRead(sessionId) {
  if (!_cache || !_cache.chats) return;
  _cache.chats.forEach(c => {
    if (c.session_id === sessionId && c.sender === 'visitor') {
      c.is_read = true;
    }
  });
  saveToLocalStorage('site_content_cache', _cache);
  await saveFullContent();
}

export function getUnreadCount() {
  return getChats().filter(c => !c.is_read && c.sender === 'visitor').length;
}

// =============================================
// ADMIN AUTH
// =============================================

const ADMIN_PASSWORD = 'abais2026';

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

// =============================================
// SEED INITIAL DATA
// =============================================

export async function seedInitialData() {
  // Preload content first — if Supabase has no ABAIS row, seed it
  await preloadContent();

  // Seed gallery if empty
  if (getGallery().length === 0) {
    const seedGallery = [
      { title: 'Kegiatan Tahfidz Pagi', description: 'Program hafalan Al-Quran rutin setiap pagi', image_url: '', category: 'tahfidz', unit: 'sdit' },
      { title: 'Market Day Entrepreneur', description: 'Siswa belajar berwirausaha di Market Day', image_url: '', category: 'entrepreneur', unit: 'sdit' },
      { title: 'Latihan Beladiri', description: 'Program beladiri untuk membentuk karakter tangguh', image_url: '', category: 'beladiri', unit: 'smp-sma' },
      { title: 'Upacara Bendera', description: 'Upacara rutin setiap hari Senin', image_url: '', category: 'umum', unit: 'smp-sma' },
    ];
    if (!_cache.gallery) _cache.gallery = [];
    seedGallery.forEach(item => {
      item.id = generateId();
      item.created_at = new Date().toISOString();
      item.updated_at = new Date().toISOString();
      _cache.gallery.push(item);
    });
  }

  // Seed calendar if empty
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
    if (!_cache.calendar_events) _cache.calendar_events = [];
    seedEvents.forEach(ev => {
      ev.id = generateId();
      ev.created_at = new Date().toISOString();
      _cache.calendar_events.push(ev);
    });
  }

  // Save seeded data
  saveToLocalStorage('site_content_cache', _cache);
  await saveFullContent();
}

/**
 * Refresh cache from Supabase (for admin polling)
 */
export async function refreshFromSupabase() {
  if (!supabase) return;
  try {
    const { data, error } = await supabase
      .from('site_content')
      .select('content')
      .eq('id', SITE_CONTENT_ID)
      .single();

    if (!error && data && data.content) {
      _cache = mergeWithDefaults(data.content);
      saveToLocalStorage('site_content_cache', _cache);
    }
  } catch (e) {
    console.warn('Supabase refresh failed:', e);
  }
}

// =============================================
// HELPERS
// =============================================

function getFromLocalStorage(key, fallback) {
  try {
    const data = localStorage.getItem(STORAGE_PREFIX + key);
    return data ? JSON.parse(data) : fallback;
  } catch { return fallback; }
}

function saveToLocalStorage(key, data) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
  } catch (e) {
    console.warn('localStorage save failed:', e);
  }
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}
