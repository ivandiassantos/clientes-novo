import React, { Component } from 'react';

export default class Login extends Component {
    constructor() {
        super();
        this.state = { login: '', senha: '' };
        this.aplicaValores = this.aplicaValores.bind(this);
        this.autenticar = this.autenticar.bind(this);
    }

    aplicaValores(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    autenticar(event) {
        event.preventDefault();
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
        headers.append('Authorization', 'Basic ' + btoa('prova:prova-client'));
        const dadosRequisicao = {
            method: 'POST',
            headers: headers,
            body: { username: this.state.login, password: this.state.senha, grant_type: 'password' }
        }

        fetch('http://localhost:9092/oauth/token?grant_type=password&username=' + this.state.login + '&password=' + this.state.senha, dadosRequisicao)
            .then(resposta => {
                if (resposta.ok) {
                    return resposta.json();
                } else {
                    throw new Error('Login e/ou senha inválidos.')
                }
            })
            .then(resposta => {
                localStorage.setItem('token_acesso', resposta.access_token);
                this.props.history.push('/principal/');
            })
            .catch(error => {
                this.setState({ mensagem: error.message });
            });
    }

    render() {
        return (
            <div className="container">
                <div className="card card-login mx-auto mt-5">
                    <div className="card-header">Cadastro de Clientes - Autenticação</div>
                    <div className="card-body">
                        {this.state.mensagem !== undefined &&
                            <div className="alert alert-danger" role="alert">
                                {this.state.mensagem}
                            </div>
                        }
                        <form method="post" onSubmit={this.autenticar}>
                            <div className="form-group">
                                <div className="form-label-group">
                                    <label htmlFor="login">Login</label>
                                    <input type="text" id="login" name="login" className="form-control" onChange={this.aplicaValores} placeholder="Login" required="required" autoFocus="autofocus" />
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-label-group">
                                    <label htmlFor="senha">Senha</label>
                                    <input type="password" id="senha" name="senha" className="form-control" onChange={this.aplicaValores} placeholder="Senha" required="required" />
                                </div>
                            </div>
                            <input type="submit" className="btn btn-primary btn-block" value='ENTRAR' />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}