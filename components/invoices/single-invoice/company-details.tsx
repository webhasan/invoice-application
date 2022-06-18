import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import {FC} from 'react';


type PropsType = {
   title: string;
   name: string;
   address: string;
   iban: string;
   registration: string;
   vat: string;
}

const CompanyDetails: FC<PropsType> = ({title, name, address, iban, registration, vat}) => {
	return (
		<Grid item md={4}>
			<Typography component="h2" variant="h5" sx={{ marginBottom: 1 }}>
				{title}
			</Typography>
			<Typography component="p">
				<strong>Company: </strong>
				{name}
			</Typography>
			<Typography component="p">
				<strong>Address: </strong>
				{address}
			</Typography>
			<Typography component="p">
				<strong>IBAN: </strong>
				{iban}
			</Typography>
			<Typography component="p">
				<strong>Registration: </strong>
				{registration}
			</Typography>
			<Typography component="p">
				<strong>Vat No: </strong>
				{vat}
			</Typography>
		</Grid>
	);
};

export default CompanyDetails;
