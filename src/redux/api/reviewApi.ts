import { baseApi } from "./baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createreview: builder.mutation({
      query: (data) => ({
        url: "/reviews",
        method: "POST",
        data,
      }),
      invalidatesTags: ["review"],
    }),

    deletereview: builder.mutation({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["review"],
    }),
    getAllreview: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/reviews`,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["review"],
    }),

    getSinglereview: builder.query({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: "GET",
      }),
      providesTags: ["review"],
    }),
    updatereview: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/reviews/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["review"],
    }),
  }),
});


export const {
  useGetAllreviewQuery,
  useCreatereviewMutation,
  useDeletereviewMutation,
  useUpdatereviewMutation,
  useGetSinglereviewQuery,
} = reviewApi;
