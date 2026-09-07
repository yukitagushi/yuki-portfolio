/* Silent background clips enhance a static poster; headings remain readable without JavaScript. */
(function () {
  'use strict';

  document.querySelectorAll('[data-hero-reel]').forEach(function (root) {
    var slides = Array.from(root.querySelectorAll('.reel-slides > .reel-slide'));
    var videos = slides.map(function (slide) { return slide.querySelector('video'); });
    var controls = root.querySelector('.reel-controls');
    var toggle = root.querySelector('[data-reel-toggle]');
    if (!slides.length || !controls || !toggle || videos.some(function (video) { return !video || !video.dataset.src; })) return;

    var label = root.querySelector('[data-reel-toggle-label]');
    var progress = Array.from(root.querySelectorAll('[data-reel-progress]'));
    var count = root.querySelector('[data-reel-count]');
    var status = root.querySelector('[data-reel-status]');
    var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    var active = Math.max(0, slides.findIndex(function (slide) { return slide.classList.contains('is-active'); }));
    var wantsPlayback = !motion.matches && !(connection && connection.saveData);
    var inView = false;
    var pageSuspended = false;
    var revision = 0;
    var playedTime = 0;
    var lastMediaTime = 0;
    var requests = new Map();
    var fades = new Map();
    var segmentLength = 8;
    var fadeLength = 650;

    function canRun() { return wantsPlayback && inView && !document.hidden && !pageSuspended; }
    function say(message) { if (status) status.textContent = message; }

    function updatePlaybackUI() {
      var playing = canRun() && videos[active].readyState >= 2 && !videos[active].paused && !videos[active].ended;
      root.dataset.reelState = playing ? 'playing' : (canRun() ? 'loading' : 'paused');
      root.classList.toggle('is-paused', !wantsPlayback);
      toggle.setAttribute('aria-label', wantsPlayback ? '背景の動きを一時停止' : '背景の動きを再開');
      if (label) label.textContent = wantsPlayback ? '一時停止' : '再開';
    }

    function updateSelection() {
      slides.forEach(function (slide, index) {
        slide.classList.toggle('is-active', index === active);
      });
      progress.forEach(function (bar, index) {
        bar.classList.toggle('is-active', index === active);
      });
      if (count) count.textContent = String(active + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');
      root.style.setProperty('--reel-progress', '0');
    }

    function cancelFade(video) {
      if (!fades.has(video)) return;
      window.clearTimeout(fades.get(video));
      fades.delete(video);
    }

    function stopAll() {
      videos.forEach(function (video, index) {
        cancelFade(video);
        video.pause();
        video.preload = 'none';
        if (index !== active) slides[index].classList.remove('is-playing');
      });
    }

    function releaseVideo(video, index) {
      video.pause();
      video.preload = 'none';
      slides[index].classList.remove('is-playing');
      if (video.hasAttribute('src')) {
        requests.delete(video);
        video.removeAttribute('src');
        video.load(); // Emptying the source releases a finished clip's buffer and cancels its download.
      }
    }

    function trimSources() {
      var upcoming = (active + 1) % videos.length;
      videos.forEach(function (video, index) {
        if (index !== active && index !== upcoming && !fades.has(video)) releaseVideo(video, index);
      });
    }

    function attachSource(video) {
      if (video.hasAttribute('src')) return;
      video.preload = 'metadata';
      video.src = video.dataset.src;
      video.load();
    }

    function prepareNext() {
      // While crossfading, retain the outgoing clip instead of starting a third download.
      if (!canRun() || fades.size || videos.length < 2 || (connection && connection.saveData)) return;
      trimSources();
      var upcoming = videos[(active + 1) % videos.length];
      upcoming.preload = 'metadata';
      attachSource(upcoming);
    }

    function failPlayback(message) {
      revision += 1;
      wantsPlayback = false;
      stopAll();
      slides[active].classList.remove('is-playing');
      updatePlaybackUI();
      say(message);
    }

    function startActive() {
      if (!canRun()) return;
      var video = videos[active];
      cancelFade(video);
      attachSource(video);
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      if (!video.paused && !video.ended) {
        // A quick next/previous can return to the outgoing video before its fade ends.
        if (video.readyState >= 2) slides[active].classList.add('is-playing');
        updatePlaybackUI();
        return;
      }
      var existing = requests.get(video);
      if (existing && existing.revision === revision) return;
      var request = { revision: revision };
      requests.set(video, request);
      lastMediaTime = video.currentTime;
      updatePlaybackUI();
      var attempt;
      try { attempt = video.play(); } catch (error) { attempt = Promise.reject(error); }
      Promise.resolve(attempt).then(function () {
        if (requests.get(video) !== request) return;
        requests.delete(video);
        if (video === videos[active] && canRun()) {
          updatePlaybackUI();
          if (!video.paused) prepareNext();
        } else if (!fades.has(video)) video.pause();
      }).catch(function () {
        if (requests.get(video) !== request) return;
        requests.delete(video);
        if (request.revision !== revision || video !== videos[active] || !canRun()) return;
        failPlayback('背景を再生できませんでした。再開ボタンで再試行できます。');
      });
    }

    function syncRuntime() {
      if (!canRun()) {
        revision += 1; // Ignore a pending play() result after a pause or visibility change.
        stopAll();
      } else startActive();
      updatePlaybackUI();
    }

    function select(index) {
      if (!Number.isInteger(index) || index < 0 || index >= slides.length) return;
      say('');
      if (index === active) return;
      var outgoing = videos[active];
      var outgoingIndex = active;
      revision += 1;
      active = index;
      cancelFade(videos[active]);
      videos.forEach(function (video, otherIndex) {
        if (video !== outgoing && video !== videos[active] && fades.has(video)) {
          cancelFade(video);
          video.pause();
          slides[otherIndex].classList.remove('is-playing');
        }
      });
      slides[active].classList.remove('is-playing');
      playedTime = 0;
      lastMediaTime = 0;
      try { videos[active].currentTime = 0; } catch (_) { /* An unattached clip starts at its first frame. */ }
      updateSelection();
      cancelFade(outgoing);
      if (canRun() && !motion.matches) {
        fades.set(outgoing, window.setTimeout(function () {
          fades.delete(outgoing);
          if (outgoing !== videos[active]) {
            outgoing.pause();
            slides[outgoingIndex].classList.remove('is-playing');
          }
          trimSources();
          if (!videos[active].paused) prepareNext();
        }, fadeLength));
      } else {
        outgoing.pause();
        slides[outgoingIndex].classList.remove('is-playing');
      }
      trimSources();
      syncRuntime();
    }

    videos.forEach(function (video, index) {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;
      video.preload = 'none';
      video.removeAttribute('autoplay');
      video.removeAttribute('loop');
      video.addEventListener('playing', function () {
        if (index !== active || !canRun()) {
          if (!fades.has(video)) video.pause();
          return;
        }
        slides[index].classList.add('is-playing');
        lastMediaTime = video.currentTime;
        updatePlaybackUI();
        prepareNext();
      });
      video.addEventListener('timeupdate', function () {
        if (index !== active || !canRun() || video.paused || video.ended) return;
        var delta = video.currentTime - lastMediaTime;
        lastMediaTime = video.currentTime;
        // Ignore seeks; count actual playback, so buffering and time spent paused do not advance a work.
        if (delta > 0 && delta < 2) playedTime += delta;
        root.style.setProperty('--reel-progress', String(Math.min(1, playedTime / segmentLength)));
        if (playedTime >= segmentLength && slides.length > 1) select((active + 1) % slides.length);
      });
      video.addEventListener('ended', function () {
        if (index !== active || !canRun()) return;
        if (slides.length > 1) select((active + 1) % slides.length);
        else {
          playedTime = 0;
          lastMediaTime = 0;
          video.currentTime = 0;
          startActive();
        }
      });
      video.addEventListener('error', function () {
        if (index !== active || !video.hasAttribute('src')) return;
        failPlayback('背景を読み込めませんでした。再開ボタンで再試行できます。');
      });
    });

    toggle.addEventListener('click', function () {
      wantsPlayback = !wantsPlayback;
      revision += 1;
      say('');
      if (wantsPlayback && videos[active].error) releaseVideo(videos[active], active);
      syncRuntime();
    });

    document.addEventListener('visibilitychange', syncRuntime);
    window.addEventListener('pagehide', function () { pageSuspended = true; syncRuntime(); });
    window.addEventListener('pageshow', function () { pageSuspended = false; syncRuntime(); });
    function preferenceChanged() {
      if (motion.matches || (connection && connection.saveData)) wantsPlayback = false;
      syncRuntime();
    }
    if (motion.addEventListener) motion.addEventListener('change', preferenceChanged);
    else if (motion.addListener) motion.addListener(preferenceChanged);
    if (connection && connection.addEventListener) connection.addEventListener('change', preferenceChanged);

    updateSelection();
    updatePlaybackUI();
    controls.hidden = false;
    root.classList.add('is-enhanced');
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        var entry = entries[entries.length - 1];
        inView = entry.isIntersecting && entry.intersectionRatio > 0;
        syncRuntime();
      }, { threshold: [0, 0.1] });
      observer.observe(root);
    } else {
      var scheduled = false;
      function measureVisibility() {
        scheduled = false;
        var rect = root.getBoundingClientRect();
        var visible = rect.bottom > 0 && rect.top < window.innerHeight && rect.right > 0 && rect.left < window.innerWidth;
        if (visible !== inView) { inView = visible; syncRuntime(); }
      }
      function queueMeasurement() {
        if (scheduled) return;
        scheduled = true;
        window.requestAnimationFrame(measureVisibility);
      }
      window.addEventListener('scroll', queueMeasurement, { passive: true });
      window.addEventListener('resize', queueMeasurement, { passive: true });
      measureVisibility();
    }
  });
})();
