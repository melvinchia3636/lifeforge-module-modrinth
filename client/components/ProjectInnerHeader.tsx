import {
  Button,
  SearchInput,
  TagsFilter,
  ViewModeSelector,
  useModuleSidebarState
} from 'lifeforge-ui'
import _ from 'lodash'
import { type ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation('apps.modrinth')

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
    <>
      <header className="flex-between flex w-full">
        <div className="flex min-w-0 items-end">
          <h1 className="truncate text-2xl font-semibold lg:text-3xl">
            {t(
              `sidebar.${_.camelCase(hasActiveFilters ? 'filtered' : 'all')}${_.capitalize(title)}`
            )}
          </h1>
          <span className="text-bg-500 mr-8 ml-2 text-base">
            ({totalItemsCount.toLocaleString()})
          </span>
        </div>
        <Button
          className="lg:hidden"
          icon="tabler:menu"
          variant="plain"
          onClick={() => {
            setIsSidebarOpen(true)
          }}
        />
      </header>
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
      <div className="mt-2 mb-6 flex gap-2 md:mt-4 xl:mt-6">
        <SortBySelector setSortBy={setSortBy} sortBy={sortBy} />
        <SearchInput
          debounceMs={500}
          namespace="apps.modrinth"
          searchTarget={title.replace('All ', '').toLowerCase()}
          value={searchQuery}
          onChange={setSearchQuery}
        />
        <ViewModeSelector
          className="hidden md:flex"
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
      </div>
    </>
  )
}

export default ProjectInnerHeader
