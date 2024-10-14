import { baseApi } from "./baseApi";

const bannerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    creatlBanner: builder.mutation({
      query: (data) => ({
        url: "/banner",
        method: "POST",
        data,
      }),
      invalidatesTags: ["banner"],
    }),

    deletlBanner: builder.mutation({
      query: (id) => ({
        url: `/banner/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["banner"],
    }),
    getAllBanner: builder.query({
      query: ({ page = 1, limit = 5 }) => ({
        url: "/banner",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["banner"],
    }),
    getSingleBanner: builder.query({
      query: (id) => ({
        url: `/banner/${id}`,
        method: "GET",
      }),
      providesTags: ["banner"],
    }),
    updateBanner: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/banner/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["banner"],
    }),
  }),
});

export const {
  useGetAllBannerQuery,
  useCreatlBannerMutation,
  useDeletlBannerMutation,
  useGetSingleBannerQuery,
  useUpdateBannerMutation,
} = bannerApi;
