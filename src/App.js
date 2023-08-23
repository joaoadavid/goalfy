import Clientes from './componentes/Clientes';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsBoxArrowUpRight } from "react-icons/bs";
import './App.css';

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
        <Clientes />
      </div>
    </div>
  );
}



export default App;
