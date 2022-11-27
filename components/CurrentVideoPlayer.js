import React from 'react'
import { useSelector } from 'react-redux';
import Image from 'next/image';
import Linkify from 'react-linkify';
import numeral from 'numeral';
import ShowMoreText from "react-show-more-text";
import noAvatar from '../media/noimage.webp'
import VideoComments from './VideoComments';

const CurrentVideoPlayer = () => {
    const { video } = useSelector((state) => state.videos)
    const { user } = useSelector((state) => state.auth)
    const fullName = `${user?.info?.first_name} ${user?.info?.last_name}`

    const desc = video?.details?.description
    const hashTags = desc?.split(' ')
    const hashTagRegex = /#[a-z0-9_]+/gi 


    const videoUploadTime = new Date(video?.details?.date).toDateString()

    const view2 = video?.details?.views_count
          let view3 = numeral(view2).format('0,0')

  return (
    <article>
        <div>
            <div className='w-full h-[425px]'>
            <iframe width="100%" height="100%" src={`https://www.youtube.commmm/embed/${video?.details?.youtube_id}?autoplay=1&loop=1&modestbranding=1&color=white&playlist=${video?.details?.youtube_id}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
            <div className='w-full uppercase text-sm text-blue-600 pt-2'>{video?.details?.genre_title}</div>
            <h1 className='w-full font-semibold leading-4 text-gray-800 tracking-tight text-xl pt-1 pb-2'>{video?.details?.title}</h1>
            <div className='w-full flex items-center justify-between pt-1'>
                <div className='text-sm font-semibold tracking-tight text-gray-700'> {view3} {view3 == 1 ? 'view' : 'views'} &bull; {videoUploadTime && 'Added'} {videoUploadTime}</div>
                <div className='flex justify-end items-center pr-10'>
                    <div className='ml-10'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                        </svg>
                    </div>
                    <div className='ml-7'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384" />
                        </svg>
                    </div>
                    <div className='ml-14'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className='w-full text-base leading-5 tracking-tight text-gray-700 flex'>
                <Linkify componentDecorator={(decoratedHref, decoratedText, key) => ( <a target="blank" className='text-blue-600 -mb-1 w-56 inline-block overflow-hidden overflow-ellipsis whitespace-nowrap'  href={decoratedHref} key={key}> {decoratedText} </a> )} >
                <ShowMoreText
                    lines={1}
                    more="Show more"
                    less="Show less"
                    className="content-css text-base leading-4 tracking-tight text-gray-600 whitespace-pre-wrap"
                    anchorClass="text-xs tracking-tight uppercase text-blue-700 ml-1"
                    expanded={false}
                    truncatedEndingComponent={"... "}
                >
                {hashTags?.map((hashTag, i) => {
                    return hashTag.match(hashTagRegex) ? (
                        <div key={i}><span className='text-blue-600'>{hashTag}</span> {' '}</div>
                    ) : hashTag + ' '
                })}
            </ShowMoreText>
                </Linkify>
            </div>
            <div className='w-full text-sm mt-4'>{video?.details?.comment_count}  {video?.details?.comment_count == 1 ? 'Comment' : 'Comments'}</div>
            <hr className='my-1'/>
            <div className='w-full flex items-center justify-center mt-3 space-x-3 mb-5'>
                <div className='w-1/12 flex items-center justify-center'>
                    <div className='relative h-12 w-12'>
                        <Image
                            src={user?.info?.avatar ? user?.info?.avatar : noAvatar}
                            layout="fill"
                            objectFit='cover'
                            className='rounded-full'
                            />
                    </div>
                </div>
                <div className='w-9/12 flex items-center justify-center border-b hover:border-b-black'>
                    <input 
                        placeholder={user?.info ? user?.info?.stage_name ? `Comment as ${user?.info?.stage_name}` : `Comment as ${fullName}` : "Login to comment"} 
                        className='w-full bg-transparent focus:outline-none py-1' 
                        type="text" 
                    />
                </div>
                <div className='w-2/12 flex items-center justify-center'>
                    <button className='bg-gray-800 text-white uppercase text-sm p-2 font-semibold tracking-wider'>Comment</button>
                </div>
            </div>
            <div className='mt-10'>
                <VideoComments/>
            </div>
        </div>
    </article>
  )
}

export default CurrentVideoPlayer