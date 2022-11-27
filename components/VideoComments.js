import React from 'react'
import { useRouter } from 'next/router'
import { useFetchCommentsQuery } from '../redux/features/videos/videosApiSlice'
import RegularComment from './RegularComment'

const VideoComments = () => {
  const router = useRouter()
  const { videoid } = router.query

  const queryParams = {
    video_id: videoid,
}

  const { data: comments } = useFetchCommentsQuery(queryParams)

  return (
    <div>
        {comments?.data?.map((comment, i) => (
                <RegularComment comment={comment} key={i}/>
              ))}
    </div>
  )
}

export default VideoComments