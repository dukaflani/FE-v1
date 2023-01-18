import { useState } from 'react';
import Link from 'next/link'
import Image from "next/legacy/image";
import poster from '../../../../../public/apple-touch-icon.png'
import InputField from '../../../../../components/reuseable-components/InputField'
import ApiButtonWithSpinner from '../../../../../components/reuseable-components/ApiButtonWithSpinner'
import { usePasswordChangeRequestMutation } from '../../../../../redux/features/videos/videosApiSlice'

const PasswordResset = () => {
    const [accountEmail, setAccountEmail] = useState('')
    const [requestErrors, setRequestErrors] = useState(false)
    const [errorCode, setErrorCode] = useState('')
    const [ passwordChangeRequest, { isLoading, isSuccess } ] = usePasswordChangeRequestMutation()
    
    const myAccountEmail = {
        email: accountEmail
    }

    const handlePasswordChangeRequest = async () => {
        if (accountEmail != '') {
            try {
                await passwordChangeRequest(myAccountEmail)
            } catch (error) {
                setErrorCode(error)
                setRequestErrors(true)
            }
        } else {
            setRequestErrors(true)
        }
    }


  return (
    <>
        <div className='max-w-lg bg-white mx-auto pt-20 pb-10 flex flex-col items-center justify-center px-4'>
            <div className='relative h-20 w-20 bg-gray-100 rounded-md'>
                <Image
                    src={poster}
                    layout="fill"
                    objectFit='cover'
                    className="rounded-md"
                    />
            </div>
            <h1 className='text-lg text-gray-800 tracking-tight font-black'>Reset Your Password</h1>
            <p className='text-sm text-gray-600 tracking-tight leading-4'>Need to reset your password? Provide us 
            with your Dukaflani account email and we will email you instructions to reset your password or you can
            <Link href="/account/login">
                <span className='text-blue-500 cursor-pointer underline'> return to the login page</span>
            </Link>
            </p>
            {isSuccess == false ? <div className='w-full my-4'>
                <InputField
                    title="Email"
                    primaryState={accountEmail}
                    setPrimaryState={setAccountEmail}
                />
            </div>
            :
            <div className='w-full my-4 flex flex-col items-center justify-center'>
                <p className='tracking-tight text-gray-800 font-semibold'>Instructions have been sent to your email</p>
                <span className='text-xs text-gray-500 tracking-tight'>Remember to also check your spam folder</span>
            </div>}
            {isSuccess == false && <div>
                <ApiButtonWithSpinner
                    title="Reset Password"
                    bgColor="bg-blue-500"
                    textColor="text-white"
                    hoverColor="hover:bg-blue-400"
                    loading={isLoading}
                    onClick={handlePasswordChangeRequest}
                />
            </div>}
        </div>

        <div className="mt-4">
            <footer className='text-xs flex items-center justify-center pt-5 pb-2 text-gray-500'>&copy; {new Date().getFullYear()} Jidraff Gathura</footer>
        </div>
    </>
  )
}

export default PasswordResset