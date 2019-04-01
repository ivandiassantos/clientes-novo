import React, { Component } from 'react';
import InputMask from 'react-input-mask';
import { Link } from 'react-router-dom';

export default class CadastrarCliente extends Component {

    constructor() {
        super();
        this.state = { listaTiposTelefones: [], listaUfs: [], listaTelefones: [] };
        this.aplicaValores = this.aplicaValores.bind(this);
        this.consultaCEP = this.consultaCEP.bind(this);
        this.adicionaTelefone = this.adicionaTelefone.bind(this);
        this.cadastrar = this.cadastrar.bind(this);
        this.obterDescricaoTipoTelefone = this.obterDescricaoTipoTelefone.bind(this);
        this.removeMascaraTelefones = this.removeMascaraTelefones.bind(this);
    }

    cadastrar(event) {
        event.preventDefault();
        const cliente = {
            cpf: this.state.cpf.replace(/[^0-9]/g, ''),
            nome: this.state.nome
        }
        const endereco = {
            cep: this.state.cep.replace(/[^0-9]/g, ''),
            logradouro: this.state.logradouro,
            bairro: this.state.bairro,
            complemento: this.state.complemento,
            numero: this.state.numero,
            cidade: this.state.cidade,
            uf: this.state.uf
        }
        const telefones = this.removeMascaraTelefones(this.state.listaTelefones);
        const headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('token_acesso'));
        headers.append('Content-Type','application/json');
        const dadosRequisicao = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(cliente)
        };
        fetch('http://localhost:9093/v1/cliente', dadosRequisicao)
            .then(resposta => {
                console.log('Resposta: ', resposta);
                if (resposta.ok) {
                    this.setState({mensagemSucesso:'Cliente cadastrado com sucesso.'});
                }
            })
    }

    removeMascaraTelefones(listaTelefones){
        let telefones = [];
        listaTelefones.forEach(telefone=>{
            telefones.push({
                tipoTelefone:telefone.tipoTelefone,
                numero:telefone.numero.replace(/[^0-9]/g, '')
            })
        });
        return telefones;
    }

    obterDescricaoTipoTelefone(codigoTipoTelefone) {
        let descricao = '';
        this.state.listaTiposTelefones.forEach(tipoTelefone => {
            if (tipoTelefone.id === parseInt(codigoTipoTelefone)) {
                descricao = tipoTelefone.descricao;
            }
        });
        return descricao;
    }

    adicionaTelefone(event) {
        this.state.listaTelefones.push(
            {
                tipoTelefone: this.state.tipoTelefone,
                numero: this.state.telefone,
                descricaoTipoTelefone: this.obterDescricaoTipoTelefone(this.state.tipoTelefone)
            }
        );
        this.setState({ listaTelefones: this.state.listaTelefones });
        console.log(this.state.listaTelefones);
    }

    aplicaValores(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    consultaCEP(event) {
        const target = event.target;
        const cep = target.value;
        fetch('https://viacep.com.br/ws/' + cep.replace(/[^0-9]/g, '') + '/json')
            .then(resposta => {
                if (resposta.ok) {
                    return resposta.json();
                }
            })
            .then(resposta => {
                console.log('CEP: ', resposta);
                this.setState({
                    logradouro: resposta.logradouro,
                    bairro: resposta.bairro,
                    localidade: resposta.localidade,
                    uf: resposta.uf,
                    complemento: resposta.complemento
                });

            })
    }

    componentWillMount() {
        const headers = new Headers();
        headers.append('Authorization', 'Bearer ' + localStorage.getItem('token_acesso'));
        const dadosRequisicao = {
            method: 'GET',
            headers: headers
        };
        fetch('http://localhost:9093/v1/tipoTelefone', dadosRequisicao)
            .then(resposta => {
                if (resposta.ok) {
                    return resposta.json();
                }
            })
            .then(resposta => {
                this.setState({ listaTiposTelefones: resposta });
            });

        fetch('http://localhost:9093/v1/uf', dadosRequisicao)
            .then(resposta => {
                if (resposta.ok) {
                    return resposta.json();
                }
            })
            .then(resposta => {
                this.setState({ listaUfs: resposta });
            })
    }
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark static-top">
                    <a className="navbar-brand mr-1" href="index.html">Cadastro de Clientes</a>
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
                                    <a href="#">Cadastrar Cliente</a>
                                </li>
                            </ol>
                            <div className="container">
                                {this.state.mensagemSucesso !== undefined &&
                                    <div className="alert alert-info alert-dismissible fade show" role="alert">
                                        {this.state.mensagemSucesso}
                                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                }
                                <form onSubmit={this.cadastrar} method="post">
                                    <div className="row align-items-center">
                                        <div className="col-2">
                                            <label htmlFor="cpf">CPF</label>
                                            <InputMask name="cpf" className="form-control" mask="999.999.999-99" id="cpf" onChange={this.aplicaValores} aria-describedby="cpf" placeholder="CPF" />
                                        </div>
                                        <div className="col-10">
                                            <label htmlFor="nome">Nome</label>
                                            <input type="text" name="nome" className="form-control" id="nome" aria-describedby="nome" onChange={this.aplicaValores} placeholder="Nome" />
                                        </div>
                                    </div>
                                    <div class="row align-items-center">
                                        <div className="col-2">
                                            <label htmlFor="cep">CEP</label>
                                            <InputMask type="text" onBlur={this.consultaCEP} name="cep" mask="99.999-999" onChange={this.aplicaValores} className="form-control" id="cep" aria-describedby="cep" placeholder="CEP" />
                                        </div>
                                        <div className="col-10">
                                            <label htmlFor="logradouro">Logradouro</label>
                                            <input type="text" name="logradouro" value={this.state.logradouro} className="form-control" onChange={this.aplicaValores} id="logradouro" aria-describedby="logradouro" placeholder="Logradouro" />
                                        </div>
                                    </div>
                                    <div class="row align-items-center">
                                        <div className="col-4">
                                            <label htmlFor="bairro">Bairro</label>
                                            <input type="text" name="bairro" value={this.state.bairro} className="form-control" id="bairro" onChange={this.aplicaValores} aria-describedby="bairro" placeholder="Bairro" />
                                        </div>
                                        <div className="col-8">
                                            <label htmlFor="complemento">Complemento</label>
                                            <input type="text" name="complemento" value={this.state.complemento} className="form-control" id="complemento" onChange={this.aplicaValores} aria-describedby="complemento" placeholder="Complemento" />
                                        </div>
                                    </div>
                                    <div class="row align-items-center">
                                        <div className="col-3">
                                            <label htmlFor="numero">Número</label>
                                            <input type="text" name="numero" className="form-control" id="numero" onChange={this.aplicaValores} aria-describedby="numero" placeholder="Número" />
                                        </div>
                                        <div className="col-7">
                                            <label htmlFor="cidade">Cidade</label>
                                            <input type="text" name="cidade" value={this.state.localidade} className="form-control" id="cidade" onChange={this.aplicaValores} aria-describedby="cidade" placeholder="Cidade" />
                                        </div>
                                        <div className="col-2">
                                            <label htmlFor="uf" name="uf">UF</label>
                                            <select className="form-control" value={this.state.uf} id="uf" name="uf" onChange={this.aplicaValores}>
                                                {
                                                    this.state.listaUfs.map(uf => {
                                                        return (<option value={uf.sigla} key={uf.sigla}>{uf.sigla}</option>);
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row align-items-end">
                                        <div className="col-6">
                                            <label htmlFor="tipoTelefone">Tipo do Telefone</label>
                                            <select className="form-control" id="tipoTelefone" name="tipoTelefone" onChange={this.aplicaValores}>
                                                <option>Selecione</option>
                                                {
                                                    this.state.listaTiposTelefones.map(tipoTelefone => {
                                                        return (<option value={tipoTelefone.id} key={tipoTelefone.id}>{tipoTelefone.descricao}</option>);
                                                    })
                                                }
                                            </select>
                                        </div>
                                        {this.state.tipoTelefone === '2' &&
                                            <div className="col-4">
                                                <label htmlFor="telefone">Telefone</label>
                                                <InputMask type="text" name="telefone" mask="(99) 99999-9999" className="form-control" id="telefone" aria-describedby="telefone" placeholder="Telefone" onChange={this.aplicaValores} />
                                            </div>
                                        }
                                        {this.state.tipoTelefone !== '2' &&
                                            <div className="col-4">
                                                <label htmlFor="telefone">Telefone</label>
                                                <InputMask type="text" name="telefone" mask="(99) 9999-9999" className="form-control" id="telefone" aria-describedby="telefone" placeholder="Telefone" onChange={this.aplicaValores} />
                                            </div>
                                        }
                                        <div className="col-2">
                                            <button type="button" className="btn btn-primary" title="Adicionar outro telefone" onClick={this.adicionaTelefone}>Adicionar</button>
                                        </div>
                                    </div>
                                    <div className="row align-items-center">
                                        <div className="col-4">
                                            {this.state.listaTelefones.length > 0 &&
                                                <table className="table">
                                                    <thead>
                                                        <th>Tipo de Telefone</th>
                                                        <th>Número</th>
                                                    </thead>
                                                    <tbody>

                                                        {
                                                            this.state.listaTelefones.map(telefone => {
                                                                return (
                                                                    <tr key="{telefone.numero}">
                                                                        <td>{telefone.descricaoTipoTelefone}</td>
                                                                        <td>{telefone.numero}</td>
                                                                    </tr>
                                                                );
                                                            })
                                                        }

                                                    </tbody>
                                                </table>
                                            }
                                        </div>
                                    </div>
                                    <br /><br /><br />
                                    <div className="row">
                                        <div className="col-10">
                                        </div>
                                        <div className="col-1">
                                            <input type="submit" value="Cadastrar" className="btn btn-primary" />
                                        </div>
                                        <div className="col-1">
                                            <Link to="/principal/" className="btn btn-secondary">Cancelar</Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}