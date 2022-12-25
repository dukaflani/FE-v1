import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-modal'
import { setCredentials } from '../redux/features/auth/authSlice'
import { useFetchAccessTokenQuery, useFetchUserVideosQuery, useGetProfileQuery } from '../redux/features/videos/videosApiSlice'
import NavbarMobile from './NavbarMobile'
import SignInRequestBottomBar from './SignInRequestBottomBar'
import SignInModalContent from './SignInModalContent'

Modal.setAppElement("#__next")

const Navigation = ({ setSearchTerm, searchTerm }) => {
const dispatch = useDispatch()
const { user } = useSelector((state) => state.auth)
const currentUser = user?.info?.id  

const { signInModalOpen } = useSelector((state) => state.navigation)
const { data: profile } = useGetProfileQuery()
const { data: accessToken, isLoading } = useFetchAccessTokenQuery()

const queryParams = {
  user: currentUser
}


const { data: myVideos } = useFetchUserVideosQuery(queryParams)
const errorCode = myVideos?.data?.code




useEffect(() => {
  if(profile?.data){
    dispatch(setCredentials({info: profile?.data}))
  }
}, [profile?.data])



const { userProfile } = useSelector((state) => state.auth)
const userAvatar = userProfile?.info ? userProfile?.info[0]?.profile_avatar : null



  return (
    <>
        <NavbarMobile myAvatar={userAvatar} setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
        {!isLoading && !accessToken  && <SignInRequestBottomBar/>}
        {!isLoading && errorCode == "token_not_valid"  && <SignInRequestBottomBar/>}
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