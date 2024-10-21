import { baseApi } from "./baseApi";

const faqApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createFaq: builder.mutation({
      query: (data) => ({
        url: "/faq",
        method: "POST",
        data,
      }),
      invalidatesTags: ["faq"],
    }),

    deleteFaq: builder.mutation({
      query: (id) => ({
        url: `/faq/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["faq"],
    }),
    getAllFaq: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/faq`,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["faq"],
    }),

    getSingleFaq: builder.query({
      query: (id) => ({
        url: `/faq/${id}`,
        method: "GET",
      }),
      providesTags: ["faq"],
    }),
    updateFaq: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/faq/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["faq"],
    }),
  }),
});

export const {
  useGetAllFaqQuery,
  useCreateFaqMutation,
  useDeleteFaqMutation,
  useUpdateFaqMutation,
  useGetSingleFaqQuery,
} = faqApi;
