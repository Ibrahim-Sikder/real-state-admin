"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import EditIcon from "@mui/icons-material/Edit";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Pagination, Stack, Typography } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PageContainer from "@/app/(Dashboard)/components/container/PageContainer";
import DashboardCard from "@/app/(Dashboard)/components/shared/DashboardCard";
import { toast } from "sonner";
import Image from "next/image";
import profile from '../../../../../assets/images/profile.png'
import CreateGalleryModal from "./_components/CreateGalleryModal";
import UpdateGalleryModal from "./_components/UpdateGalleryModal";
import { useDeleteImgGalleryMutation, useGetAllImgGalleryQuery } from "@/redux/api/imageGalleryApi";


export type TPrison = {
    _id: string,
    name: string,
    date: string,
    createdAt: string,
    thumnail_img: string,
};


const PrisonsPage = () => {
    const [open, setOpen] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [selectedTortureId, setSelectedTortureId] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const { data: galleryData, isLoading } = useGetAllImgGalleryQuery({ page: currentPage, limit: 5 });
    const [deleteImgGallery] = useDeleteImgGalleryMutation();

    const handleOpen = () => setOpen(true);

    const hanldeOpenUpdateModal = (id: string) => {
        setSelectedTortureId(id);
        setOpenUpdateModal(true);
    };

    const handleClose = () => setOpen(false);
    const handleCloseUpdateModal = () => setOpenUpdateModal(false);

    if (isLoading) {
        return <p>Loading...........</p>;
    }

    const handleDelete = async (id: string) => {
        try {
            const res = await deleteImgGallery(id).unwrap()
            toast.success(res?.message);

        } catch (err: any) {
            toast.error(err.message)
        }

    }

    const { meta } = galleryData?.data || { meta: {}, oppresses: [] };
    const { totalPage = 5 } = meta || {};

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    const formatDate = (dateString: string | number | Date) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }

    return (
        <PageContainer title="Sample Page" description="this is Sample page">
            <DashboardCard>
                <Box>

                    <Box display='flex' justifyContent='space-between'>
                        <Typography variant="h5" fontWeight='bold'> Gallery </Typography>

                        <Button
                            onClick={handleOpen}
                            startIcon={<AddCircleOutlineIcon />}>
                            Create Gallery
                        </Button>

                    </Box>
                    <Box bgcolor="white" padding={3}>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Image</TableCell>
                                        <TableCell align="center">Name</TableCell>
                                        <TableCell align="center">Created At </TableCell>
                                        <TableCell align="center">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {galleryData?.data?.galleries?.map((data: TPrison, index: number) => (
                                        <TableRow
                                            key={data._id}
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                        >
                                            <TableCell align="center"> <Image width={50} height={50} className="w-20" src={data.thumnail_img} alt='activity' /></TableCell>

                                            <TableCell align="center">{data.name}</TableCell>
                                            <TableCell align="center">{formatDate(data.createdAt)}</TableCell>
                                            <TableCell align="center">
                                                <div className="flex justify-center">
                                                    <IconButton

                                                        title="Edit">
                                                        <EditIcon onClick={() => hanldeOpenUpdateModal(data._id)} />
                                                    </IconButton>
                                                    <IconButton
                                                        onClick={() => handleDelete(data._id)}
                                                        title="Delete"
                                                    >
                                                        <DeleteIcon className="text-red-600" />
                                                    </IconButton>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    {open && (
                        <CreateGalleryModal
                            open={open}
                            setOpen={handleClose}

                        />
                    )}
                    {openUpdateModal && (
                        <UpdateGalleryModal
                            open={openUpdateModal}
                            setOpen={handleCloseUpdateModal}
                            id={selectedTortureId}
                        />
                    )}
                </Box>
            </DashboardCard>
            <Stack spacing={2} display='flex' justifyItems='center' alignItems='center' marginTop='20px'>
                <Pagination count={totalPage} page={currentPage} onChange={handlePageChange} color="primary" />
            </Stack>
        </PageContainer>
    );
};

export default PrisonsPage;
