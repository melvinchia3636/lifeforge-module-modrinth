import dayjs from 'dayjs'
import { useParams } from 'react-router'

import { useModuleTranslation } from '@lifeforge/localization'
import {
  Box,
  Card,
  Flex,
  Grid,
  Icon,
  Text,
  WithQueryData,
  usePersonalization
} from '@lifeforge/ui'

import { forgeAPI } from '@/manifest'

function GallerySection() {
  const { t } = useModuleTranslation()
  const { language } = usePersonalization()
  const { projectId } = useParams<{ projectId: string }>()

  return (
    <WithQueryData
      contract={forgeAPI.projects.getDetails.input({
        projectId: projectId!
      })}
    >
      {({ gallery }) => (
        <Grid
          gap="md"
          mb="xl"
          templateCols="repeat(auto-fit, minmax(260px, 1fr))"
        >
          {gallery
            .sort((a, b) => a.ordering - b.ordering)
            .map(image => (
              <Card key={image.url} overflow="hidden" p="none">
                <Box
                  alt={t('projectDetails.gallery.imageAlt')}
                  as="img"
                  src={image.url}
                  style={{ aspectRatio: '16 / 9', objectFit: 'cover' }}
                  width="100%"
                />
                <Flex direction="column" flex="1" p="md">
                  <Text as="h2" size="xl" weight="medium">
                    {image.title || t('projectDetails.gallery.untitled')}
                  </Text>
                  <Text color="muted" mt="sm">
                    {image.description}
                  </Text>
                  <Flex
                    align="center"
                    gap="xs"
                    pt="md"
                    style={{
                      marginTop: 'auto'
                    }}
                  >
                    <Icon color="muted" icon="tabler:clock" size="1rem" />
                    <Text color="muted" size="sm">
                      {dayjs(image.created)
                        .locale(language)
                        .format('MMMM D, YYYY')}
                    </Text>
                  </Flex>
                </Flex>
              </Card>
            ))}
        </Grid>
      )}
    </WithQueryData>
  )
}

export default GallerySection
