import type { ProjectViewProps } from '@/components/types'

import ListViewItem from './components/ListViewItem'

function ListView({
  entries,
  getIcon,
  getKey,
  favouritesIds
}: ProjectViewProps) {
  return (
    <div className="space-y-3">
      {entries.map(entry => (
        <ListViewItem
          key={entry.project_id}
          entry={entry}
          getIcon={getIcon}
          getKey={getKey}
          isFavourite={favouritesIds.includes(entry.project_id)}
        />
      ))}
    </div>
  )
}

export default ListView
