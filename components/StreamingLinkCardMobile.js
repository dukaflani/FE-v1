import React from 'react'
import Image from "next/legacy/image";
import { useSelector } from 'react-redux'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { useFetchStreamingLinksQuery } from '../redux/features/videos/videosApiSlice'

const StreamingLinkCard = () => {
    const { video } = useSelector((state) => state.videos)

  const queryParams = {
    link_id: video?.details?.links,
  }

const { data: streaminglinks } = useFetchStreamingLinksQuery(queryParams)


  return (
    <>
    {[...Array(streaminglinks?.data?.length).keys()].map((link, i) => (
        <div key={i}>
                <a href={streaminglinks?.data[i]?.link} target="_blank" rel="noopener">
                <div className='flex items-center justify-start rounded-l-xl mb-2 bg-white shadow py-2 pr-2  cursor-pointer max-h-14 animateCard'>
                    <div className='w-3/12'>
                        {/* <div className='relative h-14 w-full rounded-l-xl bg-gray-200'>
                            {streaminglinks?.data[i]?.logo && <Image
                                src={streaminglinks?.data[i]?.logo}
                                layout="fill"
                                objectFit='cover'
                                className='rounded-l-xl'
                                />}
                        </div> */}
                        {streaminglinks?.data[i]?.logo && <picture>
                            <img
                                src={streaminglinks?.data[i]?.logo}
                                alt={`${streaminglinks?.data[i]?.streaming_service} logo`}
                                className="h-14 w-full rounded-l-xl bg-gray-200"
                            />
                        </picture>}
                    </div>
                    <div className='w-6/12 flex items-start justify-center flex-col pl-2'>
                        <div className='text-sm font-semibold tracking-tight text-gray-800 line-clamp-1'>{!streaminglinks?.data[i]?.streaming_service ? 'No Link Found' : streaminglinks?.data[i]?.streaming_service}</div>
                        <div className='text-xs tracking-tight text-gray-800 w-48 truncate'>{!streaminglinks?.data[i]?.link ? '-' : streaminglinks?.data[i]?.link}</div>
                    </div>
                    <div className='w-3/12 flex items-center justify-end pr-3'>
                        <ArrowTopRightOnSquareIcon className='h-4 w-4 text-gray-800 hover:text-blue-600'/>
                    </div>
                </div>
                </a>
        </div>
    ))}
    </>
  )
}

export default StreamingLinkCard