'use client';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { SxProps } from '@mui/material';
import React from 'react';

type TModalProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    children: React.ReactNode;
    width?: string | number;  // New prop for width
    sx?: SxProps;
};

export default function BNPRightSideModal({
    open = false,
    setOpen,
    title = '',
    children,
    width = '900px',  // Default width set to 900px
    sx,
}: TModalProps) {
    const toggleDrawer = (open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent
    ) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        setOpen(open);
    };

    return (
        <React.Fragment>
            <Drawer
                anchor="left"
                open={open}
                onClose={toggleDrawer(false)}
                sx={{
                    ...sx,
                    '& .MuiDrawer-paper': {
                        width: width, 
                    },
                }}
                ModalProps={{
                    keepMounted: true,
                }}
                transitionDuration={{
                    enter: 400,
                    exit: 300,
                }}
            >
                <IconButton
                    onClick={() => setOpen(false)}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                {title && (
                    <h2 style={{ fontWeight: 'bold', textAlign: 'center' }}>
                        {title}
                    </h2>
                )}

                <div
                    style={{ }}
                >
                    {children}
                </div>
            </Drawer>
        </React.Fragment>
    );
}
