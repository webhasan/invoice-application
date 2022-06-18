import { getCookie } from "cookies-next";
import { GetServerSideProps } from "next/types";
import { FC } from "react";
import Protected from "../../../components/auth/protected";
import SingleInvoice from "../../../components/invoices/single-invoice";
import { api } from "../../../utils/api";

import type { InvoiceWithClientDetails } from "../../../types";
import Head from "next/head";

type PropsType = {
	invoiceData: InvoiceWithClientDetails;
};

const SingleInvoicePage: FC<PropsType> = ({ invoiceData }) => {
	return (
		<Protected>
			<Head>
				<title>View Invoice | Invoice App</title>
			</Head>
         <SingleInvoice
            invoiceData={invoiceData}
         />
		</Protected>
	);
};

export default SingleInvoicePage;


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
      const clientId = invoiceResponse?.invoice.client_id as string;
      const clientResponse = await api.getClient(clientId, token);

      if(invoiceResponse?.invoice && clientResponse?.client) {
         return {
            props: {
               invoiceData: {
                  invoice: invoiceResponse.invoice,
                  client: clientResponse.client
               }
            }
         }
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
		props: {},
	};
};
