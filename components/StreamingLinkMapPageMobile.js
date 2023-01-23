import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { useSelector } from 'react-redux'
import StreamingLinkCardMobile from './StreamingLinkCardMobile'

const StreamingLinkMapPageMobile = () => {
  const router = useRouter()
  const { v } = router.query
  const { video } = useSelector((state) => state.videos)

  return (
    <div className='px-5'>
    <div className='text-sm sm:text-sm uppercase tracking-tighter text-gray-800 font-semibold'>Streaming & Download Links</div>
    <div className='text-sm sm:text-sm mb-5 tracking-tighter text-gray-700 leading-4'>Click on the links below to stream or download {video?.details?.song_title} by {video?.details?.stage_name}</div>
        <>
          <div>
                  <a href={`https://www.youtube.com/watch?v=${v}`} target="_blank" rel="noopener">
                  <div className='flex items-center justify-start rounded-l-xl mb-2 bg-white shadow py-2 pr-2  cursor-pointer max-h-14'>  
                    <div className='w-3/12'>
                        {v && <picture>
                            <img
                                src={`${process.env.NEXT_PUBLIC_DEFAULT_IMAGE_URL}/YouTube.png`}
                                alt="Youtube logo"
                                className="h-14 w-full rounded-l-xl bg-gray-200"
                            />
                        </picture>}
                    </div>
                      <div className='w-6/12 flex items-start justify-center flex-col pl-2'>
                          <div className='text-sm font-semibold tracking-tight text-gray-800 line-clamp-1'>YouTube</div>
                          <div className='text-xs tracking-tight text-gray-800 w-48 truncate'>{`https://www.youtube.com/watch?v=${v}`}</div>
                      </div>
                      <div className='w-3/12 flex items-center justify-end pr-3'>
                          <ArrowTopRightOnSquareIcon className='h-4 w-4 text-gray-800 hover:text-blue-600'/>
                      </div>
                  </div>
                  </a>
          </div>
        </>
        <StreamingLinkCardMobile/>
    <footer className='text-xs flex items-center justify-center pt-5 pb-2 text-gray-500'>Terms & Conditions Apply</footer>
    </div>
  )
}

export default StreamingLinkMapPageMobile