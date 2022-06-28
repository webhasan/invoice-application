import * as React from "react";
import { GridColDef, GridRowParams, GridValueGetterParams } from "@mui/x-data-grid/models";
import { useAsync } from "../../hooks/useAsync";
import { api } from "../../utils/api";
import DataTable from "../data-table/data-table";
import ActionMenu from "../data-table/action-menu";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Link from 'next/link';
import { useRouter } from "next/router";

const LatestClients = () => {
	const router = useRouter();
	const { error, status, value} = useAsync(api.getClients, true, {limit: 10, sort: 'DESC', sortOrder: 'creation'});
	const loading = status === "pending" || status === "idle";

	const onClickRow = (params: GridRowParams<any>) => {
		router.push(`clients/${params.id}`)
	}

	const columns: GridColDef[] = [
		{
			field: "name",
			headerName: "Name",
			sortable: false,
			minWidth: 100,
			filterable: false,
			editable: false,
			flex: 1,
		},
		 
		{
			field: "companyName",
			headerName: "Company Name",
			valueGetter: (params: GridValueGetterParams) => params.row.companyDetails.name,
			sortable: false,
			minWidth: 100,
			filterable: false,
			editable: false,
			flex: 1,
		},

		{
			field: "email",
			headerName: "Email Address",
			sortable: false,
			minWidth: 100,
			filterable: false,
			flex: 1,
		},
		{
			field: "totalBilled",
			headerName: "Total Billed",
			sortable: false,
			minWidth: 100,
			filterable: false,
			flex: 1,
		},
		{
			field: "invoicesCount",
			headerName: "Invoices Count",
			sortable: false,
			minWidth: 100,
			filterable: false,
			flex: 1,
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
						title: "Edit Client",
						url: "/clients/" + params.row.id,
					},
					{
						title: "Crate Invoice",
						url: "/clients/" + params.row.id + "/create-invoice",
					},
				];
				return (
					<ActionMenu menuItems={menus} dataTest="client-actions" />
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
					<h2>Latest Clients</h2>
				</Grid>
				<Grid item sm={6} justifyContent="flex-end">
					<Grid container justifyContent="flex-end">
						<Link href="/clients/new">
							<Button
								variant="contained"
								size="small"
								data-test="add-client"
							>
								New Clients
							</Button>
						</Link>

						<Link href="/clients">
							<Button
								variant="contained"
								size="small"
								sx={{ marginLeft: 1 }}
								data-test="view-all-clients"
							>
								All Clients
							</Button>
						</Link>
					</Grid>
				</Grid>
			</Grid>
			<DataTable
				name="clients"
				dataTest="clients-table"
				rowColTestPrefix="client"
				loading={loading}
				columns={columns}
				error={error}
				rows={value ? value.clients : []}
				hideFooter={true}
				disableColumnFilter={true}
				onClickRow={onClickRow}
			/>
		</>
	);
};

export default LatestClients;
