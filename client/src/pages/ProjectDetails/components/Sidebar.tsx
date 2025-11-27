import forgeAPI from '@/utils/forgeAPI'
import { Icon } from '@iconify/react'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import {
  SidebarDivider,
  SidebarItem,
  SidebarTitle,
  SidebarWrapper,
  TagChip,
  WithQuery,
  WithQueryData
} from 'lifeforge-ui'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, usePersonalization } from 'shared'
import tinycolor from 'tinycolor2'

import type { ProjectDetails } from '..'

function Sidebar({
  versions,
  loaders,
  issues_url: issuesUrl,
  source_url: sourceUrl,
  discord_url: discordUrl,
  hasOrganization,
  published,
  updated,
  license,
  getIcon,
  getKey
}: Pick<
  ProjectDetails,
  | 'versions'
  | 'loaders'
  | 'issues_url'
  | 'source_url'
  | 'discord_url'
  | 'license'
  | 'published'
  | 'updated'
> & {
  hasOrganization: boolean
  getIcon: (key: string) => string
  getKey: (key: string) => string | undefined
}) {
  const { t } = useTranslation('apps.modrinth')

  const { bgTempPalette } = usePersonalization()

  const { projectId } = useParams<{ projectId: string }>()

  const { language } = usePersonalization()

  const gameVersionsQuery = useQuery(
    forgeAPI.modrinth.gameVersions.list.queryOptions()
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
      <SidebarTitle
        className="text-bg-500!"
        label={t('projectDetails.sidebar.compatibility')}
      />
      <WithQuery query={gameVersionsQuery}>
        {() => (
          <div className="flex flex-wrap gap-2 px-8">
            {finalVerisons.map(version => (
              <TagChip key={version} label={version} />
            ))}
          </div>
        )}
      </WithQuery>
      <SidebarDivider />
      <SidebarTitle
        className="text-bg-500!"
        label={t('projectDetails.sidebar.platforms')}
      />
      <div className="flex flex-wrap gap-2 px-8">
        {loaders.map(loader => (
          <TagChip
            key={loader}
            icon={`customHTML:${getIcon(loader)}`}
            label={loader}
          />
        ))}
      </div>
      <SidebarDivider />
      <SidebarTitle
        className="text-bg-500!"
        label={t('projectDetails.sidebar.links')}
      />
      <div>
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
      </div>
      <SidebarDivider />
      <SidebarTitle
        className="text-bg-500!"
        label={t('projectDetails.sidebar.creators')}
      />
      <div className="px-8">
        {hasOrganization && (
          <WithQueryData
            controller={forgeAPI.modrinth.projects.getOrganization.input({
              projectId: projectId!
            })}
          >
            {data => (
              <div className="mb-4 flex items-center gap-3">
                <div
                  className="flex-center size-10 rounded-md"
                  style={{
                    backgroundColor: data?.color
                      ? `#${data.color.toString(16).padStart(6, '0')}`
                      : tinycolor(bgTempPalette[500]).darken(30).toHexString(),
                    color: (() => {
                      if (!data?.color) {
                        return bgTempPalette[500]
                      }

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
                    <Icon className="size-5" icon="simple-icons:modrinth" />
                  )}
                </div>
                <div>
                  <p className="flex items-center gap-2 font-medium">
                    {data.name}
                  </p>
                  <p className="text-bg-500 flex items-center gap-1 text-sm">
                    <Icon className="size-4" icon="tabler:building" />
                    {t('projectDetails.sidebar.organization')}
                  </p>
                </div>
              </div>
            )}
          </WithQueryData>
        )}
        <WithQueryData
          controller={forgeAPI.modrinth.projects.listMembers.input({
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
      <SidebarDivider />
      <SidebarTitle
        className="text-bg-500!"
        label={t('projectDetails.sidebar.details')}
      />
      <div className="space-y-3 px-8">
        {license.name && (
          <div className="text-bg-500 flex items-center gap-2">
            <Icon className="size-5 shrink-0" icon="tabler:license" />
            <span className="min-w-0 truncate">
              {t('projectDetails.sidebar.license')}{' '}
              <span className="text-custom-500 font-medium">
                {license.name}
              </span>
            </span>
          </div>
        )}
        <div className="text-bg-500 flex items-center gap-2">
          <Icon className="size-5 shrink-0" icon="tabler:calendar" />
          <span className="min-w-0 truncate">
            {t('projectDetails.sidebar.published')}{' '}
            {dayjs(published).locale(language).fromNow()}
          </span>
        </div>
        <div className="text-bg-500 flex items-center gap-2">
          <Icon className="size-5 shrink-0" icon="tabler:history" />
          <span className="min-w-0 truncate">
            {t('projectDetails.sidebar.updated')}{' '}
            {dayjs(updated).locale(language).fromNow()}
          </span>
        </div>
      </div>
    </SidebarWrapper>
  )
}

export default Sidebar
