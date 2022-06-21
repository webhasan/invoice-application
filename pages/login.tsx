import LoginForm from "../components/auth/login-form";
import Head from 'next/head';
import Login from "../components/auth/Login";

const LoginPage = () => {
	return (
		<>	
			<Head>
				<title>Login | Invoice App</title>
			</Head>
			<Login/>
		</>
	);
}

export default LoginPage;