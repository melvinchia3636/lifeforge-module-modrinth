import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { useModuleTranslation } from '@lifeforge/localization'

import {
  Box,
  Button,
  Flex,
  ListboxInput,
  ListboxOption,
  ModalHeader,
  Stack,
  WithQuery,
  toast
} from '@lifeforge/ui'

import { forgeAPI } from '@/manifest'

function DownloadModal({
  data: { slug, name, getIcon, getKey },
  onClose
}: {
  data: {
    slug: string
    name: string
    getIcon: (key: string) => string
    getKey: (key: string) => string | undefined
  }
  onClose: () => void
}) {
  const { t } = useModuleTranslation()

  const versionsQuery = useQuery(
    forgeAPI.projects.getVersions.input({ projectId: slug }).queryOptions()
  )

  const [selectedVersion, setSelectedVersion] = useState<string | null>(null)

  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)

  const versionOptions = useMemo(() => {
    return (
      [
        ...new Set(
          versionsQuery.data?.map(version => version.game_versions).flat()
        )
      ]
        .filter(e => e.match(/^\d+(\.\d+)*$/))
        .sort((a, b) => {
          const aParts = a.split('.').map(Number)

          const bParts = b.split('.').map(Number)

          for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
            const aPart = aParts[i] || 0

            const bPart = bParts[i] || 0

            if (aPart !== bPart) {
              return bPart - aPart
            }
          }

          return 0
        }) || []
    )
  }, [versionsQuery.data])

  const platformOptions = useMemo(() => {
    if (!selectedVersion) {
      return []
    }

    const platforms = new Set<string>()

    versionsQuery.data?.forEach(version => {
      if (version.game_versions.includes(selectedVersion)) {
        version.loaders.forEach(platform => platforms.add(platform))
      }
    })

    return Array.from(platforms).sort()
  }, [versionsQuery.data, selectedVersion])

  function download() {
    if (!selectedVersion || !selectedPlatform) {
      return
    }

    const targetVersion = versionsQuery.data?.find(
      version =>
        version.game_versions.includes(selectedVersion) &&
        version.loaders.includes(selectedPlatform)
    )

    if (!targetVersion) {
      toast.error("Couldn't find a matching version to download.")

      return
    }

    window.open(targetVersion.files[0].url, '_blank')
    onClose()
  }

  return (
    <Box minWidth="40vw">
      <ModalHeader
        icon="tabler:download"
        title={t('projectDetails.downloadModal.title', { name })}
        onClose={onClose}
      />
      <WithQuery query={versionsQuery}>
        {() => (
          <Stack>
            <ListboxInput
              icon="tabler:device-gamepad"
              label={t('projectDetails.downloadModal.gameVersion')}
              renderContent={() => <>{selectedVersion}</>}
              value={selectedVersion}
              onChange={value => {
                setSelectedVersion(value)
                setSelectedPlatform(null)
              }}
            >
              {versionOptions.map(version => (
                <ListboxOption key={version} label={version} value={version} />
              ))}
            </ListboxInput>
            {platformOptions.length > 0 && (
              <ListboxInput
                icon="tabler:device-desktop"
                label={t('projectDetails.downloadModal.platform')}
                renderContent={() => (
                  <>
                    {selectedPlatform ? (
                      <Flex align="center" gap="sm">
                        <Box
                          dangerouslySetInnerHTML={{
                            __html: getIcon(selectedPlatform!) || ''
                          }}
                          height="1em"
                          width="1em"
                        />
                        {getKey(selectedPlatform!) || selectedPlatform}
                      </Flex>
                    ) : (
                      t('projectDetails.downloadModal.selectPlatform')
                    )}
                  </>
                )}
                value={selectedPlatform}
                onChange={setSelectedPlatform}
              >
                {platformOptions.map(platform => (
                  <ListboxOption
                    key={platform}
                    icon={`customHTML:${getIcon(platform)}`}
                    label={getKey(platform) || platform}
                    value={platform}
                  />
                ))}
              </ListboxInput>
            )}
            <Button
              disabled={!selectedPlatform}
              icon="tabler:download"
              mt="lg"
              onClick={download}
            >
              {t('projectDetails.downloadModal.download')}
            </Button>
          </Stack>
        )}
      </WithQuery>
    </Box>
  )
}

export default DownloadModal
