import {ChevronDownIcon} from '@heroicons/react/24/outline'

const CurrentVideoPlayerMobileSkeleton = () => {
  return (
    <article className='h-full mx-auto'>
         <div className='sticky top-0'>
         <div className='aspect-w-16 aspect-h-9 bg-gray-300 animate-pulse'></div>
         <div className='px-2 py-2 border-b shadow-sm flex space-x-3 bg-white'>
            <span className='bg-gray-300 animate-pulse px-7 py-7'></span>
            <span className='flex-1 flex flex-col items-start justify-center space-y-2'>
                <span className='bg-gray-300 animate-pulse p-2 w-full rounded-full'></span>
                <span className='bg-gray-300 animate-pulse p-1 w-6/12 rounded-full'></span>
            </span>
            <span className='flex items-center justify-center'>
                <span className='bg-gray-300 animate-pulse py-3 px-6 rounded-lg'></span>
            </span>
         </div>
         </div>
         <div className='bg-white pb-96 px-2 pt-4 flex flex-col space-y-4'>
            <span className='bg-gray-300 animate-pulse p-2 w-full rounded-full'></span>
            <span className='flex items-center justify-center space-x-3'>
                <span className='bg-gray-300 h-8 w-8 rounded-full md:h-10 md:w-10 landscape:h-10 landscape:w-10'></span>
                <span className='flex-1 flex flex-col items-start justify-center space-y-2'>
                    <span className='bg-gray-300 animate-pulse p-1.5 w-6/12 rounded-full'></span>
                </span>
                <span className='flex items-center justify-center'>
                    <span className='bg-gray-300 animate-pulse py-3 px-6 rounded-lg'></span>
                </span>
            </span>
            <span>
                <span className='flex items-center justify-start space-x-4 overflow-x-hidden'>
                    <span className='bg-gray-300 animate-pulse py-3 px-9 rounded-full'></span>
                    <span className='bg-gray-300 animate-pulse py-3 px-9 rounded-full'></span>
                    <span className='bg-gray-300 animate-pulse py-3 px-9 rounded-full'></span>
                    <span className='bg-gray-300 animate-pulse py-3 px-9 rounded-full'></span>
                </span>
            </span>
            <span className='bg-gray-300 p-2 rounded-lg animate-pulse'>
                <span className='text-sm font-medium text-gray-800 tracking-tight'>Comments</span>
            <span className='flex items-center justify-center space-x-3'>
                <span className='bg-gray-600 h-8 w-8 rounded-full md:h-10 md:w-10 landscape:h-10 landscape:w-10'></span>
                <span className='flex-1 flex flex-col items-start justify-center space-y-2'>
                    <span className='bg-gray-600 animate-pulse p-1 w-6/12 rounded-full'></span>
                </span>
                <span className='flex items-center justify-center'>
                    <ChevronDownIcon className='h-4 w-4 text-gray-600'/>
                </span>
            </span>
            </span>
         </div>
    </article>
  )
}

export default CurrentVideoPlayerMobileSkeleton