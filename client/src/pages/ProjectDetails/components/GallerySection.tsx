import { Icon } from '@iconify/react'
import dayjs from 'dayjs'
import { ItemWrapper } from 'lifeforge-ui'

import type { ProjectDetails } from '..'

function GallerySection({ gallery }: { gallery: ProjectDetails['gallery'] }) {
  return (
    <div className="mb-8 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
      {gallery
        .sort((a, b) => a.ordering - b.ordering)
        .map(image => (
          <ItemWrapper key={image.url} className="flex flex-col p-0!">
            <img
              alt="Gallery image"
              className="aspect-video w-full object-cover"
              src={image.url}
            />
            <div className="flex flex-1 flex-col p-4">
              <h2 className="text-xl font-medium">
                {image.title || 'Untitled'}
              </h2>
              <p className="text-bg-500 mt-2 flex-1">{image.description}</p>
              <p className="text-bg-500 mt-4 flex items-center gap-1">
                <Icon className="size-4" icon="tabler:clock" />
                <span className="text-sm">
                  {dayjs(image.created).format('MMMM D, YYYY')}
                </span>
              </p>
            </div>
          </ItemWrapper>
        ))}
    </div>
  )
}

export default GallerySection
