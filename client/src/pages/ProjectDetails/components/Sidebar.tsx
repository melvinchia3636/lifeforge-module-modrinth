import CategoryIcon from '@/pages/ModList/components/CategoryIcon'
import { getKey } from '@/pages/ModList/constants/icons'
import forgeAPI from '@/utils/forgeAPI'
import { Icon } from '@iconify/react'
import { useQuery } from '@tanstack/react-query'
import {
  SidebarDivider,
  SidebarItem,
  SidebarTitle,
  SidebarWrapper,
  WithQuery,
  WithQueryData
} from 'lifeforge-ui'
import { useMemo } from 'react'
import { useParams } from 'shared'
import tinycolor from 'tinycolor2'

function Sidebar({
  versions,
  loaders,
  issuesUrl,
  sourceUrl,
  discordUrl,
  hasOrganization
}: {
  versions: string[]
  loaders: string[]
  issuesUrl?: string
  sourceUrl?: string
  discordUrl?: string
  hasOrganization?: boolean
}) {
  const { projectId } = useParams<{ projectId: string }>()

  const gameVersionsQuery = useQuery(
    forgeAPI.modrinth.listGameVersions.queryOptions()
  )

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

    // for each minor version, if all patch versions are present, only show the minor version in the form of "a.b.x"
    for (const [minor, vers] of Object.entries(allVersionsGrouped)) {
      if (!filteredVersions.some(v => v.startsWith(minor))) {
        continue
      }

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

        if (aPart !== bPart) {
          return bPart - aPart
        }
      }

      return 0
    })
  }, [allVersionsGrouped, versions])

  const goToURL = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <SidebarWrapper>
      <SidebarTitle className="text-bg-500!" label="Compatibility" />
      <WithQuery query={gameVersionsQuery}>
        {() => (
          <div className="flex flex-wrap gap-2 px-8">
            {finalVerisons.map(version => (
              <span
                key={version}
                className="bg-bg-200 dark:bg-bg-800 text-bg-500 rounded-full px-3 py-1 text-sm"
              >
                {version}
              </span>
            ))}
          </div>
        )}
      </WithQuery>
      <SidebarDivider />
      <SidebarTitle className="text-bg-500!" label="Platforms" />
      <div className="flex flex-wrap gap-2 px-8">
        {loaders.map(loader => (
          <span
            key={loader}
            className="bg-bg-200 dark:bg-bg-800 text-bg-500 flex items-center gap-2 rounded-full px-3 py-1 text-sm"
          >
            <CategoryIcon id={loader} />
            {getKey(loader) || loader}
          </span>
        ))}
      </div>
      <SidebarDivider />
      <SidebarTitle className="text-bg-500!" label="Links" />
      <div>
        {issuesUrl && (
          <SidebarItem
            active={false}
            icon="tabler:bug"
            label="Report Issue"
            onClick={() => goToURL(issuesUrl)}
          />
        )}
        {sourceUrl && (
          <SidebarItem
            active={false}
            icon="tabler:code"
            label="Source Code"
            onClick={() => goToURL(sourceUrl)}
          />
        )}
        {discordUrl && (
          <SidebarItem
            active={false}
            icon="tabler:brand-discord"
            label="Discord"
            onClick={() => goToURL(discordUrl)}
          />
        )}
      </div>
      <SidebarDivider />
      <SidebarTitle className="text-bg-500!" label="Creators" />
      <div className="px-8">
        {hasOrganization && (
          <WithQueryData
            controller={forgeAPI.modrinth.getProjectOrganization.input({
              projectId: projectId!
            })}
          >
            {data => (
              <div className="mb-4 flex items-center gap-3">
                <div
                  className="size-9 rounded-md"
                  style={{
                    backgroundColor: data?.color
                      ? `#${data.color.toString(16).padStart(6, '0')}`
                      : 'transparent',
                    color: (() => {
                      const color = tinycolor(
                        `#${data.color.toString(16).padStart(6, '0')}`
                      )

                      return color.isLight()
                        ? color.darken(10).toHexString()
                        : color.lighten(10).toHexString()
                    })()
                  }}
                >
                  {data.icon ? (
                    <img
                      alt={`${data.name} icon`}
                      className="size-full rounded-md object-cover"
                      src={data.icon}
                    />
                  ) : (
                    <Icon
                      className="m-auto mt-2 size-5"
                      icon="simple-icons:modrinth"
                    />
                  )}
                </div>
                <div>
                  <p className="flex items-center gap-2 font-medium">
                    {data.name}
                  </p>
                  <p className="text-bg-500 flex items-center gap-1 text-sm">
                    <Icon className="size-4" icon="tabler:building" />
                    Organization
                  </p>
                </div>
              </div>
            )}
          </WithQueryData>
        )}
        <WithQueryData
          controller={forgeAPI.modrinth.listProjectMembers.input({
            projectId: projectId!
          })}
        >
          {data => (
            <div className="space-y-3">
              {data
                .sort((a, b) => {
                  // Owners first, then by ordering
                  if (a.role === 'Owner' && b.role !== 'Owner') {
                    return -1
                  }

                  if (b.role === 'Owner' && a.role !== 'Owner') {
                    return 1
                  }

                  return a.ordering - b.ordering
                })
                .map(member => (
                  <div key={member.user.id} className="flex items-center gap-3">
                    <img
                      alt={`${member.user.username} avatar`}
                      className="size-9 rounded-full object-cover"
                      src={
                        member.user.avatar_url ||
                        'https://modrinth.com/static/images/avatar-placeholder.png'
                      }
                    />
                    <div>
                      <p className="flex items-center gap-2 font-medium">
                        {member.user.username}
                        {member.role === 'Owner' && (
                          <Icon
                            className="text-custom-500 size-4"
                            icon="tabler:crown"
                          />
                        )}
                      </p>
                      <p className="text-bg-500 text-sm">{member.role}</p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </WithQueryData>
      </div>
    </SidebarWrapper>
  )
}

export default Sidebar
