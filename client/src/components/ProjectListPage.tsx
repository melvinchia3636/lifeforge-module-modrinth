import type { Hit } from '@/components/types'
import type { FilterReturnType } from '@/hooks/useProjectFilter'
import type { ProjectDetails } from '@/pages/ProjectDetails'
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
  filters: FilterReturnType
  headerFilterItems: ComponentProps<typeof HeaderFilter>['items']
  sidebarContent: ReactNode
  dataQuery: UseQueryResult<{
    total: number
    items: Hit[]
  }>
  getIcon: (id: string) => string | null
  getKey: (id: string) => string | undefined
}

function ProjectListPage<TFilterKeys extends string[]>({
  projectType,
  dataQuery,
  headerFilterItems,
  sidebarContent,
  filters,
  getIcon,
  getKey
}: ProjectListPageProps) {
  const {
    page,
    setPage,
    isFavouritesShowing,
    setShowFavourites,
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    updateFilter,
    ...filterValues
  } = filters

  const isAllActive =
    !Object.values(filterValues).some(v => !!v) &&
    !searchQuery &&
    !isFavouritesShowing

  const favouriteIdsQuery = useQuery(
    forgeAPI.modrinth.favourites.listItemIds
      .input({
        projectType
      })
      .queryOptions()
  )

  const favouriteItemsQuery = useQuery(
    forgeAPI.modrinth.favourites.listItems
      .input({
        projectType,
        query: searchQuery || undefined,
        page: page.toString()
      })
      .queryOptions()
  )

  const finalQuery = isFavouritesShowing ? favouriteItemsQuery : dataQuery

  const onResetFilter = () => {
    const resetValues = Object.keys(filterValues).reduce(
      (acc, key) => ({ ...acc, [key]: '' }),
      {}
    ) as Record<TFilterKeys[number], string>

    updateFilter(resetValues)
    setSearchQuery('')
  }

  return (
    <>
      <ModuleHeader />
      <LayoutWithSidebar>
        <ProjectSidebar
          favouritesCount={favouriteIdsQuery.data?.length ?? 0}
          isAllActive={isAllActive}
          isFavouritesShowing={isFavouritesShowing}
          setShowFavourites={setShowFavourites}
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
            totalItemsCount={finalQuery.data?.total ?? 0}
            viewMode={viewMode}
            onUpdateFilter={updateFilter}
          />
          <WithQuery query={favouriteIdsQuery}>
            {favIds => (
              <WithQuery
                query={
                  finalQuery as UseQueryResult<{
                    items: (Hit | ProjectDetails)[]
                    total: number
                  }>
                }
              >
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
