import type { Hit } from '@'

import GalleryViewItem from './components/GalleryViewItem'

function GalleryView({ entries }: { entries: Hit[] }) {
  return (
    <div className="mr-4 grid md:grid-cols-2 gap-4">
      {entries.map(entry => (
        <GalleryViewItem key={entry.project_id} entry={entry} />
      ))}
    </div>
  )
}

export default GalleryView
