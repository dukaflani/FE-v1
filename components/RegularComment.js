import React from 'react'
import Image from 'next/image'
import Linkify from 'react-linkify';
import ShowMoreText from "react-show-more-text";
import { formatDistanceStrict } from 'date-fns';
import noAvatar from '../media/noimage.webp'

const RegularComment = ({ comment }) => {
const desc = comment?.body
const hashTags = desc?.split(' ')
const hashTagRegex = /#[a-z0-9_]+/gi 

const videoUploadTime = formatDistanceStrict(
    new Date(comment?.date),
    new Date(),
    {
      addSuffix: true,
    },
  );


  return (
    <div className='flex w-full mb-6 space-x-2'>
        <div className='w-1/12 flex items-start justify-end'>
            <div className='relative h-10 w-10'>
                <Image
                    src={comment?.avatar ? comment?.avatar : noAvatar}
                    layout="fill"
                    objectFit='cover'
                    className='rounded-full'
                    />
            </div>
        </div>
        <div className='w-11/12 flex flex-col items-start justify-start pr-10 pt-2'>
            <div className='text-sm tracking-tight font-semibold text-gray-700'>{comment?.name} &bull; <span className='text-sm tracking-tight font-normal'>{videoUploadTime}</span></div>
            <div className='tracking-tight text-sm'>
            <Linkify componentDecorator={(decoratedHref, decoratedText, key) => ( <a target="blank" className='text-blue-600 -mb-1 w-56 inline-block overflow-hidden overflow-ellipsis whitespace-nowrap'  href={decoratedHref} key={key}> {decoratedText} </a> )} >
                <ShowMoreText
                    lines={3}
                    more="Show more"
                    less="Show less"
                    className="content-css text-sm leading-4 tracking-tight text-gray-800 whitespace-pre-wrap"
                    anchorClass="text-xs tracking-tight uppercase text-blue-700 ml-1"
                    expanded={false}
                    truncatedEndingComponent={"... "}
                >
                {hashTags?.map((hashTag, i) => {
                    return hashTag.match(hashTagRegex) ? (
                        <div key={i}><span className='text-blue-600'>{hashTag}</span> {' '}</div>
                    ) : hashTag + ' '
                })}
                </ShowMoreText>
            </Linkify>
            </div>
        </div>
    </div>
  )
}

export default RegularComment