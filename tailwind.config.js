module.exports = {
  plugins: [
    require('@tailwindcss/ui'),
  ],
  theme: {
    extend: {
      spacing: {
        '0': '0rem',
        '1.5': '0.375rem',
        '2.5': '0.625rem',
        '3': '0.75rem',
        '4': '1rem',
        '8': '2rem',
        '128': '32rem'
      },
      gridTemplateRows: {
        'nav': 'auto 1fr auto',
        'layout': 'auto 1fr'
      },
      boxShadow: {
        'outline': '0 0 0 3px rgba(49, 196, 141, 0.3);'
      }
    }
  }
};