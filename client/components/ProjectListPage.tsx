import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import {
  ContentWrapperWithSidebar,
  ContextMenuGroup,
  ContextMenuItem,
  EmptyStateScreen,
  LayoutWithSidebar,
  ModuleHeader,
  Pagination,
  Scrollbar,
  SidebarDivider,
  TagsFilter,
  WithQuery
} from 'lifeforge-ui'
import {
  type ComponentProps,
  type Dispatch,
  type ReactNode,
  type SetStateAction
} from 'react'
import { useTranslation } from 'react-i18next'

import type { Hit } from '@/components/types'

import type { FilterReturnType } from '../hooks/useProjectFilter'
import type { ProjectDetails } from '../pages/ProjectDetails'
import forgeAPI from '../utils/forgeAPI'
import ProjectInnerHeader from './ProjectInnerHeader'
import ProjectSidebar from './ProjectSidebar'
import { SORT_TYPES } from './SortBySelector'
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
  headerFilterItems: ComponentProps<typeof TagsFilter>['availableFilters']
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
  const { t } = useTranslation('apps.modrinth')

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
    sortBy,
    setSortBy,
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
      <ModuleHeader
        contextMenuProps={{
          classNames: {
            wrapper: 'md:hidden flex',
            menu: 'min-w-64'
          },
          children: (
            <>
              <ContextMenuGroup
                icon="tabler:eye"
                label={t('hamburgerMenu.viewAs')}
              >
                {(['grid', 'list', 'gallery'] as const).map(type => (
                  <ContextMenuItem
                    key={type}
                    checked={viewMode === type}
                    icon={type === 'grid' ? 'uil:apps' : 'uil:list-ul'}
                    label={t(`viewTypes.${type}`)}
                    onClick={() => {
                      setViewMode(type)
                    }}
                  />
                ))}
              </ContextMenuGroup>
              <SidebarDivider noMargin />
              <ContextMenuGroup
                icon="tabler:arrows-up-down"
                label={t('hamburgerMenu.sortBy')}
              >
                {SORT_TYPES.map(([type, icon]) => (
                  <ContextMenuItem
                    key={type}
                    checked={sortBy === type}
                    icon={icon}
                    label={t(`sortTypes.${type}`)}
                    onClick={() => {
                      setSortBy(type)
                    }}
                  />
                ))}
              </ContextMenuGroup>
            </>
          )
        }}
      />
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
            setSortBy={setSortBy}
            setViewMode={setViewMode}
            sortBy={sortBy}
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
                  items?.length > 0 ? (
                    <Scrollbar>
                      <div className="space-y-3">
                        <Pagination
                          className="mb-6"
                          page={page}
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
                          page={page}
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
                      message={{
                        id: 'search',
                        namespace: 'apps.modrinth'
                      }}
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
