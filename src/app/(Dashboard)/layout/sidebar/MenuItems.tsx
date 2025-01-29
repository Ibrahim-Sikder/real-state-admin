

import { USER_ROLE } from "@/constant/role";
import { DrawerItem, userRole } from "@/types/common";
import { AccountBalance, AccountTreeTwoTone, AdsClick, BookOnline, Collections, ContactMail, Diversity1, Diversity2, LiveHelp, Reviews, Roofing, } from "@mui/icons-material";
import {
  IconAperture,
  IconUsersGroup,
  IconHistory,
  IconHandStop,
  IconPhotoPause,

} from "@tabler/icons-react";


const drawerItems = (role: userRole): DrawerItem[] => {
  const roleMenus: DrawerItem[] = [];

  switch (role) {
    case USER_ROLE.super_admin:
      roleMenus.push(
        {
          title: "Project",
          path: `/dashboard/${role}/project`,
          icon: AccountTreeTwoTone,
          
        },
        {
          title: "Services",
          path: `/dashboard/${role}/service`,
          icon: Roofing,
        },
        {
          title: "Appointment",
          path: `/dashboard/${role}/appointment`,
          icon: BookOnline,
        },

        {
          title: "About",
          path: `/dashboard/${role}/about`,
          icon: AccountBalance,
        },
        {
          title: "Blog",
          path: `/dashboard/${role}/blog`,
          icon: AccountBalance,
        },
        {
          title: "Reivew",
          path: `/dashboard/${role}/review`,
          icon: Reviews,
        },
        {
          title: "Affiliation",
          path: `/dashboard/${role}/affiliation`,
          icon: AdsClick,
        },
        {
          title: "Contact ",
          path: `/dashboard/${role}/contact`,
          icon: ContactMail,
        },
        {
          title: "FAQ",
          path: `/dashboard/${role}/faq`,
          icon: LiveHelp,
        },
        {
          title: "Photo Gallery",
          path: `/dashboard/${role}/image-gallery`,
          icon: Collections,
        },
        {
          title: " Stock Photo",
          path: `${role}/gallery`,
          icon: IconPhotoPause,
          child: [
            {
              title: "All Photos",
              path: `${role}/gallery/photos`,
            },
            {
              title: "All Folders",
              path: `${role}/gallery/folders`,
            },
          ],
        },
        {
          title: "Users Management",
          path: `/dashboard/${role}/users`,
          icon: IconUsersGroup,
        },
      );
      break;

    case USER_ROLE.admin:
      roleMenus.push(

        {
          title: "Oppressed",
          path: `${role}/oppressed`,
          icon: IconHandStop,

        },
      );
      break;

    default:
      break;
  }

  return roleMenus;
};

export default drawerItems;
