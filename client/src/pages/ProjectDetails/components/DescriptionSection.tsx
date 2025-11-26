import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

function DescriptionSection({ description }: { description: string }) {
  return (
    <div className="prose modrinth-prose max-w-full! pb-8">
      <Markdown rehypePlugins={[rehypeRaw]}>{description}</Markdown>
    </div>
  )
}

export default DescriptionSection
