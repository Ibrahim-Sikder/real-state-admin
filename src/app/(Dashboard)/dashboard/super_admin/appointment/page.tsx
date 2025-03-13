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
  Chip,
  Avatar,
  Card,
  CardHeader,
  Tooltip,
  useTheme,
  alpha,
} from "@mui/material"
import { ArrowBack, CalendarMonth, Email, Phone } from "@mui/icons-material"
import type { TAppointment } from "@/types"
import Loader from "@/app/loading"
import Swal from "sweetalert2"
import { toast } from "sonner"
import DeleteIcon from "@mui/icons-material/Delete"
import {
  useDeleteAppointmentMutation,
  useGetAllAppointmentQuery,
  useUpdateAppointmentMutation,
} from "@/redux/api/appointmentApi"
import ADSelect from "@/components/Forms/Select"
import ADForm from "@/components/Forms/Form"
import { useRouter } from "next/navigation"

type TStatusForm = {
  status: string
}

export default function AppointmentTable() {
  const [currentPage, setCurrentPage] = React.useState(1)
  const router = useRouter()
  const theme = useTheme()
  const [selectedAppointmentId, setSelectedAppointmentId] = React.useState<string | null>(null)

  const { data: appointmentData, isLoading } = useGetAllAppointmentQuery({
    page: currentPage,
    limit: 5,
  })

  const [updateAppointment] = useUpdateAppointmentMutation()
  const [deleteAppointment] = useDeleteAppointmentMutation()

  if (isLoading) {
    return <Loader />
  }

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this appointment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: theme.palette.error.main,
      cancelButtonColor: theme.palette.grey[500],
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteAppointment(id).unwrap()
          Swal.fire({
            title: "Deleted!",
            text: "The appointment has been deleted.",
            icon: "success",
          })
        } catch (err: any) {
          toast.error(err.message)
        }
      }
    })
  }

  const { meta } = appointmentData?.data || { meta: {}, oppresses: [] }
  const { totalPage = 5 } = meta || {}

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)
  }

  const handleStatusSubmit = async (data: TStatusForm) => {
    if (!selectedAppointmentId) {
      toast.error("No appointment selected")
      return
    }

    try {
      await updateAppointment({
        id: selectedAppointmentId,
        status: data.status,
      }).unwrap()

      toast.success("Status updated successfully!")
    } catch (err: any) {
      toast.error(err.message || "Something went wrong!")
    }
  }

  const handleBack = () => {
    router.back()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return theme.palette.warning.main
      case "Complete":
        return theme.palette.success.main
      case "Cancel":
        return theme.palette.error.main
      default:
        return theme.palette.info.main
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <Box sx={{ width: "100%", p: { xs: 1, sm: 2, md: 3 } }}>
      <Card elevation={2} sx={{ mb: 4, overflow: "visible" }}>
        <CardHeader
          title={
            <Box
              sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 2 }}
            >
              <Typography variant="h5" component="h1" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
                Appointment Management
              </Typography>
              <Chip
                label={`${appointmentData?.data?.appointments?.length || 0} Appointments`}
                color="primary"
                variant="outlined"
                sx={{ fontWeight: 500 }}
              />
            </Box>
          }
          action={
            <Button
              variant="contained"
              onClick={handleBack}
              startIcon={<ArrowBack />}
              sx={{
                borderRadius: "8px",
                boxShadow: 2,
                background: theme.palette.primary.main,
                "&:hover": {
                  background: theme.palette.primary.dark,
                },
              }}
            >
              Back
            </Button>
          }
        />
      </Card>

      <TableContainer
        component={Paper}
        sx={{
          mb: 4,
          borderRadius: "12px",
          boxShadow: 3,
          overflow: "hidden",
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.1) }}>
              <TableCell sx={{ fontWeight: 600, py: 2 }}>SL No</TableCell>
              <TableCell sx={{ fontWeight: 600, py: 2 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 600, py: 2 }}>Contact Info</TableCell>
              <TableCell sx={{ fontWeight: 600, py: 2 }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 600, py: 2 }}>Appointment Date</TableCell>
              <TableCell sx={{ fontWeight: 600, py: 2 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600, py: 2 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointmentData?.data?.appointments?.map((data: TAppointment, index: number) => (
              <TableRow
                key={data._id}
                sx={{
                  "&:nth-of-type(odd)": { backgroundColor: alpha(theme.palette.primary.main, 0.02) },
                  "&:hover": { backgroundColor: alpha(theme.palette.primary.main, 0.05) },
                  transition: "background-color 0.2s",
                }}
              >
                <TableCell sx={{ py: 2 }}>{index + 1}</TableCell>
                <TableCell sx={{ py: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Avatar
                      sx={{
                        bgcolor: alpha(theme.palette.primary.main, 0.8),
                        width: 36,
                        height: 36,
                      }}
                    >
                      {getInitials(data.name)}
                    </Avatar>
                    <Typography variant="body1" fontWeight={500}>
                      {data.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ py: 2 }}>
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Email fontSize="small" color="action" />
                      <Typography variant="body2">{data.email}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Phone fontSize="small" color="action" />
                      <Typography variant="body2">{data.phone}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{ py: 2 }}>
                  <Chip
                    label={data.category}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderRadius: "6px",
                      bgcolor: alpha(theme.palette.info.main, 0.1),
                      borderColor: alpha(theme.palette.info.main, 0.3),
                      color: theme.palette.info.dark,
                    }}
                  />
                </TableCell>
                <TableCell sx={{ py: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CalendarMonth fontSize="small" color="action" />
                    <Typography variant="body2">
                      {new Date(data?.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ py: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Chip
                      label={data.status}
                      size="small"
                      sx={{
                        fontWeight: 500,
                        bgcolor: alpha(getStatusColor(data.status), 0.1),
                        color: getStatusColor(data.status),
                        borderColor: getStatusColor(data.status),
                        minWidth: "80px",
                      }}
                    />
                    <ADForm<TStatusForm> onSubmit={handleStatusSubmit}>
                      <Box sx={{ minWidth: 120 }}>
                        <ADSelect
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "8px",
                              borderColor: getStatusColor(data.status),
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: getStatusColor(data.status),
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: getStatusColor(data.status),
                              },
                            },
                          }}
                          items={["Pending", "Cancel", "Complete"]}
                          name={`status-${data._id}`}
                          label="Status"
                          defaultValue={data.status}
                          onChange={(status) => {
                            setSelectedAppointmentId(data._id)
                            handleStatusSubmit({ status })
                          }}
                        />
                      </Box>
                    </ADForm>
                  </Box>
                </TableCell>
                <TableCell sx={{ py: 2 }}>
                  <Tooltip title="Delete Appointment">
                    <IconButton
                      sx={{
                        color: theme.palette.error.main,
                        "&:hover": {
                          backgroundColor: alpha(theme.palette.error.main, 0.1),
                        },
                      }}
                      onClick={() => handleDelete(data._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={totalPage}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          size="large"
          sx={{
            "& .MuiPaginationItem-root": {
              borderRadius: "8px",
            },
          }}
        />
      </Box>
    </Box>
  )
}

