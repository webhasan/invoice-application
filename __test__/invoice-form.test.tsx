import {render} from '@testing-library/react';
import InvoiceForm from '../components/invoices/invoice-form';
import '@testing-library/jest-dom';
import { expect } from '@jest/globals';

describe('Invoice Form Component', () => {
   const clients = [
      {
         id: '1',
         label: 'LeoCoder'
      },
      {
         id: '2',
         label: 'Toptal'
      },
      {
         id: '3',
         label: 'Google'
      },
   ];

   test('initial render of the component', () => {
      const {container} = render(
         <InvoiceForm 
            submitForm={() => {}}
            clients={clients}
            submitButtonText = 'Add Invoice'
         />
      );
      expect(container).toMatchSnapshot();
   });
});