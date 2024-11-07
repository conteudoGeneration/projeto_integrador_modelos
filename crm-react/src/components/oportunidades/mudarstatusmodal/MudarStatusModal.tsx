import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './MudarStatusModal.css'
import Oportunidade from "../../../models/Oportunidade";
import MudarStatus from "../mudarstatus/MudarStatus";

interface MudarStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  oportunidade: Oportunidade;
}

function MudarStatusModal({ 
  isOpen, 
  onClose, 
  oportunidade,
}: MudarStatusModalProps) {
  return (
    <Popup
      open={isOpen}
      onClose={onClose}
      modal
      closeOnDocumentClick
      className="mudar-status-popup"
    >
      <div className="bg-white rounded-lg p-6 shadow-lg w-96">
        <h3 className="text-lg font-semibold mb-4 text-center">Alterar Status</h3>
        <MudarStatus
          oportunidade={oportunidade}
          onClose={onClose}
        />
      </div>
    </Popup>
  );
}

export default MudarStatusModal;