import React from 'react'

const DatePicker = ({ setPrimaryState, title, inputId }) => {
  return (
    <div className='flex flex-col'>
      <label className="text-sm font-medium tracking-tight text-gray-800 px-1" htmlFor={inputId}>{ title }</label>
      <input onChange={(e) => setPrimaryState(e.target.value)} className='w-full bg-gray-100 border-gray-100 focus:ring-transparent focus:border-gray-100 cursor-pointer' type="date" id={inputId} name={inputId}></input>
    </div>
  )
}

export default DatePicker