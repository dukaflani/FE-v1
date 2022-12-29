import Link from "next/link"
import { tabButtons } from "../data/tabButtons"
import { useRouter } from "next/router"

const ItemsTabNavigationMobile = () => {
  const router = useRouter()
  const { v, tab } = router.query
  const activeStyles = "flex items-center justify-center space-x-2 bg-gray-500 py-1 px-2 md:py-2 md:px-3 landscape:py-2 landscape:px-3 whitespace-nowrap rounded-full text-white font-medium text-sm md:text-base landscape:text-base"
  const nonActiveStyles = "flex items-center justify-center space-x-2 bg-gray-50 py-1 px-2 md:py-2 md:px-3 landscape:py-2 landscape:px-3 whitespace-nowrap rounded-full text-gray-800 font-medium text-sm md:text-base landscape:text-base"

  return (
    <div className="bg-white p-2 border-b shadow-sm">
      <div className="flex space-x-4 overflow-x-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent">
        {tabButtons?.map((tabButton, i) => (
          <Link 
              key={i} 
              href={{
                pathname: `/watch/`,
                query: { v: v, tab: tabButton.urlQueryParams.tab },
            }}
              className={tabButton.urlQueryParams.tab === tab ? activeStyles : nonActiveStyles} >
            <span>{tabButton.icon}</span>
            <span>{tabButton.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ItemsTabNavigationMobile