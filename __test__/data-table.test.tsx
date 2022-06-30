import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DataTable from '../components/data-table/data-table';
import ActionMenu from '../components/data-table/action-menu';
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid/models';
import { expect } from '@jest/globals';

const dummyClientsData = [
   {
      "user_id": "1",
      "email": "webhasan24@gmail.com",
      "name": "Md Hasanuzzaman",
      "companyDetails": {
         "name": "LeoCoder",
         "address": "Housing D-457 Dhaka, Bangladesh",
         "vatNumber": "123",
         "regNumber": "12334242",
         "iban": "345690",
         "swift": "345690"
      },
      "id": "1644482450322",
      "totalBilled": 22343
   },
   {
      "user_id": "2",
      "email": "shozib1@hotmail.com",
      "name": "Shojib",
      "companyDetails": {
         "name": "Toptal",
         "address": "Dhaka, Bangladesh",
         "vatNumber": "3534343",
         "regNumber": "34543",
         "iban": "34345345690",
         "swift": "34543"
      },
      "id": "5235235235",
      "totalBilled": 2423423
   },
];
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
      field: "companyDetails",
      headerName: "Company Name",
      valueGetter: (params: GridValueGetterParams) =>
         params.row.companyDetails.name,
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
      type: "number",
      minWidth: 100,
      filterable: false,
      flex: 1,
   },
   {
      field: "invoicesCount",
      headerName: "Invoices Count",
      sortable: false,
      type: "number",
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


describe('DataTable component', () => {
   test('Initial render of data table', () => {
      const {container} = render(<DataTable
         name="clients"
         dataTest="clients-table"
         rowColTestPrefix="client"
         loading={false}
         columns={columns}
         rows={dummyClientsData}
         error={null}
         hideFooter={true}
         disableColumnFilter={true}
         onClickRow={() => {}}
      />);
      
      expect(container).toMatchSnapshot();
   });
});



