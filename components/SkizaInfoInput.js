import FormData from 'form-data'
import { useState } from 'react'
import { useFetchAccessTokenQuery } from '../redux/features/videos/videosApiSlice'
import InputField from './reuseable-components/InputField'
import ApiButtonWithSpinner from './reuseable-components/ApiButtonWithSpinner'

const SkizaInfoInput = ({ currentInput, setCurrentInput }) => {
    const [skizaTitle, setSkizaTitle] = useState("")
    const [country, setCountry] = useState('')
    const [carrier, setCarrier] = useState("")
    const [sms, setSms] = useState("")
    const [code, setCode] = useState("")
    const [ussd, setUssd] = useState("")
    const [addedSkizaTune, setAddedSkizaTune] = useState(null)
    const [skizaTuneError, setSkizaTuneError] = useState(false)
    const [addedSkizaTuneInfo, setAddedSkizaTuneInfo] = useState(null)
    const [skizaTuneInfoError, setSkizaTuneInfoError] = useState(false)
    const [skizaTuneInfoList, setSkizaTuneInfoList] = useState([])
    const { data: accessToken } = useFetchAccessTokenQuery()
    const [creatingSkizaTune, setCreatingSkizaTune] = useState(false)
    const [addingSkizaTunes, setAddingSkizaTunes] = useState(false)
    const [createSkizaError, setCreateSkizaError] = useState('')
    const [errorMessageSkizaDetail, setErrorMessageSkizaDetail] = useState('')



    const refreshToken = `JWT ${accessToken?.access}`

    const myHeaders = new Headers();
    myHeaders.append("Authorization", refreshToken);


    const skizaTunesInfo = new FormData()
    skizaTunesInfo.append("title", skizaTitle)

    const skizaTuneDetails = new FormData()
    skizaTuneDetails.append("country", country)
    skizaTuneDetails.append("carrier", carrier)
    skizaTuneDetails.append("sms", sms)
    skizaTuneDetails.append("code", code)
    skizaTuneDetails.append("ussd", ussd)
    skizaTuneDetails.append("skiza_tune", addedSkizaTune?.id)


    const handleAddSkizaTune = () => {
        setCreatingSkizaTune(true)
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/store/skiza-tunes/`,
        {
            method: 'POST',
            headers: myHeaders,
            body: skizaTunesInfo,
        }
        )
        .then((response) => response.json())
        .then((result) => {
            setAddedSkizaTune(result)
            setCreatingSkizaTune(false)
        })
        .catch((error) => {
            setSkizaTuneError(true)
            setCreateSkizaError(error)
            setTimeout(() => {
                setSkizaTuneError(false)
            }, 5000);
        });
    }


    const handleAddSkizaTuneInfo = () => {
        setAddingSkizaTunes(true)
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/store/skiza-tune/`,
        {
            method: 'POST',
            headers: myHeaders,
            body: skizaTuneDetails,
        }
        )
        .then((response) => response.json())
        .then((result) => {
            setAddedSkizaTuneInfo(result)
            setAddingSkizaTunes(false)
            setSkizaTuneInfoList(prevSkizaTunes => [result, ...prevSkizaTunes])
            setCountry('')
            setCode('')
            setSms('')
            setCarrier('')
            setUssd('')
        })
        .catch((error) => {
            setErrorMessageSkizaDetail(error)
        });
    }





  return (
    <div className='p-2 bg-white shadow-md border-b mb-10'>
        {addedSkizaTune?.id && <div className='text-gray-700 font-medium tracking-tighter text-basse'>{`Add instructions to " ${skizaTitle} " below`}</div>}
        {!addedSkizaTune?.id &&
        <>
        <div className='p-1 mb-4 flex flex-col space-y-1'>
        <InputField
                primaryState={skizaTitle} 
                setPrimaryState={setSkizaTitle}
                mandatory={true}
                // placeholderText='$0.00'
                title="Skiza Tune Title"
                helperText="Song Title + 'Skiza Tune' (recommended)"
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
                    loading={creatingSkizaTune}
                    title="Create"
                    bgColor="bg-blue-500"
                    hoverColor="hover:bg-blue-400"
                    textColor="text-white"
                    onClick={handleAddSkizaTune}
                />
            {skizaTuneError && <div className='text-red-500 font-medium tracking-tighter text-sm'>Please fill in all the title above</div>}
        </div>
        </>
        }
        {addedSkizaTune?.id && 
        <>
        <div className='my-5 space-y-2'>
            <div className='flex space-x-2'>
                <div className='w-6/12'>
                <InputField
                    primaryState={country} 
                    setPrimaryState={setCountry}
                    mandatory={true}
                    // placeholderText='$0.00'
                    title="Country"
                    // helperText="Song Title + 'Skiza Tune' (recommended)"
                    // helperTextLink="here"
                    // onHelperTextLinkClick={() => setCurrentInput(6)}
                />
            </div>
                <div className='w-6/12'>
                <InputField
                    primaryState={carrier} 
                    setPrimaryState={setCarrier}
                    mandatory={true}
                    // placeholderText='$0.00'
                    title="Carrier"
                    helperText="Service provider"
                    // helperTextLink="here"
                    // onHelperTextLinkClick={() => setCurrentInput(6)}
                />
            </div>
            </div>
        </div>
        <div className='my-5 space-y-2'>
            <div className='flex space-x-2'>
                <div className='w-6/12'>
                <InputField
                    primaryState={sms} 
                    setPrimaryState={setSms}
                    mandatory={true}
                    // placeholderText='$0.00'
                    title="SMS"
                    // helperText="Service provider"
                    // helperTextLink="here"
                    // onHelperTextLinkClick={() => setCurrentInput(6)}
                />
            </div>
                <div className='w-6/12'>
                <InputField
                    primaryState={code} 
                    setPrimaryState={setCode}
                    mandatory={true}
                    // placeholderText='$0.00'
                    title="Code"
                    // helperText="Service provider"
                    // helperTextLink="here"
                    // onHelperTextLinkClick={() => setCurrentInput(6)}
                />
            </div>
            </div>
            <div>
                <InputField
                    primaryState={ussd} 
                    setPrimaryState={setUssd}
                    mandatory={true}
                    // placeholderText='$0.00'
                    title="USSD"
                    // helperText="Service provider"
                    // helperTextLink="here"
                    // onHelperTextLinkClick={() => setCurrentInput(6)}
                />
            </div>
        </div>
        <div className='px-1 mt-2 flex items-center justify-start space-x-1'>
                <ApiButtonWithSpinner
                    loading={addingSkizaTunes}
                    title="Add Skiza"
                    bgColor="bg-blue-500"
                    hoverColor="hover:bg-blue-400"
                    textColor="text-white"
                    onClick={handleAddSkizaTuneInfo}
                />
            {skizaTuneInfoError && <div className='text-red-500 font-medium tracking-tighter text-sm'>Please fill in both Country and Carrier</div>}
        </div>
        </>
        }
        <br/>
        <div className='px-2 mb-5'>
            {[...Array(skizaTuneInfoList?.length).keys()].map((service, i) => (
                <div key={i} className='flex items-center justify-start hover:bg-gray-50 w-1/2 px-2 py-1 cursor-pointer'>
                    <div className='w-10/12'>
                        <div className='text-base font-semibold tracking-tight text-gray-800'>{skizaTuneInfoList[i]?.country}</div>
                        <div className='text-xs font-medium tracking-tight text-gray-800'>{skizaTuneInfoList[i]?.carrier}</div>
                        <div className='text-xs font-medium tracking-tight text-gray-800'>{skizaTuneInfoList[i]?.sms}</div>
                        <div className='pr-5 text-ellipsis w-11/12 truncate text-xs text-gray-400'>{skizaTuneInfoList[i]?.code}</div>
                        <div className='pr-5 text-ellipsis w-11/12 truncate text-xs text-gray-400'>{skizaTuneInfoList[i]?.ussd}</div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default SkizaInfoInput