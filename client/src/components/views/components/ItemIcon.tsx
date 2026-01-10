import { Icon } from '@iconify/react'
import clsx from 'clsx'

function ItemIcon({
  iconUrl,
  className
}: {
  iconUrl: string | null
  className?: string
}) {
  return (
    <div
      className={clsx(
        'bg-bg-100 border-bg-200 dark:border-bg-700/50 shadow-custom dark:bg-bg-800/70 relative isolate shrink-0 overflow-hidden rounded-lg border',
        className
      )}
    >
      {iconUrl ? (
        <img
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          src={iconUrl}
        />
      ) : (
        <Icon
          className="text-bg-200 dark:text-bg-700 absolute bottom-1/2 left-1/2 z-[-1] size-12 -translate-x-1/2 translate-y-1/2"
          icon="simple-icons:modrinth"
        />
      )}
    </div>
  )
}

export default ItemIcon
