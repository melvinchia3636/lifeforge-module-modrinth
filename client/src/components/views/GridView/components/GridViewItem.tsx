import type { ProjectViewItemProps } from '@/components/types'
import { ItemWrapper } from 'lifeforge-ui'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'shared'

import FavouriteButton from '../../components/FavouriteButton'
import ItemIcon from '../../components/ItemIcon'
import ItemMetadata from '../../components/ItemMetadata'
import ItemTags from '../../components/ItemTags'

function GridViewItem({
  entry,
  isFavourite,
  getIcon,
  getKey
}: ProjectViewItemProps) {
  const { t } = useTranslation('apps.modrinth')

  const navigate = useNavigate()

  return (
    <ItemWrapper
      isInteractive
      className="flex h-full flex-col"
      onClick={() => navigate(`/modrinth/project/${entry.slug}`)}
    >
      <div className="flex items-start gap-4">
        <ItemIcon className="size-24" iconUrl={entry.icon_url} />
        <div className="min-w-0 flex-1">
          <h3 className="mr-12 truncate text-lg font-medium">{entry.title}</h3>
          {'author' in entry && (
            <p className="text-custom-500 mr-16 text-sm">
              {t('projectDetails.changelog.by')} {entry.author}
            </p>
          )}
          <ItemMetadata className="mr-16" entry={entry} />
        </div>
      </div>
      <p className="text-bg-500 mt-4 line-clamp-2 flex-1">
        {entry.description}
      </p>
      <ItemTags
        categories={entry.categories}
        getIcon={getIcon}
        getKey={getKey}
      />
      <FavouriteButton
        className="top-2 right-2"
        isFavourite={isFavourite}
        projectId={'project_id' in entry ? entry.project_id : entry.id}
      />
    </ItemWrapper>
  )
}

export default GridViewItem
