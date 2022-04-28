module.exports = {
   content: [
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
   ],
   theme: {
      fontFamily: {
         primary: ['Montserrat', 'sans-serif'],
      },
      extend: {
         boxShadow: {
            custom: '0 2.25px 10px rgba(115, 238, 220, 0.5)',
            navShadow: '0px -5px 20px 8px #000000',
            qrShadow:
               '3px -4.56px 9px rgba(115, 238, 220, 0.5), 2px -1.82px 1.82353px rgba(115, 238, 220, 0.5)',
         },
         colors: {
            myColor: '#73eedc',
         },
      },
   },
   plugins: [],
};
