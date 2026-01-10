import { SidebarDivider, SidebarItem, SidebarWrapper } from 'lifeforge-ui'
import { type ReactNode } from 'react'

interface ProjectSidebarProps {
  title: string
  onReset: () => void
  isAllActive: boolean
  totalCount: number
  favouritesCount: number
  isFavouritesShowing: boolean
  setShowFavourites: (value: boolean) => void
  children: ReactNode
}

function ProjectSidebar({
  title,
  onReset,
  isAllActive,
  totalCount,
  favouritesCount,
  isFavouritesShowing,
  setShowFavourites,
  children
}: ProjectSidebarProps) {
  return (
    <SidebarWrapper>
      <SidebarItem
        active={isAllActive}
        icon="tabler:category"
        label={`All ${title}`}
        namespace="apps.melvinchia3636$modrinth"
        number={isAllActive ? totalCount : undefined}
        onClick={() => {
          setShowFavourites(false)
          onReset()
        }}
      />
      <SidebarItem
        active={isFavouritesShowing}
        icon="tabler:star"
        label="My Favourites"
        namespace="apps.melvinchia3636$modrinth"
        number={favouritesCount}
        onClick={() => {
          setShowFavourites(true)
        }}
      />
      <SidebarDivider />
      {children}
    </SidebarWrapper>
  )
}

export default ProjectSidebar
