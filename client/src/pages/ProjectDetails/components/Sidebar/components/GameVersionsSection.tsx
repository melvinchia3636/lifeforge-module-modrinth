import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useModuleTranslation } from '@lifeforge/localization'

import { Flex, SidebarTitle, TagChip, WithQuery } from '@lifeforge/ui'

import { forgeAPI } from '@/manifest'

function GameVersionsSection({ versions }: { versions: string[] }) {
  const { t } = useModuleTranslation()

  const gameVersionsQuery = useQuery(forgeAPI.gameVersions.list.queryOptions())

  const allVersionsGrouped = useMemo(() => {
    const allGrouped: Record<string, Set<string>> = {}

    gameVersionsQuery.data?.forEach(version => {
      const parts = version.split('.')

      const minor = parts.slice(0, 2).join('.')

      if (!allGrouped[minor]) {
        allGrouped[minor] = new Set()
      }

      allGrouped[minor].add(version)
    })

    return allGrouped
  }, [gameVersionsQuery.data])

  const finalVerisons = useMemo(() => {
    let filteredVersions = versions.filter(v =>
      v.match(/^\d*?\.\d*?(?:\.\d*?)?$/)
    )

    for (const [minor, vers] of Object.entries(allVersionsGrouped)) {
      if (!filteredVersions.some(v => v.startsWith(minor))) continue

      const allPresent = Array.from(vers).every(v =>
        filteredVersions.includes(v)
      )

      if (allPresent) {
        filteredVersions = filteredVersions.filter(v => !v.startsWith(minor))
        filteredVersions.push(minor + '.x')
      }
    }

    return filteredVersions.sort((a, b) => {
      const aParts = a
        .split('.')
        .map(part => (part === 'x' ? Infinity : parseInt(part, 10)))

      const bParts = b
        .split('.')
        .map(part => (part === 'x' ? Infinity : parseInt(part, 10)))

      for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
        const aPart = aParts[i] || 0

        const bPart = bParts[i] || 0

        if (aPart !== bPart) return bPart - aPart
      }

      return 0
    })
  }, [allVersionsGrouped, versions])

  return (
    <>
      <SidebarTitle label={t('projectDetails.sidebar.compatibility')} />
      <WithQuery query={gameVersionsQuery}>
        {() => (
          <Flex gap="sm" px="xl" wrap="wrap">
            {finalVerisons.map(version => (
              <TagChip key={version} label={version} />
            ))}
          </Flex>
        )}
      </WithQuery>
    </>
  )
}

export default GameVersionsSection
