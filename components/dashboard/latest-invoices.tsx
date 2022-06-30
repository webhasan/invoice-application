import * as React from "react";
import { GridColDef, GridRowParams, GridValueGetterParams } from "@mui/x-data-grid/models";
import { useAsync } from "../../hooks/useAsync";
import { api } from "../../utils/api";
import DataTable from "../data-table/data-table";
import ActionMenu from "../data-table/action-menu";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Link from "next/link";
import {formatDate} from '../../utils/functions';
import {useRouter} from "next/router";

const LatestInvoices = () => {
	const router = useRouter();
	const { error, status, value } = useAsync(api.getInvoices, true, {limit: 10, sort: 'DESC', sortOrder: 'creation'});
	const loading = status === "pending" || status === "idle";

	const onClickRow = (params: GridRowParams<any>) => {
		router.push(`invoices/${params.id}/view`)
	}

	const columns: GridColDef[] = [
		{
			field: "invoice-number",
			headerName: "# Number",
			sortable: false,
			minWidth: 100,
			filterable: false,
			editable: false,
			flex: 1,
			valueGetter: (params: GridValueGetterParams) => params.row.invoice.invoice_number,
		},
		{
			field: "invoice-company",
			headerName: "Company",
			sortable: false,
			minWidth: 100,
			filterable: false,
			editable: false,
			flex: 1,
			valueGetter: (params: GridValueGetterParams) => params.row.client.companyDetails.name,
		},
		{
			field: "invoice-date",
			headerName: "Date",
			sortable: false,
			minWidth: 100,
			filterable: false,
			flex: 2,
			valueGetter: (params: GridValueGetterParams) => formatDate(params.row.invoice.date),
		},
		{
			field: "invoice-project",
			headerName: "Project",
			sortable: false,
			minWidth: 100,
			filterable: false,
			flex: 1,
			valueGetter: (params: GridValueGetterParams) => params.row.invoice.projectCode,
		},
		{
			field: "invoice-price",
			headerName: "Price",
			sortable: false,
			minWidth: 100,
			filterable: false,
			flex: 1,
			valueGetter: (params: GridValueGetterParams) => params.row.invoice.value,
		},

		{
			field: "actions-wrapper",
			sortable: false,
			headerName: "",
			flex: 0.5,
			minWidth: 60,
			renderCell: (params: GridValueGetterParams) => {
				const menus = [
					{
						title: "Edit Invoice",
						url: "/invoices/" + params.row.id + "/edit",
					},
					{
						title: "Print Invoice",
						url: "/invoices/" + params.row.id + "/view/?print=true",
					},
				];
				return (
					<ActionMenu menuItems={menus} dataTest="invoice-actions" />
				);
			},
		},
	];

	return (
		<>
			<Grid
				container
				alignItems="center"
				sx={{ marginTop: 5, marginBottom: 3 }}
			>
				<Grid item sm={6}>
					<h2>Latest Invoices</h2>
				</Grid>
				<Grid item sm={6} justifyContent="flex-end">
					<Grid container justifyContent="flex-end">
						<Link href="/invoices/new">
							<Button
								variant="contained"
								size="small"
								data-test="add-invoice"
							>
								New Invoice
							</Button>
						</Link>

						<Link href="/invoices">
							<Button
								variant="contained"
								size="small"
								sx={{ marginLeft: 1 }}
								data-test="view-all-invoices"
							>
								All Invoices
							</Button>
						</Link>
					</Grid>
				</Grid>
			</Grid>
			<DataTable
				name="invoices"
				dataTest="invoices-table"
				onClickRow = {onClickRow}
            rowColTestPrefix="invoice"
				loading={loading}
				columns={columns}
				error={error}
				rows={value ? value.invoices.map(item => ({...item, id: item.invoice.id})) : []}
				hideFooter={true}
				disableColumnFilter={true}
			/>
		</>
	);
};

export default LatestInvoices;
