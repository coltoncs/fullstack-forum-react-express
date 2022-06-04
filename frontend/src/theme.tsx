import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const fonts = { mono: `'Menlo', monospace` }

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
})

const theme = extendTheme({
  semanticTokens: {
    colors: {
      text: {
        default: '#16161D',
        _dark: '#ade3b8',
      },
      navText: {
        default: '#333',
        _dark: '#ade3b8',
      },
      navBtn: {
        default: '#333',
        _dark: '#ade3b8',
      },
      heroGradientStart: {
        default: '#7928CA',
        _dark: '#e3a7f9',
      },
      heroGradientEnd: {
        default: '#FF0080',
        _dark: '#fbec8f',
      },
      navColor: {
        default: 'gray.200',
        _dark: 'gray.600',
      }
    },
    radii: {
      button: '12px',
    },
  },
  colors: {
    black: '#0D1321',
  },
  fonts,
  breakpoints,
})

export default theme
