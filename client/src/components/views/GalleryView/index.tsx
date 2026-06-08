import { Grid } from '@lifeforge/ui'

import type { ProjectViewProps } from '@/components/types'

import GalleryViewItem from './components/GalleryViewItem'

function GalleryView({
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
        lg: 2,
        '2xl': 'repeat(auto-fill, minmax(360px, 1fr))'
      }}
    >
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
    </Grid>
  )
}

export default GalleryView
