import React from 'react'
import Image from "next/legacy/image";
import { CheckBadgeIcon } from '@heroicons/react/24/solid'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid'
import AlbumTrack from './AlbumTrack'
import { useSelector } from 'react-redux'
import { useFetchAlbumQuery, useFetchAlbumTracksQuery } from '../redux/features/videos/videosApiSlice'
import cover from '../public/media/dukaflani-cover-default.png'

const AlbumTracksPage = () => {
    const { video } = useSelector((state) => state.videos)

    const queryParams = {
        album_id: video?.details?.album,
      }

    const { data: album, isLoading } = useFetchAlbumQuery(queryParams)


    const albumTrackParams = {
        albumTrack_id: album?.data?.id,
      }

    const { data: albumTracks } = useFetchAlbumTracksQuery(albumTrackParams)



  return (
    <div className='px-5'>
    <div className='text-sm uppercase tracking-tighter text-gray-800 font-semibold'>More from the {album?.data?.album_type}</div>
    <div className='text-sm mb-5 tracking-tighter text-gray-700'>Explore {album?.data?.title} the {album?.data?.album_type} from {video?.details?.stage_name}</div>
        {album?.data?.id && <div className='p-2 bg-white border-b shadow-sm'>
         <div className='mb-5'>
            <div className='flex mb-5'>
                <div className='w-1/3'>
                    <div className='relative h-24 w-full'>
                        {album?.data?.cover && <Image
                            src={!album?.data?.cover ? cover : album?.data?.cover}
                            layout="fill"
                            objectFit='cover'
                            />}
                    </div>
                </div>
                <div className='w-2/3 flex flex-col justify-end pl-2'>
                    <div className='flex space-x-1 mb-1'>
                        <div className='text-sm tracking-tight leading-4 font-semibold text-gray-800'>{video?.details?.stage_name}</div>
                        {video?.details?.verified && <CheckBadgeIcon className='h-3 w-3 text-blue-600'/>}
                    </div>
                    <div className='text-sm tracking-tight leading-4 text-gray-800'>{album?.data?.title}</div>
                    <div className='text-sm tracking-tight leading-4 text-gray-800'>{albumTracks?.data?.length} {albumTracks?.data?.length === 1 ? "Track" : "Tracks"}</div>
                    <a href={album?.data?.link} target="_blank" rel="noopener">
                        <div className='flex space-x-1'>
                            <div className='text-sm tracking-tight leading-4 text-gray-800'>{album?.data?.option_type} {album?.data?.link_title}</div>
                            <ArrowTopRightOnSquareIcon className='h-4 w-4 text-blue-600 cursor-pointer'/>
                        </div>
                    </a>
                </div>
            </div>
        </div>   
        {!isLoading && [...Array(albumTracks?.data?.length).keys()].map((albumTrack, i) => (
            <AlbumTrack track={albumTracks?.data[i]} key={i}/>
        ))}
        </div>}
        {isLoading && <div className='text-sm tracking-tight leading-4 text-gray-800'>Loading music collection...</div>}
    <footer className='text-xs flex items-center justify-center pt-5 pb-2 text-gray-500'>&copy; {new Date().getFullYear()} {video?.details?.stage_name}</footer>
    </div>
  )
}

export default AlbumTracksPage