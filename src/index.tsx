import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './client/App';
import './client/index.css';
import registerServiceWorker from './client/registerServiceWorker';


ReactDOM.render(<App />, document.getElementById('root') as HTMLElement);

registerServiceWorker();
