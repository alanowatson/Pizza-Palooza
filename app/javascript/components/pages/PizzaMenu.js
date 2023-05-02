import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PizzaMenu = () => {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await axios.get('/api/v1/pizzas');
        setPizzas(response.data);
      } catch (error) {
        console.error('Error fetching pizzas:', error);
      }
    };

    fetchPizzas();
  }, []);

  return (
    <div>
      <h1>Here are all the Pizzas</h1>
      <ul>
        {pizzas.map((pizza) => (
          <li key={pizza.id}>{pizza.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PizzaMenu;
