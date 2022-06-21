import {render, screen} from '@testing-library/react';
import ClientForm from '../components/clients/client-form'
import '@testing-library/jest-dom';

describe('ClientForm component', () => {
   test('initial render of the component', () => {
      const {container} = render(<ClientForm buttonText='Add Client' submitForm={() => {}}/>);
      expect(container).toMatchSnapshot();
   });

   test('render with default value', () => {
      const clientInfo = {
         email: 'webhasan24@gmail.com',
         name: 'Md Hasanuzzaman',
         companyName: 'LeoCoder',
         companyAddress: 'Housing D-457, Kushtia, Bangladesh',
         vatNumber: '23242342',
         regNumber: '23423423',
         iban: '3424rfqwr234',
         swift: '234234rer234',
      }

      const {container} = render(<ClientForm buttonText='Add Client' defaultValue={clientInfo} submitForm={() => {}}/>);
      expect(container).toMatchSnapshot();
   });

   test('inserted default value correctly', () => {
      const clientInfo = {
         email: 'webhasan24@gmail.com',
         name: 'Md Hasanuzzaman',
         companyName: 'LeoCoder',
         companyAddress: 'Housing D-457, Kushtia, Bangladesh',
         vatNumber: '23242342',
         regNumber: '23423423',
         iban: '3424rfqwr234',
         swift: '234234rer234',
      }

      render(<ClientForm buttonText='Add Client' defaultValue={clientInfo} submitForm={() => {}}/>);

      const emailField = screen.getByRole('textbox', {name: "Client Email*"});
      const nameField = screen.getByRole('textbox', {name: "Client Name*"});
      const companyNameField = screen.getByRole('textbox', {name: "Company Name*"});
      const companyAddressField = screen.getByRole('textbox', {name: "Company Address*"});
      const vatNumberField = screen.getByRole('textbox', {name: "VAT Number*"});
      const regNumberField = screen.getByRole('textbox', {name: "Reg Number*"});
      const ibanField = screen.getByRole('textbox', {name: "IBAN Number"});
      const swiftField = screen.getByRole('textbox', {name: "SWIFT Number"});

      expect(emailField).toHaveValue('webhasan24@gmail.com');
      expect(nameField).toHaveValue('Md Hasanuzzaman');
      expect(companyNameField).toHaveValue('LeoCoder');
      expect(companyAddressField).toHaveValue('Housing D-457, Kushtia, Bangladesh');
      expect(vatNumberField).toHaveValue('23242342');
      expect(regNumberField).toHaveValue('23423423');
      expect(ibanField).toHaveValue('3424rfqwr234');
      expect(swiftField).toHaveValue('234234rer234');
   });
});