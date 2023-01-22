import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import slugify from 'slugify'
import FormData from 'form-data'
import { eventTypes } from '../data/events'
import InputField from './reuseable-components/InputField'
import TextAreaField from './reuseable-components/TextAreaField'
import SelectInputField from './reuseable-components/SelectInputField'
import DatePicker from './reuseable-components/DatePicker'
import TimePicker from './reuseable-components/TimePicker'
import ApiButtonWithSpinner from './reuseable-components/ApiButtonWithSpinner'
import { useFetchAccessTokenQuery, useFetchEditEventQuery } from '../redux/features/videos/videosApiSlice'
import { useSelector } from 'react-redux'

const EditEvent = () => {
    const router = useRouter()
    const { eventid } = router.query
    const { user } = useSelector((state) => state.auth)
    const currentUser = user?.info?.id


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
    const [editedEvent, setEditedEvent] = useState(null)
    const [editErrors, setEditErrors] = useState('')
    const [editing, setEditing] = useState(false)
    const [eventUserId, setEventUserId] = useState('') 
    const slugString = eventTitle ? eventTitle : " "
    const eventSlug = slugify(slugString, {lower: true})

    const queryParams = {
        event_id: eventid,
        }
  
    const { data: events, isLoading } = useFetchEditEventQuery(queryParams)
    const { data: accessToken } = useFetchAccessTokenQuery()
    

   
    useEffect(() => {
        setEventTitle(events?.data?.title)
        setCountry(events?.data?.country)
        setCity(events?.data?.city)
        setLocation(events?.data?.location)
        setVenue(events?.data?.venue)
        setEventType(events?.data?.event_type)
        setDescription(events?.data?.description)
        setTicketLink(events?.data?.ticket_link)
        setEventDate(events?.data?.date)
        setEventTime(events?.data?.time)
        setEventUserId(events?.data?.user)

    }, [events?.data])


    const refreshToken = `JWT ${accessToken?.access}`

    const myHeaders = new Headers();
    myHeaders.append("Authorization", refreshToken);

    const editEventInfo = new FormData();
    editEventInfo.append("poster", poster);
    editEventInfo.append("title", eventTitle);
    editEventInfo.append("country", country);
    editEventInfo.append("city", city);
    editEventInfo.append("location", location);
    editEventInfo.append("venue", venue);
    editEventInfo.append("event_type", eventType);
    editEventInfo.append("description", description);
    editEventInfo.append("ticket_link", ticketLink);
    editEventInfo.append("date", eventDate);
    editEventInfo.append("time", eventTime);
    editEventInfo.append("slug", eventSlug);


    const handleEditEvent = () => {
        setEditing(true)
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/store/events/${eventid}/`,
        {
            method: 'PATCH',
            headers: myHeaders,
            body: editEventInfo,
        }
        )
        .then((response) => response.json())
        .then((result) => {
            setEditing(false)
            setEditedEvent(result)
            router.push("/dashboard/events")
        })
        .catch((error) => {
            setEditing(false)
            setEditErrors(error)
        });
    }





  return (
    <div>
        <h1 className='uppercase tracking-tight font-extrabold text-lg text-gray-800'>Edit Event</h1>
        <div className='p-1'>
            <InputField
                title="Event Title"
                primaryState={eventTitle}
                setPrimaryState={setEventTitle}
            />
        </div>
        <div className='flex flex-col'>
            <div className='p-1 w-full'>
                <InputField
                    title="Country"
                    primaryState={country}
                    setPrimaryState={setCountry}
                />
            </div>
            <div className='p-1 w-full'>
                <InputField
                    title="City"
                    primaryState={city}
                    setPrimaryState={setCity}
                />
            </div>
        </div>
        <div className='flex flex-col'>
            <div className='p-1 w-full'>
                <InputField
                    title="Location"
                    helperText="Region within the city"
                    primaryState={location}
                    setPrimaryState={setLocation}
                />
            </div>
            <div className='p-1 w-full'>
                <InputField
                    title="Venue"
                    primaryState={venue}
                    setPrimaryState={setVenue}
                    helperText="eg Name of club/auditorium"
                />
            </div>
            <div className='p-1 w-full'>
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
        <div className='flex mb-2 flex-col'>
            <div className='p-1 w-full'>
                <DatePicker
                    title="Event Date"
                    inputId="eventdate"
                    setPrimaryState={setEventDate}
                />
            </div>
            <div className='p-1 w-full'>
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
            <ApiButtonWithSpinner
                title='Cancel'
                bgColor="bg-red-600"
                hoverColor="hover:bg-red-500"
                textColor="text-white"
                onClick={() => router.push("/dashboard/events")}
            />
            {eventUserId == currentUser && <ApiButtonWithSpinner
                title='Edit Event'
                bgColor="bg-blue-500"
                hoverColor="hover:bg-blue-400"
                textColor="text-white"
                onClick={handleEditEvent}
                loading={editing}
            />}
        </div>
    </div>
  )
}

export default EditEvent