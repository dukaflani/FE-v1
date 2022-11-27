import React from 'react'

const TextAreaField = ({ primaryState, setPrimaryState, placeholderText, title, helperText, 
  helperTextLink, onHelperTextLinkClick, mandatory }) => {
  return (
    <>
    <div className="text-sm font-medium tracking-tight text-gray-800 px-1">{title}{mandatory && " *"}</div>
    <textarea value={primaryState} onChange={(e) => setPrimaryState(e.target.value)} className='w-full border-gray-100 focus:ring-transparent focus:border-gray-100 bg-gray-100' rows="5" placeholder={placeholderText} /> 
    <div className="px-2 text-xs text-gray-400 mt-1">{helperText}<span onClick={onHelperTextLinkClick} className='text-blue-700 font-medium cursor-pointer'>{helperTextLink ? ` ${helperTextLink}` : " "}</span></div>
    </>
  )
}

export default TextAreaField