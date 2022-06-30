import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { AuthContext } from "../../store/auth-context";
import { useContext } from "react";
import { useRouter } from "next/router";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import LoadingButton from "@mui/lab/LoadingButton";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import NextLink from 'next/link'
import { toast } from 'material-react-toastify';
import { ucFirst } from "../../utils/functions";

type Inputs = {
	email: string;
	password: string;
};

const schema = object({
	email: string()
		.email("Invalid email address")
		.required("Email is required"),
	password: string()
		.required("Password is required.")
		.min(5, "Password must be at least 5 characters")
		.max(16, "Password must be at most 16 characters"),
}).required();

const LoginForm: React.FC = () => {
	const router = useRouter();
	const { login, status } = useContext(AuthContext);
	const [showPassword, setShowPassword] = useState(false);
	const [isProcessingLogin, setIsProcessingLogin] = useState(false);
	const [loginError, setLoginError] = useState<string | null>(null);

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

		const { email, password } = data;
		const { error } = await login(email, password);

		if (!error) {
			setLoginError(null);
			setIsProcessingLogin(false);
		} else {
			setIsProcessingLogin(false);
			setLoginError(error);
		}
	};

	useEffect(() => {
		if(router.query.notification === 'signup-success') {
			toast.success('You are successfully Signup');
		}
	}, [router.isReady, router.query]);

	if(!router.isReady) {
		return null;
	}

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
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Login
				</Typography>

				{loginError && (
					<Alert
						data-test="form-error"
						severity="error"
						sx={{ width: "100%" }}
					>
						{ucFirst(loginError)}
					</Alert>
				)}

				<Box component="form" onSubmit={handleSubmit(onSubmit)}>
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
						type={showPassword ? "text" : "password"}
						id="password"
						inputProps={{ "data-test": "password" }}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={() =>
											setShowPassword(
												(showPassword) => !showPassword
											)
										}
										edge="end"
									>
										{showPassword ? (
											<VisibilityOff />
										) : (
											<Visibility />
										)}
									</IconButton>
								</InputAdornment>
							),
						}}
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

					<LoadingButton
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
						data-test="submit-login"
						loading={!!isProcessingLogin}
					>
						Login
					</LoadingButton>

					<div className="text-center">
						<NextLink href="/signup" passHref>
							<Link variant="body2">
								{"Don't have an account? Sign Up"}
							</Link>
						</NextLink>
					</div>
				</Box>
			</Box>
		</Container>
	);
};
export default LoginForm;
