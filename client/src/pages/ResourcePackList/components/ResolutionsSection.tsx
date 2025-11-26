import { findInFilterList, toggleInFilterList } from '@/hooks/useProjectFilter'
import useFilter from '@/pages/ResourcePackList/hooks/useFilter'
import { SidebarItem, SidebarTitle } from 'lifeforge-ui'

const RESOLUTIONS = [
  '8x or lower',
  '16x',
  '32x',
  '64x',
  '128x',
  '256x',
  '512x or higher'
]

function ResolutionsSection() {
  const { resolutions: selectedResolutions, updateFilter } = useFilter()

  return (
    <>
      <SidebarTitle label="Resolutions" namespace="apps.modrinth" />
      {RESOLUTIONS.map(resolution => (
        <SidebarItem
          key={resolution}
          actionButtonIcon="tabler:ban"
          active={
            findInFilterList(selectedResolutions, resolution, {
              isNegation: undefined,
              transformString: str =>
                str.replace(' or higher', '+').replace(' or lower', '-')
            }) !== null
          }
          activeClassNames={
            findInFilterList(selectedResolutions, resolution, {
              isNegation: true,
              transformString: str =>
                str.replace(' or higher', '+').replace(' or lower', '-')
            }) !== null
              ? {
                  wrapper: 'after:bg-red-500!',
                  icon: 'text-red-500! ring-red-500!'
                }
              : undefined
          }
          icon="tabler:aspect-ratio"
          label={resolution}
          onActionButtonClick={() => {
            updateFilter(prev => ({
              resolutions: toggleInFilterList(prev.resolutions, resolution, {
                isNegation: true,
                transformString: str =>
                  str.replace(' or higher', '+').replace(' or lower', '-')
              })
            }))
          }}
          onClick={() => {
            updateFilter(prev => ({
              resolutions: toggleInFilterList(prev.resolutions, resolution, {
                isNegation: false,
                transformString: str =>
                  str.replace(' or higher', '+').replace(' or lower', '-')
              })
            }))
          }}
        />
      ))}
    </>
  )
}

export default ResolutionsSection
