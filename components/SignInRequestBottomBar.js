import React from 'react'
import { useDispatch } from 'react-redux'
import Button from '../components/reuseable-components/Button'
import { toggleSignInModalOpen } from '../redux/features/navigation/navigationSlice'

const SignInRequestBottomBar = () => {
    const dispatch = useDispatch() 

  return (
    <div className='flex flex-col items-center justify-center fixed bottom-0 left-0 right-0 bg-white border-t shadow-inner p-5 z-50'>
        <div className='font-medium'>Dukaflani: Home of Music Videos</div>
        <div>Login to like videos, vote, comment, buy merchandise or join your favourite artist's fanbase</div>
        <div className='pt-1'>
            <Button
                title='Login'
                onClick={() => dispatch(toggleSignInModalOpen(true))}
            />
        </div>
    </div>
  )
}

export default SignInRequestBottomBar