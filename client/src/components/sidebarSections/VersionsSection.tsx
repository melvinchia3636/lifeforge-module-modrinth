import { useState } from 'react'

import { useModuleTranslation } from '@lifeforge/localization'
import {
  Checkbox,
  Flex,
  Scrollbar,
  SidebarItem,
  SidebarTitle,
  Text,
  WithQueryData
} from '@lifeforge/ui'

import { forgeAPI } from '@/manifest'

function VersionsSection({
  selectedVersion,
  updateFilter
}: {
  selectedVersion: string | null
  updateFilter: React.Dispatch<React.SetStateAction<{ version: string | null }>>
}) {
  const { t } = useModuleTranslation()
  const [showAllVersions, setShowAllVersions] = useState(false)

  return (
    <>
      <SidebarTitle label="Game Versions" />

      <Scrollbar autoHeight autoHeightMin="300px">
        <WithQueryData contract={forgeAPI.gameVersions.list}>
          {versions => (
            <>
              {versions
                .filter(e =>
                  showAllVersions ? true : e.version_type === 'release'
                )
                .map(e => e.version)
                .map(version => (
                  <SidebarItem
                    key={version}
                    active={version === selectedVersion}
                    label={version || 'Unknown'}
                    namespace={false}
                    onCancelButtonClick={() =>
                      updateFilter({
                        version: null
                      })
                    }
                    onClick={() => {
                      updateFilter(prev => ({
                        version:
                          prev.version === version ? prev.version : version
                      }))
                    }}
                  />
                ))}
            </>
          )}
        </WithQueryData>
      </Scrollbar>
      <Flex align="center" gap="md" pb="md" pt="xl" px="xl">
        <Checkbox
          checked={showAllVersions}
          onCheckedChange={setShowAllVersions}
        />
        <Text color="muted" weight="medium">
          {t('sidebar.showAllVersions')}
        </Text>
      </Flex>
    </>
  )
}

export default VersionsSection
