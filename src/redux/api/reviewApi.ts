import { baseApi } from "./baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createreview: builder.mutation({
      query: (data) => ({
        url: "/review",
        method: "POST",
        data,
      }),
      invalidatesTags: ["review"],
    }),

    deletereview: builder.mutation({
      query: (id) => ({
        url: `/review/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["review"],
    }),
    getAllreview: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/review`,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["review"],
    }),

    getSinglereview: builder.query({
      query: (id) => ({
        url: `/review/${id}`,
        method: "GET",
      }),
      providesTags: ["review"],
    }),
    updatereview: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/review/${id}`,
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
