import {
  Bordered,
  type BorderedProps,
  Box,
  Flex,
  Icon,
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
      <Flex centered>
        {iconUrl ? (
          <Box
            asChild
            height="100%"
            position="absolute"
            style={{
              objectFit: 'cover'
            }}
            width="100%"
          >
            <img alt="" src={iconUrl} />
          </Box>
        ) : (
          <Icon
            color={{ base: 'bg-200', dark: 'bg-700' }}
            icon="simple-icons:modrinth"
            size="3em"
          />
        )}
      </Flex>
    </Bordered>
  )
}

export default ProjectIcon
