export async function mockCompressImage(file: File): Promise<{
    id: string
    name: string
    originalSize: number
    compressedSize: number
    format: string
    url: string
    thumbnail: string
  }> {
    // Simulate compression delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
  
    // Create object URL for preview
    const url = URL.createObjectURL(file)
  
    return {
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      originalSize: file.size,
      compressedSize: Math.floor(file.size * 0.3),
      format: file.type.split("/")[1].toUpperCase(),
      url,
      thumbnail: url,
    }
  }
  
  