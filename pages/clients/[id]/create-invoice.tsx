import { getCookie } from "cookies-next";
import Head from "next/head";
import { GetServerSideProps } from "next/types";
import { FC } from "react";
import Protected from "../../../components/auth/protected";
import AddInvoice from "../../../components/invoices/add-invoice";
import { api } from "../../../utils/api";


type PropType = {
	clients: {label: string, id: string}[]
	defaultClient?: {label: string, id: string}
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
   const clientId = query.id;
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
      const response = await api.getClients({token});

      const clientData = response?.clients.map(client => ({
         label: client.name,
         id: client.id
      }));

      if(clientData) {
         const defaultClient = clientData.find(client => client.id === clientId);
         if(!defaultClient) {
            return {
               notFound: true
            }
         }
         return {
            props: {
               clients: clientData,
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
