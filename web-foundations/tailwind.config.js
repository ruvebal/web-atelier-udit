module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    './docs/_drafts/**/*.html',
    './docs/_includes/**/*.html',
    './docs/_layouts/**/*.html',
    './docs/**/*.md',
    './docs/**/*.html',
    './docs/lessons/**/*.{html,md}',
  ],
  theme: {
    extend: {
      colors: {
        // Map existing brand colors from site.css
        'brand-primary': 'var(--primary)',
        'brand-accent': 'var(--accent)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'bg-light': 'var(--bg-light)',
        'border-light': 'var(--border-light)',
        // Modern dark theme palette
        dark: {
          bg: '#0a0a0a',
          surface: '#141414',
          border: '#262626',
          text: '#f5f5f5',
          muted: '#a3a3a3',
        },
      },
      maxWidth: {
        // Academic reading widths
        'prose': 'var(--max)',
        'reading': '65ch',
        'narrow': '45ch',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'var(--max)',
            color: 'var(--text-primary)',
            a: {
              color: 'var(--primary)',
              '&:hover': {
                color: 'var(--primary-hover)',
              },
            },
            code: {
              backgroundColor: 'var(--code-inline-bg)',
              borderColor: 'var(--code-inline-border)',
            },
            blockquote: {
              backgroundColor: 'var(--bg-light)',
              borderLeftColor: 'var(--primary)',
              color: 'var(--text-secondary)',
            },
          },
        },
        invert: {
          css: {
            color: '#e5e5e5',
            '[class~="lead"]': {
              color: '#d4d4d4',
            },
            strong: {
              color: '#fafafa',
            },
            'ol > li::before': {
              color: '#a3a3a3',
            },
            'ul > li::before': {
              backgroundColor: '#737373',
            },
            hr: {
              borderColor: '#404040',
            },
            blockquote: {
              color: '#d4d4d4',
              borderLeftColor: '#404040',
              backgroundColor: '#171717',
            },
            h1: {
              color: '#fafafa',
            },
            h2: {
              color: '#fafafa',
            },
            h3: {
              color: '#fafafa',
            },
            h4: {
              color: '#fafafa',
            },
            'figure figcaption': {
              color: '#a3a3a3',
            },
            a: {
              color: '#60a5fa',
            },
            'a code': {
              color: '#60a5fa',
            },
            thead: {
              color: '#fafafa',
              borderBottomColor: '#404040',
            },
            'tbody tr': {
              borderBottomColor: '#262626',
            },
            code: {
              color: '#fafafa',
              backgroundColor: '#262626',
            },
            pre: {
              color: '#e5e5e5',
              backgroundColor: '#171717',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ]
}

