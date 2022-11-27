import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-modal'
import { setCredentials } from '../redux/features/auth/authSlice'
import { useGetProfileQuery } from '../redux/features/videos/videosApiSlice'
import Navbar from './Navbar'
import SignInRequestBottomBar from './SignInRequestBottomBar'
import SignInModalContent from './SignInModalContent'

Modal.setAppElement("#__next")

const Navigation = () => {
const dispatch = useDispatch()  
const { signInModalOpen } = useSelector((state) => state.navigation)
const { data: profile } = useGetProfileQuery()


useEffect(() => {
  if(profile?.data){
    dispatch(setCredentials({info: profile?.data}))
  }
}, [profile?.data])


const { userProfile } = useSelector((state) => state.auth)
const userAvatar = userProfile?.info ? userProfile?.info[0]?.profile_avatar : null


  return (
    <>
        <Navbar myAvatar={userAvatar}/>
        {!profile && <SignInRequestBottomBar/>}
        <Modal 
          isOpen={signInModalOpen}
          style={{content:{backgroundColor:'transparent', border:'none', display:'flex', alignItems:'center', justifyContent:'center'}, 
                  overlay:{backgroundColor: "rgba(0, 0, 0, 0.3)", zIndex:'99999'}}}
          >
          <div className='bg-white shadow w-7/12 h-5/6'>
            <SignInModalContent />
          </div>
        </Modal>
    </>
  )
}

export default Navigation