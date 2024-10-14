import { USER_ROLE } from "@/constant/role";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export type userRole = keyof typeof USER_ROLE;



// export type userRole = "SUPER_ADMIN" | "ADMIN";

export interface DrawerItem {
  title: string;
  path: string;
  icon?: React.ElementType;
  child?: DrawerItem[];
}
export type IMeta = {
  page: number;
  limit: number;
  total: number;
};

export type ResponseSuccessType = {
  [x: string]: any;
  data: any;
  meta?: IMeta;
};



export interface IGenericErrorResponse {
  statusCode: number;
  message: string;
  errorMessages?: string | string[];
}

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};
