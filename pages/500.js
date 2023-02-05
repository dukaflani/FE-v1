const serverError = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
            <span className="font-semibold text-gray-800 text-sm">Something went wrong!</span>
            <span className="text-gray-600 text-sm">Please refresh your browser or check your internet connection.</span>
        </div>
    </div>
  )
}

export default serverError