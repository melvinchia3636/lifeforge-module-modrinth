import GeneralSection from '@/components/sidebarSections/GeneralSection'
import VersionsSection from '@/components/sidebarSections/VersionsSection'
import { SidebarDivider } from 'lifeforge-ui'

type SidebarSection = [key: string, Component: 'general' | 'version' | React.FC]

export default function constructSidebar(
  sections: SidebarSection[],
  icons: Record<string, Record<string, string>>,
  filters: Record<string, any>
) {
  return sections.map(([key, Component], idx) => (
    <>
      {(() => {
        if (Component === 'general') {
          return (
            <GeneralSection
              key={key}
              icons={icons[key]}
              name={key}
              selectedItem={filters[key]}
              updateFilter={filters.updateFilter}
            />
          )
        } else if (Component === 'version') {
          return (
            <VersionsSection
              key={key}
              selectedVersion={filters.version}
              updateFilter={filters.updateFilter}
            />
          )
        } else {
          return <Component key={key} />
        }
      })()}
      {idx < sections.length - 1 && <SidebarDivider />}
    </>
  ))
}
