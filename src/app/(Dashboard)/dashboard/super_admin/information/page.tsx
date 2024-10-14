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
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Pagination, Stack, Typography } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PageContainer from "@/app/(Dashboard)/components/container/PageContainer";
import DashboardCard from "@/app/(Dashboard)/components/shared/DashboardCard";
import { toast } from "sonner";
import { useDeleteInformationMutation, useGetAllInformationQuery } from "@/redux/api/informatoinApi";

export type TReport = {
    _id: string,
    name: string,
    message: string,
};



const ReportPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data: informationData, isLoading } = useGetAllInformationQuery({ page: currentPage, limit: 5 });
    const [deleteInformation] = useDeleteInformationMutation();

    if (isLoading) {
        return <p>Loading...........</p>;
    }

    const handleDelete = async (id: string) => {
        try {
            const res = await deleteInformation(id).unwrap()
            toast.success(res?.message);

        } catch (err: any) {
            toast.error(err.message)
        }

    }

    const { meta } = informationData?.data || { meta: {}, oppresses: [] };
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
                        <Typography variant="h5" fontWeight='bold'>All Information </Typography>



                    </Box>
                    <Box bgcolor="white" padding={3}>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">SL No</TableCell>
                                        <TableCell align="center">Name </TableCell>
                                        <TableCell align="center">Message </TableCell>
                                        <TableCell align="center">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {informationData?.data?.informations?.map((data: TReport, index: number) => (
                                        <TableRow
                                            key={data._id}
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                        >
                                            <TableCell align="center">{index + 1}</TableCell>

                                            <TableCell align="center">{data.name}</TableCell>
                                            <TableCell align="center">{data.message}</TableCell>
                                            <TableCell align="center">
                                                <div className="flex justify-center">

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

                </Box>
            </DashboardCard>
            <Stack spacing={2} display='flex' justifyItems='center' alignItems='center' marginTop='20px'>
                <Pagination count={totalPage} page={currentPage} onChange={handlePageChange} color="primary" />
            </Stack>
        </PageContainer>
    );
};

export default ReportPage;
