import { useTranslation } from 'react-i18next'

import { Flex, Icon, Listbox, ListboxOption, Text } from '@lifeforge/ui'

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
  const { t } = useTranslation('apps.melvinchia3636--modrinth')

  return (
    <Listbox
      display={{ base: 'none', md: 'flex' }}
      minWidth={{ base: '16em', md: 'min-content' }}
      renderContent={() => (
        <Flex align="center" gap="sm">
          <Icon icon="tabler:arrows-up-down" />
          <Text weight="medium" whiteSpace="nowrap">
            {t(
              `sortTypes.${
                SORT_TYPES.find(([value]) => value === sortBy)?.[0] ??
                'relevance'
              }`
            )}
          </Text>
        </Flex>
      )}
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
