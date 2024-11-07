import { useContext, useState } from 'react';
import Oportunidade from '../../../models/Oportunidade';
import { atualizar } from '../../../services/Service';
import { ToastAlerta } from '../../../utils/ToastAlerta';
import AuthContext from '../../../contexts/AuthContext';

interface MudarStatusProps {
  oportunidade: Oportunidade;
  onClose: () => void;
}

// Componente do formulário de alteração de status
function MudarStatus ({ 
  oportunidade, 
  onClose, 
}: MudarStatusProps) {
 
  const [updateOportunidade, setUpdateOportunidade] = useState<Oportunidade>(oportunidade);
  const [selectedStatus, setSelectedStatus] = useState(oportunidade.status);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await atualizar(
        `/oportunidades/${oportunidade.id}/status/${selectedStatus}`, 
        updateOportunidade, 
        setUpdateOportunidade, 
        {
          headers: { Authorization: token },
        }
      );
      
      ToastAlerta("Status atualizado com sucesso", "sucesso");
      onClose();
    } catch (error: any) {
      if (error.toString().includes("401")) {
       handleLogout();
      } else {
        ToastAlerta("Erro ao atualizar status", "erro");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(Number(e.target.value))}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-400"
          disabled={isSubmitting}
        >
          <option value={1}>Aberta</option>
          <option value={2}>Fechada</option>
          <option value={3}>Perdida</option>
        </select>
      </div>

      <div className="flex justify-center gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-red-400 text-white rounded-md hover:bg-red-600 disabled:opacity-50"
          disabled={isSubmitting}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-teal-400 text-white rounded-md hover:bg-teal-600 disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Salvando..." : "Confirmar"}
        </button>
      </div>
    </form>
  );
};

export default MudarStatus;