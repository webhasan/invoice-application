import CompanyDetailsForm from '../components/company-details-form';
import Protected from "../components/auth/protected";
import Head from 'next/head';


const CompanyDetailsPage = () => {
   return (
      <>
         <Head>
            <title>Company Details | Invoice App</title>
         </Head>
         <Protected>
            <CompanyDetailsForm/>
         </Protected>
      </>
   )
   

}

export default CompanyDetailsPage;