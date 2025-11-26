import ProjectListPage from '@/components/ProjectListPage'
import GeneralSection from '@/components/sidebarSections/GeneralSection'
import VersionsSection from '@/components/sidebarSections/VersionsSection'
import { useQuery } from '@tanstack/react-query'
import { SidebarDivider, SidebarItem } from 'lifeforge-ui'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import COLORS from 'tailwindcss/colors'

import forgeAPI from '../../utils/forgeAPI'
import { ICONS, getModpackIcon, getModpackKey } from './constants/icons'
import useFilter from './hooks/useFilter'

function ModpackList() {
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
    loaders: {
      data: [
        ...Object.keys(ICONS.loaders).map(loader => ({
          id: _.kebabCase(loader.toLowerCase()),
          name: loader,
          icon: `customHTML:${ICONS.loaders[loader as keyof typeof ICONS.loaders]}`
        })),
        ...Object.keys(ICONS.loaders)
          .slice(0, 10)
          .map(loader => ({
            id: `!${_.kebabCase(loader.toLowerCase())}`,
            name: loader,
            icon: `customHTML:${ICONS.loaders[loader as keyof typeof ICONS.loaders]}`,
            color: COLORS.red[500]
          }))
      ],
      isColored: true
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
    },
    environments: {
      data: [
        ...Object.keys(ICONS.environments).map(environment => ({
          id: _.kebabCase(environment.toLowerCase()),
          name: environment,
          icon: `customHTML:${ICONS.environments[environment as keyof typeof ICONS.environments]}`
        })),
        ...Object.keys(ICONS.environments).map(environment => ({
          id: `!${_.kebabCase(environment.toLowerCase())}`,
          name: environment,
          icon: `customHTML:${ICONS.environments[environment as keyof typeof ICONS.environments]}`,
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
      filteredTitle={t('sidebar.filteredModpacks')}
      filterValues={{ version, loaders, categories, environments }}
      getIcon={getModpackIcon}
      getKey={getModpackKey}
      headerFilterItems={headerFilterItems}
      isLoading={entriesQuery.isLoading}
      items={entriesQuery.data?.items ?? []}
      page={page}
      searchQuery={searchQuery}
      setPage={setPage}
      setSearchQuery={setSearchQuery}
      setViewMode={setViewMode as (mode: string) => void}
      sidebarContent={sidebarContent}
      title="All Modpacks"
      totalItems={entriesQuery.data?.total ?? 0}
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
