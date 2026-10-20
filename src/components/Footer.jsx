import Logo from './Logo.jsx'
import { NAV_LINKS, SITE } from '../data/content.js'
import { PhoneIcon, InstagramIcon, LinkedinIcon, TelegramIcon } from './icons.jsx'

const socials = [
  { label: 'Instagram', href: 'https://instagram.com/tafrihan', Icon: InstagramIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/tafrihan', Icon: LinkedinIcon },
  { label: 'Telegram', href: 'https://t.me/tafrihan', Icon: TelegramIcon },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Logo />
          <p>
            The partnership arm of Tafrihan — connecting premium recreational complexes with hundreds
            of thousands of active users through a fair, commission-based model.
          </p>
          <div className="footer__socials">
            {socials.map(({ label, href, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <nav className="footer__nav" aria-label="Footer">
          <h3>Navigate</h3>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__contact">
          <h3>Contact</h3>
          <ul>
            <li>
              <a href={SITE.phoneHref} className="footer__phone">
                <PhoneIcon />
                <span>{SITE.phone}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
            <li>{SITE.address}</li>
          </ul>
        </div>
      </div>

      <div className="footer__bar">
        <div className="container footer__bar-inner">
          <p>© {new Date().getFullYear()} TAFRIHAN B2B. All rights reserved.</p>
          <p>Photography: Pexels &amp; Unsplash</p>
        </div>
      </div>
    </footer>
  )
}
