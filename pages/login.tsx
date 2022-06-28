import LoginForm from "../components/auth/login-form";
import Head from 'next/head';

const LoginPage = () => {
	return (
		<>	
			<Head>
				<title>Login | Invoice App</title>
			</Head>
			<LoginForm/>
		</>
	);
}

export default LoginPage;