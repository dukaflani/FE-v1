import React from 'react'
import { useLeaveFanbaseMutation } from '../redux/features/videos/videosApiSlice'

const LeaveButton = ({ data }) => {

let deleteItem = null

const [ leaveFanbase, {isLoading} ] = useLeaveFanbaseMutation()

// const handleLeaveFanbase = async (fanbaseObjectId) => {
//   await leaveFanbase(fanbaseObjectId);
// }

  return (
    <>
        {data?.map((item, i) => (
            <div key={i}>
                {isLoading ? <button className='uppercase p-1 bg-gray-800 text-white font-semibold tracking-wider text-xs'>Join</button> :
                <button onClick={ async () => await leaveFanbase(deleteItem = {"id": [item?.id]})} className='uppercase p-1 border border-gray-700 text-gray-800 font-semibold tracking-wider text-xs'>Leave</button>}
            </div>
        ))}
    </>
  )
}

export default LeaveButton