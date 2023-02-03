import FormData from 'form-data'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useAddLyricsMutation, useAddLyricsVerseMutation, useFetchAccessTokenQuery, useFetchCreatedLyricsVersesMutation } from '../redux/features/videos/videosApiSlice'
import slugify from 'slugify'
import { nanoid } from 'nanoid'
import { verseChoices } from '../data/verses'
import InputField from './reuseable-components/InputField'
import SelectInputField from './reuseable-components/SelectInputField'
import TextAreaField from './reuseable-components/TextAreaField'
import ApiButtonWithSpinner from './reuseable-components/ApiButtonWithSpinner'

const LyricsInfoInput = ({ currentInput, setCurrentInput }) => {
    const [addingLyrics, setAddingLyrics] = useState(false)
    const [addingLyricsVerse, setAddingLyricsVerse] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [lyricsTitle, setLyricsTitle] = useState('')
    const [mainVocals, setMainVocals] = useState('')
    const [bgVocals, setBgVocals] = useState('')
    const [audioProducer, setAudioProducer] = useState('')
    const [videoDirector, setVideoDirector] = useState('')
    const [songWriter, setSongWriter] = useState('')
    const [instrumentPlayer, setInstrumentPlayer] = useState('')
    const [execProducer, setExecProducer] = useState('')

    const [verseType, setVerseType] = useState('')
    const [verseVocals, setVerseVocals] = useState('')
    const [lyricsBody, setLyricsBody] = useState('')
    const [createdLyrics, setCreatedLyrics] = useState(null)
    const [fieldsError, setFieldsError] = useState(false)
    const [addedVerse, setAddedVerse] = useState(null)
    const [verseError, setVerseError] = useState(false)
    const [versesList, setVersesList] = useState([])
    const [errorMessageVerse, setErrorMessageVerse] = useState('')
    const [ addLyrics, { isLoading: addLyricsLoading } ] = useAddLyricsMutation()
    const [ addLyricsVerse, { isLoading: addLyricsVerseLoading } ] = useAddLyricsVerseMutation()
    const [ fetchCreatedLyricsVerses ] = useFetchCreatedLyricsVersesMutation()
    const { data: accessToken } = useFetchAccessTokenQuery()
    const [nanoId, setNanoId] = useState('')
    const { user } = useSelector((state) => state.auth)
    const currentUser = user?.info?.id
    const lyricsSlug = slugify(lyricsTitle, {lower: true})


    useEffect(() => {
        setNanoId(nanoid(16))
    }, [])

    const newLyrics = {
        "title": lyricsTitle,
        "vocals": mainVocals,
        "bgvs": bgVocals,
        "audio": audioProducer,
        "director": videoDirector,
        "writer": songWriter,
        "instruments": instrumentPlayer,
        "producer": execProducer,
        "slug": lyricsSlug,
        "url_id": nanoId,
    }

    const newLyricsVerse = {
        "type": verseType,
        "artist": verseVocals,
        "body": lyricsBody,
        "lyrics": createdLyrics?.id,
    }

    const createdLyricsId = {
        "newLyrics_id": createdLyrics?.id,
      }

    const handleAddLyrics1 = async () => {
        if (lyricsTitle && mainVocals && audioProducer && videoDirector) {
            setCreatedLyrics(await addLyrics(newLyrics))
        } else {
            setFieldsError(true)
            setTimeout(() => {
                setFieldsError(false)
            }, 5000);
        }
        if (createdLyrics?.id) {
            setLyricsTitle('')
            setMainVocals('')
            setBgVocals('')
            setAudioProducer('')
            setVideoDirector('')
            setSongWriter('')
            setInstrumentPlayer('')
            setExecProducer('')
        }
    }



    const refreshToken = `JWT ${accessToken?.access}`

    const myHeaders = new Headers();
    myHeaders.append("Authorization", refreshToken);

    const lyricsInfo = new FormData()
    lyricsInfo.append("title", lyricsTitle)
    lyricsInfo.append("vocals", mainVocals)
    lyricsInfo.append("bgvs", bgVocals)
    lyricsInfo.append("audio", audioProducer)
    lyricsInfo.append("director", videoDirector)
    lyricsInfo.append("writer", songWriter)
    lyricsInfo.append("instruments", instrumentPlayer)
    lyricsInfo.append("producer", execProducer)
    lyricsInfo.append("slug", lyricsSlug)
    lyricsInfo.append("url_id", nanoId)


    const lyricsVerseInfo = new FormData()
    lyricsVerseInfo.append("type", verseType)
    lyricsVerseInfo.append("artist", verseVocals)
    lyricsVerseInfo.append("body", lyricsBody)
    lyricsVerseInfo.append("lyrics", createdLyrics?.id)


    const handleAddLyrics = () => {
        setAddingLyrics(true)
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/store/lyrics/`,
        {
            method: 'POST',
            headers: myHeaders,
            body: lyricsInfo,
        }
        )
        .then((response) => response.json())
        .then((result) => {
            setCreatedLyrics(result)
            setAddingLyrics(false)
            setMainVocals('')
            setBgVocals('')
            setAudioProducer('')
            setVideoDirector('')
            setSongWriter('')
            setInstrumentPlayer('')
            setExecProducer('')
        })
        .catch((error) => {
            setErrorMessage(error)
        });
    }

    const handleAddLyricsVerse = () => {
        setAddingLyricsVerse(true)
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/store/lyrics-verse/`,
        {
            method: 'POST',
            headers: myHeaders,
            body: lyricsVerseInfo,
        }
        )
        .then((response) => response.json())
        .then((result) => {
            setAddedVerse(result)
            setAddingLyricsVerse(false)
            setVersesList(fetchCreatedLyricsVerses(createdLyricsId))
            setVerseVocals('')
            setLyricsBody('')
        })
        .catch((error) => {
            setErrorMessageVerse(error)
        });
    }




    console.log("lyrics title dukaflani.com:", lyricsTitle)
    console.log("lyrics mani vocals dukaflani.com:", mainVocals)
    console.log("lyrics audio producer dukaflani.com:", audioProducer)
    console.log("lyrics video director dukaflani.com:", videoDirector)
    console.log("created lyrics dukaflani.com:", createdLyrics?.id)
    console.log("add lyrics loading dukaflani.com:", addingLyrics)
    console.log("add lyrics-verse loading dukaflani.com:", addingLyricsVerse)
    console.log("added verse dukaflani.com:", addedVerse)


    
    const handleAddLyricsVerseXXX = async () => {
        if (verseVocals && lyricsBody && verseType != ' ') {
            setAddedVerse(await addLyricsVerse(newLyricsVerse))
            setVersesList(await fetchCreatedLyricsVerses(createdLyricsId))
            setVerseVocals('')
            setLyricsBody('')
        } else {
            setVerseError(true)
            setTimeout(() => {
                setVerseError(false)
            }, 5000);
        }
    }



  return (
    <div className='p-2 bg-white shadow-md border-b mb-10'>
        {createdLyrics?.id && <div className='text-gray-700 font-medium tracking-tighter text-basse'>{`Add verses to " ${lyricsTitle} " below`}</div>}
        {!createdLyrics?.id &&
        <>   
        <div className='grid grid-cols-2 gap-x-3 w-full'> 
        <div className='p-1 w-full'>
            <InputField 
                primaryState={lyricsTitle} 
                setPrimaryState={setLyricsTitle}
                mandatory={true}
                // placeholderText='$0.00'
                title="Lyrics Title"
                helperText="Song Title + 'Lyrics' (recommended)"
                // helperTextLink="here"
                // onHelperTextLinkClick={() => setCurrentInput(6)}
            />
        </div>
        <div className='p-1 w-full'>
            <InputField 
                primaryState={mainVocals} 
                setPrimaryState={setMainVocals}
                mandatory={true}
                // placeholderText='$0.00'
                title="Vocals"
                helperText="Use a comma (',') to separate  your entries"
                // helperTextLink="here"
                // onHelperTextLinkClick={() => setCurrentInput(6)}
            />
        </div>
        <div className='p-1 w-full'>
            <InputField 
                primaryState={bgVocals} 
                setPrimaryState={setBgVocals}
                mandatory={false}
                // placeholderText='$0.00'
                title="BGV's"
                helperText="Use a comma (',') to separate  your entries"
                // helperTextLink="here"
                // onHelperTextLinkClick={() => setCurrentInput(6)}
            />
        </div>
        <div className='p-1 w-full'>
            <InputField 
                primaryState={audioProducer} 
                setPrimaryState={setAudioProducer}
                mandatory={true}
                // placeholderText='$0.00'
                title="Music Producer"
                helperText="Use a comma (',') to separate  your entries"
                // helperTextLink="here"
                // onHelperTextLinkClick={() => setCurrentInput(6)}
            />
        </div>
        <div className='p-1 w-full'>
            <InputField 
                primaryState={videoDirector} 
                setPrimaryState={setVideoDirector}
                mandatory={true}
                // placeholderText='$0.00'
                title="Video Director"
                helperText="Use a comma (',') to separate  your entries"
                // helperTextLink="here"
                // onHelperTextLinkClick={() => setCurrentInput(6)}
            />
        </div>
        <div className='p-1 w-full'>
            <InputField 
                primaryState={songWriter} 
                setPrimaryState={setSongWriter}
                mandatory={false}
                // placeholderText='$0.00'
                title="Song Writer"
                helperText="Use a comma (',') to separate  your entries"
                // helperTextLink="here"
                // onHelperTextLinkClick={() => setCurrentInput(6)}
            />
        </div>
        <div className='p-1 w-full'>
            <InputField 
                primaryState={instrumentPlayer} 
                setPrimaryState={setInstrumentPlayer}
                mandatory={false}
                // placeholderText='$0.00'
                title="Instruments"
                helperText="Use a comma (',') to separate  your entries"
                // helperTextLink="here"
                // onHelperTextLinkClick={() => setCurrentInput(6)}
            />
        </div>
        <div className='p-1 w-full mb-5'>
            <InputField 
                primaryState={execProducer} 
                setPrimaryState={setExecProducer}
                mandatory={false}
                // placeholderText='$0.00'
                title="Executive Producer"
                helperText="Use a comma (',') to separate  your entries"
                // helperTextLink="here"
                // onHelperTextLinkClick={() => setCurrentInput(6)}
            />
        </div>
        </div>
        <div className='px-1 my-2 flex space-x-3'>
                <ApiButtonWithSpinner
                    title="Cancel"
                    bgColor="bg-red-600"
                    hoverColor="hover:bg-red-400"
                    textColor="text-white"
                    onClick={() => router.push({pathname: '/dashboard/upload', query: {item: 'video'}})}
                />
                <ApiButtonWithSpinner
                    loading={addingLyrics}
                    title="Create"
                    bgColor="bg-blue-500"
                    hoverColor="hover:bg-blue-400"
                    textColor="text-white"
                    onClick={handleAddLyrics}
                />
            {fieldsError && <div className='text-red-500 font-medium tracking-tighter text-sm'>Please fill in all the (*) mandatory fields</div>}
        </div>
        </>
        }
        {createdLyrics?.id && 
        <>
        <div className='my-5 space-y-2'>
            <div className='flex space-x-2'>
                <div className='w-2/12'>
                    <SelectInputField
                        // primaryState={streamingService}
                        setPrimaryState={setVerseType}
                        mandatory={true}
                        name='verse-type'
                        data={verseChoices}
                        selectTitle='Select a type'
                        fieldTitle="Verses"
                        // helperText="helper"
                        // onHelperTextLinkClick={}
                        // helperTextLink="here"
                    />
                </div>
                <div className='w-10/12'>
                    <InputField 
                        primaryState={verseVocals} 
                        setPrimaryState={setVerseVocals}
                        mandatory={true}
                        // placeholderText='$0.00'
                        title="Vocals"
                        helperText="Artist(s) singing the verse"
                        // helperTextLink="here"
                        // onHelperTextLinkClick={() => setCurrentInput(6)}
                    />
                </div>
            </div>
            <div>
                <TextAreaField
                    primaryState={lyricsBody} 
                    setPrimaryState={setLyricsBody}
                    mandatory={true}
                    placeholderText='Write your lyrics here'
                    title="Lyrics"
                    // helperText="helper"
                    // helperTextLink="here"
                    // onHelperTextLinkClick={() => setCurrentInput(6)}
                />
            </div>
        </div>
        <div className='px-1 mt-2 flex items-center justify-start space-x-3'>
                <ApiButtonWithSpinner
                    loading={addingLyricsVerse}
                    title="Add Lyrics"
                    bgColor="bg-blue-500"
                    hoverColor="hover:bg-blue-400"
                    textColor="text-white"
                    onClick={handleAddLyricsVerse}
                />
            {verseError && <div className='text-red-500 font-medium tracking-tighter text-sm'>Please fill in all fields or change your [Verse type]</div>}
        </div>
        </>
        }
        <br/>
        {addedVerse && 
        <div className='px-2 mb-5'>
            {[...Array(versesList?.data?.data?.length).keys()].map((service, i) => (
                <div key={i} className='flex items-center justify-start hover:bg-gray-50 w-1/2 px-2 py-1 cursor-pointer'>
                    <div className='w-10/12'>
                        <div className='text-base font-semibold tracking-tight text-gray-800'>{versesList?.data?.data[i]?.type.replace(/_/g, "-")}</div>
                        <div className='text-xs font-medium tracking-tight text-gray-800'>{versesList?.data?.data[i]?.artist}</div>
                        <div className='pr-5 text-ellipsis w-11/12 truncate text-xs text-gray-400'>{versesList?.data?.data[i]?.body}</div>
                    </div>
                </div>
            ))}
        </div>
        }
    </div>
  )
}

export default LyricsInfoInput