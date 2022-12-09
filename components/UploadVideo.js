import React, { useState } from 'react'
import AlbumInfoInput from './AlbumInfoInput'
import EventInfoInput from './EventInfoInput'
import GenreInfoInput from './GenreInfoInput'
import LyricsInfoInput from './LyricsInfoInput'
import ProductInfoInput from './ProductInfoInput'
import SkizaInfoInput from './SkizaInfoInput'
import StreamingLinksInfoInput from './StreamingLinksInfoInput'
import VideoInfoInput from './VideoInfoInput'

const UploadVideo = ({ videoTitle, setVideoTitle, currentInput, setCurrentInput }) => {
    const [songTitle, setSongTitle] = useState('')
    const [songGenre, setSongGenre] = useState('')
    const [youtubeVideoId, setYoutubeVideoId] = useState('')
    const [videoDescription, setVideoDescription] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [videoSmartLinks, setVideoSmartLinks] = useState('')
    const [videoProduct, setVideoProduct] = useState('')
    const [videoLyrics, setVideoLyrics] = useState('')
    const [videoSkizaTune, setVideoSkizaTune] = useState('')
    const [videoAlbum, setVideoAlbum] = useState('')
    const activeStyles = 'cursor-pointer bg-gray-200 py-2 border-r-2 border-r-gray-800 w-full flex items-center justify-center'
    const regularStyles = 'hover:bg-gray-100 cursor-pointer py-2 border-r-2 border-r-gray-400 w-full flex items-center justify-center'

  return (
    <div className='flex space-x-4'>
        <div className='w-3/12 flex flex-col items-center justify-start uppercase text-sm font-medium tracking-tighter'>
            <div className={currentInput == 0 ? activeStyles : regularStyles} onClick={() => setCurrentInput(0)}>Video Info</div>
            <div className={currentInput == 1 ? activeStyles : regularStyles} onClick={() => setCurrentInput(1)}>Smart Links</div>
            <div className={currentInput == 2 ? activeStyles : regularStyles} onClick={() => setCurrentInput(2)}>Product</div>
            <div className={currentInput == 3 ? activeStyles : regularStyles} onClick={() => setCurrentInput(3)}>Lyrics</div>
            <div className={currentInput == 4 ? activeStyles : regularStyles} onClick={() => setCurrentInput(4)}>Skiza</div>
            <div className={currentInput == 5 ? activeStyles : regularStyles} onClick={() => setCurrentInput(5)}>Album</div>
            <div className={currentInput == 6 ? activeStyles : regularStyles} onClick={() => setCurrentInput(6)}>Event</div>
            <div className={currentInput == 67 ? activeStyles : regularStyles} onClick={() => setCurrentInput(7)}>Genre</div>
        </div>
        <div className='w-9/12'>
            {
                {
                    0: <VideoInfoInput 
                            videoTitle={videoTitle} 
                            setVideoTitle={setVideoTitle} 
                            currentInput={currentInput} 
                            setCurrentInput={setCurrentInput}
                            songTitle={songTitle} 
                            setSongTitle={setSongTitle}
                            songGenre={songGenre} 
                            setSongGenre={setSongGenre}
                            youtubeVideoId={youtubeVideoId}
                            setYoutubeVideoId={setYoutubeVideoId}
                            videoDescription={videoDescription}
                            setVideoDescription={setVideoDescription}
                            thumbnail={thumbnail}
                            setThumbnail={setThumbnail}
                            videoSmartLinks={videoSmartLinks}
                            setVideoSmartLinks={setVideoSmartLinks}
                            videoProduct={videoProduct}
                            setVideoProduct={setVideoProduct}
                            videoLyrics={videoLyrics}
                            setVideoLyrics={setVideoLyrics}
                            videoSkizaTune={videoSkizaTune}
                            setVideoSkizaTune={setVideoSkizaTune}
                            videoAlbum={videoAlbum}
                            setVideoAlbum={setVideoAlbum}
                        />,
                    1: <StreamingLinksInfoInput currentInput={currentInput} setCurrentInput={setCurrentInput} />,
                    2: <ProductInfoInput currentInput={currentInput} setCurrentInput={setCurrentInput} />,
                    3: <LyricsInfoInput currentInput={currentInput} setCurrentInput={setCurrentInput} />,
                    4: <SkizaInfoInput currentInput={currentInput} setCurrentInput={setCurrentInput} />,
                    5: <AlbumInfoInput currentInput={currentInput} setCurrentInput={setCurrentInput} />,
                    6: <EventInfoInput currentInput={currentInput} setCurrentInput={setCurrentInput} />,
                    7: <GenreInfoInput currentInput={currentInput} setCurrentInput={setCurrentInput} />,
                }[currentInput]
            }
        </div>
    </div>
  )
}

export default UploadVideo