import { apiSlice } from "../../app/apiSlice";

export const videosApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProfile: builder.query({
            query: () => 'api/profile',
            // providesTags: ['Auth']

        }),

        fanbase: builder.query({
            query: (args) => ({
                    url: `/api/fanbase/`,
                    params: {...args}
                }),
                providesTags: ['Fanbase']
            }),

        fanbaseCount: builder.query({
            query: (args) => ({
                url: `/api/fanbasecount/`,
                params: {...args}
            }),
            providesTags: ['Fanbase']
        }),    

        joinFanbase: builder.mutation({
            query: fan => ({
                url: "/api/joinfanbase/",
                method: "POST",
                body: fan
            }),
            invalidatesTags: ['Fanbase']
        }),

        leaveFanbase: builder.mutation({
            query: ( deleteItem ) => ({
                url: `/api/leavefanbase/`,
                method: 'POST',
                body: deleteItem
            }),
            invalidatesTags: ['Fanbase']
        }),

        fetchVideos: builder.query({
            query: () => 'api/videos'
        }),

        currentVideo: builder.query({
            query: (args) => ({
                url: `/api/currentvideo/`,
                params: {...args}
            }),
            // providesTags: ['Fanbase']
        }),

        fetchUserVideos: builder.query({
            query: (args) => ({
                url: "/api/getuservideos/",
                params: {...args},
            }),
            // providesTags: ['Fanbase']
        }),

        addView: builder.mutation({
            query: newView => ({
                url: "/api/addview/",
                method: "POST",
                body: newView
            }),
            // invalidatesTags: ['Fanbase']
        }),

        fetchComments: builder.query({
            query: (args) => ({
                url: `/api/comments/`,
                params: {...args}
            }),
            // providesTags: ['Fanbase']
        }),

        fetchStreamingLinks: builder.query({
            query: (args) => ({
                url: `/api/streaminglinks/`,
                params: {...args}
            }),
            // providesTags: ['Fanbase']
        }), 

        fetchProduct: builder.query({
            query: (args) => ({
                url: `/api/product/`,
                params: {...args}
            }),
            // providesTags: ['Fanbase']
        }), 

        fetchLyrics: builder.query({
            query: (args) => ({
                url: `/api/lyrics/`,
                params: {...args}
            }),
            // providesTags: ['Fanbase']
        }),

        fetchSkizaTunes: builder.query({
            query: (args) => ({
                url: `/api/skizatune/`,
                params: {...args}
            }),
            // providesTags: ['Fanbase']
        }), 

        fetchAlbum: builder.query({
            query: (args) => ({
                url: `/api/album/`,
                params: {...args}
            }),
            // providesTags: ['Fanbase']
        }),

        fetchAlbumTracks: builder.query({
            query: (args) => ({
                url: `/api/albumtrack/`,
                params: {...args}
            }),
            // providesTags: ['Fanbase']
        }), 

        fetchEvents: builder.query({
            query: (args) => ({
                url: `/api/events/`,
                params: {...args}
            }),
            // providesTags: ['Fanbase']
        }), 

        fetchLyricsVerse: builder.query({
            query: (args) => ({
                url: `/api/lyricsverse/`,
                params: {...args}
            }),
            // providesTags: ['Fanbase']
        }), 

        addStreamingLinksHolder: builder.mutation({
            query: newStreamingLinksHolder => ({
                url: "/api/addstreaminglinksholder/",
                method: "POST",
                body: newStreamingLinksHolder
            }),
            // invalidatesTags: ['Fanbase']
        }),

        addStreamingLinks: builder.mutation({
            query: newStreamingLinks => ({
                url: "/api/addstreaminglinks/",
                method: "POST",
                body: newStreamingLinks
            }),
            // invalidatesTags: ['Fanbase']
        }),

        fetchCreatedLinkHolder: builder.mutation({
            query: linkHolderTitle => ({
                url: "/api/getcreatedlinkholder/",
                method: "POST",
                body: linkHolderTitle
            }),
            // invalidatesTags: ['Fanbase']
        }),

        fetchCreatedStreamingLinks: builder.mutation({
            query: createdStreamingLinksHolderId => ({
                url: "/api/getcreatedstreaminglink/",
                method: "POST",
                body: createdStreamingLinksHolderId
            }),
            // invalidatesTags: ['Fanbase']
        }),

        fetchMyStreamingLinks: builder.query({
            query: (args) => ({
                url: `/api/mystreaminglinks/`,
                params: {...args}
            }),
            // providesTags: ['Fanbase']
        }), 

        fetchUserLinkHolders: builder.query({
            query: (args) => ({
                url: "/api/getuserlinkholders/",
                params: {...args},
            }),
            // providesTags: ['Fanbase']
        }),

        addProduct: builder.mutation({
            query: productDetails => ({
                url: "/api/addproduct/",
                method: "POST",
                headers: {'content-type': 'multipart/form-data',},
                body: productDetails
            }),
            // invalidatesTags: ['Fanbase']
        }),

        fetchUserProducts: builder.query({
            query: (args) => ({
                url: "/api/getuserproducts/",
                params: {...args},
            }),
            // providesTags: ['Fanbase']
        }),

        fetchAccessToken: builder.query({
            query: () => 'api/getaccesstoken'
        }),

        addLyrics: builder.mutation({
            query: newLyrics => ({
                url: "/api/addlyrics/",
                method: "POST",
                body: newLyrics
            }),
            // invalidatesTags: ['Fanbase']
        }),

        addLyricsVerse: builder.mutation({
            query: newLyricsVerse => ({
                url: "/api/addlyricsverse/",
                method: "POST",
                body: newLyricsVerse
            }),
            // invalidatesTags: ['Fanbase']
        }),

        fetchCreatedLyricsVerses: builder.mutation({
            query: createdLyricsId => ({
                url: "/api/getcreatedlyricsverses/",
                method: "POST",
                body: createdLyricsId
            }),
            // invalidatesTags: ['Fanbase']
        }),

        fetchUserLyricss: builder.query({
            query: (args) => ({
                url: "/api/getuserlyrics/",
                params: {...args},
            }),
            // providesTags: ['Fanbase']
        }),

        addSkizaTune: builder.mutation({
            query: newSkizaTune => ({
                url: "/api/addskizatune/",
                method: "POST",
                body: newSkizaTune
            }),
            // invalidatesTags: ['Fanbase']
        }),

        addSkizaTuneInfo: builder.mutation({
            query: newSkizaTuneInfo => ({
                url: "/api/addskizatuneinfo/",
                method: "POST",
                body: newSkizaTuneInfo
            }),
            // invalidatesTags: ['Fanbase']
        }),

        fetchCreatedSkizaTuneList: builder.mutation({
            query: createdSkizaTuneId => ({
                url: "/api/getcreatedskizalist/",
                method: "POST",
                body: createdSkizaTuneId
            }),
            // invalidatesTags: ['Fanbase']
        }),

        fetchUserSkizaTunes: builder.query({
            query: (args) => ({
                url: "/api/getuserskizatunes/",
                params: {...args},
            }),
            // providesTags: ['Fanbase']
        }),

        addAlbumTrack: builder.mutation({
            query: newAlbumTrack => ({
                url: "/api/addalbumtrack/",
                method: "POST",
                body: newAlbumTrack
            }),
            // invalidatesTags: ['Fanbase']
        }),

        fetchCreatedAlbumTracksList: builder.mutation({
            query: createdAlbumId => ({
                url: "/api/getcreatedalbumtracklist/",
                method: "POST",
                body: createdAlbumId
            }),
            // invalidatesTags: ['Fanbase']
        }),

        fetchUserAlbums: builder.query({
            query: (args) => ({
                url: "/api/getuseralbums/",
                params: {...args},
            }),
            // providesTags: ['Fanbase']
        }),

        addGenre: builder.mutation({
            query: newGenre => ({
                url: "/api/addgenre/",
                method: "POST",
                body: newGenre
            }),
            // invalidatesTags: ['Fanbase']
        }),

        fetchAllGenres: builder.query({
            query: () => "/api/getallgenres/",
            // providesTags: ['Fanbase']
        }),

        fetchUserProfile: builder.query({
            query: (args) => ({
                url: "/api/getuserprofile/",
                params: {...args},
            }),
            // providesTags: ['Auth']
        }),

        accountRegister: builder.mutation({
            query: newAccountInfo => ({
                url: "/api/register/",
                method: "POST",
                body: newAccountInfo
            }),
            // invalidatesTags: ['Fanbase']
        }),

        })
    })


