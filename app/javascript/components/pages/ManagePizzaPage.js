import React, { useState, useEffect } from 'react';
import {
  fetchPizzas,
  handleAddPizza,
  handleDeletePizza,
  handleSaveEditPizza,
} from '../helpers/pizzaFunctions';
import { fetchToppings } from '../helpers/toppingFunctions';

const ManagePizzas = () => {
  const [pizzas, setPizzas] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [name, setName] = useState('');
  const [editingPizza, setEditingPizza] = useState(null);
  const [editedPizzaName, setEditedPizzaName] = useState('');
  const [editedPizzaToppings, setEditedPizzaToppings] = useState([]);

  const startEditingPizza = (pizza) => {
    setEditingPizza(pizza.id);
    setEditedPizzaName(pizza.name);
    setEditedPizzaToppings(pizza.toppings.map((t) => t.id));
  };

  const cancelEditPizza = () => {
    setEditingPizza(null);
    setEditedPizzaName('');
    setEditedPizzaToppings([]);
  };

  useEffect(() => {
    fetchPizzas(setPizzas);
    fetchToppings(setToppings);
  }, []);

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
    if (checked) {
      setEditedPizzaToppings([...editedPizzaToppings, +value]);
    } else {
      setEditedPizzaToppings(
        editedPizzaToppings.filter((topping) => topping !== +value)
      );
    }
  };

  return (
    <div>
      <h1>Manage Pizzas</h1>
      <h2>Create a new pizza</h2>
      <form
        onSubmit={(e) =>
          handleAddPizza(
            e,
            name,
            setName,
            selectedToppings,
            setSelectedToppings,
            pizzas,
            setPizzas
          )
        }
      >
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
                checked={selectedToppings.includes(topping.id)}
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
            {editingPizza === pizza.id ? (
              <form
                onSubmit={(e) => {
                  handleSaveEditPizza(
                    e,
                    pizza,
                    editedPizzaName,
                    editedPizzaToppings,
                    pizzas,
                    setPizzas,
                    cancelEditPizza()
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
                        checked={editedPizzaToppings.includes(topping.id)}
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

export default ManagePizzas;
