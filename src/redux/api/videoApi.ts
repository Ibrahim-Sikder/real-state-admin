import { baseApi } from "./baseApi";

const videoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createVideo: builder.mutation({
      query: (data) => ({
        url: "/videos",
        method: "POST",
        data,
      }),
      invalidatesTags: ["videos"],
    }),

    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["videos"],
    }),

    getAllVideo: builder.query({
      query: ({ page = 1, limit = 5 }) => ({
        url: "/videos",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["videos"],
    }),

    getSingleVideo: builder.query({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "GET",
      }),
      providesTags: ["videos"],
    }),

    updateVideo: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/videos/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["videos"],
    }),
  }),
});

export const {
  useCreateVideoMutation,
  useDeleteVideoMutation,
  useGetAllVideoQuery,
  useGetSingleVideoQuery,
  useUpdateVideoMutation,
} = videoApi;

