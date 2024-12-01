/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',
        'on-primary': 'var(--on-primary)',
        surface: 'var(--surface)',
        'on-surface': 'var(--on-surface)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}