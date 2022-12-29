import { LinkIcon, ShoppingBagIcon, MicrophoneIcon, DevicePhoneMobileIcon, 
    MusicalNoteIcon, CalendarDaysIcon } from '@heroicons/react/24/outline'

export const tabButtons = [
    {
        name: 'Links',
        icon: <LinkIcon className="h-5 w-5" />,
        urlQueryParams: {tab: 'links'},
    },
    {
        name: 'Shop',
        icon: <ShoppingBagIcon className="h-5 w-5" />,
        urlQueryParams: {tab: 'product'},
    },
    {
        name: 'Lyrics',
        icon: <MicrophoneIcon className="h-5 w-5" />,
        urlQueryParams: {tab: 'lyrics'},
    },
    {
        name: 'Skiza',
        icon: <DevicePhoneMobileIcon className="h-5 w-5" />,
        urlQueryParams: {tab: 'skiza'},
    },
    {
        name: 'Album',
        icon: <MusicalNoteIcon className="h-5 w-5" />,
        urlQueryParams: {tab: 'album'},
    },
    {
        name: 'Events',
        icon: <CalendarDaysIcon className="h-5 w-5" />,
        urlQueryParams: {tab: 'events'},
    },
]