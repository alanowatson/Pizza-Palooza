import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageToppings = () => {
  const [toppings, setToppings] = useState([]);
  const [newTopping, setNewTopping] = useState('');

  useEffect(() => {
    fetchToppings();
  }, []);

  const fetchToppings = async () => {
    const response = await axios.get('/api/v1/toppings');
    setToppings(response.data);
  };

  const handleDeleteTopping = async (id) => {
    try {
      await axios.delete(`/api/v1/toppings/${id}`);

      // Remove the deleted topping from the state
      setToppings(toppings.filter((topping) => topping.id !== id));
    } catch (error) {
      // Display the error message in an alert
      alert('Error deleting topping: ' + error.message);
    }
  };

  const handleAddTopping = async (event) => {
    event.preventDefault();

    if (newTopping.trim() === '') {
      alert('Topping name cannot be blank.');
      return;
    }

    const normalizedNewTopping = newTopping.toLowerCase();
    if (
      toppings.some(
        (topping) => topping.name.toLowerCase() === normalizedNewTopping
      )
    ) {
      alert('Topping already exists.');
      return;
    }

    // Check if we're adding a singular/plural duplicate
    if (
      toppings.some(
        (topping) =>
          topping.name.toLowerCase().slice(-1).includes(normalizedNewTopping) ||
          normalizedNewTopping.slice(-1).includes(topping.name.toLowerCase())
      )
    ) {
      alert('That topping is likely an existing topping.');
      return;
    }

    try {
      const response = await axios.post('/api/v1/toppings', {
        name: newTopping,
      });

      setToppings([...toppings, response.data]);

      setNewTopping('');
    } catch (error) {
      alert('Error adding topping: ' + error.message);
    }
  };

  return (
    <div>
      <h1>Manage Toppings</h1>
      <form onSubmit={handleAddTopping}>
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
            <button onClick={() => handleDeleteTopping(topping.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageToppings;
