import { useQuery } from '@tanstack/react-query'

import ProjectListPage from '@/components/ProjectListPage'
import { constructSearchParamsFromFilter } from '@/hooks/useProjectFilter'
import { forgeAPI } from '@/manifest'
import constructHeaderFilterItems from '@/utils/headerFilterUtils'
import constructSidebar from '@/utils/sidebarUtils'

import { ICONS, getModpackIcon, getModpackKey } from './constants/icons'
import useFilter from './hooks/useFilter'

function ModpackList() {
  const filters = useFilter()

  const entriesQuery = useQuery(
    forgeAPI.projects.list
      .input(constructSearchParamsFromFilter(filters, 'modpack'))
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
      getIcon={getModpackIcon}
      getKey={getModpackKey}
      headerFilterItems={headerFilterItems}
      projectType="modpack"
      sidebarContent={sidebarContent}
    />
  )
}

export default ModpackList
