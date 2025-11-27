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

export default ListView
