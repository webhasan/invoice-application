import Box from "@mui/material/Box";
import Head from "next/head";

const NotFoundPage = () => {
   return (
      <>
         <Head>
            <title>Not Found | Invoice App</title>
         </Head>
         <Box className="text-center" mt={30} data-test='not-found-message'>
            <h1>404 Error!</h1>
            <p>Not found what you are looking for</p>
         </Box>      
      </>

   )
}

export default NotFoundPage;