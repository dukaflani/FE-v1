import React from 'react'
import { useSelector } from 'react-redux'
import { useFetchUserSkizaTunesQuery } from '../redux/features/videos/videosApiSlice'
import MySkizaTunesObject from './MySkizaTunesObject'

const MySKizaTunes = () => {
  const { user } = useSelector((state) => state.auth)
  const currentUser = user?.info?.id

  const queryParams = {
    user: currentUser,
  }

  const { data: userSkizaTunes } = useFetchUserSkizaTunesQuery(queryParams)
  const numOfSkizaTunes = userSkizaTunes?.data?.length



  return (
<div className='py-4 bg-white shadow-md border-b mb-14 pb-12'>
<div className='px-2 uppercase font-semibold text-gray-800 text-sm tracking-tight'>Callback Tunes</div>
<div className='px-2 text-sm text-gray-400 border-b pb-5'>{numOfSkizaTunes} {numOfSkizaTunes == 1 ? "Skiza Tune Item" : "Skiza Tune Items"}</div>
{true ? (<div className='space-y-4 mt-5 px-2'>
    {[...Array(numOfSkizaTunes).keys()].map((obj, i) => (
        <div key={i}>
            <MySkizaTunesObject  skiza={userSkizaTunes?.data[i]}/>
        </div>

    ))}
</div>) : (<div className='mt-5'>You don't have any <strong>skiza tunes</strong> yet...</div>)}
</div>
  )
}

export default MySKizaTunes