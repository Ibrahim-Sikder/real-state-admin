import { baseApi } from "./baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAffiliation: builder.mutation({
      query: (data) => ({
        url: "/affiliation",
        method: "POST",
        data,
      }),
      invalidatesTags: ["affiliation"],
    }),

    deleteAffiliation: builder.mutation({
      query: (id) => ({
        url: `/affiliation/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["affiliation"],
    }),
    getAllAffiliation: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/affiliation`,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["affiliation"],
    }),

    getSingleAffiliation: builder.query({
      query: (id) => ({
        url: `/affiliation/${id}`,
        method: "GET",
      }),
      providesTags: ["affiliation"],
    }),
    updateAffiliation: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/affiliation/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["affiliation"],
    }),
  }),
});

export const {
  useGetAllAffiliationQuery,
  useCreateAffiliationMutation,
  useDeleteAffiliationMutation,
  useUpdateAffiliationMutation,
  useGetSingleAffiliationQuery,
} = reviewApi;
