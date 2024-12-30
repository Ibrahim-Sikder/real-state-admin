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
import CreateServiceModal from "./_components/CreateServiceModal";
import UpdateServiceModal from "./_components/UpdateServiceModal";
import { useDeleteServoceMutation, useGetAllServoceQuery } from "@/redux/api/serviceApi";
import ReactHtmlParser from "react-html-parser";
import Loader from "@/app/loading";
export type TService = {
  _id: string,
  title: string,
  slug: string,
  images: string[];
  description: string,
  meta_description: string;
  meta_keywords: string[];
  meta_title: string;
  date: string,
};

const renderContent = (content: string) => {
  const parsedContent = ReactHtmlParser(content);

  return parsedContent.map((element, index) => {
    if (element.type === "h1") {
      return (
        <h1 key={index} className="text-2xl font-bold mb-2 ">
          {element.props.children}
        </h1>
      );
    } else if (element.type === "h2") {
      return (
        <h2 key={index} className="text-xl font-bold mb-2 ">
          {element.props.children}
        </h2>
      );
    } else if (element.type === "h3") {
      return (
        <h3 key={index} className="text-xl font-bold mb-2 ">
          {element.props.children}
        </h3>
      );
    } else if (element.type === "p") {
      return (
        <p key={index} className="mb-2">
          {element.props.children}
        </p>
      );
    }

    // else if (element.type === "img") {
    //   return (
    //     <img
    //       key={index}
    //       className="w-full h-auto object-cover mb-4 hidden "
    //       src={element.props.src}
    //       alt="Blog Image"
    //     />
    //   );
    // }
    else if (
      element.type === "div" &&
      element.props.className === "ql-align-center"
    ) {
      return (
        <div key={index} className="text-center mb-2">
          {element.props.children}
        </div>
      );
    } else if (
      element.type === "div" &&
      element.props.className === "ql-align-right"
    ) {
      return (
        <div key={index} className="text-right mb-2">
          {element.props.children}
        </div>
      );
    } else if (
      element.type === "div" &&
      element.props.className === "ql-align-left"
    ) {
      return (
        <div key={index} className="text-left mb-2">
          {element.props.children}
        </div>
      );
    } else {
      return null;
    }
  });
};

const ProjectPage = () => {
  const [open, setOpen] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedTortureId, setSelectedTortureId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: serviceData, isLoading } = useGetAllServoceQuery({ page: currentPage, limit: 5 });
  const [deleteService] = useDeleteServoceMutation();
  const handleOpen = () => setOpen(true);

  const hanldeOpenUpdateModal = (id: string) => {
    setSelectedTortureId(id);
    setOpenUpdateModal(true);
  };

  const handleClose = () => setOpen(false);
  const handleCloseUpdateModal = () => setOpenUpdateModal(false);

  if (isLoading) {
    return <Loader/>;
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
          await deleteService(id).unwrap();

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

  const { meta } = serviceData?.data || { meta: {}, oppresses: [] };
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
      <DashboardCard>
        <Box>

          <Box display='flex' justifyContent='space-between'>
            <Typography variant="h5" fontWeight='bold'>All Services </Typography>

            <Button
              onClick={handleOpen}
              startIcon={<AddCircleOutlineIcon />}>
              Create Service
            </Button>

          </Box>
          <Box bgcolor="white" padding={3}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">SL No</TableCell>
                    <TableCell align="center">Image</TableCell>
                    <TableCell align="center">Title</TableCell>
                    <TableCell align="center">Description</TableCell>

                    <TableCell align="center">Created Date</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {serviceData?.data?.services?.map((data: TService, index: number) => (
                    <TableRow
                      key={data._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">
                        {
                          data.images.slice(0, 1).map((img) => (
                            <>
                              <Image width={50} height={50} className="w-20" src={img} alt='activity' />
                            </>
                          ))
                        }
                      </TableCell>
                      <TableCell align="center">{data.title} </TableCell>

                      <TableCell align="center"> {renderContent(data?.description.slice(0,50))} </TableCell>
                      <TableCell align="center">{formatDate(data.date)}</TableCell>
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
            <CreateServiceModal
              open={open}
              setOpen={handleClose}

            />
          )}
          {openUpdateModal && (
            <UpdateServiceModal
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
