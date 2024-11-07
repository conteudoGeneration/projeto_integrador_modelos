import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import DeletarVeiculo from "./components/veiculos/deletarveiculo/DeletarVeiculo";
import FormVeiculo from "./components/veiculos/formveiculo/FormVeiculo";
import ListarVeiculos from "./components/veiculos/listarveiculos/ListarVeiculos";
import ListarViagens from "./components/viagens/listarviagens/ListarViagens";
import { AuthProvider } from "./contexts/AuthContext";
import Cadastro from "./pages/cadastro/Cadastro";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Perfil from "./pages/perfil/Perfil";
import DeletarViagem from "./components/viagens/deletarviagem/DeletarViagem";
import FormViagem from "./components/viagens/formviagem/FormViagem";

function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer />
        <BrowserRouter>
          <Navbar />
          <div className="min-h-[90vh] bg-gray-200">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/veiculos" element={<ListarVeiculos />} />
              <Route path="/cadastrarveiculo" element={<FormVeiculo />} />
              <Route path="/atualizarveiculo/:id" element={<FormVeiculo />} />
              <Route path="/deletarveiculo/:id" element={<DeletarVeiculo />} />
              <Route path="/viagens" element={<ListarViagens />} />
              <Route path="/cadastrarviagem" element={<FormViagem />} />
              <Route path="/atualizarviagem/:id" element={<FormViagem />} />
              <Route path="/deletarviagem/:id" element={<DeletarViagem />} />
              <Route path="/perfil" element={<Perfil />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
