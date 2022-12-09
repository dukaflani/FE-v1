import React from 'react'
import { useSelector } from 'react-redux'
import { useFetchUserAlbumsQuery } from '../redux/features/videos/videosApiSlice'
import MyAlbumsObject from './MyAlbumsObject'

const MyAlbums = () => {
  const { user } = useSelector((state) => state.auth)
  const currentUser = user?.info?.id

  const queryParams = {
    user: currentUser,
  }

  const { data: userAlbums } = useFetchUserAlbumsQuery(queryParams)
  const numOfAlbums = userAlbums?.data?.length



  return (
<div className='py-4 bg-white shadow-md border-b mb-14 pb-12'>
<div className='px-2 uppercase font-semibold text-gray-800 text-sm tracking-tight'>Music Collections</div>
<div className='px-2 text-sm text-gray-400 border-b pb-5'>{numOfAlbums} {numOfAlbums == 1 ? "Collection Item" : "Collection Items"}</div>
{true ? (<div className='space-y-4 mt-5 px-2'>
    {[...Array(numOfAlbums).keys()].map((obj, i) => (
        <div key={i}>
            <MyAlbumsObject album={userAlbums?.data[i]}/>
        </div>

    ))}
</div>) : (<div className='mt-5'>You don't have any <strong>music collections</strong> yet...</div>)}
</div>
  )
}

export default MyAlbums