import {
  Button,
  HeaderFilter,
  SearchInput,
  ViewModeSelector,
  useModuleSidebarState
} from 'lifeforge-ui'
import _ from 'lodash'
import { type ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'

interface ProjectInnerHeaderProps {
  totalItemsCount: number
  title: string
  filterItems: ComponentProps<typeof HeaderFilter>['items']
  filterValues: Record<string, any>
  onUpdateFilter: (updates: Record<string, any>) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  viewMode: 'grid' | 'list' | 'gallery'
  setViewMode: (mode: 'grid' | 'list' | 'gallery') => void
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
  setViewMode
}: ProjectInnerHeaderProps) {
  const { t } = useTranslation('apps.modrinth')

  const { setIsSidebarOpen } = useModuleSidebarState()

  const hasActiveFilters =
    Object.values(filterValues).some(v =>
      Array.isArray(v) ? v.length > 0 : !!v
    ) || !!searchQuery

  const setValues = Object.keys(filterItems).reduce(
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
      <HeaderFilter
        items={filterItems}
        setValues={setValues}
        values={Object.fromEntries(
          Object.entries(filterValues).map(([key, value]) => [
            key,
            value?.includes(',') ? value.split(',') : value
          ])
        )}
      />
      <div className="mt-4 mb-6 flex gap-2 xl:mt-6">
        <SearchInput
          namespace="apps.modrinth"
          searchTarget={title.replace('All ', '').toLowerCase()}
          setValue={setSearchQuery}
          value={searchQuery}
        />
        <ViewModeSelector
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
          setViewMode={setViewMode}
          viewMode={viewMode}
        />
      </div>
    </>
  )
}

export default ProjectInnerHeader
