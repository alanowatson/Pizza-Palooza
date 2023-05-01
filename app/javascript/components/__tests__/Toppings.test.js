import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import Toppings from '../Toppings';

describe('Toppings Management', () => {
  // Test: See a list of available toppings
  test('displays a list of available toppings', () => {
    // Render the Toppings component
    // Pass in initial toppings as a prop if needed
    // Check if the list is displayed with the correct toppings
  });

  // Test: Add a new topping
  test('adds a new topping', () => {
    // Render the Toppings component
    // Simulate user input for a new topping
    // Click on the "Add Topping" button
    // Check if the new topping has been added to the list
  });

  // Test: Delete an existing topping
  test('deletes an existing topping', () => {
    // Render the Toppings component
    // Simulate user click on the "Delete" button for a specific topping
    // Check if the topping has been removed from the list
  });

  // Test: Update an existing topping
  test('updates an existing topping', () => {
    // Render the Toppings component
    // Simulate user click on the "Edit" button for a specific topping
    // Change the topping name and save
    // Check if the topping has been updated in the list
  });

  // Test: Do not allow duplicate toppings
  test('does not allow duplicate toppings', () => {
    // Render the Toppings component
    // Simulate user input for an existing topping
    // Click on the "Add Topping" button
    // Check if an error message is displayed or the topping is not added to the list
  });
});

// test('renders list of available toppings', () => {
//   const toppings = [
//     { id: 1, name: 'Pepperoni' },
//     { id: 2, name: 'Mushrooms' },
//     { id: 3, name: 'Onions' },
//   ];

//   render(<Toppings toppings={toppings} />);

//   toppings.forEach((topping) => {
//     const toppingElement = screen.getByText(topping.name);
//     expect(toppingElement).toBeInTheDocument();
//   });
// });
