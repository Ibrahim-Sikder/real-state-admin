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
    Card,
    CardHeader,
    Tooltip,
    useTheme,
    alpha,
    Chip,
    Avatar,
    Fade,
} from "@mui/material"
import { AddIcCallOutlined, ArrowBack, CalendarMonth, Visibility, WorkOutline } from "@mui/icons-material"
import Image from "next/image"
import type { TTeam } from "@/types"
import Loader from "@/app/loading"
import Swal from "sweetalert2"
import { toast } from "sonner"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import { useRouter } from "next/navigation"
import CreateTeamModal from "./_component/CreateTeamModal"
import UpdateTeamModal from "./_component/UpdateTeamModal"
import { useDeleteTeamMutation, useGetAllTeamQuery } from "@/redux/api/teamApi"
import { iconButtonStyle, iconStyle } from "@/customStyle"

export default function TeamTable() {
    const [open, setOpen] = React.useState(false)
    const [openUpdateModal, setOpenUpdateModal] = React.useState(false)
    const [selectedTeamId, setSelectedTeamId] = React.useState<string | null>(null)
    const [currentPage, setCurrentPage] = React.useState(1)
    const theme = useTheme()

    const { data: teamData, isLoading } = useGetAllTeamQuery({ page: currentPage, limit: 5 })
    const [deleteTeam] = useDeleteTeamMutation()

    const handleOpen = () => setOpen(true)
    const router = useRouter()

    const handleOpenUpdateModal = (id: string) => {
        setSelectedTeamId(id)
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
            text: "You want to delete this team member?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: theme.palette.error.main,
            cancelButtonColor: theme.palette.grey[500],
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteTeam(id).unwrap()
                    Swal.fire({
                        title: "Deleted!",
                        text: "Team member has been deleted.",
                        icon: "success",
                    })
                } catch (err: any) {
                    toast.error(err.message)
                }
            }
        })
    }

    const { meta } = teamData?.data || { meta: {}, teams: [] }
    const { totalPage = 5 } = meta || {}

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page)
    }

    const handleBack = () => {
        router.back()
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
    }

    return (
        <Box sx={{ width: "100%", p: { xs: 1, sm: 2, md: 3 } }}>
            <Card elevation={2} sx={{ mb: 4, overflow: "visible" }}>
                <CardHeader
                    title={
                        <Box
                            sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}
                        >
                            <Typography variant="h5" component="h1" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
                                Team Management
                            </Typography>
                            <Chip
                                label={`${teamData?.data?.teams?.length || 0} Team Members`}
                                color="primary"
                                variant="outlined"
                                sx={{ fontWeight: 500 }}
                            />
                        </Box>
                    }
                    action={
                        <Box sx={{ display: "flex", gap: 2 }}>
                            <Button
                                variant="outlined"
                                onClick={handleBack}
                                startIcon={<ArrowBack />}
                                sx={{
                                    borderRadius: "8px",
                                    borderColor: theme.palette.primary.main,
                                    color: theme.palette.primary.main,
                                    "&:hover": {
                                        borderColor: theme.palette.primary.dark,
                                        backgroundColor: alpha(theme.palette.primary.main, 0.05),
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
                                    borderRadius: "8px",
                                    boxShadow: 2,
                                    background: theme.palette.primary.main,
                                    "&:hover": {
                                        background: theme.palette.primary.dark,
                                    },
                                }}
                            >
                                Add Team
                            </Button>
                        </Box>
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
                            <TableCell sx={{ fontWeight: 600, py: 2 }}>Team Member</TableCell>
                            <TableCell sx={{ fontWeight: 600, py: 2 }}>Designation</TableCell>
                            <TableCell sx={{ fontWeight: 600, py: 2 }}>Join Date</TableCell>
                            <TableCell sx={{ fontWeight: 600, py: 2 }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {teamData?.data?.teams?.map((data: TTeam, index: number) => (
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
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                        {data.images && data.images.length > 0 ? (
                                            <Avatar
                                                sx={{
                                                    width: 50,
                                                    height: 50,
                                                    border: `2px solid ${theme.palette.primary.main}`,
                                                }}
                                            >
                                                <Image
                                                    width={50}
                                                    height={50}
                                                    src={data.images[0] || "/placeholder.svg"}
                                                    alt={data.name}
                                                    style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        objectFit: "cover",
                                                    }}
                                                />
                                            </Avatar>
                                        ) : (
                                            <Avatar
                                                sx={{
                                                    width: 50,
                                                    height: 50,
                                                    bgcolor: alpha(theme.palette.primary.main, 0.8),
                                                }}
                                            >
                                                {data.name.charAt(0)}
                                            </Avatar>
                                        )}
                                        <Typography variant="body1" fontWeight={500}>
                                            {data.name}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ py: 2 }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <WorkOutline fontSize="small" color="action" />
                                        <Chip
                                            label={data.designation}
                                            size="small"
                                            variant="outlined"
                                            sx={{
                                                borderRadius: "6px",
                                                bgcolor: alpha(theme.palette.info.main, 0.1),
                                                borderColor: alpha(theme.palette.info.main, 0.3),
                                                color: theme.palette.info.dark,
                                            }}
                                        />
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ py: 2 }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <CalendarMonth fontSize="small" color="action" />
                                        <Typography variant="body2">{formatDate(data.date || data.createdAt)}</Typography>
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ py: 2 }}>
                                    <Box sx={{ display: "flex", gap: 1 }}>



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
                                                onClick={() => handleOpenUpdateModal(data._id)}
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

            {open && <CreateTeamModal open={open} setOpen={handleClose} />}

            {openUpdateModal && (
                <UpdateTeamModal open={openUpdateModal} setOpen={handleCloseUpdateModal} id={selectedTeamId} />
            )}

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

