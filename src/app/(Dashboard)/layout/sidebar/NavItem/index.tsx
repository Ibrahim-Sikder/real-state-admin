import React from "react";
import {
  ListItemButton,
  ListItemText,
  ListItemIcon,
  ListItem,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import styled from "@emotion/styled";

interface NavItemProps {
  item: {
    id: string;
    title: string;
    href: string;
    icon?: React.ElementType;
  };
  pathDirect: string;
  onClick?: () => void;
  nested?: boolean;
  level?: number;
}

const NavItem = ({
  item,
  pathDirect,
  onClick,
  nested = false,
  level = 1,
}: NavItemProps) => {
  const isActive = pathDirect === item.href || pathDirect.includes(item.href);

  const theme = useTheme();

  const ListItemStyled = styled(ListItem)(() => ({
    padding: 0,
    ".MuiButtonBase-root": {
      whiteSpace: "nowrap",
      marginBottom: "4px",
      padding: nested ? "6px 16px" : "8px 18px",
      borderRadius: "6px",
      color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
      paddingLeft: `${level * 16}px`,
      transition: "color 0.3s",
      "&:hover": {
        backgroundColor: theme.palette.action.hover,
      },
      borderLeft: isActive
        ? `3px solid ${theme.palette.primary.main}`
        : "3px solid transparent",
    },
  }));

  return (
    <Link href={item.href} passHref>
      <ListItemStyled>
        <ListItemButton selected={isActive} onClick={onClick}>
          {item.icon && (
            <ListItemIcon
              sx={{
                minWidth: "28px",
                color: isActive
                  ? theme.palette.primary.main
                  : theme.palette.text.secondary,
              }}
            >
              <item.icon size={18} />
            </ListItemIcon>
          )}
          <ListItemText
            primary={item.title}
            primaryTypographyProps={{
              fontSize: "14px",
              fontWeight: isActive ? "bold" : "medium",
              color: isActive ? theme.palette.primary.main : "inherit",
            }}
          />
        </ListItemButton>
      </ListItemStyled>
    </Link>
  );
};

export default NavItem;
