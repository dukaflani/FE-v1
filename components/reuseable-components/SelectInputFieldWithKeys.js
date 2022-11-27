import React from 'react'

const SelectInputFieldWithKeys = ({ primaryState, setPrimaryState, name, data, selectTitle, fieldTitle, helperText, 
  onHelperTextLinkClick, helperTextLink, mandatory }) => {
  return (
    <>
    <div className="text-sm font-medium tracking-tight text-gray-800 px-1">{fieldTitle}{mandatory && " *"}</div>
        <select value={primaryState} onChange={(e) => setPrimaryState(e.target.value)} className='w-full border-gray-100 focus:ring-transparent focus:border-gray-100 cursor-pointer bg-gray-100' name={name} id={name}>
            <option value="">{selectTitle}</option>
            {data?.map((dataItem, i) => (
                <option className='cursor-pointer' key={i} value={dataItem?.id}>{dataItem?.title.replace(/-/g, " ")}</option>
            ))}
        </select>
        <div className="px-2 text-xs text-gray-400 mt-1">{helperText}<span onClick={onHelperTextLinkClick} className='text-blue-700 font-medium cursor-pointer'>{helperTextLink ? ` ${helperTextLink}` : " "}</span></div>
    </>
  )
}

export default SelectInputFieldWithKeys