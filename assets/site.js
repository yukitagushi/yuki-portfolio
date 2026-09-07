/* Progressive enhancement. All content and links are present in static HTML. */
(function () {
  'use strict';
  var menuBtn = document.querySelector('.menu-btn');
  var siteMenu = document.getElementById('siteMenu');
  var siteNav = document.querySelector('.site-nav');
  function notifyMenu() { document.dispatchEvent(new Event('site-menu-toggle')); }
  function finishClosing() {
    var wasOpen = document.documentElement.classList.contains('menu-open');
    document.documentElement.classList.remove('menu-open');
    document.documentElement.style.removeProperty('--menu-scrollbar-gap');
    menuBtn.setAttribute('aria-expanded', 'false');
    if (wasOpen) notifyMenu();
  }
  function closeMenu(restoreFocus) {
    if (!siteMenu.open) return;
    siteMenu.close();
    finishClosing();
    if (restoreFocus !== false) menuBtn.focus({ preventScroll: true });
  }
  if (menuBtn && siteMenu && typeof siteMenu.showModal === 'function') {
    menuBtn.hidden = false;
    menuBtn.addEventListener('click', function () {
      if (siteMenu.open) { closeMenu(); return; }
      document.documentElement.style.setProperty('--menu-scrollbar-gap', (window.innerWidth - document.documentElement.clientWidth) + 'px');
      siteMenu.showModal();
      menuBtn.setAttribute('aria-expanded', 'true');
      document.documentElement.classList.add('menu-open');
      notifyMenu();
      siteMenu.querySelector('.menu-links a').focus();
    });
    siteMenu.querySelector('.menu-close').addEventListener('click', function () { closeMenu(); });
    siteMenu.addEventListener('cancel', function (event) { event.preventDefault(); closeMenu(); });
    siteMenu.addEventListener('close', finishClosing);
    siteMenu.addEventListener('click', function (event) {
      if (event.target !== siteMenu) return;
      var box = siteMenu.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) closeMenu();
    });
    siteMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function (event) {
        if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        var destination = new URL(link.href, window.location.href);
        var target = destination.origin === window.location.origin && destination.pathname === window.location.pathname && destination.hash
          ? document.getElementById(decodeURIComponent(destination.hash.slice(1))) : null;
        if (target) {
          event.preventDefault();
          closeMenu(false);
          history.pushState(null, '', destination.pathname + destination.hash);
          window.requestAnimationFrame(function () {
            if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
            target.focus({ preventScroll: true });
            target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
          });
        } else closeMenu(false);
      });
    });
    var hero = document.querySelector('.hero-reel');
    if (hero && siteNav && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        siteNav.classList.toggle('is-over-light', !entries[0].isIntersecting);
      }, { rootMargin: '-72px 0px 0px 0px', threshold: 0 }).observe(hero);
    }
  }
  document.querySelectorAll('[data-copy]').forEach(function (button) {
    button.addEventListener('click', async function () {
      var code = document.getElementById(button.dataset.copy);
      var status = button.closest('.code-block').querySelector('.copy-status');
      if (!code) return;
      try {
        await navigator.clipboard.writeText(code.textContent);
        status.textContent = 'コピーしました。資料に合わせて内容を調整してご利用ください。';
      } catch (_) {
        var range = document.createRange(); range.selectNodeContents(code);
        var selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range);
        status.textContent = '自動コピーができませんでした。選択した文章をコピーしてください。';
      }
    });
  });
  var form = document.getElementById('contactForm');
  if (form) {
    var name = document.getElementById('cfName');
    var message = document.getElementById('cfMessage');
    [name, message].forEach(function (input) { input.addEventListener('input', function () { input.setCustomValidity(''); }); });
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      name.setCustomValidity(name.value.trim() ? '' : 'お名前をご入力ください。');
      message.setCustomValidity(message.value.trim() ? '' : 'ご相談内容をご入力ください。');
      if (!form.reportValidity()) return;
      var company = document.getElementById('cfCompany').value.trim();
      var category = document.getElementById('cfCategory').value;
      var subject = '無料相談のお問い合わせ（' + category + '）';
      var body = 'お名前：' + name.value.trim() + '\n会社名・屋号：' + company + '\nご相談の種類：' + category + '\n\nご相談内容：\n' + message.value.trim() + '\n';
      var draft = document.getElementById('emailDraft');
      if (!draft) {
        draft = document.createElement('div'); draft.id = 'emailDraft'; draft.className = 'email-draft'; draft.setAttribute('role', 'status'); draft.setAttribute('tabindex', '-1'); form.appendChild(draft);
      }
      draft.replaceChildren();
      var notice = document.createElement('p'); notice.textContent = 'メールの下書きを用意しました。まだ送信されていません。';
      var link = document.createElement('a'); link.className = 'btn btn-dark'; link.textContent = 'メールアプリを開く →';
      link.href = 'mailto:30.sc350@gmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      var note = document.createElement('p'); note.className = 'small-note'; note.textContent = '開かない場合は、30.sc350@gmail.com に直接お送りください。';
      draft.append(notice, link, note); draft.focus();
    });
  }
})();
