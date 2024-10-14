import { baseApi } from "./baseApi";

const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createServoce: builder.mutation({
      query: (data) => ({
        url: "/service",
        method: "POST",
        data,
      }),
      invalidatesTags: ["service"],
    }),

    deleteServoce: builder.mutation({
      query: (id) => ({
        url: `/service/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["service"],
    }),
    getAllServoce: builder.query({
      query: ({ page = 1, limit = 5 }) => ({
        url: `/service`,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["service"],
    }),

    getSingleServoce: builder.query({
      query: (id) => ({
        url: `/service/${id}`,
        method: "GET",
      }),
      providesTags: ["service"],
    }),
    updateServoce: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/service/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["service"],
    }),
  }),
});

export const {
  useGetAllServoceQuery,
  useCreateServoceMutation,
  useDeleteServoceMutation,
  useUpdateServoceMutation,
  useGetSingleServoceQuery,
} = projectApi;
