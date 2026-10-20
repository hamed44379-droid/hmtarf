// Shared inline SVG icons (stroke = currentColor).
const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

export function PhoneIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...props}>
      <path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  )
}

export function MegaphoneIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
      <path d="M3 11v2a1 1 0 0 0 1 1h2l4 4V6L6 10H4a1 1 0 0 0-1 1Z" />
      <path d="M14 7.5a5 5 0 0 1 0 9M17 4.8a9 9 0 0 1 0 14.4" />
    </svg>
  )
}

export function ChartIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
      <path d="M4 20V4" />
      <path d="M4 20h16" />
      <path d="M8 16v-5M13 16V8M18 16v-8" />
    </svg>
  )
}

export function HandshakeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
      <path d="m11 17-2 2a1.5 1.5 0 0 1-2-2l-1 1a1.5 1.5 0 0 1-2-2l6-6h4l3 3" />
      <path d="M14 13 8 7l3-3h4l5 5-3 3" />
      <path d="m17 12 2 2a1.5 1.5 0 0 1-2 2l-1-1" />
    </svg>
  )
}

export function SupportIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9.5 9.3a2.6 2.6 0 1 1 3.6 2.4c-.8.35-1.1.8-1.1 1.6" />
      <path d="M12 16.4h.01" />
    </svg>
  )
}

export function ArrowRightIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" {...base} {...props}>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  )
}

export function SparkIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" {...base} {...props}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
      <circle cx="12" cy="12" r="2.4" />
    </svg>
  )
}

export function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.8" />
      <path d="M16.9 7.1h.01" />
    </svg>
  )
}

export function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M7.5 10.5V17M7.5 7.4h.01M11.5 17v-3.6a2.4 2.4 0 0 1 4.8 0V17" />
    </svg>
  )
}

export function TelegramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" {...base} {...props}>
      <path d="m20.5 4.5-3 15.2c-.1.6-.8.8-1.3.5l-4.4-3.2-2.3 2.3c-.4.4-1 .2-1.1-.3l-1.1-4.2-4-1.5c-.6-.2-.6-1 0-1.3l16-8.7c.5-.3 1.3.1 1.2.9Z" />
      <path d="M8.3 13.5 18 7" />
    </svg>
  )
}

export const benefitIcons = {
  megaphone: MegaphoneIcon,
  chart: ChartIcon,
  handshake: HandshakeIcon,
  support: SupportIcon,
}
