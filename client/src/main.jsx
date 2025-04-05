// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Correct import
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import './index.css' 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter> {/* This provides routing context */}
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);