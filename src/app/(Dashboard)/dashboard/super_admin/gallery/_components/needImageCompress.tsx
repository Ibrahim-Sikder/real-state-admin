// "use client"

// import React, { useState, useRef } from "react"
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Typography,
//   Stack,
//   Box,
//   Paper,
//   ToggleButton,
//   ToggleButtonGroup,
//   Switch,
//   FormControlLabel,
//   IconButton,
//   CircularProgress,
//   alpha,
//   List,
//   ListItem,
//   ListItemAvatar,
//   ListItemText,
//   ListItemSecondaryAction,
//   Avatar,
//   Chip,
//   Divider,
// } from "@mui/material"
// import { styled } from "@mui/material/styles"
// import {
//   CloudUpload,
//   Close as CloseIcon,
//   Image as ImageIcon,
//   Download as DownloadIcon,
//   Twitter as TwitterIcon,
//   CheckCircle as CheckCircleIcon,
// } from "@mui/icons-material"
// import { useForm, FormProvider } from "react-hook-form"
// import { z } from "zod"
// import { zodResolver } from "@hookform/resolvers/zod"

// interface CompressedImage {
//   id: string
//   name: string
//   originalSize: number
//   compressedSize: number
//   format: string
//   url: string
//   thumbnail: string
// }

// const validationSchema = z.object({
//   autoConvert: z.boolean().default(true),
//   images: z
//     .array(z.any())
//     .nonempty("Please select at least one image")
//     .refine((files) => files.every((file: File) => file.size <= 2 * 1024 * 1024), "Each file must be less than 2MB")
//     .refine(
//       (files) =>
//         files.every((file: File) => ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(file.type)),
//       "Supported formats: JPEG, JPG, PNG, WEBP",
//     ),
// })

// const DropZone = styled(Paper)(({ theme, isDragging }: { theme: any; isDragging: boolean }) => ({
//   border: `2px dashed ${isDragging ? theme.palette.primary.main : theme.palette.divider}`,
//   backgroundColor: isDragging ? alpha(theme.palette.primary.main, 0.05) : theme.palette.background.paper,
//   padding: theme.spacing(6),
//   textAlign: "center",
//   cursor: "pointer",
//   transition: "all 0.2s ease-in-out",
//   "&:hover": {
//     borderColor: theme.palette.primary.main,
//     backgroundColor: alpha(theme.palette.primary.main, 0.05),
//   },
// }))

// const IconWrapper = styled(Box)(({ theme }) => ({
//   width: 80,
//   height: 80,
//   borderRadius: "50%",
//   backgroundColor: alpha(theme.palette.primary.main, 0.1),
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   marginBottom: theme.spacing(2),
//   margin: "0 auto",
// }))

