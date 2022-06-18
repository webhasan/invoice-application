import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {FC} from 'react';
import { formatDate } from '../../../utils/functions';

type PropsType = {
   title: string;
   invoiceNumber: string;
   invoiceDate: number;
   dueDate: number;
   projectCode?: string;
}

const InvoiceInfo:FC<PropsType> = ({title, invoiceNumber, invoiceDate, dueDate, projectCode}) => {
	return (
		<Grid item padding={5} md={4}>
			<Typography component="h2" variant="h5" sx={{ marginBottom: 1 }}>
				{title}
			</Typography>
			<Typography component="p">
				<strong data-test="invoice-number">Novice Number: </strong>
				{invoiceNumber}
			</Typography>
			<Typography component="p">
				<strong data-test="invoice-date">Date: </strong>
				{formatDate(invoiceDate)}
			</Typography>
			<Typography component="p">
				<strong data-test="invoice-due-date">Due Date: </strong>
				{formatDate(dueDate)}
			</Typography>
			{projectCode && (
				<Typography component="p">
					<strong data-test="invoice-project-code">
						Project Code:{" "}
					</strong>
					{projectCode}
				</Typography>
			)}
		</Grid>
	);
};
export default InvoiceInfo;
