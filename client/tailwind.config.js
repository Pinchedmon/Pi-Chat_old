// /** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    spacing: {
      'auto': 'auto',
      '0px': '0px',
      '1px': '1px',
      '2px': '2px',
      '3px': '3px',
      '4px': '4px',
      '5px': '5px', '6px': '6px',
      '8px': '8px',
      '10px': '10px',
      '12px': '12px',
      '16px': '16px',
      '18px': '18px',
      '24px': '24px',
      '28px': '28px',
      '32px': '32px',
      '40px': '40px',
      '44px': '44px',
      '48px': '48px',
      '50px': '50px',
      '54px': '54px',
      '90px': '90px',
      '96px': '96px',
      '100px': '100px',
      '120px': '120px',
      '140px': '140px',
      '180px': '180px',
      '200px': '200px',
      '220px': '220px',
      '260px': '260px',
      '300px': '300px',
      '310px': '310px',
      '346px': '346px',
      '361px': '361px',
      '400px': '400px',
      '420px': '420px',
      '450px': '470px',
      '800px': '800px',
      '2/3': '66%',
      '1/2': '50%',
      '10%': '10%',
      '20%': '20%',
      '90%': '90%',
      'max': 'max-content',
      'min': 'min-content',
      'full': '100%',
      '12.5rem': "12.5rem",
      '2rem': '2rem'
    },
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '2': '2px',
      '3': '3px',
      '4': '4px',
    },
    extends: {
      dropShadow: {
        'white': '0 35px 35px rgba(0, 0, 0, 0.25)',
        '4xl': [
          '0 35px 35px rgba(0, 0, 0, 0.25)',
          '0 45px 65px rgba(0, 0, 0, 0.15)'
        ]
      },
      colors: {
        back: '#ffffff'
      }
    }

  },
  plugins: [],
}