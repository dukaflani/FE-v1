import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { roleChoices } from '../data/accountRoles'
import ApiButtonWithSpinner from './reuseable-components/ApiButtonWithSpinner'
import InputField from './reuseable-components/InputField'
import SelectInputField from './reuseable-components/SelectInputField'
import { useEditUserMutation } from '../redux/features/videos/videosApiSlice'

const UserSettingsComponent = () => {
    const router = useRouter()
    const { user } = useSelector((state) => state.auth)

    const [firstName, setFirstName] = useState('')
    const [secondName, setSecondName] = useState('')
    const [username, setUsername] = useState('')
    const [accountRole, setAccountRole] = useState('')
    const [phone, setPhone] = useState('')
    const [brandName, setBrandName] = useState('')
    const [email, setEmail] = useState('')
    const [emptyFields, setEmptyFields] = useState(false)
    const [editErrors, setEditErrors] = useState(null)
    const [ editUser, { isLoading } ] = useEditUserMutation()


    useEffect(() => {
        setFirstName(user?.info?.first_name)
        setSecondName(user?.info?.last_name)
        setUsername(user?.info?.username)
        setAccountRole(user?.info?.role)
        setPhone(user?.info?.phone)
        setBrandName(user?.info?.stage_name)
        setEmail(user?.info?.email)
    }, [user?.info])


    const editUserInfo = {
      "first_name": firstName,
      "last_name": secondName,
      "username": username,
      "role": accountRole,
      "phone": phone,
      "stage_name": brandName,
      "email": email
    }

    const handleEditUser = async () => {
      if (firstName && secondName && username && accountRole && email) {
        setEmptyFields(false)
        try {
          await editUser(editUserInfo)
          router.push("/profile")
        } catch (error) {
          setEditErrors(error)
        }
        
      } else {
        setEmptyFields(true)
      }
    }
    


  return (
    <div className='pt-20 w-full px-2 pb-20'>
      <div className='w-full md:max-w-sm landscape:max-w-sm mx-auto bg-white shadow p-5 space-y-4'>
        <div className='text-gray-800 font-bold tracking-tight uppercase'>User Settings</div>
        <div className='w-full grid grid-cols-1 gap-y-3'>
          <div className='w-full'>
            <InputField
              primaryState={firstName} 
              setPrimaryState={setFirstName}
              title='First Name'
            />
          </div>
          <div className='w-full'>
            <InputField
              primaryState={secondName} 
              setPrimaryState={setSecondName}
              title='Second Name'
            />
          </div>
          <div className='w-full'>
            <InputField
              primaryState={username} 
              setPrimaryState={setUsername}
              title='Username'
            />
          </div>
          <div className='w-full'>
            <SelectInputField
                primaryState={accountRole}
                setPrimaryState={setAccountRole} 
                // mandatory={true}
                name='account-role'
                data={roleChoices}
                selectTitle={accountRole}
                fieldTitle="Account"
                // helperText="helper"
                // onHelperTextLinkClick={}
                // helperTextLink="here"
            />
          </div>
          <div className='w-full'>
            <InputField
              primaryState={phone}
              setPrimaryState={setPhone} 
              title='Phone'
            />
          </div>
          <div className='w-full'>
            <InputField
                primaryState={brandName}
                setPrimaryState={setBrandName} 
                title='Brand Name'
                helperText='Business/Stage name or alias'
            />
          </div>
        </div>
        <div>
          <InputField
            primaryState={email}
            setPrimaryState={setEmail} 
            title='Email'
          />
        </div>
        <div className='flex items-center justify-start py-2'>
          <div>
            <ApiButtonWithSpinner
              title='Update User'
              bgColor='bg-blue-500'
              textColor='text-white'
              hoverColor='hover:bg-blue-400'
              onClick={handleEditUser}
              loading={isLoading}
             />
          </div>
        </div>
      </div>
      <footer className='flex items-center justify-center pb-2 pt-5 text-xs text-gray-600'>&copy; {new Date().getFullYear()} Jidraff Gathura</footer>
    </div>
  )
}

export default UserSettingsComponent