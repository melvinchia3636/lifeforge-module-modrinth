import { SidebarItem, SidebarWrapper } from 'lifeforge-ui'
import { type ReactNode } from 'react'

interface ProjectSidebarProps {
  title: string
  onReset: () => void
  isAllActive: boolean
  children: ReactNode
}

function ProjectSidebar({
  title,
  onReset,
  isAllActive,
  children
}: ProjectSidebarProps) {
  return (
    <SidebarWrapper>
      <SidebarItem
        active={isAllActive}
        icon="tabler:category"
        label={title}
        namespace="apps.modrinth"
        onClick={onReset}
      />
      {children}
    </SidebarWrapper>
  )
}

export default ProjectSidebar
