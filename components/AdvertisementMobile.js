

const AdvertisementMobile = () => {
  return (
    <div className="p-2 bg-white border-b shadow-sm flex items-center">
        <div>
             <picture>
                <img
                    src="/media/MED.png"
                    alt="Advertiser logo"
                    className="h-12 w-12 md:h-14 md:w-14 landscape:h-14 landscape:w-14 bg-gray-200"
                />
            </picture>
        </div>
        <div className="flex-1 pl-2 pr-3 flex flex-col">
            <span className="font-semibold text-gray-800 tracking-tight text-sm md:text-base landscape:text-base line-clamp-1">Sell & Advertise on Dukaflani</span>
            <div className="text-xs md:text-sm landscape:text-sm text-gray-500 tracking-tight space-x-1 font-medium">
                <span className="mr-1 bg-yellow-200 font-bold">Ad</span>
                &bull;
                <span>Dukaflani Ads</span>
            </div>
        </div>
        <div className="text-sm py-1 px-2 bg-blue-500 text-white font-medium rounded-lg tracking-tight">View</div>
    </div>
  )
}

export default AdvertisementMobile