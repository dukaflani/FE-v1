import { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Image from "next/legacy/image";
import Linkify from 'react-linkify';
import numeral from 'numeral';
import { useRouter } from 'next/router';
import ShowMoreText from "react-show-more-text";
import { formatDistanceStrict } from 'date-fns';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { HandThumbDownIcon, HandThumbUpIcon, ShareIcon, FlagIcon, StarIcon, ChevronDownIcon, XMarkIcon,
PaperAirplaneIcon } from '@heroicons/react/24/outline'
import { HandThumbDownIcon as Unlikebtn, HandThumbUpIcon as Likebtn, ShareIcon as Sharebtn, CheckBadgeIcon } from '@heroicons/react/24/solid'
import noAvatar from '../public/media/noimage.webp'
import nopic from "../public/media/noimage.webp"
import VideoCommentsMobile from './VideoCommentsMobile';
import { useAddCommentMutation, useVideoLikedQuery, useVideoUnlikedQuery, 
    useDeleteLikeMutation, useDeleteUnlikeMutation, useAddLikeMutation, 
    useAddUnlikeMutation, useCurrentVideoObjectsCountQuery, useFetchCommentsQuery, useFetchCurrentVideoProfileQuery, useProfileLikedQuery, useJoinFanbaseMutation, useLeaveFanbaseMutation } from '../redux/features/videos/videosApiSlice';
import { toggleSignInModalOpen } from '../redux/features/navigation/navigationSlice';
import AdvertisementMobile from './AdvertisementMobile';
import ItemsTabNavigationMobile from './ItemsTabNavigationMobile';
import ProductCardMobile from './ProductCardMobile';
import StreamingLinksMobile from './StreamingLinksMobile';
import LyricsPageMobile from './LyricsPageMobile';
import SkizaTunesPageMobile from './SkizaTunesPageMobile';
import AlbumPageMobile from './AlbumPageMobile';
import EventsPageMobile from './EventsPageMobile';

const CurrentVideoPlayer = ({ navbarVisisble }) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const { v, tab } = router.query
    const [commentBody, setCommentBody] = useState('')
    const [createdComment, setCreatedComment] = useState(null)
    const [commentErrors, setCommentErrors] = useState(null)
    const [fieldError, setFieldError] = useState('')
    const [likeErrors, setLikeErrors] = useState(null)
    const [linkCopied, setLinkCopied] = useState(false)
    const [showDescription, setShowDescription] = useState(false)
    const [showComments, setShowComments] = useState(false)
    const [showProfile, setShowProfile] = useState(false)
    const [fanbaseErrors, setFanbaseErrors] = useState(null)


    const { video } = useSelector((state) => state.videos)
    const { user } = useSelector((state) => state.auth)
    const fullName = `${user?.info?.first_name} ${user?.info?.last_name}`

    const { userProfile } = useSelector((state) => state.auth)
    const userProfileId = userProfile?.info ? userProfile?.info[0]?.id : 0
    const userProfilePicture = userProfile?.info ? userProfile?.info[0]?.profile_avatar : noAvatar
    const currentVideoProfilePic = video?.details?.profile_avatar ? video?.details?.profile_avatar : noAvatar
    const currentVideoProfileId = video?.details?.customuserprofile

    const desc = video?.details?.description
    const hashTags = desc?.split(' ')
    const hashTagRegex = /#[a-z0-9_]+/gi 

    const videoLikedQuery = {
        video_id: video?.details?.id ? video?.details?.id : 0,
    }

    const videoObjectsCountQuery = {
        video_id: video?.details?.id ? video?.details?.id : 0,
    }

    const queryVideoCommentsParams = {
        video_id: video?.details?.id ? video?.details?.id : 0,
    }

    const videoProfileQueryParams = {
        profile_id: currentVideoProfileId ? currentVideoProfileId : 0,
    }

    
    
    const {data: videoProfile} = useFetchCurrentVideoProfileQuery(videoProfileQueryParams)
    const {data: videoProfileLiked } = useProfileLikedQuery(videoProfileQueryParams)
    const { data: comments } = useFetchCommentsQuery(queryVideoCommentsParams)
    const {data: isLiked } = useVideoLikedQuery(videoLikedQuery)
    const {data: isUnliked } = useVideoUnlikedQuery(videoLikedQuery)
    const {data: currentVideoObjectsCount } = useCurrentVideoObjectsCountQuery(videoObjectsCountQuery)
    const [ addComment, { isLoading } ] = useAddCommentMutation()
    const [ deleteLike ] = useDeleteLikeMutation()
    const [ deleteUnlike ] = useDeleteUnlikeMutation()
    const [ addLike ] = useAddLikeMutation()  
    const [ addUnlike ] = useAddUnlikeMutation()
    const [ joinFanbase ] = useJoinFanbaseMutation() 
    const [ leaveFanbase ] = useLeaveFanbaseMutation()

    const is_liked = !!isLiked?.data[0]?.id
    const is_unliked = !!isUnliked?.data[0]?.id
    const is_loggedin = !!user?.info?.id
    const is_a_fan = !!videoProfileLiked?.data[0]?.id
    


    const videoUploadTime = new Date(video?.details?.date).toDateString()

    const likesCountRaw = currentVideoObjectsCount?.data?.like_count
    const likesCountLong = numeral(likesCountRaw).format('0,0')
    let likesCount = ''
    likesCountRaw < 1000 || likesCountRaw % 10 === 0 ? likesCount = numeral(likesCountRaw).format('0a') :  likesCount = numeral(likesCountRaw).format('0.0a')
    
    const unlikesCountRaw = currentVideoObjectsCount?.data?.unlike_count
    let unlikesCount = ''
    unlikesCountRaw < 1000 || unlikesCountRaw % 10 === 0 ? unlikesCount = numeral(unlikesCountRaw).format('0a') :  unlikesCount = numeral(unlikesCountRaw).format('0.0a')
    
    const numOfLikes = likesCount == 0 ? 0 : likesCount
    const numOfUnlikes = unlikesCount == 0 ? 0 : unlikesCount

    const view2 = currentVideoObjectsCount?.data?.views_count
    let view3 = numeral(view2).format('0,0')
    let viewsCountShort = ''
    view2 < 1000 || view2 % 10 === 0 ? viewsCountShort = numeral(view2).format('0a') :  viewsCountShort = numeral(view2).format('0.0a')
          
    const commentCountRaw = currentVideoObjectsCount?.data?.comment_count
    let commentCount = numeral(commentCountRaw).format('0,0')

    const timeOfVideoUpload = video?.details?.date ? video?.details?.date : new Date()

    const fanbaseCountRaw = videoProfile?.data?.fanbase_count
    let fanbaseCountShort = ''
    fanbaseCountRaw < 1000 || fanbaseCountRaw % 10 === 0 ? fanbaseCountShort = numeral(fanbaseCountRaw).format('0a') :  fanbaseCountShort = numeral(fanbaseCountRaw).format('0.0a')

    
    const videoUploadTimeShort = formatDistanceStrict(
        new Date(timeOfVideoUpload),
        new Date(),
        {
          addSuffix: true,
        },
      );



    const joinDetails = {
    "customuserprofile_id": video?.details?.customuserprofile
    }

    const leaveDetails = {
        "fanbase_id": videoProfileLiked?.data[0]?.id
    }

    const handleJoin = async () => {
    try {
        await joinFanbase(joinDetails)
    } catch (error) {
        setFanbaseErrors(error)
    }

    }

    const handleLeave = async () => {
        try {
            await leaveFanbase(leaveDetails)
        } catch (error) {
            setFanbaseErrors(error)
        }
    }


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

        const handleAddCommentByEnterKey = async (e) => {
            if (e.key === 'Enter') {
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
          }


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
                await deleteLike(deletelikeInfo)
            } catch (error) {
                setLikeErrors(error)
            }
        }

        const handleDeleteUnlike = async () => {
            try {
                await deleteUnlike(deleteUnlikeInfo)
            } catch (error) {
                setLikeErrors(error)
            }
        }

        const handleAddLike = async () => { 
            if (is_unliked) {
                try {
                    await deleteUnlike(deleteUnlikeInfo)
                    await addLike(likeVideoInfo)
                } catch (error) {
                    setLikeErrors(error)
                }
                
            } else {
                try {
                    await addLike(likeVideoInfo)
                } catch (error) {
                    setLikeErrors(error)
                }
            }
        }

        const handleAddUnlike  = async () => {
            if (is_liked) {
                try {
                    await deleteLike(deletelikeInfo)
                    await addUnlike(unlikeVideoInfo)
                } catch (error) {
                    setLikeErrors(error)
                }
                
            } else {
                try {
                    await addUnlike(unlikeVideoInfo)
                } catch (error) {
                    setLikeErrors(error)
                }
            }
        }
      



  return (
    <>
    <article className='h-full mx-auto'>
        <div className='sticky top-0'>
            <div className='aspect-w-16 aspect-h-9 bg-black'>
                <iframe src={`https://www.youtube.com/embed/${video?.details?.youtube_id}?loop=1&modestbranding=1&color=white&playlist=${video?.details?.youtube_id}`} title="YouTube video player" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
             </div>
            {!navbarVisisble && <ItemsTabNavigationMobile/>}
            <div>
                
            </div>
        </div>
        <div className='bg-white pb-10'>
            <AdvertisementMobile/>
            <div className='px-2'>
                <div onClick={() => setShowDescription(true)} className='tracking-tight font-semibold text-gray-800 text-base md:text-lg landscape:text-lg line-clamp-2 pr-3 pt-2 leading-4'>{video?.details?.title}</div>
                <div onClick={() => setShowDescription(true)} className='text-xs space-x-2 text-gray-600'>
                    <span>{viewsCountShort} {viewsCountShort == 1 ? "view" : "views"}</span>
                    <span>{videoUploadTimeShort}</span>
                    <span className='uppercase text-blue-500'>{video?.details?.genre_title}</span>
                    <span className='font-semibold text-gray-700'>more...</span>
                </div>
                <div className='flex items-center space-x-1 my-2 md:my-3 landscape:my-3'>
                    <div onClick={() => setShowProfile(true)} className="h-8 w-8 rounded-full md:h-10 md:w-10 landscape:h-10 landscape:w-10 bg-gray-200">
                    {currentVideoProfilePic && <picture>
                        <img
                            src={!currentVideoProfilePic ? noAvatar : currentVideoProfilePic}
                            alt={video?.details?.stage_name}
                            className="h-8 w-8 rounded-full md:h-10 md:w-10 landscape:h-10 landscape:w-10 bg-gray-200"
                        />
                    </picture>}
                    </div>
                    {!is_loggedin && <div onClick={() => router.push("/account/login")} className='flex-1 flex items-center'>
                        <div className='font-semibold text-gray-800 text-sm pr-1 line-clamp-1'>{video?.details?.stage_name}</div>
                        {video?.details?.verified && <CheckBadgeIcon className='h-6 w-6 text-blue-500 -ml-1.5 pb-2'/>}
                        {!is_loggedin && <div className='flex-1 text-xs text-gray-600 px-2'>Login to view fanbase</div>}
                        {is_loggedin && <div className='flex-1 text-xs text-gray-600 px-2'>{fanbaseCountShort}</div>}
                    </div>}
                    {is_loggedin && <div onClick={() => setShowProfile(true)} className='flex-1 flex items-center'>
                        <div className='font-semibold text-gray-800 text-sm pr-1 line-clamp-1'>{video?.details?.stage_name}</div>
                        {video?.details?.verified && <CheckBadgeIcon className='h-6 w-6 text-blue-500 -ml-1.5 pb-2'/>}
                        {!is_loggedin && <div className='flex-1 text-xs text-gray-600 px-2'>Login to view fanbase</div>}
                        {is_loggedin && <div className='flex-1 text-xs text-gray-600 px-2'>{fanbaseCountShort}</div>}
                    </div>}
                    {is_loggedin && <div>
                        {is_a_fan ? <button onClick={handleLeave} className='uppercase text-xs tracking-tight font-semibold p-1 border border-gray-800 rounded-lg'>leave</button>
                        :
                        <button onClick={handleJoin}  className='uppercase text-xs bg-gray-800 text-white tracking-tight font-semibold p-1 border border-gray-800 rounded-lg'>Join</button>}
                        </div>}
                    {!is_loggedin && <div>
                        <button onClick={() => router.push("/account/login")} className='uppercase text-xs bg-gray-800 text-white tracking-tight font-semibold p-1 border border-gray-800 rounded-lg'>Login</button>
                        </div>}
                </div>
                <div className='flex space-x-3 overflow-x-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent'>
                <div className='flex justify-end items-center'>
                    <div className="inline-flex rounded-md" role="group">
                    {is_liked ? <button onClick={handleDeleteLike} type="button" className="inline-flex items-center py-1 px-2 text-sm font-medium text-gray-900 bg-gray-50 rounded-l-lg border-r border-gray-300 hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                        <Likebtn className="mr-2 w-4 h-4 md:w-5 md:h-5 landscape:w-5 landscape:h-5" /> 
                        {numOfLikes}
                    </button>
                    :
                    <button onClick={handleAddLike} type="button" className="inline-flex items-center py-1 px-2 text-xs md:text-sm landscape:text-sm font-medium text-gray-900 bg-gray-50 rounded-l-lg border-r border-gray-300 hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                        <HandThumbUpIcon className="mr-2 w-4 h-4 md:w-5 md:h-5 landscape:w-5 landscape:h-5" />
                        {likesCount}
                    </button>}
                    {is_unliked ? <button onClick={handleDeleteUnlike} type="button" className="inline-flex items-center py-1 px-2 text-sm font-medium text-gray-900 bg-gray-50 rounded-r-md hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                        <Unlikebtn className="mr-2 w-4 h-4 md:w-5 md:h-5 landscape:w-5 landscape:h-5" />
                        {unlikesCount}
                    </button>
                    :
                    <button onClick={handleAddUnlike} type="button" className="inline-flex items-center py-1 px-2 text-xs md:text-sm landscape:text-sm font-medium text-gray-900 bg-gray-50 rounded-r-md hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                        <HandThumbDownIcon className="mr-2 w-4 h-4 md:w-5 md:h-5 landscape:w-5 landscape:h-5" />
                        {numOfUnlikes}
                    </button>}
                    </div>
                    <div className='ml-5'>
                        <CopyToClipboard
                            text={`${process.env.NEXT_PUBLIC_NEXT_URL}/watch?v=${v}&tab=${tab}`}
                            onCopy={() => setLinkCopied(true)}
                        >
                            <button type="button" className="inline-flex items-center py-1.5 md:py-1 landscape:py-1 px-2 text-xs md:text-sm landscape:text-sm font-medium text-gray-900 bg-gray-50 rounded-lg border-gray-300 hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                                <ShareIcon className="mr-2 w-4 h-4 md:w-5 md:h-5 landscape:w-5 landscape:h-5" />
                                {linkCopied ? "Copied" : "Share"}
                            </button>
                        </CopyToClipboard>
                    </div>
                </div>
                    <div>
                        <button type="button" className="inline-flex items-center py-1.5 md:py-1 landscape:py-1 px-2 text-xs md:text-sm landscape:text-sm font-medium text-gray-300 bg-gray-50 rounded-lg border-gray-300 hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                            <StarIcon className="mr-2 w-4 h-4 md:w-5 md:h-5 landscape:w-5 landscape:h-5" />
                            Vote
                        </button>
                    </div>
                    <div>
                        <button type="button" className="inline-flex items-center py-1.5 md:py-1 landscape:py-1 px-2 text-xs md:text-sm landscape:text-sm font-medium text-gray-300 bg-gray-50 rounded-lg border-gray-300 hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                            <FlagIcon className="mr-2 w-4 h-4 md:w-5 md:h-5 landscape:w-5 landscape:h-5" />
                            Report
                        </button>
                    </div>
                </div>
                <div onClick={() => setShowComments(true)} className='bg-gray-50 p-2 my-5 rounded-lg'>
                    <p className='text-sm font-medium text-gray-800 tracking-tight'>Comments &nbsp; <span className='text-xs text-gray-600 font-normal tracking-tight'>{commentCount}</span></p>
                    <div className='flex items-start'>
                        <div className='flex-1 pr-3 flex items-start space-x-2'>
                            {is_loggedin && <div>
                                {comments?.data?.length > 0  && <picture>
                                    <img
                                        src={comments?.data[0]?.avatar ? comments?.data[0]?.avatar : noAvatar}
                                        alt={comments?.data[0]?.name ? comments?.data[0]?.name : '' }
                                        className="h-7 w-7 rounded-full md:h-9 md:w-9 landscape:h-9 landscape:w-9 bg-gray-200"
                                    />
                                </picture>}
                                {comments?.data?.length == 0  && <picture>
                                    <img
                                        src={userProfilePicture}
                                        alt="Artist avatar"
                                        className="h-7 w-7 rounded-full md:h-9 md:w-9 landscape:h-9 landscape:w-9 bg-gray-200"
                                    />
                                </picture>}
                            </div>}
                            {!is_loggedin && <div
                                        className="h-7 w-7 rounded-full md:h-9 md:w-9 landscape:h-9 landscape:w-9 bg-gray-200"
                                        onClick={() => router.push("/account/login")}
                            >     
                                </div>}
                            {comments?.data?.length > 0 ? <div className='flex-1 line-clamp-2 text-xs leading-4 text-gray-900'>{comments?.data?.length > 0 ? comments?.data[0]?.body : ''}</div>
                            :
                            <span className='flex-1 bg-gray-200 rounded-full text-xs leading-4 text-gray-900 py-1 px-2'>{is_loggedin ? "Add Comment..." : "Login to Comment..."}</span>}
                        </div>
                        <div>
                            <ChevronDownIcon className='h-4 w-4'/>
                        </div>
                    </div>
                </div>
                {navbarVisisble && <ItemsTabNavigationMobile/>}
                <div className='py-5 bg-gray-50 rounded-lg'>
                {
                {
                    "links" : <StreamingLinksMobile/>,
                    "product" : <ProductCardMobile title={video?.details?.title} />,
                    "lyrics" : <LyricsPageMobile/>,
                    "skiza" : <SkizaTunesPageMobile/>,
                    "album" : <AlbumPageMobile/>,
                    "events" : <EventsPageMobile />,
                }[tab]
            }
                </div>
            </div>
        </div>
    </article>
    {/* Vide Description */}
    <div className={showDescription ? 'bg-white p-2 fixed bottom-0 left-0 right-0 border-t rounded-t-lg h-[70%]' : 'hidden'}>
        <nav className='relative pt-10'>
            <div className='flex items-center justify-between px-2 border-b pb-2 absolute top-0 left-0 right-0'>
                <span className='font-medium tracking-tight'>Video Info</span>
                <span onClick={() => setShowDescription(false)}>
                    <XMarkIcon className='w-4 h-4'/>
                </span>
            </div>
            <div className='max-h-[35rem] overflow-y-auto pb-20 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent'>
                <ul className='flex flex-col items-start justify-center mx-auto max-w-sm text-sm space-y-5 pb-32 pt-5'>
                    <li  className='flex items-center justify-evenly w-full'>
                        <div className="flex flex-col items-center">
                            <span className="text-sm font-bold leading-4 tracking-tight text-gray-800 line-clamp-3">{view3}</span>
                            <span className="text-gray-600 text-xs line-clamp-1">{view3 == 1 ? 'View' : 'Views'}</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-sm font-bold leading-4 tracking-tight text-gray-800 line-clamp-3">{likesCountLong ? likesCountLong : 0}</span>
                            <span className="text-gray-600 text-xs line-clamp-1">{likesCountLong == 1 ? "Like" : "Likes"}</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-sm font-bold leading-4 tracking-tight text-gray-800 line-clamp-3">{videoUploadTime}</span>
                            <span className="text-gray-600 text-xs line-clamp-1">{videoUploadTime && 'Added'}</span>
                        </div>
                    </li>
                    <li  className='flex items-center justify-center space-x-2 w-full pl-2 pr-5'>
                        <span className=" border-b w-full">Description:</span>
                    </li>
                    <li  className='flex flex-col space-y-2 items-start justify-start space-x-2 w-full pl-2 pr-5'>
                        <div className='w-full' >
                            <ul className="space-y-3 w-full">
                                <li>
                                    <div className="text-base leading-4 tracking-tight text-gray-600 whitespace-pre-wrap">
                                        <Linkify componentDecorator={(decoratedHref, decoratedText, key) => ( <a target="blank" className='text-blue-600 -mb-1 w-56 inline-block overflow-hidden overflow-ellipsis whitespace-nowrap'  href={decoratedHref} key={key}> {decoratedText} </a> )} >
                                        {hashTags?.map((hashTag, i) => {
                                                return hashTag.match(hashTagRegex) ? (
                                                    <div key={i}><span className='text-blue-600'>{hashTag}</span> {' '}</div>
                                                ) : hashTag + ' '
                                            })}
                                        </Linkify>   
                                    </div>
                                </li>
                                <li>
                                    <footer className='text-xs flex items-center justify-center pt-5 pb-2 text-gray-500'>&copy; {new Date().getFullYear()} Jidraff Gathura</footer>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
    {/* Video Comments */}
    <div className={showComments ? 'bg-white p-2 fixed bottom-0 left-0 right-0 border-t rounded-t-lg h-[70%]' : 'hidden'}>
        <nav className='relative pt-10'>
            <div className='flex items-center justify-between px-2 border-b pb-2 absolute top-0 left-0 right-0'>
                <span className='font-medium tracking-tight'>Comments</span>
                <span onClick={() => setShowComments(false)}>
                    <XMarkIcon className='w-4 h-4'/>
                </span>
            </div>
            <div className='max-h-[35rem] overflow-y-auto pb-20 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent'>
                <ul className='flex flex-col items-start justify-center mx-auto max-w-sm text-sm space-y-5 pb-32 pt-5'>
                <li className='w-full flex items-center justify-center space-x-2'>
                {is_loggedin && <picture>
                    <img
                        src={userProfilePicture}
                        alt={`${user?.info?.stage_name} profile picture`}
                        className="h-10 w-10 rounded-full md:h-10 md:w-10 landscape:h-10 landscape:w-10 bg-gray-200"
                    />
                </picture>}
                {!is_loggedin && <div
                    className="h-10 w-10 rounded-full md:h-10 md:w-10 landscape:h-10 landscape:w-10 bg-gray-200"
                    onClick={() => router.push("/account/login")}
                >
                </div>}
                <div className='flex-1 pr-2 bg-gray-200 rounded-full flex items-center justify-start'>
                    <input 
                        placeholder={user?.info ? user?.info?.stage_name ? `Comment as ${user?.info?.stage_name} ...` : `Comment as ${fullName}` : "Login to comment"} 
                        className='flex-1 text-sm rounded-full placeholder:text-sm bg-gray-200 border-transparent focus:border-transparent  focus:outline-none ring-transparent focus:ring-transparent py-1' 
                        type="text" 
                        value={commentBody}
                        onChange={(e) => setCommentBody(e.target.value)}
                        onKeyDown={handleAddCommentByEnterKey}
                    />
                    {commentBody && <span onClick={handleAddComment} ><PaperAirplaneIcon className='h-5 w-5 text-blue-600'/></span>}
                </div>
                </li>
                    <li  className='flex items-center justify-center space-x-2 w-full pl-2 pr-5'>
                        <span className=" border-b w-full">{commentCount}  {commentCount == 1 ? 'Comment' : 'Comments'}</span>
                    </li>
                    <li  className='flex flex-col space-y-2 items-start justify-start space-x-2 w-full pl-2 pr-5'>
                        <div className='w-full' >
                            <ul className="space-y-3 w-full">
                                <li>
                                    <div>
                                        <VideoCommentsMobile videoId={video?.details?.id} />
                                    </div>
                                </li>
                                <li>
                                    <footer className='text-xs flex items-center justify-center pt-5 pb-2 text-gray-500'>&copy; {new Date().getFullYear()} Jidraff Gathura</footer>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </div>

    {/* Artist Profile */}
    <div className={showProfile ? 'bg-white p-2 fixed bottom-0 left-0 right-0 border-t rounded-t-lg h-[70%]' : 'hidden'}>
        <nav className='relative pt-10'>
            <div className='flex items-center justify-between px-2 border-b pb-2 absolute top-0 left-0 right-0'>
                <span className='font-medium tracking-tight'>Profile</span>
                <span onClick={() => setShowProfile(false)}>
                    <XMarkIcon className='w-4 h-4'/>
                </span>
            </div>
            <div className='max-h-[35rem] overflow-y-auto pb-20 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent'>
                <ul className='flex flex-col items-start justify-center mx-auto max-w-sm text-sm space-y-5 pb-32 pt-5'>
                <li className='w-full flex items-center justify-center space-x-2'>
                {currentVideoProfilePic && <picture>
                        <img
                            src={!currentVideoProfilePic ? noAvatar : currentVideoProfilePic}
                            alt={video?.details?.stage_name}
                            className="h-10 w-10 rounded-full md:h-10 md:w-10 landscape:h-10 landscape:w-10 bg-gray-200"
                        />
                    </picture>}
                <div className='flex-1 flex items-start justify-center flex-col'>
                    <div className='flex'>
                        <span className='text-base font-medium tracking-tight text-gray-800'>{videoProfile?.data?.stage_name}</span>
                        {videoProfile?.data?.is_verified == 'True' && <CheckBadgeIcon className='h-6 w-6 text-blue-500 pb-2 -ml-0.5'/>}
                    </div>
                   <span className='text-sm tracking-tight text-gray-600 -mt-1'>{videoProfile?.data?.nationality.split(",")[1]}</span>
                </div>
                </li>
                    <li  className='flex items-center justify-center space-x-2 w-full pl-2 pr-5'>
                        <span className=" border-b w-full">Info</span>
                    </li>
                    <li  className='flex flex-col space-y-2 items-start justify-start space-x-2 w-full pl-2 pr-5'>
                        <div className='w-full' >
                            <ul className="space-y-3 w-full">
                                <li>
                                    <div>
                                        <span className='text-base font-bold text-gray-800 tracking-tight'>About</span>
                                    </div>
                                    <div>
                                        <span className='text-xs text-gray-500 tracking-tight'>Member Since {new Date(videoProfile?.data?.date).toDateString()}</span>
                                    </div>
                                    <div>
                                    <ShowMoreText
                                        lines={3}
                                        more="Show more"
                                        less="Show less"
                                        className="content-css leading-4 tracking-tight text-gray-800 whitespace-pre-wrap"
                                        anchorClass="text-xs tracking-tight uppercase text-blue-700 ml-1"
                                        expanded={false}
                                        truncatedEndingComponent={"... "}
                                    >
                                        {videoProfile?.data?.about}
                                    </ShowMoreText>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <span className='text-base font-bold text-gray-800 tracking-tight'>Account</span>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                            <div>
                                                <div>
                                                    <span className='text-xs text-gray-500 tracking-tight'>Videos</span>
                                                </div>
                                                <div>
                                                    <p className='leading-4 tracking-tight'>{numeral(videoProfile?.data?.video_count).format('0,0')}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    <span className='text-xs text-gray-500 tracking-tight'>Products</span>
                                                </div>
                                                <div>
                                                    <p className='leading-4 tracking-tight'>{numeral(videoProfile?.data?.product_count).format('0,0')}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    <span className='text-xs text-gray-500 tracking-tight'>Events</span>
                                                </div>
                                                <div>
                                                    <p className='leading-4 tracking-tight'>{numeral(videoProfile?.data?.events_count).format('0,0')}</p>
                                                </div>
                                            </div>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <span className='text-base font-bold text-gray-800 tracking-tight'>For Business</span>
                                    </div>
                                    <div>
                                        <span className='text-xs text-gray-500 tracking-tight'>Management</span>
                                    </div>
                                    <div>
                                        <p className='leading-4 tracking-tight'>{videoProfile?.data?.management}</p>
                                    </div>
                                    <div>
                                        <span className='text-xs text-gray-500 tracking-tight'>Contact</span>
                                    </div>
                                    <div>
                                        <p className='leading-4 tracking-tight'>{videoProfile?.data?.booking_contact}</p>
                                    </div>
                                    <div>
                                        <span className='text-xs text-gray-500 tracking-tight'>Email</span>
                                    </div>
                                    <div>
                                        <p className='leading-4 tracking-tight mb-3'>{videoProfile?.data?.booking_email}</p>
                                    </div>
                                    <div>
                                        <span className='text-base font-bold text-gray-800 tracking-tight'>Social Media</span>
                                    </div>
                                    {videoProfile?.data?.facebook && <a href={videoProfile?.data?.facebook} rel="noopener" target="_blank">
                                        <p className='leading-4 tracking-tight text-blue-500'>{videoProfile?.data?.facebook}</p>
                                    </a>}
                                    {videoProfile?.data?.twitter && <a href={videoProfile?.data?.twitter} rel="noopener" target="_blank">
                                        <p className='leading-4 tracking-tight mt-2 text-blue-500'>{videoProfile?.data?.twitter}</p>
                                    </a>}
                                    {videoProfile?.data?.instagram && <a href={videoProfile?.data?.instagram} rel="noopener" target="_blank">
                                        <p className='leading-4 tracking-tight mt-2 text-blue-500'>{videoProfile?.data?.instagram}</p>
                                    </a>}
                                    {videoProfile?.data?.tiktok && <a href={videoProfile?.data?.tiktok} rel="noopener" target="_blank">
                                        <p className='leading-4 tracking-tight mt-2 text-blue-500'>{videoProfile?.data?.tiktok}</p>
                                    </a>}
                                   {videoProfile?.data?.youtube_channel && <a href={videoProfile?.data?.youtube_channel} rel="noopener" target="_blank">
                                        <p className='leading-4 tracking-tight mt-2 text-blue-500'>{videoProfile?.data?.youtube_channel}</p>
                                    </a>}
                                </li>
                                <li>
                                    <footer className='text-xs flex items-center justify-center pt-5 pb-2 text-gray-500'>&copy; {new Date().getFullYear()} Jidraff Gathura</footer>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </div>   
    </>
  )
}

export default CurrentVideoPlayer