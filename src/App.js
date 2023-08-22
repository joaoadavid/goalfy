import Alunos from './componentes/Menu/Clientes';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsBoxArrowUpRight } from "react-icons/bs";

function App() {
  return (
    <div className="App">
      <div className="header">
        <h1>Goalfy</h1>
        <div className="vertical-line"></div> {/* Linha vertical */}
        <h1 className="cliente-header">
          <BsBoxArrowUpRight color='#7f23f7' />Registro de clientes
        </h1>
      </div>
      <div className='safari'>
        <BrowserRouter>
          <Nav variant="tabs">
          </Nav>
          <Routes>
            <Route path="/" element={<Alunos />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}



export default App;
