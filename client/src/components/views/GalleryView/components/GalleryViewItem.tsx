import type { ProjectViewItemProps } from '@/components/types'
import { Icon } from '@iconify/react'
import dayjs from 'dayjs'
import { sizeFormatter } from 'human-readable'
import { ItemWrapper, TagChip } from 'lifeforge-ui'
import { useTranslation } from 'react-i18next'
import { useNavigate, usePersonalization } from 'shared'

function GalleryViewItem({ entry, getIcon, getKey }: ProjectViewItemProps) {
  const { t } = useTranslation('apps.modrinth')

  const navigate = useNavigate()

  const { language } = usePersonalization()

  return (
    <ItemWrapper
      isInteractive
      className="flex flex-col gap-4 p-0!"
      onClick={() => {
        navigate(`/modrinth/project/${entry.slug}`)
      }}
    >
      <div
        className="bg-bg-200 dark:bg-bg-800/70 aspect-video w-full"
        style={
          !entry.featured_gallery && !entry.gallery?.[0]
            ? {
                backgroundColor:
                  '#' + entry.color?.toString(16).padStart(6, '0')
              }
            : undefined
        }
      >
        {entry.featured_gallery || entry.gallery?.[0] ? (
          <img
            alt={`${entry.title} featured`}
            className="size-full object-cover"
            src={entry.featured_gallery || entry.gallery?.[0]}
          />
        ) : null}
      </div>
      <div className="flex items-center gap-4 px-4">
        <div className="bg-bg-100 shadow-custom dark:bg-bg-800 ring-bg-100 dark:ring-bg-900 relative isolate size-28 shrink-0 -translate-y-[40%] overflow-hidden rounded-lg ring-4">
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
        <div className="-mt-16 min-w-0">
          <h3 className="min-w-0 truncate text-xl font-medium">
            {entry.title}
          </h3>
          <p className="text-custom-500 mt-1.5 min-w-0 truncate text-sm">
            {t('projectDetails.changelog.by')} {entry.author}
          </p>
        </div>
      </div>
      <div className="-mt-16 flex flex-1 flex-col p-4">
        <p className="text-bg-500 mt-2 mb-auto">{entry.description}</p>
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
              {
                sizeFormatter({
                  render: (literal, suffix) => `${literal}${suffix}`
                })(entry.follows) as string
              }{' '}
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
      </div>
    </ItemWrapper>
  )
}

export default GalleryViewItem
