import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { sizeFormatter } from 'human-readable'

import { usePersonalization } from '@lifeforge/shared'
import { Flex, type FlexProps, Icon, Text } from '@lifeforge/ui'

dayjs.extend(relativeTime)

import type { Hit } from '@/components/types'
import type { ProjectDetails } from '@/pages/ProjectDetails'

function ProjectMetadata({
  entry,
  ...rest
}: { entry: Hit | ProjectDetails } & FlexProps) {
  const { language } = usePersonalization()

  return (
    <Flex color="muted" gapX="md" gapY="xs" mt="sm" wrap="wrap" {...rest}>
      <Flex align="center" gap="xs">
        <Icon icon="tabler:download" size="1rem" />
        <Text>
          {
            sizeFormatter({
              render: (literal, suffix) => `${literal}${suffix}`
            })(entry.downloads) as string
          }
        </Text>
      </Flex>
      <Flex align="center" gap="xs">
        <Icon icon="tabler:users" size="1rem" />
        <Text>
          {
            sizeFormatter({
              render: (literal, suffix) => `${literal}${suffix}`
            })('follows' in entry ? entry.follows : entry.followers) as string
          }
        </Text>
      </Flex>
      <Flex align="center" gap="xs">
        <Icon icon="tabler:history" size="1rem" />
        <Text>
          {dayjs('date_modified' in entry ? entry.date_modified : entry.updated)
            .locale(language)
            .fromNow()}
        </Text>
      </Flex>
    </Flex>
  )
}

export default ProjectMetadata
