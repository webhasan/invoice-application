import SignupForm from "../components/auth/signup-form";
import Head from 'next/head';

const SignupPage = () => {
	return (
		<>
			<Head>Signup | Invoice App</Head>
			<SignupForm/>
		</>
	)
}

export default SignupPage;