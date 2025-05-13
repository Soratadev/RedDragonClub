/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.html', './src/**/*.ts'],
  theme: {
    extend: {
      colors:{
        granate: "#4B181B",
        dorado: {
          DEFAULT: "#DBAB58",
          'opacity-75': 'rgba(219, 171, 88, 0.75)',
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      // Agregamos utilidades personalizadas para contornos de texto
      addUtilities({
        // Contorno delgado (1px)
        '.text-stroke-1': {
          '-webkit-text-stroke-width': '1px',
        },
        // Contorno más grueso (2px)
        '.text-stroke-2': {
          '-webkit-text-stroke-width': '2px',
        },
        // Contorno dorado
        '.text-stroke-dorado': {
          '-webkit-text-stroke-color': '#DBAB58',
        },
        // Contorno blanco (por si necesitas combinado con relleno)
        '.text-stroke-blanco': {
          '-webkit-text-stroke-color': '#FFFFFF',
        },
      });
    },

  ],
}

