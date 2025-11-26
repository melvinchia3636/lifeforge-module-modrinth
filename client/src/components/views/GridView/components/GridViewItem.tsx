import type { ProjectViewItemProps } from '@/components/types'
import { Icon } from '@iconify/react'
import { sizeFormatter } from 'human-readable'
import { ItemWrapper, TagChip } from 'lifeforge-ui'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'shared'

function GridViewItem({ entry, getIcon, getKey }: ProjectViewItemProps) {
  const { t } = useTranslation('apps.modrinth')

  const navigate = useNavigate()

  return (
    <ItemWrapper
      isInteractive
      className="flex h-full flex-col"
      onClick={() => navigate(`/modrinth/project/${entry.slug}`)}
    >
      <div className="flex items-start gap-4">
        <div className="bg-bg-100 border-bg-200 dark:border-bg-700/50 shadow-custom dark:bg-bg-800/70 relative isolate size-24 shrink-0 overflow-hidden rounded-lg border">
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
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-medium">{entry.title}</h3>
          <p className="text-custom-500 text-sm">
            {t('projectDetails.changelog.by')} {entry.author}
          </p>
          <div className="text-bg-500 mt-2 flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1">
              <Icon className="size-4" icon="tabler:download" />
              <span>
                {
                  sizeFormatter({
                    render: (literal, suffix) => `${literal}${suffix}`
                  })(entry.downloads) as string
                }
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Icon className="size-4" icon="tabler:users" />
              <span>
                {
                  sizeFormatter({
                    render: (literal, suffix) => `${literal}${suffix}`
                  })(entry.follows) as string
                }
              </span>
            </div>
          </div>
        </div>
      </div>
      <p className="text-bg-500 mt-4 line-clamp-2 flex-1 text-sm">
        {entry.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {entry.categories.slice(0, 3).map(category => (
          <TagChip
            key={category}
            icon={`customHTML:${getIcon(category)}`}
            label={getKey(category) || category}
          />
        ))}
        {entry.categories.length > 3 && (
          <TagChip label={`+${entry.categories.length - 3}`} />
        )}
      </div>
    </ItemWrapper>
  )
}

export default GridViewItem
