import { useState } from 'react'
import slugify from 'slugify'
import { useAddGenreMutation } from '../redux/features/videos/videosApiSlice'
import InputField from './reuseable-components/InputField'
import TextAreaField from './reuseable-components/TextAreaField'
import ApiButtonWithSpinner from './reuseable-components/ApiButtonWithSpinner'

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
        <div className='p-1 flex space-x-3'>
            <div className='w-6/12'>
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
            <div className='w-6/12'>
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
                <ApiButtonWithSpinner
                    title="Cancel"
                    bgColor="bg-red-600"
                    hoverColor="hover:bg-red-400"
                    textColor="text-white"
                    onClick={() => router.push({pathname: '/dashboard/upload', query: {item: 'video'}})}
                />
                <ApiButtonWithSpinner
                    // loading={uploadingVideo}
                    title="Add Genre"
                    bgColor="bg-blue-500"
                    hoverColor="hover:bg-blue-400"
                    textColor="text-white"
                    onClick={handleAddGenre}
                />
            </div>
            <div className='flex items-center justify-center'>
                {fieldErrors && <div className='text-red-500 font-medium tracking-tighter text-sm'>{fieldErrors}</div>}
            </div>
        </div>
    </div>
  )
}

export default GenreInfoInput