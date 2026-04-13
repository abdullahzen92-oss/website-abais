/* =============================================
   ABAIS Form Validation & WhatsApp Redirect
   ============================================= */

export function initForm() {
  const form = document.getElementById('ppdbForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate
    if (!validateForm(form)) return;

    // Collect data
    const data = new FormData(form);
    const namaAnak = data.get('namaAnak') || '';
    const tempatLahir = data.get('tempatLahir') || '';
    const jenisKelamin = data.get('jenisKelamin') || '';
    const asalSekolah = data.get('asalSekolah') || '-';
    const namaOrtu = data.get('namaOrtu') || '';
    const noHP = data.get('noHP') || '';
    const email = data.get('email') || '-';
    const pesan = data.get('pesan') || '-';

    // Build WhatsApp message
    const message = `Assalamu'alaikum warahmatullahi wabarakatuh.

Saya ingin mendaftarkan anak saya ke ABAIS (PPDB 2026/2027).

📋 *DATA PENDAFTARAN*
━━━━━━━━━━━━━━━━
👤 *Nama Anak:* ${namaAnak}
📅 *TTL:* ${tempatLahir}
⚧ *Jenis Kelamin:* ${jenisKelamin}
🏫 *Asal Sekolah:* ${asalSekolah}

👨‍👩‍👧 *DATA ORANG TUA*
━━━━━━━━━━━━━━━━
👤 *Nama Ortu/Wali:* ${namaOrtu}
📱 *No. HP:* ${noHP}
📧 *Email:* ${email}

💬 *Pesan:* ${pesan}

Mohon informasi selanjutnya. Jazakumullahu khairan.`;

    // Encode for WhatsApp
    const waNumber = '6285656117777';
    const encodedMessage = encodeURIComponent(message);
    const waURL = `https://wa.me/${waNumber}?text=${encodedMessage}`;

    // Show success feedback
    showSuccessMessage(form);

    // Open WhatsApp
    setTimeout(() => {
      window.open(waURL, '_blank');
    }, 1000);
  });
}

function validateForm(form) {
  let isValid = true;
  const requiredFields = form.querySelectorAll('[required]');

  requiredFields.forEach(field => {
    // Clear previous errors
    field.classList.remove('form-input--error');

    if (!field.value.trim()) {
      field.classList.add('form-input--error');
      isValid = false;
    }

    // Phone validation
    if (field.type === 'tel' && field.value.trim()) {
      const phoneRegex = /^(?:\+62|62|0)[0-9]{8,13}$/;
      if (!phoneRegex.test(field.value.replace(/[\s-]/g, ''))) {
        field.classList.add('form-input--error');
        isValid = false;
      }
    }
  });

  return isValid;
}

function showSuccessMessage(form) {
  const btn = form.querySelector('button[type="submit"]');
  const originalHTML = btn.innerHTML;

  btn.innerHTML = '✅ Mengarahkan ke WhatsApp...';
  btn.style.background = 'var(--clr-success)';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = originalHTML;
    btn.style.background = '';
    btn.disabled = false;
    form.reset();
  }, 3000);
}
