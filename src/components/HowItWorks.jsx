import { STEPS } from '../data/content.js'
import Reveal from './Reveal.jsx'

export default function HowItWorks() {
  return (
    <section className="section how" id="how-it-works">
      <div className="container">
        <Reveal className="section-head section-head--center">
          <p className="label">How It Works</p>
          <h2 className="section-title">What is the collaboration model?</h2>
          <p className="section-lede">
            Four simple steps from signing up to receiving your revenue — with zero upfront cost.
          </p>
        </Reveal>

        <ol className="how__grid">
          {STEPS.map((step, i) => (
            <Reveal as="li" key={step.number} delay={i * 90} className="how__card">
              <div className="how__media">
                <img src={step.image} alt={step.alt} loading="lazy" decoding="async" />
                <span className="how__number">{step.number}</span>
              </div>
              <div className="how__body">
                <h3 className="how__title">{step.title}</h3>
                <p className="how__text">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
