import ClientForm from "./client-form";
import { api } from "../../utils/api";
import type { Inputs } from "./client-form";
import { Dispatch, FC, SetStateAction } from "react";
import { UseFormReset } from "react-hook-form";
import { toast } from "material-react-toastify";

type PropsType = {
   id: string; 
   defaultValue: Inputs
}
const EditClient:FC<PropsType> = ({id, defaultValue}) => {
	const submitClient = async (
      data: Inputs, 
      setProcessingSubmit: Dispatch<SetStateAction<boolean>>, 
      setSubmissionError: Dispatch<SetStateAction<string | null>>, 
      rest: UseFormReset<Inputs>
    ) => {   
		try {
			await api.editClient({id, ...data});
			setProcessingSubmit(false);
         toast.success(
            <span data-test="form-success">Successfully updated client info.</span>
         );
         setProcessingSubmit(false);
		} catch (error) {
			setProcessingSubmit(false);
			setSubmissionError(error as string);
		}
	};

   return (
      <ClientForm 
      buttonText="Update Client" 
      submitForm={submitClient} 
      defaultValue={defaultValue}
   />
   )
}

export default EditClient;