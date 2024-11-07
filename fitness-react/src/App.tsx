import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import DeletarCategoria from './components/categorias/deletarcategoria/DeletarCategoria'
import FormCategoria from './components/categorias/formcategoria/FormCategoria'
import ListarCategorias from './components/categorias/listarcategorias/ListarCategorias'
import DeletarExercicio from './components/exercicios/deletarexercicio/DeletarExercicio'
import FormExercicio from './components/exercicios/formexercicio/FormExercicio'
import ListarExercicios from './components/exercicios/listarexercicios/ListarExercicios'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import { AuthProvider } from './contexts/AuthContext'
import Cadastro from './pages/cadastro/Cadastro'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Perfil from './pages/perfil/Perfil'

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
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/categorias" element={<ListarCategorias />} />
              <Route path="/cadastrarcategoria" element={<FormCategoria />} />
              <Route path="/atualizarcategoria/:id" element={<FormCategoria />} />
              <Route path="/deletarcategoria/:id" element={<DeletarCategoria />} />
              <Route path="/exercicios" element={<ListarExercicios />} />
              <Route path="/cadastrarexercicio" element={<FormExercicio />} />
              <Route path="/atualizarexercicio/:id" element={<FormExercicio />} />
              <Route path="/deletarexercicio/:id" element={<DeletarExercicio />} />
              <Route path="/perfil" element={<Perfil />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
        </AuthProvider >
    </>
  )
}

export default App