import axios from 'axios';

export const fetchPizzas = async (setPizzas) => {
  try {
    const response = await axios.get('/api/v1/pizzas');
    setPizzas(response.data);
  } catch (error) {
    console.error('Error fetching pizzas:', error);
  }
};

export const handleAddPizza = async (
  event,
  name,
  setName,
  selectedToppings,
  setSelectedToppings,
  pizzas,
  setPizzas
) => {
  event.preventDefault();
  const response = await axios.post('/api/v1/pizzas', {
    name,
    topping_ids: selectedToppings,
  });
  setPizzas([...pizzas, response.data]);
  setName('');
  setSelectedToppings([]);
};

// export const handleDeletePizza = async (id, pizzas, setPizzas) => {
//   const confirmDelete = window.confirm(
//     'Are you sure you want to delete this pizza?'
//   );
//   if (confirmDelete) {
//     try {
//       await axios.delete(`/api/v1/pizzas/${id}`);

//       // Remove the deleted topping from the state
//       setPizzas(pizzas.filter((pizza) => pizza.id !== id));
//     } catch (error) {
//       // Display the error message in an alert
//       alert('Error deleting topping: ' + error.message);
//     }
//   }
// };
