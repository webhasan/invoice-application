import { Dispatch, SetStateAction, useState } from "react";
import { useForm, SubmitHandler, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, number, date, array, ref } from "yup";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
import Autocomplete from '@mui/material/Autocomplete';
import Grid from "@mui/material/Grid";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FormHelperText from "@mui/material/FormHelperText";
import { ucFirst } from "../../utils/functions";

export type Inputs = {
	date: string;
	dueDate: string;
	invoice_number: string;
	projectCode?: string;
	items: {description: string, price: number}[],
   client_id: string;
};

const schema = object({
	date: date().required("Create date is required").typeError("Need valid date"),

   dueDate: date().required("Create date is required").min(ref('date'), 'Due date must not be smaller then create date.').typeError("Need valid date"),

   invoice_number: string().required('Invoice number is required').min(3, 'Invoice number must be at least 3 characters'),

   projectCode: string(),

   client_id: string().required('Client is required'),

   items: array(
      object({
         description: string().required('Project description is required').min(3, 'Invoice number must be at least 3 characters'),
         price: number().required('Price is required').positive('Price must be positive number.').integer().typeError("Invalid number"),
      })
   ).min(1, 'Need at least one item.')
}).required();

type PropsType = {
   submitForm: (
		data: Inputs,
		setSubmissionError: Dispatch<SetStateAction<string | null>>,
		setProcessingSubmit: Dispatch<SetStateAction<boolean>>,
      reset: () => void
   ) => void;
   clients: {label: string, id: string}[];
	defaultValues?: Inputs;
	defaultClient?: string;
   submitButtonText: string;
}

const InvoiceForm: React.FC<PropsType> = ({clients, submitForm, submitButtonText, defaultValues, defaultClient}) => {
	const [processingSubmit, setProcessingSubmit] = useState(false);
	const [submissionError, setSubmissionError] = useState<string | null>(null);
	
	const {
      control,
		register,
		handleSubmit,
		clearErrors,
      reset,
		watch,
		formState: { errors }
	} = useForm<Inputs>({
		resolver: yupResolver(schema),
		defaultValues: defaultValues ?? {client_id: defaultClient ?? undefined}
	});

	const { fields, append, remove } = useFieldArray({ name: 'items', control });

	const onSubmit: SubmitHandler<Inputs> = async (data) => {

		if (processingSubmit) {
			return false;
		}
      submitForm(data, setSubmissionError, setProcessingSubmit, resetForm);
	};

	const resetForm = () => {
		reset();
	}

	return (
		<Container component="main" maxWidth="sm">
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Typography component="h1" variant="h5">
					Invoice Information
				</Typography>

				{submissionError && (
					<Alert
						data-test="form-error"
						severity="error"
						sx={{ width: "100%" }}
					>
						{ucFirst(submissionError)}
					</Alert>
				)}

				<Box component="form" onSubmit={handleSubmit(onSubmit)}>
					<TextField
						margin="normal"
						fullWidth
						id="date"
                  type="date"	
						label="Invoice Date*"
						InputLabelProps={{
							shrink: true,
						}}
						inputProps={{ "data-test": "invoice-date" }}
						error={!!errors.date}
						helperText={
							errors.date && (
								<span data-test="invoice-date-error">
									{errors.date?.message}
								</span>
							)
						}
						{...register("date")}
					/>

					<TextField
						margin="normal"
						fullWidth
						id="dueDate"
                  type="date"
						label="Due Date*"
						InputLabelProps={{
							shrink: true,
						}}
						inputProps={{ "data-test": "invoice-due-date" }}
						error={!!errors.dueDate}
						helperText={
							errors.dueDate && (
								<span data-test="invoice-dueDate-error">
									{errors.dueDate?.message}
								</span>
							)
						}
						{...register("dueDate")}
					/>

					<TextField
						margin="normal"
						fullWidth
						label="Invoice Number*"
						id="invoice_number"
						inputProps={{ "data-test": "invoice-number" }}
						error={!!errors.invoice_number}
						helperText={
							errors.invoice_number && (
								<span data-test="invoice-invoice_number-error">
									{errors.invoice_number?.message}
								</span>
							)
						}
						{...register("invoice_number")}
					/>

					<TextField
						margin="normal"
						fullWidth
						label="Project Code"
                  multiline
						id="projectCode"
						inputProps={{ "data-test": "invoice-project-code" }}
						error={!!errors.projectCode}
						helperText={
							errors.projectCode && (
								<span data-test="invoice-projectCode-error">
									{errors.projectCode?.message}
								</span>
							)
						}
						{...register("projectCode")}
					/>

					<Controller
						control={control}
						name="client_id"
						defaultValue=""
						render={({field: {onChange: seClientId, value }}) => (
							<Autocomplete
								fullWidth
								disablePortal
								value={clients.find(client => client.id === value) || null}
								options={clients}
								onChange={(option, value) => {
									seClientId(value?.id);
								}}
								renderOption={(props, option) => (
									<li {...props} key={option.id}>
										{option.label}
									</li>
								)}
								renderInput={(params) => {
									const inputProps = {...params.inputProps, 'data-test': 'invoice-company-id'}
									return <TextField  
										label="Company* " 
										error={!!errors.client_id}
										margin="normal"
										helperText= {
											errors.client_id && (
												<span data-test="invoice-client_id-error">
													{errors.client_id?.message}
												</span>
											)
										}
										{...{...params, inputProps} }
									/>
								}}
							/>
						)}
					/>


					
               {fields.map((field, index) => {
                  return (
                     <Grid container key={field.id} alignItems="center" spacing={1} data-test={`invoice-item-${index + 1}`}>
                        <Grid item xs={1}>
                        <IconButton aria-label="delete" onClick={() => remove(index)}>
                           <DeleteIcon color="error"/>
                        </IconButton>
                        </Grid>
                        <Grid item xs={8}>
                           <TextField
                              margin="normal"
                              fullWidth
										multiline
                              label="Description*"
										id={`description-${field.id}`}
                              inputProps={{ "data-test": "invoice-item-description" }}
                              error={!!errors.items?.[index]?.description}
                              helperText={
                                 errors.items?.[index]?.description && (
                                    <span data-test={`invoice-items.${index}.description-error`}>
                                       {errors.items?.[index]?.description?.message}
                                    </span>
                                 )
                              }
                              {...register(`items.${index}.description`)}
                           />
                        </Grid>
                        <Grid item xs={3}>
                           <TextField
                              margin="normal"
                              fullWidth
                              label="Pice*"
                              id={`price-${field.id}`}
                              type="number"
                              inputProps={{ "data-test": "invoice-item-value" }}
                              error={!!errors.items?.[index]?.price}
                              helperText={
                                 errors.items?.[index]?.price && (
                                    <span data-test={`invoice-items.${index}.price-error`}>
                                       {errors.items?.[index]?.price?.message}
                                    </span>
                                 )
                              }
                              {...register(`items.${index}.price`)}
                           />
                        </Grid>
                     </Grid>
                  )
               })}
					
               <Button onClick={() => {append({description: '', price: 0}); clearErrors('items') }}>Add Item + </Button>
					{errors.items &&  <FormHelperText error>{(errors.items as unknown as {message: string}).message}</FormHelperText>}

					<LoadingButton
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
						data-test="submit-login"
						loading={!!processingSubmit}
					>
						{submitButtonText}
					</LoadingButton>
				</Box>
			</Box>
		</Container>
	);
};
export default InvoiceForm;
