import React, { Component } from 'react';
import {Link} from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark static-top">
          <a className="navbar-brand mr-1" href="index.html">Cadastro e Clientes</a>
          <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
          </form>
          <ul className="navbar-nav ml-auto ml-md-0">
            <li className="nav-item dropdown no-arrow">
              <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Usuario<i className="fa fa-user-circle fa-fw"></i>
              </a>
              <div className="dropdown-menu dropdown-menu-right" aria-labelledby="userDropdown">
                <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">Logout</a>
              </div>
            </li>
          </ul>

        </nav>
        <div id="wrapper">
          <div id="content-wrapper">
            <div className="container-fluid">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="#">Clientes Cadastrados</a>
                </li>
              </ol>
              <div className="row justify-content-md-center">
                <div className="col-md-auto">
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">First</th>
                          <th scope="col">Last</th>
                          <th scope="col">Handle</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>Mark</td>
                          <td>Otto</td>
                          <td>@mdo</td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td>Jacob</td>
                          <td>Thornton</td>
                          <td>@fat</td>
                        </tr>
                        <tr>
                          <th scope="row">3</th>
                          <td>Larry</td>
                          <td>the Bird</td>
                          <td>@twitter</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Link to="/cadastrar/">Incluir um novo cliente</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
