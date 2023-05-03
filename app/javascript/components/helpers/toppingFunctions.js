import axios from 'axios';

export const fetchToppings = async (setToppings) => {
  const response = await axios.get('/api/v1/toppings');
  setToppings(response.data);
};

export const handleDeleteTopping = async (id, setToppings) => {
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

export const handleAddTopping = async (event, newTopping, setToppings) => {
  event.preventDefault();

  if (newTopping.trim() === '') {
    alert('Topping name cannot be blank.');
    return;
  }

  const normalizedNewTopping = newTopping.toLowerCase();
  if (
    toppings.some(
      (topping) => topping.name.toLowerCase() === normalizedNewTopping
    )
  ) {
    alert('Topping already exists.');
    return;
  }

  // Check if we're adding a singular/plural duplicate
  if (
    toppings.some(
      (topping) =>
        topping.name.toLowerCase().slice(-1).includes(normalizedNewTopping) ||
        normalizedNewTopping.slice(-1).includes(topping.name.toLowerCase())
    )
  ) {
    alert('That topping is likely an existing topping.');
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
