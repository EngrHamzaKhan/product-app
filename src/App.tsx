import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store/store';
import { clearTokens } from './store/authSlice';
import Login from './components/Login';
import Product from './components/Product';

const App: React.FC = () => {
  const tokens = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearTokens()); // Clear tokens from Redux
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={tokens.accessToken ? <Product /> : <Login />}
          />
          <Route
            path="/product"
            element={tokens.accessToken ? <Product /> : <Login />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
