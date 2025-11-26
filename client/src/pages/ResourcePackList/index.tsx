import ProjectListPage from '@/components/ProjectListPage'
import GeneralSection from '@/components/sidebarSections/GeneralSection'
import VersionsSection from '@/components/sidebarSections/VersionsSection'
import { useQuery } from '@tanstack/react-query'
import { SidebarDivider, SidebarItem } from 'lifeforge-ui'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
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
    features: {
      data: [
        ...Object.keys(ICONS.features).map(feature => ({
          id: _.kebabCase(feature.toLowerCase()),
          name: feature,
          icon: `customHTML:${ICONS.features[feature as keyof typeof ICONS.features]}`
        })),
        ...Object.keys(ICONS.features).map(feature => ({
          id: `!${_.kebabCase(feature.toLowerCase())}`,
          name: feature,
          icon: `customHTML:${ICONS.features[feature as keyof typeof ICONS.features]}`,
          color: COLORS.red[500]
        }))
      ],
      isColored: true
    },
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
      <SidebarItem
        active={false}
        icon="tabler:star"
        label="My Favourites"
        namespace="apps.modrinth"
        onClick={() => {}}
      />
      <SidebarDivider />
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
      filteredTitle={t('sidebar.filteredResourcePacks')}
      filterValues={{ version, categories, features, resolutions }}
      getIcon={getResourcePackIcon}
      getKey={getResourcePackKey}
      headerFilterItems={headerFilterItems}
      isLoading={entriesQuery.isLoading}
      items={entriesQuery.data?.items ?? []}
      page={page}
      searchQuery={searchQuery}
      setPage={setPage}
      setSearchQuery={setSearchQuery}
      setViewMode={setViewMode as (mode: string) => void}
      sidebarContent={sidebarContent}
      title="All ResourcePacks"
      totalItems={entriesQuery.data?.total ?? 0}
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
