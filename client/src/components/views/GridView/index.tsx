import { Grid } from '@lifeforge/ui'

import type { ProjectViewProps } from '@/components/types'

import GridViewItem from './components/GridViewItem'

function GridView({
  entries,
  favouritesIds,
  getIcon,
  getKey
}: ProjectViewProps) {
  return (
    <Grid
      gap="md"
      templateCols={{
        base: 1,
        md: 2,
        xl: 3,
        '2xl': 'repeat(auto-fill, minmax(300px, 1fr))'
      }}
    >
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
    </Grid>
  )
}

export default GridView
