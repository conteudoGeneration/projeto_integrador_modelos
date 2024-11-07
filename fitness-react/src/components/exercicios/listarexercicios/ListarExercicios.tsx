import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import Exercicio from '../../../models/Exercicio';
import { ToastAlerta } from '../../../utils/ToastAlerta';
import { listar } from '../../../services/Services';
import { DNA } from 'react-loader-spinner';
import CardExercicios from '../cardexercicios/CardExercicios';

function ListarExercicios() {

  const navigate = useNavigate();

  const [exercicios, setExercicios] = useState<Exercicio[]>([]);

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  async function buscarExercicios() {

    try {
      await listar('/exercicios', setExercicios, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes('401')) {
        handleLogout()
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      ToastAlerta('Você precisa estar logado!', 'info')
      navigate('/')
    }
  }, [token])

  useEffect(() => {
    buscarExercicios();
  }, [exercicios.length]);

  return (
    <>

      {exercicios.length === 0 && (
        <DNA
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper mx-auto"
        />
      )}

      <div className="
                bg-gray-200 
                flex 
                justify-center
                ">
        <div className='container mx-auto my-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {exercicios.map((exercicio) => (
            <CardExercicios key={exercicio.id} exercicio={exercicio}/>
          ))}
        </div>
      </div>
    </>
  );
}

export default ListarExercicios;