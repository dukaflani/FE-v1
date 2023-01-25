import { useRouter } from 'next/router'
import Button from './reuseable-components/Button'


const SignInRequestBottomBar = () => {
    const router = useRouter()

  return (
    <div className='flex flex-col items-center justify-center fixed bottom-0 left-0 right-0 bg-white border-t shadow-inner p-5 z-50'>
        <div className='font-medium'>Dukaflani</div>
        <div className='font-medium text-sm'>Home of Music Videos</div>
        <div className='text-xs'>Login to like videos, vote, buy merchandise or to join your favourite artist's fanbase</div>
        <div className='pt-1 space-x-2'>
            <Button
                title='Login'
                onClick={() => router.push({pathname: '/account/login'})}
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