import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation('apps.melvinchia3636$modrinth')

  const goToURL = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <SidebarDivider />
      <SidebarTitle label={t('projectDetails.sidebar.links')} />
      <Box>
        {issuesUrl && (
          <SidebarItem
            active={false}
            icon="tabler:bug"
            label={t('projectDetails.sidebar.reportIssue')}
            onClick={() => goToURL(issuesUrl)}
          />
        )}
        {sourceUrl && (
          <SidebarItem
            active={false}
            icon="tabler:code"
            label={t('projectDetails.sidebar.sourceCode')}
            onClick={() => goToURL(sourceUrl)}
          />
        )}
        {discordUrl && (
          <SidebarItem
            active={false}
            icon="tabler:brand-discord"
            label={t('projectDetails.sidebar.discord')}
            onClick={() => goToURL(discordUrl)}
          />
        )}
      </Box>
    </>
  )
}

export default LinksSection
