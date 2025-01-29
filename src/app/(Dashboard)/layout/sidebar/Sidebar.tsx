import React, { useState } from "react";
import { useMediaQuery, Box, Drawer } from "@mui/material";
import DrawerItems from "./DrawerItems";
interface MSidebarProps {
  isMobileSidebarOpen: boolean;
  onSidebarClose: () => void;
  isSidebarOpen: boolean;
}
const MSidebar = ({
  isMobileSidebarOpen,
  onSidebarClose,
  isSidebarOpen,
}: MSidebarProps) => {
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const sidebarWidth = "270px";
  const scrollbarStyles = {
    "&::-webkit-scrollbar": {
      width: "7px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#eff2f7",
      borderRadius: "15px",
    },
  };

  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const handleAccordionChange = (index: any) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };


  if (lgUp) {
    return (
      <Box sx={{ width: sidebarWidth, flexShrink: 0 }}>
        <Drawer
          anchor="left"
          open={isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              boxShadow: (theme) => theme.shadows[8],
              backgroundColor: "#216740",
              padding: "10px",
              color: '#fff',
              borderRight: "1px solid #ddd",
              ...scrollbarStyles,
            },
          }}
        >
          <Box sx={{ height: "100%" }}>
            <DrawerItems />
          </Box>
        </Drawer>
      </Box>
    );
  }

  return (
    <Drawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: {
          boxShadow: (theme) => theme.shadows[8],
          backgroundColor: "#216740",
          padding: "10px",
          color: '#fff',
          borderRight: "1px solid #ddd",
          ...scrollbarStyles,
        },
      }}
    >
      <Box px={2}>
        <DrawerItems />
      </Box>
    </Drawer>
  );
};

export default MSidebar;
