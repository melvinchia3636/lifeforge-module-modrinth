import CategoryIcon from '@/pages/ModList/components/CategoryIcon'
import { getKey } from '@/pages/ModList/constants/icons'
import { Icon } from '@iconify/react'
import dayjs from 'dayjs'
import { sizeFormatter } from 'human-readable'
import { Button } from 'lifeforge-ui'

import type { ProjectDetails } from '..'

function Header({ data }: { data: ProjectDetails }) {
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
                downloads
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Icon className="size-5" icon="tabler:users" />
              <span className="text-base">
                {sizeFormatter()(data.followers) as string} follows
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Icon className="size-5" icon="tabler:history" />
              <span className="text-base">
                Updated {dayjs(data.updated).fromNow()}
              </span>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {data.categories.map(category => (
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
      </div>
      <div className="flex w-full flex-col items-center gap-2 sm:flex-row lg:w-auto">
        <Button className="w-full" icon="tabler:download" onClick={() => {}}>
          Download
        </Button>
        <Button
          className="w-full"
          icon="tabler:heart"
          variant="secondary"
          onClick={() => {}}
        >
          Add to Favourites
        </Button>
      </div>
    </header>
  )
}

export default Header
