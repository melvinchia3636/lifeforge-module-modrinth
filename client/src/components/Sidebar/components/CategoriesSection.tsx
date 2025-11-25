import { ICONS } from '@/constants/icons'
import useFilter, {
  findInFilterList,
  toggleInFilterList
} from '@/hooks/useFilter'
import { SidebarItem, SidebarTitle } from 'lifeforge-ui'
import _ from 'lodash'

function CategoriesSection() {
  const { categories: selectedCategories, updateFilter } = useFilter()

  return (
    <>
      <SidebarTitle label="Categories" namespace="apps.modrinth" />
      {Object.keys(ICONS.categories).map(category => (
        <SidebarItem
          key={category}
          actionButtonIcon="tabler:ban"
          active={
            findInFilterList(selectedCategories, category, {
              isNegation: undefined,
              transformString: str => _.kebabCase(str.toLowerCase())
            }) !== null
          }
          activeClassNames={
            findInFilterList(selectedCategories, category, {
              isNegation: true,
              transformString: str => _.kebabCase(str.toLowerCase())
            }) !== null
              ? {
                  wrapper: 'after:bg-red-500!',
                  icon: 'text-red-500! ring-red-500!'
                }
              : undefined
          }
          icon={`customHTML:${ICONS.categories[category as keyof typeof ICONS.categories]}`}
          label={category}
          onActionButtonClick={() => {
            updateFilter(prev => ({
              categories: toggleInFilterList(prev.categories, category, {
                isNegation: true,
                transformString: str => _.kebabCase(str.toLowerCase())
              })
            }))
          }}
          onClick={() => {
            updateFilter(prev => ({
              categories: toggleInFilterList(prev.categories, category, {
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

export default CategoriesSection
