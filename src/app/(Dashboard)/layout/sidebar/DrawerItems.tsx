import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import SideBarItems from './SidebarItems';
import Link from 'next/link';
import { Sidebar } from "react-mui-sidebar";
import drawerItems from './MenuItems';

const DrawerItems = () => {
    const sidebarWidth = "270px";
    const [openAccordion, setOpenAccordion] = useState<number | null>(null);
    const handleAccordionChange = (index: any) => {
        setOpenAccordion(openAccordion === index ? null : index);
    };
    return (
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
    );
};

export default DrawerItems;