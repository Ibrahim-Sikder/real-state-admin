
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
} from "@mui/material"
import {
  AddIcCallOutlined,
  ArrowBack,
} from "@mui/icons-material"
import { TUser } from "@/types"
import { addIconStyle, cellStyle, iconButtonStyle, iconStyle, tableHeadStyle, tableStyle } from "@/customStyle"
import Loader from "@/app/loading"
import Swal from "sweetalert2"
import { toast } from "sonner"
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation"
import { useState } from "react"
import AddUserModal from "./_components/AddUserModal"
import { useDeleteUserMutation, useGetAllUserQuery } from "@/redux/api/userApi"
export default function BlogTable() {
  const [open, setOpen] = useState(false);
  const { data: userData, isLoading } = useGetAllUserQuery({})
  const [deleteUser] = useDeleteUserMutation()
  const router = useRouter()

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


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
          await deleteUser(id).unwrap();
          Swal.fire({
            title: "Deleted!",
            text: "User has been deleted.",
            icon: "success",
          });
        } catch (err: any) {
          toast.error(err.message);
        }
      }
    });
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
          All User List ({userData?.data?.length})
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
            Add User
          </Button>
        </Box>
      </Box>



      <TableContainer component={Paper} sx={{ mb: 2, mt: 5 }}>
        <Table sx={tableStyle}>
          <TableHead>
            <TableRow>
              <TableCell sx={cellStyle}>SL No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Roles</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created Date </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>

          </TableHead>
          <TableBody>
            {userData?.data?.map((user: TUser, index: number) => (
              <TableRow key={user._id}>
                <TableCell sx={cellStyle}>
                  {index + 1}
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>
                  {
                    new Date(user?.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  }
                </TableCell>

                <TableCell>
                  <IconButton
                    sx={iconButtonStyle}
                    onClick={() => handleDelete(user._id)}
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
      {open && (
        <AddUserModal
          open={open}
          setOpen={handleClose}

        />
      )}

    </Box>
  )
}

