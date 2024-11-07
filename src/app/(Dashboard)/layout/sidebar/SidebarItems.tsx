import Link from "next/link";
import List from "@mui/material/List";
import { DrawerItem } from "@/types/common";
import { usePathname } from "next/navigation";
import ListItem from "@mui/material/ListItem";
import Accordion from "@mui/material/Accordion";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { styled } from "@mui/material/styles";

type IProps = {
  item: DrawerItem;
  index: number;
};

const ListItemStyled = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== 'nested' && prop !== 'isActive' && prop !== 'level',
})<{ nested?: boolean; isActive: boolean; level: number }>(({ theme, nested, isActive, level }) => ({
  padding: 0,
  ".MuiButtonBase-root": {
    whiteSpace: "nowrap",
    marginBottom: "4px",
    padding: nested ? "6px 16px" : "8px 18px",
    borderRadius: "6px",
    color: isActive ? 'white' : '#fff',
    transition: "all 0.3s",
    borderLeft: isActive
      ? `8px solid #E3C80D`
      : "3px solid transparent",
  },
}));

const SideBarItems = ({ index, item }: IProps) => {
  const linkPath = `${item.path}`;
  const pathName = usePathname();
  const isActive = pathName === linkPath;

  return item.child ? (
    <Accordion
      key={index}
      sx={{
        boxShadow: 'none',
        backgroundColor: 'transparent',
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}
        aria-controls={`panel${index}-content`}
        id={`panel${index}-header`}
        sx={{
          backgroundColor: 'transparent',
          color: 'white',  // Set color to white
        }}
      >
        <ListItemIcon sx={{ minWidth: "28px", color: 'white' }}> {/* Icon color set to white */}
          {item.icon && <item.icon />}
        </ListItemIcon>
        <ListItemText primary={item.title} sx={{ ml: 4, color: 'white' }} /> {/* Text color set to white */}
      </AccordionSummary>
      <AccordionDetails sx={{ p: 0, m: 0, backgroundColor: 'transparent' }}>
        <List component="div">
          {item.child.map((subItem, subIndex) => {
            const subLinkPath = `/dashboard/${subItem.path}`;
            const isSubActive = pathName === subLinkPath;

            return (
              <Link href={subLinkPath} key={subIndex} passHref style={{ textDecoration: "none" }}>
                <ListItemStyled
                  nested
                  isActive={isSubActive}
                  level={1}
                >
                  <ListItemButton>
                    {subItem.icon && (
                      <ListItemIcon
                        sx={{
                          minWidth: "28px",
                          color: 'white',  // Set icon color to white
                        }}
                      >
                        <subItem.icon size={18} />
                      </ListItemIcon>
                    )}
                    <ListItemText
                      primary={subItem.title}
                      primaryTypographyProps={{
                        fontSize: "14px",
                        fontWeight: isSubActive ? "bold" : "medium",
                        color: 'white',  // Set text color to white
                      }}
                    />
                  </ListItemButton>
                </ListItemStyled>
              </Link>
            );
          })}
        </List>
      </AccordionDetails>
    </Accordion>
  ) : (
    <Link href={linkPath} key={index} passHref style={{ textDecoration: "none" }}>
      <ListItemStyled
        isActive={isActive}
        level={0}
      >
        <ListItemButton>
          <ListItemIcon sx={{ m: 0, color: 'white' }}> {/* Main icon color set to white */}
            {item.icon && <item.icon />}
          </ListItemIcon>
          <ListItemText
            primary={item.title}
            primaryTypographyProps={{
              fontSize: "14px",
              fontWeight: isActive ? "bold" : "medium",
              color: 'white',  // Set text color to white
            }}
          />
        </ListItemButton>
      </ListItemStyled>
    </Link>
  );
};

export default SideBarItems;
