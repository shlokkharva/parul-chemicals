/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy:  '#0B1F3A',
        dark:  '#121212',
        steel: '#2E3A46',
        blue:  '#00AEEF',
        teal:  '#00C9A7',
        glow:  '#4FC3F7',
        'navy-light': '#1A2B4C',
        'navy-dark':  '#060F1E',
      },
      fontFamily: {
        sans:  ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0B1F3A 0%, #121212 100%)',
        'card-gradient': 'linear-gradient(180deg, #121212 0%, #1A2A3A 100%)',
        'teal-gradient': 'linear-gradient(135deg, #00C9A7 0%, #00AEEF 100%)',
      },
      animation: {
        'fade-in':    'fadeIn 0.8s ease both',
        'slide-up':   'slideUp 0.8s ease both',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:  { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(40px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
      boxShadow: {
        'glow-teal': '0 0 30px rgba(0,201,167,0.35)',
        'glow-blue': '0 0 30px rgba(0,174,239,0.35)',
        'card':      '0 4px 32px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
}
