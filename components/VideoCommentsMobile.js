import { useFetchCommentsQuery } from '../redux/features/videos/videosApiSlice'
import RegularCommentMobile from './RegularCommentMobile'
import PinnedCommentsMobile from './PinnedCommentsMobile'

const VideoCommentsMobile = ({ videoId }) => {

  const queryParams = {
    video_id: videoId ? videoId : 0,
}

  const { data: comments } = useFetchCommentsQuery(queryParams)

  return (
    <>
    <div>
        {comments?.data?.map((comment, i) => (
                <PinnedCommentsMobile comment={comment} key={i}/>
              ))}
    </div>
    <div>
        {comments?.data?.map((comment, i) => (
                <RegularCommentMobile comment={comment} key={i}/>
              ))}
    </div>
    </>
  )
}

export default VideoCommentsMobile