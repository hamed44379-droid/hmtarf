import { useEffect, useRef, useState } from 'react'
import { HERO, BENEFITS } from '../data/content.js'
import { benefitIcons } from './icons.jsx'

// Scroll-scrubbed cinematic hero:
// - The video NEVER autoplays and NEVER loops; vertical scroll drives the
//   timeline via requestAnimationFrame (lerped for smoothness).
// - At ~5s of the timeline the "Why Collaborate" overlay fades in.
// - The final frame is held at the end of the pinned range, then the page
//   continues naturally to the next sections.
// - prefers-reduced-motion (or a very small viewport height) collapses the
//   pin to a normal static hero with the poster image.
const PIN_VIEWS = 4

export default function Hero() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const contentRef = useRef(null)
  const overlayRef = useRef(null)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    if (reduced) return
    const section = sectionRef.current
    const video = videoRef.current
    const content = contentRef.current
    const overlay = overlayRef.current
    if (!section || !video || !content || !overlay) return

    video.pause()

    let target = 0
    let current = 0
    let duration = 0
    let overlayAt = 5
    let raf = 0

    const clamp01 = (v) => Math.min(1, Math.max(0, v))

    const onScroll = () => {
      const total = section.offsetHeight - window.innerHeight
      if (total <= 0) return
      target = clamp01(-section.getBoundingClientRect().top / total)
    }

    const onMeta = () => {
      duration = video.duration || 0
      overlayAt = duration ? Math.min(5, duration * 0.5) : 5
    }

    const onReady = () => {
      video.style.opacity = '1'
    }

    const render = () => {
      current += (target - current) * 0.14
      if (Math.abs(target - current) < 0.0004) current = target

      const t = current * (duration || 12)
      if (duration && video.readyState >= 1 && Math.abs(video.currentTime - t) > 0.015) {
        try {
          video.currentTime = t
        } catch {
          /* seeking can reject while buffering — harmless */
        }
      }

      const out = clamp01((t - 1.2) / 1.6)
      content.style.opacity = (1 - out).toFixed(3)
      content.style.transform = `translateY(${(-16 * out).toFixed(1)}px)`

      const overlayIn = clamp01((t - overlayAt) / 1.4)
      overlay.style.opacity = overlayIn.toFixed(3)
      overlay.style.visibility = overlayIn > 0.01 ? 'visible' : 'hidden'

      raf = requestAnimationFrame(render)
    }

    video.addEventListener('loadedmetadata', onMeta)
    video.addEventListener('canplay', onReady, { once: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      video.removeEventListener('loadedmetadata', onMeta)
      video.removeEventListener('canplay', onReady)
    }
  }, [reduced])

  return (
    <section className="hero" id="home" ref={sectionRef} style={{ height: `${PIN_VIEWS * 100}vh` }}>
      <div className="hero__sticky">
        <img
          className="hero__poster"
          src={HERO.poster}
          alt={HERO.videoAlt}
          fetchPriority="high"
          decoding="async"
        />
        {!reduced && (
          <video
            ref={videoRef}
            className="hero__video"
            src={HERO.video}
            preload="metadata"
            muted
            playsInline
            disableRemotePlayback
            tabIndex={-1}
            aria-hidden="true"
          />
        )}
        <div className="hero__scrim" aria-hidden="true" />

        <div className="container hero__content" ref={contentRef}>
          <p className="hero__eyebrow">{HERO.eyebrow}</p>
          <h1 className="hero__title">
            Collaboration with <span className="hero__title-accent">Tafrihan</span>
          </h1>
          <p className="hero__lede">{HERO.lede}</p>
          <div className="hero__actions">
            <a className="btn btn--steel" href="#about">
              About Us
            </a>
            <a className="btn btn--ghost" href="#register">
              Get in Touch
            </a>
          </div>
        </div>

        <div className="container hero__overlay" ref={overlayRef} aria-hidden="true">
          <p className="hero__eyebrow">Why Collaborate</p>
          <h2 className="hero__overlay-title">Why Collaborate with Tafrihan?</h2>
          <ul className="hero__benefits">
            {BENEFITS.map((b) => {
              const Icon = benefitIcons[b.icon]
              return (
                <li key={b.title} className="hero__benefit">
                  <Icon />
                  <span>{b.title}</span>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="hero__hint" aria-hidden="true">
          <span>Scroll to explore</span>
          <span className="hero__hint-line" />
        </div>
      </div>
    </section>
  )
}
