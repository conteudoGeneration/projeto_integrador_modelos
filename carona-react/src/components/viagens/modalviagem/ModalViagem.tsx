import Popup from 'reactjs-popup';

import 'reactjs-popup/dist/index.css';
import './ModalViagem.css';
import FormViagem from '../formviagem/FormViagem';

function ModalViagem() {
    return (
        <>
            <Popup
                trigger={
                    <button 
                        className='border rounded px-4 py-2 text-cyan-900 border-cyan-950 hover:bg-cyan-900 hover:text-white'>
                        Adicionar Nova Carona
                    </button>
                }
                modal
            >
                <FormViagem />
            </Popup>
        </>
    );
}

export default ModalViagem;