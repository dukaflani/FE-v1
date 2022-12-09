import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { eventTypes } from '../data/events'
import InputField from './reuseable-components/InputField'
import TextAreaField from './reuseable-components/TextAreaField'
import SelectInputField from './reuseable-components/SelectInputField'
import DatePicker from './reuseable-components/DatePicker'
import TimePicker from './reuseable-components/TimePicker'
import slugify from 'slugify'
import { useFetchAccessTokenQuery } from '../redux/features/videos/videosApiSlice'
import { useSelector } from 'react-redux'

const EventInfoInput = () => {
    const router = useRouter()
    const [poster, setPoster] = useState('')
    const [eventTitle, setEventTitle] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [location, setLocation] = useState('')
    const [venue, setVenue] = useState('')
    const [eventType, setEventType] = useState('')
    const [description, setDescription] = useState('')
    const [ticketLink, setTicketLink] = useState('')
    const [eventDate, setEventDate] = useState('')
    const [eventTime, setEventTime] = useState('')
    const [createdEvent, setCreatedEvent] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')
    const eventSlug = slugify(eventTitle, {lower: true})
    const { data: accessToken } = useFetchAccessTokenQuery()
    const { userProfile } = useSelector((state) => state.auth)
    const userProfileId = userProfile?.info ? userProfile?.info[0]?.id : 0


    const refreshToken = `JWT ${accessToken?.access}`

    const myHeaders = new Headers();
    myHeaders.append("Authorization", refreshToken);

    const eventInfo = new FormData();
    eventInfo.append("poster", poster);
    eventInfo.append("title", eventTitle);
    eventInfo.append("country", country);
    eventInfo.append("city", city);
    eventInfo.append("location", location);
    eventInfo.append("venue", venue);
    eventInfo.append("event_type", eventType);
    eventInfo.append("description", description);
    eventInfo.append("ticket_link", ticketLink);
    eventInfo.append("date", eventDate);
    eventInfo.append("time", eventTime);
    eventInfo.append("slug", eventSlug);
    eventInfo.append("customuserprofile", userProfileId);


    const handleAddProduct = () => {
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/store/events/`,
        {
            method: 'POST',
            headers: myHeaders,
            body: eventInfo,
        }
        )
        .then((response) => response.json())
        .then((result) => {
            setCreatedEvent(result)
            router.push("/dashboard/events")
        })
        .catch((error) => {
            setErrorMessage(error)
        });
    }


  return (
    <div className='p-2 bg-white shadow-md border-b mb-10'>
        <div className='p-1'>
            <InputField
                title="Event Title"
                primaryState={eventTitle}
                setPrimaryState={setEventTitle}
            />
        </div>
        <div className='flex space-x-3'>
            <div className='p-1 w-1/2'>
                <InputField
                    title="Country"
                    primaryState={country}
                    setPrimaryState={setCountry}
                />
            </div>
            <div className='p-1 w-1/2'>
                <InputField
                    title="City"
                    primaryState={city}
                    setPrimaryState={setCity}
                />
            </div>
        </div>
        <div className='flex space-x-3'>
            <div className='p-1 w-1/3'>
                <InputField
                    title="Location"
                    helperText="Region within the city"
                    primaryState={location}
                    setPrimaryState={setLocation}
                />
            </div>
            <div className='p-1 w-1/3'>
                <InputField
                    title="Venue"
                    primaryState={venue}
                    setPrimaryState={setVenue}
                    helperText="eg Name of club/auditorium"
                />
            </div>
            <div className='p-1 w-1/3'>
                <SelectInputField 
                    fieldTitle="Event Type"
                    primaryState={eventType}
                    setPrimaryState={setEventType}
                    selectTitle="Choose an event"
                    data={eventTypes}
                    name="eventtype"
                />
            </div>
        </div>
        <div className='p-1'>
            <TextAreaField
                title="Description"
                primaryState={description}
                setPrimaryState={setDescription}
            />
        </div>
        <div className='p-1'>
            <InputField
                title="Ticket Link"
                primaryState={ticketLink}
                setPrimaryState={setTicketLink}
            />
        </div>
        <div className='flex mb-2 space-x-3'>
            <div className='p-1 w-1/2'>
                <DatePicker
                    title="Event Date"
                    inputId="eventdate"
                    setPrimaryState={setEventDate}
                />
            </div>
            <div className='p-1 w-1/2'>
                <TimePicker
                    title="Event Time"
                    inputId="eventtime"
                    setPrimaryState={setEventTime}
                />
            </div>
        </div>
        <div className='p-1'>
            <input accept='image/*' onChange={(e) => setPoster(e.target.files[0])} type="file"  className='w-full border-gray-300 focus:outline-none' />
            <div className='py-1 text-xs text-gray-400'>Upload poster image max size 300KB</div>
        </div>
        <br/>
        <div className='flex items-center justify-between'>
            <div className='bg-red-600 hover:bg-red-400 text-white cursor-pointer px-2 py-1 uppercase font-semibold text-sm tracking-tight'>Cancel</div>
            <div onClick={handleAddProduct} className='border border-gray-500 text-gray-500 hover:bg-gray-300 hover:border-gray-300 cursor-pointer px-2 py-1 uppercase font-semibold text-sm tracking-tight'>Add Event</div>
        </div>
    </div>
  )
}

export default EventInfoInput