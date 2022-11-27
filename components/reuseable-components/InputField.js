import React from 'react'

const InputField = ({ primaryState, setPrimaryState, placeholderText, title, helperText, helperTextLink, 
  onHelperTextLinkClick, mandatory, ref }) => {
  return (
    <>
    <div className="text-sm font-medium tracking-tight text-gray-800 px-1">{title}{mandatory && " *"}</div>
     <input 
        value={primaryState} 
        onChange={(e) => setPrimaryState(e.target.value)}
        ref={ref} 
        className='w-full bg-gray-100 border-none focus:ring-transparent focus:border-none' 
        // className='w-full border-gray-300 focus:ring-transparent focus:border-gray-400' 
        type="text" 
        placeholder={placeholderText}
        /> 
    <div className="px-2 text-xs text-gray-400 mt-1">{helperText}<span onClick={onHelperTextLinkClick} className='text-blue-700 font-medium cursor-pointer'>{helperTextLink ? ` ${helperTextLink}` : " "}</span></div>
    </>
  )
}

export default InputField