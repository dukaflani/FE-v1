import React from 'react'
import Image from "next/legacy/image";
import Link from 'next/link';
import { useRouter } from 'next/router'
import numeral from 'numeral';
import noAvatar from '../media/noimage.webp'
import { useAddViewMutation } from '../redux/features/videos/videosApiSlice';
import { formatDistanceStrict } from 'date-fns';
import { useSelector } from 'react-redux';

const VideoCard = ({ video }) => {
    const router = useRouter()
    const [ addView ] = useAddViewMutation();
    const { user } = useSelector((state) => state.auth)
    const currentUser = user?.info?.id


    const videoUploadTime = formatDistanceStrict(
        new Date(video?.date),
        new Date(),
        {
          addSuffix: true,
        },
      );

      const view2 = video?.views_count
    let view3 = ''
    view2 < 1000 || view2 % 10 === 0 ? view3 = numeral(view2).format('0a') :  view3 = numeral(view2).format('0.0a')

    const video_id = video?.id
    const user_id = currentUser ? currentUser : 1

    const newView = {
        "video": video_id,
        "user": user_id
    }
          

    const handleCurrentVideo = async (id) => {
        await addView(newView);
        router.push(`/watch/${id}`);
    }


  return (
        <article onClick={() => handleCurrentVideo(video?.id)} className='h-64 cursor-pointer'>
            <div className='h-4/6 relative rounded-md'>
                <Image 
                    src={video?.thumbnail}
                    layout="fill"
                    objectFit='cover'
                  />
            </div>
            <div className='h-2/6 flex space-x-1 pt-2'>
                <div className='w-2/12'>
                    <div className='relative h-11 w-11'>
                        <Image
                            src={video?.profile_avatar ? video?.profile_avatar : noAvatar}
                            layout="fill"
                            objectFit='cover'
                            className='rounded-full'
                            />
                    </div>
                </div>
                <div className='w-10/12'>
                    <Link href={`/watch/[videoid]?videoid=${video?.id}`}>
                        <a title={video?.title}>
                            <div className='h-3/5 font-semibold leading-4 text-gray-700 tracking-tight cursor-pointer'>{video?.title}</div>
                        </a>
                    </Link>
                    <div className='h-2/5'>
                        <div className='-mt-1 mb-0.5 flex space-x-1 items-center justify-start'>
                            <div className='text-gray-600 font-medium text-sm leading-3 tracking-tighter'>{video?.stage_name ? video?.stage_name : `${video?.first_name} ${video?.last_name}`}</div>
                            {video.verified && (
                                <div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-blue-600">
                                    <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                </svg>
                                </div>
                            )}
                        </div>
                        <div className='text-gray-600 text-sm -mt-1 tracking-tighter'>{!true && <span className='text-xs bg-rose-600 text-white mr-1'>SHOP</span>}{view3} {view3 == 1 ? 'view' : 'views'} &bull; {videoUploadTime}</div>
                    </div>
                </div>
            </div>
        </article>
  )
}

export default VideoCard