import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'
import tinycolor from 'tinycolor2'

import { usePersonalization ,
  Box,
  Flex,
  Icon,
  SidebarDivider,
  SidebarTitle,
  Stack,
  Text,
  WithQueryData
} from '@lifeforge/ui'

import { forgeAPI } from '@/manifest'

function CreatorSection({ hasOrganization }: { hasOrganization: boolean }) {
  const { t } = useTranslation('apps.melvinchia3636$modrinth')

  const { bgTempPalette } = usePersonalization()

  const { projectId } = useParams<{ projectId: string }>()

  return (
    <>
      <SidebarDivider />
      <SidebarTitle label={t('projectDetails.sidebar.creators')} />
      <Box px="xl">
        {hasOrganization && (
          <WithQueryData
            controller={forgeAPI.projects.getOrganization.input({
              projectId: projectId!
            })}
          >
            {data => (
              <Flex align="center" gap="sm" mb="md">
                <Flex
                  centered
                  r="md"
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
                >
                  {data.icon ? (
                    <Box
                      asChild
                      height="100%"
                      r="md"
                      style={{ objectFit: 'cover' }}
                      width="100%"
                    >
                      <img alt={`${data.name} icon`} src={data.icon} />
                    </Box>
                  ) : (
                    <Icon icon="simple-icons:modrinth" />
                  )}
                </Flex>
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
          controller={forgeAPI.projects.listMembers.input({
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
                    <Box
                      asChild
                      height="2.5em"
                      r="md"
                      style={{ objectFit: 'cover' }}
                      width="2.5em"
                    >
                      <img
                        alt={`${member.user.username} avatar`}
                        src={
                          member.user.avatar_url ||
                          'https://modrinth.com/static/images/avatar-placeholder.png'
                        }
                      />
                    </Box>
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
