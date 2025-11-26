import type { Hit } from '@/pages/ModList'

import ListViewItem from './components/ListViewItem'

function ListView({ entries }: { entries: Hit[] }) {
  return (
    <div className="space-y-3">
      {entries.map(entry => (
        <ListViewItem key={entry.project_id} entry={entry} />
      ))}
    </div>
  )
}

export default ListView
