import { useQuery } from '@tanstack/react-query'

import ProjectListPage from '@/components/ProjectListPage'
import { constructSearchParamsFromFilter } from '@/hooks/useProjectFilter'
import constructHeaderFilterItems from '@/utils/headerFilterUtils'
import constructSidebar from '@/utils/sidebarUtils'

import '../../index.css'
import forgeAPI from '../../utils/forgeAPI'
import { ICONS, getShaderIcon, getShaderKey } from './constants/icons'
import useFilter from './hooks/useFilter'

function ShaderList() {
  const filters = useFilter()

  const entriesQuery = useQuery(
    forgeAPI.projects.list
      .input(constructSearchParamsFromFilter(filters, 'shader'))
      .queryOptions()
  )

  const versionsQuery = useQuery(forgeAPI.gameVersions.list.queryOptions())

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
    features: constructHeaderFilterItems(ICONS.features),
    performanceImpact: constructHeaderFilterItems(ICONS.performanceImpact)
  }

  const sidebarContent = constructSidebar(
    [
      ['categories', 'general'],
      ['features', 'general'],
      ['performanceImpact', 'general'],
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
      getIcon={getShaderIcon}
      getKey={getShaderKey}
      headerFilterItems={headerFilterItems}
      projectType="shader"
      sidebarContent={sidebarContent}
    />
  )
}

export default ShaderList
