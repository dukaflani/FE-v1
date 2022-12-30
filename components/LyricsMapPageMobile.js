import React from 'react'
import { useSelector } from 'react-redux'
import { useFetchLyricsQuery, useFetchLyricsVerseQuery } from '../redux/features/videos/videosApiSlice'
import LyricsMobile from './LyricsMobile'

const LyricsMapPageMobile = () => {
    const { video } = useSelector((state) => state.videos)

    const queryParams = {
        lyrics_id: video?.details?.lyrics,
      }

    const { data: lyrics } = useFetchLyricsQuery(queryParams)

    const versesQueryParams = {
        lyricsVerse_id: video?.details?.lyrics,
      }


    const { data: lyricsVerse } = useFetchLyricsVerseQuery(versesQueryParams)




  return (
    <div className='px-5'>
    <div className='text-sm uppercase tracking-tighter text-gray-800 font-semibold'>Lyrics</div>
    <div className='text-sm mb-5 tracking-tighter text-gray-700'>Learn the lyrics to {video?.details?.song_title} straight from {video?.details?.stage_name}</div>
    <div className='bg-white p-3 shadow-sm border-b'>
        <div className='flex flex-col items-start justify-center space-y-2'>
            <div>
                <div className='uppercase text-xs tracking-tight font-extrabold text-gray-600'>Vocals</div>
                <div className=' text-sm tracking-tight leading-4 text-gray-700'>{lyrics?.data?.vocals ? lyrics?.data?.vocals : "---"}</div>
            </div>
            <div>
                <div className='uppercase text-xs tracking-tight font-extrabold text-gray-600'>Audio</div>
                <div className=' text-sm tracking-tight leading-4 text-gray-700'>{lyrics?.data?.audio ? lyrics?.data?.audio : "---"}</div>
            </div>
            <div>
                <div className='uppercase text-xs tracking-tight font-extrabold text-gray-600'>Director</div>
                <div className=' text-sm tracking-tight leading-4 text-gray-700'>{lyrics?.data?.director ? lyrics?.data?.director : "---"}</div>
            </div>
            <div>
                <div className='uppercase text-xs tracking-tight font-extrabold text-gray-600'>Writer</div>
                <div className=' text-sm tracking-tight leading-4 text-gray-700'>{lyrics?.data?.writer ? lyrics?.data?.writer : "---"}</div>
            </div>
            <div>
                <div className='uppercase text-xs tracking-tight font-extrabold text-gray-600'>Background Vocals</div>
                <div className=' text-sm tracking-tight leading-4 text-gray-700'>{lyrics?.data?.bgvs ? lyrics?.data?.bgvs : "---"}</div>
            </div>
            <div>
                <div className='uppercase text-xs tracking-tight font-extrabold text-gray-600'>Instruments</div>
                <div className=' text-sm tracking-tight leading-4 text-gray-700'>{lyrics?.data?.instruments ? lyrics?.data?.instruments : "---"}</div>
            </div>
            <div>
                <div className='uppercase text-xs tracking-tight font-extrabold text-gray-600'>Executive Producer</div>
                <div className=' text-sm tracking-tight leading-4 text-gray-700'>{lyrics?.data?.producer ? lyrics?.data?.producer : "---"}</div>
            </div>
        </div>
        <hr className='my-5'/>
            {[...Array(lyricsVerse?.data?.length).keys()].map((verse, i) => (
                <div><LyricsMobile verse={lyricsVerse?.data[i]} key={i}/></div>
            ))}
    </div>
    <footer className='text-xs flex items-center justify-center pt-5 pb-2 text-gray-500'>&copy; {new Date().getFullYear()} {video?.details?.stage_name}</footer>
    </div>
  )
}

export default LyricsMapPageMobile