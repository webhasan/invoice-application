import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { FC } from "react";

type PropsType = {
   title: string;
   items: {description: 'string', price: number}[],
   taxRate?: number;
}

const ItemTable: FC<PropsType> = ({title, items, taxRate = 0}) => {
   
   const total = items.reduce((prev, current) => prev + current.price, 0);
	return (
		<TableContainer sx={{ backgroundColor: "#e9e9e9" }}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell align="center" colSpan={3}>
							<Typography
								component="h2"
								variant="h5"
								sx={{ marginBottom: 1 }}
							>
								{title}
							</Typography>
						</TableCell>
					</TableRow>

					<TableRow>
						<TableCell>NO:</TableCell>
						<TableCell align="right">Description</TableCell>
						<TableCell align="right">Price</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{items.map((item, index) => (
						<TableRow
							data-test={`"invoice-item-${index + 1}"`}
							key={index}
							sx={{
								"&:last-child td, &:last-child th": {
									border: 0,
								},
							}}
						>
							<TableCell component="th" scope="row">{index + 1}</TableCell>
							<TableCell
								align="right"
								data-test="invoice-item-description"
							>
								{item.description}
							</TableCell>
							<TableCell
								align="right"
								data-test="invoice-item-value"
							>
								{item.price}
							</TableCell>
						</TableRow>
					))}
					<TableRow>
						<TableCell rowSpan={3} />
						<TableCell colSpan={1} align="right">
							<strong>Subtotal</strong>
						</TableCell>
						<TableCell align="right">${total}</TableCell>
					</TableRow>
					<TableRow>
						<TableCell align="right">
							<strong>Tax({taxRate}%)</strong>
						</TableCell>
						<TableCell align="right">
							${(total * (taxRate / 100)).toFixed(2)}
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell colSpan={1} align="right">
							<strong>Total</strong>
						</TableCell>
						<TableCell align="right">
							$<span data-test="invoice-total">{( total + total * (taxRate / 100)).toFixed(2)}</span>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default ItemTable;
