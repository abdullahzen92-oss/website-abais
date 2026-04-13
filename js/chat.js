/* =============================================
   ABAIS Live Chat Widget
   Floating chat bubble for visitors
   ============================================= */
import { addChatMessage, getChats } from './data-manager.js';

let chatOpen = false;
let sessionId = null;
let visitorName = '';
let pollInterval = null;

export function initChat() {
  // Get or create session
  sessionId = localStorage.getItem('abais_chat_session') || generateSessionId();
  visitorName = localStorage.getItem('abais_chat_name') || '';
  localStorage.setItem('abais_chat_session', sessionId);

  injectChatWidget();
  setupEventListeners();
}

function generateSessionId() {
  return 'v_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 6);
}

function injectChatWidget() {
  const widget = document.createElement('div');
  widget.id = 'chatWidget';
  widget.className = 'chat-widget';
  widget.innerHTML = `
    <div class="chat-widget__window ${chatOpen ? 'chat-widget__window--open' : ''}" id="chatWindow">
      <div class="chat-widget__header">
        <div class="chat-widget__header-info">
          <div class="chat-widget__avatar">
            <img src="/assets/images/logo.png" alt="ABAIS" />
          </div>
          <div>
            <div class="chat-widget__title">ABAIS Support</div>
            <div class="chat-widget__status">
              <span class="chat-widget__status-dot"></span>
              Online
            </div>
          </div>
        </div>
        <button class="chat-widget__close" id="chatClose">✕</button>
      </div>

      <div class="chat-widget__body" id="chatBody">
        ${visitorName ? renderMessages() : renderNameForm()}
      </div>

      ${visitorName ? `
      <div class="chat-widget__footer" id="chatFooter">
        <input type="text" class="chat-widget__input" id="chatInput" placeholder="Ketik pesan..." />
        <button class="chat-widget__send" id="chatSend">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>` : ''}
    </div>
  `;
  document.body.appendChild(widget);

  // Connect toggle button
  const toggleBtn = document.getElementById('chatToggleBtn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => toggleChat());
  }
}

function renderNameForm() {
  return `
    <div class="chat-widget__welcome">
      <div class="chat-widget__welcome-icon">💬</div>
      <h4>Assalamu'alaikum!</h4>
      <p>Selamat datang di ABAIS. Silakan masukkan nama Anda untuk memulai chat.</p>
      <div class="chat-widget__name-form">
        <input type="text" id="chatNameInput" class="chat-widget__input" placeholder="Nama Anda..." />
        <button id="chatStartBtn" class="chat-widget__start-btn">Mulai Chat</button>
      </div>
    </div>`;
}

function renderMessages() {
  const myChats = getChats().filter(c => c.session_id === sessionId);
  if (myChats.length === 0) {
    return `
      <div class="chat-widget__message chat-widget__message--admin">
        <div class="chat-widget__bubble">Assalamu'alaikum ${visitorName}! 👋 Ada yang bisa kami bantu?</div>
        <div class="chat-widget__time">Admin ABAIS</div>
      </div>`;
  }
  return myChats.map(c => `
    <div class="chat-widget__message chat-widget__message--${c.sender}">
      <div class="chat-widget__bubble">${escapeHtml(c.message)}</div>
      <div class="chat-widget__time">${formatTime(c.created_at)}</div>
    </div>
  `).join('');
}

function setupEventListeners() {
  document.addEventListener('click', (e) => {
    // Close button
    if (e.target.closest('#chatClose')) {
      toggleChat(false);
    }

    // Start chat button
    if (e.target.closest('#chatStartBtn')) {
      const nameInput = document.getElementById('chatNameInput');
      if (nameInput && nameInput.value.trim()) {
        visitorName = nameInput.value.trim();
        localStorage.setItem('abais_chat_name', visitorName);
        refreshChatBody();
      }
    }

    // Send button
    if (e.target.closest('#chatSend')) {
      sendMessage();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.id === 'chatInput') {
      sendMessage();
    }
    if (e.key === 'Enter' && e.target.id === 'chatNameInput') {
      document.getElementById('chatStartBtn')?.click();
    }
  });

  // Listen for data changes (admin replies)
  window.addEventListener('storage', (e) => {
    if (e.key === 'abais_chats') {
      refreshChatBody();
    }
  });

  // Poll for new messages every 3 seconds
  startPolling();
}

function sendMessage() {
  const input = document.getElementById('chatInput');
  if (!input || !input.value.trim()) return;

  addChatMessage({
    session_id: sessionId,
    visitor_name: visitorName,
    message: input.value.trim(),
    sender: 'visitor',
  });

  input.value = '';
  refreshChatBody();
  scrollToBottom();
}

function refreshChatBody() {
  const body = document.getElementById('chatBody');
  const window_ = document.getElementById('chatWindow');
  if (!body) return;

  body.innerHTML = visitorName ? renderMessages() : renderNameForm();

  // Re-add footer if needed
  const footer = document.getElementById('chatFooter');
  if (visitorName && !footer) {
    const footerHtml = `
      <div class="chat-widget__footer" id="chatFooter">
        <input type="text" class="chat-widget__input" id="chatInput" placeholder="Ketik pesan..." />
        <button class="chat-widget__send" id="chatSend">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>`;
    if (window_) window_.insertAdjacentHTML('beforeend', footerHtml);
  }

  scrollToBottom();
}

function toggleChat(force) {
  chatOpen = force !== undefined ? force : !chatOpen;
  const window_ = document.getElementById('chatWindow');
  if (window_) {
    window_.classList.toggle('chat-widget__window--open', chatOpen);
  }
  if (chatOpen) {
    scrollToBottom();
    setTimeout(() => document.getElementById('chatInput')?.focus(), 300);
  }
}

function startPolling() {
  let lastCount = getChats().filter(c => c.session_id === sessionId).length;
  pollInterval = setInterval(() => {
    const current = getChats().filter(c => c.session_id === sessionId).length;
    if (current !== lastCount) {
      lastCount = current;
      refreshChatBody();
      // Play notification if chat is closed and new admin message
      if (!chatOpen) {
        playNotification();
      }
    }
  }, 2000);
}

function playNotification() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 800;
    gain.gain.value = 0.1;
    osc.start();
    setTimeout(() => { osc.frequency.value = 1000; }, 100);
    setTimeout(() => { osc.stop(); ctx.close(); }, 200);
  } catch {}
}

function scrollToBottom() {
  setTimeout(() => {
    const body = document.getElementById('chatBody');
    if (body) body.scrollTop = body.scrollHeight;
  }, 50);
}

function formatTime(iso) {
  const d = new Date(iso);
  return d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}

function escapeHtml(text) {
  const el = document.createElement('div');
  el.textContent = text;
  return el.innerHTML;
}
