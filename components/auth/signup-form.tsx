import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, ref } from "yup";
import { AuthContext } from "../../store/auth-context";
import { useContext } from "react";
import { useRouter } from "next/router";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import NextLink from "next/link";
import Box from "@mui/material/Box";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
import Link from "@mui/material/Link";
import {api} from '../../utils/api';
import { ucFirst } from "../../utils/functions";

type Inputs = {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
};

const schema = object({
	name: string().required("Name is required."),
	email: string()
		.email("Invalid email address")
		.required("Email is required."),
	password: string()
		.required("Password is required.")
		.min(5, "Password must be at least 5 characters")
		.max(16, "Password must be at most 16 characters"),
	confirmPassword: string()
		.required("Confirm password is required.")
		.oneOf([ref("password"), null], "Your passwords do not match."),
}).required();

const SignupForm: React.FC = () => {
	const router = useRouter();
	const { status } = useContext(AuthContext);
	const [isProcessingLogin, setIsProcessingLogin] = useState(false);
	const [signupError, setSignupError] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>({
		resolver: yupResolver(schema),
	});

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		if (isProcessingLogin) {
			return false;
		}
		setIsProcessingLogin(true);

		const { name, email, password, confirmPassword } = data;

		try {
			const data = await api.signUp(name, email, password, confirmPassword);
			setSignupError(null);
			setIsProcessingLogin(false);
			router.push('/login?notification=signup-success')
		}catch(error) {
			setIsProcessingLogin(false);
			setSignupError(error as string);
		}
	};

	if (status == "authenticated") {
		router.replace("/");
		return null;
	}

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
				<Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
					<PersonAddAltIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign Up
				</Typography>

				{signupError && (
					<Alert
						data-test="form-error"
						severity="error"
						sx={{ width: "100%" }}
					>
						{ucFirst(signupError)}
					</Alert>
				)}

				<Box component="form" onSubmit={handleSubmit(onSubmit)}>
					<TextField
						margin="normal"
						fullWidth
						id="name"
						label="Name *"
						inputProps={{ "data-test": "name" }}
						error={!!errors.name}
						helperText={
							errors.name && (
								<span data-test="name-error">
									{errors.name?.message}
								</span>
							)
						}
						{...register("name")}
					/>

					<TextField
						margin="normal"
						fullWidth
						id="email"
						label="Email Address *"
						inputProps={{ "data-test": "email" }}
						error={!!errors.email}
						helperText={
							errors.email && (
								<span data-test="email-error">
									{errors.email?.message}
								</span>
							)
						}
						{...register("email")}
					/>

					<TextField
						margin="normal"
						fullWidth
						label="Password *"
						type="password"
						id="password"
						inputProps={{ "data-test": "password" }}
						error={!!errors.password}
						helperText={
							errors.password && (
								<span data-test="password-error">
									{errors.password?.message}
								</span>
							)
						}
						{...register("password")}
					/>

					<TextField
						margin="normal"
						fullWidth
						label="Confirm Password *"
						type="password"
						id="password"
						inputProps={{ "data-test": "confirm-password" }}
						error={!!errors.password}
						helperText={
							errors.password && (
								<span data-test="confirm-password-error">
									{errors.confirmPassword?.message}
								</span>
							)
						}
						{...register("confirmPassword")}
					/>

					<LoadingButton
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
						data-test="submit-sign-up"
						loading={!!isProcessingLogin}
					>
						Sign Up
					</LoadingButton>
				</Box>
				<div className="text-center">
					<NextLink href="/login" passHref>
						<Link variant="body2">
							{"Already have an account? Login"}
						</Link>
					</NextLink>
				</div>
			</Box>
		</Container>
	);
};
export default SignupForm;
