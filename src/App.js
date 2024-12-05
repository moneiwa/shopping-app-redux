

import React from 'react';
import { BrowserRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store from './store/store';
import './App.css';
import AddShoppingItem from './components/AddShoppingItem';
import ShoppingList from './components/ShoppingList';
import Login from './Login';
import Register from './Register';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<ShoppingList/>} /> 
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

// ProtectedRoute component to handle authentication
const ProtectedRoute = ({ component: Component }) => {
  const isAuthenticated = useSelector(state => state.user.user !== null);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Component />;
};

// ShoppingApp component
const ShoppingApp = () => (
  <>
    <h1>Shopping List</h1>
    <AddShoppingItem />
    <ShoppingList />
  </>
);

export default App;
