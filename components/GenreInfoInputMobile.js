import React, { useState } from 'react'
import slugify from 'slugify'
import { useAddGenreMutation } from '../redux/features/videos/videosApiSlice'
import InputField from './reuseable-components/InputField'
import TextAreaField from './reuseable-components/TextAreaField'

const GenreInfoInput = ({ setCurrentInput, currentInput }) => {
    const [genreName, setGenreName] = useState('')
    const [genreOrigin, setGenreOrigin] = useState('')
    const [genreParent, setGenreParent] = useState('')
    const [genreDescription, setGenreDescription] = useState('')
    const [createdGenre, setCreatedGenre] = useState(null)
    const [genreErrors, setgenreErrors] = useState(null)
    const [fieldErrors, setFieldErrors] = useState(null)
    const [ addGenre ] = useAddGenreMutation()

    const genreSlug =  slugify(genreName, {lower: true})


    const newGenre = {
        "title": genreName,
        "country": genreOrigin,
        "parent_genre": genreParent,
        "description": genreDescription,
        "slug": genreSlug,
    }

    const handleAddGenre = async () => {
        if (genreName && genreOrigin && genreDescription) {
            try {
                setCreatedGenre(await addGenre(newGenre))
                setGenreName('')
                setGenreOrigin('')
                setGenreParent('')
                setGenreDescription('')
            } catch (error) {
                setgenreErrors(error)
                setTimeout(() => {
                    setgenreErrors(null)
                }, 5000);
            }
            
        } else {
            setFieldErrors('Please fill in all the fields')
        }
    }


  return (
    <div className='p-2 bg-white shadow-md border-b mb-10'>
        {genreErrors && <div className='text-red-500 font-medium tracking-tighter text-sm'>Genre not created. Please refresh and try again</div>}
        <div className='p-1'>
            <InputField
                primaryState={genreName} 
                setPrimaryState={setGenreName}
                mandatory={true}
                // placeholderText='$0.00'
                title="Genre"
                // helperText="Service provider"
                // helperTextLink="here"
                // onHelperTextLinkClick={() => setCurrentInput(6)}
            />
       </div>
        <div className='p-1 flex flex-col'>
            <div className='w-full'>
                <InputField
                    primaryState={genreOrigin} 
                    setPrimaryState={setGenreOrigin}
                    mandatory={true}
                    // placeholderText='$0.00'
                    title="Country"
                    helperText="Country of origin"
                    // helperTextLink="here"
                    // onHelperTextLinkClick={() => setCurrentInput(6)}
                />
            </div>
            <div className='w-full'>
                <InputField
                    primaryState={genreParent} 
                    setPrimaryState={setGenreParent}
                    mandatory={true}
                    // placeholderText='$0.00'
                    title="Parent Genre"
                    // helperText="Country of origin"
                    // helperTextLink="here"
                    // onHelperTextLinkClick={() => setCurrentInput(6)}
                />
            </div>
        </div>
        <div className='p-1'>
            <TextAreaField
                primaryState={genreDescription} 
                setPrimaryState={setGenreDescription}
                mandatory={true}
                placeholderText='Describe the genre here'
                title="Genre Description"
                // helperText="helper"
                // helperTextLink="here"
                // onHelperTextLinkClick={() => setCurrentInput(6)}
            />
        </div>
        <br/>
        <div className='flex flex-col'>
            <div className='flex items-center justify-between'>
                <div onClick={() => setCurrentInput(0)} className='bg-red-600 hover:bg-red-400 text-white cursor-pointer px-2 py-1 uppercase font-semibold text-sm tracking-tight'>Back to video info</div>
                <div onClick={handleAddGenre} className=' border border-gray-500 text-gray-500 hover:bg-gray-300 hover:border-gray-300 cursor-pointer px-2 py-1 uppercase font-semibold text-sm tracking-tight'>Add Genre</div>
            </div>
            <div className='flex items-center justify-center'>
                {fieldErrors && <div className='text-red-500 font-medium tracking-tighter text-sm'>{fieldErrors}</div>}
            </div>
        </div>
    </div>
  )
}

export default GenreInfoInput