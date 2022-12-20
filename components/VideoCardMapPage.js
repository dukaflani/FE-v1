import { useRef, useCallback } from 'react'
import VideoCard from './VideoCard'

const VideoCardMapPage = ({ videos, loading, hasMore, setPageNumber }) => {

  const observer = useRef()
  const lastVideoElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPage => prevPage + 1)
      }
    }) 
    if (node) observer.current.observe(node)
  }, [ loading, hasMore ])




  return (
    <>
    {[...new Set([...videos])]?.map((video, i) => {
      if (videos?.length === i + 1) {
        return  <div ref={lastVideoElementRef} key={i}><VideoCard video={video} /></div>
      } else {
        return  <div key={i}><VideoCard video={video} /></div> 
      }

    }
    )}
    </>
  )
}

export default VideoCardMapPage