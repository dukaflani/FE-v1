import React from 'react'

const Button = ({ title, onClick }) => {
  return (
    <button 
        className='uppercase text-sm font-medium tracking-wide border hover:bg-gray-300 hover:border-gray-300 border-gray-500 px-2 py-1'
        onClick={onClick}
        >
            {title}
    </button>
  )
}

export default Button