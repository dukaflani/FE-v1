import { NextRequest, NextResponse, userAgent } from 'next/server'

// Set pathname where middleware will be executed
// export const config = {
//   matcher: ['/', ]
// }

export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - favicon.ico (favicon file)
       */
      "/((?!.*\\.|api|_next/static|_next/image|favicon.ico\\/).*)"
      // '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
  }


export function middleware(req: NextRequest) {
  // Parse user agent
  const { device } = userAgent(req)
  const originalPathName = req.nextUrl.pathname
  
  // Check the viewport
  const viewport = device.type === 'mobile' ? 'mobile' : 'desktop'
  // const viewport = 'mobile'
  
  //Update the expected url
  req.nextUrl.pathname = `_viewport/${viewport}${originalPathName}`
  

  // Return rewrited response
  return NextResponse.rewrite(req.nextUrl)
}