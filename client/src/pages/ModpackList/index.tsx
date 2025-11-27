import ProjectListPage from '@/components/ProjectListPage'
import GeneralSection from '@/components/sidebarSections/GeneralSection'
import VersionsSection from '@/components/sidebarSections/VersionsSection'
import constructHeaderFilterItems from '@/utils/headerFilterUtils'
import { useQuery } from '@tanstack/react-query'
import { SidebarDivider } from 'lifeforge-ui'

import forgeAPI from '../../utils/forgeAPI'
import { ICONS, getModpackIcon, getModpackKey } from './constants/icons'
import useFilter from './hooks/useFilter'

function ModpackList() {
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
    environments,
    updateFilter
  } = useFilter()

  const entriesQuery = useQuery(
    forgeAPI.modrinth.projects.list
      .input({
        page: page.toString(),
        query: debouncedSearchQuery || undefined,
        version: version || undefined,
        loaders: loaders || undefined,
        categories: categories || undefined,
        environment: environments || undefined,
        projectType: 'modpack'
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
    environments: constructHeaderFilterItems(ICONS.environments)
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
        icons={ICONS.environments}
        name="environments"
        selectedItem={environments}
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
      filterValues={{ version, loaders, categories, environments }}
      getIcon={getModpackIcon}
      getKey={getModpackKey}
      headerFilterItems={headerFilterItems}
      page={page}
      projectType="modpack"
      searchQuery={searchQuery}
      setPage={setPage}
      setSearchQuery={setSearchQuery}
      setViewMode={setViewMode as (mode: string) => void}
      sidebarContent={sidebarContent}
      viewMode={viewMode}
      onResetFilter={() => {
        updateFilter({
          categories: '',
          environments: '',
          loaders: '',
          version: ''
        })
        setSearchQuery('')
      }}
      onUpdateFilter={updateFilter}
    />
  )
}

export default ModpackList
