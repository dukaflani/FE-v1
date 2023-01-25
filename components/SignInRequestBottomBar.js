import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import Button from '../components/reuseable-components/Button'
import { toggleSignInModalOpen } from '../redux/features/navigation/navigationSlice'

const SignInRequestBottomBar = () => {
    const dispatch = useDispatch()
    const router = useRouter() 

  return (
    <div className='flex flex-col items-center justify-center fixed bottom-0 left-0 right-0 bg-white border-t shadow-inner p-5 z-50'>
        <div className='font-medium'>Dukaflani: Home of Music Videos</div>
        <div>Login to like videos, vote, buy merchandise or to join your favourite artist's fanbase</div>
        <div className='pt-1 space-x-2'>
            <Button
                title='Login'
                onClick={() => dispatch(toggleSignInModalOpen(true))}
            />
            <Button
                title='Register'
                onClick={() => router.push({ pathname: '/account/register' })}
            />
        </div>
    </div>
  )
}

export default SignInRequestBottomBar