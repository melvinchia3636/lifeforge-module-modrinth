import type { Hit } from '@/components/types'
import forgeAPI from '@/utils/forgeAPI'
import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import {
  ContentWrapperWithSidebar,
  EmptyStateScreen,
  HeaderFilter,
  LayoutWithSidebar,
  ModuleHeader,
  Pagination,
  Scrollbar,
  WithQuery
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
  projectType:
    | 'mod'
    | 'modpack'
    | 'datapack'
    | 'resourcepack'
    | 'shader'
    | 'plugin'
  viewMode: string
  setViewMode: (mode: string) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  page: number
  setPage: (page: number) => void
  filterValues: Record<string, any>
  onUpdateFilter: (updates: Record<string, any>) => void
  onResetFilter: () => void
  headerFilterItems: ComponentProps<typeof HeaderFilter>['items']
  sidebarContent: ReactNode
  dataQuery: UseQueryResult<{
    total: number
    items: Hit[]
  }>
  getIcon: (id: string) => string | null
  getKey: (id: string) => string | undefined
}

function ProjectListPage({
  projectType,
  dataQuery,
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

  const favouriteIdsQuery = useQuery(
    forgeAPI.modrinth.favourites.listItemIds
      .input({
        projectType
      })
      .queryOptions()
  )

  return (
    <>
      <ModuleHeader />
      <LayoutWithSidebar>
        <ProjectSidebar
          favouritesCount={favouriteIdsQuery.data?.length ?? 0}
          isAllActive={isAllActive}
          title={projectType}
          totalCount={dataQuery.data?.total ?? 0}
          onReset={onResetFilter}
        >
          {sidebarContent}
        </ProjectSidebar>
        <ContentWrapperWithSidebar>
          <ProjectInnerHeader
            filterItems={headerFilterItems}
            filterValues={filterValues}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setViewMode={setViewMode}
            title={projectType}
            totalItemsCount={dataQuery.data?.total ?? 0}
            viewMode={viewMode}
            onUpdateFilter={onUpdateFilter}
          />
          <WithQuery query={favouriteIdsQuery}>
            {favIds => (
              <WithQuery query={dataQuery}>
                {({ items, total }) =>
                  items.length > 0 ? (
                    <Scrollbar>
                      <div className="space-y-3">
                        <Pagination
                          className="mb-6"
                          currentPage={page}
                          totalPages={Math.ceil(total / 20)}
                          onPageChange={
                            setPage as Dispatch<SetStateAction<number>>
                          }
                        />
                        {viewMode === 'list' && (
                          <ListView
                            entries={items}
                            favouritesIds={favIds}
                            getIcon={getIcon}
                            getKey={getKey}
                          />
                        )}
                        {viewMode === 'grid' && (
                          <GridView
                            entries={items}
                            favouritesIds={favIds}
                            getIcon={getIcon}
                            getKey={getKey}
                          />
                        )}
                        {viewMode === 'gallery' && (
                          <GalleryView
                            entries={items}
                            favouritesIds={favIds}
                            getIcon={getIcon}
                            getKey={getKey}
                          />
                        )}

                        <Pagination
                          className="my-6"
                          currentPage={page}
                          totalPages={Math.ceil(total / 20)}
                          onPageChange={
                            setPage as Dispatch<SetStateAction<number>>
                          }
                        />
                      </div>
                    </Scrollbar>
                  ) : (
                    <EmptyStateScreen
                      icon="tabler:search-off"
                      name="search"
                      namespace="apps.modrinth"
                    />
                  )
                }
              </WithQuery>
            )}
          </WithQuery>
        </ContentWrapperWithSidebar>
      </LayoutWithSidebar>
    </>
  )
}

export default ProjectListPage
