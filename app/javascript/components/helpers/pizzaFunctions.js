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

export const handleDeletePizza = async (id, pizzas, setPizzas) => {
  const confirmDelete = window.confirm(
    'Are you sure you want to delete this pizza?'
  );
  if (confirmDelete) {
    try {
      await axios.delete(`/api/v1/pizzas/${id}`);
      setPizzas(pizzas.filter((pizza) => pizza.id !== id));
    } catch (error) {
      alert('Error deleting topping: ' + error.message);
    }
  }
};

export const handleSaveEditPizza = async (
  event,
  pizza,
  editedPizzaName,
  editedPizzaToppings,
  prevPizzas,
  setPizzas,
  cancelEditPizza
) => {
  event.preventDefault();

  ////// not working.
  const [pizzaInvalid, errorMessage] = invalidPizza(
    pizza,
    editedPizzaName,
    editedPizzaToppings,
    prevPizzas
  );
  if (pizzaInvalid) {
    alert(errorMessage);
    return;
  }
  try {
    await updatePizza(event, pizza.id, editedPizzaName, editedPizzaToppings);
    console.log(prevPizzas);
    const updatedPizzas = prevPizzas.map((prevPizza) => {
      if (prevPizza.id === pizza.id) {
        prevPizza.name = editedPizzaName;
        prevPizza.toppings = editedPizzaToppings;
      }
      return prevPizza;
    });
    console.log('pizzas before Update', updatedPizzas);

    setPizzas(updatedPizzas);
    console.log('pizzas updated', updatedPizzas);
    cancelEditPizza();
  } catch (error) {
    alert('Error updating topping: ' + error.message);
  }
};

const updatePizza = async (
  event,
  pizzaId,
  editedPizzaName,
  editedPizzaToppings
) => {
  event.preventDefault();
  try {
    await axios.put(`/api/v1/pizzas/${pizzaId}`, {
      name: editedPizzaName,
      topping_ids: editedPizzaToppings.map((t) => t.id),
    });
  } catch (error) {
    alert('Error updating topping: ' + error.message);
  }
};

const invalidPizza = (pizza, newPizzaName, newToppings, prevPizzas) => {
  let errorMessage;
  if (newPizzaName.trim() === '') {
    errorMessage = 'Pizza name cannot be blank.';
    return [true, errorMessage];
  }

  const otherPizzas = prevPizzas.filter((p) => {
    p.id !== pizza.id;
  });
  const normalizedNewPizza = newPizzaName.toLowerCase();

  if (
    otherPizzas.some(
      (otherPizza) => otherPizza.name.toLowerCase() === normalizedNewPizza
    )
  ) {
    errorMessage = 'New Pizza name already exists elsewhere on the menu.';
    return [true, errorMessage];
  }

  // check for toppings match on the menu
  if (
    otherPizzas.some((otherPizza) => {
      otherPizza.toppings.length === newToppings.length &&
        otherPizza.toppings.every((topping) => newToppings.includes(topping));
    })
  ) {
    errorMessage =
      'There is a pizza with the exact set of toppings already on the menu.';
    return [true, errorMessage];
  }

  return [false, errorMessage];
};
