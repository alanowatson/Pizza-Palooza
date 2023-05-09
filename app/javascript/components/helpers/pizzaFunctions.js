import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';

export const handleDeletePizza = async (id, pizzas, setPizzas) => {
  const confirmDelete = window.confirm(
    'Are you sure you want to delete this pizza?'
  );
  if (confirmDelete) {
    try {
      await axios.delete(`${apiUrl}/api/v1/pizzas/${id}`);
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

  const [pizzaInvalid, errorMessage] = invalidPizza(
    editedPizzaName,
    editedPizzaToppings,
    prevPizzas,
    pizza
  );
  if (pizzaInvalid) {
    alert(errorMessage);
    return;
  }
  try {
    await updatePizza(event, pizza.id, editedPizzaName, editedPizzaToppings);
    const updatedPizzas = prevPizzas.map((prevPizza) => {
      if (prevPizza.id === pizza.id) {
        prevPizza.name = editedPizzaName;
        prevPizza.toppings = editedPizzaToppings;
      }
      return prevPizza;
    });

    setPizzas(updatedPizzas);
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
    await axios.put(`${apiUrl}/api/v1/pizzas/${pizzaId}`, {
      name: editedPizzaName,
      topping_ids: editedPizzaToppings.map((t) => t.id),
    });
  } catch (error) {
    alert('Error updating topping: ' + error.message);
  }
};

export const invalidPizza = (
  newPizzaName,
  newToppings,
  prevPizzas,
  pizza = null
) => {
  let errorMessage;

  if (newPizzaName.trim() === '') {
    errorMessage = 'Pizza name cannot be blank.';
    return [true, errorMessage];
  }

  const otherPizzas = pizza
    ? prevPizzas.filter((prevPizza) => prevPizza.id !== pizza.id)
    : prevPizzas;

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
      const otherPizzaToppingIds = otherPizza.toppings.map((t) => t.id);
      console.log('otherPizzaToppingIds', otherPizzaToppingIds);
      const newToppingIds = newToppings.map((n) => n.id);
      console.log('newToppingIds', newToppingIds);

      return (
        otherPizza.toppings.length === newToppings.length &&
        otherPizzaToppingIds.every((toppingId) =>
          newToppingIds.includes(toppingId)
        )
      );
    })
  ) {
    errorMessage =
      'There is a pizza with the exact set of toppings already on the menu.';
    return [true, errorMessage];
  }

  return [false, errorMessage];
};
