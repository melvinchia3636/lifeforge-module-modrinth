import type { Hit } from '@/components/types'
import { Icon } from '@iconify/react'
import {
  ContentWrapperWithSidebar,
  EmptyStateScreen,
  HeaderFilter,
  LayoutWithSidebar,
  ModuleHeader,
  Pagination,
  Scrollbar
} from 'lifeforge-ui'
import {
  type ComponentProps,
  type Dispatch,
  type ReactNode,
  type SetStateAction
} from 'react'

import ProjectInnerHeader from './ProjectInnerHeader'
import ProjectSidebar from './ProjectSidebar'
import GalleryView from './views/GalleryView'
import GridView from './views/GridView'
import ListView from './views/ListView'

interface ProjectListPageProps {
  title: string
  filteredTitle: string
  totalItems: number
  items: Hit[]
  isLoading: boolean
  viewMode: string
  setViewMode: (mode: string) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  page: number
  setPage: (page: number) => void | Promise<any>
  filterValues: Record<string, any>
  onUpdateFilter: (updates: Record<string, any>) => void
  onResetFilter: () => void
  headerFilterItems: ComponentProps<typeof HeaderFilter>['items']
  sidebarContent: ReactNode
  getIcon: (id: string) => string | null
  getKey: (id: string) => string | undefined
}

function ProjectListPage({
  title,
  filteredTitle,
  totalItems,
  items,
  isLoading,
  viewMode,
  setViewMode,
  searchQuery,
  setSearchQuery,
  page,
  setPage,
  filterValues,
  onUpdateFilter,
  onResetFilter,
  headerFilterItems,
  sidebarContent,
  getIcon,
  getKey
}: ProjectListPageProps) {
  const isAllActive =
    !Object.values(filterValues).some(v => !!v) && !searchQuery

  return (
    <>
      <ModuleHeader />
      <LayoutWithSidebar>
        <ProjectSidebar
          isAllActive={isAllActive}
          title={title}
          onReset={onResetFilter}
        >
          {sidebarContent}
        </ProjectSidebar>
        <ContentWrapperWithSidebar>
          <ProjectInnerHeader
            filterItems={headerFilterItems}
            filterValues={filterValues}
            filteredTitle={filteredTitle}
            onUpdateFilter={onUpdateFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setViewMode={setViewMode}
            title={title}
            totalItemsCount={totalItems}
            viewMode={viewMode}
          />

          {isLoading ? (
            <div className="flex h-64 w-full items-center justify-center">
              <Icon
                className="text-bg-300 size-12 animate-spin"
                icon="tabler:loader-2"
              />
            </div>
          ) : items.length > 0 ? (
            <Scrollbar>
              <div className="space-y-3">
                <Pagination
                  className="mb-6"
                  currentPage={page}
                  onPageChange={setPage as Dispatch<SetStateAction<number>>}
                  totalPages={Math.ceil(totalItems / 20)}
                />
                {viewMode === 'list' && (
                  <ListView entries={items} getIcon={getIcon} getKey={getKey} />
                )}
                {viewMode === 'grid' && (
                  <GridView entries={items} getIcon={getIcon} getKey={getKey} />
                )}
                {viewMode === 'gallery' && (
                  <GalleryView
                    entries={items}
                    getIcon={getIcon}
                    getKey={getKey}
                  />
                )}

                <Pagination
                  className="my-6"
                  currentPage={page}
                  onPageChange={setPage as Dispatch<SetStateAction<number>>}
                  totalPages={Math.ceil(totalItems / 20)}
                />
              </div>
            </Scrollbar>
          ) : (
            <EmptyStateScreen
              icon="tabler:search-off"
              name="search"
              namespace="apps.modrinth"
            />
          )}
        </ContentWrapperWithSidebar>
      </LayoutWithSidebar>
    </>
  )
}

export default ProjectListPage
