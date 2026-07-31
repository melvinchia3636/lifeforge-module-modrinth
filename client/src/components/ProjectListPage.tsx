import { type UseQueryResult, useQuery } from '@tanstack/react-query'
import {
  type ComponentProps,
  type Dispatch,
  type ReactNode,
  type SetStateAction
} from 'react'

import { useModuleTranslation } from '@lifeforge/localization'
import {
  ContentWrapperWithSidebar,
  ContextMenu,
  ContextMenuGroup,
  ContextMenuItem,
  EmptyStateScreen,
  LayoutWithSidebar,
  ModuleHeader,
  Pagination,
  Scrollbar,
  SidebarDivider,
  Stack,
  TagsFilter,
  WithQuery
} from '@lifeforge/ui'

import type { Hit } from '@/components/types'
import { forgeAPI } from '@/manifest'

import type { FilterReturnType } from '../hooks/useProjectFilter'
import type { ProjectDetails } from '../pages/ProjectDetails'
import ProjectInnerHeader from './ProjectInnerHeader'
import ProjectSidebar from './ProjectSidebar'
import { SORT_TYPES } from './SortBySelector'
import { ViewMode } from './views'
import GalleryView from './views/GalleryView'
import GridView from './views/GridView'
import ListView from './views/ListView'

interface ProjectListPageProps {
  projectType:
    'mod' | 'modpack' | 'datapack' | 'resourcepack' | 'shader' | 'plugin'
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
  const { t } = useModuleTranslation()

  const {
    page,
    setPage,
    isFavouritesShowing,
    setShowFavourites,
    searchQuery,
    setSearchQuery,
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
    forgeAPI.favourites.listItemIds
      .input({
        projectType
      })
      .queryOptions()
  )

  const favouriteItemsQuery = useQuery(
    forgeAPI.favourites.listItems
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
    <ViewMode.Root>
      <ModuleHeader
        title={projectType}
        trailing={
          <ContextMenu
            componentProps={{
              menu: {
                minWidth: '16rem'
              }
            }}
            display={{ base: 'block', md: 'none' }}
          >
            <ViewMode.ContextMenuSelector />
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
          </ContextMenu>
        }
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
            sortBy={sortBy}
            title={projectType}
            totalItemsCount={finalQuery.data?.total ?? 0}
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
                      <Stack gap="lg" mb="lg">
                        <Pagination
                          page={page}
                          totalPages={Math.ceil(total / 20)}
                          onPageChange={
                            setPage as Dispatch<SetStateAction<number>>
                          }
                        />
                        <ViewMode.When mode="list">
                          <ListView
                            entries={items}
                            favouritesIds={favIds}
                            getIcon={getIcon}
                            getKey={getKey}
                          />
                        </ViewMode.When>
                        <ViewMode.When mode="grid">
                          <GridView
                            entries={items}
                            favouritesIds={favIds}
                            getIcon={getIcon}
                            getKey={getKey}
                          />
                        </ViewMode.When>
                        <ViewMode.When mode="gallery">
                          <GalleryView
                            entries={items}
                            favouritesIds={favIds}
                            getIcon={getIcon}
                            getKey={getKey}
                          />
                        </ViewMode.When>
                        <Pagination
                          page={page}
                          totalPages={Math.ceil(total / 20)}
                          onPageChange={
                            setPage as Dispatch<SetStateAction<number>>
                          }
                        />
                      </Stack>
                    </Scrollbar>
                  ) : (
                    <EmptyStateScreen
                      icon="tabler:search-off"
                      message={{
                        id: 'search'
                      }}
                    />
                  )
                }
              </WithQuery>
            )}
          </WithQuery>
        </ContentWrapperWithSidebar>
      </LayoutWithSidebar>
    </ViewMode.Root>
  )
}

export default ProjectListPage
