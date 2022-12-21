import React from 'react'
import { useRouter } from 'next/router'
import { useFetchCommentsQuery } from '../redux/features/videos/videosApiSlice'
import RegularComment from './RegularComment'
import PinnedComments from './PinnedComments'

const VideoComments = ({ videoId }) => {

  const queryParams = {
    video_id: videoId ? videoId : 0,
}

  const { data: comments } = useFetchCommentsQuery(queryParams)

  return (
    <>
    <div>
        {comments?.data?.map((comment, i) => (
                <PinnedComments comment={comment} key={i}/>
              ))}
    </div>
    <div>
        {comments?.data?.map((comment, i) => (
                <RegularComment comment={comment} key={i}/>
              ))}
    </div>
    </>
  )
}

export default VideoComments