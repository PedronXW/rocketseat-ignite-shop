import { globalCss } from '.'

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },

  body: {
    backgroundColor: '$gray900',
    color: '$gray100',
    '-webkit-font-smoothing': 'antialiased',
  },

  '*::-webkit-scrollbar': {
    width: 4,
    height: 8,
  },

  '*::-webkit-scrollbar-track': {
    background: 'transparent',
  },

  '*::-webkit-scrollbar-thumb': {
    background: '#888',
    borderRadius: 100,
  },

  '*::-webkit-scrollbar-thumb:hover': {
    background: '#555',
  },

  'body, input, textarea, button': {
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 400,
  },
})
