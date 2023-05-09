import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import ManageToppingsPage from '../pages/ManageToppingsPage';
import { unmountComponentAtNode } from 'react-dom';

let container = null;
let setToppings, toppings;
describe('Toppings Management', () => {
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);

    setToppings = jest.fn();

    toppings = [
      { id: 1, name: 'Pepperoni' },
      { id: 2, name: 'Mushrooms' },
      { id: 3, name: 'Onions' },
      { id: 4, name: 'Sausage' },
      { id: 5, name: 'Bell Peppers' },
      { id: 6, name: 'Olives' },
    ];
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });
  // Test: See a list of available toppings
  test('displays a list of available toppings', async () => {
    render(<ManageToppingsPage {...{ toppings, setToppings }} />, container);

    const menuItems = await screen.findAllByRole('listitem');
    expect(menuItems).toHaveLength(toppings.length);
  });

  // Test: Delete an existing topping
  test('deletes an existing topping', async () => {
    const user = userEvent.setup();
    window.confirm = jest.fn(() => true); // always click 'yes'

    render(<ManageToppingsPage {...{ toppings, setToppings }} />, container);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    act(async () => {
      const deleteBtns = await screen.findAllByTestId('delete-btn');
      const firstBtn = deleteBtns[0];
      await user.click(firstBtn);
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(window.confirm).toBeCalled();

    expect(setToppings).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.not.objectContaining({
          id: 1,
        }),
      ])
    );
  });

  test('adds a new topping', async () => {
    const user = userEvent.setup();

    render(<ManageToppingsPage {...{ toppings, setToppings }} />, container);
    act(async () => {
      await user.type(
        screen.findByLabelText('New topping name:'),
        'Odd Topping'
      );
      await user.click(screen.findByText('Add Topping'));
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));

    expect(setToppings).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: 'Odd Topping',
        }),
      ])
    );
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
