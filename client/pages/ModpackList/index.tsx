import { useQuery } from '@tanstack/react-query'

import ProjectListPage from '@/components/ProjectListPage'
import { constructSearchParamsFromFilter } from '@/hooks/useProjectFilter'
import constructHeaderFilterItems from '@/utils/headerFilterUtils'
import constructSidebar from '@/utils/sidebarUtils'

import forgeAPI from '../../utils/forgeAPI'
import { ICONS, getModpackIcon, getModpackKey } from './constants/icons'
import useFilter from './hooks/useFilter'

function ModpackList() {
  const filters = useFilter()

  const entriesQuery = useQuery(
    forgeAPI.melvinchia3636$modrinth.projects.list
      .input(constructSearchParamsFromFilter(filters, 'modpack'))
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
    loaders: constructHeaderFilterItems(ICONS.loaders),
    categories: constructHeaderFilterItems(ICONS.categories),
    environments: constructHeaderFilterItems(ICONS.environments)
  }

  const sidebarContent = constructSidebar(
    [
      ['categories', 'general'],
      ['environments', 'general'],
      ['version', 'version'],
      ['loaders', 'general']
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
