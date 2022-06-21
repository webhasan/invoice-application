import { useContext, useEffect } from 'react';
import {useRouter} from 'next/router';
import { AuthContext } from '../../store/auth-context';
import LoginForm from './login-form';
import { toast } from 'material-react-toastify';
import type { Inputs } from './login-form';


const Login  = () => {
   const router = useRouter();
	const { login, status } = useContext(AuthContext);
   
	useEffect(() => {
		if(router.query.notification === 'signup-success') {
			toast.success('You are successfully Signup');
		}
	}, [router.isReady, router.query]);

   const handleLogin = async (
      data: Inputs, 
      setError: (error: string | null) => void, 
      setProcessing: (isProcessing: boolean) => void
   ) => {

		const { email, password } = data;
		const { error } = await login(email, password);

		if (!error) {
			setError(null);
			setProcessing(false);
		} else {
			setProcessing(false);
			setError(error);
		}
	};


	if(!router.isReady) {
		return null;
	}

	if (status == "authenticated") {
		router.replace("/");
		return null;
	}

   return <LoginForm submitForm={handleLogin}/>

}

export default Login;