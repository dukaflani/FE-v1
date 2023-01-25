import Head from 'next/head';
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Image from "next/legacy/image";
import Linkify from 'react-linkify';
import numeral from 'numeral';
import { useRouter } from 'next/router';
import ShowMoreText from "react-show-more-text";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { FlagIcon, HandThumbDownIcon, HandThumbUpIcon, ShareIcon, StarIcon } from '@heroicons/react/24/outline'
import { HandThumbDownIcon as Unlikebtn, HandThumbUpIcon as Likebtn, ShareIcon as Sharebtn } from '@heroicons/react/24/solid'
import ApiButtonWithSpinner from './reuseable-components/ApiButtonWithSpinner'
import noAvatar from '../public/media/noimage.webp'
import { useAddCommentMutation, useVideoLikedQuery, useVideoUnlikedQuery, 
    useDeleteLikeMutation, useDeleteUnlikeMutation, useAddLikeMutation, 
    useAddUnlikeMutation, useCurrentVideoObjectsCountQuery } from '../redux/features/videos/videosApiSlice';
import MoreVideos from './MoreVideos';

export const YouTubeIframe = () => {
    const router = useRouter()
    const { v } = router.query

    const [videoYoutubeId, setVideoYoutubeId] = useState('')

    useEffect(() => {
        setVideoYoutubeId(v)
    }, [v])
    

    return (
            <div className='w-full'>
                <div className='aspect-w-16 aspect-h-9 bg-black'>
                 <iframe src={`https://www.youtube.com/embed/${videoYoutubeId}?loop=1&modestbranding=1&color=white&playlist=${videoYoutubeId}`} title="YouTube video player" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                </div>
            </div>
    )
}    



