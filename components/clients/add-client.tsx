import ClientForm from "./client-form";
import { api } from "../../utils/api";
import type { Inputs } from "./client-form";
import { Dispatch, FC, SetStateAction } from "react";
import { UseFormReset } from "react-hook-form";
import { toast } from "material-react-toastify";

const AddClient = () => {
	const submitClient = async (
      data: Inputs, 
      setProcessingSubmit: Dispatch<SetStateAction<boolean>>, 
      setSubmissionError: Dispatch<SetStateAction<string | null>>, 
      rest: UseFormReset<Inputs>
    ) => {   
		try {
			await api.addClient(data);
			setProcessingSubmit(false);
         toast.success(
            <span data-test="success-message">Successfully added new client</span>
         );
         setProcessingSubmit(false);
		} catch (error) {
			setProcessingSubmit(false);
			setSubmissionError(error as string);
		}
	};

   return <ClientForm buttonText="Add Client" submitForm={submitClient}/>
}

export default AddClient;