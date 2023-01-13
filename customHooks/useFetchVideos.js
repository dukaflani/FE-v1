import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useFetchVideos( searchQuery, userId, pageNumber, genreId, uniqueId ) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [videos, setVideos] = useState([])
    const [hasMore, setHasMore] = useState(false)


    useEffect(() => {
        setVideos([])
    }, [searchQuery, genreId, uniqueId])
    



    useEffect(() => {
        setLoading(true)
        setError(false)

        let cancel

        axios({
            method: 'GET',
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/store/videos/`,
            params: { user: userId, genre: genreId, search: searchQuery, page: pageNumber, url_id: uniqueId },
            cancelToken: new axios.CancelToken((c) => cancel = c)
        }).then(res => {
            setVideos(prevVideos => {
                return [...new Set([...prevVideos, ...res.data.results.map(videoObject => videoObject)])]
            })
            // setHasMore(res.data.results.length > 0)
            setLoading(false)
            setHasMore(!!res.data.results)
        }).catch(error => {
            if(axios.isCancel(error)) return
            setError(true)
            if (error?.response?.status === 404) {
                setHasMore(false)
                setLoading(false)
            }
        })
        return () => cancel()
    }, [ searchQuery, userId, pageNumber, genreId, uniqueId ])
    
  return { loading, error, videos, hasMore }
}
