import React from 'react'
import Image from "next/legacy/image";
import ShowMoreText from "react-show-more-text";
import productImage from '../media/product.jpg'


const MyProducts = () => {
  return (
    <div className='bg-white shadow'>
            <div>
                <div className='relative h-[17rem] w-full'>
                    <Image
                        src={productImage}
                        layout="fill"
                        objectFit='cover'
                        />
                </div>
            </div>
            <div className='text-xs py-1 px-2 uppercase tracking-wide bg-blue-500 text-white font-semibold'>
                <div className='line-clamp-1'>Global Product </div>
            </div>
            <div>
                <div className='flex flex-col space-y-2 mt-3'>
                    <div className='flex items-center justify-start px-2 font-semibold text-base leading-4 text-gray-800'>
                        <p>Product title</p>
                    </div>
                    <div className='flex items-start justify-start px-2 tracking-tight text-lg font-extrabold text-gray-800'>
                        <p className='flex items-start justify-start'>Ksh.3,000</p>
                    </div>
                </div>
                <div className='px-2 mt-2'>
                    <div className='text-sm font-semibold tracking-tight text-gray-800'>Description</div>
                    <div className="text-sm leading-4 tracking-tight text-gray-800 whitespace-pre-wrap line-clamp-1">Product description</div>
                </div>
                {/* <div className='px-2 text-sm tracking-tight mt-2'>Colors</div>
                <div className='flex space-x-1 px-2'>
                    {colorOptions.map((colorOption, i) => (
                        <div key={i} style={{backgroundColor: `${colorOption}`, opacity:0.8}} onClick={() => setActiveColor(i)} className='h-5 w-5 cursor-pointer text-gray-300 flex items-center justify-center border border-black'>{activeColor === i && <CheckIcon/>}</div>
                    ))}
                </div>
                <div className='px-2 text-sm tracking-tight mt-2'>Sizes</div>
                <div className='flex space-x-3 px-2'>
                    {sizeOptions.map((sizeOption, i) => (
                        <div  key={i} className={activeSize === i ? activeSizeStyles : regularSizeStyles} onClick={() => setActiveSize(i)}>{sizeOption}</div>
                    ))}
                </div> */}
            </div>
            <div className='grid grid-cols-2 border-t bg-gray-100 items-center justify-center cursor-pointer mt-3 uppercase text-xs tracking-wider font-semibold'>
              <div className='flex items-center justify-center text-blue-500 p-2 hover:bg-gray-50 border-r border-r-gray-300'>Edit</div>
              <div className='flex items-center justify-center text-red-500 p-2 hover:bg-gray-50'>Delete</div>
            </div>
        </div>
  )
}

export default MyProducts