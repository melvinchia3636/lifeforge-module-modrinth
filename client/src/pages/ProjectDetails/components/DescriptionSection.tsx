import Markdown from 'react-markdown'
import { useParams } from 'react-router'
import rehypeRaw from 'rehype-raw'

import { Prose, WithQueryData } from '@lifeforge/ui'

import { forgeAPI } from '@/manifest'

function DescriptionSection() {
  const { projectId } = useParams<{ projectId: string }>()

  return (
    <WithQueryData
      contract={forgeAPI.projects.getDetails.input({
        projectId: projectId!
      })}
    >
      {data => (
        <Prose className="modrinth-prose">
          <Markdown rehypePlugins={[rehypeRaw]}>{data.body}</Markdown>
        </Prose>
      )}
    </WithQueryData>
  )
}

export default DescriptionSection
