import { ABOUT, BENEFITS } from '../data/content.js'
import { benefitIcons, ArrowRightIcon } from './icons.jsx'
import Reveal from './Reveal.jsx'

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="container about__grid">
        <div className="about__copy">
          <Reveal className="section-head">
            <p className="label">{ABOUT.label}</p>
            <h2 className="section-title">{ABOUT.heading}</h2>
            <p className="section-lede">{ABOUT.intro}</p>
          </Reveal>

          <ul className="about__benefits">
            {BENEFITS.map((benefit, i) => {
              const Icon = benefitIcons[benefit.icon]
              return (
                <Reveal as="li" key={benefit.title} delay={i * 80} className="about__benefit">
                  <span className="about__benefit-icon">
                    <Icon />
                  </span>
                  <span>
                    <span className="about__benefit-title">{benefit.title}</span>
                    <span className="about__benefit-text">{benefit.text}</span>
                  </span>
                </Reveal>
              )
            })}
          </ul>
        </div>

        <Reveal className="about__media" delay={120}>
          <img
            className="about__img-main"
            src={ABOUT.images.main}
            alt={ABOUT.images.mainAlt}
            loading="lazy"
            decoding="async"
          />
          <img
            className="about__img-sub"
            src={ABOUT.images.sub}
            alt={ABOUT.images.subAlt}
            loading="lazy"
            decoding="async"
          />
          <a className="about__fab" href="#register" aria-label="Register your complex">
            <ArrowRightIcon />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
