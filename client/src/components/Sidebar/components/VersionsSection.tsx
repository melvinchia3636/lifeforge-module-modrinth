import useFilter from '@/hooks/useFilter'
import forgeAPI from '@/utils/forgeAPI'
import {
  Scrollbar,
  SidebarItem,
  SidebarTitle,
  WithQueryData
} from 'lifeforge-ui'

function VersionsSection() {
  const { version: selectedVersions, updateFilter } = useFilter()

  return (
    <>
      <SidebarTitle label="Game Versions" namespace="apps.modrinth" />
      <Scrollbar className="min-h-[400px]">
        <WithQueryData controller={forgeAPI.modrinth.listVersions}>
          {versions => (
            <div className="space-y-1">
              {versions.map(version => (
                <SidebarItem
                  key={version}
                  active={version === selectedVersions}
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
            </div>
          )}
        </WithQueryData>
      </Scrollbar>
    </>
  )
}

export default VersionsSection
