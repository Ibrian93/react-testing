import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserRegistrationForm from './UserRegistrationForm';


describe('UserRegistrationForm', () => {
  test('renders form with all inputs', () => {
    render(<UserRegistrationForm />);
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByTestId('first-name')).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });


  test('handles input changes', () => {
    render(<UserRegistrationForm />);
    const firstNameInput = screen.getByLabelText(/first name/i);
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    expect(firstNameInput.value).toBe('John');
  });

  test('handles last name changes', () => {
    render(<UserRegistrationForm />);
    const lastName = screen.getByLabelText(/last name/i);
    fireEvent.change(lastName, { target: { value: 'John' } });
    expect(lastName.value).toBe('John');
  });

  test('submits form', () => {
    window.alert = jest.fn();
    render(<UserRegistrationForm />);
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.click(screen.getByText(/register/i));
    //expect(window.alert).toHaveBeenCalledWith('User Registered: John Icochea, john.doe@example.com');
  });
});

test('shows an alert when no name is presented', () => {
  render(<UserRegistrationForm />);
  const inputEmail = screen.getByLabelText(/email/i);
  const buttonSubmit = screen.getByText('Register');

  fireEvent.change(inputEmail, { target: { value: 'test@test.com' } });
  fireEvent.click(buttonSubmit);

  expect(screen.queryByText(/User registered/i)).not.toBeInTheDocument();
});


test('When wrong email is sent, then no User registration is happening', () => {
  render(<UserRegistrationForm />);

  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'correoIncorrecto' } });

  // Simulamos el envío del formulario
  fireEvent.click(screen.getByRole('button', { name: /Register/i }));

  // Verificamos que no se haya enviado el formulario
  expect(screen.queryByText(/User registered/i)).not.toBeInTheDocument();
});