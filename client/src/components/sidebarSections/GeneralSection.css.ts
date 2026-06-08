import { style } from '@vanilla-extract/css'

import { COLORS } from '@lifeforge/ui'

export const negationWrapper = style({
  selectors: {
    '&::after': {
      backgroundColor: COLORS.dangerous
    }
  }
})

export const negationIcon = style({
  color: COLORS.dangerous
})
