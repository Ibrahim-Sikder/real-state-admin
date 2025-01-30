
"use client"

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
    AddIcCallOutlined,
    ArrowBack,
} from "@mui/icons-material"
import Image from "next/image"
import { TReview, TService, TTeam } from "@/types"
import { addIconStyle, cellStyle, iconButtonStyle, iconStyle, tableHeadStyle, tableStyle } from "@/customStyle"
import Loader from "@/app/loading"
import Swal from "sweetalert2"
import { toast } from "sonner"
import parse from "html-react-parser";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteServoceMutation, useGetAllServoceQuery } from "@/redux/api/serviceApi"
import truncateText from "@/utils/truncate"

import { useRouter } from "next/navigation"
import { useDeleteTeamMutation, useGetAllTeamQuery } from "@/redux/api/teamApi"
import { useState } from "react"
import { useDeletereviewMutation, useGetAllreviewQuery } from "@/redux/api/reviewApi"
import CreateReviewModal from "./_components/CreateReviewModal"
import UpdateReviewModal from "./_components/UpdateReviewModal"
export default function BlogTable() {
    const [open, setOpen] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [selectedTortureId, setSelectedTortureId] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const { data: reviewData, isLoading } = useGetAllreviewQuery({ page: currentPage, limit: 10 });
    const [deleteReview] = useDeletereviewMutation();
    const handleOpen = () => setOpen(true);
    const router = useRouter()
    const hanldeOpenUpdateModal = (id: string) => {
        setSelectedTortureId(id);
        setOpenUpdateModal(true);
    };

    const handleClose = () => setOpen(false);
    const handleCloseUpdateModal = () => setOpenUpdateModal(false);

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
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {

            if (result.isConfirmed) {
                try {
                    await deleteReview(id).unwrap();

                    Swal.fire({
                        title: "Deleted!",
                        text: "Your team has been deleted.",
                        icon: "success"
                    });
                } catch (err: any) {
                    toast.error(err.message);
                }
            }
        });
    };

    const { meta } = reviewData?.data || { meta: {}, team: [] };
    const { totalPage = 5 } = meta || {};

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
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
                    Reviews ({reviewData?.data?.reviews?.length})
                </Typography>

                <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                        onClick={handleBack}
                        startIcon={<ArrowBack />}
                        sx={{ mr: 2, color: "#fff" }}
                    >
                        Back
                    </Button>
                    <Button
                        onClick={handleOpen}

                        variant="contained"
                        startIcon={<AddIcCallOutlined />}
                        sx={addIconStyle}
                    >
                        Add Review
                    </Button>
                </Box>
            </Box>



            <TableContainer component={Paper} sx={{ mb: 2, mt: 5 }}>
                <Table sx={tableStyle}>
                    <TableHead>
                        <TableRow>

                            <TableCell sx={cellStyle}>SL No</TableCell>
                            <TableCell sx={cellStyle}>Image</TableCell>
                            <TableCell sx={cellStyle}>Name</TableCell>
                            <TableCell sx={cellStyle}>Designation</TableCell>
                            <TableCell sx={cellStyle}>Title</TableCell>
                            <TableCell sx={cellStyle}>Description</TableCell>
                            <TableCell sx={cellStyle}>Created Date</TableCell>
                            <TableCell sx={cellStyle}>Actions</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reviewData?.data?.reviews?.map((data: TReview, index: number) => (
                            <TableRow key={data._id}>
                                <TableCell sx={cellStyle}>
                                    {index + 1}
                                </TableCell>
                                <TableCell sx={cellStyle}>{
                                    data.images.slice(0, 1).map((img) => (
                                        <>
                                            <Image width={50} height={50} className="w-20" src={img} alt='activity' />
                                        </>
                                    ))
                                }</TableCell>
                                <TableCell >{data.name} </TableCell>
                                <TableCell>{data.designation} </TableCell>
                                <TableCell >{data.title} </TableCell>
                                <TableCell>{data.description.slice(0, 30)}... </TableCell>

                                <TableCell sx={cellStyle}>


                                    {
                                        new Date(data?.createdAt).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })
                                    }

                                </TableCell>
                                <TableCell >
                                    <div className="flex justify-center gap-2 ">

                                        <IconButton
                                            sx={{ ...iconButtonStyle, background: '#216740' }}
                                            title="Edit"
                                            onClick={() => hanldeOpenUpdateModal(data._id)}
                                        >
                                            <EditIcon sx={iconStyle} />
                                        </IconButton>

                                        <IconButton
                                            sx={iconButtonStyle}
                                            onClick={() => handleDelete(data._id)}
                                            title="Delete"
                                        >
                                            <DeleteIcon sx={iconStyle} className="text-red-600" />
                                        </IconButton>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {open && (
                <CreateReviewModal
                    open={open}
                    setOpen={handleClose}

                />
            )}
            {openUpdateModal && (
                <UpdateReviewModal
                    open={openUpdateModal}
                    setOpen={handleCloseUpdateModal}
                    id={selectedTortureId}
                />
            )}
            <Stack spacing={2} display='flex' justifyItems='center' alignItems='center' marginTop='20px'>
                <Pagination count={totalPage} page={currentPage} onChange={handlePageChange} color="secondary" />
            </Stack>
        </Box>
    )
}

