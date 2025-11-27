import type { ProjectViewItemProps } from '@/components/types'
import forgeAPI from '@/utils/forgeAPI'
import { Icon } from '@iconify/react'
import { useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { sizeFormatter } from 'human-readable'
import { Button, ItemWrapper, TagChip } from 'lifeforge-ui'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useNavigate, usePersonalization, usePromiseLoading } from 'shared'

dayjs.extend(relativeTime)

function ListViewItem({
  entry,
  isFavourite,
  getIcon,
  getKey
}: ProjectViewItemProps) {
  const queryClient = useQueryClient()

  const { t } = useTranslation('apps.modrinth')

  const navigate = useNavigate()

  const { language } = usePersonalization()

  async function toggleFavourite() {
    const action = isFavourite ? 'remove' : 'add'

    try {
      await forgeAPI.modrinth.favourites[`${action}Item`].mutate({
        projectId: entry.project_id
      })

      queryClient.invalidateQueries({ queryKey: ['modrinth', 'favourites'] })
    } catch {
      toast.error('Failed to update favourites. Please try again.')
    }
  }

  const [loading, handleToggleFavourite] = usePromiseLoading(toggleFavourite)

  return (
    <ItemWrapper
      isInteractive
      className="flex flex-col gap-4 md:flex-row"
      onClick={() => navigate(`/modrinth/project/${entry.slug}`)}
    >
      <div className="bg-bg-100 border-bg-200 dark:border-bg-700/50 shadow-custom dark:bg-bg-800/70 relative isolate size-32 shrink-0 overflow-hidden rounded-lg border">
        {entry.icon_url ? (
          <img
            alt={`${entry.title} icon`}
            className="absolute inset-0 h-full w-full object-cover"
            src={entry.icon_url}
          />
        ) : (
          <Icon
            className="text-bg-200 dark:text-bg-700 absolute bottom-1/2 left-1/2 z-[-1] size-12 -translate-x-1/2 translate-y-1/2"
            icon="simple-icons:modrinth"
          />
        )}
      </div>
      <div>
        <h3 className="text-xl font-medium md:mr-12">{entry.title}</h3>
        <p className="text-custom-500 mt-1.5 text-sm md:mr-12">
          {t('projectDetails.changelog.by')} {entry.author}
        </p>
        <p className="text-bg-500 mt-2">{entry.description}</p>
        <div className="text-bg-500 mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          <div className="flex items-center gap-1">
            <Icon className="size-5" icon="tabler:download" />
            <span className="text-base">
              {
                sizeFormatter({
                  render: (literal, suffix) => `${literal}${suffix}`
                })(entry.downloads) as string
              }{' '}
              {t('projectDetails.header.downloads')}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Icon className="size-5" icon="tabler:users" />
            <span className="text-base">
              {sizeFormatter()(entry.follows) as string}{' '}
              {t('projectDetails.header.follows')}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Icon className="size-5" icon="tabler:history" />
            <span className="text-base">
              {t('projectDetails.header.updated')}{' '}
              {dayjs(entry.date_modified).locale(language).fromNow()}
            </span>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {entry.categories.map(category => (
            <TagChip
              key={category}
              icon={`customHTML:${getIcon(category)}`}
              label={getKey(category) || category}
            />
          ))}
        </div>
        <Button
          className="absolute top-2 right-2"
          icon={isFavourite ? 'tabler:heart-filled' : 'tabler:heart'}
          iconClassName={
            isFavourite
              ? 'text-red-500 group-hover:text-red-600! transition-all'
              : undefined
          }
          loading={loading}
          variant="plain"
          onClick={e => {
            e.stopPropagation()
            handleToggleFavourite()
          }}
        />
      </div>
    </ItemWrapper>
  )
}

export default ListViewItem
