import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import Image from "next/legacy/image";
import Linkify from 'react-linkify';
import numeral from 'numeral';
import ShowMoreText from "react-show-more-text";
import { HandThumbDownIcon, HandThumbUpIcon, ShareIcon } from '@heroicons/react/24/outline'
import { HandThumbDownIcon as Unlikebtn, HandThumbUpIcon as Likebtn, ShareIcon as Sharebtn } from '@heroicons/react/24/solid'
import ApiButtonWithSpinner from './reuseable-components/ApiButtonWithSpinner'
import noAvatar from '../public/media/noimage.webp'
import thumbnail from '../public/media/dukaflani-player-default.png'
import VideoComments from './VideoComments';
import { useAddCommentMutation, useVideoLikedQuery, useVideoUnlikedQuery } from '../redux/features/videos/videosApiSlice';

const CurrentVideoPlayer = () => {
    const [commentBody, setCommentBody] = useState('')
    const [createdComment, setCreatedComment] = useState(null)
    const [commentErrors, setCommentErrors] = useState(null)
    const [fieldError, setFieldError] = useState('')


    const { video } = useSelector((state) => state.videos)
    const { user } = useSelector((state) => state.auth)
    const fullName = `${user?.info?.first_name} ${user?.info?.last_name}`

    const { userProfile } = useSelector((state) => state.auth)
    const userProfileId = userProfile?.info ? userProfile?.info[0]?.id : 0

    const desc = video?.details?.description
    const hashTags = desc?.split(' ')
    const hashTagRegex = /#[a-z0-9_]+/gi 

    const videoLikedQuery = {
        video_id: video?.details?.id,
    }


    const {data: isLiked } = useVideoLikedQuery(videoLikedQuery)
    const {data: isUnliked } = useVideoUnlikedQuery(videoLikedQuery)
    const [ addComment, { isLoading } ] = useAddCommentMutation()

    const is_liked = !!isLiked?.data[0]?.id
    const is_unliked = !!isUnliked?.data[0]?.id


    const videoUploadTime = new Date(video?.details?.date).toDateString()

    const likesCountRaw = video?.details?.like_count
    let likesCount = ''
    likesCountRaw < 1000 || likesCountRaw % 10 === 0 ? likesCount = numeral(likesCountRaw).format('0a') :  likesCount = numeral(likesCountRaw).format('0.0a')
    
    const unlikesCountRaw = video?.details?.unlike_count
    let unlikesCount = ''
    unlikesCountRaw < 1000 || unlikesCountRaw % 10 === 0 ? unlikesCount = numeral(unlikesCountRaw).format('0a') :  unlikesCount = numeral(unlikesCountRaw).format('0.0a')
    console.log("likes count:", likesCount);
    console.log("do i like the video?:", is_liked);
    console.log("did i unlike the video?:", is_unliked);

    const view2 = video?.details?.views_count
          let view3 = numeral(view2).format('0,0')


          const newComment = {
            "body": commentBody,
            "video": video?.details?.id,
            "customuserprofile": userProfileId,
        }
    
        const handleAddComment = async () => {
            if (commentBody && video?.details?.id && userProfileId) {
                try {
                    setCreatedComment(await addComment(newComment))
                    setCommentBody('')
                } catch (error) {
                    setCommentErrors(error)
                    setTimeout(() => {
                        setCommentErrors(null)
                    }, 5000);
                }
                
            } else {
                setFieldError('Please fill in all the fields')
            }
        }

        const deleteLike = () => {
            alert("like deleted")
        }

        const deleteUnlike = () => {
            alert("unlike deleted")
        }

        const addLike = () => {
            if (is_unliked) {
                alert("like added + unlike deleted")
                
            } else {
                alert("like added")
            }
        }

        const addUnlike = () => {
            if (is_liked) {
                alert("unlike added + like deleted")
                
            } else {
                alert("unlike added")
                
            }
        }



  return (
    <article>
        <div>
            <div className='w-full h-[425px]'>
            {!video?.details?.youtube_id ? 
            <div className='relative w-full h-full'>
                <Image 
                    src={thumbnail}
                    layout="fill"
                    objectFit='cover'
                  />
            </div> : <iframe width="100%" height="100%" src={`https://www.youtube.commmm/embed/${video?.details?.youtube_id}?autoplay=1&loop=1&modestbranding=1&color=white&playlist=${video?.details?.youtube_id}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>}
            </div>
            <div className='w-full uppercase text-sm text-blue-600 pt-2'>{video?.details?.genre_title}</div>
            <h1 className='w-full font-semibold leading-4 text-gray-800 tracking-tight text-xl pt-1 pb-2'>{video?.details?.title}</h1>
            <div className='w-full flex items-center justify-between pt-1'>
                <div className='text-sm font-semibold tracking-tight text-gray-700'> {view3} {view3 == 1 ? 'view' : 'views'} &bull; {videoUploadTime && 'Added'} {videoUploadTime}</div>
                <div className='flex justify-end items-center pr-5'>
                    <div class="inline-flex rounded-md" role="group">
                    {is_liked ? <button onClick={deleteLike} type="button" class="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-gray-100 rounded-l-lg border-r border-gray-300 hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                        <Likebtn class="mr-2 w-5 h-5" /> 
                        {likesCount}
                    </button>
                    :
                    <button onClick={addLike} type="button" class="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-gray-100 rounded-l-lg border-r border-gray-300 hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                        <HandThumbUpIcon class="mr-2 w-5 h-5" />
                        {likesCount}
                    </button>}
                    {is_unliked ? <button onClick={deleteUnlike} type="button" class="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-gray-100 rounded-r-md hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                        <Unlikebtn class="mr-2 w-5 h-5" />
                        {unlikesCount}
                    </button>
                    :
                    <button onClick={addUnlike} type="button" class="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-gray-100 rounded-r-md hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                        <HandThumbDownIcon class="mr-2 w-5 h-5" />
                        {unlikesCount}
                    </button>}
                    </div>
                    <div className='ml-14'>
                    <button type="button" class="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-gray-100 rounded-lg border-gray-300 hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                        <ShareIcon class="mr-2 w-5 h-5" />
                        Share
                    </button>
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
            <hr className='mt-2 mb-10'/>
            <div className='w-full flex items-center justify-center mt-3 space-x-3 mb-5'>
                <div className='w-1/12 flex items-center justify-center'>
                    <div className='relative h-12 w-12'>
                        <Image
                            src={video?.details?.profile_avatar ? video?.details?.profile_avatar : noAvatar}
                            layout="fill"
                            objectFit='cover'
                            className='rounded-full'
                            />
                    </div>
                </div>
                <div className='w-9/12 flex items-center justify-center'>
                    <input 
                        placeholder={user?.info ? user?.info?.stage_name ? `Comment as ${user?.info?.stage_name} ...` : `Comment as ${fullName}` : "Login to comment"} 
                        className='w-full bg-transparent border-transparent border-2 border-b-gray-400 hover:border-b-gray-500 focus:border-b-gray-700 focus:border-x-transparent focus:border-t-transparent focus:outline-none ring-transparent focus:ring-transparent py-1' 
                        type="text" 
                        value={commentBody}
                        onChange={(e) => setCommentBody(e.target.value)}
                    />
                </div>
                <div className='w-2/12 flex items-center justify-center'>
                    <ApiButtonWithSpinner
                        loading={isLoading}
                        title="COMMENT"
                        onClick={handleAddComment}
                        bgColor="bg-gray-800"
                        hoverColor="hover:bg-gray-700"
                        textColor="text-white"
                    />
                    {/* <button onClick={handleAddComment} className='bg-gray-800 text-white uppercase text-sm p-2 font-semibold tracking-wider'>Comment</button> */}
                </div>
            </div>
            <div className='mt-10 mb-36'>
                <VideoComments/>
            </div>
        </div>
    </article>
  )
}

export default CurrentVideoPlayer