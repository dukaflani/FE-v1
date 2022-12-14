import { apiSlice } from "../../app/apiSlice";

const apiWithTag = apiSlice.enhanceEndpoints({addTagTypes: ['Fanbase', 'Comment', 'Likes',
'Auth', 'video', 'events', 'product', 'streamingLinks', 'lyrics', 'skiza', 'albumTrack', 'album']})

export const videosApiSlice = apiWithTag.injectEndpoints({
    endpoints: builder => ({
        getProfile: builder.query({
            query: () => 'api/profile',
            providesTags: ['Auth']

        }),

        fetchUserProfile: builder.query({
            query: (args) => ({
                url: "/api/getuserprofile/",
                params: {...args},
            }),
            providesTags: ['Auth']
        }),

        accountRegister: builder.mutation({
            query: newAccountInfo => ({
                url: "/api/register/",
                method: "POST",
                body: newAccountInfo
            }),
            invalidatesTags: ['Auth']
        }),

        editUser: builder.mutation({
            query: editUserInfo => ({
                url: "/api/edituser/",
                method: "POST",
                body: editUserInfo
            }),
            invalidatesTags: ['Auth']
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
            query: () => 'api/videos',
            providesTags: ['video']
        }),

        currentVideo: builder.query({
            query: (args) => ({
                url: `/api/currentvideo/`,
                params: {...args}
            }),
            providesTags: ['video']
        }),

        currentVideoObjectsCount: builder.query({
            query: (args) => ({
                url: `/api/currentvideoobjectcount/`,
                params: {...args}
            }),
            providesTags: ['video', 'Likes', 'Comment']
        }),

        fetchUserVideos: builder.query({
            query: (args) => ({
                url: "/api/getuservideos/",
                params: {...args},
            }),
            providesTags: ['video']
        }),

        deleteVideo: builder.mutation({
            query: deleteVideoInfo => ({
                url: "/api/deletevideo/",
                method: "POST",
                body: deleteVideoInfo
            }),
            invalidatesTags: ['video']
        }),

        filterVideoGenre: builder.query({
            query: (args) => ({
                url: "/api/filtervideogenre/",
                params: {...args},
            }),
            providesTags: ['video']
        }),

        searchForVideo: builder.query({
            query: (args) => ({
                url: `/api/searchvideo/`,
                params: {...args}
            }),
            providesTags: ['video']
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
            providesTags: ['Comment']
        }),

        addComment: builder.mutation({
            query: newComment => ({
                url: "/api/addcomment/",
                method: "POST",
                body: newComment
            }),
            invalidatesTags: ['Comment']
        }),
        
        editComment: builder.mutation({
            query: newCommentInfo => ({
                url: "/api/editcomment/",
                method: "POST",
                body: newCommentInfo
            }),
            invalidatesTags: ['Comment']
        }),

        deleteComment: builder.mutation({
            query: deleteCommentInfo => ({
                url: "/api/deletecomment/",
                method: "POST",
                body: deleteCommentInfo
            }),
            invalidatesTags: ['Comment']
        }),

        fetchEvents: builder.query({
            query: (args) => ({
                url: `/api/events/`,
                params: {...args}
            }),
            providesTags: ['events']
        }), 

        fetchEditEvent: builder.query({
            query: (args) => ({
                url: `/api/fetchevent/`,
                params: {...args}
            }),
            // providesTags: ['events']
        }),

        deleteEvent: builder.mutation({
            query: deleteEventInfo => ({
                url: "/api/deleteevent/",
                method: "POST",
                body: deleteEventInfo
            }),
            invalidatesTags: ['events']
        }),

        fetchStreamingLinks: builder.query({
            query: (args) => ({
                url: `/api/streaminglinks/`,
                params: {...args}
            }),
            providesTags: ['streamingLinks']
        }),  

        addStreamingLinksHolder: builder.mutation({
            query: newStreamingLinksHolder => ({
                url: "/api/addstreaminglinksholder/",
                method: "POST",
                body: newStreamingLinksHolder
            }),
            invalidatesTags: ['streamingLinks']
        }),

        addStreamingLinks: builder.mutation({
            query: newStreamingLinks => ({
                url: "/api/addstreaminglinks/",
                method: "POST",
                body: newStreamingLinks
            }),
            invalidatesTags: ['streamingLinks']
        }),

        fetchCreatedLinkHolder: builder.mutation({
            query: linkHolderTitle => ({
                url: "/api/getcreatedlinkholder/",
                method: "POST",
                body: linkHolderTitle
            }),
            invalidatesTags: ['streamingLinks']
        }),

        fetchCreatedStreamingLinks: builder.mutation({
            query: createdStreamingLinksHolderId => ({
                url: "/api/getcreatedstreaminglink/",
                method: "POST",
                body: createdStreamingLinksHolderId
            }),
            invalidatesTags: ['streamingLinks']
        }),

        fetchMyStreamingLinks: builder.query({
            query: (args) => ({
                url: `/api/mystreaminglinks/`,
                params: {...args}
            }),
            // providesTags: ['Fanbase']
        }), 

        fetchOneStreamingLink: builder.query({
            query: (args) => ({
                url: `/api/streaminglink/`,
                params: {...args}
            }),
            providesTags: ['streamingLinks']
        }),

        editStreamingLink: builder.mutation({
            query: editedStreamingLink => ({
                url: "/api/editlinks/",
                method: "POST",
                body: editedStreamingLink
            }),
            invalidatesTags: ['streamingLinks']
        }),

        fetchUserLinkHolders: builder.query({
            query: (args) => ({
                url: "/api/getuserlinkholders/",
                params: {...args},
            }),
            providesTags: ['streamingLinks']
        }),

        deleteStreamingLink: builder.mutation({
            query: deleteStreamingLinkInfo => ({
                url: "/api/deletestreaminglink/",
                method: "POST",
                body: deleteStreamingLinkInfo
            }),
            invalidatesTags: ['streamingLinks']
        }),

        addProduct: builder.mutation({
            query: productDetails => ({
                url: "/api/addproduct/",
                method: "POST",
                headers: {'content-type': 'multipart/form-data',},
                body: productDetails
            }),
            invalidatesTags: ['product']
        }),

        fetchUserProducts: builder.query({
            query: (args) => ({
                url: "/api/getuserproducts/",
                params: {...args},
            }),
            providesTags: ['product']
        }),

        fetchProduct: builder.query({
            query: (args) => ({
                url: `/api/product/`,
                params: {...args}
            }),
            providesTags: ['product']
        }),

        deleteProduct: builder.mutation({
            query: deleteProductInfo => ({
                url: "/api/deleteproduct/",
                method: "POST",
                body: deleteProductInfo
            }),
            invalidatesTags: ['product']
        }),

        fetchAccessToken: builder.query({
            query: () => 'api/getaccesstoken'
        }),

        fetchLyricsVerse: builder.query({
            query: (args) => ({
                url: `/api/lyricsverse/`,
                params: {...args}
            }),
            providesTags: ['lyrics']
        }), 

        fetchLyrics: builder.query({
            query: (args) => ({
                url: `/api/lyrics/`,
                params: {...args}
            }),
            providesTags: ['lyrics']
        }),

        addLyrics: builder.mutation({
            query: newLyrics => ({
                url: "/api/addlyrics/",
                method: "POST",
                body: newLyrics
            }),
            invalidatesTags: ['lyrics']
        }),

        addLyricsVerse: builder.mutation({
            query: newLyricsVerse => ({
                url: "/api/addlyricsverse/",
                method: "POST",
                body: newLyricsVerse
            }),
            invalidatesTags: ['lyrics']
        }),

        fetchCreatedLyricsVerses: builder.mutation({
            query: createdLyricsId => ({
                url: "/api/getcreatedlyricsverses/",
                method: "POST",
                body: createdLyricsId
            }),
            invalidatesTags: ['lyrics']
        }),

        fetchUserLyricss: builder.query({
            query: (args) => ({
                url: "/api/getuserlyrics/",
                params: {...args},
            }),
            providesTags: ['lyrics']
        }),

        editLyrics: builder.mutation({
            query: editedLyrics => ({
                url: "/api/editlyrics/",
                method: "POST",
                body: editedLyrics
            }),
            invalidatesTags: ['lyrics']
        }),

        deleteLyrics: builder.mutation({
            query: deleteLyricsInfo => ({
                url: "/api/deletelyrics/",
                method: "POST",
                body: deleteLyricsInfo
            }),
            invalidatesTags: ['lyrics']
        }),

        addSkizaTune: builder.mutation({
            query: newSkizaTune => ({
                url: "/api/addskizatune/",
                method: "POST",
                body: newSkizaTune
            }),
            invalidatesTags: ['skiza']
        }),

        addSkizaTuneInfo: builder.mutation({
            query: newSkizaTuneInfo => ({
                url: "/api/addskizatuneinfo/",
                method: "POST",
                body: newSkizaTuneInfo
            }),
            invalidatesTags: ['skiza']
        }),

        fetchCreatedSkizaTuneList: builder.mutation({
            query: createdSkizaTuneId => ({
                url: "/api/getcreatedskizalist/",
                method: "POST",
                body: createdSkizaTuneId
            }),
            invalidatesTags: ['skiza']
        }),

        fetchUserSkizaTunes: builder.query({
            query: (args) => ({
                url: "/api/getuserskizatunes/",
                params: {...args},
            }),
            providesTags: ['skiza']
        }),

        fetchSkizaTuneLinks: builder.query({
            query: (args) => ({
                url: "/api/fetchskizatune/",
                params: {...args},
            }),
            providesTags: ['skiza']
        }),

        fetchOneSkizaTune: builder.query({
            query: (args) => ({
                url: `/api/oneskizatune/`,
                params: {...args}
            }),
            providesTags: ['skiza']
        }),

        fetchSkizaTunes: builder.query({
            query: (args) => ({
                url: `/api/skizatune/`,
                params: {...args}
            }),
            providesTags: ['skiza']
        }), 

        editSkizaTune: builder.mutation({
            query: editedSkizaTune => ({
                url: "/api/editskiza/",
                method: "POST",
                body: editedSkizaTune
            }),
            invalidatesTags: ['skiza']
        }),

        deleteSkizaTune: builder.mutation({
            query: deleteSkizaTuneInfo => ({
                url: "/api/deleteskizatune/",
                method: "POST",
                body: deleteSkizaTuneInfo
            }),
            invalidatesTags: ['skiza']
        }),

        addAlbumTrack: builder.mutation({
            query: newAlbumTrack => ({
                url: "/api/addalbumtrack/",
                method: "POST",
                body: newAlbumTrack
            }),
            invalidatesTags: ['albumTrack']
        }),

        fetchCreatedAlbumTracksList: builder.mutation({
            query: createdAlbumId => ({
                url: "/api/getcreatedalbumtracklist/",
                method: "POST",
                body: createdAlbumId
            }),
            invalidatesTags: ['albumTrack']
        }),

        fetchUserAlbums: builder.query({
            query: (args) => ({
                url: "/api/getuseralbums/",
                params: {...args},
            }),
            providesTags: ['album']
        }),

        fetchAlbum: builder.query({
            query: (args) => ({
                url: `/api/album/`,
                params: {...args}
            }),
            providesTags: ['album']
        }),

        fetchAlbumTracks: builder.query({
            query: (args) => ({
                url: `/api/albumtrack/`,
                params: {...args}
            }),
            providesTags: ['albumTrack']
        }), 

        editAlbumTrack: builder.mutation({
            query: editedAlbumTrack => ({
                url: "/api/editalbumtrack/",
                method: "POST",
                body: editedAlbumTrack
            }),
            invalidatesTags: ['albumTrack']
        }),

        deleteAlbum: builder.mutation({
            query: deleteAlbumInfo => ({
                url: "/api/deletealbum/",
                method: "POST",
                body: deleteAlbumInfo
            }),
            invalidatesTags: ['album']
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

        videoLiked: builder.query({
            query: (args) => ({
                    url: `/api/liked/`,
                    params: {...args}
                }),
                providesTags: ['Likes']
            }),   

        addLike: builder.mutation({
            query: likeVideoInfo => ({
                url: "/api/addlike/",
                method: "POST",
                body: likeVideoInfo
            }),
            invalidatesTags: ['Likes']
        }),

        deleteLike: builder.mutation({
            query: ( deletelikeInfo ) => ({
                url: `/api/deletelike/`,
                method: 'POST',
                body: deletelikeInfo
            }),
            invalidatesTags: ['Likes']
        }),

        videoUnliked: builder.query({
            query: (args) => ({
                    url: `/api/unliked/`,
                    params: {...args}
                }),
                providesTags: ['Likes']
            }),   

        addUnlike: builder.mutation({
            query: unlikeVideoInfo => ({
                url: "/api/addunlike/",
                method: "POST",
                body: unlikeVideoInfo
            }),
            invalidatesTags: ['Likes']
        }),

        deleteUnlike: builder.mutation({
            query: ( deleteUnlikeInfo ) => ({
                url: `/api/deleteunlike/`,
                method: 'POST',
                body: deleteUnlikeInfo
            }),
            invalidatesTags: ['Likes']
        }),

        }),
        overrideExisting: true
    })


export const { useGetProfileQuery, useFanbaseQuery, useFanbaseCountQuery, useJoinFanbaseMutation, useLeaveFanbaseMutation, useFetchVideosQuery, useAddViewMutation, useCurrentVideoQuery,
                useFetchCommentsQuery, useFetchStreamingLinksQuery, useFetchProductQuery, useFetchLyricsQuery, useFetchSkizaTunesQuery, useFetchAlbumQuery,
                useFetchAlbumTracksQuery, useFetchEventsQuery, useFetchLyricsVerseQuery, useAddStreamingLinksHolderMutation, useFetchCreatedLinkHolderMutation,
                useAddStreamingLinksMutation, useFetchMyStreamingLinksQuery, useFetchCreatedStreamingLinksMutation, useAddProductMutation, useFetchAccessTokenQuery,
                useAddLyricsMutation, useAddLyricsVerseMutation, useFetchCreatedLyricsVersesMutation, useAddSkizaTuneMutation, useAddSkizaTuneInfoMutation,
                useFetchCreatedSkizaTuneListMutation, useAddAlbumTrackMutation, useFetchCreatedAlbumTracksListMutation, useAddGenreMutation, useFetchUserLinkHoldersQuery,
                useFetchUserProductsQuery, useFetchUserLyricssQuery, useFetchUserSkizaTunesQuery, useFetchUserAlbumsQuery, useFetchAllGenresQuery,
                useFetchUserVideosQuery, useFetchUserProfileQuery, useAccountRegisterMutation, useAddCommentMutation, useEditCommentMutation, useDeleteCommentMutation,
                useDeleteVideoMutation, useFetchEditEventQuery, useDeleteEventMutation, useDeleteProductMutation, useFetchOneStreamingLinkQuery, useFetchOneSkizaTuneQuery,
                useFetchSkizaTuneLinksQuery, useEditAlbumTrackMutation, useEditLyricsMutation, useEditSkizaTuneMutation, useEditStreamingLinkMutation, useDeleteAlbumMutation,
                useDeleteLyricsMutation, useDeleteSkizaTuneMutation, useDeleteStreamingLinkMutation, useEditUserMutation, useFilterVideoGenreQuery, useSearchForVideoQuery,
                useAddLikeMutation, useAddUnlikeMutation, useDeleteLikeMutation, useDeleteUnlikeMutation, useVideoLikedQuery, useVideoUnlikedQuery, useCurrentVideoObjectsCountQuery
             } = videosApiSlice