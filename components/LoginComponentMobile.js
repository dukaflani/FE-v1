import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from "next/legacy/image";
import logoLight from '../public/branding/dukaflani-logo-blue-medium.png'
import { useLoginMutation } from '../redux/features/auth/authApiSlice'
import InputField from './reuseable-components/InputField'
import InputFieldPassword from './reuseable-components/InputFieldPassword'
import ApiButtonWithSpinner from './reuseable-components/ApiButtonWithSpinner';


const LoginComponent = () => {
    const router = useRouter()
    // const emailRef = useRef()
    const errorRef = useRef()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errMessage, setErrMessage] = useState('')

    const [login, {isLoading, isSuccess}] = useLoginMutation()

    // useEffect(() => {
    //   emailRef.current.focus()
    // }, [])

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
            setEmail('')
            setPassword('')
            // router.push('/')
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

    if (isSuccess == true) {
        router.push('/')
      }
    
    

  return (
    <div className='grid grid-cols-1 h-full'>
        <div className='w-full h-full'>
            <div className='w-10/12 mx-auto h-full flex flex-col items-center justify-center'>
                <div className='flex flex-1 w-full flex-col items-center justify-center space-y-2'>
                <div className='w-full flex items-center justify-between'>
                    <div className='w-28 relative cursor-pointer pt-3'>
                        <Image src={logoLight} 
                            alt="Dukaflani Logo" 
                            layout="responsive"
                            objectFit='contain'
                            priority
                            />
                    </div>
                </div>
                    {/* {isLoading ? <div>Please wait...</div> : <div>Login</div>} */}
                    <div ref={errorRef} className='text-xs text-red-500'>{errMessage}</div>
                    <div className='w-full'>
                        <InputField 
                            primaryState={email} 
                            setPrimaryState={setEmail}
                            // mandatory={true}
                            // placeholderText='$0.00'
                            title="Email"
                            // helperText="Use a comma (',') to separate  your entries"
                            // helperTextLink="here"
                            // onHelperTextLinkClick={() => setCurrentInput(6)}
                            // ref={emailRef}
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
                        <ApiButtonWithSpinner
                            title="Login"
                            onClick={handleSubmit}
                            loading={isLoading}
                            bgColor="bg-gray-300"
                            hoverColor="hover:bg-gray-200"
                            textColor="text-gray-800"
                        />
                    </div>
                    <div className='pt-5 flex items-center justify-center'>
                        <span onClick={() => router.push("/account/register")} className='text-xs text-gray-800 cursor-pointer py-1 border-r border-r-gray-400 pr-4'>Register an Account</span>
                        <span onClick={() => router.push("/password/reset")} className='text-xs text-gray-800 cursor-pointer py-1 pl-4'>Reset your Password</span>
                    </div>
                </div>
                <footer className='flex items-center justify-center p-2'>
                    <p className='text-xs text-gray-600'>&copy; {new Date().getFullYear()} Jidraff Gathura</p>
                </footer>
            </div>
        </div>
        
    </div>
  )
}

export default LoginComponent