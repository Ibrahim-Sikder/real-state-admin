import React, { useState } from "react";
import { useMediaQuery, Box, Drawer, Typography } from "@mui/material";
import { Sidebar, Logo } from "react-mui-sidebar";
import SideBarItems from "./SidebarItems";
import drawerItems from "./MenuItems";
import Link from "next/link";

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
            <Sidebar
              width={sidebarWidth}
              collapsewidth="80px"
              isCollapse={false}
              mode="light"
              direction="ltr"
              themeColor="#5d87ff"
              themeSecondaryColor="#fff"
              showProfile={false}
            >
              <Link href='/dashboard' style={{ textDecoration: 'none' }}>
                <Typography
                  textAlign="center"
                  fontWeight="bold"
                  variant="h5"
                  marginTop="10px"
                  color='white'


                >
                  Anaa Developer
                </Typography>
              </Link>
              <Box sx={{ mt: 2 }}>
                {drawerItems('super_admin').map((item, index) => (
                  <SideBarItems openAccordion={openAccordion}
                    onAccordionChange={handleAccordionChange} key={index} item={item} index={index} />
                ))}
              </Box>
            </Sidebar>
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
          backgroundColor: "#ffffff",
          padding: "10px",
          borderRight: "1px solid #ddd",
          ...scrollbarStyles,
        },
      }}
    >
      <Box px={2}>
        <Sidebar
          width={sidebarWidth}
          collapsewidth="80px"
          isCollapse={false}
          mode="light"
          direction="ltr"
          themeColor="#5d87ff"
          themeSecondaryColor="#49beff"
          showProfile={false}
        >
          <Logo img="/images/logos/dark-logo.svg" />
          {drawerItems('super_admin').map((item, index) => (
            <SideBarItems openAccordion={openAccordion} onAccordionChange={handleAccordionChange} key={index} item={item} index={index} />
          ))}
        </Sidebar>
      </Box>
    </Drawer>
  );
};

export default MSidebar;
