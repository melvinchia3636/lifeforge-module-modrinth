import type { ProjectViewProps } from '@/components/types'

import GalleryViewItem from './components/GalleryViewItem'

function GalleryView({
  entries,
  favouritesIds,
  getIcon,
  getKey
}: ProjectViewProps) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-[repeat(auto-fill,minmax(360px,1fr))]">
      {entries.map(entry => (
        <GalleryViewItem
          key={'project_id' in entry ? entry.project_id : entry.id}
          entry={entry}
          getIcon={getIcon}
          getKey={getKey}
          isFavourite={favouritesIds.includes(
            'project_id' in entry ? entry.project_id : entry.id
          )}
        />
      ))}
    </div>
  )
}

export default GalleryView
