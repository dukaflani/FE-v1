import React from 'react'

const SkizaTuneMobile = ({ skiza }) => {
  return (
    <div className={skiza?.skiza_tune == undefined ? 'hidden' : 'mb-5 border-b pb-5'}>
        <button disabled className='uppercase text-xs bg-gray-800 text-white px-0.5'>{skiza?.country ? skiza?.country : "No Skiza Tune Found"}</button>
        <div className='flex'>
            <div className='w-1/3 text-sm tracking-tight font-semibold text-gray-800'>Carrier</div>
            <div className='w-2/3 text-sm tracking-tight text-gray-700'>{skiza?.carrier ? skiza?.carrier : "---"}</div>
        </div>
        <div className='flex'>
            <div className='w-1/3 text-sm tracking-tight font-semibold text-gray-800'>Skiza Code</div>
            <div className='w-2/3 text-sm tracking-tight text-gray-700'>{skiza?.code ? skiza?.code : "---"}</div>
        </div>
        <div className='flex'>
            <div className='w-1/3 text-sm tracking-tight font-semibold text-gray-800'>SMS To</div>
            <div className='w-2/3 text-sm tracking-tight text-gray-700'>{skiza?.sms ? skiza?.sms : "---"}</div>
        </div>
        <div className='flex'>
            <div className='w-1/3 text-sm tracking-tight font-semibold text-gray-800'>USSD</div>
            <div className='w-2/3 text-sm tracking-tight text-gray-700'>{skiza?.ussd ? skiza?.ussd : "---"}</div>
        </div>
    </div>
  )
}

export default SkizaTuneMobile