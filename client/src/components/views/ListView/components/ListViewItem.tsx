import type { ProjectViewItemProps } from '@/components/types'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { ItemWrapper } from 'lifeforge-ui'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'shared'

import FavouriteButton from '../../components/FavouriteButton'
import ItemIcon from '../../components/ItemIcon'
import ItemMetadata from '../../components/ItemMetadata'
import ItemTags from '../../components/ItemTags'

dayjs.extend(relativeTime)

function ListViewItem({
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
      className="flex flex-col gap-4 md:flex-row"
      onClick={() => navigate(`/modrinth/project/${entry.slug}`)}
    >
      <ItemIcon className="size-32" iconUrl={entry.icon_url} />
      <div>
        <h3 className="text-xl font-medium md:mr-12">{entry.title}</h3>
        {'author' in entry && (
          <p className="text-custom-500 mt-1.5 text-sm md:mr-12">
            {t('projectDetails.changelog.by')} {entry.author}
          </p>
        )}
        <p className="text-bg-500 mt-2">{entry.description}</p>
        <ItemMetadata entry={entry} />
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
      </div>
    </ItemWrapper>
  )
}

export default ListViewItem
