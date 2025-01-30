"use client"
import {
    Container,
    Grid,
    Card,
    CardHeader,
    CardContent,
    Typography,
    Button,
    Avatar,
    Box,
    Link as MuiLink,
    CircularProgress,
} from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import {
    Edit as EditIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    LocationOn as LocationIcon,
    Facebook as FacebookIcon,
    Instagram as InstagramIcon,
    LinkedIn as LinkedInIcon,
    YouTube as YouTubeIcon,
    OpenInNew as OpenInNewIcon,
} from "@mui/icons-material"
import { useTheme } from "@mui/material/styles"
import ExpandablePolicy from "./_components/ExpandablePolicy"
import { useGetFrontendQuery } from "@/redux/api/frontendApi"


const FrontendPage = () => {
    const theme = useTheme()
    const { data: frontend, isLoading } = useGetFrontendQuery(undefined) as any

    if (isLoading) return <CircularProgress />

    return (
        <Container maxWidth="xl" sx={{ py: 8 }}>
            <Grid container spacing={3}>
                {/* Left Column (Terms & Privacy) */}
                <Grid item xs={12} lg={8}>
                    <Card sx={{ mb: 3 }}>
                        <CardHeader
                            avatar={<Avatar src={frontend?.appLogo || "/placeholder.svg"} alt="Frontend Logo" />}
                            action={
                                <Button
                                    component={Link}
                                    href={`/dashboard/super_admin/settings/frontend/update/${frontend?._id}`}
                                    startIcon={<EditIcon />}
                                    size="small"
                                >
                                    Edit Frontend
                                </Button>
                            }
                            title={
                                <Typography variant="h6" component="div">
                                    {frontend?.appName}
                                </Typography>
                            }
                        />
                    </Card>

                    <ExpandablePolicy title="Terms and Conditions" content={frontend?.terms || ""} />
                    <ExpandablePolicy title="Privacy Policy" content={frontend?.privacy || ""} />
                    <ExpandablePolicy title="Refund Policy" content={frontend?.refund || ""} />
                    <ExpandablePolicy title="Cancellation Policy" content={frontend?.cancellation || ""} />
                </Grid>

                {/* Right Column (Contact Info and Social Media Links) */}
                <Grid item xs={12} lg={4}>
                    <Card sx={{ mb: 3 }}>
                        <CardHeader title="Contact Information" />
                        <CardContent>
                            <Box display="flex" alignItems="center" mb={2}>
                                <EmailIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
                                <Typography>Email: {frontend?.email || "N/A"}</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mb={2}>
                                <PhoneIcon sx={{ mr: 1, color: theme.palette.success.main }} />
                                <Typography>Phone: {frontend?.phone || "N/A"}</Typography>
                            </Box>
                            <Box display="flex" alignItems="center">
                                <LocationIcon sx={{ mr: 1, color: theme.palette.error.main }} />
                                <Typography>Address: {frontend?.address || "N/A"}</Typography>
                            </Box>
                        </CardContent>
                    </Card>

                    <Card sx={{ mb: 3 }}>
                        <CardHeader title="Social Media Links" />
                        <CardContent>
                            <Box display="flex" alignItems="center" mb={2}>
                                <FacebookIcon sx={{ mr: 1, color: "#1877F2" }} />
                                <MuiLink
                                    href={frontend?.facebookUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    display="flex"
                                    alignItems="center"
                                >
                                    Facebook <OpenInNewIcon sx={{ ml: 0.5, fontSize: "small" }} />
                                </MuiLink>
                            </Box>
                            <Box display="flex" alignItems="center" mb={2}>
                                <InstagramIcon sx={{ mr: 1, color: "#E4405F" }} />
                                <MuiLink
                                    href={frontend?.instragramUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    display="flex"
                                    alignItems="center"
                                >
                                    Instagram <OpenInNewIcon sx={{ ml: 0.5, fontSize: "small" }} />
                                </MuiLink>
                            </Box>
                            <Box display="flex" alignItems="center" mb={2}>
                                <LinkedInIcon sx={{ mr: 1, color: "#0A66C2" }} />
                                <MuiLink
                                    href={frontend?.linkedinUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    display="flex"
                                    alignItems="center"
                                >
                                    LinkedIn <OpenInNewIcon sx={{ ml: 0.5, fontSize: "small" }} />
                                </MuiLink>
                            </Box>
                            <Box display="flex" alignItems="center">
                                <YouTubeIcon sx={{ mr: 1, color: "#FF0000" }} />
                                <MuiLink
                                    href={frontend?.youtubeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    display="flex"
                                    alignItems="center"
                                >
                                    YouTube <OpenInNewIcon sx={{ ml: 0.5, fontSize: "small" }} />
                                </MuiLink>
                            </Box>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader title="Slider Images" />
                        <CardContent>
                            <Grid container spacing={2}>
                                {frontend?.slider?.map((slideUrl: { image: string; url: string }, index: number) => (
                                    <Grid item xs={12} key={index}>
                                        <MuiLink href={slideUrl.url} target="_blank" rel="noopener noreferrer">
                                            <Image
                                                src={slideUrl.image || "/placeholder.svg"}
                                                alt={`Slider ${index + 1}`}
                                                width={500}
                                                height={300}
                                                layout="responsive"
                                                objectFit="cover"
                                                style={{ borderRadius: theme.shape.borderRadius }}
                                            />
                                        </MuiLink>
                                    </Grid>
                                ))}
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

export default FrontendPage

