import Branding from "@/components/branding"
import ContentBlock from "@/components/contentBlock"
import PetDetails from "@/components/petDetails"
import PetList from "@/components/petList"
import SearchForm from "@/components/searchForm"
import Stats from "@/components/stats"
import { TPet } from "@/lib/types"

export default async function DashboardPage() {
  const response = await fetch(
    "https://bytegrad.com/course-assets/projects/petsoft/api/pets",
  )
  if (!response.ok) {
    throw new Error("Failed to fetch pets")
  }

  const pets: TPet[] = await response.json()

  return (
    <main>
      <div className="flex items-center justify-between py-8 text-white">
        <Branding />
        <Stats />
      </div>

      <div className="grid grid-rows-[45px_300px_500px] gap-4 md:h-[600px] md:grid-cols-3 md:grid-rows-[45px_1fr]">
        <div className="md:col-span-1 md:col-start-1 md:row-span-1 md:row-start-1">
          <SearchForm />
        </div>

        <div className="md:col-span-1 md:col-start-1 md:row-span-full md:row-start-2">
          <ContentBlock>
            <PetList pets={pets} />
          </ContentBlock>
        </div>

        <div className="md:col-span-full md:col-start-2 md:row-span-full md:row-start-1">
          <ContentBlock>
            <PetDetails />
          </ContentBlock>
        </div>
      </div>
    </main>
  )
}
