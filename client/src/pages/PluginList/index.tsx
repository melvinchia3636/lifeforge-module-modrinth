import ProjectListPage from '@/components/ProjectListPage'
import GeneralSection from '@/components/sidebarSections/GeneralSection'
import VersionsSection from '@/components/sidebarSections/VersionsSection'
import forgeAPI from '@/utils/forgeAPI'
import { useQuery } from '@tanstack/react-query'
import { useDebounce } from '@uidotdev/usehooks'
import { SidebarDivider, SidebarItem } from 'lifeforge-ui'
import _ from 'lodash'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import COLORS from 'tailwindcss/colors'

import { ICONS, getPluginIcon, getPluginKey } from './constants/icons'
import useFilter from './hooks/useFilter'

function PluginList() {
  const { t } = useTranslation('apps.modrinth')

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
    loaders: {
      data: [
        ...Object.keys(ICONS.loaders).map(loader => ({
          id: _.kebabCase(loader.toLowerCase()),
          name: loader,
          icon: `customHTML:${ICONS.loaders[loader as keyof typeof ICONS.loaders]}`
        })),
        ...Object.keys(ICONS.loaders).map(loader => ({
          id: `!${_.kebabCase(loader.toLowerCase())}`,
          name: loader,
          icon: `customHTML:${ICONS.loaders[loader as keyof typeof ICONS.loaders]}`,
          color: COLORS.red[500]
        }))
      ],
      isColored: true
    },
    platforms: {
      data: [
        ...Object.keys(ICONS.platforms).map(platform => ({
          id: _.kebabCase(platform.toLowerCase()),
          name: platform,
          icon: `customHTML:${ICONS.platforms[platform as keyof typeof ICONS.platforms]}`
        })),
        ...Object.keys(ICONS.platforms).map(platform => ({
          id: `!${_.kebabCase(platform.toLowerCase())}`,
          name: platform,
          icon: `customHTML:${ICONS.platforms[platform as keyof typeof ICONS.platforms]}`,
          color: COLORS.red[500]
        }))
      ],
      isColored: true
    }
  }

  return (
    <ProjectListPage
      filteredTitle={t('sidebar.filteredPlugins')}
      filterValues={{ version, categories, loaders, platforms }}
      getIcon={getPluginIcon}
      getKey={getPluginKey}
      headerFilterItems={headerFilterItems}
      isLoading={entriesQuery.isLoading}
      items={entriesQuery.data?.items ?? []}
      page={page}
      searchQuery={searchQuery}
      setPage={setPage}
      setSearchQuery={setSearchQuery}
      setViewMode={setViewMode as (mode: string) => void}
      sidebarContent={sidebarContent}
      title="All Plugins"
      totalItems={entriesQuery.data?.total ?? 0}
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
