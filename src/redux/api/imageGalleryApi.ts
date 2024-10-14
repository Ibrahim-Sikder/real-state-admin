import { baseApi } from "./baseApi";

const imageGalleryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createImgGallery: builder.mutation({
      query: (data) => ({
        url: "/image-gallery",
        method: "POST",
        data,
      }),
      invalidatesTags: ["gallery"],
    }),

    deleteImgGallery: builder.mutation({
      query: (id) => ({
        url: `/image-gallery/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["gallery"],
    }),
    getAllImgGallery: builder.query({
      query: ({ page = 1, limit = 5 }) => ({
        url: "/image-gallery",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["gallery"],
    }),
    getSingleImgGallery: builder.query({
      query: (id) => ({
        url: `/image-gallery/${id}`,
        method: "GET",
      }),
      providesTags: ["gallery"],
    }),
    updateImgGallery: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/image-gallery/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["gallery"],
    }),
  }),
});

export const {
  useGetAllImgGalleryQuery,
  useCreateImgGalleryMutation,
  useDeleteImgGalleryMutation,
  useGetSingleImgGalleryQuery,
  useUpdateImgGalleryMutation,
} = imageGalleryApi;
