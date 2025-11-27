import type { Hit } from '@/components/types'
import type { ProjectDetails } from '@/pages/ProjectDetails'
import { Icon } from '@iconify/react'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { sizeFormatter } from 'human-readable'
import { usePersonalization } from 'shared'

function ItemMetadata({
  entry,
  className
}: {
  entry: Hit | ProjectDetails
  className?: string
}) {
  const { language } = usePersonalization()

  return (
    <div
      className={clsx(
        'text-bg-500 mt-2 flex flex-wrap items-center gap-x-3 gap-y-1',
        className
      )}
    >
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
            })('follows' in entry ? entry.follows : entry.followers) as string
          }
        </span>
      </div>
      <div className="flex items-center gap-1">
        <Icon className="size-4" icon="tabler:history" />
        <span>
          {dayjs('date_modified' in entry ? entry.date_modified : entry.updated)
            .locale(language)
            .fromNow()}
        </span>
      </div>
    </div>
  )
}

export default ItemMetadata
