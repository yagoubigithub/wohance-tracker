import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import axios from "axios"
import {createStore,applyMiddleware,compose}  from 'redux';
import {Provider} from "react-redux"

import rootReducer from './store/reducers/rootReducer'
import thunk from 'redux-thunk';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)))

axios.defaults.baseURL = 'http://127.0.0.1:4001/api';

ReactDOM.render(
  <React.StrictMode>
     <Provider store={store}>
  <App />
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


