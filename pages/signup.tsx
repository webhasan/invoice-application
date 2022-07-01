import SignupForm from "../components/auth/signup-form";
import Head from 'next/head';
import Unprotected from "../components/auth/unprotected";

const SignupPage = () => {
	return (
		<Unprotected>
			<Head>Signup | Invoice App</Head>
			<SignupForm/>
		</Unprotected>
	)
}

export default SignupPage;