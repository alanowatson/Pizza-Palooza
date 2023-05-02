import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/HomePage';
import CreatePizzaPage from './pages/CreatePizzaPage';
import ManageToppingsPage from './pages/ManageToppingsPage';
import PizzaMenu from './pages/PizzaMenu';
import NavigationMenu from './NavigationMenu';

const App = () => {
  return (
    <Router>
      <div>
        <NavigationMenu />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/create-pizza' element={<CreatePizzaPage />} />
          <Route path='/manage-toppings' element={<ManageToppingsPage />} />
          <Route path='/menu' element={<PizzaMenu />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
