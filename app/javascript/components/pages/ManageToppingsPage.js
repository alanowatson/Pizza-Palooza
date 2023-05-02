// ManageToppings.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageToppings = () => {
  const [toppings, setToppings] = useState([]);

  useEffect(() => {
    const fetchToppings = async () => {
      try {
        const response = await axios.get('/api/v1/toppings');
        setToppings(response.data);
      } catch (error) {
        console.error('Error fetching toppings:', error);
      }
    };

    fetchToppings();
  }, []);

  return (
    <div>
      <h1>Manage Toppings</h1>
      <ul>
        {toppings.map((topping) => (
          <li key={topping.id}>{topping.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ManageToppings;
