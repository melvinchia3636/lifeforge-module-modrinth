import ProjectListPage from '@/components/ProjectListPage'
import GeneralSection from '@/components/sidebarSections/GeneralSection'
import VersionsSection from '@/components/sidebarSections/VersionsSection'
import constructHeaderFilterItems from '@/utils/headerFilterUtils'
import { useQuery } from '@tanstack/react-query'
import { SidebarDivider } from 'lifeforge-ui'

import forgeAPI from '../../utils/forgeAPI'
import { ICONS, getShaderIcon, getShaderKey } from './constants/icons'
import useFilter from './hooks/useFilter'

function ShaderList() {
  const {
    viewMode,
    setViewMode,
    page,
    setPage,
    searchQuery,
    setSearchQuery,
    debouncedSearchQuery,
    version,
    loaders,
    categories,
    features,
    performanceImpact,
    updateFilter
  } = useFilter()

  const entriesQuery = useQuery(
    forgeAPI.modrinth.projects.list
      .input({
        page: page.toString(),
        query: debouncedSearchQuery || undefined,
        version: version || undefined,
        loaders: loaders || undefined,
        categories:
          [categories, features, performanceImpact].filter(Boolean).join(',') ||
          undefined,
        projectType: 'shader'
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
    loaders: constructHeaderFilterItems(ICONS.loaders),
    categories: constructHeaderFilterItems(ICONS.categories),
    features: constructHeaderFilterItems(ICONS.features),
    performanceImpact: constructHeaderFilterItems(ICONS.performance_impact)
  }

  const sidebarContent = (
    <>
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
      <GeneralSection
        icons={ICONS.performance_impact}
        name="performanceImpact"
        selectedItem={performanceImpact}
        updateFilter={updateFilter}
      />
      <SidebarDivider />
      <VersionsSection selectedVersion={version} updateFilter={updateFilter} />
      <SidebarDivider />
      <GeneralSection
        icons={ICONS.loaders}
        name="loaders"
        selectedItem={loaders}
        updateFilter={updateFilter}
      />
    </>
  )

  return (
    <ProjectListPage
      dataQuery={entriesQuery}
      filterValues={{
        version,
        loaders,
        categories,
        features,
        performanceImpact
      }}
      getIcon={getShaderIcon}
      getKey={getShaderKey}
      headerFilterItems={headerFilterItems}
      page={page}
      projectType="shader"
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
          loaders: '',
          performanceImpact: '',
          version: ''
        })
        setSearchQuery('')
      }}
      onUpdateFilter={updateFilter}
    />
  )
}

export default ShaderList
