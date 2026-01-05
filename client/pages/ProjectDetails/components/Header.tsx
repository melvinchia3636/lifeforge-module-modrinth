import { Icon } from '@iconify/react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { sizeFormatter } from 'human-readable'
import { Button, TagChip, useModalStore } from 'lifeforge-ui'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { usePersonalization, usePromiseLoading } from 'shared'

import forgeAPI from '@/utils/forgeAPI'

import type { ProjectDetails } from '..'
import DownloadModal from './DownloadModal'

function Header({
  data,
  getIcon,
  getKey
}: {
  data: ProjectDetails
  getIcon: (key: string) => string
  getKey: (key: string) => string | undefined
}) {
  const queryClient = useQueryClient()

  const { t } = useTranslation('apps.melvinchia3636$modrinth')

  const { language } = usePersonalization()

  const open = useModalStore(state => state.open)

  const isFavouriteQuery = useQuery(
    forgeAPI.melvinchia3636$modrinth.favourites.checkItem
      .input({
        projectId: data.id
      })
      .queryOptions()
  )

  async function toggleFavourite() {
    const action = isFavouriteQuery.data ? 'remove' : 'add'

    try {
      await forgeAPI.melvinchia3636$modrinth.favourites[`${action}Item`].mutate(
        {
          projectId: data.id
        }
      )

      queryClient.invalidateQueries({ queryKey: ['modrinth', 'favourites'] })
    } catch {
      toast.error('Failed to update favourites. Please try again.')
    }
  }

  const [loading, handleToggleFavourite] = usePromiseLoading(toggleFavourite)

  return (
    <header className="border-bg-200 dark:border-bg-700/50 mt-2 mb-6 flex flex-col items-start justify-between gap-6 border-b pb-6 lg:flex-row lg:items-center lg:gap-12">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex gap-4">
          <div className="bg-bg-100 border-bg-200 dark:border-bg-700/50 shadow-custom dark:bg-bg-800/70 relative isolate size-24 shrink-0 overflow-hidden rounded-lg border sm:size-32">
            {data.icon_url ? (
              <img
                alt={`${data.title} icon`}
                className="absolute inset-0 h-full w-full object-cover"
                src={data.icon_url}
              />
            ) : (
              <Icon
                className="text-bg-200 dark:text-bg-700 absolute bottom-1/2 left-1/2 z-[-1] size-12 -translate-x-1/2 translate-y-1/2"
                icon="simple-icons:modrinth"
              />
            )}
          </div>
          <div className="sm:hidden">
            <h3 className="text-3xl font-medium">{data.title}</h3>
            <p className="text-bg-500 mt-2">{data.description}</p>
          </div>
        </div>
        <div>
          <div className="hidden sm:block">
            <h3 className="text-3xl font-medium">{data.title}</h3>
            <p className="text-bg-500 mt-2">{data.description}</p>
          </div>
          <div className="text-bg-500 mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
            <div className="flex items-center gap-1">
              <Icon className="size-5" icon="tabler:download" />
              <span className="text-base">
                {
                  sizeFormatter({
                    render: (literal, suffix) => `${literal}${suffix}`
                  })(data.downloads) as string
                }{' '}
                {t('projectDetails.header.downloads')}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Icon className="size-5" icon="tabler:users" />
              <span className="text-base">
                {sizeFormatter()(data.followers) as string}{' '}
                {t('projectDetails.header.follows')}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Icon className="size-5" icon="tabler:history" />
              <span className="text-base">
                {t('projectDetails.header.updated')}{' '}
                {dayjs(data.updated).locale(language).fromNow()}
              </span>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {data.categories.map(category => (
              <TagChip
                key={category}
                icon={`customHTML:${getIcon(category)}`}
                label={getKey(category) || category}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex w-full items-center gap-2 lg:w-auto">
        <Button
          className="w-full"
          icon="tabler:download"
          onClick={() => {
            open(DownloadModal, {
              slug: data.slug,
              name: data.title,
              getIcon,
              getKey
            })
          }}
        >
          {t('projectDetails.header.download')}
        </Button>
        <Button
          dangerous={isFavouriteQuery.data}
          icon={isFavouriteQuery.data ? 'tabler:heart-filled' : 'tabler:heart'}
          loading={isFavouriteQuery.isLoading || loading}
          namespace="apps.melvinchia3636$modrinth"
          variant={isFavouriteQuery.data ? 'plain' : 'secondary'}
          onClick={handleToggleFavourite}
        >
          {isFavouriteQuery.data && t('buttons.favourited')}
        </Button>
      </div>
    </header>
  )
}

export default Header
