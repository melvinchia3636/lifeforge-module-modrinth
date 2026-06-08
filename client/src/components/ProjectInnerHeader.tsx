import _ from 'lodash'
import { type ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'

import {
  Box,
  Button,
  Flex,
  SearchInput,
  Stack,
  TagsFilter,
  Text,
  ViewModeSelector,
  useModuleSidebarState
} from '@lifeforge/ui'

import type { SortTypes } from '../hooks/useProjectFilter'
import SortBySelector from './SortBySelector'

interface ProjectInnerHeaderProps {
  totalItemsCount: number
  title: string
  filterItems: ComponentProps<typeof TagsFilter>['availableFilters']
  filterValues: Record<string, any>
  onUpdateFilter: (updates: Record<string, any>) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  viewMode: 'grid' | 'list' | 'gallery'
  setViewMode: (mode: 'grid' | 'list' | 'gallery') => void
  sortBy: SortTypes
  setSortBy: (sort: SortTypes) => void
}

function ProjectInnerHeader({
  totalItemsCount,
  title,
  filterItems,
  filterValues,
  onUpdateFilter,
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode,
  sortBy,
  setSortBy
}: ProjectInnerHeaderProps) {
  const { t } = useTranslation('apps.melvinchia3636$modrinth')

  const { setIsSidebarOpen } = useModuleSidebarState()

  const hasActiveFilters =
    Object.values(filterValues).some(v =>
      Array.isArray(v) ? v.length > 0 : !!v
    ) || !!searchQuery

  const onChanges = Object.keys(filterItems).reduce(
    (acc, key) => {
      acc[key] = value => {
        onUpdateFilter({
          [key]: Array.isArray(value) ? value.join(',') : value
        })
      }

      return acc
    },
    {} as Record<string, (value: any) => void>
  )

  return (
    <Stack gap="md" mb="lg">
      <Flex align="center" justify="between">
        <Flex align="end" gap="sm" minWidth="0" mr="xl">
          <Text
            truncate
            as="h1"
            size={{ base: '2xl', lg: '3xl' }}
            weight="semibold"
          >
            {t(
              `sidebar.${_.camelCase(hasActiveFilters ? 'filtered' : 'all')}${_.capitalize(title)}`
            )}
          </Text>
          <Text color="muted">({totalItemsCount.toLocaleString()})</Text>
        </Flex>
        <Button
          display={{ base: 'flex', lg: 'none' }}
          icon="tabler:menu"
          variant="plain"
          onClick={() => {
            setIsSidebarOpen(true)
          }}
        />
      </Flex>
      <TagsFilter
        availableFilters={filterItems}
        values={Object.fromEntries(
          Object.entries(filterValues).map(([key, value]) => [
            key,
            value?.includes(',') ? value.split(',') : value
          ])
        )}
        onChange={onChanges}
      />
      <Flex gap="sm">
        <SortBySelector setSortBy={setSortBy} sortBy={sortBy} />
        <SearchInput
          debounceMs={500}
          namespace="apps.melvinchia3636$modrinth"
          searchTarget={title.replace('All ', '').toLowerCase()}
          value={searchQuery}
          onChange={setSearchQuery}
        />
        <Box display={{ base: 'none', md: 'block' }}>
          <ViewModeSelector
            currentMode={viewMode}
            options={[
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
            ]}
            onModeChange={setViewMode}
          />
        </Box>
      </Flex>
    </Stack>
  )
}

export default ProjectInnerHeader
