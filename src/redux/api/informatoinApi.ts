import { baseApi } from "./baseApi";

const videoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
 
    getAllInformation: builder.query({
      query: () => ({
        url: "/information",
        method: "GET",
      }),
      providesTags: ["information"],
    }),
    deleteInformation: builder.mutation({
      query: (id) => ({
        url: `/information/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["information"],
    }),
  }),
});

export const { useGetAllInformationQuery, useDeleteInformationMutation } =
  videoApi;
