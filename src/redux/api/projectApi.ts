import { baseApi } from "./baseApi";

const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProject: builder.mutation({
      query: (data) => ({
        url: "/project",
        method: "POST",
        data,
      }),
      invalidatesTags: ["project"],
    }),

    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/project/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["project"],
    }),
    getAllProject: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/project`,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["project"],
    }),

    getSingleProject: builder.query({
      query: (id) => ({
        url: `/project/${id}`,
        method: "GET",
      }),
      providesTags: ["project"],
    }),
    updateProject: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/project/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["project"],
    }),
  }),
});

export const {
  useGetAllProjectQuery,
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useUpdateProjectMutation,
  useGetSingleProjectQuery,
} = projectApi;
