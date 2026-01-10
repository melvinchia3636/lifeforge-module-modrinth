import type { ProjectViewProps } from '@/components/types'

import GridViewItem from './components/GridViewItem'

function GridView({
  entries,
  favouritesIds,
  getIcon,
  getKey
}: ProjectViewProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
      {entries.map(entry => (
        <GridViewItem
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

export default GridView