// const StyledDialog = styled(Dialog)(({ theme }) => ({
//   "& .MuiDialog-paper": {
//     backgroundImage: `url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-D1kGaG3vuO9I1z6V87njoNkmso7FsV.png)`,
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     "&::before": {
//       content: '""',
//       position: "absolute",
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       backgroundColor: "rgba(255, 255, 255, 0.95)",
//       backdropFilter: "blur(10px)",
//     },
//   },
// }))

// const ResultCard = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(3),
//   backgroundColor: theme.palette.background.paper,
//   marginTop: theme.spacing(3),
// }))

// const ImageCompress = () => {
//   const [open, setOpen] = useState(false)
//   const [isDragging, setIsDragging] = useState(false)
//   const [selectedFormat, setSelectedFormat] = useState("all")
//   const [compressedImages, setCompressedImages] = useState<CompressedImage[]>([])
//   const [showResults, setShowResults] = useState(false)
//   const fileInputRef = useRef<HTMLInputElement>(null)
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const methods = useForm({
//     resolver: zodResolver(validationSchema),
//     defaultValues: {
//       autoConvert: true,
//     },
//   })

//   const { handleSubmit, register, reset, setValue } = methods

//   const handleClickOpen = () => setOpen(true)
//   const handleClose = () => {
//     setOpen(false)
//     reset()
//   }

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault()
//     setIsDragging(true)
//   }

//   const handleDragLeave = () => {
//     setIsDragging(false)
//   }

//   const handleDrop = async (e: React.DragEvent) => {
//     e.preventDefault()
//     setIsDragging(false)
//     const droppedFiles = Array.from(e.dataTransfer.files)

//     // Update the form with dropped files
//     const event = {
//       target: {
//         files: droppedFiles,
//         type: "change",
//         name: "images",
//       },
//     } as unknown as Event

//     // Trigger the file input change handler
//     await methods.setValue("images", droppedFiles)
//     handleSubmit(onSubmit)(e as unknown as React.FormEvent)
//   }

//   const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const selectedFiles = Array.from(e.target.files)
//       await methods.setValue("images", selectedFiles)
//       handleSubmit(onSubmit)(e)
//     }
//   }

//   const onSubmit = async (data: any) => {
//     setIsSubmitting(true)
//     try {
//       const files = data.images
//       if (!files || files.length === 0) return

//       // Process each file
//       const processedImages = await Promise.all(
//         files.map(async (file: File, index: number) => {
//           // Create preview URL
//           const previewUrl = URL.createObjectURL(file)

//           // Simulate compression (replace with actual compression logic)
//           await new Promise((resolve) => setTimeout(resolve, 1000))

//           return {
//             id: `${index}-${Date.now()}`,
//             name: file.name,
//             originalSize: file.size,
//             compressedSize: Math.floor(file.size * 0.3), // Simulated 70% compression
//             format: file.type.split("/")[1].toUpperCase(),
//             url: previewUrl,
//             thumbnail: previewUrl,
//           }
//         }),
//       )

//       setCompressedImages(processedImages)
//       setShowResults(true)
//       setOpen(false) // Close the dialog after processing
//     } catch (error) {
//       console.error("Error processing images:", error)
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const getTotalSavings = () => {
//     const totalOriginal = compressedImages.reduce((acc, img) => acc + img.originalSize, 0)
//     const totalCompressed = compressedImages.reduce((acc, img) => acc + img.compressedSize, 0)
//     const savingsPercent = (((totalOriginal - totalCompressed) / totalOriginal) * 100).toFixed(0)
//     return {
//       count: compressedImages.length,
//       savings: savingsPercent,
//       totalSize: (totalCompressed / (1024 * 1024)).toFixed(1),
//     }
//   }

//   const handleDownloadAll = () => {
//     compressedImages.forEach((img) => {
//       const link = document.createElement("a")
//       link.href = img.url
//       link.download = img.name
//       document.body.appendChild(link)
//       link.click()
//       document.body.removeChild(link)
//     })
//   }

//   return (
//     <Box>
//       <Button variant="contained" color="primary" startIcon={<CloudUpload />} onClick={handleClickOpen}>
//         Compress Images
//       </Button>

//       {showResults && compressedImages.length > 0 && (
//         <ResultCard elevation={2}>
//           <Box sx={{ bgcolor: "success.main", color: "white", p: 2, borderRadius: 1, mb: 3 }}>
//             <Stack direction="row" justifyContent="space-between" alignItems="center">
//               <Box>
//                 <Typography variant="h6" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                   <CheckCircleIcon />
//                   George the Panda just saved you {getTotalSavings().savings}%
//                 </Typography>
//                 <Typography variant="subtitle2">
//                   {getTotalSavings().count} images optimized | {getTotalSavings().totalSize} MB TOTAL
//                 </Typography>
//               </Box>
//               <Stack direction="row" spacing={2}>
//                 <IconButton color="inherit" size="small">
//                   <TwitterIcon />
//                 </IconButton>
//                 <Button variant="contained" color="secondary" startIcon={<DownloadIcon />} onClick={handleDownloadAll}>
//                   Download all images
//                 </Button>
//               </Stack>
//             </Stack>
//           </Box>

//           <List>
//             {compressedImages.map((image, index) => (
//               <React.Fragment key={image.id}>
//                 {index > 0 && <Divider />}
//                 <ListItem sx={{ py: 2 }}>
//                   <ListItemAvatar>
//                     <Avatar variant="rounded" src={image.thumbnail} sx={{ width: 60, height: 60 }} />
//                   </ListItemAvatar>
//                   <ListItemText
//                     primary={image.name}
//                     secondary={
//                       <Stack direction="row" spacing={1} alignItems="center">
//                         <Chip label={image.format} size="small" color="primary" />
//                         <Typography variant="body2">{(image.originalSize / 1024).toFixed(0)} KB</Typography>
//                       </Stack>
//                     }
//                     sx={{ ml: 2 }}
//                   />
//                   <ListItemSecondaryAction>
//                     <Stack direction="row" spacing={2} alignItems="center">
//                       <Typography color="success.main" fontWeight="bold">
//                         -{(((image.originalSize - image.compressedSize) / image.originalSize) * 100).toFixed(0)}%
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         {(image.compressedSize / 1024).toFixed(0)} KB
//                       </Typography>
//                       <Button
//                         variant="outlined"
//                         size="small"
//                         startIcon={<DownloadIcon />}
//                         onClick={() => {
//                           const link = document.createElement("a")
//                           link.href = image.url
//                           link.download = image.name
//                           document.body.appendChild(link)
//                           link.click()
//                           document.body.removeChild(link)
//                         }}
//                       >
//                         JPEG
//                       </Button>
//                     </Stack>
//                   </ListItemSecondaryAction>
//                 </ListItem>
//               </React.Fragment>
//             ))}
//           </List>
//         </ResultCard>
//       )}

//       <StyledDialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
//         <Box sx={{ position: "relative", zIndex: 1 }}>
//           <DialogTitle sx={{ textAlign: "center", pb: 3 }}>
//             <Typography variant="h4" component="div" fontWeight="bold">
//               Smart Image Compression
//             </Typography>
//             <IconButton aria-label="close" onClick={handleClose} sx={{ position: "absolute", right: 8, top: 8 }}>
//               <CloseIcon />
//             </IconButton>
//           </DialogTitle>

//           <FormProvider {...methods}>
//             <form onSubmit={handleSubmit(onSubmit)}>
//               <DialogContent>
//                 <Stack spacing={4}>
//                   <DropZone
//                     isDragging={isDragging}
//                     onDragOver={handleDragOver}
//                     onDragLeave={handleDragLeave}
//                     onDrop={handleDrop}
//                     onClick={() => fileInputRef.current?.click()}
//                   >
//                     <IconWrapper>
//                       <ImageIcon color="primary" sx={{ fontSize: 40 }} />
//                     </IconWrapper>
//                     <Typography variant="h6" gutterBottom>
//                       Drop your images here!
//                     </Typography>
//                     <Typography variant="body2" color="textSecondary" gutterBottom>
//                       Up to 20 images, max 2MB each
//                     </Typography>
//                     <Button variant="outlined" color="primary">
//                       Select Files
//                     </Button>
//                     <input
//                       type="file"
//                       multiple
//                       accept="image/*"
//                       style={{ display: "none" }}
//                       ref={fileInputRef}
//                       onChange={handleFileSelect}
//                       {...register("images")}
//                     />
//                   </DropZone>

//                   <Box>
//                     <FormControlLabel
//                       control={<Switch {...register("autoConvert")} defaultChecked />}
//                       label="Convert my images automatically"
//                     />
//                   </Box>

//                   <Box>
//                     <ToggleButtonGroup
//                       value={selectedFormat}
//                       exclusive
//                       onChange={(_, value) => value && setSelectedFormat(value)}
//                       aria-label="image format"
//                       size="small"
//                       sx={{ flexWrap: "wrap", gap: 1 }}
//                     >
//                       {["AVIF", "JPEG", "PNG", "WEBP", "SELECT ALL"].map((format) => (
//                         <ToggleButton key={format} value={format.toLowerCase()} sx={{ borderRadius: "16px!important" }}>
//                           {format}
//                         </ToggleButton>
//                       ))}
//                     </ToggleButtonGroup>
//                   </Box>
//                 </Stack>
//               </DialogContent>

//               <DialogActions sx={{ p: 3 }}>
//                 <Button onClick={handleClose} color="inherit">
//                   Cancel
//                 </Button>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   color="primary"
//                   disabled={isSubmitting}
//                   startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
//                 >
//                   {isSubmitting ? "Compressing..." : "Compress Images"}
//                 </Button>
//               </DialogActions>
//             </form>
//           </FormProvider>
//         </Box>
//       </StyledDialog>
//     </Box>
//   )
// }

// export default ImageCompress

