import axios from 'axios';
// const csrfToken = document.querySelector('[name="csrf-token"]').content;
// axios.defaults.headers.common['X-CSRF-Token'] = csrfToken;

export const fetchToppings = async (setToppings) => {
  const response = await axios.get('/api/v1/toppings');
  setToppings(response.data);
};

export const handleAddTopping = async (
  event,
  toppings,
  newTopping,
  setNewTopping,
  setToppings
) => {
  event.preventDefault();

  const [toppingInvalid, errorMessage] = invalidTopping(newTopping, toppings);
  if (toppingInvalid) {
    alert(errorMessage);
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

export const handleSaveEditTopping = async (
  event,
  topping,
  editedToppingName,
  prevToppings,
  setToppings,
  cancelEditTopping
) => {
  event.preventDefault();

  const [toppingInvalid, errorMessage] = invalidTopping(
    editedToppingName,
    prevToppings
  );
  if (toppingInvalid) {
    alert(errorMessage);
    return;
  }
  try {
    await updateTopping(event, topping.id, editedToppingName, setToppings);

    const updatedToppings = prevToppings.map((prevTopping) => {
      if (prevTopping.id === topping.id) {
        prevTopping.name = editedToppingName;
      }
      return prevTopping;
    });
    setToppings(updatedToppings);
    cancelEditTopping();
  } catch (error) {
    alert('Error updating topping: ' + error.message);
  }
};

const updateTopping = async (event, toppingId, editedToppingName) => {
  event.preventDefault();
  try {
    await axios.put(`/api/v1/toppings/${toppingId}`, {
      name: editedToppingName,
    });
  } catch (error) {
    alert('Error updating topping: ' + error.message);
  }
};

export const handleDeleteTopping = async (id, toppings, setToppings) => {
  const confirmDelete = window.confirm(
    'Are you sure you want to delete this topping? Doing so will delete all pizzas with this topping'
  );
  if (confirmDelete) {
    try {
      await axios.delete(`/api/v1/toppings/${id}`);

      // Remove the deleted topping from the state
      setToppings(toppings.filter((topping) => topping.id !== id));
    } catch (error) {
      // Display the error message in an alert
      alert('Error deleting topping: ' + error.message);
    }
  }
};

const invalidTopping = (newTopping, toppings) => {
  let errorMessage;
  if (newTopping.trim() === '') {
    errorMessage = 'Topping name cannot be blank.';
    return [true, errorMessage];
  }

  const normalizedNewTopping = newTopping.toLowerCase();
  if (
    toppings.some(
      (topping) => topping.name.toLowerCase() === normalizedNewTopping
    )
  ) {
    errorMessage = 'Topping already exists.';
    return [true, errorMessage];
  }

  return [false, errorMessage];
};
