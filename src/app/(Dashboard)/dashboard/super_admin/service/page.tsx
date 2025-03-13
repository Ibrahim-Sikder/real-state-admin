/* eslint-disable react/no-unescaped-entities */
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
  Card,
  CardContent,
  Tooltip,
  Fade,
  CircularProgress,
  useTheme,
  alpha,
} from "@mui/material"
import { AddIcCallOutlined, ArrowBack, Visibility, CalendarMonth } from "@mui/icons-material"
import Image from "next/image"
import type { TService } from "@/types"
import { cellStyle, iconButtonStyle, iconStyle, tableStyle } from "@/customStyle"
import Loader from "@/app/loading"
import Swal from "sweetalert2"
import { toast } from "sonner"
import parse from "html-react-parser"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import { useDeleteServoceMutation, useGetAllServoceQuery } from "@/redux/api/serviceApi"
import truncateText from "@/utils/truncate"
import CreateServiceModal from "./_components/CreateServiceModal"
import UpdateServiceModal from "./_components/UpdateServiceModal"
import { useRouter } from "next/navigation"

export default function BlogTable() {
  const [open, setOpen] = React.useState(false)
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false)
  const [selectedTortureId, setSelectedTortureId] = React.useState<string | null>(null)
  const [currentPage, setCurrentPage] = React.useState(1)
  const [isLoading, setIsLoading] = React.useState(false)
  const theme = useTheme()

  const {
    data: serviceData,
    isLoading: queryLoading,
    isFetching,
    refetch,
  } = useGetAllServoceQuery({ page: currentPage, limit: 5 })

  const [deleteService] = useDeleteServoceMutation()
  const handleOpen = () => setOpen(true)
  const router = useRouter()

  React.useEffect(() => {
    setIsLoading(queryLoading || isFetching)
  }, [queryLoading, isFetching])

  const hanldeOpenUpdateModal = (id: string) => {
    setSelectedTortureId(id)
    setOpenUpdateModal(true)
  }

  const handleClose = () => setOpen(false)
  const handleCloseUpdateModal = () => setOpenUpdateModal(false)

  if (queryLoading && !isFetching) {
    return <Loader />
  }

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this service!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteService(id).unwrap()
          refetch() // Refresh data after deletion

          Swal.fire({
            title: "Deleted!",
            text: "Your service has been deleted.",
            icon: "success",
          })
        } catch (err: any) {
          toast.error(err.message)
        }
      }
    })
  }

  const { meta } = serviceData?.data || { meta: {}, services: [] }
  const { totalPage = 1, total = 0 } = meta || {}

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)
  }

  const handleBack = () => {
    router.back()
  }

  // Calculate displayed item range
  const startItem = (currentPage - 1) * 5 + 1
  const endItem = Math.min(currentPage * 5, total)

  return (
    <Box sx={{ width: "100%", p: { xs: 1, sm: 2 } }}>
      <Card
        elevation={3}
        sx={{
          borderRadius: "16px",
          overflow: "hidden",
          mb: 4,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${alpha(theme.palette.primary.dark, 0.8)} 100%)`,
        }}
      >
        <CardContent sx={{ p: 0 }}>
          <Box
            sx={{
              p: { xs: 2, sm: 3 },
              color: "white",
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="h5" component="h1" sx={{ fontWeight: 600, mb: 1 }}>
                Services Management
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Manage your company's service offerings and descriptions
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 1, mt: { xs: 1, sm: 0 } }}>
              <Button
                onClick={handleBack}
                startIcon={<ArrowBack />}
                sx={{
                  color: "white",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.3)",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                }}
                variant="outlined"
              >
                Back
              </Button>
              <Button
                onClick={handleOpen}
                variant="contained"
                startIcon={<AddIcCallOutlined />}
                sx={{
                  borderRadius: "8px",
                  backgroundColor: "white",
                  color: theme.palette.primary.main,
                  fontWeight: "bold",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.9)",
                  },
                }}
              >
                Add Service
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              p: { xs: 2, sm: 3 },
              bgcolor: "rgba(255,255,255,0.1)",
              borderTop: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <Chip
              label={`Total Services: ${total || serviceData?.data?.services?.length || 0}`}
              sx={{
                bgcolor: "white",
                color: theme.palette.primary.main,
                fontWeight: "bold",
                "& .MuiChip-label": {
                  px: 2,
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>

      <TableContainer
        component={Paper}
        sx={{
          mb: 2,
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          overflow: "hidden",
          position: "relative",
          minHeight: "300px",
        }}
      >
        {isLoading && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              zIndex: 10,
            }}
          >
            <CircularProgress color="primary" />
          </Box>
        )}

        <Table sx={tableStyle}>
          <TableHead>
            <TableRow sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.05) }}>
              <TableCell
                sx={{
                  ...cellStyle,
                  fontWeight: "bold",
                  fontSize: "0.95rem",
                  width: "80px",
                  textAlign: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                  }}
                >
                  #
                </Box>
              </TableCell>
              <TableCell sx={{ ...cellStyle, fontWeight: "bold", fontSize: "0.95rem" }}>Title</TableCell>
              <TableCell sx={{ ...cellStyle, fontWeight: "bold", fontSize: "0.95rem" }}>Description</TableCell>
              <TableCell sx={{ ...cellStyle, fontWeight: "bold", fontSize: "0.95rem" }}>Thumbnail</TableCell>
              <TableCell sx={{ ...cellStyle, fontWeight: "bold", fontSize: "0.95rem" }}>Date Created</TableCell>
              <TableCell sx={{ ...cellStyle, fontWeight: "bold", fontSize: "0.95rem", textAlign: "center" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {serviceData?.data?.services?.map((service: TService, index: number) => (
              <TableRow
                key={service._id}
                sx={{
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.primary.main, 0.03),
                    transition: "background-color 0.3s ease",
                  },
                  borderLeft: `4px solid ${theme.palette.primary.main}`,
                }}
              >
                <TableCell sx={{ ...cellStyle, textAlign: "center" }}>
                  <Box
                    sx={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto",
                      fontWeight: "bold",
                      color: theme.palette.primary.main,
                    }}
                  >
                    {startItem + index}
                  </Box>
                </TableCell>
                <TableCell sx={cellStyle}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.text.primary,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {service.title}
                  </Typography>
                </TableCell>
                <TableCell sx={cellStyle}>
                  <Box
                    sx={{
                      maxHeight: "60px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      color: theme.palette.text.secondary,
                    }}
                  >
                    {parse(truncateText(service.description || "", 80))}
                  </Box>
                </TableCell>
                <TableCell sx={cellStyle}>
                  <Box
                    sx={{
                      position: "relative",
                      width: "80px",
                      height: "60px",
                      borderRadius: "8px",
                      overflow: "hidden",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    }}
                  >
                    {service.images && service.images.length > 0 ? (
                      <Image
                        src={service.images[0] || "/placeholder.svg"}
                        alt="Thumbnail"
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          color: theme.palette.primary.main,
                        }}
                      >
                        No Image
                      </Box>
                    )}
                    {service.images && service.images.length > 1 && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          bgcolor: theme.palette.primary.main,
                          color: "white",
                          fontSize: "10px",
                          fontWeight: "bold",
                          px: 0.5,
                          borderBottomLeftRadius: "4px",
                        }}
                      >
                        +{service.images.length - 1}
                      </Box>
                    )}
                  </Box>
                </TableCell>
                <TableCell sx={cellStyle}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CalendarMonth sx={{ fontSize: "1rem", color: theme.palette.primary.main }} />
                    <Box>
                      <Typography variant="caption" sx={{ color: theme.palette.text.secondary, display: "block" }}>
                        {new Date(service?.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </Typography>
                      <Typography variant="caption" sx={{ color: theme.palette.text.secondary, display: "block" }}>
                        {new Date(service?.createdAt).getFullYear()}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                    <Tooltip
                      title="Edit Service"
                      placement="top"
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 600 }}
                    >
                      <IconButton
                        sx={{
                          ...iconButtonStyle,
                          background: "#216740",
                          transition: "all 0.2s",
                          "&:hover": {
                            background: "#1b5e3a",
                            transform: "translateY(-2px)",
                          },
                        }}
                        onClick={() => hanldeOpenUpdateModal(service._id)}
                      >
                        <EditIcon sx={iconStyle} />
                      </IconButton>
                    </Tooltip>

                    <Tooltip
                      title="Delete Service"
                      placement="top"
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 600 }}
                    >
                      <IconButton
                        sx={{
                          ...iconButtonStyle,
                          background: "#d32f2f",
                          transition: "all 0.2s",
                          "&:hover": {
                            background: "#b71c1c",
                            transform: "translateY(-2px)",
                          },
                        }}
                        onClick={() => handleDelete(service._id)}
                      >
                        <DeleteIcon sx={iconStyle} />
                      </IconButton>
                    </Tooltip>

                    <Tooltip
                      title="View Details"
                      placement="top"
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 600 }}
                    >
                      <IconButton
                        sx={{
                          ...iconButtonStyle,
                          background: "#1976d2",
                          transition: "all 0.2s",
                          "&:hover": {
                            background: "#1565c0",
                            transform: "translateY(-2px)",
                          },
                        }}
                        // onClick={() => router.push(`/services/${service._id}`)}
                      >
                        <Visibility sx={iconStyle} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {!isLoading && (!serviceData?.data?.services || serviceData.data.services.length === 0) && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography variant="h6" color="text.secondary">
              No services found
            </Typography>
            <Button
              variant="contained"
              onClick={handleOpen}
              startIcon={<AddIcCallOutlined />}
              sx={{
                borderRadius: "8px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
              }}
            >
              Add Your First Service
            </Button>
          </Box>
        )}
      </TableContainer>

      {open && <CreateServiceModal open={open} setOpen={handleClose} />}

      {openUpdateModal && (
        <UpdateServiceModal open={openUpdateModal} setOpen={handleCloseUpdateModal} id={selectedTortureId} />
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "center", sm: "center" },
          gap: 2,
          mt: 3,
          p: 2,
          bgcolor: "white",
          borderRadius: "12px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {serviceData?.data?.services?.length
            ? `Showing ${startItem}-${endItem} of ${total || serviceData.data.services.length}`
            : "0"}{" "}
          services
        </Typography>

        <Pagination
          count={totalPage}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          disabled={isLoading}
          showFirstButton
          showLastButton
          sx={{
            "& .MuiPaginationItem-root": {
              borderRadius: "8px",
            },
            "& .Mui-selected": {
              fontWeight: "bold",
              background: `${theme.palette.primary.main} !important`,
              color: "white",
            },
          }}
        />
      </Box>
    </Box>
  )
}

