import ProjectListPage from '@/components/ProjectListPage'
import GeneralSection from '@/components/sidebarSections/GeneralSection'
import VersionsSection from '@/components/sidebarSections/VersionsSection'
import forgeAPI from '@/utils/forgeAPI'
import constructHeaderFilterItems from '@/utils/headerFilterUtils'
import { useQuery } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import { SidebarDivider } from 'lifeforge-ui'
import { useState } from 'react'

import { ICONS, getPluginIcon, getPluginKey } from './constants/icons'
import useFilter from './hooks/useFilter'

function PluginList() {
  const {
    viewMode,
    setViewMode,
    categories,
    version,
    loaders,
    platforms,
    updateFilter
  } = useFilter()

  const [page, setPage] = useState(1)

  const [searchQuery, setSearchQuery] = useState('')

  const [debouncedSearchQuery] = useDebounce(searchQuery, 500)

  const entriesQuery = useQuery(
    forgeAPI.modrinth.projects.list
      .input({
        page: page.toString(),
        query: debouncedSearchQuery || undefined,
        version: version || undefined,
        categories:
          [categories, loaders, platforms].filter(Boolean).join(',') ||
          undefined,
        projectType: 'plugin'
      })
      .queryOptions()
  )

  const versionsQuery = useQuery(
    forgeAPI.modrinth.gameVersions.list.queryOptions()
  )

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
      <SidebarDivider />
      <GeneralSection
        icons={ICONS.loaders}
        name="loaders"
        selectedItem={loaders}
        updateFilter={updateFilter}
      />
      <SidebarDivider />
      <GeneralSection
        icons={ICONS.platforms}
        name="platforms"
        selectedItem={platforms}
        updateFilter={updateFilter}
      />
    </>
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
    loaders: constructHeaderFilterItems(ICONS.loaders),
    platforms: constructHeaderFilterItems(ICONS.platforms)
  }

  return (
    <ProjectListPage
      dataQuery={entriesQuery}
      filterValues={{ version, categories, loaders, platforms }}
      getIcon={getPluginIcon}
      getKey={getPluginKey}
      headerFilterItems={headerFilterItems}
      page={page}
      projectType="plugin"
      searchQuery={searchQuery}
      setPage={setPage}
      setSearchQuery={setSearchQuery}
      setViewMode={setViewMode as (mode: string) => void}
      sidebarContent={sidebarContent}
      viewMode={viewMode}
      onResetFilter={() => {
        updateFilter({
          categories: '',
          version: '',
          loaders: '',
          platforms: ''
        })
        setSearchQuery('')
      }}
      onUpdateFilter={updateFilter}
    />
  )
}

export default PluginList
