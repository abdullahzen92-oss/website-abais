import{g as l,s as f}from"./data-manager-DOqBHwHB.js";import{g as _,a as b,b as g,_ as p,i as v}from"./chat-f9KCQYc7.js";function h(t){switch(t){case"home":y();break;case"about":S();break;case"contact":q();break}}function y(){const t=l("hero");if(t&&(o('[data-i18n="hero.badge"]',t.badge),o('[data-i18n="hero.title1"]',t.title1),o('[data-i18n="hero.title2"]',t.title2),o('[data-i18n="hero.subtitle"]',t.subtitle),o('[data-i18n="hero.cta1"]',t.cta1),o('[data-i18n="hero.cta2"]',t.cta2),t.image)){const a=document.querySelector(".hero__bg img");a&&(a.src=t.image)}const e=l("features");if(e&&Array.isArray(e)){const a=document.querySelectorAll("#keunggulan .card");e.forEach((i,n)=>{if(a[n]){const s=a[n].querySelector(".card__icon"),d=a[n].querySelector(".card__title"),u=a[n].querySelector(".card__text");s&&(s.textContent=i.icon),d&&(d.textContent=i.title),u&&(u.textContent=i.desc)}})}const c=l("counters");if(c&&Array.isArray(c)){const a=document.querySelectorAll(".counter-item");c.forEach((i,n)=>{if(a[n]){const s=a[n].querySelector(".counter-item__number"),d=a[n].querySelector(".counter-item__label");s&&(s.setAttribute("data-count",i.number),s.textContent="0"),d&&(d.textContent=i.label)}})}const r=l("testimonials");if(r&&Array.isArray(r)){const a=document.getElementById("carouselTrack");a&&(a.innerHTML=r.map(i=>`
        <div class="carousel__slide">
          <div class="testimonial-card">
            <div class="testimonial-card__stars">★★★★★</div>
            <span class="testimonial-card__quote">"</span>
            <p class="testimonial-card__text">${m(i.text)}</p>
            <div class="testimonial-card__author">
              <div class="testimonial-card__avatar">${(i.name||"??").split(" ").map(n=>n[0]).join("").substring(0,2)}</div>
              <div>
                <div class="testimonial-card__name">${m(i.name)}</div>
                <div class="testimonial-card__role">${m(i.role)}</div>
              </div>
            </div>
          </div>
        </div>
      `).join(""))}}function S(){const t=l("about");if(t){if(o('[data-cms="about.vision"]',t.vision),o('[data-cms="about.principalName"]',t.principalName),o('[data-cms="about.principalMessage"]',t.principalMessage),t.principalImage){const e=document.querySelector('[data-cms-img="about.principalImage"]');e&&(e.src=t.principalImage)}if(t.mission){const e=document.querySelector('[data-cms="about.missionList"]');e&&(e.innerHTML=t.mission.map(c=>`<li>${m(c)}</li>`).join(""))}}}function q(){const t=l("contact");if(!t)return;o('[data-cms="contact.address"]',t.address),document.querySelectorAll("[data-cms-wa]").forEach(c=>{const r=c.dataset.cmsWa==="sdit"?t.waNumberSdit:t.waNumber;r&&(c.href=`https://wa.me/${r}`)})}function o(t,e){if(!e)return;document.querySelectorAll(t).forEach(r=>{r.textContent=e})}function m(t){const e=document.createElement("div");return e.textContent=t||"",e.innerHTML}document.getElementById("navbarSlot").innerHTML=_("home");document.getElementById("footerSlot").innerHTML=b();document.getElementById("waSlot").innerHTML=g();f();h("home");p(()=>import("./main-CQel7J0W.js"),[]);v();
