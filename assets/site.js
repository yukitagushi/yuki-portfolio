/* taguchi338.com — 共通スクリプト（モバイルメニュー / スクロール表示 / 問い合わせフォーム） */
(function () {
  "use strict";

  /* モバイルメニュー */
  var menuBtn = document.querySelector(".menu-btn");
  var mobileMenu = document.querySelector(".mobile-menu");
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", function () {
      var open = mobileMenu.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.textContent = open ? "✕" : "☰";
    });
    mobileMenu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mobileMenu.classList.remove("is-open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.textContent = "☰";
      });
    });
  }

  /* スクロール連動の控えめなフェードイン */
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!prefersReduced && "IntersectionObserver" in window) {
    var targets = document.querySelectorAll("[data-reveal]");
    targets.forEach(function (el) { el.classList.add("reveal"); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* 問い合わせフォーム → mailto 生成（送信サーバ不要） */
  var form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var get = function (id) {
        var el = document.getElementById(id);
        return el ? el.value.trim() : "";
      };
      var name = get("cfName");
      var company = get("cfCompany");
      var category = get("cfCategory");
      var message = get("cfMessage");
      var subject = "無料相談のお問い合わせ" + (category ? "（" + category + "）" : "");
      var body =
        "お名前：" + name + "\n" +
        "会社名・屋号（任意）：" + company + "\n" +
        "ご相談の種類：" + category + "\n" +
        "ご相談内容：\n" + message + "\n";
      window.location.href =
        "mailto:30.sc350@gmail.com?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
    });
  }
})();
