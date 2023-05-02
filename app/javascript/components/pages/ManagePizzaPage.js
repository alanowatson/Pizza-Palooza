import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManagePizzas = () => {
  const [pizzas, setPizzas] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const pizzaResponse = await axios.get('/api/v1/pizzas');
      setPizzas(pizzaResponse.data);

      const toppingResponse = await axios.get('/api/v1/toppings');
      setToppings(toppingResponse.data);
    };
    fetchData();
  }, []);

  const handleToppingChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedToppings([...selectedToppings, value]);
    } else {
      setSelectedToppings(
        selectedToppings.filter((topping) => topping !== value)
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post('/api/v1/pizzas', {
      name,
      topping_ids: selectedToppings,
    });
    setPizzas([...pizzas, response.data]);
    setName('');
    setSelectedToppings([]);
  };

  return (
    <div>
      <h1>Manage Pizzas</h1>
      <h2>Create a new pizza</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='name'>Pizza name:</label>
          <input
            type='text'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Toppings:</label>
          {toppings.map((topping) => (
            <div key={topping.id}>
              <input
                type='checkbox'
                id={`topping-${topping.id}`}
                value={topping.id}
                checked={selectedToppings.includes(topping.id.toString())}
                onChange={handleToppingChange}
              />
              <label htmlFor={`topping-${topping.id}`}>{topping.name}</label>
            </div>
          ))}
        </div>
        <button type='submit'>Create Pizza</button>
      </form>
      <h2>Existing Pizzas</h2>
      <ul>
        {pizzas.map((pizza) => (
          <li key={pizza.id}>
            {pizza.name} - Toppings:{' '}
            {pizza.toppings.map((topping) => topping.name).join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManagePizzas;
