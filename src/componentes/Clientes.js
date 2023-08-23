import React from "react"
import { Table, Form, Button, Modal } from "react-bootstrap";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { BsAt } from "react-icons/bs";
import { BsCardList } from "react-icons/bs";
import { BsCursorText } from "react-icons/bs";
import { BsTelephone } from "react-icons/bs";
import { BsPlusCircle } from "react-icons/bs";
import "../styles/modalStyles.css";
import "../styles/tabelaStyle.css";


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
          <th>{<BsCursorText className="icone" />}Nome</th>
          <th>{<BsAt className="icone" />}Email</th>
          <th>{<BsTelephone className="icone" />}Telefone</th>
          <th>{<BsCardList className="icone" />}CNPJ</th>
          <th>{<BsCursorText className="icone" />}Endereço</th>
          <th>{<BsCursorText className="icone" />}Cidade</th>

        </tr >
      </thead >
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
    </Table >
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

    const { nome, email, telefone, cnpj, endereco, cidade } = this.state;

    if (!nome || !email || !telefone || !cnpj || !endereco || !cidade) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (!this.validarEmail(email)) {
      alert('Por favor, insira um email válido.');
      return;
    }

    if (!this.validarTelefone(telefone)) {
      alert('Por favor, insira um telefone no formato (XX) XXXX-XXXX ou (XX) XXXXX-XXXX.');
      return;
    }

    if (!this.validarCNPJ(cnpj)) {
      alert('Por favor, insira um CNPJ no formato  XX.XXX.XXX/YYYY-ZZ');
      return;
    }

    const cliente = {
      nome: nome,
      email: email,
      telefone: telefone,
      cnpj: cnpj,
      endereco: endereco,
      cidade: cidade,
    };

    this.cadastrarCliente(cliente);
    this.fecharModal();
    this.reset();
  }

  validarEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  validarTelefone(telefone) {
    const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    return telefoneRegex.test(telefone);
  }

  validarCNPJ(cnpj) {
    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$|^\d{14}$/;
    return cnpjRegex.test(cnpj);
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
            <Button style={{
              border: 'none',
              backgroundColor: '#7f23f7',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '15px 20px 10px',
              width: '427px',
              height: '48px',
              fontSize: '18px',
            }} variant="primary" type="submit" onClick={this.submit}>
              Cadastrar
            </Button>
          </Modal.Footer>
        </Modal>
        <Button
          style={{
            border: 'none',
            backgroundColor: '#7f23f7',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            margin: '10px 20px 10px 120px',
            width: '125px',
            height: '25px',
            fontSize: '13px',
          }}
          variant='none'
          type="submit"
          onClick={this.abrirModal}
        >
          <BsPlusCircle style={{ marginRight: '5px' }} /> Novo Registro
        </Button>

        {this.renderTabela()}
      </div>
    )
  }
}

export default clientes;
