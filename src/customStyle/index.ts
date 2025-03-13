export const tableStyle = {
  minWidth: 650,
  "& .MuiTableCell-root": { borderRight: "1px solid rgba(224, 224, 224, 1)" },

};

export const chipStyle = {
  backgroundColor: "#e8f0fe",
  color: "#1a73e8",
  "&:hover": {
    backgroundColor: "#d4e4fd",
  },
};

export const tableHeadStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  py: 2,
  px: 3,
  backgroundColor: "white",
  borderBottom: "1px solid #e0e0e0",
};

export const addIconStyle = {
  textTransform: "none",
  backgroundColor: "#216740",
  "&:hover": {
    backgroundColor: "#216740",
  },
};

export const cellStyle = { "&:last-child": { borderRight: "none" } };
export const chipWrapStyle = { display: "flex", flexWrap: "wrap", gap: 0.5 };
export const paginateStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};
export const btnStyle = {
  textTransform: "none",
  color: "text.primary",
  borderColor: "divider",
};

export const iconButtonStyle = {
  width: "30px",
  height: "30px",
  borderRadius: "100%",
  padding: "0px",
  color: "white",
  background: "red",
  marginLeft: "2px",
  marginRight: "2px",
  "&:hover": {
    background: "black",
    color: "white",
  },
};
export const iconStyle = { fontSize: "20px" };
