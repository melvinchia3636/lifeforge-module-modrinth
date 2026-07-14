import { Box, SidebarDivider, SidebarItem, SidebarTitle } from '@lifeforge/ui'

function LinksSection({
  issuesUrl,
  sourceUrl,
  discordUrl
}: {
  issuesUrl: string | null
  sourceUrl: string | null
  discordUrl: string | null
}) {
  const goToURL = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <SidebarDivider />
      <SidebarTitle label="projectDetails.sidebar.links" />
      <Box>
        {issuesUrl && (
          <SidebarItem
            active={false}
            icon="tabler:bug"
            label="projectDetails.sidebar.reportIssue"
            onClick={() => goToURL(issuesUrl)}
          />
        )}
        {sourceUrl && (
          <SidebarItem
            active={false}
            icon="tabler:code"
            label="projectDetails.sidebar.sourceCode"
            onClick={() => goToURL(sourceUrl)}
          />
        )}
        {discordUrl && (
          <SidebarItem
            active={false}
            icon="tabler:brand-discord"
            label="projectDetails.sidebar.discord"
            onClick={() => goToURL(discordUrl)}
          />
        )}
      </Box>
    </>
  )
}

export default LinksSection
