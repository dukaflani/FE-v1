import React from 'react'
import { useSelector } from 'react-redux'
import { useFetchUserLinkHoldersQuery } from '../redux/features/videos/videosApiSlice'
import MySmartLinksObject from './MySmartLinksObject'

const MySmartLinks = () => {
  const { user } = useSelector((state) => state.auth)
  const currentUser = user?.info?.id

  const queryParams = {
    user: currentUser,
  }

  const { data: userStreamingLinks } = useFetchUserLinkHoldersQuery(queryParams)
  const numOfStreamingLinks = userStreamingLinks?.data?.length


  return (
    <div className='py-4 bg-white shadow-md border-b mb-14 pb-12'>
        <div className='px-2 uppercase font-semibold text-gray-800 text-sm tracking-tight'>Streaming & Download Links</div>
        <div className='px-2 text-sm text-gray-400 border-b pb-5'>{numOfStreamingLinks} {numOfStreamingLinks == 1 ? "Link Item" : "Link Items"}</div>
        {true ? (<div className='space-y-4 mt-5 px-2'>
            {[...Array(numOfStreamingLinks).keys()].map((obj, i) => (
                    <MySmartLinksObject key={i} numOfStreamingLinks={userStreamingLinks?.data[i]?.streamingobject_set?.length} streaminglink={userStreamingLinks?.data[i]} currentUser={currentUser} />
           ))}
        </div>) : (<div className='mt-5'>You don't have any <strong>streaming links</strong> yet...</div>)}
    </div>
  )
}

export default MySmartLinks