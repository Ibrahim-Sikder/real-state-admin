import { baseApi } from "./baseApi";

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBlog: builder.mutation({
      query: (data) => ({
        url: "/blogs/create",
        method: "POST",
        data,
      }),
      invalidatesTags: ["blogs"],
    }),

    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blogs/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blogs"],
    }),
    getAllBlog: builder.query({
      query: ({ page = 1, limit = 5 }) => ({
        url: `/blogs/all`,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["blogs"],
    }),

    getSingleBlog: builder.query({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "GET",
      }),
      providesTags: ["blogs"],
    }),
    updateBlog: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/blogs/update/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["blogs"],
    }),
  }),
});

export const {
  useGetAllBlogQuery,
  useCreateBlogMutation,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
  useGetSingleBlogQuery,
} = blogApi;
