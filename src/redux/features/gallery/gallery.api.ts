import { TQueryParam, TResponseRedux } from "@/types/api.types";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "@/redux/api/tag-types";

const galleryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllImages: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/gallery/all",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: [tagTypes.gallery],
    }),
    getFolders: builder.query({
      query: () => ({
        url: "/gallery/folders",
        method: "GET",
      }),
    }),

    getImagesByFolder: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        const folder = args.find(
          (item: { name: string; value: string }) => item.name === "folder"
        );
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: `/gallery/folder/${folder.value}`,
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<[]>) => {
        return {
          data: response.data,
        };
      },
      providesTags: [tagTypes.gallery],
    }),

    createFolder: builder.mutation({
      query: (data) => {
        return {
          url: "/gallery/folder",
          method: "POST",
          data,
        };
      },
      invalidatesTags: [tagTypes.folder],
    }),

    deleteFolder: builder.mutation({
      query: (id) => {
        return {
          url: `/gallery/folder/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: [tagTypes.folder],
    }),

    deleteImages: builder.mutation({
      query: (data: { id: string; public_id: string }) => {
        return {
          url: `/gallery/delete`,
          method: "POST",
          data,
        };
      },
      invalidatesTags: [tagTypes.gallery, tagTypes.folder],
    }),

    // uploadImage: builder.mutation({
    //   query: (data) => {
    //     return {
    //       url: "/gallery/upload",
    //       method: "POST",
    //       body: data,
    //       headers: {
    //         "Content-Type": "multipart",
    //       },
    //     };
    //   },
    //   invalidatesTags: [tagTypes.gallery, tagTypes.folder],
    // }),
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: "/gallery/upload",
        method: "POST",
        data: formData,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.gallery, tagTypes.folder],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllImagesQuery,
  useDeleteImagesMutation,
  useGetImagesByFolderQuery,
  useGetFoldersQuery,
  useCreateFolderMutation,
  useDeleteFolderMutation,
  useUploadImageMutation,
} = galleryApi;
