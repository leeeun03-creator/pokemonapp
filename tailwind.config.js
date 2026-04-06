/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],  // 헤딩, 라벨
        vt:    ['"VT323"', 'monospace'],            // 본문, 수치
      },
      borderRadius: {
        none: '0px',
        px:   '2px',
      },
      boxShadow: {
        pixel:           '4px 4px 0px #2d2d2d',
        'pixel-sm':      '2px 2px 0px #2d2d2d',
        'pixel-pressed': '1px 1px 0px #2d2d2d',
      },
      colors: {
        bg:          '#f8f4e8',
        surface:     '#ffffff',
        sunken:      '#e8e2d4',
        ink:         '#1a1a1a',
        'ink-muted': '#6b6b6b',
        border:      '#2d2d2d',
      },
    },
  },
  plugins: [],
}