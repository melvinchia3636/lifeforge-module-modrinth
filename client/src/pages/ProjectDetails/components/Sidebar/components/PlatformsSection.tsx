import { useTranslation } from 'react-i18next'

import { Flex, SidebarDivider, SidebarTitle, TagChip } from '@lifeforge/ui'

function PlatformsSection({
  loaders,
  getIcon
}: {
  loaders: string[]
  getIcon: (key: string) => string
}) {
  const { t } = useTranslation('apps.melvinchia3636--modrinth')

  return (
    <>
      <SidebarDivider />
      <SidebarTitle label={t('projectDetails.sidebar.platforms')} />
      <Flex gap="sm" px="xl" wrap="wrap">
        {loaders.map(loader => (
          <TagChip
            key={loader}
            icon={`customHTML:${getIcon(loader)}`}
            label={loader}
          />
        ))}
      </Flex>
    </>
  )
}

export default PlatformsSection
