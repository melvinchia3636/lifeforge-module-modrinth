import { SidebarDivider, SidebarItem, SidebarWrapper } from 'lifeforge-ui'
import { type ReactNode } from 'react'

interface ProjectSidebarProps {
  title: string
  onReset: () => void
  isAllActive: boolean
  totalCount: number
  favouritesCount: number
  children: ReactNode
}

function ProjectSidebar({
  title,
  onReset,
  isAllActive,
  totalCount,
  favouritesCount,
  children
}: ProjectSidebarProps) {
  return (
    <SidebarWrapper>
      <SidebarItem
        active={isAllActive}
        icon="tabler:category"
        label={`All ${title}`}
        namespace="apps.modrinth"
        number={isAllActive ? totalCount : undefined}
        onClick={onReset}
      />
      <SidebarItem
        active={false}
        icon="tabler:star"
        label="My Favourites"
        namespace="apps.modrinth"
        number={favouritesCount}
        onClick={() => {}}
      />
      <SidebarDivider />
      {children}
    </SidebarWrapper>
  )
}

export default ProjectSidebar
