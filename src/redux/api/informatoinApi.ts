import { baseApi } from "./baseApi";

const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
 
    getAllContact: builder.query({
      query: () => ({
        url: "/contact",
        method: "GET",
      }),
      providesTags: ["contact"],
    }),
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `/contact/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["contact"],
    }),
  }),
});

export const {useDeleteContactMutation,useGetAllContactQuery } =
  contactApi;
