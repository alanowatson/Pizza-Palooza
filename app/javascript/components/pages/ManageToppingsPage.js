import React, { useState } from 'react';
import {
  handleAddTopping,
  handleDeleteTopping,
  handleSaveEditTopping,
} from '../helpers/toppingFunctions';

const ManageToppingsPage = ({ toppings, setToppings }) => {
  const [newTopping, setNewTopping] = useState('');
  const [editingTopping, setEditingTopping] = useState(null);
  const [editedToppingName, setEditedToppingName] = useState('');

  const startEditingTopping = (topping) => {
    setEditingTopping(topping.id);
    setEditedToppingName(topping.name);
  };

  const cancelEditTopping = () => {
    setEditingTopping(null);
    setEditedToppingName('');
  };

  // const handleAddPizza = async (event) => {
  //   console.log('handleAddPizza called');
  //   event.preventDefault();
  //   const response = await axios.post('http://localhost:3000/api/v1/pizzas', {
  //     name,
  //     topping_ids: selectedToppings,
  //   });
  //   setPizzas([...pizzas, response.data]);
  //   setName('');
  //   setSelectedToppings([]);
  // };

  return (
    <div>
      <h1>Manage Toppings</h1>
      <form
        onSubmit={(e) =>
          handleAddTopping(e, toppings, newTopping, setNewTopping, setToppings)
        }
      >
        <label htmlFor='topping-name' data-testid='topping-create-name'>
          New topping name:
        </label>
        <input
          type='text'
          id='topping-name'
          value={newTopping}
          onChange={(event) => setNewTopping(event.target.value)}
          placeholder='New topping name'
        />
        <button type='submit'>Add Topping</button>
      </form>
      <ul>
        {toppings.map((topping) => (
          <li key={topping.id}>
            {editingTopping === topping.id ? (
              <form
                onSubmit={(e) =>
                  handleSaveEditTopping(
                    e,
                    topping,
                    editedToppingName,
                    toppings,
                    setToppings,
                    cancelEditTopping
                  )
                }
              >
                <input
                  type='text'
                  value={editedToppingName}
                  onChange={(event) => setEditedToppingName(event.target.value)}
                />
                <button type='submit'>Save</button>
                <button type='button' onClick={cancelEditTopping}>
                  Cancel
                </button>
              </form>
            ) : (
              <div>
                {topping.name}{' '}
                <button onClick={() => startEditingTopping(topping)}>
                  Edit
                </button>{' '}
                <button
                  onClick={() =>
                    handleDeleteTopping(topping.id, toppings, setToppings)
                  }
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

export default ManageToppingsPage;
