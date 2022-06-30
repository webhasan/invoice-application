import {render, screen} from '@testing-library/react';
import ClientForm from '../components/clients/client-form'
import '@testing-library/jest-dom';
import { expect } from '@jest/globals';

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

      const {container} = render(<ClientForm buttonText='Update Client' defaultValue={clientInfo} submitForm={() => {}}/>);
      expect(container).toMatchSnapshot();
   });
});