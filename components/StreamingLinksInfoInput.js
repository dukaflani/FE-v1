import { useState } from 'react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { useAddStreamingLinksHolderMutation, useAddStreamingLinksMutation,
    useFetchCreatedStreamingLinksMutation,
 } from '../redux/features/videos/videosApiSlice'
import { platforms } from '../data/streamingPlatforms'
import { useSelector } from 'react-redux'
import InputField from './reuseable-components/InputField'
import SelectInputField from './reuseable-components/SelectInputField'
import ApiButtonWithSpinner from './reuseable-components/ApiButtonWithSpinner'

const StreamingLinksInfoInput = ({ setCurrentInput, currentInput }) => {
    const [title, setTitle] = useState('')
    const [createdLink, setCreatedLink] = useState(null)
    const [streamingService, setStreamingService] = useState("")
    const [streamingLink, setStreamingLink] = useState("")
    const [createdStreamingLink, setCreatedStreamingLink] = useState({})
    const [creatredStreamingLinksList, setCreatredStreamingLinksList] = useState([])
    const [ addStreamingLinksHolder, { isLoading: linksHolderLoading } ] = useAddStreamingLinksHolderMutation()
    const [ addStreamingLinks, { isLoading: streamingLinkLoading } ] = useAddStreamingLinksMutation()
    const { user } = useSelector((state) => state.auth)
    const currentUser = user?.info?.id
    const linkHolderId = createdLink?.data?.data?.id
    
    const [ fetchCreatedStreamingLinks ] = useFetchCreatedStreamingLinksMutation()

    const platformName = streamingService.replace(/-/g, " ")

    const newStreamingLinksHolder = {
        "title": title,
        "user": currentUser,
        "streamingobject_set": []
    }
    
    const linksDetails = {
        "streaming_links": linkHolderId,
        "streaming_service": platformName,
        "link": streamingLink,
        "logo": `${process.env.NEXT_PUBLIC_DEFAULT_IMAGE_URL}/${streamingService}.png`,
    }
    
    const createdStreamingLinksHolderId = {
        "linkHolder_id": createdLink?.data?.data?.id,
      }

    const handleAddLinksHolder = async () => {
        setCreatedLink(await addStreamingLinksHolder(newStreamingLinksHolder));
    }


    const handleAddLinks = async () => {
        setCreatedStreamingLink(await addStreamingLinks(linksDetails));
        setCreatredStreamingLinksList(await fetchCreatedStreamingLinks(createdStreamingLinksHolderId))
        setStreamingService(" ")
        setStreamingLink(" ")
    }


  return (
    <div className='p-2 bg-white shadow-md border-b mb-10'>
        <div className='p-1'>
            <InputField 
                    primaryState={title} 
                    setPrimaryState={setTitle}
                    mandatory={true}
                    // placeholderText='Song title...'
                    title="Links Title"
                    helperText="Name your links. Video title + 'Links' recommended"
                    // helperTextLink="here"
                    // onHelperTextLinkClick={() => setCurrentInput(6)}
                />
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
                    loading={linksHolderLoading}
                    title="Create"
                    bgColor="bg-blue-500"
                    hoverColor="hover:bg-blue-400"
                    textColor="text-white"
                    onClick={handleAddLinksHolder}
                />
        </div>
        {createdLink && <div className='p-1 flex space-x-3'>
            <div className='w-4/12'>
                <SelectInputField
                    primaryState={streamingService}
                    setPrimaryState={setStreamingService}
                    mandatory={true}
                    name='streaming-links'
                    data={platforms}
                    dataNumber={platforms?.length}
                    selectTitle='Select a platform'
                    fieldTitle="Streaming Service"
                    // helperText="helper"
                    // onHelperTextLinkClick={}
                    // helperTextLink="here"
                />
            </div>
            <div className='w-8/12'>
                <InputField 
                    primaryState={streamingLink} 
                    setPrimaryState={setStreamingLink}
                    mandatory={true}
                    // placeholderText='Song title...'
                    title="Streaming Link"
                    helperText="Paste your streaming/download link here"
                    // helperTextLink="here"
                    // onHelperTextLinkClick={() => setCurrentInput(6)}
                />
            </div>
        </div>}
        <div className='px-1 mt-2'>
            {createdLink && 
                <ApiButtonWithSpinner
                    loading={streamingLinkLoading}
                    title="Add Link"
                    bgColor="bg-blue-500"
                    hoverColor="hover:bg-blue-400"
                    textColor="text-white"
                    onClick={handleAddLinks}
                />
            }
        </div>
        <br/>
        <div className='px-2 mb-5'>
            {[...Array(creatredStreamingLinksList?.data?.data.length).keys()].map((service, i) => (
                <div key={i} className='flex items-center justify-center hover:bg-gray-50 w-1/2 px-2 py-1'>
                    <div className='w-10/12'>
                        <div className='text-base font-semibold tracking-tight text-gray-800'>{creatredStreamingLinksList?.data?.data[i].streaming_service?.replace(/_/g, " ")}</div>
                        <div className='pr-5 text-ellipsis w-11/12 truncate text-xs text-gray-400'>{creatredStreamingLinksList?.data?.data[i].link}</div>
                    </div>
                    <div className='flex items-center justify-end w-2/12'>
                        {creatredStreamingLinksList?.data?.data[i].id && <CheckIcon className="h-8 w-8 hover:bg-red-200 p-1 text-blue-500 rounded-full cursor-pointer"/>}
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default StreamingLinksInfoInput