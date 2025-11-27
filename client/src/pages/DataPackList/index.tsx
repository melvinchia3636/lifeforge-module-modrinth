import ProjectListPage from '@/components/ProjectListPage'
import constructHeaderFilterItems from '@/utils/headerFilterUtils'
import constructSidebar from '@/utils/sidebarUtils'
import { useQuery } from '@tanstack/react-query'

import forgeAPI from '../../utils/forgeAPI'
import { ICONS, getDataPackIcon, getDataPackKey } from './constants/icons'
import useFilter from './hooks/useFilter'

function DataPackList() {
  const filters = useFilter()

  const entriesQuery = useQuery(
    forgeAPI.modrinth.projects.list
      .input({
        page: filters.page.toString(),
        query: filters.debouncedSearchQuery || undefined,
        version: filters.version || undefined,
        categories: filters.categories || undefined,
        projectType: 'datapack'
      })
      .queryOptions()
  )

  const versionsQuery = useQuery(
    forgeAPI.modrinth.gameVersions.list.queryOptions()
  )

  const headerFilterItems = {
    version: {
      data:
        versionsQuery.data?.map(e => ({
          id: e,
          name: e || 'Unknown',
          icon: 'tabler:device-gamepad'
        })) ?? []
    },
    categories: constructHeaderFilterItems(ICONS.categories)
  }

  const sidebarContent = constructSidebar(
    [
      ['categories', 'general'],
      ['version', 'version']
    ],
    ICONS,
    filters
  )

  return (
    <ProjectListPage
      dataQuery={entriesQuery}
      filters={filters}
      getIcon={getDataPackIcon}
      getKey={getDataPackKey}
      headerFilterItems={headerFilterItems}
      projectType="datapack"
      sidebarContent={sidebarContent}
    />
  )
}

export default DataPackList
