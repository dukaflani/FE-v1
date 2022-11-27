import { apiSlice } from "../../app/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: process.env.NEXT_PUBLIC_LOGIN_URL,
                method: 'POST',
                body: { ...credentials }
            }),
            invalidatesTags: ['Auth']
        }),
        // register: builder.mutation({
        //     query: credentials => ({
        //         url: process.env.NEXT_PUBLIC_REGISTER_URL,
        //         method: 'POST',
        //         body: { ...credentials }
        //     }),
        //     invalidatesTags: ['Auth']
        // }),
    })
})


export const { useLoginMutation } = authApiSlice