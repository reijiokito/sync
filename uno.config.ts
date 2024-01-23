import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { presetShadcn } from './preset.shadcn'


const colors = ['primary', 'secondary', 'destructive', 'muted', 'accent']
const align = ['center']
export default defineConfig({
  safelist: [
    ...colors.map((item) => `text-${item}`),
    ...align.map((item) => `text-${item}`),
  ],
  shortcuts: [
    ['flex-center', 'flex items-center justify-center'],
    ['navigation-menu-trigger', 'inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 hover:text-primary']
  ],
  rules: [
  ],
  presets: [
    presetUno(),
    presetShadcn(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      autoInstall: true,
    }),
    presetTypography(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  theme: {
    colors: {

      primary: {
        DEFAULT: 'hsl(var(--primary))',
        foreground: 'hsl(var(--primary-foreground))',
        50: '#FFE8D5',
        100: '#FEDDC1',
        200: '#FEC798',
        300: '#FEB070',
        400: '#FD9A47',
        500: '#FD841F',
        600: '#E26802',
        700: '#AA4E02',
        800: '#733501',
        900: '#3B1B01',
      },

      border: 'hsl(var(--border))',
      input: 'hsl(var(--input))',
      ring: 'hsl(var(--ring))',
      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',

      secondary: {
        DEFAULT: 'hsl(var(--secondary))',
        foreground: 'hsl(var(--secondary-foreground))',
      },
      destructive: {
        DEFAULT: 'hsl(var(--destructive))',
        foreground: 'hsl(var(--destructive-foreground))',
      },
      muted: {
        DEFAULT: 'hsl(var(--muted))',
        foreground: 'hsl(var(--muted-foreground))',
      },
      accent: {
        DEFAULT: 'hsl(var(--accent))',
        foreground: 'hsl(var(--accent-foreground))',
      },
      popover: {
        DEFAULT: 'hsl(var(--popover))',
        foreground: 'hsl(var(--popover-foreground))',
      },
      card: {
        DEFAULT: 'hsl(var(--card))',
        foreground: 'hsl(var(--card-foreground))',
      },
    },

    container: {
      center: true,
      padding: {
        DEFAULT: '2rem',
        xl: '1rem',
      },
      screens: {
      },
    },
    breakpoints: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1280px',
    },
    animation: {
      keyframes: {
        marquee: '{from { transform: translateX(0) } to {transform: translateX(calc(-100% - 2.5rem))}}',
        float: '{from { transform: rotate(-0.001deg) translate3d(15px, 0, 0) rotate(-0.001deg) } to {transform: rotate(360.001deg) translate3d(15px, 0, 0) rotate(-360.001deg)}}',
      },
      durations: {
        marquee: '50s',
        float: '12s',
      },
      timingFns: {
        marquee: 'linear',
        float: 'linear',
      },
    },

    boxShadow: {
      normal: '0px 12px 12px 0px rgba(0, 0, 0, 0.12)',
    },
  },
})
