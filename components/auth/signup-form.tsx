import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string, ref } from "yup";
import { AuthContext } from "../../store/auth-context";
import { useContext } from "react";
import { useRouter } from "next/router";
import Avatar from "@mui/material/Avatar";
import NextLink from "next/link";
import Box from "@mui/material/Box";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";
import {api} from '../../utils/api';
import { ucFirst } from "../../utils/functions";
import TextInput from "../form/text-input";
import SubmitButton from "../form/submit-button";

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
	const [processFormSubmit, setProcessFormSubmit] = useState(false);
	const [signupError, setSignupError] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>({
		resolver: yupResolver(schema),
	});

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		if (processFormSubmit) {
			return false;
		}
		setProcessFormSubmit(true);

		const { name, email, password, confirmPassword } = data;

		try {
			const data = await api.signUp(name, email, password, confirmPassword);
			setSignupError(null);
			setProcessFormSubmit(false);
			router.push('/login?notification=signup-success')
		}catch(error) {
			setProcessFormSubmit(false);
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
					<TextInput
						id="name"
						label="Name *"
						dataTest="name"
						dataErrorTest="name-error"
						{...register("name")}	
						error={errors.name}					
					/>

					<TextInput
						id="email"
						label="Email Address *"
						dataTest="email"
						dataErrorTest="email-error"
						error={errors.email}	
						type="email"	
						{...register("email")}				
					/>

					<TextInput
						id="password"
						label="Password *"
						dataTest="password"
						dataErrorTest="password-error"	
						error={errors.password}	
						type="password"	
						{...register("password")}			
					/>
					
					<TextInput
						id="confirm-password"
						label="Confirm Password *"
						dataTest="confirm-password"
						error={errors.confirmPassword}
						dataErrorTest="confirm-password-error"
						type="password"	
						{...register("confirmPassword")}			
					/>

					<SubmitButton 
						title = 'Sign Up'
						loading={!!processFormSubmit}
						dataTest="submit-sign-up"
					/>
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
