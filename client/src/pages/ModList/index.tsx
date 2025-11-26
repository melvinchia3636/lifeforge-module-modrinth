import { useQuery } from '@tanstack/react-query'
import {
  ContentWrapperWithSidebar,
  EmptyStateScreen,
  LayoutWithSidebar,
  ModuleHeader,
  Pagination,
  Scrollbar,
  WithQuery
} from 'lifeforge-ui'
import { type InferOutput } from 'shared'

import forgeAPI from '../../utils/forgeAPI'
import InnerHeader from './components/InnerHeader'
import Sidebar from './components/Sidebar'
import GalleryView from './components/views/GalleryView'
import GridView from './components/views/GridView'
import ListView from './components/views/ListView'
import useFilter from './hooks/useFilter'

export type Hit = InferOutput<
  typeof forgeAPI.modrinth.projects.list
>['items'][number]

const VIEW_COMPONENTS = {
  list: ListView,
  grid: GridView,
  gallery: GalleryView
}

function Modrinth() {
  const {
    viewMode,
    page,
    setPage,
    debouncedSearchQuery,
    version,
    loaders,
    categories
  } = useFilter()

  const entriesQuery = useQuery(
    forgeAPI.modrinth.projects.list
      .input({
        page: page.toString(),
        query: debouncedSearchQuery || undefined,
        version: version || undefined,
        loaders: loaders || undefined,
        categories: categories || undefined
      })
      .queryOptions()
  )

  return (
    <>
      <ModuleHeader />
      <LayoutWithSidebar>
        <Sidebar />
        <ContentWrapperWithSidebar>
          <InnerHeader totalItemsCount={entriesQuery.data?.total ?? 0} />

          <WithQuery query={entriesQuery}>
            {entries =>
              entries.total === 0 ? (
                <EmptyStateScreen
                  icon="tabler:search-off"
                  name="search"
                  namespace="apps.modrinth"
                />
              ) : (
                <Scrollbar>
                  <div className="space-y-3">
                    <Pagination
                      className="mb-6"
                      currentPage={page}
                      totalPages={Math.ceil(entries.total / 20)}
                      onPageChange={setPage}
                    />
                    {(() => {
                      const ViewComponent = VIEW_COMPONENTS[viewMode]

                      return ViewComponent ? (
                        <ViewComponent entries={entries.items} />
                      ) : null
                    })()}
                    <Pagination
                      className="my-6"
                      currentPage={page}
                      totalPages={Math.ceil(entries.total / 20)}
                      onPageChange={setPage}
                    />
                  </div>
                </Scrollbar>
              )
            }
          </WithQuery>
        </ContentWrapperWithSidebar>
      </LayoutWithSidebar>
    </>
  )
}

export default Modrinth
