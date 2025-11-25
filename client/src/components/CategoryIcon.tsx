import { ICONS, getKey } from '@/constants/icons'

function CategoryIcon({ id }: { id: string }) {
  const key = getKey(id)

  const svgString = key
    ? Object.fromEntries(
        Object.values(ICONS)
          .map(e => Object.entries(e))
          .flat()
      )[key]
    : null

  if (!svgString) {
    return null
  }

  return (
    <span className="size-4" dangerouslySetInnerHTML={{ __html: svgString }} />
  )
}

export default CategoryIcon
