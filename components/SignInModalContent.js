import React, { useEffect, useRef, useState } from 'react'
import Image from "next/legacy/image";
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux'
import { useLoginMutation } from '../redux/features/auth/authApiSlice'
import { toggleSignInModalOpen } from '../redux/features/navigation/navigationSlice'
import logoLight from '../public/branding/dukaflani-logo-blue-medium.png'
import Button from './reuseable-components/Button'
import InputField from './reuseable-components/InputField'
import InputFieldPassword from './reuseable-components/InputFieldPassword'
import Poster from '../public/branding/dukaflani-login-cover.png'

const SignInModalContent = () => {
    const dispatch = useDispatch() 
    const router = useRouter()
    const errorRef = useRef()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errMessage, setErrMessage] = useState('')

    const [login, {isLoading}] = useLoginMutation()


    useEffect(() => {
      setErrMessage('')
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const userData = await login({email, password}).unwrap()
            await fetch(process.env.NEXT_PUBLIC_BAKE_URL, {
                method: 'POST',
                body: JSON.stringify({ refreshToken: userData?.data?.refresh, accessToken: userData?.data?.access }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            // setEmail('')
            // setPassword('')
            // dispatch(toggleSignInModalOpen(false))
            window.location.reload(true)
        } catch (error) {
            if(!error?.originalStatus) {
                setErrMessage('No Server Response')
            } else if (error?.originalStatus?.status === 400) {
                setErrMessage('Missing Email or Password')
            } else if (error?.originalStatus?.status === 401) {
                setErrMessage('Unauthorized')
            } else {
                setErrMessage('Login Failed')
            }
            errorRef.current.focus()
        }
    }

  return (
    <div className='w-full h-full flex'>
        <div className='w-1/2 h-full relative bg-gray-100'>
                <Image 
                    src={Poster}
                    layout="fill"
                    objectFit='cover'
                  />
        </div>
        <div className='w-1/2 flex flex-col h-full'>
            {/* <div className='p-2 flex justify-end'>
                <p className='text-xs'>Already have an account? <span className='text-blue-500 font-medium'>Sign in</span></p>
            </div> */}
            <div className='flex flex-col items-center justify-center flex-1 w-10/12 mx-auto'>
                <div className='w-full flex items-center justify-between py-5'>
                    <div className='w-24 relative cursor-pointer'>
                        <Image src={logoLight} 
                            alt="Dukaflani Logo" 
                            layout="responsive"
                            objectFit='contain'
                            />
                    </div>
                </div>
                {/* <div className='w-full py-5 text-2xl'>Sign in</div> */}
                <div className='w-full'>
                    <InputField
                        primaryState={email} 
                        setPrimaryState={setEmail}
                        title="Email"
                        />
                </div>
                <div className='w-full'>
                    <InputFieldPassword
                        primaryState={password} 
                        setPrimaryState={setPassword}
                        // mandatory={true} 
                        // placeholderText='$0.00'
                        title="Password"
                        // helperText="Country of origin"
                        // helperTextLink="here"
                        // onHelperTextLinkClick={() => setCurrentInput(6)}
                    />
                </div>
                <div className='mb-3 space-x-2 px-2'>
                    <input 
                        type="checkbox" 
                        id="sign-up-checkbox"
                        className='peer relative appearance-none w-3 h-3 focus:outline-none'
                        // checked
                        />
                    <label className='text-xs' >By continuing, you agree to Dukaflani's <span className='text-blue-700 cursor-pointer'> T&Cs</span> and <span className='text-blue-700 cursor-pointer'>Privacy Policy</span></label>
                </div>
                <div className='flex space-x-3'>
                {/* <Button
                    title="Cancel"
                    onClick={() => dispatch(toggleSignInModalOpen(false))}
                    /> */}
                <Button
                    title="Login"
                    onClick={handleSubmit}
                    />
                </div>
                <div className='mt-5 flex items-center justify-center'>
                    <span onClick={() => router.push("/account/register")} className='text-xs text-gray-800 cursor-pointer py-1 border-r border-r-gray-400 pr-4'>Register an Account</span>
                    <span onClick={() => router.push("/password/reset")} className='text-xs text-gray-800 cursor-pointer py-1 pl-4'>Reset your Password</span>
                </div>
                </div>
                <footer className='flex items-center justify-center p-2'>
                    <p className='text-xs text-gray-600'>&copy; {new Date().getFullYear()} Jidraff Gathura</p>
                </footer>
            </div>
    </div>
  )
}

export default SignInModalContent