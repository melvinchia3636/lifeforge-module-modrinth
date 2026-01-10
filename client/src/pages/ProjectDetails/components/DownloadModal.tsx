import { useQuery } from '@tanstack/react-query'
import {
  Button,
  ListboxInput,
  ListboxOption,
  ModalHeader,
  WithQuery
} from 'lifeforge-ui'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import forgeAPI from '@/utils/forgeAPI'

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
  const { t } = useTranslation('apps.melvinchia3636$modrinth')

  const versionsQuery = useQuery(
    forgeAPI.melvinchia3636$modrinth.projects.getVersions
      .input({ projectId: slug })
      .queryOptions()
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
    <div className="min-w-[40vw]">
      <ModalHeader
        icon="tabler:download"
        title={t('projectDetails.downloadModal.title', { name })}
        onClose={onClose}
      />
      <WithQuery query={versionsQuery}>
        {() => (
          <div className="space-y-4">
            <ListboxInput
              buttonContent={<>{selectedVersion}</>}
              icon="tabler:device-gamepad"
              label={t('projectDetails.downloadModal.gameVersion')}
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
                buttonContent={
                  <>
                    {selectedPlatform ? (
                      <>
                        <span
                          className="size-4"
                          dangerouslySetInnerHTML={{
                            __html: getIcon(selectedPlatform!) || ''
                          }}
                        />
                        {getKey(selectedPlatform!) || selectedPlatform}
                      </>
                    ) : (
                      t('projectDetails.downloadModal.selectPlatform')
                    )}
                  </>
                }
                icon="tabler:device-desktop"
                label={t('projectDetails.downloadModal.platform')}
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
              className="mt-6 w-full"
              disabled={!selectedPlatform}
              icon="tabler:download"
              onClick={download}
            >
              {t('projectDetails.downloadModal.download')}
            </Button>
          </div>
        )}
      </WithQuery>
    </div>
  )
}

export default DownloadModal
