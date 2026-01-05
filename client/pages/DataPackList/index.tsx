import { useQuery } from '@tanstack/react-query'

import ProjectListPage from '@/components/ProjectListPage'
import { constructSearchParamsFromFilter } from '@/hooks/useProjectFilter'
import constructHeaderFilterItems from '@/utils/headerFilterUtils'
import constructSidebar from '@/utils/sidebarUtils'

import forgeAPI from '../../utils/forgeAPI'
import { ICONS, getDataPackIcon, getDataPackKey } from './constants/icons'
import useFilter from './hooks/useFilter'

function DataPackList() {
  const filters = useFilter()

  const entriesQuery = useQuery(
    forgeAPI.melvinchia3636$modrinth.projects.list
      .input(constructSearchParamsFromFilter(filters, 'datapack'))
      .queryOptions()
  )

  const versionsQuery = useQuery(
    forgeAPI.melvinchia3636$modrinth.gameVersions.list.queryOptions()
  )

  const headerFilterItems = {
    version: {
      data:
        versionsQuery.data?.map(e => ({
          id: e,
          label: e || 'Unknown',
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
