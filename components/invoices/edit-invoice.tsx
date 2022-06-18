import InvoiceForm from "./invoice-form";
import { api, InvoiceSubmissionType } from "../../utils/api";
import { toast } from "material-react-toastify";
import { FC } from "react";
import type { Dispatch, SetStateAction } from "react";
import {Inputs} from './invoice-form'

type propsType = {
	clients: { label: string; id: string }[];
	invoice: Inputs;
	id: string;
};

const EditInvoice: FC<propsType> = ({ clients, invoice, id }) => {
	const addInvoice = async (
		data: Inputs,
		setSubmissionError: Dispatch<SetStateAction<string | null>>,
		setProcessingSubmit: Dispatch<SetStateAction<boolean>>
	) => {
		const totalPrice = data.items.reduce((total, current) => total + current.price, 0);

		const invoiceData: InvoiceSubmissionType = {
			invoice_number: data.invoice_number,
			client_id: data.client_id,
			date: Date.parse(data.date),
			dueDate: Date.parse(data.dueDate),
			value: totalPrice,
			meta: {
				items: data.items,
			},
		};

		if (data.projectCode) {
			invoiceData["projectCode"] = data.projectCode;
		}

		try {
			setSubmissionError(null);
			setProcessingSubmit(true);
			await api.editInvoice(id, invoiceData);
			setSubmissionError(null);
			setProcessingSubmit(false);
			toast.success(
				<span data-test="form-success">
					Successfully updated the invoice
				</span>
			);
		} catch (error) {
			setProcessingSubmit(false);
			setSubmissionError(error as string);
		}
	};

	return (
		<InvoiceForm
			submitForm={addInvoice}
			submitButtonText="Add Invoice"
			clients={clients}
			defaultValues={invoice}
		/>
	);
};

export default EditInvoice;
