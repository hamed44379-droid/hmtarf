/**
 * Scroll-driven hero video — Tafrihan collaboration page.
 *
 * The user's scroll position is the ONLY thing that moves the video forward:
 * no autoplay, no loop, no play(). Scrolling scrubs video.currentTime through
 * the full 8s timeline across the hero's 300vh runway.
 *
 * Architecture (performance-critical):
 *   - ONE passive scroll listener. It only computes targetTime.
 *   - ONE requestAnimationFrame loop converges renderTime toward targetTime
 *     (critically-damped lerp), and writes video.currentTime only when the
 *     previous seek has finished and the change is worth more than half a frame.
 *   - All overlay text is driven by direct DOM class/variable writes inside the
 *     same rAF — no React state, no per-scroll re-renders, no layout thrash.
 *   - The loop self-suspends once everything is settled, so an idle page costs 0 CPU.
 *
 * Encoding notes for smooth scrubbing (see index.html): frequent keyframes
 * (0.5s), no B-frames, faststart, modest resolution/bitrate, muted clip.
 */
(() => {
  "use strict";

  const hero = document.getElementById("hero");
  const stage = document.getElementById("heroStage");
  const video = document.getElementById("heroVideo");
  const features = document.getElementById("heroFeatures");

  if (!hero || !stage || !video || !features) return;

  // --- Tuning -------------------------------------------------------------
  const SMOOTHING = 0.18;     // per-frame lerp factor: responsive, no visible lag
  const SETTLE = 0.012;       // seconds; snap renderTime to target below this
  const MIN_SEEK = 0.02;      // seconds; don't seek for sub-half-frame changes
  const INTRO_RANGE = 0.12;   // intro copy fully faded after 12% of the runway
  const FEATURES_AT = 5;      // reveal the feature copy at t >= 5s of the video

  const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);

  // --- State --------------------------------------------------------------
  let duration = 0;
  let sectionTop = 0;
  let scrollSpan = 1;
  let targetTime = 0;
  let renderTime = 0;
  let rafId = null;
  let scrubReady = false;      // enough data buffered to scrub without stalls
  let lastIntro = -1;
  let featuresShown = false;

  // --- Reduced motion: static poster hero, video never loads ---------------
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.documentElement.classList.add("reduced-motion");
    hero.classList.add("hero--static");
    stage.classList.add("is-ready"); // reveal the poster backdrop
    video.pause();
    video.removeAttribute("src");
    if (video.firstElementChild) video.removeChild(video.firstElementChild);
    video.load();
    return;
  }

  // --- Measurement --------------------------------------------------------
  function measure() {
    const rect = hero.getBoundingClientRect();
    sectionTop = rect.top + window.scrollY;
    scrollSpan = Math.max(1, hero.offsetHeight - window.innerHeight);
  }

  function updateTarget() {
    const progress = clamp((window.scrollY - sectionTop) / scrollSpan, 0, 1);
    targetTime = duration > 0 ? progress * duration : 0;
    return progress;
  }

  // --- Overlay text (direct DOM writes, no state) --------------------------
  function updateOverlays() {
    const progress = duration > 0 ? targetTime / duration : 0;
    const intro = clamp(progress / INTRO_RANGE, 0, 1);

    if (Math.abs(intro - lastIntro) > 0.004) {
      lastIntro = intro;
      stage.style.setProperty("--intro", intro.toFixed(3));
      stage.classList.toggle("intro-hidden", intro >= 0.999);
    }

    const show = scrubReady && renderTime >= FEATURES_AT;
    if (show !== featuresShown) {
      featuresShown = show;
      features.classList.toggle("is-visible", show);
      features.setAttribute("aria-hidden", show ? "false" : "true");
    }
  }

  // --- The single rAF loop --------------------------------------------------
  function tick() {
    rafId = null;

    // Smoothly converge toward the scroll target (prevents harsh frame jumps).
    const diff = targetTime - renderTime;
    if (Math.abs(diff) <= SETTLE) renderTime = targetTime;
    else renderTime += diff * SMOOTHING;

    // Seek only when the previous seek finished and the change is meaningful —
    // this prevents flooding the decoder with hundreds of seeks per second.
    let seekPending = false;
    if (duration > 0 && scrubReady && !video.seeking && video.readyState >= 2) {
      if (Math.abs(renderTime - video.currentTime) > MIN_SEEK) {
        video.currentTime = clamp(renderTime, 0, duration);
      }
      seekPending = Math.abs(renderTime - video.currentTime) > MIN_SEEK;
    }

    updateOverlays();

    // Keep the loop alive only while something is still in motion.
    if (renderTime !== targetTime || seekPending) {
      rafId = requestAnimationFrame(tick);
    }
  }

  function startLoop() {
    if (rafId === null) rafId = requestAnimationFrame(tick);
  }

  // --- Readiness / fallback -------------------------------------------------
  function syncFromScroll(snap) {
    updateTarget();
    if (snap) renderTime = targetTime;
    startLoop();
  }

  function unlockScrubbing() {
    if (scrubReady) return;
    scrubReady = true;
    measure();
    syncFromScroll(true); // handle refresh mid-page: land on the right frame at once
  }

  // Reveal the video as soon as the first frame is decodable.
  video.addEventListener("loadeddata", () => stage.classList.add("is-ready"), { once: true });

  // Scrub only once the browser has (nearly) the whole clip buffered.
  video.addEventListener("canplaythrough", unlockScrubbing, { once: true });
  video.addEventListener("canplay", () => {
    // Safety net: if canplaythrough never fires, unlock shortly after canplay.
    setTimeout(() => {
      if (!scrubReady) {
        const buffered = video.buffered;
        const covered = buffered.length > 0 && buffered.end(buffered.length - 1) >= Math.max(duration - 1, 0);
        if (covered || video.readyState >= 3) unlockScrubbing();
      }
    }, 4000);
  }, { once: true });

  // If the video genuinely fails, the poster backdrop already in place becomes
  // the fallback hero: page stays functional, loader fades, copy remains.
  video.addEventListener("error", () => {
    stage.classList.add("is-ready");
  }, true);

  // Listeners ---------------------------------------------------------------
  window.addEventListener("scroll", () => {
    if (!scrubReady) return;
    updateTarget();
    startLoop();
  }, { passive: true });

  window.addEventListener("resize", () => {
    measure();
    if (scrubReady) syncFromScroll(false);
  });

  // Kick off once metadata (and therefore the real duration) is known.
  video.addEventListener("loadedmetadata", () => {
    duration = isFinite(video.duration) ? video.duration : 0;
    measure();
  }, { once: true });

  // A finished seek may still leave work to converge — resume the loop.
  video.addEventListener("seeked", () => {
    if (scrubReady && (Math.abs(renderTime - targetTime) > SETTLE ||
        Math.abs(renderTime - video.currentTime) > MIN_SEEK)) {
      startLoop();
    }
  });

  measure();
})();
