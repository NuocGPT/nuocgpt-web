module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  important: true,
  theme: {
    colors: {
      'primary-color': '#021EB2',
      'secondary-color': '#FFFFFF',

      'primary-color-light-10': '#354BC1',
      'primary-color-light-20': '##6778D1',

      'info-color': '#007AFF',
      'info-color-soft': '#E5F1FF',
      'success-color': '#34C759',
      'success-color-soft': '#EAF9EE',
      'alert-color': '#FFCC00',
      'alert-color-soft': '#FFF9E5',
      'warning-color': '#FF9500',
      'warning-color-soft': '#FFF4E5',
      'error-color': '#FF3B30',
      'error-color-soft': '#FFEBEA',

      'color-neutral-1': '#000414',
      'color-neutral-2': '#4B4E6E',
      'color-neutral-3': '#A0A3BD',
      'color-neutral-4': '#D2D4E1',
      'color-neutral-5': '#EFF0F6',
      
      'color-black': '#000000',
    },
    boxShadow: {
      'inner-shadows': 'inset 0px -1px 0px #F00000;',
      'shadow-sm':
        '0px 0px 1px rgba(12, 26, 75, 0.24), 0px 3px 8px -1px rgba(50, 50, 71, 0.05);',
      'shadow-default':
        '0px 0px 1px rgba(12, 26, 75, 0.1), 0px 4px 20px -2px rgba(50, 50, 71, 0.08);',
      'shadow-lg':
        '0px 0px 1px rgba(12, 26, 75, 0.1), 0px 10px 16px rgba(20, 37, 63, 0.06);',
      'shadow-xl':
        '0px 0px 1px rgba(12, 26, 75, 0.1), 0px 20px 24px rgba(20, 37, 63, 0.06);',
      'shadow-2xl':
        '0px 0px 1px rgba(12, 26, 75, 0.1), 0px 30px 40px rgba(20, 37, 63, 0.08);',
    },
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1600px',
    },
  },
  plugins: [],
};
