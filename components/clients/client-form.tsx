import { Dispatch, SetStateAction, useState } from "react";
import { useForm, SubmitHandler, UseFormReset } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { ucFirst } from "../../utils/functions";
import Grid from "@mui/material/Grid";
import TextInput from "../form/text-input";
import SubmitButton from "../form/submit-button";

export type Inputs = {
	email: string;
	name: string;
	companyName: string;
	companyAddress: string;
	vatNumber: string;
	regNumber: string;
   iban: string;
	swift: string;
};

type PropTypes = {
	buttonText: string;
	submitForm: (
		data: Inputs,
		setProcessingSubmit: Dispatch<SetStateAction<boolean>>,
		setSubmissionError: Dispatch<SetStateAction<string | null>>,
		rest: UseFormReset<Inputs>
	) => void;
   id?: string | null;
	defaultValue?: Inputs | {};
};

const schema = object({
	email: string().required("Email is required").email(),

	name: string()
		.required("Client name is required")
		.min(3, "Client name must be at least 3 characters"),

	companyName: string().required("Company name is required"),

	companyAddress: string().required("Company address is required"),

	vatNumber: string().required("VAT number is required"),

	regNumber: string().required("Registration number is required"),

	iban: string().required("IBAN number is required"),

	swift: string().required("SWIFT number is required"),
}).required();

const ClientForm: React.FC<PropTypes> = ({
	buttonText,
	submitForm,
	defaultValue = {},
}) => {
	const [processingSubmit, setProcessingSubmit] = useState(false);
	const [submissionError, setSubmissionError] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
      reset,
		formState: { errors },
	} = useForm<Inputs>({
		defaultValues: defaultValue,
		resolver: yupResolver(schema),
	});

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		if (processingSubmit) {
			return false;
		}
		setSubmissionError(null);
		setProcessingSubmit(true);
		submitForm(data, setProcessingSubmit, setSubmissionError, reset)
	};

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
					Client Information
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
					<Grid container spacing={2}>
						<Grid item lg={6}>
							<TextInput 
								id="email"
								type="email"
								label="Client Email*"
								dataTest="client-email"
								dataErrorTest="client-email-error"
								error={errors.email}
								{...register("email")}
							/>

							<TextInput 
								id="name"
								label="Client Name*"
								dataTest="client-name"
								dataErrorTest="client-name-error"
								error={errors.name}
								{...register("name")}
							/>

							<TextInput 
								id="companyName"
								label="Company Name*"
								dataTest="client-company-name"
								dataErrorTest="client-company-name-error"
								error={errors.companyName}
								{...register("companyName")}
							/>

							<TextInput 
								id="companyAddress"
								label="Company Address*"
								dataTest="client-company-address"
								dataErrorTest="client-company-address-error"
								error={errors.companyAddress}
								{...register("companyAddress")}
							/>
						</Grid>

						<Grid item lg={6}>
							<TextInput 
								id="vatNumber"
								label="VAT Number*"
								dataTest="client-company-vat"
								dataErrorTest="client-company-vat-error"
								error={errors.vatNumber}
								{...register("vatNumber")}
							/>

							<TextInput 
								label="Reg Number*"
								id="regNumber"
								dataTest="client-company-reg"
								dataErrorTest="client-company-reg-error"
								error={errors.regNumber}
								{...register("regNumber")}
							/>

							<TextInput 
								label="IBAN Number*"
								id="iban"
								dataTest="client-company-iban"
								dataErrorTest="client-company-iban-error"
								error={errors.iban}
								{...register("iban")}
							/>

							<TextInput 
								label="SWIFT Number*"
								id="swift"
								dataTest="client-company-swift"
								dataErrorTest="client-company-swift-error"
								error={errors.swift}
								{...register("swift")}
							/>
						</Grid>
					</Grid>

					<SubmitButton 
						title = {buttonText}
						loading={!!processingSubmit}
						dataTest="submit-client"
					/>
					
				</Box>
			</Box>
		</Container>
	);
};
export default ClientForm;
