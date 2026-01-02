import { Icon } from '@iconify/react'
import { Listbox, ListboxOption } from 'lifeforge-ui'
import { useTranslation } from 'react-i18next'

import type { SortTypes } from '../hooks/useProjectFilter'

export const SORT_TYPES: [id: SortTypes, icon: string][] = [
  ['relevance', 'tabler:search'],
  ['downloads', 'tabler:download'],
  ['follows', 'tabler:heart'],
  ['newest', 'tabler:clock'],
  ['updated', 'tabler:refresh']
]

function SortBySelector({
  sortBy,
  setSortBy
}: {
  sortBy: SortTypes
  setSortBy: (sort: SortTypes) => void
}) {
  const { t } = useTranslation('apps.modrinth')

  return (
    <Listbox
      buttonContent={
        <div className="flex items-center gap-2">
          <Icon className="size-6 shrink-0" icon="tabler:arrows-up-down" />
          <span className="w-full truncate font-medium whitespace-nowrap">
            {t(
              `sortTypes.${
                SORT_TYPES.find(([value]) => value === sortBy)?.[0] ??
                'relevance'
              }`
            )}
          </span>
        </div>
      }
      className="component-bg-with-hover! hidden min-w-64 md:flex md:w-min"
      value={sortBy}
      onChange={value => setSortBy(value)}
    >
      {SORT_TYPES.map(([value, icon]) => (
        <ListboxOption
          key={value}
          icon={icon}
          label={t(`sortTypes.${value}`)}
          value={value}
        />
      ))}
    </Listbox>
  )
}

export default SortBySelector
