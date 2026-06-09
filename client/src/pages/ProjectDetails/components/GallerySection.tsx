import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'

import { usePersonalization , Box, Card, Flex, Grid, Icon, Text } from '@lifeforge/ui'

import type { ProjectDetails } from '..'

function GallerySection({ gallery }: { gallery: ProjectDetails['gallery'] }) {
  const { t } = useTranslation('apps.melvinchia3636$modrinth')

  const { language } = usePersonalization()

  return (
    <Grid gap="md" mb="xl" templateCols="repeat(auto-fit, minmax(260px, 1fr))">
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
                <Text size="sm">
                  {dayjs(image.created).locale(language).format('MMMM D, YYYY')}
                </Text>
              </Flex>
            </Flex>
          </Card>
        ))}
    </Grid>
  )
}

export default GallerySection
