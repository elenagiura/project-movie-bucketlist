import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from 'firebase';

import { firebaseConfig } from './databases';
import { BrowserRouter } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);

ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root')
);