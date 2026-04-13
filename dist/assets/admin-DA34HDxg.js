import{i as x,f as M,h as C,j as L,a as p,b as y,k as b,l as o,r as S,m as U,n as A,o as N,d as H,e as q,p as G,q as P}from"./data-manager-CG9Brrkb.js";x()&&h();document.getElementById("loginForm").addEventListener("submit",t=>{t.preventDefault(),M(document.getElementById("loginPassword").value)?h():document.getElementById("loginError").style.display="block"});document.getElementById("logoutBtn").addEventListener("click",()=>{C(),location.reload()});function h(){document.getElementById("loginScreen").style.display="none",document.getElementById("adminPanel").style.display="flex",k(),z()}document.querySelectorAll(".admin__nav-btn").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".admin__nav-btn").forEach(e=>e.classList.remove("admin__nav-btn--active")),t.classList.add("admin__nav-btn--active"),document.querySelectorAll(".admin__tab").forEach(e=>e.style.display="none"),document.getElementById("tab-"+t.dataset.tab).style.display="block"})});function k(){const t=L();j(t),D(t),K(t),W(t),_(),E(),f(),document.getElementById("statGallery").textContent=p().length,document.getElementById("statEvents").textContent=y().length,document.getElementById("statChats").textContent=b().length,document.getElementById("statTestimonials").textContent=(t.testimonials||[]).length}function j(t){const e=t.hero||{};document.getElementById("heroBadge").value=e.badge||"",document.getElementById("heroTitle1").value=e.title1||"",document.getElementById("heroTitle2").value=e.title2||"",document.getElementById("heroSubtitle").value=e.subtitle||"",document.getElementById("heroCta1").value=e.cta1||"",document.getElementById("heroImageUrl").value=e.image||"",r("heroImagePreview",e.image);const n=t.features||[];document.getElementById("featuresEditor").innerHTML=n.map((l,u)=>`
        <div class="admin__form-row admin__repeat-item" style="align-items:end;">
          <div class="admin__form-group" style="max-width:60px;"><label>Ikon</label><input class="form-input feat-icon" value="${l.icon}" maxlength="4" /></div>
          <div class="admin__form-group"><label>Judul</label><input class="form-input feat-title" value="${i(l.title)}" /></div>
          <div class="admin__form-group" style="flex:2;"><label>Deskripsi</label><input class="form-input feat-desc" value="${i(l.desc)}" /></div>
        </div>
      `).join("");const a=t.counters||[];document.getElementById("countersEditor").innerHTML=a.map((l,u)=>`
        <div class="admin__form-row admin__repeat-item">
          <div class="admin__form-group"><label>Angka</label><input type="number" class="form-input ctr-num" value="${l.number}" /></div>
          <div class="admin__form-group"><label>Label</label><input class="form-input ctr-label" value="${i(l.label)}" /></div>
        </div>
      `).join(""),F(t.testimonials||[])}function F(t){document.getElementById("testimoniEditor").innerHTML=t.map((e,n)=>`
        <div class="admin__repeat-item admin__section" style="background:var(--admin-surface-2);padding:1rem;border-radius:12px;margin-bottom:0.5rem;">
          <div class="admin__form-row" style="align-items:end;">
            <div class="admin__form-group"><label>Nama</label><input class="form-input testi-name" value="${i(e.name)}" /></div>
            <div class="admin__form-group"><label>Role</label><input class="form-input testi-role" value="${i(e.role)}" /></div>
            <button class="btn btn--ghost btn--sm" style="color:var(--admin-danger);margin-bottom:0.3rem;" onclick="this.closest('.admin__repeat-item').remove()">🗑️</button>
          </div>
          <div class="admin__form-group"><label>Teks Testimoni</label><textarea class="form-input testi-text" rows="2">${s(e.text)}</textarea></div>
        </div>
      `).join("")}document.getElementById("addTestimoniBtn").addEventListener("click",()=>{document.getElementById("testimoniEditor").insertAdjacentHTML("beforeend",`
        <div class="admin__repeat-item admin__section" style="background:var(--admin-surface-2);padding:1rem;border-radius:12px;margin-bottom:0.5rem;">
          <div class="admin__form-row" style="align-items:end;">
            <div class="admin__form-group"><label>Nama</label><input class="form-input testi-name" value="" /></div>
            <div class="admin__form-group"><label>Role</label><input class="form-input testi-role" value="" /></div>
            <button class="btn btn--ghost btn--sm" style="color:var(--admin-danger);margin-bottom:0.3rem;" onclick="this.closest('.admin__repeat-item').remove()">🗑️</button>
          </div>
          <div class="admin__form-group"><label>Teks Testimoni</label><textarea class="form-input testi-text" rows="2"></textarea></div>
        </div>
      `)});document.getElementById("saveHeroBtn").addEventListener("click",()=>{o("hero",{badge:document.getElementById("heroBadge").value,title1:document.getElementById("heroTitle1").value,title2:document.getElementById("heroTitle2").value,subtitle:document.getElementById("heroSubtitle").value,cta1:document.getElementById("heroCta1").value,cta2:document.getElementById("heroCta1").value,image:document.getElementById("heroImageUrl").value});const t=[...document.querySelectorAll("#featuresEditor .admin__repeat-item")].map(a=>({icon:a.querySelector(".feat-icon").value,title:a.querySelector(".feat-title").value,desc:a.querySelector(".feat-desc").value}));o("features",t);const e=[...document.querySelectorAll("#countersEditor .admin__repeat-item")].map(a=>({number:parseInt(a.querySelector(".ctr-num").value)||0,label:a.querySelector(".ctr-label").value}));o("counters",e);const n=[...document.querySelectorAll("#testimoniEditor .admin__repeat-item")].map(a=>({name:a.querySelector(".testi-name").value,role:a.querySelector(".testi-role").value,text:a.querySelector(".testi-text").value}));o("testimonials",n),m("✅ Beranda berhasil disimpan!")});c("heroImageFile","heroImageUrl","heroImagePreview");c("principalImageFile","principalImageUrl","principalImagePreview");c("logoFile","logoUrl","logoPreview");function D(t){const e=t.about||{};document.getElementById("aboutVision").value=e.vision||"",document.getElementById("principalName").value=e.principalName||"",document.getElementById("principalMessage").value=e.principalMessage||"",document.getElementById("principalImageUrl").value=e.principalImage||"",r("principalImagePreview",e.principalImage);const n=e.mission||[];R(n)}function R(t){document.getElementById("missionEditor").innerHTML=t.map((e,n)=>`
        <div class="admin__form-row admin__repeat-item" style="align-items:center;">
          <div class="admin__form-group" style="flex:1;"><input class="form-input mission-item" value="${i(e)}" /></div>
          <button class="btn btn--ghost btn--sm" style="color:var(--admin-danger);" onclick="this.closest('.admin__repeat-item').remove()">🗑️</button>
        </div>
      `).join("")}document.getElementById("addMissionBtn").addEventListener("click",()=>{document.getElementById("missionEditor").insertAdjacentHTML("beforeend",`
        <div class="admin__form-row admin__repeat-item" style="align-items:center;">
          <div class="admin__form-group" style="flex:1;"><input class="form-input mission-item" value="" placeholder="Misi baru..." /></div>
          <button class="btn btn--ghost btn--sm" style="color:var(--admin-danger);" onclick="this.closest('.admin__repeat-item').remove()">🗑️</button>
        </div>
      `)});document.getElementById("savePageBtn").addEventListener("click",()=>{o("about",{vision:document.getElementById("aboutVision").value,principalName:document.getElementById("principalName").value,principalMessage:document.getElementById("principalMessage").value,principalImage:document.getElementById("principalImageUrl").value,mission:[...document.querySelectorAll("#missionEditor .mission-item")].map(t=>t.value).filter(t=>t.trim())}),m("✅ Halaman berhasil disimpan!")});function K(t){const e=t.contact||{};document.getElementById("ctWaNumber").value=e.waNumber||"",document.getElementById("ctWaNumberSdit").value=e.waNumberSdit||"",document.getElementById("ctWaMessage").value=e.waMessage||"",document.getElementById("ctAddress").value=e.address||"",document.getElementById("ctMapsUrl").value=e.mapsUrl||"",document.getElementById("ctEmail").value=e.email||"",document.getElementById("ctInstagram").value=e.instagram||"",document.getElementById("ctFacebook").value=e.facebook||""}document.getElementById("saveContactBtn").addEventListener("click",()=>{o("contact",{waNumber:document.getElementById("ctWaNumber").value,waNumberSdit:document.getElementById("ctWaNumberSdit").value,waMessage:document.getElementById("ctWaMessage").value,address:document.getElementById("ctAddress").value,mapsUrl:document.getElementById("ctMapsUrl").value,email:document.getElementById("ctEmail").value,instagram:document.getElementById("ctInstagram").value,facebook:document.getElementById("ctFacebook").value}),m("✅ Kontak & Footer berhasil disimpan!")});function W(t){const e=t.settings||{};document.getElementById("stName").value=e.schoolName||"",document.getElementById("stFullName").value=e.schoolFullName||"",document.getElementById("stTagline").value=e.tagline||"",document.getElementById("logoUrl").value=e.logo||"",r("logoPreview",e.logo)}document.getElementById("saveSettingsBtn").addEventListener("click",()=>{o("settings",{schoolName:document.getElementById("stName").value,schoolFullName:document.getElementById("stFullName").value,tagline:document.getElementById("stTagline").value,logo:document.getElementById("logoUrl").value}),m("✅ Pengaturan berhasil disimpan!")});document.getElementById("resetContentBtn").addEventListener("click",()=>{confirm("Yakin ingin reset semua konten ke default? Tidak bisa di-undo.")&&(["hero","features","counters","testimonials","about","contact","settings"].forEach(t=>S(t)),k(),m("🔄 Konten direset ke default."))});function _(){const t=p();document.getElementById("galleryTbody").innerHTML=t.length===0?'<tr><td colspan="5" style="text-align:center;color:var(--admin-text-dim);padding:2rem;">Belum ada foto di galeri.</td></tr>':t.map(e=>`
        <tr>
          <td>${e.image_url?`<img src="${e.image_url}" style="width:48px;height:48px;object-fit:cover;border-radius:8px;" />`:'<div style="width:48px;height:48px;background:var(--admin-surface-2);border-radius:8px;display:flex;align-items:center;justify-content:center;">📷</div>'}</td>
          <td><strong>${s(e.title)}</strong><br/><small style="color:var(--admin-text-dim)">${s(e.description||"")}</small></td>
          <td><span class="admin__badge-unit">${(e.unit||"").toUpperCase()}</span></td>
          <td>${e.category}</td>
          <td>
            <button class="btn btn--sm btn--outline" onclick="editGallery('${e.id}')">Edit</button>
            <button class="btn btn--sm btn--ghost" style="color:var(--admin-danger);" onclick="delGallery('${e.id}')">Hapus</button>
          </td>
        </tr>
      `).join("")}window.editGallery=t=>{const e=t?p().find(n=>n.id===t):{};T("Galeri",`
        <div class="admin__form-group"><label>Judul</label><input class="form-input" id="mTitle" value="${i(e.title||"")}" /></div>
        <div class="admin__form-group"><label>Deskripsi</label><input class="form-input" id="mDesc" value="${i(e.description||"")}" /></div>
        <div class="admin__form-group">
          <label>Gambar</label>
          <div class="admin__img-upload">
            <img id="mGalleryPreview" src="${e.image_url||""}" alt="" class="admin__img-preview" style="${e.image_url?"":"display:none;"}" />
            <div class="admin__img-actions">
              <input type="url" class="form-input" id="mImg" value="${i(e.image_url||"")}" placeholder="Paste URL..." />
              <label class="btn btn--outline btn--sm"><input type="file" accept="image/*" id="mGalleryFile" style="display:none;" />📁 Upload</label>
            </div>
          </div>
        </div>
        <div class="admin__form-row">
          <div class="admin__form-group"><label>Unit</label>
            <select class="form-select" id="mUnit"><option value="sdit" ${e.unit==="sdit"?"selected":""}>SDIT</option><option value="smp-sma" ${e.unit==="smp-sma"?"selected":""}>SMP-SMA</option></select>
          </div>
          <div class="admin__form-group"><label>Kategori</label>
            <select class="form-select" id="mCat"><option value="tahfidz" ${e.category==="tahfidz"?"selected":""}>Tahfidz</option><option value="entrepreneur" ${e.category==="entrepreneur"?"selected":""}>Entrepreneur</option><option value="beladiri" ${e.category==="beladiri"?"selected":""}>Beladiri</option><option value="umum" ${e.category==="umum"?"selected":""}>Umum</option></select>
          </div>
        </div>
      `,()=>{G({...t?{id:t}:{},title:document.getElementById("mTitle").value,description:document.getElementById("mDesc").value,image_url:document.getElementById("mImg").value,unit:document.getElementById("mUnit").value,category:document.getElementById("mCat").value}),closeModal(),_(),m("✅ Item galeri disimpan.")}),setTimeout(()=>c("mGalleryFile","mImg","mGalleryPreview"),100)};window.delGallery=t=>{confirm("Hapus?")&&(U(t),_())};document.getElementById("addGalleryBtn").addEventListener("click",()=>window.editGallery(null));function E(){const t=y();document.getElementById("calendarTbody").innerHTML=t.length===0?'<tr><td colspan="5" style="text-align:center;color:var(--admin-text-dim);padding:2rem;">Belum ada event.</td></tr>':t.map(e=>`
        <tr>
          <td><strong>${s(e.title)}</strong></td>
          <td>${e.event_date}${e.end_date?" — "+e.end_date:""}</td>
          <td><span class="admin__badge-unit">${(e.unit||"").toUpperCase()}</span></td>
          <td><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${e.color||"#2B8FBD"};margin-right:4px;vertical-align:middle;"></span>${e.category}</td>
          <td>
            <button class="btn btn--sm btn--outline" onclick="editCalendar('${e.id}')">Edit</button>
            <button class="btn btn--sm btn--ghost" style="color:var(--admin-danger);" onclick="delCalendar('${e.id}')">Hapus</button>
          </td>
        </tr>
      `).join("")}window.editCalendar=t=>{const e=t?y().find(n=>n.id===t):{};T("Event Kalender",`
        <div class="admin__form-group"><label>Judul</label><input class="form-input" id="mEvTitle" value="${i(e.title||"")}" /></div>
        <div class="admin__form-row">
          <div class="admin__form-group"><label>Tanggal Mulai</label><input type="date" class="form-input" id="mEvDate" value="${e.event_date||""}" /></div>
          <div class="admin__form-group"><label>Tanggal Selesai</label><input type="date" class="form-input" id="mEvEnd" value="${e.end_date||""}" /></div>
        </div>
        <div class="admin__form-row">
          <div class="admin__form-group"><label>Unit</label>
            <select class="form-select" id="mEvUnit"><option value="sdit" ${e.unit==="sdit"?"selected":""}>SDIT</option><option value="smp-sma" ${e.unit==="smp-sma"?"selected":""}>SMP-SMA</option></select>
          </div>
          <div class="admin__form-group"><label>Kategori</label>
            <select class="form-select" id="mEvCat"><option value="akademik" ${e.category==="akademik"?"selected":""}>Akademik</option><option value="ujian" ${e.category==="ujian"?"selected":""}>Ujian</option><option value="kegiatan" ${e.category==="kegiatan"?"selected":""}>Kegiatan</option><option value="libur" ${e.category==="libur"?"selected":""}>Libur</option></select>
          </div>
        </div>
        <div class="admin__form-group"><label>Warna</label><input type="color" id="mEvColor" value="${e.color||"#2B8FBD"}" style="width:60px;height:36px;border:none;cursor:pointer;" /></div>
      `,()=>{P({...t?{id:t}:{},title:document.getElementById("mEvTitle").value,event_date:document.getElementById("mEvDate").value,end_date:document.getElementById("mEvEnd").value||void 0,unit:document.getElementById("mEvUnit").value,category:document.getElementById("mEvCat").value,color:document.getElementById("mEvColor").value}),closeModal(),E(),m("✅ Event disimpan.")})};window.delCalendar=t=>{confirm("Hapus?")&&(A(t),E())};document.getElementById("addCalendarBtn").addEventListener("click",()=>window.editCalendar(null));let d=null;function f(){const t=b(),e=t.reduce((a,l)=>a+l.unread,0),n=document.getElementById("chatBadgeSidebar");e>0?(n.textContent=e,n.style.display="inline-flex"):n.style.display="none",document.getElementById("chatList").innerHTML=t.length===0?'<p style="text-align:center;color:var(--admin-text-dim);padding:2rem;">Belum ada chat.</p>':t.map(a=>`
          <div class="admin__chat-item ${a.session_id===d?"admin__chat-item--active":""}" data-session="${a.session_id}">
            <div class="admin__chat-item-avatar">${(a.visitor_name||"?")[0].toUpperCase()}</div>
            <div class="admin__chat-item-info">
              <strong>${s(a.visitor_name||"Visitor")}</strong>
              <small>${s(a.last_message.substring(0,40))}</small>
            </div>
            ${a.unread>0?`<span class="admin__badge">${a.unread}</span>`:""}
          </div>
        `).join(""),document.querySelectorAll(".admin__chat-item").forEach(a=>{a.addEventListener("click",()=>{d=a.dataset.session,N(d),f(),v()})}),d&&v()}function v(){const t=H().filter(n=>n.session_id===d);document.getElementById("chatEmpty").style.display="none",document.getElementById("chatMessages").style.display="flex",document.getElementById("chatReply").style.display="flex",document.getElementById("chatMessages").innerHTML=t.map(n=>`
        <div class="admin__chat-msg admin__chat-msg--${n.sender}">
          <div class="admin__chat-bubble">${s(n.message)}</div>
          <small>${new Date(n.created_at).toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit"})}</small>
        </div>
      `).join("");const e=document.getElementById("chatMessages");e.scrollTop=e.scrollHeight}document.getElementById("adminChatSend").addEventListener("click",$);document.getElementById("adminChatInput").addEventListener("keydown",t=>{t.key==="Enter"&&$()});function $(){const t=document.getElementById("adminChatInput");if(!t.value.trim()||!d)return;const n=b().find(a=>a.session_id===d);q({session_id:d,visitor_name:(n==null?void 0:n.visitor_name)||"Visitor",message:t.value.trim(),sender:"admin"}),t.value="",v()}function z(){setInterval(()=>{f()},3e3)}function T(t,e,n){document.getElementById("adminModalContent").innerHTML=`
        <div class="admin__modal-header"><h3>${t}</h3><button class="admin__modal-close" onclick="document.getElementById('adminModal').style.display='none'">✕</button></div>
        <div class="admin__modal-body">${e}</div>
        <div class="admin__modal-footer"><button class="btn btn--ghost" onclick="document.getElementById('adminModal').style.display='none'">Batal</button><button class="btn btn--accent" id="modalSaveBtn">Simpan</button></div>
      `,document.getElementById("adminModal").style.display="flex",document.getElementById("modalSaveBtn").addEventListener("click",n)}window.closeModal=()=>{document.getElementById("adminModal").style.display="none"};document.getElementById("adminModal").addEventListener("click",t=>{t.target===t.currentTarget&&closeModal()});function m(t){const e=document.getElementById("adminToast");e.textContent=t,e.classList.add("admin__toast--show"),setTimeout(()=>e.classList.remove("admin__toast--show"),3e3)}function c(t,e,n){const a=document.getElementById(t),l=document.getElementById(e);a&&(a.addEventListener("change",u=>{const g=u.target.files[0];if(!g)return;if(g.size>2*1024*1024){alert("Ukuran file maksimal 2MB!");return}const I=new FileReader;I.onload=w=>{const B=w.target.result;l&&(l.value=B),r(n,B)},I.readAsDataURL(g)}),l&&(l.addEventListener("change",()=>r(n,l.value)),l.addEventListener("input",()=>r(n,l.value))))}function r(t,e){const n=document.getElementById(t);n&&(e?(n.src=e,n.style.display="block"):n.style.display="none")}function s(t){const e=document.createElement("div");return e.textContent=t||"",e.innerHTML}function i(t){return(t||"").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}
