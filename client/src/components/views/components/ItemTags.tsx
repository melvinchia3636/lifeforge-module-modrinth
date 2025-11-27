import { TagChip } from 'lifeforge-ui'

function ItemTags({
  categories,
  getIcon,
  getKey
}: {
  categories: string[]
  getIcon: (category: string) => string | null
  getKey: (category: string) => string | undefined
}) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {categories.map(category => (
        <TagChip
          key={category}
          icon={`customHTML:${getIcon(category)}`}
          label={getKey(category) || category}
        />
      ))}
    </div>
  )
}

export default ItemTags
