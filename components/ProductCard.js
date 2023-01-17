import React from 'react'
import Image from "next/legacy/image";
import ShowMoreText from "react-show-more-text";
// import { CheckIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import poster from '../public/media/dukaflani-poster-default.png'
import { useFetchProductQuery } from '../redux/features/videos/videosApiSlice';
import numeral from 'numeral';

const ProductCard = ({ title }) => {
    const { video } = useSelector((state) => state.videos)

    const queryParams = {
        product_id: video?.details?.product,
      }

    const { data: product } = useFetchProductQuery(queryParams)

    const localPrice = product?.data?.local_price
    let formattedLocalPrice = numeral(localPrice).format('0,0')

    const msg = `Hello ${product?.data?.sold_by}, I'm interested in the ${product?.data?.title} from ${product?.data?.promoted_by}'s '${title}' video on dukaflani.com`
    const msg2 = msg.replace(/ /g, "%20")
    const whatsappLink = `https://wa.me/${product?.data?.whatsapp}?text=${msg2}`


  return (
    <div className='px-5'>
        <div className='text-sm uppercase tracking-tighter text-gray-800 font-semibold'>Products & Merchandise</div>
        <div className='text-sm mb-5 tracking-tighter text-gray-700'>Buy directly from {video?.details?.stage_name} partners and associates</div>
        <div className='bg-white shadow-lg'>
            <div>
                <div className='relative h-[21rem] w-full'>
                    <Image
                        src={!product?.data?.image ? poster : product?.data?.image}
                        layout="fill"
                        objectFit='cover'
                        />
                </div>
            </div>
            <div className='flex items-center justify-between text-xs py-1 px-2 tracking-wide bg-gray-800 text-white font-semibold'>
                {!product?.data?.is_sponsored ? <div className='line-clamp-1 uppercase'>{!product?.data?.id ? "No product found" : "Buy now!"} </div>
                :
                <p className='line-clamp-1 font-normal bg-yellow-400 px-1'>Sponsored</p>}
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
            </div>
            <a href={whatsappLink} target="_blank" rel="noopener">
                <div style={{backgroundColor:'#25D366'}} className='flex items-center justify-center p-2 cursor-pointer mt-3 text-white uppercase text-xs tracking-wider font-semibold'>order on whatsapp</div>
            </a>
        </div>
        <footer className='text-xs flex items-center justify-center pt-5 pb-2 text-gray-500'>{product?.data?.sold_by && "Sold by"} {product?.data?.sold_by}</footer>
    </div>
  )
}

export default ProductCard