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
import Swal from "sweetalert2";
import CreateProjectModal from "./_components/CreateProjectModal";
import UpdateProjectModal from "./_components/UpdateProjectModal";
import { useDeleteProjectMutation, useGetAllProjectQuery } from "@/redux/api/projectApi";
import Head from "next/head";
export type TOppressed = {
    _id: string,
    title: string;
    sub_title: string;
    project_type: string;
    project_address: string;
    land_area: string;
    storied: string;
    apartment_contains: string;
    overview_Location: string[];
    short_description: string;
    overview_description: string;
    concept_Location?: string[];
    concept_description?: string;
    floor_title?: string;
    floor_Location?: string[];
    floor_description?: string;
    map_Location?: string[];
    map_description?: string;
    conceptImage?: string;
    overviewImage?: string;
    videoUrls?: string[];
    locationImg: string,
    createdAt: string,
    floorImage: string,
};


const ProjectPage = () => {
    const [open, setOpen] = useState(false);
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [selectedTortureId, setSelectedTortureId] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const { data: projectData, isLoading } = useGetAllProjectQuery({ page: currentPage, limit: 10 });
    const [deleteProject] = useDeleteProjectMutation();
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
                    await deleteProject(id).unwrap();

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

    const { meta } = projectData?.data || { meta: {}, oppresses: [] };
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
            <Head>
                <title>Our Projects - Anaa Developers Ltd </title>

            </Head>
            <DashboardCard>
                <Box>

                    <Box display='flex' justifyContent='space-between'>
                        <Typography variant="h5" fontWeight='bold'>Our Project </Typography>

                        <div className="flex items-center gap-2 ">
                            <Button
                                sx={{ marginRight: '3px' }}
                                onClick={handleOpen}
                                startIcon={<AddCircleOutlineIcon />}>
                                Create Project
                            </Button>
                            <Button
                                onClick={handleOpen}
                                startIcon={<AddCircleOutlineIcon />}>
                                Create Category
                            </Button>

                        </div>
                    </Box>
                    <Box bgcolor="white" padding={3}>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">SL No</TableCell>
                                        <TableCell align="center">Title</TableCell>
                                        <TableCell align="center">Sub Title</TableCell>
                                        <TableCell align="center">Short Description </TableCell>
                                        <TableCell align="center">Created Date</TableCell>
                                        <TableCell align="center">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {projectData?.data?.projects?.map((data: TOppressed, index: number) => (
                                        <TableRow
                                            key={data._id}
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                        >
                                            <TableCell align="center">{index + 1}</TableCell>
                                            {/* <TableCell align="center">
                                                <Image width={50} height={50} className="w-20" src={data.floorImage} alt='activity' />
                                            </TableCell> */}
                                            <TableCell align="center">{data.title} </TableCell>

                                            <TableCell align="center">{data.sub_title}</TableCell>
                                            <TableCell align="center">{data.short_description.slice(0, 50)}</TableCell>

                                            <TableCell align="center">{formatDate(data.createdAt)}</TableCell>
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
                    {open && (
                        <CreateProjectModal
                            open={open}
                            setOpen={handleClose}

                        />
                    )}
                    {openUpdateModal && (
                        <UpdateProjectModal
                            open={openUpdateModal}
                            setOpen={handleCloseUpdateModal}
                            id={selectedTortureId}
                        />
                    )}
                </Box>
            </DashboardCard>
            <Stack spacing={2} display='flex' justifyItems='center' alignItems='center' marginTop='20px'>
                <Pagination count={totalPage} page={currentPage} onChange={handlePageChange} color="secondary" />
            </Stack>

        </PageContainer>
    );
};

export default ProjectPage;
