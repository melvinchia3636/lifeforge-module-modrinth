import ProjectListPage from '@/components/ProjectListPage'
import GeneralSection from '@/components/sidebarSections/GeneralSection'
import VersionsSection from '@/components/sidebarSections/VersionsSection'
import constructHeaderFilterItems from '@/utils/headerFilterUtils'
import { useQuery } from '@tanstack/react-query'
import { SidebarDivider } from 'lifeforge-ui'
import COLORS from 'tailwindcss/colors'

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
  const {
    viewMode,
    setViewMode,
    page,
    setPage,
    searchQuery,
    setSearchQuery,
    debouncedSearchQuery,
    version,
    categories,
    features,
    resolutions,
    updateFilter
  } = useFilter()

  const entriesQuery = useQuery(
    forgeAPI.modrinth.projects.list
      .input({
        page: page.toString(),
        query: debouncedSearchQuery || undefined,
        version: version || undefined,
        categories:
          [categories, features, resolutions].filter(Boolean).join(',') ||
          undefined,
        projectType: 'resourcepack'
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
    categories: constructHeaderFilterItems(ICONS.categories),
    features: constructHeaderFilterItems(ICONS.features),
    resolutions: {
      data: [
        ...RESOLUTIONS.map(resolution => ({
          id: resolution
            .replace(' or higher', '+')
            .replace(' or lower', '-')
            .toLowerCase(),
          name: resolution,
          icon: 'tabler:aspect-ratio'
        })),
        ...RESOLUTIONS.map(resolution => ({
          id: `!${resolution.replace(' or higher', '+').replace(' or lower', '-').toLowerCase()}`,
          name: resolution,
          icon: 'tabler:aspect-ratio',
          color: COLORS.red[500]
        }))
      ],
      isColored: true
    }
  }

  const sidebarContent = (
    <>
      <VersionsSection selectedVersion={version} updateFilter={updateFilter} />
      <SidebarDivider />
      <GeneralSection
        icons={ICONS.categories}
        name="categories"
        selectedItem={categories}
        updateFilter={updateFilter}
      />
      <SidebarDivider />
      <GeneralSection
        icons={ICONS.features}
        name="features"
        selectedItem={features}
        updateFilter={updateFilter}
      />
      <SidebarDivider />
      <ResolutionsSection />
    </>
  )

  return (
    <ProjectListPage
      dataQuery={entriesQuery}
      filterValues={{ version, categories, features, resolutions }}
      getIcon={getResourcePackIcon}
      getKey={getResourcePackKey}
      headerFilterItems={headerFilterItems}
      page={page}
      projectType="resourcepack"
      searchQuery={searchQuery}
      setPage={setPage}
      setSearchQuery={setSearchQuery}
      setViewMode={setViewMode as (mode: string) => void}
      sidebarContent={sidebarContent}
      viewMode={viewMode}
      onResetFilter={() => {
        updateFilter({
          categories: '',
          features: '',
          resolutions: '',
          version: ''
        })
        setSearchQuery('')
      }}
      onUpdateFilter={updateFilter}
    />
  )
}

export default ResourcePackList
