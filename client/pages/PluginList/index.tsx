import { useQuery } from '@tanstack/react-query'

import ProjectListPage from '@/components/ProjectListPage'
import { constructSearchParamsFromFilter } from '@/hooks/useProjectFilter'
import forgeAPI from '@/utils/forgeAPI'
import constructHeaderFilterItems from '@/utils/headerFilterUtils'
import constructSidebar from '@/utils/sidebarUtils'

import { ICONS, getPluginIcon, getPluginKey } from './constants/icons'
import useFilter from './hooks/useFilter'

function PluginList() {
  const filters = useFilter()

  const entriesQuery = useQuery(
    forgeAPI.melvinchia3636$modrinth.projects.list
      .input(constructSearchParamsFromFilter(filters, 'plugin'))
      .queryOptions()
  )

  const versionsQuery = useQuery(
    forgeAPI.melvinchia3636$modrinth.gameVersions.list.queryOptions()
  )

  const sidebarContent = constructSidebar(
    [
      ['categories', 'general'],
      ['version', 'version'],
      ['loaders', 'general'],
      ['platforms', 'general']
    ],
    ICONS,
    filters
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
    categories: constructHeaderFilterItems(ICONS.categories),
    loaders: constructHeaderFilterItems(ICONS.loaders),
    platforms: constructHeaderFilterItems(ICONS.platforms)
  }

  return (
    <ProjectListPage
      dataQuery={entriesQuery}
      filters={filters}
      getIcon={getPluginIcon}
      getKey={getPluginKey}
      headerFilterItems={headerFilterItems}
      projectType="plugin"
      sidebarContent={sidebarContent}
    />
  )
}

export default PluginList
