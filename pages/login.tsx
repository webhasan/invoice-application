import LoginForm from "../components/auth/login-form";
import Head from 'next/head';
import Unprotected from "../components/auth/unprotected";

const LoginPage = () => {
	return (
		<Unprotected>	
			<Head>
				<title>Login | Invoice App</title>
			</Head>
			<LoginForm/>
		</Unprotected>
	);
}

export default LoginPage;