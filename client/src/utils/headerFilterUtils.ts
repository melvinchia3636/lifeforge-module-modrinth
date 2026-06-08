import _ from 'lodash'

import { TAILWIND_PALETTE } from '@lifeforge/ui'

export default function constructHeaderFilterItems(
  icons: Record<string, string>
) {
  const baseItems = Object.keys(icons).map(item => ({
    id: _.kebabCase(item.toLowerCase()),
    label: item,
    icon: `customHTML:${icons[item]}`
  }))

  const inversedItems = baseItems.map(item => ({
    ...item,
    id: `!${item.id}`,
    color: TAILWIND_PALETTE.red[500]
  }))

  return {
    data: [...baseItems, ...inversedItems],
    isColored: true
  }
}
