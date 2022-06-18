import Protected from "../../components/auth/protected";
import EditClient from "../../components/clients/edit-client";
import { GetServerSideProps } from "next";
import { api } from "../../utils/api";
import { getCookie } from "cookies-next";
import { FC } from "react";
import Head from 'next/head';


type PropTypes = {
   client: {
      id: string;
      email: string;
      name: string;
      companyName: string;
      companyAddress: string;
      vatNumber: string;
      regNumber: string;
      iban: string;
      swift: string;
   }
}
const EditClientPage: FC<PropTypes> = ({client}) => {
   const {id, ...rest} = client;
   return (
      <Protected>
         <Head>
            <title>Single Client | Invoice App</title>
         </Head>
         <EditClient id={id} defaultValue={rest}/>
      </Protected>
   )
}
export default EditClientPage;

export const getServerSideProps:GetServerSideProps = async({params, req, res}) => {
   const id = params?.id as string;
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
      const response = await api.getClient(id, token);
      if(response) {
         const client = {
            id,
            email: response.client.email,
            name: response.client.name,
            companyName: response?.client.companyDetails.name,
            companyAddress: response.client.companyDetails.address,
            vatNumber: response.client.companyDetails.vatNumber,
            regNumber: response.client.companyDetails.regNumber,
            iban: response.client.companyDetails.iban ?? '',
            swift: response.client.companyDetails.swift ?? ''
         }

         return {
            props: {client}
         }
      }
   }catch(e) {
    return {
      notFound: true,
    }
   }

   //just for ignore typescript error
   return {
      props: {}
   }
 }