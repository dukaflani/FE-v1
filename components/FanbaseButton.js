import React from 'react'
import { useSelector } from 'react-redux'
import { useFanbaseQuery } from '../redux/features/videos/videosApiSlice'
import JoinButton from './JoinButton'
import LeaveButton from './LeaveButton'

const FanbaseButton = () => {
    const { video } = useSelector((state) => state.videos)
    const { user } = useSelector((state) => state.auth)

    const loggedInUserId = user?.info?.id
    const videoUserId = video?.details?.user

    const queryParams = {
        user: loggedInUserId,
        fan_of: videoUserId,
      }

    const { data: is_fan } = useFanbaseQuery(queryParams)


    const fan = {
      "user": [loggedInUserId],
      "fan_of": [videoUserId]
  }


  return (
    <>
        {is_fan?.data?.length === 0 && <JoinButton fan={fan} />}
        {is_fan?.data?.length > 0 && <LeaveButton data={is_fan?.data}  />}
    </>
  )
}

export default FanbaseButton