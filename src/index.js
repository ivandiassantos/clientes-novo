import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './componentes/login/Login';
import App from './App';
import CadastrarCliente from './componentes/clientes/CadastrarCliente';

ReactDOM.render(
    <Router>
        <div>
            <Route path="/" exact component={Login}/>
            <Route path="/principal/" component={App}/>
            <Route path="/cadastrar/" component={CadastrarCliente}/>
        </div>
    </Router>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
