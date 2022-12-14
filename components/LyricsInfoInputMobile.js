import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useAddLyricsMutation, useAddLyricsVerseMutation, useFetchCreatedLyricsVersesMutation } from '../redux/features/videos/videosApiSlice'
import slugify from 'slugify'
import { verseChoices } from '../data/verses'
import InputField from './reuseable-components/InputField'
import SelectInputField from './reuseable-components/SelectInputField'
import TextAreaField from './reuseable-components/TextAreaField'

const LyricsInfoInput = ({ currentInput, setCurrentInput }) => {
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
    const [ addLyrics ] = useAddLyricsMutation()
    const [ addLyricsVerse ] = useAddLyricsVerseMutation()
    const [ fetchCreatedLyricsVerses ] = useFetchCreatedLyricsVersesMutation()
    const { user } = useSelector((state) => state.auth)
    const currentUser = user?.info?.id
    const lyricsSlug = slugify(lyricsTitle, {lower: true})

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
    }

    const newLyricsVerse = {
        "type": verseType,
        "artist": verseVocals,
        "body": lyricsBody,
        "lyrics": createdLyrics?.data?.data?.id,
    }

    const createdLyricsId = {
        "newLyrics_id": createdLyrics?.data?.data?.id,
      }

    const handleAddLyrics = async () => {
        if (lyricsTitle && mainVocals && audioProducer && videoDirector) {
            setCreatedLyrics(await addLyrics(newLyrics))
        } else {
            setFieldsError(true)
            setTimeout(() => {
                setFieldsError(false)
            }, 5000);
        }
        if (createdLyrics) {
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

    const handleAddLyricsVerse = async () => {
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
        {createdLyrics?.data?.data?.id && <div className='text-gray-700 font-medium tracking-tighter text-basse'>{`Add verses to " ${lyricsTitle} " below`}</div>}
        {!createdLyrics?.data?.data?.id &&
        <>   
        <div className='grid grid-cols-1 w-full'> 
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
            <button className='bg-red-600 hover:bg-red-400 text-white cursor-pointer px-2 py-1 uppercase font-semibold text-sm tracking-tight'>Cancel</button>
            <button onClick={handleAddLyrics} className='border border-gray-500 text-gray-500 hover:bg-gray-300 hover:border-gray-300 cursor-pointer px-2 py-1 uppercase font-semibold text-sm tracking-tight'>Create</button>
            {fieldsError && <div className='text-red-500 font-medium tracking-tighter text-sm'>Please fill in all the (*) mandatory fields</div>}
        </div>
        </>
        }
        {createdLyrics?.data?.data?.id && 
        <>
        <div className='my-5 space-y-2'>
            <div className='flex flex-col'>
                <div className='w-full'>
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
                <div className='w-full'>
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
            <button onClick={handleAddLyricsVerse} className='bg-sky-300 text-blue-700 hover:bg-sky-200 flex items-center justify-center uppercase p-1 text-sm font-semibold tracking-tight'>Add Lyrics</button>
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
                        <div className='text-base font-semibold tracking-tight text-gray-800'>{versesList?.data?.data[i]?.type}</div>
                        <div className='text-xs font-medium tracking-tight text-gray-800'>{versesList?.data?.data[i]?.artist}</div>
                        <div className='pr-5 text-ellipsis w-11/12 truncate text-xs text-gray-400'>{versesList?.data?.data[i]?.body}</div>
                    </div>
                </div>
            ))}
        </div>
        }
        {/* <div className='flex items-center justify-between'>
            <div onClick={() => setCurrentInput(0)} className=' bg-gray-700 hover:bg-gray-500 text-white cursor-pointer px-2 py-1 uppercase font-semibold text-sm tracking-tight'>Video Info</div>
            <div onClick={() => setCurrentInput(2)} className=' border border-gray-500 text-gray-500 hover:bg-gray-300 hover:border-gray-300 cursor-pointer px-2 py-1 uppercase font-semibold text-sm tracking-tight'>Product</div>
        </div> */}
    </div>
  )
}

export default LyricsInfoInput