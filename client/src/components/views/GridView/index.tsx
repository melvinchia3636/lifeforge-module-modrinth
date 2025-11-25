import type { Hit } from '@'

import GridViewItem from './components/GridViewItem'

function GridView({ entries }: { entries: Hit[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
      {entries.map(entry => (
        <GridViewItem key={entry.project_id} entry={entry} />
      ))}
    </div>
  )
}

export default GridView
