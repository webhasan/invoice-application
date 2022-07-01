import { getCookie } from "cookies-next";
import Head from "next/head";
import { GetServerSideProps } from "next/types";
import { FC } from "react";
import Protected from "../../../components/auth/protected";
import AddInvoice from "../../../components/invoices/add-invoice";
import { api } from "../../../utils/api";


type PropType = {
	clients: {label: string, id: string}[]
	defaultClient?: string;
}

const NewInvoicePage:FC<PropType> = ({clients, defaultClient}) => {
   console.log(defaultClient);

   return (
      <Protected>
         <Head>Add Invoice | Invoice App</Head>
         <AddInvoice clients={clients} defaultClient={defaultClient}/>
      </Protected>
   )
}
export default NewInvoicePage;



export const getServerSideProps: GetServerSideProps = async ({req, res, query}) => {
   const defaultClient = query.id;
   const cookie = getCookie('auth', {req, res});
   let token = null;

   if(cookie && typeof cookie === 'string') {
      const authDate = JSON.parse(cookie);
      token  = authDate.token;
   }

   if(!token) {
      return {
         redirect: {
           permanent: false,
           destination: "/login",
         }
       };
   }

   try {
      const clientResponse = await api.getClientsCompany(token);

      const clients = clientResponse?.map(client => ({
         label: client.companyName,
         id: client.id
      }));

      if(clients) {
         // not found client
         const defaultClientInfo = clients.find(client => client.id === defaultClient);
         if(!defaultClientInfo) {
            return {
               notFound: true
            }
         }

         return {
            props: {
               clients,
               defaultClient
            }
         }
      }
   }catch(e) {
      if(e === 'Invalid Token') {
         return {
            redirect: {
               permanent: false,
               destination: "/login",
             }
         }
      }
   }

   return {
      props: {}
   }
}
