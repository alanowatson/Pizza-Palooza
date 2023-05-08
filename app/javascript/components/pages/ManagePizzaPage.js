import React, { useState, useEffect } from 'react';
import {
  handleDeletePizza,
  handleSaveEditPizza,
} from '../helpers/pizzaFunctions';
import axios from 'axios';

const ManagePizzaPage = ({ pizzas, setPizzas, toppings }) => {
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [name, setName] = useState('');
  const [editingPizza, setEditingPizza] = useState(null);
  const [editedPizzaName, setEditedPizzaName] = useState('');
  const [editedPizzaToppings, setEditedPizzaToppings] = useState([]);

  const startEditingPizza = (pizza) => {
    setEditingPizza(pizza.id);
    setEditedPizzaName(pizza.name);
    setEditedPizzaToppings(pizza.toppings);
  };

  const cancelEditPizza = () => {
    setEditingPizza(null);
    setEditedPizzaName('');
    setEditedPizzaToppings([]);
  };

  const handleToppingChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedToppings([...selectedToppings, +value]);
    } else {
      setSelectedToppings(
        selectedToppings.filter((topping) => topping !== +value)
      );
    }
  };

  const handleToppingChangeEdit = (event) => {
    const { value, checked } = event.target;
    const changedTopping = toppings.find((t) => t.id === +value);
    if (checked) {
      setEditedPizzaToppings([...editedPizzaToppings, changedTopping]);
    } else {
      setEditedPizzaToppings(
        editedPizzaToppings.filter((topping) => topping.id !== +value)
      );
    }
  };

  const handleAddPizza = async (event) => {
    console.log('handleAddPizza called');
    event.preventDefault();
    const response = await axios.post('http://localhost:3000/api/v1/pizzas', {
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
      <form onSubmit={(e) => handleAddPizza(e)}>
        <div>
          <label htmlFor='name' data-testid='pizza-create-name'>
            Pizza name:
          </label>
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
                checked={selectedToppings.includes(topping.id)}
                onChange={handleToppingChange}
              />
              <label htmlFor={`topping-${topping.id}`}>{topping.name}</label>
            </div>
          ))}
        </div>
        <button type='submit' data-testid='create-btn'>
          Create Pizza
        </button>
      </form>
      <h2>Existing Pizzas</h2>
      <ul>
        {pizzas.map((pizza) => (
          <li key={pizza.id} data-testid='menu-item'>
            {editingPizza === pizza.id ? (
              <form
                onSubmit={(e) => {
                  handleSaveEditPizza(
                    e,
                    pizza,
                    editedPizzaName,
                    editedPizzaToppings,
                    [...pizzas],
                    setPizzas,
                    cancelEditPizza
                  );
                }}
              >
                <div>
                  <label htmlFor='name'>Pizza name:</label>
                  <input
                    type='text'
                    id='name'
                    value={editedPizzaName}
                    onChange={(e) => setEditedPizzaName(e.target.value)}
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
                        checked={editedPizzaToppings
                          .map((t) => t.id)
                          .includes(topping.id)}
                        onChange={handleToppingChangeEdit}
                      />
                      <label htmlFor={`topping-${topping.id}`}>
                        {topping.name}
                      </label>
                    </div>
                  ))}
                </div>
                <button type='submit'>Save Pizza</button>
                <button type='button' onClick={cancelEditPizza}>
                  Cancel
                </button>
              </form>
            ) : (
              <div>
                {pizza.name} - Toppings:{' '}
                {pizza.toppings.map((topping) => topping.name).join(', ')}
                <button onClick={() => startEditingPizza(pizza)}>
                  Edit
                </button>{' '}
                <button
                  data-testid='delete-btn'
                  onClick={() => handleDeletePizza(pizza.id, pizzas, setPizzas)}
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManagePizzaPage;
