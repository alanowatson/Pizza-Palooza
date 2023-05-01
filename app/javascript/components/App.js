import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/HomePage';
import CreatePizzaPage from './pages/CreatePizzaPage';
import ManageToppingsPage from './pages/ManageToppingsPage';
import ViewPizzaPage from './pages/ViewPizzaPage';
import NavigationMenu from './NavigationMenu';

const App = () => {
  return (
    <Router>
      <div>
        <NavigationMenu />
        <Homepage />
        <Routes>
          <Route path='/create-pizza' element={<CreatePizzaPage />} />
          <Route path='/manage-toppings' element={<ManageToppingsPage />} />
          <Route path='/view-pizzas' element={<ViewPizzaPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
