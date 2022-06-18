import Protected from "../../components/auth/protected";
import ClientsArchive from "../../components/clients/all-clients";
import Head from 'next/head';

const AllClientsPage = () => {
   return (
      <Protected>
         <Head>
            <title>Clients Archive | Invoice App</title>
         </Head>
         <ClientsArchive/>
      </Protected>
   )
}
export default AllClientsPage;