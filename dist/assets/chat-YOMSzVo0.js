import{b as E,c as m,d as M}from"./data-manager-B6icRUjF.js";const T="modulepreload",$=function(a){return"/"+a},p={},D=function(t,e,A){let g=Promise.resolve();if(e&&e.length>0){let l=function(i){return Promise.all(i.map(r=>Promise.resolve(r).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};document.getElementsByTagName("link");const n=document.querySelector("meta[property=csp-nonce]"),f=(n==null?void 0:n.nonce)||(n==null?void 0:n.getAttribute("nonce"));g=l(e.map(i=>{if(i=$(i),i in p)return;p[i]=!0;const r=i.endsWith(".css"),h=r?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${i}"]${h}`))return;const o=document.createElement("link");if(o.rel=r?"stylesheet":T,r||(o.as="script"),o.crossOrigin="",o.href=i,f&&o.setAttribute("nonce",f),document.head.appendChild(o),r)return new Promise((I,C)=>{o.addEventListener("load",I),o.addEventListener("error",()=>C(new Error(`Unable to preload CSS for ${i}`)))})}))}function v(l){const n=new Event("vite:preloadError",{cancelable:!0});if(n.payload=l,window.dispatchEvent(n),!n.defaultPrevented)throw l}return g.then(l=>{for(const n of l||[])n.status==="rejected"&&v(n.reason);return t().catch(v)})},w="6285656117777",k="Assalamu'alaikum, saya ingin bertanya tentang ABAIS",L="https://maps.app.goo.gl/FAqK1fr4AahSeuH87";function P(a=""){const t=E(),e=t>0?`<span class="chat-badge">${t}</span>`:"";return`
  <nav class="navbar navbar--transparent" id="navbar">
    <div class="navbar__inner">
      <a href="/" class="navbar__logo">
        <img src="/assets/images/logo.png" alt="Logo ABAIS" />
        <div class="navbar__logo-text">ABAIS<span>Islamic School</span></div>
      </a>
      <div class="navbar__menu" id="navMenu">
        <a href="/" class="navbar__link ${a==="home"?"navbar__link--active":""}" data-i18n="nav.home">Beranda</a>
        <a href="/about.html" class="navbar__link ${a==="about"?"navbar__link--active":""}" data-i18n="nav.about">Tentang Kami</a>
        <div class="navbar__dropdown">
          <a class="navbar__link navbar__link--dropdown ${["sdit","smp-sma"].includes(a)?"navbar__link--active":""}" data-i18n="nav.unit">
            Unit Sekolah
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M6 9l6 6 6-6"/></svg>
          </a>
          <div class="navbar__dropdown-menu">
            <a href="/sdit.html" class="navbar__dropdown-link">
              <span class="navbar__dropdown-icon">🏫</span>
              <div>
                <strong>SDIT</strong>
                <small>Sekolah Dasar Islam Terpadu</small>
              </div>
            </a>
            <a href="/smp-sma.html" class="navbar__dropdown-link">
              <span class="navbar__dropdown-icon">🎓</span>
              <div>
                <strong>SMP — SMA</strong>
                <small>Sekolah Menengah Islam</small>
              </div>
            </a>
          </div>
        </div>
        <a href="/gallery.html" class="navbar__link ${a==="gallery"?"navbar__link--active":""}" data-i18n="nav.gallery">Galeri</a>
        <a href="/calendar.html" class="navbar__link ${a==="calendar"?"navbar__link--active":""}" data-i18n="nav.calendar">Kalender</a>
        <a href="/contact.html" class="navbar__link ${a==="contact"?"navbar__link--active":""}" data-i18n="nav.contact">Kontak</a>
      </div>
      <div class="navbar__actions">
        <button class="navbar__chat-btn" id="chatToggleBtn" aria-label="Live Chat">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          ${e}
        </button>
        <div class="lang-toggle" id="langToggle">
          <button class="lang-toggle__btn lang-toggle__btn--active" data-lang="id">ID</button>
          <button class="lang-toggle__btn" data-lang="en">EN</button>
        </div>
        <button class="navbar__hamburger" id="hamburger" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </nav>
  <div class="mobile-menu" id="mobileMenu">
    <a href="/" class="mobile-menu__link" data-i18n="nav.home">Beranda</a>
    <a href="/about.html" class="mobile-menu__link" data-i18n="nav.about">Tentang Kami</a>
    <div class="mobile-menu__group">
      <span class="mobile-menu__label">Unit Sekolah</span>
      <a href="/sdit.html" class="mobile-menu__link mobile-menu__link--sub">🏫 SDIT</a>
      <a href="/smp-sma.html" class="mobile-menu__link mobile-menu__link--sub">🎓 SMP — SMA</a>
    </div>
    <a href="/gallery.html" class="mobile-menu__link" data-i18n="nav.gallery">Galeri</a>
    <a href="/calendar.html" class="mobile-menu__link" data-i18n="nav.calendar">Kalender</a>
    <a href="/contact.html" class="mobile-menu__link" data-i18n="nav.contact">Kontak</a>
    <a href="https://wa.me/${w}?text=${encodeURIComponent(k)}" target="_blank" class="mobile-menu__wa">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      <span>Hubungi via WhatsApp</span>
    </a>
  </div>`}function R(){return`
  <div class="wa-float" id="waFloat">
    <span class="wa-float__tooltip" data-i18n="wa.tooltip">Chat Admin</span>
    <a href="https://wa.me/${w}?text=${encodeURIComponent(k)}" target="_blank" class="wa-float__btn" aria-label="WhatsApp">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
    </a>
  </div>`}function j(){return`
  <footer class="footer" id="footer">
    <div class="container">
      <div class="footer__grid">
        <div class="footer__brand">
          <div class="footer__logo">
            <img src="/assets/images/logo.png" alt="Logo ABAIS" />
            <span class="footer__logo-name">Abdurrahman Bin Auf<br/>Islamic School</span>
          </div>
          <p class="footer__tagline" data-i18n="footer.tagline">Sekolah Sunnah Fullday — Tahfidz, Entrepreneur, Beladiri. Mendidik generasi Qur'ani berakhlak mulia di Kota Bogor.</p>
          <div class="footer__social">
            <a href="https://www.instagram.com/abais.bogor/" target="_blank" class="footer__social-link" aria-label="Instagram"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
            <a href="https://www.facebook.com/sekolahsunnahbogor" target="_blank" class="footer__social-link" aria-label="Facebook"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.513c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.738-.9 10.125-5.864 10.125-11.854z"/></svg></a>
          </div>
        </div>
        <div>
          <h4 class="footer__heading" data-i18n="footer.links">Navigasi</h4>
          <div class="footer__links">
            <a href="/" class="footer__link">Beranda</a>
            <a href="/about.html" class="footer__link">Tentang Kami</a>
            <a href="/sdit.html" class="footer__link">SDIT</a>
            <a href="/smp-sma.html" class="footer__link">SMP-SMA</a>
            <a href="/gallery.html" class="footer__link">Galeri</a>
            <a href="/calendar.html" class="footer__link">Kalender</a>
          </div>
        </div>
        <div>
          <h4 class="footer__heading" data-i18n="footer.programs">Program</h4>
          <div class="footer__links">
            <span class="footer__link">Tahfidz Al-Qur'an</span>
            <span class="footer__link">Entrepreneur</span>
            <span class="footer__link">Beladiri</span>
            <span class="footer__link">Fullday School</span>
          </div>
        </div>
        <div>
          <h4 class="footer__heading">Kontak</h4>
          <div class="footer__links">
            <div class="footer__contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <a href="${L}" target="_blank" style="color:inherit;">Bogor, Jawa Barat</a>
            </div>
            <div class="footer__contact-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <a href="tel:+6285656117777" style="color:inherit;">0856-5611-7777</a>
            </div>
          </div>
        </div>
      </div>
      <div class="footer__bottom"><p>© ${new Date().getFullYear()} Abdurrahman Bin Auf Islamic School. All rights reserved.</p></div>
    </div>
  </footer>`}let c=!1,d=null,s="";function q(){d=localStorage.getItem("abais_chat_session")||x(),s=localStorage.getItem("abais_chat_name")||"",localStorage.setItem("abais_chat_session",d),z(),K()}function x(){return"v_"+Date.now().toString(36)+Math.random().toString(36).substr(2,6)}function z(){const a=document.createElement("div");a.id="chatWidget",a.className="chat-widget",a.innerHTML=`
    <div class="chat-widget__window ${c?"chat-widget__window--open":""}" id="chatWindow">
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
        ${s?y():S()}
      </div>

      ${s?`
      <div class="chat-widget__footer" id="chatFooter">
        <input type="text" class="chat-widget__input" id="chatInput" placeholder="Ketik pesan..." />
        <button class="chat-widget__send" id="chatSend">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>`:""}
    </div>
  `,document.body.appendChild(a);const t=document.getElementById("chatToggleBtn");t&&t.addEventListener("click",()=>B())}function S(){return`
    <div class="chat-widget__welcome">
      <div class="chat-widget__welcome-icon">💬</div>
      <h4>Assalamu'alaikum!</h4>
      <p>Selamat datang di ABAIS. Silakan masukkan nama Anda untuk memulai chat.</p>
      <div class="chat-widget__name-form">
        <input type="text" id="chatNameInput" class="chat-widget__input" placeholder="Nama Anda..." />
        <button id="chatStartBtn" class="chat-widget__start-btn">Mulai Chat</button>
      </div>
    </div>`}function y(){const a=m().filter(t=>t.session_id===d);return a.length===0?`
      <div class="chat-widget__message chat-widget__message--admin">
        <div class="chat-widget__bubble">Assalamu'alaikum ${s}! 👋 Ada yang bisa kami bantu?</div>
        <div class="chat-widget__time">Admin ABAIS</div>
      </div>`:a.map(t=>`
    <div class="chat-widget__message chat-widget__message--${t.sender}">
      <div class="chat-widget__bubble">${W(t.message)}</div>
      <div class="chat-widget__time">${N(t.created_at)}</div>
    </div>
  `).join("")}function K(){document.addEventListener("click",a=>{if(a.target.closest("#chatClose")&&B(!1),a.target.closest("#chatStartBtn")){const t=document.getElementById("chatNameInput");t&&t.value.trim()&&(s=t.value.trim(),localStorage.setItem("abais_chat_name",s),_())}a.target.closest("#chatSend")&&b()}),document.addEventListener("keydown",a=>{var t;a.key==="Enter"&&a.target.id==="chatInput"&&b(),a.key==="Enter"&&a.target.id==="chatNameInput"&&((t=document.getElementById("chatStartBtn"))==null||t.click())}),window.addEventListener("storage",a=>{a.key==="abais_chats"&&_()}),F()}function b(){const a=document.getElementById("chatInput");!a||!a.value.trim()||(M({session_id:d,visitor_name:s,message:a.value.trim(),sender:"visitor"}),a.value="",_(),u())}function _(){const a=document.getElementById("chatBody"),t=document.getElementById("chatWindow");if(!a)return;a.innerHTML=s?y():S();const e=document.getElementById("chatFooter");s&&!e&&t&&t.insertAdjacentHTML("beforeend",`
      <div class="chat-widget__footer" id="chatFooter">
        <input type="text" class="chat-widget__input" id="chatInput" placeholder="Ketik pesan..." />
        <button class="chat-widget__send" id="chatSend">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>`),u()}function B(a){c=a!==void 0?a:!c;const t=document.getElementById("chatWindow");t&&t.classList.toggle("chat-widget__window--open",c),c&&(u(),setTimeout(()=>{var e;return(e=document.getElementById("chatInput"))==null?void 0:e.focus()},300))}function F(){let a=m().filter(t=>t.session_id===d).length;setInterval(()=>{const t=m().filter(e=>e.session_id===d).length;t!==a&&(a=t,_(),c||H())},2e3)}function H(){try{const a=new(window.AudioContext||window.webkitAudioContext),t=a.createOscillator(),e=a.createGain();t.connect(e),e.connect(a.destination),t.frequency.value=800,e.gain.value=.1,t.start(),setTimeout(()=>{t.frequency.value=1e3},100),setTimeout(()=>{t.stop(),a.close()},200)}catch{}}function u(){setTimeout(()=>{const a=document.getElementById("chatBody");a&&(a.scrollTop=a.scrollHeight)},50)}function N(a){return new Date(a).toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit"})}function W(a){const t=document.createElement("div");return t.textContent=a,t.innerHTML}export{D as _,j as a,R as b,P as g,q as i};
