import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.scss';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.css';
import 'react-tooltip/dist/react-tooltip.css'
import 'jquery/dist/jquery.min.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


