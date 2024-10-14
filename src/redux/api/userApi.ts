import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: "/user",
        method: "POST",
        data,
      }),
      invalidatesTags: ["user"],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
    getAllUser: builder.query({
      query: ({ page = 1, limit = 5 }) => ({
        url: "/user",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["user"],
    }),
    getSingleUser: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useGetSingleUserQuery,
  useUpdateUserMutation,
} = userApi;
