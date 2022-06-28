import { Dispatch, SetStateAction, useState } from "react";
import { useForm, SubmitHandler, UseFormReset } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
import { ucFirst } from "../../utils/functions";
import Grid from "@mui/material/Grid";

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
		.min(3, "Client name must be at least 5 characters"),

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
							<TextField
								margin="normal"
								fullWidth
								id="email"
								type="email"
								label="Client Email*"
								inputProps={{ "data-test": "client-email" }}
								error={!!errors.email}
								helperText={
									errors.email && (
										<span data-test="client-email-error">
											{errors.email.message}
										</span>
									)
								}
								{...register("email")}
							/>

							<TextField
								margin="normal"
								fullWidth
								id="name"
								label="Client Name*"
								inputProps={{ "data-test": "client-name" }}
								error={!!errors.name}
								helperText={
									errors.name && (
										<span data-test="client-name-error">
											{errors.name.message}
										</span>
									)
								}
								{...register("name")}
							/>

							<TextField
								margin="normal"
								fullWidth
								label="Company Name*"
								id="companyName"
								inputProps={{ "data-test": "client-company-name" }}
								error={!!errors.companyName}
								helperText={
									errors.companyName && (
										<span data-test="client-company-name-error">
											{errors.companyName.message}
										</span>
									)
								}
								{...register("companyName")}
							/>

							<TextField
								margin="normal"
								fullWidth
								label="Company Address*"
								multiline
								id="companyAddress"
								inputProps={{ "data-test": "client-company-address" }}
								error={!!errors.companyAddress}
								helperText={
									errors.companyAddress && (
										<span data-test="client-company-address-error">
											{errors.companyAddress.message}
										</span>
									)
								}
								{...register("companyAddress")}
							/>
						</Grid>

						<Grid item lg={6}>
							<TextField
								margin="normal"
								fullWidth
								label="VAT Number*"
								id="vatNumber"
								inputProps={{ "data-test": "client-company-vat" }}
								error={!!errors.vatNumber}
								helperText={
									errors.vatNumber && (
										<span data-test="client-company-vat-error">
											{errors.vatNumber.message}
										</span>
									)
								}
								{...register("vatNumber")}
							/>
							<TextField
								margin="normal"
								fullWidth
								label="Reg Number*"
								id="regNumber"
								inputProps={{ "data-test": "client-company-reg" }}
								error={!!errors.regNumber}
								helperText={
									errors.regNumber && (
										<span data-test="client-company-reg-error">
											{errors.regNumber.message}
										</span>
									)
								}
								{...register("regNumber")}
							/>
							<TextField
								margin="normal"
								fullWidth
								label="IBAN Number"
								id="iban"
								inputProps={{ "data-test": "client-company-iban" }}
								error={!!errors.iban}
								helperText={
									errors.iban && (
										<span data-test="client-company-iban-error">
											{errors.iban?.message}
										</span>
									)
								}
								{...register("iban")}
							/>
							<TextField
								margin="normal"
								fullWidth
								label="SWIFT Number"
								id="swift"
								inputProps={{ "data-test": "client-company-swift" }}
								error={!!errors.swift}
								helperText={
									errors.swift && (
										<span data-test="client-company-swift-error">
											{errors.swift.message}
										</span>
									)
								}
								{...register("swift")}
							/>
						</Grid>
					</Grid>

					<LoadingButton
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
						data-test="submit-client"
						loading={!!processingSubmit}
					>
						{buttonText}
					</LoadingButton>
				</Box>
			</Box>
		</Container>
	);
};
export default ClientForm;
