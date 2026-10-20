import { SITE } from '../data/content.js'
import { SparkIcon } from './icons.jsx'
import Reveal from './Reveal.jsx'

export default function Cta() {
  return (
    <section className="cta">
      <div className="container cta__inner">
        <Reveal className="cta__badge">
          <SparkIcon />
        </Reveal>
        <Reveal className="cta__copy" delay={80}>
          <h2 className="cta__title">Ready to Grow Your Business?</h2>
          <p className="cta__text">Let our experts guide you to a profitable partnership.</p>
        </Reveal>
        <Reveal delay={140}>
          <a className="btn btn--navy btn--lg" href={SITE.phoneHref}>
            Get in Touch <span aria-hidden="true">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
