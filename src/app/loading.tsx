import { Box } from "@mui/material";
import Image from "next/image";
import url from "../../src/assets/loader.gif";

const Loader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', 
        width: '100%', 
        backgroundColor: 'white', 
      }}
    >
      <Image
        src={url}
        height={50}
        width={50}
        alt="A cute animal!"
        unoptimized={true}
      />
    </Box>
  );
};

export default Loader;
