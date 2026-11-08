/* =========================================================================
   composite · app.js  (vanilla, no build, no chart lib)

   A single long page assembled from an ordered list of typed section-blocks.
   The whole page is config-driven:

     window.SITE_META     -> { title:{en,zh}, subtitle:{en,zh} }
     window.SITE_SECTIONS -> [ { type, id, ... }, ... ]   (rendered in order)

   ARCHITECTURE
   ------------
   RENDERERS is the SECTION-TYPE REGISTRY: one function per `type` that takes
   a section config + the active lang and returns an HTML string for the inner
   body of that section. To add a new block type, add one entry to RENDERERS
   — nothing else needs to change.

   A single render() call paints EVERY section + the sticky nav + chrome +
   <title> in the page's language, which is read from <html lang>: each
   language has its own URL, so nothing switches in place.

   Sections that carry a `short` label are numbered 1, 2 … like the panels of a
   report; only those appear in the table of contents.
   ========================================================================= */
(function () {
  "use strict";

  /* ---------- data ---------- */
  var META = window.SITE_META || { title: {}, subtitle: {} };
  var SECTIONS = Array.isArray(window.SITE_SECTIONS) ? window.SITE_SECTIONS : [];

  /* ---------- i18n strings (UI chrome only) ---------- */
  var I18N = {
    en: { footer: "Unofficial interactive edition of Anthropic’s 2026 Agentic Coding Trends Report · static site, no build step.",
          close: "Close", menu: "On this page",
          all: "All", predictions: "Predictions", inPractice: "In practice",
          trendsWord: "trends", openStory: "Read the full story", gapAlt: "Bar chart of all developer work" },
    zh: { footer: "Anthropic《2026 代理式編碼趨勢報告》非官方互動版 · 純靜態網站，無建置流程。",
          close: "關閉", menu: "本頁導覽",
          all: "全部", predictions: "預測", inPractice: "實際案例",
          trendsWord: "項趨勢", openStory: "看完整故事", gapAlt: "全部開發工作的長條圖" }
  };

  /* ---------- safe localStorage (sandbox / file:// may throw) ---------- */
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } }

  /* ---------- global state ----------
     The language is whatever the page declares in <html lang> — the address
     decides it, not a stored preference. That keeps a shared link, a reload
     and a crawler visit on the same language every time. ---------- */
  function docLang() {
    var declared = (document.documentElement.getAttribute("lang") || "en").toLowerCase();
    return declared.indexOf("zh") === 0 ? "zh" : "en";
  }
  function systemTheme() {
    return (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light";
  }
  var state = {
    lang:  docLang(),
    theme: lsGet("theme") || systemTheme()   // no saved choice -> follow the OS
  };

  /* §-numbers for the sections that appear in the table of contents */
  var SEC_NUM = {};
  (function () {
    var n = 0;
    SECTIONS.forEach(function (sec) { if (sec.short) SEC_NUM[sec.id] = ++n; });
  })();

  /* ---------- dom refs ---------- */
  var $ = function (id) { return document.getElementById(id); };
  var sectionsEl = $("sections");
  var navInner   = $("sectionNavInner");
  var dialog     = $("dialog");
  var dialogBody = $("dialogBody");

  /* ---------- helpers ---------- */
  function t(obj) {
    if (obj == null) return "";
    if (typeof obj === "string") return obj;
    return obj[state.lang] || obj.en || obj.zh || "";
  }
  function ui(key) { return (I18N[state.lang] || I18N.en)[key]; }
  function escapeHtml(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (m) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m];
    });
  }

  /* a shared <header class="section-head"> for every section */
  function sectionHead(sec, tag) {
    tag = tag || "h2";
    var sub = t(sec.subtitle)
      ? '<p class="section-head__sub">' + escapeHtml(t(sec.subtitle)) + "</p>"
      : "";
    var num = SEC_NUM[sec.id]
      ? '<span class="section-head__num" aria-hidden="true">' + SEC_NUM[sec.id] + "</span>"
      : "";
    return '<header class="section-head">' + num +
      '<div class="section-head__text">' +
        "<" + tag + ' id="' + escapeHtml(sec.id) + '-heading">' + escapeHtml(t(sec.title)) + "</" + tag + ">" +
        sub +
      "</div></header>";
  }

  /* "Trend 3 · Long-running agents…" -> { n: "3", title: "Long-running agents…" } */
  function splitTrendTitle(str) {
    var m = /^(?:Trend|趨勢)\s*(\d+)\s*·\s*(.+)$/.exec(str);
    return m ? { n: m[1], title: m[2] } : { n: "", title: str };
  }
  function tagLine(tags) {
    return (tags && tags.length)
      ? '<p class="tagline">' + tags.map(escapeHtml).join('<span aria-hidden="true"> / </span>') + "</p>"
      : "";
  }
  function pct(v) { return Math.max(0, Math.min(100, Number(v) || 0)); }
  /* "<72 小時" -> a big "<72" and a small unit "小時", so the figure,
     not the word, carries a ledger row or a case sheet */
  function figureHtml(metric) {
    var mm = /^([<>~]?[\d.,]+(?:[KkM]\+?)?[+×%]*)\s*(.*)$/.exec(metric);
    return mm
      ? escapeHtml(mm[1]) + (mm[2] ? '<span class="ledger__unit">' + escapeHtml(mm[2]) + "</span>" : "")
      : escapeHtml(metric);
  }

  /* =======================================================================
     SECTION-TYPE REGISTRY
     Each renderer returns the INNER html for a <section>; the wrapper +
     section-head are added by paintSections(). Add new types here.
     ===================================================================== */
  var RENDERERS = {

    /* ---- hero: the unofficial notice, a poster title, and the
       "delegation gap" drawn as one full-bleed bar.
       stats carry a role: use (share of work that uses AI), delegate (the
       fully-delegated range), aside / kicker (supporting figures). ---- */
    hero: function (sec) {
      var by = {};
      (sec.stats || []).forEach(function (s) { if (s.role) by[s.role] = s; });
      function num(s) {
        if (!s) return "";
        if (s.display != null) return escapeHtml(t(s.display));
        return escapeHtml(String(s.value)) + (s.suffix ? escapeHtml(s.suffix) : "");
      }

      var notice = "";
      if (sec.notice) {
        notice = '<p class="hero__notice"><b>' + escapeHtml(t(sec.notice.label)) + "</b>" +
          "<span>" + escapeHtml(t(sec.notice.text)) + "</span></p>";
      }

      /* "2026 Agentic Coding Trends" -> a year line and a name line */
      var title = t(sec.title);
      var tm = /^(\d{4})\s+(.+)$/.exec(title);
      var h1 = '<h1 class="hero__title" id="' + escapeHtml(sec.id) + '-heading">' +
        (tm
          ? '<span class="hero__year">' + escapeHtml(tm[1]) + '</span> <span class="hero__name">' + escapeHtml(tm[2]) + "</span>"
          : escapeHtml(title)) +
        "</h1>";

      var asides = ["aside", "kicker"].filter(function (k) { return by[k]; }).map(function (k) {
        var s = by[k];
        var inner = '<b class="hero__fig">' + num(s) + "</b><span>" + escapeHtml(t(s.label)) + "</span>";
        return k === "kicker"
          ? '<li><a href="#trends">' + inner + "</a></li>"
          : "<li>" + inner + "</li>";
      }).join("");

      var gap = "";
      var use = by.use, del = by.delegate;
      if (sec.gap && use && del) {
        var alt = ui("gapAlt") + ": " + num(use) + " " + t(use.label) + ", " + num(del) + " " + t(del.label) + ".";
        var ticks = [0, 20, 40, 60, 80, 100].map(function (v) { return "<li>" + v + "</li>"; }).join("");
        gap =
          '<figure class="gap">' +
            '<p class="gap__headline">' + escapeHtml(t(sec.gap.headline)) + "</p>" +
            '<div class="gap__chart" role="img" aria-label="' + escapeHtml(alt) + '" ' +
                'style="--use:' + pct(use.value) + "%;--del:" + pct(del.to) + '%">' +
              '<div class="gap__bar" aria-hidden="true">' +
                '<span class="gap__use"></span><span class="gap__del"></span>' +
                '<span class="gap__mark gap__mark--use"><b class="gap__num">' + num(use) + "</b>" +
                  '<span class="gap__label">' + escapeHtml(t(use.label)) + "</span></span>" +
                '<span class="gap__mark gap__mark--del"><b class="gap__num">' + num(del) + "</b>" +
                  '<span class="gap__label">' + escapeHtml(t(del.label)) + "</span></span>" +
                '<span class="gap__scale">' + escapeHtml(t(sec.gap.scale)) + "</span>" +
              "</div>" +
              '<ol class="gap__ticks" aria-hidden="true">' + ticks + "</ol>" +
            "</div>" +
            (t(sec.gap.source) ? '<figcaption class="gap__source">' + escapeHtml(t(sec.gap.source)) + "</figcaption>" : "") +
          "</figure>";
      }

      return notice +
        '<div class="hero__top">' + h1 +
          '<div class="hero__side">' +
            (t(sec.subtitle) ? '<p class="hero__sub">' + escapeHtml(t(sec.subtitle)) + "</p>" : "") +
            (asides ? '<ul class="hero__asides">' + asides + "</ul>" : "") +
          "</div>" +
        "</div>" +
        gap;
    },

    /* ---- cards: a collection of items that open the detail dialog.
       sec.layout picks the composition:
         "bands"  — grouped by sec.filters (one band per group), numbered list
         "ledger" — evidence table: name · headline metric · summary
         default  — responsive card grid ---- */
    cards: function (sec) {
      var items = sec.items || [];
      var filters = Array.isArray(sec.filters) ? sec.filters : [];

      function opener(item, cls, inner) {
        return '<article class="' + cls + '" tabindex="0" role="button" ' +
          'data-group="' + escapeHtml(item.group || "") + '" ' +
          'data-slug="' + escapeHtml(item.slug) + '" ' +
          'aria-label="' + escapeHtml(t(item.title)) + '">' + inner + "</article>";
      }

      if (sec.layout === "bands" && filters.length) {
        var bands = filters.map(function (f) {
          var mine = items.filter(function (it) { return it.group === f.key; });
          if (!mine.length) return "";
          var rows = mine.map(function (item) {
            var tt = splitTrendTitle(t(item.title));
            return "<li>" + opener(item, "trend",
              '<span class="trend__num" aria-hidden="true">' + escapeHtml(tt.n) + "</span>" +
              '<div class="trend__body">' +
                '<h3 class="trend__title">' + escapeHtml(tt.title) + "</h3>" +
                '<p class="trend__summary">' + escapeHtml(t(item.summary)) + "</p>" +
                tagLine(item.tags) +
              "</div>") + "</li>";
          }).join("");
          return '<div class="band band--' + escapeHtml(f.key) + '" data-group="' + escapeHtml(f.key) + '">' +
            '<header class="band__head">' +
              '<h3 class="band__name">' + escapeHtml(t(f.label)) + "</h3>" +
              (t(f.note) ? '<p class="band__note">' + escapeHtml(t(f.note)) + "</p>" : "") +
              '<p class="band__count">' + mine.length + " " + escapeHtml(ui("trendsWord")) + "</p>" +
            "</header>" +
            '<ol class="trend-list">' + rows + "</ol>" +
          "</div>";
        }).join("");
        return sectionHead(sec) + '<div class="bands">' + bands + "</div>";
      }

      if (sec.layout === "ledger") {
        var rows = items.map(function (item) {
          var metric = t(item.metric);
          /* the headline figure leads the row; a case without one keeps the
             column with a quiet dash so every row lines up */
          return "<li>" + opener(item, "ledger__row" + (metric ? "" : " ledger__row--nometric"),
            (metric
              ? '<b class="ledger__metric">' + figureHtml(metric) + "</b>"
              : '<span class="ledger__metric" aria-hidden="true">–</span>') +
            '<h3 class="ledger__co">' + escapeHtml(t(item.title)) + "</h3>" +
            '<div class="ledger__text">' +
              '<p class="ledger__summary">' + escapeHtml(t(item.summary)) + "</p>" +
              tagLine(item.tags) +
            "</div>" +
            '<span class="ledger__open" aria-hidden="true" title="' +
              escapeHtml(ui("openStory")) + '">+</span>') + "</li>";
        }).join("");
        return sectionHead(sec) + '<ol class="ledger">' + rows + "</ol>";
      }

      var cards = items.map(function (item) {
        return opener(item, "card",
          '<h3 class="card__title">' + escapeHtml(t(item.title)) + "</h3>" +
          '<p class="card__summary">' + escapeHtml(t(item.summary)) + "</p>" +
          tagLine(item.tags));
      }).join("");
      return sectionHead(sec) + '<div class="grid">' + cards + "</div>";
    },

    /* ---- timeline: dated steps, each with a bar that grows with the
       horizon (minutes -> hours -> days/weeks); the last one is the forecast ---- */
    timeline: function (sec) {
      var evs = sec.events || [];
      var items = evs.map(function (ev, i) {
        return '<li class="tl-item' + (i === evs.length - 1 ? " tl-item--next" : "") + '">' +
          '<span class="tl-date">' + escapeHtml(t(ev.date)) + "</span>" +
          '<div class="tl-text">' +
            '<h3 class="tl-title">' + escapeHtml(t(ev.title)) + "</h3>" +
            '<p class="tl-body">' + escapeHtml(t(ev.body)) + "</p>" +
          "</div>" +
          '<span class="tl-bar" aria-hidden="true" style="--reach:' + Math.round((i + 1) / evs.length * 100) + '%"></span>' +
        "</li>";
      }).join("");
      return sectionHead(sec) + '<ol class="timeline">' + items + "</ol>";
    },

    /* ---- bars: a compact comparison strip (share of work, 0–100%).
       An item with `from` is a range and fades out towards its upper bound. ---- */
    bars: function (sec) {
      var rows = (sec.series || []).map(function (d) {
        var shown = (d.display != null ? t(d.display) : String(d.value)) + "%";
        var range = d.from != null;
        return '<div class="strip__row' + (range ? " strip__row--range" : "") + '">' +
          '<span class="strip__label">' + escapeHtml(t(d.label)) + "</span>" +
          '<span class="strip__track" aria-hidden="true"><span class="strip__fill" style="width:' + pct(d.value) + '%"></span></span>' +
          '<b class="strip__val">' + escapeHtml(shown) + "</b>" +
        "</div>";
      }).join("");
      return sectionHead(sec) +
        '<figure class="strip" aria-label="' + escapeHtml(t(sec.title)) + '">' + rows + "</figure>";
    },

    /* ---- accordion: native <details> Q&A ---- */
    accordion: function (sec) {
      var items = (sec.qa || []).map(function (row) {
        return '<details class="acc-item">' +
          '<summary class="acc-q">' +
            "<span>" + escapeHtml(t(row.q)) + "</span>" +
            '<span class="acc-chevron" aria-hidden="true">+</span>' +
          "</summary>" +
          '<div class="acc-a">' + escapeHtml(t(row.a)) + "</div>" +
        "</details>";
      }).join("");
      return sectionHead(sec) + '<div class="accordion">' + items + "</div>";
    },

    /* ---- quotes: pull quotes in a two-column grid ---- */
    quotes: function (sec) {
      var items = (sec.quotes || []).map(function (q) {
        var by = q.by ? '<figcaption class="quote-by">' + escapeHtml(t(q.by)) + "</figcaption>" : "";
        return '<figure class="quote">' +
          '<span class="quote-mark" aria-hidden="true">“</span>' +
          "<blockquote>" + escapeHtml(t(q.text)) + "</blockquote>" +
          by +
        "</figure>";
      }).join("");
      return sectionHead(sec) + '<div class="quotes">' + items + "</div>";
    },

    /* ---- prose: ordered rich-text blocks (p / h3 / ul) ---- */
    prose: function (sec) {
      var body = (sec.blocks || []).map(function (b) {
        if (b.type === "h3") return "<h3>" + escapeHtml(t(b.text)) + "</h3>";
        if (b.type === "ul") {
          var arr = (b.items && (b.items[state.lang] || b.items.en || b.items.zh)) || [];
          return "<ul>" + arr.map(function (li) {
            return "<li>" + escapeHtml(li) + "</li>";
          }).join("") + "</ul>";
        }
        return "<p>" + escapeHtml(t(b.text)) + "</p>";
      }).join("");
      return sectionHead(sec) + '<div class="prose">' + body + "</div>";
    },

    /* ---- cta: closing call-to-action ---- */
    cta: function (sec) {
      var link = "";
      if (sec.link && sec.link.url) {
        link = '<a class="cta-btn" href="' + escapeHtml(sec.link.url) + '" ' +
          'target="_blank" rel="noopener">' +
          escapeHtml(t(sec.link.label)) + "</a>";
      }
      return '<div class="cta-card">' +
        "<h2>" + escapeHtml(t(sec.title)) + "</h2>" +
        (t(sec.text) ? "<p>" + escapeHtml(t(sec.text)) + "</p>" : "") +
        link +
      "</div>";
    }
  };

  /* =======================================================================
     RENDER: paint nav + every section in the active language
     ===================================================================== */
  function paintSections() {
    sectionsEl.innerHTML = "";
    SECTIONS.forEach(function (sec) {
      var fn = RENDERERS[sec.type];
      if (!fn) return;                       // unknown type: skip gracefully
      var el = document.createElement("section");
      el.className = "section section--" + sec.type + (sec.layout ? " section--" + sec.layout : "");
      el.id = sec.id;
      if (sec.type !== "cta") el.setAttribute("aria-labelledby", sec.id + "-heading");
      el.innerHTML = fn(sec, state.lang);
      sectionsEl.appendChild(el);
    });
    wireCards();
  }

  /* table of contents: only the numbered sections, "n  short label" */
  function paintNav() {
    navInner.innerHTML = "";
    SECTIONS.forEach(function (sec) {
      if (!sec.short) return;
      var a = document.createElement("a");
      a.className = "navpill";
      a.href = "#" + sec.id;
      a.dataset.target = sec.id;
      a.innerHTML =
        '<span class="navpill__num" aria-hidden="true">' + SEC_NUM[sec.id] + "</span>" +
        "<span>" + escapeHtml(t(sec.short)) + "</span>";
      a.addEventListener("click", function (e) {
        e.preventDefault();
        var target = document.getElementById(sec.id);
        if (target) target.scrollIntoView({ block: "start" });
        history.replaceState(null, "", "#" + sec.id);
      });
      navInner.appendChild(a);
    });
    navInner.addEventListener("scroll", updateNavEdges, { passive: true });
    updateNavEdges();
  }

  /* fade the edge of the TOC strip only on the side that has more to scroll */
  function updateNavEdges() {
    var nav = $("sectionNav");
    if (!nav) return;
    var max = navInner.scrollWidth - navInner.clientWidth;
    nav.classList.toggle("is-more-left", navInner.scrollLeft > 4);
    nav.classList.toggle("is-more-right", max - navInner.scrollLeft > 4);
  }

  /* thin reading-progress rule under the TOC */
  function updateProgress() {
    var bar = $("navProgress");
    if (!bar) return;
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    var p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    bar.style.transform = "scaleX(" + p.toFixed(4) + ")";
  }

  function paintChrome() {
    var titleStr = t(META.title);
    var subStr = t(META.subtitle);
    document.title = subStr ? titleStr + " · " + subStr : titleStr;
    var brand = $("brandName");
    if (brand) brand.textContent = titleStr;
    var foot = $("footerText");
    if (foot) foot.textContent = ui("footer");
    var nav = $("sectionNav");
    if (nav) nav.setAttribute("aria-label", ui("menu"));
    var dc = $("dialogClose");
    if (dc) dc.setAttribute("aria-label", ui("close"));
  }

  function render() {
    paintChrome();
    paintNav();
    paintSections();
    setupScrollSpy();
  }

  /* =======================================================================
     SCROLLSPY — highlight the active section in the TOC
     ===================================================================== */
  var spyObserver = null;
  function setupScrollSpy() {
    if (spyObserver) { spyObserver.disconnect(); spyObserver = null; }
    if (!("IntersectionObserver" in window)) return;
    var pills = {};
    [].forEach.call(navInner.children, function (a) { pills[a.dataset.target] = a; });

    spyObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var pill = pills[en.target.id];
        [].forEach.call(navInner.children, function (p) {
          p.classList.remove("navpill--active");
          p.removeAttribute("aria-current");
        });
        if (!pill) return;                   // hero / closing section: nothing lit
        pill.classList.add("navpill--active");
        pill.setAttribute("aria-current", "true");
        // keep the active entry visible inside the horizontal strip (without moving the page)
        var left = pill.offsetLeft - (navInner.clientWidth - pill.offsetWidth) / 2;
        navInner.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

    SECTIONS.forEach(function (sec) {
      var el = document.getElementById(sec.id);
      if (el) spyObserver.observe(el);
    });
  }

  /* =======================================================================
     DIALOG — item detail with #slug deep links + Esc
     ===================================================================== */
  function findCard(slug) {
    for (var i = 0; i < SECTIONS.length; i++) {
      var sec = SECTIONS[i];
      if (sec.type !== "cards" || !sec.items) continue;
      for (var j = 0; j < sec.items.length; j++) {
        if (sec.items[j].slug === slug) return { item: sec.items[j], sec: sec };
      }
    }
    return null;
  }

  function openDialog(slug) {
    var found = findCard(slug);
    if (!found) return;
    var item = found.item;

    /* which dimension a trend belongs to (from its section's filters) */
    var kicker = "";
    if (item.group && Array.isArray(found.sec.filters)) {
      found.sec.filters.forEach(function (f) {
        if (f.key === item.group) {
          kicker = '<p class="dialog__dim dim--' + escapeHtml(f.key) + '">' + escapeHtml(t(f.label)) + "</p>";
        }
      });
    }
    var metric = t(item.metric) ? '<p class="dialog__metric">' + figureHtml(t(item.metric)) + "</p>" : "";

    /* optional predictions list: { en:[...], zh:[...] } */
    var preds = "";
    var pl = item.predictions && (item.predictions[state.lang] || item.predictions.en || item.predictions.zh);
    if (pl && pl.length) {
      preds = "<h3>" + escapeHtml(ui("predictions")) + "</h3><ul class=\"dialog__list\">" +
        pl.map(function (p) { return "<li>" + escapeHtml(p) + "</li>"; }).join("") + "</ul>";
    }

    /* optional customer example: { company, text:{en,zh}, url? } */
    var caseBlock = "";
    if (item.inPractice && (t(item.inPractice.text) || item.inPractice.company)) {
      var ip = item.inPractice;
      var link = ip.url
        ? ' <a class="case__link" href="' + escapeHtml(ip.url) + '" target="_blank" rel="noopener">↗</a>'
        : "";
      caseBlock = '<div class="case">' +
        '<p class="case__co">' + escapeHtml(ui("inPractice")) + (state.lang === "zh" ? "：" : ": ") + escapeHtml(ip.company || "") + "</p>" +
        "<p>" + escapeHtml(t(ip.text)) + link + "</p>" +
      "</div>";
    }

    dialogBody.innerHTML =
      kicker +
      '<h2 id="dialogTitle">' + escapeHtml(t(item.title)) + "</h2>" +
      metric +
      tagLine(item.tags) +
      "<p>" + escapeHtml(t(item.overview) || t(item.summary)) + "</p>" +
      preds +
      caseBlock;
    if (!dialog.open) dialog.showModal();
    if (location.hash.slice(1) !== slug) history.replaceState(null, "", "#" + slug);
  }
  function closeDialog() {
    if (dialog.open) dialog.close();
    if (isSlugHash()) history.replaceState(null, "", location.pathname + location.search);
  }
  function isSlugHash() {
    var h = location.hash.slice(1);
    return !!h && !!findCard(h);
  }

  function wireCards() {
    [].forEach.call(document.querySelectorAll('[role="button"][data-slug]'), function (card) {
      var slug = card.dataset.slug;
      card.addEventListener("click", function () { openDialog(slug); });
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openDialog(slug); }
      });
    });
  }

  /* =======================================================================
     THEME
     ===================================================================== */
  function applyTheme() {
    document.documentElement.setAttribute("data-theme", state.theme);
    /* the icon is a CSS half-disc that flips with data-theme; the button
       just reports its state */
    var btn = $("themeToggle");
    if (btn) btn.setAttribute("aria-pressed", state.theme === "dark" ? "true" : "false");
  }

  /* =======================================================================
     WIRING
     ===================================================================== */
  function wire() {
    $("themeToggle").addEventListener("click", function () {
      state.theme = state.theme === "dark" ? "light" : "dark";
      lsSet("theme", state.theme);           // only an explicit choice is remembered
      applyTheme();
    });

    /* with no saved choice, keep following the OS if it switches */
    if (window.matchMedia) {
      var mq = window.matchMedia("(prefers-color-scheme: dark)");
      var onChange = function () {
        if (lsGet("theme")) return;
        state.theme = systemTheme();
        applyTheme();
      };
      if (mq.addEventListener) mq.addEventListener("change", onChange);
      else if (mq.addListener) mq.addListener(onChange);
    }

    /* #langToggle is a plain <a> to the other language's URL — the browser
       navigates, so there is nothing to wire up here. */

    $("dialogClose").addEventListener("click", closeDialog);
    dialog.addEventListener("click", function (e) { if (e.target === dialog) closeDialog(); });
    dialog.addEventListener("close", function () {
      if (isSlugHash()) history.replaceState(null, "", location.pathname + location.search);
    });
    // Esc is handled natively by <dialog>

    window.addEventListener("hashchange", syncFromHash);
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", function () { updateNavEdges(); updateProgress(); });
  }

  /* deep link: open dialog matching #slug on load / hashchange */
  function syncFromHash() {
    var slug = location.hash.slice(1);
    if (slug && findCard(slug)) openDialog(slug);
    else if (!slug && dialog.open) dialog.close();
  }

  /* =======================================================================
     INIT
     ===================================================================== */
  function init() {
    applyTheme();
    render();
    wire();
    updateProgress();
    syncFromHash();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
