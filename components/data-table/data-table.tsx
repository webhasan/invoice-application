import { ChangeEvent, FC } from "react";
import {
	DataGrid,
	GridCell,
	GridCellProps,
	GridColDef,
	GridRow,
	GridRowProps,
	GridLoadingOverlay,
	GridOverlayProps,
	GridNoRowsOverlay,
	GridOverlay,
	GridRowParams,
	GridSortModel,
	GridFilterModel
} from "@mui/x-data-grid";
import Pagination, { PaginationRenderItemParams } from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

type propsTypes = {
	name: string;
	rowColTestPrefix: string;
	onClickRow: (param: GridRowParams<any>) => void;
	dataTest?: string;
	loading: boolean;
	error: string | null;
	rows: Record<string, any>[];
	columns: GridColDef[];
	hideFooter?: boolean;
	disableColumnFilter?: boolean;
	onSortModelChange?: (sortData: GridSortModel) => void;
	onFilterModelChange?: (sortData: GridFilterModel) => void;
	totalPages?: number | null;
	currentPage?: number;
	onPageChange?: (event: ChangeEvent<unknown>, value: number) => void;
};	


const CustomLoadingOverlay = (props: GridOverlayProps)  => {
	return <GridLoadingOverlay data-test="loading-overlay" {...props} />
}

const CustomNoRowsOverlay = (props: GridOverlayProps) => {
	return <GridNoRowsOverlay data-test="empty-placeholder" {...props}/>
}

const DataTable: FC<propsTypes> = ({
	name,
	dataTest,
	rowColTestPrefix,
	loading,
	error,
	rows,
	totalPages,
	columns,
	hideFooter = false,
	disableColumnFilter = false,
	onClickRow,
	currentPage = 1,
	onSortModelChange = (sortData: GridSortModel) => {},
	onFilterModelChange = (filterData: GridFilterModel) => {},
	onPageChange = (event: ChangeEvent<unknown>, value: number) => {}
}) => {

	const errorProps = !loading && error !== null ? {error: true} : {}

	const CustomErrorOverlay = () => {
		return <GridOverlay date-test={`${name}-fetch-error`}  sx={{ width: '100%', minHeight: 100 }}>
			{error}
		 </GridOverlay>
	}

	const CustomRow  = (props: GridRowProps) => {
		return <GridRow data-test={`${rowColTestPrefix}-row-${props.row.id}`} {...props} />
	}
	
	const CustomCell = (props: GridCellProps) => {
		return <GridCell data-test={`${rowColTestPrefix}-${props.field}`} {...props} />
	}
	

	return (
		<div data-test={dataTest}>
			<DataGrid
				hideFooter={hideFooter}
				rows={rows}
				columns={columns}
				autoHeight={true}
				loading={loading}
				{...errorProps}
				sortingMode="server"
				filterMode="server"
				disableColumnFilter={disableColumnFilter}
				onSortModelChange={onSortModelChange}
				componentsProps={{
					filterPanel: {
						 filterFormProps: {
							  operatorInputProps: {
									disabled: true,
									sx: { display: "none" }
							  },
						 }
					}
			}}
				onFilterModelChange={onFilterModelChange}
				density="standard"
				components={{
					Row: CustomRow,
					Cell: CustomCell,
					LoadingOverlay: CustomLoadingOverlay,
					NoRowsOverlay: CustomNoRowsOverlay,
					ErrorOverlay: CustomErrorOverlay,
				}}
				onRowClick = {onClickRow}
			/>

			{!loading && totalPages && totalPages > 1 &&
				<Pagination 
					count={totalPages} 
					page={currentPage}
					shape="rounded" 
					onChange={onPageChange}
					renderItem = { (item: PaginationRenderItemParams) => {
						if(item.type === 'page') {
							return <PaginationItem {...item} data-test={`page-${item.page}`}/>
						}
						return <PaginationItem {...item}/>
					}}
					sx={{
						marginTop: 4, 
						marginBottom: 10,  
						justifyContent:"center",
						display:'flex'
					}}
				/>
			}
		</div>
		
	);
};
export default DataTable;
