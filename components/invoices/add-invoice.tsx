import InvoiceForm from "./invoice-form";
import { api, InvoiceSubmissionType } from "../../utils/api";
import { toast } from "material-react-toastify";
import { FC } from "react";
import type { Inputs } from "./invoice-form";
import type { Dispatch, SetStateAction } from "react";

type PropType = {
	clients: {label: string, id: string}[]
	defaultClient?: string;
}

const AddInvoice:FC<PropType> = ({clients, defaultClient}) => {

	const addInvoice = async (
		data: Inputs,
		setSubmissionError: Dispatch<SetStateAction<string | null>>,
		setProcessingSubmit: Dispatch<SetStateAction<boolean>>,
      reset: () => void
	) => {

	  	const totalPrice = data.items.reduce((total, current) => total + current.price, 0)

		const invoiceData: InvoiceSubmissionType = {
			invoice_number: data.invoice_number, 
			client_id: data.client_id,
			date:  Date.parse(data.date),
			dueDate: Date.parse(data.dueDate),
			value: totalPrice,
			meta: {
				items: data.items
			}
		}
		
		if(data.projectCode) {
			invoiceData['projectCode'] = data.projectCode;
		}

		try {
			setSubmissionError(null);
			setProcessingSubmit(true);
			await api.addInvoice(invoiceData)

			reset();
			setSubmissionError(null);
			setProcessingSubmit(false);
			toast.success(
				<span data-test="form-success">
					Successfully created new invoice
				</span>
			);
		} catch (error) {
			setProcessingSubmit(false);
			setSubmissionError(error as string);
		}
	};

	return <InvoiceForm 
		submitForm={addInvoice} 
		submitButtonText="Add Invoice" 
		clients={clients}
		defaultClient={defaultClient}
	/>;
};

export default AddInvoice;