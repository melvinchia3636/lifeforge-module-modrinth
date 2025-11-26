import _ from 'lodash'

export function getIcon(
  iconRegistry: Record<string, Record<string, string>>,
  id: string
): string | null {
  const key = getKey(iconRegistry, id)

  if (!key) return ''

  return Object.fromEntries(
    Object.values(iconRegistry)
      .map(e => Object.entries(e))
      .flat()
  )[key]
}

export function getKey(
  iconRegistry: Record<string, Record<string, string>>,
  id: string
): string | undefined {
  return Object.keys(
    Object.fromEntries(
      Object.values(iconRegistry)
        .map(e => Object.entries(e))
        .flat()
    )
  ).find(
    key => _.kebabCase(key.toLowerCase()) === _.kebabCase(id.toLowerCase())
  )
}
