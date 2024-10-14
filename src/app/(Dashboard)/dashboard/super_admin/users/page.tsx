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
import TableContainer from "@mui/material/TableContainer";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PageContainer from "@/app/(Dashboard)/components/container/PageContainer";
import DashboardCard from "@/app/(Dashboard)/components/shared/DashboardCard";
import AddUserModal from "./_components/AddUserModal";
import { useDeleteUserMutation, useGetAllUserQuery } from "@/redux/api/userApi";
import { toast } from "sonner";

function createData(
  id: number,
  name: string,
  email: string,
  roles: string[],
  status: string
) {
  return { id, name, email, roles, status };
}
export type TUser = {
  _id: string,
  name: string,
  email: string,
  role: string[],
  status: boolean,
}

const UsersPage = () => {
  const [open, setOpen] = useState(false);
  const { data: userData, isLoading } = useGetAllUserQuery({})
  const [deleteUser] = useDeleteUserMutation()
  if (isLoading) {
    return <p>Loading........</p>
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteUser(id).unwrap()
      toast.success(res?.message);

    } catch (err: any) {
      toast.error(err.message)
    }

  }

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }



  return (
    <PageContainer description="Manage users and their roles">
      <DashboardCard>
        <Box>
          <Box display='flex' justifyContent='space-between'>
            <Typography variant="h5" fontWeight='bold'> All User  </Typography>

            <Button
              onClick={handleOpen}
              startIcon={<AddCircleOutlineIcon />}>
              Create User
            </Button>

          </Box>
          <Box bgcolor="white" padding={3} marginTop="20px">
            <TableContainer component={Paper} sx={{ marginTop: 3 }}>
              <Table aria-label="users table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Roles</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userData?.data.map((user: TUser, i: number) => (
                    <TableRow
                      key={user._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">{user.name}</TableCell>
                      <TableCell align="center">{user.email}</TableCell>
                      <TableCell align="center">{user.role}</TableCell>
                      <TableCell align="center">{user.status}</TableCell>
                      <TableCell align="center">
                        <div className="flex justify-center">
                          {/* <IconButton

                            title="Edit"
                          >
                            <EditIcon />
                          </IconButton> */}
                          <IconButton onClick={() => handleDelete(user._id)} title="Delete">
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
            <AddUserModal
              open={open}
              setOpen={handleClose}

            />
          )}
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default UsersPage;
