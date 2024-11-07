import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import { AuthProvider } from './contexts/AuthContext';
import Cadastro from './pages/cadastro/Cadastro';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Perfil from './pages/perfil/Perfil';
import 'react-toastify/dist/ReactToastify.css';
import ListaColaboradores from './components/colaboradores/listacolaboradores/Listacolaboradores';
import ListaDepartamentos from './components/departamentos/listadepartamentos/ListaDepartamentos';
import FormDepartamento from './components/departamentos/formdepartamento/FormDepartamento';
import DeletarDepartamento from './components/departamentos/deletardepartamento/DeletarDepartamento';
import FormColaborador from './components/colaboradores/formcolaborador/FormColaborador';
import DeletarColaborador from './components/colaboradores/deletarcolaborador/DeletarColaborador';
import CalcularSalario from './components/calcularsalario/CalcularSalario';

function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer />
        <BrowserRouter>
          <Navbar />
          <div className="min-h-[80vh]">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/departamentos" element={<ListaDepartamentos />} />
              <Route path="/cadastrardepartamento" element={<FormDepartamento />} />
              <Route path="/atualizardepartamento/:id" element={<FormDepartamento />} />
              <Route path="/deletardepartamento/:id" element={<DeletarDepartamento />} />
              <Route path="/colaboradores" element={<ListaColaboradores />} />
              <Route path="/cadastrarcolaborador" element={<FormColaborador />} />
              <Route path="/atualizarcolaborador/:id" element={<FormColaborador />} />
              <Route path="/deletarcolaborador/:id" element={<DeletarColaborador />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/calcularsalario/:id" element={<CalcularSalario />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;