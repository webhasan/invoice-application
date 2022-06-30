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
				<strong>Novice Number: </strong>
				<span data-test="invoice-number">{invoiceNumber}</span>
			</Typography>
			<Typography component="p">
				<strong>Date: </strong>
				<span data-test="invoice-date">{formatDate(invoiceDate)}</span>
			</Typography>
			<Typography component="p">
				<strong>Due Date: </strong>
				<span data-test="invoice-due-date">{formatDate(dueDate)}</span>
			</Typography>
			{projectCode && (
				<Typography component="p">
					<strong> Project Code: </strong>
					<span data-test="invoice-project-code">{projectCode}</span>
				</Typography>
			)}
		</Grid>
	);
};
export default InvoiceInfo;
