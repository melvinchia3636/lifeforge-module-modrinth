import useFilter from '@/hooks/useFilter'
import { SidebarDivider, SidebarItem, SidebarWrapper } from 'lifeforge-ui'

import CategoriesSection from './components/CategoriesSection'
import LoadersSection from './components/LoadersSection'
import VersionsSection from './components/VersionsSection'

function Sidebar() {
  const {
    categories,
    loaders,
    version,
    searchQuery,
    setSearchQuery,
    updateFilter
  } = useFilter()

  return (
    <SidebarWrapper>
      <SidebarItem
        active={!categories && !loaders && !version && !searchQuery}
        icon="tabler:list"
        label="All Mods"
        namespace="apps.modrinth"
        onClick={() => {
          updateFilter({
            categories: '',
            loaders: '',
            version: ''
          })
          setSearchQuery('')
        }}
      />
      <SidebarItem
        icon="tabler:star"
        label="My Favourites"
        namespace="apps.modrinth"
      />
      <SidebarDivider />
      <VersionsSection />
      <SidebarDivider />
      <LoadersSection />
      <SidebarDivider />
      <CategoriesSection />
    </SidebarWrapper>
  )
}

export default Sidebar
