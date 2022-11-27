import React, { useState } from 'react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

const InputFieldPassword = ({ primaryState, setPrimaryState, placeholderText, title, helperText, 
    helperTextLink, onHelperTextLinkClick, mandatory }) => {

    const [hidePassword, setHidePassword] = useState(true)

  return (
    <>
    <div className="text-sm font-medium tracking-tight text-gray-800 px-1">{title}{mandatory && " *"}</div>
    <div className='flex items-center justify-center w-full bg-gray-100'>
        <input 
            value={primaryState} 
            onChange={(e) => setPrimaryState(e.target.value)} 
            className='w-10/12 bg-gray-100 border-none focus:ring-transparent focus:border-none' 
            // className='w-full border-gray-300 focus:ring-transparent focus:border-gray-400' 
            type={hidePassword ? "password" : "text"} 
            placeholder={placeholderText}
            /> 
        <div onClick={() => setHidePassword(!hidePassword)} className='w-2/12 flex items-center justify-end pr-2 cursor-pointer'>{hidePassword ? <EyeIcon className='h-5 w-5 text-gray-700'/> : <EyeSlashIcon className='h-5 w-5 text-gray-700'/>}</div>
    </div>
    <div className="px-2 text-xs text-gray-400 mt-1">{helperText}<span onClick={onHelperTextLinkClick} className='text-blue-700 font-medium cursor-pointer'>{helperTextLink ? ` ${helperTextLink}` : " "}</span></div>
    </>
  )
}

export default InputFieldPassword