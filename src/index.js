import React  from 'react';
import ReactDOM from 'react-dom';
import SearchMovie from './components/SearchMovie';
import registerServiceWorker from './registerServiceWorker';
import './index.css';


ReactDOM.render(<SearchMovie />, document.getElementById('root'));
registerServiceWorker();

