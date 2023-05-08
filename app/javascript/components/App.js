import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/HomePage';
import ManagePizzaPage from './pages/ManagePizzaPage';
import ManageToppingsPage from './pages/ManageToppingsPage';
import NavigationMenu from './NavigationMenu';
import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pizzas, setPizzas] = useState([]);
  const [toppings, setToppings] = useState([]);

  const fetchPizzas = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/v1/pizzas`);
      setPizzas(response.data);
    } catch (error) {
      console.error('Error fetching pizzas:', error);
    }
  };

  const fetchToppings = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/v1/toppings`);
      setToppings(response.data);
    } catch (error) {
      console.error('Error fetching toppings:', error);
    }
  };

  useEffect(() => {
    fetchPizzas();
    fetchToppings();
  }, []);

  return (
    <Router>
      <div>
        <NavigationMenu isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route
            path='/manage-pizzas'
            element={<ManagePizzaPage {...{ pizzas, setPizzas, toppings }} />}
          />
          <Route
            path='/manage-toppings'
            element={<ManageToppingsPage {...{ toppings, setToppings }} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
