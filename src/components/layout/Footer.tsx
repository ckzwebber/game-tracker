import { Container } from '../ui/Container'

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(39,39,42,0.5)' }}>
      <Container className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8" style={{ paddingTop: '48px', paddingBottom: '48px' }}>
        <p
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '12px',
            color: 'rgba(161,161,170,0.4)',
          }}
        >
          © 2026 Carlos Miguel
        </p>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }} aria-label="Social links">
          <a
            href="https://github.com/ckzwebber"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              color: 'rgba(161,161,170,0.6)',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#FAFAFA')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(161,161,170,0.6)')}
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/cmiguelwm/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              color: 'rgba(161,161,170,0.6)',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#FAFAFA')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(161,161,170,0.6)')}
          >
            LinkedIn
          </a>
        </nav>
      </Container>
    </footer>
  )
}
