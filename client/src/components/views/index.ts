import { createViewMode } from '@lifeforge/ui'

export const ViewMode = createViewMode({
  modes: [
    {
      icon: 'tabler:list',
      value: 'list'
    },
    {
      icon: 'uil:apps',
      value: 'grid'
    },
    {
      icon: 'tabler:photo',
      value: 'gallery'
    }
  ],
  selectorProps: {
    display: { base: 'none', md: 'flex' }
  }
})
