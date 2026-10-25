import {
  Bordered,
  type BorderedProps,
  Image,
  colorWithOpacity
} from '@lifeforge/ui'

function ProjectIcon({
  iconUrl,
  ...rest
}: { iconUrl: string | null } & BorderedProps) {
  return (
    <Bordered
      asChild
      shadow
      bg={{
        base: 'bg-100',
        dark: colorWithOpacity('bg-800', '70%')
      }}
      borderColor={{
        base: 'bg-200',
        dark: colorWithOpacity('bg-700', '50%')
      }}
      flexShrink="0"
      overflow="hidden"
      position="relative"
      r="lg"
      style={{
        isolation: 'isolate'
      }}
      {...rest}
    >
      <Image
        alt=""
        fallback="simple-icons:modrinth"
        fit="cover"
        height="100%"
        src={iconUrl ?? undefined}
        width="100%"
      />
    </Bordered>
  )
}

export default ProjectIcon
