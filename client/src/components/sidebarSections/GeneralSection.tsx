import _ from 'lodash'

import { SidebarItem, SidebarTitle } from '@lifeforge/ui'

import {
  findInFilterList,
  toggleInFilterList
} from '../../hooks/useProjectFilter'
import { negationIcon, negationWrapper } from './GeneralSection.css'

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
      <SidebarTitle label={name} />
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
                    wrapper: negationWrapper,
                    icon: negationIcon
                  }
                : undefined
            }
            icon={`customHTML:${icons[item as keyof typeof icons]}`}
            label={item}
            namespace={false}
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
