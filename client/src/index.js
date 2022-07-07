import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from "./pages/components/states/postReducer";
import navReducer from './pages/components/states/navReducer';
import addPostBtnReducer from './pages/components/states/addPostBtnReducer';
const store = configureStore({
  reducer: {
    posts: postsReducer,
    nav: navReducer,
    addPostBtn: addPostBtnReducer
  }
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
