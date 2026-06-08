import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

import { Prose } from '@lifeforge/ui'

function DescriptionSection({ description }: { description: string }) {
  return (
    <Prose className="modrinth-prose">
      <Markdown rehypePlugins={[rehypeRaw]}>{description}</Markdown>
    </Prose>
  )
}

export default DescriptionSection
