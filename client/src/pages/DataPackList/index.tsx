import ProjectListPage from '@/components/ProjectListPage'
import GeneralSection from '@/components/sidebarSections/GeneralSection'
import constructHeaderFilterItems from '@/utils/headerFilterUtils'
import { useQuery } from '@tanstack/react-query'
import { SidebarDivider } from 'lifeforge-ui'

import VersionsSection from '../../components/sidebarSections/VersionsSection'
import forgeAPI from '../../utils/forgeAPI'
import { ICONS, getDataPackIcon, getDataPackKey } from './constants/icons'
import useFilter from './hooks/useFilter'

function DataPackList() {
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
    updateFilter
  } = useFilter()

  const entriesQuery = useQuery(
    forgeAPI.modrinth.projects.list
      .input({
        page: page.toString(),
        query: debouncedSearchQuery || undefined,
        version: version || undefined,
        categories: categories || undefined,
        projectType: 'datapack'
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
    categories: constructHeaderFilterItems(ICONS.categories)
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
      <VersionsSection selectedVersion={version} updateFilter={updateFilter} />
    </>
  )

  return (
    <ProjectListPage
      dataQuery={entriesQuery}
      filterValues={{ version, categories }}
      getIcon={getDataPackIcon}
      getKey={getDataPackKey}
      headerFilterItems={headerFilterItems}
      page={page}
      projectType="datapack"
      searchQuery={searchQuery}
      setPage={setPage}
      setSearchQuery={setSearchQuery}
      setViewMode={setViewMode as (mode: string) => void}
      sidebarContent={sidebarContent}
      viewMode={viewMode}
      onResetFilter={() => {
        updateFilter({
          categories: '',
          version: ''
        })
        setSearchQuery('')
      }}
      onUpdateFilter={updateFilter}
    />
  )
}

export default DataPackList
