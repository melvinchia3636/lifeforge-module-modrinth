import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useNavigate } from 'react-router'

import { useModuleTranslation } from '@lifeforge/localization'
import { Box, Card, Text } from '@lifeforge/ui'

import type { ProjectViewItemProps } from '@/components/types'

import ProjectIcon from '../../../ProjectIcon'
import ProjectMetadata from '../../../ProjectMetadata'
import ProjectTags from '../../../ProjectTags'
import FavouriteButton from '../../components/FavouriteButton'

dayjs.extend(relativeTime)

function ListViewItem({
  entry,
  isFavourite,
  getIcon,
  getKey
}: ProjectViewItemProps) {
  const { t } = useModuleTranslation()
  const navigate = useNavigate()

  return (
    <Card
      isInteractive
      direction={{ base: 'column', md: 'row' }}
      gap="md"
      onClick={() =>
        navigate(`/melvinchia3636--modrinth/project/${entry.slug}`)
      }
    >
      <ProjectIcon height="8em" iconUrl={entry.icon_url} width="8em" />
      <Box>
        <Text
          as="h3"
          mr={{ base: 'none', md: '2xl' }}
          size="xl"
          weight="semibold"
        >
          {entry.title}
        </Text>
        {'author' in entry && (
          <Text
            as="p"
            color="primary"
            mr={{ base: 'none', md: '2xl' }}
            mt="xs"
            size="sm"
          >
            {t('projectDetails.changelog.by')} {entry.author}
          </Text>
        )}
        <Text as="p" color="muted" mt="sm">
          {entry.description}
        </Text>
        <ProjectMetadata entry={entry} />
        <ProjectTags
          categories={entry.categories}
          getIcon={getIcon}
          getKey={getKey}
        />
        <FavouriteButton
          isFavourite={isFavourite}
          projectId={'project_id' in entry ? entry.project_id : entry.id}
          right="1em"
          top="1em"
        />
      </Box>
    </Card>
  )
}

export default ListViewItem
