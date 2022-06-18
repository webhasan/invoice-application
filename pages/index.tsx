import LatestClients from '../components/dashboard/latest-clients';
import LatestInvoices from '../components/dashboard/latest-invoices';
import Protected from "../components/auth/protected";
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Head from 'next/head';

const HomePage = () => {
	return (
		<>
      <Head>
        <title>Dashboard | Invoice App </title>
      </Head>
			<Protected>
				<Container maxWidth="xl">
					<Grid container spacing={4}>
						<Grid item md={6} xs={12}>
							<LatestClients/>
						</Grid>
						<Grid item md={6} xs={12}>
							<LatestInvoices/>
						</Grid>
					</Grid>
				</Container>
			</Protected>
		</>

	);
};

export default HomePage;
