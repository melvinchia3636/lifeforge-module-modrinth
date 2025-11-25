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

import EntryItem from './components/EntryItem'
import InnerHeader from './components/InnerHeader'
import Sidebar from './components/Sidebar'
import useFilter from './hooks/useFilter'
import forgeAPI from './utils/forgeAPI'

export type Hit = InferOutput<
  typeof forgeAPI.modrinth.listProjects
>['items'][number]

function Modrinth() {
  const { page, setPage, debouncedSearchQuery, version, loaders, categories } =
    useFilter()

  const entriesQuery = useQuery(
    forgeAPI.modrinth.listProjects
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
                    {entries.items.map(entry => (
                      <EntryItem key={entry.project_id} entry={entry} />
                    ))}
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
