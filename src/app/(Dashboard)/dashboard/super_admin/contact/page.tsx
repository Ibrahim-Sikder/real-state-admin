
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
    ArrowBack,
} from "@mui/icons-material"
import { TContact } from "@/types"
import { cellStyle, iconButtonStyle, iconStyle, tableHeadStyle, tableStyle } from "@/customStyle"
import Loader from "@/app/loading"
import Swal from "sweetalert2"
import { toast } from "sonner"
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useDeleteContactMutation, useGetAllContactQuery } from "@/redux/api/informatoinApi"
export default function BlogTable() {
    const [currentPage, setCurrentPage] = useState(1);
    const { data: contactData, isLoading } = useGetAllContactQuery({ page: currentPage, limit: 5 });
    const [deleteContact] = useDeleteContactMutation();
    const router = useRouter()
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
                    await deleteContact(id).unwrap();

                    Swal.fire({
                        title: "Deleted!",
                        text: "User has been deleted.",
                        icon: "success"
                    });
                } catch (err: any) {
                    toast.error(err.message);
                }
            }
        });
    };

    const { meta } = contactData?.data || { meta: {}, oppresses: [] };
    const { totalPage = 5 } = meta || {};

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };


    const handleBack = () => {
        router.back();
    };
    if (isLoading) {
        return <Loader />;
    }

    return (
        <Box sx={{ width: "100%", p: 2 }}>
            <Box
                sx={tableHeadStyle}
            >
                <Typography variant="h6" component="h1" sx={{ fontWeight: 500 }}>
                    All User List ({contactData?.data?.informations?.length})
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
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Message</TableCell>
                            <TableCell align="center">Date</TableCell>
                            <TableCell align="center">Action </TableCell>
                        </TableRow>

                    </TableHead>
                    <TableBody>
                        {contactData?.data?.informations?.map((data: TContact, index: number) => (
                            <TableRow key={data._id}>
                                <TableCell sx={cellStyle}>
                                    {index + 1}
                                </TableCell>
                                <TableCell sx={cellStyle}>{`${data.first_name} ${data.last_name}`}</TableCell>

                                <TableCell sx={cellStyle}>{data.email}</TableCell>
                                <TableCell sx={cellStyle}>{data.message}</TableCell>
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

