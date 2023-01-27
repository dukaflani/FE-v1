import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import Button from '../components/reuseable-components/Button'
import { toggleSignInModalOpen } from '../redux/features/navigation/navigationSlice'

const SignInRequestBottomBar = () => {
    const dispatch = useDispatch()
    const router = useRouter() 

  return (
    <div className='flex flex-col items-center justify-center fixed bottom-0 left-0 right-0 bg-white border-t shadow-inner p-5 z-50'>
        <div className='font-semibold'>Entrepreneurs In Music Sell Their Products Here</div>
        <div className='uppercase text-sm py-2'>Streaming Links | Merchandise | Lyrics | Skiza Tunes | Albums | Events | Videos</div>
        <div className='pt-1 space-x-2'>
            <Button
                title='Register Now'
                onClick={() => router.push({ pathname: '/account/register' })}
            />
            <Button
                title='Click to Login'
                onClick={() => dispatch(toggleSignInModalOpen(true))}
            />
        </div>
    </div>
  )
}

export default SignInRequestBottomBar