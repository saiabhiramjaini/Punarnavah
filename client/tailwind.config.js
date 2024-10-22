// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       fontFamily:{
//         "limeLight": ["Limelight", "cursive"],
//         "spaceMono": ["Space Mono", "monospace"],
//       },
//       colors:{
//         "primary": "#FFFFFF",
//         "secondary": "#899878",
//       }
//     },
//   },
//   plugins: [],
// }
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "limeLight": ["Limelight", "cursive"],
        "spaceMono": ["Space Mono", "monospace"],
      },
      colors: {
        "primary": "#FFFFFF",
        "secondary": "#AAB396",
        "sample": "#E1D7B7",
      },
      animation: {
        // Add animation for the gradient background
        gradient: 'gradientAnimation 15s ease infinite',
      },
      keyframes: {
        // Define keyframes for the gradient animation
        gradientAnimation: {
          '0%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
          '100%': {
            backgroundPosition: '0% 50%',
          },
        },
      },
      backgroundImage: {
        // You can also add custom background images if needed
        'animated-gradient': 'linear-gradient(270deg, #6a11cb, #2575fc)',
      },
    },
  },
  plugins: [],
}
