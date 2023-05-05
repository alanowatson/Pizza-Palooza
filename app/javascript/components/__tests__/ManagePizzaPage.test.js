import React from 'react';
import { render, screen } from '@testing-library/react';
import ManagePizzas from '../pages/ManagePizzaPage';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

test('renders a list of existing pizzas', async () => {
  const pizzas = [
    { id: 1, name: 'Pepperoni', toppings: [{ id: 1, name: 'Pepperoni' }] },
    { id: 2, name: 'Mushroom', toppings: [{ id: 2, name: 'Mushroom' }] },
    {
      id: 3,
      name: 'Vegetarian',
      toppings: [
        { id: 3, name: 'Mushroom' },
        { id: 4, name: 'Peppers' },
        { id: 5, name: 'Onions' },
      ],
    },
  ];

  render(<ManagePizzas pizzas={pizzas} />);

  const menuItems = await screen.findAllByRole('listitem', {
    className: 'menu-item',
  });
  expect(menuItems).toHaveLength(pizzas.length);
});

describe('Pizza Management', () => {
  // Test: See a list of available toppings
  test('displays a list of available pizzas', () => {});

  // Test: Add a new topping
  test('adds a new pizzas', () => {
    // Render the Toppings component
    // Simulate user input for a new topping
    // Click on the "Add Topping" button
    // Check if the new topping has been added to the list
  });

  // Test: Delete an existing topping
  test('deletes an existing pizzas', () => {
    // Render the Toppings component
    // Simulate user click on the "Delete" button for a specific topping
    // Check if the topping has been removed from the list
  });

  // Test: Update an existing topping
  test('updates an existing pizzas', () => {
    // Render the Toppings component
    // Simulate user click on the "Edit" button for a specific topping
    // Change the topping name and save
    // Check if the topping has been updated in the list
  });

  // Test: Do not allow duplicate toppings
  test('does not allow duplicate Pizza', () => {
    // Render the Toppings component
    // Simulate user input for an existing topping
    // Click on the "Add Topping" button
    // Check if an error message is displayed or the topping is not added to the list
  });
});