const CurrentVideoPlayer = () => {
    const router = useRouter()
    const { v, tab } = router.query
    const [fieldError, setFieldError] = useState('')
    const [likeErrors, setLikeErrors] = useState(null)
    const [linkCopied, setLinkCopied] = useState(false)
    const [numberOfLikes, setNumberOfLikes] = useState('') 
    const [numberOfUnlikes, setNumberOfUnlikes] = useState('')  
    const [is_liked, setIs_liked] = useState(false)
    const [is_unliked, setIs_unliked] = useState(false)  


    const { video } = useSelector((state) => state.videos)
    const { user } = useSelector((state) => state.auth)
    const fullName = `${user?.info?.first_name} ${user?.info?.last_name}`

    const { userProfile } = useSelector((state) => state.auth)
    const userProfileId = userProfile?.info ? userProfile?.info[0]?.id : 0
    const userProfilePicture = userProfile?.info ? userProfile?.info[0]?.profile_avatar : noAvatar

    const desc = video?.details?.description
    const hashTags = desc?.split(' ')
    const hashTagRegex = /#[a-z0-9_]+/gi 

    const videoLikedQuery = {
        video_id: video?.details?.id ? video?.details?.id : 0,
    }

    const videoObjectsCountQuery = {
        video_id: video?.details?.id ? video?.details?.id : 0,
    }


    const {data: isLiked } = useVideoLikedQuery(videoLikedQuery)
    const {data: isUnliked } = useVideoUnlikedQuery(videoLikedQuery)
    const {data: currentVideoObjectsCount } = useCurrentVideoObjectsCountQuery(videoObjectsCountQuery)
    const [ addComment, { isLoading } ] = useAddCommentMutation()
    const [ deleteLike ] = useDeleteLikeMutation()
    const [ deleteUnlike ] = useDeleteUnlikeMutation()
    const [ addLike ] = useAddLikeMutation()  
    const [ addUnlike ] = useAddUnlikeMutation()


    // let is_liked = !!isLiked?.data[0]?.id
    // let is_unliked = !!isUnliked?.data[0]?.id

    useEffect(() => {
        setNumberOfLikes(currentVideoObjectsCount?.data?.like_count)
        setNumberOfUnlikes(currentVideoObjectsCount?.data?.unlike_count)
        setIs_liked(!!isLiked?.data[0]?.id)  
        setIs_unliked(!!isUnliked?.data[0]?.id)
    }, [currentVideoObjectsCount?.data?.like_count, currentVideoObjectsCount?.data?.unlike_count, 
        isLiked?.data[0]?.id, isUnliked?.data[0]?.id])
    
     


    const videoUploadTime = new Date(video?.details?.date).toDateString()

    // let likesCountRaw = currentVideoObjectsCount?.data?.like_count
    let likesCountRaw = numberOfLikes ? numberOfLikes : 0
    let likesCount = ''
    likesCountRaw < 1000 || likesCountRaw % 10 === 0 ? likesCount = numeral(likesCountRaw).format('0a') :  likesCount = numeral(likesCountRaw).format('0.0a')
    
    // let unlikesCountRaw = currentVideoObjectsCount?.data?.unlike_count
    let unlikesCountRaw = numberOfUnlikes ? numberOfUnlikes : 0
    let unlikesCount = ''
    unlikesCountRaw < 1000 || unlikesCountRaw % 10 === 0 ? unlikesCount = numeral(unlikesCountRaw).format('0a') :  unlikesCount = numeral(unlikesCountRaw).format('0.0a')
    
    let numOfLikes = likesCount == 0 ? 0 : likesCount
    let numOfUnlikes = unlikesCount == 0 ? 0 : unlikesCount

    const view2 = currentVideoObjectsCount?.data?.views_count ? currentVideoObjectsCount?.data?.views_count : 0
          let view3 = numeral(view2).format('0,0')
          
    const commentCountRaw = currentVideoObjectsCount?.data?.comment_count ? currentVideoObjectsCount?.data?.comment_count : 0
          let commentCount = numeral(commentCountRaw).format('0,0')



        const deletelikeInfo = {
            "like_id": isLiked?.data[0]?.id      
        }

        const deleteUnlikeInfo = {
            "unlike_id": isUnliked?.data[0]?.id
        }

        const likeVideoInfo = {
            "video_id": video?.details?.id,
        }

        const unlikeVideoInfo = {
            "video_id": video?.details?.id,
        }



        const handleDeleteLike = async () => {
            try {
                setNumberOfLikes(prevNumberOfLikes => prevNumberOfLikes - 1)
                setIs_liked(false)
                await deleteLike(deletelikeInfo)
            } catch (error) {
                setLikeErrors(error)
            }
        }

        const handleDeleteUnlike = async () => {
            try {
                setNumberOfUnlikes(prevNumberOfUnlikes => prevNumberOfUnlikes - 1)
                setIs_unliked(false)
                await deleteUnlike(deleteUnlikeInfo)
            } catch (error) {
                setLikeErrors(error)
            }
        }

        const handleAddLike = async () => { 
            if (is_unliked) {
                try {
                    setNumberOfLikes(prevNumberOfLikes => prevNumberOfLikes + 1)
                    setNumberOfUnlikes(prevNumberOfUnlikes => prevNumberOfUnlikes - 1)
                    setIs_liked(true)
                    setIs_unliked(false)
                    await deleteUnlike(deleteUnlikeInfo)
                    await addLike(likeVideoInfo)
                } catch (error) {
                    setLikeErrors(error)
                }
                
            } else {
                try {
                    setNumberOfLikes(prevNumberOfLikes => prevNumberOfLikes + 1)
                    setIs_liked(true)
                    await addLike(likeVideoInfo)
                } catch (error) {
                    setLikeErrors(error)
                }
            }
        }

        const handleAddUnlike  = async () => {
            if (is_liked) {
                try {
                    setNumberOfLikes(prevNumberOfLikes => prevNumberOfLikes - 1)
                    setNumberOfUnlikes(prevNumberOfUnlikes => prevNumberOfUnlikes + 1)
                    setIs_liked(false)
                    setIs_unliked(true)
                    await deleteLike(deletelikeInfo)
                    await addUnlike(unlikeVideoInfo)
                } catch (error) {
                    setLikeErrors(error)
                }
                
            } else {
                try {
                    setNumberOfUnlikes(prevNumberOfUnlikes => prevNumberOfUnlikes + 1)
                    setIs_unliked(true)
                    await addUnlike(unlikeVideoInfo)
                } catch (error) {
                    setLikeErrors(error)
                }
            }
        }



  return (
    <>
    <Head>
        <title>{`${video?.details?.title} | ${video?.details?.stage_name} - Dukaflani`}</title>
        <meta name="title" content={`${video?.details?.title} | ${video?.details?.stage_name} - Dukaflani`} />
        <meta name="description" content="Home of music videos, products and merchandise promoted by your favorite musicians."/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums"/>

        
        <meta property="og:type" content="website"/>
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_NEXT_URL}/watch?v=${video?.details?.youtube_id}&tab=links`} />
        <meta property="og:title" content={`${video?.details?.title} | ${video?.details?.stage_name} - Dukaflani`} />
        <meta property="og:description" content="Home of music videos, products and merchandise promoted by your favorite musicians."/>
        <meta property="og:image" content={video?.details?.thumbnail} />

        
        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content={`${process.env.NEXT_PUBLIC_NEXT_URL}/watch?v=${video?.details?.youtube_id}&tab=links`} />
        <meta property="twitter:title" content={`${video?.details?.title} | ${video?.details?.stage_name} - Dukaflani`} />
        <meta property="twitter:description" content="Home of music videos, products and merchandise promoted by your favorite musicians."/>
        <meta property="twitter:image" content={video?.details?.thumbnail} />  
      </Head>


        <article className='pt-20 scroll-smooth' id='currentVideo'>
            <div>
                <YouTubeIframe/>
                <div className='w-full uppercase text-sm text-blue-600 pt-2'>{video?.details?.genre_title}</div>
                <h1 className='w-full font-semibold leading-4 text-gray-800 tracking-tight text-xl pt-1 pb-2'>{video?.details?.title}</h1>
                <div className='w-full flex flex-col items-start justify-between py-2 space-y-1'>
                    <div className='text-sm font-semibold tracking-tight text-gray-700'> {view3} {view3 == 1 ? 'view' : 'views'} &bull; {videoUploadTime && 'Added'} {videoUploadTime}</div>
                    <div className='flex justify-end items-center pr-5'>
                        <div className="inline-flex rounded-md" role="group">
                        {is_liked ? <button onClick={handleDeleteLike} type="button" className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-gray-100 rounded-l-lg border-r border-gray-300 hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                            <Likebtn className="mr-2 w-5 h-5" /> 
                            {numOfLikes}
                        </button>
                        :
                        <button onClick={handleAddLike} type="button" className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-gray-100 rounded-l-lg border-r border-gray-300 hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                            <HandThumbUpIcon className="mr-2 w-5 h-5" />
                            {likesCount}
                        </button>}
                        {is_unliked ? <button onClick={handleDeleteUnlike} type="button" className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-gray-100 rounded-r-md hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                            <Unlikebtn className="mr-2 w-5 h-5" />
                            {unlikesCount}
                        </button>
                        :
                        <button onClick={handleAddUnlike} type="button" className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-gray-100 rounded-r-md hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                            <HandThumbDownIcon className="mr-2 w-5 h-5" />
                            {numOfUnlikes}
                        </button>}
                        </div>
                        <div className='ml-14'>
                            <CopyToClipboard
                                text={`${process.env.NEXT_PUBLIC_NEXT_URL}/watch?v=${v}&tab=${tab}`}
                                onCopy={() => setLinkCopied(true)}
                            >
                                <button type="button" className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-gray-100 rounded-lg border-gray-300 hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                                    <ShareIcon className="mr-2 w-5 h-5" />
                                    {linkCopied ? "Copied" : "Share"}
                                </button>
                            </CopyToClipboard>
                        </div>
                        <div className='ml-2'>
                            <button type="button" className="inline-flex cursor-not-allowed items-center py-2 px-4 text-sm font-medium text-gray-300 bg-gray-100 rounded-lg border-gray-300 hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                                <StarIcon className="mr-2 w-5 h-5" />
                                Vote
                            </button>
                        </div>
                        <div className='ml-2'>
                            <button type="button" className="inline-flex cursor-not-allowed items-center py-2 px-4 text-sm font-medium text-gray-300 bg-gray-100 rounded-lg border-gray-300 hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                                <FlagIcon className="mr-2 w-5 h-5" />
                                Report
                            </button>
                        </div>
                    </div>
                </div>
                <div className='w-full text-base leading-5 tracking-tight text-gray-700 flex mt-2'>
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
                <div className='w-full text-sm font-bold tracking-tight text-gray-800 mt-4 uppercase'>More Videos:</div>
                <hr className='mt-1 mb-10'/>
                <div className='mt-10 mb-36'>
                    <MoreVideos/>
                </div>
            </div>
        </article>
    </>
  )
}

export default CurrentVideoPlayer