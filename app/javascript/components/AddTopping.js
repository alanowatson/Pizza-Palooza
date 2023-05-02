import React, { useState } from 'react';
import axios from 'axios';

const AddTopping = () => {
  const [toppingName, setToppingName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/v1/toppings', {
        name: toppingName,
      });
      if (response.data.error) {
        alert(response.data.error);
      } else {
        alert('Topping added successfully!');
        setToppingName('');
      }
    } catch (error) {
      console.error('Error adding topping:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add a new topping</h3>
      <input
        type='text'
        value={toppingName}
        onChange={(e) => setToppingName(e.target.value)}
        placeholder='Enter topping name'
      />
      <button type='submit'>Add Topping</button>
    </form>
  );
};

export default AddTopping;
