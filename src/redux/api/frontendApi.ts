import { TResponseRedux } from "@/types/api.types";
import { baseApi } from "./baseApi";

const frontendApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFrontend: builder.query({
      query: () => {
        return {
          url: "client/all",
          method: "GET",
        };
      },
      providesTags: ["frontend"],

      transformResponse: (response: TResponseRedux<[]>) => {
        return response.data;
      },
    }),

    updateFrontend: builder.mutation({
      query: (data) => {
        return {
          url: `client/update/${data.id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["frontend"],
    }),
  }),
  overrideExisting: true,
});

export const { useGetFrontendQuery, useUpdateFrontendMutation } = frontendApi;
