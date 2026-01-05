import { Card } from 'lifeforge-ui'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'shared'

import type { ProjectViewItemProps } from '@/components/types'

import FavouriteButton from '../../components/FavouriteButton'
import ItemIcon from '../../components/ItemIcon'
import ItemMetadata from '../../components/ItemMetadata'
import ItemTags from '../../components/ItemTags'

function GalleryViewItem({
  entry,
  isFavourite,
  getIcon,
  getKey
}: ProjectViewItemProps) {
  const { t } = useTranslation('apps.melvinchia3636$modrinth')

  const navigate = useNavigate()

  return (
    <Card
      isInteractive
      className="flex flex-col gap-4 p-0!"
      onClick={() => {
        navigate(`/modrinth/project/${entry.slug}`)
      }}
    >
      {(() => {
        const targetImg =
          'project_id' in entry
            ? entry.featured_gallery || entry.gallery?.[0]
            : entry.gallery.filter(e => e.featured)[0]?.url ||
              entry.gallery[0]?.url

        return (
          <div
            className="bg-bg-200 dark:bg-bg-800/70 aspect-video w-full"
            style={
              !targetImg
                ? {
                    backgroundColor:
                      '#' + entry.color?.toString(16).padStart(6, '0')
                  }
                : undefined
            }
          >
            {targetImg ? (
              <img
                alt={`${entry.title} featured`}
                className="size-full object-cover"
                src={targetImg}
              />
            ) : null}
          </div>
        )
      })()}
      <div className="flex items-center gap-4 px-4">
        <ItemIcon
          className="ring-bg-100 dark:ring-bg-900 size-28 -translate-y-[40%] ring-4"
          iconUrl={entry.icon_url}
        />
        <div className="relative -mt-16 w-full min-w-0 pr-16">
          <h3 className="min-w-0 truncate text-xl font-medium">
            {entry.title}
          </h3>
          {'author' in entry && (
            <p className="text-custom-500 mt-1.5 min-w-0 truncate text-sm">
              {t('projectDetails.changelog.by')} {entry.author}
            </p>
          )}
          <FavouriteButton
            className="top-0 right-0"
            isFavourite={isFavourite}
            projectId={'project_id' in entry ? entry.project_id : entry.id}
          />
        </div>
      </div>
      <div className="-mt-16 flex flex-1 flex-col p-4">
        <p className="text-bg-500 mt-2 mb-auto">{entry.description}</p>
        <ItemMetadata className="mt-6" entry={entry} />
        <ItemTags
          categories={entry.categories}
          getIcon={getIcon}
          getKey={getKey}
        />
      </div>
    </Card>
  )
}

export default GalleryViewItem
