import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Variable } from "./Context/Variable";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Variable>         
      <App />
    </Variable>
  </React.StrictMode>
);
