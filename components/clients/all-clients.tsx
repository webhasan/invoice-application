import * as React from "react";
import { GridColDef, GridFilterModel, GridRowParams, GridSortModel, GridValueGetterParams } from "@mui/x-data-grid/models";
import { useAsync } from "../../hooks/useAsync";
import { api } from "../../utils/api";
import DataTable from "../data-table/data-table";
import ActionMenu from "../data-table/action-menu";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Link from 'next/link';
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import { ChangeEvent, useEffect, useState } from "react";


const ClientsArchive = () => {
	const router = useRouter();
	const { error, status, value: clientsData, execute } = useAsync(api.getClients, false);
	console.log('value from list page', clientsData);

	const loading = status === "pending" || status === "idle";
	const itemPerPage = 10;
	const totalPages = clientsData?.total ? Math.ceil(clientsData?.total/itemPerPage) : null;
	const [currentPage, setCurrentPage] = useState(1);

   const handleSort = (sortData: GridSortModel) => {
		if(sortData[0]) {
			const {sort, field: sortBy} = sortData[0];
			router.replace({
				query: {...router.query, sortBy, sortOrder: sort?.toLocaleUpperCase()}
			});
		}else {
			const query = router.query;
			if(query.sortBy) {
				delete query.sortBy;
			}
			if((query.sortOrder)) {
				delete query.sortOrder;
			}

			router.replace({ query });
		}
   }

	const handleFilter = async (filterData: GridFilterModel) => {
		
		let query = router.query;
	
		if(query.companyFilter) {
			delete query.companyFilter;
		}

		if(query.clientFilter) {
			delete query.clientFilter;
		}

		if(filterData.items.length) {
			const {columnField, value} = filterData.items[0];

			if(columnField && value) {
				if(columnField === 'companyName') {
					query = {...query, companyFilter: value}
				}
	
				if(columnField === 'clientName') {
					query =  {...query, clientFilter: value}
				}
			}
		}

		router.replace({query});
	}

	const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
		router.replace({
			query: {...router.query, page:value }
		})
	}

	useEffect(() => {
		(async () => {
			if(router.isReady) {
				const queryParams = router.query;
				const {clientFilter, companyFilter} = queryParams;
	
				let requestParams: Record<string, any> = {}

				let activePage = 1;
				if(queryParams.page && typeof queryParams.page === 'string') {
					activePage = parseInt(queryParams.page);
				}
				setCurrentPage(activePage);
				requestParams.limit = itemPerPage;
				requestParams.offset =  (activePage - 1) * itemPerPage;
	
				if(queryParams.sortBy && queryParams.sortOrder) {
					requestParams.sortBy = queryParams.sortBy;
					requestParams.sortOrder = queryParams.sortOrder;
				}
	
				if(clientFilter || companyFilter) {
					if(companyFilter ) {
						const clientId = await api.getClientIdByCompany(companyFilter as string);
						requestParams.filter = { clientId }
					}else if(clientFilter) {
						const clientId = await api.getClientIdByClientName(clientFilter as string);
						requestParams.filter = { clientId }
					}
				}
	
				execute(requestParams);
			}
		})();

	}, [router.query, router.isReady, execute])

	const onClickRow = (params: GridRowParams<any>) => {
		router.push(`clients/${params.id}`)
	}

	const columns: GridColDef[] = [
		{
			field: "clientName",
			headerName: "Name",
			valueGetter: (params: GridValueGetterParams) =>
				params.row.name,
			sortable: true,
			minWidth: 100,
			filterable: true,
			editable: false,
			flex: 1,
			renderHeader: () => (
				<strong data-test="client-name-header">Name</strong>
			)
		},
		{
			field: "companyName",
			headerName: "Company Name",
			valueGetter: (params: GridValueGetterParams) => params.row.companyDetails.name,
			sortable: true,
			minWidth: 100,
			filterable: true,
			editable: false,
			flex: 1,
			renderHeader: () => (
				<strong data-test="company-name-header">Company Name</strong>
			)
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
			sortable: true,
			minWidth: 100,
			filterable: false,
			flex: 1,
			renderHeader: () => (
				<strong data-test="total-price-header">Total Billed</strong>
			)
		},
		{
			field: "invoicesCount",
			headerName: "Invoices Count",
			sortable: true,
			minWidth: 100,
			filterable: false,
			flex: 1,
			renderHeader: () => (
				<strong data-test="Invoice-count-header">Invoices Count</strong>
			)
		},

		{
			field: "actions-wrapper",
			sortable: false,
			filterable: false,
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
		<Container maxWidth="lg">
			<Grid
				container
				alignItems="center"
				sx={{ marginTop: 5, marginBottom: 3 }}
			>
				<Grid item sm={6}>
					<h2>Clients Archive</h2>
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
				rows={clientsData ? clientsData.results : []}
				hideFooter={true}
				disableColumnFilter={false}
				onClickRow={onClickRow}
            onSortModelChange = {handleSort}
				onFilterModelChange={handleFilter}
				onPageChange={handlePageChange}
				currentPage={currentPage} 
				totalPages={totalPages}
			/>
		</Container>
	);
};

export default ClientsArchive;
