import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { PlayPauseIcon } from '@heroicons/react/24/solid'
import { useAddViewMutation } from '../redux/features/videos/videosApiSlice';

const AlbumTrack = ({ track }) => {
  const router = useRouter()
    const [ addView ] = useAddViewMutation();
    const { user } = useSelector((state) => state.auth)
    const currentUser = user?.info?.id

    const videoId = track?.video_id
    const user_id = currentUser ? currentUser : 1

    const newView = {
        "video": videoId,
        "user": user_id
    }

    const handlePlayVideo = async (id) => {
      await addView(newView);
      router.push({
          pathname: `/watch/`,
          query: { v: id, tab: "album" },
        });
  }
  
  return (
    <div className='p-1 mb-4 flex items-center justify-center'>
        <div className='w-10/12'>
            <div className='text-sm text-gray-800'>{track?.title}</div>
            <hr className='mb-1'/>
            {track?.id ? <div className='text-xs text-gray-400'>{track?.featuring ? `ft. ${track?.featuring}` : "solo project"}</div>
             : 
            <div className='text-xs text-gray-400'>Loading tracks...</div>}
        </div>
        <div className='w-2/12 flex items-center justify-center'>
          {track?.video == 1 && <div>< PlayPauseIcon className='h-5 w-5 text-gray-100' /></div>}
          {track?.video == null && <div>< PlayPauseIcon className='h-5 w-5 text-gray-100' /></div>}
          {track?.video > 1 && <div onClick={() => handlePlayVideo(track?.youtube_id)} >< PlayPauseIcon className='h-5 w-5 text-blue-600 cursor-pointer' /></div>}
        </div>
    </div>
  )
}

export default AlbumTrack