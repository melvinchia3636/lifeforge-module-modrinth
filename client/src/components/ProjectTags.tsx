import { Flex, TagChip } from '@lifeforge/ui'

function ProjectTags({
  categories,
  getIcon,
  getKey
}: {
  categories: string[]
  getIcon: (category: string) => string | null
  getKey: (category: string) => string | undefined
}) {
  return (
    <Flex gap="sm" mt="md" wrap="wrap">
      {categories.map(category => (
        <TagChip
          key={category}
          icon={`customHTML:${getIcon(category)}`}
          label={getKey(category) || category}
        />
      ))}
    </Flex>
  )
}

export default ProjectTags
