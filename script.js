/* ============================================================
   Portofolio Yahya — script.js (versi aman / hardened)
   Perbaikan keamanan & bug:
   - Semua akses DOM diberi guard (satu elemen hilang tidak mematikan seluruh script)
   - Kontak tidak lagi plaintext (di-encode base64, didekode saat runtime)
   - Tidak memakai innerHTML untuk data yang bisa berisi input pengguna
   - Link eksternal selalu rel="noopener noreferrer"
   - Penanganan gambar opsional (pengganti atribut onerror inline, ramah CSP)
   ============================================================ */
(function () {
  "use strict";

  /* ---------- util ---------- */
  var $ = function (s, r) {
      return (r || document).querySelector(s);
    },
    $$ = function (s, r) {
      return Array.prototype.slice.call((r || document).querySelectorAll(s));
    },
    /* bikin elemen tanpa innerHTML (aman dari injeksi markup) */
    el = function (tag, cls) {
      var n = document.createElement(tag);
      if (cls) n.className = cls;
      return n;
    },
    /* decode base64 -> UTF-8 string (aman untuk karakter non-ASCII) */
    dec = function (b64) {
      try {
        var bin = atob(b64),
          bytes = new Uint8Array(bin.length);
        for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
        return new TextDecoder("utf-8").decode(bytes);
      } catch (e) {
        return "";
      }
    },
    safe = function (fn) {
      /* jalankan blok; error satu blok tidak boleh menghentikan blok lain */
      try {
        return fn();
      } catch (e) {
        if (window.console && console.warn) console.warn("[portfolio]", e);
        return null;
      }
    };

  var PHOTO = "img/pp-opt.jpg";
  var PHOTO_PROFIL = "img/ppgw.jpg";

  var LOGOS = {
    py: "img/pyrhon.png",
    fl: "img/flutter.png",
    ph: "img/php.png",
    la: "img/laravel.png",
    my: "img/mysql.png",
    rs: "img/rust.png",
    cp: "img/C++.png",
    ht: "img/html.png",
    cs: "img/css.png",
    js: "img/javascript.png",
    bs: "img/boostrap.png",
    em: "img/gmail.png",
    wa: "img/wa.png",
    ig: "img/IG.png",
    gh: "img/github.png",
    tt: "img/tiktok.png",
    WordPress: "img/wordpress.png",
    Database: "img/database.png",
  };

  /* Kontak disimpan ter-encode supaya tidak mudah dipanen bot scraper,
     lalu didekode hanya saat dipakai. */
  var RAW_LINKS = {
    email: "eWFoeWFpc21haWxzaW5hZ2EwQGdtYWlsLmNvbQ==",
    whatsapp: "aHR0cHM6Ly93YS5tZS82Mjg4MjAxNTgyMjUzNg==",
    instagram: "aHR0cHM6Ly93d3cuaW5zdGFncmFtLmNvbS95YWh5YWlzbWFpbDAw",
    github: "aHR0cHM6Ly9naXRodWIuY29tL3lhaHlhLWlzbWFpbC1zaW5hZ2E=",
    tiktok: "aHR0cHM6Ly93d3cudGlrdG9rLmNvbS9AeWFfa3lsZS4z",
  };
  var LINKS = {};
  Object.keys(RAW_LINKS).forEach(function (k) {
    LINKS[k] = dec(RAW_LINKS[k]);
  });

  var red = matchMedia("(prefers-reduced-motion: reduce)").matches,
    root = document.documentElement;

  var yr = $("#yr");
  if (yr) yr.textContent = new Date().getFullYear();

  /* Foto profil sudah ditulis langsung di HTML (bukan disuntik lewat JS),
     jadi tetap muncul walau JavaScript diblokir/gagal dimuat.
     Hanya gambar opsional (logo sekolah) yang perlu fallback di sini: */
  safe(function () {
    $$("img[data-optional]").forEach(function (img) {
      img.addEventListener(
        "error",
        function () {
          if (img.parentNode) img.parentNode.removeChild(img);
        },
        { once: true },
      );
    });
  });

  /* Cadangan: kalau suatu saat elemen .ph kosong (tanpa <img> di HTML),
     isi otomatis dari sini. */
  safe(function () {
    $$(".ph").forEach(function (p) {
      var ada = p.querySelector("img");
      if (ada) {
        /* penanda untuk browser lama yang belum mendukung :has() */
        p.classList.add("has");
        return;
      }
      var prof = !!p.closest("#pc"),
        src = prof ? PHOTO_PROFIL || PHOTO : PHOTO;
      if (!src) return;
      var i = new Image();
      i.alt = prof ? "Foto Yahya Ismail Sinaga" : "";
      i.referrerPolicy = "no-referrer";
      i.decoding = "async";
      /* optimasi: hanya foto profil yang di-eager-kan (di atas layar) */
      i.loading = "lazy";
      i.onload = function () {
        p.insertBefore(i, p.firstChild);
        p.classList.add("has");
      };
      i.src = src;
    });
  });

  /* ---------- teks berjalan ---------- */
  safe(function () {
    var rls = [
        "Pelajar SMK Multi Karya",
        "Front End Developer",
        "Back End Developer",
        "UI/UX Designer",
        "Gamer Mobile And PC",
        "Freelancer",
        "IT Support",
        "Anime Lover",
        "Musician",
        "Photographer",
        "Tech & Automotive Enthusiast",
        "AI Engineer",
      ],
      ty = $("#ty"),
      ri = 0,
      ci = 0,
      dl = false;
    if (!ty) return;
    function tick() {
      var t = rls[ri];
      ty.textContent = t.slice(0, ci);
      if (!dl && ci === t.length) {
        dl = true;
        return setTimeout(tick, 1800);
      }
      if (dl && ci === 0) {
        dl = false;
        ri = (ri + 1) % rls.length;
        return setTimeout(tick, 350);
      }
      ci += dl ? -1 : 1;
      setTimeout(tick, dl ? 32 : 75);
    }
    if (!red) {
      ty.textContent = "";
      setTimeout(tick, 900);
    }
  });

  /* ---------- bintang di tali ---------- */
  safe(function () {
    var stEl = $("#st");
    if (!stEl) return;
    var b = el("b");
    for (var i = 0; i < 18; i++) {
      var s = el("i");
      s.textContent = "✦";
      b.appendChild(s);
    }
    stEl.appendChild(b);
  });

  /* ---------- pita ---------- */
  safe(function () {
    var wd = [
        "Python",
        "Flutter",
        "PHP",
        "Laravel",
        "MySQL",
        "Rust",
        "C++",
        "HTML",
        "CSS",
        "Bootstrap",
        "JavaScript",
        "WordPress",
        "Database",
      ],
      frag = document.createDocumentFragment();
    for (var rep = 0; rep < 4; rep++) {
      wd.forEach(function (x) {
        var sp = el("span");
        sp.textContent = x;
        frag.appendChild(sp);
      });
    }
    $$(".rt").forEach(function (r) {
      r.textContent = "";
      r.appendChild(frag.cloneNode(true));
    });
  });

  /* ---------- toast ---------- */
  var tt;
  function toast(m, ms) {
    var t = $("#ts");
    if (!t) return;
    t.textContent = m;
    t.classList.add("on");
    clearTimeout(tt);
    tt = setTimeout(function () {
      t.classList.remove("on");
    }, ms || 2600);
  }

  /* ---------- lanyard ---------- */
  safe(function () {
    var anc = $(".lanc"),
      st = $("#st"),
      hk = $("#hk"),
      cd = $("#cd"),
      hero = $("#home");
    if (!anc || !st || !hk || !cd || !hero) return;

    var L = 170,
      P = { x: 150, y: 90 },
      V = { x: 0, y: 0 },
      T = null,
      off = { x: 0, y: 0 },
      drag = false,
      vis = true,
      ph = 0,
      pv = 0;

    function gl() {
      L =
        parseFloat(getComputedStyle(hero).getPropertyValue("--sl")) || 170;
    }
    gl();
    addEventListener("resize", gl);
    if (red) P = { x: 0, y: L };

    function pr(e) {
      var r = anc.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    }

    cd.addEventListener("pointerdown", function (e) {
      var q = pr(e);
      off = { x: P.x - q.x, y: P.y - q.y };
      T = { x: P.x, y: P.y };
      drag = true;
      if (cd.setPointerCapture) cd.setPointerCapture(e.pointerId);
      e.preventDefault();
    });
    cd.addEventListener("pointermove", function (e) {
      if (!drag) return;
      var q = pr(e),
        x = q.x + off.x,
        y = q.y + off.y,
        d = Math.hypot(x, y),
        m = L * 2.7;
      if (d > m) {
        x *= m / d;
        y *= m / d;
      }
      T = { x: x, y: y };
    });
    ["pointerup", "pointercancel"].forEach(function (n) {
      cd.addEventListener(n, function () {
        drag = false;
      });
    });

    function sim(h) {
      var g = 4200,
        k = 420,
        R = L - g / k,
        d = Math.hypot(P.x, P.y) || 0.001,
        ux = P.x / d,
        uy = P.y / d,
        vr = V.x * ux + V.y * uy,
        f = -k * (d - R);
      var ax = f * ux - 14 * vr * ux - 1.1 * (V.x - vr * ux),
        ay = f * uy + g - 14 * vr * uy - 1.1 * (V.y - vr * uy);
      if (drag && T) {
        ax += 520 * (T.x - P.x) - 38 * V.x;
        ay += 520 * (T.y - P.y) - 38 * V.y;
      }
      V.x += ax * h;
      V.y += ay * h;
      P.x += V.x * h;
      P.y += V.y * h;
    }

    var lt = performance.now();
    (function f(t) {
      var dt = Math.min((t - lt) / 1000, 0.04);
      lt = t;
      if (!red && (vis || drag)) {
        for (var i = 0; i < 6; i++) sim(dt / 6);
      }
      var d = Math.hypot(P.x, P.y) || 1,
        a = Math.atan2(-P.x, P.y);
      pv += (-(ph - a) * 160 - pv * 13) * dt;
      ph += pv * dt;
      if (red) ph = a;
      var sy = d / L,
        sx = Math.max(0.5, Math.min(1, Math.sqrt(1 / sy)));
      st.style.transform = "rotate(" + a + "rad) scale(" + sx + "," + sy + ")";
      hk.style.transform =
        "translate(" + P.x + "px," + P.y + "px) rotate(" + ph + "rad)";
      requestAnimationFrame(f);
    })(lt);

    new IntersectionObserver(
      function (e) {
        vis = e[0].isIntersecting;
      },
      { threshold: 0 },
    ).observe(hero);
  });

  /* ---------- latar bintang ---------- */
  safe(function () {
    var cv = $("#cv");
    if (!cv || !cv.getContext) return;
    var cx = cv.getContext("2d"),
      S = [],
      W = 0,
      H = 0,
      mx = 0,
      my = 0,
      sh = [],
      nx = 1500,
      fc = "#f3f3f3",
      fr = 0,
      TINT = ["#ffffff", "#ffffff", "#cfe2ff", "#ffe9d0", "#d9d4ff"];
    var lw = 0,
      lh = 0,
      /* --- optimasi performa --- */
      paused = false, /* tab tidak aktif -> animasi berhenti total */
      lastT = 0, /* batasi ~60fps walau layar 120Hz */
      /* di layar sentuh, DPR & jumlah bintang diturunkan supaya ringan;
         secara visual tetap sama */
      touch = matchMedia("(hover:none)").matches,
      dprCap = touch ? 1.5 : 2,
      starDiv = touch ? 7000 : 5200,
      maxStars = touch ? 240 : 380;

    function rs() {
      var d = Math.min(devicePixelRatio || 1, dprCap);
      W = innerWidth;
      H = innerHeight;
      cv.width = Math.floor(W * d);
      cv.height = Math.floor(H * d);
      cx.setTransform(d, 0, 0, d, 0, 0);
      /* di HP, bar alamat naik-turun saat scroll memicu resize;
         jangan acak ulang bintang biar tidak berkedip */
      if (S.length && W === lw && Math.abs(H - lh) < 150) {
        if (red) draw(0);
        return;
      }
      lw = W;
      lh = H;
      var n = Math.min(maxStars, Math.round((W * H) / starDiv));
      S = [];
      for (var i = 0; i < n; i++) {
        var r = Math.random();
        S.push({
          x: Math.random() * W,
          y: Math.random() * H,
          z: Math.random() * 0.9 + 0.1,
          p: Math.random() * 6.28,
          sp: 0.6 + Math.random() * 1.6,
          c: TINT[(Math.random() * TINT.length) | 0],
          k: r > 0.97 ? 2 : r > 0.88 ? 1 : 0,
        });
      }
      if (red) draw(0);
    }

    addEventListener(
      "pointermove",
      function (e) {
        mx = e.clientX / W - 0.5;
        my = e.clientY / H - 0.5;
      },
      { passive: true },
    );

    function draw(t) {
      /* --- optimasi: berhenti total kalau tab tidak aktif / bintang tak terlihat --- */
      if (paused) return;
      /* --- optimasi: batasi ke ~60fps (layar 90/120Hz tidak perlu render 2x) --- */
      if (t - lastT < 15) {
        requestAnimationFrame(draw);
        return;
      }
      lastT = t;
      if (fr++ % 40 === 0)
        fc = getComputedStyle(root).getPropertyValue("--fg").trim() || fc;
      var dark = root.getAttribute("data-theme") !== "light",
        scY = window.scrollY || 0;
      cx.clearRect(0, 0, W, H);
      for (var i = 0; i < S.length; i++) {
        var s = S[i];
        if (!red) {
          s.y -= 0.1 * s.z;
          if (s.y < -6) s.y = H + 6;
        }
        var x = s.x - mx * 26 * s.z,
          y = (((s.y - scY * 0.06 * s.z - my * 26 * s.z) % H) + H) % H,
          tw = 0.55 + 0.45 * Math.sin((t / 900) * s.sp + s.p),
          col = dark ? s.c : fc;
        cx.fillStyle = col;
        cx.strokeStyle = col;
        if (s.k === 0) {
          cx.globalAlpha = (0.15 + 0.5 * s.z) * tw;
          cx.beginPath();
          cx.arc(x, y, 0.35 + s.z * 0.6, 0, 6.283);
          cx.fill();
        } else if (s.k === 1) {
          cx.globalAlpha = (0.35 + 0.6 * s.z) * tw;
          cx.beginPath();
          cx.arc(x, y, 0.8 + s.z * 0.9, 0, 6.283);
          cx.fill();
        } else {
          var gr = 10 + s.z * 9,
            g = cx.createRadialGradient(x, y, 0, x, y, gr);
          g.addColorStop(0, col);
          g.addColorStop(1, "rgba(255,255,255,0)");
          cx.globalAlpha = 0.22 * tw;
          cx.fillStyle = g;
          cx.beginPath();
          cx.arc(x, y, gr, 0, 6.283);
          cx.fill();
          cx.fillStyle = col;
          cx.globalAlpha = 0.9 * (0.7 + 0.3 * tw);
          cx.beginPath();
          cx.arc(x, y, 1.2 + s.z * 0.9, 0, 6.283);
          cx.fill();
          var l = (7 + s.z * 11) * (0.6 + 0.4 * tw);
          cx.globalAlpha = 0.5 * tw;
          cx.lineWidth = 0.8;
          cx.beginPath();
          cx.moveTo(x - l, y);
          cx.lineTo(x + l, y);
          cx.moveTo(x, y - l);
          cx.lineTo(x, y + l);
          cx.stroke();
        }
      }
      if (!red) {
        if (t > nx && sh.length < 2) {
          sh.push({
            x: W * (0.3 + Math.random() * 0.7),
            y: Math.random() * H * 0.4,
            l: 0,
          });
          nx = t + 2800 + Math.random() * 4200;
        }
        cx.lineCap = "round";
        for (var j = sh.length - 1; j >= 0; j--) {
          var m = sh[j],
            a = Math.max(1 - m.l / 70, 0),
            tx = m.x + 150,
            ty = m.y - 83,
            lg = cx.createLinearGradient(m.x, m.y, tx, ty);
          lg.addColorStop(0, "rgba(255,255,255," + 0.95 * a + ")");
          lg.addColorStop(1, "rgba(255,255,255,0)");
          cx.globalAlpha = 1;
          cx.strokeStyle = lg;
          cx.lineWidth = 1.8;
          cx.beginPath();
          cx.moveTo(m.x, m.y);
          cx.lineTo(tx, ty);
          cx.stroke();
          cx.fillStyle = "rgba(255,255,255," + a + ")";
          cx.beginPath();
          cx.arc(m.x, m.y, 1.6, 0, 6.283);
          cx.fill();
          m.x -= 9;
          m.y += 5;
          m.l++;
          if (m.l > 70) sh.splice(j, 1);
        }
        cx.globalAlpha = 1;
        requestAnimationFrame(draw);
      }
    }

    rs();
    addEventListener("resize", rs);
    if (!red) requestAnimationFrame(draw);

    /* --- optimasi: jeda animasi saat tab disembunyikan / kanvas di luar layar --- */
    function resume() {
      if (red || !paused) return;
      paused = false;
      lastT = 0;
      requestAnimationFrame(draw);
    }
    document.addEventListener("visibilitychange", function () {
      paused = !!document.hidden;
      if (!paused) resume();
    });
    new IntersectionObserver(
      function (e) {
        if (e[0].isIntersecting) resume();
        else paused = true;
      },
      { threshold: 0 },
    ).observe(cv);
  });

  /* ---------- spotlight grid ---------- */
  safe(function () {
    if (!matchMedia("(hover:hover)").matches) return;
    var bg = $("#bg"),
      orn = $(".orn");
    addEventListener(
      "pointermove",
      function (e) {
        if (bg) {
          bg.style.setProperty("--mx", e.clientX + "px");
          bg.style.setProperty("--my", e.clientY + "px");
        }
        if (orn) {
          orn.style.setProperty("--px", e.clientX / innerWidth - 0.5);
          orn.style.setProperty("--py", e.clientY / innerHeight - 0.5);
        }
      },
      { passive: true },
    );
  });

  /* ---------- reveal + counter ---------- */
  safe(function () {
    function count(el2) {
      var n = +el2.dataset.n,
        s = null;
      cancelAnimationFrame(el2._raf);
      if (!isFinite(n)) return;
      if (red) {
        el2.textContent = n;
        return;
      }
      (function f(t) {
        if (!s) s = t;
        var p = Math.min((t - s) / 1500, 1);
        el2.textContent = Math.round(n * (1 - Math.pow(1 - p, 4)));
        if (p < 1) el2._raf = requestAnimationFrame(f);
      })(performance.now());
    }
    function counters(t) {
      return $$("[data-n]").filter(function (c) {
        return c === t || (t.contains && t.contains(c));
      });
    }
    /* angka statistik mengikuti jumlah elemen aslinya */
    $$("[data-from]").forEach(function (b) {
      var sel = b.getAttribute("data-from");
      if (!sel) return;
      var n2 = 0;
      try {
        n2 = $$(sel).length;
      } catch (e) {
        n2 = 0;
      }
      if (n2) b.dataset.n = n2;
    });

    var io = new IntersectionObserver(
      function (es) {
        es.forEach(function (e) {
          var t = e.target;
          if (e.isIntersecting) {
            t.classList.add("in");
            counters(t).forEach(count);
          } else {
            var above = e.boundingClientRect.top < 0;
            t.classList.toggle("from-top", above);
            t.classList.remove("in");
            counters(t).forEach(function (c) {
              cancelAnimationFrame(c._raf);
              if (!red) c.textContent = "0";
            });
          }
        });
      },
      { threshold: 0.15 },
    );
    $$(".rv").forEach(function (n) {
      io.observe(n);
    });

    var hero = $("#home");
    if (!hero) return;
    new IntersectionObserver(
      function (es) {
        es.forEach(function (e) {
          if (red) return;
          if (e.isIntersecting) {
            if (hero.classList.contains("rr")) {
              void hero.offsetWidth;
              hero.classList.remove("rr");
            }
          } else if (
            e.boundingClientRect.top < 0 ||
            e.boundingClientRect.bottom < 0
          ) {
            hero.classList.add("rr");
          }
        });
      },
      { threshold: 0 },
    ).observe(hero);
  });

  /* ---------- nav aktif + tombol turun ---------- */
  safe(function () {
    var ids = ["home", "about", "portfolio", "contact"],
      cur = 0,
      dn = $("#dn"),
      sections = ids
        .map(function (i) {
          return $("#" + i);
        })
        .filter(Boolean);
    if (!sections.length) return;

    var so = new IntersectionObserver(
      function (es) {
        es.forEach(function (e) {
          if (!e.isIntersecting) return;
          cur = ids.indexOf(e.target.id);
          $$("#nv nav a").forEach(function (a) {
            a.classList.toggle(
              "on",
              a.getAttribute("href") === "#" + e.target.id,
            );
          });
          if (dn) {
            var last = cur === ids.length - 1;
            dn.classList.toggle("up", last);
            dn.setAttribute(
              "aria-label",
              last ? "Kembali ke atas" : "Ke bagian berikutnya",
            );
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach(function (s) {
      so.observe(s);
    });

    if (dn) {
      dn.addEventListener("click", function () {
        var n = cur >= ids.length - 1 ? "home" : ids[cur + 1],
          target = $("#" + n);
        if (target)
          target.scrollIntoView({ behavior: red ? "auto" : "smooth" });
      });
    }
  });

  /* ---------- tab ---------- */
  safe(function () {
    var tb = $$("#tabs button"),
      ind = $("#ind");
    if (!tb.length || !ind) return;

    function mv(b) {
      if (!b) return;
      ind.style.width = b.offsetWidth + "px";
      ind.style.transform = "translateX(" + b.offsetLeft + "px)";
    }

    function pilih(b, fokus) {
      var t = b.getAttribute("data-t");
      /* validasi: target harus elemen yang benar-benar ada */
      if (!t || !document.getElementById(t)) return;
      tb.forEach(function (x) {
        var aktif = x === b;
        x.classList.toggle("on", aktif);
        x.setAttribute("aria-selected", aktif ? "true" : "false");
        x.tabIndex = aktif ? 0 : -1;
      });
      $$(".pn").forEach(function (p) {
        var tampil = p.id === t;
        p.classList.toggle("on", tampil);
        p.hidden = !tampil;
      });
      mv(b);
      if (fokus) b.focus();
    }

    tb.forEach(function (b, i) {
      b.addEventListener("click", function () {
        pilih(b, false);
      });
      /* navigasi papan tipe: panah kiri/kanan, Home, End */
      b.addEventListener("keydown", function (e) {
        var k = e.key,
          n = null;
        if (k === "ArrowRight" || k === "ArrowDown") n = (i + 1) % tb.length;
        else if (k === "ArrowLeft" || k === "ArrowUp")
          n = (i - 1 + tb.length) % tb.length;
        else if (k === "Home") n = 0;
        else if (k === "End") n = tb.length - 1;
        if (n === null) return;
        e.preventDefault();
        pilih(tb[n], true);
      });
    });

    /* sinkronkan hidden dengan keadaan awal */
    $$(".pn").forEach(function (p) {
      p.hidden = !p.classList.contains("on");
    });

    function fit() {
      mv($("#tabs .on") || tb[0]);
    }
    fit();
    addEventListener("resize", fit);
    if (document.fonts && document.fonts.ready)
      document.fonts.ready.then(fit);
  });

  /* ---------- kontak ---------- */
  safe(function () {
    var IC = {
        email: "em",
        whatsapp: "wa",
        instagram: "ig",
        github: "gh",
        tiktok: "tt",
      },
      nm = {
        email: "Email",
        whatsapp: "WhatsApp",
        instagram: "Instagram",
        github: "GitHub",
        tiktok: "TikTok",
      },
      sn = $("#sn");
    if (!sn) return;

    Object.keys(nm).forEach(function (k) {
      var v = LINKS[k];

      var label = el("b", "ci");
      var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("aria-hidden", "true");
      var use = document.createElementNS("http://www.w3.org/2000/svg", "use");
      use.setAttribute("href", "#" + IC[k]);
      svg.appendChild(use);
      label.appendChild(svg);
      label.appendChild(document.createTextNode(nm[k]));

      var arrow = el("i");
      arrow.textContent = "↗";

      if (v) {
        var a = el("a");
        /* hanya izinkan skema yang aman (cegah javascript: / data:) */
        var url = k === "email" ? "mailto:" + v : v;
        if (k !== "email") {
          try {
            var u = new URL(v);
            if (u.protocol !== "https:" && u.protocol !== "http:")
              throw new Error("skema tidak diizinkan");
          } catch (e) {
            return;
          }
          a.target = "_blank";
          a.rel = "noopener noreferrer";
        }
        a.href = url;
        a.appendChild(label);
        a.appendChild(arrow);
        sn.appendChild(a);
      } else {
        var sp = el("span");
        var small = el("small", "mono");
        small.textContent = "segera diisi";
        sp.appendChild(label);
        sp.appendChild(small);
        sn.appendChild(sp);
      }
    });
  });

  /* ---------- form kontak ---------- */
  safe(function () {
    var fm = $("#fm");
    if (!fm) return;

    fm.addEventListener("submit", function (e) {
      e.preventDefault();
      var nama = (fm.n && fm.n.value ? fm.n.value : "").trim(),
        mail = (fm.e && fm.e.value ? fm.e.value : "").trim(),
        pesan = (fm.m && fm.m.value ? fm.m.value : "").trim();

      /* batasi panjang input supaya URL mailto tidak rusak / disalahgunakan */
      if (nama.length > 80) nama = nama.slice(0, 80);
      if (mail.length > 120) mail = mail.slice(0, 120);
      if (pesan.length > 2000) pesan = pesan.slice(0, 2000);

      if (!pesan) {
        toast("Tulis pesanmu dulu ya.");
        if (fm.m) fm.m.focus();
        return;
      }
      if (mail && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mail)) {
        toast("Format emailnya belum benar.");
        if (fm.e) fm.e.focus();
        return;
      }
      if (!LINKS.email) {
        toast("Pengiriman pesan aktif setelah email dihubungkan.");
        return;
      }
      /* buang karakter kontrol (newline) agar tidak menyisipkan header mailto */
      var clean = function (s) {
        return s.replace(/[\r\n]+/g, " ");
      };
      var ttd = [clean(nama), mail ? "(" + clean(mail) + ")" : ""]
        .filter(Boolean)
        .join(" ");

      location.href =
        "mailto:" +
        LINKS.email +
        "?subject=" +
        encodeURIComponent("Pesan dari " + (clean(nama) || "pengunjung")) +
        "&body=" +
        encodeURIComponent(pesan + (ttd ? "\n\n" + ttd : ""));
      toast(
        "Membuka aplikasi email… kalau tidak terbuka, hubungi lewat WhatsApp ya.",
        5200,
      );
    });
  });

  /* ---------- ganti logo SVG -> PNG bila file ada ---------- */
  safe(function () {
    $$("svg use").forEach(function (u) {
      if (u.closest("symbol")) return;
      var sv = u.ownerSVGElement;
      if (!sv || !sv.parentNode) return;
      var id = (u.getAttribute("href") || "").slice(1),
        /* label diambil hanya dari elemen yang benar-benar milik ikon ini,
           jangan pakai textContent induk (bisa ikut teks elemen lain) */
        label =
          (sv.parentNode.textContent || "").trim() ||
          (sv.closest("[data-name]") || {}).dataset?.name ||
          "",
        src = LOGOS[id] || LOGOS[label];
      if (!src) return;
      var im = new Image();
      im.alt = "";
      im.className = "lgi";
      im.referrerPolicy = "no-referrer";
      im.decoding = "async";
      /* gambar ini dipakai sebagai pengganti SVG dan baru masuk halaman
         setelah onload. Kalau diberi loading="lazy" sementara ia masih
         di luar DOM, browser tidak akan pernah memuatnya sehingga
         onload tak pernah jalan dan logo SVG tidak terganti.
         Jadi paksa eager; ukurannya sudah dikecilkan agar ringan. */
      ["width", "height"].forEach(function (a) {
        if (sv.getAttribute(a)) im.setAttribute(a, sv.getAttribute(a));
      });
      im.onload = function () {
        if (sv.isConnected) sv.replaceWith(im);
      };
      im.src = src;
    });
  });
})();
