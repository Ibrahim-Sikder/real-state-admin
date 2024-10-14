import { baseApi } from "./baseApi";

const appointmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteAppointment: builder.mutation({
      query: (id) => ({
        url: `/appointment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["appointment"],
    }),
    getAllAppointment: builder.query({
      query: ({ page = 1, limit = 5 }) => ({
        url: `/appointment`,
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["appointment"],
    }),

    updateAppointment: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/appointment/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["appointment"],
    }),
  }),
});

export const {
  useGetAllAppointmentQuery,
  useDeleteAppointmentMutation,
  useUpdateAppointmentMutation,
} = appointmentApi;
