import { useEffect, useState, useRef, useCallback } from "react"
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Image from "next/legacy/image";
import { formatDistanceStrict } from 'date-fns';
import useFetchVideos from "../customHooks/useFetchVideos"
import { useAddViewMutation } from "../redux/features/videos/videosApiSlice";
import Link from "next/link";


const MoreVideosMobile = ({ setShowMoreVideos, pageNumber, setPageNumber, searchQuery, setSearchQuery, userId,
  setUserId, genreId, setGenreId, uniqueId, setUniqueId, loading, error, videos, hasMore }) => {
  const router = useRouter()
  const { v } = router.query

  const [ addView ] = useAddViewMutation();
  const { user } = useSelector((state) => state.auth)
  const currentUser = user?.info?.id

  // const [pageNumber, setPageNumber] = useState('')
  // const [searchQuery, setSearchQuery] = useState('')
  // const [userId, setUserId] = useState('')
  // const [genreId, setGenreId] = useState('')
  // const [uniqueId, setUniqueId] = useState('')

  // const { loading, error, videos, hasMore } = useFetchVideos(searchQuery, userId, pageNumber, genreId, uniqueId)


  useEffect(() => {
    setPageNumber(1)
  }, [])

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




  const filteredVideoArr = videos.filter( filteredVideo =>  {
    return filteredVideo?.youtube_id != v
  })

//   const video_id = video?.id
  const user_id = currentUser ? currentUser : 1

  
          

    const handleCurrentVideo = async (id, video_id) => {
        const newView = {
            "video": video_id,
            "user": user_id
           }
        await addView(newView);
        router.push({
            pathname: `/watch/`,
            query: { v: id, tab: "links" },
          });
          setShowMoreVideos(false)
    }


  return (
    <>
        {filteredVideoArr?.map((video, i) => {
            if (filteredVideoArr?.length === i + 1) {
                return (
                        <div key={i} ref={lastVideoElementRef} onClick={() => handleCurrentVideo(video?.youtube_id, video?.id)} className={video?.id == 1 ? 'hidden' : "flex items-start justify-start space-x-2 mb-5 cursor-pointer"}>
                                <div className='relative h-24 w-36'>
                                    {video?.thumbnail && <Image
                                        src={video?.thumbnail}
                                        layout="fill"
                                        objectFit='fit'
                                        className='rounded-lg'
                                        />}
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm text-gray-800 tracking-tight font-semibold line-clamp-2 pt-1">{video?.title}</div>
                                    <div className="text-sm text-gray-700 tracking-tight line-clamp-1">{video?.stage_name}</div>
                                    <div className="text-xs text-gray-600">{formatDistanceStrict(
                                            new Date(video?.date),
                                            new Date(),
                                            {
                                            addSuffix: true,
                                            },
                                    )}</div>
                                </div>
                        </div>
                )
            } else {
                return (
                        <div key={i} onClick={() => handleCurrentVideo(video?.youtube_id, video?.id)} className={video?.id == 1 ? 'hidden' : "flex items-start justify-start space-x-2 mb-5 px-5 cursor-pointer"}>
                                <div className='relative h-24 w-36'>
                                    {video?.thumbnail && <Image
                                        src={video?.thumbnail}
                                        layout="fill"
                                        objectFit='fit'
                                        className='rounded-lg'
                                        />}
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm text-gray-800 tracking-tight font-semibold line-clamp-2 pt-1">{video?.title}</div>
                                    <div className="text-sm text-gray-700 tracking-tight line-clamp-1">{video?.stage_name}</div>
                                    <div className="text-xs text-gray-600">{formatDistanceStrict(
                                            new Date(video?.date),
                                            new Date(),
                                            {
                                            addSuffix: true,
                                            },
                                    )}</div>
                                </div>
                        </div>
                )
            }
    })}


    {loading ? <div className='flex items-center justify-center py-3'>
    <button type="button" className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm text-gray-800 transition ease-in-out duration-150 cursor-not-allowed" disabled="">
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Loading Videos...
    </button>
    </div>
    :
    <div className='flex items-center justify-center py-3'>
        <span className='font-semibold leading-6 text-sm text-gray-800 transition ease-in-out duration-150 cursor-not-allowed'>The End</span>
    </div>
    }
            
    </>
  )
}

export default MoreVideosMobile