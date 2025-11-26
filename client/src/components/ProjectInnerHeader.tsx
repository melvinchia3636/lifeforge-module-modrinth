import {
  Button,
  HeaderFilter,
  SearchInput,
  ViewModeSelector,
  useModuleSidebarState
} from 'lifeforge-ui'
import { type ComponentProps } from 'react'

interface ProjectInnerHeaderProps {
  totalItemsCount: number
  title: string
  filteredTitle: string
  filterItems: ComponentProps<typeof HeaderFilter>['items']
  filterValues: Record<string, any>
  onUpdateFilter: (updates: Record<string, any>) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  viewMode: string
  setViewMode: (mode: string) => void
}

function ProjectInnerHeader({
  totalItemsCount,
  title,
  filteredTitle,
  filterItems,
  filterValues,
  onUpdateFilter,
  searchQuery,
  setSearchQuery,
  viewMode,
  setViewMode
}: ProjectInnerHeaderProps) {
  const { setIsSidebarOpen } = useModuleSidebarState()

  const hasActiveFilters =
    Object.values(filterValues).some(v =>
      Array.isArray(v) ? v.length > 0 : !!v
    ) || !!searchQuery

  // Create setValues object for HeaderFilter
  const setValues = Object.keys(filterItems).reduce(
    (acc, key) => {
      acc[key] = (value: any) => {
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
            {hasActiveFilters ? filteredTitle : title}
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
        values={filterValues}
      />
      <div className="mt-4 mb-6 flex gap-2 xl:mt-6">
        <SearchInput
          namespace="apps.modrinth"
          searchTarget={title}
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
