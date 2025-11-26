import type { ProjectViewProps } from '@/components/types'

import GalleryViewItem from './components/GalleryViewItem'

function GalleryView({ entries, getIcon, getKey }: ProjectViewProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
      {entries.map(entry => (
        <GalleryViewItem
          key={entry.project_id}
          entry={entry}
          getIcon={getIcon}
          getKey={getKey}
        />
      ))}
    </div>
  )
}

export default GalleryView
