"use client"

import { useEffect, useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import type { FieldValues } from "react-hook-form"
import { AppBar, Box, Button, Container, Grid, IconButton, Toolbar, Typography, styled } from "@mui/material"
import { ArrowLeft, X } from "lucide-react"
import { toast } from "sonner"

// Components
import ADForm from "@/components/Forms/Form"
import ADInput from "@/components/Forms/Input"
import ADEditor from "@/components/Forms/JodiEditor"
import ADAutoComplete from "@/components/Forms/AutoComplete"
import ADImageUpload from "@/components/Forms/FileUpload"
import GlobalImageSelector from "@/components/Shared/ImageSelector/GlobalImageSelector"

// Assuming tags are imported from a constant file
import { tags } from "@/constant"
import ADTextArea from "@/components/Forms/TextArea"
import { useCreateBlogMutation, useGetSingleBlogQuery, useUpdateBlogMutation } from "@/redux/api/blogApi"
import { useRouter, useSearchParams } from "next/navigation"
import Loader from "@/app/loading"

// Styled Components
const FormContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: theme.spacing(4),
    padding: theme.spacing(2),

}))

const MainContent = styled(Box)(({ theme }) => ({
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: theme.spacing(1),
    padding: theme.spacing(3),
}))

const SideContent = styled(Box)(({ theme }) => ({
    width: "400px",
    backgroundColor: "#fff",
    borderRadius: theme.spacing(1),
    padding: theme.spacing(3),
    height: '100%'
}))

const ImageUploadBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "200px",
    height: "200px",
    margin: "0 auto",
    border: "2px dashed #E0E0E0",
    borderRadius: theme.spacing(1),
    cursor: "pointer",
    "&:hover": {
        borderColor: theme.palette.primary.main,
    },
}))

const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2),
    width: "100%",
    padding: theme.spacing(1.5),
}))

const SectionTitle = styled(Typography)(({ theme }) => ({
    fontSize: "1.5rem",
    fontWeight: 600,
    marginBottom: theme.spacing(2),
}))

const SubTitle = styled(Typography)(({ theme }) => ({
    fontSize: "0.875rem",
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(3),
}))



export default function BlogForm() {
    const [thumbnail, setThumbnail] = useState<string[]>([])
    const [imageOpen, setImageOpen] = useState(false)
    const methods = useForm<FieldValues>()
    const router = useRouter()
    const [createBlog] = useCreateBlogMutation()
    const [updateBlog] = useUpdateBlogMutation()
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const { data, isLoading } = useGetSingleBlogQuery(id)

    const handleSubmit = async (values: FieldValues) => {

        const modifiedValues = {
            ...values,
            meta_keywords: values.meta_keywords || [],
            thumbnail,
        }
        try {
            const res = await createBlog(modifiedValues).unwrap()
            if (res.success) {
                toast.success("Blog created successfully!")
                router.push('/dashboard/super_admin/blog')
            }

        } catch (err: any) {
            console.error("Error:", err)
            toast.error(err?.data?.message || "An error occurred")
        }
    }
    const onSubmit = async (values: FieldValues) => {

        const modifiedValues = {
            ...values,
            meta_keywords: values.meta_keywords || [],
            thumbnail,
        }

        try {
            const res = await updateBlog({ ...modifiedValues, id }).unwrap()
            if (res.success) {
                toast.success("Blog update successfully!")
                router.push('/dashboard/super_admin/blog')
            }

        } catch (err: any) {
            console.error("Error:", err)
            toast.error(err?.data?.message || "An error occurred")
        }
    }


    const singleBlog = data?.data
    console.log(singleBlog)
    useEffect(() => {
        if (singleBlog) {
            setThumbnail(singleBlog?.thumbnail || "");
        }
    }, [singleBlog]);
    if (isLoading) {
        return <Loader />
    }

    const defaultValues = {
        title: singleBlog?.title || "",
        description: singleBlog?.description || "",
        content: singleBlog?.content || "",
        tags: singleBlog?.tags || [],
        thumbnail: singleBlog?.thumbnail || [],


    };

    return (
        <Container disableGutters maxWidth={false}>
            <FormProvider {...methods}>
                <FormContainer>
                    <AppBar
                        position="static"
                        elevation={0}
                        sx={{
                            backgroundColor: "white",
                            borderBottom: "1px solid",
                            borderColor: "grey.200",
                            borderRadius: '10px'
                        }}
                    >
                        <Toolbar sx={{ justifyContent: "space-between" }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <IconButton edge="start" aria-label="back" sx={{ color: "text.primary" }}>
                                    <ArrowLeft />
                                </IconButton>
                                <Typography
                                    variant="h6"
                                    component="h1"
                                    sx={{
                                        color: "text.primary",
                                        fontWeight: 500,
                                    }}
                                >
                                    Create Blog
                                </Typography>
                            </Box>
                            <IconButton edge="end" aria-label="close" sx={{ color: "text.primary" }}>
                                <X />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                </FormContainer>

                <FormContainer>
                    <MainContent>
                        <SectionTitle>Create New Blog</SectionTitle>
                        <SubTitle>Fill in the blog details below</SubTitle>
                        <ADForm onSubmit={id ? onSubmit : handleSubmit} defaultValues={defaultValues}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <ADInput fullWidth name="title" label="Blog Title" autoFocus={true} />
                                </Grid>
                                <Grid item xs={12}>
                                    <ADTextArea fullWidth name="description" label="Description" minRows={3} />
                                </Grid>
                                <Grid item xs={12}>
                                    <ADEditor name="content" label="Write your content below " />
                                </Grid>
                                <Grid item xs={12}>
                                    <ADAutoComplete label="Tags" name="tags" options={tags} />
                                </Grid>
                                <Grid item xs={12}>
                                    <StyledButton type="submit" variant="contained">
                                        Save Changes
                                    </StyledButton>
                                </Grid>
                            </Grid>
                        </ADForm>
                    </MainContent>

                    <SideContent>
                        <SectionTitle>Select Blog Thumbnail</SectionTitle>
                        <ImageUploadBox >
                            <ADImageUpload name="thumbnail" setImageUrls={setThumbnail} imageUrls={thumbnail} label="Select Images" />
                        </ImageUploadBox>
                        <StyledButton variant="contained" onClick={() => setImageOpen(true)}>
                            Select Image
                        </StyledButton>
                    </SideContent>
                </FormContainer>

                <GlobalImageSelector
                    open={imageOpen}
                    onClose={() => setImageOpen(false)}
                    setSelectedImage={setThumbnail}
                    mode="multiple"
                    selectedImage={thumbnail}
                />
            </FormProvider>
        </Container>
    )
}

