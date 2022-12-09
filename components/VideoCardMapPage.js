import React from 'react'
import { useFetchVideosQuery } from '../redux/features/videos/videosApiSlice'
import VideoCard from './VideoCard'

const VideoCardMapPage = ({ videos }) => {
  // const { data: videos } = useFetchVideosQuery()

  return (
    <>
    {videos?.data?.map((video, i) => (
                <VideoCard video={video} key={i}/>
              ))}
    </>
  )
}

export default VideoCardMapPage