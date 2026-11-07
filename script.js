(function () {
  var PHOTO = "img/pp.png";
  var PHOTO_PROFIL = "img/ppgw.png";
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
  var LINKS = {
    email: "yahyaismailsinaga0@gmail.com",
    whatsapp: "https://wa.me/62882015822536",
    instagram: "https://www.instagram.com/yahyaismail00",
    github: "https://github.com/yahyaismailsinaga1-24",
    tiktok: "https://www.tiktok.com/@ya_kyle.3",
  };

  /* ========================= */
  var $ = function (s) {
      return document.querySelector(s);
    },
    $$ = function (s) {
      return Array.prototype.slice.call(document.querySelectorAll(s));
    };
  var red = matchMedia("(prefers-reduced-motion: reduce)").matches,
    root = document.documentElement;
  $("#yr").textContent = new Date().getFullYear();
  /* siluet abu-abu bawaan disembunyikan kalau foto asli sudah tampil */
  var sty = document.createElement("style");
  sty.textContent = ".ph.has::before,.ph.has::after{display:none}";
  document.head.appendChild(sty);
  $$(".ph").forEach(function (p) {
    var src = p.closest("#pc") ? PHOTO_PROFIL || PHOTO : PHOTO;
    if (!src) return;
    var i = new Image();
    i.onload = function () {
      p.classList.add("has");
    };
    i.src = src;
    i.alt = "";
    p.insertBefore(i, p.firstChild);
  });

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
      "Passionate About Technology & Automotive",
      "AI Engineer",
    ],
    ty = $("#ty"),
    ri = 0,
    ci = 0,
    dl = false;
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

  /* bintang di tali */
  $("#st").innerHTML = "<b>" + "<i>✦</i>".repeat(18) + "</b>";

  /* pita */
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
    rh = "";
  wd.forEach(function (x) {
    rh += "<span>" + x + "</span>";
  });
  $$(".rt").forEach(function (r) {
    r.innerHTML = rh + rh + rh + rh;
  });

  /* toast */
  var tt;
  function toast(m) {
    var t = $("#ts");
    t.textContent = m;
    t.classList.add("on");
    clearTimeout(tt);
    tt = setTimeout(function () {
      t.classList.remove("on");
    }, 2600);
  }

  /* lanyard: tali elastis, bisa ditarik melar ke kiri dan kanan */
  var anc = $(".lanc"),
    st = $("#st"),
    hk = $("#hk"),
    cd = $("#cd"),
    hero = $("#home"),
    L = 170,
    P = { x: 150, y: 90 },
    V = { x: 0, y: 0 },
    T = null,
    off = { x: 0, y: 0 },
    drag = false,
    vis = true,
    ph = 0,
    pv = 0;
  function gl() {
    L = parseFloat(getComputedStyle(hero).getPropertyValue("--sl")) || 170;
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
    cd.setPointerCapture(e.pointerId);
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
  ).observe($("#home"));

  /* latar bintang: 3 lapis (debu, sedang, terang berkilau) + kedip warna + parallax scroll + meteor */
  var cv = $("#cv"),
    cx = cv.getContext("2d"),
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
  function rs() {
    var d = Math.min(devicePixelRatio || 1, 2);
    W = innerWidth;
    H = innerHeight;
    cv.width = W * d;
    cv.height = H * d;
    cx.setTransform(d, 0, 0, d, 0, 0);
    var n = Math.min(380, Math.round((W * H) / 5200));
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
        /* bintang terang: glow + inti + kilau 4 arah */
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

  /* spotlight grid */
  if (matchMedia("(hover:hover)").matches)
    addEventListener(
      "pointermove",
      function (e) {
        var b = $("#bg").style;
        b.setProperty("--mx", e.clientX + "px");
        b.setProperty("--my", e.clientY + "px");
        var o = $(".orn").style;
        o.setProperty("--px", e.clientX / innerWidth - 0.5);
        o.setProperty("--py", e.clientY / innerHeight - 0.5);
      },
      { passive: true },
    );

  /* reveal + counter (diulang tiap masuk layar, termasuk saat scroll ke atas) */
  function count(el) {
    var n = +el.dataset.n,
      s = null;
    cancelAnimationFrame(el._raf);
    if (red) {
      el.textContent = n;
      return;
    }
    (function f(t) {
      if (!s) s = t;
      var p = Math.min((t - s) / 1500, 1);
      el.textContent = Math.round(n * (1 - Math.pow(1 - p, 4)));
      if (p < 1) el._raf = requestAnimationFrame(f);
    })(performance.now());
  }
  function counters(el) {
    var list = $$("[data-n]").filter(function (c) {
      return c === el || el.contains(c);
    });
    return list;
  }
  var io = new IntersectionObserver(
    function (es) {
      es.forEach(function (e) {
        var el = e.target;
        if (e.isIntersecting) {
          el.classList.add("in");
          counters(el).forEach(count);
        } else {
          /* elemen keluar lewat atas -> nanti muncul lagi dari atas (scroll ke atas),
             keluar lewat bawah -> muncul lagi dari bawah (scroll ke bawah) */
          var above = e.boundingClientRect.top < 0;
          el.classList.toggle("from-top", above);
          el.classList.remove("in");
          counters(el).forEach(function (c) {
            cancelAnimationFrame(c._raf);
            if (!red) c.textContent = "0";
          });
        }
      });
    },
    { threshold: 0.15 },
  );
  $$(".rv").forEach(function (el) {
    io.observe(el);
  });

  /* hero: animasi masuk diputar ulang saat kembali ke atas */
  var hrs = $$(".rise");
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

  /* nav aktif + tombol turun */
  var ids = ["home", "about", "portfolio", "contact"],
    cur = 0;
  var so = new IntersectionObserver(
    function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          cur = ids.indexOf(e.target.id);
          $$("#nv nav a").forEach(function (a) {
            a.classList.toggle(
              "on",
              a.getAttribute("href") === "#" + e.target.id,
            );
          });
          $("#dn").classList.toggle("up", cur === ids.length - 1);
        }
      });
    },
    { threshold: 0.5 },
  );
  ids.forEach(function (i) {
    so.observe($("#" + i));
  });
  $("#dn").onclick = function () {
    var n = cur >= ids.length - 1 ? "home" : ids[cur + 1];
    $("#" + n).scrollIntoView({ behavior: red ? "auto" : "smooth" });
  };

  /* tab */
  var tb = $$("#tabs button"),
    ind = $("#ind");
  function mv(b) {
    ind.style.width = b.offsetWidth + "px";
    ind.style.transform = "translateX(" + b.offsetLeft + "px)";
  }
  tb.forEach(function (b) {
    b.onclick = function () {
      tb.forEach(function (x) {
        x.classList.toggle("on", x === b);
      });
      $$(".pn").forEach(function (p) {
        p.classList.toggle("on", p.id === b.dataset.t);
      });
      mv(b);
    };
  });
  function fit() {
    mv($("#tabs .on"));
  }
  fit();
  addEventListener("resize", fit);
  if (document.fonts) document.fonts.ready.then(fit);

  /* kontak */
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
    h = "";
  Object.keys(nm).forEach(function (k) {
    var v = LINKS[k],
      lb =
        '<b class="ci"><svg aria-hidden="true"><use href="#' +
        IC[k] +
        '"/></svg>' +
        nm[k] +
        "</b>";
    h += v
      ? '<a href="' +
        (k === "email" ? "mailto:" + v : v) +
        '" target="_blank" rel="noopener">' +
        lb +
        "<i>↗</i></a>"
      : "<span>" + lb + '<small class="mono">segera diisi</small></span>';
  });
  $("#sn").innerHTML = h;
  $("#fm").addEventListener("submit", function (e) {
    e.preventDefault();
    var f = e.target;
    if (!f.m.value.trim()) {
      toast("Tulis pesanmu dulu ya.");
      return;
    }
    if (!LINKS.email) {
      toast("Pengiriman pesan aktif setelah email dihubungkan.");
      return;
    }
    location.href =
      "mailto:" +
      LINKS.email +
      "?subject=" +
      encodeURIComponent("Pesan dari " + (f.n.value || "pengunjung")) +
      "&body=" +
      encodeURIComponent(
        f.m.value + "\n\n" + f.n.value + " (" + f.e.value + ")",
      );
  });

  /* ganti logo bila diisi di LOGOS */
  $$("svg use").forEach(function (u) {
    var sv = u.ownerSVGElement,
      id = (u.getAttribute("href") || "").slice(1),
      src = LOGOS[id] || LOGOS[sv.parentNode.textContent.trim()];
    if (!src) return;
    var im = new Image();
    im.src = src;
    im.alt = "";
    im.className = "lgi";
    ["width", "height"].forEach(function (a) {
      if (sv.getAttribute(a)) im.setAttribute(a, sv.getAttribute(a));
    });
    sv.replaceWith(im);
  });
})();
