import { type ReactNode } from 'react'

import { SidebarDivider, SidebarItem, SidebarWrapper } from '@lifeforge/ui'

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
