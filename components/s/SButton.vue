<script setup lang="ts">
import { cva } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        outline:
          'border border-input bg-transparent shadow-sm hover:bg-primary/90 hover:text-white',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
        white:
          'bg-white text-primary shadow hover:bg-primary hover:text-white',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        gradient: '[background:linear-gradient(268deg,_#FF8B28_0.99%,_#FF6320_103.19%)] text-primary-foreground shadow hover:[background:linear-gradient(268deg,_#FF6320_0.99%,_#FF8B28_103.19%)]',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-sm',
        lg: 'h-44px rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

interface Props {
  variant?: NonNullable<Parameters<typeof buttonVariants>[0]>['variant']
  size?: NonNullable<Parameters<typeof buttonVariants>[0]>['size']
  as?: any
}

withDefaults(defineProps<Props>(), {
  as: 'button',
})
</script>

<template>
  <component :is="as" :class="buttonVariants({ variant, size })">
    <slot />
  </component>
</template>
