import forgeAPI from '@/utils/forgeAPI'
import {
  Scrollbar,
  SidebarItem,
  SidebarTitle,
  WithQueryData
} from 'lifeforge-ui'

function VersionsSection({
  selectedVersion,
  updateFilter
}: {
  selectedVersion: string | null
  updateFilter: React.Dispatch<React.SetStateAction<{ version: string | null }>>
}) {
  return (
    <>
      <SidebarTitle label="Game Versions" namespace="apps.modrinth" />
      <Scrollbar className="min-h-[300px]">
        <WithQueryData controller={forgeAPI.modrinth.gameVersions.list}>
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
