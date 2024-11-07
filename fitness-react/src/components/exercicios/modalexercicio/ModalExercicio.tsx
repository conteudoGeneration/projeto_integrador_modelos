import Popup from 'reactjs-popup';

import 'reactjs-popup/dist/index.css';
import FormExercicio from '../formexercicio/FormExercicio';
import './ModalExercicio.css';

function ModalExercicio() {
    return (
        <>
            <Popup
                trigger={
                    <button 
                        className='border rounded px-4 py-2 text-emerald-800 border-emerald-800 hover:bg-emerald-800 hover:text-white'>
                        Novo Exercício
                    </button>
                }
                modal
            >
                <FormExercicio />
            </Popup>
        </>
    );
}

export default ModalExercicio;