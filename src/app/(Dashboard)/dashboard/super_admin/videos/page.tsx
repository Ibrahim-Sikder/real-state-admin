"use client"

import type React from "react"
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
  Tooltip,
  Fade,
} from "@mui/material"
import Image from "next/image"
import Swal from "sweetalert2"
import { toast } from "sonner"
import { useState } from "react"
import Loader from "@/app/loading"
import { useRouter } from "next/navigation"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import { ArrowBack, VideoCall } from "@mui/icons-material"
import { addIconStyle, cellStyle, iconButtonStyle, iconStyle, tableHeadStyle, tableStyle } from "@/customStyle"
import { TVideos } from "@/types"
import CreateVideoModal from "./_components/CreateVideoModal"
import UpdateVideoModal from "./_components/UpdateVideoModal"
import { useDeleteVideoMutation, useGetAllVideoQuery } from "@/redux/api/videoApi"

export default function BlogTable() {
  const router = useRouter()
  const handleOpen = () => setOpen(true)
  const [open, setOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [deleteVideoGallery] = useDeleteVideoMutation()
  const [openUpdateModal, setOpenUpdateModal] = useState(false)
  const [selectedTortureId, setSelectedTortureId] = useState<string | null>(null)
  const { data: videoData, isLoading } = useGetAllVideoQuery({ page: currentPage, limit: 5 })


  const hanldeOpenUpdateModal = (id: string) => {
    setSelectedTortureId(id)
    setOpenUpdateModal(true)
  }

  const handleClose = () => setOpen(false)
  const handleCloseUpdateModal = () => setOpenUpdateModal(false)

  if (isLoading) {
    return <Loader />
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
          await deleteVideoGallery(id).unwrap()

          Swal.fire({
            title: "Deleted!",
            text: "Video has been deleted.",
            icon: "success",
          })
        } catch (err: any) {
          toast.error(err.message)
        }
      }
    })
  }


  const meta = videoData?.data?.meta;
const totalPage = meta?.totalPage || 1;


// const { meta } = videoData?.data || { meta: {}, team: [] }
// const { totalPage = 5 } = meta || {}


  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page)
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <Box sx={{ width: "100%", p: 2 }}>
      <Box sx={tableHeadStyle}>
        <Typography variant="h6" component="h1" sx={{ fontWeight: 500 }}>
          All Videos
          {/* ({videoData?.data?.galleries?.length}) */}
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button onClick={handleBack} startIcon={<ArrowBack />} sx={{ mr: 2, color: "#fff" }}>
            Back
          </Button>
          <Button onClick={handleOpen} variant="contained" startIcon={<VideoCall />} sx={addIconStyle}>
            Add Videos
          </Button>
        </Box>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          mb: 2,
          mt: 5,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <Table sx={tableStyle}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ ...cellStyle, fontWeight: "bold" }}>SL No</TableCell>
              <TableCell sx={{ ...cellStyle, fontWeight: "bold" }}>Video</TableCell>
              <TableCell sx={{ ...cellStyle, fontWeight: "bold" }}>Title</TableCell>
              <TableCell sx={{ ...cellStyle, fontWeight: "bold" }}>URL</TableCell>
              <TableCell sx={{ ...cellStyle, fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
           {videoData?.data?.videos?.map((data: TVideos, index: number) => (
              <TableRow
                key={data._id}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                    transition: "background-color 0.3s ease",
                  },
                }}
              >
                <TableCell sx={cellStyle}>{index + 1}</TableCell>
                {/* <TableCell sx={cellStyle}>
                  {data.map((video: any, videoIndex: any) => (
                    <div key={videoIndex} className="relative">
                      <p>{video.title}</p>
                      <p>{video.url}</p>
                      <Image
                        width={50}
                        height={50}
                        className="w-20 rounded-md object-cover border border-gray-200"
                        src={video || "/placeholder.svg"}
                        alt="gallery image"
                      />
                      {data.url.length > 1 && (
                        <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          +{data.url.length - 1}
                        </div>
                      )}
                    </div>
                  ))}
                </TableCell> */}
                
                <TableCell sx={cellStyle}>
                  <iframe
                    // width="150"
                    height="90"
                    src={data.url}
                    title={data.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ borderRadius: 8 }}
                  />
                </TableCell>
                <TableCell sx={cellStyle}>{data.title}</TableCell>
                 <TableCell sx={cellStyle}>{data.url}</TableCell>
                <TableCell>
                  <div className="flex justify-center gap-2">
                    <Tooltip
                      title="Edit Gallery"
                      placement="top"
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 600 }}
                    >
                      <IconButton
                        sx={{ ...iconButtonStyle, background: "#216740" }}
                        onClick={() => hanldeOpenUpdateModal(data._id)}
                      >
                        <EditIcon sx={iconStyle} />
                      </IconButton>
                    </Tooltip>

                    <Tooltip
                      title="Delete Gallery"
                      placement="top"
                      TransitionComponent={Fade}
                      TransitionProps={{ timeout: 600 }}
                    >
                      <IconButton sx={iconButtonStyle} onClick={() => handleDelete(data._id)}>
                        <DeleteIcon sx={iconStyle} className="text-red-600" />
                      </IconButton>
                    </Tooltip>


                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {videoData?.data?.galleries?.length === 0 && (
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
            No Video items found
          </Typography>
          <Button variant="contained" onClick={handleOpen} startIcon={<VideoCall />}>
            Add Your First Video Item
          </Button>
        </Box>
      )}

      {open && <CreateVideoModal open={open} setOpen={handleClose} />}

      {openUpdateModal && (
        <UpdateVideoModal open={openUpdateModal} setOpen={handleCloseUpdateModal} id={selectedTortureId} />
      )}

      <Stack
        spacing={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginTop="20px"
        sx={{
          "& .MuiPaginationItem-root": {
            fontSize: "14px",
          },
          "& .Mui-selected": {
            fontWeight: "bold",
          },
        }}
      >
        <Pagination
          count={totalPage}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          size="large"
          showFirstButton
          showLastButton
        />
      </Stack>
    </Box>
  )
}

