(function () {
  "use strict";

  const FAV_KEY = "gusti-frontiera-favorites";

  function getFavorites() {
    try {
      return JSON.parse(localStorage.getItem(FAV_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function toggleFavorite(num) {
    const favs = getFavorites();
    const i = favs.indexOf(num);
    if (i === -1) favs.push(num); else favs.splice(i, 1);
    try { localStorage.setItem(FAV_KEY, JSON.stringify(favs)); } catch (e) {}
    renderAll();
  }

  function isFavorite(num) {
    return getFavorites().includes(num);
  }

  function borgoCard(borgo) {
    const fav = isFavorite(borgo.num);
    const menuBadge = borgo.stands.length
      ? `<span class="badge">${borgo.stands.length} stand con menu</span>`
      : `<span class="badge">Menu in arrivo</span>`;
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <button class="fav-btn" aria-label="Salva nei preferiti" data-fav="${borgo.num}">${fav ? "⭐" : "☆"}</button>
      <span class="card-num" style="background:${borgo.color}">${borgo.num}</span>
      <h4>${borgo.name}</h4>
      <div class="street">${borgo.street}</div>
      ${menuBadge}
    `;
    card.addEventListener("click", (e) => {
      if (e.target.closest(".fav-btn")) return;
      showBorgo(borgo.num);
    });
    card.querySelector(".fav-btn").addEventListener("click", () => toggleFavorite(borgo.num));
    return card;
  }

  function renderHome() {
    const grid = document.getElementById("borghi-grid");
    grid.innerHTML = "";
    BORGHI.forEach((b) => grid.appendChild(borgoCard(b)));
  }

  function renderBorgoDetail(num) {
    const borgo = BORGHI.find((b) => b.num === num);
    const wrap = document.getElementById("borgo-detail");
    if (!borgo) { wrap.innerHTML = ""; return; }
    const fav = isFavorite(borgo.num);
    let standsHtml = "";
    if (borgo.stands.length) {
      standsHtml = borgo.stands.map((s) => `
        <div class="card">
          <h4>${s.name}</h4>
          <ul>${s.menu.map((m) => `<li>${m.item} — €${m.price}</li>`).join("")}</ul>
        </div>
      `).join("");
    } else {
      standsHtml = `<div class="stand-empty">Menu in arrivo — nessun dato reale ancora raccolto per questo borgo. Torna a controllare durante il festival.</div>`;
    }
    wrap.innerHTML = `
      <span class="card-num" style="background:${borgo.color}">${borgo.num}</span>
      <h2 style="display:inline-block;margin-left:10px;vertical-align:middle;">${borgo.name}</h2>
      <button class="fav-btn" style="position:static;font-size:1.4rem;" data-fav="${borgo.num}">${fav ? "⭐" : "☆"}</button>
      <p class="muted">${borgo.street} · posizione ${borgo.confidence === "high" ? "confermata" : "da confermare sul posto"}</p>
      ${standsHtml}
    `;
    wrap.querySelector("[data-fav]").addEventListener("click", () => {
      toggleFavorite(borgo.num);
      renderBorgoDetail(num);
    });
  }

  function renderMap() {
    const pins = document.getElementById("map-pins");
    pins.innerHTML = "";
    BORGHI.forEach((b) => {
      const pin = document.createElement("div");
      pin.className = "pin " + b.confidence;
      pin.style.left = b.x + "%";
      pin.style.top = b.y + "%";
      pin.style.background = b.color;
      pin.title = `${b.name} — ${b.street}`;
      pin.innerHTML = `<span>${b.num}</span>`;
      pin.addEventListener("click", () => showBorgo(b.num));
      pins.appendChild(pin);
    });

    const servicePins = document.getElementById("service-pins");
    servicePins.innerHTML = "";
    SERVIZI.filter((s) => s.x !== undefined).forEach((s) => {
      const el = document.createElement("div");
      el.className = "service-pin";
      el.style.left = s.x + "%";
      el.style.top = s.y + "%";
      el.title = s.label;
      el.textContent = s.icon;
      servicePins.appendChild(el);
    });

    const list = document.getElementById("services-list");
    list.innerHTML = "";
    SERVIZI.forEach((s) => {
      const li = document.createElement("li");
      li.textContent = `${s.icon} ${s.label}`;
      list.appendChild(li);
    });
  }

  function renderSearch() {
    const input = document.getElementById("search-input");
    const onlyMenu = document.getElementById("filter-has-menu");
    const results = document.getElementById("search-results");

    function run() {
      const q = input.value.trim().toLowerCase();
      results.innerHTML = "";
      BORGHI
        .filter((b) => (b.name + " " + b.street).toLowerCase().includes(q))
        .filter((b) => !onlyMenu.checked || b.stands.length > 0)
        .forEach((b) => results.appendChild(borgoCard(b)));
    }

    input.oninput = run;
    onlyMenu.onchange = run;
    run();
  }

  function renderSaved() {
    const favs = getFavorites();
    const grid = document.getElementById("saved-grid");
    const empty = document.getElementById("saved-empty");
    grid.innerHTML = "";
    const favBorghi = BORGHI.filter((b) => favs.includes(b.num));
    favBorghi.forEach((b) => grid.appendChild(borgoCard(b)));
    empty.hidden = favBorghi.length > 0;
  }

  function renderAll() {
    renderHome();
    renderMap();
    renderSearch();
    renderSaved();
    const activeBorgo = document.getElementById("view-borgo").dataset.current;
    if (activeBorgo) renderBorgoDetail(Number(activeBorgo));
  }

  function setView(name) {
    document.querySelectorAll(".view").forEach((v) => v.classList.remove("active"));
    document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
    const view = document.getElementById("view-" + name);
    if (view) view.classList.add("active");
    const tab = document.querySelector(`.tab[data-view="${name}"]`);
    if (tab) tab.classList.add("active");
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  function showBorgo(num) {
    document.getElementById("view-borgo").dataset.current = num;
    renderBorgoDetail(num);
    setView("borgo");
  }

  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => setView(tab.dataset.view));
  });

  document.querySelectorAll("[data-back]").forEach((btn) => {
    btn.addEventListener("click", () => setView(btn.dataset.back));
  });

  renderAll();
})();
