import { useParams } from 'react-router'
import tinycolor from 'tinycolor2'

import { useModuleTranslation } from '@lifeforge/localization'
import {
  Box,
  Flex,
  Icon,
  Image,
  SidebarDivider,
  SidebarTitle,
  Stack,
  Text,
  WithQueryData,
  usePersonalization
} from '@lifeforge/ui'

import { forgeAPI } from '@/manifest'

function CreatorSection({ hasOrganization }: { hasOrganization: boolean }) {
  const { t } = useModuleTranslation()
  const { bgTempPalette } = usePersonalization()
  const { projectId } = useParams<{ projectId: string }>()

  return (
    <>
      <SidebarDivider />
      <SidebarTitle label="projectDetails.sidebar.creators" />
      <Box px="xl">
        {hasOrganization && (
          <WithQueryData
            contract={forgeAPI.projects.getOrganization.input({
              projectId: projectId!
            })}
          >
            {data => (
              <Flex align="center" gap="sm" mb="md">
                <Image
                  alt={`${data.name} icon`}
                  fallback="simple-icons:modrinth"
                  fit="cover"
                  height="2.5em"
                  r="md"
                  src={data.icon ?? undefined}
                  style={{
                    backgroundColor: data?.color
                      ? `#${data.color.toString(16).padStart(6, '0')}`
                      : tinycolor(bgTempPalette[500]).darken(30).toHexString(),
                    color: (() => {
                      if (!data?.color) return bgTempPalette[500]

                      const color = tinycolor(
                        `#${data.color.toString(16).padStart(6, '0')}`
                      )

                      return color.isLight()
                        ? color.darken(10).toHexString()
                        : color.lighten(10).toHexString()
                    })()
                  }}
                  width="2.5em"
                />
                <Box>
                  <Flex asChild align="center" gap="sm">
                    <Text as="p" weight="medium">
                      {data.name}
                    </Text>
                  </Flex>
                  <Flex asChild align="center" gap="xs">
                    <Text as="p" color="muted" size="sm">
                      <Icon icon="tabler:building" size="1rem" />
                      {t('projectDetails.sidebar.organization')}
                    </Text>
                  </Flex>
                </Box>
              </Flex>
            )}
          </WithQueryData>
        )}
        <WithQueryData
          contract={forgeAPI.projects.listMembers.input({
            projectId: projectId!
          })}
        >
          {data => (
            <Stack gap="md">
              {data
                .sort((a, b) => {
                  if (a.role === 'Owner' && b.role !== 'Owner') return -1
                  if (b.role === 'Owner' && a.role !== 'Owner') return 1

                  return a.ordering - b.ordering
                })
                .map(member => (
                  <Flex key={member.user.id} align="center" gap="sm">
                    <Image
                      alt={`${member.user.username} avatar`}
                      fallback="tabler:user"
                      fit="cover"
                      height="2.5em"
                      r="md"
                      src={
                        member.user.avatar_url ||
                        'https://modrinth.com/static/images/avatar-placeholder.png'
                      }
                      width="2.5em"
                    />
                    <Box>
                      <Flex asChild align="center" gap="sm">
                        <Text weight="medium">
                          {member.user.username}
                          {member.role === 'Owner' && (
                            <Icon
                              color="primary"
                              icon="tabler:crown"
                              size="1em"
                            />
                          )}
                        </Text>
                      </Flex>
                      <Text as="p" color="muted" size="sm">
                        {member.role}
                      </Text>
                    </Box>
                  </Flex>
                ))}
            </Stack>
          )}
        </WithQueryData>
      </Box>
    </>
  )
}

export default CreatorSection
