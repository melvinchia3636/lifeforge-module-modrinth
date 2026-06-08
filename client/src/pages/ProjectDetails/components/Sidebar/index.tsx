import { SidebarWrapper } from '@lifeforge/ui'

import type { ProjectDetails } from '../..'
import CreatorsSection from './components/CreatorsSection'
import DetailsSection from './components/DetailsSection'
import GameVersionsSection from './components/GameVersionsSection'
import LinksSection from './components/LinksSection'
import PlatformsSection from './components/PlatformsSection'

function Sidebar({
  versions,
  loaders,
  issues_url: issuesUrl,
  source_url: sourceUrl,
  discord_url: discordUrl,
  hasOrganization,
  published,
  updated,
  license,
  getIcon
}: Pick<
  ProjectDetails,
  | 'versions'
  | 'loaders'
  | 'issues_url'
  | 'source_url'
  | 'discord_url'
  | 'license'
  | 'published'
  | 'updated'
> & {
  hasOrganization: boolean
  getIcon: (key: string) => string
}) {
  return (
    <SidebarWrapper>
      <GameVersionsSection versions={versions} />
      <PlatformsSection getIcon={getIcon} loaders={loaders} />
      <LinksSection
        discordUrl={discordUrl}
        issuesUrl={issuesUrl}
        sourceUrl={sourceUrl}
      />
      <CreatorsSection hasOrganization={hasOrganization} />
      <DetailsSection
        license={license}
        published={published}
        updated={updated}
      />
    </SidebarWrapper>
  )
}

export default Sidebar
