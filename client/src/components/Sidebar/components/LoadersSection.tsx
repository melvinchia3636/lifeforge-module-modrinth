import { ICONS } from '@/constants/icons'
import useFilter, {
  findInFilterList,
  toggleInFilterList
} from '@/hooks/useFilter'
import { SidebarItem, SidebarTitle } from 'lifeforge-ui'
import _ from 'lodash'

function LoadersSection() {
  const { loaders: selectedLoaders, updateFilter } = useFilter()

  return (
    <>
      <SidebarTitle label="Loaders" namespace="apps.modrinth" />
      {Object.keys(ICONS.loaders).map(loader => (
        <SidebarItem
          key={loader}
          actionButtonIcon="tabler:ban"
          active={
            findInFilterList(selectedLoaders, loader, {
              isNegation: undefined,
              transformString: str => _.kebabCase(str.toLowerCase())
            }) !== null
          }
          activeClassNames={
            findInFilterList(selectedLoaders, loader, {
              isNegation: true,
              transformString: str => _.kebabCase(str.toLowerCase())
            }) !== null
              ? {
                  wrapper: 'after:bg-red-500!',
                  icon: 'text-red-500! ring-red-500!'
                }
              : undefined
          }
          icon={`customHTML:${ICONS.loaders[loader as keyof typeof ICONS.loaders]}`}
          label={loader}
          onActionButtonClick={() => {
            updateFilter(prev => ({
              loaders: toggleInFilterList(prev.loaders, loader, {
                isNegation: true,
                transformString: str => _.kebabCase(str.toLowerCase())
              })
            }))
          }}
          onClick={() => {
            updateFilter(prev => ({
              loaders: toggleInFilterList(prev.loaders, loader, {
                isNegation: false,
                transformString: str => _.kebabCase(str.toLowerCase())
              })
            }))
          }}
        />
      ))}
    </>
  )
}

export default LoadersSection
