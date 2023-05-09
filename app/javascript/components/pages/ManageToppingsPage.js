import React, { useState } from 'react';
import {
  handleAddTopping,
  handleDeleteTopping,
  handleSaveEditTopping,
} from '../helpers/toppingFunctions';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

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

  return (
    <div>
      <h1>Manage Toppings</h1>
      <Form
        onSubmit={(e) =>
          handleAddTopping(e, toppings, newTopping, setNewTopping, setToppings)
        }
      >
        <Card style={{ padding: '10px', width: '18rem', margin: '25px' }}>
          <Card.Body>
            <Card.Title>Add topping</Card.Title>
            <label
              htmlFor='topping-name'
              data-testid='topping-create-name'
            ></label>
            <input
              type='text'
              id='topping-name'
              data-test='new-topping'
              value={newTopping}
              onChange={(event) => setNewTopping(event.target.value)}
              placeholder='New topping name'
            />{' '}
            <Button
              style={{ marginTop: '25px' }}
              variant='outline-danger'
              type='submit'
            >
              Add Topping
            </Button>
          </Card.Body>
        </Card>
      </Form>
      <ul className='available-toppings'>
        {toppings.map((topping) => (
          <Card key={topping.id} style={{ padding: '10px', width: '18rem' }}>
            {editingTopping === topping.id ? (
              <Form
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
                <Card.Body>
                  <input
                    type='text'
                    value={editedToppingName}
                    onChange={(event) =>
                      setEditedToppingName(event.target.value)
                    }
                  />
                  <Button
                    variant='outline-danger'
                    type='button'
                    onClick={cancelEditTopping}
                  >
                    Cancel
                  </Button>
                  <Button
                    style={{ margin: '5px' }}
                    variant='outline-danger'
                    type='submit'
                  >
                    Save
                  </Button>
                </Card.Body>
              </Form>
            ) : (
              <div>
                {topping.name}{' '}
                <Button
                  style={{ margin: '5px' }}
                  variant='outline-danger'
                  onClick={() => startEditingTopping(topping)}
                >
                  Edit
                </Button>{' '}
                <Button
                  style={{ margin: '5px' }}
                  variant='outline-danger'
                  data-testid='delete-btn'
                  onClick={() =>
                    handleDeleteTopping(topping.id, toppings, setToppings)
                  }
                >
                  Delete
                </Button>
              </div>
            )}
          </Card>
        ))}
      </ul>
    </div>
  );
};

export default ManageToppingsPage;
