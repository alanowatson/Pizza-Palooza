import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import ManagePizzaPage from '../pages/ManagePizzaPage';
import { unmountComponentAtNode } from 'react-dom';
let container = null;

describe('Pizza Management', () => {
  let setPizzas, toppings, pizzas;
  beforeEach(() => {
    setPizzas = jest.fn();

    toppings = [
      { id: 1, name: 'Pepperoni' },
      { id: 2, name: 'Mushrooms' },
      { id: 3, name: 'Onions' },
      { id: 4, name: 'Sausage' },
      { id: 5, name: 'Bell Peppers' },
      { id: 6, name: 'Olives' },
    ];
    pizzas = [
      { id: 1, name: 'Pepperoni', toppings: [{ id: 1, name: 'Pepperoni' }] },
      { id: 2, name: 'Mushroom', toppings: [{ id: 2, name: 'Mushroom' }] },
      {
        id: 3,
        name: 'Vegetarian',
        toppings: [
          { id: 2, name: 'Mushroom' },
          { id: 3, name: 'Onions' },
          { id: 6, name: 'Olives' },
        ],
      },
    ];
  });

  // Test: See a list of available toppings
  test('renders a list of existing pizzas', async () => {
    await render(<ManagePizzaPage {...{ pizzas, toppings }} />);

    const menuItems = await screen.getAllByTestId('listitem');
    expect(menuItems).toHaveLength(pizzas.length);
  });

  test('adds a new pizza', async () => {
    const user = userEvent.setup();

    await render(<ManagePizzaPage {...{ pizzas, setPizzas, toppings }} />);
    act(async () => {
      await user.type(screen.getByLabelText('Pizza name:'), 'Odd Pizza');
      await user.click(screen.getByText('Onions'));
      await user.click(screen.getByText('Create Pizza'));
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(setPizzas).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: 'Odd Pizza',
          toppings: expect.arrayContaining([
            expect.objectContaining({
              name: 'Onions',
            }),
          ]),
        }),
      ])
    );
  });

  // Test: Delete an existing topping
  test('deletes an existing pizzas', async () => {
    const user = userEvent.setup();

    await render(<ManagePizzaPage {...{ pizzas, setPizzas, toppings }} />);
    // why does this not work???
    const intialMenuItems = screen.getAllByTestId('listitem');

    act(async () => {
      await user.click([...screen.findAllByTestId('delete-btn')][0]);
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await user.keyboard('[Enter]');

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const updatedMenuItems = screen.getAllByTestId('listitem');

    expect(updatedMenuItems).toHaveLength(intialMenuItems.length - 1);
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
