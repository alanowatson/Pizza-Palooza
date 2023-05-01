import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Toppings from '../Toppings';

test('renders list of available toppings', () => {
  const toppings = [
    { id: 1, name: 'Pepperoni' },
    { id: 2, name: 'Mushrooms' },
    { id: 3, name: 'Onions' },
  ];

  render(<Toppings toppings={toppings} />);

  toppings.forEach((topping) => {
    const toppingElement = screen.getByText(topping.name);
    expect(toppingElement).toBeInTheDocument();
  });
});
