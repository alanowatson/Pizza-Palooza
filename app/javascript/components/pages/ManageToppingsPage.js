import React, { useState, useEffect } from 'react';
import {
  fetchToppings,
  handleAddTopping,
  handleDeleteTopping,
} from '../helpers/toppingFunctions';

import axios from 'axios';

const ManageToppings = () => {
  const [toppings, setToppings] = useState([]);
  const [newTopping, setNewTopping] = useState('');

  useEffect(() => {
    fetchToppings(setToppings);
  }, []);

  return (
    <div>
      <h1>Manage Toppings</h1>
      <form onSubmit={(e) => handleAddTopping(e, newTopping, setToppings)}>
        <input
          type='text'
          value={newTopping}
          onChange={(event) => setNewTopping(event.target.value)}
          placeholder='New topping name'
        />
        <button type='submit'>Add Topping</button>
      </form>
      <ul>
        {toppings.map((topping) => (
          <li key={topping.id}>
            {topping.name}{' '}
            <button
              onClick={() => handleDeleteTopping(topping.id, setToppings)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageToppings;
