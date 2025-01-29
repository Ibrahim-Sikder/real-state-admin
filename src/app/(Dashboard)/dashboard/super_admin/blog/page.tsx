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
    Checkbox,
    IconButton,
    Button,
    Menu,
    MenuItem,
    Select,
    FormControl,
    type SelectChangeEvent,
    Box,
    Chip,
    Typography,
} from "@mui/material"
import {
    MoreVert,
    KeyboardArrowLeft,
    KeyboardArrowRight,
    KeyboardDoubleArrowLeft,
    KeyboardDoubleArrowRight,
    AddIcCallOutlined,
} from "@mui/icons-material"
import Image from "next/image"
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined"
import { useDeleteBlogMutation, useGetAllBlogQuery } from "@/redux/api/blogApi"
import { TBlog } from "@/types"
import { addIconStyle, btnStyle, cellStyle, chipStyle, chipWrapStyle, paginateStyle, tableHeadStyle, tableStyle } from "@/customStyle"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Loader from "@/app/loading"
import Swal from "sweetalert2"
import { toast } from "sonner"
export default function BlogTable() {
    const router = useRouter();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const [rowsPerPage, setRowsPerPage] = React.useState("10")
    const { data, isLoading } = useGetAllBlogQuery({})
    const [deleteBlog] = useDeleteBlogMutation({})
    const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleMenuClose = () => {
        setAnchorEl(null)
    }
    const handleRowsPerPageChange = (event: SelectChangeEvent) => {
        setRowsPerPage(event.target.value)
    }
    const handleEdit = (id: string) => {
        router.push(`/dashboard/super_admin/blog/update/?id=${id}`);
    };
    if (isLoading) {
        return <Loader />
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
                    await deleteBlog(id).unwrap();

                    Swal.fire({
                        title: "Deleted!",
                        text: "Your blog has been deleted.",
                        icon: "success"
                    });
                } catch (err: any) {
                    toast.error(err.message);
                }
            }
        });
    };

    return (
        <Box sx={{ width: "100%", p: 2 }}>
            <Box
                sx={tableHeadStyle}
            >
                <Typography variant="h6" component="h1" sx={{ fontWeight: 500 }}>
                    Blogs ({data?.data?.blogs?.length})
                </Typography>

                <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                        variant="outlined"
                        startIcon={<FileDownloadOutlinedIcon />}
                        sx={btnStyle}
                    >
                        Export
                    </Button>
                    <Button
                        component={Link}
                        href='/dashboard/super_admin/blog/create'
                        variant="contained"
                        startIcon={<AddIcCallOutlined />}
                        sx={addIconStyle}
                    >
                        Add Blog
                    </Button>
                </Box>
            </Box>



            <TableContainer component={Paper} sx={{ mb: 2, mt: 5 }}>
                <Table sx={tableStyle}>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox" sx={cellStyle}>
                                <Checkbox />
                            </TableCell>
                            <TableCell sx={cellStyle}>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    Title
                                </Box>
                            </TableCell>
                            <TableCell sx={cellStyle}>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    Description
                                </Box>
                            </TableCell>
                            <TableCell sx={cellStyle}>Tags</TableCell>
                            <TableCell sx={cellStyle}>Thumbnail</TableCell>
                            <TableCell sx={cellStyle}>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    Date Created
                                </Box>
                            </TableCell>
                            <TableCell padding="checkbox" sx={cellStyle} />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.data?.blogs?.map((blog: TBlog) => (
                            <TableRow key={blog._id}>
                                <TableCell padding="checkbox" sx={cellStyle}>
                                    <Checkbox />
                                </TableCell>
                                <TableCell sx={cellStyle}>{blog.title}</TableCell>
                                <TableCell sx={cellStyle}>{blog.description}</TableCell>
                                <TableCell sx={cellStyle}>
                                    <Box sx={chipWrapStyle}>
                                        {blog.tags.map((tag) => (
                                            <Chip
                                                key={tag}
                                                label={tag}
                                                size="small"
                                                sx={chipStyle}
                                            />
                                        ))}
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ "&:last-child": { borderRight: "none" } }}>


                                    {
                                        blog.thumbnail.slice(0, 1).map((img) => (
                                            <Image
                                                key={img}
                                                src={img}
                                                alt="Thumbnail"
                                                width={80}
                                                height={60}
                                                style={{ borderRadius: "4px", objectFit: "cover" }}
                                            />
                                        ))
                                    }
                                </TableCell>
                                <TableCell sx={{ "&:last-child": { borderRight: "none" } }}>


                                    {
                                        new Date(blog?.createdAt).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })
                                    }

                                </TableCell>
                                <TableCell padding="checkbox" sx={{ "&:last-child": { borderRight: "none" } }}>
                                    <IconButton size="small" onClick={handleMenuClick}>
                                        <MoreVert />
                                    </IconButton>
                                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                                        <MenuItem onClick={() => handleEdit(blog._id)}>Edit</MenuItem>
                                        <MenuItem onClick={() => handleDelete(blog._id)}>Delete</MenuItem>
                                    </Menu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={paginateStyle}>
                <Typography variant="body2" color="text.secondary">
                    Showing 1 to 6 of 6 results
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography variant="body2">Rows per page</Typography>
                        <FormControl size="small">
                            <Select value={rowsPerPage} onChange={handleRowsPerPageChange} sx={{ minWidth: 70 }}>
                                <MenuItem value="10">10</MenuItem>
                                <MenuItem value="20">20</MenuItem>
                                <MenuItem value="50">50</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography variant="body2">Page 1 of 1</Typography>
                        <Box sx={{ display: "flex", gap: 0.5 }}>
                            <IconButton size="small" disabled>
                                <KeyboardDoubleArrowLeft />
                            </IconButton>
                            <IconButton size="small" disabled>
                                <KeyboardArrowLeft />
                            </IconButton>
                            <IconButton size="small" disabled>
                                <KeyboardArrowRight />
                            </IconButton>
                            <IconButton size="small" disabled>
                                <KeyboardDoubleArrowRight />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

