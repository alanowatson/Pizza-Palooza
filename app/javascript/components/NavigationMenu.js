import React from 'react';
import { Link } from 'react-router-dom';

const NavigationMenu = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/create-pizza'>Create Pizza</Link>
        </li>
        <li>
          <Link to='/manage-toppings'>Manage Toppings</Link>
        </li>
        <li>
          <Link to='/view-pizzas'>Pizza Menu</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationMenu;
