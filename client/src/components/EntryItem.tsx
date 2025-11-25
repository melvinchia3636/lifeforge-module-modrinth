import type { Hit } from '@'
import { getKey } from '@/constants/icons'
import { Icon } from '@iconify/react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { sizeFormatter } from 'human-readable'
import { ItemWrapper } from 'lifeforge-ui'

import CategoryIcon from './CategoryIcon'

dayjs.extend(relativeTime)

function EntryItem({ entry }: { entry: Hit }) {
  return (
    <ItemWrapper className="flex flex-col gap-4 md:flex-row">
      <div className="bg-bg-100 shadow-custom dark:bg-bg-800/70 relative isolate size-38 shrink-0 overflow-hidden rounded-lg">
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
        <h3 className="text-xl font-medium">{entry.title}</h3>
        <p className="text-custom-500 mt-1.5 text-sm">by {entry.author}</p>
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
              downloads
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Icon className="size-5" icon="tabler:users" />
            <span className="text-base">
              {sizeFormatter()(entry.follows) as string} follows
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Icon className="size-5" icon="tabler:history" />
            <span className="text-base">
              Updated {dayjs(entry.date_modified).fromNow()}
            </span>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {entry.categories.map(category => (
            <span
              key={category}
              className="bg-bg-200 dark:bg-bg-800 text-bg-500 flex items-center gap-2 rounded-full px-3 py-1 text-sm"
            >
              <CategoryIcon id={category} />
              {getKey(category) || category}
            </span>
          ))}
        </div>
      </div>
    </ItemWrapper>
  )
}

export default EntryItem
