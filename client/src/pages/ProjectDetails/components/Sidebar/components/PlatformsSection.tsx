import { Flex, SidebarDivider, SidebarTitle, TagChip } from '@lifeforge/ui'

function PlatformsSection({
  loaders,
  getIcon
}: {
  loaders: string[]
  getIcon: (key: string) => string
}) {
  return (
    <>
      <SidebarDivider />
      <SidebarTitle label="projectDetails.sidebar.platforms" />
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
