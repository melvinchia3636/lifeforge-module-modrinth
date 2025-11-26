import { ICONS } from '@/pages/ModList/constants/icons'
import useFilter from '@/pages/ModList/hooks/useFilter'
import forgeAPI from '@/utils/forgeAPI'
import { useQuery } from '@tanstack/react-query'
import {
  Button,
  HeaderFilter,
  SearchInput,
  ViewModeSelector,
  useModuleSidebarState
} from 'lifeforge-ui'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import COLORS from 'tailwindcss/colors'

function InnerHeader({ totalItemsCount }: { totalItemsCount: number }) {
  const { t } = useTranslation('apps.modrinth')

  const { setIsSidebarOpen } = useModuleSidebarState()

  const {
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    version,
    loaders,
    categories,
    updateFilter
  } = useFilter()

  const versionsQuery = useQuery(
    forgeAPI.modrinth.gameVersions.list.queryOptions()
  )

  return (
    <>
      <header className="flex-between flex w-full">
        <div className="flex min-w-0 items-end">
          <h1 className="truncate text-2xl font-semibold lg:text-3xl">
            {!version && !loaders && !categories && !searchQuery
              ? t('sidebar.allMods')
              : t('sidebar.filteredMods')}
          </h1>
          <span className="text-bg-500 mr-8 ml-2 text-base">
            ({totalItemsCount.toLocaleString()})
          </span>
        </div>
        <Button
          className="lg:hidden"
          icon="tabler:menu"
          variant="plain"
          onClick={() => {
            setIsSidebarOpen(true)
          }}
        />
      </header>
      <HeaderFilter
        items={{
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
          }
        }}
        setValues={{
          version: (value: string | string[] | null) => {
            updateFilter({
              version: value
            })
          },
          loaders: (value: string | string[] | null) => {
            updateFilter({
              loaders: Array.isArray(value) ? value.join(',') : value
            })
          },
          categories: (value: string | string[] | null) => {
            updateFilter({
              categories: Array.isArray(value) ? value.join(',') : value
            })
          }
        }}
        values={{
          version: version,
          loaders: loaders.split(','),
          categories: categories.split(',')
        }}
      />
      <div className="mt-4 mb-6 flex gap-2 xl:mt-6">
        <SearchInput
          searchTarget="Modrinth"
          setValue={setSearchQuery}
          value={searchQuery}
        />
        <ViewModeSelector
          options={[
            {
              icon: 'tabler:list',
              value: 'list'
            },
            {
              icon: 'uil:apps',
              value: 'grid'
            },
            {
              icon: 'tabler:photo',
              value: 'gallery'
            }
          ]}
          setViewMode={setViewMode}
          viewMode={viewMode}
        />
      </div>
    </>
  )
}

export default InnerHeader
