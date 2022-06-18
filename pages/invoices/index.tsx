import AllInvoices from "../../components/invoices/all-invoices";
import Protected from "../../components/auth/protected";
import Head from "next/head";

const AllInvoicesPage = () => {
   return (
      <Protected>
         <Head>
            <title>Invoice Archive | Invoice App</title>
         </Head>
         <AllInvoices/>
      </Protected>
   );
}

export default AllInvoicesPage;