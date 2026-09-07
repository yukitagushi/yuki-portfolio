/* Progressive enhancement. All content and links are present in static HTML. */
(function () {
  'use strict';
  var menuBtn = document.querySelector('.menu-btn');
  var mobileMenu = document.querySelector('.mobile-menu');
  function setMenu(open) {
    mobileMenu.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    menuBtn.textContent = open ? '✕' : '☰';
  }
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function () { setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'); });
    mobileMenu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') { setMenu(false); menuBtn.focus(); }
    });
    window.matchMedia('(min-width: 920px)').addEventListener('change', function (e) { if (e.matches) setMenu(false); });
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
