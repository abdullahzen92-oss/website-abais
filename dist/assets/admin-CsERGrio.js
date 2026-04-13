import{i as y,e as b,f as E,g as c,h as f,a as m,j as _,k as r,m as h,c as B,d as I,l as $,n as k}from"./data-manager-B6icRUjF.js";y()&&u();document.getElementById("loginForm").addEventListener("submit",t=>{t.preventDefault();const e=document.getElementById("loginPassword").value;b(e)?u():document.getElementById("loginError").style.display="block"});document.getElementById("logoutBtn").addEventListener("click",()=>{E(),location.reload()});function u(){document.getElementById("loginScreen").style.display="none",document.getElementById("adminPanel").style.display="flex",i(),s(),o(),C()}document.querySelectorAll(".admin__nav-btn").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".admin__nav-btn").forEach(e=>e.classList.remove("admin__nav-btn--active")),t.classList.add("admin__nav-btn--active"),document.querySelectorAll(".admin__tab").forEach(e=>e.style.display="none"),document.getElementById("tab-"+t.dataset.tab).style.display="block"})});function i(){const t=c();document.getElementById("galleryTbody").innerHTML=t.map(e=>`
        <tr>
          <td><strong>${e.title}</strong><br/><small style="color:var(--clr-text-muted)">${e.description||""}</small></td>
          <td><span class="admin__badge-unit">${(e.unit||"").toUpperCase()}</span></td>
          <td>${e.category}</td>
          <td>${new Date(e.created_at).toLocaleDateString("id-ID")}</td>
          <td>
            <button class="btn btn--sm btn--outline" onclick="editGallery('${e.id}')">Edit</button>
            <button class="btn btn--sm btn--ghost" style="color:var(--clr-error);" onclick="delGallery('${e.id}')">Hapus</button>
          </td>
        </tr>
      `).join("")}window.editGallery=t=>{const e=t?c().find(a=>a.id===t):{};v("Galeri",`
        <div class="form-group"><label class="form-label">Judul *</label><input class="form-input" id="mTitle" value="${e.title||""}" /></div>
        <div class="form-group"><label class="form-label">Deskripsi</label><input class="form-input" id="mDesc" value="${e.description||""}" /></div>
        <div class="form-group"><label class="form-label">URL Gambar</label><input class="form-input" id="mImg" value="${e.image_url||""}" placeholder="https://..." /></div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Unit</label>
            <select class="form-select" id="mUnit"><option value="sdit" ${e.unit==="sdit"?"selected":""}>SDIT</option><option value="smp-sma" ${e.unit==="smp-sma"?"selected":""}>SMP-SMA</option></select>
          </div>
          <div class="form-group"><label class="form-label">Kategori</label>
            <select class="form-select" id="mCat"><option value="tahfidz" ${e.category==="tahfidz"?"selected":""}>Tahfidz</option><option value="entrepreneur" ${e.category==="entrepreneur"?"selected":""}>Entrepreneur</option><option value="beladiri" ${e.category==="beladiri"?"selected":""}>Beladiri</option><option value="umum" ${e.category==="umum"?"selected":""}>Umum</option></select>
          </div>
        </div>
      `,()=>{$({...t?{id:t}:{},title:document.getElementById("mTitle").value,description:document.getElementById("mDesc").value,image_url:document.getElementById("mImg").value,unit:document.getElementById("mUnit").value,category:document.getElementById("mCat").value}),closeModal(),i()})};window.delGallery=t=>{confirm("Hapus item galeri ini?")&&(f(t),i())};document.getElementById("addGalleryBtn").addEventListener("click",()=>window.editGallery(null));function s(){const t=m();document.getElementById("calendarTbody").innerHTML=t.map(e=>`
        <tr>
          <td><strong>${e.title}</strong></td>
          <td>${e.event_date}${e.end_date?" — "+e.end_date:""}</td>
          <td><span class="admin__badge-unit">${(e.unit||"").toUpperCase()}</span></td>
          <td><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${e.color||"#2B8FBD"};margin-right:4px;"></span>${e.category}</td>
          <td>
            <button class="btn btn--sm btn--outline" onclick="editCalendar('${e.id}')">Edit</button>
            <button class="btn btn--sm btn--ghost" style="color:var(--clr-error);" onclick="delCalendar('${e.id}')">Hapus</button>
          </td>
        </tr>
      `).join("")}window.editCalendar=t=>{const e=t?m().find(a=>a.id===t):{};v("Event Kalender",`
        <div class="form-group"><label class="form-label">Judul *</label><input class="form-input" id="mEvTitle" value="${e.title||""}" /></div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Tanggal Mulai *</label><input type="date" class="form-input" id="mEvDate" value="${e.event_date||""}" /></div>
          <div class="form-group"><label class="form-label">Tanggal Selesai</label><input type="date" class="form-input" id="mEvEnd" value="${e.end_date||""}" /></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label class="form-label">Unit</label>
            <select class="form-select" id="mEvUnit"><option value="sdit" ${e.unit==="sdit"?"selected":""}>SDIT</option><option value="smp-sma" ${e.unit==="smp-sma"?"selected":""}>SMP-SMA</option></select>
          </div>
          <div class="form-group"><label class="form-label">Kategori</label>
            <select class="form-select" id="mEvCat"><option value="akademik" ${e.category==="akademik"?"selected":""}>Akademik</option><option value="ujian" ${e.category==="ujian"?"selected":""}>Ujian</option><option value="kegiatan" ${e.category==="kegiatan"?"selected":""}>Kegiatan</option><option value="libur" ${e.category==="libur"?"selected":""}>Libur</option></select>
          </div>
        </div>
        <div class="form-group"><label class="form-label">Warna</label><input type="color" id="mEvColor" value="${e.color||"#2B8FBD"}" style="width:60px;height:36px;border:none;cursor:pointer;" /></div>
      `,()=>{k({...t?{id:t}:{},title:document.getElementById("mEvTitle").value,event_date:document.getElementById("mEvDate").value,end_date:document.getElementById("mEvEnd").value||void 0,unit:document.getElementById("mEvUnit").value,category:document.getElementById("mEvCat").value,color:document.getElementById("mEvColor").value}),closeModal(),s()})};window.delCalendar=t=>{confirm("Hapus event ini?")&&(_(t),s())};document.getElementById("addCalendarBtn").addEventListener("click",()=>window.editCalendar(null));let n=null;function o(){const t=r(),e=t.reduce((l,p)=>l+p.unread,0),a=document.getElementById("chatBadgeSidebar");e>0?(a.textContent=e,a.style.display="inline-flex"):a.style.display="none",document.getElementById("chatList").innerHTML=t.length===0?'<p style="text-align:center;color:var(--clr-text-muted);padding:var(--space-xl);">Belum ada chat masuk.</p>':t.map(l=>`
          <div class="admin__chat-item ${l.session_id===n?"admin__chat-item--active":""}" data-session="${l.session_id}">
            <div class="admin__chat-item-avatar">${(l.visitor_name||"?")[0].toUpperCase()}</div>
            <div class="admin__chat-item-info">
              <strong>${l.visitor_name||"Visitor"}</strong>
              <small>${l.last_message.substring(0,40)}${l.last_message.length>40?"...":""}</small>
            </div>
            ${l.unread>0?`<span class="admin__badge">${l.unread}</span>`:""}
          </div>
        `).join(""),document.querySelectorAll(".admin__chat-item").forEach(l=>{l.addEventListener("click",()=>{n=l.dataset.session,h(n),o(),d()})}),n&&d()}function d(){const t=B().filter(a=>a.session_id===n);document.getElementById("chatEmpty").style.display="none",document.getElementById("chatMessages").style.display="flex",document.getElementById("chatReply").style.display="flex",document.getElementById("chatMessages").innerHTML=t.map(a=>`
        <div class="admin__chat-msg admin__chat-msg--${a.sender}">
          <div class="admin__chat-bubble">${M(a.message)}</div>
          <small>${new Date(a.created_at).toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit"})}</small>
        </div>
      `).join("");const e=document.getElementById("chatMessages");e.scrollTop=e.scrollHeight}document.getElementById("adminChatSend").addEventListener("click",g);document.getElementById("adminChatInput").addEventListener("keydown",t=>{t.key==="Enter"&&g()});function g(){const t=document.getElementById("adminChatInput");if(!t.value.trim()||!n)return;const a=r().find(l=>l.session_id===n);I({session_id:n,visitor_name:(a==null?void 0:a.visitor_name)||"Visitor",message:t.value.trim(),sender:"admin"}),t.value="",d()}function C(){setInterval(()=>{o()},3e3)}function v(t,e,a){document.getElementById("adminModalContent").innerHTML=`
        <div class="admin__modal-header"><h3>${t}</h3><button class="admin__modal-close" onclick="document.getElementById('adminModal').style.display='none'">✕</button></div>
        <div class="admin__modal-body">${e}</div>
        <div class="admin__modal-footer"><button class="btn btn--ghost" onclick="document.getElementById('adminModal').style.display='none'">Batal</button><button class="btn btn--accent" id="modalSaveBtn">Simpan</button></div>
      `,document.getElementById("adminModal").style.display="flex",document.getElementById("modalSaveBtn").addEventListener("click",a)}window.closeModal=()=>{document.getElementById("adminModal").style.display="none"};document.getElementById("adminModal").addEventListener("click",t=>{t.target===t.currentTarget&&closeModal()});function M(t){const e=document.createElement("div");return e.textContent=t,e.innerHTML}
