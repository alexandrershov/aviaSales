import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';

import App from './components/App/App';
import { store } from './components/store/store';
import logo from './Logo.svg';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <div className="logo">
        <img alt="sry logo do not loaded..." src={logo} />
      </div>
      <App />
    </Provider>
  </React.StrictMode>,
);
