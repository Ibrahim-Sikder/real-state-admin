import { baseApi } from "./baseApi";

const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTeam: builder.mutation({
      query: (data) => ({
        url: "/team",
        method: "POST",
        data,
      }),
      invalidatesTags: ["team"],
    }),

    deleteTeam: builder.mutation({
      query: (id) => ({
        url: `/team/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["team"],
    }),
    getAllTeam: builder.query({
      query: ({ page = 1, limit = 5 }) => ({
        url: `/team`,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["team"],
    }),

    getSingleTeam: builder.query({
      query: (id) => ({
        url: `/team/${id}`,
        method: "GET",
      }),
      providesTags: ["team"],
    }),
    updateTeam: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/team/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["team"],
    }),
  }),
});

export const {
  useGetAllTeamQuery,
  useCreateTeamMutation,
  useDeleteTeamMutation,
  useUpdateTeamMutation,
  useGetSingleTeamQuery,
} = projectApi;
