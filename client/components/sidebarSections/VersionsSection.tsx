import {
  Scrollbar,
  SidebarItem,
  SidebarTitle,
  WithQueryData
} from 'lifeforge-ui'

import forgeAPI from '@/utils/forgeAPI'

function VersionsSection({
  selectedVersion,
  updateFilter
}: {
  selectedVersion: string | null
  updateFilter: React.Dispatch<React.SetStateAction<{ version: string | null }>>
}) {
  return (
    <>
      <SidebarTitle
        label="Game Versions"
        namespace="apps.melvinchia3636$modrinth"
      />
      <Scrollbar className="min-h-[300px]">
        <WithQueryData
          controller={forgeAPI.melvinchia3636$modrinth.gameVersions.list}
        >
          {versions => (
            <>
              {versions.map(version => (
                <SidebarItem
                  key={version}
                  active={version === selectedVersion}
                  label={version || 'Unknown'}
                  onCancelButtonClick={() =>
                    updateFilter({
                      version: null
                    })
                  }
                  onClick={() => {
                    updateFilter(prev => ({
                      version: prev.version === version ? prev.version : version
                    }))
                  }}
                />
              ))}
            </>
          )}
        </WithQueryData>
      </Scrollbar>
    </>
  )
}

export default VersionsSection
