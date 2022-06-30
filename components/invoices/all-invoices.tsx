import { GridColDef, GridColumnHeaderParams, GridFilterModel, GridRowParams, GridSortModel, GridValueGetterParams } from "@mui/x-data-grid/models";
import { useAsync } from "../../hooks/useAsync";
import { api } from "../../utils/api";
import DataTable from "../data-table/data-table";
import ActionMenu from "../data-table/action-menu";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Link from "next/link";
import {useRouter} from "next/router";
import Container from "@mui/material/Container";
import {formatDate} from '../../utils/functions';
import { ChangeEvent, useEffect, useState } from "react";


const sortByValue = {
	'company' : 'companyName',
	'date' : 'creationDate',
	'due-date' : 'dueDate',
	'price' : 'total'
}

const sortByQueryParam = {
	'companyName' : 'companyName',
	'creationDate' : 'date',
	'dueDate' : 'dueDate',
	'total' : 'price'
}

const AllInvoices = () => {
	const router = useRouter();
	const { error, status, value, execute } = useAsync(api.getInvoices, false);
	const loading = status === "pending" || status === "idle";
	const itemPerPage = 10;
	const totalPages = value?.total ? Math.ceil(value?.total/itemPerPage) : null;
	const [currentPage, setCurrentPage] = useState(1);

	const handleSort = (sortData: GridSortModel) => {
		if(sortData[0]) {
			const {sort, field} = sortData[0];
			const sortBy = sortByValue[field as keyof typeof sortByValue];

			if(sort && sortBy) {
				router.replace({
					query: {...router.query, sortOrder: sort?.toLocaleUpperCase(), sortBy}
				});
			}
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
			query.page = '1';
		
	
		if(query.companyFilter) {
			delete query.companyFilter;
		}

		if(query.clientFilter) {
			delete query.clientFilter;
		}

		if(filterData.items.length) {
			const {columnField, value} = filterData.items[0];

			if(columnField && value) {
				if(columnField === 'company') {
					query = {...query, companyFilter: value}
				}
	
				if(columnField === 'client') {
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
				let requestParams: Record<string, any> = {}
				const {clientFilter, companyFilter} = queryParams;
				let activePage = 1;

				if(queryParams.page && typeof queryParams.page === 'string') {
					activePage = parseInt(queryParams.page);
				}
				setCurrentPage(activePage);

				requestParams.limit = itemPerPage;
				requestParams.offset =  (activePage - 1) * itemPerPage;
	
				if(queryParams.sortBy && queryParams.sortOrder) {
					const sortBy = sortByQueryParam[queryParams.sortBy as keyof typeof sortByQueryParam] ?? queryParams.sortBy;
					requestParams.sortBy = sortBy;
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
		router.push(`invoices/${params.id}/view`)
	}

	const columns: GridColDef[] = [
		{
			field: "number",
			headerName: "# Number",
			sortable: false,
			minWidth: 100,
			filterable: false,
			editable: false,
			flex: 1,
			valueGetter: (params: GridValueGetterParams) => params.row.invoice.invoice_number,
		},
		{
			field: "client",
			headerName: "Client Name",
			sortable: false,
			minWidth: 100,
			filterable: true,
			editable: false,
			flex: 1,
			valueGetter: (params: GridValueGetterParams) => params.row.client.name,
		},
		{
			field: "company",
			headerName: "Company",
			sortable: true,
			minWidth: 100,
			filterable: true,
			editable: false,
			flex: 1,
			renderHeader: () => (
				<strong data-test="company-name-header">Company</strong>
			),
			valueGetter: (params: GridValueGetterParams) => params.row.client.companyDetails.name,
		},
		{
			field: "date",
			headerName: "Date",
			sortable: true,
			minWidth: 100,
			filterable: false,
			flex: 1,
			renderHeader: () => (
				<strong data-test="creation-date-header">Date</strong>
			),
			valueGetter: (params: GridValueGetterParams) => formatDate(params.row.invoice.date),
		},
		{
			field: "due-date",
			headerName: "Due Date",
			sortable: true,
			minWidth: 100,
			filterable: false,
			flex: 1,
			renderHeader: () => (
				<strong data-test="due-date-header">Due Date</strong>
			),
			valueGetter: (params: GridValueGetterParams) => formatDate(params.row.invoice.dueDate),
		},
		{	
			field: "project",
			headerName: "Project",
			sortable: false,
			minWidth: 100,
			filterable: false,
			flex: 1,
			valueGetter: (params: GridValueGetterParams) => params.row.invoice.projectCode,
		},
		{
			field: "price",
			headerName: "Price",
			sortable: true,
			minWidth: 100,
			filterable: false,
			flex: 1,
			renderHeader: () => (
				<strong data-test="total-header">Price</strong>
			),
			valueGetter: (params: GridValueGetterParams) => params.row.invoice.value,
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
						title: "Edit Invoice",
						url: "/invoices/" + params.row.id + "/edit",
					},
					{
						title: "Print Invoice",
						url: "/invoices/" + params.row.id + "/view/?print=true",
						'data-test': "invoice-print"
					},
				];
				return (
					<ActionMenu menuItems={menus} dataTest="invoice-actions" />
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
					<h2>Invoices Archive</h2>
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
					</Grid>
				</Grid>
			</Grid>

			<DataTable
				name="invoices"
				dataTest="invoices-table"
            rowColTestPrefix="invoice"
				columns={columns}
				rows={value ? value.invoices.map(item => ({...item, id: item.invoice.id})) : []}
				loading={loading}
				error={error}
				hideFooter={true}
				disableColumnFilter={false}
				onClickRow = {onClickRow}
				onSortModelChange = {handleSort}
				onFilterModelChange={handleFilter}
				onPageChange={handlePageChange}
				currentPage={currentPage} 
				totalPages={totalPages}
			/>
		</Container>
	);
};

export default AllInvoices;
