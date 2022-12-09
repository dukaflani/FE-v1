import React from 'react'
import { useSelector } from 'react-redux'
import { useFetchUserLyricssQuery } from '../redux/features/videos/videosApiSlice'
import MyLyricsObject from './MyLyricsObject'

const MyLyrics = () => {
  const { user } = useSelector((state) => state.auth)
  const currentUser = user?.info?.id

  const queryParams = {
    user: currentUser,
  }

  const { data: userLyrics } = useFetchUserLyricssQuery(queryParams)
  const numOfLyrics = userLyrics?.data?.length


  return (
    <div className='py-4 bg-white shadow-md border-b mb-14 pb-12'>
    <div className='px-2 uppercase font-semibold text-gray-800 text-sm tracking-tight'>Lyrics</div>
    <div className='px-2 text-sm text-gray-400 border-b pb-5'>{numOfLyrics} {numOfLyrics == 1 ? "Lyric item" : "Lyric Items"}</div>
    {true ? (<div className='space-y-4 mt-5 px-2'>
        {[...Array(numOfLyrics).keys()].map((obj, i) => (
            <div key={i}>
                <MyLyricsObject songLyrics={userLyrics?.data[i]} />
            </div>

        ))}
    </div>) : (<div className='mt-5'>You don't have any <strong>lyrics</strong> yet...</div>)}
</div>
  )
}

export default MyLyrics