import Protected from "../../components/auth/protected";
import AddClient from "../../components/clients/add-client";
import Head from 'next/head';

const NewClientPage = () => {
   return (
      <Protected>
         <Head>
            <title>New Clients | Invoice App</title>
         </Head>
         <AddClient/>
      </Protected>
   )
}
export default NewClientPage;