// Minimal architectural line mark + wordmark, in the champagne accent.
export default function Logo({ compact = false }) {
  return (
    <span className={compact ? 'logo logo--compact' : 'logo'}>
      <svg
        className="logo__mark"
        viewBox="0 0 34 34"
        width="34"
        height="34"
        role="img"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M17 4 5 16h3.5v14h17V16H29L17 4Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M13 30v-9a4 4 0 0 1 8 0v9"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path d="M3 31h28" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <span className="logo__text">
        <span className="logo__name">TAFRIHAN</span>
        <span className="logo__sub">B2B Platform</span>
      </span>
    </span>
  )
}
