import { useState } from "react";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import poster from '../../../../../public/apple-touch-icon.png'
import InputFieldPassword from '../../../../../components/reuseable-components/InputFieldPassword'
import ApiButtonWithSpinner from '../../../../../components/reuseable-components/ApiButtonWithSpinner'
import Link from "next/link";
import { useConfirmMyNewPasswordMutation } from "../../../../../redux/features/videos/videosApiSlice";

const PasswordResetConfirm = () => {
    const router = useRouter()
    const fullUrlPath = router.asPath.split("/")
    const url_uid = fullUrlPath[4]
    const url_token = fullUrlPath[5]

    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [errorCode, setErrorCode] = useState('')
    const [requestErrors, setRequestErrors] = useState(false)

    const [ confirmMyNewPassword, { isLoading, isSuccess } ] = useConfirmMyNewPasswordMutation()

    const myNewEmail = {
        uid: url_uid,
        token: url_token,
        new_password: newPassword,
        re_new_password: confirmNewPassword
    }

    const handlePasswordChangeConfirm = async () => {
        if (newPassword != '' && confirmNewPassword != '') {
            try {
               await confirmMyNewPassword(myNewEmail)
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
            <h1 className='text-lg text-gray-800 tracking-tight font-black'>Change Your Password</h1>
            {isSuccess == false ? <>
                <div className='w-full my-4'>
                    <InputFieldPassword
                        title="New Password"
                        primaryState={newPassword}
                        setPrimaryState={setNewPassword}
                    />
                </div>
                <div className='w-full mb-4'>
                    <InputFieldPassword
                        title="Confirm New Password"
                        primaryState={confirmNewPassword}
                        setPrimaryState={setConfirmNewPassword}
                    />
                </div>
            </>
            :
            <div className='w-full my-4 flex flex-col items-center justify-center'>
                <p className='tracking-tight text-gray-800 font-medium'>Your password has been changed</p>
                <Link href="/account/login">
                    <span className='text-sm text-blue-500 underline tracking-tight'>Login</span>
                </Link>
            </div>}
            {isSuccess == false && <div>
                <ApiButtonWithSpinner
                    title="Change Password"
                    bgColor="bg-blue-500"
                    textColor="text-white"
                    hoverColor="hover:bg-blue-400"
                    onClick={handlePasswordChangeConfirm}
                    loading={isLoading}
                />
            </div>}
        </div>

        <div className="mt-4">
            <footer className='text-xs flex items-center justify-center pt-5 pb-2 text-gray-500'>&copy; {new Date().getFullYear()} Jidraff Gathura</footer>
        </div>
    </>
  )
}

export default PasswordResetConfirm