export const { useGetProfileQuery, useFanbaseQuery, useFanbaseCountQuery, useJoinFanbaseMutation, useLeaveFanbaseMutation, useFetchVideosQuery, useAddViewMutation, useCurrentVideoQuery,
                useFetchCommentsQuery, useFetchStreamingLinksQuery, useFetchProductQuery, useFetchLyricsQuery, useFetchSkizaTunesQuery, useFetchAlbumQuery,
                useFetchAlbumTracksQuery, useFetchEventsQuery, useFetchLyricsVerseQuery, useAddStreamingLinksHolderMutation, useFetchCreatedLinkHolderMutation,
                useAddStreamingLinksMutation, useFetchMyStreamingLinksQuery, useFetchCreatedStreamingLinksMutation, useAddProductMutation, useFetchAccessTokenQuery,
                useAddLyricsMutation, useAddLyricsVerseMutation, useFetchCreatedLyricsVersesMutation, useAddSkizaTuneMutation, useAddSkizaTuneInfoMutation,
                useFetchCreatedSkizaTuneListMutation, useAddAlbumTrackMutation, useFetchCreatedAlbumTracksListMutation, useAddGenreMutation, useFetchUserLinkHoldersQuery,
                useFetchUserProductsQuery, useFetchUserLyricssQuery, useFetchUserSkizaTunesQuery, useFetchUserAlbumsQuery, useFetchAllGenresQuery,
                useFetchUserVideosQuery, useFetchUserProfileQuery, useAccountRegisterMutation
             } = videosApiSlice