import "../styles/globals.css";
import 'material-react-toastify/dist/ReactToastify.css';
import type { AppProps } from "next/app";
import CssBaseline from "@mui/material/CssBaseline";
import ResponsiveAppBar from "../components/layout/navbar";
import AuthContextProvider from "../store/auth-context-provider";
import Head from "next/head";
import { ToastContainer } from 'material-react-toastify';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Invoice App</title>
				<meta name="viewport" content="initial-scale=1, width=device-width" />;
			</Head>
			<AuthContextProvider>
				<ResponsiveAppBar />
				<CssBaseline />
				<Component {...pageProps} />
			</AuthContextProvider>
			<ToastContainer position="top-center"/>
		</>
	);
}

export default MyApp;
