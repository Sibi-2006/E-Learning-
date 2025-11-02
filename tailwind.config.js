/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#6366F1',
        secondary: '#8B5CF6',
        accent: '#EC4899',
        background: '#F5F3FF',
        dark: '#1E1B4B',
        primaryText: "#E0E7FF",    
        secondaryText: "#A5B4FC",   
        highlight: "#F472B6",      

      },
    },
  },
  plugins: [],
}
