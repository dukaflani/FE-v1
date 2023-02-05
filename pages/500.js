import Head from "next/head"

const serverError = () => {
  return (
    <>
    <Head>
        <title>Error | Dukaflani — Buy From Musicians</title>
        <meta name="title" content="Error | Dukaflani — Buy From Musicians"/>
        <meta name="description" content="Entrepreneurs In Music Sell Their Products Here"/>
        <meta name="keywords" content="Music Videos, Dukaflani, Links, Events, Merchandise, Skiza Tune, Lyrics, Albums"/>
      </Head>
    <div className="h-screen w-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
            <span className="font-semibold text-gray-800 text-sm">Something went wrong!</span>
            <span className="text-gray-600 text-sm">Please refresh your browser or check your internet connection.</span>
        </div>
    </div>
    </>
  )
}

export default serverError