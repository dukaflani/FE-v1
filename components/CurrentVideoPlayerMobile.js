import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Image from "next/legacy/image";
import Linkify from 'react-linkify';
import numeral from 'numeral';
import { useRouter } from 'next/router';
import ShowMoreText from "react-show-more-text";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { HandThumbDownIcon, HandThumbUpIcon, ShareIcon, FlagIcon, StarIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import { HandThumbDownIcon as Unlikebtn, HandThumbUpIcon as Likebtn, ShareIcon as Sharebtn } from '@heroicons/react/24/solid'
import ApiButtonWithSpinner from './reuseable-components/ApiButtonWithSpinner'
import noAvatar from '../public/media/noimage.webp'
import thumbnail from '../public/media/dukaflani-player-default.png'
import VideoComments from './VideoComments';
import { useAddCommentMutation, useVideoLikedQuery, useVideoUnlikedQuery, 
    useDeleteLikeMutation, useDeleteUnlikeMutation, useAddLikeMutation, 
    useAddUnlikeMutation, useCurrentVideoObjectsCountQuery } from '../redux/features/videos/videosApiSlice';
import AdvertisementMobile from './AdvertisementMobile';
import ItemsTabNavigationMobile from './ItemsTabNavigationMobile';
import ProductCardMobile from './ProductCardMobile';
import StreamingLinksMobile from './streamingLinksMobile';
import LyricsPageMobile from './LyricsPageMobile';
import SkizaTunesPageMobile from './SkizaTunesPageMobile';
import AlbumPageMobile from './AlbumPageMobile';
import EventsPageMobile from './EventsPageMobile';

const CurrentVideoPlayer = ({ navbarVisisble }) => {
    const router = useRouter()
    const { v, tab } = router.query
    const [commentBody, setCommentBody] = useState('')
    const [createdComment, setCreatedComment] = useState(null)
    const [commentErrors, setCommentErrors] = useState(null)
    const [fieldError, setFieldError] = useState('')
    const [likeErrors, setLikeErrors] = useState(null)
    const [linkCopied, setLinkCopied] = useState(false)


    const { video } = useSelector((state) => state.videos)
    const { user } = useSelector((state) => state.auth)
    const fullName = `${user?.info?.first_name} ${user?.info?.last_name}`

    const { userProfile } = useSelector((state) => state.auth)
    const userProfileId = userProfile?.info ? userProfile?.info[0]?.id : 0

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


    const is_liked = !!isLiked?.data[0]?.id
    const is_unliked = !!isUnliked?.data[0]?.id
    


    const videoUploadTime = new Date(video?.details?.date).toDateString()

    const likesCountRaw = currentVideoObjectsCount?.data?.like_count
    let likesCount = ''
    likesCountRaw < 1000 || likesCountRaw % 10 === 0 ? likesCount = numeral(likesCountRaw).format('0a') :  likesCount = numeral(likesCountRaw).format('0.0a')
    
    const unlikesCountRaw = currentVideoObjectsCount?.data?.unlike_count
    let unlikesCount = ''
    unlikesCountRaw < 1000 || unlikesCountRaw % 10 === 0 ? unlikesCount = numeral(unlikesCountRaw).format('0a') :  unlikesCount = numeral(unlikesCountRaw).format('0.0a')
    
    const numOfLikes = likesCount == 0 ? 0 : likesCount
    const numOfUnlikes = unlikesCount == 0 ? 0 : unlikesCount

    const view2 = currentVideoObjectsCount?.data?.views_count
          let view3 = numeral(view2).format('0,0')
          
    const commentCountRaw = currentVideoObjectsCount?.data?.comment_count
          let commentCount = numeral(commentCountRaw).format('0,0')




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
            <div className='aspect-w-16 aspect-h-9 bg-gray-100'>
            {/* <iframe width="100%" height="100%" src="https://www.youtube.com/embed/H059rrXKX1s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
            <iframe src="https://www.youtube.com/embed/h0ArklhPZHI?loop=1&modestbranding=1&color=white&playlist=h0ArklhPZHI" title="YouTube video player" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                {/* <iframe id='iframeId' width="100%" height="100%" src={`https://www.youtube.com/embed/H059rrXKX1s?loop=1&modestbranding=1&color=white&playlist=H059rrXKX1s`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
                {/* <iframe width="100%" height="100%" src={`https://www.youtube.commmm/embed/${video?.details?.youtube_id}?autoplay=0&loop=1&modestbranding=1&color=white&playlist=${video?.details?.youtube_id}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
            </div>
            {!navbarVisisble && <ItemsTabNavigationMobile/>}
            <div>
                
            </div>
        </div>
        <div className='bg-white pb-10'>
            <AdvertisementMobile/>
            <div className='px-2'>
                <div className='tracking-tight font-semibold text-gray-800 text-base md:text-lg landscape:text-lg line-clamp-2 pr-3 pt-2'>Video Title</div>
                <div className='text-xs space-x-2 text-gray-600'>
                    <span>12k views</span>
                    <span>2months ago</span>
                    <span className='uppercase text-blue-500'>Gengetone</span>
                    <span className='font-semibold text-gray-700'>more...</span>
                </div>
                <div className='flex items-center space-x-1 my-2 md:my-3 landscape:my-3'>
                    <div>
                    <picture>
                        <img
                            src="/media/MED.png"
                            alt="Artist avatar"
                            className="h-8 w-8 rounded-full md:h-10 md:w-10 landscape:h-10 landscape:w-10 bg-gray-200"
                        />
                    </picture>
                    </div>
                    <div className='flex-1 flex items-center space-x-1'>
                        <div className='font-semibold text-gray-800 text-sm pr-1 line-clamp-1'>name</div>
                        <div className='flex-1 text-xs text-gray-600 pr-2'>1.2m</div>
                    </div>
                    <div className='uppercase text-xs tracking-tight font-semibold p-1 border border-gray-800 rounded-lg'>leave</div>
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
                <div className='bg-gray-50 p-2 my-5 rounded-lg'>
                    <p className='text-sm font-medium text-gray-800 tracking-tight'>Comments <span className='text-xs text-gray-600 font-normal tracking-tight'>300</span></p>
                    <div className='flex items-start'>
                        <div className='flex-1 pr-3 flex items-start space-x-2'>
                            <div>
                                <picture>
                                    <img
                                        src="/media/MED.png"
                                        alt="Artist avatar"
                                        className="h-7 w-7 rounded-full md:h-9 md:w-9 landscape:h-9 landscape:w-9 bg-gray-200"
                                    />
                                </picture>
                            </div>
                            <div className='flex-1 line-clamp-2 text-xs leading-4 text-gray-900'>comment content ghbdgb fbrfbfb fbdfbbv ffb fbfbfb fbtynyn bntynt tgtntrhtrn tnhy ttyntr trhrt rnrth tghrthrt</div>
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






    {/* <article>
        <div>
            <div className='w-full h-[425px]'>
            {!video?.details?.youtube_id ? 
            <div className='relative w-full h-full'>
                <Image 
                    src={thumbnail}
                    layout="fill"
                    objectFit='cover'
                  />
            </div> : <iframe width="100%" height="100%" src={`https://www.youtube.commmm/embed/${video?.details?.youtube_id}?autoplay=0&loop=1&modestbranding=1&color=white&playlist=${video?.details?.youtube_id}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>}
            </div>
            <div className='w-full uppercase text-sm text-blue-600 pt-2'>{video?.details?.genre_title}</div>
            <h1 className='w-full font-semibold leading-4 text-gray-800 tracking-tight text-xl pt-1 pb-2'>{video?.details?.title}</h1>
            <div className='w-full flex items-center justify-between pt-1'>
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
            <div className='w-full text-sm mt-4'>{commentCount}  {video?.details?.comment_count == 1 ? 'Comment' : 'Comments'}</div>
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
                </div>
            </div>
            <div className='mt-10 mb-36'>
                <VideoComments videoId={video?.details?.id} />
            </div>
        </div>
    </article> */}
    </>
  )
}

export default CurrentVideoPlayer