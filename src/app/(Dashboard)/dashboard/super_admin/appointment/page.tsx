
"use client"

import * as React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Box,
  Typography,
  Pagination,
  Stack,
} from "@mui/material"
import {
  ArrowBack,
} from "@mui/icons-material"
import { TAppointment } from "@/types"
import { cellStyle, iconButtonStyle, iconStyle, tableHeadStyle, tableStyle } from "@/customStyle"
import Loader from "@/app/loading"
import Swal from "sweetalert2"
import { toast } from "sonner"
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteAppointmentMutation, useGetAllAppointmentQuery, useUpdateAppointmentMutation } from "@/redux/api/appointmentApi"
import ADSelect from "@/components/Forms/Select"
import ADForm from "@/components/Forms/Form"
import { useRouter } from "next/navigation"
type TStatusForm = {
  status: string;
};
export default function BlogTable() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const router = useRouter();
  const [selectedAppointmentId, setSelectedAppointmentId] = React.useState<
    string | null
  >(null)
  const { data: appointmentData, isLoading } = useGetAllAppointmentQuery({
    page: currentPage,
    limit: 5,
  });

  const [updateAppointment] = useUpdateAppointmentMutation();
  const [deleteAppointment] = useDeleteAppointmentMutation();
  if (isLoading) {
    return <Loader />;
  }

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteAppointment(id).unwrap();
          Swal.fire({
            title: "Deleted!",
            text: "Your activity has been deleted.",
            icon: "success",
          });
        } catch (err: any) {
          toast.error(err.message);
        }
      }
    });
  };

  const { meta } = appointmentData?.data || { meta: {}, oppresses: [] };
  const { totalPage = 5 } = meta || {};

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };



  const handleStatusSubmit = async (data: TStatusForm) => {
    if (!selectedAppointmentId) {
      toast.error("No appointment selected");
      return;
    }

    try {
      await updateAppointment({
        id: selectedAppointmentId,
        status: data.status,
      }).unwrap();

      toast.success("Status updated successfully!");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong!");
    }
  };

  const handleBack = () => {
    router.back();
  };


  return (
    <Box sx={{ width: "100%", p: 2 }}>
      <Box
        sx={tableHeadStyle}
      >
        <Typography variant="h6" component="h1" sx={{ fontWeight: 500 }}>
          Appointment ({appointmentData?.data?.appointments?.length})
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>

          <Button
            onClick={handleBack}
            startIcon={<ArrowBack />}
            sx={{ mr: 2, color: "#fff" }}
          >
            Back
          </Button>
        </Box>
      </Box>



      <TableContainer component={Paper} sx={{ mb: 2, mt: 5 }}>
        <Table sx={tableStyle}>
          <TableHead>
            <TableRow>
              <TableCell sx={cellStyle}>SL No</TableCell>
              <TableCell sx={cellStyle}>Name</TableCell>
              <TableCell sx={cellStyle}>Email</TableCell>
              <TableCell sx={cellStyle}>Number</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell sx={cellStyle}>Appointment Date</TableCell>
              <TableCell sx={cellStyle}>Status</TableCell>
              <TableCell sx={cellStyle}>Actions</TableCell>
            </TableRow>

          </TableHead>
          <TableBody>
            {appointmentData?.data?.appointments?.map((data: TAppointment, index: number) => (
              <TableRow key={data._id}>
                <TableCell sx={cellStyle}>
                  {index + 1}
                </TableCell>
                <TableCell sx={cellStyle}>{data.name}</TableCell>

                <TableCell sx={cellStyle}>{data.email}</TableCell>
                <TableCell sx={cellStyle}>{data.phone}</TableCell>
                <TableCell sx={cellStyle}>{data.category}</TableCell>
                <TableCell align="center">
                  {
                    new Date(data?.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  }
                </TableCell>




                <TableCell align="center">
                  <ADForm<TStatusForm> onSubmit={handleStatusSubmit}>
                    <div className="flex items-center justify-center gap-x-3 ">
                      <ADSelect
                        sx={{ width: "130px", }}
                        items={["Pending", "Cancel", "Complete"]}
                        name={`status-${data._id}`}
                        label="Status"
                        defaultValue={data.status}
                        onChange={(status) => {
                          setSelectedAppointmentId(data._id);
                          handleStatusSubmit({ status });
                        }}
                      />

                    </div>
                  </ADForm>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    sx={iconButtonStyle}
                    onClick={() => handleDelete(data._id)}
                    title="Delete"
                  >
                    <DeleteIcon sx={iconStyle} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack spacing={2} display='flex' justifyItems='center' alignItems='center' marginTop='20px'>
        <Pagination count={totalPage} page={currentPage} onChange={handlePageChange} color="secondary" />
      </Stack>
    </Box>
  )
}

