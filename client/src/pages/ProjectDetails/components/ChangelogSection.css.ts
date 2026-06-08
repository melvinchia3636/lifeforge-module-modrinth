import { style } from '@vanilla-extract/css'

import { COLORS } from '@lifeforge/ui'

export const timelineItem = style({
  position: 'relative',
  minWidth: 0,
  paddingLeft: '2rem',
  selectors: {
    '&::before': {
      content: '',
      position: 'absolute',
      top: '0.75rem',
      left: 0,
      zIndex: 10,
      width: '1.25rem',
      height: '1.25rem',
      borderRadius: '9999px',
      borderWidth: '3px',
      borderStyle: 'solid',
      borderColor: 'var(--tl-color)',
      backgroundColor: COLORS['bg-50']
    },
    '.dark &::before': {
      backgroundColor: COLORS['bg-900']
    },
    '&::after': {
      content: '',
      position: 'absolute',
      top: '0.75rem',
      left: 0,
      width: '3px',
      height: 'calc(100% + 1.5rem)',
      borderRadius: '9999px',
      backgroundColor: 'var(--tl-color)',
      transform: 'translateX(0.5rem)'
    }
  }
})
