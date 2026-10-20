import { useState } from 'react'
import { FORM_FIELDS, SITE } from '../data/content.js'
import { PhoneIcon } from './icons.jsx'
import Reveal from './Reveal.jsx'

export default function Registration() {
  const [values, setValues] = useState({ complexName: '', ceoName: '', phone: '' })
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('')
  const [registrationId, setRegistrationId] = useState('')

  const onChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data.ok) {
        setRegistrationId(data.id)
        setStatus('success')
      } else {
        setErrorMessage(data.error || 'Something went wrong. Please try again.')
        setStatus('error')
      }
    } catch {
      setErrorMessage('Network error — please check your connection and try again.')
      setStatus('error')
    }
  }

  return (
    <section className="section registration" id="register">
      <div className="container">
        <Reveal className="section-head section-head--center">
          <p className="label">Register Your Complex</p>
          <h2 className="section-title">Start Collaborating Today</h2>
          <p className="section-lede">
            Tell us about your complex and our partnership team will contact you within one business day.
          </p>
        </Reveal>

        <Reveal className="form-card" delay={100}>
          {status === 'success' ? (
            <div className="form-success" role="status">
              <h3>Thank you — registration received.</h3>
              <p>
                Our partnership team will call you shortly to complete the onboarding. Reference:{' '}
                <code>{registrationId.slice(0, 8).toUpperCase()}</code>
              </p>
              <button
                type="button"
                className="btn btn--navy"
                onClick={() => {
                  setValues({ complexName: '', ceoName: '', phone: '' })
                  setStatus('idle')
                }}
              >
                Register another complex
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate>
              {FORM_FIELDS.map((field) => (
                <div className="field" key={field.name}>
                  <label htmlFor={`reg-${field.name}`}>
                    {field.label} <span className="field__hint">{field.hint}</span>
                  </label>
                  <input
                    id={`reg-${field.name}`}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    autoComplete={field.autoComplete}
                    value={values[field.name]}
                    onChange={onChange}
                    required
                    dir={field.name === 'phone' ? 'ltr' : undefined}
                  />
                </div>
              ))}

              {status === 'error' && (
                <p className="form-note form-note--error" role="alert">
                  {errorMessage}
                </p>
              )}

              <button type="submit" className="btn btn--navy form-card__submit" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Registering…' : 'Register'}
              </button>
            </form>
          )}
        </Reveal>

        <Reveal className="registration__contact" delay={180}>
          <p>Company Phone Number — free consultation:</p>
          <a href={SITE.phoneHref} className="registration__phone">
            <PhoneIcon />
            <span>{SITE.phone}</span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
