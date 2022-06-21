import { act, render, screen, waitFor } from '@testing-library/react';
import LoginForm from '../components/auth/login-form';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

describe('LoginForm', () => {
   test('all require field available in the login form', () => {

      render(<LoginForm submitForm={() => {}}/>);

      const emailField = screen.getByRole('textbox', {name: 'Email Address *'});
      const passwordField = screen.getByLabelText('Password *');
      const submitButton = screen.getByRole('button', {name: 'Login'});

      expect(emailField).toBeInTheDocument();
      expect(passwordField).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
   });

   test('available all data-test attributes', async () => {
      const {container} = render(<LoginForm submitForm={() => {}}/>);

      const email = container.querySelector('[data-test="email"]');
      const password = container.querySelector('[data-test="email"]');
      const submitButton = container.querySelector('[data-test="submit-login"]');

      expect(password).toBeInTheDocument();
      expect(email).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
   });

   test('show input validation for blank fields', async () => {
      render(<LoginForm submitForm={() => {}}/>);
      const submitButton = screen.getByRole('button', {name: 'Login'});
      userEvent.click(submitButton);
      
      const emailValidation = await screen.findByText('Email is required.');
      const passwordValidation = await screen.findByText('Password is required.');

      expect(emailValidation).toBeInTheDocument();
      expect(passwordValidation).toBeInTheDocument();
   });

   test('form and input button disabled after submit value', async () => {
      await act(async () => {
         await render(<LoginForm submitForm={() => {}}/>);
      });
      
      const emailField = screen.getByRole('textbox', {name: 'Email Address *'});
      const passwordField = screen.getByLabelText('Password *');
      const submitButton = screen.getByRole('button', {name: 'Login'});
      
      await userEvent.type(emailField, 'webhasan24@gmail.com');
      await userEvent.type(passwordField, '1234567');
      userEvent.click(submitButton);

      await waitFor(() => expect(screen.getByRole('button', {name: 'Login'})).toBeDisabled());
      await waitFor(() => expect(screen.getByRole('progressbar')).toBeInTheDocument());
   });

   test('Snapshot of login from of initial stage', () => {
      const {container} = render(<LoginForm submitForm={() => {}}/>);
      expect(container).toMatchSnapshot();
   });

});