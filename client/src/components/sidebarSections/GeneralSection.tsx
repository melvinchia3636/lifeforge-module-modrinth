import { findInFilterList, toggleInFilterList } from '@/hooks/useProjectFilter'
import { SidebarItem, SidebarTitle } from 'lifeforge-ui'
import _ from 'lodash'

function GeneralSection({
  name,
  icons,
  selectedItem,
  updateFilter
}: {
  name: string
  icons: Record<string, string>
  selectedItem: string
  updateFilter: React.Dispatch<React.SetStateAction<Record<string, any>>>
}) {
  return (
    <>
      <SidebarTitle label={name} namespace="apps.modrinth" />
      {Object.keys(icons).map(item => {
        const isActive =
          findInFilterList(selectedItem, item, {
            isNegation: undefined,
            transformString: str => _.kebabCase(str.toLowerCase())
          }) !== null

        return (
          <SidebarItem
            key={item}
            actionButtonProps={{
              icon: 'tabler:ban',
              onClick: () => {
                updateFilter(prev => ({
                  [name]: toggleInFilterList(prev[name], item, {
                    isNegation: true,
                    transformString: str => _.kebabCase(str.toLowerCase())
                  })
                }))
              }
            }}
            active={isActive}
            classNames={
              findInFilterList(selectedItem, item, {
                isNegation: true,
                transformString: str => _.kebabCase(str.toLowerCase())
              }) !== null
                ? {
                    wrapper: 'after:bg-red-500!',
                    icon: 'text-red-500! ring-red-500!'
                  }
                : undefined
            }
            icon={`customHTML:${icons[item as keyof typeof icons]}`}
            label={item}
            onClick={() => {
              updateFilter(prev => ({
                [name]: toggleInFilterList(prev[name], item, {
                  isNegation: false,
                  transformString: str => _.kebabCase(str.toLowerCase())
                })
              }))
            }}
          />
        )
      })}
    </>
  )
}

export default GeneralSection
