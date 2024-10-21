"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Pagination, Stack, Typography } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import PageContainer from "@/app/(Dashboard)/components/container/PageContainer";
import DashboardCard from "@/app/(Dashboard)/components/shared/DashboardCard";
import { toast } from "sonner";
import Swal from "sweetalert2";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDeleteFaqMutation, useGetAllFaqQuery } from "@/redux/api/faqApi";
import CreateFAQModal from "./_components/CreateFAQModal";
import UpdateFAQModal from "./_components/UpdateFAQModal";
export type TFaq = {
    _id: string,
    answer: string,
    question: string,
    createdAt: string,
    date: string,

};


const FAQPage = () => {
    const [open, setOpen] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [selectedTortureId, setSelectedTortureId] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const { data: faqData, isLoading } = useGetAllFaqQuery({ page: currentPage, limit: 5 });
    const [deleteFaq] = useDeleteFaqMutation();
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
                    await deleteFaq(id).unwrap();

                    Swal.fire({
                        title: "Deleted!",
                        text: "Your activity has been deleted.",
                        icon: "success"
                    });
                } catch (err: any) {
                    toast.error(err.message);
                }
            }
        });
    };

    const { meta } = faqData?.data || { meta: {}, oppresses: [] };
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

    const iconButtonStyle = {
        width: '30px',
        height: '30px',
        borderRadius: '100%',
        padding: '0px',
        color: 'white',
        background: 'red',
        marginLeft: '2px',
        marginRight: '2px',
        '&:hover': {
            background: 'black',
            color: 'white',
        },
    };
    const iconStyle = { fontSize: '20px' }

    return (
        <PageContainer>
            <>

                <DashboardCard>
                    <>
                    <Box>

<Box display='flex' justifyContent='space-between'>
    <Typography variant="h5" fontWeight='bold'>Question & Answer </Typography>
    <Button
        onClick={handleOpen}
        startIcon={<AddCircleOutlineIcon />}>
        Create FAQ
    </Button>
</Box>
<Box bgcolor="white" padding={3}>
    <TableContainer component={Paper}>
        <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell align="center">SL No</TableCell>
                    <TableCell align="center">Question</TableCell>
                    <TableCell align="center">Answer</TableCell>
                    <TableCell align="center">Create Date </TableCell>

                    <TableCell align="center">Actions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {faqData?.data?.faqs?.map((data: TFaq, index: number) => (
                    <TableRow
                        key={data._id}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                        <TableCell align="center">{index + 1}</TableCell>

                        <TableCell align="center">{data.question.slice(0, 50)}  </TableCell>
                        <TableCell align="center">{data.answer.slice(0, 50)}  </TableCell>


                        <TableCell align="center">
                            {formatDate(data.createdAt)}


                        </TableCell>
                        <TableCell align="center">
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
</Box>

</Box>

{open && (
<CreateFAQModal
    open={open}
    setOpen={handleClose}

/>
)}
{openUpdateModal && (
<UpdateFAQModal
    open={openUpdateModal}
    setOpen={handleCloseUpdateModal}
    id={selectedTortureId}
/>
)}
                    </>
                </DashboardCard>
                <Stack spacing={2} display='flex' justifyItems='center' alignItems='center' marginTop='20px'>
                    <Pagination count={totalPage} page={currentPage} onChange={handlePageChange} color="secondary" />
                </Stack>
            </>


        </PageContainer>
    );
};

export default FAQPage;