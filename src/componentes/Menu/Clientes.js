import React from "react"
import { Table, Form, Button, Modal } from "react-bootstrap";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { BsAt } from "react-icons/bs";
import { BsCardList } from "react-icons/bs";
import { BsCursorText } from "react-icons/bs";
import { BsTelephone } from "react-icons/bs";
import { BsPlusCircle } from "react-icons/bs";
import "../../styles/modalStyles.css";
import "../../styles/tabelaStyle.css";
import "../../styles/ButCadastrar.css";
import "../../styles/ButNovo.css";



class clientes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      email: '',
      telefone: '',
      cnpj: '',
      endereco: '',
      cidade: '',
      clientes: [],
      modalAberta: false
    }
  }

  componentDidMount() {
    this.buscarCliente();
    this.submit = this.submit.bind(this);
  }
  buscarCliente = () => {
    fetch("http://localhost:3001/clientes")
      .then(resposta => resposta.json())
      .then(dados => {
        this.setState({ clientes: dados })
      })
      .catch(erro => {
        console.error("Erro ao buscar clientes:", erro);
      });
  }

  cadastrarCliente = (cliente) => {
    fetch("http://localhost:3001/clientes", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, // Correção aqui
      body: JSON.stringify(cliente) // Correção aqui
    })
      .then(resposta => {
        if (resposta.ok) {
          this.buscarCliente();
        }
      })
  }


  renderTabela() {
    return <Table bordered hover >
      <thead >
        <tr>
          <th className="tabela-header">{<BsCursorText className="icone" />}Nome</th>
          <th className="tabela-header">{<BsAt className="icone" />}Email</th>
          <th className="tabela-header">{<BsTelephone className="icone" />}Telefone</th>
          <th className="tabela-header">{<BsCardList className="icone" />}CNPJ</th>
          <th className="tabela-header">{<BsCursorText className="icone" />}Endereço</th>
          <th className="tabela-header">{<BsCursorText className="icone" />}Cidade</th>
        </tr>
      </thead>
      <tbody>
        {this.state.clientes.map((cliente, index) => (
          <tr key={index}>
            <td variant="dark">{cliente.nome}</td>
            <td>{cliente.email}</td>
            <td>{cliente.endereco}</td>
            <td>{cliente.telefone}</td>
            <td>{cliente.cnpj}</td>
            <td>{cliente.cidade}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  }

  atualizaNome = (e) => {
    this.setState({
      nome: e.target.value
    })
  }
  atualizaEmail = (e) => {
    this.setState({
      email: e.target.value
    })
  }
  atualizaTelefone = (e) => {
    this.setState({
      telefone: e.target.value
    })
  }
  atualizaCNPJ = (e) => {
    this.setState({
      cnpj: e.target.value
    })
  }
  atualizaEndereco = (e) => {
    this.setState({
      endereco: e.target.value
    })
  }
  atualizaCidade = (e) => {
    this.setState({
      cidade: e.target.value
    })
  }

  submit(event) {
    event.preventDefault();

    const cliente = {
      nome: this.state.nome,
      email: this.state.email,
      telefone: this.state.telefone,
      cnpj: this.state.cnpj,
      endereco: this.state.endereco,
      cidade: this.state.cidade,
    };

    this.cadastrarCliente(cliente);
    this.fecharModal();
    this.reset();
  }

  reset = () => {
    this.setState({
      nome: '',
      email: '',
      telefone: '',
      cnpj: '',
      endereco: '',
      cidade: ''
    }
    )

  }

  fecharModal = () => {
    this.setState({
      modalAberta: false
    })
  }
  abrirModal = () => {
    this.setState({
      modalAberta: true
    })
  }

  render() {
    return (
      <div>

        <Modal show={this.state.modalAberta} onHide={this.fecharModal}>
          <Modal.Header closeButton>
            <Modal.Title className="titulo">
              <BsBoxArrowUpRight className="icon" /> Novo Cliente
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formNome">
                <Form.Label className="label">Nome</Form.Label>
                <Form.Control type="text" placeholder=" Digite aqui..." value={this.state.nome} onChange={this.atualizaNome} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Digite aqui..." value={this.state.email} onChange={this.atualizaEmail} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formTelefone">
                <Form.Label>Telefone</Form.Label>
                <Form.Control type="tel" placeholder="Digite aqui..." value={this.state.telefone} onChange={this.atualizaTelefone} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formCNPJ">
                <Form.Label>CNPJ</Form.Label>
                <Form.Control type="text" placeholder="Digite aqui..." value={this.state.cnpj} onChange={this.atualizaCNPJ} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEndereco">
                <Form.Label>Endereço</Form.Label>
                <Form.Control type="text" placeholder="Digite aqui..." value={this.state.endereco} onChange={this.atualizaEndereco} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formCidade">
                <Form.Label>Cidade</Form.Label>
                <Form.Control type="text" placeholder="Digite aqui..." value={this.state.cidade} onChange={this.atualizaCidade} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button className="butCadastrar" variant="primary" type="submit" onClick={this.submit}> Cadastrar</Button>
          </Modal.Footer>
        </Modal>
        <Button className="butNovo" variant='light' type="submit" onClick={this.abrirModal}>
          <BsPlusCircle style={{ marginRight: '5px' }} /> Novo Registro
        </Button>

        {this.renderTabela()}
      </div>
    )
  }
}
export default clientes;
