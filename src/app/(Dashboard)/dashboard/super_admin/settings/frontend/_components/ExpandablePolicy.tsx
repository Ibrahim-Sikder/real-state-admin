import type React from "react"
import { useState } from "react"
import { Card, CardHeader, CardContent, Typography, Button, Box } from "@mui/material"

interface ExpandablePolicyProps {
  title: string
  content: string
}

const ExpandablePolicy: React.FC<ExpandablePolicyProps> = ({ title, content }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  // Always show full content if less than 300 characters
  const shouldTruncate = content.length > 300 && !isExpanded

  const displayContent = shouldTruncate ? `${content.slice(0, 300)}...` : content

  return (
    <Card sx={{ mb: 4 }}>
      <CardHeader
        title={<Typography variant="h6">{title}</Typography>}
        subheader={
          <Typography variant="body2" color="text.secondary">
            {content.length} characters {shouldTruncate ? "truncated" : "displayed"}
          </Typography>
        }
      />
      <CardContent>
        <Box
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: displayContent }}
          sx={{
            "& > *:first-of-type": { mt: 0 },
            "& > *:last-child": { mb: 0 },
          }}
        />
        {content.length > 300 && (
          <Button sx={{ mt: 2, p: 0 }} onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? "Show Less" : "Read More"}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export default ExpandablePolicy

