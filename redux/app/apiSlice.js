import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials, logOut } from '../features/auth/authSlice'


// const baseQuery = fetchBaseQuery({
//     baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
//     // credentials: 'include',
//     prepareHeaders: (headers, { getState }) => {
//         const token = getState().auth.token
//         if (token) {
//             headers.set("Authorization", `JWT ${token}`)
//         }
//         return headers
//     }
// })

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_NEXT_URL,
})


const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.originalStatus === 401) {
        console.log("Sending refresh token");
        // Send refresh token to get new access token
        const refreshResult = await baseQuery(process.env.NEXT_PUBLIC_REFRESH_TOKEN_ENDPOINT, api, extraOptions)
        console.log("Refresh Results:", refreshResult?.data);
        if (refreshResult?.data) {
            const user = api.getState().auth.user
            // Store the new token
            api.dispatch(setCredentials({...refreshResult.data, user}))
            // Retry original query with new access token
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut())
        }
    }
    return result
}


export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Fanbase'],
    endpoints: builder => ({})
})