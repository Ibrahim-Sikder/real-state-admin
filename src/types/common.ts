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

export type TBlog = {
  _id: string;
  title: string;
  thumbnail: [string];
  description: string;
  content: string;
  slug: string;
  tags: string[];
  createdAt: string;
};
export type TService = {
  _id: string;
  title: string;
  slug: string;
  images: string[];
  description: string;
  meta_description: string;
  meta_keywords: string[];
  meta_title: string;
  date: string;
  createdAt: string;
};
export type TAppointment = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  category: string;
  status: string;
  createdAt: string;
};
export type TTeam = {
  _id: string;
  name: string;
  date: string;
  social_link: string;
  images: string[];
  createdAt: string;
  designation:string;
};
export type TReview = {
  _id: string;
  name: string;
  date: string;
  designation: string;
  images: string[];
  description: string;
  createdAt: string;
  title: string;
};
export type TContact = {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  message: string;
  date: string;
  createdAt: string;
};
export type TFaq = {
  _id: string;
  answer: string;
  question: string;
  createdAt: string;
  date: string;
};

export type TImageGallery = {
    _id: string,
    name: string,
    date: string,
    createdAt: string,
    images: string[],
    title:string;

};export type TUser = {
  _id: string,
  name: string,
  email: string,
  role: string[],
  status: boolean,
  createdAt:string,
}
export type TProject = {
  _id: string,
  title: string;
  sub_title: string;
  project_type: string;
  project_address: string;
  land_area: string;
  storied: string;
  apartment_contains: string;
  overview_Location: string[];
  short_description: string;
  overview_description: string;
  concept_Location?: string[];
  concept_description?: string;
  floor_title?: string;
  floor_Location?: string[];
  floor_description?: string;
  map_Location?: string[];
  map_description?: string;
  conceptImage?: string;
  overviewImage?: string;
  videoUrls?: string[];
  locationImg: string,
  createdAt: string,
  floorImage: string,
  category:string;
};