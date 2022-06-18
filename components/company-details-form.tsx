import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, ref } from "yup";
import { AuthContext } from "../store/auth-context";
import { useContext } from "react";
import { useRouter } from "next/router";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "material-react-toastify";
import { api } from "../utils/api";

//type
import { CompanyDetails } from "../types";
import { ucFirst } from "../utils/functions";

type Inputs = {
	name: string;
	address: string;
	vatNumber: string;
	regNumber: string;
	iban?: string;
	swift?: string;
};

const schema = object({
	name: string()
		.required("Company name is required")
		.min(3, "Company name must be at least 5 characters")
		.max(16, "Company name must be at most 16 characters"),

	address: string().required("Address is required"),

	vatNumber: string().required("Vat number is required."),

	regNumber: string().required("Registration number is required."),

	iban: string(),

	swift: string()
}).required();

const CompanyDetailsForm: React.FC = () => {
	const router = useRouter();
	const { user, updateUserCompany } = useContext(AuthContext);
	const [processingSubmit, setProcessingSubmit] = useState(false);
	const [companyDetailsError, setCompanyDetailsError] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>({
		defaultValues: user?.companyDetails ?? {},
		resolver: yupResolver(schema),
	});

	useEffect(() => {
		if(router.isReady) {
			const notification = router.query?.notification;
			if(notification === 'no-company-details') {
				toast.warn('Please fill company details to use app.');
			}
		}
	}, [router.isReady, router.query])

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		if (processingSubmit) {
			return false;
		}
		setProcessingSubmit(true);

		const { name, address, vatNumber, regNumber, iban, swift } = data;

		try {
			await api.updateCompany(
            name, 
            address, 
            vatNumber, 
				regNumber,
            iban, 
            swift
			);

			setCompanyDetailsError(null);
			setProcessingSubmit(false);
			updateUserCompany(data)
			
			const successRedirectURL = router.query.redirect;
			if(successRedirectURL) {
				router.push(successRedirectURL as string);
			}else {
				toast.success(<span data-test='success-message'>Successfully updated company details.</span>);
			}

		} catch (error) {
			setProcessingSubmit(false);
			setCompanyDetailsError(error as string);
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Typography component="h1" variant="h5">
					Company Details
				</Typography>

				{companyDetailsError && (
					<Alert
						data-test="form-error"
						severity="error"
						sx={{ width: "100%" }}
					>
						{ucFirst(companyDetailsError)}
					</Alert>
				)}

				<Box component="form" onSubmit={handleSubmit(onSubmit)}>
					<TextField
						margin="normal"
						fullWidth
						id="name"
						label="Company Name*"
						inputProps={{ "data-test": "company-name" }}
						error={!!errors.name}
						helperText={
							errors.name && (
								<span data-test="company-name-error">
									{errors.name.message}
								</span>
							)
						}
						{...register("name")}
					/>

					<TextField
						margin="normal"
						fullWidth
						id="address"
						label="Company Address*"
						inputProps={{ "data-test": "company-address" }}
						error={!!errors.address}
						helperText={
							errors.address && (
								<span data-test="company-address-error">
									{errors.address.message}
								</span>
							)
						}
						{...register("address")}
					/>

					<TextField
						margin="normal"
						fullWidth
						label="Vat Number*"
						id="vatNumber"
						inputProps={{ "data-test": "company-vat" }}
						error={!!errors.vatNumber}
						helperText={
							errors.vatNumber && (
								<span data-test="company-vat-error">
									{errors.vatNumber.message}
								</span>
							)
						}
						{...register("vatNumber")}
					/>

					<TextField
						margin="normal"
						fullWidth
						label="Registration Number*"
						id="regNumber"
						inputProps={{ "data-test": "company-reg-number" }}
						error={!!errors.regNumber}
						helperText={
							errors.regNumber && (
								<span data-test="company-reg-error">
									{errors.regNumber.message}
								</span>
							)
						}
						{...register("regNumber")}
					/>

					<TextField
						margin="normal"
						fullWidth
						label="IBAN"
						id="iban"
						inputProps={{ "data-test": "company-iban" }}
						error={!!errors.iban}
						helperText={
							errors.iban && (
								<span data-test="company-iban-error">
									{errors.iban.message}
								</span>
							)
						}
						{...register("iban")}
					/>
					<TextField
						margin="normal"
						fullWidth
						label="SWIFT"
						id="swift"
						inputProps={{ "data-test": "company-swift" }}
						error={!!errors.swift}
						helperText={
							errors.swift && (
								<span data-test="company-swift-error">
									{errors.swift.message}
								</span>
							)
						}
						{...register("swift")}
					/>

					<LoadingButton
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
						data-test="submit-company-details"
						loading={!!processingSubmit}
					>
						Submit Company Details
					</LoadingButton>
				</Box>
			</Box>
		</Container>
	);
};
export default CompanyDetailsForm;
