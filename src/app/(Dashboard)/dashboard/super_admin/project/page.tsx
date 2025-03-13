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
    Chip,
    Tooltip,
    Fade,
    Card,
    CardContent,
} from "@mui/material"
import { AddIcCallOutlined, ArrowBack, Visibility } from "@mui/icons-material"
import type { TProject } from "@/types"
import { addIconStyle, cellStyle, iconButtonStyle, iconStyle, tableHeadStyle, tableStyle } from "@/customStyle"
import Loader from "@/app/loading"
import Swal from "sweetalert2"
import { toast } from "sonner"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useDeleteProjectMutation, useGetAllProjectQuery } from "@/redux/api/projectApi"
import CreateProjectModal from "./_components/CreateProjectModal"
import UpdateProjectModal from "./_components/UpdateProjectModal"

export default function BlogTable() {
    const [open, setOpen] = useState(false)
    const [openUpdateModal, setOpenUpdateModal] = useState(false)
    const [selectedTortureId, setSelectedTortureId] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState(1)
    const { data: projectData, isLoading } = useGetAllProjectQuery({ page: currentPage, limit: 10 })
    const [deleteProject] = useDeleteProjectMutation()
    const handleOpen = () => setOpen(true)
    const router = useRouter()

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
                    await deleteProject(id).unwrap()

                    Swal.fire({
                        title: "Deleted!",
                        text: "Your project has been deleted.",
                        icon: "success",
                    })
                } catch (err: any) {
                    toast.error(err.message)
                }
            }
        })
    }

    const { meta } = projectData?.data || { meta: {}, oppresses: [] }
    const { totalPage = 5 } = meta || {}

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page)
    }

    const handleBack = () => {
        router.back()
    }

    const handleViewDetails = (id: string) => {
        // router.push(`/projects/${id}`)
    }

    // Function to get category color
    const getCategoryColor = (category: string) => {
        if (category?.toLowerCase().includes("ongoing")) return "#2196f3"
        if (category?.toLowerCase().includes("completed")) return "#4caf50"
        if (category?.toLowerCase().includes("upcoming")) return "#ff9800"
        return "#9c27b0" // default color
    }

    return (
        <Box sx={{ width: "100%", p: 2 }}>
            <Card
                elevation={3}
                sx={{
                    borderRadius: "12px",
                    overflow: "hidden",
                    mb: 4,
                }}
            >
                <CardContent sx={{ p: 0 }}>
                    <Box
                        sx={{
                            ...tableHeadStyle,
                            borderRadius: "12px 12px 0 0",
                            p: 3,
                        }}
                    >
                        <Typography variant="h5" component="h1" sx={{ fontWeight: 600 }}>
                            Project Management Dashboard
                        </Typography>

                        <Box sx={{ display: "flex", gap: 1 }}>
                            <Button
                                onClick={handleBack}
                                startIcon={<ArrowBack />}
                                sx={{
                                    mr: 2,
                                    color: "#fff",
                                    borderRadius: "8px",
                                    transition: "all 0.3s",
                                    "&:hover": {
                                        transform: "translateX(-3px)",
                                    },
                                }}
                            >
                                Back
                            </Button>
                            <Button
                                onClick={handleOpen}
                                variant="contained"
                                startIcon={<AddIcCallOutlined />}
                                sx={{
                                    ...addIconStyle,
                                    borderRadius: "8px",
                                    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                                    transition: "all 0.3s",
                                    "&:hover": {
                                        transform: "translateY(-2px)",
                                        boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
                                    },
                                }}
                            >
                                Add Project
                            </Button>
                        </Box>
                    </Box>

                    <Box sx={{ p: 3, bgcolor: "#f8f9fa" }}>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            Total Projects: <span style={{ fontWeight: "bold" }}>{projectData?.data?.projects?.length || 0}</span>
                        </Typography>

                        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                            <Chip label="All Projects" color="primary" variant="filled" sx={{ borderRadius: "6px" }} />
                            <Chip label="Ongoing" sx={{ bgcolor: "#2196f3", color: "white", borderRadius: "6px" }} />
                            <Chip label="Completed" sx={{ bgcolor: "#4caf50", color: "white", borderRadius: "6px" }} />
                            <Chip label="Upcoming" sx={{ bgcolor: "#ff9800", color: "white", borderRadius: "6px" }} />
                        </Box>
                    </Box>
                </CardContent>
            </Card>

            <TableContainer
                component={Paper}
                sx={{
                    mb: 2,
                    borderRadius: "12px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    overflow: "hidden",
                }}
            >
                <Table sx={tableStyle}>
                    <TableHead sx={{ background: 'red' }}>

                        <TableRow sx={{ bgcolor: "#f5f5f5" }}>
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
                            <TableCell sx={{ ...cellStyle, fontWeight: "bold", fontSize: "0.95rem" }}>Project</TableCell>
                            <TableCell sx={{ ...cellStyle, fontWeight: "bold", fontSize: "0.95rem" }}>Category</TableCell>
                            <TableCell sx={{ ...cellStyle, fontWeight: "bold", fontSize: "0.95rem" }}>Description</TableCell>
                            <TableCell sx={{ ...cellStyle, fontWeight: "bold", fontSize: "0.95rem" }}>Date</TableCell>
                            <TableCell sx={{ ...cellStyle, fontWeight: "bold", fontSize: "0.95rem", textAlign: "center" }}>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projectData?.data?.projects?.map((data: TProject, index: number) => (
                            <TableRow
                                key={data._id}
                                sx={{
                                    "&:hover": {
                                        backgroundColor: "rgba(0, 0, 0, 0.04)",
                                        transition: "background-color 0.3s ease",
                                    },
                                    borderLeft: `4px solid ${getCategoryColor(data.category || "")}`,
                                }}
                            >
                                <TableCell sx={{ ...cellStyle, textAlign: "center" }}>
                                    <Box
                                        sx={{
                                            width: "36px",
                                            height: "36px",
                                            borderRadius: "50%",
                                            bgcolor: "#f0f0f0",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            margin: "0 auto",
                                            fontWeight: "bold",
                                            color: "#555",
                                        }}
                                    >
                                        {index + 1}
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#333" }}>
                                            {data.title}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: "#666" }}>
                                            {data.sub_title}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={data.category || "Uncategorized"}
                                        size="small"
                                        sx={{
                                            bgcolor: getCategoryColor(data.category || ""),
                                            color: "white",
                                            fontWeight: "medium",
                                            borderRadius: "4px",
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            maxWidth: "300px",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            display: "-webkit-box",
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: "vertical",
                                        }}
                                    >
                                        {data.short_description}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                                        <Typography variant="caption" sx={{ color: "#888", fontSize: "0.7rem" }}>
                                            CREATED
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                                            {new Date(data?.createdAt).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric",
                                            })}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
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
                                                onClick={() => handleViewDetails(data._id)}
                                            >
                                                <Visibility sx={iconStyle} />
                                            </IconButton>
                                        </Tooltip>

                                        <Tooltip
                                            title="Edit Project"
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
                                                onClick={() => hanldeOpenUpdateModal(data._id)}
                                            >
                                                <EditIcon sx={iconStyle} />
                                            </IconButton>
                                        </Tooltip>

                                        <Tooltip
                                            title="Delete Project"
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
                                                onClick={() => handleDelete(data._id)}
                                            >
                                                <DeleteIcon sx={iconStyle} />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {projectData?.data?.projects?.length === 0 && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "200px",
                        flexDirection: "column",
                        gap: 2,
                        bgcolor: "#f9f9f9",
                        borderRadius: "12px",
                        border: "1px dashed #ccc",
                        my: 4,
                    }}
                >
                    <Typography variant="h6" color="text.secondary">
                        No projects found
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
                        Add Your First Project
                    </Button>
                </Box>
            )}

            {open && <CreateProjectModal open={open} setOpen={handleClose} />}

            {openUpdateModal && (
                <UpdateProjectModal open={openUpdateModal} setOpen={handleCloseUpdateModal} id={selectedTortureId} />
            )}

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: 4,
                    p: 2,
                    bgcolor: "white",
                    borderRadius: "12px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                }}
            >
                <Stack
                    spacing={2}
                    sx={{
                        "& .MuiPaginationItem-root": {
                            fontSize: "14px",
                            borderRadius: "8px",
                        },
                        "& .Mui-selected": {
                            fontWeight: "bold",
                            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
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
                        sx={{
                            "& .MuiPaginationItem-page.Mui-selected": {
                                background: "linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)",
                                color: "white",
                            },
                        }}
                    />
                </Stack>
            </Box>
        </Box>
    )
}

