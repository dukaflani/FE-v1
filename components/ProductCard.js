import React from 'react'
import Image from "next/legacy/image";
import ShowMoreText from "react-show-more-text";
// import { CheckIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import { useFetchProductQuery } from '../redux/features/videos/videosApiSlice';
import numeral from 'numeral';

const ProductCard = () => {
    const { video } = useSelector((state) => state.videos)
    // const colorOptions = ['red', 'green', 'blue', 'black', 'yellow', 'white', 'brown', 'khaki']
    // const sizeOptions = ['sm', 'md', 'lg', 'xl', 'xxl', 'xxxl']
    // const [activeSize, setActiveSize] = useState(1)
    // const [activeColor, setActiveColor] = useState(0)
    // const activeSizeStyles = 'flex items-center justify-center uppercase tracking-wider font-extrabold text-sm text-gray-900 cursor-pointer'
    // const regularSizeStyles = 'flex items-center justify-center uppercase tracking-wider font-extrabold text-sm text-gray-400 hover:text-gray-800 cursor-pointer'

    const queryParams = {
        product_id: video?.details?.product,
      }

    const { data: product } = useFetchProductQuery(queryParams)

    const localPrice = product?.data?.local_price
    let formattedLocalPrice = numeral(localPrice).format('0,0')


    console.log("video object product page:", video?.details?.product);
    console.log("product details:", product?.data);

  return (
    <div className='px-5'>
        <div className='text-sm uppercase tracking-tighter text-gray-800 font-semibold'>Products & Merchandise</div>
        <div className='text-sm mb-5 tracking-tighter text-gray-700'>Buy directly from sellers approved by {video?.details?.stage_name}</div>
        <div className='bg-white shadow-lg'>
            <div>
                <div className='relative h-[21rem] w-full'>
                    <Image
                        src={product?.data?.image}
                        layout="fill"
                        objectFit='cover'
                        />
                </div>
            </div>
            <div className='text-xs py-1 px-2 uppercase tracking-wide bg-gray-300 text-gray-900 font-semibold'>
                <div className='line-clamp-1'>Order now to save 20% </div>
            </div>
            <div>
                <div className='flex flex-col space-y-2 mt-3'>
                    <div className='flex items-center justify-start px-2 font-semibold text-base leading-4 text-gray-800'>
                        <p>{product?.data?.title}</p>
                    </div>
                    <div className='flex items-start justify-start px-2 tracking-tight text-lg font-extrabold text-gray-800'>
                        <p className='flex items-start justify-start'>{product?.data?.local_currency}{formattedLocalPrice}</p>
                    </div>
                </div>
                <div className='px-2 mt-2'>
                    <div className='text-sm font-semibold tracking-tight text-gray-800'>Description</div>
                    <ShowMoreText
                    lines={2}
                    more="Show more"
                    less="Show less"
                    className="content-css text-sm leading-4 tracking-tight text-gray-800 whitespace-pre-wrap"
                    anchorClass="text-xs tracking-tight uppercase text-blue-700"
                    expanded={false}
                    truncatedEndingComponent={"... "}
                >
                    <div>{product?.data?.description}</div>
                </ShowMoreText>
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
            <div style={{backgroundColor:'#25D366'}} className='flex items-center justify-center p-2 cursor-pointer mt-3 text-white uppercase text-xs tracking-wider font-semibold'>order on whatsapp</div>
        </div>
        <footer className='text-xs flex items-center justify-center pt-5 pb-2 text-gray-500'>Sold by {product?.data?.sold_by}</footer>
    </div>
  )
}

export default ProductCard