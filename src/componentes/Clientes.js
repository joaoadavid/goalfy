import React from "react"
import { Form, Button, Modal } from "react-bootstrap"
import {
  BsBoxArrowUpRight, BsAt, BsCardList, BsCursorText,
  BsTelephone, BsPlusCircle,
} from "react-icons/bs"
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit'
import "../styles/modal.css"
import "../styles/tabela.css"
import "../styles/botao-contador.css"


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
      cep: '', // Adicione o estado para o CEP
      estado: '',
      buscarItem: '',
      modalAberta: false
    }
  }

  componentDidMount() {
    this.buscarCliente()
    this.submit = this.submit.bind(this)
  }
  buscarCliente = () => {
    fetch("http://localhost:3001/clientes")
      .then(resposta => resposta.json())
      .then(dados => {
        this.setState({ clientes: dados })
      })
      .catch(erro => {
        console.error("Erro ao buscar clientes:", erro)
      });
  }

  cadastrarCliente = (cliente) => {
    fetch("http://localhost:3001/clientes", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cliente)
    })
      .then(resposta => {
        if (resposta.ok) {
          this.buscarCliente()
        }
      })
  }

  renderTabela() {
    const { clientes, buscarItem } = this.state;
    const registrosFiltrados = clientes.filter((cliente) => {
      const termoBusca = buscarItem.toLowerCase()
      return (
        cliente.nome.toLowerCase().includes(termoBusca) ||
        cliente.email.toLowerCase().includes(termoBusca) ||
        cliente.endereco.toLowerCase().includes(termoBusca) ||
        cliente.telefone.includes(buscarItem) ||
        cliente.cnpj.includes(buscarItem) ||
        cliente.cidade.toLowerCase().includes(termoBusca)
      )
    })

    return (
      <div className="tabela">
        <MDBTable>
          <MDBTableHead className="cabecalho">
            <tr>
              <th>{<BsCursorText className="icone" />}Nome</th>
              <th>{<BsAt className="icone" />}Email</th>
              <th>{<BsTelephone className="icone" />}Telefone</th>
              <th>{<BsCardList className="icone" />}CNPJ</th>
              <th>{<BsCursorText className="icone" />}Endereço</th>
              <th>{<BsCursorText className="icone" />}Cidade</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody className=".tabela">
            {registrosFiltrados.map((cliente, index) => (
              <tr className='table-light' key={index}>
                <td>{cliente.nome}</td>
                <td>{cliente.email}</td>
                <td>{cliente.endereco}</td>
                <td>{cliente.telefone}</td>
                <td>{cliente.cnpj}</td>
                <td>{cliente.cidade}</td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </div>
    )
  }

  atualizarCampo = (campo, valor) => {
    this.setState({
      [campo]: valor
    });
  }
  buscarEnderecoPorCep = () => {
    const { cep } = this.state

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(resposta => resposta.json())
      .then(dados => {
        if (dados.erro) {
          alert('CEP inexistente ou inválido.')
          return;
        }

        this.setState({
          endereco: dados.logradouro,
          cidade: dados.localidade,
          estado: dados.uf
        });
      })
      .catch(erro => {
        console.error("Erro ao buscar endereço:", erro)
      })
  }
  submit(event) {
    event.preventDefault();

    const { nome, email, telefone, cnpj, cep, cidade } = this.state

    if (!nome || !email || !telefone || !cnpj || !cep || !cidade) {
      alert('Por favor, preencha todos os campos obrigatórios.')
      return;
    }

    if (!this.validarEmail(email)) {
      alert('Por favor, insira um email válido.')
      return;
    }

    if (!this.validarTelefone(telefone)) {
      alert('Por favor, insira um telefone no formato (XX) XXXX-XXXX ou (XX) XXXXX-XXXX.')
      return;
    }

    if (!this.validarCNPJ(cnpj)) {
      alert('Por favor, insira um CNPJ no formato  XX.XXX.XXX/YYYY-ZZ')
      return;
    }
    if (cep.length !== 8 || !/^\d+$/.test(cep)) {
      alert('Por favor, insira um CEP válido.')
      return;
    }

    this.buscarEnderecoPorCep()

    const cliente = {
      nome: nome,
      email: email,
      telefone: telefone,
      cnpj: cnpj,
      endereco: this.state.endereco, // Preenchido pela função buscarEnderecoPorCep
      cidade: cidade,
    };

    this.cadastrarCliente(cliente)
    this.fecharModal()
    this.reset()
  }

  quantidadeDeRegistros() {
    return this.state.clientes.length
  }

  validarEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  validarTelefone(telefone) {
    const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/
    return telefoneRegex.test(telefone)
  }

  validarCNPJ(cnpj) {
    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$|^\d{14}$/
    return cnpjRegex.test(cnpj)
  }

  reset = () => {
    this.setState({
      nome: '',
      email: '',
      telefone: '',
      cnpj: '',
      cep: '',
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
  atualizarTermoDePesquisa = (valor) => {
    this.setState({
      buscarItem: valor
    });
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
                <Form.Label className="label">Nome do Cliente</Form.Label>
                <Form.Control type="text" placeholder=" Digite aqui..." value={this.state.nome} onChange={(e) => this.atualizarCampo('nome', e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Digite aqui..." value={this.state.email} onChange={(e) => this.atualizarCampo('email', e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formTelefone">
                <Form.Label>Telefone</Form.Label>
                <Form.Control type="tel" placeholder="Digite aqui..." value={this.state.telefone} onChange={(e) => this.atualizarCampo('telefone', e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formCNPJ">
                <Form.Label>CNPJ</Form.Label>
                <Form.Control type="text" placeholder="Digite aqui..." value={this.state.cnpj} onChange={(e) => this.atualizarCampo('cnpj', e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formCep">
                <Form.Label>CEP</Form.Label>
                <Form.Control type="text" placeholder="Digite o aqui..." value={this.state.cep} onChange={(e) => this.atualizarCampo('cep', e.target.value)} onBlur={this.buscarEnderecoPorCep} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEndereco">
                <Form.Label>Endereço</Form.Label>
                <Form.Control type="text" placeholder="Digite aqui..." value={this.state.endereco} onChange={(e) => this.atualizarCampo('endereco', e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formCidade">
                <Form.Label>Cidade</Form.Label>
                <Form.Control type="text" placeholder="Digite aqui..." value={this.state.cidade} onChange={(e) => this.atualizarCampo('cidade', e.target.value)} />
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
        <div className="botao-e-contador">
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
            variant='none' type="submit" onClick={this.abrirModal}>
            <BsPlusCircle style={{ marginRight: '5px' }} /> Novo Registro
          </Button>
          <input className=" buscar" type="text" placeholder="Buscar..." value={this.state.buscarItem}
            onChange={(e) => this.atualizarTermoDePesquisa(e.target.value)} />
          <span className="contador"> {this.state.clientes.length} Registros</span>
        </div>
        {this.renderTabela()}
      </div>
    )
  }
}
export default clientes;
