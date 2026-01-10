import { useQuery } from '@tanstack/react-query'

import ProjectListPage from '@/components/ProjectListPage'
import { constructSearchParamsFromFilter } from '@/hooks/useProjectFilter'
import constructHeaderFilterItems from '@/utils/headerFilterUtils'
import constructSidebar from '@/utils/sidebarUtils'

import '../../index.css'
import forgeAPI from '../../utils/forgeAPI'
import { ICONS, getModIcon, getModKey } from './constants/icons'
import useFilter from './hooks/useFilter'

function Modrinth() {
  const filters = useFilter()

  const entriesQuery = useQuery(
    forgeAPI.melvinchia3636$modrinth.projects.list
      .input(constructSearchParamsFromFilter(filters, 'mod'))
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
      getIcon={getModIcon}
      getKey={getModKey}
      headerFilterItems={headerFilterItems}
      projectType="mod"
      sidebarContent={sidebarContent}
    />
  )
}

export default Modrinth
