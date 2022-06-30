import { getCookie } from "cookies-next";
import { GetServerSideProps } from "next/types";
import { FC } from "react";
import { api } from "../../../utils/api";
import Protected from "../../../components/auth/protected";
import EditInvoice from "../../../components/invoices/edit-invoice";
import Head from "next/head";

type clientType = {
	label: string;
	id: string;
}[];

export type InvoiceDefaultValue = {
	date: string;
	dueDate: string;
	invoice_number: string;
	projectCode?: string;
	items: { description: string; price: number }[];
	client_id: string;
};

const EditInvoicePage: FC<{
	clients: clientType;
	invoice: InvoiceDefaultValue;
   id: string;
}> = ({ clients, invoice, id }) => {
	return (
      <Protected>
			<Head>
				<title>Edit Invoice | Invoice App</title>
			</Head>
         <EditInvoice clients={clients} invoice={invoice} id={id}/>
      </Protected>
   );
};
export default EditInvoicePage;

export const getServerSideProps: GetServerSideProps = async ({
	req,
	res,
	query,
}) => {
	const cookie = getCookie("auth", { req, res });
	const invoiceId = query.id as string;
	let token = null;

	if (cookie && typeof cookie === "string") {
		const authDate = JSON.parse(cookie);
		token = authDate.token;
	}

	if (!token) {
		return {
			redirect: {
				permanent: false,
				destination: "/login",
			},
		};
	}


	try {
		const invoiceResponse = await api.getInvoice(invoiceId, token);
		const clientResponse = await api.getClientsCompany(token);


		if (invoiceResponse?.invoice && clientResponse) {
			const clients = clientResponse.map((client) => ({
				label: client.companyName,
				id: client.id,
			}));

			let invoice: InvoiceDefaultValue = {
				date: new Date(invoiceResponse.invoice.date).toISOString().split("T")[0],
				dueDate: new Date(invoiceResponse.invoice.dueDate).toISOString().split("T")[0],
				invoice_number: invoiceResponse.invoice.invoice_number,
				items:
					invoiceResponse.invoice?.meta &&
					invoiceResponse.invoice?.meta.items
						? invoiceResponse.invoice?.meta.items
						: [],
				client_id: invoiceResponse.invoice.client_id,
			};

			if(invoiceResponse.invoice.projectCode) {
				invoice.projectCode = invoiceResponse.invoice.projectCode;
			}

			return {
				props: {
					clients, 
					invoice,
					id: invoiceId
				},
			};
		}
	} catch (e) {
		if (e === "Invalid Token") {
			return {
				redirect: {
					permanent: false,
					destination: "/login",
				},
			};
		}

		if (e === "Invoice not found") {
			return {
				notFound: true,
			};
		}
	}

	return {
		props: {}
	};
};
