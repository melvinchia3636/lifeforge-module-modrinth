import ProjectListPage from '@/components/ProjectListPage'
import GeneralSection from '@/components/sidebarSections/GeneralSection'
import { useQuery } from '@tanstack/react-query'
import { SidebarDivider, SidebarItem } from 'lifeforge-ui'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import COLORS from 'tailwindcss/colors'

import VersionsSection from '../../components/sidebarSections/VersionsSection'
import forgeAPI from '../../utils/forgeAPI'
import { ICONS, getDataPackIcon, getDataPackKey } from './constants/icons'
import useFilter from './hooks/useFilter'

function DataPackList() {
  const { t } = useTranslation('apps.modrinth')

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
    categories: {
      data: [
        ...Object.keys(ICONS.categories).map(category => ({
          id: _.kebabCase(category.toLowerCase()),
          name: category,
          icon: `customHTML:${ICONS.categories[category as keyof typeof ICONS.categories]}`
        })),
        ...Object.keys(ICONS.categories).map(category => ({
          id: `!${_.kebabCase(category.toLowerCase())}`,
          name: category,
          icon: `customHTML:${ICONS.categories[category as keyof typeof ICONS.categories]}`,
          color: COLORS.red[500]
        }))
      ],
      isColored: true
    }
  }

  const sidebarContent = (
    <>
      <SidebarItem
        active={false}
        icon="tabler:star"
        label="My Favourites"
        namespace="apps.modrinth"
        onClick={() => {}}
      />
      <SidebarDivider />
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
      filteredTitle={t('sidebar.filteredDataPacks')}
      filterValues={{ version, categories }}
      getIcon={getDataPackIcon}
      getKey={getDataPackKey}
      headerFilterItems={headerFilterItems}
      isLoading={entriesQuery.isLoading}
      items={entriesQuery.data?.items ?? []}
      page={page}
      searchQuery={searchQuery}
      setPage={setPage}
      setSearchQuery={setSearchQuery}
      setViewMode={setViewMode as (mode: string) => void}
      sidebarContent={sidebarContent}
      title="All DataPacks"
      totalItems={entriesQuery.data?.total ?? 0}
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
