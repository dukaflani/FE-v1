import { useRouter } from 'next/router'
import Button from './reuseable-components/Button'


const SignInRequestBottomBar = () => {
    const router = useRouter()

  return (
    <div className='flex flex-col items-center justify-center fixed bottom-0 left-0 right-0 bg-white border-t shadow-inner p-5 z-50'>
        <div className='font-semibold text-sm'>Entrepreneurs In Music Sell Their Products Here</div>
        <div className='uppercase py-2 text-xs'>Streaming Links | Merchandise | Lyrics | Skiza Tunes | Albums | Events | Videos</div>
        <div className='pt-1 space-x-2'>
            <Button
                title='Register Now'
                onClick={() => router.push({ pathname: '/account/register' })}
            />
            <Button
                title='Click to Login'
                onClick={() => router.push({pathname: '/account/login'})}
            />
        </div>
    </div>
  )
}

export default SignInRequestBottomBar