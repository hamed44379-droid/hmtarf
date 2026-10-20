import { STATS } from '../data/content.js'
import Reveal from './Reveal.jsx'

export default function Stats() {
  return (
    <section className="section stats" id="why">
      <div className="container">
        <Reveal className="section-head section-head--center">
          <p className="label">Why Collaborate</p>
          <h2 className="section-title">Tafrihan in numbers</h2>
          <p className="section-lede">
            A partnership platform built on reach, trust and a model that only succeeds when you do.
          </p>
        </Reveal>

        <dl className="stats__grid">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 90} className="stats__item">
              <dd className="stats__value">
                {stat.prefix && <span className="stats__prefix">{stat.prefix}</span>}
                {stat.value}
                {stat.suffix && <span className="stats__suffix">{stat.suffix}</span>}
              </dd>
              <dt className="stats__label">{stat.label}</dt>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
