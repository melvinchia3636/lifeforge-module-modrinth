import { useQuery } from '@tanstack/react-query'

import ProjectListPage from '@/components/ProjectListPage'
import { constructSearchParamsFromFilter } from '@/hooks/useProjectFilter'
import { forgeAPI } from '@/manifest'
import constructHeaderFilterItems from '@/utils/headerFilterUtils'
import constructSidebar from '@/utils/sidebarUtils'

import { ICONS, getModIcon, getModKey } from './constants/icons'
import useFilter from './hooks/useFilter'

function Modrinth() {
  const filters = useFilter()

  const entriesQuery = useQuery(
    forgeAPI.projects.list
      .input(constructSearchParamsFromFilter(filters, 'mod'))
      .queryOptions()
  )

  const versionsQuery = useQuery(forgeAPI.gameVersions.list.queryOptions())

  const headerFilterItems = {
    version: {
      data:
        versionsQuery.data?.map(e => ({
          id: e.version,
          label: e.version || 'Unknown',
          icon: 'tabler:device-gamepad'
        })) ?? []
    },
    loaders: constructHeaderFilterItems(ICONS.loaders),
    categories: constructHeaderFilterItems(ICONS.categories),
    environments: constructHeaderFilterItems(ICONS.environments)
  }

  const sidebarContent = constructSidebar(
    [
      ['categories', 'general', true],
      ['environments', 'general'],
      ['version', 'version'],
      ['loaders', 'general', true]
    ],
    ICONS,
    filters
  )

  return (
    <ProjectListPage
      dataQuery={entriesQuery}
      filters={filters}
      getIcon={getModIcon}
      getKey={getModKey}
      headerFilterItems={headerFilterItems}
      projectType="mod"
      sidebarContent={sidebarContent}
    />
  )
}

export default Modrinth
