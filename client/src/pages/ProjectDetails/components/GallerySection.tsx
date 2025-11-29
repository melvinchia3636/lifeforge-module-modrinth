import { Icon } from '@iconify/react'
import dayjs from 'dayjs'
import { Card } from 'lifeforge-ui'
import { useTranslation } from 'react-i18next'
import { usePersonalization } from 'shared'

import type { ProjectDetails } from '..'

function GallerySection({ gallery }: { gallery: ProjectDetails['gallery'] }) {
  const { t } = useTranslation('apps.modrinth')

  const { language } = usePersonalization()

  return (
    <div className="mb-8 grid gap-4 sm:grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
      {gallery
        .sort((a, b) => a.ordering - b.ordering)
        .map(image => (
          <Card key={image.url} className="flex flex-col p-0!">
            <img
              alt={t('projectDetails.gallery.imageAlt')}
              className="aspect-video w-full object-cover"
              src={image.url}
            />
            <div className="flex flex-1 flex-col p-4">
              <h2 className="text-xl font-medium">
                {image.title || t('projectDetails.gallery.untitled')}
              </h2>
              <p className="text-bg-500 mt-2 flex-1">{image.description}</p>
              <p className="text-bg-500 mt-4 flex items-center gap-1">
                <Icon className="size-4" icon="tabler:clock" />
                <span className="text-sm">
                  {dayjs(image.created).locale(language).format('MMMM D, YYYY')}
                </span>
              </p>
            </div>
          </Card>
        ))}
    </div>
  )
}

export default GallerySection
