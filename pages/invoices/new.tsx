import { getCookie } from "cookies-next";
import { GetServerSideProps } from "next/types";
import AddInvoice from "../../components/invoices/add-invoice";
import { FC } from "react";
import { api } from "../../utils/api";
import Head from "next/head";
import Protected from "../../components/auth/protected";



type clientType = {
   label: string; 
   id: string;
}[];


const NewInvoicePage:FC<{clients: clientType}> = ({clients}) => {
   return (
      <Protected>
         <Head>Add Invoice | Invoice App</Head>
         <AddInvoice clients={clients}/>
      </Protected>
   )
}
export default NewInvoicePage;



export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
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

   let clients: clientType = [];

   try {
      const response = await api.getClients({token});
      const clientData = response?.clients.map(client => ({
         label: client.name,
         id: client.id
      }));

      if(clientData) {
         clients  = clientData;
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
      props: {clients}
   }
}
