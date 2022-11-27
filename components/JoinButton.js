import React from 'react'
import { useJoinFanbaseMutation } from '../redux/features/videos/videosApiSlice'

const JoinButton = ({ fan }) => {
  const [ joinFanbase ] = useJoinFanbaseMutation()

  const fan2 = {
    "user": fan?.user[0],
    "fan_of": fan?.fan_of[0]
  }

  
  const handleClick = async () => {
    await joinFanbase(fan2);
  }

  return (
    <>
        <button onClick={handleClick} className='uppercase p-1 bg-gray-800 text-white font-semibold tracking-wider text-xs'>Join</button>
    </>
  )
}

export default JoinButton