import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { FC, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { InvoiceWithClientDetails } from "../../types";
import { AuthContext } from "../../store/auth-context";
import CompanyDetails from './single-invoice/company-details';
import InvoiceInfo from "./single-invoice/invoice-info";
import ItemTable from "./single-invoice/items-table";


type PropsType = {
	invoiceData: InvoiceWithClientDetails;
};

const SingleInvoice: FC<PropsType> = ({ invoiceData }) => {
   const { user } = useContext(AuthContext);
   const router = useRouter();
   const {invoice, client} = invoiceData;
   const invoiceItems: {description: 'string', price: number}[] = invoice.meta?.items ?? [];
   const taxRate = 0;

   useEffect(() => {
      if(router.isReady) {
         const isPrint = router.query.print === 'true';
         if(isPrint) {
            window.print();
         }
      }
   }, [router.isReady, router.query.print])

	return (
         <Container maxWidth="md" sx={{marginTop: 5, marginBottom: 10, border: '1px solid #ddd'}} disableGutters={true}>
               <Grid container justifyContent="space-around" sx={{backgroundColor: '#fafafa'}} padding={8}>
                  <CompanyDetails
                     title="Company"
                     name={user?.companyDetails?.name as string}
                     address={user?.companyDetails?.address as string}
                     iban={user?.companyDetails?.iban as string}
                     registration={user?.companyDetails?.regNumber as string}
                     vat={user?.companyDetails?.vatNumber as string}
                  />

                  <CompanyDetails
                     title="Bill To"
                     name={client.companyDetails.name}
                     address={client.companyDetails.address}
                     iban={client.companyDetails?.iban as string}
                     registration={client.companyDetails.regNumber}
                     vat={client.companyDetails.vatNumber}
                  />
               </Grid>

               <Grid container justifyContent="center" borderTop="1px solid #ddd" sx={{backgroundColor: '#f3f3f3'}} >
                  <InvoiceInfo
                     title="Invoice Info:"
                     invoiceNumber={invoice.invoice_number}
                     invoiceDate={invoice.date}
                     dueDate={invoice.dueDate}
                     projectCode={invoice.projectCode}
                  />
               </Grid>

               <ItemTable
                  title="Services Details:"
                  items={invoiceItems}
                  taxRate={taxRate}
               />
         </Container>
	);
};

export default SingleInvoice;

