(function () {
  'use strict';

  document.querySelectorAll('[data-vlog-player]').forEach(function (player) {
    var video = player.querySelector('video');
    var button = player.querySelector('[data-vlog-toggle]');
    var label = player.querySelector('[data-vlog-label]');
    var status = player.querySelector('[data-vlog-status]');
    var fallback = player.querySelector('[data-vlog-fallback]');

    if (!video || !button || !label || !status || !fallback) return;

    function silence() {
      video.muted = true;
      video.defaultMuted = true;
      video.volume = 0;
    }

    function setStopped(replay) {
      player.classList.remove('is-playing');
      button.setAttribute('aria-label', replay ? '動画をもう一度再生' : '動画を再生');
      label.textContent = replay ? 'もう一度再生' : '再生する';
    }

    function setPlaying() {
      silence();
      player.classList.add('is-playing');
      button.setAttribute('aria-label', '動画を一時停止');
      label.textContent = '一時停止';
      status.textContent = '';
    }

    silence();

    button.addEventListener('click', function () {
      if (!video.paused && !video.ended) {
        video.pause();
        return;
      }
      if (video.ended) video.currentTime = 0;
      silence();
      var playRequest = video.play();
      if (playRequest && typeof playRequest.catch === 'function') {
        playRequest.catch(function () {
          setStopped(false);
          status.textContent = '再生を開始できませんでした。';
        });
      }
    });

    video.addEventListener('play', setPlaying);
    video.addEventListener('pause', function () { setStopped(video.ended); });
    video.addEventListener('ended', function () { setStopped(true); });
    video.addEventListener('volumechange', silence);
    video.addEventListener('error', function () {
      setStopped(false);
      button.disabled = true;
      status.textContent = '動画を再生できませんでした。';
      fallback.hidden = false;
    });
  });
}());
