import { useState } from 'react'
import Image from "next/legacy/image";
import { useRouter } from 'next/router'
import { roleChoices } from '../data/accountRoles';
import logoLight from '../public/branding/dukaflani-white-logo-medium.png'
import SelectInputField from './reuseable-components/SelectInputField'
import InputField from './reuseable-components/InputField'
import InputFieldPassword from './reuseable-components/InputFieldPassword'
import { useAccountRegisterMutation } from '../redux/features/videos/videosApiSlice'
import ApiButtonWithSpinner from './reuseable-components/ApiButtonWithSpinner'

const AccountRegister = () => {
    const router = useRouter()
    const [username, setUsername] = useState('')
    const [role, setRole] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [brandName, setBrandName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [registeredAccount, setRegisteredAccount] = useState(null)
    const [fieldsError, setFieldsError] = useState(false)


    const newAccountInfo = {
        "username": username,
        "password": password,
        "email": email,
        "phone": phone,
        "first_name": firstName,
        "last_name": lastName,
        "role": role,
        "stage_name": brandName,
        "is_verified": false,
    }

    const [ accountRegister, {isLoading} ] = useAccountRegisterMutation()

    const handleRegister = async () => {
        if (username && password && email && firstName && lastName && brandName) {
            setRegisteredAccount(await accountRegister(newAccountInfo))
            router.push({ pathname: '/account/login', query: { account: 'new', p1: 'profile', p2: 'settings' } })
        } else {
            setFieldsError(true)
            setTimeout(() => {
                setFieldsError(false)
            }, 5000);
        }
    }

  return (
    <div className='h-screen flex flex-col pt-10'>
        <div className='flex-1 bg-white shadow-sm border-b'>
            {/* <div>
                <div className='w-24 relative cursor-pointer'>
                    <Image src={logoLight} 
                        alt="Dukaflani Logo" 
                        layout="responsive"
                        objectFit='contain'
                        />
                </div>
            </div> */}
            <div className='flex h-full'>
                <div className='w-4/12 flex items-center justify-center bg-blue-500 p-5'>
                    <div>
                        <div>
                            <div onClick={() => router.push("/")} className='w-24 relative cursor-pointer'>
                                <Image src={logoLight} 
                                    alt="Dukaflani Logo" 
                                    layout="responsive"
                                    objectFit='contain'
                                    />
                            </div>
                        </div>
                        <div className='pt-1 pb-10 text-xs text-white'>Welcome to Dukaflani. Entrepreneurs In Music Sell Their Products Here</div>
                        <div className='text-white font-extrabold tracking-wider uppercase pb-2'>Dukaflani Accounts</div>
                        <div className='text-white font-medium pb-1 tracking-wide'>&bull; User Account</div>
                        <div className='text-white text-xs'>A user account will allow you to watch videos, like, comment, share, vote, join artist fanbase and make purchases from your favourite artists</div>
                        <br/>
                        <div className='text-white font-medium pb-1 tracking-wide'>&bull; Artist Account</div>
                        <div className='text-white text-xs'>An artist account will have user account privillages plus the ability to post videos, streaming & download links, products, skiza tunes, albums, events and much more</div>
                        
                    </div>
                </div>
                <div className='w-8/12 flex items-center justify-center p-5 flex-col'>
                    <div className='w-full text-3xl font-extrabold tracking-tighter text-gray-800'>Join Dukaflani</div>
                    <div className='w-full text-sm text-gray-400 font-medium'>Already a member? <span onClick={() => router.push("/account/login")} className='text-blue-500 cursor-pointer'>Sign in</span></div>
                    <div className='w-full pt-10 space-y-4'>
                        <div className='w-full space-x-3 flex'>
                            <div className='w-6/12'>
                                <InputField
                                        primaryState={username} 
                                        setPrimaryState={setUsername}
                                        mandatory={true}
                                        // placeholderText='$0.00'
                                        title="Username"
                                        // helperText="Country of origin"
                                        // helperTextLink="here"
                                        // onHelperTextLinkClick={() => setCurrentInput(6)}
                                    />
                            </div>
                            <div className='w-6/12'>
                                <SelectInputField
                                    primaryState={role}
                                    setPrimaryState={setRole} 
                                    mandatory={true}
                                    name='account-role'
                                    data={roleChoices}
                                    selectTitle='Choose one...'
                                    fieldTitle="Account"
                                    // helperText="helper"
                                    // onHelperTextLinkClick={}
                                    // helperTextLink="here"
                                />
                            </div>
                        </div>
                        <div className='w-full space-x-3 flex'>
                            <div className='w-6/12'>
                                <InputField
                                    primaryState={firstName} 
                                    setPrimaryState={setFirstName}  
                                    mandatory={true}
                                    // placeholderText='$0.00'
                                    title="First Name"
                                    // helperText="Country of origin"
                                    // helperTextLink="here"
                                    // onHelperTextLinkClick={() => setCurrentInput(6)}
                                />
                            </div>
                            <div className='w-6/12'>
                                <InputField
                                    primaryState={lastName} 
                                    setPrimaryState={setLastName}  
                                    mandatory={true}
                                    // placeholderText='$0.00'
                                    title="Last Name"
                                    // helperText="Country of origin"
                                    // helperTextLink="here"
                                    // onHelperTextLinkClick={() => setCurrentInput(6)}
                                />
                            </div>
                        </div>
                        <div className='w-full space-x-3 flex'>
                            <div className='w-6/12'>
                                <InputField
                                    primaryState={phone} 
                                    setPrimaryState={setPhone}  
                                    // mandatory={true}
                                    // placeholderText='$0.00'
                                    title="Phone"
                                    // helperText="Country of origin"
                                    // helperTextLink="here"
                                    // onHelperTextLinkClick={() => setCurrentInput(6)}
                                />
                            </div>
                            <div className='w-6/12'>
                                <InputField
                                    primaryState={brandName} 
                                    setPrimaryState={setBrandName}  
                                    mandatory={true}
                                    // placeholderText='$0.00'
                                    title="Brand Name"
                                    helperText="Business/Stage name or alias"
                                    // helperTextLink="here"
                                    // onHelperTextLinkClick={() => setCurrentInput(6)}
                                />
                            </div>
                        </div>
                        <div className='w-full space-x-3 flex'>
                            <div className='w-full'>
                                <InputField
                                    primaryState={email} 
                                    setPrimaryState={setEmail}  
                                    mandatory={true}
                                    // placeholderText='$0.00'
                                    title="Email"
                                    // helperText="Country of origin"
                                    // helperTextLink="here"
                                    // onHelperTextLinkClick={() => setCurrentInput(6)}
                                />
                            </div>
                        </div>
                        <div className='w-full space-x-3 flex'>
                            <div className='w-full'>
                                <InputFieldPassword
                                    primaryState={password} 
                                    setPrimaryState={setPassword} 
                                    mandatory={true} 
                                    // placeholderText='$0.00'
                                    title="Password"
                                    // helperText="Country of origin"
                                    // helperTextLink="here"
                                    // onHelperTextLinkClick={() => setCurrentInput(6)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='py-3 space-x-2 px-2'>
                        <input 
                            type="checkbox" 
                            id="sign-up-checkbox"
                            className='peer relative appearance-none w-3 h-3 focus:outline-none'
                            // checked
                            />
                        <label className='text-xs' >By creating an account, you agree to Dukaflani's <span className='text-blue-700 cursor-pointer'> T&Cs</span> and <span className='text-blue-700 cursor-pointer'>Privacy Policy</span></label>
                    </div>
                    <div className='pt-4'>
                        <ApiButtonWithSpinner
                            title='Create an Account'
                            onClick={handleRegister}
                            loading={isLoading}
                            bgColor='bg-blue-500'
                            hoverColor='hover:bg-blue-400'
                            textColor='text-white'
                        />
                    </div>
                </div>
            </div>
        </div>
        <footer className='flex items-center justify-center pb-2 pt-20 text-xs text-gray-600'>&copy; {new Date().getFullYear()} Jidraff Gathura</footer>
    </div>
  )
}

export default AccountRegister