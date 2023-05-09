import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import {
  handleDeletePizza,
  handleSaveEditPizza,
  handleAddPizza,
} from '../helpers/pizzaFunctions';

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

  const handleToppingChange = (event, currentToppings, setCurrentToping) => {
    const { value, checked } = event.target;
    const changedTopping = toppings.find((t) => t.id === +value);

    if (checked) {
      setCurrentToping([...currentToppings, changedTopping]);
    } else {
      setCurrentToping(
        currentToppings.filter((topping) => topping.id !== +value)
      );
    }
  };

  return (
    <div>
      <h1>Manage Pizzas</h1>

      <Form
        onSubmit={(e) =>
          handleAddPizza(
            e,
            name,
            pizzas,
            selectedToppings,
            setPizzas,
            setName,
            setSelectedToppings
          )
        }
      >
        <Card style={{ width: '25rem', margin: '15px' }}>
          <Card.Body>
            <Card.Title>Create a new pizza</Card.Title>
            <label htmlFor='name' data-testid='pizza-create-name'>
              Pizza name:
            </label>{' '}
            <div>
              <input
                type='text'
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <Card.Text>
              <label>Toppings:</label>
              {toppings.map((topping) => (
                <div key={topping.id}>
                  <input
                    type='checkbox'
                    id={`topping-${topping.id}`}
                    value={topping.id}
                    checked={selectedToppings
                      .map((t) => t.id)
                      .includes(topping.id)}
                    onChange={(e) =>
                      handleToppingChange(
                        e,
                        selectedToppings,
                        setSelectedToppings
                      )
                    }
                  />
                  <label htmlFor={`topping-${topping.id}`}>
                    {topping.name}
                  </label>
                </div>
              ))}
            </Card.Text>
            <Button
              variant='outline-danger'
              type='submit'
              data-testid='create-btn'
            >
              Create Pizza
            </Button>
          </Card.Body>
        </Card>
      </Form>
      <h2>Existing Pizzas</h2>
      <div>
        {pizzas.map((pizza) => (
          <div key={pizza.id}>
            {editingPizza === pizza.id ? (
              <Form
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
                <Card style={{ width: '18rem' }}>
                  <Card.Body>
                    <Card.Title>Pizza name:</Card.Title>
                    <label htmlFor='name'>Pizza name:</label>{' '}
                    <div>
                      <input
                        type='text'
                        id='name'
                        value={editedPizzaName}
                        onChange={(e) => setEditedPizzaName(e.target.value)}
                      />
                    </div>
                    <label>Toppings:</label>
                    <Card.Text>
                      {toppings.map((topping) => (
                        <div key={topping.id}>
                          <input
                            type='checkbox'
                            id={`topping-${topping.id}`}
                            value={topping.id}
                            checked={editedPizzaToppings
                              .map((t) => t.id)
                              .includes(topping.id)}
                            onChange={(e) =>
                              handleToppingChange(
                                e,
                                editedPizzaToppings,
                                setEditedPizzaToppings
                              )
                            }
                          />
                          <label htmlFor={`topping-${topping.id}`}>
                            {topping.name}
                          </label>
                        </div>
                      ))}
                    </Card.Text>
                    <Button variant='outline-danger' type='submit'>
                      Save Pizza
                    </Button>{' '}
                    <Button
                      variant='outline-danger'
                      type='button'
                      onClick={cancelEditPizza}
                    >
                      Cancel
                    </Button>{' '}
                  </Card.Body>
                </Card>
              </Form>
            ) : (
              <Card style={{ width: '25rem', margin: '15px' }}>
                <Card.Body>
                  <Card.Title>{pizza.name}</Card.Title>
                  <Card.Text>
                    - Toppings:{' '}
                    {pizza.toppings.map((topping) => topping.name).join(', ')}
                  </Card.Text>
                  <Button
                    variant='outline-danger'
                    onClick={() => startEditingPizza(pizza)}
                  >
                    Edit
                  </Button>{' '}
                  <Button
                    variant='outline-danger'
                    data-testid='delete-btn'
                    onClick={() =>
                      handleDeletePizza(pizza.id, pizzas, setPizzas)
                    }
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagePizzaPage;
