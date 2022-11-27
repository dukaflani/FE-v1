import Head from 'next/head'
import { HomeIcon, RectangleGroupIcon, UserCircleIcon, Cog6ToothIcon } from '@heroicons/react/24/solid'
import { HomeIcon as HomeOutline, RectangleGroupIcon as RGOutline, 
  UserCircleIcon  as UCOutline, Cog6ToothIcon as C6Outline} from '@heroicons/react/24/outline'
import SidebarNav from '../components/SidebarNav'
import GenreTabs from '../components/GenreTabs'
import Navigation from '../components/Navigation'
import VideoCardMapPage from '../components/VideoCardMapPage'
import VideoSkeletonMapPage from '../components/VideoSkeletonMapPage'


const Home = () => {

  return (
    <SidebarNav>
      <Head>
        <title>Dukaflani</title>
        <meta name="description" content="Home of music videos, products and merchandise promoted by your favourite musicians." />
        <link rel="icon" href="/dukaflani-blue-logo-small.png" />
      </Head>
      <Navigation/>
      <main className='pt-36'>
        <section>
          <GenreTabs/>
        </section>
        <section className='flex'>
          <div className='w-1/12 flex items-start justify-start pl-5 fixed left-0 top-40'>
            <nav>
              <ul className='space-y-10'>
                <li className='cursor-pointer flex flex-col items-center justify-center animateIcon'>
                  <div>
                    {true ? <HomeIcon className="w-6 h-6"/> : <HomeOutline className="w-6 h-6"/>}
                  </div>
                  {/* <div className='text-sm'>Home</div> */}
                </li>
                <li className='cursor-pointer flex flex-col items-center justify-center animateIcon'>
                  <div>
                    {!true ? <RectangleGroupIcon className="w-6 h-6"/> : <RGOutline className="w-6 h-6"/>}
                  </div>
                  {/* <div className='text-sm'>Dashboard</div> */}
                </li>
                <li className='cursor-pointer flex flex-col items-center justify-center animateIcon'>
                  <div>
                    {!true ? <UserCircleIcon className="w-6 h-6"/> : <UCOutline className="w-6 h-6"/>}
                  </div>
                  {/* <div className='text-sm'>Profile</div> */}
                </li>
                <li className='cursor-pointer flex flex-col items-center justify-center animateIcon'>
                  <div>
                    {!true ? <Cog6ToothIcon className="w-6 h-6"/> : <C6Outline className="w-6 h-6"/>}
                  </div>
                  {/* <div className='text-sm'>Settings</div> */}
                </li>
              </ul>
            </nav>
          </div>
          <div className='w-1/12'></div>
          {/* <div className='flex-1 pr-5 w-11/12 pl-24'> */}
          <div className='flex-1 pr-5 w-11/12 max-w-7xl'>
            <div className='grid grid-cols-4 gap-x-3 gap-y-10'>
              {!true ? 
              <VideoSkeletonMapPage/>
              :
              <VideoCardMapPage/>
            }
            </div>
          </div>
        </section>
      </main>
    </SidebarNav>
  )
}

export default Home
