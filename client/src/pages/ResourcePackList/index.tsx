import { useQuery } from '@tanstack/react-query'
import COLORS from 'tailwindcss/colors'

import ProjectListPage from '@/components/ProjectListPage'
import { constructSearchParamsFromFilter } from '@/hooks/useProjectFilter'
import constructHeaderFilterItems from '@/utils/headerFilterUtils'
import constructSidebar from '@/utils/sidebarUtils'

import '../../index.css'
import forgeAPI from '../../utils/forgeAPI'
import ResolutionsSection from './components/ResolutionsSection'
import {
  ICONS,
  getResourcePackIcon,
  getResourcePackKey
} from './constants/icons'
import useFilter from './hooks/useFilter'

const RESOLUTIONS = [
  '8x or lower',
  '16x',
  '32x',
  '64x',
  '128x',
  '256x',
  '512x or higher'
]

function ResourcePackList() {
  const filters = useFilter()

  const entriesQuery = useQuery(
    forgeAPI.melvinchia3636$modrinth.projects.list
      .input(constructSearchParamsFromFilter(filters, 'resourcepack'))
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
    categories: constructHeaderFilterItems(ICONS.categories),
    features: constructHeaderFilterItems(ICONS.features),
    resolutions: {
      data: [
        ...RESOLUTIONS.map(resolution => ({
          id: resolution
            .replace(' or higher', '+')
            .replace(' or lower', '-')
            .toLowerCase(),
          label: resolution,
          icon: 'tabler:aspect-ratio'
        })),
        ...RESOLUTIONS.map(resolution => ({
          id: `!${resolution.replace(' or higher', '+').replace(' or lower', '-').toLowerCase()}`,
          label: resolution,
          icon: 'tabler:aspect-ratio',
          color: COLORS.red[500]
        }))
      ],
      isColored: true
    }
  }

  const sidebarContent = constructSidebar(
    [
      ['version', 'version'],
      ['categories', 'general'],
      ['features', 'general'],
      ['resolutions', ResolutionsSection]
    ],
    ICONS,
    filters
  )

  return (
    <ProjectListPage
      dataQuery={entriesQuery}
      filters={filters}
      getIcon={getResourcePackIcon}
      getKey={getResourcePackKey}
      headerFilterItems={headerFilterItems}
      projectType="resourcepack"
      sidebarContent={sidebarContent}
    />
  )
}

export default ResourcePackList
